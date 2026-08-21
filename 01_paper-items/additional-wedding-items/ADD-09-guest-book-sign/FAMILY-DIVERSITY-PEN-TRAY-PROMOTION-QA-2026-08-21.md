# ADD-09 Guest Book — PEN TRAY WELCOME family-diversity promotion QA

Date: 2026-08-21
State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD09_V2 / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start/latest authority before Figma promotion: `bff32479b8b3b26b366fe1984f59d411f60d80bc`

## Why ADD-09 reopened again

A live suite thumbnail audit compared the current WEDDING PASSPORT front `UbK8KmuWJcDeGScsN49Uor / 181:52` with ADD-09 Current `PjFWBpDwaQM5LfvgdqSFvU / 38:43`.

Both were individually strong, but the newer physical-object method had converged on another repeated macro grammar:

- warm cream paper field;
- a stitched vertical binding/spine on the left;
- small artifact label near the top;
- large two-line Japanese headline;
- small colored tab/edge accents.

This was not the older coral/lagoon/capsule failure. It was a second-order family problem: after switching away from abstract AI shapes, unrelated items could still converge on the same **book-binding physical metaphor**.

Passport is inherently a booklet/keepsake, so its stitched binding remains semantically strong. Guest Book Sign is a sign about a writing action and did not need to imitate another bound-book cover.

## Authority / exact targets

- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`.
- Professional bar: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`.
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`.
- Family-scale gate: `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-21-nrsl-family-scale-template-gate-promotion.md`.
- Figma: `PjFWBpDwaQM5LfvgdqSFvU`.
- Drive authority live-readback: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`.
- Drive writes: `0`.

## Clean-room inputs

Only verified non-visual requirements were used:

- canvas `1000×1419`;
- Guest Book sign / writing guidance role;
- confirmed date `2026.10.24`;
- native semantic roles `[ご記帳のご案内]`, `[記入方法・ペンのご案内]`, `[設置場所・補足情報]`;
- final writing method, pen placement and installation wording remain unresolved.

No current/legacy layout, stitch geometry, palette construction, old vectors, image crop or generated asset was reused as authoring material.

## Three new blank-frame directions

New page: `41:2 / VNEXT_FAMILY_AUDIT_D / ADD-09 / PEN TRAY / 2026-08-21`.

1. `41:3 / PEN TRAY WELCOME`
   - hospitality-green top edge;
   - open cream information field;
   - real writing-desk / pen-rest field at the bottom;
   - terracotta pen gesture;
   - selected.
2. `41:23 / OPEN REGISTER SHEET`
   - clipped register-sheet metaphor;
   - rejected because the first thumbnail became too form/register-like and role labels escaped the intended inner-sheet reading lane.
3. `41:40 / DESK BLOTTER POSTER`
   - inset desk-blotter object;
   - rejected because it introduced unnecessary containment and felt closer to a framed UI/object card.

The selected direction was rebuilt separately as `41:56`, not duplicated from the thumbnail.

## New Current

`41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / FAMILY DIVERSITY B / 2026-08-21`

Visual concept:

`ゲストブックそのものを表紙として描くのではなく、記帳テーブルに置かれた「書くための場」をサイン化する。`

Key choices:

- no stitched left binding;
- no giant circles/capsules;
- no fake hotel/airline credential;
- Japanese-first headline `旅の途中で、ひとこと。`;
- three operational roles remain native text;
- lower green desk field and simple pen have actual writing-action semantics;
- one mustard corner tab supplies a small celebratory accent without becoming another large-shape system.

Prior Current `38:43 / CLOTHBOUND ARRIVAL LOG` was preserved in place as hidden history and renamed `HISTORY / PRE-PEN-TRAY CURRENT / CLOTHBOUND ARRIVAL LOG / 2026-08-21`.

## Long-copy failure and repair

Dedicated stress: `41:76 / QA / ADD-09 / PEN TRAY WELCOME / LONG COPY STRESS / 2026-08-21`.

The first stress screenshot exposed a real defect: long operational text pushed the content lower, while fixed closing/date roles were drawn before the fixed desk field and became visually occluded.

A first nested Auto Layout repair then failed visually because the nested role frames clipped multiline values.

Method switch:

- removed the nested fixed-height role wrappers;
- rebuilt the dynamic information as one direct native vertical Auto Layout stack;
- each label/value remains native `textAutoResize=HEIGHT`;
- explicit non-semantic spacers control rhythm;
- closing/date are part of the same dynamic stack;
- the fixed desk field remains at `y=1135`.

Final stress stack:

- `42:40 / DYNAMIC / INFO STACK`;
- y `550`;
- height `536`;
- bottom `1086`;
- fixed desk begins at `1135`;
- reserve `49 px` before the desk field.

Final long-copy screenshot: PASS.

## Three-scale QA

Selected `41:56`:

- whole / 500px: PASS;
- reading / 705×1000: PASS;
- native `1000×1419`: PASS by structure and screenshot review;
- long-copy stress: PASS after method switch.

The new selected direction is visibly distinct from Passport's stitched field-journal cover while retaining a coherent travel/hospitality/wedding tone.

## Structure QA

Selected `41:56`:

- visible native text: `12`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- text-text collisions: `0`;
- IMAGE fills: `0`;
- dynamic stack `42:28`: y `520`, height `404`, bottom `924`.

Stress `41:76`:

- visible native text: `12`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- text-text collisions: `0`;
- IMAGE fills: `0`;
- dynamic stack `42:40`: bottom `1086` before desk y `1135`.

Stress was hidden again after QA.

## Hybrid / image decision

- variable/factual copy: native Figma text;
- fixed desk/pen/tab geometry: simple native editable geometry with direct physical meaning;
- generated raster: `0`;
- SVG: `0`;
- replaceable image roles: `0`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed bottleneck was family-level metaphor repetition, not missing photography/illustration.

## Professional Design Council

Score: `91/100 / PASS / NO VETO`.

- Concept clarity / ownability: 14/15
- Emotional excitement / want-to-engage: 12/15
- Japanese editorial typography: 14/15
- Composition / hierarchy / rhythm: 14/15
- Travel / hospitality integration without cliché: 8/10
- Guest-book-sign functionality: 10/10
- Physical print credibility: 9/10
- Editability / realistic-copy resilience: 5/5
- Family fit without template sameness: 5/5

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remains.

## Deferred finalization

`NOT_PRINT_READY` remains until final writing method/pen placement, installation wording/location, printer template/profile and physical-distance proof are authoritative.

## Decision

Promote `41:56` as ADD-09 Current and preserve the prior clothbound design as hidden history.

This closes the newly observed stitched-book family repetition for ADD-09 without weakening its writing guidance or native editability.