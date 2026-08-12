# 2026-08-12 — DY source-aware support-photo crop lesson

## Lesson
In dense Japanese editorial layouts, support-photo aspect ratio is part of hierarchy, not a neutral container choice. Repeating landscape-ish support crops around a dominant landscape photo can turn an otherwise strong magazine page back into a card grid.

## Evidence
- DF `899:2` had a strong dominant memory image, but support 02/03 remained comparatively horizontal and actual-size text placement weakened the separation between lead and secondary stories.
- DY `1012:2` retained the exact accepted image hashes and native/editable text while changing support geometry to a portrait `220×230` inset plus a compact `230×170` lower satellite around a `550×330` lead.
- Thumbnail, reading-scale, and `794×1123` actual-size comparison selected DY.
- Iteration guards caught a clipped enlarged `01`, text collisions, and safe-area drift before promotion.
- Final structure: 53 visible native text nodes, 6 image fills, 0 same-parent text intersections, 0 text safe-area risks under 18px.

## Rule to reuse
Before treating a support image as a module, inspect its useful crop at actual size. Build a large/medium/small photographic hierarchy from materially different proportions, then place native captions in independent reading zones. Do not use same-ratio cards merely because they align more easily.

## Boundaries
This lesson does not override source-resolution limits. A more dramatic crop still loses if the accepted derivative cannot support it at actual size. It also does not imply that portrait crops are always better; the useful source composition and editorial role decide.

## Outcome
DY promoted as best inside comparator (`1012:2`, Review `1016:2`); DF preserved as hidden rollback. Outer remains DV `996:2`. Current unchanged. Q60 exact cover-hero lifecycle remains open, so V5 is not complete and V6 remains gated.