# ADD-01 — V4 hero print-resolution scenario QA — 2026-08-31

State: `V4_VISUAL_QA_IN_PROGRESS / REAL_PHOTO_IMPORT_BLOCKED / CONDITIONAL_RESOLUTION_RISK_FOUND / NOT_PROMOTED / NOT_PRINT_READY`

## Live authority before write

- latest `main`: `a99ec448c6057910b81978812a4b25e2142d780a`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`
- V4 clean-room root: `24:3 / V4 / ADD-01 / OPEN DOOR / CLEANROOM` = `852×1200 px`
- replaceable hero: `24:9 / PHOTO / COUPLE / REPLACEABLE / REAL_PHOTO_REQUIRED` = `310×930 px`
- exact ADD-01 Drive authority: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`
- previously located authoritative real-photo candidate: `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg`, Drive id `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P`, `4500×3000 px`
- no Rurubu item-specific node/path/asset was read or edited.

## Why this QA was needed

The previous evidence correctly deferred effective-PPI judgment because the final physical welcome-board size is still unresolved between A3/A2-like outputs. However, the current V4 hero is extremely portrait (`310:930 ≈ 1:3`). The located real photo is landscape (`4500:3000 = 3:2`).

That combination means a `FILL` crop would discard most of the source width. Even before final size is selected, it is useful to test the known candidate against the two already-discussed physical-size scenarios so the design does not reach raster import and only then discover a print-resolution failure.

This is **scenario QA only**. It does not change production geometry and does not assign a formal `RESOLUTION_WARNING` while final physical size remains non-authoritative.

## Crop math

For a 310×930 destination, the target aspect ratio is approximately `0.3333`.

Using the full 3000 px source height from a 4500×3000 image, the maximum source crop that matches the hero aspect is approximately:

- used source height: `3000 px`
- used source width: `~996 px`

So the effective print resolution is constrained by the 3000 px vertical dimension and the severe horizontal crop.

## A3 scenario — 297×420 mm

If the current 852×1200 canvas maps proportionally to A3 portrait:

- hero physical size ≈ `108.1×325.5 mm`
- effective PPI from the current 4500×3000 source with `FILL` crop ≈ **234 ppi**

Under the current project thresholds, `<250 ppi` is final-production NG. Therefore the current source + current hero crop would fail the final raster threshold if A3 becomes authoritative.

For reference, current native text would map approximately to:

- 72 px title → `~71.4 pt`
- 48 px subtitle → `~47.6 pt`
- 30 px date/name → `~29.8 pt`
- 22 px location/message → `~21.8 pt`

These are scenario values only; actual-size typography remains deferred until final physical size is selected.

## A2 scenario — 420×594 mm

If the same canvas maps proportionally to A2 portrait:

- hero physical size ≈ `152.8×460.4 mm`
- effective PPI from the current source/crop ≈ **166 ppi**

This is substantially below the final-production threshold and cannot be accepted as a final A2 hero under the current print-first rules.

Scenario typography would map approximately to:

- 72 px title → `~101.0 pt`
- 48 px subtitle → `~67.4 pt`
- 30 px date/name → `~42.1 pt`
- 22 px location/message → `~30.9 pt`

Again, these are not promoted actual-size values because A2 is not yet authoritative.

## Decision

A new print-production risk is now known:

`CURRENT_4500x3000_SOURCE + CURRENT_310x930_HERO_CROP = CONDITIONAL_FINAL_RESOLUTION_FAILURE`

Do **not** solve this by upscaling a low-resolution proxy and do not silently accept the candidate after raster import.

When final physical size is chosen, at least one of the following must be evidenced before `PRINT_READY`:

1. a materially higher-resolution authoritative real photo that survives the final crop at >=300 ppi preferred / >=250 ppi absolute current threshold;
2. a revised V4 photo role/crop with less destructive aspect ratio, proven not to weaken the composition and recalculated at final physical size;
3. a smaller physical photo area in the final poster, again only after reference-led visual comparison and actual-size QA.

Because final A2/A3 size is unresolved, production geometry `24:9` is intentionally unchanged in this run. Formal `RESOLUTION_WARNING` remains deferred rather than guessed, but this conditional risk must be checked before any future V4 promotion.

## Other print-state constraints

Still unresolved:

- real-photo import/link path and final crop/focal point;
- final A2/A3 physical size;
- printer template / trim / bleed / safe area;
- stand/easel occlusion;
- CMYK/profile conversion including skin, white clothing/highlights, blue-green fields and deep tones;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% or physical proof.

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.
