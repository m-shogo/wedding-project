# 2026-08-19 — Rurubu V6 EP Cafe/Table feedback

Scope: Rurubu WEDDING only.

## Observation

EL Cafe/Table had a strong dominant dining photograph, but the lower-right travel-object photo still read as a separate medium image card. Across the six preferred V6 spreads this was one of the clearest remaining modular/template cues.

## Hypothesis

The support image was atmosphere rather than essential evidence. Giving it a full card-sized role created more module hierarchy than its semantic importance justified. But removing it entirely could make the page too quiet for the intended travel-information-magazine energy.

## Bounded experiment

1. Photo removed; role rebuilt as native `04` typography only. Result: cleaner but too quiet. `REJECTED`.
2. Same verified photo restored as a small angled support thumbnail attached to the native `04` feature. Result: stronger dominant/support hierarchy and better editorial density. `VERIFIED_LOCAL`.
3. Actual-size QA caught a small unintended photo/title contact; title/body moved down and rechecked before promotion.

## Evidence

- promoted Figma: EP `1796:2`
- actual Table page: `1796:29`, 794×1123 PASS
- 500px whole PASS
- 1200px reading PASS
- native Table text 22
- text collisions 0
- 18px safe-area risk 0
- old EL `1789:2` hidden rollback
- Drive root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- image generation / Drive save / binary placement / new hash: all 0

## Adopted result

EP is preferred. The dining hero remains dominant; the travel-object image is now only a small replaceable support element; `04` is carried by native Japanese typography.

## Regression risk

- removing too much imagery can reduce the deliberate density expected from a Japanese travel-information magazine;
- rotating a support photo can occlude native copy even when the composition looks energetic at thumbnail scale;
- support photography should not be retained merely because it already exists.

## Next application

Continue six-spread same-scale review. For any remaining photo card that feels modular, first determine whether it is evidence, dominant/support photography, or atmosphere. Test responsibility reduction before generating another asset or adding containment.
