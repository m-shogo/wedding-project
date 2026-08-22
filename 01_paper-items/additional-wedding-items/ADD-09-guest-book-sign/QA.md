# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / PEN_TRAY_WELCOME_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / CORNER_TAB_SUBTRACTION_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current live authority

- promotion evidence: `FAMILY-DIVERSITY-PEN-TRAY-PROMOTION-QA-2026-08-21.md`
- latest refinement evidence: `FIGMA-CORNER-TAB-SUBTRACTION-QA-2026-08-23.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- Current: `41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / FAMILY DIVERSITY B / 2026-08-21`
- long-copy stress: `41:76 / QA / ADD-09 / PEN TRAY WELCOME / LONG COPY STRESS / 2026-08-21` — hidden after QA
- pre-corner-tab refinement rollback: `47:38 / 47:74` — hidden
- bounded no-tab comparison: `47:2` — hidden after verification
- prior Current preserved hidden: `38:43 / HISTORY / PRE-PEN-TRAY CURRENT / CLOTHBOUND ARRIVAL LOG / 2026-08-21`
- prior Professional vNext preserved: `35:2 / ROLLBACK / ADD-09 / WORDS AS SOUVENIR / PRE-FAMILY-DIVERSITY`
- prior selected clean-room V4 preserved: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- retained legacy production preserved: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority live-confirmed: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive write: `0`

## Why ADD-09 reopened a second time

The previous `CLOTHBOUND ARRIVAL LOG` had already solved the older coral/lagoon/yellow large-rounded-shape family repetition and was individually strong. A later live family-thumbnail comparison against the selected WEDDING PASSPORT exposed a **second-order template repetition**: both unrelated artifacts converged on warm paper + stitched left binding/spine + small top label/tab + large two-line Japanese headline.

The Passport is inherently a booklet/keepsake, so a stitched binding is semantically credible there. The Guest Book **sign** communicates a writing action and did not need to become another bound-book cover. Family fit was therefore reopened without invalidating the old structure and long-copy evidence.

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
- deep hospitality-green top edge and bottom writing-desk field;
- one coral entry rule with a real hierarchy/binding job;
- one connected pen cue in the writing zone; mustard is retained only as the pen cap where it has physical meaning;
- Japanese-first title and operational copy;
- no standalone top-right check-in/accent tab after 2026-08-23 bounded subtraction QA;
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

No typography, dynamic stack, desk geometry, connected pen, facts, or placeholders changed.

## Hybrid authoring roles

- variable/final copy: native editable Figma text;
- semantic placeholders: native editable Figma text;
- dynamic operational information: native vertical Auto Layout;
- fixed desk/pen/paper-edge geometry: simple editable native geometry with direct physical meaning;
- editable SVG: `0`;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`;
- Drive writes: `0`.

Image generation was intentionally not started because the diagnosed defects were family-level metaphor repetition and later a purposeless fixed accent, not missing photography/illustration.

## Three-scale QA

Current `41:56` after the latest refinement:

- whole-item / ~500 px: PASS;
- reading / 705×1000: PASS;
- native canvas `1000×1419`: PASS;
- the page remains warm and asymmetrical without relying on an unexplained top-right color block;
- the mustard accent still exists only on the connected pen cap, where it has a physical role.

The current reads as a writing/guest-action sign rather than another stitched book cover or a decorated template.

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

The 2026-08-23 post-subtraction stress screenshot was re-run by temporarily revealing `41:76`; it remains PASS and was re-hidden after verification.

## Structure QA

Current `41:56` after latest refinement:

- native visible text: `12`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`;
- corner check-in tab visible: `false`;
- dynamic stack `42:28`: y `520`, height `404`, bottom `924`.

Stress `41:76`:

- native visible text: `12`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`;
- corner check-in tab visible: `false`;
- dynamic stack `42:40`: bottom `1086` before desk y `1135`.

Stress is hidden after verification.

## Professional Design Council

Score remains **91 / 100 / PASS / NO VETO**.

- Concept clarity / ownability: `14/15`
- Emotional excitement / engagement: `12/15`
- Japanese editorial typography: `14/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel / hospitality integration without cliché: `8/10`
- Guest-book-sign functionality: `10/10`
- Physical print credibility: `9/10`
- Editability / realistic-copy resilience: `5/5`
- Family fit without template sameness: `5/5`

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remains.

## Learning state

The 2026-08-23 corner-tab finding is `VERIFIED_LOCAL` only:

> When a small fixed accent is named after a metaphor such as check-in/ticket/stamp but cannot prove a reader-facing, physical, binding or navigational job, test subtraction at whole-item scale before retaining it.

Do **not** transfer the exact tab treatment, palette, coordinates, guest-book composition or a blanket `remove tabs` rule. Real tabs/folds/ticket stubs with artifact function may be correct elsewhere.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final writing method and pen placement;
- final installation wording/location;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

These do not block further visual progression.

## Decision / next

`41:56` remains the current ADD-09 selected family with the purposeless corner tab removed.

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / CORNER_TAB_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

Continue suite-level audit in progression order, but redesign only when a real screenshot-supported defect, repeated dominant grammar, or physical metaphor problem is visible. Do not reopen healthy distinct items merely to create activity.