# RSL-133 corroboration — 1DAY stop metadata actual-size legibility

Source scope/item: Rurubu WEDDING / V6 1DAY Plan GQ
Existing lesson: `RSL-133 — Subordinate beats must still survive actual-size reading`
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` (unchanged; corroborated within Rurubu only)

## Source problem

The 1DAY Plan right page had clear unequal hierarchy, but four useful reader-facing metadata rows remained 10px and were too close to micro-annotation strength at actual-size review.

## Root-cause hypothesis

Subordination had been achieved partly by making the metadata too small. The correct target was readable secondary information, not visual disappearance.

## Bounded test

Rollback-safe GQ `1964:2 / 1964:33` changed only STOP01–04 metadata from `10 → 11.5px`. All photo roles, hashes, stop numbers, times, titles, body copy, geometry and left-page content remained unchanged.

## Expected improvement

Improve actual-size travel-guide usefulness while retaining the established dominant/support stop hierarchy.

Regression risk: secondary type can become too loud and flatten the route rhythm; exact point sizes are not transferable.

## Three-scale evidence

- whole / 500px: PASS; hierarchy remains unequal;
- reading/context: no composition change and the route remains photo-led;
- actual-size right `794×1123`: PASS;
- visible native text `25`;
- collision `0`;
- 18px safe-area risk `0`;
- overflow `0`.

## Figma / Drive / GitHub evidence

- adopted GQ: `1964:2`;
- right page: `1964:33`;
- rollback GD: `1938:2` hidden;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`; Drive writes `0`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GQ-1DAY-METADATA-READABILITY-QA-2026-08-20.md`.

## What must remain Rurubu-specific

Do not transfer the 11.5px value, English metadata vocabulary, stop positions, photo ratios, travel route composition, palette, or Rurubu-like visual grammar.

## Cross-item applicability

No state promotion. This is same-item corroboration only. A materially different wedding print item would still need to independently verify that its secondary reader-facing information survives actual-size reading without flattening hierarchy before RSL-133 can advance beyond its current cross-item-candidate status.
