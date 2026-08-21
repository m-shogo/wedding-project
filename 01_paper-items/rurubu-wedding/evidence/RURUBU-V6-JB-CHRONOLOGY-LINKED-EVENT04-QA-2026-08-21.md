# Rurubu WEDDING V6 — JB Story / Chronology linked Event 04 QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority order used: live Figma → verified Drive → Rurubu evidence → GitHub status

## Problem observed

Fresh 500 px common-scale review of the preferred set `IU + IX + IR + IZ + IT + JA` showed the Story / Chronology right page as the next macro defect. IR already removed the old timeline rail and had a strong hero plus a large Event 03 street photograph, but Event 04 (`同棲`) remained a small isolated text island in the cream field to the left of the photograph. At whole-spread scale this read like a leftover timeline label rather than an intentional editorial beat.

## Root-cause hypothesis

The remaining UI/list feeling was not caused by insufficient decoration or insufficient photography. It came from **semantic adjacency without visual attachment**: Event 04 was chronologically adjacent to Event 03 but visually floated as an independent utility label. A bounded print-native caption strip physically attached to the existing Event 03 photograph could bind the transition without restoring a full rail, card grid, or another image.

Relevant shared method consumed: binding-function checking from `RSL-008 / NRSL-002`. This was treated as a method, not a literal layout instruction.

## Rollback-safe bounded test

1. Duplicate preferred IR `2104:2` to candidate JB `2144:2`.
2. Preserve the left Story page unchanged.
3. On the right Chronology page `2144:28`, retain the existing verified hero and Event 03 street image hashes.
4. Move/enlarge Event 03 image from `x=208 y=535 w=552 h=286` to `x=175 y=510 w=585 h=310`.
5. Reposition native Event 03 number/title/copy within the photographic beat.
6. Add one square-corner yellow editorial strip `2144:111` at `x=18 y=726 w=305 h=96`, deliberately overlapping the lower-left edge of the Event 03 photo.
7. Move native Event 04 number/title/copy onto that strip without baking text into raster imagery.
8. Move the existing cyan closing rule to `y=846` so the 03/04 beat hands off cleanly to 05/06.
9. Hide redundant `TEXT / PHOTO_CAPTION_FEATURE` `2144:76` after reading-scale review showed it stranded on the new strip and semantically duplicated the photo beat.
10. Add no new photo, shadow, gradient, rounded card, generated asset, Drive binary, or image hash.

## Expected improvement

- Event 04 should read as part of the same journey beat as Event 03 instead of a detached list item.
- Chronology should retain strong 01/02 opening and 05/06 terminal beats while becoming more recognizably magazine-editorial in the middle.
- The page should gain density and attachment without reverting to dashboard/timeline UI.

## Regression risks checked

- yellow strip becoming a generic badge/card rather than a real binder;
- excessive photo occlusion;
- native text collision after reparent/z-order operations;
- loss of caption readability;
- safe-area encroachment;
- accidental raster flattening or image-source change.

## Three-scale visual evidence

- whole spread / 500 px: PASS; JB is more coherent than IR because 04 is visibly attached to the photographic middle beat rather than floating in cream space.
- reading / 1400 px: PASS; Event 03 remains dominant, Event 04 is compact and intentional, and 05/06 remain clearly separate terminal beats.
- actual right page / native `794×1123`: PASS; hierarchy, contrast, crop and editorial handoff remain readable.

The first JB reading-scale screenshot exposed the old white `01 / 旅のはじまり` photo caption sitting partly over the new yellow strip. That refinement was rejected as-is; the redundant caption was hidden and all three scales were checked again before promotion.

## Structure QA

Final JB right page readback:

- visible native text nodes: `26`;
- visible IMAGE-fill nodes: `2`;
- visible image hashes: `e3738476f760932bb5b09c9d60f174dd6c84049d`, `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- text intersections: `0`;
- 18 px text safe-area risks: `0`;
- whole-page flattening: NO;
- native editable text preserved: YES;
- replaceable image structure preserved: YES.

## Promotion / rollback

- JB `2144:2` → `PREFERRED / V6_INSIDE_JB_STORY_CHRONOLOGY_LINKED_EVENT04_2026_08_21`, live `x=275600 y=0`.
- IR `2104:2` → `ROLLBACK / V6_INSIDE_IR_STORY_CHRONOLOGY_CLEANROOM_PHOTO_BAND_2026_08_21`, hidden `x=293700 y=0`.

Decision: `JB ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Drive / asset evidence

Verified V6 Drive root before writes:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Asset lifecycle delta for this experiment:

- generated: `0`;
- adopted generated: `0`;
- Drive saves: `0`;
- derivatives: `0`;
- uploads: `0`;
- new image hashes: `0`.

## Scope firewall

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, ADD-item Figma nodes, Drive item folders, ledgers, assets, or item-specific GitHub paths were inspected or edited. Only the neutral non-Rurubu shared-learning feed was consumed.

## Completion boundary

This is a verified local dummy-design improvement, not print-ready completion. Final legitimate photography/copy, exact printer template, bleed/trim/fold, PDF preflight and physical proof remain separate gates.