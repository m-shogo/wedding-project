# Rurubu WEDDING V10 — P08 Editorial Paper QA — 2026-08-30

Scope: **Rurubu WEDDING V10 only**.

Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Production: `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`)
Affected frame: P08 `2787:49` — BACK COVER
Closest reference: `2771:4`
QA mode: `PRODUCTION_CANDIDATE`

## Diagnosis

Live screenshot review showed the closing hero/message hierarchy already worked, but the message support field and `WEDDING DATA` fallback utility were still reading as rounded web UI cards. For P08's `RESOLVE + UTILITY + MESSAGE` job, the utility block should behave like a printed travel-magazine paper/ticket element, not a settings card.

The correction therefore targeted **shape grammar**, not decoration count or invented content.

## Live structural correction

- message paper `2844:16`: corner radius `22 -> 4`
- fallback utility postcard `2998:2`:
  - corner radius `8 -> 2`
  - `x 34 -> 28`
  - `y 610 -> 606`
  - `334x132 -> 346x136`
  - rotation `-1.25° -> -2.1°`

All native text, dates, names, photo masks, and the existing airmail fixed frame remained unchanged.

Final reading path:

1. `WEDDING GUIDE`
2. factual `2026 / 10.24` burst
3. closing message
4. couple closing hero
5. `WEDDING DATA` editorial paper + small travel-memory postcard

## Reference-distance assessment

Compared with `2771:4`, the page now has less generic rounded-card grammar and stronger print-paper behavior. The largest remaining distance is **publication-level fixed title/frame texture and useful authoritative micro-density**, not the back-cover hierarchy itself.

Manual Reference Match Score: **86/100 — CREDIBLE / REFINE**.

This is not a `PRINT_READY` claim.

## Canonical live linter after correction

- `PRODUCTION_CANDIDATE`: **8/8**
- fatal AI tells: **0/8**
- canonical warnings: **0/8**
- P02 ↔ P06: **66% INFORMATIONAL**
- P05 ↔ P07: **59% INFORMATIONAL**
- P01 ↔ P02: **56% INFORMATIONAL**
- P01 ↔ P06: **55% INFORMATIONAL**
- `>=70% REVIEW`: **0 pairs**
- `>=85% HIGH_RISK`: **0 pairs**

P08 signature remained healthy:

- shapes: `7`
- visible text: `12`
- production image fills: `6`
- dominance: `1.586`
- edge shapes: `2`
- controlled rotated shapes: `7`
- fatal: `[]`
- warnings: `[]`

## A5 actual-size preflight

Live trim `2787:50`: `559.370 x 793.701px`, approximately `3.7795px/mm`; 6mm working-safe is approximately `22.677px`.

- visible text: **12**
- text outside trim: **0**
- critical 6mm-safe violations: **0**
- visible text below 12px: **0**
- fonts inspected: `BIZ UDGothic / Bold`, `BIZ UDGothic / Regular`
- replaceable photo masks: **2**
- `clipsContent=true`: **2/2**
- visible `REFERENCE_` / `DUMMY_` leakage: **0**

## Existing semantic assets retained

No new raster placement and no generation in this pass.

- closing hero `2787:52`: `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg` — Drive `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P` — source verified 4500x3000; current Figma derivative remains `LOW_RES / PHOTO_PROXY_OK_FOR_LAYOUT / FINAL_PHOTO_QA_DEFERRED`
- closing support `2787:53`: `REAL_PHOTO_COVER_HAWAII_PALMS_COUPLE_WIDE_02.jpg` — Drive `1G-8t1JbX-GyqeMhuPLCPjsLKT_oue4Rb` — `PHOTO_PROXY_OK_FOR_LAYOUT / FINAL_PHOTO_QA_DEFERRED`
- support fixed frame: `FRAME_GLOBAL_PHOTO_HORIZONTAL_AIRMAIL_POSTCARD_01.png` — Drive `1byR4v1TGanNJVK87txTBQn3tT7yzQrQC`
- planned final postcard frame remains available in Drive: `FRAME_GLOBAL_POSTCARD_TRAVEL_MAP_TROPICAL_01.png` — Drive `1DTBtx0ej97fsyVISzOvg6yE8MlPJ5K6S`
- planned final title remains available in Drive: `TITLE_BACK_WEDDING_GUIDE_POP_B.png` — Drive `1mDkM1A8Z_hbkFUWFSNViwkVoChhFpTuA`

## Status

- `ASSET_FIRST_80`: 8/8
- `PRODUCTION_CANDIDATE`: 8/8
- `CONTENT_COMPLETE`: NO
- `DESIGN_COMPLETE`: NO
- `PRINT_READY`: NO

Next: fixed-graphic promotion if transport materially changes; otherwise continue actual-size anti-UI/fallback review without inventing content.
