import type { MetadataRoute } from 'next';
import { SKILLS } from './skills-data';

export const dynamic = 'force-static';

const SITE_URL = 'https://show.intelliverse.tw';

// 首頁內容最後一次實質改版的日期；改首頁文案時記得更新
const HOME_UPDATED = '2026-08-31';

/**
 * 只列真正可以被索引的網址。
 *
 * 之前把首頁的 #about、#works 這類錨點也列進來（25 條），但帶 # 的網址在 sitemap
 * 裡沒有意義 —— 搜尋引擎會把它們全部視為首頁本身，等於送了一堆重複項目。
 * lastModified 也改用每篇的真實更新日期，不再全站寫死同一天。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const skillDates = SKILLS.map((s) => s.updatedAt || s.publishedAt).filter(Boolean) as string[];
  const latestSkill = skillDates.sort().at(-1) || HOME_UPDATED;

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(HOME_UPDATED),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/skills/`,
      lastModified: new Date(latestSkill),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...SKILLS.map((s) => ({
      url: `${SITE_URL}/skills/${s.slug}/`,
      lastModified: new Date(s.updatedAt || s.publishedAt || HOME_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
