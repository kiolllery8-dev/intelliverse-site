export const FAQ = [
  {
    q: '靈境智造是一間怎樣的公司？位於哪裡？',
    a: '靈境智造 Intelliverse Studio 是位於臺中市太平區精美路的整合型設計工作室，結合科技、設計與商業思維。我們橫跨軟硬體整合、AI 自動工作流程、商品設計、網頁開發與廣告投放，主要服務臺灣在地品牌，也承接跨國案子。',
  },
  {
    q: '你們可以替我的品牌建立 AI 自動工作流程嗎？',
    a: '可以。從客服自動回覆、素材批次生成、行銷數據彙整、內部報告自動化，到跨系統串接（Notion／Google Sheets／LINE／ERP／CRM），我們會依照你的營運節奏設計一套能長期運行的自動化流程，讓團隊把精力留給判斷與創造。',
  },
  {
    q: 'AI 自動化代管支援哪些電商平台？',
    a: '目前我們實作過蝦皮（每日商品置頂）與 MOMO（每週售更多降價排程）的自動化代管，也能依需求擴充到 PChome、樂天、自架電商與 LINE 商店。流程通常是「先盤點重複工作 → 設計排程與例外處理 → AI 跑、人工抽查」，每個平台依 API 與後台限制略有不同，會在開案前先做一次可行性評估。',
  },
  {
    q: 'AI 自動化代管的費用怎麼算？',
    a: '採「建置費 + 月度代管費」兩段。建置費依平台數、自動化任務複雜度報價；月費包含排程運行、異常通報、月度報表與小幅調整。一次建置可以服務多家店、多帳號，邊際成本會隨規模降低。開案前提供書面報價，所有費用透明。',
  },
  {
    q: '蝦皮商品每日置頂可以完全自動化嗎？',
    a: '可以。我們建置的自動化流程會在每日指定時段對指定商品執行置頂，並支援多帳號、多商店同步。同時保留人工介入介面，讓小幫手可以隨時調整置頂順序或臨時排除商品；異常時會透過 LINE Notify 即時通報。',
  },
  {
    q: 'MOMO 售更多降價活動可以排程自動跑嗎？',
    a: '可以。每週依排程自動設定降價區間與適用商品清單，活動結束後價格自動還原。也支援臨時活動插播、批次商品調整、庫存不足自動下架。整個代管流程搭配月報，讓品牌方能追蹤售更多的實際成效。',
  },
  {
    q: '做一個一頁式廣告（landing page）通常需要多久？',
    a: '從需求釐清、文案撰寫、視覺設計到上線，標準時程約 2–3 週。若素材齊備且決策鏈短，最快可壓縮到 7–10 天。上線後我們可以接續接廣告投放與 A/B 測試，讓頁面持續優化轉換率。',
  },
  {
    q: '可以只做廣告投放，不做網站嗎？反過來也行嗎？',
    a: '可以。四項服務可以獨立承接，也可以彼此咬合。如果你已經有網站但需要廣告代操、或只想先做商品設計不碰數位，都沒問題——我們會依據你的階段需求彈性組隊。',
  },
  {
    q: '在臺中以外的城市，還能跟你們合作嗎？',
    a: '可以。大部分流程都能線上完成：Notion／Google Docs 共同編輯、Figma 共審、每週視訊 Review。若需要到現場拍攝、設備安裝或製造廠對接，我們會規劃出差時程一併報價。',
  },
  {
    q: '收費方式是怎麼算的？',
    a: '我們採專案制報價，依服務範圍、素材量、投放預算、時程而定；廣告投放可選月費或抽成制。開案前會提供書面報價單，所有費用透明公開、不會有額外追加。',
  },
];

/* 作品分類 — id 需與 globals.css 的 .works-filter 篩選規則一一對應 */
export const WORK_CATEGORIES = [
  { id: 'all', en: 'ALL', label: '全部作品' },
  { id: 'ip', en: 'PERSONAL IP', label: 'IP／個人品牌' },
  { id: 'brand', en: 'BRAND', label: '品牌形象' },
  { id: 'ecom', en: 'E-COMMERCE', label: '電商／選品' },
  { id: 'content', en: 'CONTENT', label: '知識／內容' },
  { id: 'landing', en: 'LANDING', label: '一頁式廣告' },
];

export const WORKS = [
  {
    slug: 'work-zeng',
    url: 'https://zeng.intelliverse.tw',
    cat: 'ip',
    tag: 'PERSONAL IP · 個人品牌網站',
    title: '曾會長｜善循環公益資源整合平台',
    desc: '「讓善意流動，讓資源發光。」為深耕地方近二十年的公益工作者打造的個人 IP 網站：把原本散落在 FB 貼文裡的信任、人脈與活動紀錄，整理成能被搜尋、能被轉介的數位資產。整合 LINE 官方帳號、Facebook 社群導流、會員系統、嚴選選品與活動報名表單，讓「找得到人、談得成合作」變成一條完整動線。',
    labels: ['個人 IP 建立', 'LINE／FB 整合', '會員＋報名系統'],
  },
  {
    slug: 'work-auslife-jiejie',
    url: 'https://auslife.store',
    cat: 'landing',
    tag: 'LANDING PAGE · 一頁式廣告',
    title: 'AUSLIFE｜結界噴霧',
    desc: '「啟動你的第一道結界。」以情緒頻率為切入，把七種神聖植物精油轉化成可購買的護身場景；搭配短句、證言與階段式引導，做出高轉換率的單頁銷售體驗。',
    labels: ['轉換導向', '文案＋視覺', '受眾洞察'],
  },
  {
    slug: 'work-auslife-zhaocai',
    url: 'https://auslife.store/2',
    cat: 'landing',
    tag: 'LANDING PAGE · 一頁式廣告',
    title: 'AUSLIFE｜招財噴霧',
    desc: '「財富來自磁場，不是努力。」將四種招財植物與三種使用儀式化的場景結合，把產品賣進客戶的生活動線，讓買的不只是精油，而是一種重新啟動的感覺。',
    labels: ['品牌敘事', '情緒價值', '儀式設計'],
  },
  {
    slug: 'work-intelliverse',
    url: 'https://intelliverse.tw',
    cat: 'content',
    tag: 'KNOWLEDGE BASE · 品牌知識庫',
    title: '精油能量圖譜｜INTELLIVERSE',
    desc: '我們為品牌搭建的芳療知識平台：從植物化學、萃取、全球產地到臨床應用，以初學／進階／專業三層級結構內容，讓品牌不只是賣貨，而是擁有屬於自己的內容資產。',
    labels: ['內容資產', '資訊架構', 'SEO'],
  },
  {
    slug: 'work-ausgarden',
    url: 'https://kiolllery8-dev.github.io/aus-garden/products/',
    cat: 'ecom',
    tag: 'E-COMMERCE · 品牌電商網站',
    title: 'AUS GARDEN 澳維花園',
    desc: '"From the Garden, Into Your Life." 為芳療品牌建置的商品型網站，收錄 80+ 件精油、按摩油、純露與保養品；從分類架構、卡片版型到購買動線，強調「一眼看清整個商品宇宙」。',
    labels: ['電商網站', '商品陳列', 'UI／UX'],
  },
  {
    slug: 'work-goldfishion',
    url: 'https://kiolllery8-dev.github.io/goldfishion-oem/',
    cat: 'brand',
    tag: 'B2B · ODM/OEM 品牌網站',
    title: 'Gold Fishion｜美妝代工一站式',
    desc: '「一站打造你的美妝品牌。」為美妝代工廠建置的品牌型網站，溝通對象是新創、電商、連鎖與跨業客戶；從核心實力、六步驟流程到劑型分類，把 B2B 的專業感跟品牌顧問的溫度講清楚。',
    labels: ['B2B 品牌網站', '流程視覺化', '信任感設計'],
  },
  {
    slug: 'work-tarot',
    url: 'https://tarot.intelliverse.tw/',
    cat: 'brand',
    tag: 'EDUCATION · 品牌學院網站',
    title: '紫妍塔羅芳療學院｜TAROT × AROMA',
    desc: '「用塔羅看見內在，用香氣安頓自己。」為融合塔羅占卜與芳療教學的品牌學院打造的形象網站；把兩種療癒體系的世界觀串成一條敘事動線，從入門、進階到師資介紹，讓潛在學員一進站就感受到學院的氛圍與專業。',
    labels: ['教學品牌', '多感官體驗', '靈性敘事'],
  },
];

export const TYPES = [
  {
    id: 'type-brand',
    num: '01',
    title: '品牌形象網站',
    en: 'BRAND · IDENTITY',
    desc: '給品牌一個正式的網路門面：故事頁、團隊介紹、服務項目、作品集與聯絡方式，一次說清楚品牌主張與專業度。',
    tags: ['形象首頁', '公司介紹', '服務頁'],
    fit: '剛起步的品牌、想升級對外形象的公司、需要對提案／媒體展示的客戶',
  },
  {
    id: 'type-ecom',
    num: '02',
    title: '電商／購物網站',
    en: 'E-COMMERCE',
    desc: '從商品分類、商品頁、購物車到金流、物流、會員後台一條龍。同步支援搜尋、優惠券、訂單追蹤、退換貨流程。',
    tags: ['商品陳列', '會員系統', '金流串接'],
    fit: '已有實體商品要直營、想脫離平台抽成、需要會員回購機制的品牌',
  },
  {
    id: 'type-content',
    num: '03',
    title: '知識／內容網站',
    en: 'CONTENT · KNOWLEDGE',
    desc: '部落格、知識庫、媒體型內容站。多欄目分類、長期累積文章、SEO 結構、訂閱機制，建立品牌專屬內容資產。',
    tags: ['內容架構', 'SEO 佈局', '多欄目'],
    fit: '專業／顧問型品牌、想用內容養客戶的公司、需要長期累積信任的領域',
  },
  {
    id: 'type-service',
    num: '04',
    title: '服務／預約網站',
    en: 'BOOKING · SERVICE',
    desc: '預約系統、課程報名、活動報名、表單收集與名單管理。讓「想預約」這件事，從加 LINE 變成自動化流程。',
    tags: ['預約表單', '行事曆', '客戶名單'],
    fit: '工作室、診所、教室、活動主辦方、各種需要排程／報名的服務業',
  },
  {
    id: 'type-landing',
    num: '05',
    title: '一頁式網站',
    en: 'LANDING PAGE',
    desc: '廣告投放與活動專用的單頁銷售頁：明確 CTA、限時優惠、社會證明、A/B 測試素材模組，把流量精準變成訂單。',
    tags: ['單頁銷售', '高轉換率', '廣告落地'],
    fit: '新品上市、檔期活動、廣告投放主力商品、需要快速驗證市場反應的提案',
  },
];

export const SECTIONS = [
  { id: 'about', label: '關於我們', num: '01' },
  { id: 'services', label: '服務項目', num: '02' },
  { id: 'automation', label: 'AI 自動化代管', num: '03' },
  { id: 'types', label: '合作方式', num: '04' },
  { id: 'approach', label: '合作流程', num: '05' },
  { id: 'works', label: '作品', num: '06' },
  { id: 'faq', label: '常見問答', num: '07' },
  { id: 'contact', label: '聯絡', num: '08' },
];
