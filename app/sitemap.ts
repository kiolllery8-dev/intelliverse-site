import type { MetadataRoute } from 'next';
import { SECTIONS, WORKS, TYPES } from './content';
import { SKILLS } from './skills-data';

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
    // AI 技能圖書館索引
    {
      url: `${SITE_URL}/skills/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // 每個技能一頁 —— 各自鎖定不同長尾關鍵字
    ...SKILLS.map((s) => ({
      url: `${SITE_URL}/skills/${s.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // 首頁錨點區塊
    ...SECTIONS.map((s) => ({
      url: `${SITE_URL}/#${s.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // 網站類型錨點
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
