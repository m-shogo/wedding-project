# V5 common-points label tape subtraction — 2026-08-07

Scope: Rurubu WEDDING V5 only. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Authorities and live truth

Before production work, the project-wide Figma production system, asset-generation memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, Current Rurubu status, V5 asset evidence ledger, editorial knowledge base, lessons log, V5 production operating system, postmortem, and V6 clean-room status/asset queue were reviewed. Live Figma remained the implementation authority. V6 production remains gated by the unpassed V5 dummy-photo design QA gate.

## Visible problem

On V5 inside-left Current `77:291`, the `ふたりの共通点` micro-section still used `77:353 / AUTH_COMMON_TAPE`, a `178 × 26` saturated yellow tape field behind a 12px native text label. The page had already reduced several redundant ribbons/cards, so this isolated sticker-like field had become visually louder than its supporting information role.

The dominant-photo repair gate remains higher priority, but its binary transfer method is a known repeated blocker. Per the loop-breaker rule, that method was not retried. This bounded non-binary subtraction experiment was therefore safe concurrent progress.

## Hypothesis

For a low-priority common-points label that is already supported by adjacent explanatory copy and three colored keywords, direct native type on the warm paper background will preserve comprehension while reducing Web-UI/sticker density.

Tested principle:
- supporting information should try direct type before a field/card;
- subtraction must be evaluated after earlier reductions because visual mass changes page rhythm;
- Current must not be changed until a rollback-safe comparator wins visual review.

Expected improvement:
- quieter lower-half hierarchy;
- less template/sticker feel;
- stronger continuity from Q&A into the common-points and Travel Note close.

Possible regression:
- the micro-section could become too quiet or lose its visual anchor;
- the 12px label could become less legible without the yellow contrast field.

Evidence required:
- Current vs duplicate whole-page comparison;
- reading-scale comparison of the lower half;
- actual-size/detail legibility of the native label;
- structure check for native text, fold guide, semantic node, comparison frame, and V4 rollback anchors.

## Safe comparator

Created from Current inside-left `77:291`:
- comparison frame: `341:2 / V5_INSIDE_LEFT_COMMON_LABEL_SUBTRACTION_TEST_2026_08_07`
- comparison tape: `341:64 / AUTH_COMMON_TAPE` → hidden only
- preserved native label: `341:65 / ふたりの共通点`

No Current node was changed during the experiment creation.

## Three-scale result

### Whole-page / thumbnail

The comparator removed one isolated yellow sticker silhouette without reducing the primary profile/Q&A hierarchy. The lower half reads as a calmer editorial close rather than a sequence of independent badges.

### Reading/page scale

`ふたりの共通点` remains grouped with `好きが重なるところを3つだけ。` and the three keyword labels immediately below. Removing the field did not create ambiguity or a broken reading path.

### Detail / actual-size evidence

Live node inspection verified:
- label remains native Figma text;
- Current label `77:354`: `154 × 21.6`, font size `12`, dark navy fill;
- explanatory text `77:355`: font size `11`;
- test label `341:65` preserved identical geometry/style;
- direct-type screenshot remained sharp and readable.

The experiment did not alter copy, image crops, image hashes, generated assets, or semantic text nodes.

## Adoption

Result: `VERIFIED / ADOPTED IN V5 CURRENT`.

Promoted only the subtraction itself:
- Current `77:353 / AUTH_COMMON_TAPE` → `visible=false`
- Current native label `77:354 / ふたりの共通点` preserved unchanged

Rollback/comparison evidence remains:
- comparator `341:2`
- V4 outer rollback `59:2`
- V4 inside rollback `59:178`
- fold guide `77:540` remained present and visible

A post-adoption Current screenshot confirmed the direct label renders correctly and the page hierarchy remains intact.

## Knowledge state

This is a `PROTOTYPED → VERIFIED` V5 result, not a new PROJECT_RULE. It supports the existing reduction principle but does not justify deleting all labels/tapes in other contexts. Semantic labels that provide navigation or needed contrast may still require a field.

## Failure / rejected alternative

No new decorative replacement was added. The experiment intentionally rejected compensating for the removed tape with another badge, shadow, gradient, or card because the direct native label already passed the visual check.

## Next application

1. Keep `341:2` as comparison evidence until V5 dummy-design QA is complete.
2. Do not spend further time micro-polishing this label unless later whole-page review exposes a regression.
3. Return priority to dominant-photo evidence closure for `77:148`, `77:24`, and `77:422` using a genuinely changed binary-safe transfer method.
4. `PHOTO_ROLE_PASS` remains unchanged; V6 production remains closed until the V5 gate is verified.
