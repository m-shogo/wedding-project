# EP — high-energy type without UI containers

Date: 2026-08-13

## Lesson
When a photo-led Rurubu-style cover is already structurally strong, the next useful improvement can come from **scale contrast and overlap**, not another badge/card/background.

EP improved EM by making the Japanese hierarchy more decisive: larger masthead/feature number, stronger `01` reading order, a larger slanted support photo crossing the photographic boundary, and a clearer `03` anchor over the full-bleed street image. Existing accepted image fills were preserved.

## What failed
- Rotating small issue/season microtype vertically created a print-safe regression even though it looked editorial in isolation.
- Enlarging type without absolute-box QA created a masthead/kicker overlap.
- A structurally collision-free `03` could still look cramped at actual size.

## Reusable rule
For dense print-native editorial work, require both:
1. absolute structure checks (collision/safe area/fold), and
2. actual-size rendered glyph-fit/visual-rhythm review.

Do not introduce a new container to solve a hierarchy problem that can be solved by type scale, photo scale, crop, overlap, or subtraction.

## EP evidence
- source EM `1094:2`
- adopted EP `1108:2`
- Review best outer `1111:2`
- final native text `36`
- visible IMAGE fills `6`
- absolute text collision `0`
- bounded 18px safe-area risk `0`
- fold x `792.7000122070312`

## Asset-boundary lesson
A generated upload target is not placement. A Drive file materialized locally is not placement. An atomic Plugin API image rejection is not placement. Q60 remains OPEN until exact Drive provenance, Figma node/image hash, screenshot QA, structure QA, ledger, and Git readback all agree.
