# ADD-05 — V4 `QUIET ROUTE TAG` clean-room QA — 2026-08-31

Status: `V4_CLEANROOM_CREATED / SELLABLE_VISUAL_QA_PASS / STRUCTURE_QA_PASS / ACTUAL_SIZE_QA_PASS / 45X70_INDEPENDENT_REFLOW_PASS / NOT_PRINT_READY`

Pre-write latest `main`: `e4c660929f67722a2fb2c77cd2554bc5f4f16a78`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Scope: non-Rurubu ADD-05 only.

## Live authority and clean-room provenance

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- new blank V4 page: `45:2 / V4 / ADD-05 / QUIET ROUTE TAG / 2026-08-31`
- 50×80 front: `45:3 / V4 / ADD-05 / FRONT / 50X80 / QUIET ROUTE TAG`
- optional 50×80 back: `45:13 / V4 / ADD-05 / BACK OPTIONAL / 50X80 / HOME LINE`
- independent 45×70 front reflow: `45:21 / V4 / ADD-05 / FRONT / 45X70 / INDEPENDENT REFLOW`
- exact Drive folder: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- Drive folder currently contains no production asset; Drive writes in this run: `0`.

V4 was authored on a newly created blank Figma page. The current V3 roots (`31:2 / 31:10 / 31:18`) were not duplicated, restyled or used as construction geometry. They remain rollback/comparison history only. The old V3 was inspected only to verify that the new direction is materially different after live authority discovery.

## Reference-led visual direction

SPEC authority calls for an upscale luggage-note / hotel-turn-down-card feeling rather than a miniature boarding pass or passport. V4 therefore uses:

- warm ivory front with a quiet deep-navy trim edge;
- Cormorant Garamond serif hero for `Thank you` and native Inter support copy;
- one restrained silver journey path entering from the trim and ending at a single mint endpoint;
- physical punch/string space as a compositional void rather than a decorative badge;
- pale mineral-blue optional back with a materially different horizontal `home` route;
- no coral ribbon, dark lower card block, barcode, faux flight data, stickers, flags, QR, generated people or raster texture.

At thumbnail the first read is `Thank you` → route endpoint → date. At reading/native scale the approved secondary copy remains clearly subordinate. Compared with the retained V3, the typography, color balance, route geometry and negative-space grammar are materially different.

## Native/editable role split

- all approved wording/date: native Figma text;
- route/endpoint/punch representation: editable native vector/shape primitives;
- raster IMAGE fills: `0`;
- generated raster: `0`;
- effective PPI: `N/A`;
- `RESOLUTION_WARNING=NONE`.

No image-generation work was justified because photography is neither required nor useful for this small physical tag.

## Structural QA and repairs

Fresh construction QA found and corrected three real defects before PASS:

1. the first 45×70 draft incorrectly scaled the physical punch and safe inset with the artwork; it was rebuilt as an independent physical reflow with a 5 mm punch and 5 mm safe guide;
2. the 45×70 hero exceeded the provisional 5 mm safe boundary by 6 px; it was moved fully inside the boundary;
3. 50×80 front/back text initially retained fixed 10 px boxes because `resize()` reset Auto Height; the operation order was corrected to `resize → textAutoResize=HEIGHT` and metadata readback now shows natural text heights (`72/78/30 px` front, `124/30 px` back).

Final visible text is inside trim and the provisional 5 mm safe guide, with no text/text collisions and no text inside the provisional punch-clearance zone.

## Print-first / actual-size QA

Working geometry uses exactly 10 px/mm for both trim masters:

### Primary 50×80 mm

- trim: `50×80 mm` (`500×800 px` working frame);
- provisional punch: `5 mm` diameter, center `8 mm` from top trim;
- provisional safe inset: `5 mm`;
- front hero: `70 px` = `7.0 mm` ≈ **19.8 pt**;
- front secondary: `30 px` = `3.0 mm` ≈ **8.5 pt**;
- front date: `25 px` = `2.5 mm` ≈ **7.1 pt**;
- optional-back hero: `57 px` = `5.7 mm` ≈ **16.2 pt**;
- optional-back date: `25 px` = `2.5 mm` ≈ **7.1 pt**;
- route rule: `4 px` = **0.4 mm**.

### Comparison 45×70 mm

- trim: `45×70 mm` (`450×700 px` working frame);
- punch remains physical `5 mm` diameter with `8 mm` top-center location; it is not proportionally shrunk;
- safe remains physical `5 mm`;
- hero: `64 px` ≈ **18.1 pt**;
- secondary: `27 px` ≈ **7.7 pt**;
- date: `25 px` ≈ **7.1 pt**;
- route rule: `4 px` = **0.4 mm**.

These meet the SPEC role targets at actual size. The 50×80 remains the primary master; 45×70 is an independently reflowed comparison, not a scaled clone.

## Three-scale QA

- thumbnail / 3-second scan: PASS — `Thank you` remains the dominant first read and the physical hole is legible as attachment logic, not a decorative icon;
- reading scale: PASS — approved secondary copy/date and route endpoint remain distinct without card-grid or badge language;
- actual-size / print-detail: PASS for current working geometry and type/line targets, subject to the provisional physical inputs below.

## Deferred finalization / CMYK risk

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

The SPEC marks punch, safe and 3 mm bleed as provisional. Therefore no guessed bleed canvas or printer-final production geometry was added. Final printer/template authority must override the working guides.

Still required before `PRINT_READY`:

- printer template and final bleed/trim/safe geometry;
- stock thickness and actual punch diameter/position;
- actual string/ribbon/twist-tie width and knot clearance;
- rotation/flip behavior while attached to the real petit-gift package;
- corner-radius/cutting method if used;
- CMYK/profile proof for deep navy, mint, silver-gray, pale mineral-blue and warm ivory;
- grayscale hierarchy proof;
- printer-approved black construction (do not infer registration/rich black values);
- PDF export/font embedding/transparency/overprint-knockout/preflight;
- 100% printed proof and physical attachment proof.

QR, fold, perforation and handwriting fields are not applicable to this V4 tag.

## Decision

V4 `QUIET ROUTE TAG` clears fresh sellable visual QA and fresh V4 structural/actual-size QA. Prior `DESIGN_QA_PASS_WITH_PLACEHOLDERS` evidence remains reusable only as historical structure/rollback evidence; the sellable decision above is based on the new V4 visual inspection and repairs.

Promotion target: `V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_QA_PASS / PHYSICAL_INPUTS_DEFERRED / NOT_PRINT_READY`.
