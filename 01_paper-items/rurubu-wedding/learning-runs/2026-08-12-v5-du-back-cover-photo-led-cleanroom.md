# Rurubu V5 — DU back-cover photo-led clean-room comparator

Date: 2026-08-12
Scope: Rurubu WEDDING V5 only

## Visible problem

DT `982:2` was the strongest outer comparator, but its back cover still read as one large hero followed by a tidy lower strip. The front had strong photo-substrate travel-magazine energy while the back remained comparatively template-like. DT therefore was not the strongest whole-item choice from scratch once both outer faces were judged together.

## Principle / capability tested

Rebuild the back cover from dominant photography, unequal photo scale, intentional overlap, native Japanese headline hierarchy, compact captions, and a staggered travel-log rhythm. Preserve the strong DT front exactly; do not add generic cards, rounded modules, shadows, or gradients.

## Safe experiment

- Preserved DT `982:2` unchanged.
- Duplicated it into DU `992:2` on `05_RURUBU_WORKING`.
- Front `992:131` remained compositionally unchanged from DT.
- Back `992:3` was rebuilt as `BACK_COVER_DU_PHOTO_LED_TRAVEL_LOG`.
- Main memory photograph `992:6` became a full-width `793.7 × 620` photographic substrate.
- Native title `992:124` was enlarged and aligned into the photo rather than a separate panel.
- Friend photos `992:18` and `992:22` became an unequal overlapping pair (`520 × 300`, -1.6° / `320 × 224`, +2.2°).
- Existing hidden caption backgrounds were reused as slim square-corner print caption strips instead of introducing new card geometry.
- `ふたりの旅年表` and six timeline entries were re-spaced into a staggered editorial rhythm.

## Rejected intermediate state

The first DU pass left both friend captions below the photographs, creating a weak transition into the timeline and making the collage look unfinished at actual size. That state was rejected. Existing caption background nodes were converted into narrow semi-transparent navy strips directly attached to the photography, after which the actual-size back cover was rechecked.

## Expected improvement

- stronger whole-item travel-magazine recognition, not only a strong front cover
- more intentional photo dominance and overlap on the back
- less web/template silhouette
- denser but still readable print-native rhythm

## Regression risk

- overlapping friend photos can become scrapbook-like if rotation or borders are pushed further
- caption strips can become UI labels if enlarged or repeated indiscriminately
- back-cover density must not compete with the front cover's primary destination hierarchy

## Verification evidence

Three-scale visual QA:

- 500px whole-item thumbnail: PASS; DU selected over DT for whole-item balance.
- 1400px whole spread reading scale: PASS.
- Back cover `992:3` at natural `794 × 1123` actual-size/detail scale: PASS after caption repair.

Structure QA:

- visible native text: `37`
- visible IMAGE fills: `7`
- same-parent text intersections: `0`
- fold guide `992:184`: `x=792.7000122070312`, `2 × 1122.5`
- front hero `992:133`: image hash `539c259be8036b481d06b4f76db9a39b407d90e8`, `793.7 × 650`

Promotion/readback:

- Review snapshot: `993:2 / BEST OUTER — DU — source 992:2`
- DT Review `987:2` retained hidden as rollback.
- Start Here: `DU outer / DF inside`.
- Current outer `77:18` and inside `77:290` remain untouched.

## Asset lifecycle truth

Fresh Drive readback still verifies Q60 master `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, `155439` bytes. The official `upload_assets` flow successfully issued a fresh single-use upload URL targeting `982:133`, but byte POST remained blocked by DNS resolution of `mcp.figma.com`. No external binary was placed.

The live DU/DT Yokohama hero hash `539c259...` is visually verified reuse already present in Figma; it is also the registered V5-05 history derivative hash in the asset ledger. It is **not** evidence of exact Q60 Drive binary placement. Current cover hero `77:148` remains hash `e58ddfa...` and V5-01 remains incomplete.

## Adopted / rejected status

**DU ADOPTED AS BEST OUTER COMPARATOR.** DT remains rollback/comparison evidence.

## Next application

Keep DU as the visual comparator while closing the exact Q60 Drive → Figma node/hash chain by a genuinely binary-safe transport path. Do not call V5 complete until that asset lifecycle and the final print/fold/safe-area/ledger gate are verified.

Status: `DU_VERIFIED_AND_PROMOTED / CURRENT_UNCHANGED / Q60_EXACT_FIGMA_PLACEMENT_OPEN / V5_NOT_COMPLETE / V6_NOT_STARTED`
