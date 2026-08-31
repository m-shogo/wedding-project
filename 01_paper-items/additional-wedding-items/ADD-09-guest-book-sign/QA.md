# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / V4_SELECTED / INK_PATH / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / ACTUAL_SIZE_QA_PASS / PRINT_GEOMETRY_APPLIED / CLEANROOM_PROVENANCE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current live authority

- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- V4 page: `65:2 / V4 / ADD-09 / INK PATH / 2026-08-31`
- print / bleed parent: `66:2 / PRINT / V4 / ADD-09 / A5 / BLEED 3MM`
- trim Current: `65:3 / TRIM / V4 / ADD-09 / A5 148x210 / INK PATH`
- hidden final long-copy stress: `66:33 / QA / V4 / ADD-09 / A5 / LONG COPY / FINAL`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive writes for V4: `0`
- detailed promotion evidence: `FIGMA-V4-INK-PATH-PROMOTION-QA-2026-08-31.md`

The previous selected Current `41:56 / PEN TRAY WELCOME / OPEN PAPER TOP` remains preserved in the Figma file as comparison / rollback history. It is no longer the V4 Current authority.

## V4 clean-room provenance

The 2026-08-31 V4 was built from a new blank page/frame. No old production, V2/V3, vNext frame, layout group, pen geometry, bottom desk field, decorative vector, image crop, generated asset or component was copied into the V4 authoring surface.

Only verified non-visual requirements were carried forward:

- Guest Book sign / writing-guidance role;
- confirmed wedding date `2026.10.24`;
- semantic editable placeholders for writing method, pen guidance and installation/location;
- item print specification from `SPEC.md`.

## V4 art direction — INK PATH

First read:

`今日の旅に、ひとこと。`

Visual system:

- warm paper field;
- Japanese serif hero with Japanese-first hierarchy;
- three native operational roles without cards/boxes;
- narrow editable writing rail ending in an editable pen-nib SVG;
- one editable signature-path SVG;
- one short coral entry rule;
- no raster background, generated person, stock image, badge, fake credential, route/stamp cosplay, repeated rounded-card grid, purposeless English filler or web/admin UI grammar.

The first draft's thick rounded rail + three dots was rejected during screenshot QA because it read like a UI timeline. It was replaced with the final thin continuous writing rail. A hero/lead overlap was also detected and repaired before promotion.

## Hybrid authoring / structure QA

Responsibility split:

- variable/factual copy: native editable Figma text;
- semantic placeholder values: native editable Figma text;
- content reflow: native vertical Auto Layout;
- pen nib / signature path: editable SVG;
- simple rail / entry rule: native vector geometry;
- generated/composed raster: `0`;
- replaceable photo/image role: `0`.

Final production readback:

- visible native text: `11`;
- text outside trim: `0`;
- text outside authoritative 10 mm safe: `0`;
- non-auto-height text: `0`;
- fixed-art/text collisions: `0`;
- IMAGE-fill nodes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed bottleneck was composition / typography / print semantics, not a missing image asset.

## Long-copy stress

Dynamic operational values were tested on hidden stress `66:33`.

The first stress exposed a real collision between closing/date and the fixed signature path. It also showed that a fixed separator line became semantically misplaced after reflow. Promotion was blocked until both were repaired.

Final stress readback:

- visible native text when revealed: `11`;
- outside trim: `0`;
- outside 10 mm safe: `0`;
- non-auto-height text: `0`;
- fixed-art/text collisions: `0`;
- IMAGE fills: `0`.

Stress is hidden after QA.

## Print-first QA

`SPEC.md` is authoritative for:

- Primary trim: **A5 portrait, 148 × 210 mm**;
- alternate: A4 portrait reflow;
- bleed: **3 mm all sides**;
- safe: **10 mm from trim edge**.

V4 production geometry:

- A5 trim working root: `1000 × 1419 px`;
- trim scale: `6.756756 px/mm`;
- bleed parent: `154 × 216 mm` = about `1040.54 × 1459.54 px`;
- bleed inset: about `20.27 px` per edge;
- hidden non-print safe guide: about `67.57 px` from trim = 10 mm.

### Actual-size typography

Approximate A5 print sizes:

- hero: **30.2 pt**;
- operational values: **11.3 pt**;
- lead: **10.5 pt**;
- closing: **10.1 pt**;
- date: **8.8 pt**;
- kicker / operational labels: **8.4 pt**.

A first actual-size audit caught operational labels at about **6.7 pt**. They were increased before V4 promotion.

### Three-scale QA

- thumbnail `353 × 500`: PASS — hero is the 3-second first read and no web/UI impression dominates;
- reading `705 × 1000`: PASS — hero → lead → operational roles → closing is clear;
- native / print-detail `1000 × 1419`, plus bleed render: PASS — type, pen nib and signature path remain credible.

## Resolution

Production raster IMAGE fill count is `0`.

- effective PPI: `N/A`;
- `RESOLUTION_WARNING=NONE`.

Editable SVG/vector geometry is not treated as raster-resolution evidence.

## CMYK / physical risks

Still deferred to final production proof:

- deep navy / deep green may close up after CMYK conversion;
- coral may dull or shift by profile / stock;
- warm paper field must be checked against actual paper white;
- small dark copy black construction must follow printer guidance; do not assume rich black / registration black;
- grayscale hierarchy must be rechecked from the converted output;
- holder/easel/tabletop installation and viewing distance remain unproven.

## Deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

Remain `NOT_PRINT_READY` until:

- final writing method and real pen placement are confirmed;
- final installation wording/location is confirmed;
- final stock and printer CMYK/profile are fixed;
- PDF export / font embedding is checked;
- transparency / overprint / knockout are checked;
- preflight is clean;
- 100% print or physical proof is reviewed;
- holder/easel occlusion and venue-lighting are verified.

QR, punch, fold, perforation and handwriting-entry fields are not production features of this sign itself.

## Retained historical evidence

Prior production, clean-room studies, the earlier V4 Journey Line, PEN TRAY WELCOME and its bounded subtraction QA remain preserved in Figma/Git history and the dated evidence files in this directory. Their verified structural/failure-learning evidence remains reusable, but they are not the current V4 visual authority.

## Decision / next

`V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / ACTUAL_SIZE_QA_PASS / PRINT_GEOMETRY_APPLIED / CLEANROOM_PROVENANCE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

Proceed to `ADD-10`.