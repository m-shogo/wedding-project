# RSL-091 — Practical travel information can replace a generic closing card without losing hierarchy

Date: 2026-08-18
Source scope: Rurubu WEDDING V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

The new Memory Spots middle feature fixed the missing destination-information editorial role, but its right-page closing area still used one large deep-navy rectangle. The page was structurally sound, yet that final module read closer to a generic website/card closure than compact travel-guide utility information.

## ROOT_CAUSE_HYPOTHESIS

A print travel feature can gain authenticity from small, scanable practical/editorial metadata rather than another large containment field. When the closing block has no physical or binding job that requires a full box, a thin rule plus one purposeful category marker and native metadata can carry hierarchy with less UI-like mass.

## TESTED_LOCAL

Rollback-safe DR `1689:2` was cloned from DQ and only the right-page closing role was changed:

- 744×138 navy field reduced to one 744×5 rule;
- one small yellow `CHECK!` marker added;
- native closing copy converted into a compact `4つの景色、4つの楽しみ方。` guide summary;
- native metadata lists `BEST TIME / MOOD / PHOTO / CAFE / NIGHT / TABLE`;
- photo geometry/hashes and all four replaceable image roles were unchanged;
- no generated asset, new Drive file, external binary placement or new raster hash.

## VERIFIED_LOCAL

- DR whole spread / 1200px: PASS;
- DR right page `1689:24` / 794×1123 actual size: PASS;
- left text collision 0 / 18px safe risk 0;
- right text collision 0 / 18px safe risk 0;
- DR promoted; DQ preserved as hidden rollback.

A lower-dimension remote screenshot path intermittently omitted raster fills and was excluded from visual evidence rather than being misread as a design defect.

## Expected improvement

- denser travel-information reading without a dashboard/card grid;
- stronger distinction between emotional spot storytelling and utility metadata;
- more reward at actual-size inspection while photo hierarchy remains dominant;
- preserves native-editable copy for later factual replacement.

## Regression risk

- metadata can become tiny decorative noise if it is not readable at actual size;
- practical labels must not invent facts or imply geographic accuracy;
- removing a closing field is wrong when that field performs a proven binding, contrast, physical, or accessibility function;
- adding many `CHECK` devices across unrelated spreads would become a template signature.

## Rurubu-specific — MUST NOT transfer literally

Do not transfer the yellow/magenta/navy colors, `CHECK!` wording, Yokohama labels, exact metadata categories, coordinates, four-spot count, photo choices, or layout geometry.

## Cross-item applicability hypothesis

On another print artifact, if a large closing/info container has no proven binding or physical function, independently test whether compact native metadata plus one purposeful marker can improve scanability while reducing UI-like mass. Keep or restore the container if whole-item hierarchy or readability becomes weaker.

## Next receiving-item experiment

Only test this on a materially different print role that already has clear hierarchy and a genuinely informational closing region. Do not add fake practical data merely to imitate a travel magazine.