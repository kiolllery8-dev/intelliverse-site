import { FAQ, WORKS, TYPES } from './content';

export default function Home() {
  return (
    <>
      <a href="#top" className="skip-link">跳到主內容</a>
      <nav className="nav" id="nav" aria-label="主選單">
        <div className="shell nav-inner">
          <a href="#top" className="logo" aria-label="靈境智造首頁">
            靈境<em>·</em>智造
          </a>
          <ul className="nav-links" role="menubar">
            <li role="none"><a role="menuitem" href="#about">關於我們</a></li>
            <li role="none"><a role="menuitem" href="#services">服務項目</a></li>
            <li role="none" className="has-sub">
              <a role="menuitem" href="#types" aria-haspopup="true">合作方式</a>
              <ul className="nav-sub" role="menu">
                <li role="none"><a role="menuitem" href="#automation">AI 自動化代管</a></li>
                <li role="none"><a role="menuitem" href="#type-brand">品牌形象網站</a></li>
                <li role="none"><a role="menuitem" href="#type-ecom">電商／購物網站</a></li>
                <li role="none"><a role="menuitem" href="#type-content">知識／內容網站</a></li>
                <li role="none"><a role="menuitem" href="#type-service">服務／預約網站</a></li>
                <li role="none"><a role="menuitem" href="#type-landing">一頁式網站</a></li>
              </ul>
            </li>
            <li role="none" className="has-sub">
              <a role="menuitem" href="#works" aria-haspopup="true">作品</a>
              <ul className="nav-sub" role="menu">
                <li role="none"><a role="menuitem" href="#work-auslife-jiejie">AUSLIFE｜結界噴霧</a></li>
                <li role="none"><a role="menuitem" href="#work-auslife-zhaocai">AUSLIFE｜招財噴霧</a></li>
                <li role="none"><a role="menuitem" href="#work-intelliverse">精油能量圖譜</a></li>
                <li role="none"><a role="menuitem" href="#work-ausgarden">AUS GARDEN 澳維花園</a></li>
                <li role="none"><a role="menuitem" href="#work-goldfishion">Gold Fishion 美妝代工</a></li>
                <li role="none"><a role="menuitem" href="#work-tarot">紫妍塔羅芳療學院</a></li>
              </ul>
            </li>
            <li role="none">
              <a role="menuitem" href="https://tools.intelliverse.tw" target="_blank" rel="noopener noreferrer" className="nav-external">
                小工具 <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li role="none"><a role="menuitem" href="#faq">常見問答</a></li>
            <li role="none"><a role="menuitem" href="#contact">聯絡</a></li>
          </ul>
          <a href="mailto:linsonder6@gmail.com" className="nav-mail">linsonder6@gmail.com</a>
          <a href="#menu" className="nav-toggle" aria-label="開啟選單">
            <span /><span /><span />
          </a>
        </div>
        <div className="nav-drawer" id="menu">
          <a href="#menu-close" className="nav-drawer-close" aria-label="關閉選單">✕</a>
          <div className="nav-drawer-links">
            <a href="#about">關於我們</a>
            <a href="#services">服務項目</a>
            <div className="nav-drawer-group">
              <span className="nav-drawer-group-label">合作方式</span>
              <a href="#automation">AI 自動化代管</a>
              <a href="#type-brand">品牌形象網站</a>
              <a href="#type-ecom">電商／購物網站</a>
              <a href="#type-content">知識／內容網站</a>
              <a href="#type-service">服務／預約網站</a>
              <a href="#type-landing">一頁式網站</a>
            </div>
            <div className="nav-drawer-group">
              <span className="nav-drawer-group-label">作品</span>
              <a href="#work-auslife-jiejie">AUSLIFE｜結界噴霧</a>
              <a href="#work-auslife-zhaocai">AUSLIFE｜招財噴霧</a>
              <a href="#work-intelliverse">精油能量圖譜</a>
              <a href="#work-ausgarden">AUS GARDEN 澳維花園</a>
              <a href="#work-goldfishion">Gold Fishion 美妝代工</a>
              <a href="#work-tarot">紫妍塔羅芳療學院</a>
            </div>
            <a href="https://tools.intelliverse.tw" target="_blank" rel="noopener noreferrer">小工具 ↗</a>
            <a href="#faq">常見問答</a>
            <a href="#contact">聯絡</a>
          </div>
          <a href="mailto:linsonder6@gmail.com" className="nav-drawer-mail">✦ linsonder6@gmail.com</a>
        </div>
        <a href="#menu-close" className="nav-drawer-backdrop" aria-hidden="true" id="menu-close" tabIndex={-1} />
      </nav>

      <main>
      <header id="top" className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="hero-kicker">
              <span aria-hidden="true" /> 靈境智造 · INTELLIVERSE STUDIO
            </p>
            <h1>
              <span className="line">讓每一個品牌，</span>
              <span className="line">
                都擁有屬於自己的 <span className="mark">智造宇宙</span>。
              </span>
            </h1>
            <p className="hero-sub">
              靈境智造是一間結合科技、設計與商業思維的整合型工作室。
              我們以工程實力串接美感直覺，橫跨軟硬體整合、商品設計、網頁開發與廣告投放，
              陪客戶把一個點子，完整打造成會被市場記住的品牌。
            </p>
            <div className="hero-meta">
              <div><b>04</b> &nbsp;核心服務</div>
              <div><b>01</b> &nbsp;整合團隊</div>
              <div><b>∞</b> &nbsp;商業想像</div>
            </div>
          </div>

          <div className="hero-art" role="img" aria-label="軟硬整合、廣告投放、網頁設計、商品設計四個軸向環繞的核心示意圖">
            <div className="hero-art-label tl" aria-hidden="true">HARDWARE<br />INTEGRATION</div>
            <div className="hero-art-label tr" aria-hidden="true">MEDIA<br />BUYING</div>
            <div className="hero-art-label bl" aria-hidden="true">WEB<br />DESIGN</div>
            <div className="hero-art-label br" aria-hidden="true">PRODUCT<br />DESIGN</div>
            <div className="ring r1" aria-hidden="true" />
            <div className="ring r2" aria-hidden="true" />
            <div className="ring r3" aria-hidden="true" />
            <div className="dot" aria-hidden="true" />
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          SCROLL
          <div className="bar" />
        </div>
      </header>

      <section id="about">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 01 / ABOUT</div>
              <h2 className="section-title">
                不只做設計，<br />也做工程與商業的團隊。
              </h2>
            </div>
            <p className="section-lede">
              靈境，指的是虛擬與數位的世界；智造，代表被真實製造出來的產品與服務。
              我們做的，是把這兩個世界連在一起。
            </p>
          </div>
          <div className="about-grid">
            <div className="about-body">
              <p>
                我們相信，好的品牌不只是一張漂亮的視覺，而是一整條完整的體驗動線——
                從產品本身的手感、包裝拿起來的重量，到網站點擊的節奏、廣告觸及的時機。
              </p>
              <p>
                INTELLIVERSE STUDIO 集結了工業設計、前後端工程、品牌企劃與媒體投放的核心能力，
                提供的不是單點服務，而是一套能被組合、能被迭代的整合方案。
              </p>
              <p>
                我們擅長在「技術規格」與「美感直覺」之間找到平衡，讓每一個決定，
                都同時對工程師、設計師、與市場部門都說得通。
              </p>
            </div>
            <div>
              <div className="about-stats">
                <div className="stat"><b>04</b><span>CORE SERVICE</span></div>
                <div className="stat"><b>∞</b><span>BRAND STORY</span></div>
                <div className="stat"><b>01</b><span>ONE TEAM</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 02 / SERVICES</div>
              <h2 className="section-title">
                四個軸向，<br />串起一個完整的品牌。
              </h2>
            </div>
            <p className="section-lede">
              每一項服務都能獨立承接，也能彼此咬合。
              讓你的品牌從產品開發到上架投放，只需要一個團隊。
            </p>
          </div>

          <div className="services-grid">
            <article className="service">
              <div className="service-num">— 01</div>
              <div className="service-loader" aria-hidden />
              <h3>
                <em>HARDWARE × SOFTWARE</em>
                軟硬體整合設計
              </h3>
              <p>
                從電子元件選型、韌體開發到後端資料流，我們替物聯網產品、智慧零售設備與商業場域的裝置，
                打造一套穩定可擴充的軟硬整合方案，並可協助現場安裝與系統客製。
              </p>
              <ul>
                <li>IoT 裝置開發</li>
                <li>系統整合</li>
                <li>資料處理</li>
                <li>設備建置</li>
              </ul>
              <div className="service-arrow">↗</div>
            </article>

            <article className="service">
              <div className="service-num">— 02</div>
              <div className="service-loader" aria-hidden />
              <h3>
                <em>MEDIA · PERFORMANCE</em>
                廣告投放與行銷策略
              </h3>
              <p>
                以數據驅動的投放方法，操作 Meta、Google、LINE 等主要媒體；從受眾定義、素材製作到轉換追蹤，
                提供可量化的成效優化，協助品牌把預算花在真正會產生成效的地方。
              </p>
              <ul>
                <li>成效廣告</li>
                <li>品牌曝光</li>
                <li>素材企劃</li>
                <li>數據追蹤</li>
              </ul>
              <div className="service-arrow">↗</div>
            </article>

            <article className="service">
              <div className="service-num">— 03</div>
              <div className="service-loader" aria-hidden />
              <h3>
                <em>WEB · DIGITAL</em>
                網頁設計與開發
              </h3>
              <p>
                從品牌官網、產品形象頁到電商系統，我們以使用者體驗為核心，搭配現代前端架構，
                為每一個品牌打造兼具美感、效能與可維護性的數位門面。
              </p>
              <ul>
                <li>品牌網站</li>
                <li>電商前台</li>
                <li>著陸頁</li>
                <li>UI／UX</li>
              </ul>
              <div className="service-arrow">↗</div>
            </article>

            <article className="service">
              <div className="service-num">— 04</div>
              <div className="service-loader" aria-hidden />
              <h3>
                <em>PRODUCT · BRAND</em>
                商品設計與品牌規劃
              </h3>
              <p>
                從產品結構、包裝設計到品牌識別系統，我們陪客戶走完從零到上架的商業化企劃、
                行銷落地規劃，與產品服務線上線下整合往前推進。
              </p>
              <ul>
                <li>產品設計</li>
                <li>包裝視覺</li>
                <li>品牌識別</li>
                <li>通路策略</li>
              </ul>
              <div className="service-arrow">↗</div>
            </article>
          </div>

          <div className="strategy">
            <div className="strategy-head">
              <div className="strategy-kicker">— 專屬品牌網站行銷代管服務</div>
              <h3 className="strategy-title">
                不只做美編，<br />
                <span>更做網站營運</span>。
              </h3>
              <p className="strategy-lede">
                我們不只是做美編，也不只是寫文案，而是結合
                <b> 行銷策略、美編排版、SEO 引流、網站代管與 IT 工程師技術支援</b>，
                協助品牌打造更完整的網路營運流程。
              </p>
              <p className="strategy-lede">
                從品牌定位、市場分析、網站流量追蹤，到商品頁優化、活動頁維護、網頁素材製作與每日數據報告，
                都能協助品牌更清楚掌握網站成效，知道流量從哪裡來、客戶看了什麼、哪裡需要改善。
              </p>
              <p className="strategy-lede">
                如果網站有後台設定、追蹤碼安裝、表單串接、頁面調整或技術問題，
                也能由 IT 工程師協助處理，讓品牌不用自己東找西問，可以用更有效率的方式完成網站營運。
              </p>
            </div>

            <figure className="strategy-flow">
              <img
                src="/strategy-flow.jpg"
                alt="品牌網站行銷代管流程圖：品牌定位、市場分析、網頁流量分析、IT 技術支援、代管操作、SEO 引流整合、每日引流報告、成效優化成長八步驟，整合行銷策略、美編設計、SEO 引流與 IT 技術支援"
                width={1440}
                height={1080}
                loading="lazy"
                decoding="async"
              />
              <figcaption>品牌網站行銷代管流程圖｜行銷策略 × 美編設計 × SEO 引流 × IT 技術支援</figcaption>
            </figure>

            <ol className="strategy-grid">
              {STRATEGY.map((s) => (
                <li key={s.num} className="strategy-item">
                  <div className="strategy-num">{s.num}</div>
                  <h4>{s.title}</h4>
                  <ul>
                    {s.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="strategy-pillars" aria-hidden="false">
              <div className="pillar"><b>策略規劃</b><span>精準定位 · 擬定有效策略</span></div>
              <div className="pillar"><b>視覺美編</b><span>專業設計 · 強化品牌形象</span></div>
              <div className="pillar"><b>技術數據整合</b><span>技術支援 · 數據驅動優化</span></div>
            </div>

            <p className="strategy-summary">
              <span>專屬品牌網站行銷代管，不套版、不複製。</span>
              整合行銷策略、美編排版、SEO 引流、網站代管與 IT 技術支援，
              協助品牌掌握流量來源、優化網站內容、解決技術問題，讓營運更有效率、轉換更穩定。
            </p>
          </div>
        </div>
      </section>

      <section id="automation">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 03 / AUTOMATION</div>
              <h2 className="section-title">
                重複的事，<br />交給 AI 做。
              </h2>
            </div>
            <p className="section-lede">
              把每天、每週、每月都要重複跑一次的營運動作，
              變成不會忘記、不會偷懶的自動化流程。
            </p>
          </div>

          <div className="automation-grid">
            <article className="automation-case">
              <div className="automation-tag">CASE 01 · SHOPEE</div>
              <h3>蝦皮｜每日商品置頂</h3>
              <p>
                每天定時對指定商品執行置頂操作，配合人工微調，確保賣場曝光不中斷。
                把「記得跑流程」這件事從小幫手的腦袋裡搬走。
              </p>
              <ul>
                <li>不再忘記、不再撞時段</li>
                <li>多帳號／多商店同步</li>
                <li>人工可隨時介入調整</li>
              </ul>
            </article>

            <article className="automation-case">
              <div className="automation-tag">CASE 02 · MOMO</div>
              <h3>MOMO｜每週降價促銷（售更多）</h3>
              <p>
                每週依排程設定降價區間與適用商品清單，省下手動上下架的時間。
                「售更多」活動可以開好開滿，不漏單。
              </p>
              <ul>
                <li>排程自動跑、結束自動還原</li>
                <li>商品清單可批次調整</li>
                <li>與「售更多」活動同步運作</li>
              </ul>
            </article>
          </div>

          <div className="automation-fit">
            <div className="automation-fit-label">適合誰</div>
            <ul>
              <li>經常忘記跑流程的老闆與店主</li>
              <li>工作太多沒空盯細節的小幫手</li>
              <li>想把人力留給判斷、不是抄表的內勤</li>
            </ul>
          </div>

          <a href="mailto:linsonder6@gmail.com?subject=AI%20%E8%87%AA%E5%8B%95%E5%8C%96%E4%BB%A3%E7%AE%A1%E8%A9%A2%E5%95%8F" className="automation-cta">
            <span>有重複的工作想交出去？</span>
            <span>告訴我們你最痛的那一個 <em>→</em></span>
          </a>
        </div>
      </section>

      <section id="types">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 04 / TYPES</div>
              <h2 className="section-title">
                你想做的網站，<br />我們都能蓋。
              </h2>
            </div>
            <p className="section-lede">
              不同階段的品牌，需要不同形態的網站。
              先想清楚這次要解決什麼問題，再決定該用哪一種架構。
            </p>
          </div>

          <div className="types-grid">
            {TYPES.map((t) => (
              <article key={t.id} id={t.id} className="type-card">
                <div className="type-num">{t.num}</div>
                <h3 className="type-title">{t.title}</h3>
                <p className="type-en">{t.en}</p>
                <p className="type-desc">{t.desc}</p>
                <ul className="type-tags">
                  {t.tags.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <p className="type-fit"><span>適合</span>{t.fit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 05 / APPROACH</div>
              <h2 className="section-title">
                我們怎麼跟客戶<br />一起把事情做出來。
              </h2>
            </div>
            <p className="section-lede">
              每一個案子會依需求組隊，從前期策略到上線後的數據優化，全程由同一個窗口對接，
              不需要在設計、工程、行銷之間來回翻譯。
            </p>
          </div>
          <div className="steps">
            {STEPS.map((step) => (
              <div key={step.num} className="step">
                <div className="step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works">
        <div className="shell">
        <details className="section-fold" id="works-fold">
          <summary>
            <div className="section-head">
              <div>
                <div className="section-num">— 06 / WORKS</div>
                <h2 className="section-title">
                  我們做過的<br />一些實際案子。
                </h2>
              </div>
              <p className="section-lede">
                從轉換導向的一頁式銷售廣告，到深度內容型的品牌知識庫，
                每一個都是我們與客戶共同思考的成果。
              </p>
              <span className="fold-mark" aria-hidden="true">
                <span className="fold-mark-text">
                  <span className="when-closed">展開作品</span>
                  <span className="when-open">收合作品</span>
                </span>
                <span className="fold-mark-icon">+</span>
              </span>
            </div>
          </summary>

          <div className="works-grid">
            {WORKS.map((w) => (
              <a
                key={w.url}
                id={w.slug}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work"
                aria-label={`查看作品：${w.title}（在新視窗開啟）`}
              >
                <div className="work-thumb">
                  <img
                    src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(w.url)}?w=1200&h=800`}
                    alt={`${w.title}｜${w.tag} 網頁預覽縮圖`}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="work-visit" aria-hidden="true">VIEW LIVE ↗</div>
                </div>
                <div className="work-meta">
                  <div className="work-tag">{w.tag}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                  <ul>
                    {w.labels.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        </details>
        </div>
      </section>

      <section id="faq">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 07 / FAQ</div>
              <h2 className="section-title">
                接洽前，<br />先把這些問題講清楚。
              </h2>
            </div>
            <p className="section-lede">
              這些是我們最常被問到的幾件事。如果還有其他疑問，直接寫信過來最快。
            </p>
          </div>
          <div className="faq-list">
            {FAQ.map((f, i) => (
              <details key={i} className="faq-item">
                <summary>
                  <span className="faq-q-num">Q{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-q-mark" aria-hidden="true">+</span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      </main>

      <footer id="contact">
        <div className="shell">
          <div className="footer-grid">
            <div className="footer-cta">
              <div className="footer-kicker">— GET IN TOUCH</div>
              <h2>
                有想做的事，<br />
                就直接 <em>寫信聊聊</em> 吧。
              </h2>
              <p>
                不論是一顆還在草稿階段的點子、一款需要重新被設計的既有商品，
                或是一次需要加速的廣告投放，都歡迎直接聯絡我們。
              </p>
            </div>
            <div className="footer-block">
              <h4>CONTACT</h4>
              <a href="mailto:linsonder6@gmail.com" className="big-link">linsonder6@gmail.com</a>
              <a href="tel:+886926213896" className="big-link">+886 926-213-896</a>
              <p>週一至週五 10:00–19:00</p>
            </div>
            <div className="footer-block">
              <h4>STUDIO</h4>
              <p>靈境智造</p>
              <p>INTELLIVERSE STUDIO</p>
              <address>臺中市太平區精美路 122 號</address>
              <p className="footer-tag">Design · Engineering · Media</p>
            </div>
          </div>
          <div className="footer-base">
            <div>© 2026 INTELLIVERSE STUDIO · 靈境智造 · ALL RIGHTS RESERVED</div>
            <div>HARDWARE · SOFTWARE · DESIGN · MEDIA</div>
          </div>
        </div>
      </footer>

      {/* auto-open the collapsible works section when navigating to a #work-* anchor */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "(function(){function open(){var h=location.hash;if(/^#work-/.test(h)){var d=document.getElementById('works-fold');if(d&&!d.open){d.open=true;requestAnimationFrame(function(){var t=document.querySelector(h);if(t)t.scrollIntoView({block:'start'});});}}}open();addEventListener('hashchange',open);})();",
        }}
      />
    </>
  );
}

const STRATEGY = [
  { num: '01', title: '品牌定位', tags: ['品牌目標', '客群輪廓', '產品優勢'] },
  { num: '02', title: '市場分析', tags: ['競品觀察', '消費需求', '趨勢判讀'] },
  { num: '03', title: '網頁流量分析', tags: ['流量來源', '熱門頁面', '流失節點'] },
  { num: '04', title: 'IT 技術支援', tags: ['網站設定', '追蹤碼安裝', '功能調整'] },
  { num: '05', title: '代管操作', tags: ['商品頁更新', '活動頁維護', '後台管理'] },
  { num: '06', title: 'SEO 引流整合', tags: ['關鍵字佈局', '內容優化', '自然曝光'] },
  { num: '07', title: '每日引流報告', tags: ['流量數據', '點擊表現', '改善建議'] },
  { num: '08', title: '成效優化成長', tags: ['提升曝光', '提高轉換', '建立品牌力'] },
];

const STEPS = [
  {
    num: '01',
    title: '需求釐清',
    body: '先把商業目標、受眾與時程攤開講清楚，而不是直接跳進設計稿。這一步決定了後面所有資源要怎麼分配。',
  },
  {
    num: '02',
    title: '策略提案',
    body: '針對你的產品、市場與競品，提出一份能落地的整合方案：要做什麼、不做什麼、為什麼要這樣做。',
  },
  {
    num: '03',
    title: '設計與開發',
    body: '設計、工程、行銷同步推進，不用等上一個階段完全完成才開始下一個。進度同步在共用文件上。',
  },
  {
    num: '04',
    title: '上線與迭代',
    body: '上線只是開始，我們會持續追蹤數據與使用者回饋，依成效微調產品、網頁與廣告素材。',
  },
];

