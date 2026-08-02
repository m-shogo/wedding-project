# ADD-09 ゲストブックサイン — SPEC

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Purpose
受付付近でゲストブック記入を案内するサイン。ADD-04受付サインと同系統の旅行・空港案内トーンで統一するが、完成済み4種の正本は変更しない。

## Print specification
- Primary: A5 portrait (148 × 210 mm)
- Alternate: A4 portrait reflow
- Bleed: 3 mm all sides
- Safe area: 10 mm from trim edge
- Recommended output: PDF/X-compatible print PDF after Figma placement

## Content policy
- Main title候補: `GUEST BOOK`
- Supporting copy候補: `Please sign our guest book.`
- Supporting copy候補: `Leave a message for our journey.`
- 実際の記入方法、場所、ペン運用は会場確認前に確定しない
- 可変文言は画像へ焼き込まず、編集可能テキストとして管理する

## Visual direction
- ミントグリーン / ブルー / シルバー
- 空港案内板・旅程票のニュアンス
- 読みやすさを最優先し、装飾は控えめ
- 背景、罫線、小アイコンはnative vectorで構成可能
- 人物・犬の生成またはAI変換は禁止

## Semantic node names
- `FRAME_ADD09_GUEST_BOOK_SIGN`
- `BG_ADD09_BASE`
- `TXT_ADD09_TITLE`
- `TXT_ADD09_INSTRUCTION`
- `TXT_ADD09_NOTE`
- `ICON_ADD09_BOOK`
- `DECOR_ADD09_ROUTE_LINE`

## Variable text
- タイトル
- 記入案内文
- 補足文
- 設置場所や受付運用に関する注記

## Asset decision
新規ラスター画像は不要。文字、線、枠、簡単な本アイコンで成立するため、Figma native text/vectorで構成する。
