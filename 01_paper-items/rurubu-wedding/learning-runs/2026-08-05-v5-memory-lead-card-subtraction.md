# V5 MEMORY SPOTS lead-card subtraction

Date: 2026-08-05
Scope: Rurubu WEDDING V5 only
Status: `PROTOTYPED → VERIFIED / ADOPTED IN LIVE V5 / PHOTO_ROLE_PASS_UNCHANGED`

## Source

- Live Figma frame `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
- Semantic image node `77:430 / IA_MEMORY_1_PHOTO`
- Project-wide quality-over-legacy and subtraction-first rules
- Current V5 evidence ledger and live screenshot QA

## Visible problem

The lead MEMORY SPOTS module was enclosed by a large pale-pink rectangle (`77:429 / IA_MEMORY_1_CARD`) and the photograph carried a large drop shadow. At whole-page scale this read as a dashboard/card component rather than an editorial travel-magazine feature. The container also created unnecessary visual competition with the history lead image above it.

## Hypothesis

Removing the non-semantic card background and photo shadow, while preserving the semantic image, native text, numbering, title, body, crop, position, and rollback state, would make the module read as a direct editorial composition on the page rather than a floating UI card.

## Expected improvement

- reduce Web/UI card styling
- increase continuity between the page background and the MEMORY SPOTS story
- preserve the lead photograph as the dominant element
- create quieter spacing without adding decoration

## Possible regression

- the title/body grouping could become unclear without the pink field
- the lead module could lose visual weight relative to the two small memory modules
- the image edge could become difficult to distinguish from the page background

## Change

- `77:429 / IA_MEMORY_1_CARD`: `visible true → false`
- `77:430 / IA_MEMORY_1_PHOTO`: removed drop-shadow effects
- preserved image fill, semantic node name, node size `398 × 214`, position, crop, and image hash `8344d95d228f3ca6661d2dbd06220353d265a540`
- preserved all native text and neighboring modules
- no nodes deleted; rollback remains immediate

## Evidence and QA

### Whole-item / thumbnail

The inside spread remains balanced. The right page has less blocky card geometry and the MEMORY SPOTS area reads as part of the editorial page rather than a separate application panel.

### Reading/page scale

Reading order remains:

`MEMORY SPOTS heading → lead photograph → 01 number/title → body → small memory modules`

The lead photograph and its title remain visually grouped by proximity and alignment even without the background card.

### Detail / actual-size plausibility

- no text clipping or overflow
- no exposed mask or missing background hole
- no image-edge loss
- no semantic-node deletion
- no crop or image-hash change
- no native-text conversion
- rollback V4 frames remain untouched

## Result

`ADOPTED` for the current V5 candidate. The subtraction improved editorial integration without the predicted grouping regression.

This is not a photo-source repair. The current image is still not evidence-closed against its intended Drive source, so `PHOTO_ROLE_PASS`, `intended_source_applied`, and the V6 start gate remain unchanged.

## Failed asset-transfer attempt in the same run

A role-sized `944 × 608` JPEG derivative was created from verified Drive master `1bBiAcFfHJ3-Ns1gAKn6Bct-q-w2p-AvD` for `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`. Figma produced a valid single-use upload endpoint, but the execution container again failed DNS resolution for `mcp.figma.com`. Because this is the repeated blocker, the external POST route is not retried further. No image node or ledger count was changed by that failed transport attempt.

## Next application

Prioritize a binary-safe connector-native or editor-native image placement path for Batch A. Do not continue broad decoration subtraction merely to create activity. When the intended lead-memory image is eventually placed, rerun crop, contrast, grouping, and three-scale QA because the new source may change the need for containment.
