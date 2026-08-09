# ADD-17 子ども向けミニカード / ぬりえ — Design QA

Date: 2026-08-09
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Latest refinement start main SHA: `2b2dbe3fab38df64a1d532810d1c18267be53a79`

## Status

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

The latest non-Rurubu Current authority explicitly permits an age-independent neutral editable ADD-17 template while keeping final adoption blocked until authoritative child-attendance/count/age information exists.

## Live Figma authority

- file key: `PAvkRggJiRuXVypi3RgZCN`
- production page: `01_PRODUCTION`
- front: `2:2` — `ADD17/A6_FRONT/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- back: `2:5` — `ADD17/A6_BACK/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- format model: A6 trim 105 × 148 mm, 3 mm bleed model, hidden 8 mm safe-area guides
- no child names, ages, count, interests, venue services, QR, or other guest facts were invented

## 2026-08-09 editorial refinement

A fresh whole-item and actual-size screenshot audit found that the prior PASS still carried two visible template/AI signals:

1. the front used a generic suitcase illustration plus route dot/line/arrow that primarily filled whitespace rather than supporting the activity;
2. the back used deliberately uneven writing-line lengths that read as arbitrary pseudo-editorial decoration rather than a functional writing field.

Before editing, the then-current production was duplicated to `99_QA` as rollback evidence:

- `8:2` — `QA_ADD17_ROLLBACK_PRE_EDITORIAL_REFINEMENT_FRONT_2026_08_09`
- `8:22` — `QA_ADD17_ROLLBACK_PRE_EDITORIAL_REFINEMENT_BACK_2026_08_09`

Production was then refined natively:

- removed the visible decorative kicker and field labels;
- hid the suitcase, tag, route dot/line/arrow motif instead of raster-replacing it;
- reduced the hero-like title scale and tightened the Japanese-first hierarchy;
- enlarged the front drawing area into a clean, intentionally empty activity field;
- normalized the back writing guides into four functional equal-length baselines;
- kept the optional-name field separate and moved its underline lower after long-copy QA exposed a two-line collision risk;
- retained the warm paper field, restrained teal rule, native text/vector structure, and hidden trim/safe guides.

No gradients, shadows, badges, fake transport data, generated people/animals, or raster decoration were introduced.

## Screenshot QA

Post-refinement screenshots were inspected at thumbnail/whole scale and natural-size/detail scale for both production sides.

Result: PASS. The composition now reads as a restrained Japanese editorial activity card rather than a generic travel worksheet. No visible text collision or print-only internal workflow text is present.

Post-refinement long-copy stress proofs:

- `9:2` — `QA_ADD17_EDITORIAL_LONG_COPY_STRESS_FRONT_2026_08_09_V3`
- `9:22` — `QA_ADD17_EDITORIAL_LONG_COPY_STRESS_BACK_2026_08_09_V3`

The V3 proofs use explicit semantic placeholders only. They test a two-line front prompt, longer front hint, two-line back prompt, and a two-line optional-name label. Initial V3 screenshot QA exposed the optional-name underline touching the wrapped label; the underline was moved down in both production and stress proof, and the second screenshot passed.

## Structural readback

Production front/back:

- native text: 6 / 6 total
- visible native text after editorial simplification: 3 / 3
- image fills: 0 / 0
- frame-bound visible overflow: 0 / 0
- trim guides present and hidden
- 8 mm safe-area guides present and hidden
- variable copy remains native editable text
- removed travel filler remains hidden native vector/shape history rather than flatten/raster replacement

V3 stress front/back:

- native text: 6 / 6
- visible native text: 3 / 3
- image fills: 0 / 0
- frame-bound visible overflow: 0 / 0
- trim and safe-area guides remain present and hidden

## Google Drive

Exact non-Rurubu ADD-17 folder search still returns no dedicated Drive folder. No Drive asset was required by the screenshot-supported defect, so Drive write count remains 0 and no duplicate folder/assets were created.

## Deferred / blocked finalization

Final adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative information confirms whether children attend and, if so, approximate count/age range and whether this activity is wanted or venue-provided.

Final paper/printer template, production PDF/export profile, physical 100% proof, pen/crayon usability, edge/bleed verification, and real-use handling remain `DEFERRED_FINALIZATION`.

Do not repeatedly redesign this neutral template while those inputs are missing. If later confirmed unnecessary, resolve it as `NOT_REQUIRED`; otherwise replace only confirmed semantic copy/operation fields and perform final physical print proof.
