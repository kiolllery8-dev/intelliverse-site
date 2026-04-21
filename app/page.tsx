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
            <a href="#works">作品</a>
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

      <section id="works">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-num">— 04 / WORKS</div>
              <h2 className="section-title">
                我們做過的<br />一些實際案子。
              </h2>
            </div>
            <p className="section-lede">
              從轉換導向的一頁式銷售廣告，到深度內容型的品牌知識庫，
              每一個都是我們與客戶共同思考的成果。
            </p>
          </div>

          <div className="works-grid">
            {WORKS.map((w) => (
              <a key={w.url} href={w.url} target="_blank" rel="noopener noreferrer" className="work">
                <div className="work-thumb">
                  <img
                    src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(w.url)}?w=1200&h=800`}
                    alt={w.title}
                    loading="lazy"
                  />
                  <div className="work-visit">VIEW LIVE ↗</div>
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

const WORKS = [
  {
    url: 'https://auslife.store',
    tag: 'LANDING PAGE · 一頁式廣告',
    title: 'AUSLIFE｜結界噴霧',
    desc: '「啟動你的第一道結界。」以情緒頻率為切入，把七種神聖植物精油轉化成可購買的護身場景；搭配短句、證言與階段式引導，做出高轉換率的單頁銷售體驗。',
    labels: ['轉換導向', '文案＋視覺', '受眾洞察'],
  },
  {
    url: 'https://auslife.store/2',
    tag: 'LANDING PAGE · 一頁式廣告',
    title: 'AUSLIFE｜招財噴霧',
    desc: '「財富來自磁場，不是努力。」將四種招財植物與三種使用儀式化的場景結合，把產品賣進客戶的生活動線，讓買的不只是精油，而是一種重新啟動的感覺。',
    labels: ['品牌敘事', '情緒價值', '儀式設計'],
  },
  {
    url: 'https://intelliverse.tw',
    tag: 'KNOWLEDGE BASE · 品牌知識庫',
    title: '精油能量圖譜｜INTELLIVERSE',
    desc: '我們為品牌搭建的芳療知識平台：從植物化學、萃取、全球產地到臨床應用，以初學／進階／專業三層級結構內容，讓品牌不只是賣貨，而是擁有屬於自己的內容資產。',
    labels: ['內容資產', '資訊架構', 'SEO'],
  },
  {
    url: 'https://kiolllery8-dev.github.io/aus-garden/products/',
    tag: 'E-COMMERCE · 品牌電商網站',
    title: 'AUS GARDEN 澳維花園',
    desc: '"From the Garden, Into Your Life." 為芳療品牌建置的商品型網站，收錄 80+ 件精油、按摩油、純露與保養品；從分類架構、卡片版型到購買動線，強調「一眼看清整個商品宇宙」。',
    labels: ['電商網站', '商品陳列', 'UI／UX'],
  },
  {
    url: 'https://kiolllery8-dev.github.io/goldfishion-oem/',
    tag: 'B2B · ODM/OEM 品牌網站',
    title: 'Gold Fishion｜美妝代工一站式',
    desc: '「一站打造你的美妝品牌。」為美妝代工廠建置的品牌型網站，溝通對象是新創、電商、連鎖與跨業客戶；從核心實力、六步驟流程到劑型分類，把 B2B 的專業感跟品牌顧問的溫度講清楚。',
    labels: ['B2B 品牌網站', '流程視覺化', '信任感設計'],
  },
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
