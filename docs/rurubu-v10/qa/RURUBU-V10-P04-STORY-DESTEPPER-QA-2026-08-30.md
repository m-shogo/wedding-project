# Rurubu V10 — P04 STORY de-stepper QA — 2026-08-30

Scope: `Rurubu WEDDING V10` only.

Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production page: `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`)
Affected production frame: P04 STORY `2787:22`
Closest reference: `2771:3` primary, `2771:2` secondary.

## Diagnosis

P04 already had a strong title, emotional hero, two supporting photos, and a readable lead. The largest remaining structural reference-distance was the lower `01 → 02 → 03` sequence: two long diagonal connectors plus a relatively rounded center tag made the cluster read too much like a continuous process stepper. That conflicts with the P04 recipe: P04 should tell the relationship story emotionally before P05 owns the more explicit chronology.

No new facts, dates, or episodes were invented to manufacture density.

## Live structural correction

Changed only existing P04 native geometry:

- `3080:5` `RURUBU P04 / MILESTONE TAG / 02 / PAPER`
  - corner radius `12 → 3`
  - position and text relationship preserved.
- `3090:2` `RURUBU P04 / STORY FLOW CONNECTOR / 01-02`
  - `x=139`, `y=609`, `w=92`, `h=3`, rotation `-13.5°`.
  - shortened from a long continuous stepper line into a local editorial flow cue.
- `3090:3` `RURUBU P04 / STORY FLOW CONNECTOR / 02-03`
  - `x=310`, `y=658`, `w=72`, `h=3`, rotation `-22.5°`.
  - likewise shortened into a local cue.

The result preserves `FLOW + MILESTONE + PHOTO`, but the lower region now reads as three photo-anchored story destinations rather than one corporate roadmap.

## Live asset roles preserved

- Hero `2787:25`: `REAL_PHOTO_COVER_HAWAII_PALMS_COUPLE_WIDE_02` — Drive `1G-8t1JbX-GyqeMhuPLCPjsLKT_oue4Rb` — replaceable layout proxy; Drive source verified 4500×3000; current Figma derivative 220×147; `FINAL_PHOTO_QA_DEFERRED`.
- Support memory `2787:26`: `REAL_PHOTO_PROFILE_HAWAII_COUPLE_SHAKA_02` — Drive `1eTF3D0qS7qocpCWDVCXkSdTFBwJQzW-o` — replaceable layout proxy.
- Closing memory `2787:27`: `REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01` — Drive `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw` — replaceable layout proxy.
- Fixed closing frame `3091:2`: `FRAME_GLOBAL_PHOTO_POLAROID_FLORAL_WHITE_01` — Drive `1-EgrkJMu5b0hvnPcUwgXG1UaN0V-YciS` — verified source 1122×1402; current display about 39.9×49.7 mm; about 318 ppi; independent from photo.

No new raster was placed and no new asset was generated.

## Live AI-look linter after correction

Canonical `scripts/rurubu-v10/figma-ai-look-linter.js` was executed against live production after the change.

- QA mode: `PRODUCTION_CANDIDATE` for all 8 pages.
- Fatal AI tells: `0/8`.
- Canonical structural warnings: `0/8`.
- Highest page-signature similarity: `P02 ↔ P06 = 66%` (`INFORMATIONAL`).
- Next: `P05 ↔ P07 = 58%`, `P01 ↔ P02 = 56%`, `P01 ↔ P06 = 55%`.
- `70%+ REVIEW`: none.
- `85%+ HIGH_RISK`: none.
- P04: shape count 10, dominance 1.406, edge shapes 4, controlled rotated shapes 10, fatal 0, warnings 0.

## P04 actual-size / editability QA

A5 working trim measured live from the trim frame: 559.37×793.70 px = 148×210 mm, or about 3.7795 px/mm. Working 6 mm critical-safe inset = about 22.68 px.

- visible native text: 9
- text outside trim: 0
- critical 6 mm safe-area violations: 0
- visible text below 12 px: 0
- missing font findings: 0
- replaceable photo masks: 3
- masks with `clipsContent=true`: 3/3
- visible `REFERENCE_` / `DUMMY_` image leakage: 0

Verified key readability pair:
- lead strip background: `SUNNY_YELLOW #FFD23F`
- lead copy: `INK #1F2430`

The center milestone paper is `WARM_CREAM #F7EDE2` after the geometry correction.

## Reading path and remaining distance

Current named path:

`1 ふたりのこと → 2 出会いから今日まで、ふたりの物語。 → 3 emotional hero → 4 support memory / 01・02 → 5 closing memory / 03 今日へ`

Manual reference-match diagnostic after live screenshot comparison: approximately `86/100 — CREDIBLE_REFINE`.

Lowest categories remain editorial density and publication texture. The largest remaining distance is not a need for more stickers: authoritative story/milestone micro-information is still sparse, and the final composed P04 title artwork has not been promoted. Do not invent story facts to fill that gap.

## State

- `ASSET_FIRST_80`: maintained.
- `PRODUCTION_CANDIDATE`: yes.
- `CONTENT_COMPLETE`: no.
- `DESIGN_COMPLETE`: no.
- `PRINT_READY`: no.
