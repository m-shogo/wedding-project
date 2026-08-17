# ADD-05 サンキュータグ — Endpoint Dot Subtraction QA

Status: `VERIFIED_LOCAL / CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `8afb18b8e2451b7a1c8f5194861e2a20912c6634`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- selected 50×80 front: `9:2`
- selected 50×80 optional back: `9:13`
- selected 45×70 front reflow: `9:20`
- Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`

## Visible issue

Fresh actual-size review showed that the thin green journey line plus a filled circular terminal on both selected front sizes read too similarly to a progress slider / web UI control. The circle did not carry punch, trim, attachment, copy, or other physical semantics; the actual punch hole at the top already provides the artifact's physical anchor.

This contradicted the Current visual standard's preference to remove UI-like controls and meaningless transport decoration when they do not serve the item.

## Bounded comparison

A rollback-safe comparison was created from the already-selected clean-room 50×80 front only for this subtraction test:

- comparison: `14:2 / QA_ADD05_FRONT_NO_ENDPOINT_DOT_2026_08_18`
- comparison change: hide only the cloned `NODE_LAST_STOP` circle
- gratitude copy, date, punch hole, hole-axis rule, line geometry, trim/safe guides, typography and spacing were unchanged

Actual-size comparison made the visual role clearer: the line remains a quiet print/editorial registration gesture instead of resembling a slider/progress control.

## Adopted Figma change

The subtraction was adopted on both selected front sizes:

- `9:10 / NODE_LAST_STOP` hidden on selected 50×80 front `9:2`
- `9:28 / NODE_LAST_STOP` hidden on selected 45×70 front `9:20`
- optional back `9:13` was already dot-free and was not changed

Pre-change rollback copies were preserved and hidden:

- `15:2 / ROLLBACK_ADD05_FRONT_50X80_PRE_DOT_REMOVAL_2026_08_18`
- `15:12 / ROLLBACK_ADD05_FRONT_45X70_PRE_DOT_REMOVAL_2026_08_18`

The QA comparison `14:2` was hidden after adoption.

## QA result

Fresh screenshots after adoption confirm:

- 50×80 front remains `500×800` with the punch → gratitude → line → date reading order intact
- 45×70 front remains `450×700` with the independent reflow intact
- no copy changed
- no IMAGE fill added
- no variable information baked into graphics
- safe/punch guides remain untouched
- legacy production remains untouched

Result: `ENDPOINT_DOT_SUBTRACTION_PASS`.

The current item state remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`; physical punch/string/gift-package proof is still deferred.

## Drive / assets

Drive write: `0`.
Image generation: `NOT_REQUIRED`.

The defect was a UI-like fixed vector treatment, not a missing image or texture role.
