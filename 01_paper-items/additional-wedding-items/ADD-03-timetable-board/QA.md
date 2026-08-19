# ADD-03 当日タイムテーブルボード — QA

Status: `CURRENT / CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-19
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

The older promoted production `1:5 / FRAME_TIMETABLE_BOARD` is retained as legacy comparison/rollback history. It is **not** the current selected visual family after the 2026-08-15 clean-room rebuild.

Current selected clean-room family:

- Figma file: `woFUHUqZcvNkih8o42xeH4`
- A2 selected: `14:2 / CLEANROOM_V2_ADD03_DAY_INDEX` — `1400×1980`
- A3 selected: `15:40 / CLEANROOM_V2_ADD03_A3_DAY_INDEX_REFLOW` — `990×1400`
- A2 long-copy proof: `15:2 / QA_ADD03_CLEANROOM_V2_LONG_COPY_STRESS` — hidden after QA
- A3 long-copy proof: `15:72 / QA_ADD03_A3_CLEANROOM_V2_LONG_COPY_STRESS` — hidden after QA
- retained legacy: `1:5 / FRAME_TIMETABLE_BOARD`
- Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

Clean-room source evidence: `CLEANROOM-V2-DAY-INDEX-QA-2026-08-15.md`.

## Current visual direction

`DAY INDEX / CHRONOGRAPHIC SHEET` treats the board as a large-format printed time score instead of event cards or simulated transport UI.

Current first-glance hierarchy:

1. `本日の旅程` + `2026.10.24 SAT / YOKOHAMA`;
2. `14:10–14:40 / 挙式`;
3. quiet unresolved transfer interval `14:40–15:00 / TBD`;
4. `15:00–17:30 / 披露宴`;
5. authoritative date/location footer.

No rounded-card dashboard structure, fake gate/flight data, repeated icons, shadows, gradients, generated imagery, or rasterized timetable is required.

Fresh 2026-08-19 whole/read/actual review confirms the hierarchy remains strong and intentionally asymmetric. The pale `24`, event index points, rules and time-axis geometry read as paper composition rather than UI controls.

## Recent hardening retained in current selection

### Native variable-text resilience

The genuinely variable guidance roles are native auto-height text in selected A2/A3 and their stress proofs:

- `TXT_EVENT_01_NOTE`
- `TXT_TRANSFER_LABEL`
- `TXT_EVENT_02_NOTE`

The A2 Reception divider was moved down only as much as required to preserve `24px` long-copy clearance after natural-height reflow. Final selected/stress roots keep visible text outside root at `0`.

Evidence: `FIGMA-CLEANROOM-V2-NATIVE-TEXT-RESILIENCE-JA-TITLE-2026-08-17.md`.

### Japanese-first title and event labels

The generic English top label was replaced with native `本日の旅程`, and ordinary event labels use `挙式 / 披露宴`. This keeps the travel concept in the artifact/chronology grammar rather than decorative English filler.

### Generic closing removal

`Thank you for traveling with us.` was removed from A2/A3 selected and long-copy proofs because it added stock wedding-travel copy without schedule information. The footer date/location remains the closing anchor.

Evidence: `FIGMA-GENERIC-ENGLISH-CLOSING-REMOVAL-2026-08-18.md`.

### Redundant duration / connector subtraction

Fresh A2/A3 review found tiny English `30 MIN`, `UNTIL`, and `2 H 30 MIN` microcopy surviving even though every authoritative start/end time is already printed directly. The A2-only duration labels also made the larger format feel more like a data chart than the cleaner A3 reflow.

Rollback-safe selected/stress copies were created at `29:2 / 29:40 / 29:72 / 29:110`, then only the redundant duration/connector text was hidden. No schedule fact, timeline geometry, node marker, Japanese event label or semantic guidance field changed.

Post-change selected/stress roots all have visible `UNTIL/MIN` microcopy `0` and outside visible text `0`; stress proofs returned to hidden state after QA.

Evidence: `FIGMA-REDUNDANT-DURATION-CONNECTOR-SUBTRACTION-QA-2026-08-19.md`.

## Structure / stress QA

Current verified state:

- A2 selected: native editable text, IMAGE fill `0`, outside visible text `0`;
- A3 selected: native editable text, IMAGE fill `0`, outside visible text `0`;
- A2/A3 selected: visible native text `19` each;
- variable guidance roles: `textAutoResize=HEIGHT`;
- A2 long-copy Reception note → divider clearance remains protected;
- A3 long-copy Reception note → divider clearance remains protected;
- no residual visible `UNTIL/MIN` duration microcopy in selected/stress;
- no variable copy baked into raster/SVG;
- stress proofs return to hidden state after inspection;
- retained legacy remains unchanged.

## Fact / placeholder contract

Confirmed facts only:

- date: `2026.10.24 SAT`;
- location: `YOKOHAMA`;
- Ceremony: `14:10–14:40`;
- transfer interval: `14:40–15:00`, activity still unresolved and visibly secondary;
- Reception: `15:00–17:30`.

Do not invent opening time, venue floor, gate, flight number, QR, transport credentials or other operational facts. Unknown guidance stays native semantic placeholder copy.

## Drive / generated assets

- exact Drive folder live-read on 2026-08-19: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`;
- generated/raster production assets required by current design: `0`;
- Drive write in this run: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: hierarchy, typography and paper chronology carry the design; missing imagery is not the current bottleneck.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs exist:

- final transfer/activity wording;
- exact printer template / bleed / safe-area values;
- font availability and PDF embedding/output proof;
- physical A2/A3 proof;
- venue placement and approximately 1.5–2m viewing-distance check.

Do not reopen the selected visual family for cosmetic churn unless a fresh screenshot or authoritative input exposes a concrete defect.