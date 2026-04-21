# 靈境智造 INTELLIVERSE STUDIO 官網

一頁式 Next.js 品牌網站，仿 [begonia-design.com.tw](https://begonia-design.com.tw/) 的極簡＋橘色點綴風格。

## 本地開發

```bash
npm install
npm run dev
# 打開 http://localhost:3000
```

## 本地靜態匯出（測試 GitHub Pages 產物）

```bash
npm run build
# 產物會在 ./out 資料夾
npx serve out
```

## 部署到 GitHub Pages

### 第一次設定

1. 在 GitHub 建立 repository（例：`axis-studio-site`），把這個資料夾整個推上去：

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/<repo 名稱>.git
   git push -u origin main
   ```

2. 到 GitHub repo 的 **Settings → Pages**，Source 選 **GitHub Actions**。

3. 推送後 `.github/workflows/deploy.yml` 會自動跑，幾分鐘後網站就會上線在：

   ```
   https://<你的帳號>.github.io/<repo 名稱>/
   ```

### 之後每次更新

```bash
git add .
git commit -m "update"
git push
```

自動部署。

## 客製化

- 公司名字、文案：直接改 `app/page.tsx`
- 顏色、字型：改 `app/globals.css` 最上方的 CSS 變數 `--accent` `--ink` 等
- 聯絡資訊：改 `app/page.tsx` 裡的 footer 區塊

## 技術

- Next.js 14 (App Router)
- 靜態匯出 (`output: 'export'`)
- 純 CSS（無 Tailwind / UI 套件），易於接手
- GitHub Actions 自動部署
