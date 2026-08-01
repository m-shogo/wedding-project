# ADD-01 ウェルカムボード — ASSET QUEUE

Status: `SPEC_READY / ASSET_NOT_STARTED`
Date: 2026-08-01

## Existing asset search

- GitHub search: ADD-01固有成果物なし
- Google Drive search: `ウェルカムボード`該当なし
- 完成済み4種は参照のみ。改変・再生成禁止

## Production queue

| ID | Asset | Type | Status | Notes |
|---|---|---|---|---|
| WB-01 | A2縦ベース背景 | raster/background | `PENDING` | ミント〜ブルー、紙/旅行雑誌感。文字なし |
| WB-02 | 旅行ルート線装飾 | transparent PNG | `PENDING` | 単体、文字なし、1素材1ファイル |
| WB-03 | 旅行バッジ装飾 | transparent PNG | `PENDING` | 結婚式用途、固有名詞なし |
| WB-04 | 方位/コンパス装飾 | transparent PNG | `PENDING` | 控えめ、写真を邪魔しない |
| WB-05 | 横浜アクセント装飾 | transparent PNG | `PENDING_REVIEW` | 会場や写真と競合しない抽象表現 |
| WB-06 | 写真フレームマスク仕様 | editable shape | `SPEC_READY` | 画像生成せずFigma shapeで作成 |
| WB-07 | タイトル/名前/日付 | editable text | `SPEC_READY` | 画像へ焼き込まない |

## Generation constraints

- 人物・犬を生成またはAI変換しない
- 文字、日付、名前、会場名を画像へ焼き込まない
- 透過素材は単色グリーン背景の単体生成を基本とする
- 本番は1素材1ファイル
- asset sheetは`QA_CONTACT_SHEET / NON_PRODUCTION`
- 同じ役割の素材を生成する前にGitとDriveを再検索する

## Completion rule

各素材は次を満たすまで`ACCEPTED`にしない。

1. 生成または制作
2. 必要な後処理
3. 機械QA
4. 視覚QA
5. Driveへ新規保存
6. Drive readback
7. `DRIVE-REGISTER.md`へID記録
8. Git commit readback

## ACTIVE_NEXT

`WB-01_A2_PORTRAIT_BASE_BACKGROUND`
