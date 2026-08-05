# V5 back-cover scrapbook-frame subtraction

Date: 2026-08-05
Scope: Rurubu WEDDING V5 only
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

## Source and authorities

Re-grounded against live Figma, GitHub `main`, `CURRENT-STATUS.md`, the project-wide production system, and the Rurubu editorial lessons. The dominant-photo replacement pipeline remains blocked by binary transport, so this run advanced a separate rollback-safe editorial repair rather than repeating the same failed upload method.

## Visible problem

The back-cover dominant photograph `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO` was surrounded by `77:25 / DECOR_SCRAPBOOK_FRAME_BACK_MAIN`, a large raster scrapbook-paper frame. The frame reduced the perceived photo area, added faux-paper/tape density, and competed with the existing yellow kicker, pink editorial rule, heading, Friends & Family modules, and journey route.

## Hypothesis

Hiding the non-semantic scrapbook frame while retaining the semantic photo rectangle, its shadow, crop, labels, and native text would make the dominant image read more directly and reduce template/AI-decoration feel without making the quiet back cover visually empty.

## Expected improvement

- greater visual authority for the dominant photograph
- cleaner edge relationship between photograph, kicker, and adjacent text
- less decorative competition at thumbnail and reading scales
- better compatibility with the already-prepared replacement derivative

## Possible regression

The back cover could lose too much travel-scrapbook character or expose an unfinished rectangular image treatment. Adoption therefore required whole-spread, page, and actual-size inspection plus a structural audit.

## Experiment

Changed only:

- `77:25 / DECOR_SCRAPBOOK_FRAME_BACK_MAIN`
- `visible: true → false`

No node was deleted. The change is immediately rollback-safe.

## Verification evidence

### Whole-item / thumbnail scale

The outer spread remains balanced. The cover retains the intentionally abundant Rurubu character, while the back cover becomes quieter and more editorial. No blank hole or unexplained mask area appeared.

### Page / reading scale

The photograph now reads as the clear first visual after `OUR TRAVEL NOTES`. The yellow `BEST MOMENT` kicker and the adjacent `MEMORY 01` heading remain sufficient to establish the editorial module without the faux-paper frame.

### Detail / actual-size scale

Back-cover screenshot at the frame's natural `794 × 1123` size showed:

- no exposed mask or clipped edge
- no text collision
- photo shadow remains intact
- label, heading, body copy, Friends & Family, route, and folio remain legible

### Structure audit

Preserved:

- current outer candidate `77:18`
- back-cover frame `77:19`
- semantic photo node `77:24`
- photo box `472 × 304`
- Figma image hash `2cfd19cf1701db58039a4fc645e4279832ec465a`
- scale mode `FILL`
- image transform `[[1,0,0],[0,1,0]]`
- native text count `88`, non-native text count `0`
- V4 rollback frames `59:2` and `59:178`

## Result

**ADOPTED for the current V5 candidate.** The subtraction improves dominant-photo clarity and reduces decorative density without removing the travel-magazine identity. This is a bounded V5 decision, not a permanent rule that all scrapbook frames are invalid.

## Failure / limitation

This does not repair the current image source quality and does not increase `PHOTO_ROLE_PASS`. The replacement derivative still requires exact node placement, Drive ID → node ID → image-hash evidence, screenshot QA, ledger update, and GitHub readback.

## Next application

Continue Batch A via a binary-safe image-placement method. Until that path is available, only advance separate high-impact, rollback-safe editorial or typography defects; do not substitute endless decoration removal for dominant-photo repair.
