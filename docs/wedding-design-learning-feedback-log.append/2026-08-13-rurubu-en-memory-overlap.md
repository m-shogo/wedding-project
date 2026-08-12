# Wedding design learning feedback — Rurubu EN memory overlap

Scope: Rurubu WEDDING only.

## Problem
EL's Memory Spots still had a residual `large + stacked-right-column` layout signal.

## Capability tested
A dominant photographic field can carry more editorial energy than adding decoration. Support images should overlap at materially unequal scale when hierarchy differs.

## Expected improvement
Stronger first impression at thumbnail scale, clearer `01 → 02 → 03` reading, and less dashboard/card rhythm while retaining editable native text and replaceable image roles.

## Regression risks observed
Support captions can collide with adjacent photographs; direct-on-image caption contrast may fail; near-bottom caption blocks can pass parent-local checks while colliding with a folio owned by another parent.

## Evidence and result
EN `1098:2` passed 500px whole, 1000px reading, and `794×1123` actual-size right-page review after correction. Final QA: 53 visible native text nodes, six IMAGE fills, zero absolute text intersections, zero bounded safe-area risks, fold preserved. Adopted and promoted to final Review snapshot `1106:2`.

## Reuse rule
For print/editorial work, supplement local structure checks with absolute rendered-geometry checks around folios, folds and trim-adjacent captions. Prefer one restrained flat paper caption over a rounded/shadowed card when contrast alone is the defect.