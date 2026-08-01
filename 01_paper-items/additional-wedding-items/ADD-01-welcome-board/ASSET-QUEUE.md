# ADD-01 ウェルカムボード — ASSET QUEUE

Status: `ASSET_IN_PROGRESS / WB-01_WB-02_WB-03_ACCEPTED`
Date: 2026-08-02

## Existing asset search

- GitHub search before WB-01 production: no existing WB-01 production asset
- Google Drive ADD-01 folder readback before production: empty
- GitHub and Drive exact-name search before WB-02 production: no existing WB-02 production asset
- GitHub and Drive exact-name search before WB-03 production: no existing WB-03 production asset
- 完成済み4種は参照のみ。改変・再生成禁止

## Production queue

| ID | Asset | Type | Status | Notes |
|---|---|---|---|---|
| WB-01 | A2縦ベース背景 | raster/background | `ACCEPTED` | `ADD-01_WB-01_A2_PORTRAIT_BASE_BACKGROUND_v1.png`; 4961×7016 px; 300 dpi; RGB PNG; mint-to-blue paper/travel atmosphere; no text |
| WB-02 | 旅行ルート線装飾 | transparent PNG | `ACCEPTED` | `ADD-01_WB-02_TRAVEL_ROUTE_LINE_TRANSPARENT_v1.png`; 3083×1233 px; RGBA; curved dashed route, five route nodes, minimal paper-plane silhouette; no text |
| WB-03 | 旅行バッジ装飾 | transparent PNG | `ACCEPTED` | `ADD-01_WB-03_TRAVEL_BADGE_TRANSPARENT_v1.png`; 1826×1748 px; RGBA; irregular luggage-sticker silhouette, globe, route, plane, blank ribbon/tab; no text |
| WB-04 | 方位/コンパス装飾 | transparent PNG | `PENDING` | 控えめ、写真を邪魔しない |
| WB-05 | 横浜アクセント装飾 | transparent PNG | `PENDING_REVIEW` | 会場や写真と競合しない抽象表現 |
| WB-06 | 写真フレームマスク仕様 | editable shape | `SPEC_READY` | 画像生成せずFigma shapeで作成 |
| WB-07 | タイトル/名前/日付 | editable text | `SPEC_READY` | 画像へ焼き込まない |

## WB-01 evidence

- Mechanical QA: PASS
- Visual QA: PASS
- Dimensions: 4961 × 7016 px
- Resolution metadata: 299.9994 dpi
- Mode: RGB
- File size: 36,169,290 bytes
- SHA-256: `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7`
- Drive ID: `1XgE7c8cffxmMViEqeqJJ8Phnd5YxaE4l`
- Drive readback: filename and MIME type `image/png` confirmed

## WB-02 evidence

- Mechanical QA: PASS
- Visual QA: PASS
- Dimensions: 3083 × 1233 px
- Mode: RGBA
- Alpha extrema: `0–235`; transparent exterior exists
- File size: 26,708 bytes
- SHA-256: `4beb9590d729130cb27863c626277f677ffd47840edcde6b7f444181886ecc84`
- Drive ID: `1cSpz2tcZZ0eKPBhD8vdacjc3GtWqPwf9`
- Drive readback: exact filename, MIME type `image/png`, and ADD-01 parent folder confirmed
- Visual intent: warm metallic-silver route with restrained navy/mint/gold accents; sparse nodes and paper plane; no text or fixed wedding copy

## WB-03 evidence

- Mechanical QA: PASS
- Visual QA: PASS
- Dimensions: 1826 × 1748 px
- Mode: RGBA
- Alpha extrema: `0–245`; transparent exterior exists
- File size: 64,784 bytes
- SHA-256: `407ec787643771040de0125957dd49c7491604f820440c52c27ee5c4399799c3`
- Drive ID: `1TOok5ps43XKrf3FN2OUV46Sr8cAgWgxR`
- Drive readback: exact filename, MIME type `image/png`, and ADD-01 parent folder confirmed
- Visual intent: irregular luggage-sticker badge with ivory/navy base, restrained metallic rim, globe, travel route, plane and blank ribbon/tab; no text or fixed wedding copy

## Generation constraints

- 人物・犬を生成またはAI変換しない
- 文字、日付、名前、会場名を画像へ焼き込まない
- 透過素材は単色グリーン背景の単体生成を基本とする。ただしプログラム生成で真のRGBA透明背景を直接作れる場合は、機械QAと視覚QAを満たせば許容する
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

`WB-04_COMPASS_DECOR_TRANSPARENT_PNG`
