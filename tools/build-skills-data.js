#!/usr/bin/env node
/**
 * 從 workflow 的 journal.jsonl 萃取文章資料，產生 app/skills-data.ts。
 * 用法：node tools/build-skills-data.js <journal.jsonl> [更多 journal...]
 * 可傳多個 journal（多批 workflow 的產出），後面的覆蓋前面的同名 slug。
 */
const fs = require('fs');
const path = require('path');

const SOURCES = {
  'invoice-organizer':          { repo: 'ComposioHQ/awesome-claude-skills', p: 'invoice-organizer',           stars: '70,983' },
  'file-organizer':             { repo: 'ComposioHQ/awesome-claude-skills', p: 'file-organizer',              stars: '70,983' },
  'meeting-insights-analyzer':  { repo: 'ComposioHQ/awesome-claude-skills', p: 'meeting-insights-analyzer',   stars: '70,983' },
  'competitive-ads-extractor':  { repo: 'ComposioHQ/awesome-claude-skills', p: 'competitive-ads-extractor',   stars: '70,983' },
  'content-research-writer':    { repo: 'ComposioHQ/awesome-claude-skills', p: 'content-research-writer',     stars: '70,983' },
  'image-enhancer':             { repo: 'ComposioHQ/awesome-claude-skills', p: 'image-enhancer',              stars: '70,983' },
  'lead-research-assistant':    { repo: 'ComposioHQ/awesome-claude-skills', p: 'lead-research-assistant',     stars: '70,983' },
  'domain-name-brainstormer':   { repo: 'ComposioHQ/awesome-claude-skills', p: 'domain-name-brainstormer',    stars: '70,983' },
  'twitter-algorithm-optimizer':{ repo: 'ComposioHQ/awesome-claude-skills', p: 'twitter-algorithm-optimizer', stars: '70,983' },
  'raffle-winner-picker':       { repo: 'ComposioHQ/awesome-claude-skills', p: 'raffle-winner-picker',        stars: '70,983' },
  'tailored-resume-generator':  { repo: 'ComposioHQ/awesome-claude-skills', p: 'tailored-resume-generator',   stars: '70,983' },
  'video-downloader':           { repo: 'ComposioHQ/awesome-claude-skills', p: 'video-downloader',            stars: '70,983' },
  'changelog-generator':        { repo: 'ComposioHQ/awesome-claude-skills', p: 'changelog-generator',         stars: '70,983' },
  'shopify-expert':             { repo: 'Jeffallan/claude-skills',          p: 'skills/shopify-expert',       stars: '10,747' },
  'wordpress-pro':              { repo: 'Jeffallan/claude-skills',          p: 'skills/wordpress-pro',        stars: '10,747' },
  'prompt-engineer':            { repo: 'Jeffallan/claude-skills',          p: 'skills/prompt-engineer',      stars: '10,747' },
  'security-reviewer':          { repo: 'Jeffallan/claude-skills',          p: 'skills/security-reviewer',    stars: '10,747' },
  'dev-browser':                { repo: 'SawyerHood/dev-browser',           p: 'skills/dev-browser',          stars: '6,479' },

  // ── 第二批：alirezarezvani/claude-skills（23,256 stars）──
  'local-seo-manager':    { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/local-seo-manager',    stars: '23,256' },
  'paid-ads':             { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/paid-ads',             stars: '23,256' },
  'copywriting':          { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/copywriting',          stars: '23,256' },
  'pricing-strategy':     { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/pricing-strategy',     stars: '23,256' },
  'seo-audit':            { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/seo-audit',            stars: '23,256' },
  'page-cro':             { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/page-cro',             stars: '23,256' },
  'social-media-manager': { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/social-media-manager', stars: '23,256' },
  'email-sequence':       { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/email-sequence',       stars: '23,256' },
  'churn-prevention':     { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/churn-prevention',     stars: '23,256' },
  'ad-creative':          { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/ad-creative',          stars: '23,256' },
  'schema-markup':        { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/schema-markup',        stars: '23,256' },
  'process-mapper':       { repo: 'alirezarezvani/claude-skills', p: 'business-operations/skills/process-mapper',   stars: '23,256' },
  'vendor-management':    { repo: 'alirezarezvani/claude-skills', p: 'business-operations/skills/vendor-management',stars: '23,256' },
  'financial-analyst':    { repo: 'alirezarezvani/claude-skills', p: 'finance/skills/financial-analyst',            stars: '23,256' },
};

// 索引頁的分類顯示順序
const CATEGORY_ORDER = [
  '文件整理', '行銷內容', '電商經營', '設計創意',
  '開發工程', '業務開發', '營運管理',
];

const journalPaths = process.argv.slice(2);
if (!journalPaths.length) {
  console.error('用法: node tools/build-skills-data.js <journal.jsonl> [更多 journal...]');
  process.exit(1);
}
for (const jp of journalPaths) {
  if (!fs.existsSync(jp)) {
    console.error('找不到 journal 檔案:', jp);
    process.exit(1);
  }
}

const lines = journalPaths.flatMap((jp) =>
  fs.readFileSync(jp, 'utf8').split('\n').filter(Boolean)
);

// 後出現的覆蓋先出現的 —— Fix 階段的結果會蓋掉 Write 階段的
const bySlug = new Map();
let parsed = 0;
for (const line of lines) {
  let entry;
  try { entry = JSON.parse(line); } catch { continue; }
  const articles = entry?.result?.articles;
  if (!Array.isArray(articles)) continue;
  parsed++;
  for (const a of articles) {
    if (a && typeof a.slug === 'string') bySlug.set(a.slug, a);
  }
}

console.log(`解析 ${parsed} 筆 agent 結果，取得 ${bySlug.size} 個唯一技能`);

const known = Object.keys(SOURCES);
const missing = known.filter((s) => !bySlug.has(s));
const unexpected = [...bySlug.keys()].filter((s) => !SOURCES[s]);
if (missing.length) console.warn('⚠ 缺少:', missing.join(', '));
if (unexpected.length) console.warn('⚠ 非預期的 slug:', unexpected.join(', '));

// 依 SOURCES 的順序輸出，確保上下篇導覽順序穩定
const articles = known
  .filter((slug) => bySlug.has(slug))
  .map((slug) => {
    const a = bySlug.get(slug);
    const src = SOURCES[slug];
    return {
      slug: a.slug,
      nameEn: a.nameEn,
      nameZh: a.nameZh,
      category: CATEGORY_ORDER.includes(a.category) ? a.category : '開發工程',
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
      sourceRepo: src.repo,
      sourceRepoName: src.repo.split('/')[1],
      sourceStars: src.stars,
      sourceUrl: `https://github.com/${src.repo}/tree/main/${src.p}`,
    };
  });

const header = `/**
 * AI 技能圖書館資料。
 * 來源：GitHub 上最熱門的社群 Agent Skills 開源專案，
 * 由靈境智造整理、翻譯並改寫為繁體中文使用指南。
 *
 * 此檔由 tools/build-skills-data.js 自動產生，請勿手動編輯。
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

const outPath = path.join(__dirname, '..', 'app', 'skills-data.ts');
fs.writeFileSync(outPath, header, 'utf8');
console.log(`✓ 已寫入 ${outPath}（${articles.length} 個技能）`);

// 分類統計
const counts = {};
for (const a of articles) counts[a.category] = (counts[a.category] || 0) + 1;
console.log('分類分佈:', JSON.stringify(counts, null, 0));
