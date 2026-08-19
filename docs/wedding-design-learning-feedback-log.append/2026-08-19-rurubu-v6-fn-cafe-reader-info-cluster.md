# Rurubu V6 FN — Cafe reader-info cluster feedback

Date: 2026-08-19
Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL / V7_HOLD`

## Visible problem

Cafe/Table was the weakest of the six current V6 preferred spreads at same scale. The Cafe page contained useful `SWEETS / MOOD / PHOTO / TALK` metadata, but it was compressed into a single 10px block and therefore did not visually support the large travel-texture field. The page read more like a decorative template than a compact Japanese travel-guide information page.

## Principle / capability tested

Promote already-useful reader-facing native metadata into a readable editorial cluster before adding another photo, card, badge, generated decoration or raster layer.

## Expected improvement

Increase scan density and make the Cafe page feel intentionally informative while keeping:

- native editable text;
- existing composed texture;
- replaceable Cafe-view photo;
- current 01 / 02 hierarchy;
- Table page unchanged.

## Regression risk

- too much regularity could recreate a dashboard/grid;
- larger metadata could collide with the large Cafe headline;
- a right-side cluster could violate print safe area;
- additional micro-labels could read like production notes instead of reader information.

## Bounded experiment

FJ was duplicated before write. The existing four-line 10px block was split into four 13.5px native items and one 11.5px local kicker. No cards, new photos, generated imagery, image hashes, shadows or gradients were added.

## Failure evidence

The first layout was rejected structurally:

- `TEXT / CAFE_TITLE` contacted `TEXT / CAFE_INFO_KICK`;
- one approximate downward adjustment still touched;
- exact absolute bounding boxes were measured, then the cluster was moved based on measured geometry rather than another blind nudge;
- two 18px right-safe-area risks then appeared on items 02/04;
- only those two items were moved left.

Final structure: collision `0`, 18px safe risk `0`, page-level stray info nodes `0`.

## Three-scale evidence

FN `1866:2`, Cafe `1866:3`:

- whole / thumbnail 500px: PASS;
- reading scale 1200px: PASS;
- actual-size 794×1123: PASS.

## Asset / structure evidence

- Cafe visible IMAGE roles: `2`;
- composed texture remains `720×448`;
- replaceable Cafe photo remains `238×218`;
- new image hashes: `0`;
- new generated assets: `0`;
- Drive saves: `0`;
- external binary placements: `0`;
- native info nodes after adoption: `5` including kicker;
- FJ prior state preserved hidden as rollback;
- V7 unchanged.

## Adopt / reject decision

**ADOPT FN.**

The promoted metadata carries enough visual mass to make the large Cafe field function as useful magazine content, while remaining subordinate to the major Japanese headline and the lower 02 feature. The change improves travel-guide scan density without introducing a new UI/card system.

## Next application

Use this only as a diagnostic method: where a Rurubu page already contains useful reader-facing information that is visually too small to carry its field, test typography/hierarchy first. Do not copy the Cafe layout, colors, vocabulary or coordinates into other wedding items.

Learning: RSL-127 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
