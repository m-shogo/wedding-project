# Rurubu V6 — GJ Cafe View-Bound Editorial Beat

Date: 2026-08-20

## Problem

GH Cafe was readable but the small Yokohama view, native `02`, headline, copy and check note still felt like separate modules.

## Test

Created GJ from GH. Kept the source-limited view photo at `238×218`, moved it upward/left, used only a mild `-3°` rotation, moved native `02` across its edge, and tightened the existing native headline/copy/check information into one adjacent column.

## Expected improvement

Make the lower Cafe page read as one magazine feature without adding an image or exceeding source tolerance.

## Regression risk

Overlap could create collision/safe-area defects or make the small source carry too much visual mass.

## Evidence

- whole ~700px: PASS;
- reading 1200px: PASS;
- actual-size 794×1123: PASS;
- native collision 0;
- 18px safe risk 0;
- photo hash/source role unchanged;
- Table page unchanged.

## Decision

ADOPTED as GJ `1954:2`; GH retained hidden rollback.

## Next application

Continue looking for places where hierarchy is correct but image/copy binding is weak. Do not use overlap as a default or enlarge source-limited images merely to create density.