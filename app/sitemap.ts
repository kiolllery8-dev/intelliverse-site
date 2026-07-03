import type { MetadataRoute } from 'next';
import { SECTIONS, WORKS, TYPES } from './content';

export const dynamic = 'force-static';

const SITE_URL = 'https://show.intelliverse.tw';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-06-29');
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // 錨點區塊：讓 Google 認得每個 section 是頁面上獨立實體
    ...SECTIONS.map((s) => ({
      url: `${SITE_URL}/#${s.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // 網站類型：每種類型的落地錨點
    ...TYPES.map((t) => ({
      url: `${SITE_URL}/#${t.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // 作品錨點
    ...WORKS.map((w) => ({
      url: `${SITE_URL}/#${w.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
