import { SKILLS } from '../skills-data';

export const dynamic = 'force-static';

const SITE_URL = 'https://show.intelliverse.tw';

/**
 * /llms-full.txt —— 77 篇技能指南的完整純文字版，讓 AI 一次讀完，不用逐頁爬 HTML。
 * 內容直接從 skills-data 輸出，跟網頁上的文字一字不差。
 */
export function GET() {
  const out: string[] = [];
  out.push('# 靈境智造 AI 技能圖書館（完整內容）');
  out.push('');
  out.push(
    `> ${SKILLS.length} 個 GitHub 開源 AI Agent Skills 的繁體中文使用指南，由靈境智造 Intelliverse Studio（臺中）整理改寫。來源：${SITE_URL}/skills/`
  );
  out.push('');

  for (const s of SKILLS) {
    out.push('---');
    out.push('');
    out.push(`## ${s.nameZh}（${s.nameEn}）`);
    out.push('');
    out.push(`- 網址：${SITE_URL}/skills/${s.slug}/`);
    out.push(`- 分類：${s.category}`);
    out.push(`- 原始出處：https://github.com/${s.sourceRepo}（GitHub ${s.sourceStars} stars）`);
    if (s.updatedAt) out.push(`- 最後更新：${s.updatedAt}`);
    out.push(`- 適合：${s.bestFor}`);
    out.push('');
    out.push(s.summary);
    out.push('');
    out.push(`**解決什麼問題**：${s.painPoint}`);
    out.push('');
    out.push('**它會做的事**');
    for (const w of s.whatItDoes) out.push(`- ${w}`);
    out.push('');
    out.push('**怎麼用**');
    s.howToUse.forEach((h, i) => out.push(`${i + 1}. ${h.step}：${h.detail}`));
    out.push('');
    out.push('**實用提醒**');
    for (const t of s.tips) out.push(`- ${t}`);
    out.push('');
    if (s.faq.length) {
      out.push('**常見問題**');
      for (const f of s.faq) {
        out.push(`- 問：${f.q}`);
        out.push(`  答：${f.a}`);
      }
      out.push('');
    }
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
