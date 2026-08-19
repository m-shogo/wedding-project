# RSL-134 — Controlled overlap can give a source-limited photo more editorial responsibility

Source scope/item: Rurubu WEDDING / V6 Cafe & Table
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The Cafe page had a legitimate but small Yokohama view photo whose source dimensions did not support enlargement. Keeping it below the composed travel-note field made the page read as stacked modules with a false section break.

## Root-cause hypothesis

When a small legitimate image is already close to its source-size ceiling, scale is not the only way to increase visual responsibility. Controlled overlap with an existing decorative field can create page continuity while preserving source fidelity.

## Bounded test

On rollback-safe GC:

- kept the existing photo at `238×218`;
- moved it upward so it overlaps the bottom of the travel-note field;
- increased rotation only from `-2.5°` to `-4°`;
- moved native `02` title/copy metadata into the same beat;
- removed one nonfunctional cyan bar;
- added no asset, card, raster, or image hash.

The first geometry created a 32px native-text overlap and was not adopted. The text column was separated and revalidated.

## Expected improvement

More continuous print/editorial rhythm without source upscaling or semantically unrelated substitute photography.

## Regression risk

Overlap can become scrapbook clutter, rotated images can invade text, and the technique must not be used to hide low-resolution imagery.

## Three-scale evidence

- whole/read spread comparison: GC stronger than FN;
- actual-size Cafe `1933:3` = `794×1123`: PASS;
- native text collisions: `0` after correction;
- 18px safe-area risks: `0`;
- no new image hash or source-size growth.

## Figma / Drive / GitHub evidence

- Figma file `bfM0d4c9dCeBv5pCkJ3TNM`;
- GC `1933:2`, Cafe `1933:3`, photo `1933:18`;
- FN `1866:2` preserved hidden rollback;
- Drive root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GC-CAFE-OVERLAPPED-VIEW-BEAT-QA-2026-08-20.md`;
- evidence commit: `9f80c27468e04aea1631e1f7951df1e4455491de`.

## What must remain Rurubu-specific

Exact overlap geometry, photo choice, copy, color system, rotation, numbering, texture, and travel-magazine styling.

## Cross-item applicability hypothesis

Another print item may independently test this only when (1) an image is legitimate and source-limited, (2) enlargement would exceed quality tolerance, and (3) the page suffers from a false module boundary. The transferable method is `source-safe overlap + actual-size text/photo QA`, not the Rurubu layout.

## Next receiving-item experiment

If a materially different wedding print artifact contains a source-limited replaceable image next to an existing decorative field, compare separate placement vs controlled overlap at whole/read/actual scale. Reject if grouping, physical semantics, or legibility regress.
