# RSL-101 — Photo sequences can lose template geometry without losing semantic structure

Date: 2026-08-18
Source scope/item: Rurubu WEDDING / V6 1DAY Plan
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A travel-guide sequence had strong native route information and valid replaceable photography, but four near-uniform rectangular photo placements still read as repeated layout modules.

## Root-cause hypothesis

The remaining template signal came from uniform photo geometry, not from insufficient decoration or missing information.

## Bounded test

On rollback-safe EH `1744:2`, preserve route rail, STOP order, times, titles, copy, practical metadata and image sources. Change only the four photo scales/positions with small rotations to create an asymmetric cascade.

The first geometry produced unintended photo/native-copy contact. That state was rejected. Corrected geometry was re-tested before adoption.

## Expected improvement

Increase editorial/photo-diary energy while preserving scan order, native editability and image replacement semantics.

## Regression risk

Rotated or enlarged images can silently cross safe zones or variable-copy areas. Any use requires structure collision checks and actual-size review.

## Three-scale evidence

- EH whole `1744:2`: PASS;
- reading comparison vs EG: PASS;
- EH right page `1744:29`, actual `794×1123`: PASS;
- text/text collision `0`;
- unintended text/photo collision `0`;
- 18px text safe-area risk `0`.

## Figma / Drive / GitHub evidence

- Figma: `bfM0d4c9dCeBv5pCkJ3TNM`;
- source preferred: EG `1739:2`;
- adopted: EH `1744:2`;
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EH-1DAY-ASYMMETRIC-PHOTO-DIARY-QA-2026-08-18.md`.

## Failure fingerprint

`ROTATED_PHOTO_BOUND_INTRUDES_NATIVE_COPY`

If a rotated/cascade photo touches variable copy, do not accept the screenshot alone; repair geometry and rerun actual-size collision QA.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL / ADOPTED` in Rurubu V6.

## What must remain Rurubu-specific

Do not transfer the 1DAY composition, route line, rotations, photo choices, palette, numbers, wording or exact coordinates.

## Cross-item applicability hypothesis

When a repeated photo sequence is semantically correct but visually module-like, independently test whether varied photo scale/position can remove the template signal before adding new decoration. Preserve the receiving item's own art direction and verify at actual size.
