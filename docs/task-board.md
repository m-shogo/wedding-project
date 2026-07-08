# タスクボード

今やることを迷わないための簡易ボード。レビュー前はこのページを作業入口にする。

## Review Prep

- root READMEは、`motion-studio` / `movie-dashboard` / ローカル素材管理 / 不採用素材の扱いを反映済み。
- `02_opening-movie/sample_image/**` はGit管理外。GitHub上に画像が無いこと自体は欠落ではない。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。人物なしで再生成する。
- レビュー時は `README.md` → `docs/task-board.md` → `02_opening-movie/asset-status.md` → `motion-studio/README.md` → `movie-dashboard/README.md` の順で見る。

## Now

- 人物なしの空港ロビー・搭乗ゲート静止画を再生成する。
  - 対象: `op_01` / `op_11` の代替。
  - 条件: 人物なし、動物なし、文字なし、ロゴなし、看板なし。
  - 採用前に必ず目視確認し、`docs/templates/ai-video-scorecard.csv` または判断ログへ残す。
- 採用候補I2V素材をCapCutの10秒試作に入れる。
  - 優先: `op_16` / `op_02` / `op_03` / `op_07`。
  - `op_10` は現行I2Vが暗く不採用。Remotion版 `扉-光` と比較する。
- `motion-studio` を確認する。
  - `cd motion-studio`
  - `pnpm check`
  - `pnpm export`
  - `exports/index.html` を開いて制作コックピットを確認する。
- `movie-dashboard` を確認する。
  - `cd movie-dashboard`
  - `pnpm dev`
  - データ管理で整合性チェックを実行する。
  - 必要ならJSONエクスポートし、`src/data/*.json` へ反映してcommitする。
- 会場仕様を確認して `docs/templates/venue-specs.csv` に記録する。
- BGM候補を `docs/templates/music-candidates.csv` に集める。

## Next

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
- Chapter 1 出発の10秒試作を作る。

## Later

- 30秒試作を作る。
- 1章だけ完成品質にする。
- 本編ラフを作る。
- 上映前チェックを行う。
- 参考映像を `docs/templates/reference-log.csv` に集める。
- テロップ候補を `08_texts/` にまとめる。

## Blocked

- 会場仕様が未確認の項目。
- 音源の利用条件が不明なBGM。
- 元データが不足している写真や動画。
- 人物なし空港素材が未生成のため、空港ロビー/搭乗ゲートのI2V化は停止。
