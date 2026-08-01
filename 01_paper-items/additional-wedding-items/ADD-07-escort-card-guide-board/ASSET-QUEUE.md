# ADD-07 エスコートカード案内ボード — ASSET QUEUE

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Production assets

現時点のproduction raster: **0件**

## Native Figma build queue

| ID | Node / asset | Method | Status | Notes |
|---|---|---|---|---|
| ADD07-FG-01 | `BG_ESCORT_GUIDE_PAPER` | native fill | `READY` | 温かいアイボリー。紙テクスチャは印刷確認後のみ |
| ADD07-FG-02 | `GROUP_ACTION_ROUTE` | native vector | `READY` | 左上→右下の非対称導線 |
| ADD07-FG-03 | `DECOR_ACTION_NODE_01..03` | native vector | `READY` | 3行動の意味を持つノード。均等カード化しない |
| ADD07-FG-04 | `DECOR_TERMINAL_EDGE` | native vector | `READY` | 片側限定のターミナル罫線 |
| ADD07-FG-05 | direction mark | native vector | `READY` | 卓方向を示す控えめな矢印 |

## Reuse policy

- BOARDING PASS正本: `REFERENCE_ONLY / NO_WRITE / NO_COPY_AS_DECOR`
- ADD-01旅行バッジ・コンパス: 原則不使用。別アイテムのテンプレート化を避ける
- 既存Drive素材: 具体的な欠陥解決に必要な場合のみ候補化

## Raster generation gate

以下のいずれかがスクリーンショットQAで確認された場合に限り、新規ラスターを検討する。

1. native vectorだけでは印刷上の素材感が不足する
2. 遠距離で導線の起点・終点が識別できない
3. 会場背景との分離に固有の質感が必要

生成する場合も、名前・日付・会場・案内文を焼き込まない。

## Rejected ideas

- BOARDING PASS券面の巨大な複製
- 3つの均等な角丸カード
- 意味のないバーコード、QR、飛行機、スタンプの追加
- ゲスト名や卓番号の一覧を画像化
- 空港電光掲示板の黒背景をそのまま模倣
