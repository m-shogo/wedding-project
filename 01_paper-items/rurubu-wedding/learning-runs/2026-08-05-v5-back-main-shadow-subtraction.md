# V5 back-main photo shadow subtraction

Date: 2026-08-05
Item/version: Rurubu WEDDING V5
Target: `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`

## Source

- Live Figma outer-spread screenshot and node inspection
- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- Rurubu Current Status, evidence ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 boundary files

## Visible problem

After the scrapbook frame and city-bar overlays were removed, the semantic back-cover photograph still retained a broad dark drop shadow. At whole-item and page scales it made the photograph read as a floating UI card rather than an editorial image placed directly into the page composition.

## Hypothesis

Removing only the shadow, while preserving the white keyline, image fill, crop, geometry, semantic node, and rollback frames, should reduce Web/UI-card feel without weakening photo separation from the warm paper background.

## Expected improvement

- quieter back-cover composition
- more direct photograph-to-page relationship
- less decorative depth competing with the title and journey route
- unchanged crop and provenance evidence

## Possible regression

The image edge could become too weak against the background or appear unfinished at actual size.

## Experiment

Changed only:

- `77:24.effects`: one visible navy drop shadow (`radius 10`, `offset 0/5`, alpha about `0.18`) → `[]`

Preserved:

- node ID and semantic name
- `472 × 304` geometry
- IMAGE fill and `FILL` crop
- image hash `2cfd19cf1701db58039a4fc645e4279832ec465a`
- white stroke/keyline
- native text and surrounding modules
- V4 rollback frames

## Verification

Post-change outer-spread screenshot reviewed at whole-item and page scale:

- no blank hole, mask exposure, clipping, or hierarchy collapse
- photo remains clearly separated by its white keyline
- title, body copy, Friends & Family, journey route, fold relationship, and cover-side balance remain intact
- the back image reads less like a floating card

Structure inspection confirms the semantic photo node remains intact and only `effects` changed.

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT`

This is not a photo-source quality pass. `PHOTO_ROLE_PASS` and the V6 start gate remain unchanged.

## Failure / limitation

The dominant image itself remains visibly low quality and still requires the verified Drive derivative to be placed through a binary-safe route. Shadow removal does not substitute for Batch A image repair.

## Reusable lesson

When an editorial photograph already has sufficient edge separation from a paper background, remove broad UI-style shadows before introducing any replacement decoration. Preserve a minimal keyline only when it serves print separation. This remains a tested V5 lesson, not yet a universal project rule.

## Next application

Do not continue broad decoration removal automatically. Resume Batch A image placement or another evidence-closing step that advances Drive ID → semantic node ID → image hash → screenshot/structure QA.