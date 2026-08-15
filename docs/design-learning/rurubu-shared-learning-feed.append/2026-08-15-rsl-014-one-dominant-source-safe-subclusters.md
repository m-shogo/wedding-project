# RSL-014 — One dominant field can let subordinate photo clusters stay source-safe

Source scope/item: Rurubu WEDDING / V5 inside FX

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

FO's lower Memory Spots section enlarged a `352×368` street source to `680×410` even though the upper History section already supplied a large photographic dominant. The page was creating a second hero from a weak source rather than using the existing hierarchy.

## Root-cause hypothesis

Designers/agents can over-assign dominance: each subsection is treated as needing a large hero, causing weaker rasters to be enlarged beyond credible print roles. If the page already has one legitimate dominant image, subordinate sections may preserve stronger source fidelity while retaining editorial energy through varied smaller images and typography.

## Bounded test

FX `1214:2` retains the upper History field as dominant and rebuilds lower Memory Spots as an asymmetric source-safe cluster:

- street intrinsic `352×368` → display `350×365`;
- exact skyline `240×220` → `200×220`;
- coast `796×428` → `330×177`.

FW `1213:2` was an intermediate test that fixed repeated waterfront semantics but left the street overscale and therefore was not promoted.

## Expected improvement

Eliminate source-fidelity debt without flattening the page into equally small modules, because dominance remains concentrated in a legitimate high-resolution field.

## Regression risk

Subordinate clusters can become too sparse, evenly card-like, or visually disconnected. Verify whole-item rhythm and binding rather than simply shrinking every image.

## Three-scale evidence

- 1000 px spread: PASS;
- actual-size right page `1214:132`, 794×1123: PASS;
- visible native text `52`;
- visible IMAGE fills `6`;
- absolute text intersections `0`;
- 18 px text safe-area risks `0`;
- all visible raster roles are at or below intrinsic size in both axes.

## Evidence references

- FX Best Inside `1214:2`;
- street `1214:267` hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, Drive `1ZsLOgZbZWyfYgDfvKvYPqOsbMJrSf1J5`;
- exact skyline `1214:268` hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`;
- coast `1214:269` hash `adbb8e529451a81dd25e4eb29bf068655569ce25`, Drive `1epb80L7WSZDmU86zl6PVQkZ8frP1JEeN`;
- learning run `01_paper-items/rurubu-wedding/learning-runs/2026-08-15-v5-fx-source-fidelity-memory-cluster.md`.

## What must remain Rurubu-specific

Exact three-image geometry, rotations, subjects, Japanese labels, colors, and travel-magazine art direction.

## Cross-item applicability hypothesis

When another print artifact has multiple sections with photography, independently check whether more than one section is being forced into a hero role. If a secondary hero depends on a weak raster, test retaining one legitimate dominant field and reducing the secondary images to source-safe, materially varied roles before generating or enlarging more imagery.

## Next receiving-item experiment

On a materially different item, inventory dominant vs support images and intrinsic/display sizes. If two or more sections compete as heroes and one source is weak, create one rollback-safe version that concentrates dominance in the strongest valid source and keeps the other images source-safe. Compare at whole-item, reading and actual size.
