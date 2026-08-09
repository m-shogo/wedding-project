# WEDDING PASSPORT — Graphic Editorial Cover QA

Date: 2026-08-10
State: `VISUAL_REOPENED / GRAPHIC_EDITORIAL_COMPARISON_ADVANCE / STRUCTURE_QA_PASS / PRODUCTION_NOT_YET_PROMOTED`

## Live authority readback

- Start/latest observed `main` before write: `5e3c1756306bdde965a76203a6fa7fa6dd6e42c7`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `01_OUTSIDE / 1:2`
- Production front: `18:2 / FRAME_FRONT_COVER`
- Production back: `18:46 / FRAME_BACK_COVER`
- Previous clean-room front: `95:2`
- Previous clean-room back: `97:2`
- New front comparison: `99:2 / QA_FRONT_COVER_CLEANROOM_V3_GRAPHIC_EDITORIAL_2026_08_10`
- New back comparison: `99:37 / QA_BACK_COVER_CLEANROOM_V4_GRAPHIC_EDITORIAL_2026_08_10`
- Drive authority folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visual diagnosis

The previous clean-room pair was clearly stronger than legacy production, but still read slightly too restrained and template-like at thumbnail scale. The main weakness was not readability: it was a lack of graphic depth and a weak transition from the large Japanese title into the lower route field.

The production covers remain rejected for sellable visual quality because they still depend on generic passport conventions: centered English title, globe/emblem, fake passport number/credential language on the front, and fake itinerary/MRZ/stamp language on the back.

## Figma changes

Created two new rollback-safe comparisons without touching production.

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

## Screenshot QA

Compared at identical thumbnail/reading scales against production and the previous clean-room pair.

Front V3 is materially stronger than production `18:2` and stronger than front V2 `95:2`: the Japanese title is now the unmistakable primary signal, the rail no longer consumes too much width, and the lower half has more graphic depth without falling back to airplane/stamp/passport iconography.

Back V4 remains substantially stronger than production `18:46`: there is no fake itinerary, entry stamp or MRZ block. It also reads as a more deliberate pair with front V3 than the previous V3 because the ghost glyph and contour field create a shared print-editorial language.

An actual-detail front render was inspected at 1269×1800 from the 1480×2100 source. Title edges, thin rules, contour lines, ghost glyph, red accent, footer, and rail text remain visually clean with no obvious clipping or collision.

## Structure QA

Front `99:2`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `18`
- IMAGE-fill nodes: `0`
- raster nodes: `0`
- text outside frame: `0`
- production front untouched

Back `99:37`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `14`
- IMAGE-fill nodes: `0`
- raster nodes: `0`
- text outside frame: `0`
- production back untouched

Menu `18:90`, seating production `18:131`, and seating clean-room `78:2` were also visually re-read in the same run. The menu and seating defects are primarily composition/typography, not missing imagery; no image was forced into those pages.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

The automation execution environment did not expose an image-generation tool in this run. No generated asset is claimed. Existing generic travel-art candidates were not force-adopted because they would reintroduce the exact stock/AI/passport-stamp signals being removed.

- generated candidates: `0`
- adopted generated assets: `0`
- rejected/forced Drive uploads: `0`

## Drive

Drive authority was live-read immediately before this write.

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes: `0`
- reason: no generated/raster asset passed an adoption gate, and the meaningful changes were native Figma typography/vector composition.

## Decision

`VISUAL_COMPARISON_ADVANCE / FRONT_V3_STRONGER / BACK_V4_STRONGER / STRUCTURE_QA_PASS / PRODUCTION_NOT_YET_PROMOTED`

Do not mark the Passport `SELLABLE_VISUAL_QA_PASS` yet. The new pair is materially better, but the full Passport family still needs a final same-scale family comparison against menu `18:90` and the preferred seating direction before promotion. `NOT_PRINT_READY` remains for physical/vendor proof.

Next safe target: finalize the Passport family comparison and, only if the graphic-editorial pair still wins at whole/reading/detail scales, preserve explicit production rollback and promote the winning cover identities. Then close the preferred seating direction before progressing to BOARDING PASS.
