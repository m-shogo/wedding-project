# BOARDING PASS V5 — entry rosette subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_FAMILY / ENTRY_ROSETTE_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `7f05e3abaa220da929263567f54d3e40f9514668`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- selected front: `39:22`
- selected back: `41:2` unchanged
- front long-copy stress: `40:2`
- Drive authority: `03_航空チケット風_エスコートカード` / `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- retained legacy `8:5 / 8:73` unchanged.

## Visible problem

Fresh native `1200×550` review found the small editable entry rosette at the upper-left acting like a generic badge/starburst. `ESCORT CARD`, the Japanese welcome headline, guest identity, right-side event ledger, ticket boundary and corner cuts already communicate the artifact clearly. The rosette added a badge/template signal without carrying a factual, physical, or navigational role.

The top-right editable guilloche was intentionally retained because it functions as a restrained ticket-security/print ornament and balances the event ledger rather than duplicating a semantic label.

## Bounded comparison

Rollback-safe comparison:

- `53:2 / QA / V5 FRONT / ENTRY ROSETTE SUBTRACTION / 2026-08-19`

Only `VECTOR / EDITABLE ENTRY ROSETTE` was hidden. No guest field, date, ceremony time, location, reception/table/final-guide placeholder, guilloche, ticket cut, print boundary, ledger rail, typography, or color changed.

Whole/native comparison result: stronger. Removing the rosette gives `ESCORT CARD → headline → guest identity` a cleaner first read and reduces badge/widget styling without making the ticket sparse.

## Promotion / rollback

Promoted to selected front and matching long-copy stress:

- selected rosette `39:32` hidden;
- stress rosette `40:12` hidden.

Hidden rollback copies:

- `54:2 / ROLLBACK / V5 FRONT / PRE ROSETTE SUBTRACTION / 2026-08-19`
- `54:31 / ROLLBACK / V5 FRONT STRESS / PRE ROSETTE SUBTRACTION / 2026-08-19`

Comparison `53:2` was hidden after promotion.

## Three-scale / structure QA

- whole/thumbnail: PASS — the front reads more directly and less like a badge-decorated template;
- reading/native: PASS at `1200×550`;
- actual-size long-copy stress: PASS at `1200×550`.

Post-write readback:

- selected visible native text: `10`;
- selected IMAGE fills: `0`;
- selected outside visible text: `0`;
- selected text collisions: `0`;
- selected entry rosette visible: `false`;
- stress visible native text while QA-revealed: `10`;
- stress IMAGE fills: `0`;
- stress outside visible text: `0`;
- stress text collisions: `0`;
- stress entry rosette visible: `false`;
- stress hidden again after QA.

## Drive / asset decision

Drive authority metadata was live-read before the edit. New Drive assets: `0`. Image generation: `0`.

The defect was redundant badge-like ornament, not missing imagery.

## Decision

`ENTRY_ROSETTE_SUBTRACTION_PASS`.

BOARDING PASS V5 remains the selected clean-room family with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Back, legacy production, comparison, and rollback/history remain preserved.