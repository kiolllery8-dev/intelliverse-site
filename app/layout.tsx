import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FAQ } from './content';

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
};

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
        <link rel="dns-prefetch" href="https://s0.wp.com" />
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
      </head>
      <body>{children}</body>
    </html>
  );
}
