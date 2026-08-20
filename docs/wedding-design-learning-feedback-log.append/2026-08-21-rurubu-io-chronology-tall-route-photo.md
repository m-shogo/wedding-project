# Rurubu WEDDING feedback — IO chronology tall-route-photo

Date: 2026-08-21
Scope: Rurubu WEDDING V6 only

## Visible problem

After common-scale comparison, IL's chronology right page remained visually weaker than the rest of the preferred set. The page was readable but the lower half felt like labels arranged around a route rail, with too little photographic mass between the upper hero and 05/06 terminal.

## Principle tested

Before adding a new image/module, increase the editorial role of an already-legitimate mid-sequence image and rebalance the route around it.

## Expected improvement

A stronger 01→03→05→06 reading path, more Japanese travel-magazine continuity, and less dashboard/list feeling without additional decoration or asset complexity.

## Regression risk

A larger image could crowd native event text, create false event-photo implication, or expose low source fidelity. Date/title spacing and safe-area therefore needed fresh structure QA.

## Bounded experiment

- IL `2085:2` duplicated to IO `2095:18`.
- Story left unchanged.
- Existing event-3 image enlarged to approximately `411×390`.
- Functional rail and 05/06 terminal rhythm tightened.
- No new asset/hash/Drive save/upload/card/shadow/gradient.
- Initial absolute-bounds QA found four small text overlaps; candidate was corrected before promotion.

## Evidence

- 500px whole spread: PASS and stronger than IL.
- 1400px reading spread: PASS.
- actual-size chronology right `2095:44 / 794×1123`: PASS.
- final text intersections: `0`.
- final 18px text safe-area risks: `0`.
- visible native text across spread: `39`.
- visible IMAGE fills across spread: `6`.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

IO `2095:18` is preferred. IL `2085:2` is hidden rollback.

## Next application

Re-run common-scale comparison across `ID + IK + IO + IH + IN + IM`. Do not iterate IO merely because it is newest; select the next weakest spread by whole-item visual evidence. Keep final-photo/copy stress and printer/PDF gates separate from dummy-design QA.
