# RSL-130 receiving verification — mature container retest on ADD-12

Date: 2026-08-19
Source neutral hypothesis: RSL-130 (`MATURE_EDITORIAL_HIERARCHY_WITH_STALE_TERMINAL_CONTAINER`)
Receiving scope/item: non-Rurubu / ADD-12 新郎新婦クイズカード
State: `VERIFIED_CROSS_ITEM`

## OBSERVED

ADD-12 clean-room V3 had already matured into open editorial answer quadrants on the front and a fully boxless stationery treatment on the back, but the front still retained a full-width `620×92` navy top field containing only the small category title and date. At whole-item scale, the field increasingly read as a web/app header rather than an indispensable print structure.

No Rurubu item-specific Figma, Drive, asset, palette, layout, or GitHub item path was inspected or copied. Only the neutral RSL-130 judgment was consumed as a hypothesis.

## ROOT_CAUSE_HYPOTHESIS

A container can outlive the job that originally justified it. After native typography, spacing, semantic labels and surrounding paper rhythm mature, a formerly useful contrast/grouping field may remain by inertia and reintroduce interface-like sectioning.

The transferable test is therefore not `remove containers`; it is `re-test whether the container still performs a real visual, semantic, physical, or variable-copy-protection job`.

## TESTED_LOCAL

Rollback-safe front comparison:

- `45:2 / QA_ADD12_FRONT_BOXLESS_HEADER_2026_08_19`

Bounded change only:

- hide `DECOR / TOP FIELD`;
- keep `新郎新婦クイズ` as native editable text, using ADD-12's existing navy;
- keep `2026.10.24` as native mint text;
- preserve `Q.01`, question, question rule, prompt, four A–D response roles, handwriting rules, answer method, trim guide and all semantic copy;
- add no raster, generated asset, icon, rail, card, shadow, gradient or factual content.

Expected improvement: front/back family cohesion and less web-header reading without weakening category/date recognition.

Regression risk: loss of top grouping, insufficient title/date contrast, dead top space, or long-copy collision.

## VERIFIED_LOCAL — ADD-12

The boxless version was stronger and adopted.

Three-scale / stress evidence:

- whole / 500px: PASS;
- reading scale: PASS;
- actual `620×875`: PASS;
- realistic long-copy `620×875`: PASS with long Japanese question and multi-line choices.

Structure evidence:

- selected front `26:3`;
- stress front `27:51`, hidden after QA;
- pre-change selected rollback `45:34`;
- pre-change stress rollback `45:66`;
- comparison `45:2`, hidden after adoption;
- selected visible native text `14`;
- stress visible native text `14` when inspected;
- selected/stress IMAGE fills `0`;
- selected/stress outside visible text `0`;
- selected/stress top field visible `false`.

Drive evidence:

- exact authority `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード` re-read before write;
- Drive write `0`.

GitHub evidence:

- item evidence: `01_paper-items/additional-wedding-items/ADD-12-couple-quiz-card/FIGMA-CLEANROOM-V3-FRONT-BOXLESS-HEADER-QA-2026-08-19.md`;
- evidence commit `4eb08010edd67d7ab6cd86779da6aca16babe830`;
- Current QA sync commit `91c0379fd75b776b5a961a944f91bdac62b10072`.

## Counterexample in the same receiving run

A second materially different non-Rurubu artifact prevented overgeneralization.

ADD-11 A5 photo-share sign used a pale mint lower field behind privacy / hashtag / expiry information. A rollback-safe comparison `38:2 / QA_ADD11_A5_BOXLESS_PRIVACY_TERMINAL_2026_08_19` hid only that field. The result was weaker: the lower operational information floated and lost closure, and the field still provided real grouping plus reserve for variable privacy/expiry copy. The comparison was rejected and hidden; selected production remained unchanged.

ADD-09 also tested removal of its top rust rule (`30:2`) and rejected it because the rule still provided top anchoring/closure for the large headline/date/journey-line composition.

These counterexamples verify that the transferable rule is a **re-test**, not a subtraction default.

## VERIFIED_CROSS_ITEM conclusion

RSL-130 is now independently reproduced in a materially different non-Rurubu artifact while bounded counterexamples confirm its stop condition.

Transferable principle:

> After surrounding hierarchy matures, re-test any large section/header/terminal container that now appears UI-like. Remove or reduce it only when direct native hierarchy preserves grouping, contrast, closure, physical-paper logic and realistic variable-copy tolerance at whole/read/actual scales.

Keep the container when it still performs a real job such as contrast, semantic grouping, physical separation, scan/writing reserve, variable-copy reserve, or page closure.

## What must remain item-specific

Do not transfer:

- ADD-12 navy/mint palette;
- `620×875` format;
- exact title/date coordinates;
- quiz quadrant geometry;
- ADD-11 lower-field geometry or copy reserve;
- ADD-09 rule geometry;
- any Rurubu-specific layout, palette, assets or editorial grammar.

## Next receiving-item experiment

On a future materially different non-Rurubu print artifact, run a rollback-safe container-off comparison only when a fresh whole-item screenshot shows a mature hierarchy still carrying a suspiciously stale header/section/footer field. Always run realistic long-copy or role-specific reserve QA before adoption.
