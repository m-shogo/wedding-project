# Rurubu WEDDING V6 — FL / FM Visual QA — 2026-08-19

Scope: Rurubu WEDDING only. V7 remained HOLD. No non-Rurubu item-specific Figma, Drive, asset, ledger, or GitHub path was inspected or edited.

## Starting truth

- live Figma authority: `bfM0d4c9dCeBv5pCkJ3TNM`
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- GitHub status was stale at FK/FI, while live Figma already contained FL.
- old top-level V6 studies were still visible and scattered around the canvas.

## Review-board cleanup

Twelve obsolete top-level V6 study/comparison roots were hidden, not deleted. The six current preferred spreads were arranged into a compact 3×2 review board in this order:

1. FH Outer `1854:2`
2. FG Profile/Q&A `1851:2`
3. FL Story/Chronology `1874:2`
4. EW Memory Spots `1826:18`
5. FJ Cafe/Table `1866:2`
6. FM 1DAY Plan `1879:71`

No internal spread geometry, image hash, native copy, or photo role was changed by the review-board cleanup.

## FL — chronology reconciliation

Live preferred FL `1874:2`, chronology `1874:28`, was re-read and reverified. FL retains FK's semantic photo subtraction for event 05 `入籍`, but uses a bounded existing travel texture behind that native milestone so the resulting whitespace reads as intentional editorial density rather than an empty photo slot.

Three-scale evidence:

- whole-item thumbnail ≈500px: PASS;
- reading-scale review: PASS;
- chronology actual-size `794×1123`: PASS;
- visible native text on chronology: `31`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`.

No new generated asset, Drive save, binary placement, or image hash was introduced.

## FM — 1DAY semantic stop hierarchy

Source FI `1863:18` had unequal photo mass, but STOP02/03/04 native numbering remained visually near-equal. This weakened the intended editorial hierarchy: STOP02 carries the dominant mid-route photo, STOP03 is a bridge, and STOP04 is the closing photo beat.

Bounded test:

- duplicate FI into a rollback-safe candidate;
- keep all photos, crops, copy, metadata, image hashes, and page structure unchanged;
- enlarge native `02` and `04` from 28px to 42px;
- keep `03` at the smaller support scale;
- compare whole spread and right page at actual size.

The first implementation attempt failed atomically because a Figma CSS-like selector contained `/`. No Figma mutation occurred. Existing fingerprint: `FIGMA_QUERY_SELECTOR_SLASH_ATOMIC_FAILURE`. Method was switched to query-all + exact-name filter rather than retrying the same selector.

Final FM result:

- preferred FM root: `1879:71`;
- right page: `1879:102`;
- source FI `1863:18`: hidden rollback;
- whole-item thumbnail ≈500px: PASS;
- reading scale: PASS;
- actual-size right page `794×1123`: PASS;
- native text: `25`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- replaceable photos: unchanged;
- new image hashes: `0`.

Visible result: native hierarchy now matches visual responsibility — 01 is the start, 02 is the dominant mid-route feature, 03 is a bridge, and 04 is the closing feature. The page reads less like four equal itinerary modules without adding cards, rails, badges, or photography.

## Adoption / rollback

- FL remains preferred.
- FM promoted to preferred.
- FI preserved hidden as rollback.
- Start Here `845:27` updated to FM.
- V7 unchanged / HOLD.

## Asset lifecycle state

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback history preserved: YES.

This is verified local dummy-design progress, not print-ready completion.