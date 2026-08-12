# 2026-08-12 — Rurubu DZ editorial interview hierarchy

Scope: Rurubu WEDDING V5 comparator only.

## Observation
A spread can pass geometric collision checks and still fail visually. In DZ, narrowing the oversized `01` text box removed the measured Q1 number/question overlap, but the actual glyphs wrapped inside the too-narrow fixed text box. The second digit appeared lower in the pull-quote zone only in the screenshot.

## Principle tested
For dense print/editorial typography, combine structure checks with rendered actual-size QA. Large issue numbers and Japanese display typography need optical/glyph-fit validation, not only bounding-box intersection tests.

## Expected improvement
Use one strong interview anchor plus compressed secondary questions to create `1 + 2 + micro` rhythm without cards. Large numeric anchors should remain intact at thumbnail and actual-size scales.

## Regression risk
Oversized display numerals can wrap or clip even when no sibling bounding boxes intersect. Narrow secondary columns can also become unreadable if only thumbnail QA is used.

## Evidence / decision
- DY source: `1012:2`
- DZ Working: `1019:2`
- initial DZ structure collision: 1; repaired
- initial Review snapshot: `1020:2`, visually rejected for Q1 numeral overflow and preserved hidden
- corrected Review snapshot: `1021:2`
- corrected DZ: visible native text 53, IMAGE fills 6, same-parent text intersections 0, all six accepted image hashes preserved
- screenshots reviewed at 500px whole, 1200px whole/reading, and ~804×1123 actual-size left page
- adopted: DZ as strongest inside comparator; Current untouched

## Next application
Whenever a display numeral, vertical Japanese heading, rotated caption, or tight label changes size/box geometry, require a rendered glyph-fit check at actual size in addition to structural collision QA. Do not infer text safety from bounding boxes alone.
