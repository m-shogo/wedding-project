# WEDDING PASSPORT — selected clean-room family proof-language cleanup

Date: 2026-08-17
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / PROOF_LANGUAGE_CLEANUP_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `10ab643d49a6d39e51c0197a61798fa385d5bec4`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected clean-room family: V3 front `144:3`, V3 back `144:26`, V2 menu `138:43`, V2 seating `138:89`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production: unchanged

## Visible problem

Fresh selected-family readback found guest-facing semantic placeholders still carrying the internal production suffix `LAYOUT DUMMY`. At thumbnail/reading scale this was particularly visible on menu and seating, making otherwise selected clean-room pages read like Figma proof sheets rather than finished stationery.

The semantic unknowns themselves are still required. This change removes only the internal suffix, not the uncertainty boundary.

Examples:

- `[新郎新婦名 · LAYOUT DUMMY]` → `[新郎新婦名]`
- `[最終メッセージ · LAYOUT DUMMY]` → `[最終メッセージ]`
- `[料理名 01 · LAYOUT DUMMY]` → `[料理名 01]`
- `[料理説明 · LAYOUT DUMMY]` → `[料理説明]`
- `[内容 · LAYOUT DUMMY]` → `[内容]`
- `[卓名 · LAYOUT DUMMY]` → `[卓名]`
- `[ゲスト 01 · LAYOUT DUMMY]` → `[ゲスト 01]`

No final names, menu copy, guest names, issue data, or other unknown facts were invented.

## Rollback

Before mutation, hidden rollback copies were created from the selected clean-room roots:

- `148:2` — V3 front pre-cleanup
- `148:27` — V3 back pre-cleanup
- `148:44` — V2 menu pre-cleanup
- `148:110` — V2 seating pre-cleanup

All rollback copies are hidden. Old legacy production, older V2/V3 studies, and previous QA evidence remain intact.

## Figma changes

Visible selected roots updated:

- V3 front: 1 native text node cleaned
- V3 back: 2 native text nodes cleaned
- V2 menu: 19 native text nodes cleaned
- V2 seating: 22 native text nodes cleaned
- total mutated native text nodes: 44
- raster/image changes: 0
- vector changes: 0
- Drive asset changes: 0

The native-text / editable-SVG hybrid split remains unchanged.

## Screenshot QA

Fresh post-change screenshots were rendered from the selected family:

- thumbnail: 500 px render on all four selected roots
- reading: 1000 px render on V2 menu/seating; seating visually retains `01–11` registry hierarchy without proof suffix noise
- actual-size: `1480×2100` render on V2 menu and seating

Visual result: removing only the internal suffix reduces proof-sheet / implementation-language noise while preserving the explicit semantic placeholders and the clean-room art direction.

## Structural readback

Post-change selected roots:

- V3 front `144:3`: 9 visible native text nodes; visible proof-language matches 0; outside text 0; IMAGE fills 0
- V3 back `144:26`: 7 visible native text nodes; visible proof-language matches 0; outside text 0; IMAGE fills 0
- V2 menu `138:43`: 34 visible native text nodes; visible proof-language matches 0; outside text 0; IMAGE fills 0
- V2 seating `138:89`: 36 visible native text nodes; visible proof-language matches 0; outside text 0; IMAGE fills 0

Seating integrity was re-read after the change:

- exactly 11 table guest text roles
- each table still contains exactly 7 guest lines
- no eighth guest was introduced

## Decision

`PROOF_LANGUAGE_CLEANUP_PASS`.

The selected clean-room family remains the current sellable visual candidate. This was a bounded guest-facing polish, not a new visual direction and not a mutation of retained legacy production.

No image generation was required because the observed defect was production-language leakage rather than missing imagery.
