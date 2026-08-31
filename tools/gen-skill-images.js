#!/usr/bin/env node
/**
 * 用 codex 產生技能情境照 → public/skills-img/<slug>.webp
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
const engineArg = args.find((a) => a.startsWith('--engine='));
const ENGINE = engineArg ? engineArg.split('=')[1] : 'codex';

const STYLE = fs.readFileSync(STYLE_FILE, 'utf8').trim();

/* ---------- 引擎 A：OpenAI gpt-image ---------- */
const GPT_MODEL = 'gpt-image-2-2026-04-21';

function openaiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const p = path.join(
    process.env.USERPROFILE || process.env.HOME,
    '.claude', 'skills', 'gpt-image-generator', '.env'
  );
  const m = fs.readFileSync(p, 'utf8').match(/OPENAI_API_KEY\s*=\s*["']?([^"'\s]+)/);
  if (!m) throw new Error('找不到 OPENAI_API_KEY');
  return m[1];
}

async function gptGenerate(spec, key) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: GPT_MODEL,
      prompt: buildPrompt(spec),
      size: '1536x1024',
      quality: 'medium',
      n: 1,
    }),
  });
  const j = await res.json();
  if (j.error) throw new Error(j.error.message || JSON.stringify(j.error));
  const b64 = j?.data?.[0]?.b64_json;
  if (!b64) throw new Error('回應沒有影像資料');
  return Buffer.from(b64, 'base64');
}

async function runGpt(todo, tmpDir) {
  const key = openaiKey();
  const failed = [];
  let done = 0;
  let cursor = 0;
  async function worker() {
    while (cursor < todo.length) {
      const spec = todo[cursor++];
      let ok = false;
      for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
        try {
          const png = await gptGenerate(spec, key);
          fs.writeFileSync(path.join(tmpDir, `${spec.slug}.png`), png);
          console.log(`  ✓ [${++done}/${todo.length}] ${spec.slug}`);
          ok = true;
        } catch (e) {
          if (attempt === 3) {
            console.log(`  ✗ ${spec.slug}：${e.message}`);
            failed.push(spec.slug);
          } else {
            await new Promise((r) => setTimeout(r, 3000 * attempt));
          }
        }
      }
    }
  }
  await Promise.all(Array.from({ length: JOBS }, worker));
  if (failed.length) console.log(`失敗 ${failed.length} 個：${failed.join(', ')}`);
}

const RULES = `硬性要求（違反就是失敗）：
- 橫式構圖，長寬比嚴格為 3:2（寬 1536、高 1024），絕對不可以是正方形。
- 主體置於右側，左側必須留出乾淨的空白區域給標題，標題不可以壓在主體上。
- 標題文字必須筆畫清晰、完全正確的繁體中文，不可有錯字、簡體字、日文假名或亂碼。
- 除了指定的標題之外，畫面上不可出現任何其他文字、字母或數字，
  紙張、螢幕、包裝上都不可以有可辨識的字。
- 不要出現人臉。可以有手入鏡，但只拍到手部。
- 標題的每個字必須連續緊接排列，字與字之間不可以出現空格或任何間隔符號。`;

function buildPrompt(spec) {
  // 只叫它生圖，不叫它複製檔案 —— 取檔由 driver 從隔離的 CODEX_HOME 直接抓
  return `請生成一張圖片。生成完就結束，不需要複製檔案或做其他事。

=== 畫面內容 ===
${spec.scene}

=== 標題文字 ===
畫面左側的空白區域，一行大字的繁體中文標題，文字內容必須完全是：「${spec.title}」
字體是粗的黑體，深藍綠色 #2f6f6a，字高約佔畫面高度的 12%，垂直置中於左半部。
總共 ${[...spec.title].length} 個字，一個都不能多、不能少、不能寫錯。

=== 攝影風格 ===
${STYLE}

=== ${RULES} ===
`;
}

function loadSpecs() {
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')))
    .filter((o) => o.illustration && o.illustration.scene && o.illustration.title)
    .map((o) => ({ slug: o.slug, title: o.illustration.title, scene: o.illustration.scene }));
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

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let specs = loadSpecs();
  if (only) specs = specs.filter((s) => only.has(s.slug));
  const todo = specs.filter((s) => force || !fs.existsSync(path.join(OUT_DIR, `${s.slug}.webp`)));

  console.log(`${specs.length} 個技能有流程圖規格，需要產生 ${todo.length} 張`);
  if (!todo.length) return;

  const local = ENGINE === "codex" ? hasLocalCodex() : false;
  console.log(ENGINE === 'gpt' ? `引擎：OpenAI ${GPT_MODEL}` : (local ? '引擎：本機 codex' : '引擎：codex（走 ssh home）'));

  const stage = path.join(ROOT, '.codex-img');
  fs.rmSync(stage, { recursive: true, force: true });
  fs.mkdirSync(path.join(stage, 'prompts'), { recursive: true });
  fs.mkdirSync(path.join(stage, 'out'), { recursive: true });
  for (const s of todo) {
    fs.writeFileSync(path.join(stage, 'prompts', `${s.slug}.txt`), buildPrompt(s), 'utf8');
  }

  let pngDir;
  if (ENGINE === 'gpt') {
    pngDir = path.join(stage, 'out');
    await runGpt(todo, pngDir);
  } else if (local) {
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

main().catch((e) => { console.error("執行失敗：", e.message); process.exit(1); });
