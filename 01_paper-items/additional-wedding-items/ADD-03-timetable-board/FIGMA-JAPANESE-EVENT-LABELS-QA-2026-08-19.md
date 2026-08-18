# ADD-03 当日タイムテーブル — Japanese-first event labels QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / JAPANESE_EVENT_LABELS_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `6fdad7260c7d0491f461d90386951dd5625d0470`

## Authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- A2 selected: `14:2`
- A3 selected: `15:40`
- A2 stress: `15:2`
- A3 stress: `15:72`
- Drive: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`
- legacy production remains unchanged.

## Visible issue
Fresh A2/A3 review found the hierarchy already Japanese-first at the artifact level (`本日の旅程`, Japanese guidance placeholders), while the two main event labels alone remained `CEREMONY` and `RECEPTION`. They carried semantic information but read like residual English template labels rather than necessary travel-authenticity devices.

Confirmed times and the unresolved transfer interval are unchanged.

## Bounded comparison
A rollback-safe A2 candidate `26:2 / QA / ADD-03 A2 / JAPANESE EVENT LABELS / 2026-08-19` changed only:

- `CEREMONY` → `挙式`
- `RECEPTION` → `披露宴`

No time, duration, date, location, event index, TBD status, guidance placeholder, divider, axis, node, palette or print geometry changed.

Whole/reading comparison was stronger: the information hierarchy now reads as one Japanese chronology while retaining the restrained timetable/chronographic visual grammar.

## Promotion / rollback
Applied the same semantic change to selected A2/A3 and their long-copy proofs.

Hidden rollback copies:
- A2 selected: `27:2`
- A3 selected: `27:40`
- A2 stress: `27:72`
- A3 stress: `27:110`

The comparison `26:2` was hidden after adoption. Legacy production is untouched.

## Three-scale / structure QA
- A2 whole/reading: PASS
- A3 whole/reading: PASS
- A2 actual root: `1400×1980`
- A3 actual root: `990×1400`
- A2 selected visible native text: `22`; IMAGE fills `0`; outside text `0`
- A3 selected visible native text: `20`; IMAGE fills `0`; outside text `0`
- A2 stress visible native text: `22`; IMAGE fills `0`; outside text `0`
- A3 stress visible native text: `20`; IMAGE fills `0`; outside text `0`

Existing auto-height variable-note and 24px long-copy clearance evidence remains valid.

## Asset decision
Image generation: `0`. Drive write: `0`. The defect was language hierarchy, not missing imagery.

## Decision
`JAPANESE_EVENT_LABELS_PASS`. ADD-03 remains `CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`.