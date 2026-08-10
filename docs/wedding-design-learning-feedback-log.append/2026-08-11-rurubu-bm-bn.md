# 2026-08-11 — Rurubu WEDDING BM/BN feedback

Scope: Rurubu WEDDING only.

## Experiment 1 — BM photo-collage cover
- Visible problem: BJ retained too much hero+feature-block logic and the lower cream field felt interface-like.
- Principle tested: subtract card fields, reduce the cream interruption, use one dominant destination image plus two unequal rotated supporting photos, and let story numbers behave like magazine captions.
- Expected improvement: stronger travel-magazine thumbnail recognition, more asymmetry, less dashboard/card feeling.
- Regression risk: rotated caption collisions and text legibility on photography.
- Evidence: live Figma `771:2`, front `771:131`; whole-spread, page, and actual-size screenshot review completed; final same-parent intersections `0`; fold x `792.7`; 37 native visible text nodes; 8 visible IMAGE fills.
- Result: ADOPTED as current best outer structure candidate, not promoted to Current.
- Next application: keep this photo/caption hierarchy, but do not promote until the Q60 cover master is successfully placed and visually rechecked at actual size.

## Experiment 2 — BN profile editorial page
- Visible problem: BK left page still read partly as a questionnaire with images above it rather than one continuous editorial profile page.
- Principle tested: enlarge and overlap profile photography, use names/details as captions, preserve asymmetric Q1 vs Q2/Q3 rhythm, and close with one flat yellow common-point strip instead of cards or shadows.
- Expected improvement: stronger photo-first recognition and more print-native editorial pacing.
- Regression risk: profile copy collision, identity confusion, and excessive decorative emphasis.
- Evidence: live Figma `772:2`, left `772:3`; whole-spread and actual-size screenshot review completed; final same-parent intersections `0`; fold x `792.7`; 53 native visible text nodes; 6 visible IMAGE fills; all previously verified image hashes preserved.
- Result: ADOPTED as current best inside structure candidate, not promoted to Current.
- Next application: refine only optical spacing/crop if evidence shows a concrete defect; do not add more UI modules.

## Asset lifecycle feedback
- Q60 Drive master re-read succeeded: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes.
- A fresh Figma upload URL was obtained for BM hero `771:133`.
- Binary POST failed before upload because `mcp.figma.com` DNS resolution failed from the runtime; no placement or mutation occurred.
- Generated this run: NO.
- Adopted generated image this run: NO.
- Q60 placed: NO.
- BM/BN placed and visually verified: YES.

## Project-level reusable feedback
1. Photo overlap is more effective than extra badges/cards when a magazine spread still feels like a UI.
2. A large paper field can become a de facto card even without rounded corners; shrinking it often improves the editorial silhouette immediately.
3. Existing high-confidence in-file assets may support safe structural experiments during transport failure, but must never be described as successful master placement.
4. At actual size, raster quality can become the limiting defect even after hierarchy is structurally strong; asset quality and layout quality must be scored separately.
5. Every rotated editorial recomposition should be followed by both screenshot review and programmatic intersection QA.

Status: `VERIFIED_FEEDBACK / BM_OUTER_BEST_STRUCTURE / BN_INSIDE_BEST_STRUCTURE / Q60_STILL_UNPLACED / CURRENT_UNCHANGED`
