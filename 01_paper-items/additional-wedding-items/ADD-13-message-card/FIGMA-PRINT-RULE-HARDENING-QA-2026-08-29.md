# ADD-13 Message Card — Print Rule Hardening QA — 2026-08-29

Start authority SHA: `8aa7b1dd7d99832159f562c1aac29e0c01041d74`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRINT_RULE_HARDENED / NOT_PRINT_READY`

## Live authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72`
- Current back: `52:91`
- Long-copy stress: `52:109 / 52:128`
- Drive folder: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Physical format authority: A6 landscape `148×105 mm`, duplex
- Drive write: `0`
- generated/composed raster: `0`
- IMAGE fills: `0`

## Print-first diagnosis

The selected design remained visually sellable at whole/read/native scales, but the handwriting rules were `2 px` tall on a `1400 px = 148 mm` canvas.

Physical conversion:

- `2 px × 148 / 1400 = 0.211 mm`
- `3 px × 148 / 1400 = 0.317 mm`

`0.211 mm` was unnecessarily fragile for a guest-facing handwriting guide that may be reproduced by vendor digital print or office-style proofing. The issue was line survival, not art direction, so image generation and decorative redesign were not justified.

## Rollback

Before production mutation, complete hidden rollback copies were created:

- `63:2` — pre-print-rule Current front
- `63:21` — pre-print-rule Current back
- `63:39` — pre-print-rule long-copy front
- `63:58` — pre-print-rule long-copy back

## Figma change

Only the functional handwriting rules changed:

- front Current `52:83–52:89`: `2 px → 3 px`
- back Current `52:101–52:107`: `2 px → 3 px`
- front stress `52:120–52:126`: `2 px → 3 px`
- back stress `52:138–52:144`: `2 px → 3 px`

Each rule was shifted by `-0.5 px` on Y after resize so its optical center stayed unchanged.

No copy, title, prompt, guest-name field, date, handwriting area, palette, paper geometry or reader-facing hierarchy changed.

## Actual-size typography readback

Canvas conversion factor is approximately `0.2997 pt per Figma px` for A6 landscape at `1400 px = 148 mm`.

Selected Current examples:

- front title `47 px ≈ 14.1 pt`
- front prompt `26 px ≈ 7.8 pt`
- front name label / guest guide `22 px ≈ 6.6 pt`
- back title `38 px ≈ 11.4 pt`
- back prompt `24 px ≈ 7.2 pt`
- back name label `21 px ≈ 6.3 pt`
- back `LETTER 02` `20 px ≈ 6.0 pt`

No production text was reduced to obtain the line-strength improvement.

## Three-scale / structural QA

Fresh native screenshots at `1400×993` after mutation:

- Current front: PASS
- Current back: PASS

Programmatic readback:

- Current front `52:72`: visible text `6`, outside text `0`, handwriting rules `7`, all rule heights `3 px`, IMAGE fills `0`
- Current back `52:91`: visible text `5`, outside text `0`, handwriting rules `7`, all rule heights `3 px`, IMAGE fills `0`
- long-copy front `52:109`: visible text `6`, outside text `0`, handwriting rules `7`, all rule heights `3 px`, IMAGE fills `0`
- long-copy back `52:128`: visible text `5`, outside text `0`, handwriting rules `7`, all rule heights `3 px`, IMAGE fills `0`

The semantic handwriting area remains unchanged at `900×870`, preserving the existing `56.32%` handwriting-area proof against the `>=55%` requirement.

## Resolution / color / production notes

- raster production assets: none
- effective PPI: `N/A`
- `RESOLUTION_WARNING`: none
- current dark resort green / terracotta / warm paper remain subject to final CMYK profile and paper-stock proof
- small text black composition, overprint/knockout and final ink values must follow the printer profile; no final CMYK values are asserted here

## Deferred finalization

`DESIGN_COMPLETE != PRINT_READY` remains in force. Still required:

- final title/theme/prompt copy
- final signer/name/date policy
- actual handwriting test using the intended pen
- paper stock
- authoritative printer template, trim/bleed/safe
- duplex orientation proof
- CMYK/profile conversion
- PDF export/preflight, font embedding, transparency/overprint checks
- 100% physical proof

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / PRINT_RULE_HARDENED / ROLLBACK_SAFE / NOT_PRINT_READY`
