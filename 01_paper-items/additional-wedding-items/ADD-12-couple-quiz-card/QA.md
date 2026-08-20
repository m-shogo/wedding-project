# ADD-12 新郎新婦クイズカード — QA

Status: `CURRENT / CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FRONT_HEADER_FIELD_SUBTRACTION_PASS / BACK_HEADER_FIELD_SUBTRACTION_PASS / OPEN_QUADRANTS_POLISH_PASS / SELECT_HELPER_SUBTRACTION_PASS / OPEN_MESSAGE_FIELD_POLISH_PASS / BACK_WRITE_HINT_READABILITY_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- selected page: `26:2 / SELECTED / CLEANROOM / ADD-12 / V3 EDITORIAL QUADRANTS / 2026-08-16`
- selected front: `26:3 / ADD12/QuizCard/Front/CleanroomV3`
- selected back: `26:4 / ADD12/QuizCard/Back/CleanroomV3`
- hidden long-copy front/back: `27:51 / 27:83`
- retained legacy production: `1:2 / 1:26` — rollback/history only
- exact Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`

Drive metadata was live-read during this progression run. Drive write: `0`.

The current family is independently authored clean-room V3. The retained V4.1-era production is not the current authoring base.

## Current visual direction

### Front

- Japanese-first `新郎新婦クイズ` category hierarchy;
- native date `2026.10.24`;
- large mint `Q.01` + native semantic `[設問]`;
- four equal A–D semantic response roles in an open 2×2 editorial field;
- complete quadrant boxes removed; spacing, A–D labels and handwriting rules carry grouping;
- repeated `選ぶ` helper labels removed because the instruction already explains the action;
- former full-width navy header field hidden; title/date remain native on one cream paper surface;
- no radio-button list, rounded card grid, quiz-show iconography, ticket/passport grammar or AI-person imagery.

### Back

- typographic mint opening `旅の余白に、ひとこと。` on one continuous cream paper field;
- native `[回答方法]`, `[記名欄]`, `[メッセージ]` roles;
- semantic open handwriting area `536×216`;
- former full-width mint header field, message border, non-semantic folio and corner mint tab hidden;
- legitimate guest-facing writing helper retained and now strengthened for actual-size readability;
- no raster/image dependency.

## Current adopted simplification

The selected V3 has already passed a sequence of bounded, rollback-safe reductions:

- open quadrant treatment instead of four full choice boxes;
- repeated `選ぶ` control-like helper subtraction;
- open message-field treatment;
- non-semantic back folio subtraction;
- mint-tab subtraction;
- back full-width header-field subtraction;
- front full-width header-field subtraction.

These changes preserve semantic writing/answer roles while removing web/app containment and decorative UI residue. Evidence remains in the item-specific 2026-08-18/19 QA files.

## Back writing-hint readability — adopted 2026-08-20

Fresh native `620×875` review found the legitimate reader-facing helper `自由に書いてください` at only `11px` in a very light grey. The open handwriting area remained clear compositionally, but the helper was close to disappearing at actual size.

This copy is not implementation/proof language; it is real guest guidance, so removal would have been the wrong response.

Rollback-safe comparison:

- `49:2 / QA_ADD12_BACK_WRITE_HINT_READABILITY_2026_08_20`;
- changed only `TEXT / WRITE HINT`:
  - `11 → 14px`;
  - width `170 → 220px`;
  - very light grey → darker neutral grey `rgb≈(0.36, 0.39, 0.41)`.

The comparison was stronger at native size while remaining subordinate to the title/message roles.

Adopted after hidden rollback preservation:

- selected rollback `49:19`;
- stress rollback `49:36`;
- selected `26:47 / TEXT / WRITE HINT`: `14px`, width `220px`, darker neutral grey;
- stress `27:96 / TEXT / WRITE HINT`: same treatment;
- comparison hidden after adoption.

Evidence: `FIGMA-BACK-WRITE-HINT-READABILITY-QA-2026-08-20.md`.

## Fresh live visual audit — 2026-08-20

Fresh screenshots in this progression run:

- selected front ~500px: PASS;
- selected back ~500px: PASS.

Front remains a restrained paper ballot rather than form UI: question first, then four open answer roles. Back remains intentionally quieter because it is a physical writing surface; the large open area has a functional handwriting purpose and is not treated as false-premium emptiness.

The strengthened `自由に書いてください` helper is now visible at review scale without competing with `ひとこと` or the message placeholder.

No fresh screenshot exposed a defect requiring another clean-room version or image generation in this run.

## Structure / long-copy QA

### Selected front `26:3`

- root `620×875`;
- visible native text `14`;
- four semantic answer roles retained;
- visible top field `0`;
- visible `選ぶ` helper count `0`;
- IMAGE fills `0`;
- outside visible text `0`.

### Selected back `26:4`

- root `620×875`;
- visible native text `8`;
- semantic handwriting area `536×216`;
- full-width mint header field visible `0`;
- message-area border visible `0`;
- decorative folio visible `0`;
- mint-tab visible `0`;
- IMAGE fills `0`;
- outside visible text `0`;
- text collisions `0`.

2026-08-20 readability evidence confirms selected/stress:

- visible native text `8 / 8`;
- outside visible text `0 / 0`;
- same-parent text collisions `0 / 0`;
- proof-language `0 / 0`;
- IMAGE fills `0 / 0`;
- writing helper synchronized at `14px / 220px`;
- long-copy stress returned hidden after native-size QA.

All variable/factual content remains native editable. No flattening or raster replacement was introduced.

## Hybrid / image decision

- question, choices, answer method, name/message roles: native editable text;
- handwriting geometry / rules: native vector/shape;
- generated/composed raster: `0`;
- replaceable image role: not required;
- person imagery: `0`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`: the latest bottleneck was small secondary typography, not missing illustration or visual material.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Do not fabricate:

- question and correct answer;
- final choice count/content;
- response collection/deadline;
- named vs anonymous participation;
- prize rules;
- result timing;
- QR use;
- final back wording.

Also deferred:

- printer/vendor A6 template and bleed;
- trim/safe-area and duplex orientation;
- handwriting/line-weight physical proof;
- final print proof, PDF/export and Drive delivery.

## Current result

`CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BACK_WRITE_HINT_READABILITY_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-13 キッズ向けミッションカード`.
