# Rurubu V6 IU / IV visual QA — 2026-08-21

Scope: Rurubu WEDDING only. V7 untouched. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD production surface was inspected or edited.

## Authority/readback before writes

- Shared learning system read: `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`.
- Rurubu feed read: `docs/design-learning/rurubu-shared-learning-feed.md`.
- Neutral non-Rurubu feed read only as the allowed cross-scope learning surface.
- Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- GitHub main status was re-read before documentation; live Figma remained the higher authority.

## Common-scale diagnosis

The current preferred six-spread set was re-rendered at a common 500 px whole-spread scale. After IT, the next macro defects were:

1. IQ outer front still read as a header/photo/lower-field stack; the dominant Yokohama photo stopped too early and the cream lower field weakened cover immersion.
2. IH Memory Spots right page ended in a 3×2 field of six tiny utility facts. The information was useful, but the repeated equal cells reintroduced dashboard/grid rhythm immediately after the strong Spot 04 dining photograph.

No new photography was required; composition and information-role hierarchy were the bottlenecks.

## IU — full-bleed editorial outer cover

### Source / candidate

- source: IQ `2099:2 / PREFERRED / V6_OUTER_IQ_CONTINUOUS_PHOTO_COVER_2026_08_21`
- clean-room duplicate: IU `2124:2`
- adopted: `PREFERRED / V6_OUTER_IU_FULL_BLEED_EDITORIAL_COVER_2026_08_21`
- IQ after promotion: hidden rollback at x=`283000`, y=`0`
- IU after promotion: x=`272000`, y=`0`, visible
- back cover preserved from IQ; only the front-cover hierarchy changed.

### Bounded design test

- existing Yokohama hero hash `539c259be8036b481d06b4f76db9a39b407d90e8` was extended upward to become the continuous cover field;
- the cream lower field was reduced to a 150 px closing strip rather than a 273 px page section;
- existing dining support photo stayed as an overlapping secondary cover beat rather than becoming a separate card;
- destination `横浜`, issue strap, 01 feature and existing masthead lockup stayed native/editable or existing replaceable assets;
- no new card, gradient, shadow, generated photo, uploaded binary or new image hash was added.

### Rejected intermediate state / root cause

The first full-height hero test used height `1123` and increased the destination type to 104 px while retaining its inherited fixed `25 px` line-height. Visual QA exposed two regressions:

1. the full-height `FILL` crop over-expanded the sky field and weakened photographic tension;
2. `横浜` clipped because font-size growth did not revalidate the inherited fixed line-height.

The candidate was not promoted in that state. The repair used hero height `973`, a 150 px closing strip, destination 100 px with explicit 104 px line-height, and a 2 px footer safe-area correction.

### Three-scale evidence

- whole spread / 500 px: PASS; front reads as one continuous travel cover rather than stacked header/body bands;
- reading / 1400 px: PASS; headline, 01 feature, support-photo overlap and 03 closing feature remain legible;
- actual size / 1587×1123 spread: PASS; no clipping after line-height repair and no weak text-on-photo contrast observed.

### Structure evidence

Front cover after repair:

- effective visible native text: `9`
- visible IMAGE-fill nodes: `3`
- text-box intersections: `0`
- 18 px text safe-area risks: `0`
- image hashes retained: `539c259be8036b481d06b4f76db9a39b407d90e8`, `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- whole-page flattening: NO
- native text preserved: YES
- replaceable photo roles preserved: YES

Decision: `IU ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## IV — Memory Spots editorial information tail

### Source / candidate

- source: IH `2077:2 / PREFERRED / V6_INSIDE_IH_MEMORY_SPOTS_PHOTO_BOUND_GUIDE_2026_08_21`
- clean-room duplicate: IV `2127:2`
- adopted: `PREFERRED / V6_INSIDE_IV_MEMORY_SPOTS_EDITORIAL_INFO_TAIL_2026_08_21`
- IH after promotion: hidden rollback at x=`283000`, y=`1300`
- IV after promotion: x=`272000`, y=`1300`, visible
- left Memory Spots page preserved; only the right-page closing information role changed.

### Bounded design test

- Spot 04 dining photograph remained the dominant closing image and grew from 750×490 to `750×515`;
- the existing yellow `4つのスポットチェック` role was attached to the photo edge;
- the existing hidden native two-line metadata copy (`BEST TIME / MOOD / PHOTO / CAFE / SUNSET / TABLE`) was promoted into one compact editorial tail;
- the six equal `GUIDE_INFO_1…6` micro-blocks were hidden, not deleted;
- no new asset, icon, card, box, shadow, gradient or image hash was introduced.

### Three-scale evidence

- whole spread / 500 px: PASS; the right page no longer ends in a tiny dashboard-like 3×2 grid;
- reading / 1400 px: PASS; photo → attached yellow cue → headline → two-line metadata reads as one continuous editorial close;
- actual size / 1587×1123 spread: PASS; metadata remains legible and the larger Spot 04 image still supports overlaid title/copy.

### Structure evidence

Whole IV spread:

- effective visible native text: `27`
- visible IMAGE-fill nodes: `4`
- text-box intersections: `0`
- 18 px text safe-area risks: `0`
- six legacy utility roles retained hidden for rollback/editability: YES
- image hashes retained: `539c259be8036b481d06b4f76db9a39b407d90e8`, `c1ada11205bc3978bf426b304d683f1c1566cac2`, `644f449c3bf2001a94d4b822d2b55e2614c11042`, `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- whole-page flattening: NO
- native text preserved: YES
- replaceable photo roles preserved: YES

Decision: `IV ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Asset lifecycle / provenance

This run did not diagnose photography quality as the limiting defect, so image generation was intentionally not invoked.

- newly generated assets: `0`
- adopted newly generated assets: `0`
- new Drive saves: `0`
- new external uploads: `0`
- new image hashes: `0`
- existing verified replaceable Rurubu fills only: YES

## Operational failure readback

One attempted IU promotion also tried to rewrite a Start Here status node using a stale assumed node ID. Live Figma reported that ID as a RECTANGLE, so the script failed atomically and made no change. The retry did not reuse the stale ID; it re-read live state and promoted only the verified IU/IQ nodes. This is implementation evidence only, not visual progress.

## Current visual state after promotion

Preferred V6 set in live Figma:

`IU + IP + IR + IV + IT + IM`

V7 remains HOLD. V6 remains NOT PRINT READY pending final photography/copy, printer template, bleed/trim/fold constraints, exported PDF preflight and physical proof.