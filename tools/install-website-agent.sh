#!/usr/bin/env bash
set -euo pipefail
agent_dir=/home/user/show-site-agent
mkdir -p "$agent_dir/state" "$agent_dir/bin"
install -m 755 tools/website-agent.py "$agent_dir/bin/website-agent.py"
python3 - <<'PY'
import json
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo
p = Path('/home/user/show-site-agent/state/config.json')
if not p.exists():
    p.write_text(json.dumps({'startedAt': datetime.now(ZoneInfo('Asia/Taipei')).isoformat(),
        'paused': False, 'releaseRehearsalPassed': False}, indent=2))
PY
unit_dir=$(mktemp -d)
trap 'rm -rf "$unit_dir"' EXIT
for task in health research; do
cat > "$unit_dir/show-site-$task.service" <<EOF
[Unit]
Description=Intelliverse website $task worker
Wants=network-online.target
After=network-online.target

[Service]
Type=oneshot
User=user
Group=user
WorkingDirectory=$agent_dir
Environment=HOME=/home/user
Environment=PATH=/usr/local/bin:/usr/bin:/bin
Environment=SHOW_AGENT_STATE=$agent_dir/state
ExecStart=/usr/bin/python3 $agent_dir/bin/website-agent.py $task
TimeoutStartSec=45min
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=$agent_dir /home/user/.codex
InaccessiblePaths=-/home/user/.ssh -/home/user/.home-sudo-pass -/home/user/.cf-token -/home/user/.config/gh -/opt/auslife/certbot
UMask=0077
MemoryMax=2G
CPUQuota=100%
EOF
done
cat > "$unit_dir/show-site-health.timer" <<'EOF'
[Unit]
Description=Check Intelliverse website every 15 minutes
[Timer]
OnBootSec=2min
OnCalendar=*-*-* *:00,15,30,45:00 Asia/Taipei
Persistent=true
Unit=show-site-health.service
[Install]
WantedBy=timers.target
EOF
cat > "$unit_dir/show-site-research.timer" <<'EOF'
[Unit]
Description=Review Intelliverse website content every six hours
[Timer]
OnCalendar=*-*-* 00,06,12,18:10:00 Asia/Taipei
Persistent=true
Unit=show-site-research.service
[Install]
WantedBy=timers.target
EOF
for file in "$unit_dir"/*; do
  sudo -S install -m 644 "$file" /etc/systemd/system/ < /home/user/.home-sudo-pass
done
sudo -S systemctl daemon-reload < /home/user/.home-sudo-pass
sudo -S systemctl enable --now show-site-health.timer show-site-research.timer < /home/user/.home-sudo-pass
sudo -S systemctl start show-site-health.service < /home/user/.home-sudo-pass
sudo -S systemctl start --no-block show-site-research.service < /home/user/.home-sudo-pass
systemctl list-timers 'show-site-*' --no-pager
