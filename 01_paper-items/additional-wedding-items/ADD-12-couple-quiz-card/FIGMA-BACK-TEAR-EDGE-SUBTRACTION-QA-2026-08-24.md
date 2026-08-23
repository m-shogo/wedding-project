# ADD-12 新郎新婦クイズカード — Back Tear-Edge Subtraction QA

Date: 2026-08-24
Start authority SHA: `43cb3e70f0d03bde626d2c0753db6d0e747ca6f5`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Bounded Current-only polish of the already selected `ANSWER PUNCH CARD`. No new visual version was opened and no previous production was used as construction material.

- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- Current back: `59:84`
- hidden realistic long-copy back: `59:129`
- exact Drive authority verified live: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- Drive write: `0`
- generated assets: `0`

## Visible problem

Fresh whole / reading / native-size review found `59:87 / DECOR / TEAR EDGE`, a `28×680` pink vertical rectangle at the inserted response-sheet edge, reading as a floating color rail rather than a credible tear/perforation or paper-construction cue.

The role name said `TEAR EDGE`, but the rendered object had no perforation, notch, fold, cut, attachment or other physical geometry that demonstrated tearing. The charcoal sleeve + cream inserted sheet + blue `AFTER THE QUIZ` score tab already established the back-face artifact clearly.

## Bounded comparison

Only the fixed tear-edge visibility changed.

- Current comparison: `67:2 / QA / ADD-12 / BACK / NO FLOATING TEAR EDGE / 2026-08-24`
- long-copy comparison: `67:17 / QA / ADD-12 / LONG COPY BACK / NO FLOATING TEAR EDGE / 2026-08-24`

Unchanged:
- all wording;
- Japanese typography;
- score-tab geometry and label;
- paper insert geometry;
- response/name/message lanes;
- date;
- front face;
- native text editability.

Result: the no-edge version is cleaner and more credible as an inserted response sheet. It does not lose quiz identity, physical-paper reading or information grouping.

## Promotion / rollback

Complete pre-change rollbacks were created before Current mutation:

- Current back rollback: `67:32 / ROLLBACK / ADD-12 / BACK / PRE-NO-FLOATING-TEAR-EDGE / 2026-08-24`
- long-copy back rollback: `67:47 / ROLLBACK / ADD-12 / LONG COPY BACK / PRE-NO-FLOATING-TEAR-EDGE / 2026-08-24`

Promoted bounded change:

- Current `59:87 / DECOR / TEAR EDGE`: `visible=false`
- stress `59:132 / DECOR / TEAR EDGE`: `visible=false`
- comparisons hidden after adoption.

## Three-scale / long-copy QA

Current back after promotion:
- whole / thumbnail: PASS;
- reading: PASS;
- native `620×875`: PASS.

Realistic long-copy back `59:129` was temporarily shown after promotion, visually reviewed, then restored hidden:
- long response-method copy: PASS;
- long name: PASS;
- long message: PASS;
- footer/date reserve: PASS.

## Structure readback

Current back `59:84`:
- visible native text: `9`;
- fixed-height visible text: `0`;
- IMAGE fills: `0`;
- tear edge visible: `false`.

Stress back `59:129`:
- visible native text: `9`;
- fixed-height visible text: `0`;
- IMAGE fills: `0`;
- tear edge visible: `false`;
- root restored hidden after QA.

## Hybrid / image decision

- variable/factual/emotional copy: native Figma text;
- paper/tab/rules: simple native geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was an unsupported fixed rail, not missing photography or illustration.

## Learning state

`VERIFIED_LOCAL` only. This re-applies the already established project QA method: a line/edge/rail named as a physical cue must prove that physical or reader-facing job in the rendered artifact. It does **not** create a rule to remove all colored edges or tear cues.

## Result

`TEAR_EDGE_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / CURRENT_RETAINED / NOT_PRINT_READY`
