# ADD-12 新郎新婦クイズカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / OPEN_QUADRANTS_POLISH_PASS / SELECT_HELPER_SUBTRACTION_PASS / OPEN_MESSAGE_FIELD_POLISH_PASS / BACK_FOLIO_SUBTRACTION_PASS / MINT_TAB_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
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

## Current visual direction

### Front

- Japanese-first `新郎新婦クイズ` hierarchy;
- `Q.01` + native semantic `[設問]`;
- four equal A–D response roles in a 2×2 editorial field;
- no radio-button list, rounded card stack, quiz-show iconography, ticket/passport grammar, or AI-person imagery;
- complete quadrant borders were removed because spacing + A–D labels + handwriting rules already provide grouping;
- repeated `選ぶ` helper labels were removed because the instruction already explains the action and the repetition read like form controls;
- four answer roles and native editable choice text remain intact.

### Back

- mint opening field with `旅の余白に、ひとこと。`;
- native `[回答方法]`, `[記名欄]`, and `[メッセージ]` roles;
- one large `536×216` semantic handwriting field;
- the full message-area border is removed, while the semantic writing geometry remains;
- the non-semantic `12` folio is hidden because no reader-facing page/index requirement exists;
- the residual `DECOR / MINT TAB` is hidden because the open message role remains clear without a widget-like corner/tab marker;
- no raster/image dependency.

## Latest bounded visual polish — 2026-08-19

Fresh native `620×875` review of selected back found a short mint tab at the top-right edge of the already borderless open message field. The semantic writing area, `ひとこと`, `[メッセージ]`, and faint handwriting hint already communicate the role, so the tab had no binding, trim, navigation, or writing function.

Rollback-safe comparison:

- `39:2 / QA / ADD12 / BACK / NO_MINT_TAB / 2026-08-19`

Only `DECOR / MINT TAB` was hidden. The `536×216` writing area, text, spacing, mint opening field, answer method and name roles were unchanged.

Pre-change rollbacks:

- selected back: `39:19`;
- long-copy back: `39:36`.

Adopted visibility changes:

- selected `26:48 / DECOR / MINT TAB`: hidden;
- stress `27:97 / DECOR / MINT TAB`: hidden.

The no-tab version is quieter and more stationery-like without reducing comprehension.

## Structure / long-copy QA

### Selected front `26:3`

- root: `620×875`;
- native editable question/choice/answer-method roles retained;
- four equal semantic answer roles retained;
- visible `選ぶ` helper count: `0`;
- IMAGE fills: `0`;
- outside visible text: `0`.

### Selected back `26:4`

- root: `620×875`;
- visible native text: `8`;
- semantic handwriting area: `536×216`;
- visible message-area border: `0`;
- visible decorative folio: `0`;
- visible mint-tab count: `0`;
- IMAGE fills: `0`;
- outside visible text: `0`.

Hidden long-copy roots `27:51 / 27:83` remain the current stress authority. Back stress was temporarily revealed after the mint-tab subtraction and passed at native `620×875` with long answer-method, name, and message placeholders; outside visible text remained `0`. It was returned to hidden QA state after review.

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

Legacy production and the earlier rejected clean-room V2 remain preserved.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The current defects were unnecessary containment, repeated form-control helpers, non-semantic metadata, and a residual tab—not missing imagery. Exact Drive authority was live-read on 2026-08-19 and matched `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`. Drive writes for the latest polish: `0`.

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
- native semantic editability: `PASS`
- long-copy evidence: `PASS`
- rollback safety: `PASS`
- Drive authority: `PASS`
- legacy preservation: `PASS`
- final factual/content verification: `BLOCKED_REQUIRED_INPUT`
- print readiness: `NO`
