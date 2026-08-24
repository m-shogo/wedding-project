# Rurubu V7 G6 Memory/Guide — Japanese line-break QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2`

## Live authority readback before write

- V6 control remained frozen: `JC + IX + JB + IZ + IT + JA`.
- V7 live set before this test: `C8 2381:2 + K2 2391:2 + F3 2387:2 + G5 2418:2 + H7 2407:2 + C6D 2413:2`.
- V8 comparison remained `AV2 2347:2 + AW4 2391:50 + AL3 2388:2 + AQ4 2396:2 + AS5 2407:25 + AT4 2409:37`.
- All 12 roots were read from live page `2052:2` before mutation.

## New professional research → local hypothesis

Morisawa's Japanese-typesetting material describes typography as an interface for editorial meaning: typeface/size/arrangement distinguish headings, body, captions and related information rather than acting as decoration. Its current educational material likewise treats Japanese spacing and composition as reader-facing decisions, while its magazine-like examples emphasize high jump ratios and deliberate text mass rather than mechanical UI containment.

Rurubu-specific hypothesis: in a compact numbered travel-guide module, an accidental break inside a short semantic unit such as `時間。` is a typographic defect even when the text box technically fits. First correct measure/scale/alignment inside the existing editorial system; do not add a card, badge, or decorative patch to hide the problem.

## Observation

G5 `2418:2`, Guide 01 body `2418:18`:

- characters: `青い海と、\nゆっくり流れる時間。`
- x `930`, width `190`, font `22 px`
- live 1400px screenshot rendered the second line as `ゆっくり流れる時` followed by `間。` on a third line.

The content string itself was correct. The defect was composition/measure, not factual copy.

## Bounded rollback-safe test

Created G6 `2421:2` from live G5 and preserved G5 as hidden rollback `2418:2 / x=300000 / visible=false`.

First attempt: body `22 → 20 px`, width unchanged `190`. Screenshot still split `時間。`; rejected immediately.

Second attempt: `19 px`, x `920`, width `200`. Screenshot fixed the Japanese semantic break but structure QA found a 7px text intersection with the large `01` numeral; rejected as an intermediate state.

Final correction:

- node `2421:18`
- font `19 px`
- x `927`
- width `193`
- copy unchanged
- other typography, photography, crop, palette, numbering and composition unchanged.

This keeps the Guide 01 body aligned with the existing 19px Guide 02/03 body system and renders `ゆっくり流れる時間。` as one intact line without colliding with the numeral or image field.

## Three-scale / structure QA

- whole-item 500px: PASS
- reading 1400px: PASS
- actual-size 1587×1123: PASS
- visible native text: `20`
- visible IMAGE fills: `6`
- final text-text intersections: `0`
- current V7/V8 root overlap: `0`
- photography remains structural dummy; no real-photo claim.

## Professional critique

- Art director: no loss of V7 high-energy publication identity.
- Editorial designer: Guide 01 now scans as one coherent numbered information unit.
- Book designer: spread tempo and left/right pacing unchanged.
- Typographer: accidental split of the semantic unit `時間。` removed; body scale now matches neighboring guide-body roles.
- Photo editor: no source/crop change; real-photo gate remains blocked.
- Print designer: no new trim/fold claim; printer/template/proof gates remain separate.

## Failure learning

Normalized fingerprint: `F-RSL-261-JAPANESE-SEMANTIC-UNIT-BREAK-SURVIVES-FIRST-SCALE-ONLY-FIX`.

State: `VERIFIED_LOCAL`.

Lesson: do not treat a technically fitting Japanese text box as typographically correct. When a short meaningful unit is split awkwardly, test line measure, scale and alignment together. A scale-only correction can fail visually; a width correction can introduce a collision. Require screenshot + structure readback after each materially different correction.

Do not transfer G6's exact `19 px / x927 / 193 px` geometry as a rule.

## Asset / truth state

- image generation `0`
- Drive writes `0`
- new Drive masters `0`
- imageHash changes `0`
- factual copy changes `0`
- V6 changes `0`
- V8 production changes `0`

Current live V7 comparison set after verification: `C8 + K2 + F3 + G6 + H7 + C6D`.
