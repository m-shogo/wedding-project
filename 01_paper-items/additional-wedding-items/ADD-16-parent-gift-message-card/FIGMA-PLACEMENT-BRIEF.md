# ADD-16 両親贈呈品メッセージカード — FIGMA PLACEMENT BRIEF

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Current restriction
Current authorityがFigma使用を許可するまで、ページ・frame・semantic nodeを作成または変更しない。

## Page plan
追加アイテム用page内に独立sectionを作成する。既存4種のpage、component、semantic nodeへ接続・複製・上書きしない。

Recommended section:
- `SECTION_ADD16_PARENT_GIFT_MESSAGE_CARD`

## Frame set
### Primary postcard
- `FRAME_PARENT_GIFT_CARD_FRONT` — 100 × 148 mm 縦
- `FRAME_PARENT_GIFT_CARD_BACK` — 100 × 148 mm 縦

### Conditional
- `FRAME_PARENT_GIFT_TAG_SMALL` — 90 × 55 mm 横
- `FRAME_PARENT_GIFT_FOLDED_OUTSIDE` — A5二つ折り外面
- `FRAME_PARENT_GIFT_FOLDED_INSIDE` — A5二つ折り内面

条件未確定のvariantはproduction frameとして量産せず、比較用specimenに留める。

## Layout direction
### Front
- 上部の小さなorigin markから短いrouteを開始
- 中央よりやや下に呼びかけを置き、機械的な中央揃えを避ける
- 日付と署名は本文と競合しない小さな終点として扱う
- 装飾面積を抑え、贈呈時の静けさを確保する

### Back
- 本文領域を最大化
- 本文量に応じて行長を調整し、カード幅いっぱいに流さない
- 署名または自筆追記領域を末尾に確保
- ルート線は本文を横切らず、起点／帰港の意味が読める範囲に限定

## Pairing logic
両家別2枚の場合:
- 共通するのは紙面規格、文字階層、色の基礎だけ
- 本文量、宛名幅、署名数に合わせて余白と改行を個別調整
- 新郎側=ネイビー、新婦側=ミントという単純な性別色分けをしない
- 並置した際の視覚重量を揃えるが、内容差を無理に均等化しない

## Semantic nodes
- `TXT_PARENT_RECIPIENT`
- `TXT_PARENT_MESSAGE`
- `TXT_PARENT_DATE`
- `TXT_COUPLE_SIGNATURE`
- `TXT_OPTIONAL_HOME_PORT_LINE`
- `DECOR_HOME_PORT_ROUTE`
- `DECOR_ORIGIN_MARK`
- `AREA_HANDWRITTEN_SIGNATURE`

## Native construction
- textはすべてeditable
- route、origin mark、ruleはnative vector
- 写真なしを標準案とする
- texture、foil、silver表現は印刷方式が確定するまで疑似効果を固定しない

## Screenshot evidence sequence
1. frame全体の初稿
2. 100%本文クロップ
3. 両家版の並置
4. 贈呈品モックへの仮設置
5. 指摘箇所を記録
6. evidence-driven修正
7. 修正後の同条件比較

## Print handoff
- PDF/X要件は印刷先確認後に確定
- 3 mm bleedを含む版と仕上がり確認版を分離
- outline前のeditable Figmaを正本として保持
- 氏名、本文、日付、署名のfinal readbackを行う
