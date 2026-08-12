# ADD-12 新郎新婦クイズカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V3_PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-13

## Current production authority

- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ADD-12 新郎新婦クイズカード`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- Figma URL: `https://www.figma.com/design/oZ24SbwGkeAfFJcXlbxCoD`
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive folder ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- reopened visual authority: `FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`
- current V3 authority: `FIGMA-V3-OPEN-BALLOT-REFINEMENT-2026-08-12.md`

## Production frames

- `1:2` — `ADD12/QuizCard/Front` — 620 × 875
- `1:26` — `ADD12/QuizCard/Back` — 620 × 875

The production is still a design/proportion authority. Exact A6 output, bleed, printer profile, duplex direction and physical stock proof remain finalization work.

## V3 sellable visual authority
Fresh actual-size V2 screenshots exposed two residual defects: the four-choice ballot was compressed too high while the lower field was underused, and the back message role still looked like a large form/UI input box.

V3 was selected from a rollback-safe clean-room comparison and promoted while preserving production root IDs.

Current art direction:
- warm ivory paper, deep navy typography and restrained rust/mint accents;
- Japanese title/question hierarchy first;
- front choices use equal circular hand-mark targets and a more open ballot cadence rather than buttons/cards;
- back replaces the outlined message rectangle with five native writing rules of intentionally decreasing length (`515 / 515 / 500 / 470 / 420`), producing a physical stationery field instead of a web form;
- no photos, AI-generated people, quiz-show icons, speech bubbles, gradients, shadows, badges, rounded cards or travel clichés are used.

Fresh 2026-08-13 natural-size screenshots of front and back still support `SELLABLE_VISUAL_QA_PASS`: the front reads as an editorial paper ballot and the back reads as a writable message card rather than an input form.

## Semantic placeholder policy
No actual question, correct answer, final choice count, collection method, prize rule, anonymity rule, aggregation timing or QR method was invented.

Production uses native editable placeholders including:
- `ADD12/Question/Body` = `［設問本文 · LAYOUT DUMMY］`
- `ADD12/Choice/A` through `ADD12/Choice/D`
- `ADD12/AnswerMethod`
- back method / optional-note roles as explicit `LAYOUT DUMMY`

Four choices exist because the SPEC defines A–D as editable candidate roles; unused choices must be removed after the authoritative final choice count is known.

## V3 long-copy stress
V3 stress authority:
- section `8:2 / QA_ADD12_V3_LONG_COPY_STRESS_2026_08_12`
- front `8:3 / QA_ADD12_FRONT_V3_LONG_COPY_STRESS`

The first V3 stress screenshot exposed a real clipping defect when all four options wrapped to two lines and the final answer-method copy exceeded the question flow. It was fixed before promotion by expanding native `ADD12/Question/ContentFlow` from `520` to `580` px. Corrected stress evidence keeps the long question, all four two-line options and answer method visible without collision.

## Rollback authority
Before V3 promotion the V2 production pair was preserved:
- `11:2 / ROLLBACK_ADD12_PRE_V3_PROMOTION_2026_08_12`
- front `11:3 / ROLLBACK_ADD12_FRONT_PRE_V3`
- back `11:28 / ROLLBACK_ADD12_BACK_PRE_V3`

## Structure QA — fresh 2026-08-13 readback

### Front `1:2`
- 620 × 875, `clipsContent=true`
- native text: `10`
- IMAGE fills: `0`
- text outside root: `0`
- trim/bleed guide matches: `2`
- `ADD12/Question/ContentFlow` remains the promoted V3 flow authority
- all four choices remain native editable text with equal hand-mark semantics

### Back `1:26`
- 620 × 875, `clipsContent=true`
- native text: `7`
- IMAGE fills: `0`
- text outside root: `0`
- trim/bleed guide matches: `2`
- open ruled message field remains native vector structure

No flatten/raster replacement was introduced.

## Image / Drive decision
`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The screenshot-supported weakness was composition and writable-field treatment, not missing imagery. Generated art would compete with the ballot/message function. Drive writes for this QA sync: `0`; exact folder metadata was re-read before the write.

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
- Figma V3 production promotion: `PASS`
- Reopened sellable visual QA: `PASS`
- Whole / reading / actual-size visual QA: `PASS_WITH_PLACEHOLDERS`
- V3 long-copy structural QA: `PASS`
- Choice fairness visual QA: `PASS`
- Native semantic editability: `PASS`
- Rollback evidence: `PASS`
- Drive authority readback: `PASS`
- Final content verification: `BLOCKED_REQUIRED_INPUT`
- Physical/mechanical proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
