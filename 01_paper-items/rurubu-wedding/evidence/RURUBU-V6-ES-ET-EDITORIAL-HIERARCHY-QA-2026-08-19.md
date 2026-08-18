# Rurubu WEDDING V6 — ES / ET Editorial Hierarchy QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Starting authority

Run-start GitHub status declared `EO + EK/EN + EM + ER + EQ`, with V7 HOLD. Live Figma confirmed all six preferred roots existed before writes.

After same-scale review, the two clearest defects were:

1. Outer EO back-cover chronology: strong photo field above, but the lower chronology read as small scattered metadata and was visibly weaker than the inner EN chronology.
2. Profile EK lower-right `03 / NEXT DESTINATION`: structurally intentional text-only role, but too weak at whole-spread scale and therefore liable to read as a missing third photo slot.

No non-Rurubu item-specific Figma, Drive, asset or ledger state was inspected or edited.

## ES — Outer back chronology

Source: EO `1780:2`, back `1780:3`.
Adopted: ES `1815:2`, back `1815:3`.
Rollback: EO preserved hidden.

### Bounded change

Front cover remained unchanged. Back chronology only:

- `01 / 03 / 05` promoted as major native-number beats;
- `02 / 04` retained as smaller bridge events;
- short magenta / cyan / yellow editorial rules used only to reinforce the three major beats;
- `2026.10.24 / WEDDING` terminal preserved as the final strongest destination;
- tiny `6 SCENES / MEMORY ROUTE` metadata moved off the skyline photo onto the cream field.

No card system, new photography, new raster or image hash was added.

### Rejected / corrected states

The first ES visual candidate was stronger at thumbnail scale but structure QA found five real text contacts around 02/03/05. The candidate was not promoted. Event date/title positions were corrected while preserving the major/minor hierarchy.

### Three-scale evidence

- whole / 500px: PASS; stronger than EO, with major/minor event hierarchy visible at thumbnail scale;
- reading / 1200px: PASS;
- actual-size back `1815:3` 794×1123: PASS.

Final structure QA:

- visible native text: 24;
- text collisions: 0;
- 18px text safe-area risks: 0;
- page overflow: 0;
- visible back image roles: 2, unchanged sources/hashes from EO.

## ET — Profile text-only closing feature

Source: EK `1762:2`, Profile `1762:3`.
Adopted: ET `1817:2`, Profile `1817:3`.
Rollback: EK preserved hidden.

### Bounded change

The lower-right text-only `03 / NEXT DESTINATION / 次の目的地へ。` role was strengthened using native typography only. The two existing snapshot photos and all image hashes/geometry were preserved.

Final role:

- small `NEXT DESTINATION` kicker;
- large single-line native `03`;
- stronger native `次の目的地へ。` title;
- one short yellow rule.

No third photo was added. This makes the absence of a third image intentional rather than looking like an empty image slot.

### Rejected / corrected states

- first enlarged `03` wrapped vertically into `0 / 3` because the text box was too narrow: rejected;
- an additional native note crowded the photo boundary: hidden/rejected;
- later structure QA found `03` touching the profile value area and its kicker: corrected before promotion.

### Three-scale evidence

- whole spread / 1200px: PASS;
- reading scale: PASS;
- actual-size Profile `1817:3` 794×1123: PASS.

Final structure QA:

- visible native text: 25;
- text collisions: 0;
- 18px text safe-area risks: 0;
- page overflow: 0;
- visible image roles: 4, unchanged from EK;
- replaceable photo roles preserved: YES.

## Final live preferred readback

- Outer ES `1815:2`
- Profile / Q&A ET `1817:2`
- Story / chronology EN `1773:2`
- Memory Spots EM `1767:2`
- Cafe / Table ER `1805:134`
- 1DAY Plan EQ `1803:2`
- Start Here `845:27`: `V5 FU/FX · V6 ES + ET/EN + EM MEMORY SPOTS + ER CAFE & TABLE + EQ 1DAY PLAN · V7 HOLD`

Drive root was reverified after the Figma promotions.

## Asset lifecycle declaration

- newly generated assets: 0
- adopted generated assets: 0
- new Drive saves: 0
- new external binary placements: 0
- new image hashes: 0
- image-source changes: 0
- native variable text preserved: YES
- replaceable photos preserved: YES
- rollback state preserved: YES
- V7 touched: NO

## Status

`ES = VERIFIED_LOCAL / ADOPTED`

`ET = VERIFIED_LOCAL / ADOPTED`

V6 remains `NOT_PRINT_READY`. Final legitimate photos/copy, page count/imposition, printer template, bleed/trim/fold/safe-area, PDF preflight and physical proof are still separate gates.
