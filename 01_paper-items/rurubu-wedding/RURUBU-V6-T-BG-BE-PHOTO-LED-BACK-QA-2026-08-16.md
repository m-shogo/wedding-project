# Rurubu WEDDING V6 — Outer T + BG/BE QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

`OUTER_T_PROMOTED / BG_BE_UNCHANGED / V7_HOLD / NOT_PRINT_READY`

Preferred live state after this run:

- Outer T `1447:2 / PREFERRED / V6_OUTER_T_PHOTO_LED_BACK_COVER_2026_08_16`
- Profile/Q&A BG `1439:58`
- Story/chronology BE `1433:2`
- Start Here `845:27`: `V5 FU/FX · V6 T + BG/BE INSIDE STUDIES · V7 HOLD`

Outer S `1439:2` is preserved hidden as rollback.

## Visible problem

At whole-spread scale, Outer S front already read as a strong photo-led travel-magazine cover, while the back still read as `photo block → separate beige timeline area`. The lower half was technically sound but visually more like a template/information panel than the same magazine system.

## Root-cause hypothesis

The defect was not missing decoration or missing photography. The dominant flatlay was being limited to a top-left block and separated from the rest of the back by a navy column. Extending the existing verified dominant photo across the full back width and turning the navy area into an overlay should create one photographic field, while the existing café/skyline images and native chronology could remain independently editable.

## Bounded clean-room test

Created Outer T from S as a rollback-safe duplicate and changed only the back cover:

- existing flatlay image hash `e3738476f760932bb5b09c9d60f174dd6c84049d` expanded from `620×422` to `793.7×490`; registered intrinsic is `944×608`, so the role remains intrinsic-safe;
- navy title field moved from right-side column to top-left overlay `305×265`, opacity `0.93`;
- title/kicker/subline repositioned inside that overlay;
- café photo `c1ada11205bc3978bf426b304d683f1c1566cac2` changed to `430×270`, rotation `-2.2°`;
- skyline support `644f449c3bf2001a94d4b822d2b55e2614c11042` changed to `232×210`, rotation `2.4°`;
- native `みんなとの思い出` and chronology moved below the photo cluster;
- chronology facts remained native and the final `2026.10.24 / WEDDING` field was retained;
- no new image, card, gradient, sticker, shadow, or generated decoration was introduced.

The first screenshot showed the subline visually colliding with the large title. It was corrected to `y=222`, `12px`, then re-verified before promotion.

## Expected improvement

- back cover reads as one photographic editorial field rather than stacked sections;
- stronger front/back system coherence at thumbnail scale;
- no loss of native text or replaceable photo roles;
- no new transport/generation dependency.

## Regression risks

- enlarging an existing raster beyond its useful resolution;
- headline/subline collisions inside the overlay;
- photo cluster consuming too much lower chronology space;
- large dark overlay reading like a web card rather than editorial contrast support.

The final candidate passed the intrinsic, text, safe-area, and rendered checks below.

## Three-scale evidence

### Whole-item / thumbnail

Outer T `1447:2` at 500px: PASS and preferred over S. Back silhouette is more continuous and photo-led; the final navy wedding field still anchors the bottom.

### Reading / spread

Outer T `1447:2` at 900px: PASS. The full-width flatlay, café overlap, skyline support and lower journey index remain separable and readable without additional containers.

### Actual-size / detail

Back `1447:3` at native `794×1123`: PASS after the subline fix.

Structure readback on final back:

- visible native text: `18`
- visible IMAGE roles: `3`
- absolute text/text collisions: `0`
- 18px text safe-area risks: `0`
- dominant flatlay display `793.7×490` vs intrinsic `944×608`: PASS
- café and skyline remain existing verified replaceable IMAGE fills.

Front page was not changed from previously verified Outer S front geometry/assets.

## Asset lifecycle truth

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified Figma image hashes reused: `YES`
- native editable copy preserved: `YES`
- replaceable image roles preserved: `YES`
- generated section decoration adopted: `NO`
- screenshot QA: `PASS`
- structure/safe-area QA: `PASS`
- rollback preserved: `YES`
- V7 touched: `NO`

Drive V6 root was freshly read back as `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`. Existing generated masters remain saved but were not placed/adopted in this pass.

## Adoption

Outer T is `VERIFIED_LOCAL` and promoted. Outer S is hidden rollback evidence, not deleted.

V6 remains `NOT_PRINT_READY`: final real photography/copy, exact printer template, bleed/trim/fold, PDF preflight and physical proof remain separate gates.
