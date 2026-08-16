# ADD-02 11卓の国別テーブルサイン — V11 hierarchy-first clean-room study

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V11_HIERARCHY_FIRST_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / HIERARCHY_IMPROVED / LEGACY_COMPARISON_MIXED / NO_PROMOTION / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Start main SHA observed before authoring: `1fe8b371a425b7e3cc96009324b5b8720618856e`.
Pre-write main SHA: `496177a7dd8e990afff61d9ada76db051cea3296`.
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Purpose

V10 removed the low-resolution raster blocker but still lost whole-item pickup because destination name and table index were not designed strongly enough with the fixed hero. V11 therefore tested a fresh hierarchy-first clean-room direction: fixed hero art, `HAWAII`, and `01` must read as one first-glance hierarchy before any retained production is opened.

## Clean-room boundary

Before retained production was opened, a new blank page was created:

- `66:2 / CLEANROOM / ADD-02 / V11 HIERARCHY FIRST / 2026-08-16`

No retained production frame, V5/V6/V7/V8/V9/V10 frame, prior image, crop, vector, badge, rail, or background composition was copied into the page. Only verified non-visual requirements were used: 1000×1480 working size, Hawaii as destination 01, native semantic text, one replaceable fixed-visual image role, long-copy tolerance, and print-oriented hierarchy.

Two materially different candidates were created before retained comparison:

1. `66:60 / COMPARE_ONLY / V11 / HAWAII / A / HIERARCHY IMPROVED / OVERALL MIXED`
   - direction: large native `HAWAII` over the hero field + large native `01` in the upper-right visual field;
   - fixed art: new warm volcanic/ocean composed raster;
   - raster hash: `d9bdf29b72882a7021d9e729b0f27f3f1636a69f`;
   - source export bytes: `89,058` PNG bytes before `figma.createImage`;
   - semantic copy remains native.
2. `66:70 / REJECTED / V11 / HAWAII / B / VERTICAL SPINE`
   - direction: stacked vertical native `H\nA\nW\nA\nI\nI` spine + hero field + large `01`;
   - fixed art: new archival/deep-ocean composed raster;
   - raster hash: `d999688506c4d5d5a7fbd52cb6b3c098a4804671`;
   - source export bytes: `76,134` PNG bytes before image creation.

Candidate B was rejected after pre-comparison thumbnail review because the vertical spine slowed destination pickup and did not create a stronger artifact-level reading path than A.

## Pre-comparison QA and repairs

All of the following happened before retained production was opened.

### Thumbnail defects found and repaired

- Candidate A initially wrapped `01` into two lines because the native index text box was too narrow. The text box was widened and kept native; no art was changed to hide the defect.
- Candidate B initially used a rotated `HAWAII` text treatment that clipped at the side field. It was replaced with deliberate stacked native letters, then later rejected on visual grounds.

### Candidate A lower-field repair

The initial compact information stack left the lower paper field visually under-resolved. Candidate A was refined without adding decorative filler:

- country-note role remains native text;
- date became a separate bottom-right native anchor;
- a thin functional date baseline was added;
- the country-note width/body scale was set for realistic multi-line copy tolerance rather than a one-line placeholder only.

### Three-scale visual evidence

Candidate A was reviewed at:

- whole-item / thumbnail: 338×500 render from 1000×1480;
- reading scale: native composition inspection;
- actual-size: 1000×1480 screenshot.

At thumbnail scale `HAWAII` and `01` are both immediately visible. At actual size the fixed hero and native semantic text remain clearly separated.

## Long-copy stress

Pre-legacy hidden stress clone:

- `68:3 / QA / LONG NOTE STRESS / V11 A / PRE-LEGACY` (hidden after verification).

The note was replaced with a materially longer Japanese layout-dummy paragraph. The first stress readback failed: note bottom `1443` overlapped the date at `1370`.

The failure was repaired before retained comparison by changing the native country-note role to:

- `x70 / y1060 / w790`;
- font size `26`;
- line height `42`;
- text remains auto-height.

The date was protected at `y1390` with baseline at `y1352`.

Post-repair stress geometry:

- note height: `210`;
- note bottom: `1270`;
- date top: `1390`;
- note→date gap: `120`;
- root bottom: `1480`;
- visible native text count: `5`;
- IMAGE roles: `1`;
- visible text outside root: `0`.

Result: `LONG_COPY_STRESS_PASS`.

## Structure QA

Candidate A:

- root: `1000×1480`;
- native visible text: `5`;
- IMAGE roles: `1`;
- image role: `66:61 / IMAGE / HAWAII HERO / COMPOSED HIGH-RES / REPLACEABLE / 1000×920`;
- visible text outside root: `0`;
- factual/variable copy baked into raster: `0`.

Candidate B has the same `5 native text / 1 IMAGE / outside text 0` structural boundary, but is visually rejected.

## Completion-only retained comparison

Only after V11 candidates, repairs, actual-size review, and long-copy stress were complete was retained Hawaii production opened:

- `31:275 / QA_CURRENT_FRAME_TABLE_SIGN_HAWAII`.

### What V11 A improves

- the previous V10 pickup weakness is materially improved: `HAWAII` and `01` are both readable immediately at thumbnail scale;
- hierarchy is integrated into the visual field instead of making the hero and semantic identity feel like separate upper/lower systems;
- the lower field stays editable and is cleaner under realistic long-copy stress;
- no UI-card containment is introduced;
- no prior ADD-02 visual item was reused.

### Why V11 A is still not promoted

The retained production remains cleaner and more resolved as a finished product overall. V11 A improves first-glance hierarchy, but its newly composed volcanic/ocean art is still more schematic/illustrative than the retained production's more controlled editorial abstraction. The result is therefore a hierarchy win without a clear total sellable-quality win.

State remains `LEGACY_COMPARISON_MIXED / NO_PROMOTION`.

No retained production node was edited, duplicated, or overwritten.

## Drive / provenance

Drive authority was read back live:

- folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- current image children include `V6_COMPARE_FRANCE_folded-publication-depth_2026-08-16.png` and `ADD-02_ARCHIVAL_PRINT_GRAIN_MASTER_v1.png`.

No new Drive file was written. V11 fixed art was authored and rasterized inside Figma; this runtime still does not expose those in-Figma PNG bytes as a supported Drive `file_uri`, so no false Drive-master claim is made.

## Method conclusion

Status: `VERIFIED_LOCAL` for hierarchy-first integration, `COMPARE_ONLY` for the V11 visual candidate.

Verified:

- solving hero + destination + table-index hierarchy together materially improves whole-item pickup;
- long-copy safety must be re-run after lower-field editorial repositioning;
- one replaceable IMAGE role + native semantic text remains structurally robust.

Not verified:

- stronger hierarchy alone is not enough when fixed-art craftsmanship is still weaker than the retained production;
- V11 does not justify production promotion or 11-destination rollout.

## Next safe action

Do not create another ADD-02 visual direction in this same post-comparison context. On a future fresh clean-room run, if ADD-02 is continued, start from facts/constraints only and solve the remaining art-direction gap without reopening retained/V11 visuals first. Prefer a genuinely higher-quality fixed visual source or a different print-art method rather than another schematic procedural landscape.

Until then retain all previous production and clean-room evidence unchanged.