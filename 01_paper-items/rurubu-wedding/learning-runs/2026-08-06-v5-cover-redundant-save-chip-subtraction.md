# V5 cover redundant save-chip subtraction

Date: 2026-08-06
Item/version: Rurubu WEDDING V5
Live Figma page: `01_RURUBU_WEDDING`
Current frame: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

## Source

- Live whole-item screenshot before and after the change
- Project-wide quality-over-legacy and subtraction-first rules
- Current V5 authority and rollback requirements

## Visible problem

A small yellow chip below the cover hero repeated the ideas already communicated by the cover issue label, the main feature heading, and the six-item contents module. It added another pill-shaped UI cue immediately above the contents block and competed with the hero photograph without adding necessary reading information.

Target:
- `77:251 / RURUBU/Chip/Yellow`
- text inside instance: `全6特集・保存版`

## Hypothesis

Hiding the redundant chip would reduce badge density, make the transition from hero photograph to contents cleaner, and strengthen print-editorial hierarchy without changing factual content, photo crop, native text, semantic photo roles, or page structure.

## Expected improvement

- fewer competing micro-labels near the dominant photograph
- less Web/UI chip language
- cleaner hero-to-contents transition
- greater visual authority for the main photo and the numbered contents block

## Possible regression

The lower edge of the hero could feel under-annotated or the contents block could appear detached. Adoption required whole-item, reading-scale, and detail-scale screenshot checks.

## Experiment

Non-destructive live change:
- `77:251`: `visible: true → false`

The instance was not deleted and remains available for immediate rollback. No other nodes were mutated.

## Evidence and QA

### Whole-item / thumbnail

PASS. The cover silhouette remains balanced. The hero image and numbered feature index read more directly, and removal does not create an obvious empty hole.

### Reading / page scale

PASS. Reading order remains:
`logo/date → main feature heading → hero image and three cover lines → cover caption → numbered contents`.
The removed chip duplicated rather than carried essential information.

### Detail / actual-size plausibility

PASS. No text reflow, overlap, crop change, image clipping, mask exposure, or fold/safe-area regression was observed.

### Structure and rollback

- native text preserved
- semantic photo nodes unchanged
- image fills and hashes unchanged
- V4 rollback frames remain preserved
- node `77:251` remains in the file with `visible=false`

## Result

`PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

The improvement is local evidence, not a universal rule that all chips must be removed. A badge remains justified only when it adds distinct editorial meaning or navigation.

## Failure

None in the bounded change. The dominant-image provenance/quality blocker remains unresolved; this change does not count toward `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, V5 completion, or the V6 start gate.

## Next application

Return priority to the binary-safe placement and evidence closure of Batch A dominant images. Until that path is available, continue only bounded editorial corrections with screenshot and rollback evidence; do not repeat failed manual base64 or external POST methods.
