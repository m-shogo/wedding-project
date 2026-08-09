# WEDDING PASSPORT — Seating Clean-room V3 QA

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_V3_CREATED / LONG_NAME_STRESS_PASS / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED`

## Live authority

- Start/latest observed `main`: `2e4e83aae669a3be3a310a119dc4cd7d2f8439d8`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- page: `02_INSIDE / 1:3`
- production seating: `18:131 / FRAME_SEATING`
- previous clean-room V2: `78:2 / QA_SEATING_CLEANROOM_V2_EDITORIAL_2026_08_09`
- previous long-name proof: `81:2 / QA_SEATING_CLEANROOM_V2_LONG_NAME_STRESS_2026_08_09`
- new clean-room V3: `106:69 / QA_SEATING_CLEANROOM_V3_STAGGERED_EDITORIAL_2026_08_10`
- new V3 long-name proof: `106:136 / QA_SEATING_CLEANROOM_V3_LONG_NAME_STRESS_2026_08_10`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visual diagnosis

Production `18:131` has strong information capacity and an editorial two-column silhouette, but the long central divider creates a visibly split page and a left-heavy six-table/right-heavy five-table rhythm.

V2 `78:2` improves scanability and uses the available width better, but its three columns start on identical baselines and each table repeats a full-width bottom rule. At thumbnail scale this reads too much like a neat directory grid, which conflicts with the reopened visual standard against admin/table-like repetition.

## Clean-room V3 change

Created V3 as a rollback-safe duplicate; production was not edited.

- retained 3-column scanability and all 11 table groups;
- retained exactly 7 native guest placeholders per table, 77 total;
- removed the repeated per-table horizontal rules;
- staggered the three columns vertically instead of aligning every row;
- kept the first column relatively stable for clear entry scanning;
- offset the middle column downward to break the grid rhythm;
- offset the right column independently, preserving breathing space below table 11;
- made the two head-table rules intentionally unequal in length to reduce mechanical symmetry;
- did not add decorative airplane/stamp/badge imagery or raster texture because the visible defect is information composition, not missing illustration.

The result is materially different from both production and V2 while preserving native editability and the 7-guests-per-table contract.

## Screenshot QA

Compared live screenshots at the same 1480 × 2100 source size.

- production `18:131`: two-column layout, clear but strongly split by the full-height middle divider;
- V2 `78:2`: cleaner three-column scan but repeated aligned rows and rules create a directory-grid impression;
- V3 `106:69`: table blocks read as an editorial sequence rather than a matrix, with less UI/table repetition and more deliberate negative-space rhythm;
- V3 stress `106:136`: long Japanese placeholder names remain readable across all 11 tables without visible collision or clipping.

V3 is a meaningful visual advance, but it is **not promoted to production in this run**. The stagger is promising but requires one more family-scale comparison against the promoted cover pair and menu before replacing `18:131`.

## Long-name stress

V3 stress proof `106:136` replaces only the guest placeholder text with `長文氏名レイアウトNN` strings.

- guest text nodes: `11`
- guest slots: `77`
- maximum guests per table: `7`
- guest text auto-resize: `HEIGHT`
- text outside frame: `0`
- image-fill nodes: `0`

No realistic fake guest names or factual assignments were introduced.

## Structure readback

V3 `106:69`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `41`
- IMAGE-fill nodes: `0`
- guest text nodes: `11`
- guest slots: `77`
- guest text auto-resize: `HEIGHT`
- text outside frame: `0`

V3 stress `106:136`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `41`
- IMAGE-fill nodes: `0`
- guest text nodes: `11`
- guest slots: `77`
- guest text auto-resize: `HEIGHT`
- text outside frame: `0`

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or stored. This seating page does not currently justify forcing image generation because the screenshot-supported defect is typography/composition density rather than missing hero art.

## Drive

Drive authority was re-read immediately before the Git evidence write.

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes: `0`
- reason: no generated/raster asset was adopted for seating.

## Decision

`CLEANROOM_V3_CREATED / LONG_NAME_STRESS_PASS / STRUCTURE_QA_PASS / VISUAL_COMPARISON_ADVANCE / PRODUCTION_NOT_PROMOTED / NOT_PRINT_READY`

Next safe target: compare the full Passport family at matching scale — production front `18:2`, production back `18:46`, menu `18:90`, production seating `18:131`, and seating V3 `106:69`. If V3 still wins in-family, preserve production rollback and promote it; otherwise keep production seating and record the rejection. Then close the Passport family visual gate or continue the weakest page before progressing to BOARDING PASS.
