# ADD-07 エスコートカード案内ボード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED_A2_A3 / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-15
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Current authority

- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- page: `0:1 / ADD-07_ESCORT_CARD_GUIDE`
- retained A2 production: `1:2 / FRAME_ADD07_A2_PORTRAIT`
- retained A3 production: `1:17 / FRAME_ADD07_A3_REFLOW_COMPARE`
- selected clean-room A2: `14:3 / CLEANROOM_ADD07_V2_SELECTED_A2_QUIET_DEPARTURE_ROUTE`
- selected clean-room A3: `14:25 / CLEANROOM_ADD07_V2_SELECTED_A3_INDEPENDENT_REFLOW`
- clean-room section: `14:2 / CLEANROOM_ADD07_V2_SELECTED_CANDIDATE_2026_08_15`
- exact Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`

The retained production and its prior rollback/evidence remain intact. Under the 2026-08-15 clean-room mandate, the selected V2 family was authored from blank frames without copying retained production, BOARDING PASS artwork, old rails, cards, step geometry, or existing assets.

## Zero-reuse clean-room V2

Observed latest `main` before the ADD-07 write: `c0d4e9a9f5349b88a376f64744966a01589c7c7d`.

Only current SPEC facts and constraints were used during construction:

- A2 portrait 420×594 mm and A3 portrait 297×420 mm;
- bleed 3 mm / safe area 15 mm+;
- viewing distance 2–4 m;
- `BOARDING GATE`;
- Japanese title `エスコートカードをお取りください`;
- lead `お名前のカードを見つけて、記載されたテーブルへお進みください。`;
- three actions `FIND YOUR NAME / お名前を探す`, `PICK UP YOUR TICKET / カードを取る`, `FIND YOUR DESTINATION / 行き先の卓へ`;
- date `2026.10.24` and location `YOKOHAMA`;
- no alphabetical/kana-order claim, guest list, table list, fake gate data or QR.

### A2

- root: `14:3`
- canvas: 1400×1980 / clipsContent=true
- new editable vector terminal edge: `14:4 / VECTOR_TERMINAL_EDGE_A2_EDITABLE`
- new editable vector action route: `14:6 / VECTOR_ACTION_ROUTE_A2_EDITABLE`
- 12 visible native text nodes
- raster IMAGE fills: 0
- visible text outside root: 0
- header uses native vertical auto-layout `15:2` to keep the Japanese title and lead safely coupled under copy growth.

### A3 independent reflow

- root: `14:25`
- canvas: 990×1400 / clipsContent=true
- independently re-authored A3 terminal edge/action route rather than proportional frame duplication
- 12 visible native text nodes
- raster IMAGE fills: 0
- visible text outside root: 0
- header uses native vertical auto-layout `15:3`.

## Visual QA

Normal-copy screenshots were reviewed after the structural fix:

- A2 whole-item: PASS; Japanese-first title is immediate at distance, the single mint route gives one coherent `01 → 02 → 03` reading path, and the right terminal field creates physical-sign identity without a card/grid UI.
- A3 whole-item: PASS; hierarchy and route survive the independent smaller-format reflow.
- no generic airplane/stamp/barcode imagery, equal rounded cards, shadow, gradient, raster decoration or copied BOARDING PASS surface treatment was introduced.

Only after the clean-room family was complete was the retained A2/A3 production viewed for comparison. The retained production is elegant but materially quieter and less explicit as 2–4 m wayfinding. The clean-room V2 family wins on Japanese instruction hierarchy, action-route continuity and large-sign legibility, so V2 is selected while the old production remains untouched.

## Long-copy stress and correction

Initial stress copies exposed real internal collisions even though text remained inside root bounds: the expanded Japanese title collided with the lead, and longer action copy crowded the route / terminal edge. This was not accepted as PASS.

Correction applied only to the clean-room V2 roots:

- title + lead were re-authored into native vertical auto-layout containers;
- Step 03 was constrained farther inside the cream information field;
- action text widths were tightened to preserve the navy terminal boundary.

Fresh stress roots:

- A2: `15:4 / QA_ADD07_A2_V2_LONG_COPY_STRESS_2026_08_15`
- A3: `15:27 / QA_ADD07_A3_V2_LONG_COPY_STRESS_2026_08_15`

Stress screenshots after the correction: PASS. Long Japanese title/lead and longer step copy no longer overlap; text stays inside both roots. Stress copies are hidden after verification.

This confirms that outside-root geometry checks alone are insufficient for dynamic-copy QA; screenshot validation remains required for internal hierarchy collisions.

## Hybrid authoring / asset decision

- variable/factual copy: native Figma text;
- directional semantics: new editable SVG/vector;
- replaceable raster roles: none required;
- generated/composed fixed asset: not required for the diagnosed wayfinding problem.

Image decision: `IMAGE_GENERATION_NOT_REQUIRED`.
Drive asset additions: `0`.

## Deferred finalization

Still `NOT_PRINT_READY` until actually verified:

- 100% physical print proof;
- printer stock/profile and final trim/bleed confirmation;
- installation height / easel lip / viewing-distance check;
- venue lighting and wall/background contrast;
- final card placement operation and wording.

## Final decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED_A2_A3 / LEGACY_PRESERVED / NOT_PRINT_READY`
