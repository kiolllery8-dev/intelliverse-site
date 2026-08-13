#!/usr/bin/env node
/**
 * 用 codex 產生技能流程示意圖 → public/skills-img/<slug>.webp
 *
 * 用法：
 *   node tools/gen-skill-images.js                 # 只補缺圖的
 *   node tools/gen-skill-images.js --only=a,b      # 指定 slug
 *   node tools/gen-skill-images.js --force         # 全部重生
 *   node tools/gen-skill-images.js --jobs=3        # 併發數（預設 3）
 *
 * 執行位置：
 *   - 家裡主機上（有 codex）→ 直接跑，GitHub Actions 的 self-hosted runner 就是這種情況
 *   - 其他機器 → 自動改走 `ssh home`
 *
 * 兩個踩過的坑，改動前先看清楚：
 *   1. 每個技能必須用自己的 CODEX_HOME。多個 codex session 共用 ~/.codex/generated_images
 *      時，各自 `ls -t | head -1` 會抓到別人剛產出的圖，而且成品看起來都正常，很難發現。
 *   2. codex 呼叫要加 `< /dev/null`。透過 ssh 執行時它會把繼承來的 stdin 當成管道輸入，
 *      然後停在「Reading additional input from stdin...」直到 timeout。
 *   3. CODEX_HOME 不能放 /tmp，codex 會拒絕在暫存目錄下建 helper binaries。
 */
const fs = require('fs');
const path = require('path');
const { execFileSync, execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data', 'skills');
const OUT_DIR = path.join(ROOT, 'public', 'skills-img');
const STYLE_FILE = path.join(__dirname, 'skill-image-style.txt');
const REMOTE = 'skill-imgs'; // 相對於遠端家目錄

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyArg = args.find((a) => a.startsWith('--only='));
const only = onlyArg ? new Set(onlyArg.split('=')[1].split(',').filter(Boolean)) : null;
const jobsArg = args.find((a) => a.startsWith('--jobs='));
const JOBS = jobsArg ? Number(jobsArg.split('=')[1]) : 3;

const STYLE = fs.readFileSync(STYLE_FILE, 'utf8').trim();

const RULES = `硬性要求（違反就是失敗）：
- 橫式構圖，長寬比嚴格為 3:2（寬 1536、高 1024），絕對不可以是正方形。
- 內容垂直置中，上下留白平均，不要偏上或偏下。
- 所有文字必須是筆畫清晰、完全正確的繁體中文，不可有錯字、簡體字、日文假名或亂碼。
- 畫面上除了指定的中文字之外，不可出現任何英文字母、數字或其他文字。
- 四個節點大小一致、水平等距排列，不要有一個特別大或位置歪掉。`;

function buildPrompt(spec) {
  const nodes = spec.steps
    .map((s, i) => `  ${i + 1}. 圖示＝${s.icon}，標籤文字「${s.label}」`)
    .join('\n');
  // 只叫它生圖，不叫它複製檔案 —— 取檔由 driver 從隔離的 CODEX_HOME 直接抓
  return `請生成一張圖片。生成完就結束，不需要複製檔案或做其他事。

=== 圖片內容 ===
主標題（大字，置中於畫面上方）：「${spec.title}」
主標題下方是四個流程節點，由左至右水平排列，以箭頭連接：
${nodes}

=== 視覺風格 ===
${STYLE}

=== ${RULES} ===
`;
}

function loadSpecs() {
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')))
    .filter((o) => o.diagram && Array.isArray(o.diagram.steps) && o.diagram.steps.length === 4)
    .map((o) => ({ slug: o.slug, title: o.diagram.title, steps: o.diagram.steps }));
}

function hasLocalCodex() {
  try {
    execSync('command -v codex', { stdio: 'ignore', shell: '/bin/bash' });
    return true;
  } catch {
    return false;
  }
}

const DRIVER = (base) => `#!/bin/bash
BASE="${base}"
cd "$BASE"
mkdir -p out logs homes

run_one() {
  slug="$1"
  BASE="${base}"
  out="$BASE/out/$slug.png"
  [ -s "$out" ] && { echo "SKIP $slug"; return 0; }

  for attempt in 1 2 3; do
    ch="$BASE/homes/$slug"
    rm -rf "$ch"; mkdir -p "$ch"
    cp "$HOME/.codex/auth.json"      "$ch/" 2>/dev/null
    cp "$HOME/.codex/config.toml"    "$ch/" 2>/dev/null
    cp "$HOME/.codex/installation_id" "$ch/" 2>/dev/null

    CODEX_HOME="$ch" timeout 900 codex exec --skip-git-repo-check -C "$BASE" \\
      "$(cat "$BASE/prompts/$slug.txt")" < /dev/null > "$BASE/logs/$slug.log" 2>&1

    png=$(ls -t "$ch"/generated_images/*/*.png 2>/dev/null | head -1)
    if [ -n "$png" ] && [ -s "$png" ]; then
      cp "$png" "$out"; rm -rf "$ch"
      echo "OK   $slug (try $attempt, $(stat -c%s "$out") bytes)"
      return 0
    fi
    rm -rf "$ch"; sleep 5
  done
  echo "FAIL $slug (log: $BASE/logs/$slug.log)"
  return 1
}
export -f run_one

ls prompts/*.txt | sed 's|prompts/||; s|\\.txt$||' | xargs -P ${JOBS} -I{} bash -c 'run_one "$@"' _ {}
echo "---"
echo "產出 $(ls out/*.png 2>/dev/null | wc -l) 張"
echo "唯一內容數 $(md5sum out/*.png 2>/dev/null | awk '{print $1}' | sort -u | wc -l)"
`;

function sh(cmd) {
  return execFileSync('bash', ['-lc', cmd], { stdio: 'inherit' });
}

function toWebp(src, dst) {
  // 本機的 convert 在 Windows 上是磁碟格式轉換工具，不是 ImageMagick，一律用 ffmpeg
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', 'scale=1200:-2',
    '-c:v', 'libwebp', '-quality', '90', '-compression_level', '6',
    dst,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let specs = loadSpecs();
  if (only) specs = specs.filter((s) => only.has(s.slug));
  const todo = specs.filter((s) => force || !fs.existsSync(path.join(OUT_DIR, `${s.slug}.webp`)));

  console.log(`${specs.length} 個技能有流程圖規格，需要產生 ${todo.length} 張`);
  if (!todo.length) return;

  const local = hasLocalCodex();
  console.log(local ? '在本機執行 codex' : '本機沒有 codex，改走 ssh home');

  const stage = path.join(ROOT, '.codex-img');
  fs.rmSync(stage, { recursive: true, force: true });
  fs.mkdirSync(path.join(stage, 'prompts'), { recursive: true });
  fs.mkdirSync(path.join(stage, 'out'), { recursive: true });
  for (const s of todo) {
    fs.writeFileSync(path.join(stage, 'prompts', `${s.slug}.txt`), buildPrompt(s), 'utf8');
  }

  let pngDir;
  if (local) {
    const base = path.join(process.env.HOME || process.env.USERPROFILE, REMOTE);
    fs.rmSync(base, { recursive: true, force: true });
    fs.mkdirSync(path.join(base, 'out'), { recursive: true });
    fs.cpSync(path.join(stage, 'prompts'), path.join(base, 'prompts'), { recursive: true });
    fs.writeFileSync(path.join(base, 'driver.sh'), DRIVER(base), 'utf8');
    sh(`chmod +x "${base}/driver.sh" && "${base}/driver.sh"`);
    pngDir = path.join(base, 'out');
  } else {
    sh(`ssh -n home 'rm -rf ~/${REMOTE} && mkdir -p ~/${REMOTE}/out ~/${REMOTE}/logs ~/${REMOTE}/homes'`);
    fs.writeFileSync(path.join(stage, 'driver.sh'), DRIVER(`$HOME/${REMOTE}`), 'utf8');
    sh(`scp -q -r "${path.join(stage, 'prompts')}" "${path.join(stage, 'driver.sh')}" home:${REMOTE}/`);
    sh(`ssh -n home 'chmod +x ~/${REMOTE}/driver.sh && ~/${REMOTE}/driver.sh'`);
    sh(`scp -q "home:${REMOTE}/out/*.png" "${path.join(stage, 'out')}/" || true`);
    pngDir = path.join(stage, 'out');
  }

  const pngs = fs.readdirSync(pngDir).filter((f) => f.endsWith('.png'));
  console.log(`\n轉檔 ${pngs.length} 張 → WebP`);
  let ok = 0;
  for (const f of pngs) {
    const slug = f.replace(/\.png$/, '');
    const dst = path.join(OUT_DIR, `${slug}.webp`);
    try {
      toWebp(path.join(pngDir, f), dst);
      console.log(`  ✓ ${slug} (${Math.round(fs.statSync(dst).size / 1024)}KB)`);
      ok++;
    } catch {
      console.log(`  ✗ ${slug}：ffmpeg 失敗`);
    }
  }

  fs.rmSync(stage, { recursive: true, force: true });

  const missing = todo.map((s) => s.slug).filter((s) => !fs.existsSync(path.join(OUT_DIR, `${s}.webp`)));
  console.log(`\n完成 ${ok}/${todo.length}`);
  if (missing.length) {
    console.log(`缺少 ${missing.length} 個：${missing.join(', ')}`);
    process.exit(1);
  }
}

main();
