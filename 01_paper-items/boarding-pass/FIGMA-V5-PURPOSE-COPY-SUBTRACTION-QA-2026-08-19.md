# BOARDING PASS V5 — purpose-copy subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_FAMILY / PURPOSE_COPY_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `3dd3f5ac90633a2272883a40f48507b2469fe0af`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- selected front: `39:22`
- selected back: `41:2` unchanged
- front long-copy stress: `40:2`
- Drive authority: `03_航空チケット風_エスコートカード` / `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- retained legacy `8:5 / 8:73` remains untouched.

## Visible problem

Fresh whole-item review found the front sentence `この一枚を、席までのしるしに。` redundant. The artifact already communicates its role through `ESCORT CARD`, the large Japanese welcome headline, guest name, reception/table/final-guide semantic fields, ticket boundary and corner-cut construction. The extra sentence explained the object instead of strengthening the ticket hierarchy, leaving a template-like explanatory caption in the lower field.

## Bounded comparison

Rollback-safe comparison:

- `51:2 / QA / V5 FRONT / PURPOSE COPY SUBTRACTION / 2026-08-19`

Only `TEXT / PURPOSE` was hidden. No guest field, date/time/location, reception/table guidance, category label, ticket cut, ornament vector, print boundary or color changed.

At whole/read scale the comparison was stronger: the lower field became quiet without becoming empty, and attention remained on the guest identity and right-side factual ledger.

## Promotion / rollback

Promoted to selected front:

- selected `TEXT / PURPOSE` hidden;
- matching front-stress `TEXT / PURPOSE` hidden;
- stale stress-only decorative folio also hidden so stress evidence matches the selected front's already-adopted no-folio state.

Hidden rollback copies:

- `51:31 / ROLLBACK / V5 FRONT / PRE PURPOSE SUBTRACTION / 2026-08-19`
- `51:60 / ROLLBACK / V5 FRONT STRESS / PRE PURPOSE SYNC / 2026-08-19`

Comparison `51:2` was hidden after promotion.

## Three-scale / structure QA

Fresh native selected screenshot at `1200×550`: PASS.

Post-write readback:

- selected visible native text: `10`;
- selected IMAGE fills: `0`;
- selected outside visible text: `0`;
- selected guest-facing proof-language leakage: `0`;
- selected visible purpose copy: `0`;
- selected visible decorative folio: `0`;
- hidden front stress outside visible text: `0`;
- hidden front stress visible purpose copy: `0`;
- hidden front stress visible decorative folio: `0`.

Hidden stress keeps explicit stress-only `LAYOUT DUMMY` wording for QA payload length; it is not guest-facing production copy.

## Drive / asset decision

Drive authority metadata was live-read before the edit. New Drive assets: `0`. Image generation: `0`.

The defect was redundant explanatory copy, not missing imagery.

## Decision

`PURPOSE_COPY_SUBTRACTION_PASS`.

BOARDING PASS V5 remains the selected clean-room family with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Back, legacy production and all rollback/history remain preserved.