# 靈境智造服務內容優化紀錄

研究日期：2026-10-05（Asia/Taipei）。使用自架 Firecrawl MCP 搜尋及逐頁 scrape。crawl 端點回傳 `getaddrinfo ENOTFOUND api`，部分含空格的搜尋回傳 503；改用更精確的搜尋找到來源後逐頁讀取。成功取得 11 個同類網站的 14 個頁面，另讀取 Google 與 LINE 官方文件。原始研究存於本機 `.firecrawl/content-research-2026-10-05/`，不將第三方全文發布到網站或版控。

## 已讀取的比較頁面

| 網站 | 頁面 | 可借鏡的內容結構 |
| --- | --- | --- |
| 海棠設計 | https://begonia-design.com.tw/ | 商業目標、研究、設計、開發、維運連成服務 |
| 海棠設計 | https://begonia-design.com.tw/service | 服務分項、驗證與交付流程 |
| 海棠設計 | https://begonia-design.com.tw/service/maintenance | 上線後的內容管理、工程支援與成效檢視 |
| 海棠設計 | https://begonia-design.com.tw/work/content/sangean | 案例背景、要解決的問題、功能特色 |
| 愛立歐 | https://www.ileo.com.tw/seo/ | 健檢、關鍵字、架構、報告拆分 |
| 鮭魚設計 | https://masoudesign.com/zh-TW/website-design | 網站類型、後台更新、基本 SEO 與 FAQ |
| 八拓 | https://www.keywordseo.com.tw/taichung-digital-marketing/ | 用詢問與成交檢視流量、區分工作與指標 |
| 創意數位科技 | https://www.gcreate.com.tw/blog/台中網站設計/ | 建站需求、費用、搜尋與內容的決策問題 |
| 瑪尼國際 | https://mani.tw/ | 主機、網站維護、內容與追蹤的範圍區分 |
| FORDIGE | https://fordige.com/blog/taichung-web-design-seo-integration-guide | 架構與內容一起規劃、服務頁與文章互連 |
| 智賦 AI | https://zhifuaitech.com/services/workflow-automation-consulting | 流程盤點、可行性、交付清單與 KPI |
| 恆遠數位科技 | https://foreverwebs.com/services/ai-consult | 將痛點對應流程、先試跑、拆分建置與用量成本 |
| 許一文 | https://yiwenlab.com/ | 操作交接、維護責任、工時與成本估算 |
| 資拓宏宇 | https://product.iisigroup.com/products_and_service/企業流程自動化rpa顧問服務/ | 自動化導入與後續維運的完整範圍 |

來源頁面的案例數、報價、成效、排名承諾與所有技術說法均為各站自行陳述，未獨立驗證，不沿用為靈境智造成果或市場事實。尤其「自架資料絕不外流」「換網址必定流量歸零」「套版不能 SEO」等過度概括說法不採用。

## 官方核對

- Google 使用者優先內容：https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=zh-tw 。採用有用、原創、能協助使用者決策的內容方向；不以字數、關鍵字密度或 llms.txt 當排名保證。
- LINE Notify 結束服務：https://notify-bot.line.me/ 。官方公告於 2025-03-31 結束，移除網站過期的通知服務承諾。

## 落實的差異

1. 新增三個可獨立搜尋的服務頁，分別回答建站、SEO 代管、自動化導入需求。每頁包含適用情境、可組合的交付內容、工作流程、成果指標、報價因素、準備清單與四題 FAQ。
2. 首頁說清楚台中太平的工作室定位，新增服務詳情入口，技能數改由資料自動取得。
3. 保留用戶已確認的蝦皮／MOMO服務，改為權限與平台規則評估後的人工協作；移除未有依據的無人操作、曝光不中斷、庫存自動下架與固定回覆速度承諾。
4. 服務頁連結既有作品、技能與其他服務；不把第三方案例當自己的案例，不新增虛構成效與費用。
5. 同步 canonical、OG、Twitter、sitemap 與可見內容一致的 Service／FAQ／Breadcrumb 結構化資料。搜尋排名與流量改善需上線後用實際數據觀察。

## 驗證方式

- 正式靜態匯出與 TypeScript 檢查通過。
- 新增 `npm run check:seo`：檢查實際匯出的 82 個可索引頁面，包含唯一標題與描述、canonical、H1、內部連結與錨點、圖片路徑、社群分享圖片、sitemap 和可見 FAQ。部署前必須通過此檢查。
- 瀏覽器驗證手機 390px 與桌面各斷點，確認無水平溢出、手機選單與 FAQ 可開關、作品入口會展開作品區。修正 Logo 與導覽列擠在一起的間距。
