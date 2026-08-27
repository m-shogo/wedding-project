# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / PEN_TRAY_WELCOME_SELECTED / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / CORNER_TAB_SUBTRACTION_PASS / DESK_PAPER_EDGE_SUBTRACTION_PASS / LOCAL_TOP_HOSPITALITY_EDGE_AUDIT_PENDING / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-27
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current live authority

- promotion evidence: `FAMILY-DIVERSITY-PEN-TRAY-PROMOTION-QA-2026-08-21.md`
- latest visual reopen evidence: `OBSERVED-TOP-HOSPITALITY-EDGE-WEB-HEADER-RISK-2026-08-27.md`
- latest completed refinement evidence: `FIGMA-DESK-PAPER-EDGE-SUBTRACTION-QA-2026-08-24.md`
- previous refinement evidence: `FIGMA-CORNER-TAB-SUBTRACTION-QA-2026-08-23.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- Current: `41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / NO AMBIGUOUS PAPER EDGE / 2026-08-24`
- current top hospitality edge: `41:57 / TOP / HOSPITALITY EDGE` — **audit pending; do not mutate without bounded comparison**
- long-copy stress: `41:76 / QA / ADD-09 / PEN TRAY WELCOME / LONG COPY / NO AMBIGUOUS PAPER EDGE / 2026-08-24` — hidden after QA
- pre-paper-edge rollbacks: `52:2 / 52:38` — hidden
- bounded no-paper-edge comparison: `51:2` — hidden after verification
- pre-corner-tab refinement rollback: `47:38 / 47:74` — hidden
- bounded no-tab comparison: `47:2` — hidden after verification
- prior Current preserved hidden: `38:43 / HISTORY / PRE-PEN-TRAY CURRENT / CLOTHBOUND ARRIVAL LOG / 2026-08-21`
- prior Professional vNext preserved: `35:2 / ROLLBACK / ADD-09 / WORDS AS SOUVENIR / PRE-FAMILY-DIVERSITY`
- prior selected clean-room V4 preserved: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- retained legacy production preserved: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority live-confirmed: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive write: `0`

## 2026-08-27 visual reopen — top hospitality edge

Fresh whole-item, reading-scale and native `1000×1419` screenshots re-exposed one material visual concern in the otherwise-strong Current.

`41:57 / TOP / HOSPITALITY EDGE` is a full-width `1000×54` deep hospitality-green strip placed exactly on the canvas top edge. At whole/read/actual size it reads before the paper field and behaves like a web/app header or status bar more than a credible paper, binding, trim, hierarchy or guest-facing role.

Live metadata confirms the role is structurally independent from the writing surface:

- top edge: `x=0 / y=0 / w=1000 / h=54`;
- kicker begins at `y=92`;
- headline begins at `y=165`;
- bottom writing desk begins at `y=1135`;
- previously ambiguous corner tab `41:58` and desk paper edge `41:72` are already hidden.

The bottom dark-green writing-desk field and connected pen still have direct physical/guest-action meaning. The question is only whether the separate full-width top strip still earns its place.

Relevant shared-learning fingerprint: `FULL_WIDTH_DECORATIVE_EDGE_READS_AS_WEB_HEADER`, already independently reproduced in ADD-06 and ADD-17. This remains only a receiving-item hypothesis here; it does not authorize automatic subtraction. ADD-10 / ADD-14 remain useful counterexamples where top/full-width fields have real navigational or emotional jobs.

Next bounded Figma test:

1. duplicate Current and long-copy proof rollback-safely;
2. keep all typography, Auto Layout, desk, connected pen, colors and copy unchanged;
3. compare `CURRENT` vs `OPEN_PAPER_TOP`, hiding only the copied `TOP / HOSPITALITY EDGE`;
4. inspect ~500px, ~1000px, native `1000×1419`, realistic long-copy, then structure readback;
5. adopt only if the open-paper version is clearly stronger and does not make the top feel unfinished.

Do not create replacement top bars/ornaments before this simplest bounded test. If Current wins, reject the hypothesis and restore the sellable gate.

Until that comparison is executed, the sellable visual gate is locally reopened while all previously verified structure/long-copy evidence remains valid.

## Why ADD-09 reopened a second time

The previous `CLOTHBOUND ARRIVAL LOG` had already solved the older coral/lagoon/yellow large-rounded-shape family repetition and was individually strong. A later live family-thumbnail comparison against the selected WEDDING PASSPORT exposed a second-order template repetition: both unrelated artifacts converged on warm paper + stitched left binding/spine + small top label/tab + large two-line Japanese headline.

The Passport is inherently a booklet/keepsake, so a stitched binding is semantically credible there. The Guest Book sign communicates a writing action and did not need to become another bound-book cover. Family fit was therefore reopened without invalidating the old structure and long-copy evidence.

## Clean-room family directions

Page: `41:2 / VNEXT_FAMILY_AUDIT_D / ADD-09 / PEN TRAY / 2026-08-21`.

Three materially different directions were created from verified non-visual requirements only:

1. `41:3 / PEN TRAY WELCOME` — open paper sign + hospitality edge + real writing-desk / pen-rest semantics. Selected.
2. `41:23 / OPEN REGISTER SHEET` — rejected because the thumbnail became form/register-like and the inner-sheet reading lane was weak.
3. `41:40 / DESK BLOTTER POSTER` — rejected because the inset object introduced unnecessary containment/card reading.

The production candidate `41:56` was rebuilt separately from the selected study rather than duplicated.

## Current visual direction — PEN TRAY WELCOME

Emotional brief:

`ゲストブックの表紙を描くのではなく、ゲストが実際に「書く」記帳テーブルの空気をサイン化する。`

First read:

`旅の途中で、ひとこと。`

Current visual system:

- warm open paper field;
- deep hospitality-green bottom writing-desk field;
- full-width deep hospitality-green top edge currently under bounded visual re-audit;
- one coral entry rule with a real hierarchy/binding job;
- one connected pen cue in the writing zone; mustard is retained only as the pen cap where it has physical meaning;
- Japanese-first title and operational copy;
- no standalone top-right check-in/accent tab after 2026-08-23 bounded subtraction QA;
- no pale-blue desk-edge rail after 2026-08-24 bounded subtraction QA;
- no stitched binding/spine;
- no giant circle/capsule/sun system;
- no fake hotel/airline credentials, form cards, QR/route/stamp cosplay.

### 2026-08-23 corner-tab subtraction

Live whole/reading QA showed the top-right mustard `CORNER / CHECK-IN TAB` had no reader-facing, physical, binding, trim/fold, or navigational function and read as isolated template furniture. A rollback-safe no-tab comparison `47:2` was stronger, so only that fixed accent was removed from Current and long-copy proof.

- Current tab `41:58`: hidden
- stress tab `41:78`: hidden
- pre-change rollback: `47:38 / 47:74`
- whole ~500px: PASS
- reading ~1000px: PASS
- actual-size `1000×1419`: PASS
- realistic long-copy after subtraction: PASS

### 2026-08-24 desk paper-edge subtraction

Fresh whole/read/actual-size review found that `DESK / PAPER EDGE` was named as a physical paper cue but appeared as a continuous pale-blue 18px rail between the warm paper field and dark-green writing-desk field. It did not visibly express overlap, thickness, fold, trim or binding and read more like a UI/status separator.

Rollback-safe comparison `51:2` hid only that edge. The no-edge version kept the paper/sign concept, desk field and connected pen intact while making the transition more direct and less panel-like, so the subtraction was promoted.

- Current edge `41:72`: hidden
- stress edge `41:92`: hidden
- pre-change rollback: `52:2 / 52:38`
- comparison `51:2`: hidden after verification
- whole / thumbnail: PASS
- reading: PASS
- actual `1000×1419`: PASS
- realistic long-copy: PASS after temporary reveal/re-hide

No typography, dynamic stack, desk geometry, connected pen, facts, placeholders or copy changed in this repair.

## Hybrid authoring roles

- variable/final copy: native editable Figma text;
- semantic placeholders: native editable Figma text;
- dynamic operational information: native vertical Auto Layout;
- fixed writing desk and connected pen: simple editable native geometry with direct physical meaning;
- full-width top hospitality edge: simple native geometry, currently under bounded visual audit;
- ambiguous pale-blue desk edge: removed rather than replaced;
- editable SVG: `0`;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`;
- Drive writes: `0`.

Image generation is not currently justified because the diagnosed defect is fixed-geometry containment, not missing photography or illustration.

## Three-scale QA

Completed Current evidence before the 2026-08-27 top-edge reopen:

- whole-item / ~500 px: prior PASS;
- reading / 705×1000: prior PASS;
- native canvas `1000×1419`: prior PASS;
- realistic long-copy: prior PASS.

The fresh 2026-08-27 re-audit specifically reopens the full-width top edge at all three visual scales. Do not use the older global PASS as proof that this role is already resolved.

## Long-copy stress and repair

Stress: `41:76`.

Earlier stress QA exposed a real defect: dynamic operational copy expanded downward while fixed closing/date roles were visually covered by the fixed desk field.

A first nested Auto Layout repair was rejected because fixed nested wrappers clipped multiline Japanese values.

Method switch:

- replace nested fixed-height role wrappers with one direct native vertical Auto Layout stack;
- labels and values are direct `textAutoResize=HEIGHT` children;
- explicit non-semantic spacers control rhythm;
- closing/date participate in the same dynamic stack;
- fixed desk field stays at `y=1135`.

Final stress stack `42:40`:

- y `550`;
- height `536`;
- bottom `1086`;
- desk begins `1135`;
- remaining reserve `49 px`.

The 2026-08-24 post-subtraction stress proof was temporarily revealed and remains visually PASS without the pale-blue edge; it was re-hidden after verification.

The pending top-edge comparison must rerun this realistic stress proof because a sellable visual gate cannot be restored from short-copy screenshots alone.

## Structure QA

Current `41:56` after latest completed refinement:

- native visible text: `12`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`;
- corner check-in tab visible: `false`;
- `DESK / PAPER EDGE` visible: `false`;
- `TOP / HOSPITALITY EDGE` visible: `true` pending audit;
- dynamic stack `42:28`: y `520`, height `404`, bottom `924`.

Stress `41:76`:

- hidden after verification;
- native visible-when-revealed text: `12`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`;
- corner check-in tab visible: `false`;
- `DESK / PAPER EDGE` visible: `false`;
- dynamic stack `42:40`: bottom `1086` before desk y `1135`.

A naive root-relative collision scan reports overlaps because child coordinates inside the nested Auto Layout stack are parent-relative. Fresh screenshots are the authoritative visual collision check; no visible glyph collision is present.

## Professional Design Council

Historical score before the latest top-edge reopen: **91 / 100 / PASS / NO VETO**.

That historical score remains useful composition context but does not close the new screenshot-supported sellable visual defect by itself. The top-edge role must pass its bounded comparison before `SELLABLE_VISUAL_QA_PASS` is restored.

## Learning state

2026-08-24 desk-edge result: `VERIFIED_LOCAL` application of the existing binding-function QA method.

2026-08-27 top-edge state: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`.

Receiving-item hypothesis only:

> A full-width decorative edge with no trim, fold, binding, physical-artifact, hierarchy or reader-facing job can make a print composition read like a web/app header.

Do not transfer exact green treatment, coordinates, guest-book composition, or a blanket `remove top edges` rule. The test must remain item-specific and rollback-safe.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final writing method and pen placement;
- final installation wording/location;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

These do not block further visual progression.

## Decision / next

ADD-09 remains the Current selected family structurally, but its sellable visual gate is locally reopened for one bounded role:

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LOCAL_TOP_HOSPITALITY_EDGE_AUDIT_PENDING / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / CORNER_TAB_SUBTRACTION_PASS / DESK_PAPER_EDGE_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

Next writable-Figma action: compare `CURRENT` vs `OPEN_PAPER_TOP` by hiding only the cloned top hospitality edge, then rerun whole / reading / native-size / long-copy / structure readback. Continue ADD-10 onward read-only while this bounded mutation is blocked.