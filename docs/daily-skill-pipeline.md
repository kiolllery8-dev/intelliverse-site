# 每日技能收錄：完整驗證、審核、發布

唯一負責者為目前 Codex heartbeat；不另建重複 worker。每天台灣時間10:00後首輪執行，桌面離線會延後。每天目標1–3篇、最多3篇，共用每日四次模型工作與20頁研究額度。

## 必須完成的流程

1. 先處理前次候選，再補三種角度搜尋。不能每天只找新候選，將舊候選無限順延。
2. 對最高優先候選讀完原始 SKILL.md、實際 LICENSE、引用檔案與必要腳本。GitHub license=NOASSERTION 不代表沒有授權，應讀 LICENSE 原文。截斷輸出需分段讀完，不能以截斷為理由直接結束。
3. 逐一記錄明確結論：符合並製作、具體原因排除，或確實受登入／額度／來源失效阻塞。單純尚未讀完不算完成每日收錄；留在 verifying，下輪接續同一候選。無合格候選才寫 no-qualified-candidates。
4. 符合者寫 data/skills/<slug>.json，保留來源版本、授權、重複比對與事實證據；以獨立模型審核完整文章。若審核失敗，在剩餘額度內修正並重新審核，不能直接跳過。
5. 由 home server 既有 Codex 登入生成圖片，每日最多3張；逐張目視核對繁體中文標題、畫面與來源。圖片不合格不得推送，發布流程不能依賴未檢查的補圖。
6. 在同步 origin/main 的獨立 worktree 製作。產生 skills-data，正式 build、SEO、內容邊界與部署回復測試通過後才 commit/push。等待 GitHub 成功，核對公開文章、圖片及 sitemap，再記發布收據。
7. state/skill-intake.json 記候選與每個步驟；終態只使用 published、no-qualified-candidates、completed-no-publication。completed-no-publication 必須保留明確拒絕／阻塞原因，不可用來掩蓋未完成驗證。writer/reviewer/image 及重試共用每日四次額度，完成後釋放校正 worker 保留額度。

訂正：本流程由本機 heartbeat 執行，能使用 home Codex 生圖。下列欄位與寫作規範仍適用；原文若涉及雲端不能生圖、每天2篇、不用等部署等舊規則，以本節為準。平台本地化僅能改情境，不能編造蝦皮、momo或金流整合能力。FAQ須與可見內容一致，不保證被搜尋或AI引用。

## 硬性限制

| 項目 | 規則 |
| :-- | :-- |
| 每日收錄目標 | **1–3 個**，每日最多 3 個；須通過來源核對與獨立內容審核 |
| 找不到夠好的 | **什麼都不做，直接結束**。不要為了交差硬塞 |
| 重複 | 絕對不可以跟 `data/skills/` 既有的重複（比對 slug 與 `source.repo`+`source.path`） |
| 未驗證 | 沒有真的用 API 讀到 SKILL.md 內容，就不可以收錄 |

這是一個對外的公司網站，內容品質比數量重要得多。

2026-10-07 使用者核定每日 1–3 個。啟用前確認原雲端排程的負責者，只有一套流程負責新增技能；既有技能校正 worker 不兼做新增。沒有合格候選、用量不足或審核未通過時可以是 0 個，不補發湊數。三篇可合為每日一批，仍遵守第一週每日一批發布與正式建置、SEO、部署回復檢查。每日新圖片額度隨新技能上限調整為最多 3 張，使用既有 Codex 生圖方式與網站風格；模型每日四次的上限不變，製作與獨立審核須先預留用量。本文的數量設定不代表排程已啟用。

---

## 步驟

### 1. 盤點已收錄的

```bash
ls data/skills/*.json | wc -l
node -e "const fs=require('fs');for(const f of fs.readdirSync('data/skills')){const o=JSON.parse(fs.readFileSync('data/skills/'+f));console.log(o.slug,'|',o.source.repo,'|',o.source.path)}"
```

記下所有 slug 與 `repo/path` 組合，後面要用來排除重複。

### 2. 找今天竄出來的候選

至少用**三種**不同角度找，不要只靠一種：

1. **GitHub trending 頁面**（沒有官方 API，直接抓 HTML）
   ```bash
   curl -sL "https://github.com/trending?since=daily" | grep -oE 'href="/[^"]+/[^"]+" ' | sort -u
   curl -sL "https://github.com/trending/python?since=daily"
   ```
   從結果裡挑名字或描述跟 skill / agent / claude / prompt 有關的。

2. **最近建立且已有星數的 repo**
   ```bash
   gh search repos "agent skills" --sort stars --limit 30 --json fullName,stargazersCount,description,createdAt
   gh search repos "claude skill" --sort updated --limit 30 --json fullName,stargazersCount,description,pushedAt
   ```
   中英文關鍵字都試：`agent skills`、`claude skills`、`ai skill`、`技能`、`skill 集合`。

3. **搜 SKILL.md 內容**，挖出藏在大型集合裡、repo 名稱看不出來的
   ```bash
   gh search code --filename SKILL.md "電商" --limit 20
   gh search code --filename SKILL.md "invoice" --limit 20
   ```

`gh` 有機率被限流回空值。**回空不等於沒有** —— 換關鍵字或等幾秒重試。
真的不行就改用 `curl -s "https://api.github.com/search/repositories?q=..."`。

### 3. 篩選

讀者是**台灣的中小企業老闆、電商賣家（蝦皮／momo／LINE 商店）、接案設計師、社群小編**。
他們忙、不懂技術、只想知道「這東西能幫我省什麼」。

**收**：解決一件真實會浪費時間的事（對帳、報價、客訴、排班、找資料、做簡報、上架文案）；
不用寫程式就能用；不需要企業級系統。

**不收**：
- 純工程師向（框架教學、CI/CD、程式碼重構、資料庫調校）
- 需要付費 SaaS 帳號才能動的（除非它同時是該領域最好的選擇，那就收但要在 `tips` 講清楚）
- 太抽象沒有具體產出的（「思考框架」「方法論」）
- `anthropics/skills` 及其鏡像 —— 網站定位是「官方以外的社群 skills」，不收
- SKILL.md 檔名不是大寫 `SKILL.md` 的（例如 `skill.md`），那載入不了
- SKILL.md 沒有 YAML frontmatter 的，那也載入不了
- SKILL.md 引用的腳本在 repo 裡不存在的（實際去 `gh api` 查目錄確認）

### 4. 驗證（不可跳過）

對每個要收錄的：

```bash
gh api repos/OWNER/REPO --jq '{stars: .stargazers_count, desc: .description}'
gh api repos/OWNER/REPO/contents/PATH/SKILL.md --jq '.content' | base64 -d
```

- repo 不存在 → 剔除
- SKILL.md 讀不到 → 自己找出正確路徑，找不到就剔除
- **讀完全文再判斷它到底做什麼**，不要看名字猜

### 5. 寫繁體中文介紹文

一個技能一個 `data/skills/<slug>.json`。`<slug>` 用小寫英數與連字號，要跟檔名一致。

#### 寫作規則（違反就是失敗）

1. **一律繁體中文台灣用語**。嚴禁：`視頻/軟件/信息/質量/賦能/顆粒度/一鍵/打通/閉環/落地頁/公眾號/小程序/用戶/網絡/默認/智能/屏幕/激活/復購/拉新/私域/爆款/種草/引流/轉化/營銷/第一屏`
   → 要用：`影片/軟體/資訊/品質/銷售頁/使用者/網路/預設/智慧/螢幕/啟用/回購/開發新客/自有客群/熱賣款/推薦/導流/轉換/行銷/第一眼`
2. **不要中國平台**。原始 SKILL.md 常是簡體中文寫的、舉例是淘寶抖音微信支付寶
   → 只有來源支持的情境才可在地化；不編造蝦皮、momo、LINE 或金流整合。
3. **不要翻譯腔**。不要「基於」「進行」「針對…進行」「賦予」「助力」
4. **講具體**。「提升效率」要換成看得到畫面的事，例如「原本要開三個分頁比對，現在一次列出來」
5. **不要誇大**。不要「業績翻倍」「保證」「百分之百」
6. **不要寫成技術文件**。不要出現 CLI 指令、API 名稱、程式碼、檔案路徑。使用者是對著 AI 講話
7. **`nameZh` 要講「做到什麼事」**，不要直譯英文名，8–14 字，不可與既有 77 篇重複
8. **需要付費金鑰或雲端服務的，一定要寫在 `tips` 裡**，不可以假裝免費

#### JSON 格式

```jsonc
{
  "slug": "example-skill",              // 小寫英數連字號，與檔名一致
  "nameEn": "Example Skill",
  "nameZh": "把某件麻煩事變簡單",        // 8–14 字，講做到什麼事
  "category": "電商經營",                // 必須是下列其中之一
  "tagline": "一句話說明",               // 20–30 字
  "summary": "2–3 句總覽",               // 80–140 字
  "painPoint": "解決的痛點",             // 40–70 字，用老闆的口吻描述現況有多煩
  "whatItDoes": ["…"],                  // 4–6 條，每條 20–45 字
  "scenarios": [                        // 剛好 3 個
    { "title": "情境標題", "body": "80–140 字，要具體到有數字或畫面感" }
  ],
  "howToUse": [                         // 剛好 4 步
    { "step": "步驟標題", "detail": "90–150 字，要能照做" }
  ],
  "examplePrompt": "可直接複製貼上的完整中文指令",  // 120–220 字
  "exampleResult": "產出長什麼樣",        // 100–180 字
  "tips": ["…"],                        // 3–4 條，每條 30–60 字
  "bestFor": "最適合誰用",               // 30–50 字
  "keywords": ["…"],                    // 5–8 個
  "illustration": {
    "title": "圖上的標題",               // 6–10 字，會直接印在照片左側，是圖上唯一的文字
    "focalObject": "一塊木製紅龜粿印模，與它壓出的四個一模一樣的粿",   // 畫面主體，一句話
    "scene": "一塊雕著花紋的木製粿印倒扣在檯面上。左邊並排著剛脫模的四個粿…"  // 60–120 字
  },
  "source": {
    "repo": "owner/name",
    "path": "skills/example",           // SKILL.md 所在目錄；在根目錄就填空字串 ""
    "stars": "1,234"                    // 千分位逗號
  },
  "order": 78,                          // 現有最大 order + 1，往後遞增
  "publishedAt": "2026-09-21",          // 今天的日期（YYYY-MM-DD）
  "updatedAt": "2026-09-21",            // 新收錄時與 publishedAt 相同
  "faq": [                              // 剛好 3 題，會顯示在頁面上並標成 FAQPage
    { "q": "AI 可以幫我整理發票嗎？", "a": "可以。第一句直接回答，50–110 字…" }
  ]
}
```

分類只能是：`文件整理`、`行銷內容`、`影音內容`、`電商經營`、`設計創意`、`開發工程`、`業務開發`、`營運管理`

#### 常見問答怎麼寫（`faq`）

這3題需與可見內容一致並能獨立理解；是否收錄或引用由搜尋服務決定。

- **不可以編造**：答案裡每個事實都要能在這篇 JSON 的其他欄位找到依據。
  沒寫到價格就不要答價格，tips 沒提到付費就不要問「要付費嗎」
- **問題照真人會打的字**，而且要帶主題關鍵字：「AI 可以幫我整理發票嗎」✓、「這個技能能做什麼」✗
- **答案第一句就直接回答**（「可以。」「不用寫程式。」），不要鋪陳
- **答案要能單獨成立**：抽出來單獨看也看得懂，不要用「它」「如上所述」開頭
- 問題 12–30 字、答案 50–110 字

#### 插畫主題怎麼想（`illustration`）

圖是一張**質感靜物照**：米白攝影棚背景、左上斜射光、主體靠右、左側留白印一行標題。
畫風由 `tools/skill-image-style.txt` 統一控制，你只負責決定**畫什麼**。

**最重要的一條：換題測試。**
寫完 `scene` 自己問一次：「這個畫面套到另一個技能，還說得通嗎？」說得通就是失敗，重寫。

- ✗ 「一個放大鏡在看文件」—— 競品分析、SEO 健檢、合約審閱、資安掃描全都適用，等於沒說
- ✓ 「一份合約攤開，三行字被撕掉又用不同顏色的紙補回去，旁邊躺著一支紅筆」—— 只可能是合約比對

其他規則：
- 主體要是**具體實體物件**（收據、紙箱、粿印、月曆、包裝盒、印章、貨架），
  不是抽象概念（效率、智慧、成長、數據流）
- **禁用放大鏡、燈泡、齒輪、打勾** —— 這些萬用圖示什麼都能代表，等於什麼都沒代表
- 元素之間要有**動作或轉變**（正在被撕開、被整理、被壓進模具），不要只是靜物並排
- 台灣的實體物件優先：統一發票的細長紙條、蝦皮的黃色包裝袋、手寫估價單
- 跟既有 77 個的 `focalObject` 不可以撞，先掃一遍再決定
- `title` 是**圖上唯一的文字**，6–10 字。畫面上不可以有其他任何字

### 6. 自己檢查一遍

```bash
npm ci
npm run build:skills     # 有欄位缺漏、slug 對不上、分類不合法會直接報錯
npm run build            # 一定要通過才可以 push
```

再自己掃一次中國用語：

```bash
node -e "
const fs=require('fs');
const BAD=['視頻','軟件','信息','質量','賦能','一鍵','落地頁','用戶','網絡','默認','智能','屏幕','復購','拉新','私域','爆款','種草','引流','轉化','營銷','第一屏','淘寶','抖音','微信','支付寶','小紅書'];
for(const f of process.argv.slice(1)){
  const b=fs.readFileSync(f,'utf8');
  for(const w of BAD) if(b.includes(w)) console.log('⚠',f,w);
}
" data/skills/<新的檔名>.json
```

有問題就改到乾淨，不要帶著問題 push。

### 7. Commit 並推送

```bash
git add data/skills/
git commit -m "feat(skills): 收錄 <中文名>（<repo>，<stars>★）"
git push origin main
```

Commit 訊息用繁體中文，一行講清楚收了什麼、從哪來、幾顆星。

圖片須先生成與目視審核後納入 commit。推送後等待 CI build、SEO 及部署成功，再驗證公開頁。

### 8. 回報

最後用繁體中文簡短說明：
- 今天掃了哪些角度、看了大約幾個 repo
- 收錄了什麼、為什麼選它
- **有哪些看起來不錯但被你剔除的，以及剔除的原因**（這部分很有價值，一定要寫）
- 如果今天沒收錄任何東西，就直說「今天沒有夠格的」，並列出你看過的前幾名與淘汰理由

---

## 常見誤判，別再犯

- `點擊率`、`菜單`、`矩陣` 是台灣數位行銷的正常用語，**不要**當成中國用語去改
- 星數高 ≠ 能用。實際查過才算：
  - 有些高星專案根本沒有 SKILL.md，是完整應用程式不是 skill
  - 有些 SKILL.md 引用的腳本在 repo 裡不存在
  - 有些 SKILL.md 沒有 YAML frontmatter，載入不了
- `gh` 回空值多半是限流，不是真的沒有結果
