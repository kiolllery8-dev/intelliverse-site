#!/usr/bin/env node
/**
 * 讀 data/skills/*.json，產生 app/skills-data.ts。
 * 用法：node tools/build-skills-data.js
 *
 * 每個技能就是一個檔案，內容自足（含來源 repo、流程圖規格、顯示順序），
 * 所以新增一個技能＝新增一個 JSON 檔，不用改這支程式。
 *
 * 之前的版本是從 workflow 的 journal.jsonl 萃取，但那些檔案在暫存目錄裡，
 * 換台機器或雲端 agent 就重建不出來。改成 repo 內的檔案才是可重現的。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data', 'skills');
const OUT = path.join(ROOT, 'app', 'skills-data.ts');
const IMG_DIR = path.join(ROOT, 'public', 'skills-img');

// 索引頁的分類顯示順序
const CATEGORY_ORDER = [
  '文件整理', '行銷內容', '影音內容', '電商經營', '設計創意',
  '開發工程', '業務開發', '營運管理',
];

/**
 * 台灣用語修正表。
 * 早期幾批文章漏了一些中國用語，統一在這裡過濾，重建也不會跑掉。
 * 只放「確定是中國用語」的：「點擊率」「菜單」「矩陣」台灣數位行銷本來就這樣講，不要動。
 */
const TERM_FIXES = [
  [/落地頁/g, '銷售頁'],
  [/第一屏/g, '第一眼'],
  [/一鍵取消/g, '按一下就取消'],
];

function twSanitize(value) {
  if (typeof value === 'string') {
    return TERM_FIXES.reduce((s, [re, to]) => s.replace(re, to), value);
  }
  if (Array.isArray(value)) return value.map(twSanitize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, twSanitize(v)]));
  }
  return value;
}

const REQUIRED = [
  'slug', 'nameEn', 'nameZh', 'category', 'tagline', 'summary', 'painPoint',
  'whatItDoes', 'scenarios', 'howToUse', 'examplePrompt', 'exampleResult',
  'tips', 'bestFor', 'keywords', 'source',
];

if (!fs.existsSync(DATA_DIR)) {
  console.error('找不到資料目錄:', DATA_DIR);
  process.exit(1);
}

const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
if (!files.length) {
  console.error('data/skills/ 裡沒有任何 JSON');
  process.exit(1);
}

const raw = [];
const problems = [];
for (const f of files) {
  let o;
  try {
    o = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
  } catch (e) {
    problems.push(`${f}：JSON 解析失敗 — ${e.message}`);
    continue;
  }
  const missing = REQUIRED.filter((k) => o[k] === undefined || o[k] === null || o[k] === '');
  if (missing.length) {
    problems.push(`${f}：缺少欄位 ${missing.join(', ')}`);
    continue;
  }
  if (o.slug !== f.replace(/\.json$/, '')) {
    problems.push(`${f}：slug「${o.slug}」與檔名不符`);
    continue;
  }
  if (!CATEGORY_ORDER.includes(o.category)) {
    problems.push(`${f}：分類「${o.category}」不在允許清單`);
    continue;
  }
  raw.push(o);
}

if (problems.length) {
  console.error('資料有問題，停止產生：');
  for (const p of problems) console.error('  ✗', p);
  process.exit(1);
}

const dupSlug = raw.map((s) => s.slug).filter((s, i, a) => a.indexOf(s) !== i);
if (dupSlug.length) {
  console.error('slug 重複：', dupSlug.join(', '));
  process.exit(1);
}

// order 決定上下篇導覽順序；沒填的排到最後，同分再依 slug
raw.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || a.slug.localeCompare(b.slug));

const articles = raw.map((r) => {
  const a = twSanitize(r);
  const hasImg = fs.existsSync(path.join(IMG_DIR, `${a.slug}.webp`));
  const d = a.diagram;
  return {
    slug: a.slug,
    nameEn: a.nameEn,
    nameZh: a.nameZh,
    category: a.category,
    tagline: a.tagline,
    summary: a.summary,
    painPoint: a.painPoint,
    whatItDoes: a.whatItDoes || [],
    scenarios: a.scenarios || [],
    howToUse: a.howToUse || [],
    examplePrompt: a.examplePrompt,
    exampleResult: a.exampleResult,
    tips: a.tips || [],
    bestFor: a.bestFor,
    keywords: a.keywords || [],
    sourceRepo: a.source.repo,
    sourceRepoName: a.source.repo.split('/')[1],
    sourceStars: a.source.stars,
    // path 為空代表 SKILL.md 就在 repo 根目錄，連到 repo 首頁就好
    sourceUrl: a.source.path
      ? `https://github.com/${a.source.repo}/tree/main/${a.source.path}`
      : `https://github.com/${a.source.repo}`,
    image: hasImg ? `/skills-img/${a.slug}.webp` : null,
    imageAlt: d
      ? `${d.title}流程圖：${(d.steps || []).map((s) => s.label).join('、')}`
      : `${a.nameZh}流程示意圖`,
  };
});

const header = `/**
 * AI 技能圖書館資料。
 * 來源：GitHub 上熱門的社群 Agent Skills 開源專案，
 * 由靈境智造整理、翻譯並改寫為繁體中文使用指南。
 *
 * 此檔由 tools/build-skills-data.js 從 data/skills/*.json 自動產生，請勿手動編輯。
 * 要新增技能：在 data/skills/ 放一個新的 JSON，再跑 npm run build:skills。
 */

export type SkillScenario = { title: string; body: string };
export type SkillStep = { step: string; detail: string };

export type Skill = {
  slug: string;
  nameEn: string;
  nameZh: string;
  category: string;
  tagline: string;
  summary: string;
  painPoint: string;
  whatItDoes: string[];
  scenarios: SkillScenario[];
  howToUse: SkillStep[];
  examplePrompt: string;
  exampleResult: string;
  tips: string[];
  bestFor: string;
  keywords: string[];
  sourceRepo: string;
  sourceRepoName: string;
  sourceStars: string;
  sourceUrl: string;
  image: string | null;
  imageAlt: string;
};

export const SKILL_CATEGORIES = ${JSON.stringify(CATEGORY_ORDER, null, 2)} as const;

export const SKILLS: Skill[] = ${JSON.stringify(articles, null, 2)};

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function skillsByCategory(): { category: string; items: Skill[] }[] {
  return SKILL_CATEGORIES.map((category) => ({
    category,
    items: SKILLS.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);
}
`;

fs.writeFileSync(OUT, header, 'utf8');

const counts = {};
for (const a of articles) counts[a.category] = (counts[a.category] || 0) + 1;
const noImg = articles.filter((a) => !a.image);

console.log(`✓ ${articles.length} 個技能 → ${path.relative(ROOT, OUT)}`);
console.log('  分類:', JSON.stringify(counts));
console.log(`  有圖: ${articles.length - noImg.length}/${articles.length}`);
if (noImg.length) console.log('  缺圖:', noImg.map((a) => a.slug).join(', '));
