# ADD-01 ウェルカムボード — DRIVE REGISTER

Status: `FOLDER_READY / WB-01_STORED_AND_VERIFIED`
Date: 2026-08-01

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
| WB-02 | TBD | TBD | — | — | — | `PENDING` |
| WB-03 | TBD | TBD | — | — | — | `PENDING` |
| WB-04 | TBD | TBD | — | — | — | `PENDING` |
| WB-05 | TBD | TBD | — | — | — | `PENDING_REVIEW` |

## WB-01 integrity

- Dimensions: 4961 × 7016 px
- Resolution metadata: 299.9994 dpi
- Mode: RGB
- File size: 36,169,290 bytes
- SHA-256: `2a2a0244862355e777926839ae39d9ce9e6c6c9e602ab6c0e53d3d276a0692f7`
- Upload response: success
- Drive search readback: exact filename and `image/png` confirmed

## Rules

- 上書きせず新規保存
- 正本と候補をファイル名で区別
- Drive upload responseだけで完了にせず、対象フォルダのlist/readbackで確認
- ID、名前、MIME type、親フォルダを記録
- Drive未保存の素材は`COMPLETED`禁止
