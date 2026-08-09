# Rurubu V5 — Back-main frame subtraction QA

Date: 2026-08-09
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

## Source / authority

- live Figma `01_RURUBU_WEDDING`
- Current outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- target `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
- rollback outer `59:2`
- rollback inside `59:178`
- project-wide quality-over-legacy and editorial reduction rules

## Visible problem

The back-cover main memory photograph already had sufficient separation from the warm paper background and an adjacent native editorial label/rule, but the image itself still carried a `6 px` white stroke and `10 px` corner radius. At whole-item scale this produced a residual rounded-card silhouette that was visually heavier and more Web/UI-like than the newer direct editorial treatment used elsewhere on the V5 outer spread.

The image, crop, provenance, and role quality were already verified. There was no defect requiring regeneration.

## Tested principle / hypothesis

Principle tested: attempt subtraction before adding decoration, and do not preserve legacy card geometry solely because it already exists.

Hypothesis: removing only the white stroke and rounded corners would improve print-editorial continuity and alignment with the Friends & Family imagery while preserving the photograph's semantic role, image fill, crop, provenance, and reading relationship.

Expected improvement:
- less residual UI-card appearance
- stronger visual continuity between the large memory photograph and the two supporting Friends photographs
- cleaner print-oriented edge behavior

Possible regression:
- photograph could lose necessary containment against the cream paper
- hard edges could feel abrupt or visually unfinished

Evidence required:
- rollback-safe duplicate comparison
- whole-item screenshot
- page/reading-scale review
- actual-size image-edge detail
- Current structure/hash readback after promotion

## Prototype

Created rollback-safe duplicate:
- `553:2 / V5_OUTER_BACK_MAIN_FRAME_SUBTRACTION_QA_2026_08_09`
- cloned target `553:8 / BACK_VISUAL_MAIN_MEMORY_PHOTO`

Prototype changes on `553:8` only:
- `strokes: white 6 px → []`
- `strokeWeight: 6 → 0`
- `cornerRadius: 10 → 0`

No image, fill, crop, text, copy, semantic name, or other geometry was changed.

## Three-scale comparison result

### Whole item

The unframed candidate retained a clear dominant memory photograph while reducing the isolated card silhouette. The back cover remained balanced against the front cover and did not lose its primary/secondary hierarchy.

### Reading / page scale

`OUR TRAVEL NOTES → MEMORY 01 photo/text → FRIENDS & FAMILY → OUR JOURNEY ROUTE` remained explicit. The existing pink vertical rule and `MEMORY 01` label were sufficient to attach the copy to the photograph, so the white rounded border was not needed for grouping.

### Actual-size detail

Image edges remained clean and the crop was unchanged. Removing the 6 px border exposed no artifacts, clipping, or source-quality regression. The square edge looked deliberate rather than unfinished on the warm paper field.

Decision: **ADOPT**.

## Current promotion

Promoted the same bounded change to:
- `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`

After promotion:
- image hash remained `e3738476f760932bb5b09c9d60f174dd6c84049d`
- `strokeWeight = 0`
- `cornerRadius = 0`
- native text nodes in outer Current: `85`
- visible text nodes: `44`
- IMAGE-fill nodes: `14`
- fold guide `77:288` remains visible
- rollback frames `59:2` and `59:178` remain present
- comparison frame `553:2` remains preserved

No photo-role completion count changed because the source asset was already a verified V5 dummy-design pass before this geometry-only refinement.

## Cover-hero blocker handling in this run

The verified Q60 cover derivative was read back again from Drive:
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME `image/jpeg`
- `155,439 bytes`

A direct `upload_assets` endpoint was obtained for the latest parity staging target `538:132`, but the raw binary POST from the execution container hit the already-known `mcp.figma.com` DNS-resolution blocker. Because this blocker fingerprint has already occurred, the method was not retried repeatedly. The run switched to safe non-blocked editorial work instead.

Official photo status therefore remains unchanged:
- `PHOTO_ROLE_PASS 10 / 11 active`
- `ROLE_COMPLETE 10 / 11 active`
- dominant photo pass `2 / 3`
- V5-01 cover hero remains the only active photo blocker
- V6 production gate remains closed

## Failure / regression memory

The border removal is verified for this specific back-cover photo because the paper field, adjacent rule, label, and module spacing already provide sufficient grouping. This does **not** establish a global rule that all photographs should have square borderless edges. Borders remain valid when they perform a real contrast, crop, attachment, or hierarchy function.

## Next application

- keep the cover-hero Q60 source unchanged; do not regenerate or degrade it merely to create progress
- use a binary-safe Figma ingestion path that does not depend on the blocked external POST route when available
- continue V5 weakest-three, typography, density, fold/safe-area and actual-size QA on bounded roles while the cover transport blocker remains isolated
- do not begin V6 production until the V5 dummy-photo/design gate is genuinely verified
