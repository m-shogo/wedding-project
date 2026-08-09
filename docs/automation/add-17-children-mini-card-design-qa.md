# ADD-17 子ども向けミニカード / ぬりえ — Design QA

Date: 2026-08-09
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main SHA: `d9f303e6af9f2ff7af05a69e1b529d3e0e45dc56`

## Status

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

The latest non-Rurubu Current authority explicitly permits an age-independent neutral editable ADD-17 template while keeping final adoption blocked until authoritative child-attendance/count/age information exists. This supersedes the older ADD-17 requirement-check statement that prohibited Figma work, but does not resolve the attendance requirement gate.

## Live Figma authority

- file key: `PAvkRggJiRuXVypi3RgZCN`
- page: `01_PRODUCTION`
- front: `2:2` — `ADD17/A6_FRONT/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- back: `2:5` — `ADD17/A6_BACK/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- format model: A6 trim 105 × 148 mm, 3 mm bleed model, hidden 8 mm safe-area guides
- no child names, ages, count, interests, venue services, QR, or other guest facts were invented

## Visible refinement

Initial production used decorative English microcopy and visible internal workflow footers. Reading-scale screenshot QA identified those as template/AI-like print defects. They were replaced with functional Japanese labels and the internal workflow text was hidden from the printable surface.

The back-side fifth writing line also collided with the optional-name row; it was removed and the optional-name row was widened/repositioned. Header spacing and field geometry were adjusted to tolerate two-line variable prompts.

Final art direction is restrained editorial print rather than web UI: warm paper field, Japanese-first typography, thin rules, asymmetric drawing space, and a small native-vector travel activity motif. No gradients, shadows, badge stack, fake transport data, generated people/animals, or raster decoration are used.

## Screenshot QA

PASS after refinement at:

- whole-item / thumbnail scale
- reading scale
- natural-size / detail scale

Production front/back show no visible text collision or unintended print-only internal status text.

Long-copy stress proofs:

- `5:2` — `QA_ADD17_LONG_COPY_STRESS_FRONT_2026_08_09_V2`
- `5:22` — `QA_ADD17_LONG_COPY_STRESS_BACK_2026_08_09_V2`

The V2 stress proofs test genuinely variable prompt/hint/name copy only. Fixed semantic titles are not treated as arbitrary variable strings. Both V2 proofs visually pass without collision.

## Structural readback

Production:

- front native text: 6
- back native text: 6
- image fills: 0 / 0
- frame-bound visible overflow: 0 / 0
- trim guides present and hidden
- 8 mm safe-area guides present and hidden
- variable copy remains native editable text
- travel line art remains native vector/shape nodes
- no raster/flatten replacement introduced

Stress V2:

- native text: 6 / 6
- image fills: 0 / 0
- frame-bound visible overflow: 0 / 0

Rollback evidence retained on `99_QA`:

- `QA_ADD17_BLANK_BASELINE_2026_08_09__PRINT_SCALE_10PX_PER_MM`
- `QA_ADD17_ROLLBACK_PRODUCTION_FRONT_2026_08_09`
- `QA_ADD17_ROLLBACK_PRODUCTION_BACK_2026_08_09`

## Google Drive

Exact non-Rurubu ADD-17 searches for `ADD-17` and `children mini card` returned no dedicated Drive folder. No Drive asset was required by the screenshot-supported design defects, so Drive write count remains 0 and no duplicate folder/assets were created.

## Deferred / blocked finalization

Final adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative information confirms whether children attend and, if so, approximate count/age range and whether this activity is wanted or venue-provided. Final paper/printer template, production PDF/export profile, physical 100% proof, pen/crayon usability, edge/bleed verification, and real-use handling also remain `DEFERRED_FINALIZATION`.

Do not repeatedly redesign this neutral template while those inputs are missing. If the item is later confirmed unnecessary, resolve it as `NOT_REQUIRED`; otherwise replace only the semantic copy/operation fields required by the confirmed use case and perform final print proof.
