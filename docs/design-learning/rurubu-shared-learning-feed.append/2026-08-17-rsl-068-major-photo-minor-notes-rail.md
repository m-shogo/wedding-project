# RSL-068 — Separate major photo events from minor chronology notes spatially

Date: 2026-08-17
Source scope/item: Rurubu WEDDING / V6 chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The chronology already used larger photography for major milestones and smaller typography for minor milestones, but both kinds of events still occupied the same central field. At reading scale the page felt busy because reading paths crossed.

## Root-cause hypothesis

Hierarchy is not only scale. When major photo-led events and minor bridge events serve different reading roles, giving them different spatial zones can reduce UI/timeline reading while preserving all native facts.

## Bounded test

On rollback-safe CO `1566:2`:

- Event 2 / 4 moved into a narrow, low-opacity travel-notes rail;
- Event 1 / 3 / 5 remained large replaceable photo beats in the main field;
- redundant crossing rules were hidden;
- the WEDDING terminal remained intact;
- native dates/titles/copy and replaceable-photo semantics were preserved;
- no new generated asset, card, shadow, gradient, or image hash was introduced.

The title width and Event 03 safe-area position were corrected after QA before promotion.

## Expected improvement

A clearer travel-magazine reading path: minor facts can be scanned quietly while major scenes carry visual energy.

## Regression risk

A side rail can become a dashboard/sidebar if it is too dark, too boxed, or too independent. It should remain visually subordinate and physically connected to the main story.

## Three-scale evidence

- whole spread ~1200px: PASS and clearer than CM;
- chronology actual-size `1566:27` = `794×1123`: PASS;
- native text `30`;
- text collisions `0`;
- 18px safe-area risks `0`;
- outside visible nodes `0`;
- all visible image roles intrinsic-safe.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted root: CO `1566:2`;
- chronology page: `1566:27`;
- rollback: CM `1559:2` hidden;
- Drive V6 authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CP-CO-EDITORIAL-FLOW-QA-2026-08-17.md`;
- evidence commit: `61b5e79cd4c249fdebf4efc7b9d9aab89cdb5281`.

## Adopted / rejected / blocked status

`ADOPTED / VERIFIED_LOCAL`.

## What must remain Rurubu-specific

Do not transfer the exact rail width, event numbers, event positions, travel texture, photography, palette, Japanese headline treatment, or WEDDING terminal geometry.

## Cross-item applicability hypothesis

On another print artifact with repeated information of unequal importance, independently test whether minor facts can occupy a quieter spatial role while major content keeps the main visual field. Do not automatically create a sidebar; the receiving item must prove the separation improves whole-item reading.
