# RURUBU V6 JA — 1DAY Dense Editorial Close QA — 2026-08-21

## Scope

Rurubu WEDDING only. V7 remained HOLD. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD item-specific Figma/Drive/ledger/GitHub production paths were not inspected or mutated.

## Authorities read before durable writes

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- `docs/design-learning/rurubu-shared-learning-feed.md` and relevant Rurubu append authority
- neutral non-Rurubu shared-learning surface only under the scope firewall
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- live Figma preferred set in `bfM0d4c9dCeBv5pCkJ3TNM`
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

The status, Drive authority and candidate Figma structure were re-read again immediately before promotion.

## Visible problem

Fresh common-scale comparison of `IU + IX + IR + IZ + IT + IW` selected the Yokohama 1DAY left page as the next macro defect.

IW `2131:2` already had a strong waterfront hero and a materially improved asymmetric route page on the right. The left page still weakened after the hero: the photograph ended at y=720 and handed off to a relatively sparse two-column cream information field. At whole-item scale this read as `large hero → utility footer → dead lower reserve`, reducing the travel-magazine energy established by the photograph.

This was not an image-quality defect. The existing verified waterfront source was compositionally usable, and adding another image/card/decorative module would have increased complexity without fixing the hierarchy break.

## Root-cause hypothesis

The lower field was underweighted relative to the dominant hero. The information itself was useful, but its vertical role mass and binding relationship were too weak. Extending the already-legitimate hero and consolidating the existing native information into a tighter editorial closing beat should create a more continuous page without new assets or UI containment.

## Rollback-safe bounded test

IW `2131:2` was duplicated to JA `2141:2`. The right route page was preserved unchanged. Only the left page was recomposed.

Changes on JA left `2141:3`:

- existing replaceable waterfront hero: height `650 → 720`, width unchanged `793.7`, y unchanged `70`;
- `START / 海辺`, `10:00`, start headline and start copy moved down with the extended photograph so the native overlay remains attached to the same photographic event;
- existing cyan lower binding rule moved to y=`820` and widened `135 → 330`;
- existing `旅のコツ`, native `01`, `寄り道、歓迎。` and body were consolidated into the left side of the closing field;
- existing `横浜1DAYメモ`, four short values, closing headline and cyan closing meta were consolidated into the right side;
- no new text, card, badge, sticker, shadow, gradient, image, external binary, or generated decoration was added;
- all factual/native copy remained editable;
- existing replaceable image structure remained intact.

Expected improvement: stronger vertical continuity, less utility-footer reading, a denser but still readable editorial close, and better whole-page balance.

Regression risks checked: dominant-photo crop quality, loss of cream breathing room, text collisions, safe-area infringement, and the possibility that the closing beat becomes an overly rigid two-column dashboard.

## Three-scale visual QA

- whole spread / 500 px: PASS; JA is visibly denser and more continuous than IW, with the hero carrying more of the first read and the cream field reading as one closing beat rather than a detached footer;
- reading scale / 1400 px: PASS; start overlay, 01 feature and 1DAY memo remain legible and the right route page is preserved;
- actual left page / `2141:3` / `794×1123`: PASS; headline, overlay copy, lower feature, memo values, closing quote and folio remain readable without crowding.

## Structure QA

JA left `2141:3`:

- visible native text: `19`;
- visible IMAGE-fill nodes: `1`;
- same-parent text intersections: `0`;
- 18 px text safe-area risks: `0`;
- whole-page flattening: NO;
- right route page: unchanged from IW.

## Asset / provenance QA

Drive V6 authority was reverified before promotion:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Asset lifecycle this run:

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive master saves: `0`;
- new role-sized derivatives: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing verified replaceable Rurubu image fill reused: YES;
- native variable text preserved: YES.

## Promotion / rollback

After the authority/Drive/Figma re-read and three-scale + structure QA:

- preferred: JA `2141:2 / PREFERRED / V6_INSIDE_JA_1DAY_DENSE_EDITORIAL_CLOSE_2026_08_21`, live x=`275600`, y=`1300`;
- JA left: `2141:3 / PAGE / V6_1DAY_LEFT_JA_DENSE_EDITORIAL_CLOSE`;
- hidden rollback: IW `2131:2 / ROLLBACK / V6_INSIDE_IW_1DAY_DOMINANT_STREET_POSTCARD_2026_08_21`, x=`291900`, y=`1300`;
- right route page remained the duplicated IW right page without layout edits.

Decision: `JA ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Learning state

RSL-181: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

A photo-led print page can still become web-like when a strong hero hands off to a low-mass utility footer. Before adding another asset or container, independently test whether an already-legitimate hero can carry further down the page and whether existing native information can be consolidated into a tighter editorial close. This is conditional on crop quality, physical readability, safe-area and collision QA.

Rurubu-specific and non-transferable: exact waterfront crop, Japanese headline scale, pink/cyan/yellow palette, native `01` treatment, wording, coordinates, route-page composition and travel-magazine brand grammar.

## Remaining gates

JA is dummy-design visual evidence, not print-ready evidence. Final legitimate photography and personal copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof remain open. V7 was not touched.
