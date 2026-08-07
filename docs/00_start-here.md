# Start Here

作業開始時に最初に見るページ。

## 何をしたいかで選ぶ

### 迷ったら最初に見る

1. `docs/task-board.md` — 今やること、Blocked、次に確認するもの。
2. `README.md` — repo全体の入口、制作ハブ、Git管理ルール。
3. `movie-dashboard/README.md` — ブラウザ管理ダッシュボードの使い方。
4. `docs/figma-wedding-movie-dashboard-demo.md` — Figmaデモと情報設計。
5. `docs/palmier-operation.md` — Palmier Free + Claude Code MCPの運用手順。

### 最初に始める

1. `docs/materials-todo.md` を見る。
2. 会場仕様を `docs/templates/venue-specs.csv` に記録する。
3. BGM候補を `docs/templates/music-candidates.csv` に集める。
4. 参考映像を `docs/templates/reference-log.csv` に集める。
5. `docs/02_style-bible.md` を好みに合わせて更新する。

### オープニングムービーを進める

1. `02_opening-movie/roadmap.md` を見る。
2. `docs/opening-90s-storyboard.md` で90秒構成を確認する。
3. `docs/ai-generation-prompt-pack.md` から必要な静止画・AI動画プロンプトを選ぶ。
4. `docs/palmier-operation.md` に従ってPalmier 10秒試作を行う。
5. 10秒試作が安定したら30秒試作へ進む。
6. 結果を `movie-dashboard`、`docs/templates/review-notes.csv`、`docs/templates/ai-video-scorecard.csv`、`docs/templates/capcut-edit-plan.csv` に反映する。

### Palmier Free + Claude Code MCPを使う

1. Palmierを起動する。
2. `docs/palmier-operation.md` のMCP接続確認プロンプトをClaude Codeに投げる。
3. `02_opening-movie/source/palmier-test-001/` にテスト素材だけ置く。
4. 10秒試作を作る。
5. `docs/palmier-dashboard-sync.md` に従ってmovie-dashboardへ反映する。
6. 問題なければ30秒試作へ進む。

### 画像生成・AI動画生成を進める

1. `docs/02_style-bible.md` を見る。
2. `docs/04_ai-video-assets.md` を見る。
3. `docs/ai-generation-prompt-pack.md` から静止画プロンプトを使う。
4. 静止画を目視QAする。
5. 採用候補だけSeedance/Kling等で3〜5秒動画化する。
6. `docs/templates/ai-video-scorecard.csv` に採点を残す。

### movie-dashboardを使う

1. `cd movie-dashboard && pnpm dev` で起動する。
2. ダッシュボードで全体状況を見る。
3. 絵コンテでシーンを確認する。
4. 素材ライブラリに素材パスと採否を登録する。
5. 動画プロンプト/Prompt Bankでプロンプトと結果素材を紐付ける。
6. 不足・未確定リストに足りない素材を入れる。
7. CapCut編集パックで仕上げ作業を確認する。
8. データ管理でJSONエクスポートし、必要に応じて `src/data/*.json` へ反映する。

### 素材を送る

1. `00_inbox/` に置く。
2. `docs/07_asset-intake.md` を見る。
3. `docs/templates/asset-log.csv` に記録する。
4. 写真なら `docs/templates/photo-selection.csv` に候補理由を書く。

### プロフィールムービーを進める

1. `01_profile-movie/brief.md` を見る。
2. `01_profile-movie/roadmap.md` を見る。
3. `01_profile-movie/chapter-plan.md` を見る。
4. `docs/templates/photo-selection.csv` で写真候補を選ぶ。
5. `docs/templates/storyboard.csv` に秒割りを作る。
6. `docs/templates/capcut-edit-plan.csv` に編集指示を作る。

### BGMを決める

1. `docs/templates/music-candidates.csv` に候補を書く。
2. 会場上映、SNS投稿、YouTube公開の利用可否を分ける。
3. 盛り上がり位置を `storyboard.csv` に反映する。

### 会場仕様を確認する

1. `docs/templates/venue-specs.csv` に分かる範囲で書く。
2. 不明な項目は `unknown` のままにする。
3. 最終書き出し前に `docs/09_deliverables.md` と照合する。

### ラフ版を確認する

1. `docs/10_quality-gates.md` を見る。
2. `docs/templates/review-notes.csv` に指摘を残す。
3. 直すもの、保留するもの、捨てるものを分ける。

## AIに頼む時の短い型

```text
この素材を結婚式ムービー用に分類して。
目的:
使いたいムービー:
素材の説明:
気になること:
```

```text
この写真候補からプロフィールムービーの秒割りを作って。
テーマは旅行。
実写真中心、AI動画は章切り替えだけ。
```

```text
この章に使うAI背景素材を3-5秒で提案して。
Style Bibleに合わせて、人物と犬は出さない。
```

```text
Palmierで作ったラフ結果をmovie-dashboardへ反映して。
使用素材、不足素材、ボツ理由、CapCutで仕上げる作業を整理して。
```
