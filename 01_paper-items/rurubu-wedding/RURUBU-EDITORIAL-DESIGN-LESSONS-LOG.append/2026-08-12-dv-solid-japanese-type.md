## LESSON-DV — Prefer solid Japanese type over effect-dependent headline contrast

**Date:** 2026-08-12

**Context:** V5 outer DV `996:2` vs DU `992:2`.

**Observed failure:** DU's composition was strong, but its main Japanese headline relied on white fill plus a dark outline. The effect survived technically yet read as applied decoration rather than authoritative print typography.

**General editorial principle:** Before using outline or shadow, test whether the headline can be carried by native scale, weight, solid color, image contrast, and placement. Effect removal should improve the silhouette at thumbnail scale and remain legible at actual size.

**Design change:** DV kept DU photography and layout intact, changed `横浜 / ふたり旅。` to solid deep navy with no stroke, and removed the masthead drop shadow.

**Verification:** thumbnail, whole-reading, and actual-size front all passed; `37` visible native text nodes, `7` IMAGE fills, `0` text intersections, no <18px text safe-area risks, fold preserved. Review `997:2` promoted; DU rollback `993:2` hidden and preserved.

**Regression risk:** Solid dark type can fail on dark or busy photography. Never remove effects without contrast review across all three scales.

**Asset caution:** No image lifecycle status changed; Q60 exact placement remains open.

**Status:** TESTED
