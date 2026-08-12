# V5 Inside EO — bottom-right photo hierarchy

Date: 2026-08-13
Scope: Rurubu WEDDING only

## Visible problem
EN's right-page memory section had a strong dominant 01 photo and overlapping 02 portrait, but the bottom-right 03 image remained too small and footer-adjacent, reading as a leftover thumbnail rather than an intentional editorial anchor.

## Principle / capability tested
Increase scale contrast without returning to an even card grid: keep 01 dominant, keep 02 vertical, enlarge 03 into a materially wider landscape anchor. Preserve native text and existing image fills; subtract redundant micro-copy rather than adding another container.

## Experiment
- Source: EN `1098:2`.
- Safe duplicate: EO `1107:285`.
- First EO attempt enlarged/moved 03 too high. Actual-size QA showed the 03 number colliding with the 02 caption; that state was rejected and not promoted.
- Final EO moves 03 lower, keeps it larger than EN, and removes only the redundant 03 city micro-label. 03 title/body remain native text below the photo.

## Evidence
- whole-item thumbnail: EO `1107:285`, 500px render — PASS.
- actual-size right page: `1107:415`, ~795×1123 render — PASS after repair.
- structure QA: visible native text 52; IMAGE fills 6; absolute text intersections 0; bounded 18px safe-area risks 0; provisional fold guide preserved as `1107:567`.
- no new images generated or imported; existing image fills preserved.

## Decision
ADOPT EO as current best inside comparator. Preserve EN as rollback evidence. Outer remains EM.

## Regression risk
The lower-right caption remains intentionally compact. Do not enlarge 03 further unless the footer/folio relationship is reworked at actual size.

## Next application
Use actual-size rendered QA, not collision checks alone, whenever overlapping photo clusters share caption territory. Prefer subtracting redundant micro labels before introducing another paper/card layer.

## Open gate
V5 remains incomplete: Q60 exact Drive → Figma binary/image-hash provenance is still open. This run does not claim Q60 placement or V5 completion.
