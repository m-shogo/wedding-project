# WEDDING PASSPORT — zero-reuse clean-room V2/V3 rebuild

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start/latest-main before evidence write: `f881e2d171448d2c7e34cf1fb11f4d1a9fdaf39f`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Clean-room contract actually used

This rebuild followed the 2026-08-15 zero-reuse rule.

During construction of V2 and V3, the retained legacy visual production was **not used as a visual source or component library**. No old frame, layout group, ornament, rail, badge, icon, crop, background construction, generated asset, or legacy SVG was duplicated into the new designs.

Only verified non-visual requirements were carried forward and manually re-authored:

- page size: `1480 × 2100`;
- event date/location: `2026.10.24 / YOKOHAMA`;
- required semantic family: front / back / menu+drink / seating;
- menu/drink and final message remain replaceable placeholders;
- seating: `11 tables × maximum 7 guests/table`, never 8;
- variable names, menu copy, guest names and issue information remain native editable text.

The retained previous production was first inspected visually **after** the new V2 had been built and structurally stress-tested enough to act as a real comparison candidate.

## Hybrid authoring split

- variable/factual copy: native Figma `TEXT`;
- semantic placeholders: native `TEXT` with muted `LAYOUT DUMMY` suffix hierarchy;
- fixed flat graphic support: newly authored editable SVG imported with `createNodeFromSvg`;
- raster/generated imagery: none used;
- variable facts baked into SVG/raster: `0`;
- generated asset workstream: `IMAGE_GEN_UNAVAILABLE_THIS_RUN`;
- Drive asset writes: `0`.

New editable SVG roles:

- V2 front `138:15 / VECTOR / JOURNEY_COORDINATE_MARK`;
- V2 back `138:34 / VECTOR / JOURNEY_TRACE`;
- V3 front `144:10 / VECTOR / PORT CONTOUR FIELD`;
- V3 back `144:32 / VECTOR / LOG GRID TRACE`.

Each SVG contains fixed abstract graphic structure only; no names, menu content, QR data, venue directions, table assignments or other variable facts.

## V2 — independently built from blank frames

Page: `138:6 / V2_CLEANROOM_2026_08_15`

Roots:

- front `138:7 / V2 / FRONT / CLEANROOM CARTOGRAPHIC NOTE`;
- back `138:28 / V2 / BACK / CLEANROOM LETTER ENDING`;
- menu `138:43 / V2 / MENU + DRINK / CLEANROOM TASTING LEDGER`;
- seating `138:89 / V2 / SEATING / CLEANROOM REGISTRY`.

The direction was authored from a blank page with Japanese editorial typography, a warm paper field, small red/olive functional accents, editable abstract route graphics, a non-card menu ledger and a two-column seating registry.

### V2 failures found and repaired

The first visual pass was not accepted blindly.

1. **Front long couple name regression**
   - failed proof: `141:2 / QA / V2 FRONT LONG NAME STRESS_FAIL_PRE_AUTOLAYOUT_2026_08_15`;
   - problem: long names collided with the following note/rule;
   - repair: native adaptive vertical block `142:2 / CONTENT / SIGNATURE BLOCK`;
   - passing proof: `142:3 / QA / V2 FRONT LONG NAME STRESS_POST_AUTOLAYOUT_2026_08_15`;
   - stress block bottom: `1784 < 2100`, outside visible text `0`.

2. **Seating long-name collision**
   - failed proof: `141:23 / QA / V2 SEATING LONG NAME STRESS_FAIL_PRE_AUTOLAYOUT_2026_08_15`;
   - problem: absolute table positions allowed wrapped names to collide with following tables;
   - repair: native adaptive table columns `142:25 / CONTENT / TABLE COLUMN 01-06` and `142:26 / CONTENT / TABLE COLUMN 07-11`, with individual table groups/details using hug-height auto layout;
   - production continues to contain exactly 11 table guest text roles with exactly 7 lines each;
   - passing proof: `142:49 / QA / V2 SEATING REALISTIC LONG NAME STRESS_POST_AUTOLAYOUT_2026_08_15`;
   - stress left-column bottom `1774`, right-column bottom `1558`, outside visible text `0`.

3. **Menu long-copy collision**
   - failed proof: `142:127 / QA / V2 MENU LONG COPY STRESS_FAIL_PRE_AUTOLAYOUT_2026_08_15`;
   - problem: fixed food/drink positions let long names/descriptions overlap;
   - repair: adaptive native ledgers `143:2 / CONTENT / FOOD LEDGER` and `143:15 / CONTENT / DRINK LEDGER` with content-hugging rows/groups;
   - passing proof: `143:22 / QA / V2 MENU LONG COPY STRESS_POST_AUTOLAYOUT_2026_08_15`;
   - stress food ledger bottom `1446`, drink ledger bottom `1358`, outside visible text `0`.

4. **Back long message**
   - proof: `142:173 / QA / V2 BACK MESSAGE LONG COPY STRESS_2026_08_15`;
   - result: no collision with the lower fixed graphic/route region.

Completed stress proofs are hidden after QA and retained as evidence.

### V2 live structure after repair

- front `138:7`: 9 native text / IMAGE fills 0 / outside visible text 0 / `clipsContent=true`;
- back `138:28`: 5 native text / IMAGE fills 0 / outside visible text 0 / `clipsContent=true`;
- menu `138:43`: 36 native text / 34 visible / IMAGE fills 0 / outside visible text 0 / `clipsContent=true`;
- seating `138:89`: 38 native text / 36 visible / IMAGE fills 0 / outside visible text 0 / `clipsContent=true`;
- seating table guest counts: table 01–11 are all exactly 7 lines.

## First legacy comparison after V2 completion

Only after the clean-room V2 existed and its main regressions were repaired, retained legacy production was viewed for the comparison gate.

Observed result:

- V2 menu was preferred: clearer Japanese hierarchy, larger usable type, less sparse microtype, no card/dashboard geometry, adaptive long-copy structure;
- V2 seating was preferred: clearer registry scan, stronger table numbering, simpler two-column physical-paper logic, adaptive long-name structure;
- V2 cover pair was materially different and valid, but did **not** clearly beat the retained cover pair at whole-item scale; therefore V2 covers were not force-promoted.

This triggered a separate V3 cover direction as required by Current instead of mutating the old production.

## V3 cover pair — independent second blank build

Page: `144:2 / V3_CLEANROOM_2026_08_15`

V3 was built as a new direction after the V2 comparison decision. It did not duplicate V2 frames, V2 SVGs, V2 layout groups or legacy visual nodes/assets.

Roots:

- front `144:3 / V3 / FRONT / ARCHIVAL PORT LOG`;
- back `144:26 / V3 / BACK / ARCHIVAL END NOTE`.

Direction:

- full-field deep green archival/logbook cover rather than a cream cartographic sheet;
- Shippori Mincho Japanese headline system plus restrained sans data roles;
- new editable port-contour SVG and log-grid trace SVG;
- orange/gold route accents with a print-native field treatment;
- no fake passport number, MRZ, QR, transport credential, stamp collection or generic airplane illustration.

### V3 long-copy QA

- front stress `145:4 / QA / V3 FRONT LONG NAME STRESS_2026_08_15`: PASS;
  - adaptive `145:2 / CONTENT / LOWER ISSUE BLOCK`;
  - block bottom `1986 < 2100`;
  - outside visible text `0`.
- back stress `145:29 / QA / V3 BACK MESSAGE LONG COPY STRESS_2026_08_15`: PASS;
  - stress body bottom `1136`;
  - lower green field begins at `1240`;
  - no collision;
  - outside visible text `0`.

Stress proofs are retained hidden after QA.

### V3 structure

- front `144:3`: 9 native text / IMAGE fills 0 / outside visible text 0 / `clipsContent=true`;
- back `144:26`: 7 native text / IMAGE fills 0 / outside visible text 0 / `clipsContent=true`.

## Selected clean-room family review

Review-only board:

- `146:2 / QA / CLEANROOM SELECTED FAMILY REVIEW`;
- V3 front + V3 back + V2 menu + V2 seating;
- board exists only to review independently authored candidates together; it is not a production source and does not retroactively make V3 dependent on V2.

Whole-family review result: PASS as a clean-room candidate. The dark archival cover pair gives the suite a stronger physical-object identity, while the warm paper menu/seating pages remain legible and editorial rather than UI-like.

The selected clean-room family is preferred over retaining the legacy family unchanged. The legacy production remains untouched and available for rollback/history.

## Current decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / LEGACY_PRESERVED / NOT_PRINT_READY`

This run does **not** delete or overwrite retained production. Final factual copy, printer/vendor export settings and physical proof remain `DEFERRED_FINALIZATION`.

Next progression target after evidence readback: BOARDING PASS clean-room V2, again from a blank frame with no visual reuse of its retained production.
