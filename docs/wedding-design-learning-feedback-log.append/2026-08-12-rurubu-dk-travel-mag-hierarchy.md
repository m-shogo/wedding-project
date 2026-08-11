# 2026-08-12 — Rurubu DK travel-magazine hierarchy

## Visible problem
A full-bleed photo alone did not guarantee a magazine-like cover. DJ still carried a poster-like headline treatment and its lower support-photo/type relationship broke at actual size.

## Principle tested
For Japanese travel-magazine energy, hierarchy should come from materially different type scales, direct type on photography, thin editorial rails, uneven photo sizes, and one bounded paper fragment — not from additional rounded cards or broad color panels.

## Expected improvement
Stronger recognition at thumbnail scale, more print-native density at reading scale, and better editorial rhythm at actual size without adding UI geometry.

## Regression risk
Large Japanese type can wrap unexpectedly; small direct-on-photo text can lose contrast; tilted images can create collisions near the trim/fold area.

## Evidence
DK `945:2` passed 500px thumbnail, whole-spread reading, and 794x1123 actual-size front review after one rejected state. Structure QA returned 39 visible native text nodes, 7 visible image fills, 0 same-parent text intersections, and preserved fold guide `945:190`.

## Status
ADOPTED as best outer comparator. Concurrent live `939:2` / `942:2` were compared before promotion and retained only as studies. DF `899:2` remains best inside comparator.

## Next application
When a photo is already strong, improve hierarchy before adding more assets. Use large native Japanese type and unequal photo scale first; introduce a color field only when it has a specific editorial function.