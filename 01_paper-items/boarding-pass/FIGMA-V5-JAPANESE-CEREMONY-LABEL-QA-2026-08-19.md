# BOARDING PASS V5 — Japanese-first ceremony label QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / JAPANESE_CEREMONY_LABEL_PASS / CLEANROOM_V5_SELECTED_FAMILY / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `fb420c98e4819569e269646dc8434f9669e4bb73`

## Authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- selected front: `39:22`
- selected back: `41:2` unchanged
- front stress: `40:2`
- Drive: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`

## Visible issue
Fresh native `1200×550` review found the right-side event ledger mostly Japanese-first (`受付 / 卓 / ご案内`) while the confirmed ceremony line alone remained `CEREMONY 14:10`. The English word was not required for meaning and created a small template/airport-interface inconsistency inside an otherwise Japanese-led artifact.

The confirmed ceremony time `14:10` is retained as factual content. `ESCORT CARD` is retained as the artifact-type kicker, and `YOKOHAMA` is retained as the location label.

## Bounded comparison
Rollback-safe candidate `55:2 / QA / BOARDING PASS V5 FRONT / JAPANESE CEREMONY LABEL / 2026-08-19` changed only:

`CEREMONY 14:10` → `挙式 14:10`

No date, guest field, roman-name placeholder, reception/table/final-guide placeholder, ticket cut, guilloche, border, typography scale, palette, or geometry changed.

Native-size comparison was stronger: the event ledger now reads as one coherent Japanese-first information block without losing ticket character.

## Promotion / rollback
- selected `39:41 / TEXT / CEREMONY`: `挙式 14:10`
- stress `40:21 / TEXT / CEREMONY`: `挙式 14:10`
- hidden rollback front: `56:2`
- hidden rollback stress: `56:31`
- comparison `55:2`: hidden after adoption
- back and legacy production: unchanged

## QA
- whole/native `1200×550`: PASS
- selected visible native text: `10`
- selected IMAGE fills: `0`
- selected outside text: `0`
- stress visible native text: `10`
- stress IMAGE fills: `0`
- stress outside text: `0`

Variable copy remains native/editable.

## Asset decision
Image generation: `0`. Drive write: `0`. The defect was information-language hierarchy, not missing imagery.

## Decision
`JAPANESE_CEREMONY_LABEL_PASS`. BOARDING PASS V5 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.