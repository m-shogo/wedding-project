# V30 P01 production assets

Status: `P01_FIGMA_COMPLETE / VISUAL_MASTER_REBUILD / DUMMY_PHOTOS`

P01 is the only page changed in this production pass. The live Figma frame was reset before reconstruction; V20-derived debris, hidden graveyards, obsolete placeholders and rejected candidates are not retained in the current frame.

## Current page role

- Cover: `るるぶ WEDDING`
- One open, dominant hero-photo slot plus three independent Feature 1/2/3 photo slots
- Native/editable facts: `Shogo & Shiori`, `2026`, `2026.10.24`, `PAGE 01`
- Native/editable editorial copy: the three feature headings, bottom story statement and stamp labels
- Figma page/frame: `V30_FINAL_PRODUCTION` / `3535:7`

## Adopted production assets

| Asset | Role | Figma node |
| --- | --- | --- |
| `V30_P01_BG_RESORT_SKY_FIELD_PRODUCTION_RGBA.png` | Opaque resort sky/beach field | `3660:2` |
| `V30_P01_WEDDING_TITLE_PRODUCTION_RGBA.png` | Primary pink title art | `3660:14` |
| `V30_P01_LEFT_TROPICAL_CLUSTER_PRODUCTION_RGBA.png` | Left tropical cluster | `3660:15` |
| `V30_P01_RIGHT_DESTINATION_CLUSTER_PRODUCTION_RGBA.png` | Chapel/sea/palm/flower cluster | `3660:16` |
| `V30_P01_NAMES_RIBBON_PRODUCTION_RGBA.png` | Names backing | `3662:2` |
| `V30_P01_DATE_TICKET_PRODUCTION_RGBA.png` | Date-ticket backing | `3662:3` |
| `V30_P01_FEATURE_1_VESSEL_PRODUCTION_RGBA.png` | Pink/profile/camera module | `3662:4` |
| `V30_P01_FEATURE_2_VESSEL_PRODUCTION_RGBA.png` | Blue/travel/airplane module | `3662:5` |
| `V30_P01_FEATURE_3_VESSEL_PRODUCTION_RGBA.png` | Green/family-and-friends module | `3662:6` |
| `V30_P01_JOURNEY_STAMP_PRODUCTION_RGBA.png` | Separate journey postmark | `3662:7` |
| `V30_P01_BOTTOM_STORY_VESSEL_PRODUCTION_RGBA.png` | Bottom story cloud | `3662:8` |
| `V30_P01_PAGE_BADGE_PRODUCTION_RGBA.png` | Page-meta decoration | `3662:9` |
| `V30_P01_BOTTOM_FLORAL_CLUSTER_PRODUCTION_RGBA.png` | Bottom floral closure | `3662:10` |
| `V30_P01_AIRMAIL_BORDER_PRODUCTION_RGBA.png` | Airmail trim border | `3662:11` |

The `るるぶ` masthead, year badge, page-number disc and micro accents are editable Figma display/vector art rather than flattened page imagery.

## Replaceable photo slots

- Hero: frame `3660:3`, image child `3660:4`
- Feature 1: frame `3660:5`, image child `3660:6`
- Feature 2: frame `3660:7`, image child `3660:8`
- Feature 3: frame `3660:9`, image child `3660:10`
- All four frames use `clipsContent = true`; photos, front frames, decorations and copy remain separate.
- All four slots passed an actual cross-swap and restore test without spill, gap or frame reconstruction.
- Dummy/reference non-person photos remain until real couple/family sources are supplied.

## Generation and alpha QA

- One independently movable editorial part is stored as one PNG.
- Thirteen floating parts retain both keyed source and transparent production files.
- The background is intentionally opaque.
- Light/dark alpha contact-sheet QA and machine-readable alpha report are in `qa-alpha/`.
- No generated person, couple, family, friend or pet is used.

## Google Drive traceability

- Source folder: [01_SOURCE_KEYED/P01](https://drive.google.com/drive/folders/1AIbUPb18DFdT035NW_3tSsCgp22Ct1-o) — 13 files
- Production folder: [02_PRODUCTION_RGBA/P01](https://drive.google.com/drive/folders/1-zfSYIrxrPnwWQuAXO8-toHZEuz-zrNr) — 14 files
- QA folder: [90_QA_EXPORT/P01](https://drive.google.com/drive/folders/1YQpvXrh8qHyv_LXLXoPYPC90dzQw3bAk) — 6 files
- Rejected folder: [99_REJECTED_DO_NOT_USE/P01](https://drive.google.com/drive/folders/1DXJ3gIlZalOiCeytBRnm425s3W9KO-bb) — 7 superseded files

## Visual QA / current best

- Final 2x Figma export: `V30_P01_FIGMA_COMPLETE_2X.png` (`1118 × 1588`)
- A5 thumbnail QA: `qa-alpha/V30_P01_A5_THUMBNAIL_QA.jpg`
- Grayscale hierarchy QA: `qa-alpha/V30_P01_GRAYSCALE_QA.jpg`
- Visual Master comparison: `qa-alpha/V30_P01_REFERENCE_DELTA_CONTACT_SHEET.jpg`
- Alpha proof: `qa-alpha/V30_P01_ALPHA_QA_LIGHT_DARK_CONTACT_SHEET.jpg`
- Alpha report: `qa-alpha/V30_P01_ALPHA_QA_REPORT.json`
- Visible stale-marker and hidden rejected-layer count in the rebuilt live frame: zero.

## Production boundary

`P01 FIGMA_COMPLETE = YES` with dummy photos. `P01 FINAL_PHOTO_SOURCES_INSTALLED = NO` and `PRINT_READY = NO` until the supplied real photographs are swapped, cropped and rechecked.
