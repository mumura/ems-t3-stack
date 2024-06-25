# event-matching-service

![Vercel](https://vercelbadge.vercel.app/api/biki-cloud/ems-t3-stack)


## サービス
[event-matching-service](ems-t3-stack.vercel.app)

# ローカル開発
```bash
# ローカルで起動
$ npm run dev

# プリズマスタジオの起動
$ npx prisma studio

# stripeのwebhookを起動
$ stripe listen --forward-to localhost:3000/api/webhook

# DBデータを初期化&リセット
$ ./init_db.sh

# docs/ERD.pngを更新
$ ./node_modules/.bin/mmdc -i docs/ERD.md -o docs/ERD.png

# npmのリセット
$ npm cache clean --force && rm -rf node_modules package-lock.json && npm install

# Playwright
$ export BASE_URL=https://www.sunnybe.online/
$ npx playwright test
$ npx playwright codegen http://localhost:3000/
```

## 技術スタック

### アーキテクチャ: T3 Stack
- [Create T3 App](https://create.t3.gg/)

### 言語(フロントエンド&バックエンド)
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">

### デザイン
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white">

### デプロイメント
<img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white">

### DB
<img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white">

### ファイルストレージ
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white">

### CI/CD
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">

### E2E
<img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white">

## その他
- [haruyasu/t3-stack-deploy-tutorial](https://github.com/haruyasu/t3-stack-deploy-tutorial)
- [[完全版] T3 Stack入門！デプロイまで実践するサブスクアプリ構築マスターガイド - YouTube](https://www.youtube.com/watch?v=EVjx7lAu0XQ&t=506s)
- [アイコン](https://github.com/Ileriayo/markdown-badges)

# TODO
- プロジェクトの理解
- 頻繁に使うパーツをコンポーネントにする
  - パーツに必要な情報はプロップスを渡す形になる
  - components/utils/aicon.tsxみたいなイメージ
  - 頻繁に仕様するパーツ
    - ユーザプロフィールへのリンクになっているアイコン + 名前
    - 情報入力,編集(名前:入力欄)
    - 情報表示(名前：値)
- ESlintを導入
- 主催者の自己紹介ページやプロフィールに投稿一覧(/author/xxx)のリンクを貼る
- 出店者検索
- 消費者検索
- playwrightの導入。BASE_URLを読み込むやり方。githubactionsで動かす. playwrightのgithubバッチも追加したい。
- イベントの並べ方はもう少しかっこよくできないか？
  - youtubeみたいな感じが良さそう, スマホとPCを真似る
  - PCの場合のみサイドバー. サイドバーと同じ項目をスマホの場合は右上のユーザ欄に入れるか
## プレリリースまでやること
- 自前でsupabaseのバックアップ機能を作成 
- 開発用と本番用のDBを用意
