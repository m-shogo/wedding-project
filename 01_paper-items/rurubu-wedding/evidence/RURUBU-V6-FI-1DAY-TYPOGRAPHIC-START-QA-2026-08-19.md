# Rurubu V6 FI — 1DAY typographic start QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

FA `1840:2` was structurally sound, but STOP01 still carried a small Yokohama skyline photo while the spread already had a large waterfront opening image and the same small skyline source appears elsewhere in the V6 photo pool. At whole/read scale this made the right page read as four photo-attached itinerary modules rather than an intentionally unequal travel-magazine sequence.

## Bounded experiment

Rollback-safe FI `1863:18` was duplicated from FA.

Changed only STOP01 on the right page:

- hide `PHOTO / STOP_01_REPLACEABLE_YOKOHAMA_SKYLINE_VERIFIED`;
- keep all STOP01 semantic copy native and editable;
- promote native `10:00` from 12px metadata to a 54px typographic opening beat;
- retain `01`, title, copy and MOVE/MOOD metadata as native text;
- preserve STOP02/03/04 photographs, hashes, crops and geometry unchanged.

No new raster, generated asset, Drive save, external binary placement or image hash was introduced.

## Expected improvement

- reduce one repeated skyline-photo role without substituting unrelated imagery;
- make STOP01 feel like a typographic starting beat rather than another equal photo module;
- increase dominant/support contrast between STOP01 and the photo-led STOP02/03/04 sequence;
- preserve later editability of time/title/copy.

## Regression risk

Removing the small photo could create dead cream space or weaken destination context. Enlarging time typography could collide with the stop title or become timetable/UI-like if the hierarchy were not balanced.

## Three-scale evidence

- whole spread 900px: PASS; FI visually stronger than FA for the targeted defect;
- whole spread 1200px: PASS;
- right page `1863:49` actual-size `794×1123`: PASS;
- native right-page text count: `25`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible page-level STOP strays: `0`.

Visible right-page image roles after change:

- STOP02 `480×290`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- STOP03 `290×220`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- STOP04 `480×220`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

STOP01 skyline photo is hidden in FI; no source was replaced.

## Adoption / rollback

- adopted preferred: FI `1863:18` — `PREFERRED / V6_INSIDE_FI_1DAY_TYPOGRAPHIC_START_NO_REPEAT_SKYLINE_2026_08_19`;
- right page: `1863:49`;
- rollback: FA `1840:2`, hidden and renamed `ROLLBACK / V6_INSIDE_FA_1DAY_PHOTO_LED_EDITORIAL_STOPS_2026_08_19`;
- Start Here `845:27` updated to FI;
- V7 unchanged / HOLD.

## Asset / Drive truth

Drive V6 authority reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

This experiment used:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable remaining photos preserved: YES.

## Status

`VERIFIED_LOCAL / ADOPTED / NOT_PRINT_READY`

Final printer template, bleed/trim/fold, final legitimate photography/copy, PDF preflight and physical proof remain separate completion gates.
