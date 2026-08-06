# V5 Cover Secondary Headline Subtraction

Date: 2026-08-07
Status: `PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT`
Scope: Rurubu WEDDING V5 outer candidate only

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- current Rurubu status, evidence ledger, operating system, postmortem, lessons, editorial knowledge, and V6 boundary files
- live Figma page `01_RURUBU_WEDDING`

## Visible problem

The cover hero carried three stacked, equally shaped color bars over the dominant photograph. The primary pink headline communicated the cover promise, while the blue `出会いから今日まで / LOVE HISTORY` and yellow `思い出スポット MAP` bars repeated topics already represented by the six-item feature index below the image. Together the three bars covered more of the hero and created a promotional UI-stack silhouette rather than a single editorial cover lead.

## Tested principle

Attempt subtraction before adding or restyling. Preserve one primary cover promise and move secondary topics to the existing feature index rather than repeating them as photo overlays.

## Hypothesis

Hiding only the blue and yellow secondary headline clusters would:

- restore more uninterrupted hero photography;
- improve primary/secondary hierarchy;
- reduce badge/card density;
- preserve all unique topics in the feature index;
- avoid any text, crop, geometry, image, or semantic-node rewrite.

## Experiment

Reversible visibility changes only:

- `77:198 / SIDE_HEADLINE_BLUE`: `true → false`
- `77:199 / SIDE_HEADLINE_2`: `true → false`
- `77:200 / SIDE_HEADLINE_YELLOW`: `true → false`
- `77:201 / SIDE_HEADLINE_3`: `true → false`

Preserved:

- `77:196 / SIDE_HEADLINE_PINK`
- `77:197 / SIDE_HEADLINE_1`
- feature index items `01–06`
- hero `77:148`
- native text and semantic nodes
- non-destructive crop and image fill
- fold guide `77:288`
- rollback frames `59:2` and `59:178`

## Three-scale QA

### Thumbnail / whole item

- the cover now presents one clear hero promise instead of three competing overlay bars;
- more of the Yokohama skyline and sunset remains uninterrupted;
- the logo, date badge, hero, primary headline, caption, and feature index retain a clear silhouette;
- no empty hole or left-heavy imbalance appeared.

### Reading / page scale

Reading order remains:

`logo and date → hero → primary pink cover promise → hero caption → feature index 01–06 → bottom issue strip`

The removed topics remain discoverable in the feature index, so no unique navigation or factual content was lost.

### Detail / actual-size and structure

Verified live structure after change:

- native text nodes: `85`
- visible text nodes: `41`
- IMAGE-fill nodes: `14`
- hero `77:148`: visible, `FILL`, hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- primary pink cluster remains visible
- blue and yellow cluster nodes remain present but hidden
- fold guide and both rollback frames remain visible/preserved
- no text reflow, clipping, collision, crop change, image replacement, geometry change, or semantic-node deletion

## Possible regression checked

Removing all hero headlines could make the cover promise too quiet, so the primary pink statement was deliberately retained. This result does not establish a rule that magazine covers should have only one overlay; it establishes only that secondary overlays should not duplicate an already complete contents index.

## Result

`VERIFIED / ADOPTED_FOR_V5_CURRENT / GLOBAL_RULE_NOT_PROMOTED`

## Evidence needed for later promotion

Apply the same test to another editorial cover with a complete secondary index. Promote only if one primary overlay plus index repeatedly outperforms stacked topic bars at all three scales.

## Next application

Return priority to unresolved dominant-photo provenance and role-pass evidence. Continue editorial subtraction only where the removed element is demonstrably duplicated elsewhere.

## Gate impact

No asset lifecycle gate changed. Do not increment:

- `INTENDED_SOURCE_APPLIED`
- `PHOTO_ROLE_PASS`
- V5 dummy-design completion
- V6 start gate
