# ADD-05 サンキュータグ / プチギフトタグ — QA

Status: `CURRENT / CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PHYSICAL_CLEARANCE_PASS / PUNCH_AXIS_RULE_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

The former production family `1:2 / 1:12 / 1:19` is retained as legacy comparison/rollback history. It is **not** the current selected visual family after the 2026-08-15 clean-room rebuild.

Current selected clean-room V2:

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- 50×80 front: `9:2 / CLEANROOM_V2_ADD05_FRONT_50X80_PUNCHED_NOTE` — `500×800`
- 50×80 optional back: `9:13 / CLEANROOM_V2_ADD05_BACK_50X80_QUIET_NOTE` — `500×800`
- 45×70 front reflow: `9:20 / CLEANROOM_V2_ADD05_FRONT_45X70_REFLOW` — `450×700`
- retained legacy: `1:2 / 1:12 / 1:19`
- Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`

Clean-room source evidence: `CLEANROOM-V2-PUNCHED-NOTE-QA-2026-08-15.md`.

## Current visual direction

Direction: `PUNCHED NOTE / QUIET ENDPOINT`.

The physical punch/string relationship is the first composition anchor. The front reads:

`punch → Thank you → for traveling with us. → quiet registration line → 2026.10.24`.

The optional back is intentionally quieter and carries only the approved safe-trip message and date. The 45×70 version is an independent reflow, not a scaled duplicate.

The selected family deliberately avoids mini-boarding-pass/passport imitation, repeated icons, rounded UI cards, fake travel credentials, shadows, gradients or generic stock imagery.

## Physical / structural QA

Current verified clean-room geometry:

### 50×80 front `9:2`

- native text `3`;
- IMAGE fill `0`;
- outside visible text `0`;
- punch geometry `50×50`, top-left `225,55`, center `250,80`;
- first visible text y `226`;
- punch edge → first visible text gap `121px`.

### 50×80 optional back `9:13`

- native text `2`;
- IMAGE fill `0`;
- outside visible text `0`;
- punch edge → first visible text gap `165px`.

### 45×70 front `9:20`

- native text `3`;
- IMAGE fill `0`;
- outside visible text `0`;
- punch edge → first visible text gap `100px`;
- independently reflowed for the smaller physical format.

Hidden punch/safe guides remain non-export QA structure. Variable guest/product/venue/QR/SNS facts are not invented or baked into graphics.

## Recent visual polish retained in current selection

### Endpoint-dot subtraction

Fresh actual-size review found that the former filled circular endpoint made the thin green registration line read like a web slider/progress control. A rollback-safe comparison removed only that dot; the quieter line was stronger and was adopted on both selected front sizes.

Current state:

- `9:10 / NODE_LAST_STOP`: hidden on 50×80 front;
- `9:28 / NODE_LAST_STOP`: hidden on 45×70 front;
- optional back was already dot-free.

Evidence: `FIGMA-ENDPOINT-DOT-SUBTRACTION-QA-2026-08-18.md`.

### Punch-axis rule subtraction

A second fresh actual-size review found that the printed neutral rule immediately below the punch hole had no trim, clearance, fold, copy-grouping or other reader-facing function. Because the selected fronts already retain the meaningful lower green journey/registration line, the upper rule created two competing horizontal separators and made the attachment zone feel diagrammatic.

Rollback-safe comparisons independently verified removal on both front sizes. Adopted state:

- `9:6 / RULE_HOLE_AXIS`: hidden on 50×80 front;
- `9:24 / RULE_HOLE_AXIS`: hidden on 45×70 front;
- punch holes and hidden clearance guides unchanged;
- lower `PATH_JOURNEY` line preserved;
- optional back unchanged;
- pre-change rollback: `17:12 / 17:22`.

Post-change structure:

- 50×80: `500×800`, native text `3`, IMAGE `0`, outside text `0`, punch `50×50` preserved;
- 45×70: `450×700`, native text `3`, IMAGE `0`, outside text `0`, punch `50×50` preserved.

Evidence: `FIGMA-PUNCH-AXIS-RULE-SUBTRACTION-QA-2026-08-18.md`.

## Drive / generated assets

- exact Drive folder live-read on 2026-08-18: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`;
- generated/raster production assets required by current design: `0`;
- Drive write for this polish: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the sellable quality is carried by physical punch logic, typography, trim clearance and the restrained lower line; imagery is not the bottleneck.

## Deferred finalization / print gate

Keep `NOT_PRINT_READY` until these are authoritative and physically tested:

- actual gift/package dimensions;
- final tag size decision;
- attachment method, string/ribbon/tie width and final punch/tool diameter;
- final stock thickness and finish;
- final printer/template bleed and safe requirements;
- 100% physical punch/attachment/rotation proof;
- ink/rub and warm venue-lighting check;
- imposition/gutter/crop marks and duplex registration when the back is used;
- approved final copy and optional names if any.

Do not reopen the selected visual family for cosmetic churn unless a fresh screenshot, physical proof or authoritative production input exposes a concrete defect.