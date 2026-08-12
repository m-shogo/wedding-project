## 2026-08-12 — Rurubu DV solid Japanese headline

### Visible problem
DU's outer composition was strong, but the white `横浜 / ふたり旅。` headline with dark outline still looked processed at thumbnail scale and less like print-native Japanese editorial typography.

### Principle tested
Solve headline contrast with scale, weight, solid color, placement, and image selection before applying outlines or shadows.

### Experiment / evidence
DV `996:2` duplicated DU without changing photos/crops. Main native headline `996:143` became solid deep navy with no stroke, and the masthead's generic drop shadow was removed. No new containers or generated assets were added.

Three-scale QA passed: 500px thumbnail, 1400px whole spread, and natural-size front `794 × 1123`. Structure remained `37` visible native text nodes, `7` IMAGE fills, `0` same-parent text intersections, no visible text inside the <18px safety threshold, and fold `996:184` preserved.

### Result
DV was selected over DU and promoted as Review outer `997:2`; DU `993:2` remains hidden rollback. Start Here now reads `DV outer / DF inside`. Current remains unchanged.

### Regression risk
Solid dark type only works when the image provides a stable light field. Do not remove outlines mechanically without actual-size contrast QA.

### Asset-state caution
No image generation or placement occurred. Existing hero hash `539c259...` remains visual reuse only; exact Q60 Drive provenance is still open.

### Next application
When editorial work starts to feel synthetic, audit typographic effects before adding decoration. Prefer native solid Japanese type where the photograph itself supplies contrast.

Status: `VERIFIED_COMPARATOR_LEARNING / DV_ADOPTED / CURRENT_UNCHANGED / Q60_EXACT_PLACEMENT_OPEN`
