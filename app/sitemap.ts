import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://show.intelliverse.tw';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
