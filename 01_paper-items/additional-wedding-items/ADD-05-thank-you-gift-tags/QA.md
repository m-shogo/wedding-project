# ADD-05 サンキュータグ / プチギフトタグ — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD05 / CONFIRMED_COPY_ONLY / PHYSICAL_CLEARANCE_PASS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / 45X70_INDEPENDENT_REFLOW_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-22
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- selected 50×80 front: `31:2 / CURRENT_SELECTED / FAMILY-DIVERSE VNEXT V3 / ADD-05 / FRONT 50X80 / RIBBON FOLD GIFT TAG`
- selected 45×70 front: `31:10 / CURRENT_SELECTED / FAMILY-DIVERSE VNEXT V3 / ADD-05 / FRONT 45X70 / RIBBON FOLD GIFT TAG REFLOW`
- selected optional 50×80 back: `31:18 / CURRENT_SELECTED / FAMILY-DIVERSE VNEXT V3 / ADD-05 / BACK 50X80 / RETURN RIBBON NOTE`
- actual-size microtype rollback: `34:2 / 34:10 / 34:18`
- previous selected `WAVE SOUVENIR`: `25:2 / 25:10 / 25:18`, preserved as hidden history
- rejected family-diversity V2 `FOLDED GIFT NOTE`: `28:2 / 28:10 / 28:18`, preserved as hidden history
- V3 direction studies: `30:2 / 30:10 / 30:23`, preserved as hidden history
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`

Current evidence:

- `FAMILY-DIVERSITY-RIBBON-FOLD-V3-PROMOTION-QA-2026-08-21.md`
- `FIGMA-ACTUAL-SIZE-CONFIRMED-COPY-LEGIBILITY-QA-2026-08-22.md`

The earlier `PROFESSIONAL-VNEXT-WAVE-SOUVENIR-QA-2026-08-21.md` remains historical evidence and is no longer the Current visual pointer.

## Current direction — RIBBON FOLD

The Current family was rebuilt from blank frames after the previous `WAVE SOUVENIR` was found to repeat the suite-level oversized rounded wave/orb grammar. It carries forward only confirmed copy and verified provisional punch geometry.

Three materially different V3 directions were created from blank frames:

1. `GIFT WRAP BAND`
2. `CLIPPED LUGGAGE LABEL`
3. `RIBBON FOLD`

`RIBBON FOLD` was selected because it gives the object a gift-specific physical reading—warm paper, coral gift ribbon, mango fold and deep-ocean return field—without fake airline credentials, generic tropical decoration, or the repeated rounded-shape family grammar.

## Confirmed copy / physical facts

Visible authoritative copy only:

- front: `Thank you.` + `for traveling with us.`
- optional back: `Have a safe trip home.`
- date: `2026.10.24`

Verified provisional punch role:

- 50×80: `50×50`, center `(250,80)`
- 45×70: `50×50`, center `(225,80)`

Do not invent guest/product/venue/QR/SNS data, Japanese concept copy, airline class, gate, barcode, destination credential, or another fake transport authority.

## Live visual QA — 2026-08-22 readback

### 50×80 front `31:2`

- native canvas `500×800`: PASS
- whole-item/thumbnail hierarchy: PASS
- `Thank you.` remains the first read
- punch remains visually clear and separate from copy
- ribbon/fold gesture reads as gift wrapping rather than a UI rail
- enlarged confirmed supporting line and date remain subordinate but physically more robust

### 45×70 front `31:10`

- native canvas `450×700`: PASS
- independent reflow remains intact
- hierarchy remains `Thank you. → body → date`
- punch and ribbon geometry remain physically legible at the smaller format
- enlarged body/date do not collide with fold or lower field

### Optional back `31:18`

- native canvas `500×800`: PASS
- `Have a safe trip home.` remains the first read
- front/back share material grammar without mirrored-template sameness
- enlarged date remains subordinate and readable

Professional Design Council score remains `90/100`; no Executive Creative Director, Japanese Editorial Designer or Print Production Director veto.

## Actual-size confirmed-copy legibility repair — 2026-08-22

A physical-unit audit found a real defect that screenshot-only review had missed. The tag canvases use `10 px = 1 mm`; therefore the prior confirmed body/date roles were roughly `5.1–6.24 pt` at final size.

Rollback-first bounded repair:

- 50×80 body `20 → 24 px` (`≈5.67 → 6.80 pt`)
- 50×80 date `22 → 26 px` (`≈6.24 → 7.37 pt`)
- 45×70 body `18 → 22 px` (`≈5.10 → 6.24 pt`)
- 45×70 date `20 → 24 px` (`≈5.67 → 6.80 pt`)
- optional back date `22 → 26 px` (`≈6.24 → 7.37 pt`)

Hidden complete rollback roots: `34:2 / 34:10 / 34:18`.

The repair changed only confirmed body/date type sizes. Headline, copy, position, punch, ribbon/fold geometry and color fields remain unchanged. Fresh native screenshots PASS for all three Current variants.

This is not an item-wide or project-wide “minimum 8 pt” rule. It is a role-based actual-size legibility correction for confirmed semantic/factual copy on a small physical tag.

## Structure / hybrid authoring QA

Post-repair live readback:

### 50×80 front `31:2`
- native visible text `3`
- fixed-height `0`
- outside-root text `0`
- text-text collision `0`
- IMAGE fills `0`

### 45×70 front `31:10`
- native visible text `3`
- fixed-height `0`
- outside-root text `0`
- text-text collision `0`
- IMAGE fills `0`

### Optional back `31:18`
- native visible text `2`
- fixed-height `0`
- outside-root text `0`
- text-text collision `0`
- IMAGE fills `0`

Hybrid split:

- confirmed text/date: native editable Figma text
- fixed ribbon/paper/fold fields: simple native geometry
- punch: native physical ellipse role
- editable SVG: not required
- generated/composed raster: not required
- replaceable image role: not required
- Drive writes in this repair: `0`

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was physical microtype, not missing photography or illustration. At 45×70 / 50×80 physical size, generated imagery would reduce legibility and increase stock/AI-template risk without addressing the defect.

## Authority reconciliation

Current chain:

`live selected Figma 31:* → promotion evidence + actual-size legibility evidence → this canonical QA.md → exact Drive authority 1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`

Earlier designs and pre-repair Current copies remain preserved as history/rollback and are not deleted.

## Deferred finalization / print gate

Keep `NOT_PRINT_READY` until authoritative physical inputs/proofs exist:

- final choice between 50×80 and 45×70
- actual gift/package dimensions
- attachment/string/ribbon width and method
- final punch/tool diameter and stock thickness beyond current provisional geometry
- printer bleed/safe template
- duplex registration if optional back is used
- 100% physical attachment/rotation proof
- warm venue-light and rub/ink proof
- optional back adoption under the real attachment method

These unresolved physical checks do not invalidate the current visual/design selection.

## Decision

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / CURRENT_POINTER_RECONCILED / NOT_PRINT_READY`.

Do not reopen ADD-05 merely to create another decorative variation unless physical proof or a new screenshot-supported defect invalidates the Current. Next safe progression target: ADD-06.
