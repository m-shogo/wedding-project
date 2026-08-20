# 2026-08-20 — Rurubu V6 GW photo-bound Event 03

Scope: Rurubu WEDDING only.

Visible problem: GS chronology still separated Event 03 photo from its ordinal/title/copy, leaving a mild timeline-template reading.

Test: rollback-safe GW bound native `03 / ふたり旅 / copy` directly to the existing verified Event 03 photo and kept 02/04 as quiet supporting notes. No new image/card/generated decoration was added.

Expected improvement: stronger photo-led chronology and clearer major/minor editorial rhythm.

Regression risk: white copy can fail contrast; enlarged ordinals can wrap or collide; overlay can reduce replaceability if the photo-safe region is not rechecked.

Failure: first pass wrapped `03` vertically because the existing text box was too narrow. Fixed by widening the native text box before re-review.

Evidence: whole/read/actual-size PASS; actual-size right page `1987:28 / 794×1123`; visible text collisions 0; 18px safe-area risks 0; existing image hashes preserved.

Decision: ADOPTED. GW `1987:2` preferred; GS `1981:2` hidden rollback.

Next application: continue auditing V6 for chronology/photo roles that are semantically related but only spatially adjacent. Do not overlay copy on photography when contrast or variable-copy tolerance is weak.
