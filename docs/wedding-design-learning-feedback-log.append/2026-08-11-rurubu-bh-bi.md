# 2026-08-11 — Rurubu BH/BI visual learning feedback

Scope: Rurubu WEDDING only.

## BH outer
- Visible problem: BF still read partly as a full-width lower feature index after the hero.
- Principle tested: reduce the cream editorial field to a narrow lower-left strip and let destination photography remain visible through the lower-right.
- Expected improvement: stronger photo ownership, larger scale contrast, less web/navigation rhythm.
- Regression risk: 01 number/headline collision; secondary teasers obscuring 03.
- Evidence: `765:2`, front `765:131`; whole-spread + actual-size screenshots; final visible text `39`, image fills `8`, same-parent text intersections `0`, fold `765:180 = 2 × 1122.5`.
- Decision: adopted as strongest outer comparator, not Current.
- Next application: preserve this narrow-strip principle when the verified Q60 hero can be placed; do not expand the strip back into a full footer panel.

## BI inside
- Visible problem: BG history still behaved like a tidy horizontal event row.
- Principle tested: unequal milestone typography and staggered vertical/horizontal positions while keeping the photograph and Memory Spots collage dominant.
- Expected improvement: more print-editorial rhythm and less stepper/timeline UI behavior.
- Regression risk: numerical date wrapping and small text collisions between adjacent milestones.
- Evidence: `765:181`, right `765:308`; first screenshot exposed a wrapped wedding date; structure QA then exposed 7, 3, 1, finally 0 accidental intersections after correction. Final visible text `53`, image fills `6`, fold `765:458 = 2 × 1122.5`.
- Decision: adopted as strongest inside comparator, not Current.
- Next application: use actual bounding-box QA for staggered Japanese editorial timelines; nominal x/y is insufficient.

## Q60 lifecycle truth
- selected: yes
- Drive verified: yes, ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- raw JPEG materialized: yes, 155,439 bytes
- Figma target re-read: BH hero `765:132`, still temporary hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- fresh official upload URL requested: yes
- POST completed: no; DNS failed before upload
- Figma placed: no
- Figma visual QA: no
- in-file Q60/staging audit: no reusable verified Q60 hash found; named Q60 staging still uses the temporary hash

No generated image, transport preparation, or staging state is counted as completed visual progress.
