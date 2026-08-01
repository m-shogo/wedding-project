# ADD-01 ウェルカムボード — DRIVE REGISTER

Status: `FOLDER_READY / WB-01_WB-02_WB-03_WB-04_STORED_AND_VERIFIED`
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
| WB-05 | TBD | TBD | — | — | — | `PENDING_REVIEW` |

## WB-01 integrity

- Dimensions: 4961 × 7016 px
- Resolution metadata: 299.9994 dpi
- Mode: RGB
- File size: 36,169,290 bytes
- SHA-256: `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7`

## WB-02 integrity

- Dimensions: 3083 × 1233 px
- Mode: RGBA
- Alpha extrema: `0–235`
- File size: 26,708 bytes
- SHA-256: `4beb9590d729130cb27863c626277f677ffd47840edcde6b7f444181886ecc84`

## WB-03 integrity

- Dimensions: 1826 × 1748 px
- Mode: RGBA
- Alpha extrema: `0–245`
- File size: 64,784 bytes
- SHA-256: `407ec787643771040de0125957dd49c7491604f820440c52c27ee5c4399799c3`

## WB-04 integrity

- Dimensions: 1821 × 1821 px
- Mode: RGBA
- Alpha extrema: `0–205`
- File size: 64,830 bytes
- SHA-256: `c1a05cbc3b3e36c8a255d6dd0a6ae09c414f4396154cc7c4fb5d6fb62866ac56`
- Upload response: success
- Drive search readback: exact filename and `image/png` confirmed
- Parent folder: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`

## Rules

- 上書きせず新規保存
- 正本と候補をファイル名で区別
- Drive upload responseだけで完了にせず、対象フォルダのlist/readbackで確認
- ID、名前、MIME type、親フォルダを記録
- Drive未保存の素材は`COMPLETED`禁止
