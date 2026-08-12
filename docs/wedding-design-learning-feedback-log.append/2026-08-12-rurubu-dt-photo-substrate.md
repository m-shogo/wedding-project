## 2026-08-12 — Rurubu DT photo-substrate clean-room hierarchy

### Visible problem
Outer comparator DS was improved but still read as a photograph followed by stacked feature modules. It would not be selected from scratch.

### Principle tested
For travel-magazine covers, let the dominant photograph become the page substrate and derive hierarchy from native Japanese typography, unequal photo scale, overlap, and thin editorial rules before considering any container.

### Experiment / evidence
A rollback-safe clean-room DT `982:2` was built from preserved DS `977:2`. The Yokohama hero was extended to 650px high, the 82px native `横浜 / ふたり旅。` hierarchy was strengthened, feature 01 became an oversized direct-type spine, feature 02 was compressed into a cyan-rule caption family, and feature 03 became a large asymmetric street-photo anchor. No new cards, shadows, rounded modules, or gradients were added.

Intermediate states with crowded feature-02 text and a weak feature-03 dead zone were rejected before promotion. Final QA: thumbnail / whole-reading / actual-size PASS; visible native text `37`; IMAGE fills `7`; same-parent text intersections `0`; fold guide `2 × 1122.5` at `x=792.7000122070312`.

### Result
DT was selected over DS and promoted as the Review outer comparator (`987:2`, source `982:2`). DS Review `979:2` remains hidden rollback. Current Rurubu frames were not changed.

### Regression risk
Photo-substrate layout can become a poster or scrapbook if every support image is rotated or if headline contrast is not reviewed at actual size. This is a compositional lesson, not a rule to maximize overlap.

### Asset-state caution
The visually reused Figma Yokohama image is not evidence that the exact Q60 Drive master/derivative lifecycle is closed. Fresh Drive readback still verifies master ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` (`155439` bytes) and 240×220 derivative `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` (`10284` bytes), but exact Drive→Figma placement remains open.

### Next application
Use photo-as-substrate selectively where the dominant image has enough crop and text-safe structure. Preserve native text, semantic image roles, provenance, fold evidence, and comparison frames.

Status: `VERIFIED_COMPARATOR_LEARNING / DT_ADOPTED / CURRENT_UNCHANGED / Q60_EXACT_PLACEMENT_OPEN`
