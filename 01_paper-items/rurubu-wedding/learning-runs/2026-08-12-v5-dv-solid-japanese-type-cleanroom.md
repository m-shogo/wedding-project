# Rurubu V5 — DV solid Japanese type clean-room comparator

Date: 2026-08-12
Scope: Rurubu WEDDING V5 only

## Visible problem
DU `992:2` improved the whole outer spread, but the front headline `横浜 / ふたり旅。` still relied on white fill plus dark outline. At thumbnail and actual size the outline read as an applied graphic effect rather than strong Japanese magazine typography.

## Principle tested
Prefer type weight, scale, color, and photographic contrast over outline/shadow effects. A travel-magazine headline should survive thumbnail reading as typography, not as an effect treatment.

## Safe experiment
- Preserved DU unchanged.
- Duplicated DU to DV `996:2`.
- Kept the DU photo-led back cover and all photography/crops unchanged.
- Changed native headline `996:143` to solid deep navy and removed strokes.
- Removed the generic drop shadow from masthead `996:183`.
- Added no cards, rounded shapes, shadows, gradients, or generated assets.

## Expected improvement
- less synthetic/clip-art headline feel
- stronger Japanese editorial recognition
- cleaner hierarchy against the Yokohama sunset
- better print plausibility

## Regression risk
A solid dark headline can lose contrast on darker photography; it therefore requires actual-size and thumbnail checks rather than automatic outline removal.

## Verification evidence
- 500px whole-item thumbnail: PASS and selected over DU.
- 1400px whole-reading: PASS.
- Front `996:131` at natural `794 × 1123`: PASS.
- visible native text `37`; visible IMAGE fills `7`; same-parent text intersections `0`.
- no text safe-area risk below 18px.
- fold `996:184`: `x=792.7000122070312`, `2 × 1122.5`.
- headline `996:143`: solid deep navy, no strokes, no effects.

## Promotion
- Review `997:2 / BEST OUTER — DV — source 996:2`.
- DU Review `993:2` retained hidden as rollback.
- Start Here updated to `DV outer / DF inside`.
- Current outer `77:18` / inside `77:290` remain unchanged.

## Asset truth
No image was generated or newly placed. DV keeps the existing visually verified hero hash `539c259be8036b481d06b4f76db9a39b407d90e8`; this is not exact Q60 provenance. Q60 exact Drive→Figma placement remains open.

## Status
**DV ADOPTED AS BEST OUTER COMPARATOR.**

Status: `DV_VERIFIED_AND_PROMOTED / CURRENT_UNCHANGED / Q60_EXACT_PLACEMENT_OPEN / V5_NOT_COMPLETE / V6_NOT_STARTED`
