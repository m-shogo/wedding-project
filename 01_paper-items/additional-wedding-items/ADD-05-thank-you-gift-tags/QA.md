# ADD-05 サンキュータグ / プチギフトタグ — QA

Status: `CURRENT / V4_QUIET_ROUTE_TAG_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_QA_PASS / 45X70_INDEPENDENT_REFLOW_PASS / CLEANROOM_PROVENANCE_PASS / PRE_V4_HISTORY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Primary V4 evidence: `V4-QUIET-ROUTE-TAG-QA-2026-08-31.md`

## Current Figma authority — V4

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- blank V4 page: `45:2 / V4 / ADD-05 / QUIET ROUTE TAG / 2026-08-31`
- selected 50×80 front: `45:3 / V4 / ADD-05 / FRONT / 50X80 / QUIET ROUTE TAG`
- selected optional 50×80 back: `45:13 / V4 / ADD-05 / BACK OPTIONAL / 50X80 / HOME LINE`
- selected 45×70 independent reflow: `45:21 / V4 / ADD-05 / FRONT / 45X70 / INDEPENDENT REFLOW`
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- raster IMAGE fills: `0`
- generated raster: `0`
- effective PPI: `N/A`
- `RESOLUTION_WARNING=NONE`

V4 was created from blank frames. No V2/V3/legacy node was duplicated, restyled or used as layout geometry. Pre-V4 production remains rollback/comparison history only.

## V4 visual decision

Selected direction: `QUIET ROUTE TAG`.

The V4 front uses warm ivory, a restrained deep-navy trim edge, a Cormorant Garamond `Thank you` hero, one silver journey line and one mint endpoint. The optional back uses pale mineral-blue and a separate horizontal home-route composition. The physical punch/string void is part of the composition rather than a decorative badge.

The selected V4 intentionally removes the pre-V4 coral wrapping-ribbon / dark-lower-block grammar. It does not use faux passport stamps, miniature boarding-pass data, barcode, repeated stickers, country flags, QR, generated people or raster texture.

Fresh thumbnail / reading / native inspection passed. First read is `Thank you` → route endpoint → date; support copy stays subordinate and the tag does not read as a web card or AI-template grid.

## Confirmed copy

Only SPEC-confirmed copy is present:

- front: `Thank you` + `for traveling with us.`
- optional back: `Have a safe trip home.`
- date: `2026.10.24`

Couple names, venue, gift name, SNS and QR remain absent until approved.

## Structure / actual-size QA

Fresh V4 construction QA caught and repaired the following before promotion:

1. the initial 45×70 draft had proportionally scaled the punch and safe inset; this was corrected to independent physical geometry;
2. the 45×70 hero exceeded the working 5 mm safe boundary by 6 px; it was moved inside;
3. the 50×80 native text nodes initially retained fixed 10 px boxes due Figma resize ordering; they were repaired to natural Auto Height;
4. optional-back date was raised from ~6.8 pt to ~7.1 pt to meet the SPEC date target.

Final metadata/readback:

- 50×80 front: `500×800 px`; visible native text `3`; outside text `0`; raster IMAGE fills `0`;
- 50×80 optional back: `500×800 px`; visible native text `2`; outside text `0`; raster IMAGE fills `0`;
- 45×70 front: `450×700 px`; visible native text `3`; outside text `0`; raster IMAGE fills `0`;
- current text is inside the working 5 mm safe guide and outside the provisional punch-clearance zone;
- no visible text/text collision remains.

At `10 px = 1 mm`:

### 50×80 mm primary

- hero `70 px` ≈ **19.8 pt**;
- secondary `30 px` ≈ **8.5 pt**;
- front date `25 px` ≈ **7.1 pt**;
- optional-back hero `57 px` ≈ **16.2 pt**;
- optional-back date `25 px` ≈ **7.1 pt**;
- journey rule `4 px` = **0.4 mm**.

### 45×70 mm comparison

- hero `64 px` ≈ **18.1 pt**;
- secondary `27 px` ≈ **7.7 pt**;
- date `25 px` ≈ **7.1 pt**;
- journey rule `4 px` = **0.4 mm**;
- punch remains physical `5 mm`, center `8 mm` from top trim; it is not proportionally shrunk.

The 45×70 face is an independent reflow, not a scaled clone.

## Pre-V4 rollback / historical evidence

The former Current V3 family remains preserved for comparison/rollback only:

- former 50×80 front: `31:2`
- former 45×70 front: `31:10`
- former optional back: `31:18`
- pre-no-yellow-fold rollback: `39:2 / 39:10 / 39:18`
- no-yellow-fold comparison roots: `38:2 / 38:10 / 38:18`
- actual-size microtype rollback: `34:2 / 34:10 / 34:18`
- previous `WAVE SOUVENIR`: `25:2 / 25:10 / 25:18`
- rejected V2 `FOLDED GIFT NOTE`: `28:2 / 28:10 / 28:18`
- V3 direction studies: `30:2 / 30:10 / 30:23`

Historical evidence remains available in:

- `FAMILY-DIVERSITY-RIBBON-FOLD-V3-PROMOTION-QA-2026-08-21.md`
- `FIGMA-ACTUAL-SIZE-CONFIRMED-COPY-LEGIBILITY-QA-2026-08-22.md`
- `OBSERVED-RIBBON-FOLD-PHYSICAL-CUE-2026-08-26.md`
- `PRE-FIGMA-CONNECTED-FOLD-REJECTION-2026-08-26.md`
- `FIGMA-NO-YELLOW-FOLD-PROMOTION-QA-2026-08-27.md`

Those documents may support structure/rollback history but are not the V4 sellable-visual authority.

## Print gate / deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

SPEC currently marks 5 mm punch, 8 mm top-center, 5 mm safe and 3 mm bleed as provisional. Therefore V4 uses the punch/safe values as working QA geometry but does **not** assert printer-final bleed or production geometry.

Still required:

- final choice between 50×80 and 45×70;
- authoritative printer template / bleed / trim / safe;
- actual gift/package dimensions;
- stock thickness and final punch/tool diameter/position;
- actual string/ribbon/twist-tie width, knot clearance and attachment method;
- rotation/flip/occlusion proof on the real gift;
- duplex registration if the optional back is adopted;
- corner-radius/cutting method if used;
- CMYK/profile proof for deep navy, mint, silver-gray, pale mineral-blue and warm ivory;
- grayscale hierarchy proof;
- printer-approved black construction;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% print and physical attachment proof.

QR, fold, perforation and handwriting are not applicable to the selected V4 tag.

## Decision

`V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_QA_PASS / 45X70_INDEPENDENT_REFLOW_PASS / PHYSICAL_INPUTS_DEFERRED / PRE_V4_HISTORY_PRESERVED / NOT_PRINT_READY`.
