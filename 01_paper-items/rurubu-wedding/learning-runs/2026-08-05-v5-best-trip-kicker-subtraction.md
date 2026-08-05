# V5 front-cover BEST TRIP kicker subtraction

Date: 2026-08-05
Item/version: Rurubu WEDDING V5
Live frame: `77:145 / FRONT_COVER`
Current outer candidate: `77:18`

## Visible problem

The white `注目! / ふたりの BEST TRIP` module occupied the upper-right of the dominant cover photograph. It repeated the already-established travel/wedding promise carried by the masthead, yellow issue ribbon, three cover lines, and lower hero caption. Its white rectangular containment also increased Web/UI-card feel and removed a calm photographic zone from an already weak/pixelated hero.

## Principle tested

Attempt subtraction before adding or polishing containers. A cover badge survives only when it adds category, navigation, ranking, date, or a distinct editorial promise.

## Hypothesis

Hiding the redundant module would return visible area to the photograph, improve the cover's large-to-small hierarchy, and reduce UI-card density without weakening magazine authenticity.

## Possible regression

The top-right of the hero could become visually empty or the cover could lose a secondary attention cue.

## Safe experiment

Reversibly set `visible = false` on:

- `77:202 / RIGHT_KICKER`
- `77:203 / RIGHT_KICKER_1`
- `77:204 / RIGHT_KICKER_2`

No nodes were deleted. The masthead, date badge, issue ribbon, three colored cover lines, hero caption strip, feature index, native text, semantic hero node, crop geometry, and rollback frames were preserved.

## Verification

### Whole-item / thumbnail scale

The outer-spread screenshot retains a clear front/back distinction and an abundant travel-magazine cover. The front cover now reads masthead → issue ribbon → three cover lines → dominant photograph → lower caption/index without the isolated white card competing at the upper-right.

### Reading / page scale

The front-cover screenshot shows a larger uninterrupted skyline/sky zone and clearer emphasis on the three principal cover lines. The removed module did not contain unique factual or navigational information.

### Detail / actual-size risk

No text clipping, exposed mask edge, empty white hole, or alignment break appeared. The hero remains visually pixelated; this change does not count as photo-role repair.

### Structure QA

- `77:202`, `77:203`, `77:204`: present and hidden
- `77:148 / IMG_HERO`: preserved and visible
- hero image hash preserved: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- V4 rollback frames preserved: `59:2`, `59:178`
- native text and semantic structure preserved

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / REVERSIBLE`

The subtraction improves hierarchy and returns photographic breathing room. It is not promoted as a universal rule; future cover badges must be judged by whether they carry a distinct editorial job.

## Failure / unresolved issue

Dominant-photo quality remains the principal V5 blocker. Photo-role PASS stays unchanged, and V6 remains gated.

## Next application

Resume the highest-quality binary-safe path for Batch A (`77:148`, `77:24`, `77:422`). Do not substitute additional decoration cleanup for dominant-photo repair.