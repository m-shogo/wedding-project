# Wedding Movie Dashboard

結婚式オープニングムービー制作の管理サイト。

生成画像、自前写真、自前動画、AI動画、Motion Studio書き出し、プロンプト、絵コンテ、進捗、不足素材を一目で見られるローカルWebアプリ。

## 起動方法

```bash
cd movie-dashboard
pnpm install
pnpm dev
```

ブラウザで `http://localhost:5173` を開く。

## 画面

| 画面 | 内容 |
|------|------|
| Dashboard | 全体状況、統計、優先タスク、シーン進捗 |
| Storyboard | 絵コンテ一覧。シーンごとの詳細と素材リンク |
| Asset Library | 素材一覧。タイプ別フィルタ、パス、用途、ステータス |
| Prompt Bank | 生成プロンプト管理。Positive / Negative / 結果リンク |
| Missing List | 不足素材・未確定事項。優先度順で今日やることが分かる |
| CapCut Pack | CapCut編集用パック。タイムライン、素材パス、テロップ、BGM指示 |

## データ管理

データは `src/data/*.json` で管理する。

| ファイル | 内容 |
|----------|------|
| `scenes.json` | シーン（絵コンテ）情報 |
| `assets.json` | 素材情報（パス、用途、ステータス） |
| `prompts.json` | 生成プロンプト |
| `tasks.json` | 不足素材・タスク |

JSONを編集して `pnpm dev` で即反映される。DBは使わない。

## 素材ファイルの方針

大きな画像、動画、音源ファイルはGitに入れない。JSONには素材パス、メモ、用途、ステータスだけを保存する。素材本体は各フォルダに置き、パスだけをJSONに記録する。

## CapCut編集への使い方

1. CapCut Pack画面を開く。
2. シーン順に素材パス、テロップ、BGM指示を確認する。
3. 不足素材があれば Missing List で確認する。
4. 採用済み素材のパスからファイルをCapCutに読み込む。
5. 編集が終わったらJSONのステータスを更新する。

## ビルド

```bash
pnpm build
```
