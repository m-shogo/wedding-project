# ADD-12 新郎新婦クイズカード — V3 Open Ballot Refinement — 2026-08-12

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V3_PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub latest main at promotion decision: `9363eb2c450a78c5ec7fc1aac1566e25bfc187c3`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- production roots preserved: front `1:2`, back `1:26`
- Drive authority: `ADD-12_新郎新婦クイズカード` / `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- Drive writes in this refinement: `0`

## Fresh visual diagnosis

Fresh actual-size screenshots of V2 showed two remaining weaknesses:

1. the front ballot choices were compressed high in the card while a large lower field remained visually unused;
2. the back message role was still a large outlined rectangle, which read more like a worksheet/UI input box than a finished paper object.

No image asset was required: the bottleneck was native composition and writing-field treatment, not missing hero imagery.

## V3 clean-room comparison

Created on `99_QA`:

- section `6:2 / QA_ADD12_V3_OPEN_BALLOT_FIELD_2026_08_12`
- front `6:3 / QA_ADD12_FRONT_V3_SPACED_BALLOT_RHYTHM`
- back `6:28 / QA_ADD12_BACK_V3_OPEN_RULED_MESSAGE_FIELD`

Changes:

- front answer-choice vertical rhythm opened from the compact V2 spacing to a more deliberate ballot cadence;
- the back's outlined message rectangle was removed;
- five native horizontal writing rules replace the box, with intentionally decreasing lengths (`515 / 515 / 500 / 470 / 420`) to avoid a rigid form-field look;
- all text remains native editable text;
- IMAGE fills remain `0`;
- no generated people, icons, badges, gradients, rounded cards, fake transport metadata, or raster-variable copy were introduced.

Whole-pair and actual-size screenshots selected V3 over V2. The back now reads as an editorial writing surface rather than a web/admin form field.

## V3 long-copy stress and correction

Created stress proof:

- section `8:2 / QA_ADD12_V3_LONG_COPY_STRESS_2026_08_12`
- front `8:3 / QA_ADD12_FRONT_V3_LONG_COPY_STRESS`

The first V3 stress screenshot revealed a real clipping defect: four two-line answers expanded correctly, but the final `AnswerMethod` text extended beyond the fixed-height question content-flow container and was visually clipped.

The defect was fixed before promotion by expanding the native `ADD12/Question/ContentFlow` container from `520` to `580` px in the V3 comparison and stress proof. The corrected stress screenshot shows:

- long Japanese question copy fits;
- all four two-line choices fit with equal/non-directive answer marks;
- the longer answer-method instruction is visible and remains above the footer date;
- no root overflow or raster substitution was introduced.

## Rollback-safe production promotion

Before production replacement, the V2 production pair was preserved in hidden rollback section:

- section `11:2 / ROLLBACK_ADD12_PRE_V3_PROMOTION_2026_08_12`
- front `11:3 / ROLLBACK_ADD12_FRONT_PRE_V3`
- back `11:28 / ROLLBACK_ADD12_BACK_PRE_V3`

Production root IDs were retained while V3 children were promoted:

- front remains `1:2 / ADD12/QuizCard/Front`
- back remains `1:26 / ADD12/QuizCard/Back`

## Post-promotion screenshot QA

Actual-size screenshots at `620 × 875` confirm:

- front Japanese headline, question, answer marks, choice copy and footer remain readable;
- the expanded ballot rhythm is less top-compressed than V2;
- back name field and message area read as physical stationery rather than a bordered input box;
- the five ruled message lines remain optically light and do not compete with the heading;
- no unintended clipping is visible.

## Post-promotion structure readback

Production front `1:2`:

- native text: `10`
- IMAGE fill nodes: `0`
- trim/bleed guides: `2`
- `clipsContent=true`
- `ADD12/Question/ContentFlow = 515 × 580`
- top-level text overflow: `0`

Production back `1:26`:

- native text: `7`
- IMAGE fill nodes: `0`
- trim/bleed guides: `2`
- `clipsContent=true`
- open message field contains `5` native rules
- top-level text overflow: `0`

Rollback V2 pair remains intact and native-editable.

## Image generation / Drive

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The screenshot-supported defect was compositional. Adding generated imagery would compete with the quiz ballot/writing function and would not solve the identified weakness. No Drive asset was created or modified.

## Decision

V3 is promoted and retains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / ACTUAL_SIZE_QA_PASS / NOT_PRINT_READY`

## Deferred finalization

Still unresolved intentionally:

- final question and four choices;
- answer/recovery rules;
- prize/lottery policy if any;
- final date and operational copy;
- final paper stock, printer template/profile, and physical proof.

These do not block progression of the reopened visual pass.

## Next

Continue fresh visual spot-check from ADD-13 onward; do not add imagery unless a screenshot-supported bottleneck justifies it.
