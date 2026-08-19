# Rurubu V6 GC — Cafe overlapped view beat QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / ADOPTED`

## Visible problem

Preferred FN Cafe/Table was structurally safe, but the Cafe left page still read as `large texture field → separate small photo module → separate closing copy`. At whole/read scale the lower view photo started only after the composed texture ended, leaving a false section break and making the small Yokohama view feel like a placed card rather than part of one magazine page.

## Root-cause hypothesis

The problem was not missing photography. The small Yokohama source was already nearly at its intrinsic display limit, so enlarging it would trade editorial hierarchy for softness. The stronger test was to let the existing replaceable photo overlap the bottom of the travel-note field and move its native 02 copy into the same beat.

## Bounded test

Rollback-safe GC duplicated FN `1866:2` and changed only the Cafe left page:

- existing replaceable Yokohama view photo stayed `238×218`, source/hash unchanged;
- photo moved `y=686 → 600` and rotation `-2.5° → -4°` so it overlaps the bottom of the composed travel-note field;
- nonfunctional cyan `DECOR / CAFE_LABEL` was hidden;
- native `02`, view title/copy/meta/check note moved upward to form one photo-bound editorial beat;
- closing quote moved upward slightly to keep page cadence;
- no new photo, card, generated asset, raster, Drive save, binary placement, or image hash.

The first GC geometry visually improved the page but produced a 32px overlap between native `02` and the view title. It was not promoted in that state. The right text column was moved to x=382 and structure QA was rerun.

## Expected improvement

Reduce the false texture/photo section break, make the source-safe small image participate in the page rather than behave like a module, and increase travel-magazine rhythm without adding semantically unrelated photography.

## Regression risk

- rotated photo could intrude into native copy;
- small source could be over-enlarged;
- excessive overlap could make the Cafe page feel scrapbook-like rather than editorial;
- removing the cyan bar could weaken binding if the photo/copy relationship was not already clear.

## Three-scale / structure evidence

- previous FN 1400px spread reviewed before write;
- GC 1400px spread: PASS and stronger continuity than FN;
- GC Cafe actual-size `1933:3` = `794×1123`: PASS;
- visible Cafe native text: `21`;
- absolute text collisions after correction: `0`;
- 18px text safe-area risks: `0`;
- page-level stray nodes: `0`;
- view photo remains `238×218`, rotation `-4°`, existing hash/source role unchanged.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- promoted GC root: `1933:2`;
- Cafe page: `1933:3`;
- view photo: `1933:18`;
- FN rollback: `1866:2`, preserved hidden;
- Start Here: `845:27` updated to `GC CAFE & TABLE`;
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- no Drive write and no new image hash;
- durable evidence path: this file.

## Adoption

`GC = VERIFIED_LOCAL / PREFERRED`

FN remains rollback-safe hidden history.

## What remains Rurubu-specific

Exact photo, 01/02 numbering, rotation angle, magenta/cyan/yellow palette, Japanese copy, travel-note texture, coordinates, and Cafe/Table editorial grammar.

## Cross-item applicability

Candidate principle only: when a small legitimate image cannot be enlarged safely and a print page reads as stacked modules, another item may independently test whether controlled overlap across an existing decorative field creates continuity without adding an asset. Do not transfer this layout literally.
