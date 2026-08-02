# ADD-08 メニュー補助サイン — SPEC

Status: `SPEC_READY / DRIVE_UPLOAD_BLOCKED`
Date: 2026-08-02

## Purpose

料理・ドリンク案内を補助するサイン。確定していない料理名、ドリンク名、アレルギー対応、提供方法は事実として固定しない。

## Recommended formats

- Primary: A4 portrait (210 × 297 mm)
- Alternate: A5 portrait (148 × 210 mm)
- Bleed: 3 mm
- Safe area: 10 mm以上

## Planned variants

1. Drink Menu Guide
2. Allergy / Dietary Information
3. World Trip Special Menu Introduction

## Variable text

- `TXT_MENU_SUPPORT_TITLE`
- `TXT_MENU_SUPPORT_BODY`
- `TXT_MENU_CATEGORY`
- `TXT_ALLERGY_NOTICE`
- `TXT_DIETARY_NOTICE`
- `TXT_CONFIRM_WITH_STAFF`

未確定情報は`TBD`または差し替え枠として管理し、画像へ焼き込まない。

## Visual direction

- 旅行案内所・機内メニュー・ホテルインフォメーションの要素を控えめに採用
- ミントグリーン、ブルー、シルバーを基調
- 本文可読性を優先し、装飾は余白を侵食しない
- 通常文字、QRコード、料理名、アレルギー情報はeditable text/vector

## Prohibited

- 完成済み4種の改変
- Figma操作
- 未確定料理・ドリンク・アレルギー情報の捏造
- 可変テキストのラスター画像化
- 人物・犬のAI生成または変換
