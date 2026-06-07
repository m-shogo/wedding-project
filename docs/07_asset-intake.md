# 素材受け入れルール

## 基本

素材はまず `00_inbox/` に置く。すぐに本番フォルダへ入れず、用途、採否、権利、編集しやすさを見てから分類する。

## 分類

- 実写真: `05_photos/`
- 実動画: `06_videos/`
- BGM、効果音: `07_music/`
- テロップ、コメント、ナレーション: `08_texts/`
- 参考動画、参考URL、スクリーンショット: `10_references/`
- AI生成素材: `04_ai-video-assets/`
- 書き出し: `90_exports/`

## 命名方針

```text
用途_章_内容_状態_連番.ext
```

例:

```text
profile_ch02_groom-childhood_candidate_001.jpg
profile_ch03_route-map_ai-candidate_001.mp4
opening_ch01_airport-reference_001.url
```

## 状態

- `candidate`: 候補
- `selected`: 採用
- `hold`: 保留
- `reject`: 不採用
- `final`: 最終版

## ログ項目

`docs/templates/asset-log.csv` に次を残す。

- ID
- ファイルパス
- 種別
- 用途
- 状態
- 権利・許諾メモ
- 編集メモ

## 注意

- 写真、動画、音源は原則Gitに入れない。
- 外部AIサービスへ実写真をアップロードする前に確認する。
- LINEやSNSから受け取った素材は画質劣化の可能性があるため、必要なら元データを取り直す。

