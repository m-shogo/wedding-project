# ADD-12 新郎新婦クイズカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / OPEN_QUADRANTS_POLISH_PASS / SELECT_HELPER_SUBTRACTION_PASS / OPEN_MESSAGE_FIELD_POLISH_PASS / BACK_FOLIO_SUBTRACTION_PASS / MINT_TAB_SUBTRACTION_PASS / BACK_HEADER_FIELD_SUBTRACTION_PASS / FRONT_HEADER_FIELD_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-19
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The retained V4.1-era production is comparison / rollback history only. The current selected design is the independently built clean-room V3.

- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- selected page: `26:2 / SELECTED / CLEANROOM / ADD-12 / V3 EDITORIAL QUADRANTS / 2026-08-16`
- selected front: `26:3 / ADD12/QuizCard/Front/CleanroomV3`
- selected back: `26:4 / ADD12/QuizCard/Back/CleanroomV3`
- hidden long-copy front: `27:51`
- hidden long-copy back: `27:83`
- retained legacy production: `1:2 / 1:26`
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

Current evidence:

- `CLEANROOM-V3-EDITORIAL-QUADRANTS-QA-2026-08-16.md`
- `CLEANROOM-V3-GUEST-COPY-CLEANUP-2026-08-17.md`
- `FIGMA-STRESS-PROOF-LANGUAGE-CLEANUP-2026-08-17.md`
- `CLEANROOM-V3-OPEN-QUADRANTS-POLISH-2026-08-18.md`
- `CLEANROOM-V3-SELECT-HELPER-SUBTRACTION-2026-08-18.md`
- `CLEANROOM-V3-BACK-FOLIO-SUBTRACTION-2026-08-19.md`
- `CLEANROOM-V3-MINT-TAB-SUBTRACTION-2026-08-19.md`
- `CLEANROOM-V3-BACK-HEADER-FIELD-SUBTRACTION-2026-08-19.md`
- `FIGMA-CLEANROOM-V3-FRONT-BOXLESS-HEADER-QA-2026-08-19.md`

## Current visual direction

### Front

- Japanese-first `新郎新婦クイズ` hierarchy;
- the former full-width `620×92` navy header field is hidden; category title remains native navy text and date remains native mint text directly on the cream paper field;
- `Q.01` + native semantic `[設問]`;
- four equal A–D response roles in a 2×2 editorial field;
- no radio-button list, rounded card stack, quiz-show iconography, ticket/passport grammar, or AI-person imagery;
- complete quadrant borders were removed because spacing + A–D labels + handwriting rules already provide grouping;
- repeated `選ぶ` helper labels were removed because the instruction already explains the action and the repetition read like form controls;
- four answer roles and native editable choice text remain intact.

### Back

- typographic mint opening `旅の余白に、ひとこと。` on one continuous cream paper field;
- the former full-width `620×108` mint header field is hidden because it read as a separate web-like section and had no trim/fold/writing role;
- native `[回答方法]`, `[記名欄]`, and `[メッセージ]` roles;
- one large `536×216` semantic handwriting field;
- the full message-area border is removed, while the semantic writing geometry remains;
- the non-semantic `12` folio is hidden because no reader-facing page/index requirement exists;
- the residual `DECOR / MINT TAB` is hidden because the open message role remains clear without a widget-like corner/tab marker;
- no raster/image dependency.

## Mint-tab polish — 2026-08-19

Fresh native `620×875` review of selected back found a short mint tab at the top-right edge of the already borderless open message field. The semantic writing area, `ひとこと`, `[メッセージ]`, and faint handwriting hint already communicate the role, so the tab had no binding, trim, navigation, or writing function.

Rollback-safe comparison:

- `39:2 / QA / ADD12 / BACK / NO_MINT_TAB / 2026-08-19`

Only `DECOR / MINT TAB` was hidden. The `536×216` writing area, text, spacing, opening field, answer method and name roles were unchanged.

Pre-change rollbacks:

- selected back: `39:19`;
- long-copy back: `39:36`.

Adopted visibility changes:

- selected `26:48 / DECOR / MINT TAB`: hidden;
- stress `27:97 / DECOR / MINT TAB`: hidden.

Result: `MINT_TAB_SUBTRACTION_PASS`.

## Back header-field subtraction — 2026-08-19

Fresh whole / reading / actual-size review then found the remaining full-width mint opening field increasingly inconsistent with the already-open stationery body. The color was useful, but the `620×108` containment block itself had no physical or semantic job.

Three rollback-safe comparisons were created before mutating selected production:

1. `43:2` — thin mint top rule;
2. `43:19` — narrow vertical mint rail;
3. `43:36` — no field, native mint opening text only.

The thin top rule remained an orphan separator and the vertical rail introduced a new binding motif without a physical requirement. The typographic-only version was strongest because it preserved the mint semantic accent without adding another box, rail, or section.

Pre-change rollbacks:

- selected back: `43:53`;
- long-copy back: `43:70`.

Adopted on selected `26:4` and stress `27:83`:

- `DECOR / CORNER FIELD`: hidden;
- `旅の余白に、ひとこと。`: kept as native editable text, colored mint;
- opening y optically adjusted to `36`.

No answer-method, name, message, handwriting geometry, trim/bleed guide, or variable copy changed.

Three-scale result:

- whole / thumbnail: PASS;
- reading scale: PASS;
- native `620×875`: PASS;
- long-copy native `620×875`: PASS.

Result: `BACK_HEADER_FIELD_SUBTRACTION_PASS`.

## Front header-field subtraction — 2026-08-19

Fresh front review found the remaining `620×92` navy top field increasingly inconsistent with the mature open quadrants and already-boxless back. It enclosed only the small category title and date, so at whole-item scale it read as a residual web/app header rather than a necessary print container.

Neutral RSL-130 was consumed only as a hypothesis. No Rurubu item-specific design, asset, node, Drive item, or layout was inspected or copied.

Rollback-safe comparison:

- `45:2 / QA_ADD12_FRONT_BOXLESS_HEADER_2026_08_19`

Only the header treatment changed:

- `DECOR / TOP FIELD`: hidden;
- `ADD12/Title`: retained as native text and changed from off-white to the existing ADD-12 navy;
- `ADD12/Date`: retained as native mint text;
- question, choice, answer-writing and answer-method geometry unchanged.

Pre-change hidden rollbacks:

- selected front: `45:34`;
- long-copy front: `45:66`.

Adopted on selected `26:3` and stress `27:51`. Comparison `45:2` is hidden after promotion.

Post-adoption QA:

- whole / thumbnail 500px: PASS;
- reading scale: PASS;
- native `620×875`: PASS;
- realistic long-copy native `620×875`: PASS;
- selected visible native text: `14`;
- stress visible native text: `14` when inspected;
- selected/stress IMAGE fills: `0`;
- selected/stress outside visible text: `0`;
- selected/stress top field visible: `false`;
- stress returned hidden after QA.

Detailed evidence: `FIGMA-CLEANROOM-V3-FRONT-BOXLESS-HEADER-QA-2026-08-19.md`.

Result: `FRONT_HEADER_FIELD_SUBTRACTION_PASS`.

## Structure / long-copy QA

### Selected front `26:3`

- root: `620×875`;
- native editable question/choice/answer-method roles retained;
- four equal semantic answer roles retained;
- visible top header field: `0`;
- visible `選ぶ` helper count: `0`;
- visible native text: `14`;
- IMAGE fills: `0`;
- outside visible text: `0`.

### Selected back `26:4`

- root: `620×875`;
- visible native text: `8`;
- semantic handwriting area: `536×216`;
- visible full-width mint header field: `0`;
- visible message-area border: `0`;
- visible decorative folio: `0`;
- visible mint-tab count: `0`;
- IMAGE fills: `0`;
- outside visible text: `0`;
- text-to-text collisions: `0`.

Hidden long-copy roots `27:51 / 27:83` remain the current stress authority. Front stress was temporarily revealed after the boxless-header adoption and passed at native `620×875` with a long Japanese question, multi-line choices and long answer-method copy; outside visible text remained `0` and IMAGE fills remained `0`. Back stress retains the previously verified boxless treatment and remains hidden QA evidence.

No flattening or raster replacement was introduced. Variable/factual content remains native editable text.

## Rollback / evidence inventory

- open-quadrant comparison: `33:2`
- open-quadrant front rollback: `34:2`
- open-quadrant front-stress rollback: `34:34`
- open-message comparison: `35:2`
- open-message back rollback: `35:19`
- open-message back-stress rollback: `35:36`
- select-helper comparison: `36:2`
- select-helper front rollback: `36:34`
- select-helper front-stress rollback: `36:66`
- no-folio comparison: `38:2`
- no-folio back rollback: `38:19`
- no-folio back-stress rollback: `38:36`
- no-mint-tab comparison: `39:2` — hidden after adoption
- no-mint-tab back rollback: `39:19`
- no-mint-tab back-stress rollback: `39:36`
- thin-header comparison: `43:2` — hidden after rejection
- vertical-binding comparison: `43:19` — hidden after rejection
- typographic-opening comparison: `43:36` — hidden after adoption
- pre-header-subtraction back rollback: `43:53`
- pre-header-subtraction back-stress rollback: `43:70`
- front boxless-header comparison: `45:2` — hidden after adoption
- pre-front-header selected rollback: `45:34`
- pre-front-header stress rollback: `45:66`

Legacy production and the earlier rejected clean-room V2 remain preserved.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The latest defect was stale container mass after native hierarchy matured, not missing imagery. Exact Drive authority was live-read before the Figma write and matched `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`. Drive writes for the latest polish: `0`.

## BLOCKED_REQUIRED_INPUT

Final content still requires authoritative:

- question and correct answer;
- final choice count/content;
- response collection/deadline;
- named vs anonymous participation;
- prize rules if any;
- result timing;
- whether QR is used;
- final back-side wording.

Do not fabricate these values.

## DEFERRED_FINALIZATION

Printer/vendor A6 template and bleed, trim/safe-area, duplex orientation, handwriting/line-weight proof, physical print proof, final PDF/export and Drive storage remain deferred.

## Result

- clean-room independence: `PASS`
- reopened sellable visual: `PASS`
- open-quadrant polish: `PASS`
- select-helper subtraction: `PASS`
- open message-field stationery polish: `PASS`
- back folio subtraction: `PASS`
- mint-tab subtraction: `PASS`
- back header-field subtraction: `PASS`
- front header-field subtraction: `PASS`
- native semantic editability: `PASS`
- long-copy evidence: `PASS`
- rollback safety: `PASS`
- Drive authority: `PASS`
- legacy preservation: `PASS`
- final factual/content verification: `BLOCKED_REQUIRED_INPUT`
- print readiness: `NO`