# 2026-08-17 — Rurubu V6 AA + CX/CY native-text resilience

Scope: Rurubu WEDDING only.

## Observation

AA/CW/CQ had already passed screenshot, safe-area and raster QA, but the newly available shared-learning audit method found multiple variable/factual native text roles still stored in fixed-height boxes.

The visible composition was not the defect; future editing resilience was.

## Hypothesis

Targeted auto-height plus native structural stacking for dependent text pairs can preserve the chosen Rurubu composition while making final Japanese copy safer to edit.

## Test

Rollback-safe clones:

- CW → CX `1601:2`;
- CQ → CY `1601:81`.

Converted targeted Profile values, Q04, Story body/deck and chronology event semantic copy to native height-following behavior. Q04 question/answer and Event 01–06 title/copy pairs were given native vertical auto-layout relationships.

## Failure / correction

The first stress deliberately exposed three failure classes:

- a decorative Profile pullquote was incorrectly treated as unlimited variable copy;
- Q04 auto-height question expanded into its absolute-positioned answer;
- chronology titles expanded into their absolute-positioned copy.

The first proofs were rejected. The pullquote returned to a bounded display contract; dependent pairs were converted into native vertical stacks.

## Verified result

Second realistic-copy stress passed:

- Profile collision `0`;
- Q&A collision `0`;
- Story collision `0`;
- chronology collision `0`;
- 18px safe-area risk `0` across all four pages.

Current-copy visual QA remained stable:

- CX whole `500×354` PASS;
- CX reading `1200×849` PASS;
- CX Profile/Q&A actual-size `794×1123` PASS;
- CY whole `500×354` PASS;
- CY reading `1200×849` PASS;
- CY Story/chronology actual-size `794×1123` PASS.

## Promotion

Current preferred:

- Outer AA `1592:2` unchanged;
- Profile/Q&A CX `1601:2`;
- Story/chronology CY `1601:81`.

Rollback:

- CW `1593:2` hidden;
- CQ `1569:2` hidden;
- failed first stress proofs hidden;
- passing second stress proofs hidden after screenshot evidence.

Start Here:

`V5 FU/FX · V6 AA + CX/CY INSIDE STUDIES · V7 HOLD`

## Asset truth

- generated `0`;
- adopted generated assets `0`;
- new Drive saves `0`;
- external binary placements `0`;
- new raster bytes `0`;
- image hashes changed `0`;
- active raster roles `25`, unchanged and intrinsic-safe;
- native editability strengthened `YES`;
- V7 touched `NO`.

## Learning

`RSL-076 / VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Do not equate screenshot correctness with editability correctness. Also do not bulk-convert all display text: classify roles, keep genuine display text bounded, and structurally couple dependent variable copy before long-copy stress.

## Next Rurubu use

Keep AA + CX/CY as the V6 dummy-design preferred set. Continue visual comparison as one magazine, but do not undo the new native-text resilience. Final personal copy must still receive a fresh actual-size stress pass before print-ready status.