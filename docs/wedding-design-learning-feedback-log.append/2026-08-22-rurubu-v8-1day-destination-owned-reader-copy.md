# Rurubu V8 1DAY — destination-owned reader copy

Date: 2026-08-22
Scope: Rurubu WEDDING only

## Problem observed

V8 AN had a strong, data-bound 1DAY time axis but still exposed the designer's rationale to the reader. The visible `時刻差を実寸の間隔として配置。` and the larger `時間を読む。余白も読む。` made the right page feel like an information-design prototype rather than a finished Yokohama travel page.

## New professional input

Freshly reviewed D&DEPARTMENT / `d design travel` editorial principles: place-specific character and an honest reader-facing editorial voice should carry a travel guide more than generic or exaggerated travel signalling.

This changed the design decision: rather than adding travel decoration or more graphic energy, the bounded experiment kept the correct time structure and changed only the semantic ownership of the reader-facing text.

## Experiment

- source: AN `2238:106`
- candidate/adopted: AO `2249:2`
- right-page kicker → `横浜 / 一日の流れ`
- right-page headline → `海辺から、夜の食卓まで。`
- note → verified time range and Yokohama walking context
- internal process note hidden
- all time marks/positions retained

## Evidence

- whole 500px: PASS
- reading 1400px: PASS
- actual 1587×1123: PASS
- native text `21`
- IMAGE `0`
- text intersection `0`
- 18px safe risk `0`
- visible process/schema leakage `0`
- parent page `2052:2` PASS

## Adopted / rejected

AO adopted as Current. AN preserved as hidden rollback.

No image generation, Drive write, or image reuse was needed for this defect.

## Learning

`RSL-216 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

A polished page can still feel AI/prototype-like when visible copy explains the design method instead of the article subject. Preserve valid structure, move process rationale into QA evidence, and let destination/experience/content own the publication voice.

Do not generalize this into 'always put the destination in the headline'. Semantic ownership must be supported by the page's actual content.
