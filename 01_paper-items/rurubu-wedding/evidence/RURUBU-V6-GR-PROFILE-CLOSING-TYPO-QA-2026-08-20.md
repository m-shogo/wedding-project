# Rurubu WEDDING V6 — GR Profile closing typography QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

Preferred GN `1957:2` had already removed the third profile snapshot photo, but the remaining `03 / 次の旅へ。` closing role still used a large vertically separated number, long editorial rule and widely separated copy. At whole-item and actual-size review it could still read as a missing third-photo slot rather than an intentional typographic closing feature.

## Root-cause hypothesis

The role did not need another image. It needed tighter native-type grouping so the visual responsibility clearly belonged to typography rather than an implied empty image container.

## Bounded rollback-safe test

Created GR candidate `1971:2` from GN without changing photos, image hashes, profile data, Q&A, page size or the existing composed route texture.

Only the Profile 03 closing nodes changed:

- `TEXT / SNAPSHOT_03_DESTINATION_NUM`
- `TEXT / SNAPSHOT_META_3`
- `TEXT / SNAPSHOT_03_DESTINATION_TITLE`
- `TEXT / SNAPSHOT_03_DESTINATION_BODY`
- `DECOR / SNAPSHOT_03_DESTINATION_RULE`
- `DECOR / SNAPSHOT_03_EDITORIAL_RULE`

Changes:

- compressed `03`, metadata, title and body into one compact lower-right editorial block;
- removed the long vertical decorative rule;
- retained one short functional horizontal accent rule;
- kept all final wording as native Figma text;
- added no image, card, generated asset, gradient, shadow or new hash.

The first GR geometry clipped the title and the second geometry still had one structural number/title contact. Those states were not promoted. The final candidate widened/repositioned the title/body within the safe area and shifted the number left until collision QA returned zero.

## Three-scale evidence

- whole spread / 500px: PASS; the Profile 03 area reads as an intentional typographic closing beat rather than an empty photo placeholder;
- reading / 1200px: PASS; hierarchy remains subordinate to the main profile hero and Q&A page;
- Profile actual-size / `794×1123`: PASS; `次の旅へ。` is fully readable and the closing block is visibly compact.

## Structure QA

Final GR Profile page `1971:3`:

- visible native text: `26`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible page-level stray text under candidate root: `0`.

## Adoption

- adopted preferred: GR `1971:2`;
- hidden rollback: GN `1957:2`;
- Start Here updated to `V6 GB + GR/GP + GE MEMORY SPOTS + GJ CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`.

## Asset lifecycle

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES.

Drive authority reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Result

`VERIFIED_LOCAL / ADOPTED`.

GR is stronger than GN because the no-photo role now looks deliberately typographic instead of visually implying an unfinished third snapshot. V6 remains not print-ready pending final photography/copy, page count/imposition, exact printer template, PDF preflight and physical proof.
