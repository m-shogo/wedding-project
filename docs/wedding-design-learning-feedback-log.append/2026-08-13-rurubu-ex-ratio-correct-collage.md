# Rurubu EX design feedback — ratio before scale

## Visible problem
EV had stronger hierarchy than legacy Current, but its dominant proxy was enlarged into a tall page field and became visibly blocky at actual size. A separate authority drift also existed: Start Here said EV/EO while Review still showed EU/EO and Working had no EV.

## Principle tested
For print/editorial work, source-resolution and crop plausibility are part of composition. A low-resolution or role-specific image should not be made visually dominant merely because it fills more area. Preserve the asset, restore a plausible aspect ratio, and rebuild energy through unequal photo sizes, overlap, native Japanese typography and restrained editorial rules.

## Expected improvement
EX should read faster as a Japanese travel-information cover while looking less diffusion-like and less poster/UI-like at actual size. The exact-Q60 Yokohama postcard supplies destination specificity; the ratio-correct wide photo supplies atmosphere; the street photo creates a full-bleed lower field.

## Regression risks checked
- headline legibility on cream paper
- support-photo z-order against full-bleed street image
- text collisions across nested parents
- 18px page-edge safe area
- fold position
- exact Q60 secondary image hash
- preservation of Current and EO

## Evidence / result
EW full-page collage was visually rejected for pixelation at 794×1123. EX was repaired after actual-size review, then passed 500px thumbnail, 1000px whole-item and 794×1123 front review. Final EX: 35 visible native text nodes, 7 visible image fills, 0 absolute text intersections, 0 bounded safe-area risks, fold x=792.7/w=2. EX Working is `1149:2`; Review Best Outer is `1149:192`; EO remains Best Inside.

Status: **ADOPTED — EX**. Current `77:18 / 77:290` untouched. Dominant Q60 master provenance remains open; no new external binary was placed.

## Next application
Before regenerating or enlarging an image, compare its source aspect/resolution with the intended print role. If scale is causing the artifact, redesign the hierarchy first; use generation only when the remaining visual role genuinely needs a new master.