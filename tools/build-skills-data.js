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

  // ── 第三批 ──
  // ZeroPointRepo/youtube-skills（438 stars）
  'transcript':        { repo: 'ZeroPointRepo/youtube-skills', p: 'skills/transcript',        stars: '438' },
  'youtube-search':    { repo: 'ZeroPointRepo/youtube-skills', p: 'skills/youtube-search',    stars: '438' },
  'youtube-channels':  { repo: 'ZeroPointRepo/youtube-skills', p: 'skills/youtube-channels',  stars: '438' },
  'youtube-playlist':  { repo: 'ZeroPointRepo/youtube-skills', p: 'skills/youtube-playlist',  stars: '438' },
  // ComposioHQ/awesome-claude-skills（70,983 stars）
  'brand-guidelines':  { repo: 'ComposioHQ/awesome-claude-skills', p: 'brand-guidelines', stars: '70,983' },
  'canvas-design':     { repo: 'ComposioHQ/awesome-claude-skills', p: 'canvas-design',    stars: '70,983' },
  'webapp-testing':    { repo: 'ComposioHQ/awesome-claude-skills', p: 'webapp-testing',   stars: '70,983' },
  // obra/superpowers（262,891 stars）
  'brainstorming':     { repo: 'obra/superpowers', p: 'skills/brainstorming', stars: '262,891' },
  'writing-plans':     { repo: 'obra/superpowers', p: 'skills/writing-plans', stars: '262,891' },
  // addyosmani/agent-skills（80,825 stars）
  'planning-and-task-breakdown': { repo: 'addyosmani/agent-skills', p: 'skills/planning-and-task-breakdown', stars: '80,825' },
  // vercel-labs/agent-skills（29,584 stars）
  'web-design-guidelines': { repo: 'vercel-labs/agent-skills', p: 'skills/web-design-guidelines', stars: '29,584' },
  'writing-guidelines':    { repo: 'vercel-labs/agent-skills', p: 'skills/writing-guidelines',    stars: '29,584' },
  // alirezarezvani/claude-skills（23,256 stars）
  'contract-and-proposal-writer': { repo: 'alirezarezvani/claude-skills', p: 'business-growth/skills/contract-and-proposal-writer', stars: '23,256' },
  'customer-success-manager':     { repo: 'alirezarezvani/claude-skills', p: 'business-growth/skills/customer-success-manager',     stars: '23,256' },
  'rfp-responder':                { repo: 'alirezarezvani/claude-skills', p: 'commercial/skills/rfp-responder',                     stars: '23,256' },
  'competitive-teardown':         { repo: 'alirezarezvani/claude-skills', p: 'product-team/skills/competitive-teardown',            stars: '23,256' },
  'ui-design-system':             { repo: 'alirezarezvani/claude-skills', p: 'product-team/skills/ui-design-system',                stars: '23,256' },
  'landing-page-generator':       { repo: 'alirezarezvani/claude-skills', p: 'product-team/skills/landing-page-generator',          stars: '23,256' },
  'experiment-designer':          { repo: 'alirezarezvani/claude-skills', p: 'product-team/skills/experiment-designer',             stars: '23,256' },
  'capacity-planner':             { repo: 'alirezarezvani/claude-skills', p: 'business-operations/skills/capacity-planner',         stars: '23,256' },

  // ── 第四批 ──
  // 影音：長影片自動剪成短影音
  'youtube-shorts-generator': { repo: 'Anil-matcha/AI-Youtube-Shorts-Generator', p: '.claude/skills/youtube-shorts-generator', stars: '4,415' },
  'ai-clipping':              { repo: 'SamurAIGPT/Generative-Media-Skills',      p: 'library/edit/ai-clipping',                stars: '3,930' },
  'clipify':                  { repo: 'louisedesadeleer/clipify',                p: '',                                        stars: '491' },
  // 文件與行政
  'legal-compare':      { repo: 'zubair-trabzada/ai-legal-claude',  p: 'skills/legal-compare',    stars: '1,596' },
  'ai-meeting-notes':   { repo: 'LeoYeAI/openclaw-master-skills',   p: 'skills/ai-meeting-notes', stars: '2,110' },
  'slide-maker':        { repo: 'addsumtech/slides_maker',          p: 'skills/slide-maker',      stars: '329' },
  'mineru':             { repo: 'Nebutra/MinerU-Skill',             p: '',                        stars: '87' },
  'financial-parser':   { repo: 'OneWave-AI/claude-skills',         p: 'financial-parser',        stars: '230' },
  // 電商經營
  'product-description-generator': { repo: 'nexscope-ai/eCommerce-Skills', p: 'product-description-generator', stars: '513' },
  'price-optimization-tool':       { repo: 'nexscope-ai/eCommerce-Skills', p: 'price-optimization-tool',       stars: '513' },
  'inventory-reorder-planner':     { repo: 'OneWave-AI/claude-skills',     p: 'inventory-reorder-planner',     stars: '230' },
  'ecom-rfm-analysis':             { repo: 'asgard-ai-platform/skills',    p: 'ecom-rfm-analysis',             stars: '222' },
  'tw-einvoice-guide':             { repo: 'asgard-ai-platform/skills',    p: 'tw-einvoice-guide',             stars: '222' },
  'angry-customer-playbook':       { repo: 'composio-community/support-skills', p: 'angry-customer-playbook',  stars: '13' },
  'ecommerce-customer-service-pro': { repo: 'dvcrn/openclaw-skills-marketplace', p: 'plugins/52yuanchangxing--ecommerce-customer-service-pro/skills/ecommerce-customer-service-pro', stars: '27' },
  // 營運管理
  'tw-tax-basics':             { repo: 'asgard-ai-platform/skills',     p: 'tw-tax-basics',             stars: '222' },
  'cash-flow-forecast':        { repo: 'mohitagw15856/pm-claude-skills', p: 'skills/cash-flow-forecast', stars: '1,237' },
  'cowork-invoice-chaser':     { repo: 'OneWave-AI/claude-skills',      p: 'cowork-invoice-chaser',     stars: '230' },
  'job-profitability-analyzer':{ repo: 'OneWave-AI/claude-skills',      p: 'job-profitability-analyzer', stars: '230' },
  // 設計創意
  'html-ppt':             { repo: 'lewislulu/html-ppt-skill',        p: '', stars: '7,465' },
  'social-card-maker':    { repo: 'op7418/guizang-social-card-skill', p: '', stars: '5,659' },
  'power-design':         { repo: 'ItsssssJack/power-design',         p: '', stars: '573' },
  'image-prompt-advisor': { repo: 'YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill', p: '', stars: '1,787' },
  // 行銷 / 業務
  'last30days': { repo: 'mvanhorn/last30days-skill',   p: 'skills/last30days',              stars: '54,803' },
  'cold-email': { repo: 'alirezarezvani/claude-skills', p: 'marketing-skill/skills/cold-email', stars: '23,407' },
};

/**
 * 台灣用語修正表。
 * 第一、二批文章是舊 workflow 產的，漏了幾個中國用語；journal 不能改，
 * 所以在這裡統一過濾，之後重建也不會跑掉。
 * 只放「確定是中國用語」的：像「點擊率」「菜單」「矩陣」台灣數位行銷本來就這樣講，不要動。
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

// 索引頁的分類顯示順序
const CATEGORY_ORDER = [
  '文件整理', '行銷內容', '影音內容', '電商經營', '設計創意',
  '開發工程', '業務開發', '營運管理',
];

// --diagrams=<file>：補上流程圖規格（既有技能的 diagram 不在文章 journal 裡）
const diagArg = process.argv.slice(2).find((a) => a.startsWith('--diagrams='));
const DIAGRAMS = new Map();
if (diagArg) {
  const dp = diagArg.split('=')[1];
  for (const d of JSON.parse(fs.readFileSync(dp, 'utf8'))) DIAGRAMS.set(d.slug, d);
  console.log(`載入 ${DIAGRAMS.size} 份流程圖規格`);
}

const journalPaths = process.argv.slice(2).filter((a) => !a.startsWith('--'));
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
    const a = twSanitize(bySlug.get(slug));
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
      // p 為空代表 SKILL.md 就在 repo 根目錄，這時連到 repo 首頁就好
      sourceUrl: src.p
        ? `https://github.com/${src.repo}/tree/main/${src.p}`
        : `https://github.com/${src.repo}`,
      // 流程示意圖：由 tools/gen-skill-images.js 產生，檔案存在才掛上去
      image: fs.existsSync(path.join(__dirname, '..', 'public', 'skills-img', `${slug}.webp`))
        ? `/skills-img/${slug}.webp`
        : null,
      imageAlt: (() => {
        const d = a.diagram || DIAGRAMS.get(slug);
        return d
          ? `${d.title}流程圖：${(d.steps || []).map((s) => s.label).join('、')}`
          : `${a.nameZh}流程示意圖`;
      })(),
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

const outPath = path.join(__dirname, '..', 'app', 'skills-data.ts');
fs.writeFileSync(outPath, header, 'utf8');
console.log(`✓ 已寫入 ${outPath}（${articles.length} 個技能）`);

// 分類統計
const counts = {};
for (const a of articles) counts[a.category] = (counts[a.category] || 0) + 1;
console.log('分類分佈:', JSON.stringify(counts, null, 0));
