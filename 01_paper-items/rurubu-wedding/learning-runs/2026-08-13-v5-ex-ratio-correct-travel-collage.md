# V5 EX — ratio-correct travel collage clean-room run

Date: 2026-08-13
Scope: Rurubu WEDDING only. Current `77:18 / 77:290` was not edited.

## Visible problem

EV was stronger than Current at thumbnail scale, but actual-size inspection showed the history-photo proxy had been enlarged into a near full-page field far beyond its native editorial role. The resulting blockiness made the cover feel synthetic and undermined the destination-magazine look. Review and Working were also stale: Start Here said EV/EO while Review still exposed EU/EO and Working contained no EV.

## Principle / capability tested

Use a safe clean-room duplicate and fix hierarchy before generating another asset. Preserve accepted hashes, keep the exact-Q60 Yokohama derivative as the factual destination anchor, return the proxy hero to a ratio-correct wide crop, then build the page from cream editorial paper + large Japanese type + unequal photo scale + intentional overlap + a full-bleed lower travel field. No rounded cards, generic shadow, gradient or dashboard grid was added.

## Experiments

- EW `1145:2`: full-page hero collage. Rejected for promotion after 794×1123 review exposed obvious pixelation/blocking from vertically stretching the proxy. Its structure defects were also repaired before comparison; the redundant kicker was subtracted rather than adding another container.
- EX production study `1147:2`: ratio-correct wide hero strip, large exact-Q60 Yokohama postcard, overlap support photo, lower full-bleed street field.
- EX Working `1149:2`: verified copy with hashes preserved.
- EX Review `1149:192`: promoted Best Outer after final comparison.

## Actual-size repair

The first EX actual-size render exposed two visual defects that structural collision checks did not explain: white `ふたり旅。` disappeared on cream, and the support photo sat under the lower street field. The existing thin rule was repurposed as one sharp magenta print strap and the support photo was moved above the street field in z-order while keeping its cyan caption above the photo. This improved legibility without adding new UI geometry.

## Final evidence

- 500px thumbnail: PASS
- whole-item 1000px: PASS
- actual-size front 794×1123: PASS
- visible native text: 35
- visible IMAGE fills: 7
- absolute text intersections: 0
- bounded 18px safe-area risks: 0
- fold: `x=792.7`, width `2`
- exact Q60 secondary image hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`
- dominant proxy hash retained only as a bounded wide role: `539c259be8036b481d06b4f76db9a39b407d90e8`

## Asset / regression status

Q60 master Drive ID remains `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` (JPEG, 155,439 bytes). A fresh official Figma upload target was issued for the safe EW hero, but POST stopped before mutation because `mcp.figma.com` could not resolve. The failure was not retried. No external binary was newly placed in this run.

The exact secondary Q60 derivative remains proven in EX. The dominant master is still not exact in Figma, so V5 remains incomplete and V6 production remains blocked.

## Next application

When a source image is the bottleneck, do not solve it by scaling it harder. First restore a plausible print crop/aspect ratio, move destination truth into a verified factual anchor, and use typography/photo overlap to recover editorial energy. Only the remaining dominant-master provenance gate should trigger another binary bridge attempt.