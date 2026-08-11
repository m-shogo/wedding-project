# 2026-08-11 — Rurubu WEDDING BO/BP feedback

Scope: Rurubu WEDDING only.

## Experiment 1 — BO pasted lead-feature cover
- Visible problem: BM still used too much lower-left paper area, so the front read partly as a hero with a large content panel rather than an energetic travel-magazine cover.
- Principle tested: shrink and rotate the lead feature paper, expose more photography, keep supporting stories photo-led and unequal, and repair over-photo contrast without adding another container.
- Expected improvement: stronger full-bleed travel-photo silhouette, less card/UI feeling, more authentic pasted-editorial hierarchy.
- Regression risk: number/title collision and reduced readability against photography.
- Evidence: live Figma outer `776:2`, front `776:131`, back `776:3`; whole outer, front actual-size, and back actual-size screenshots reviewed; first structure QA found two feature-number/title intersections and final QA returned `0`; visible native text `37`; visible IMAGE fills `8`; fold `776:183` at x `792.7`.
- Additional repair: `BACK_VISUAL_FRIENDS_TITLE / 776:12` changed from low-contrast dark over-photo text to white with a restrained dark shadow after visual QA.
- Result: `ADOPTED_AS_BEST_STRUCTURE_CANDIDATE`, not Current. Cover raster quality remains below target.
- Next application: retain this photo/caption hierarchy; do not add more cover cards. Validate it with the exact Q60 cover derivative before any promotion.

## Experiment 2 — BP dense Memory Spots inside spread
- Visible problem: BN left a large pale-blue dead zone at the bottom of Memory Spots and used an overly tall yellow common-point field on the profile page.
- Principle tested: compress the common-point field into a flatter tape, enlarge the lead memory photo, stagger support photography more tightly, and spend the lower page on captions instead of decorative whitespace.
- Expected improvement: denser-but-readable Japanese travel-magazine pacing with a stronger dominant/support photo ratio.
- Regression risk: rotated support photos covering captions and UI-like decorative symbols surviving after the layout changes.
- Evidence: live Figma inside `777:2`, left `777:3`, right `777:130`; whole-spread and right-page actual-size screenshots reviewed; first screenshot caught support-story 02 being squeezed/partly covered, then repaired; stray map pin hidden because it read as UI chrome; final structure QA `0` text intersections; native text `53`; IMAGE fills `6`; fold `777:281` at x `792.7`; all six accepted image hashes preserved.
- Result: `ADOPTED_AS_BEST_INSIDE_STRUCTURE_CANDIDATE`, not Current.
- Next application: preserve this tighter photographic density and avoid re-introducing broad empty color fields or decorative pins without information value.

## Asset lifecycle feedback
- Q60 cover derivative fresh Drive readback succeeded: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, `155,439` bytes.
- Exact runtime materialization SHA-256 reverified as `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.
- A fresh Figma single-use upload URL was obtained, but the raw JPEG POST failed before upload because `mcp.figma.com` could not be resolved by this runtime. No placement occurred and the same external path was not repeated.
- Generated this run: `NO`.
- Adopted generated asset this run: `NO`.
- Q60 placed in Figma: `NO`.
- BO/BP placed and visually verified: `YES`.

## Reusable feedback
1. Large flat paper fields can remain UI-like even without radius or shadow; turning them into smaller, slightly rotated pasted matter can materially improve magazine recognition.
2. Dense editorial composition is not achieved by filling space indiscriminately. The useful move is to allocate formerly dead space to image/caption relationships while preserving one dominant photo.
3. Actual-size screenshot review must precede acceptance of rotated support-photo clusters; structural bounding-box QA alone will not reveal a caption hidden by image z-order.
4. Decorative map pins or icons should be removed when they do not carry information; genre decoration is not a substitute for editorial meaning.
5. Raster quality and layout quality remain independent gates. BO is structurally stronger while its current hero raster is still visibly inadequate.

Status: `VERIFIED_FEEDBACK / BO_OUTER_BEST_STRUCTURE / BP_INSIDE_BEST_STRUCTURE / Q60_STILL_UNPLACED / CURRENT_UNCHANGED / V5_GATE_OPEN / V6_NOT_STARTED`
