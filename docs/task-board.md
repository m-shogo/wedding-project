# タスクボード

今やることを迷わないための簡易ボード。

## Now

- `motion-studio/out/common/stamp_test_vp9.webm` をCapCutに読み込み、透過を確認して
  `docs/decisions/2026-06-11-motion-studio.md` の未決事項に結果を書く。
- motion-studioのMVP素材(搭乗券・地図・ハンコ・雲・カウントダウン・写真カード)を
  Remotion Studio (`pnpm dev`) で見て、高級感・Style Bible適合を審査する。
- 既存storyboard(105秒)とMEMORY FLIGHT 1024の4区間ルートの整合を決める
  （推奨: 沖縄・韓国はスタンプ連打で省略、ハワイのみフル演出）。
- オープニングv002ドラフトを通しで見る（5-Bテロップ可読性・カウントダウン演出）。
- I2V生成済み動画を `docs/templates/ai-video-scorecard.csv` 基準で採点する
  （op_16 / op_02 / op_03 / op_07 test02 / op_08 / op_09 / op_10）。
- 人物なしの空港ロビー・搭乗ゲート静止画を再生成する（op_11/op_01は人物入りで不採用）。
- 会場仕様を確認して `docs/templates/venue-specs.csv` に記録する。
- BGM候補を `docs/templates/music-candidates.csv` に集める。
- プロフィールムービー用の写真候補を `docs/templates/photo-selection.csv` に記録する。

## Next

- 素材2-A（飛行機窓・地上）と4-A-2（ハワイ夕暮れ）の静止画を用意する。
- 採用I2V素材をCapCutの10秒試作に入れる。
- `02_opening-movie/asset-status.md` を `python3 scripts/check_assets.py --write` で更新する。
- 参考映像を `docs/templates/reference-log.csv` に集める。
- プロフィールムービー Chapter 1 出発の10秒試作を作る。
- Chapter 2 それぞれの旅の写真順を決める。
- AI背景素材の候補を `docs/templates/ai-shot-list.csv` に絞る。
- テロップ候補を `08_texts/` にまとめる。

## Later

- 30秒試作を作る。
- 1章だけ完成品質にする。
- 本編ラフを作る。
- 上映前チェックを行う。

## Blocked

- 会場仕様が未確認の項目。
- 音源の利用条件が不明なBGM。
- 元データが不足している写真や動画。
