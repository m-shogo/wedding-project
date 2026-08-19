# ADD-12 新郎新婦クイズカード V3 — answer-method footer-rule subtraction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / ANSWER_METHOD_FOOTER_RULE_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
Start authority SHA: `35f4d0288213e4b3814bc548a795289caf1c74ef`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected front: `26:3 / ADD12/QuizCard/Front/CleanroomV3`
- selected front long-copy stress: `27:51`
- exact Drive folder: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- selected back and retained legacy were not changed.

## Visible problem

Fresh native front review found a full-width `RULE / FOOTER` directly beneath the native `[回答方法]` role. The answer-method field is printed guidance, not a handwritten input area, and the line had no trim, fold, binding, scoring, or response-writing function. After earlier removal of quadrant boxes and repeated `選ぶ` controls, this single rule was the remaining element that made the lower area read like a form/input field.

## Bounded comparison

Rollback-safe comparison:

- `40:2 / QA / ADD12 / FRONT / NO FOOTER RULE / 2026-08-19`

Only `RULE / FOOTER` was hidden. The Japanese quiz title, date, `Q.01`, question role, prompt, four A–D response roles, four answer handwriting lines, `[回答方法]`, trim guide and all native semantic copy were preserved.

The no-rule comparison was stronger at whole-item scale: the answer method reads as printed guidance rather than an empty form control, while the four actual response writing lines remain clear.

## Promotion / rollback

Hidden pre-change rollback copies:

- selected front: `41:2 / ROLLBACK / ADD12 / FRONT / PRE FOOTER RULE SUBTRACTION / 2026-08-19`
- front stress: `41:34 / ROLLBACK / ADD12 / FRONT STRESS / PRE FOOTER RULE SUBTRACTION / 2026-08-19`

Promoted selected/stress change:

- selected `26:33 / RULE / FOOTER`: hidden;
- stress `27:80 / RULE / FOOTER`: hidden.

Comparison `40:2` was hidden after promotion.

## Three-scale / structure QA

Selected front:

- whole / thumbnail review: PASS;
- reading scale: PASS;
- actual size: `620×875` PASS;
- visible native text: `14`;
- visible text outside root: `0`;
- IMAGE fills: `0`.

Long-copy front stress was temporarily revealed after promotion and reviewed at native `620×875` with long question/choice/answer-method copy:

- visible native text: `14`;
- visible text outside root: `0`;
- footer rule visible: `0`;
- answer choices and their dedicated handwriting lines remain intact;
- stress returned to hidden QA state after inspection.

## Drive / asset decision

Exact Drive authority metadata was live-read before promotion. Drive writes: `0`. Image generation: `0`.

The defect was residual form-like native geometry, not missing imagery.

## Decision

`VERIFIED_LOCAL / ANSWER_METHOD_FOOTER_RULE_SUBTRACTION_PASS`.

ADD-12 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / LONG_COPY_STRESS_PASS`. The front keeps the response-writing affordances that actually matter while removing a non-functional form divider under printed guidance.

## Deferred finalization

Final question/answer content, response method, printer/vendor template, duplex orientation and physical handwriting proof remain `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION`.
