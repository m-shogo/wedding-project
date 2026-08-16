# 2026-08-17 — Rurubu V6 W + BZ/BY

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Observation
After comparing current W + BW/BX at whole-item, reading and actual-size scales, chronology was no longer the weakest area. Story BX remained visibly too quiet/template-like in its lower half, and after Story was strengthened, Q&A BW became the next weakest because Q04–Q06 and the lower support photo still felt disconnected.

## Hypothesis
The problem was not missing ornament. Both pages already had valid native copy and replaceable images, but their secondary photography was too weak to act as a page-level anchor.

## Story bounded test — BX → BY
Promoted existing support photography rather than generating or adding a card system. Story support-2 became a `515×350` second feature, support-1 remained intrinsic-safe at `238×216`, and native Japanese copy was compressed into a narrower right editorial column.

Initial failures caught before adoption:
- support-1 first width `246` exceeded source width `240`;
- one native-text collision between Story anchors.

Both were repaired before promotion.

Verified result:
- 500px whole: PASS
- 1200px reading: PASS
- 794×1123 actual Story: PASS
- native text 11
- replaceable images 3
- collision 0
- 18px safe risk 0
- all visible photos intrinsic-safe

Adopted: BY `1510:2` / Story `1510:3`.
Rollback: BX `1508:2` hidden.

## Q&A bounded test — BW → BZ
After BY promotion, BW Q&A was re-reviewed. Without adding any new decoration, the existing lower support photo was promoted from `355×298` to `430×330`; Q05/Q06 remain native text in the left complementary field.

Verified result:
- 500px whole: PASS
- 1200px reading: PASS
- 794×1123 actual Q&A: PASS
- native text 25
- replaceable images 2
- collision 0
- 18px safe risk 0
- hero `465×480 / 944×608` intrinsic-safe
- support `430×330 / 732×498` intrinsic-safe

Adopted: BZ `1514:2` / Q&A `1514:38`.
Rollback: BW `1502:2` hidden.

## Asset state
- new image generation: 0
- new Drive save: 0
- external binary placement: 0
- new raster bytes: 0
- existing verified replaceable photography recomposed: YES
- native editable text preserved: YES
- V7 touched: NO

## Learning
`RSL-055`: when semantic structure is sound but a print page still feels templated or under-anchored, test promoting an already legitimate intrinsic-safe secondary photograph into a real page-level feature before inventing another card, badge or decorative layer.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; not cross-item verified.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BZ-BY-SECONDARY-PHOTO-ANCHOR-QA-2026-08-17.md`.