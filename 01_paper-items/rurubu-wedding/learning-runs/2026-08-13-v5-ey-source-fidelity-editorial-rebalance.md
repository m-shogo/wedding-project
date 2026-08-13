# Rurubu WEDDING V5 — EY source-fidelity editorial rebalance

Date: 2026-08-13
Scope: Rurubu WEDDING only

## Visible problem

EX improved the composition, but actual-size review still showed two weaknesses: low-resolution proxy imagery was carrying too much printed area, especially on the back, and the front retained a poster-like two-layer split between the cream headline field and the photography. Enlarging a weak source further would not be selected from scratch.

## Principle / capability tested

Source fidelity before scale. Editorial energy should come from photo-size contrast, asymmetric overlap, native Japanese typography, and compact information clusters rather than stretching a weak raster source or adding containers.

## Expected improvement

- sharper actual-size perception
- stronger Japanese travel-magazine rhythm
- less wedding-brochure / landing-page silhouette
- clearer distinction between dominant atmosphere, supporting travel snapshots, and compact chronology

## Regression risk

Reducing a large photo can weaken raw photo impact or create dead cream space. Moving direct type onto photography can also reduce contrast. The candidate therefore required thumbnail, whole-item, and actual-size verification before promotion.

## Experiment

Created safe duplicate `1153:2 / V5_OUTER_EY_SOURCE_FIDELITY_EDITORIAL_REBALANCE_2026_08_13` without touching Current.

Back cover:
- reduced the oversized coastal memory field to a bounded `793.7×530` role
- rebuilt the lower half around two deliberately different photo sizes (`438×278` and `350×236`) with restrained rotation
- compacted the chronology into a 3×2 travel-log field
- retained direct type and thin rules instead of new cards, shadows, or gradients

Front cover:
- retained a ratio-appropriate wide hero instead of returning to a tall stretched proxy
- kept large native `横浜` and the sharp `ふたり旅。` print strap
- retained the exact verified Yokohama Q60 derivative as a bounded destination postcard
- used a large 01, overlapping 02 photo, and direct 03 treatment to create hierarchy from scale rather than repeated modules

## Rejected / repaired states

The first EY render was not accepted. Actual-size / structure QA exposed:
- friend-caption background strips left at stale legacy positions
- back title/subtitle overlap
- front masthead too close to the 18px safe area
- masthead / `横浜` text-box intersection
- subcopy / feature-number intersections
- subtitle/taxonomy visually mixing with the print strap

All were corrected before promotion. Subcopy was moved onto the hero sky as direct deep-navy native text rather than adding another label container.

## Evidence

- 500px whole-item thumbnail: PASS
- whole-item reading scale: PASS
- actual-size front (~794×1123): PASS
- actual-size back (~794×1123): PASS
- visible native text: 35
- visible IMAGE fills: 7
- absolute text intersections: 0
- bounded 18px safe-area risks: 0
- fold: x=792.7 / width=2

## Asset evidence

Fresh Drive readback was performed for both the V5-01 master and accepted role derivative.

- master Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- master file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- master MIME: `image/jpeg`
- accepted derivative Drive ID: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`
- EY Working Figma node: `1155:189`
- EY Working image hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`
- EY geometry: `292×267` bounded destination postcard

This closes only the secondary destination-anchor provenance. The dominant Q60 master is still not exact in Figma and must not be reported as complete.

## Adoption

ADOPTED.

- production study: `1153:2`
- Working: `1155:2`
- Review: `1155:192`
- Start Here preview: `1155:382`
- Best Inside remains EO (`1107:285`, Review `1111:188`)
- EX Working / Review / Start Here copies are hidden rollback evidence, not deleted
- Current `77:18 / 77:290` remains untouched

## Next application

When an image source is not strong enough for a dominant printed role, cap its scale first. Build magazine energy with crop discipline, varied photo scale, overlap, Japanese typography, and editorial rules before adding decoration or enlarging the raster. Dominant V5-01 Q60 exact provenance and final V5 print/asset reconciliation remain open.
