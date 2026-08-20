# 2026-08-20 — Rurubu V6 GU/GV editorial cleanup

Scope: Rurubu WEDDING only.

## Experiment 1 — GU unresolved chronology years

Visible problem: `201x / 202x` looked like unfinished pseudo-facts on the back-cover chronology.

Principle tested: when order is already encoded by native ordinal hierarchy, omit unresolved factual values instead of inventing or displaying semi-real placeholders.

Expected improvement: cleaner back-cover chronology, less mockup residue, no factual invention.

Regression risk: chronology could lose temporal legibility.

Evidence: whole spread PASS; back actual-size 794×1123 PASS; text collision 0; 18px safe-area risk 0.

Decision: ADOPTED. GB preserved hidden rollback.

## Experiment 2 — GV guide metadata

Visible problem: six travel-guide facts were squeezed into one dense 11.5px two-line block.

Principle tested: distribute small reader-facing metadata spatially before creating cards or other containment.

Expected improvement: actual-size scanability while keeping editorial hierarchy subordinate to photography.

Regression risk: a 3×2 arrangement could read as a dashboard grid.

Evidence: first structure QA found three 3px row contacts; row spacing corrected. Whole/reading/actual-size PASS after fix; collision 0; safe-area risk 0.

Decision: ADOPTED. GE preserved hidden rollback.

Generated/adopted/placed distinction: no new generated asset, Drive save, binary placement or image hash occurred in either experiment.
