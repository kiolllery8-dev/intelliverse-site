#!/usr/bin/env bash
# Deploy this Next.js static export to the home server.
# Prereq: ssh alias `home` in ~/.ssh/config pointing at user@192.168.1.186
# Usage:  ./deploy.sh
set -euo pipefail

REMOTE_PATH="/opt/auslife/nginx-static/show/"

echo "[1/3] npm ci + build…"
npm ci --silent
npm run build

echo "[2/3] rsync out/ → home:${REMOTE_PATH}"
# trailing slash on out/ is intentional — copies contents, not the dir itself
rsync -avz --delete \
  --exclude='*.map' \
  out/ "home:${REMOTE_PATH}"

echo "[3/3] sanity check"
ssh home "ls -la ${REMOTE_PATH} | head -8 && du -sh ${REMOTE_PATH}"

echo
echo "✓ deployed.  https://show.intelliverse.tw/"
