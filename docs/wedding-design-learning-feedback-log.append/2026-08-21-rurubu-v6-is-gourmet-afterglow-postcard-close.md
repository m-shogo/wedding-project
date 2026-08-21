# 2026-08-21 — Rurubu V6 IS Gourmet / Cafe afterglow postcard-close feedback

Scope: `Rurubu WEDDING only`
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Source preferred: IN `2091:2`
Adopted preferred: IS `2110:2`

## Visible problem

The dining hero was already strong, but the right-page close fell back to a small support image plus multiple horizontal rules, a full-width utility block, and three evenly repeated micro items. At whole-item scale it read like a footer/dashboard appended beneath an otherwise editorial page.

## Root-cause hypothesis

The problem was not the reader-facing information. The rules and repeated row geometry were turning that information into UI scaffolding. Removing everything, however, would also remove the dense-but-readable print rhythm.

## Bounded test

On rollback-safe IS `2110:2`, preserving the left page:

- remove/hide lower rule scaffolding;
- keep 03 as a native text beat;
- enlarge the existing 04 image into a second visual chapter;
- keep 04 native kicker/title/copy adjacent;
- repack the useful `また行きたい` copy and 01/02/03 cues into a compact lower-left editorial memo/index;
- use no new image, card, shadow, gradient, or generated module.

## Failure observed

The first IS pass removed both scaffolding and too much informational density. It created a large dead cream field. This was rejected rather than called minimalism.

Failure fingerprint: `F-RSL-174-OVER-SUBTRACTION-EMPTY-CLOSE` — removing UI-like scaffolding and the useful editorial information it carried at the same time, producing dead paper instead of print-native breathing space.

Correction: preserve the subtraction but rehouse existing native information in a smaller editorial memo/index. Do not restore the old rules merely to fill space.

## Regression risk

- reintroduced copy could recreate the old footer feeling;
- 04 numeral could collide with 03 title;
- large 04 photo could overpower the 03 beat;
- narrow memo could fail Japanese readability;
- stacked cues could approach safe-area limits.

## Three-scale evidence

- whole spread / 500px: PASS after repair;
- reading / 1400px: PASS;
- actual-size right page / ~794×1123: PASS;
- final visible native text: `20`;
- final visible IMAGE fills: `2`;
- text intersections: `0`;
- 18px safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- IS preferred: `2110:2`, x=`273800`, y=`1300`;
- right page: `2110:33`;
- IN rollback: `2091:2`, hidden at x=`279200`, y=`1300`;
- hero hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- afterglow support hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IS-GOURMET-AFTERGLOW-POSTCARD-CLOSE-QA-2026-08-21.md`.

## Status

`ADOPTED / VERIFIED_LOCAL`

Cross-item learning status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Exact food/camera imagery, 03/04 hierarchy, image angle/crop, Japanese travel-magazine density, magenta/cyan/yellow treatment, copy and page coordinates remain Rurubu-specific.

## Cross-item applicability

Potentially transferable method only: when subtracting UI-like containers/rules from print work, distinguish the scaffolding from useful information density. If the first subtraction creates dead paper, rehouse existing native information into a smaller editorial role rather than restoring the old UI geometry. This is not yet a project rule.
