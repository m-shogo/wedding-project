# ADD-12 新郎新婦クイズカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_1_ADAPTIVE_BALLOT / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-14

## Current production authority

- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ADD-12 新郎新婦クイズカード`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- Figma URL: `https://www.figma.com/design/oZ24SbwGkeAfFJcXlbxCoD`
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive folder ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- Drive parent ID: `0ADXt8irGMFGnUk9PVA`
- reopened visual authority: `FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`
- V3 authority: `FIGMA-V3-OPEN-BALLOT-REFINEMENT-2026-08-12.md`
- current V4/V4.1 authority: `FIGMA-V4-BALLOT-RHYTHM-2026-08-14.md`

## Production frames

- `1:2` — `ADD12/QuizCard/Front` — 620 × 875
- `1:26` — `ADD12/QuizCard/Back` — 620 × 875

The production remains a design/proportion authority. Exact A6 output, bleed, printer profile, duplex direction and physical stock proof remain finalization work.

## Current visual direction

The current design keeps the selected V3 stationery direction:

- warm ivory paper, deep navy typography and restrained rust/mint accents;
- Japanese title/question hierarchy first;
- equal circular hand-mark targets rather than buttons/cards;
- back uses five native writing rules of intentionally decreasing length instead of a large form-like box;
- no photos, AI-generated people, quiz-show icons, speech bubbles, gradients, shadows, badges, rounded cards or travel clichés.

The V4 goal was to use the lower field more deliberately. A fixed `42px` choice gap looked better with short placeholder copy but failed long-copy revalidation. V4.1 therefore keeps the improved paper rhythm with an adaptive native auto-layout field rather than a fixed large gap.

## V4.1 adaptive ballot authority — 2026-08-14

Fresh rollback created before the adaptive production edit:

- `20:2 / ROLLBACK_ADD12_FRONT_PRE_ADAPTIVE_BALLOT_V41_2026_08_14` (`visible=false`)

Earlier rollback remains:

- `18:2 / ROLLBACK_ADD12_FRONT_PRE_BALLOT_RHYTHM_V4_2026_08_14`

Production root `1:2` remains stable.

Current `11:52 / ADD12/Choices/Flow`:

- native vertical auto-layout;
- fixed height `270px`;
- `primaryAxisSizingMode=FIXED`;
- `primaryAxisAlignItems=SPACE_BETWEEN`.

This allows short 30px choice rows to breathe while longer 60px wrapped rows automatically use tighter spacing.

No wording, facts, answer, choice count, font size, hand-mark geometry, semantic role, color, image, or back-side content changed.

## Fresh screenshot QA

Production front `1:2` was rendered at native `620 × 875` after the V4.1 change.

Result:

- the four short placeholder choices still occupy the paper with deliberate ballot rhythm;
- the lower field no longer reads as unused template space;
- choice weighting remains equal;
- answer-method text remains subordinate;
- Japanese title/question hierarchy and date/footer remain clear;
- no web-UI/card treatment or decorative filler was introduced.

## Long-copy stress

### Historical V3 evidence

V3 stress remains valid historical evidence that `ADD12/Question/ContentFlow=580px` is required for longer Japanese content.

### V4 failure found

Stress `18:27 / QA_ADD12_V4_BALLOT_RHYTHM_LONG_COPY_2026_08_14` proved that the fixed `42px` V4 gap was not robust. With four 60px wrapped rows the choices flow became `366px`; the final answer method extended to bottom `620px` inside the `580px` clipping content flow.

This was treated as a real regression and fixed rather than ignored.

### V4.1 stress PASS

The same stress proof was updated to the adaptive `270px / SPACE_BETWEEN` choice field, temporarily exposed only for screenshot QA, then returned to `visible=false`.

Fresh native-size screenshot showed the long question, all four long choices and the answer-method copy fully visible.

Structural readback:

- stress content flow: `580px`, `clipsContent=true`
- choices flow: `270px`, `FIXED`, `SPACE_BETWEEN`
- four stress rows: `60px` each
- row y positions: `0 / 70 / 140 / 210`
- effective long-copy gaps: `10px`
- final choice bottom: `270px`
- answer method: `y=476`, `height=48`, bottom=`524`
- content-flow fit: `PASS` (`524 <= 580`)

## Semantic placeholder policy

No actual question, correct answer, final choice count, collection method, prize rule, anonymity rule, aggregation timing or QR method was invented.

Production continues to use native editable semantic placeholders. Four choices remain candidate roles because the SPEC defines A–D; unused choices must be removed only after authoritative final content exists.

## Structure QA

### Front `1:2`

- 620 × 875, `clipsContent=true`
- native text: `10`
- IMAGE fills: `0`
- text outside root: `0`
- `ADD12/Question/ContentFlow`: `580px`, native vertical auto-layout
- `ADD12/Choices/Flow`: `270px`, native vertical auto-layout, `FIXED / SPACE_BETWEEN`
- all four choices remain native editable text with equal hand-mark semantics

### Back `1:26`

Unchanged from verified V3 authority:

- 620 × 875, `clipsContent=true`
- native text: `7`
- IMAGE fills: `0`
- text outside root: `0`
- open ruled message field remains native vector structure.

No flatten/raster replacement was introduced.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The screenshot-supported weakness was ballot rhythm/adaptability, not missing imagery. Drive writes for this run: `0`. Exact Drive folder metadata was re-read live before Figma write and matched the registered non-Rurubu authority.

## BLOCKED_REQUIRED_INPUT

These final content decisions remain required but do not block visual progression:

- authoritative question text and correct answer;
- authoritative final number of choices;
- response collection method and deadline;
- named vs anonymous participation;
- prize / lottery existence and rules;
- aggregation/result-announcement timing;
- whether any QR response mechanism is actually used;
- final back-side wording and whether name/message fields are retained.

## DEFERRED_FINALIZATION

- exact 105 × 148 mm A6 production sizing and 3 mm bleed in the printer/vendor template;
- final trim/safe-area confirmation;
- duplex orientation proof;
- minimum line-weight proof on selected stock/printer;
- handwriting test;
- 100% physical print proof;
- show-through/post-trim crowding check;
- final PDF / print PNG / optional imposition export and Drive storage.

## Result

- V4 fixed-gap regression detection: `PASS`
- V4.1 adaptive ballot production edit: `PASS`
- Reopened sellable visual screenshot QA: `PASS`
- Whole / reading / actual-size visual QA: `PASS_WITH_PLACEHOLDERS`
- V4.1 long-copy screenshot QA: `PASS`
- V4.1 long-copy structure QA: `PASS`
- Choice fairness visual QA: `PASS`
- Native semantic editability: `PASS`
- Rollback evidence: `PASS`
- Drive authority readback: `PASS`
- Final content verification: `BLOCKED_REQUIRED_INPUT`
- Physical/mechanical proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
