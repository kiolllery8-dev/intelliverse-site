import { SKILLS, skillsByCategory } from '../skills-data';
import { WORKS } from '../content';

export const dynamic = 'force-static';

const SITE_URL = 'https://show.intelliverse.tw';

/**
 * /llms.txt —— 給 ChatGPT、Claude、Perplexity 這類 AI 看的網站導覽（llmstxt.org 格式）。
 *
 * 文字一律沿用站上既有的說法（layout.tsx 的 SITE_DESC、服務 schema、技能資料），
 * 不另外寫一套 —— AI 引用到的內容必須跟網頁上看到的一致。
 */
export function GET() {
  const lines: string[] = [];
  lines.push('# 靈境智造 Intelliverse Studio');
  lines.push('');
  lines.push(
    '> 位於臺中太平的整合型設計工作室，結合科技、設計與商業思維。服務範圍橫跨軟硬體整合、AI 自動工作流程、商品設計、網頁開發、一頁式廣告與投放策略，陪品牌從點子走到市場。'
  );
  lines.push('');
  lines.push('- 地址：臺中市太平區精美路 122 號');
  lines.push('- 聯絡：linsonder6@gmail.com／+886 926-213-896');
  lines.push('- 服務時間：週一至週五 10:00–23:00');
  lines.push('- 語言：繁體中文（台灣）');
  lines.push('');

  lines.push('## 服務');
  lines.push('');
  lines.push(`- [軟硬體整合設計](${SITE_URL}/#services)：從電子元件選型、韌體開發到後端資料流，替物聯網產品、智慧零售設備與商業場域裝置打造軟硬整合方案。`);
  lines.push(`- [AI 自動化代管](${SITE_URL}/#automation)：目前實作過蝦皮（每日商品置頂）與 MOMO（每週售更多降價排程）的自動化代管，也能依需求擴充到 PChome、樂天、自架電商與 LINE 商店。`);
  lines.push(`- [網頁設計與開發](${SITE_URL}/#services)：品牌官網、產品形象頁到電商系統，以使用者體驗為核心。`);
  lines.push(`- [廣告投放與行銷策略](${SITE_URL}/#services)：操作 Meta、Google、LINE 等媒體，從受眾定義、素材製作到轉換追蹤。`);
  lines.push(`- [商品設計與品牌規劃](${SITE_URL}/#services)：從產品結構、包裝設計到品牌識別系統。`);
  lines.push('');

  lines.push('## AI 技能圖書館');
  lines.push('');
  lines.push(
    `靈境智造把 GitHub 上熱門的 ${SKILLS.length} 個開源 AI Agent Skills 翻成繁體中文，並改寫成台灣中小企業、電商賣家、接案設計師看得懂的使用指南。每篇都附原始 GitHub 出處。`
  );
  lines.push('');
  lines.push(`- [技能圖書館總覽](${SITE_URL}/skills/)`);
  lines.push(`- [全部技能的完整內容](${SITE_URL}/llms-full.txt)：適合一次讀入的純文字版`);
  lines.push('');

  for (const g of skillsByCategory()) {
    lines.push(`### ${g.category}`);
    lines.push('');
    for (const s of g.items) {
      lines.push(`- [${s.nameZh}](${SITE_URL}/skills/${s.slug}/)：${s.tagline}`);
    }
    lines.push('');
  }

  lines.push('## 作品');
  lines.push('');
  for (const w of WORKS) {
    lines.push(`- [${w.title}](${w.url})`);
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
