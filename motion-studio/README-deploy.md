# Vercel確認用デプロイメモ

書き出した素材を家族・パートナーとスマホで確認したいときだけ使う、静的確認用の手順。
**本制作はローカル(Remotion Studio + CapCut)で完結する。デプロイは必須ではない。**

## 大原則: 個人写真を公開しない

- `public/photos/` の実写真、実写真入りの書き出し動画は**アップロードしない**
- 上げてよいのは、写真プレースホルダー状態のテンプレ素材
  (搭乗券・地図・ハンコ・雲海・窓・扉・カウントダウン)だけ
- BGM入りの動画も上げない(音源の利用条件が確認できるまで)
- VercelのURLは推測されにくいが**公開URL**。アクセス制限はない前提で扱う
- 確認が終わったらデプロイを削除する(`vercel remove`)

## 手順(プレビュー動画の共有)

1. 共有用フォルダを作り、確認したい動画だけコピーする:

```sh
cd motion-studio
pnpm render --all preview          # 軽量プレビューを一括生成
mkdir -p /tmp/ms-share
cp out/preview/*_preview.mp4 /tmp/ms-share/
```

2. 一覧用の `index.html` を置く(手書きでよい):

```html
<!doctype html><meta charset="utf-8"><title>motion-studio preview</title>
<body style="background:#1C2A44;color:#F7F2E9;font-family:serif;padding:24px">
<h1>素材プレビュー</h1>
<!-- 確認したい分だけ並べる -->
<h2>搭乗券</h2><video src="boarding_pass_intro_preview.mp4" controls width="100%"></video>
<h2>スタンプ連打</h2><video src="stamp_rush_full_route_preview.mp4" controls width="100%"></video>
</body>
```

3. Vercel CLIでデプロイ(初回はログインを求められる):

```sh
cd /tmp/ms-share
vercel deploy            # プレビューURLが発行される
```

4. URLを共有 → 確認が済んだら削除:

```sh
vercel remove <project名>
rm -rf /tmp/ms-share
```

## やらないこと

- Remotion Studio自体のデプロイ(Studioはローカル専用)
- アップロード機能・認証・DBを持つWebアプリ化
- 実写真・BGM入り素材の公開
