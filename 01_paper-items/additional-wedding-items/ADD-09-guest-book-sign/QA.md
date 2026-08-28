# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / PEN_TRAY_WELCOME_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / CORNER_TAB_SUBTRACTION_PASS / DESK_PAPER_EDGE_SUBTRACTION_PASS / OPEN_PAPER_TOP_SUBTRACTION_PASS / ROLLBACK_SAFE / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-28
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current live authority

- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- Current: `41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / OPEN PAPER TOP / 2026-08-28`
- promoted hidden top edge: `41:57 / TOP / HOSPITALITY EDGE` — `visible=false`
- long-copy stress: `41:76 / QA / ADD-09 / PEN TRAY WELCOME / LONG COPY / OPEN PAPER TOP / 2026-08-28` — hidden after QA
- promoted hidden stress top edge: `41:77 / TOP / HOSPITALITY EDGE` — `visible=false`
- bounded OPEN_PAPER_TOP comparisons: `53:2 / 53:38` — hidden after verification
- pre-OPEN_PAPER_TOP rollbacks: `58:2 / 58:38` — hidden
- previous pre-paper-edge rollbacks: `52:2 / 52:38` — hidden
- previous no-paper-edge comparison: `51:2` — hidden
- previous pre-corner-tab rollback: `47:38 / 47:74` — hidden
- previous no-tab comparison: `47:2` — hidden
- prior Current/history remains preserved (`38:43`, `35:2`, `16:3`, `1:3`)
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive write this refinement: `0`

## V4 direction — PEN TRAY WELCOME

Emotional brief:

`ゲストブックの表紙を描くのではなく、ゲストが実際に「書く」記帳テーブルの空気をサイン化する。`

First read:

`旅の途中で、ひとこと。`

Current visual system:

- warm open paper field;
- deep hospitality-green bottom writing-desk field with direct physical/action meaning;
- one coral entry rule used for hierarchy;
- one connected pen cue in the writing zone;
- Japanese-first title and operational copy;
- no full-width top decorative bar;
- no standalone corner tab;
- no pale-blue desk separator rail;
- no stitched binding/spine, giant circle/capsule/sun, fake hotel/airline credential, form-card UI, QR/route/stamp cosplay.

## 2026-08-28 OPEN_PAPER_TOP bounded comparison — VERIFIED_LOCAL

### Visible problem

The former `41:57 / TOP / HOSPITALITY EDGE` was a full-width `1000×54` dark-green strip at the canvas top edge. It had no trim, fold, binding, information, navigation or guest-action job and read like a web/app header before the physical paper field.

Normalized fingerprint:

`FULL_WIDTH_DECORATIVE_EDGE_READS_AS_WEB_HEADER`

### Bounded test

Rollback-safe comparisons were cloned from Current and the realistic long-copy proof:

- short-copy comparison `53:2`;
- long-copy comparison `53:38`.

Only the cloned `TOP / HOSPITALITY EDGE` was hidden. Typography, native copy, Auto Layout, paper field, writing desk, connected pen, colors, date, placeholders and all other geometry remained unchanged.

### Three-scale / actual-size result

`OPEN_PAPER_TOP` is clearly stronger than the pre-change Current:

- whole-item / ~500px: **PASS / stronger** — `GUEST BOOK → Japanese hero → instruction` becomes the first read instead of a detached dark header;
- reading / `705×1000`: **PASS** — the open warm paper field reads as a physical sign rather than an app panel;
- native `1000×1419`: **PASS** — top does not look unfinished; bottom writing-desk field remains the physical anchor;
- realistic long-copy / native `1000×1419`: **PASS** — no collision or loss of contrast after subtraction.

Decision: `CLEAR_OPEN_PAPER_TOP_WIN`.

### Promotion / rollback

Before production mutation, complete pre-change rollbacks were created:

- `58:2 / ROLLBACK / ADD-09 / PRE-OPEN-PAPER-TOP / CURRENT / 2026-08-28`;
- `58:38 / ROLLBACK / ADD-09 / PRE-OPEN-PAPER-TOP / LONG COPY / 2026-08-28`.

Promoted bounded change:

- Current top edge `41:57` → hidden;
- stress top edge `41:77` → hidden;
- Current/stress root names updated to `OPEN PAPER TOP`;
- comparison roots `53:2 / 53:38` hidden after verification.

No replacement ornament was added.

## Structure / hybrid authoring QA

Fresh post-promotion readback:

### Current `41:56`

- visible native text: `12`;
- outside visible text: `0`;
- IMAGE-fill nodes: `0`;
- top hospitality edge visible: `false`;
- corner tab visible: `false`;
- desk paper edge visible: `false`.

### Long-copy `41:76`

- hidden after QA;
- visible-when-revealed native text: `12`;
- outside visible text: `0`;
- IMAGE-fill nodes: `0`;
- top hospitality edge visible: `false`;
- prior dynamic-copy stress remains visually PASS.

Responsibility split:

- variable/final copy: native editable Figma text;
- semantic placeholders: native editable Figma text;
- dynamic operational information: native vertical Auto Layout;
- writing desk + connected pen: simple editable native fixed geometry with direct physical meaning;
- generated/composed raster: `0`;
- editable SVG required: `0`;
- replaceable image role: `0`.

`FINAL MISSING ASSET LIST: 0 production raster assets missing`.

Image generation is intentionally not used: the diagnosed defect was purposeless containment geometry, not missing photography/illustration/texture.

## Long-copy / prior repairs retained

Earlier verified repairs remain valid:

- `CORNER_TAB_SUBTRACTION_PASS` — isolated mustard top-right tab removed;
- `DESK_PAPER_EDGE_SUBTRACTION_PASS` — ambiguous pale-blue desk separator removed;
- `AUTO_HEIGHT_PASS / LONG_COPY_STRESS_PASS` — variable name/guidance/closing/date roles participate in a dynamic native flow and realistic long copy remains above the fixed desk field.

The 2026-08-28 top-edge subtraction changed none of those text/flow roles.

## Learning state

`FULL_WIDTH_DECORATIVE_EDGE_READS_AS_WEB_HEADER`: `VERIFIED_LOCAL` for ADD-09.

This independently confirms the failure fingerprint already seen elsewhere, but only the QA method transfers. Do not copy ADD-09 colors, geometry, pen treatment or a blanket `remove top bars` rule into other items. Full-width fields remain valid when an item independently proves a real physical, navigational, hierarchy or emotional job.

## Print / deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final writing method and real pen placement;
- final installation wording/location;
- final printer template / bleed / safe-area / stock / CMYK profile;
- 100% physical proof and venue-distance readability;
- holder/easel occlusion and venue-lighting check.

No raster production asset is present, so effective raster PPI is `N/A` for this refinement.

## Decision / next

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / OPEN_PAPER_TOP_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

The locally reopened ADD-09 sellable gate is restored. Continue progression with `ADD-10` and later targets; do not reopen ADD-09 without a new screenshot-supported or physical-proof defect.