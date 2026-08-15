# Rurubu V7 Hawaii D/A — Ivory Editorial Comparison

Date: 2026-08-15
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / PREFERRED_STUDY / NOT_FINAL_HAWAII_ASSET`

## Visible problem

The prior V7 B/A clean-room direction had improved tropical energy, native-text editability and mask replacement resilience, but the outer cover still read too strongly as a two-color poster: the saturated pink front-page field carried much of the identity, while photography and Japanese headline hierarchy did less of the genre work than the already-verified V6 M/I editorial composition.

Outer C (`1250:2`) first repaired hierarchy by moving the coast hero upward, placing native labels directly on photography, overlapping support photography more aggressively and giving the back page a more continuous photo-led reading path. C materially improved B but still retained a saturated pink front field.

## Root-cause hypothesis

For this travel-magazine role, a large saturated field was functioning like a campaign/poster background. The stronger V6 comparison suggested that a quieter paper-like base would let dominant photography, large Japanese type, asymmetric collage and small native editorial labels carry the travel-magazine identity instead.

This is a hierarchy/palette-role problem, not a request for more decorative Figma micro-geometry.

## Bounded tests

### Outer C — photo-led hierarchy

Source: Outer B `1245:2`.

Created rollback-safe `1250:2` and changed only existing semantic roles:

- increased the back Yokohama image field;
- moved `旅の途中で、ハワイ気分。` onto photography;
- rotated/repositioned existing dining/cafe masks;
- moved front coast hero upward;
- overlapped existing flatlay/cafe masks more strongly;
- kept every final copy native;
- added no new decorative geometry and no new binary asset.

The first C screenshot exposed one native-text collision (`YOKOHAMA → NEXT TRIP` against the large headline); this was corrected before comparison and was not counted as progress until the fresh screenshot passed.

### Inside B — denser comparison

Source: Inside A `1247:2`.

Created `1250:37`, increasing profile/travel photo mass and tightening question/travel clusters. The right page improved, but the left lower-page rhythm remained materially similar to A. Because the gain was insufficient, Inside B was rejected and hidden; A remains preferred.

### Outer D — paper-like base test

Source: corrected Outer C `1250:2`.

Created `1252:2` and changed only the front-page paper field and native headline colors:

- saturated pink page fill -> warm ivory;
- `TRAVEL WEDDING / HAWAII MOOD` -> pink;
- `ハワイ気分で` -> navy;
- `旅する一日。` -> pink;
- photo-overlay labels stayed white;
- geometry, masks, image hashes and native wording did not change.

Expected improvement: reduce poster/landing-page reading while retaining Hawaii energy through Japanese typography and photography.

Regression risk: tropical energy could become too quiet or generic; the ivory could read as empty luxury space if photo hierarchy did not remain strong.

## Visual evidence

Outer D:

- whole spread / 1200 px: PASS and preferred over C;
- thumbnail / 500 px: PASS; headline/photo hierarchy remains legible;
- front actual size / 794×1123: PASS;
- back is unchanged from corrected C; corrected C back actual size / 794×1123: PASS.

Outer C:

- whole spread / 1200 px: PASS after collision correction;
- thumbnail / 500 px: PASS;
- front actual size / 794×1123: PASS;
- back actual size / 794×1123: PASS.

Inside B:

- whole spread / 1200 px: technically PASS but insufficient gain over A; REJECTED.

## Structure evidence

Preferred V7 state after promotion:

- Start Here `845:27`: `V5 FU/FX · V6 M/I · V7 D/A STUDY`;
- Outer D `1252:2`: 20 visible native text nodes, 6 IMAGE roles, 6 named MASK roles, 18px safe-area text risk = 0;
- Inside A `1247:2`: 32 visible native text nodes, 6 IMAGE roles, 6 named MASK roles, 18px safe-area text risk = 0;
- Outer C `1250:2`: hidden rollback/superseded comparison;
- Outer B `1245:2`: hidden older comparison;
- Inside B `1250:37`: hidden rejected comparison.

No image hashes changed between C and D. Existing verified image roles remain replaceable and semantic.

## Drive / asset evidence

Drive root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` was read live.

- `10_GENERATED_MASTERS / 1pkkf4BX3ugKdR1rTkgXdp8xTaNGrQD1p`: empty;
- no acceptable Hawaii-specific photo master was found in the reachable Rurubu Hawaii folders;
- Drive search found older Hawaii/Waikiki line-art images, but both contained baked place/store wording (including ABC STORES / Waikiki-style wording) and were rejected rather than imported into production.

This run therefore produced:

- generated: `0`;
- new Drive master saves: `0`;
- new Figma binary placements: `0`;
- existing verified asset recomposition: `YES`;
- preferred study visual promotion: `YES`;
- final Hawaii asset fidelity: `NO`.

## Decision

`V7 D/A STUDY` is the preferred Hawaii clean-room direction.

It is **not final V7**. The coast image remains mood-only and must not be represented as literal Hawaii. The final dominant Hawaii role still requires an acceptable Hawaii/Oahu-specific master and the full asset lifecycle.

## Next application

When an image-generation capability or owned/licensed Hawaii photo becomes available, do not redesign the page merely because a new image exists. Keep the verified D/A semantic mask architecture, produce/select specifically for the hero role and text-safe crop, then complete Drive master/readback, derivative QA, exact node/hash placement and three-scale comparison against this study.
