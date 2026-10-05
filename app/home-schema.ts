/** 首頁結構化資料僅描述本頁可見內容。 */
import { FAQ, WORKS, WORK_CATEGORIES } from './content';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, HOME_UPDATED } from './site-info';

export const webPageJsonLd = {
  '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE_URL + '/#webpage',
  url: SITE_URL + '/', name: SITE_TITLE, description: SITE_DESCRIPTION, dateModified: HOME_UPDATED,
  inLanguage: 'zh-Hant-TW', isPartOf: { '@id': SITE_URL + '/#website' }, about: { '@id': SITE_URL + '/#organization' },
  primaryImageOfPage: { '@type': 'ImageObject', url: SITE_URL + '/og-image.png', width: 1200, height: 630 },
};

export const faqJsonLd = {
  '@context': 'https://schema.org', '@type': 'FAQPage', '@id': SITE_URL + '/#faq',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export const worksJsonLd = {
  '@context': 'https://schema.org', '@type': 'ItemList', '@id': SITE_URL + '/#works',
  name: '靈境智造作品集', numberOfItems: WORKS.length,
  itemListElement: WORKS.map((w, i) => ({
    '@type': 'ListItem', position: i + 1, url: SITE_URL + '/#' + w.slug,
    item: {
      '@type': 'CreativeWork', name: w.title, description: w.desc, url: w.url,
      genre: WORK_CATEGORIES.find((c) => c.id === w.cat)?.label,
      creator: { '@id': SITE_URL + '/#organization' },
    },
  })),
};

// section 並非階層麵包屑；首頁沒有可照做的完整教學，不輸出 HowTo。
export const HOME_SCHEMAS = [webPageJsonLd, faqJsonLd, worksJsonLd];
