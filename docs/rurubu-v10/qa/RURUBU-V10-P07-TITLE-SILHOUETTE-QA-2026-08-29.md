# Rurubu WEDDING V10 — P07 title silhouette QA — 2026-08-29

Status: `LIVE_FIGMA_VERIFIED / PRODUCTION_CANDIDATE / NOT_DESIGN_COMPLETE / NOT_PRINT_READY`

Scope: Rurubu WEDDING V10 only. Live authority is Figma production page `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`).

## Canonical / live checks

- Latest-main canonical manifest and all linked V10 design / anti-AI / linter / hybrid-authoring authorities were re-read before the Figma write.
- Drive authority folder and all eight organized semantic folders (`01_LOGO_TITLE` through `08_REFERENCE`) were live-listed.
- Live Figma page map remains canonical for P01–P08.
- AI assist guide `2797:2`, quality floor `2621:111`, and completed references `2771:2`, `2771:3`, `2771:4` remain reference-only.

## P05 crop decision before moving on

P05 `2787:28` was re-reviewed first because the previous pass left milestone photo crops `2787:32`, `2787:33`, `2787:34` for role-specific judgment.

The current screenshot and fill state show:

- `2787:32` (`REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01`, Drive `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw`) already reads as an intimate people-memory interruption;
- `2787:33` (`REAL_PHOTO_PROFILE_HAWAII_COUPLE_SHAKA_02`, Drive `1eTF3D0qS7qocpCWDVCXkSdTFBwJQzW-o`) preserves both faces and the shaka gesture;
- `2787:34` (`REAL_PHOTO_COVER_HAWAII_PALMS_COUPLE_WIDE_02`, Drive `1G-8t1JbX-GyqeMhuPLCPjsLKT_oue4Rb`) intentionally keeps the couple small so the palms / beach remain the scenery-memory subject.

All three remain clipped replaceable masks. They were deliberately **not** zoomed or converted to a common crop system: doing so would reduce the mixed image-role behavior required by the reference fingerprint.

## P07 title-silhouette defect and correction

A fresh actual screenshot of P07 `2787:42` against closest reference `2771:3` exposed an optical defect in the native fallback title: the support title `モデルコース` started at x=184 and covered a large part of the dominant `1DAY` Y. The page still passed geometry checks, but FIRST READ no longer had a clean `1DAY` silhouette.

The correction was structural/typographic rather than decorative:

- dominant native fallback title `2826:8` (`1DAY`) was left unchanged at x=35, y=40, 92 px, BIZ UDGothic Bold;
- support native title `2889:2` (`モデルコース`) moved from x=184 to x=258;
- support width changed from 350 to 276 px;
- y=82, 42 px type size, wording, font, rotation, and editability were preserved.

Post-write screenshot shows `1DAY` as an intact dominant first read, with `モデルコース` clearly to its right as the second read. The correction preserves the reference behavior of a large `1DAY` plus secondary Japanese title without sacrificing letterform legibility.

Named reading path after the correction:

`1 1DAY → 2 モデルコース → 3 route sequence / course map → 4 food interruption → 5 lower micro discovery`.

Largest remaining reference-distance cause is no longer the title collision. It is the still-limited authoritative route/time/place micro-information plus pending final title / full-resolution food promotion. No fake travel facts or filler copy were added.

## Canonical live linter after the write

- `PRODUCTION_CANDIDATE`: 8/8
- fatal AI tells: 0/8
- strong warnings: 0/8
- highest page-signature similarity: P02↔P06 `66%` (`INFORMATIONAL`)
- P05↔P07 `59%` (`INFORMATIONAL`)
- P01↔P02 `56%`; P06↔P08 `56%`
- no pair in `REVIEW` (70–84%) or `HIGH_RISK` (>=85%)
- P07 dominance: ~`1.716`
- P07 edge-shape count: `3`
- P07 controlled rotated shapes: `8`

## P07 A5 preflight after the write

- visible text nodes: `13`
- trim overflow: `0`
- critical 6 mm working-safe text violations: `0`
- missing fonts: `0`
- visible replaceable P07 photo masks: `4`
- clipped masks: `4/4` (`clipsContent=true`)

P07 still contains explicit non-final imagery:

- food hero `2787:46` uses the 180×180 layout derivative of `GENERATED_FOOD_CAFE_HAWAII_FOOD_COLLAGE_TROPICAL_01.png` (Drive `1_MJmJGiIlGd13PCUfDBUv_cvZ5xDfpca`) and still requires final full-resolution promotion;
- cafe micro `2787:48` remains `LOW_RES_LAYOUT_PROXY_ONLY`;
- people/scenery photos remain layout proxies with `FINAL_PHOTO_QA_DEFERRED`.

No new raster asset was generated or placed in this batch.

## Completion boundary

- `ASSET_FIRST_80`: 8/8 remains satisfied.
- `PRODUCTION_CANDIDATE`: 8/8.
- `CONTENT_COMPLETE`: NO — authoritative P02 profile values and P03 Q&A answers remain unresolved; do not fabricate them.
- `DESIGN_COMPLETE`: NO — selected fixed title/frame graphics remain pending where transport still blocks promotion.
- `PRINT_READY`: NO — final people/scenery replacement QA, P07 full-resolution food promotion, final title/frame promotion, full actual-size/print proof, and export/preflight remain required.
