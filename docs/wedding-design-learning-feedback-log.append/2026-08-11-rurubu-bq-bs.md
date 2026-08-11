# 2026-08-11 — Rurubu WEDDING BQ/BS feedback

Scope: Rurubu WEDDING only.

## BQ — profile/Q&A editorial hierarchy
- Visible problem: BP lower-left still read partly as an equal-weight Q&A/form grid.
- Principle tested: elevate one existing factual answer into a native pull quote, keep Q2/Q3 secondary, and reduce the common-point field to a small angled print tape rather than another card.
- Expected improvement: stronger profile-story pacing and less dashboard/form geometry.
- Regression risk: awkward Japanese wrapping and over-decoration around the new pull quote.
- Evidence: live Figma `783:282`, left `783:283`; whole spread + actual-size left reviewed; first common-point wrap was rejected/repaired; final `53` visible native text, `6` IMAGE fills, `0` same-parent text intersections, fold `783:561` at x `792.7`; all six accepted image hashes preserved.
- Result: `ADOPTED_AS_BEST_INSIDE_STRUCTURE_CANDIDATE / NOT_CURRENT`.
- Next application: when factual interview content is present, vary editorial prominence rather than giving every Q&A equal module weight.

## BR — attractive but wrong destination role
- Visible problem: BO cover raster softness tempted substitution with a sharper accepted coast image.
- Principle tested: bounded dominant photo + overlapping pasted stories.
- Evidence: live Figma `785:2` whole-spread comparison.
- Result: `REJECTED`. The sharper coast image did not satisfy the Yokohama cover role. A visually stronger but semantically wrong photograph is not progress.

## BS — bounded Yokohama cover
- Visible problem: BO stretches the soft Yokohama sunset over the full `1122.5` page height; the lower feature area also retained excess blank paper.
- Principle tested: bound the correct Yokohama hero to `793.7 × 820`, overlap the feature matter at the photo/paper boundary, use original native `旅するWEDDING` masthead text instead of the legacy image masthead in the clean-room, compact feature 01, and restore only a restrained print footer rule/microtype.
- Expected improvement: lower interpolation damage, stronger print-magazine silhouette, less protected-logo dependence, and less dead lower-left paper.
- Regression risk: the existing hero raster can still be visibly soft even when bounded.
- Evidence: live Figma `787:2`, front `787:131`; whole spread and actual-size front reviewed; final `39` visible native text, `7` IMAGE fills, `0` same-parent text intersections, fold `787:184` at x `792.7`; bounded hero `787:133` retains hash `539c259be8036b481d06b4f76db9a39b407d90e8`.
- Result: `ADOPTED_AS_BEST_OUTER_STRUCTURE_CANDIDATE_PENDING_Q60 / NOT_CURRENT / RASTER_GATE_OPEN`.
- Next application: compare BO vs BS only after the exact same Q60 derivative is placed in both, so source quality does not confound layout judgment.

## Asset lifecycle
- Q60 Drive readback/materialization: `YES` — ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, `155439` bytes, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.
- Different in-plugin route capability: `atob` and `figma.createImage(Uint8Array)` verified in the live Figma plugin runtime; rollback-safe target duplicate created.
- Q60 fully transported/reassembled/placed: `NO`.
- Q60 visual QA in Figma: `NO`.
- Generated this run: `NO`.
- Newly adopted generated asset: `NO`.
- Current outer/inside changed: `NO`.

Status: `BQ_INSIDE_BEST_STRUCTURE / BS_OUTER_BEST_STRUCTURE_PENDING_Q60 / BR_REJECTED / CURRENT_UNCHANGED / V5_GATE_OPEN / V6_NOT_STARTED`.
