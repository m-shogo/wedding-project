# V5 profile raster travel-icon strip subtraction

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current frame: `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

## Source authorities reviewed

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/project-memory.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- live V5 inside-spread screenshot and node inspection

## Visible problem

A low-resolution raster strip of small pastel travel icons sat directly beside the primary heading `OUR PROFILE / ABOUT US`. At whole-spread and reading scale it created a fuzzy secondary focal point, weakened the clean headline silhouette, and added decorative density without carrying factual, navigational, or semantic value.

Target node:

- `77:333 / DECOR_SMALL_TRAVEL_ICONS_PROFILE`
- type: `RECTANGLE`
- size: `240 × 35`
- prior opacity: approximately `0.88`

## Legacy-independent decision

Asked whether this strip would be chosen for a clean-room version if it did not already exist. The answer was no: the heading, accent rule, profile labels, and native camera icon already provide sufficient identity and rhythm. Keeping the raster strip only because it existed would violate quality-over-legacy and subtraction-first rules.

## Hypothesis

Hiding the raster strip would:

- strengthen the primary heading silhouette;
- remove a visibly soft/AI-stock-like decorative detail;
- increase quiet space around the heading;
- preserve all factual content and reading order;
- reduce UI/template decoration without requiring replacement artwork.

## Possible regression

The top profile area could become too empty or lose travel atmosphere. Adoption therefore required whole-spread, page/reading, and detail review after the bounded change.

## Change

Rollback-safe live Figma mutation:

- `77:333.visible: true → false`

The node was not deleted. No text, photo, crop, frame hierarchy, semantic role, fold guide, or rollback frame was changed.

## Verification

### Whole-item / thumbnail scale

Post-change screenshot shows a cleaner left-page headline silhouette and less competition with the profile photographs. The page still balances against the strong `OUR HISTORY` heading on the right.

### Reading / page scale

Reading order remains:

`OUR PROFILE / ABOUT US → profile introductions → 3 QUESTIONS → shared points → TRAVEL NOTE`.

The native camera icon and microcopy remain, so the travel/profile context is not lost.

### Detail / actual-size plausibility

No text reflow, collision, clipping, mask exposure, or empty-card artifact appeared. The removed raster strip no longer introduces fuzzy edges near the largest heading.

### Structure audit

- mutated node: `77:333`
- node retained and hidden for rollback
- native text nodes: `94`
- visible text nodes: `65`
- IMAGE-fill nodes in the inside candidate: `9`
- fold guide preserved: `77:540`, visible
- V4 rollback references preserved: `59:2`, `59:178`

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / PROJECT_RULE_NOT_PROMOTED`

This is a bounded editorial subtraction, not an asset-provenance repair. It does not change `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, the V5 completion gate, or the V6 start gate.

## Failure / lesson

A decorative image can be technically present and visually colorful while still reducing quality. Small raster icon strips adjacent to a dominant heading should be rejected when they are soft, non-semantic, and duplicate atmosphere already supplied by native editorial elements.

## Next application

Return priority to the incomplete dominant-photo evidence chain. Do not continue broad decorative subtraction unless a concrete visible defect is identified. For Batch A, use a binary-safe Figma placement route and close each role with Drive ID → node ID → image hash → screenshot QA → structure QA → ledger update.
