# 2026-08-12 — DZ editorial interview / glyph-fit lesson

## Visible problem
DY's lower-left Q&A retained too much even/module rhythm for a travel-magazine interview feature. The first DZ pass improved hierarchy but a structure-only fix then created a hidden visual defect: the large native `01` wrapped inside an undersized fixed text box.

## Principle / capability
- Build interview hierarchy with scale and typography before containment.
- Prefer one large issue number + one pull quote + compressed secondary questions over three equal modules.
- Preserve facts and native text; alter hierarchy, not content.
- Run rendered glyph-fit QA after resizing large text boxes; collision count alone is insufficient.

## Expected improvement
A more immediate `1 + 2 + micro` reading path, less dashboard/form feeling, stronger Japanese editorial cadence at thumbnail and actual print scale.

## Regression risk
Large numerals and Japanese display type can wrap, clip, or visually cross adjacent content without triggering sibling text-box intersection checks.

## Evidence
- source DY `1012:2`
- adopted DZ `1019:2`
- rejected overflow Review `1020:2` hidden
- corrected Best Review `1021:2`
- final visible native text `53`
- final IMAGE fills `6`
- same-parent text intersections `0`
- fold guide `1019:283` at x `792.7`, width `2`, height `1122.5`
- all six accepted production image hashes preserved
- three-scale render QA: 500px whole, 1200px reading, ~804×1123 actual-size left

## Adopted / rejected
ADOPTED: corrected DZ as strongest inside comparator.
REJECTED: pre-fix DZ Review snapshot with wrapped `01`.
Current production frame remains unchanged.

## Next application
For cover-line numerals, section numbers, vertical labels, rotated captions, and dense Japanese headings, add a glyph-fit screenshot check after any text-box resize. Use structure QA and screenshot QA as complementary gates rather than substitutes.
