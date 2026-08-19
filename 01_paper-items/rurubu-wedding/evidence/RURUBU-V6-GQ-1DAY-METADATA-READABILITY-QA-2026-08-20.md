# Rurubu WEDDING V6 — GQ 1DAY Metadata Readability QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

The GD 1DAY route page already had clear dominant/support photo rhythm and a readable 01→04 sequence. At native actual size, however, the four short reader-facing metadata rows remained 10px and read closer to micro-annotations than useful travel-guide details.

## Bounded test

Source:
- GD `1938:2`;
- right page `1938:33`.

Rollback-safe candidate/adopted:
- GQ `1964:2`;
- right page `1964:33`.

Changed only:
- `TEXT / STOP_01_META`: `10 → 11.5px`;
- `TEXT / STOP_02_META`: `10 → 11.5px`;
- `TEXT / STOP_03_META`: `10 → 11.5px`;
- `TEXT / STOP_04_META`: `10 → 11.5px`.

Unchanged:
- all images/crops/hashes;
- stop numbers/times/titles/body copy;
- left page;
- photo geometry;
- closing caption;
- page dimensions.

## Expected improvement

Keep the metadata clearly subordinate to time/title/photo hierarchy while ensuring it remains genuinely readable at the physical-page review scale.

Regression risk: over-enlargement could flatten hierarchy or create contact with nearby photos/copy.

## Visual QA

- 500px whole spread: PASS; hierarchy remains intact;
- right actual-size `794×1123`: PASS; metadata reads more comfortably;
- right-page native text: `25`;
- text collision: `0`;
- 18px safe-area risk: `0`;
- page overflow: `0`.

No variable copy width/position changed, so no new long-copy proof was required for this bounded metadata-size test.

## Adoption / rollback

Adopted:
- `1964:2 / PREFERRED / V6_INSIDE_GQ_1DAY_METADATA_READABILITY_2026_08_20`.

Rollback:
- `1938:2 / ROLLBACK / V6_INSIDE_GD_1DAY_NATIVE_CLOSING_CAPTION_2026_08_20` hidden.

Start Here `845:27`:
`V5 FU/FX · V6 GB + GN/GP + GE MEMORY SPOTS + GJ CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

## Asset lifecycle

- image generation: `0`;
- generated adoption: `0`;
- Drive save: `0`;
- external binary placement: `0`;
- new image hash: `0`;
- native text preserved: YES;
- replaceable photos preserved: YES;
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Result

`VERIFIED_LOCAL / ADOPTED / ACTUAL_SIZE_READABILITY_PASS / ROLLBACK_SAFE / V7_UNTOUCHED / NOT_PRINT_READY`
