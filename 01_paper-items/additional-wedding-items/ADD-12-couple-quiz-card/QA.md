# ADD-12 新郎新婦クイズカード — QA

Status: `CURRENT / FAMILY_DIVERSITY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- latest `main` immediately before promotion: `13a094782c9a00e0dae6db169cda21d60870cbff`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- family-diversity page: `59:2 / FAMILY_DIVERSITY / ADD-12 QUIZ / 2026-08-21`
- current front: `59:54 / CURRENT / ADD-12 / ANSWER PUNCH CARD / FRONT / FAMILY DIVERSITY 2026-08-21`
- current back: `59:84 / CURRENT / ADD-12 / ANSWER PUNCH CARD / BACK / FAMILY DIVERSITY 2026-08-21`
- hidden stress front/back: `59:99 / 59:129`
- prior Professional vNext retained as rollback: `55:3 / 55:25`
- earlier clean-room V3 and legacy remain retained
- exact Drive authority verified live: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- Drive write: `0`

## Why family-scale audit reopened ADD-12

The prior `SUNSET TRIVIA` remained a strong 92/100 single-item solution, but the live family-scale screenshot showed the same dominant abstract grammar now being removed elsewhere in the suite: deep navy field + cyan rounded sweep + coral/yellow crop-through shapes.

The quiz functionality itself was healthy. The defect was that its visual fingerprint read as another member of the same AI-authored color-field family rather than a distinct game/keepsake object.

## Clean-room method

The new family-diversity work started from blank frames. No SUNSET TRIVIA/V3/legacy layout, vectors, crops, colored fields or decorative nodes were duplicated or reused.

Only verified non-visual requirements were carried forward:

- A6 duplex size `620×875`;
- quiz/question role;
- equal A–D answer semantics;
- native date `2026.10.24`;
- back roles `[回答方法]`, `[記名欄]`, `[メッセージ]`;
- unresolved question, correct answer, prize/result/collection/QR facts remain placeholders or deferred.

## Three materially different blank-frame directions

Created on `59:2`:

1. `59:3 / ANSWER PUNCH CARD`
2. `59:28 / SCORE SHEET FOLD`
3. `59:39 / TORN QUIZ ZINE`

`ANSWER PUNCH CARD` was selected because it gives the quiz a specific physical-game-paper identity: side binding/punch rhythm, oversized question number, open ruled choices and a simple detachable-ticket accent.

`SCORE SHEET FOLD` was more formal/systematic and risked score-form UI. `TORN QUIZ ZINE` had energy but was less controlled for answer fairness and wedding keepsake quality.

The full-size front/back were rebuilt separately from blank A6 frames rather than duplicated from the thumbnail.

## Current visual direction — ANSWER PUNCH CARD

### Front `59:54`

- warm paper field instead of full navy;
- black bound/punched edge as the dominant physical-object cue;
- oversized red `01` question number;
- Japanese-first question headline;
- A–D choices use equal open rules and equal typography rather than cards/buttons;
- each answer rule receives a restrained distinct print color without changing answer weight;
- one mustard top ticket tab;
- no large capsule/sun/circle, fake airline data, progress UI or quiz-show iconography.

### Back `59:84`

- charcoal outer sleeve with a cream inserted response sheet;
- blue score tab and narrow pink tear edge;
- Japanese-first `答えの旅は、まだつづく。`;
- open response/name/message rules;
- no equal cards, scanner UI or abstract tropical shapes.

The result remains playful but now reads as a quiz/answer artifact rather than another abstract travel poster.

## Hybrid authoring roles

- question/answers/response/name/message/date: native editable Figma text;
- answer flow: native Auto Layout;
- fixed punched edge/paper/tab/rules: simple native geometry;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- IMAGE fills: `0`;
- variable copy baked into visual assets: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the visible failure was suite-level shape repetition, not illustration/photo deficiency. Adding generic travel or quiz imagery would not solve answer fairness or physical-object distinctiveness.

## Screenshot / three-scale QA

Prior current `55:3` was inspected at ~500 px and confirmed the navy + rounded cyan/coral/yellow repetition fingerprint.

New current front `59:54`:

- whole / ~500 px: PASS — punch-card object identity is immediate;
- reading: PASS — question number, title, question and A–D hierarchy remain clear;
- native `620×875`: credible A6 print density and line weight.

New current back `59:84`:

- whole / ~500 px: PASS — inserted response paper is clear and distinct from front;
- reading/detail: PASS — method/name/message roles remain legible and writable;
- native `620×875`: paper/slip margins remain credible.

The first full-size front screenshot showed the Japanese title breaking too aggressively because the title measure was too narrow. The title lane was widened before promotion while preserving the `01` scale shift.

## Long-copy stress / defects caught

Stress:

- front `59:99`;
- back `59:129`.

### Front stress

The first programmatic stress used unrealistically long answer strings and expanded the four-answer stack beyond the A6 page. The test was corrected to realistic multi-word answer strings while retaining a genuinely long Japanese question.

Final stress screenshot at ~500 px: PASS. The long question remains readable and all four answer roles remain visible, equal-weight and inside the physical page.

### Back stress

The long-name and long-message proof exposed insufficient separation from the original fixed writing rules. The cream response paper was lengthened and the name/message rule + date anchors were moved down to preserve real writing lanes.

Final stress screenshot at ~500 px: PASS — method, long name, long message, rules and date remain separated with no clipping.

## Structure / editability QA

Metadata readback confirms:

- front/back root `620×875`;
- semantic text remains native auto-height;
- front A–D answers remain native text within a vertical Auto Layout stack;
- selected/stress IMAGE fills `0`;
- answer roles retain equal typographic treatment;
- old current remains preserved and hidden, not overwritten.

An interrupted bounded edit briefly targeted the wrong node ID while adjusting title measure; metadata readback immediately exposed that the target was a punch rectangle, and the punch was restored to `24×24` at its verified location before further QA. No current/legacy production was affected.

## Mature comparison / Professional Council

After the new candidate had passed normal + stress screenshots, it was compared with retained `SUNSET TRIVIA`.

SUNSET TRIVIA remains a strong individual design and is preserved. ANSWER PUNCH CARD wins the current family-scale gate because it:

- has a more item-specific physical quiz identity;
- removes the repeated navy/cyan/coral/yellow rounded-field signature;
- preserves answer fairness without app-style cards;
- maintains travel-keepsake character through print/punch/fold semantics rather than generic travel decoration.

Professional Design Council: **93/100**.

- Concept / ownability: `15/15`
- Emotional game energy: `14/15`
- Japanese editorial typography: `14/15`
- Composition / rhythm: `14/15`
- Travel/keepsake integration without cliché: `9/10`
- Item functionality / answer fairness: `10/10`
- Physical print credibility: `9/10`
- Editability / resilience: `5/5`
- Family fit without template sameness: `3/5`

No Executive Creative Director, Japanese Editorial or Print Production veto remains.

## Preservation

- `59:54 / 59:84` are Current;
- prior `55:3 / 55:25` are renamed rollback and hidden;
- prior stress, V3 and legacy are retained;
- three new direction thumbnails and new stress proofs are retained hidden as evidence.

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

## Current result / next

`FAMILY_DIVERSITY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`

Next high-value target: family-scale audit of `ADD-13 メッセージカード`; only redesign if its dominant grammar materially repeats the promoted family-template fingerprint.