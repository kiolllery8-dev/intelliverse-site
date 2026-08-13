# 每日 Trending Skill 自動收錄流程

這份文件是給**雲端排程 agent** 看的作業說明。每天跑一次，把 GitHub 上新竄出來的
Agent Skill 挑進 `show.intelliverse.tw/skills/`。

排程本身只會說「讀這份文件並照做」，所有規則寫在這裡，要調整直接改這個檔案。

---

## 你要產出什麼

在 `data/skills/` 放入**新的 JSON 檔案**（一個技能一個檔），然後 commit + push 到 `main`。

推上去之後就不用管了：家裡主機上的 GitHub Actions runner 會自動
重生 `app/skills-data.ts`、用 codex 補流程示意圖、build、部署。

**不要**手動編輯 `app/skills-data.ts`（那是產物），
**不要**產生圖片（你在雲端，沒有 codex），
**不要**改 `public/skills-img/`。

---

## 硬性限制

| 項目 | 規則 |
| :-- | :-- |
| 每天最多收錄 | **2 個**。寧可少而精，不要灌水 |
| 找不到夠好的 | **什麼都不做，直接結束**。不要為了交差硬塞 |
| 重複 | 絕對不可以跟 `data/skills/` 既有的重複（比對 slug 與 `source.repo`+`source.path`） |
| 未驗證 | 沒有真的用 API 讀到 SKILL.md 內容，就不可以收錄 |

這是一個對外的公司網站，內容品質比數量重要得多。

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
   → 全部換成蝦皮、momo、LINE 官方帳號、IG、Threads、綠界、藍新
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
  "diagram": {
    "title": "流程圖主標題",             // 6–10 個中文字，不含標點英文數字
    "steps": [                          // 剛好 4 個
      {
        "label": "四個中字",             // 必須剛好 4 個中文字，自己數過
        "icon": "一支麥克風"             // 單一具體物件、輪廓分明好畫的中文描述
      }
    ]
  },
  "source": {
    "repo": "owner/name",
    "path": "skills/example",           // SKILL.md 所在目錄；在根目錄就填空字串 ""
    "stars": "1,234"                    // 千分位逗號
  },
  "order": 78                           // 現有最大 order + 1，往後遞增
}
```

分類只能是：`文件整理`、`行銷內容`、`影音內容`、`電商經營`、`設計創意`、`開發工程`、`業務開發`、`營運管理`

`diagram.steps[].label` **必須剛好 4 個中文字**，而且要是這個技能的**真實操作流程**，
不要通用的「輸入資料→開始處理→產出結果→完成輸出」。
好例子（競品廣告拆解）：`鎖定對手 → 抓下素材 → 拆解賣點 → 整理成表`

`icon` 要能畫得出來：「一個放大鏡」「一台手機」「一份帶折角的文件」可以；
「效率」「智慧分析」「數據流」不行。同一張圖的四個圖示不要重複。

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

推上去之後 CI 會自動補圖、build、部署，你不用等。

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
