# ADD-15 — 料理紹介 / 国テーマ説明カード SPEC

Status: `CURRENT / SPEC_READY`
Authority: GitHub `main`
Drive folder: `186f2tA2czrrdIQ_7djhPBun6dStztmS8`

## Purpose

披露宴の料理または11卓の旅先テーマを、単なる国旗・観光アイコン・メニュー転載ではなく、料理と旅の背景を短い編集記事として伝える補助カードにする。

このアイテムは、最終メニュー、食材、アレルゲン、各国と料理の対応、設置場所が正式確定した場合だけ実データへ置換する。未確定情報を推測して印刷物へ固定しない。

## Deployment decision gate

制作前に次のどちらかを正式に選ぶ。

### Model A — Course story cards

- 料理ごと、またはコースの節目ごとに設置
- 主役は料理名・短い背景説明・必要な注意情報
- 国テーマは料理と正式な関係が確認できる場合だけ記載

### Model B — Destination story cards

- 11卓の国別テーマを補足する読み物として設置
- 主役は目的地の短い物語・卓テーマの由来
- 実際の料理との対応を暗示しない

Model AとModel Bを曖昧に混ぜない。料理がその国の伝統料理であるかのような誤認を生む表現は禁止する。

## Recommended format

Primary candidate:

- 100 × 148 mm portrait
- 3 mm bleed
- 5 mm minimum safe area
- 卓上スタンドまたはメニュー横への平置きを想定

Alternative:

- 148 × 100 mm landscape
- 長い料理名や横長写真が必要な場合のみ採用

実際の印刷会社テンプレート、スタンド、卓上スペースが確定した場合はその寸法を優先する。

## Editorial concept

`DESTINATION TASTING NOTE / TRAVEL EDITORIAL CAPTION`

- 写真を使う場合も、料理写真を全面に敷くだけにしない
- 大きな料理名または目的地名、短い本文、ひとつの根拠ある補助情報で構成する
- 雑誌の短いキャプションやホテルのテイスティングノートに近い密度
- 角丸カードを均等に並べたWeb UIへしない
- 国旗、飛行機、フォーク、皿、星を意味なく反復しない
- るるぶWEDDING、WEDDING PASSPORT、BOARDING PASS、青春ふたりきっぷの外観を複製しない

## Information hierarchy

### Model A

1. `TXT_COURSE_PHASE`
2. `TXT_DISH_NAME`
3. `TXT_DISH_STORY`
4. `TXT_INGREDIENT_NOTE`
5. `TXT_ALLERGEN_REFERENCE`
6. optional `IMG_DISH_HERO`

### Model B

1. `TXT_DESTINATION_NAME`
2. `TXT_TABLE_IDENTIFIER`
3. `TXT_DESTINATION_STORY`
4. optional `TXT_COUPLE_CONTEXT`
5. optional `IMG_DESTINATION_DETAIL`

## Semantic nodes

- `FRAME_ADD15_CARD_[ID]`
- `BG_PAPER_FIELD`
- `IMG_HERO_REPLACEABLE`
- `TXT_EYEBROW`
- `TXT_PRIMARY_TITLE`
- `TXT_SECONDARY_TITLE`
- `TXT_STORY_BODY`
- `TXT_FACT_NOTE`
- `TXT_ALLERGEN_REFERENCE`
- `DECOR_EDITORIAL_RULE`
- `DECOR_ROUTE_ORIGIN`
- `GUIDE_BLEED`
- `GUIDE_TRIM`
- `GUIDE_SAFE`
- `GROUP_PLACEHOLDER_NOT_FOR_EXPORT`

## Editable copy contract

すべての事実情報をFigma native textとして保持する。

- `TXT_PRIMARY_TITLE`: 正式な料理名または目的地名
- `TXT_STORY_BODY`: 日本語45–90文字を目安。長文を縮小して押し込まない
- `TXT_FACT_NOTE`: 正式に確認できた食材・技法・旅先情報だけ
- `TXT_ALLERGEN_REFERENCE`: 会場の正式表記をそのまま使用。独自判断で簡略化しない
- `TXT_COUPLE_CONTEXT`: 二人の実体験が確認できた場合だけ使用

写真、装飾画像、背景へ文字を焼き込まない。

## Visual system

- base: warm ivory / soft mineral white
- type: deep navy or near-black
- accent: destination or dish-derived single accent only after source content is confirmed
- metallic detail: restrained silver rule; foil appearanceをラスターで擬似表現しない
- photography: source, rights, crop, and print resolution must be verified
- route motif: origin-to-destination relationが本文に存在する場合だけ使用

同じシリーズ感は、余白、文字階層、罫線、semantic structureで作る。全カードを同じ色面・同じ写真比率・同じバッジ位置へ機械的に揃えない。

## Truth and safety contract

- 最終メニューを推測しない
- 食材、産地、調理法、アレルゲンを推測しない
- 国と料理の関係を推測しない
- 「本場」「伝統」「名物」などの断定は根拠がある場合のみ使用
- 健康・アレルギー対応を保証する文言を書かない
- 会場提供の正式なアレルゲン案内を改変しない
- 二人が訪れた国、食べた料理などの履歴を捏造しない

## Anti-generic rules

- do not make eleven equal flag cards
- do not create a restaurant menu template unrelated to the wedding travel concept
- do not place random travel stickers around food copy
- do not use fake handwritten notes without an editorial reason
- do not use AI-generated food photography as evidence of the actual served dish
- do not repeat decorative icons merely to fill whitespace
- do not reduce body text below practical print size to preserve a rigid template

## Production gates

Figma実制作へ進む前に必要:

1. Model A / B / NOT_REQUIRED の決定
2. 必要枚数と設置場所
3. 正式な料理名または目的地名
4. 本文の事実確認元
5. アレルゲン表記の責任範囲
6. 写真を使う場合の正本・利用権・解像度
7. 印刷寸法とスタンド条件

## QA gates

- 料理と国テーマの関係を誤認させない
- 本文、料理名、アレルゲン参照が100%実寸で読める
- 仮文、TBD、placeholderが最終PDFに残らない
- 写真が実際の提供料理を偽装していない
- アレルゲン情報が会場正本と一致する
- 卓上で料理皿、グラス、装花の邪魔にならない
- stand/holderが重要情報を隠さない
- screenshot QAとactual-size proof前に完成宣言しない

## Current declaration

`SPEC_READY / DRIVE_FOLDER_READY / ASSET_DECISION_PENDING / FIGMA_NOT_STARTED`
