# ADD-05 サンキュータグ / プチギフトタグ — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD05 / CONFIRMED_COPY_ONLY / PHYSICAL_CLEARANCE_PASS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / 45X70_INDEPENDENT_REFLOW_PASS / NO_YELLOW_FOLD_PROMOTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-27
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- selected 50×80 front: `31:2 / CURRENT_SELECTED / FAMILY-DIVERSE VNEXT V3 / ADD-05 / FRONT 50X80 / RIBBON FOLD GIFT TAG`
- selected 45×70 front: `31:10 / CURRENT_SELECTED / FAMILY-DIVERSE VNEXT V3 / ADD-05 / FRONT 45X70 / RIBBON FOLD GIFT TAG REFLOW`
- selected optional 50×80 back: `31:18 / CURRENT_SELECTED / FAMILY-DIVERSE VNEXT V3 / ADD-05 / BACK 50X80 / RETURN RIBBON NOTE`
- pre-no-yellow-fold rollback: `39:2 / 39:10 / 39:18`
- no-yellow-fold comparison roots: `38:2 / 38:10 / 38:18`, hidden after verification
- actual-size microtype rollback: `34:2 / 34:10 / 34:18`
- previous selected `WAVE SOUVENIR`: `25:2 / 25:10 / 25:18`, preserved as hidden history
- rejected family-diversity V2 `FOLDED GIFT NOTE`: `28:2 / 28:10 / 28:18`, preserved as hidden history
- V3 direction studies: `30:2 / 30:10 / 30:23`, preserved as hidden history
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`

Current evidence:

- `FAMILY-DIVERSITY-RIBBON-FOLD-V3-PROMOTION-QA-2026-08-21.md`
- `FIGMA-ACTUAL-SIZE-CONFIRMED-COPY-LEGIBILITY-QA-2026-08-22.md`
- `OBSERVED-RIBBON-FOLD-PHYSICAL-CUE-2026-08-26.md`
- `PRE-FIGMA-CONNECTED-FOLD-REJECTION-2026-08-26.md`
- `FIGMA-NO-YELLOW-FOLD-PROMOTION-QA-2026-08-27.md`

## Current direction — RIBBON FOLD, simplified physical cue

The Current family was originally rebuilt from blank frames after the previous `WAVE SOUVENIR` repeated the suite-level oversized rounded-wave/orb grammar. It carries forward only confirmed copy and verified provisional punch geometry.

Three materially different V3 directions were created from blank frames:

1. `GIFT WRAP BAND`
2. `CLIPPED LUGGAGE LABEL`
3. `RIBBON FOLD`

`RIBBON FOLD` remained the strongest art direction because it reads as a warm paper gift tag with a strong coral wrapping ribbon and deep-ocean return field, without fake airline credentials or generic tropical decoration.

A later actual-size audit found that the mango/yellow horizontal `fold` did not read as a connected ribbon turn. Across the 50×80 front, 45×70 front and optional back, it read more like a detached button/status bar, with the defect strongest at 45×70.

The connected-fold SVG alternative was then rejected pre-Figma because the silhouette became arrow/tab/origami-like at the smallest format. Per the failure stop condition, that method remains terminal `REJECTED_PRE_FIGMA`.

On 2026-08-27, the only remaining bounded comparison was executed: `CURRENT` vs `NO_YELLOW_FOLD`. Hiding only the mango/yellow rectangle improved all three materially different faces while preserving the gift-tag / wrapping identity through the coral ribbon, punch, paper field and typography. The subtraction was promoted to Current.

Current mango roles are therefore intentionally hidden:

- 50×80 front: `31:5 / RIBBON FOLD / MANGO`
- 45×70 front: `31:13 / RIBBON FOLD / MANGO`
- optional back: `31:21 / RIBBON FOLD / MANGO`

Do not reintroduce a connected-fold pictogram or create another fold treatment without a materially different requirement.

## Confirmed copy / physical facts

Visible authoritative copy only:

- front: `Thank you.` + `for traveling with us.`
- optional back: `Have a safe trip home.`
- date: `2026.10.24`

Verified provisional punch role:

- 50×80: `50×50`, center `(250,80)`
- 45×70: `50×50`, center `(225,80)`

Do not invent guest/product/venue/QR/SNS data, Japanese concept copy, airline class, gate, barcode, destination credential, or another fake transport authority.

## 2026-08-27 NO_YELLOW_FOLD visual QA

### 50×80 front `31:2`

- native canvas `500×800`: PASS
- whole-item/thumbnail: PASS
- reading scale: PASS
- actual-size: PASS
- `Thank you.` remains first read
- punch remains visually clear and separate from copy
- coral ribbon remains sufficient as the wrapping gesture
- detached mango/status-bar cue removed

### 45×70 front `31:10`

- native canvas `450×700`: PASS
- independent reflow remains intact
- hierarchy remains `Thank you. → body → date`
- punch remains physically legible
- this smaller format shows the clearest improvement after removing the detached mango crossbar

### Optional back `31:18`

- native canvas `500×800`: PASS
- `Have a safe trip home.` remains first read
- front/back retain family relation without mirrored-template sameness
- reverse composition is cleaner without the detached mango crossbar

The prior Professional Design Council score `90/100` remains historical whole-item evidence; the newly executed three-face actual-size comparison now closes the specific visual defect that had reopened the sellable gate.

## Rollback / comparison evidence

Fresh rollback-safe comparisons created for the final audit:

- `38:2` — NO_YELLOW_FOLD 50×80 front
- `38:10` — NO_YELLOW_FOLD 45×70 front
- `38:18` — NO_YELLOW_FOLD back

Complete rollback clones created before Current mutation:

- `39:2` — PRE-NO-YELLOW-FOLD 50×80 front
- `39:10` — PRE-NO-YELLOW_FOLD 45×70 front
- `39:18` — PRE-NO-YELLOW-FOLD back

After promotion, comparison roots were hidden and rollback roots remain hidden history.

## Actual-size confirmed-copy legibility

The tag canvases use `10 px = 1 mm`. A prior audit corrected confirmed body/date roles that were too small at physical size:

- 50×80 body `20 → 24 px`
- 50×80 date `22 → 26 px`
- 45×70 body `18 → 22 px`
- 45×70 date `20 → 24 px`
- optional back date `22 → 26 px`

Hidden pre-microtype rollbacks: `34:2 / 34:10 / 34:18`.

The 2026-08-27 no-yellow-fold repair changed none of these text sizes or positions.

## Structure / hybrid authoring readback — 2026-08-27

### 50×80 front `31:2`
- visible native text `3`
- fixed-height text `0`
- outside-root text `0`
- IMAGE fills `0`
- mango fold hidden
- punch `31:6`, `50×50`, visible

### 45×70 front `31:10`
- visible native text `3`
- fixed-height text `0`
- outside-root text `0`
- IMAGE fills `0`
- mango fold hidden
- punch `31:14`, `50×50`, visible

### Optional back `31:18`
- visible native text `2`
- fixed-height text `0`
- outside-root text `0`
- IMAGE fills `0`
- mango fold hidden
- punch `31:22`, `50×50`, visible

Hybrid split:

- confirmed text/date: native editable Figma text
- coral ribbon / paper fields: simple native geometry
- punch: native physical ellipse role
- connected-fold comparison asset: terminal `REJECTED_PRE_FIGMA`
- generated/composed raster: not required
- replaceable image role: not required
- image generation in final repair: `0`
- Drive writes in final repair: `0`

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was fixed-geometry semantics, not missing photography or illustration. At 45×70 / 50×80 physical size, generated imagery would reduce legibility and increase stock/AI-template risk without addressing the defect.

## Authority reconciliation

Current chain:

`live selected Figma 31:* with mango folds hidden → current promotion + actual-size legibility + physical-cue + connected-fold rejection + no-yellow-fold promotion evidence → this canonical QA.md → exact Drive authority 1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`

Old visual states remain preserved as rollback/history and are not deleted.

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

These unresolved physical checks do not invalidate the current sellable visual/structural evidence.

## Decision

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / NO_YELLOW_FOLD_PROMOTION_PASS / CONNECTED_FOLD_REJECTED_PRE_FIGMA / CURRENT_POINTER_RECONCILED / ROLLBACK_SAFE / NOT_PRINT_READY`.

ADD-05's local ribbon-fold visual audit is closed. Do not create another decorative fold direction unless a new physical requirement or screenshot-visible defect appears.