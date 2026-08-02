# ADD-11 写真共有 / QR案内サイン — ASSET QUEUE

Status: `PREPARED_FOR_FIGMA / NO_RASTER_REQUIRED`
Date: 2026-08-02

## Existing search

- GitHub: ADD-11固有成果物なし
- Google Drive: ADD-11フォルダなし。今回新規作成
- 完成済み4種は参照のみ。変更・再生成しない

## Queue

| ID | Asset | Type | Status | Notes |
|---|---|---|---|---|
| PSQ-01 | A5縦レイアウト | editable layout | `SPEC_READY` | A4縦へリフロー可能 |
| PSQ-02 | 写真共有タイトル | editable text | `SPEC_READY` | 本番文言は差し替え可能 |
| PSQ-03 | QR差し替え枠 | editable shape | `SPEC_READY` | QR本体は正式URL確定後に生成 |
| PSQ-04 | 利用手順 | editable text | `SPEC_READY` | 最大3ステップ |
| PSQ-05 | 公開範囲・期限注記 | editable text | `SPEC_READY` | サービス仕様確定後に入力 |
| PSQ-06 | カメラ/共有アイコン | native vector | `SPEC_READY` | 単純幾何。ラスター不要 |
| PSQ-07 | 旅行ルート装飾 | native vector | `SPEC_READY` | 控えめに使用 |

## Generation decision

新規ラスター画像は不要。通常文字、線、枠、単純アイコンで成立し、QRコードは画像生成禁止のため、Figma課金後にnative vectorと編集テキストで構成する。

## ACTIVE_NEXT

`ADD-12_COUPLE_QUIZ_CARD_SPEC_AND_QUEUE`
