# Wedding Movie Dashboard

結婚式ムービー制作の管理サイト。

複数ムービー対応の制作ハブ。シーン、素材、プロンプト、タスクをブラウザ上で編集・管理できる。データはlocalStorageに保存され、JSON形式でエクスポート・インポートが可能。

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
| Dashboard | 全体状況、統計、優先タスク、ムービー別進捗、シーン進捗カード |
| Storyboard | シーンの追加・編集・削除・複製・並び替え。素材とプロンプトの紐付け・解除 |
| Asset Library | 素材のCRUD。タイプ・ステータス別フィルタ、パスコピー |
| Prompt Bank | プロンプトのCRUD。ターゲット・ステータス別フィルタ、コピー、展開・折りたたみ |
| Missing List | タスクのCRUD。カテゴリ・ステータス別フィルタ、期限超過表示、完了セクション折りたたみ |
| CapCut Pack | CapCut編集指示書。Markdown・JSON書き出し、CapCutメモ編集、CapCut Readyインジケータ |
| Production Map | 制作全体の依存関係マップ。ムービー別概要、シーン別依存状況テーブル、要対応タスク |
| Data Manager | JSON全データのエクスポート・インポート、データ整合性検証、デフォルトリセット |

## データ管理

初期データは `src/data/*.json`。編集結果はlocalStorageに自動保存される。

| ファイル | 内容 |
|----------|------|
| `movies.json` | ムービープロジェクト（オープニング、プロフィールなど） |
| `scenes.json` | シーン（絵コンテ）情報 |
| `assets.json` | 素材情報（パス、用途、ステータス） |
| `prompts.json` | 生成プロンプト |
| `tasks.json` | タスク（不足素材、未確定事項など） |

Data Manager画面からJSON形式でエクスポート・インポートできる。DBは使わない。

## 素材ファイルの方針

大きな画像、動画、音源ファイルはGitに入れない。JSONには素材パス、メモ、用途、ステータスだけを保存する。

## CapCut編集への使い方

1. CapCut Pack画面を開く。
2. シーン順に素材パス、テロップ、BGM指示を確認する。
3. CapCut Readyインジケータで準備完了シーンを確認する。
4. Markdown書き出しで編集指示書をダウンロードできる。
5. CapCutメモをその場で編集できる。

## ビルド

```bash
pnpm build
```
