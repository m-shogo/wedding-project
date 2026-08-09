# WEDDING PASSPORT — Graphic Editorial Cover QA

Date: 2026-08-10
State: `VISUAL_REOPENED / GRAPHIC_EDITORIAL_PRODUCTION_PROMOTED / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS`

## Live authority readback

- Latest observed `main` immediately before the promotion evidence write: `823411a035a6bf8a4083344ca061ccfac63c5753`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `01_OUTSIDE / 1:2`
- Production front identity: `18:2 / FRAME_FRONT_COVER`
- Production back identity: `18:46 / FRAME_BACK_COVER`
- Previous clean-room front: `95:2`
- Previous clean-room back: `97:2`
- Winning front comparison: `99:2 / QA_FRONT_COVER_CLEANROOM_V3_GRAPHIC_EDITORIAL_2026_08_10`
- Winning back comparison: `99:37 / QA_BACK_COVER_CLEANROOM_V4_GRAPHIC_EDITORIAL_2026_08_10`
- Drive authority folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visual diagnosis

The previous clean-room pair was clearly stronger than legacy production, but still read slightly too restrained and template-like at thumbnail scale. The main weakness was not readability: it was a lack of graphic depth and a weak transition from the large Japanese title into the lower route field.

The former production covers were rejected for sellable visual quality because they depended on generic passport conventions: centered English title, globe/emblem, fake passport number/credential language on the front, and fake itinerary/MRZ/stamp language on the back.

## Winning clean-room changes

### Front V3 — `99:2`

- narrowed the navy rail from 520px to 400px to give the Japanese title more editorial dominance;
- increased `旅のはじまり` to a larger, more assertive Noto Serif JP hierarchy;
- enlarged and optically tightened the date rail;
- shifted the contents index and route field into a clearer vertical reading sequence;
- introduced a very-low-opacity native `旅` ghost glyph behind the contour field to create print-like graphic depth without raster decoration;
- added one restrained burgundy edge accent and a small vertical `一日の記録` marker;
- retained native text and native vector route artwork.

### Back V4 — `99:37`

- slightly widened the navy rail and strengthened `旅のつづきへ`;
- tightened the thank-you / note / route-field vertical rhythm;
- added a low-opacity native `続` ghost glyph behind the contour field;
- added one restrained burgundy edge accent to balance the front;
- kept all finalization-sensitive copy native and editable.

## Screenshot QA before promotion

Compared at identical thumbnail/reading scales against former production and the previous clean-room pair.

Front V3 was materially stronger than legacy `18:2` and stronger than front V2 `95:2`: the Japanese title became the unmistakable primary signal, the rail stopped consuming excessive width, and the lower half gained graphic depth without falling back to airplane/stamp/passport iconography.

Back V4 was substantially stronger than legacy `18:46`: there was no fake itinerary, entry stamp or MRZ block. It also read as a more deliberate pair with front V3 than the previous clean-room version because the ghost glyph and contour field created a shared print-editorial language.

An actual-detail front render was inspected at 1269×1800 from the 1480×2100 source. Title edges, thin rules, contour lines, ghost glyph, red accent, footer, and rail text remained clean with no visible clipping or collision.

## Production promotion

The winning graphic-editorial pair was promoted while preserving the semantic production frame IDs.

- production front remains `18:2 / FRAME_FRONT_COVER`
- production back remains `18:46 / FRAME_BACK_COVER`
- former front production preserved as `103:2 / ROLLBACK_FRONT_COVER_PRE_GRAPHIC_EDITORIAL_2026_08_10`
- former back production preserved as `103:69 / ROLLBACK_BACK_COVER_PRE_GRAPHIC_EDITORIAL_2026_08_10`
- hidden `GUIDE_BLEED`, `GUIDE_TRIM`, and `GUIDE_SAFE` nodes were preserved in both production frames
- no force overwrite of the clean-room comparison nodes; `99:2` and `99:37` remain available for comparison history

Post-promotion screenshots of `18:2` and `18:46` match the winning graphic-editorial pair visually. The generic centered passport emblem/credential system and fake itinerary/MRZ/stamp system are no longer present in production.

## Post-promotion structure QA

Production front `18:2`:

- native text nodes: `18`
- IMAGE-fill nodes: `0`
- text outside frame: `0`
- `clipsContent=true`
- hidden bleed/trim/safe guides preserved
- top-level children: `29`

Production back `18:46`:

- native text nodes: `14`
- IMAGE-fill nodes: `0`
- text outside frame: `0`
- `clipsContent=true`
- hidden bleed/trim/safe guides preserved
- top-level children: `25`

Rollback front `103:2` and rollback back `103:69` were structurally read back and retain the prior legacy children and hidden guides.

Menu `18:90`, seating production `18:131`, and seating clean-room `78:2` were visually re-read in the same run. The menu and seating defects are primarily composition/typography, not missing imagery; no image was forced into those pages.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

The automation execution environment did not expose an image-generation tool in this run. No generated asset is claimed. Existing generic travel-art candidates were not force-adopted because they would reintroduce the exact stock/AI/passport-stamp signals being removed.

- generated candidates: `0`
- adopted generated assets: `0`
- rejected/forced Drive uploads: `0`

## Drive

Drive authority was live-read immediately before the evidence write.

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes: `0`
- reason: no generated/raster asset passed an adoption gate, and the meaningful changes were native Figma typography/vector composition.

## Decision

`COVER_PAIR_PRODUCTION_PROMOTED / ROLLBACK_SAFE / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS / NOT_PRINT_READY`

Do not mark the whole WEDDING PASSPORT `SELLABLE_VISUAL_QA_PASS` yet. The covers have advanced materially and are now production, but the preferred seating direction and whole-family same-scale comparison with menu `18:90` still need to close. The next safe target is the seating comparison (`18:131` vs `78:2` plus long-name proof) and then a final four-page family visual gate before progressing to BOARDING PASS.
