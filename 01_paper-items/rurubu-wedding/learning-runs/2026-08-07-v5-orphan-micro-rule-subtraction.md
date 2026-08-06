# V5 Orphan Micro-Rule Subtraction — 2026-08-07

## Scope

Rurubu WEDDING V5 only. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item nodes were changed.

## Authority readback

The run re-read the project-wide Figma production authority, current Rurubu status, live Figma state, and current learning/feedback evidence before mutation.

## Visible problem

After `77:142 / AUTH_BACK_MICRO_1` was hidden, its associated pink dashed rule `77:141 / AUTH_MICRO_RULE` remained visible above `OUR JOURNEY ROUTE`. The line no longer anchored text, separated competing modules, or carried editorial meaning. It read as an orphaned decorative remnant.

## Tested principle

Attempt subtraction before restyling. When a supporting label is removed, re-audit its surrounding rules, brackets, underlines, tape, and color fields; a decoration that loses its semantic partner should not remain automatically.

## Hypothesis

Hiding only the orphaned rule would clarify the route-module entrance and remove a visually unexplained accent without changing guest-facing copy, route geometry, photos, crops, native text, fold guidance, semantic nodes, or rollback history.

## Live Figma change

- file: `bfM0d4c9dCeBv5pCkJ3TNM`
- page: `01_RURUBU_WEDDING`
- outer frame: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- node: `77:141 / AUTH_MICRO_RULE`
- change: `visible: true -> false`
- deletion: none
- rollback: restore node visibility

## Expected improvement

- remove an unexplained decorative mark
- make `OUR JOURNEY ROUTE` begin directly and cleanly
- preserve quiet space and editorial rhythm
- avoid adding replacement decoration

## Possible regression

The route module could lose a useful separator from the Friends & Family captions. Adoption therefore required a new whole-item screenshot and bounded structural audit.

## Verification

Post-change live checks:

- whole-item screenshot: `1588 x 1123`
- the route heading remains visible and readable
- no empty hole, collision, clipping, text reflow, or fold regression observed
- `77:141 / AUTH_MICRO_RULE`: preserved, `visible: false`
- `77:142 / AUTH_BACK_MICRO_1`: preserved, `visible: false`
- `77:47 / BACK_VISUAL_HISTORY_TITLE`: visible
- native text nodes in outer candidate: `85`
- visible text nodes: `46`
- IMAGE-fill nodes: `14`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE`: preserved and visible
- rollback frames `59:2` and `59:178`: preserved
- no image, crop, geometry, text-content, or semantic-role mutation

## Result

`PROTOTYPED -> VERIFIED / ADOPTED_FOR_V5_CURRENT`

The rule would not be selected in a clean-room composition once its paired microcopy was absent. Keeping it solely because it already existed would violate the quality-over-legacy rule.

## Failure / boundary

This does not establish that all decorative rules should be removed. Rules remain valid when they visibly structure content, connect a caption to an image, define a section boundary, or support reading order at actual size.

## Next application

Return priority to unresolved dominant-photo Drive-to-node-to-hash evidence and quality-passing derivative placement. Continue cleanup only where a decoration is demonstrably orphaned or semantically duplicated. Do not advance V5 completion or V6 start gates from this change alone.