# 2026-08-19 — Rurubu V6 EL Cafe second-feature

Scope: Rurubu WEDDING only.

Observed: Cafe/Table EF was safe but visually quieter than the other V6 spreads. The lower view photo and text read like a placed module rather than a deliberate editorial beat.

Hypothesis: strengthen the existing source-safe photo role through native-number hierarchy and grouping before adding imagery or containers.

Test 1: move the small view photo right and let it overlap the end of the texture field (`1788:2`). Result: more dead paper and weaker binding. REJECTED / hidden.

Test 2: preserve the `238×218` view photo on the left, add a large native cyan `02`, group the existing native title/copy/check information as a second feature (`1789:2`). Initial structure QA found one 18px overlap between `02` and the title; corrected before promotion.

Result: EL is stronger than EF at 500px thumbnail, 1200px reading scale, and 794×1123 actual-size Cafe page. Final left page has 17 visible native text nodes, collision 0, 18px safe-area risk 0. Table page is unchanged and remains collision/safe-risk 0.

Adopted: `1789:2 / PREFERRED / V6_INSIDE_EL_CAFE_NUMBERED_SECOND_FEATURE_2026_08_19`.
Rollback: EF `1734:2` hidden.

No image generation, Drive write, binary placement, source/hash change, or V7 edit occurred.
