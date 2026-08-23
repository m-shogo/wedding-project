# ADD-12 新郎新婦クイズカード — QA

Status: `CURRENT / FAMILY_DIVERSITY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ARTIFACT_LABEL_FIELD_FIT_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- family-diversity page: `59:2 / FAMILY_DIVERSITY / ADD-12 QUIZ / 2026-08-21`
- current front: `59:54 / CURRENT / ADD-12 / ANSWER PUNCH CARD / FRONT / FAMILY DIVERSITY 2026-08-21`
- current back: `59:84 / CURRENT / ADD-12 / ANSWER PUNCH CARD / BACK / FAMILY DIVERSITY 2026-08-21`
- hidden stress front/back: `59:99 / 59:129`
- pre-score-tab-fit back rollback: `66:2`
- pre-score-tab-fit back-stress rollback: `66:17`
- pre-2026-08-23 front rollback: `64:32`
- pre-2026-08-23 front-stress rollback: `64:62`
- prior Professional vNext retained as rollback: `55:3 / 55:25`
- earlier clean-room V3 and legacy remain retained
- exact Drive authority verified live: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- Drive write: `0`

Canonical current evidence:
- family-diversity selection evidence retained in this directory
- `FIGMA-FLOATING-TOP-TICKET-SUBTRACTION-QA-2026-08-23.md`
- `FIGMA-BACK-SCORE-TAB-LABEL-FIT-QA-2026-08-23.md`

## Current visual direction — ANSWER PUNCH CARD

The family-diverse current was created from blank frames, carrying forward only verified non-visual requirements: A6 duplex `620×875`, quiz/question role, equal A–D answer semantics, native date `2026.10.24`, back roles `[回答方法]`, `[記名欄]`, `[メッセージ]`, and unresolved facts as placeholders/deferred inputs.

### Front `59:54`

- warm paper field;
- black full-height punched binding edge as the single dominant physical-object cue;
- oversized red `01` question number;
- Japanese-first question headline;
- A–D choices use equal open rules and equal typography rather than cards/buttons;
- each answer rule receives a restrained distinct print color without changing answer weight;
- the former mustard floating top-right ticket block is now hidden after a 2026-08-23 bounded comparison showed that it had no reader-facing, tear/fold/scan, binding, or information role;
- no large capsule/sun/circle, fake airline data, progress UI or quiz-show iconography.

### Back `59:84`

- charcoal outer sleeve with a cream inserted response sheet;
- blue `AFTER THE QUIZ` score tab retained because it carries actual reader-facing artifact identity;
- the score tab is now `236×54`, wide enough to visually own the complete native label instead of clipping it at the field edge;
- narrow pink tear edge;
- Japanese-first `答えの旅は、まだつづく。`;
- open response/name/message rules;
- no equal cards, scanner UI or abstract tropical shapes.

## 2026-08-23 bounded subtraction QA

Whole-item review found that `59:64 / DECOR / TOP TICKET` read as a floating template accent. The punch-card identity was already fully established by the left binding/punch system.

Rollback-safe comparison:
- `64:2 / QA / ADD-12 / FRONT / NO FLOATING TOP TICKET / 2026-08-23`

Only the top-right mustard rectangle was hidden. No text, answer geometry, rule color, date, binding, punch, image role, or variable content changed.

Result:
- whole / ~500–800px: PASS and cleaner;
- reading: PASS;
- actual native `620×875`: PASS;
- long-copy stress uses the same subtraction;
- back unchanged.

Promotion preserved:
- current rollback `64:32`;
- stress rollback `64:62`;
- comparison `64:2` hidden as evidence.

## 2026-08-23 back score-tab label-fit QA

Fresh native screenshot review found the fixed blue score tab ended before its own native `AFTER THE QUIZ` label, making the right edge of the label look clipped/unfinished even though the text itself remained on the page.

Pre-change geometry:
- Current tab `59:86`: `158×54`, x=`72`;
- Current label `59:88`: x=`108`, `200px` text box;
- the same mismatch existed in long-copy back `59:131 / 59:133`.

Before production mutation, full rollback copies were saved:
- Current back `66:2`;
- long-copy back `66:17`.

Bounded repair:
- Current score tab `59:86`: width `158 → 236px`;
- stress score tab `59:131`: width `158 → 236px`;
- height, color, y-position, native label text, font, font size and copy remain unchanged.

Fresh Current and long-copy screenshots both PASS. `AFTER THE QUIZ` is now completely contained by the physical field that semantically owns it, without changing the Japanese title, response lanes, tear edge or date.

This is typography/field-fit polish inside the preferred Current, not a new visual version.

## Hybrid authoring roles

- question/answers/response/name/message/date/artifact identity: native editable Figma text;
- answer flow: native Auto Layout;
- fixed punched edge/paper/tab/rules: simple native geometry;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- IMAGE fills: `0`;
- variable copy baked into visual assets: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: current quality bottlenecks are typography, answer fairness, physical-game-paper clarity and artifact-field fit, not missing photography or illustration.

## Screenshot / long-copy / structure QA

Current front `59:54` and back `59:84` remain visually selected after whole / reading / actual-size review.

Stress:
- front `59:99`;
- back `59:129`.

Verified contracts:
- root size `620×875`;
- semantic text remains native auto-height;
- A–D answers remain native text within a vertical Auto Layout stack;
- selected/stress IMAGE fills `0`;
- answer roles retain equal typographic treatment;
- long question and realistic multi-word answers remain inside the A6 page;
- back long-name/long-message proof retains separated writing lanes;
- back score-tab label remains fully contained in both Current and stress proof;
- old currents, prior vNext and rollback frames remain preserved rather than overwritten.

The project-wide Japanese semantic line-break and actual-size factual-microtype rules remain applicable. No new line-break or physical-size defect was introduced by the score-tab repair.

## Professional Design Council

Current family-diverse direction remains **93/100 / PASS / NO VETO**. The 2026-08-23 score-tab repair removes an accidental clipping signal without changing the concept, functionality, Japanese typography, answer fairness, physical print credibility, editability, or family identity.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Do not fabricate:

- actual question/correct answer;
- final answer count/content;
- response collection/deadline;
- named vs anonymous participation;
- prize/result timing;
- QR use;
- final back wording.

Also deferred:

- printer/vendor A6 template and bleed;
- duplex orientation;
- physical handwriting/line-weight proof;
- final print proof, PDF/export and Drive delivery.

## Current result

`FAMILY_DIVERSITY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / FLOATING_TOP_TICKET_SUBTRACTION_PASS / ARTIFACT_LABEL_FIELD_FIT_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
