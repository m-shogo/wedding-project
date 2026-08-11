# 2026-08-12 — Rurubu DE dense editorial feedback

## Visible problem
CY inside was photo-led and structurally sound, but its lower Q&A still felt like a clean profile worksheet rather than a dense Japanese travel-information magazine article.

## Principle tested
Strengthen editorial rhythm with **one section-defining bar + deliberately unequal type scale + compact colored micro-rules**, not additional cards, rounded modules, shadows, or decorative filler.

## Expected improvement
The reader should identify Q1 as the article's dominant human-interest answer immediately, then scan Q2/Q3 as secondary notes. The spread should remain dense-but-readable at whole-item, page, and actual-size scales.

## Regression risk
Larger Q1 and tighter Q2/Q3 can create print-scale text collisions or over-compression. Actual-size review and same-parent intersection checks are mandatory after the change.

## Evidence / result
- Adopted candidate: DE `894:2`
- Review snapshot: `897:2`
- Left page: `894:3`; right page: `894:132`
- 54 visible native text nodes
- 6 preserved production IMAGE fills
- 0 same-parent text intersections
- Fold `894:283`: `2 × 1122.5` at x `792.7000122070312`
- Whole spread, reading scale, and actual-size left page visually verified
- CY preserved as hidden Review rollback and moved from Working to Studies

## Rejected experiment
DC outer `891:2` tested a larger, tilted photo-overlap treatment. It made the weak proxy raster more visibly soft at actual size and worsened destination-copy wrapping, so it was rejected and moved to Studies rather than promoted.

## Next application
When a photo-led editorial spread still feels too clean, first increase **hierarchy contrast and editorial compression** using existing native rules/type before introducing any new decorative container. Do not use this lesson to hide poor source-photo quality; the cover Q60 binary gate remains separate and unresolved.
