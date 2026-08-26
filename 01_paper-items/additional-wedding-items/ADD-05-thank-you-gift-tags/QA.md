# ADD-05 サンキュータグ / プチギフトタグ — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD05 / CONFIRMED_COPY_ONLY / PHYSICAL_CLEARANCE_PASS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / 45X70_INDEPENDENT_REFLOW_PASS / PENDING_RIBBON_FOLD_PHYSICAL_CUE_AUDIT / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-26
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
- `OBSERVED-RIBBON-FOLD-PHYSICAL-CUE-2026-08-26.md`

The earlier `PROFESSIONAL-VNEXT-WAVE-SOUVENIR-QA-2026-08-21.md` remains historical evidence and is no longer the Current visual pointer.

## Current direction — RIBBON FOLD

The Current family was rebuilt from blank frames after the previous `WAVE SOUVENIR` was found to repeat the suite-level oversized rounded wave/orb grammar. It carries forward only confirmed copy and verified provisional punch geometry.

Three materially different V3 directions were created from blank frames:

1. `GIFT WRAP BAND`
2. `CLIPPED LUGGAGE LABEL`
3. `RIBBON FOLD`

`RIBBON FOLD` was selected because it gives the object a gift-specific physical reading—warm paper, coral gift ribbon, mango fold and deep-ocean return field—without fake airline credentials, generic tropical decoration, or the repeated rounded-shape family grammar.

The overall Current remains visually selected while one bounded physical-cue question is pending: fresh 2026-08-26 native screenshots show that the mango horizontal `fold` can read as a detached button/status bar rather than a connected fold of the coral ribbon. This is a local audit of one fixed role, not a full visual reopen of the item.

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
- enlarged confirmed supporting line and date remain subordinate but physically more robust

### 45×70 front `31:10`

- native canvas `450×700`: PASS
- independent reflow remains intact
- hierarchy remains `Thank you. → body → date`
- punch geometry remains physically legible at the smaller format
- enlarged body/date do not collide with the lower field

### Optional back `31:18`

- native canvas `500×800`: PASS
- `Have a safe trip home.` remains the first read
- front/back share material grammar without mirrored-template sameness
- enlarged date remains subordinate and readable

Professional Design Council score remains `90/100`; no Executive Creative Director, Japanese Editorial Designer or Print Production Director veto.

## 2026-08-26 pending ribbon-fold physical-cue audit

Fresh live screenshots and structure readback found a new optical/semantic defect hypothesis isolated to the mango horizontal fold role.

Exact live geometry:

### 50×80 front `31:2`
- coral ribbon `31:4`: `x=330 / y=0 / 74×800`
- mango fold `31:5`: `x=286 / y=450 / 162×70`
- native screenshot: the mango shape reads as a detached horizontal rectangle crossing the ribbon rather than a material turn.

### 45×70 front `31:10`
- coral ribbon `31:12`: `x=296 / y=0 / 66×700`
- mango fold `31:13`: `x=258 / y=392 / 142×64`
- native screenshot: the issue is strongest at the smaller physical format and becomes more button/status-bar-like.

### Optional 50×80 back `31:18`
- coral ribbon `31:20`: `x=72 / y=0 / 70×800`
- mango fold `31:21`: `x=42 / y=485 / 130×62`
- native screenshot: the same detached-crossbar reading reproduces on the reverse composition.

This does **not** invalidate the confirmed copy, microtype, punch, native text, or overall RIBBON FOLD selection. It does invalidate the older blanket statement that the yellow fold role itself is already proven as physical wrapping.

Required bounded test when Figma mutation is available:

1. `CURRENT` retained;
2. `NO_YELLOW_FOLD` — hide only the mango rectangle;
3. only if subtraction weakens gift-wrap energy, `CONNECTED_FOLD` using the existing Clean Editable SVG serious-comparison candidate;
4. compare whole-item → reading → native actual-size on all three faces;
5. rerun punch/copy clearance and structure readback on the winner;
6. reject the SVG rather than refining it indefinitely if it becomes origami/clip-art-like at `45×70`.

Comparison asset:

- `assets/ribbon-fold-connected-junction-candidate.svg`
- semantic/variable copy baked in: `0`
- status: serious comparison candidate only; not Drive/adopted production.

Canonical evidence: `OBSERVED-RIBBON-FOLD-PHYSICAL-CUE-2026-08-26.md`.

Learning state: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / SERIOUS_COMPARISON_ASSET_CREATED / BOUNDED_FIGMA_TEST_PENDING`.

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
- coral ribbon / paper fields: simple native geometry
- current mango fold: simple native geometry under pending local visual audit
- punch: native physical ellipse role
- connected-fold comparison: Clean Editable SVG candidate only if subtraction fails
- generated/composed raster: not required
- replaceable image role: not required
- Drive writes in this audit: `0`

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect is physical-cue geometry, not missing photography or illustration. At 45×70 / 50×80 physical size, generated imagery would reduce legibility and increase stock/AI-template risk without addressing the defect.

## Authority reconciliation

Current chain:

`live selected Figma 31:* → promotion evidence + actual-size legibility evidence + pending physical-cue evidence → this canonical QA.md → exact Drive authority 1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`

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

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / PENDING_RIBBON_FOLD_PHYSICAL_CUE_AUDIT / CURRENT_POINTER_RECONCILED / NOT_PRINT_READY`.

Do not create another whole-item decorative variation for ADD-05. The only open visual work is the bounded mango-fold comparison above. If the Current wins, reject the hypothesis and close the audit; if subtraction or the connected fold wins, promote only that local role with rollback and actual-size proof.