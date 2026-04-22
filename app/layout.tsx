import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://show.intelliverse.tw';
const SITE_NAME = '靈境智造 Intelliverse Studio';
const SITE_TITLE = `${SITE_NAME}｜軟硬整合・商品設計・網頁開發・廣告投放`;
const SITE_DESC =
  '靈境智造是一間結合科技、設計與商業思維的整合型工作室，位於臺中，橫跨軟硬體整合、商品設計、網頁開發與廣告投放，陪品牌從點子走到市場。';
const OG_IMAGE = '/og-image.png'; // 請替換為你的分享預覽圖（建議 1200×630 PNG/JPG）

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
    '軟硬體整合',
    '商品設計',
    '網頁設計',
    '網站設計',
    '廣告投放',
    '品牌規劃',
    '一頁式廣告',
    '臺中設計工作室',
    '台中網頁設計',
    'Meta 廣告',
    'Google 廣告',
    'IoT 裝置開發',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'Design Studio',
  alternates: {
    canonical: '/',
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
        alt: `${SITE_NAME} — 軟硬整合・商品・網頁・廣告`,
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: ['INTELLIVERSE STUDIO', '靈境智造'],
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  email: 'linsonder6@gmail.com',
  telephone: '+886-926-213-896',
  description: SITE_DESC,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TW',
    addressRegion: '臺中市',
  },
  areaServed: 'TW',
  knowsAbout: [
    '軟硬體整合',
    '商品設計',
    '網頁設計',
    '廣告投放',
    '品牌規劃',
    'IoT',
    '一頁式廣告',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'zh-Hant-TW',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
