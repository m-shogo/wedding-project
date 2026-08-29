# ADD-13 Message Card — V4 Clean-room Field Note QA

Status: `V4_CLEANROOM / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_REUSED / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / NOT_PRINT_READY`
Date: 2026-08-30
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before write: `6f8c3e7e692e571d0960ad69c0b301c6143f3987`

## V4 exclusive provenance

This is a non-Rurubu **V4 new production**. The V4 front/back were created from blank frames and did not duplicate or reuse the visual construction of production/V2/V3/vNext. Retained `52:72 / 52:91` was inspected only after V4 construction for comparison and non-visual constraints.

- exact Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- page: `0:1 / 01_PRODUCTION`
- V4 front: `64:2 / V4 / ADD-13 / FRONT / FIELD NOTE MARGIN / CLEANROOM`
- V4 back: `64:19 / V4 / ADD-13 / BACK / OPEN FIELD NOTE / CLEANROOM`
- hidden V4 long-copy stress: `65:3 / 65:21`
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive writes: `0`

Only verified non-visual requirements were re-authored: A6 landscape `148×105 mm`, duplex role, handwriting area >=55%, native editable title/prompt/name/date roles, and unresolved printer/final-copy boundaries.

## Reference-led V4 art direction

V4 deliberately rejects the previous green `RESORT DESK LETTER` grammar. The new direction is a Japanese-first **FIELD NOTE MARGIN** system:

- front: a broad cobalt editorial margin, narrow coral register, asymmetric Japanese display title, and a large warm-paper writing field;
- back: an offset cobalt index block with coral edge, large Japanese first-read title, then an open writing field;
- no fake stamp, airline credential, decorative English filler, generic travel icon, stock illustration, gradient, rounded-card UI, or rasterized copy;
- hierarchy at thumbnail: `13 / title → prompt → writing surface` on front, `02 → title → prompt → writing surface` on back;
- retained vNext is calmer but reads more like generic stationery; V4 provides a materially stronger hero-title and editorial silhouette while preserving the writing function.

Hybrid authoring roles:

- variable/factual/guest-facing text: native Figma text;
- writing rules / edge / margin geometry: native editable vector/shape geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the functional and visual problem is typography/composition around a handwriting surface, not missing photography or illustration. Adding generated imagery would consume writing area and increase stock/AI-template risk.

## Correction pass during V4 authoring

Initial back render exposed a rule crossing the display-title zone. Moving it down fixed the selected copy but long-copy stress proved the same line still intruded into the variable prompt. The line had no physical/semantic job, so it was removed from both selected back and stress rather than adding another decorative constraint.

The first V4 draft also exposed a more important production issue: the nominal handwriting frames were below the verified 55% requirement. Geometry was reworked before promotion.

Final semantic handwriting areas:

- front: `960×800 px` = `55.24%` of the `1400×993` canvas;
- back: `1200×640 px` = `55.24%`;
- writing-rule thickness: `3 px` ≈ `0.317 mm` at final A6 scale.

## Three-scale and structure QA

### Thumbnail / 3-second scan

PASS. Front and back have clear first-read titles rather than form-like equal-weight labels. Writing space remains visually dominant after the first read.

### Reading scale

PASS. Prompt, handwriting surface, name, and date remain clearly separated. Front/back are related without being mirror-image templates.

### Actual-size / print-detail

Working physical authority: **A6 landscape 148×105 mm**, canvas `1400×993 px` (~9.46 px/mm).

Approximate type sizes at final size:

- front index 62 px ≈ 18.6 pt;
- front display title 52 px ≈ 15.6 pt;
- front kicker 24 px ≈ 7.2 pt;
- front prompt 28 px ≈ 8.4 pt;
- front name/date 24 px ≈ 7.2 pt;
- back index 44 px ≈ 13.2 pt;
- back display title 64 px ≈ 19.2 pt;
- back kicker 27 px ≈ 8.1 pt;
- back prompt 28 px ≈ 8.4 pt;
- back name/date 24 px ≈ 7.2 pt.

The ~7.2 pt roles are short secondary labels, not body copy. They remain a physical-proof checkpoint rather than being silently declared printer-final.

Selected roots readback:

- front: visible native text `6`, fixed-height text `0`, outside text `0`, text-text overlaps `0`, IMAGE fills `0`;
- back: visible native text `6`, fixed-height text `0`, outside text `0`, text-text overlaps `0`, IMAGE fills `0`.

Hidden realistic variable-copy stress:

- front `65:3`: outside text `0`, text-text overlaps `0`, fixed-height text `0`;
- back `65:21`: outside text `0`, text-text overlaps `0`, fixed-height text `0`;
- long prompt and long-name roles remain native and reflow without invading the writing rules after the unsupported back header rule was removed.

Because V4 contains no raster imagery, effective PPI is `N/A`; `RESOLUTION_WARNING` = none.

## Print-first risk / deferred finalization

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

Still deferred until authoritative printer/final input exists:

- printer template and exact trim/bleed/safe geometry;
- duplex front/back flip orientation and imposition;
- final title/theme/prompt/name/date policy;
- intended paper stock;
- actual black-pen/pencil handwriting proof at 100% size;
- CMYK/output profile and black construction;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% printed proof / physical proof.

No fold, punch, perforation, QR, sticker or case-attachment requirement is currently authoritative for ADD-13, so none was invented in V4 geometry.

CMYK risk to carry forward: deep cobalt can darken/shift toward violet, coral can lose RGB brightness, warm cream can yellow/muddy, and near-black text construction must follow printer specification. Grayscale hierarchy remains structurally legible because title scale, margin mass, whitespace and rule rhythm do not rely on hue alone.

## Result

`V4_CLEAR_VISUAL_WIN / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_REUSED / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / IMAGE_GENERATION_NOT_REQUIRED / EFFECTIVE_PPI_NA / RESOLUTION_WARNING_NONE / DEFERRED_FINALIZATION / NOT_PRINT_READY`.

The old production/vNext remains untouched as comparison/rollback history.