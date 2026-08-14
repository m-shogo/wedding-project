# 2026-08-15 — FC photo-rhythm lesson

- Problem: FA lower front retained a wide cyan caption field and repeated the back-cover coast image as a large front support image.
- Principle tested: editorial hierarchy should be solved by photo role/scale/overlap before large containment fields; avoid repeating one source as two major visual anchors in the same physical item.
- Change: FC `1180:2`; street role widened to 500×502.5, Feature 02 kept tilted at 438×326, cyan field reduced to a 252×6 rule, repeated coast replaced by already verified EO Memory 4 (`c09aa82e...`).
- Expected improvement: denser but more legible asymmetry, less Web/card geometry, more destination variety.
- Regression risk: dead cream space and weak 02 caption contrast. An intermediate state exposed too much lower-right cream; geometry was corrected before adoption.
- Evidence: 500px thumbnail PASS; 1000px spread PASS; 794×1123 front PASS; absolute text collision 0; 18px safe-area risk 0; fold unchanged.
- Status: ADOPTED / VERIFIED_LOCAL.
- Next application: V6 clean-room concepts should define image roles first and treat full caption fields as a last resort. Do not inherit FC geometry itself.