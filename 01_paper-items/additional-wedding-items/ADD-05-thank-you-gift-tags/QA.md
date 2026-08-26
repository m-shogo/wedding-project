# ADD-05 サンキュータグ / プチギフトタグ — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD05 / CONFIRMED_COPY_ONLY / PHYSICAL_CLEARANCE_PASS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / 45X70_INDEPENDENT_REFLOW_PASS / LOCAL_ROLE_REPAIR_PENDING / PENDING_RIBBON_FOLD_PHYSICAL_CUE_AUDIT / ROLLBACK_SAFE / NOT_PRINT_READY`
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
- `PRE-FIGMA-CONNECTED-FOLD-REJECTION-2026-08-26.md`

The earlier `PROFESSIONAL-VNEXT-WAVE-SOUVENIR-QA-2026-08-21.md` remains historical evidence and is no longer the Current visual pointer.

## Current direction — RIBBON FOLD

The Current family was rebuilt from blank frames after the previous `WAVE SOUVENIR` was found to repeat the suite-level oversized rounded wave/orb grammar. It carries forward only confirmed copy and verified provisional punch geometry.

Three materially different V3 directions were created from blank frames:

1. `GIFT WRAP BAND`
2. `CLIPPED LUGGAGE LABEL`
3. `RIBBON FOLD`

`RIBBON FOLD` was selected because it gives the object a gift-specific physical reading—warm paper, coral gift ribbon, mango fold and deep-ocean return field—without fake airline credentials, generic tropical decoration, or the repeated rounded-shape family grammar.

Fresh 2026-08-26 native screenshots now show that the mango horizontal `fold` consistently reads as a detached button/status bar rather than a connected fold of the coral ribbon across all three Current faces, with the problem strongest on the smaller 45×70 reflow. Because this is a screenshot-visible artifact-reading defect on every production face, the item's structural/design evidence remains valid but the **sellable visual gate is reopened locally until the remaining Current-vs-subtraction test is completed**.

This is not a whole-item clean-room reopen. Do not create another decorative direction for ADD-05. The only open visual role is the mango fold.

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

- native canvas `500×800`: PASS for hierarchy/structure
- whole-item/thumbnail hierarchy: PASS
- `Thank you.` remains the first read
- punch remains visually clear and separate from copy
- enlarged confirmed supporting line and date remain subordinate but physically more robust

### 45×70 front `31:10`

- native canvas `450×700`: PASS for hierarchy/structure
- independent reflow remains intact
- hierarchy remains `Thank you. → body → date`
- punch geometry remains physically legible at the smaller format
- enlarged body/date do not collide with the lower field

### Optional back `31:18`

- native canvas `500×800`: PASS for hierarchy/structure
- `Have a safe trip home.` remains the first read
- front/back share material grammar without mirrored-template sameness
- enlarged date remains subordinate and readable

The prior Professional Design Council score `90/100` remains historical evidence for the selected whole-item direction, but it is **not sufficient to restore `SELLABLE_VISUAL_QA_PASS` while the newly observed mango-fold defect remains unresolved**.

## 2026-08-26 ribbon-fold physical-cue audit

Fresh live screenshots and structure readback found a repeated optical/semantic defect isolated to the mango horizontal fold role.

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

This does **not** invalidate the confirmed copy, microtype, punch, native text, or the selected RIBBON FOLD art direction. It **does** invalidate the current sellable visual completion until the local role is resolved.

### Connected-fold method: terminal rejection

The existing Clean Editable SVG comparison asset:

- `assets/ribbon-fold-connected-junction-candidate.svg`
- semantic/variable copy baked in: `0`

was re-evaluated against the live 45×70 geometry. It improves literal connection, but the resulting silhouette reads as an arrow/tab or small origami/clip-art object at the smallest format. That is a stronger pictogram/UI cue than the defect being solved.

Therefore:

- `CONNECTED_FOLD = REJECTED_PRE_FIGMA`
- do not upload it to Drive;
- do not place it into production;
- do not create another fold/junction variant without a materially different requirement.

Canonical terminal evidence: `PRE-FIGMA-CONNECTED-FOLD-REJECTION-2026-08-26.md`.

### Only remaining bounded test

When safe Figma mutation is available:

1. retain `CURRENT` as rollback/reference;
2. create `NO_YELLOW_FOLD` by hiding only the mango rectangle on each of the three materially different faces;
3. compare whole-item → reading → native actual-size for 50×80 front, 45×70 front and optional back;
4. rerun punch/copy clearance and structure readback on the winning state;
5. if subtraction preserves gift-wrap energy and improves artifact reading, promote only that local subtraction;
6. if Current is stronger, reject the original physical-cue hypothesis and close the audit.

Do not create another whole-item variation or another connected-fold treatment before this subtraction test.

Learning state: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`; connected-fold branch is terminal `REJECTED_PRE_FIGMA`.

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
- connected-fold comparison: `REJECTED_PRE_FIGMA`
- generated/composed raster: not required
- replaceable image role: not required
- Drive writes in this audit: `0`

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect is physical-cue geometry, not missing photography or illustration. At 45×70 / 50×80 physical size, generated imagery would reduce legibility and increase stock/AI-template risk without addressing the defect.

## Authority reconciliation

Current chain:

`live selected Figma 31:* → promotion evidence + actual-size legibility evidence + physical-cue evidence + connected-fold rejection → this canonical QA.md → exact Drive authority 1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`

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

These unresolved physical checks do not invalidate the structural/design evidence. The local sellable visual completion remains reopened only because the mango-fold role itself is still unresolved.

## Decision

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / CONNECTED_FOLD_REJECTED_PRE_FIGMA / NO_YELLOW_FOLD_TEST_PENDING / CURRENT_POINTER_RECONCILED / NOT_PRINT_READY`.

Do not create another whole-item decorative variation for ADD-05. The only open visual work is `CURRENT` vs `NO_YELLOW_FOLD`. Restore `SELLABLE_VISUAL_QA_PASS` only after that bounded comparison is actually evidenced at whole-item, reading and native actual-size scales.