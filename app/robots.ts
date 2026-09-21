import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://show.intelliverse.tw';

/**
 * 全站開放，並且明確點名 AI 搜尋與答案引擎的爬蟲。
 *
 * `User-agent: *` 本來就涵蓋它們，逐一列出是為了表態 —— 部分平台與稽核工具
 * 會把「有明確允許」當成站方同意被 AI 搜尋引用的訊號。
 * 原本的 Host 指令只有 Yandex 認得，對 Google 無效，已移除。
 */
const AI_CRAWLERS = [
  'GPTBot',            // OpenAI 訓練
  'OAI-SearchBot',     // ChatGPT 搜尋
  'ChatGPT-User',      // ChatGPT 使用者即時瀏覽
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',   // Gemini／AI Overviews
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
