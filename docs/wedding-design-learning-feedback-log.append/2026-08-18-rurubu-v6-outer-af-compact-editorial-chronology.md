# 2026-08-18 — Rurubu V6 Outer AF compact editorial chronology

Scope: Rurubu WEDDING only. V7 remained HOLD. No non-Rurubu item-specific state was inspected or edited.

## Visible problem

Outer AE had a strong photo-led back-cover top half, but the lower chronology still looked like loose interface/data metadata. The oversized `20XX-20XX` ghost range competed with the real sequence and weakened the final WEDDING close.

## Hypothesis

The problem was not missing decoration. Ambient metadata had too much visual weight, while 01–05 lacked a clear major/minor editorial rhythm and a subtle reading connection.

## Bounded experiment

Rollback-safe duplicate AF `1655:2` was created from AE `1646:2`. Only the back chronology was changed:

- ambient year-range ghost reduced to small low-opacity metadata;
- 01 / 03 / 05 made major beats;
- 02 / 04 retained as smaller bridge beats;
- one 2px low-opacity navy binding rail added;
- existing WEDDING terminal retained as the strongest close;
- front cover, photos, image hashes and photo geometry unchanged.

## QA / failure / correction

Initial structural QA caught two real collisions between major ordinals and their year labels. AF was not promoted in that state. The year/label pairs were moved and QA rerun.

Final evidence:

- whole-item / thumbnail: PASS;
- reading/page scale: PASS;
- back actual-size: PASS;
- back page `1655:3`;
- visible native back text: 23;
- text collisions: 0;
- 18px text safe-area risks: 0;
- rollback AE preserved hidden.

## Adoption

AF `1655:2` was promoted to `PREFERRED / V6_OUTER_AF_COMPACT_EDITORIAL_CHRONOLOGY_2026_08_18`.

AE `1646:2` was retained hidden as rollback.

Start Here was synchronized to:

`V5 FU/FX · V6 AF + DK/DK INSIDE STUDIES · V7 HOLD`

## Asset lifecycle truth

- generated this run: 0;
- adopted generated: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster/image hashes: 0;
- photo geometry/hash changes: 0;
- new Figma-native decoration: one restrained 2px binding rail;
- visually verified AF: YES.

Drive V6 root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Learning

RSL-085: ambient metadata must not outrank the editorial sequence. Shrink decorative metadata and establish major/minor native hierarchy before adding containment. A single binding rule is acceptable only when it improves reading continuity without turning the page into a diagram.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; not cross-item verified.

## Remaining gate

V6 remains `NOT_PRINT_READY`: final legitimate photography, final personal copy, exact printer/product template, bleed/trim/fold/page-order verification, PDF preflight and physical proof remain required.