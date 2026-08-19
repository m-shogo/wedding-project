# RSL-127 — Reader-facing metadata must carry enough visual mass to create editorial density

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

Rurubu V6 Cafe/Table had useful reader-facing Cafe metadata, but all four facts were compressed into one 10px block. At same-scale review against the other preferred V6 spreads, the large travel-texture field therefore read as decorative empty space rather than useful travel-guide density.

Fingerprint: `READER_INFO_MICROTEXT_FAILS_TO_CARRY_EDITORIAL_DENSITY`.

## Root-cause hypothesis

Information can be semantically correct yet visually unable to perform its editorial role when its type mass falls below the surrounding hierarchy. In that condition, adding another card/photo/decorative module treats the symptom and risks making the page more UI-like. Promoting the existing native information may solve the density problem with less structural cost.

## Bounded test

On a rollback-safe FJ Cafe/Table duplicate, then on the known FJ node for deterministic screenshot QA:

- keep all photography, crops, image hashes, composed travel texture, main Cafe title, lower 02 feature and Table page unchanged;
- keep the existing reader-facing facts unchanged;
- split the 10px four-line block into four 13.5px native text items;
- add one small local native kicker;
- reuse the existing cyan rule as a binder;
- add no cards, gradients, shadows, generated assets, photos, raster bytes or image hashes;
- compare 500px whole, 1200px reading and Cafe actual-size 794×1123;
- run absolute text-collision, 18px safe-area, parent-containment and image-role geometry checks.

## Expected improvement

Make the Cafe field read as useful travel-guide information rather than decorative texture, while preserving the dominant Japanese headline, lower 02 feature, editability and photo replaceability.

## Regression risk

- a regular metadata arrangement can become a dashboard/grid;
- promoted microcopy can compete with the main headline;
- the right-side cluster can violate print safe area;
- new labels can feel like production notes if they are not reader-facing.

## Evidence

Figma FN `1866:2`, Cafe page `1866:3`:

- whole / thumbnail 500px: PASS;
- reading scale 1200px: PASS;
- actual-size 794×1123: PASS;
- absolute native-text collisions: `0`;
- 18px text safe-area risks: `0`;
- page-level stray Cafe-info nodes: `0`;
- visible Cafe IMAGE roles: `2`;
- composed texture geometry: `720×448`, unchanged;
- replaceable Cafe-view photo: `238×218`, unchanged;
- new image hashes: `0`.

Source FJ state is preserved hidden as `ROLLBACK / V6_INSIDE_FJ_CAFE_TABLE_PRE_READER_INFO_CLUSTER_2026_08_19`.

The first cluster was not adopted: the Cafe title contacted the new kicker. One approximate downward move still contacted because the real title bounding box extended farther than the apparent local geometry. The method then changed from approximate nudging to exact absolute-bounding-box measurement before another correction. After that, two right-safe-area risks were detected and only those two metadata items were shifted left. Final gates passed.

GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FN-CAFE-READER-INFO-CLUSTER-QA-2026-08-19.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fn-cafe-reader-info-cluster.md`.
Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## What must remain Rurubu-specific

Cafe vocabulary, magenta/cyan treatment, exact font sizes, coordinates, travel-texture use, page role and Rurubu travel-guide art direction are Rurubu-specific. Do not transplant the cluster layout or visual styling into another wedding item.

## Cross-item applicability

Candidate principle only: when a print/editorial field already contains useful reader-facing metadata but still feels decorative or under-filled, test whether the same native information needs more visual mass before adding another card, photo or decoration. Validate actual-size collision, safe area and whether the larger information remains subordinate to the true headline.
