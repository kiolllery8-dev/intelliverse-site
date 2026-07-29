#!/usr/bin/env node
/**
 * 用家裡主機（ssh home）上的 codex 產生技能流程圖。
 *
 * 流程：
 *   1. 依 specs.json + 風格檔，在本機組出每個技能的完整生圖 prompt
 *   2. rsync 把 prompt 推到 home:/tmp/skill-prompts/
 *   3. 在 home 上跑 driver.sh（xargs 併發呼叫 codex exec）
 *   4. rsync 把 png 拉回來，用 ffmpeg 轉成 public/skills-img/<slug>.webp
 *
 * 用法：
 *   node tools/gen-skill-images-codex.js <specs.json> <style.txt> [--only=a,b] [--force] [--jobs=3]
 *
 * 注意：本機的 convert 是 Windows 磁碟轉換工具，不是 ImageMagick，壓縮一律用 ffmpeg。
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'skills-img');
const STAGE = path.join(ROOT, '.codex-img');          // 本機暫存：prompt 與拉回來的 png
// home 上的工作目錄，相對於遠端家目錄。
// 不放 /tmp：codex 會拒絕在暫存目錄下建 helper binaries。
// driver 內一律用 $HOME/... —— "~" 在雙引號裡不會展開。
const REMOTE = 'skill-imgs';

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith('--'));
const [specPath, stylePath] = positional;
if (!specPath || !stylePath) {
  console.error('用法: node tools/gen-skill-images-codex.js <specs.json> <style.txt> [--only=a,b] [--force] [--jobs=3]');
  process.exit(1);
}
const force = args.includes('--force');
const onlyArg = args.find((a) => a.startsWith('--only='));
const only = onlyArg ? new Set(onlyArg.split('=')[1].split(',')) : null;
const jobsArg = args.find((a) => a.startsWith('--jobs='));
const JOBS = jobsArg ? Number(jobsArg.split('=')[1]) : 3;

const STYLE = fs.readFileSync(stylePath, 'utf8').trim();

const RULES = `
硬性要求（違反就是失敗）：
- 橫式構圖，長寬比嚴格為 3:2（寬 1536、高 1024），絕對不可以是正方形。
- 內容垂直置中，上下留白平均，不要偏上或偏下。
- 所有文字必須是筆畫清晰、完全正確的繁體中文，不可有錯字、簡體字、日文假名或亂碼。
- 畫面上除了指定的中文字之外，不可出現任何英文字母、數字或其他文字。
- 四個節點大小一致、水平等距排列，不要有一個特別大或位置歪掉。
`.trim();

function buildPrompt(spec) {
  const nodes = spec.steps
    .map((s, i) => `  ${i + 1}. 圖示＝${s.icon}，標籤文字「${s.label}」`)
    .join('\n');

  // 只叫它生圖，不叫它複製檔案 —— 取檔由 driver 從隔離的 CODEX_HOME 直接抓，
  // 避免多個併發 session 搶同一個 generated_images 目錄而拿錯圖。
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

// ── 1. 準備 prompt ──
let specs = JSON.parse(fs.readFileSync(specPath, 'utf8'));
if (only) specs = specs.filter((s) => only.has(s.slug));
const todo = specs.filter((s) => force || !fs.existsSync(path.join(OUT_DIR, `${s.slug}.webp`)));

console.log(`共 ${specs.length} 個規格，需要產生 ${todo.length} 張`);
if (!todo.length) process.exit(0);

fs.rmSync(STAGE, { recursive: true, force: true });
fs.mkdirSync(path.join(STAGE, 'prompts'), { recursive: true });
fs.mkdirSync(path.join(STAGE, 'out'), { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const s of todo) {
  fs.writeFileSync(path.join(STAGE, 'prompts', `${s.slug}.txt`), buildPrompt(s), 'utf8');
}
console.log(`已寫出 ${todo.length} 份 prompt`);

// ── 2. driver：在 home 上併發跑 codex ──
// codex exec 讀 prompt 檔內容當參數；每個 slug 最多重試 2 次。
// 每個 slug 用自己的 CODEX_HOME，generated_images 才不會互相污染。
// 之前三個併發 session 各自跑 `ls -t ~/.codex/generated_images/*/*.png | head -1`，
// 結果兩個 session 抓到同一張圖 —— 這裡直接從隔離目錄取檔，杜絕這件事。
const driver = `#!/bin/bash
BASE="$HOME/${REMOTE}"
cd "$BASE"
mkdir -p out logs homes

run_one() {
  slug="$1"
  BASE="$HOME/${REMOTE}"
  out="$BASE/out/$slug.png"
  [ -s "$out" ] && { echo "SKIP $slug"; return 0; }

  for attempt in 1 2 3; do
    ch="$BASE/homes/$slug"
    rm -rf "$ch"; mkdir -p "$ch"
    cp "$HOME/.codex/auth.json" "$ch/" 2>/dev/null
    cp "$HOME/.codex/config.toml" "$ch/" 2>/dev/null
    cp "$HOME/.codex/installation_id" "$ch/" 2>/dev/null

    # < /dev/null 很重要：透過 ssh 執行時 codex 會把繼承來的 stdin 當成管道輸入，
    # 然後停在「Reading additional input from stdin...」永遠不結束。
    CODEX_HOME="$ch" timeout 900 codex exec --skip-git-repo-check -C "$BASE" \\
      "$(cat "$BASE/prompts/$slug.txt")" < /dev/null > "$BASE/logs/$slug.log" 2>&1

    # 這個 CODEX_HOME 只跑過這一個 session，裡面的 png 必定是它自己的
    png=$(ls -t "$ch"/generated_images/*/*.png 2>/dev/null | head -1)
    if [ -n "$png" ] && [ -s "$png" ]; then
      cp "$png" "$out"
      rm -rf "$ch"
      echo "OK   $slug (try $attempt, $(stat -c%s "$out") bytes)"
      return 0
    fi
    rm -rf "$ch"
    sleep 5
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
fs.writeFileSync(path.join(STAGE, 'driver.sh'), driver, 'utf8');

function sh(cmd, opts = {}) {
  return execFileSync('bash', ['-lc', cmd], { stdio: 'inherit', ...opts });
}

// ssh -n：不要把本地 stdin 轉給遠端，否則 codex 會誤判有管道輸入而卡死
console.log('\n推送 prompt 到 home…');
sh(`ssh -n home 'rm -rf ~/${REMOTE} && mkdir -p ~/${REMOTE}/out ~/${REMOTE}/logs ~/${REMOTE}/homes'`);
sh(`scp -q -r "${path.join(STAGE, 'prompts')}" "${path.join(STAGE, 'driver.sh')}" home:${REMOTE}/`);

console.log(`\n在 home 上執行 codex（併發 ${JOBS}）——這會花一段時間…\n`);
sh(`ssh -n home 'chmod +x ~/${REMOTE}/driver.sh && ~/${REMOTE}/driver.sh'`);

console.log('\n拉回產出…');
sh(`scp -q "home:${REMOTE}/out/*.png" "${path.join(STAGE, 'out')}/" || true`);

// ── 3. 轉 WebP ──
const pngs = fs.readdirSync(path.join(STAGE, 'out')).filter((f) => f.endsWith('.png'));
console.log(`\n轉檔 ${pngs.length} 張 → WebP`);
let ok = 0;
for (const f of pngs) {
  const slug = f.replace(/\.png$/, '');
  const src = path.join(STAGE, 'out', f);
  const dst = path.join(OUT_DIR, `${slug}.webp`);
  try {
    execFileSync('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', src,
      '-vf', 'scale=1200:-2',
      '-c:v', 'libwebp', '-quality', '90', '-compression_level', '6',
      dst,
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
    console.log(`  ✓ ${slug} (${Math.round(fs.statSync(dst).size / 1024)}KB)`);
    ok++;
  } catch (e) {
    console.log(`  ✗ ${slug}：ffmpeg 失敗`);
  }
}

const missing = todo.map((s) => s.slug).filter((s) => !fs.existsSync(path.join(OUT_DIR, `${s}.webp`)));
console.log(`\n完成 ${ok}/${todo.length}`);
if (missing.length) {
  console.log(`缺少 ${missing.length} 個：${missing.join(', ')}`);
  console.log(`重跑：node tools/gen-skill-images-codex.js ${specPath} ${stylePath} --only=${missing.join(',')}`);
  process.exit(1);
}
