# V5 cover dot-matrix subtraction

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Live Figma: `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` (`77:18`)

## Authorities reread

Before the action, the run reread the project-wide Figma production and asset rules, project memory, current Rurubu status, and the current live Figma state. The dominant-image evidence gate remains authoritative; this bounded editorial change does not alter photo-role completion.

## Visible problem

The cover contained a decorative 5 × 5 dot matrix at the right side of the hero area. It had no semantic editorial role, repeated a generic template/graphic-device pattern, and added a secondary focus beside the logo, date badge, side headlines, hero photograph, caption strip, and lower contents module.

## Tested principle

Attempt subtraction before adding decorative elements. A non-semantic motif should remain only when it supports reading order, grouping, location, or publication identity.

## Hypothesis

Removing the isolated dot matrix would reduce decorative noise and keep attention on the cover identity and dominant photograph without disturbing the lively Rurubu character.

## Expected improvement

- quieter hero-side negative space
- fewer unrelated decorative focal points
- stronger logo → hero → caption/contents reading hierarchy
- less generic template styling

## Possible regression

The upper-right portion of the photograph could feel too empty or lose visual energy. Adoption therefore required whole-item screenshot review and preservation of rollback nodes.

## Figma change

The following existing ellipses were changed from visible to hidden, not deleted:

- `77:260` through `77:284` inclusive
- total nodes: `25`

No text, photograph, crop, position, frame hierarchy, or semantic role was changed.

## Verification evidence

### Whole-item / thumbnail QA

The post-change outer-spread screenshot rendered at `1588 × 1123`. The cover remains visually balanced; the logo, date badge, colored side headlines, hero photograph, caption strip, and contents module preserve sufficient energy. The removed motif does not leave an accidental hole.

### Reading/page QA

The cover reading order remains:

`issue label → Rurubu WEDDING logo/date → feature ribbon → dominant photograph → side headlines → photo caption → contents`

No grouping or navigation meaning depended on the dots.

### Detail / actual-size plausibility

- no text reflow or collision
- no image clipping or crop change
- no exposed mask or background artifact
- all 25 nodes still exist and are individually rollback-safe

### Structure QA

- native text nodes in outer candidate: `88`
- cover hero node `77:148` hash unchanged: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- back-main node `77:24` hash unchanged: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- fold guide `77:288` exists and remains visible
- V4 rollback frames `59:2` and `59:178` remain present

## Result

`ADOPTED_FOR_V5_CURRENT`

The change is a bounded editorial subtraction, not a promoted universal rule. Decorative dot fields may still be valid when they communicate a map, route, data pattern, or deliberate publication identity.

## Asset transport blocker observed

The already Drive-verified back-main derivative was fetched successfully:

- Drive ID: `1mRalEP6V7TI6MS1NFkhkbMMUDcIVgbZV`
- filename: `10_BACK_MAIN_TRAVEL_FLATLAY_DUMMY__FIGMA_708x456_Q35.jpg`
- MIME: `image/jpeg`
- bytes: `33,535`

A new Figma single-use upload URL was issued for node `77:24`, but binary POST again failed because the execution container could not resolve `mcp.figma.com`. The upload did not mutate live Figma. Per the repeated-blocker rule, this network path was not retried again in this run; safe editorial work continued instead.

## Gate impact

No change to:

- intended-source count
- `PHOTO_ROLE_PASS`
- dominant-photo pass
- V5 dummy-design completion
- V6 start gate

The next highest-priority work remains a binary-safe placement route for Batch A Drive derivatives, followed by exact Drive ID → Figma node ID → image hash and screenshot evidence closure.
