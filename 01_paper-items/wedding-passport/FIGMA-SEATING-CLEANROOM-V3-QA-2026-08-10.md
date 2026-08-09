# WEDDING PASSPORT — Seating Clean-room V3 QA

Date: 2026-08-10
State: `VISUAL_REOPENED / SEATING_V3_PRODUCTION_PROMOTED / LONG_NAME_STRESS_PASS / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS`

## Live authority

- latest observed `main` immediately before evidence write: `1ae96e7f4c885caf8aa1a5dc17d53b3168e7314a`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- page: `02_INSIDE / 1:3`
- production seating identity: `18:131 / FRAME_SEATING`
- previous clean-room V2: `78:2 / QA_SEATING_CLEANROOM_V2_EDITORIAL_2026_08_09`
- previous long-name proof: `81:2 / QA_SEATING_CLEANROOM_V2_LONG_NAME_STRESS_2026_08_09`
- winning clean-room V3: `106:69 / QA_SEATING_CLEANROOM_V3_STAGGERED_EDITORIAL_2026_08_10`
- V3 long-name proof: `106:136 / QA_SEATING_CLEANROOM_V3_LONG_NAME_STRESS_2026_08_10`
- rollback: `110:2 / ROLLBACK_SEATING_PRE_STAGGERED_EDITORIAL_2026_08_10`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visual diagnosis

The former production had strong information capacity, but the two-column split and repeated horizontal rules made it read as a formal directory/table rather than an editorial wedding paper page. V2 improved width use but retained equal column baselines and repeated per-table rules, which still read as a matrix at thumbnail scale.

The defect is information composition and typography, not missing imagery.

## Winning clean-room V3

V3 preserves the same factual capacity while materially changing the page rhythm.

- 3-column scanability across all 11 tables;
- exactly 7 native guest placeholders per table, 77 total;
- repeated per-table horizontal rules removed;
- three columns intentionally staggered vertically instead of sharing identical row baselines;
- left column remains stable enough for entry scanning;
- middle and right columns use independent offsets to break matrix rhythm;
- two head-table rules use unequal lengths to avoid mechanical symmetry;
- no generic airplane/stamp/badge/image decoration;
- all guest content remains native editable text.

## Screenshot QA and production promotion

The family-scale comparison was repeated after the latest front/back/menu production changes.

- former production: readable but strongly split and rule-heavy;
- V2: cleaner scan, still directory-grid-like;
- V3: the table groups read as an editorial sequence with deliberate negative-space rhythm and no repeated row rules;
- V3 long-name proof remains readable without collision or clipping;
- V3 remains compatible with the front/back cover family and the integrated menu direction because it uses the same cream/navy/gold language without copying the same layout.

V3 clearly wins the current in-family comparison and was promoted while preserving the semantic production ID.

- production remains `18:131 / FRAME_SEATING`;
- former production preserved as `110:2 / ROLLBACK_SEATING_PRE_STAGGERED_EDITORIAL_2026_08_10`;
- clean-room `106:69` remains available for comparison history;
- long-name proof `106:136` remains available.

## Long-name stress

V3 stress proof `106:136` replaces only guest placeholder text with `長文氏名レイアウトNN` strings.

- guest text nodes: `11`
- guest slots: `77`
- maximum guests per table: `7`
- guest text auto-resize: `HEIGHT`
- text outside frame: `0`
- IMAGE-fill nodes: `0`

No realistic fake guest names or factual assignments were introduced.

## Post-promotion structure readback

Production `18:131`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `41`
- IMAGE-fill nodes: `0`
- text outside frame: `0`
- hidden guide nodes retained:
  - `GUIDE_BLEED`: `1480 × 2100`;
  - `GUIDE_TRIM`: `1460 × 2080` at `10,10`;
  - `GUIDE_SAFE`: `1360 × 1980` at `60,60`;
- rollback exists as `110:2 / ROLLBACK_SEATING_PRE_STAGGERED_EDITORIAL_2026_08_10`.

The generic structure-readback query counted 78 `[ゲスト名` occurrences because the top layout-dummy note also contains that token. The actual table payload remains the verified 11 table guest text nodes × 7 slots = 77 guest placeholders; no eighth guest was introduced.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or stored. Seating does not justify forced image generation while its visible issue is typography/composition density.

## Drive

Drive authority was re-read before promotion.

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes: `0`
- reason: no generated/raster asset was adopted for seating.

## Decision

`SEATING_V3_PRODUCTION_PROMOTED / LONG_NAME_STRESS_PASS / ROLLBACK_SAFE / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS / NOT_PRINT_READY`

Do not mark the whole Passport `SELLABLE_VISUAL_QA_PASS` from this promotion alone. Front `18:2`, back `18:46`, menu `18:90`, and seating `18:131` must still be judged together at the final four-page visual gate. If a page remains visibly weak, continue that page instead of progressing prematurely to BOARDING PASS.
