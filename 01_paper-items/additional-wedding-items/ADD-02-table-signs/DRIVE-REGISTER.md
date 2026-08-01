# ADD-02 — DRIVE REGISTER

Status: `CURRENT / FOLDER_READY`

## Production folder

- title: `ADD-02_11卓の国別テーブルサイン`
- Drive ID: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- URL: https://drive.google.com/drive/folders/1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r
- parent: My Drive root
- created/readback: 2026-08-02

## Expected contents

Future production files must follow:

- one destination / one master asset file
- no contact sheet mixed into production assets
- final file names follow `ADD-02_TS-[COUNTRY]-[NN]_[ROLE]_vN.ext`
- accepted assets record Drive ID, dimensions, MIME type, checksum, and QA state

## Current inventory

No production raster assets exist yet.

This is intentional: Current review determined that real-photo selection and editable Figma vector motifs should precede country-scene generation.

## Integrity gate

An asset is not accepted until:

1. file uploaded to this folder,
2. Drive metadata read back,
3. filename and MIME type match,
4. transparent assets pass alpha-edge QA,
5. Git record contains Drive ID and checksum.
