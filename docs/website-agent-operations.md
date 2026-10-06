# 網站自動優化操作紀錄

啟動日期：2026-10-05，時區 Asia/Taipei。

## 現在自動執行的範圍

- home server 的 `show-site-health.timer` 每 15 分鐘檢查首頁、三個服務頁與 sitemap。
- `show-site-research.timer` 每天 00:10、06:10、12:10、18:10 挑一篇尚未檢查的技能，優先核對原始 SKILL.md。來源經自架 Firecrawl 取得。首輪優先檢查 clipify 的本機／雲端說明。
- Codex 以唯讀 sandbox、關閉 shell／web tools、忽略使用者 MCP 設定的方式執行，只收到當篇公開文章與原始文件。第一輪提出文字修正，第二輪獨立審核。
- 模型無法直接修改網站。Python 驗證器只接受既有技能文章的指定文字欄位、1–8 個修改、每欄最多 650 字、正確 before 值與可核對的原文引述；禁止 HTML、URL 及來源／標題／圖片／分類變更。
- GitHub `Website agent publication` 工作流每天台灣時間 11:00、17:00 檢查待發布提案；GitHub 排程可能延遲。
- 開始後前 48 小時不發布。通過觀察期、回復演練、健康檢查、獨立審核及 build／SEO 檢查後，第一週每日最多一批，以後每日最多兩批。來源與文章必須對應目前 main，提案超過 36 小時或同頁 14 天內改過就跳過。
- 暫不自動新增技能、圖片、服務承諾或改版 UI。既有每日技能收錄流程是否仍啟用，先由巡檢確認，避免兩套機制重複產出。
- Codex App 的「靈境智造網站優化巡檢」每 6 小時讀取 server 報告並處理實際阻塞、追蹤同業內容機會，週一整理週報。桌面離線會延後這一層巡檢與通知；server 監測、技能核對與 GitHub 發布不依賴桌面。

這是規劃的第一階段：先讓可驗證的既有技能校正自動運轉，再依數據與實際紀錄擴大工作範圍。GA4／Search Console 的資料 API 權限、有效詢問追蹤尚待查核，不能宣稱已根據流量自動改版。

## 工作位置與限制

- 程式：`/home/user/show-site-agent/bin/website-agent.py`
- 獨立只讀研究 checkout：`/home/user/show-site-agent/repository`
- 私有狀態及證據：`/home/user/show-site-agent/state`
- Firecrawl 憑證：`/home/user/show-site-agent/credentials/firecrawl.key`，權限 600，不進 Git。
- 不授予 worker GitHub 寫入 token；發布只在受控 GitHub Actions 內使用短期 repo token。
- systemd 禁止提權、主檔案系統唯讀、限制可寫範圍，隱藏 SSH、sudo、Cloudflare、GitHub 憑證與憑證目錄。現階段使用既有 user 身分與 Codex 登入，尚未建立獨立 Unix 帳號。
- 單次模型工作最多 20 分鐘，每日最多四次（審核計入）；來源每日最多 20 頁。私有研究保存 45 天，健康紀錄最多 30 天。
- 工程聊聊維持真人，不讀聊天資料、不修改其他網站。

## 發布與回復

`tools/deploy-atomic.py` 將已驗證的 out 複製到 `/opt/auslife/nginx-static/show-releases/`，再原子切換 `show` 連結。原有目錄首次遷移也使用 Linux 原子交換。

每次發布後直接檢查 origin 的四個頁面；失敗時只在目前仍指向本次版本的情況下回復上一版，避免撤銷其他發布。保留至少三個版本。`deploy-home.yml` 與 agent 發布共用 GitHub concurrency 及本機發布鎖。

若 agent 發布失敗，另確認遠端 main 還是該次 commit 才以 revert 復原 Git；不 force push。記錄寫入失敗不會觸發程式碼回退。GitHub Actions 的服務 token 推送不會再次觸發 push 工作流，因此 agent 工作流自行執行部署及檢查。

## 查看、暫停與恢復

```bash
systemctl list-timers 'show-site-*' --all
systemctl status show-site-health.service show-site-research.service
cat /home/user/show-site-agent/state/health.json
cat /home/user/show-site-agent/state/latest-research.json
cat /home/user/show-site-agent/state/publications.json
```

部分檔案要等第一輪完成或第一次發布才會存在。`error-*.json` 若有較晚的 `resolvedAt`，代表該錯誤已排除。

緊急暫停：將 `state/config.json` 的 `paused` 改為 `true`。研究及自動發布都會停止，健康檢查仍繼續。恢復時改回 `false`，原觀察期與發布限額仍有效。完全停用可停止兩個 systemd timer、關閉 GitHub agent 工作流排程並暫停 Codex App 巡檢。

不要手動把 `startedAt` 往前改來跳過觀察期。只有 Linux 回復演練及實際部署成功後，才將 `releaseRehearsalPassed` 設為 true。

## 已加入的驗證

- `python3 tools/test-website-agent.py`：六項內容邊界測試，包括來源欄位不可修改、過期 before、缺乏證據、HTML 注入、重複欄位。
- `python3 tools/deploy-atomic.py --self-test`：暫存環境的原子遷移、版本切換及失敗回復。
- 既有正式 build、TypeScript 與 82 頁 SEO 匯出檢查。

## 2026-10-06 來源失效修正

Firecrawl 將原始文件的 404 包成 502 時，只有明確的 SOURCE_HTTP_ERROR、來源 404/410 且 retryable=false 才列入私有 source-unavailable.json 並標記已核對，讓下一輪繼續其他技能。暫時性 503、登入及其他錯誤仍保留失敗狀態。失效来源不產生修訂、不更換文章來源、不略過發布審核。新增兩項來源錯誤分類測試，八項測試通過。

