# 2026-08-20 — Rurubu V6 GB minor milestone readability

Scope: Rurubu WEDDING only.

Visible problem: Outer FO's back-cover chronology had strong major milestones, but 02/04 were too close to microtext at actual size and weakened the intended reading rhythm.

Principle tested: preserve unequal hierarchy while keeping subordinate native information genuinely readable at print scale.

Bounded change: rollback-safe FO duplicate; only 02/04 numeral, year, title sizes and local positions changed. No image, masthead, crop, factual content or other spread changed.

Expected improvement: clearer `01 → 02 → 03 → 04 → 05 → 06` reading without returning to a uniform timeline UI.

Regression risk: secondary milestones could become too strong and flatten the hierarchy.

Evidence: 1200px whole PASS; back actual-size 794×1123 PASS; collision 0 after one rejected intermediate contact; 18px safe-area risk 0; new images/hashes/Drive writes 0.

Adopted: GB `1929:2`.
Rollback preserved: FO `1891:18` hidden.

Next application: when a deliberately minor beat is technically present but nearly disappears at actual size, adjust its native visual mass before adding cards, rails or decorative containers.
