# ADD-03 — redundant TBD status removal QA

Status: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE`
Date: 2026-08-19
Start authority SHA: `e0b268b44dbab71bdb482e186e9b90b5250007a4`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `woFUHUqZcvNkih8o42xeH4`
- A2 selected: `14:2`
- A3 selected: `15:40`
- A2 long-copy proof: `15:2`
- A3 long-copy proof: `15:72`
- Drive: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

## Visible problem

The unresolved transfer interval already contains native semantic guidance text under `14:40–15:00`, but a separate red `TBD` status label remained on the far right. At whole-item scale it read more like internal status/template UI than guest-facing schedule content, adding a second signal for the same unresolved state.

No schedule fact was missing: the authoritative transfer time remains visible and the activity itself stays an explicit native semantic placeholder.

## Bounded comparison

A2 comparison:

- `31:2 / QA / ADD-03 A2 / NO REDUNDANT TBD STATUS / 2026-08-19`
- changed only `TXT_TRANSFER_STATUS` visibility;
- transfer time, placeholder guidance, event nodes, rules, date/location, typography and all schedule facts remained unchanged.

At ~500px the schedule read more continuously without the isolated red status label. The transfer interval remained visibly distinct through its red event index/node and native placeholder.

## Adopted change

Before production mutation, selected and stress roots were preserved as hidden rollbacks:

- A2 selected rollback: `31:40`
- A3 selected rollback: `31:78`
- A2 stress rollback: `31:110`
- A3 stress rollback: `31:148`

Hidden status nodes after adoption:

- A2 selected `14:27 / TXT_TRANSFER_STATUS`
- A3 selected `15:60 / TXT_TRANSFER_STATUS`
- A2 stress `15:27 / TXT_TRANSFER_STATUS`
- A3 stress `15:92 / TXT_TRANSFER_STATUS`

The comparison frame was hidden after QA.

## Three-scale / structure QA

A2:

- whole-item ~500px: PASS;
- reading ~1000px: PASS;
- actual-size `1400×1980`: PASS;
- visible native text after subtraction: `18`;
- visible `TBD / QA / PROOF / TEMP / LAYOUT DUMMY` text: `0`;
- outside visible text: `0`.

A3:

- whole-item ~500px: PASS;
- actual canvas `990×1400`;
- visible native text after subtraction: `18`;
- visible status/proof language: `0`;
- outside visible text: `0`.

Both long-copy roots retain the same native semantic content and outside visible text `0`; they remain hidden after QA.

Bounding-box intersection probes still report some intentional/optical overlaps around the large atmosphere numeral and oversized time typography, but fresh screenshots show no new visible glyph collision caused by this change. No geometry was altered merely to satisfy numeric bounds.

## Asset / Drive decision

- image generation: `0`;
- Drive write: `0`;
- reason: the defect was redundant template/status microcopy, not missing fixed artwork.

## Decision

`ADOPTED` — unresolved information remains explicit through native semantic placeholder copy, while the separate `TBD` status badge-like microcopy is removed from guest-facing output.

## Transfer note

This locally supports the neutral hypothesis that generic status/template labels should not remain visible when a reader-facing semantic field already communicates the same state. Do not mechanically remove genuine operational status labels where they carry unique reader-facing meaning.
