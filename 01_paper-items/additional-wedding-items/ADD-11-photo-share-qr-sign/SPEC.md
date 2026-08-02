# ADD-11 写真共有 / QR案内サイン — SPEC

Status: `SPEC_READY / PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Purpose

ゲストが結婚式当日の写真共有先へ迷わずアクセスできる案内サインを準備する。QRコードのリンク先・ハッシュタグ・公開範囲は未確定のため、本番値は固定しない。

## Format

- Primary: A5 portrait (148 × 210 mm)
- Reflow option: A4 portrait (210 × 297 mm)
- Bleed: 3 mm
- Safe area: 10 mm minimum
- QR quiet-zone reserve: QR外周に4モジュール以上。実寸では上下左右12 mm以上を初期目安とし、最終QR生成時に再検証する

## Visual direction

- 旅行テーマの「TRAVEL MEMORY / SHARE YOUR JOURNEY」系案内
- ミントグリーン、ブルー、シルバーを基調
- 通常文字・線・枠・カメラ/雲/送信アイコンはnative vectorで構成
- QRコードは画像生成しない
- 人物、ゲスト、犬のAI変換を行わない

## Editable text

- `TXT_SHARE_TITLE`
- `TXT_SHARE_NOTE`
- `TXT_ACCESS_STEPS`
- `TXT_PRIVACY_NOTE`
- `TXT_HASHTAG`
- `TXT_EXPIRY_NOTE`

## Replaceable object

- `QR_PHOTO_SHARE`

## Semantic node names

- `FRAME_ADD11_A5_PORTRAIT`
- `BG_ADD11_BASE`
- `TXT_SHARE_TITLE`
- `TXT_SHARE_NOTE`
- `TXT_ACCESS_STEPS`
- `TXT_PRIVACY_NOTE`
- `TXT_HASHTAG`
- `TXT_EXPIRY_NOTE`
- `QR_PHOTO_SHARE`
- `DECOR_CAMERA_ICON`
- `DECOR_TRAVEL_ROUTE`

## Required information before final output

1. 写真共有サービス名
2. 正式URL
3. アクセス期限
4. 閲覧・投稿権限
5. パスコード有無
6. ハッシュタグ採用有無と正式表記
7. 会場での掲示可否
8. QRコードの最終実寸と印刷テスト結果

## Completion boundary

本runではテンプレ仕様、可変情報、QR差し替え契約、Driveフォルダ、配置指示を準備する。正式URLが未確定のため、本番QR生成・実機スキャン試験・最終印刷データ確定は行わない。
