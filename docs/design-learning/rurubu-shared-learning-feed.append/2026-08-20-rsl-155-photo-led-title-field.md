# RSL-155 — A false paper header can become a photo-led title field when the existing image has real text-safe capacity

Source scope/item: Rurubu WEDDING / V6 Yokohama 1DAY Plan
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred GR 1DAY Plan was already structurally sound, but its left page still opened with a large cream title/deck field above the dominant waterfront photograph. At whole-spread scale, that upper paper block made the page read more like a clean template with a hero inserted below than a photo-led Japanese travel-information feature.

## Root-cause hypothesis

The existing waterfront photograph already contained enough upper sky / low-detail area to carry native title and deck text. If the photograph could safely extend upward within its known source dimensions, the title and image could become one editorial field instead of two stacked modules. This should increase travel-magazine energy without adding imagery, cards, gradients, or generated decoration.

## Bounded test

A rollback-safe duplicate was created from GR:

- source: GR `2007:2`
- candidate / adopted: HS `2019:2`
- left page: `2019:3`

Changes were limited to the left page:

- existing waterfront hero `2019:9` moved from `y=285 / 793.7×395` to `y=70 / 793.7×560`;
- image hash remained `539c259be8036b481d06b4f76db9a39b407d90e8`;
- native title `朝から夜まで、ふたりの横浜。` moved onto the photograph and changed to white;
- native deck moved onto the photograph and changed to white;
- subtle text shadow used only to support legibility over the existing photograph;
- existing hero label moved to the lower image edge;
- `10:00 / 海辺から、旅を始める。` and the lower `旅のコツ / 横浜1DAYメモ` content were moved upward to use the reclaimed page rhythm;
- right-page 4-stop model-course structure, all right-page images, native copy, facts and image hashes were unchanged;
- no image generation, new photo, card, gradient, rounded container, page count or fact was added.

## Failure / correction

### `PHOTO_LED_TITLE_Z_ORDER_OCCLUSION`

The first visual read after extending the photograph showed the title/deck missing because the enlarged photo node was above the text in z-order. This was not counted as progress.

An attempted correction using a nonexistent `bringToFront()` method failed atomically with a Figma Plugin API error. Readback showed the prior candidate state remained intact. The method then switched to re-appending the existing title/deck/label nodes to their existing parent so they were ordered above the photo.

After correction, the native title/deck were visibly integrated into the photograph and retained editability.

## Expected improvement

- remove the stacked “paper header + hero module” reading;
- make the first page immediately photo-led at thumbnail scale;
- increase continuity between headline and destination photography;
- preserve all reader-facing information and replaceable-image behavior;
- avoid using new decorative imagery to create energy.

## Regression risk

- overlay copy can lose contrast when the replacement photo changes;
- extending a replaceable image role can exceed source dimensions or destroy the intended crop;
- moving the image upward can create a false safe-area pass if title text is not re-audited;
- z-order mistakes can make native text disappear behind images;
- the method is invalid when the existing photograph lacks a credible text-safe area.

## Three-scale evidence

Adopted HS:

- whole spread / ~500px: PASS; title and hero read as one dominant travel feature;
- whole / reading / 1200px: PASS and materially stronger than GR;
- actual-size left `2019:3 / 794×1123`: PASS;
- left visible native text: `23`;
- left same-parent text collisions: `0`;
- left 18px text safe-area risks: `0`;
- right visible native text: `25`;
- right same-parent text collisions: `0`;
- right 18px text safe-area risks: `0`;
- right photo structure unchanged from GR.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted: `2019:2 / PREFERRED / V6_INSIDE_HS_1DAY_PHOTO_LED_TITLE_FIELD_2026_08_20`
- adopted left: `2019:3`
- adopted right: `2019:33`
- rollback: `2007:2 / ROLLBACK / V6_INSIDE_GR_1DAY_JAPANESE_READER_UTILITY_COPY_2026_08_20`
- hero image hash unchanged: `539c259be8036b481d06b4f76db9a39b407d90e8`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- newly generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`

## Adopted / rejected / blocked status

- HS photo-led title field: `ADOPTED / VERIFIED_LOCAL`.
- initial title-behind-photo state: `REJECTED_VISUAL / CORRECTED`.
- `bringToFront()` correction method: `REJECTED / API CONTRACT FAILURE`; existing nodes were reordered by re-appending them to their current parent.

## What must remain Rurubu-specific

Do not transfer the exact waterfront photograph, title placement, white typography, 1DAY Plan structure, time labels, Yokohama wording, photo crop, shadow settings, or page coordinates.

## Cross-item applicability hypothesis

When a print page has a large quiet header field immediately above a dominant photograph, another item may independently test whether the existing image can safely absorb the native heading/deck and become a single photo-led editorial field. The test is valid only when the image itself has adequate text-safe area, replacement semantics remain clear, and actual-size contrast / safe-area / source-size checks pass.

The transferable principle is **merge redundant title/image fields when photography can genuinely carry the title**, not “put all text on photos.”

## Next receiving-item experiment

On a materially different print artifact, compare:

1. heading in a separate paper field above a photo;
2. the same native heading/deck integrated into the existing photo without adding imagery.

Reject the photo-led version if replacement-image variability, contrast, safe area, or source fidelity becomes weaker.
