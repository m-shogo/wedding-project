# ADD-13 メッセージカード — ASSET QUEUE

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Queue

| ID | Asset | Type | Status | Note |
|---|---|---|---|---|
| MC-01 | A6横 表面レイアウト | editable layout | `PREPARED_FOR_FIGMA` | タイトル・テーマ・氏名欄 |
| MC-02 | A6横 裏面レイアウト | editable layout | `PREPARED_FOR_FIGMA` | 広い自由記入欄 |
| MC-03 | ポストカード切手風装飾 | native vector | `PREPARED_FOR_FIGMA` | 単純幾何、画像生成不要 |
| MC-04 | 旅行ルート線 | native vector | `PREPARED_FOR_FIGMA` | 書き込み領域を侵食しない |

## Decision
新規ラスター生成は不要。文字・枠・罫線・小さな旅行モチーフを編集可能なテキストとnative vectorで構成する。

## Duplicate prevention
- 既存完成済み4種の正本をコピー・改変しない
- 同名・同役割のDriveフォルダを検索済み
- asset sheetは作らない
- 本番出力時は表面・裏面を別ファイルとして書き出す

## Active next
`NONE_FOR_ASSET_GENERATION`
