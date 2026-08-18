# 2026-08-18 — Rurubu V6 DO side-trip rail subtraction

Scope: Rurubu WEDDING only.

## Observation

Preferred DM chronology was visually strong overall, but the long 02/04 side-trip rail and ticks still pulled the left margin toward timeline/diagram UI.

## Hypothesis

The rail had become redundant because native ordinal/date/title hierarchy plus spatial grouping already communicated the 02/04 relationship.

## Bounded test

Created rollback-safe DO `1679:2` from DM `1665:2`. Hid only the long side-trip rail and its two ticks. Preserved the side-trip label, all event copy, all replaceable photos, image hashes, Story page, WEDDING terminal and composed texture.

## Result

Adopted DO after:

- 900px whole-spread comparison PASS;
- reading-scale PASS;
- chronology actual-size `794×1123` PASS;
- native text `31`;
- text collision `0`;
- 18px safe-area risk `0`;
- overflow `0`.

The page reads more like a photo-led travel feature and less like a timeline component. 02/04 remain legible as secondary side-trip notes without the scaffold.

## Status

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Asset state

Generated: 0. Adopted generated: 0. Drive saves: 0. Binary placements: 0. Image-hash changes: 0. Native text and replaceable photo roles preserved.

## Rurubu-specific boundary

Exact geometry, wording, palette, photo roles and Japanese travel-magazine treatment remain Rurubu-only.

## Next application

Continue V6. Re-evaluate existing rails/borders only when their binding role is ambiguous; do not turn subtraction into a blanket style rule. Keep V7 on HOLD.
