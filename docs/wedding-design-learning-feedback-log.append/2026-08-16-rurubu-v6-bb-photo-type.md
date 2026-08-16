# 2026-08-16 — Rurubu V6 BB photo-type comparison

Scope: Rurubu WEDDING only
State: `BB_PREFERRED / VERIFIED_LOCAL / V7_HOLD / NOT_PRINT_READY`

## Visible problem

BA solved the Q&A page hierarchy, but its large dining-memory hero remained visibly soft at actual size even though the source passed the intrinsic/display dimension gate.

This meant the remaining defect was the **photo source quality/type**, not Q&A geometry.

## Bounded test

BB `1415:2` was duplicated from BA with exactly one material change:

- keep `PHOTO / QA_MEMORY_HERO_REPLACEABLE` at `465×480`;
- swap only its existing Figma IMAGE fill to the verified travel-flatlay hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- source intrinsic `944×608`;
- all questions, answers, closing copy, support photo, positions and text boxes unchanged.

No new generation, Drive save, external upload, card, shadow, gradient or decorative asset was introduced.

## Expected improvement

- sharper actual-size rendering;
- stronger travel-magazine semantics through camera/map/travel objects;
- retain BA's proven interview hierarchy and replacement-safe image role.

## Regression risk

- travel-flatlay could feel less personal than a meal-memory image;
- dummy image repetition across the study could become visible;
- a sharper source could still be a worse editorial fit.

## Evidence

Whole spread / thumbnail:

- 500 px: PASS.

Actual Q&A page:

- `794×1123`: PASS;
- BB is visibly sharper and more travel-editorial than BA dining dummy.

Structure:

- hero display `465×480`;
- intrinsic `944×608`;
- within intrinsic: PASS;
- native text geometry unchanged;
- text collision `0`;
- 18 px safe-area risk `0`;
- replaceable role preserved.

Dynamic copy:

- BA proof `1412:2 / QA_EVIDENCE / V6_BA_LONG_ANSWER_STRESS_2026_08_16` remains applicable because BB changed image fill only.

## Decision

- BB adopted as current preferred Profile/Q&A study.
- BA preserved as hidden rollback.
- AZ remains preferred Story/chronology.
- Start Here: `V5 FU/FX · V6 P + BB/AZ INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle truth

- generated: `0`
- new Drive save: `0`
- new binary placement: `0`
- existing verified Figma image hash reused: `YES`
- adopted after visual inspection: `YES`
- visually verified at whole + actual scale: `YES`
- generated decoration adopted: `NO`
- V7 changed: `NO`.

## Takeaway

Passing intrinsic dimensions does not guarantee a photo is visually strong enough. Actual-size perceptual sharpness and semantic fit remain separate adoption gates.
