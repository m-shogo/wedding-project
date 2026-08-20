# Rurubu V6 GW — Photo-bound Event 03 Chronology QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

GS chronology was structurally safe after unresolved pseudo-date subtraction, but Event 03 still read as a photo placed beside independent chronology text. At whole/page scale the page retained a mild timeline-template feeling: 01/02/04 were text beats while 03's image and copy did not behave as one editorial feature.

## Hypothesis

If the already-valid Event 03 photo and its native ordinal/title/copy are bound into one photo-led editorial beat, while 02/04 remain quieter native notes, the chronology can read more like a Japanese travel-magazine photo feature without adding cards, generated decoration, or new photography.

## Bounded test

Rollback-safe duplicate GW `1987:2` from GS `1981:2`.

Changed only chronology-right roles:

- `03` promoted to a large white native ordinal directly on the existing Event 03 photo;
- `ふたり旅` title + native copy moved onto the same photo;
- `02` / `04` remain quiet supporting events;
- `寄り道メモ / 02・04` changed to reader-facing `ふたりの寄り道。`;
- hero, Event 03 image source/hash, 01/05/06 facts, Story page, generated/composed texture and all other image roles preserved.

No new image generation, Drive write, binary placement, image hash, card, shadow, gradient or generated decoration was added.

## Iteration failure

First GW pass made `03` wrap vertically because the text box remained too narrow after increasing type size. The candidate was not adopted in that state. The ordinal box was widened and the photo-bound stack reflowed before re-review.

Failure fingerprint: `PHOTO_BOUND_ORDINAL_NARROW_WIDTH_WRAP`.

## Visual QA

- whole spread / ~1000px: PASS; stronger than GS because Event 03 now reads as one photo-led beat;
- reading/page: PASS;
- chronology actual-size `1987:28 / 794×1123`: PASS;
- visible native chronology text: `28`;
- absolute visible text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible IMAGE roles: `3` total including the existing composed texture; Event 03 photo remains replaceable;
- page overflow/stray visible text: none observed.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

- GW `1987:2` renamed `PREFERRED / V6_INSIDE_GW_PHOTO_BOUND_EVENT03_CHRONOLOGY_2026_08_20` and moved into the current 3×2 review position.
- GS `1981:2` preserved hidden as rollback.
- Start Here updated to `V6 GU + GT/GW + GV MEMORY SPOTS + GJ CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`.

## Asset / provenance state

- newly generated assets: `0`
- adopted generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`
- native variable text preserved: YES
- replaceable photos preserved: YES
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Learning

Photo-led chronology becomes more editorial when a semantically important event's ordinal/title/copy are visually bound to its legitimate photograph instead of merely sitting nearby. This is not a rule to overlay all chronology copy onto photos: contrast, source fidelity, long-copy tolerance, and major/minor hierarchy must be checked per role.
