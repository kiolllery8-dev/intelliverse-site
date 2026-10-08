import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://show.intelliverse.tw';

/** 保留既有公開抓取設定。允許抓取不代表會被收錄、引用或獲得排名。 */
const AI_CRAWLERS = [
  'GPTBot',            // OpenAI 訓練
  'OAI-SearchBot',     // ChatGPT 搜尋
  'ChatGPT-User',      // ChatGPT 使用者即時瀏覽
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',   // Gemini 部分資料使用控制；不是 Google 搜尋收錄開關
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
