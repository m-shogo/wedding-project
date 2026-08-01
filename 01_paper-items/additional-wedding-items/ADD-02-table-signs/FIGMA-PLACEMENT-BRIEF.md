# ADD-02 — FIGMA PLACEMENT BRIEF

Status: `CURRENT / PREPARED_FOR_FIGMA`

## Production model

One Figma file for the ADD-02 item, containing 11 named destination frames. Exported production files remain one destination per output.

Suggested file name:

`ADD-02_11_COUNTRY_TABLE_SIGNS_2026-10-24`

Pages:

- `00_README`
- `01_SYSTEM`
- `02_TABLE_SIGNS`
- `99_QA`

## Frames

- `FRAME_TABLE_SIGN_HAWAII`
- `FRAME_TABLE_SIGN_ITALY`
- `FRAME_TABLE_SIGN_FRANCE`
- `FRAME_TABLE_SIGN_SPAIN`
- `FRAME_TABLE_SIGN_TAIWAN`
- `FRAME_TABLE_SIGN_JAPAN`
- `FRAME_TABLE_SIGN_HONG_KONG`
- `FRAME_TABLE_SIGN_SINGAPORE`
- `FRAME_TABLE_SIGN_BALI`
- `FRAME_TABLE_SIGN_KOREA`
- `FRAME_TABLE_SIGN_MALDIVES`

## Working geometry

Provisional primary:

- trim: 100 × 148 mm portrait
- 10 px = 1 mm working scale
- trim frame: 1000 × 1480 px
- bleed shell: 1060 × 1540 px
- safe inset: minimum 50 px from trim

Do not declare print-ready until holder and vendor template are confirmed.

## Shared system

Systemise only:

- trim / bleed / safe guides
- type hierarchy
- table identifier treatment
- destination-note text style
- image replacement contract
- export naming

Do not systemise into identical layouts:

- hero crop position
- country motif position
- color-field proportion
- information density
- stamp / route placement

## Base semantic tree

1. `GUIDE_BLEED`
2. `GUIDE_TRIM`
3. `GUIDE_SAFE`
4. `BG_COUNTRY_FIELD`
5. `IMG_COUNTRY_HERO`
6. `DECOR_COUNTRY_MOTIF`
7. `TXT_TABLE_NAME`
8. `TXT_COUNTRY_NAME`
9. `TXT_COUNTRY_NOTE`
10. `TXT_ROUTE_CODE`
11. `DECOR_SMALL_IDENTIFIER`
12. `QA_OVERLAY`

## First layout directions

Create three family-level directions before committing all 11:

### A — Destination editorial
- large image crop
- country name partly overlaps image edge
- note reads like a short travel-magazine caption

### B — Travel document
- image is secondary
- route code, stamp, coordinates, and paper structure lead
- avoid becoming another passport copy

### C — Material postcard
- country-specific texture / architecture rhythm
- irregular image window
- restrained handwritten or receipt-like micro detail

Choose by screenshot comparison using Hawaii, Taiwan, and Maldives as stress representatives. They cover tropical, dense/night, and minimal/water visual conditions.

## Build order

1. create system and guides
2. build Hawaii / Taiwan / Maldives prototypes
3. screenshot family comparison
4. choose or hybridise one structural direction
5. build remaining eight without blind duplication
6. replace photos and run dark/bright crop QA
7. actual-size print QA

## Photo contract

- use selected real photos where possible
- preserve non-destructive image fills and crop controls
- no AI transformation of people
- no fake documentary travel scenes presented as real memories
- no image baked with country names or table numbers

## Copy placeholders

Until approved final copy exists:

- table label: `TABLE 01`
- country name: fixed English destination name
- note: clearly marked layout-only dummy text
- route code: optional and fictional but non-operational

Never ship dummy copy.

## Export contract

- one destination per PDF/PNG export
- names: `ADD-02_TABLE-SIGN_[COUNTRY]_FINAL_vN`
- contact sheet: `ADD-02_11-TABLE-SIGNS_QA_CONTACT_SHEET_NON_PRODUCTION`

## Current declaration

`SPEC_READY / QUEUE_READY / DRIVE_FOLDER_READY / PREPARED_FOR_FIGMA / FIGMA_NOT_STARTED`
