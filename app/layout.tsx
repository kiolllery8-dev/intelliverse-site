import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '靈境智造 INTELLIVERSE STUDIO｜軟硬整合・商品・網頁・廣告',
  description:
    '靈境智造是一間結合科技、設計與商業思維的整合型工作室。橫跨軟硬體整合、商品設計、網頁開發與廣告投放，為每一個品牌打造從產品到市場的完整體驗。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
