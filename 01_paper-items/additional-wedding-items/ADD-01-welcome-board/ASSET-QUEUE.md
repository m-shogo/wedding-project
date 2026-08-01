# ADD-01 ウェルカムボード — ASSET QUEUE

Status: `PLACEMENT_READY / WB-01_WB-02_WB-03_WB-04_ACCEPTED`
Date: 2026-08-02

## Existing asset search

- GitHub search before WB-01 production: no existing WB-01 production asset
- Google Drive ADD-01 folder readback before production: empty
- GitHub and Drive exact-name search before WB-02 production: no existing WB-02 production asset
- GitHub and Drive exact-name search before WB-03 production: no existing WB-03 production asset
- GitHub and Drive exact-name search before WB-04 production: no existing WB-04 production asset
- GitHub and Drive search before WB-05 review: no existing WB-05 production asset
- 完成済み4種は参照のみ。改変・再生成禁止

## Production queue

| ID | Asset | Type | Status | Notes |
|---|---|---|---|---|
| WB-01 | A2縦ベース背景 | raster/background | `ACCEPTED` | `ADD-01_WB-01_A2_PORTRAIT_BASE_BACKGROUND_v1.png`; 4961×7016 px; 300 dpi; RGB PNG; mint-to-blue paper/travel atmosphere; no text |
| WB-02 | 旅行ルート線装飾 | transparent PNG | `ACCEPTED` | `ADD-01_WB-02_TRAVEL_ROUTE_LINE_TRANSPARENT_v1.png`; 3083×1233 px; RGBA; curved dashed route, five route nodes, minimal paper-plane silhouette; no text |
| WB-03 | 旅行バッジ装飾 | transparent PNG | `ACCEPTED` | `ADD-01_WB-03_TRAVEL_BADGE_TRANSPARENT_v1.png`; 1826×1748 px; RGBA; irregular luggage-sticker silhouette, globe, route, plane, blank ribbon/tab; no text |
| WB-04 | 方位/コンパス装飾 | transparent PNG | `ACCEPTED` | `ADD-01_WB-04_COMPASS_DECOR_TRANSPARENT_v1.png`; 1821×1821 px; RGBA; restrained fine-line compass, directional needles, travel orbit and paper plane; no text |
| WB-05 | 横浜アクセント装飾 | transparent PNG | `NOT_REQUIRED` | WB-01〜04で背景・経路・バッジ・方位の役割が揃っている。追加すると写真・タイトル・会場情報と競合し、装飾過多になるため生成しない。横浜表記は編集テキストで扱う |
| WB-06 | 写真フレームマスク仕様 | editable shape | `SPEC_READY` | 画像生成せずFigma shapeで作成 |
| WB-07 | タイトル/名前/日付 | editable text | `SPEC_READY` | 画像へ焼き込まない |

## Accepted asset evidence

| ID | Dimensions / mode | SHA-256 | Drive ID |
|---|---|---|---|
| WB-01 | 4961 × 7016 / RGB | `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7` | `1XgE7c8cffxmMViEqeqJJ8Phnd5YxaE4l` |
| WB-02 | 3083 × 1233 / RGBA | `4beb9590d729130cb27863c626277f677ffd47840edcde6b7f444181886ecc84` | `1cSpz2tcZZ0eKPBhD8vdacjc3GtWqPwf9` |
| WB-03 | 1826 × 1748 / RGBA | `407ec787643771040de0125957dd49c7491604f820440c52c27ee5c4399799c3` | `1TOok5ps43XKrf3FN2OUV46Sr8cAgWgxR` |
| WB-04 | 1821 × 1821 / RGBA | `c1a05cbc3b3e36c8a255d6dd0a6ae09c414f4396154cc7c4fb5d6fb62866ac56` | `1jt54tvLnk1CCVaBt3XhvEgqnw593_O1t` |

## Generation constraints

- 人物・犬を生成またはAI変換しない
- 文字、日付、名前、会場名を画像へ焼き込まない
- 透過素材は真のRGBA透明背景を使用し、機械QAと視覚QAを必須とする
- 本番は1素材1ファイル
- asset sheetは`QA_CONTACT_SHEET / NON_PRODUCTION`
- 同じ役割の素材を生成する前にGitとDriveを再検索する

## Completion result

- Production assets: 4
- Accepted: WB-01, WB-02, WB-03, WB-04
- Not required after review: WB-05
- Editable-only specifications ready: WB-06, WB-07
- Item status: `PLACEMENT_READY`

## ACTIVE_NEXT

`ADD-02_TABLE_SIGNS_SPEC_AND_QUEUE`
