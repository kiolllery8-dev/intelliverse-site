import type { Metadata } from 'next';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { SKILLS, skillsByCategory } from '../skills-data';
import { catSlug } from '../skill-categories';

const SITE_URL = 'https://show.intelliverse.tw';

export const metadata: Metadata = {
  title: 'AI 技能圖書館｜GitHub 熱門 Agent Skills 繁體中文指南',
  description:
    '靈境智造整理 GitHub 上最熱門的 AI Agent Skills，翻譯成繁體中文並改寫成台灣中小企業看得懂的實用指南。從發票整理、競品廣告拆解到商品圖優化，一次看懂 AI 能幫你省下哪些重複工作。',
  keywords: [
    'AI 技能',
    'Agent Skills',
    'Claude Skills 中文',
    'AI 工具 推薦',
    'AI 自動化 教學',
    'AI 幫忙做事',
    '中小企業 AI 應用',
    '電商 AI 工具',
    'AI 技能 繁體中文',
  ],
  alternates: { canonical: '/skills/' },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: `${SITE_URL}/skills/`,
    title: 'AI 技能圖書館｜GitHub 熱門 Agent Skills 繁體中文指南',
    description:
      '把 GitHub 上最紅的 AI Agent Skills 翻成繁體中文，並改寫成台灣老闆看得懂的用法說明。',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function SkillsIndex() {
  const groups = skillsByCategory();

  return (
    <>
      <SiteNav base="/" />

      <main>
        <header id="top" className="page-hero">
          <div className="shell">
            <nav className="crumbs" aria-label="麵包屑">
              <a href="/">首頁</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">AI 技能圖書館</span>
            </nav>
            <p className="page-kicker">
              <span aria-hidden="true" /> SKILL LIBRARY · 技能圖書館
            </p>
            <h1>
              AI 能幫你做的事，<br />
              比你想的還多。
            </h1>
            <p className="page-lede">你都不會，我們幫你。</p>
            <div className="page-meta">
              <div><b>{SKILLS.length}</b><span>SKILLS</span></div>
              <div><b>{groups.length}</b><span>CATEGORIES</span></div>
              <div><b>3</b><span>SOURCE REPOS</span></div>
            </div>
          </div>
        </header>

        <section className="skills-section">
          <div className="shell">
            {groups.map((g) => (
              <div key={g.category} className="skill-group" id={`cat-${catSlug(g.category)}`}>
                <div className="skill-group-head">
                  <h2>{g.category}</h2>
                  <span>{g.items.length} 個技能</span>
                </div>
                <div className="skill-grid">
                  {g.items.map((s) => (
                    <a key={s.slug} href={`/skills/${s.slug}/`} className="skill-card">
                      <div className="skill-card-cat">{s.category}</div>
                      <h3>{s.nameZh}</h3>
                      <p className="skill-card-en">{s.nameEn}</p>
                      <p className="skill-card-tagline">{s.tagline}</p>
                      <p className="skill-card-pain">{s.painPoint}</p>
                      <span className="skill-card-more">看完整用法 <em>→</em></span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <aside className="skills-cta">
              <div>
                <h2>看完覺得「這個我也想用」？</h2>
                <p>
                  這些技能單獨用已經很有幫助，但真正省時間的是把它們串成一條固定跑的流程。
                  我們替客戶做過蝦皮每日置頂、MOMO 售更多排程這類自動化代管，
                  也能依你的營運節奏設計一套。
                </p>
              </div>
              <div className="skills-cta-actions">
                <a href="/#automation" className="btn-primary">看 AI 自動化代管服務</a>
                <a
                  href="mailto:linsonder6@gmail.com?subject=AI%20%E6%8A%80%E8%83%BD%E5%B0%8E%E5%85%A5%E8%A9%A2%E5%95%8F"
                  className="btn-ghost"
                >
                  直接寫信聊聊
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
