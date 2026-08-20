# RSL-145 — Bind a major chronology event to its legitimate photo before adding more timeline UI

Source scope/item: Rurubu WEDDING
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A chronology page can remain timeline/template-like even after cards and rails are removed when an important event's photograph and its native ordinal/title/copy are only spatially adjacent rather than visually functioning as one editorial beat.

## Root-cause hypothesis

For a major event with a semantically legitimate, source-safe photograph, integrating the native ordinal/title/copy into the photo can increase editorial cohesion and reduce diagram-like reading without adding containment or new assets.

## Bounded test

On rollback-safe GW `1987:2`, Event 03 alone was changed from separate photo + text to a photo-bound feature. Event 02/04 stayed quiet text beats. Existing photography, image hashes, facts and the rest of the spread were preserved.

## Expected improvement

More photo-led magazine reading, clearer major/minor hierarchy, less need for timeline UI.

## Regression risk

Photo contrast may not support native copy; variable text can overflow; increased type can wrap unexpectedly; not every event deserves photo responsibility.

## Evidence

- whole-item / ~1000px: PASS;
- reading/page scale: PASS;
- actual-size chronology `1987:28 / 794×1123`: PASS;
- visible text collisions: `0`;
- 18px text safe-area risks: `0`;
- image hashes unchanged;
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GW-PHOTO-BOUND-EVENT03-CHRONOLOGY-QA-2026-08-20.md`.

## Failure fingerprint

`PHOTO_BOUND_ORDINAL_NARROW_WIDTH_WRAP`: increasing an ordinal while retaining its old narrow box caused `03` to wrap vertically. The failed state was not adopted; box width and stack geometry were corrected before verification.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Must remain Rurubu-specific

The exact chronology layout, Event 03 photograph, Japanese copy, type sizes, palette, photo placement and travel-magazine grammar.

## Cross-item applicability hypothesis

On another print artifact, if a semantically important event/photo pair is valid but reads like separate modules, independently test whether native copy can be safely bound to that image before adding a card, rail or new decorative asset. Reject the treatment if contrast, variable-copy tolerance or source fidelity is weak.
