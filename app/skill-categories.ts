/**
 * 技能分類的網址 slug 對照。
 * 手動維護（不像 skills-data.ts 是自動產生的），
 * 讓 /skills 的分類錨點是 #cat-docs 而不是編碼過的中文。
 */
export const CATEGORY_SLUGS: Record<string, string> = {
  文件整理: 'docs',
  行銷內容: 'marketing',
  影音內容: 'video',
  電商經營: 'ecommerce',
  設計創意: 'design',
  開發工程: 'dev',
  業務開發: 'sales',
  營運管理: 'operations',
};

export function catSlug(category: string): string {
  return CATEGORY_SLUGS[category] || encodeURIComponent(category);
}
