# ADD-12 新郎新婦クイズカード — QA

Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-09

## Current production authority

- Start main SHA for this design run: `7cfb277e91b1bc39a3ac492a46f26294977b5421`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`
- Figma file: `ADD-12 新郎新婦クイズカード`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- Figma URL: `https://www.figma.com/design/oZ24SbwGkeAfFJcXlbxCoD`
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive folder ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

## Production frames

- `1:2` — `ADD12/QuizCard/Front` — A6 portrait proportional working canvas, 620 × 875
- `1:26` — `ADD12/QuizCard/Back` — A6 portrait proportional working canvas, 620 × 875

The production remains a design/proportion authority only. Exact 105 × 148 mm output, 3 mm bleed, printer profile, and final trim guides are still a physical/vendor finalization boundary and are not claimed as print-ready from the pixel working canvas.

## Art direction

The production follows the SPEC concept `TRAVEL TRIVIA / EDITORIAL FIELD NOTE` without copying a passport, boarding pass, Rurubu page, or generic web quiz UI.

- warm ivory paper, deep navy copy, restrained mint edge, low-saturation rule;
- Japanese title/question hierarchy first; English is quiet metadata only;
- no neon quiz-show treatment, speech bubbles, crowns, light-bulb icons, gradients, shadows, equal rounded cards, or decorative travel icons;
- choices are text rows with equal circular hand-mark targets rather than button/card UI;
- all four candidate choices have identical mark size, stroke, color, and hierarchy so no answer is visually suggested;
- no photos or AI-generated people are used.

## Semantic placeholder policy

No actual question, correct answer, number of final choices, collection method, prize rule, anonymity rule, aggregation timing, or QR method was invented.

Production uses native editable semantic placeholders such as:

- `ADD12/Question/Body` = `［設問本文 · LAYOUT DUMMY］`
- `ADD12/Choice/A` through `ADD12/Choice/D`
- `ADD12/AnswerMethod`
- `ADD12/NameField`
- `ADD12/MessageField`

Four choices exist because the SPEC semantic contract explicitly defines A–D as editable candidate roles; unused choices must be removed after the authoritative choice count is known.

## Rollback evidence

Before material structural refinement the initial front/back were duplicated to `99_QA`:

- `1:41` — `QA_ADD12_FRONT_PRE_STRESS_2026_08_09`
- `1:65` — `QA_ADD12_BACK_PRE_STRESS_2026_08_09`

The first long-copy front stress proof (`1:79`) exposed a real defect: a long question expanded into the fixed-position rule / first choice region. Production was therefore structurally refactored instead of cosmetically nudged.

## Structural refinement

Front question content now lives in native vertical auto-layout:

- `1:117` — `ADD12/Question/ContentFlow`
- order: question number → question body → rule → choices flow → answer method
- layout: `VERTICAL`
- item spacing: 20

The existing `ADD12/Choices/Flow` remains native vertical auto-layout. Each choice itself is a native horizontal row with an equal hand-mark circle and independent editable text.

## Screenshot QA

### Production front

Whole/reading screenshot confirms:

- `新郎新婦クイズ` establishes the item identity without dominating the question role excessively;
- question number → body → choices → answer method reads in the intended order;
- choices are not equal cards/buttons;
- all choice marks are visually identical and no choice is color/position/area-privileged;
- substantial negative space remains available without falling into generic web-hero composition.

### Production back

Whole/reading screenshot confirms:

- answer/collection guidance is the first operational hierarchy;
- name line and message field are visually distinct writable zones;
- unconfirmed name/anonymous, prize, lottery, and collection rules remain explicit layout dummies;
- no fake operational facts or QR behavior were invented.

## Long-copy stress QA

### Preserved failure evidence

- `1:79` — `QA_ADD12_FRONT_LONG_COPY_STRESS_2026_08_09`

The fixed-position version showed the long question touching/colliding with the rule and first answer target.

### Post-fix pass candidate

- `1:118` — `QA_ADD12_FRONT_LONG_COPY_STRESS_V2_2026_08_09`

The pass candidate tests:

- a multi-line long Japanese question;
- materially different choice lengths including multi-line options;
- a longer answer-method note.

The screenshot shows the question and unequal choice copy pushing later content downward naturally. Structural readback reports `overflowCount=0`, and all four hand-mark circles remain exactly 28 × 28 with stroke weight 2.

Back-side long-copy proof `1:103` also tests a multi-line answer/collection instruction and a longer optional operational note without collision with the name/message writing zones.

## Structure QA

### Front production

- 620 × 875, `clipsContent=true`
- 10 native text nodes
- image fills: 0
- visible overflow: 0
- question content uses native vertical auto-layout
- equal answer marks A–D: 28 × 28, stroke weight 2 for every option

### Back production

- 620 × 875, `clipsContent=true`
- 7 native text nodes
- image fills: 0
- visible overflow: 0
- name and message roles remain separate native vector/text structures

### Post-fix front stress

- native text nodes: 10
- image fills: 0
- content-flow height under long copy: 563.5
- visible overflow: 0

No flatten/raster replacement was introduced.

## Drive QA

- exact Drive folder live metadata readback: `PASS`
- Drive changes this run: `0`
- reason: no production raster/image is required for the current native editorial design.

## BLOCKED_REQUIRED_INPUT

These final content decisions are still required but do not block progression to ADD-13:

- authoritative question text and correct answer;
- authoritative final number of choices;
- response collection method and deadline;
- named vs anonymous participation;
- prize / lottery existence and rules;
- aggregation/result-announcement timing;
- whether any QR response mechanism is actually used;
- final back-side wording and whether the name/message fields are retained.

## DEFERRED_FINALIZATION

- exact 105 × 148 mm A6 production sizing and 3 mm bleed in the printer/vendor template;
- final trim/safe-area confirmation at 5 mm or greater;
- front/back orientation and duplex print-direction proof;
- minimum line-weight proof on the selected stock/printer;
- handwriting test with pencil and ballpoint on the final stock;
- 100% physical print proof under table lighting;
- check for show-through and post-trim crowding;
- final PDF / print PNG / optional A4 imposition export and Drive storage.

## Result

- Figma production creation: `PASS`
- Whole / reading visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-copy structural QA: `PASS`
- Choice fairness visual QA: `PASS`
- Native semantic editability: `PASS`
- Rollback evidence: `PASS`
- Drive authority readback: `PASS`
- Final content verification: `BLOCKED_REQUIRED_INPUT`
- Physical/mechanical proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `DESIGN_QA_PASS_WITH_PLACEHOLDERS`
