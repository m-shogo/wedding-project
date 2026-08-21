# Rurubu WEDDING V6 — IZ Memory Spots overlap-postcard QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Visible problem

Common-scale review of the live preferred set `IU + IX + IR + IV + IT + IW` found Memory Spots left page still reading as a dominant hero followed by a separated lower utility zone. The Spot 02 cafe photograph began only after the hero and behaved as an independent lower rectangle, so the left page was calmer and more sectioned than the stronger photo-led V6 spreads.

## Root-cause hypothesis

The weakness was not image quality or missing content. The two legitimate photographs were assigned sequential section ownership. Bringing the secondary photograph upward so it crosses the hero/paper boundary, while narrowing the adjacent copy column, should create a continuous editorial reading path without adding cards, decoration, or new assets.

## Bounded rollback-safe test

- source preferred: IV `2127:2`
- candidate: IZ `2138:2`
- right page preserved unchanged from IV
- Spot 02 existing replaceable cafe photo moved/resized from `x=326 y=600 443×371` to `x=344 y=520 425×390`
- Spot 01 title/copy narrowed to preserve readable separation from the overlapping photo
- Spot 02 number/title/pullquote and its existing cyan label/rule were rebalanced around the new photographic role
- no new text, card, shadow, gradient, image, or generated asset added
- native text and existing IMAGE fills preserved

## Expected improvement

A more authentic Japanese travel-magazine transition from dominant destination photo into the next editorial beat, with stronger asymmetry and less `hero section → lower module` reading.

## Regression risk

The overlap could crowd Spot 01 copy, create text/photo collision, reduce the Spot 02 caption clarity, or expose insufficient image detail at actual size. Excessive overlap could also become decorative rather than editorial.

## Three-scale evidence

- whole spread / 500 px: PASS; IZ left page reads as one continuous photo-led field and is stronger than IV at thumbnail scale
- reading / 1400 px: PASS; Spot 01 and Spot 02 hierarchy remains clear and the cafe crop is credible
- actual left page / native `794×1123`: PASS; copy remains legible and the overlap is intentional rather than collision-like

## Structure evidence

Pre-promotion readback on IZ `2138:2`:

- visible native text: `27`
- visible IMAGE-fill nodes: `4`
- same-parent text intersections: `0`
- 18 px text safe-area risks: `0`
- whole-page flattening: NO
- replaceable photography preserved: YES

## Promotion / rollback

- IZ `2138:2` → `PREFERRED / V6_INSIDE_IZ_MEMORY_SPOTS_OVERLAP_POSTCARD_2026_08_21`, live `x=272000 y=1300`
- IV `2127:2` → `ROLLBACK / V6_INSIDE_IV_MEMORY_SPOTS_EDITORIAL_INFO_TAIL_2026_08_21`, hidden at `x=288400 y=1300`

Decision: `IZ ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Asset lifecycle state

Image quality was not the bottleneck in this experiment.

- generated assets: `0`
- newly adopted generated assets: `0`
- new Drive master saves: `0`
- new role-sized derivatives: `0`
- new external Figma placements: `0`
- new image hashes: `0`

All visual changes reuse existing verified Rurubu replaceable photography.

## Print/readiness boundary

This is dummy-design visual QA, not print-ready certification. Final real photography/copy, printer bleed/trim/fold template, exported PDF preflight, and physical proof remain separate gates.