# Rurubu WEDDING V6 — EM Memory Spots Edge-led Feature QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Source problem

Preferred Memory Spots EJ `1759:2` was structurally sound, but the right guide page still had a large cream gap between Spot 03 and Spot 04. Spot 04 used a legitimate high-resolution dining photo (`732×498`) yet remained a medium `493×344` module, so the page still read partly as `small photo + text + another photo card` rather than a strong Japanese travel-magazine destination feature.

## Root-cause hypothesis

The defect was not missing imagery. Spot 04 already had a legitimate evidence-bearing photo with enough intrinsic size. Promoting that photo to an edge-led page feature and binding native title/copy directly to the photograph should increase magazine energy and reduce dead paper without adding cards, generated decoration, or another image.

## Bounded test

Created rollback-safe EM `1767:2` from EJ.

Changed only the right-page Spot 04 role:

- `PHOTO / MEMORY_SPOT_04_REPLACEABLE` → `x=30 / y=500 / 732×430`;
- preserved the original image hash/source and non-destructive replaceable IMAGE role;
- moved native `食卓も、旅の景色。` and its native supporting copy onto the photo;
- changed those two native text roles to white with small drop shadows for contrast;
- moved the existing magenta `04 / TABLE & TALK` label into the lower part of the photo;
- left Spot 03, guide title/deck, bottom CHECK metadata, left page, and all image hashes unchanged.

The first EM pass placed the magenta Spot 04 label across the navy guide rule. That state was not adopted. The label was moved upward (`y 900 → 872`) before final QA.

A second QA pass found the feature width at `733px` against a verified `732px` source width. The candidate was corrected to exactly `732×430` before promotion.

## Expected improvement

- reduce the right-page dead cream band;
- make Spot 04 a true second editorial feature instead of a medium card;
- strengthen photo-led Rurubu/travel-guide rhythm while preserving editable native text and replaceable photography.

## Regression risks checked

- text readability over photography;
- label/rule collision;
- 18px safe-area proximity;
- source upscaling;
- flattening/baking final wording into the photo.

## Three-scale / structural evidence

- EJ whole spread before: 1200px screenshot reviewed.
- EM whole spread after: 1200px screenshot PASS and visibly stronger than EJ.
- EM guide page `1767:24`: native `794×1123` screenshot PASS.
- visible native text on guide page: `14`.
- absolute text/text collisions: `0`.
- 18px text safe-area risks: `0`.
- Spot 04 display/source gate: `732×430 / 732×498`, PASS.
- Spot 03 remains `238×218 / 240×220`, PASS.

## Adoption state

- EJ `1759:2` → `ROLLBACK`, hidden.
- EM `1767:2` → `PREFERRED`, visible.
- Start Here `845:27` updated to `V6 EE + EK/EL + EM MEMORY SPOTS + EF CAFE & TABLE + EI 1DAY PLAN · V7 HOLD`.

## Asset lifecycle truth

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native final copy preserved: `YES`;
- remaining photos replaceable: `YES`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Result

`VERIFIED_LOCAL / ADOPTED`.

EM is preferred because the same legitimate photo now carries more editorial work, fills the physical page more intentionally, and produces a stronger photo-led travel-guide page without adding another asset or sacrificing editability.
