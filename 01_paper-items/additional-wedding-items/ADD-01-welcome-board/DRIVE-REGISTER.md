# ADD-01 ウェルカムボード — DRIVE REGISTER

Status: `PLACEMENT_READY / WB-01_WB-02_WB-03_WB-04_STORED_AND_VERIFIED`
Date: 2026-08-02

## Parent structure

| Role | Name | Drive ID | URL | Verification |
|---|---|---|---|---|
| Project root | 2026-10-24_結婚式_ペーパーアイテム制作 | `14reXz-xiYANpyb0Q8iG4TbU8ecNuXurL` | https://drive.google.com/drive/folders/14reXz-xiYANpyb0Q8iG4TbU8ecNuXurL | `READBACK_OK` |
| Additional items root | 05_追加ウェディングアイテム | `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523` | https://drive.google.com/drive/folders/1iJGIzmNSlzwqrcv7P6UsNbstwBki1523 | `READBACK_OK` |
| ADD-01 folder | ADD-01_ウェルカムボード | `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg` | https://drive.google.com/drive/folders/1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg | `READBACK_OK` |

## Production assets

| Asset ID | Filename | MIME type | Drive ID | URL | Parent | Status |
|---|---|---|---|---|---|---|
| WB-01 | `ADD-01_WB-01_A2_PORTRAIT_BASE_BACKGROUND_v1.png` | `image/png` | `1XgE7c8cffxmMViEqeqJJ8Phnd5YxaE4l` | https://drive.google.com/file/d/1XgE7c8cffxmMViEqeqJJ8Phnd5YxaE4l/view | `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg` | `READBACK_OK / ACCEPTED` |
| WB-02 | `ADD-01_WB-02_TRAVEL_ROUTE_LINE_TRANSPARENT_v1.png` | `image/png` | `1cSpz2tcZZ0eKPBhD8vdacjc3GtWqPwf9` | https://drive.google.com/file/d/1cSpz2tcZZ0eKPBhD8vdacjc3GtWqPwf9/view | `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg` | `READBACK_OK / ACCEPTED` |
| WB-03 | `ADD-01_WB-03_TRAVEL_BADGE_TRANSPARENT_v1.png` | `image/png` | `1TOok5ps43XKrf3FN2OUV46Sr8cAgWgxR` | https://drive.google.com/file/d/1TOok5ps43XKrf3FN2OUV46Sr8cAgWgxR/view | `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg` | `READBACK_OK / ACCEPTED` |
| WB-04 | `ADD-01_WB-04_COMPASS_DECOR_TRANSPARENT_v1.png` | `image/png` | `1jt54tvLnk1CCVaBt3XhvEgqnw593_O1t` | https://drive.google.com/file/d/1jt54tvLnk1CCVaBt3XhvEgqnw593_O1t/view | `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg` | `READBACK_OK / ACCEPTED` |
| WB-05 | none | — | — | — | — | `NOT_REQUIRED_AFTER_REVIEW` |

## Integrity summary

| Asset | Dimensions / mode | File size | SHA-256 |
|---|---|---:|---|
| WB-01 | 4961 × 7016 / RGB | 36,169,290 bytes | `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7` |
| WB-02 | 3083 × 1233 / RGBA | 26,708 bytes | `4beb9590d729130cb27863c626277f677ffd47840edcde6b7f444181886ecc84` |
| WB-03 | 1826 × 1748 / RGBA | 64,784 bytes | `407ec787643771040de0125957dd49c7491604f820440c52c27ee5c4399799c3` |
| WB-04 | 1821 × 1821 / RGBA | 64,830 bytes | `c1a05cbc3b3e36c8a255d6dd0a6ae09c414f4396154cc7c4fb5d6fb62866ac56` |

## WB-05 review

- Drive exact-name/role search in the ADD-01 folder: no existing WB-05 asset
- No upload performed
- Reason: WB-01〜04で背景、経路線、旅行バッジ、コンパスが揃っており、追加の横浜画像は写真・タイトル・会場表記と競合する
- Yokohama/location is retained as editable text in the placement brief

## Rules

- 上書きせず新規保存
- 正本と候補をファイル名で区別
- Drive upload responseだけで完了にせず、対象フォルダのlist/readbackで確認
- ID、名前、MIME type、親フォルダを記録
- Drive未保存の素材は`COMPLETED`禁止
