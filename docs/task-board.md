# タスクボード

今やることを迷わないための簡易ボード。レビュー前はこのページを作業入口にする。

## Review Prep

- root READMEは、`motion-studio` / `movie-dashboard` / ローカル素材管理 / 不採用素材の扱いを反映済み。
- `movie-dashboard` は既に存在する。新規作成ではなく、Palmier試作結果・素材採否・Prompt Bank・CapCut Packを反映して育てる。
- Figmaデモ: https://www.figma.com/design/vwC1tArvxpNFSdBmXd9RBD
- `02_opening-movie/sample_image/**` はGit管理外。GitHub上に画像が無いこと自体は欠落ではない。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。人物なしで再生成する。
- レビュー時は `README.md` → `docs/task-board.md` → `docs/00_start-here.md` → `docs/palmier-operation.md` → `docs/opening-90s-storyboard.md` → `docs/ai-generation-prompt-pack.md` → `movie-dashboard/README.md` の順で見る。

## Now

- Palmier Free + Claude Code MCPの読み取り確認を行う。
  - 手順: `docs/palmier-operation.md`
  - まだ本編集しない。まずプロジェクト、タイムライン、素材ライブラリを読めるか確認する。
- Palmier 10秒試作用の素材セットを作る。
  - 保存先: `02_opening-movie/source/palmier-test-001/`
  - AI動画4本、motion-studio書き出し2本、写真3枚、BGM1曲までに絞る。
  - 大きな素材はGitに入れない。
- 90秒構成を `docs/opening-90s-storyboard.md` に沿って確認する。
  - 10秒試作はScene 01/02/09中心。
  - 30秒試作はScene 01〜04/09中心。
- 画像生成は `docs/ai-generation-prompt-pack.md` の12枚から開始する。
  - 最優先: 空港の光、飛行機窓と雲、チャペル扉の光、横浜夜景。
  - 条件: 人物なし、動物なし、文字なし、数字なし、ロゴなし、看板なし。
- 人物なしの空港ロビー・搭乗ゲート静止画を再生成する。
  - 対象: `op_01` / `op_11` の代替。
  - 採用前に必ず目視確認し、`docs/templates/ai-video-scorecard.csv` または判断ログへ残す。
- `movie-dashboard` を確認する。
  - `cd movie-dashboard`
  - `pnpm dev`
  - データ管理で整合性チェックを実行する。
  - Palmier結果は `docs/palmier-dashboard-sync.md` に従って反映する。
- `motion-studio` を確認する。
  - `cd motion-studio`
  - `pnpm check`
  - `pnpm export`
  - `exports/index.html` を開いて制作コックピットを確認する。
- 会場仕様を確認して `docs/templates/venue-specs.csv` に記録する。
- BGM候補を `docs/templates/music-candidates.csv` に集める。
- おいしいとこどり素材集を回す（集める→まとめる→切る→選ぶ）。
  - 手順書: `docs/clip-library-guide.md`（人間・AI共通の入口）
  - 型を選ぶ: `python3 scripts/slice_clips.py recipes --chapter 4`
  - 無料素材の入手先は `docs/free-sample-sources.md`（ライセンスは都度確認）。
  - 素材取得は公式APIのみ（スクレイピング禁止）。無料APIキーが要る。
    - `export PEXELS_API_KEY='...'`
    - `python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3`
    - 取得後に必ず目視確認（人物・動物・文字・ロゴ・看板）。
  - `python3 scripts/slice_clips.py reel --write` で1本にまとめる。
  - 使いたい区間の in/out と motion を `docs/templates/sample-clips.csv` に記録。
  - `python3 scripts/slice_clips.py slice --write` で切り出し、pick/ratingを更新。
  - 検証: `python3 scripts/slice_clips.py validate`（CIでも自動実行）。

## Next

- Palmier 10秒試作を実施する。
  - 結果を `docs/templates/review-notes.csv` に残す。
  - 使用素材・不足素材・ボツ理由をmovie-dashboardへ戻す。
- Palmier 10秒試作が安定したら30秒試作へ進む。
- 採用候補I2V素材を10秒試作に入れる。
  - 優先: `op_16` / `op_02` / `op_03` / `op_07`。
  - `op_10` は現行I2Vが暗く不採用。Remotion版 `扉-光` と比較する。
- 素材2-A（飛行機窓・地上）と4-A-2（ハワイ夕暮れ）の静止画を用意する。
  - 飛行機窓・雲海・扉の光は `motion-studio` のRemotionテンプレでも作れる。
  - AI生成版とRemotion版を見比べて、良い方を採用する。
- `02_opening-movie/asset-status.md` をローカル環境で更新する。
  - `python3 scripts/check_assets.py`
  - 問題なければ `python3 scripts/check_assets.py --write`
- オープニングv002ドラフトを通しで見る。
  - 特に5-Bテロップ可読性、カウントダウン演出、人物入り素材の混入を確認する。
- 既存storyboard(105秒)とMEMORY FLIGHT 1024の4区間ルートの整合を決める。
  - 推奨: 沖縄・韓国はスタンプ連打で省略、ハワイのみフル演出。
- プロフィールムービー用の写真候補を `docs/templates/photo-selection.csv` に記録する。

## Later

- 30秒試作を作る。
- 1章だけ完成品質にする。
- 本編ラフを作る。
- 上映前チェックを行う。
- 参考映像を `docs/templates/reference-log.csv` に集める。
- テロップ候補を `08_texts/` にまとめる。
- Palmierが安定したら、90秒ラフ→CapCut Pack→CapCut仕上げへ進む。

## Blocked

- このChatGPTチャットからはローカルMac上のPalmierアプリ・素材フォルダを直接操作できない。
  - 対応: `docs/palmier-operation.md` のプロンプトをClaude Codeで実行し、結果をGitへ戻す。
- 会場仕様が未確認の項目。
- 音源の利用条件が不明なBGM。
- 元データが不足している写真や動画。
- 人物なし空港素材が未生成のため、空港ロビー/搭乗ゲートのI2V化は停止。
