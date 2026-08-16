# Rurubu WEDDING V6 — W + CD/CE Editorial Folio QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Live starting authority

Live Figma superseded the previous GitHub status during this run:

- Outer W `1491:2` remained preferred.
- Profile/Q&A BZ `1514:2` was already hidden as `ROLLBACK_HIDDEN / V6_INSIDE_BZ_PRE_CB_2026_08_17`.
- Profile/Q&A CB `1527:2` was live preferred.
- Story/chronology CA `1517:2` was live preferred.
- V7 remained HOLD and was not edited.

## Visible problem

CB and CA were individually readable, but the four interior pages still behaved like separate feature layouts rather than pages from one printed magazine. There was no recurring page folio / section slug at the page edge, so the book-level editorial system weakened at whole-item and actual-size reading.

## Root-cause hypothesis

A real magazine does not need another card, badge or decorative field to establish publication continuity. A small recurring native folio can carry page identity and section context across visually different spreads while keeping the dominant photography and Japanese typography untouched.

## Bounded experiments

### Rejected CC — snapshot captions

- duplicate of CB: `1534:2`;
- added three small native English photo captions to the profile snapshot cluster;
- result: technically readable but improvement was too small and the captions looked applied after the fact;
- status: `REJECTED_HIDDEN / V6_INSIDE_CC_SNAPSHOT_CAPTIONS_TOO_WEAK_2026_08_17`.

### Adopted CD/CE — editorial folio system

CD `1535:2` from CB:
- page 02: `02  PROFILE / FAVORITES`;
- page 03: `03  Q&A / MEMORIES`.

CE `1535:78` from CA:
- page 04: `04  OUR STORY / JOURNEY`;
- page 05: `05  TRAVEL TIMELINE`.

All folios remain native Figma text. No photo, crop, image hash, composed decoration, factual copy, fold guide or page geometry changed.

The initial page-05 folio used navy text and failed visually because it sat on the dark WEDDING ending band. The same folio was corrected to light cream text before promotion. This is a polarity correction, not a new decoration.

## Three-scale / structure evidence

Whole-spread review:
- CD 1000px render: PASS;
- CE 1000px render: PASS.

Actual-size:
- Profile page `1535:3` = 794×1123: PASS;
- Timeline page `1535:102` = 794×1123: PASS after polarity fix.

Structure readback:
- CD Profile: native text 18, IMAGE roles 4, text collisions 0, 18px text safe-area risk 0;
- CD Q&A: native text 26, IMAGE roles 3, text collisions 0, 18px text safe-area risk 0;
- CE Story: native text 12, IMAGE roles 4, text collisions 0, 18px text safe-area risk 0;
- CE Timeline: native text 31, IMAGE roles 5, text collisions 0, 18px text safe-area risk 0.

Image-role counts are unchanged from their source spreads apart from native folio text additions; no new raster bytes were introduced.

## Promotion

Adopted live preferred:
- Profile/Q&A CD `1535:2` → `PREFERRED / V6_INSIDE_CD_EDITORIAL_FOLIO_COHESION_2026_08_17`;
- Story/chronology CE `1535:78` → `PREFERRED / V6_INSIDE_CE_EDITORIAL_FOLIO_COHESION_2026_08_17`.

Rollback preserved:
- CB `1527:2` → `ROLLBACK_HIDDEN / V6_INSIDE_CB_PRE_CD_FOLIO_SYSTEM_2026_08_17`;
- CA `1517:2` → `ROLLBACK_HIDDEN / V6_INSIDE_CA_PRE_CE_FOLIO_SYSTEM_2026_08_17`.

Start Here readback:
`V5 FU/FX · V6 W + CD/CE INSIDE STUDIES · V7 HOLD`

## Drive / asset lifecycle

Drive authority was re-read before the Figma work:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

This pass:
- newly generated images: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new distinct raster bytes: 0;
- existing image hashes changed: 0;
- native editable text added: YES — folios only;
- replaceable image roles preserved: YES;
- rollback preserved: YES;
- V7 touched: NO.

## Status

`VERIFIED_LOCAL` visual/structure improvement.

Not print-ready. Final photography, final personal copy, exact printer template, bleed/trim/fold verification, PDF preflight and physical proof remain separate gates.