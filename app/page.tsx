export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="shell nav-inner">
          <a href="#top" className="logo">
            靈境<em>·</em>智造
          </a>
          <div className="nav-links">
            <a href="#about">關於我們</a>
            <a href="#services">服務項目</a>
            <a href="#approach">合作方式</a>
            <a href="#contact">聯絡</a>
          </div>
          <a href="mailto:linsonder6@gmail.com" className="nav-mail">linsonder6@gmail.com</a>
        </div>
      </nav>

      <header id="top" className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="hero-kicker">
              <span /> 靈境智造 · INTELLIVERSE STUDIO
            </div>
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

          <div className="hero-art">
            <div className="hero-art-label tl">HARDWARE<br />INTEGRATION</div>
            <div className="hero-art-label tr">MEDIA<br />BUYING</div>
            <div className="hero-art-label bl">WEB<br />DESIGN</div>
            <div className="hero-art-label br">PRODUCT<br />DESIGN</div>
            <div className="ring r1" />
            <div className="ring r2" />
            <div className="ring r3" />
            <div className="dot" />
          </div>
        </div>
        <div className="scroll-hint">
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
                從產品結構、包裝設計到品牌識別系統，我們陪客戶走完從零到上架的商業化歷程，
                並能依需求銜接管理顧問、智慧財產權規劃與國際採購代理。
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
        </div>
      </section>

      <section id="approach">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 03 / APPROACH</div>
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
              <p>Design · Engineering · Media</p>
            </div>
          </div>
          <div className="footer-base">
            <div>© 2026 INTELLIVERSE STUDIO · 靈境智造 · ALL RIGHTS RESERVED</div>
            <div>HARDWARE · SOFTWARE · DESIGN · MEDIA</div>
          </div>
        </div>
      </footer>
    </>
  );
}

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
