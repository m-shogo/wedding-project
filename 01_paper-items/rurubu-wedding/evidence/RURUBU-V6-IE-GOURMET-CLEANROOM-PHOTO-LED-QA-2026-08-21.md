# Rurubu WEDDING V6 — IE Gourmet Clean-room Photo-led QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem observed

The then-preferred Gourmet/Cafe spread HC `2012:2` was structurally valid, but its left page was visually the weakest member of the preferred V6 set at the common 500px comparison scale. It relied on a large pale composed texture field, one small waterfront photo, and evenly separated type clusters. The result read more like a sparse brochure/web section than a Japanese travel-information magazine page.

The right page already had a strong dominant dining photograph and was intentionally not rebuilt.

## Root-cause hypothesis

The defect was not missing copy or missing decoration. The left page lacked a real dominant photographic anchor and therefore forced hierarchy to be carried by empty cream field, decorative texture, and modular text placement. Replacing the pseudo-hero texture with a legitimate existing Rurubu café photograph, then rebuilding the lower page around one support photo and direct native typography, should improve travel-magazine energy without adding card/UI geometry.

## Bounded clean-room test

Candidate IE was created as a rollback-safe duplicate of HC rather than editing HC in place:

- candidate root: `2061:2`
- original HC kept intact until promotion: `2012:2`
- right page inherited unchanged from HC
- left-page composed raster `DECOR / GOURMET_CAFE_TRAVEL_TEXTURE_COMPOSED_RASTER` hidden
- existing replaceable photo role promoted into the dominant café lead role
- café lead fill reused from verified Rurubu source `2003:15 / PHOTO / MEMORY_SPOT_02_REPLACEABLE`
- reused image hash: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- old waterfront view fill retained as a smaller support photo rather than duplicated as another hero
- native Japanese copy remained editable; no page flattening and no baked final names/dates/logos were introduced
- no new card, shadow, gradient, or rounded UI container was added

The first IE geometry exposed two text intersections at actual/read scale (`CAFE_NUM↔CAFE_TITLE`, `VIEW_NUM↔VIEW_TITLE`). Those were treated as failed local geometry, not accepted as intentional overlap. The headline and Feature 02 cluster were then re-spaced until intersection readback returned zero.

## Expected improvement

- stronger photo-led first read on the left page;
- more obvious asymmetric editorial composition;
- larger scale contrast between photo, `01`, and supporting `02` cluster;
- less dependence on synthetic texture and empty cream field;
- preservation of the already-strong right-page dining hero;
- no regression in editability, safe area, or rollback.

## Regression risk

- enlarging the café source could expose source softness at print scale;
- giant `01` and headline could collide under careless width changes;
- widening Feature 02 could collide with the support photo;
- reusing a Rurubu image from another spread could become repetitive if semantic role/set coherence is not reviewed;
- visual strength of the dummy photograph does not authorize representing it as the real couple or final venue photography.

## Three-scale visual evidence

### Whole-item / thumbnail

500px spread comparison: PASS.

IE reads immediately as a photo-led gourmet/travel spread. The former left-side pale texture field is replaced by a real dominant dessert/café photograph, while the right-page dining hero remains the strongest second anchor. The spread is materially less sparse and less UI/brochure-like than HC.

### Reading / page scale

1400px spread review: PASS after correction.

The first 1400px candidate exposed Feature 01 copy crowding under the fixed-height headline. The title height and supporting-copy position were corrected. A later thumbnail review exposed an over-narrow Feature 02 title; the title/copy were widened and the support photo shifted right. Final reading-scale review shows a clear `01 → lead photo → 02/support → closing quote` path on the left and preserves the right-page `03 → 04 → reader utility` rhythm.

### Actual-size / detail

Left page `2061:3`, native `794×1123`: PASS after correction.

The café photograph retains useful table/flower/camera detail, the giant `01` remains readable without collision, Feature 02 separates number/title cleanly, and the lower closing quote remains inside trim-safe reserve.

## Structure QA

Final IE root `2061:2`:

- left page native text nodes: `20`
- left visible IMAGE fills: `2`
- left absolute text intersections: `0`
- left 18px text safe-area risks: `0`
- right page native text nodes: `22`
- right visible IMAGE fills: `1`
- right absolute text intersections: `0`
- right 18px text safe-area risks: `0`
- whole-page flattening: NO
- native variable text preserved: YES
- replaceable image roles preserved: YES

## Promotion / rollback

After three-scale visual review and structure QA:

- IE `2061:2` promoted to `PREFERRED / V6_INSIDE_IE_GOURMET_CLEANROOM_PHOTO_LED_LEFT_2026_08_21`
- IE moved into the former Gourmet/Cafe preferred position `x=273800, y=1300`
- HC `2012:2` renamed `ROLLBACK / V6_INSIDE_HC_CAFE_TABLE_READER_FACING_JAPANESE_MICROCOPY_2026_08_20`
- HC hidden, not deleted

Decision: `IE ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Drive / asset lifecycle

Drive authority root re-read before the experiment:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This experiment intentionally reused an already-present verified Rurubu Figma image fill. Therefore:

- newly generated assets: `0`
- newly adopted generated assets: `0`
- new Drive master saves: `0`
- new Drive derivatives: `0`
- new external binary uploads: `0`
- new image hashes: `0`

No transport/upload state is claimed as progress.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Transferable hypothesis: when one page of a print spread is sparse because hierarchy is being carried by a large decorative/background field, first test whether an existing legitimate photo can take the dominant role and let native typography cluster directly around it. Do not transfer the exact photo ratio, `01/02` geometry, colors, café imagery, or Rurubu visual grammar.

## Completion boundary

This is a verified dummy-design improvement, not print-ready completion. Final legitimate photography/copy, printer template, bleed/trim/fold requirements, exported PDF preflight, and physical proof remain separate gates.