# ADD-15 — DRIVE REGISTER

Status: `CURRENT / DRIVE_FOLDER_READY`
Authority: GitHub `main`

## Folder

- Name: `ADD-15_料理紹介_国テーマ説明カード`
- Drive ID: `186f2tA2czrrdIQ_7djhPBun6dStztmS8`
- Parent: `0ADXt8irGMFGnUk9PVA`
- URL: `https://drive.google.com/drive/folders/186f2tA2czrrdIQ_7djhPBun6dStztmS8`

## Current contents

- production raster: 0
- supplied official dish photography: 0
- supplied destination photography: 0
- export PDF: 0

## Intended structure

- `01_OFFICIAL_COPY`
- `02_OFFICIAL_PHOTOS`
- `03_WORKING_PROOFS`
- `04_PRINT_EXPORTS`
- `05_EVIDENCE`

サブフォルダは実データ受領時に必要なものだけ作る。空の階層を機械的に増やさない。

## Upload gate

- ファイル名にカードIDまたは料理/目的地の確定識別子を含める
- 正本と補正済み派生画像を区別する
- 仮画像をproduction正本として登録しない
- PDF exportはFigma frame ID、export date、trim sizeを記録する

## Readback

Folder creation: `PASS`

`DRIVE_FOLDER_READY / NO_PRODUCTION_ASSETS_YET`
