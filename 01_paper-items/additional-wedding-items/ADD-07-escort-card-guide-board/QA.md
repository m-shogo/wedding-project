# ADD-07 エスコートカード案内ボード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A2_A3_DEEPER_STEP_RHYTHM_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-15

## Current authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- page: `0:1 / ADD-07_ESCORT_CARD_GUIDE`
- A2 production: `1:2 / FRAME_ADD07_A2_PORTRAIT`
- A3 production: `1:17 / FRAME_ADD07_A3_REFLOW_COMPARE`
- exact Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- historical visual evidence: `docs/add-items/ADD-07-REOPENED-VISUAL-QA-2026-08-10.md`
- placeholder polish evidence: `docs/add-items/ADD-07-PLACEHOLDER-POLISH-2026-08-12.md`

This file supersedes the earlier A2/A3 spot-check that accepted the previous step spacing. The current production keeps the same art direction and semantics but uses a deeper diagonal step rhythm after a fresh actual-size visual comparison.

## 2026-08-15 reopened visual finding

Fresh whole-item / reading / actual-size review found that the former `01 → 02 → 03` sequence ended too early vertically:

- A2 former step-number y positions: `760 / 935 / 1110`
- A3 former step-number y positions: approximately `537 / 661 / 785`
- the lower half therefore carried more unused space than the action sequence needed, which risked reading as blank-template premium minimalism rather than intentional large-format signage.

The title, Japanese-first copy, left rail and diagonal action concept remained strong, so a full redesign or image asset was not justified. The highest-value correction was to make the three-step diagonal occupy the physical board more decisively.

## Rollback-safe comparison and promotion

Materially different native comparison candidates were created first:

- A2 comparison: `12:2 / QA_ADD07_A2_DEEPER_STEP_RHYTHM_2026_08_15`
- A3 comparison: `12:22 / QA_ADD07_A3_DEEPER_STEP_RHYTHM_2026_08_15`

The candidates were visually stronger at actual-size because the sequence reaches farther through the board while preserving the clear `01 → 02 → 03` diagonal and footer breathing room.

Full hidden rollbacks were then preserved:

- A2 rollback: `12:42 / ROLLBACK_ADD07_A2_PRE_DEEPER_STEP_RHYTHM_2026_08_15`
- A3 rollback: `12:62 / ROLLBACK_ADD07_A3_PRE_DEEPER_STEP_RHYTHM_2026_08_15`

The comparison candidates are hidden after promotion.

## Current production geometry

### A2 `1:2`

- canvas: `1400 × 1980`, `clipsContent=true`
- native editable text: `11`
- visible text: `11`
- text outside root: `0`
- IMAGE fills: `0`
- step-number positions:
  - `01`: `x=110 / y=800`
  - `02`: `x=475 / y=1055`
  - `03`: `x=840 / y=1310`
- matching rules and step labels were moved with each number as one visual unit.

### A3 `1:17`

- canvas: `990 × 1400`, `clipsContent=true`
- native editable text: `11`
- visible text: `11`
- text outside root: `0`
- IMAGE fills: `0`
- step-number positions:
  - `01`: `x≈77.77 / y=566`
  - `02`: `x=336 / y=746`
  - `03`: `x=594 / y=926`
- A3 is a proportional reflow of the same approved deeper rhythm rather than a separate composition.

## Screenshot QA

Fresh post-promotion screenshots were checked at whole-item and actual-size scale for both A2 and A3.

PASS:

- the large Japanese instruction remains the first read;
- `01 → 02 → 03` now occupies more of the middle/lower board and feels intentionally composed rather than top-heavy;
- the diagonal remains clear without equal cards, boxes or dashboard UI;
- footer date/location information keeps sufficient separation from step 03;
- no clipping, overlap, accidental crop or outside-root text was introduced;
- the semantic location placeholder remains native editable text;
- no raster decoration, fake travel data, generic airplane/stamp imagery, shadow or gradient was added.

## Image-generation decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported bottleneck was spatial rhythm, not missing photography/illustration. Adding generated imagery would have weakened the sign's typographic wayfinding role.

Drive asset additions: `0`.

## Content safety

- guest names and table-number lists are not baked into the sign;
- alphabetical / kana ordering is not asserted before the real operation is fixed;
- no QR code or fabricated gate/transport data is present;
- all unknown placement information remains native semantic placeholder text.

## Deferred finalization

Still `NOT_PRINT_READY` until the following are actually verified:

- 100% physical print proof;
- printer stock/profile and final trim/bleed confirmation;
- installation height / easel lip / viewing-distance check;
- venue lighting and wall/background contrast;
- final card placement operation and wording.

These are `DEFERRED_FINALIZATION`; they do not invalidate the current visual/structural pass.

## Final decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A2_A3_DEEPER_STEP_RHYTHM_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
