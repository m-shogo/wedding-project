# 2026-08-18 — Rurubu V6 AG / DN visual experiment feedback

Scope: Rurubu WEDDING only

## DN — Q&A photo-bound Q04

- Visible problem: Q04 still floated beside the lower memory photo, leaving a clean but template-like cream gap.
- Hypothesis: use the already-valid replaceable photo as the feature anchor instead of adding another card/decorative module.
- Bounded test: widened the existing support photo to `545×372`; shifted only native `04` left to overlap the photo edge; kept question/answer on cream.
- First failure: `04` fell behind the photo because of z-order. Rejected until the ordinal alone was brought to front.
- Expected improvement: stronger photo-led asymmetry and Japanese magazine overlap while preserving copy readability.
- Risk: overlap could hide the ordinal or invade variable copy.
- Evidence: 500px thumbnail, 1200px spread, 794×1123 actual-size Q&A all PASS; text collision 0; 18px text safe-area risk 0; overflow 0.
- Result: `VERIFIED_LOCAL / ADOPTED`; DN `1675:2` preferred, DL `1659:2` hidden rollback.
- Rurubu-specific: exact photo, yellow ordinal, dimensions, coordinates, wording.
- Possible general principle: before adding a new container, test whether an existing valid photo can absorb a nearby high-priority native text cue at its edge.

## AG — back chronology subtraction

- Visible problem: AF lower chronology retained a thin rail and detached `201X — 2026` ghost that made the section read more like a timeline diagram than an editorial back cover.
- Hypothesis: native 01–05 order + major/minor scale + WEDDING terminal already communicate sequence, so redundant scaffolding can be removed.
- Bounded test: hide only the chronology rail and year-range ghost; keep photos/copy/order unchanged.
- Structural finding: two inherited 1px text contacts around milestone 05 / `2026.02.11 入籍`; corrected by a 6px nudge before adoption.
- Expected improvement: reduce UI residue without losing information-magazine energy.
- Risk: subtraction could make the lower third too quiet or ambiguous.
- Evidence: 500px thumbnail, 1200px spread, 794×1123 back cover PASS; text collision 0; 18px text safe-area risk 0.
- Result: `VERIFIED_LOCAL / ADOPTED`; AG `1676:2` preferred, AF `1655:2` hidden rollback.
- Rurubu-specific: chronology geometry, colors, dates/copy, photo choices.
- Possible general principle: once hierarchy itself carries order, remove redundant rails/ambient metadata instead of preserving diagram scaffolding by habit.

Final live state after the experiments: `V6 AG + DN/DM · V7 HOLD · NOT_PRINT_READY`.
