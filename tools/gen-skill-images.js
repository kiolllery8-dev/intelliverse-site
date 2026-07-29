#!/usr/bin/env node
/**
 * 依流程圖規格產生技能介紹圖，存成 public/skills-img/<slug>.webp。
 * 用法：node tools/gen-skill-images.js <specs.json> [--only slug1,slug2] [--force]
 *
 * specs.json 是 [{ slug, title, steps: [{ label, icon }] }]
 * 已存在的 .webp 預設會跳過，方便中斷後續跑。
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const OUT_DIR = path.join(__dirname, '..', 'public', 'skills-img');
const TMP_DIR = path.join(OUT_DIR, '_tmp');
const MODEL = 'gpt-image-2-2026-04-21';
const CONCURRENCY = 3;
const MAX_RETRY = 3;

// ── 讀金鑰（skill 的 .env，格式為 KEY=value 或 export KEY=value）──
function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const envPath = path.join(
    process.env.USERPROFILE || process.env.HOME,
    '.claude', 'skills', 'gpt-image-generator', '.env'
  );
  const m = fs.readFileSync(envPath, 'utf8').match(/OPENAI_API_KEY\s*=\s*["']?([^"'\s]+)/);
  if (!m) throw new Error('在 .env 找不到 OPENAI_API_KEY');
  return m[1];
}

function buildPrompt(spec) {
  const cells = spec.steps
    .map((s, i) => `第 ${'一二三四'[i]} 格：圖示畫${s.icon}，圖示下方的標籤文字是「${s.label}」`)
    .join('\n');

  return `極簡商務流程示意圖，橫式構圖。整體內容垂直置中，上下留白平均，不要偏上或偏下。

底色為溫暖米白 #f6f0e1，鋪滿整張圖。

畫面頂端置中有一行大標題，繁體中文，文字為：「${spec.title}」

標題下方是四個等寬等高的圓角方框，由左至右水平等距排列，四個框之間用細的金色 #b8924a 箭頭連接（共三個箭頭）。
每個方框內部：上半部是一個簡潔的金色細線條線性圖示，下半部是繁體中文標籤文字。

${cells}

風格要求：日系極簡風、大量留白、細線條描邊、扁平化設計、無漸層、無陰影、無材質紋理、無立體感，精品質感。
配色只使用米白底 #f6f0e1 與金色 #b8924a 為主，少量藍綠色 #4a8b8b 作為點綴，不要其他顏色。
方框邊框為細金線，框內不填色保持米白。

文字要求（最重要）：所有文字必須是筆畫清晰、完全正確的繁體中文，不可出現錯字、簡體字、日文假名或亂碼。
畫面上除了指定的中文字之外，不可出現任何英文字母、數字或其他文字。`;
}

async function generate(spec, key) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt: buildPrompt(spec),
      size: '1536x1024',
      quality: 'medium',
      n: 1,
    }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || JSON.stringify(json.error));
  const b64 = json.data && json.data[0] && json.data[0].b64_json;
  if (!b64) throw new Error('回應沒有影像資料');
  return Buffer.from(b64, 'base64');
}

// ffmpeg 轉 WebP（本機的 convert 是 Windows 磁碟工具，不是 ImageMagick，千萬別用）
function toWebp(pngPath, webpPath) {
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', pngPath,
    '-vf', 'scale=1200:-2',
    '-c:v', 'libwebp', '-quality', '90', '-compression_level', '6',
    webpPath,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
}

async function run() {
  const args = process.argv.slice(2);
  const specPath = args.find((a) => !a.startsWith('--'));
  if (!specPath) {
    console.error('用法: node tools/gen-skill-images.js <specs.json> [--only a,b] [--force]');
    process.exit(1);
  }
  const force = args.includes('--force');
  const onlyArg = args.find((a) => a.startsWith('--only'));
  const only = onlyArg ? new Set(onlyArg.split('=')[1].split(',')) : null;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  let specs = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  if (only) specs = specs.filter((s) => only.has(s.slug));

  const todo = specs.filter(
    (s) => force || !fs.existsSync(path.join(OUT_DIR, `${s.slug}.webp`))
  );
  console.log(`共 ${specs.length} 個規格，需要產生 ${todo.length} 張（已存在的跳過）`);
  if (!todo.length) return;

  const key = loadKey();
  const failed = [];
  let done = 0;

  // 簡單的固定併發池
  let cursor = 0;
  async function worker(id) {
    while (cursor < todo.length) {
      const spec = todo[cursor++];
      let ok = false;
      for (let attempt = 1; attempt <= MAX_RETRY && !ok; attempt++) {
        try {
          const png = await generate(spec, key);
          const pngPath = path.join(TMP_DIR, `${spec.slug}.png`);
          const webpPath = path.join(OUT_DIR, `${spec.slug}.webp`);
          fs.writeFileSync(pngPath, png);
          toWebp(pngPath, webpPath);
          fs.unlinkSync(pngPath);
          const kb = Math.round(fs.statSync(webpPath).size / 1024);
          console.log(`  ✓ [${++done}/${todo.length}] ${spec.slug} (${kb}KB)`);
          ok = true;
        } catch (e) {
          if (attempt === MAX_RETRY) {
            console.log(`  ✗ ${spec.slug}：${e.message}`);
            failed.push(spec.slug);
          } else {
            await new Promise((r) => setTimeout(r, 3000 * attempt));
          }
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));

  console.log(`\n完成 ${done}/${todo.length}`);
  if (failed.length) {
    console.log(`失敗 ${failed.length} 個：${failed.join(', ')}`);
    console.log(`重跑：node tools/gen-skill-images.js ${specPath} --only=${failed.join(',')}`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error('執行失敗：', e.message);
  process.exit(1);
});
