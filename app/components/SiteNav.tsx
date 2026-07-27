import { WORKS, TYPES } from '../content';

/**
 * 共用主選單。
 * base = '' 時錨點指向本頁（首頁用）；base = '/' 時錨點指回首頁（子頁面用）。
 */
export default function SiteNav({ base = '' }: { base?: string }) {
  const h = (anchor: string) => `${base}#${anchor}`;

  return (
    <>
      <a href={base ? `${base}#top` : '#top'} className="skip-link">跳到主內容</a>
      <nav className="nav" id="nav" aria-label="主選單">
        <div className="shell nav-inner">
          <a href={base || '#top'} className="logo" aria-label="靈境智造首頁">
            靈境<em>·</em>智造
          </a>
          <ul className="nav-links" role="menubar">
            <li role="none"><a role="menuitem" href={h('about')}>關於我們</a></li>
            <li role="none"><a role="menuitem" href={h('services')}>服務項目</a></li>
            <li role="none" className="has-sub">
              <a role="menuitem" href={h('types')} aria-haspopup="true">合作方式</a>
              <ul className="nav-sub" role="menu">
                <li role="none"><a role="menuitem" href={h('automation')}>AI 自動化代管</a></li>
                {TYPES.map((t) => (
                  <li role="none" key={t.id}>
                    <a role="menuitem" href={h(t.id)}>{t.title}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li role="none" className="has-sub">
              <a role="menuitem" href={h('works')} aria-haspopup="true">作品</a>
              <ul className="nav-sub" role="menu">
                {WORKS.map((w) => (
                  <li role="none" key={w.slug}>
                    <a role="menuitem" href={h(w.slug)}>{w.title}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li role="none"><a role="menuitem" href="/skills/">AI 技能庫</a></li>
            <li role="none">
              <a
                role="menuitem"
                href="https://tools.intelliverse.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-external"
              >
                小工具 <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li role="none"><a role="menuitem" href={h('faq')}>常見問答</a></li>
            <li role="none"><a role="menuitem" href={h('contact')}>聯絡</a></li>
          </ul>
          <a href="mailto:linsonder6@gmail.com" className="nav-mail">linsonder6@gmail.com</a>
          <a href="#menu" className="nav-toggle" aria-label="開啟選單">
            <span /><span /><span />
          </a>
        </div>
        <div className="nav-drawer" id="menu">
          <a href="#menu-close" className="nav-drawer-close" aria-label="關閉選單">✕</a>
          <div className="nav-drawer-links">
            <a href={h('about')}>關於我們</a>
            <a href={h('services')}>服務項目</a>
            <div className="nav-drawer-group">
              <span className="nav-drawer-group-label">合作方式</span>
              <a href={h('automation')}>AI 自動化代管</a>
              {TYPES.map((t) => (
                <a key={t.id} href={h(t.id)}>{t.title}</a>
              ))}
            </div>
            <div className="nav-drawer-group">
              <span className="nav-drawer-group-label">作品</span>
              {WORKS.map((w) => (
                <a key={w.slug} href={h(w.slug)}>{w.title}</a>
              ))}
            </div>
            <a href="/skills/">AI 技能庫</a>
            <a href="https://tools.intelliverse.tw" target="_blank" rel="noopener noreferrer">小工具 ↗</a>
            <a href={h('faq')}>常見問答</a>
            <a href={h('contact')}>聯絡</a>
          </div>
          <a href="mailto:linsonder6@gmail.com" className="nav-drawer-mail">✦ linsonder6@gmail.com</a>
        </div>
        <a href="#menu-close" className="nav-drawer-backdrop" aria-hidden="true" id="menu-close" tabIndex={-1} />
      </nav>
    </>
  );
}
