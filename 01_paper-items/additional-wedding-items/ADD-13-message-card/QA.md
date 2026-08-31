# ADD-13 メッセージカード — QA

Status: `CURRENT / V4_FIELD_NOTE_MARGIN_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- detailed V4 evidence: `V4-CLEANROOM-FIELD-NOTE-QA-2026-08-30.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- production page: `0:1 / 01_PRODUCTION`
- V4 front: `64:2 / V4 / ADD-13 / FRONT / FIELD NOTE MARGIN / CLEANROOM`
- V4 back: `64:19 / V4 / ADD-13 / BACK / OPEN FIELD NOTE / CLEANROOM`
- hidden realistic long-copy stress: `65:3 / 65:21`
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive readback: folder exists and currently contains no required production asset
- Drive writes for V4: `0`

Previous `RESORT DESK LETTER`, prior vNext, V2/V3 and legacy remain preserved as comparison / rollback history only. They are not construction bases for V4.

## V4 result

The V4 clean-room already existed in Figma with complete item-specific evidence, but `QA.md` still pointed to the earlier family-diverse Current. On 2026-08-31 the exact V4 Figma root and Drive authority were live re-read before Current authority was corrected. No Figma geometry was mutated in this reconciliation step.

V4 direction: `FIELD NOTE MARGIN`.

- front uses a broad cobalt editorial margin, narrow coral register, asymmetric Japanese display title and large warm-paper handwriting field;
- back uses an offset cobalt index block with coral edge, a stronger Japanese first-read title and open writing field;
- no fake stamp, airline credential, decorative English filler, generic travel icon, rounded-card UI or rasterized variable copy;
- front/back are related without being mirrored templates.

Responsibility split:

- variable / factual / guest-facing copy: native editable Figma text;
- handwriting rules / margin / edge geometry: native editable vector/shape geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the functional visual problem is typography/composition around a handwriting surface, not missing imagery.

## Fresh authority / structure verification

Live Figma metadata on `64:2` confirmed the selected V4 front still contains the recorded cobalt margin, coral register, native title/prompt/name/date roles, and semantic handwriting field `64:10` with seven writing rules. The exact V4 page/file and Drive folder still agree with the detailed V4 evidence.

The V4 evidence records its own fresh correction pass: an unsupported back header rule was removed after long-copy stress, and the handwriting geometry was enlarged before promotion to satisfy the verified >=55% requirement.

Final semantic handwriting areas:

- front: `960×800 px` = **55.24%** of the `1400×993` canvas;
- back: `1200×640 px` = **55.24%**;
- writing-rule thickness: `3 px` ≈ **0.317 mm** at final A6 scale.

Selected readback recorded by the V4 evidence:

- front visible native text `6`, fixed-height text `0`, outside text `0`, overlaps `0`, IMAGE fills `0`;
- back visible native text `6`, fixed-height text `0`, outside text `0`, overlaps `0`, IMAGE fills `0`;
- hidden stress `65:3 / 65:21` remains reflow-safe with fixed-height text `0` and no text outside root.

## Print-first status

Working physical authority: **A6 landscape `148×105 mm`**, Figma `1400×993 px`, approximately `9.46 px/mm`.

Approximate actual-size type:

Front:

- index 62px ≈ **18.6pt**;
- display title 52px ≈ **15.6pt**;
- kicker 24px ≈ **7.2pt**;
- prompt 28px ≈ **8.4pt**;
- name/date 24px ≈ **7.2pt**.

Back:

- index 44px ≈ **13.2pt**;
- display title 64px ≈ **19.2pt**;
- kicker 27px ≈ **8.1pt**;
- prompt 28px ≈ **8.4pt**;
- name/date 24px ≈ **7.2pt**.

The ~7.2pt roles are short secondary labels only and remain a physical-proof checkpoint.

Raster effective PPI: `N/A`; `RESOLUTION_WARNING=NONE` because V4 contains no raster IMAGE fill.

Printer-authoritative template / exact bleed / final safe geometry are not yet fixed; no guessed production bleed is introduced. `DEFERRED_FINALIZATION` remains for those inputs.

Physical / production checks still required:

- final title/theme/prompt/name/date policy;
- paper stock and real black-pen / pencil handwriting proof at 100% actual size;
- handwriting comfort and rule visibility on final stock;
- duplex front/back flip orientation and imposition;
- printer template/profile and final trim/bleed/safe;
- deep cobalt, coral, warm cream and near-black CMYK / grayscale proof;
- final black construction;
- PDF export, font embedding, transparency, overprint/knockout, preflight and physical proof.

Fold / punch / perforation / QR / sticker / case attachment are not currently authoritative and are not inferred from the visual design.

`DESIGN_COMPLETE != PRINT_READY` remains in force.