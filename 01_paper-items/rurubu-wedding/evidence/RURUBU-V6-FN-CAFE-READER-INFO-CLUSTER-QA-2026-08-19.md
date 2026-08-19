# Rurubu WEDDING V6 — FN Cafe reader-info cluster QA

Date: 2026-08-19
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / FN_PREFERRED / ROLLBACK_PRESERVED / V7_HOLD / NOT_PRINT_READY`

## Authority

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Rurubu page: `845:2`
- preferred Cafe/Table spread: `1866:2 / PREFERRED / V6_INSIDE_FN_CAFE_READER_INFO_CLUSTER_2026_08_19`
- Cafe page: `1866:3 / PAGE / GOURMET_CAFE_GUIDE`
- Start Here: `845:27`
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- source FJ state restored as hidden rollback: `ROLLBACK / V6_INSIDE_FJ_CAFE_TABLE_PRE_READER_INFO_CLUSTER_2026_08_19`

## Visible problem

At same-scale review of the six preferred V6 spreads, Cafe/Table was the weakest spread. The Cafe left page already had a large composed travel texture and strong native `01` / Japanese headline, but the useful reader-facing metadata was packed into one 10px four-line block:

- `SWEETS / 甘いもの`
- `MOOD / ゆっくり`
- `PHOTO / 窓ぎわ`
- `TALK / ふたり時間`

The information was semantically useful, but at reading and actual-size scales it did not carry enough visual mass to make the large texture field feel like a real travel-guide information cluster. The page therefore retained a decorative/template-like quietness despite having useful content available.

Fingerprint: `READER_INFO_MICROTEXT_FAILS_TO_CARRY_EDITORIAL_DENSITY`.

## Root-cause hypothesis

Useful metadata can still fail to create editorial density when it is compressed below the page's hierarchy threshold. Adding more cards or another photo would increase module/UI character; instead, the existing reader-facing information should first be promoted into a readable native-text cluster.

## Bounded test

Rollback-safe duplicate first, then deterministic screenshot QA on the known FJ node:

- keep Cafe/Table photographs, image hashes, crops, travel texture, headline, 02 feature and Table page unchanged;
- preserve all metadata as native Figma text;
- split the original 10px four-line text into four 13.5px reader-facing items;
- add one small native kicker `ふたりのカフェメモ / 4 NOTES`;
- reuse the existing cyan rule as a local binder;
- do not add cards, shadows, gradients, photos, generated assets, raster bytes or new image hashes.

Adopted cluster:

- `SWEETS / 甘いもの`
- `MOOD / ゆっくり`
- `PHOTO / 窓ぎわ`
- `TALK / ふたり時間`

## Failure / correction evidence

The first layout was not adopted:

1. structural QA found `TEXT / CAFE_TITLE <> TEXT / CAFE_INFO_KICK` contact;
2. an initial downward adjustment still touched because the Cafe title's actual bounding box extended farther than its apparent local position;
3. exact absolute bounding boxes were measured before changing method/geometry further;
4. after resolving the title contact, structural QA found two 18px right safe-area violations on items 02 and 04;
5. only the right-column metadata was shifted left and the gates were rerun.

Final structural gate passed with no error.

This was not treated as cosmetic retrying: after the repeated title contact, the method changed from approximate local-coordinate nudging to exact absolute-bounding-box measurement before the next correction.

## Three-scale visual evidence

Post-promotion FN:

- whole / thumbnail `500px`: PASS;
- reading scale `1200px`: PASS;
- Cafe actual-size `794×1123`: PASS.

The cluster reads as useful magazine scan-density while remaining subordinate to the main `01` and lower `02` feature. It does not introduce a new card/grid system.

## Structure / editability QA

Final Cafe page:

- absolute native-text collisions: `0`;
- 18px text safe-area risks: `0`;
- page-level stray `CAFE_INFO` nodes: `0`;
- Cafe visible IMAGE roles: `2`;
- composed travel texture geometry: `720×448`, unchanged;
- replaceable Cafe-view photo geometry: `238×218`, unchanged;
- reader-info native text nodes: `5` including the local kicker;
- source photos remain independently replaceable;
- native text remains editable;
- new image hashes: `0`.

## Asset lifecycle truth

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster bytes: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback state preserved: YES;
- V7 touched: NO.

## Learning status

RSL-127: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What remains Rurubu-specific: Cafe vocabulary, magenta/cyan art direction, exact coordinates, sizes, travel-texture treatment, page role and Japanese travel-guide visual language.

Cross-item candidate only: when useful reader-facing metadata exists but is visually too small to carry a large editorial field, test promoting that same native information before adding another card, photo or decoration. Re-run actual-size collision and safe-area QA.

## Deferred completion gates

FN is a verified dummy-design study, not final/print-ready. Final photography, final copy, page count/imposition, exact printer template, bleed/trim/fold requirements, exported PDF preflight and physical proof remain outstanding.
