import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FAQ, WORKS, TYPES, SECTIONS } from './content';

const SITE_URL = 'https://show.intelliverse.tw';
const SITE_NAME = '靈境智造 Intelliverse Studio';
const SITE_TITLE = `${SITE_NAME}｜臺中設計工作室・軟硬整合・AI 工作流程・商品・網頁・廣告`;
const SITE_DESC =
  '靈境智造 Intelliverse Studio — 位於臺中太平的整合型設計工作室，結合科技、設計與商業思維。服務範圍橫跨軟硬體整合、AI 自動工作流程、商品設計、網頁開發、一頁式廣告與投放策略，陪品牌從點子走到市場。';
const OG_IMAGE = '/og-image.png';

const ADDRESS = {
  streetAddress: '精美路 122 號',
  addressLocality: '太平區',
  addressRegion: '臺中市',
  postalCode: '411',
  addressCountry: 'TW',
} as const;
const FULL_ADDRESS_TW = `臺中市太平區精美路 122 號`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    '靈境智造',
    'Intelliverse Studio',
    '臺中設計工作室',
    '台中設計公司',
    '太平區 設計公司',
    '精美路',
    '軟硬體整合',
    'IoT 裝置開發',
    '智慧零售',
    'AI 自動工作流程',
    'AI workflow',
    'automation',
    '商品設計',
    '包裝設計',
    '產品開發',
    '網頁設計',
    '網站設計',
    '一頁式廣告',
    'landing page',
    '電商網站',
    '品牌規劃',
    '品牌識別',
    '廣告投放',
    '成效廣告',
    'Meta 廣告',
    'Google Ads',
    'LINE 廣告',
    '媒體代理',
    '行銷顧問',
    '臺中 網頁設計',
    '台中 AI 工作流',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'Design Studio',
  alternates: {
    canonical: '/',
    languages: {
      'zh-Hant-TW': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — 幫你打造 AI 自動工作流程，你只負責環遊世界`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'eBQecTnxY_7xwmP5sqWgCnpTVLZg47BsjpWEtGVn-Uk',
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f0e1',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

/* ---------- Structured data (JSON-LD) ---------- */

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ['INTELLIVERSE STUDIO', '靈境智造'],
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  email: 'linsonder6@gmail.com',
  telephone: '+886-926-213-896',
  description: SITE_DESC,
  slogan: '幫你打造 AI 自動工作流程，你只負責環遊世界。',
  priceRange: 'NT$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.streetAddress,
    addressLocality: ADDRESS.addressLocality,
    addressRegion: ADDRESS.addressRegion,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.addressCountry,
  },
  areaServed: [
    { '@type': 'Country', name: 'Taiwan' },
    { '@type': 'City', name: '臺中市' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'linsonder6@gmail.com',
      telephone: '+886-926-213-896',
      availableLanguage: ['zh-Hant', 'en'],
      areaServed: 'TW',
    },
  ],
  knowsAbout: [
    '軟硬體整合',
    'IoT 裝置開發',
    'AI 自動工作流程',
    'AI workflow automation',
    '商品設計',
    '包裝設計',
    '網頁設計',
    '一頁式廣告',
    '品牌規劃',
    '廣告投放',
    'Meta 廣告',
    'Google Ads',
    'LINE 廣告',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '靈境智造服務項目',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '軟硬體整合設計',
          description:
            '從電子元件選型、韌體開發到後端資料流，替物聯網產品、智慧零售設備與商業場域裝置打造穩定可擴充的軟硬整合方案。',
          serviceType: 'Hardware-Software Integration',
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: 'TW',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '廣告投放與行銷策略',
          description:
            '以數據驅動的投放方法，操作 Meta、Google、LINE 等主要媒體；從受眾定義、素材製作到轉換追蹤。',
          serviceType: 'Digital Advertising',
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: 'TW',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '網頁設計與開發',
          description:
            '從品牌官網、產品形象頁到電商系統，以使用者體驗為核心搭配現代前端架構，打造兼具美感、效能與可維護性的數位門面。',
          serviceType: 'Web Design & Development',
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: 'TW',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '商品設計與品牌規劃',
          description:
            '從產品結構、包裝設計到品牌識別系統，陪客戶走完從零到上架的商業化企劃、行銷落地規劃，與產品服務線上線下整合。',
          serviceType: 'Product & Brand Design',
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: 'TW',
        },
      },
    ],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'zh-Hant-TW',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESC,
  inLanguage: 'zh-Hant-TW',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub', '.section-title', '.faq-q-text', '.faq-a'],
  },
};

/* 頁內錨點麵包屑 — 讓 Google 認得每個 section 是頁內獨立實體 */
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首頁',
      item: SITE_URL,
    },
    ...SECTIONS.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: s.label,
      item: `${SITE_URL}/#${s.id}`,
    })),
  ],
};

/* Works 作品集 — ItemList of CreativeWork，讓 Google 有機會顯示 portfolio rich result */
const worksJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#works`,
  name: '靈境智造作品集',
  numberOfItems: WORKS.length,
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  itemListElement: WORKS.map((w, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/#${w.slug}`,
    item: {
      '@type': 'CreativeWork',
      '@id': `${SITE_URL}/#${w.slug}`,
      name: w.title,
      description: w.desc,
      url: w.url,
      image: `${SITE_URL}/og-image.png`,
      keywords: w.labels.join(', '),
      creator: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'zh-Hant-TW',
    },
  })),
};

/* HowTo — Shopee 每日置頂自動化，鎖定「蝦皮商品置頂自動化」長尾關鍵字 */
const howToShopeeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${SITE_URL}/#howto-shopee`,
  name: '蝦皮商品每日置頂自動化流程',
  description:
    '透過 AI 排程對指定商品執行每日蝦皮置頂，減少小幫手忘記、撞時段等問題；支援多帳號、多商店，並保留人工介入介面。',
  totalTime: 'PT7D',
  inLanguage: 'zh-Hant-TW',
  supply: [
    { '@type': 'HowToSupply', name: '蝦皮賣家帳號（可多帳號、多商店）' },
    { '@type': 'HowToSupply', name: '欲每日置頂的商品清單' },
    { '@type': 'HowToSupply', name: 'LINE Notify 或 Slack 通報通道' },
  ],
  tool: [
    { '@type': 'HowToTool', name: '靈境智造自動化排程系統' },
    { '@type': 'HowToTool', name: 'AI 例外處理模組' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '盤點置頂需求',
      text: '確認每日要置頂的商品清單、時段、優先順序，以及多帳號的分工方式。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '設定自動化排程',
      text: '將商品清單、時段、輪替規則寫入自動化排程系統；設定失敗重試與異常通報。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '每日自動執行 + 人工抽查',
      text: 'AI 按時執行置頂；小幫手可透過管理介面隨時調整順序、臨時排除商品或補跑失敗任務。',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '週／月度成效報告',
      text: '定期產出置頂執行紀錄、失敗率、對應商品曝光變化，協助品牌方做下一步調整。',
    },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
};

/* HowTo — MOMO 每週售更多降價自動化 */
const howToMomoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${SITE_URL}/#howto-momo`,
  name: 'MOMO 售更多每週降價促銷自動化流程',
  description:
    '每週依排程自動設定 MOMO 售更多降價區間與適用商品，活動結束後自動還原，減少手動上下架的人力成本。',
  totalTime: 'PT7D',
  inLanguage: 'zh-Hant-TW',
  supply: [
    { '@type': 'HowToSupply', name: 'MOMO 廠商後台權限' },
    { '@type': 'HowToSupply', name: '售更多活動排程與商品清單' },
    { '@type': 'HowToSupply', name: '成本／毛利底線設定表' },
  ],
  tool: [
    { '@type': 'HowToTool', name: '靈境智造自動化排程系統' },
    { '@type': 'HowToTool', name: '批次商品調整介面' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '定義降價策略',
      text: '設定每週售更多要降價的商品清單、降幅、活動起訖時間、毛利底線。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '排程自動下降',
      text: '排程系統每週依設定時間自動將商品調到降價區間，並向 MOMO 後台送出售更多申請。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '活動結束自動還原',
      text: '活動結束後系統自動將價格還原，避免忘記撤下優惠影響毛利。',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '月度成效檢視',
      text: '整理售更多期間的訂單、營收、轉換率，回饋到下一輪降價策略。',
    },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
};

/* Service 節點 — 為 4 大服務加獨立 @id，方便被 Google Knowledge Graph 認得 */
const serviceNodes = [
  {
    id: 'service-hardware-software',
    name: '軟硬體整合設計',
    serviceType: 'Hardware-Software Integration',
    desc: '從電子元件選型、韌體開發到後端資料流，替物聯網產品、智慧零售設備與商業場域裝置打造穩定可擴充的軟硬整合方案。',
  },
  {
    id: 'service-media',
    name: '廣告投放與行銷策略',
    serviceType: 'Digital Advertising',
    desc: '以數據驅動的投放方法，操作 Meta、Google、LINE 等主要媒體；從受眾定義、素材製作到轉換追蹤。',
  },
  {
    id: 'service-web',
    name: '網頁設計與開發',
    serviceType: 'Web Design & Development',
    desc: '從品牌官網、產品形象頁到電商系統，以使用者體驗為核心搭配現代前端架構，打造兼具美感、效能與可維護性的數位門面。',
  },
  {
    id: 'service-product',
    name: '商品設計與品牌規劃',
    serviceType: 'Product & Brand Design',
    desc: '從產品結構、包裝設計到品牌識別系統，陪客戶走完從零到上架的商業化企劃、行銷落地規劃，與產品服務線上線下整合。',
  },
  {
    id: 'service-automation',
    name: 'AI 電商代管自動化',
    serviceType: 'AI Automation & E-commerce Operations',
    desc: '為蝦皮、MOMO、PChome 等電商平台建置每日置頂、售更多降價、活動排程等自動化流程，讓重複的工作交給 AI 執行。',
  },
];

const servicesJsonLd = serviceNodes.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/#${s.id}`,
  name: s.name,
  description: s.desc,
  serviceType: s.serviceType,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: [
    { '@type': 'Country', name: 'Taiwan' },
    { '@type': 'City', name: '臺中市' },
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: '品牌方、電商經營者、行銷代理商',
  },
  inLanguage: 'zh-Hant-TW',
}));

export { FULL_ADDRESS_TW };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://s0.wp.com" />

        {/* Google Analytics 4 — G-HQKL8W50KD */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HQKL8W50KD" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-HQKL8W50KD');",
          }}
        />
        <meta name="geo.region" content="TW-TXG" />
        <meta name="geo.placename" content="臺中市太平區" />
        <meta name="ICBM" content="24.137, 120.718" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(worksJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToShopeeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToMomoJsonLd) }}
        />
        {servicesJsonLd.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
