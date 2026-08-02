# ADD-08 メニュー補助サイン — ASSET QUEUE

Status: `SPEC_READY / DRIVE_UPLOAD_BLOCKED`
Date: 2026-08-02

## Existing asset search

- GitHub: ADD-08固有成果物なし
- Google Drive: ADD-08固有成果物なし
- 完成済み4種は参照のみ

## Queue

| ID | Asset | Type | Status | Notes |
|---|---|---|---|---|
| MS-01 | 共通背景 | editable shape | `SPEC_READY` | A4縦、A5リフロー |
| MS-02 | ドリンク案内 | editable text | `SPEC_READY` | 内容確定後に差し替え |
| MS-03 | 食事案内 | editable text | `SPEC_READY` | 会場確認前はTBD |
| MS-04 | 旅行テーマ紹介 | editable text | `SPEC_READY` | 実メニューとの整合確認必須 |
| MS-05 | 旅行案内アクセント | native vector | `SPEC_READY` | 線・枠・小アイコンのみ |

## Generation decision

新規ラスター素材は不要。通常文字と単純な線・枠・アイコンで構成し、Figma課金後にnative vectorとeditable textで作る。可変情報を画像へ焼き込まない。

## ACTIVE_NEXT

`DRIVE_FOLDER_CREATE_AND_READBACK`
