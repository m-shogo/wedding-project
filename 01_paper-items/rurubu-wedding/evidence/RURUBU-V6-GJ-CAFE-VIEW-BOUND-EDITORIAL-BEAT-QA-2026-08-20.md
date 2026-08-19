# Rurubu WEDDING V6 — GJ Cafe View-Bound Editorial Beat QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

GH Cafe was structurally sound and reader-facing, but the small source-limited Yokohama view still read as a separate lower photo card. `02`, its headline, support copy and Cafe Check note were spread too widely around it, so the lower half felt assembled rather than edited as one magazine beat.

## Bounded test

Created rollback-safe GJ from GH and changed only the existing Cafe 02 role:

- kept `PHOTO / GOURMET_VIEW_REPLACEABLE` at `238×218`, within its verified source tolerance;
- moved the photo upward and slightly left, rotation `-3°`;
- moved native `02` partly across the photo edge;
- tightened the native headline, copy, metadata and Cafe Check note into one right-hand text column;
- did not change the Table page, image hashes, Drive assets, generated assets, or V7.

## Evidence

- GH source: `1947:2`, Cafe left `1947:3`.
- GJ preferred: `1954:2`, Cafe left `1954:3`.
- photo hash unchanged: `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- composed Cafe texture hash unchanged: `691a6ceed471a5d8efa144052a10564eed177b4f`.

## Three-scale QA

- whole spread ~700px: PASS; lower Cafe content reads as one asymmetric feature more clearly than GH.
- reading spread 1200px: PASS.
- actual-size Cafe `1954:3 / 794×1123`: PASS.
- visible native text count: `20`.
- absolute native text collisions: `0`.
- 18px text safe-area risks: `0`.

## Adoption

GJ promoted into the existing Cafe/Table review-board slot at `x=273800 / y=1300`.
GH renamed `ROLLBACK / ...` and hidden; it was not deleted.
Start Here updated to `GJ CAFE & TABLE`.

## Asset lifecycle

- newly generated: `0`;
- adopted generated: `0`;
- new Drive saves: `0`;
- new binary placements: `0`;
- new image hashes: `0`;
- native text preserved: YES;
- replaceable photography preserved: YES.

## Result

`VERIFIED_LOCAL / ADOPTED`.
The improvement came from increasing editorial binding/responsibility of an already valid small photo, not from enlarging it beyond source tolerance or adding another asset.