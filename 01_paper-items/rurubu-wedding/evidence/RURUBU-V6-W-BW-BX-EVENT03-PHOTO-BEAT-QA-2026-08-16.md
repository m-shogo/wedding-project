# Rurubu WEDDING V6 — W + BW/BX Event-03 Photo Beat QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Observed defect

Preferred BV chronology was structurally safe, but the 02/03/04 region still read partly as text placed into leftover cream space. A small detached support photo lived near the title area while event 03 used a low-resolution skyline photo. The semantic milestone and the stronger photo were not bound together.

## Root-cause hypothesis

The page did not need another card, label, texture, or generated asset. It needed semantic image-role redistribution: promote an already verified stronger support photograph into the event-03 role, remove the redundant detached support role, and make 02 → 03 → 04 → 05 form a descending photographic/editorial route.

## Bounded test

Rollback-safe candidate:

- `1508:2 / CANDIDATE / V6_INSIDE_BX_EVENT03_PHOTO_BEAT_2026_08_16`
- chronology page: `1508:26`
- source: BV `1498:159`

Changes were limited to chronology:

- repurposed former top support image hash `439a719d73f28e8dd2889f2026cccb15f345ec63` as event-03 feature photo;
- display `300×220`, intrinsic `352×368`, therefore no intrinsic oversize;
- hid old event-03 skyline role hash `644f449c3bf2001a94d4b822d2b55e2614c11042` in BX;
- moved 02/03/04 positions to create a descending read before event 05 and the WEDDING terminal;
- added no new card, shadow, gradient, generated asset, or new raster bytes.

Initial structure QA found one real text collision between event-02 copy and the event-03 number. That state was not promoted. Event-03 number/block was moved rightward and QA was rerun.

## Three-scale / structural evidence

- whole spread at 1200px: PASS; BX reads more continuously than BV in the 02/03/04 zone;
- actual chronology `794×1123`: PASS;
- native text count: `30`;
- visible IMAGE roles: `4`;
- absolute text/text collision after repair: `0`;
- 18px text safe-area risk: `0`;
- page overflow text: `0`;
- all visible chronology images remain within registered intrinsic size.

Relevant intrinsic audit:

- hero `e3738476...`: display `801×430`, intrinsic `944×608`;
- event 03 `439a719d...`: display `300×220`, intrinsic `352×368`;
- event 01 `539c259b...`: display `350×190`, intrinsic `1356×560`;
- event 05 `d76eb07d...`: display `410×155`, intrinsic `732×498`.

## Promotion / rollback

Adopted:

- BX `1508:2` → `PREFERRED / V6_INSIDE_BX_EVENT03_PHOTO_BEAT_2026_08_16`.

Rollback preserved:

- BV `1498:159` → hidden `ROLLBACK_HIDDEN / V6_INSIDE_BV_COMPOSED_STORY_EDITORIAL_2026_08_16`.

Start Here `845:27` updated to:

`V5 FU/FX · V6 W + BW/BX INSIDE STUDIES · V7 HOLD`

## Asset lifecycle truth

- newly generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new distinct raster bytes: `0`
- existing verified image role reassignment: `YES`
- native text preserved: `YES`
- replaceable image semantics preserved: `YES`
- generated section masters adopted: `NO`
- V7 touched: `NO`

Drive V6 root was freshly read back during the run:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Status

`VERIFIED_LOCAL` and adopted as current V6 chronology study. Not print-ready; final copy, final photography, printer template, PDF preflight, and physical proof remain separate gates.
