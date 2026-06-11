# オープニングムービー ドラフトv001 自動ビルド

日付: 2026-06-10
状態: 完了（ドラフト・プレビュー用）

## やったこと

`02_opening-movie/storyboard.md` の105秒構成に沿って、
`02_opening-movie/sample_image/` のAI静止画20枚のうち16枚を使い、
ffmpegでドラフト動画を自動生成するスクリプトを作成した。

- スクリプト: `scripts/build_opening_movie.py`
- テロップ描画: `scripts/render_caption.swift`
- 出力: `90_exports/opening-movie_v001_draft.mp4`（105.0秒 / 1920x1080 / 30fps / 無音）
- 再ビルド: `python3 scripts/build_opening_movie.py`

## 判断

- **実写真章（4-B, 5-A）はAIサンプル画像で代用**。実写真はGit外のため、
  ハワイ・沖縄・韓国・指輪・横浜のAI画像をプレースホルダにした。
  本番では実写真に差し替える。
- **BGM未挿入**。音源の利用条件が未確認のため無音で書き出した。
  BGMマーカー位置（M-01〜M-08）は storyboard.md 通りの秒数で映像を組んである。
- **このMacのffmpeg（Homebrew 8.1.1）はdrawtext無しビルド**。
  テロップはSwift（CoreGraphics）で透過PNGに描画し、overlay+fadeで合成した。
  ffmpegを入れ直すより環境を汚さない判断。
- 白フェード（2-B→3）は45.0秒開始・1.5秒。capcut-edit-plan.md の
  「ピークを45秒に合わせる」とは厳密には0.75秒ズレるが、
  BGM未挿入のドラフトでは許容。CapCut本制作時にBGMの山へ合わせる。

## 素材割り当て

| 章 | 素材 |
|----|------|
| 0 カウントダウン | 黒背景 + 数字5→1（生成） |
| 1-A 空港 | op_11 ロビー → op_01 搭乗ゲート |
| 1-B 出発宣言 | op_02 搭乗券風背景 + コピー |
| 2-A 搭乗 | op_12 滑走路 + 「2026.10.24 / JPN → HNL」 |
| 2-B 上昇 | op_03 飛行機窓・雲 → 白フェード |
| 3 雲海 | op_16 + 「Hawaii」 |
| 4-A 着陸の光 | op_07 ハワイビーチ |
| 4-B 写真解禁(仮) | op_13, op_05, op_08, op_15, op_06 |
| 5-A 到着(仮) | op_18 指輪 → op_19 横浜 + 「2026.10.24 / Yokohama」 |
| 5-B 余韻 | op_10 チャペル扉 + 「Cabin crew, prepare for arrival.」 |

未使用: op_04 地図, op_09 横浜空, op_14 沖縄夕暮れ, op_17 ハワイ夜景, op_20 光

## 次にやること

- ドラフトを通しで見て、章のテンポと素材の並びをレビューする
- BGM候補が決まったら山の位置と章境界の整合を確認する
- 本制作はCapCutで行う（このドラフトは構成確認用）
- 4-B/5-Aの実写真を選定する（`docs/templates/photo-selection.csv`）
