# ADD-13 メッセージカード — SPEC

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Purpose
ゲストが新郎新婦へのメッセージ、旅のおすすめ、これからの二人へのアドバイスを記入できるカード。

## Format
- 本命: A6横（148 × 105 mm）
- 比較候補: はがき縦（100 × 148 mm）
- 塗り足し: 四辺3 mm
- 安全域: 仕上がり線から8 mm以上
- 記入領域: 仕上がり面積の55%以上
- 両面構成: 表=タイトル・任意テーマ、裏=自由記入欄

## Editable text
- `TXT_MESSAGE_TITLE`
- `TXT_MESSAGE_PROMPT`
- `TXT_GUEST_NAME_LABEL`
- `TXT_DATE`
- `TXT_OPTIONAL_THEME`

本番文言、ゲスト名、長文は画像へ焼き込まない。

## Content candidates
- ふたりへのメッセージ
- おすすめの旅先
- これからの旅へのアドバイス

上記は選択候補であり、本番採用は未確定。

## Visual direction
旅行のポストカード／荷物タグを想起させるが、記入性を最優先する。装飾はnative vectorの細線、角丸枠、小さな切手・ルート線モチーフに限定し、ラスター生成は不要。

## Semantic node names
- `FRAME_MESSAGE_CARD_FRONT`
- `FRAME_MESSAGE_CARD_BACK`
- `TXT_MESSAGE_TITLE`
- `TXT_MESSAGE_PROMPT`
- `TXT_GUEST_NAME_LABEL`
- `TXT_DATE`
- `AREA_HANDWRITING_MAIN`
- `DECOR_POSTCARD_STAMP`
- `DECOR_TRAVEL_ROUTE_LINE`

## Constraints
- 人物・犬のAI変換禁止
- 可変情報は編集可能テキスト
- 1素材=1ファイル
- Figma操作禁止
