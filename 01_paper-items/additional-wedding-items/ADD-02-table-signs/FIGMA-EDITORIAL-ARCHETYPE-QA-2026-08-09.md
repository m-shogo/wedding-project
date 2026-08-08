# ADD-02 — 11卓の国別テーブルサイン Editorial Archetype QA

Date: 2026-08-09
Start / pre-write authority: `main@6ab7f19060c4b0dd247f3783c23aeb0ae9e3a88e`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
Production page: `1:3 / 02_TABLE_SIGNS`
Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
Rurubu scope: excluded; no read/write/QA performed.

## Highest-value visible defect

Live whole-page screenshot showed all 11 signs using essentially the same top-color-block + text-stack layout. Country identity was carried mostly by palette and label, so the suite read as color-swapped template output rather than a professionally art-directed destination series. Each sign also exposed an airport-code-like route label (`HNL / DESTINATION`, `FCO / DESTINATION`, etc.) that looked like invented transport data rather than necessary table-sign information.

## Rollback-safe proof

Before production edits, all 11 production frames were cloned to `99_QA` as:

- `4:2` Hawaii
- `4:11` Italy
- `4:20` France
- `4:29` Spain
- `4:38` Taiwan
- `4:47` Japan
- `4:56` Hong Kong
- `4:65` Singapore
- `4:74` Bali
- `4:83` Korea
- `4:92` Maldives

Prefix: `QA_ADD_02_PRE_EDITORIAL_REDESIGN_2026_08_09_*`

No production node was deleted or flattened.

## Figma production redesign

All 11 frames remain `1000 × 1480`, native editable, semantic, and clipped. The one-template treatment was replaced by three editorial archetypes while preserving family resemblance through type scale, table-number language, palette discipline and semantic node names.

### Coastal / resort archetype

Hawaii, Bali, Maldives.

- hero field expanded to `1000 × 760` at top
- country title moves below hero with generous negative space
- single white motif rule remains inside the hero edge
- table label and note stay in the lower editorial field
- numeric identifier remains a restrained lower-right anchor

### European editorial-column archetype

Italy, France, Spain.

- hero field becomes a full-height right column: `350 × 1480` at `x=650`
- table label, rule, country name and note form a left editorial column
- identifier moves to lower-left
- no card, badge, stamp, shadow, or fake ticket treatment added

### Urban / East-Asian archetype

Taiwan, Japan, Hong Kong, Singapore, Korea.

- hero field moves to bottom: `1000 × 620` at `y=860`
- table label and number occupy the top band
- country name and editorial note occupy the upper body
- one accent rule separates content from the hero field

## AI/template subtraction

For every sign:

- `TXT_ROUTE_CODE` changed to explicit semantic dummy `[補助情報 · LAYOUT DUMMY]` and set `visible=false`
- country-note filler changed to native editable `［国テーマ説明文 · LAYOUT DUMMY］`
- no airport code, fake route credential, extra travel badge, stamp, plane, gradient, shadow or web-UI card was introduced
- variable copy remains editable text
- final country imagery remains a replaceable semantic hero field

## Screenshot QA

Post-edit whole-page screenshot at 1491 × 1600 confirms:

- 11 signs still read as one series
- the suite is no longer a simple color-swapped repeated template
- three distinct composition rhythms are visible at thumbnail/whole-item scale
- no clipping or canvas-bound loss is visible
- large destination labels retain clear hierarchy

Actual-size representative screenshot for France (`2:20`) at 1000 × 1480 confirms:

- table label → rule → destination → note → identifier hierarchy remains legible
- right hero column produces intentional asymmetry without crowding the text field
- Japanese semantic dummy wraps to two lines within the narrow European column by design

## Structural readback

All 11 production frames:

- frame size: `1000 × 1480`
- `clipsContent=true`
- visible child out-of-bounds: `0`
- `GUIDE_SAFE.visible=false` retained
- `TXT_ROUTE_CODE.visible=false`
- native text nodes retained
- no flatten/raster replacement performed
- all 11 rollback copies retained in `99_QA`

Hero geometry readback matches the three archetypes exactly:

- Coastal: `x=0, y=0, 1000 × 760`
- Europe: `x=650, y=0, 350 × 1480`
- Urban/East Asia: `x=0, y=860, 1000 × 620`

## Drive

Drive folder identity was re-read immediately before Git write and matched `ADD-02_11卓の国別テーブルサイン / 1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`.

Drive changes: `0`.

Reason: this pass fixed composition and semantic text defects only. No screenshot-supported raster-asset defect required regeneration or upload.

## Current state

`MEANINGFUL_DESIGN_QA_ADVANCE / THREE_EDITORIAL_ARCHETYPES / WHOLE_ITEM_SCREENSHOT_QA_PASS / REPRESENTATIVE_ACTUAL_SIZE_QA_PASS / STRUCTURE_QA_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / FINAL_IMAGES_AND_COPY_PENDING / NOT_PRINT_READY`

ADD-02 is materially closer to `DESIGN_QA_PASS_WITH_PLACEHOLDERS`, but final declaration is deferred until a later run verifies long-copy/holder occlusion tolerance across the three archetypes. Do not return to cosmetic color tweaks unless that QA reveals a real defect.

## DEFERRED_FINALIZATION

- final destination imagery / crops
- final country editorial copy
- final table naming/identifier policy if changed
- stand/holder occlusion test
- vendor bleed/template/profile
- 100% physical proof / minimum-type / fine-rule print verification

Next target after ADD-02 closure: `ADD-03 当日タイムテーブルボード`.
