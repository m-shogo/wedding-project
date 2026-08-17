# ADD-03 当日タイムテーブル — generic English closing removal QA

Date: 2026-08-18
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / GENERIC_ENGLISH_CLOSING_REMOVED / LONG_COPY_STRESS_PRESERVED / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `d49bc7299d1c58c94c940b8ad1cd555fe45c58d5`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- selected A2: `14:2 / CLEANROOM_V2_ADD03_DAY_INDEX`
- selected A3: `15:40 / CLEANROOM_V2_ADD03_A3_DAY_INDEX_REFLOW`
- long-copy proofs: A2 `15:2`, A3 `15:72`
- Drive authority: `ADD-03_当日タイムテーブルボード` / `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`
- retained legacy production: unchanged

## Visible issue

Fresh 500 px review found one remaining generic travel-theme sentence at the bottom of both selected formats:

`Thank you for traveling with us.`

It was not a required schedule fact, semantic placeholder, navigation label, date/location field or physical-print instruction. The rest of the artifact already communicates the wedding/travel concept through the Japanese title `本日の旅程`, chronological route/index grammar, date/location and the actual schedule hierarchy. At whole-item scale the sentence read as stock wedding-travel filler and weakened the otherwise restrained timetable.

## Bounded comparison

Rollback-safe comparison copies were created from the already-selected clean-room V2, not from legacy production:

- A2 comparison `25:2`
- A3 comparison `25:40`

Only `TXT_CLOSING_NOTE` was hidden. No date, schedule time, `TBD`, event labels, semantic guidance placeholder, timeline geometry, route line, date numeral, palette, typography, footer date/location or asset changed.

500 px comparison result: both formats gained a cleaner lower closing field while preserving the timeline's visual endpoint and the footer date/location. No replacement copy was invented.

## Promotion / rollback

Before selected/stress mutation, exact hidden rollback copies were created:

- A2 selected rollback `25:72`
- A3 selected rollback `25:110`
- A2 stress rollback `25:142`
- A3 stress rollback `25:180`

The generic closing sentence was then hidden in:

- selected A2 `14:37`
- selected A3 `15:70`
- A2 long-copy proof `15:37`
- A3 long-copy proof `15:102`

Comparison nodes `25:2 / 25:40` and all rollback copies are hidden after verification. Legacy production remains unchanged.

## Post-write QA

Fresh selected screenshots:

- A2 500 px: PASS; lower field closes with the existing rule and authoritative `2026.10.24 / YOKOHAMA` footer instead of stock English filler;
- A3 500 px: PASS; the same cleanup survives the independent reflow.

Structural readback across selected and long-copy roots:

- outside visible text: `0`;
- IMAGE fills: `0`;
- `TXT_CLOSING_NOTE`: hidden in all four roots;
- all existing variable-note auto-height and long-copy stress structure remains intact.

Bounding-box intersection diagnostics still report the same intentional design overlaps that predate this change (large pale `24` atmosphere, deliberate time/connector overlaps). Fresh screenshots show those as intentional composition rather than glyph collisions; this change did not alter them.

## Drive / generated asset decision

Drive authority metadata was re-read before the write. New Drive assets: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the concrete defect was generic decorative copy, not missing imagery.

## Decision

`GENERIC_ENGLISH_CLOSING_REMOVED`.

ADD-03 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Keep `NOT_PRINT_READY` until final transfer/activity wording, printer template/bleed, font/output proof and physical viewing-distance proof are authoritative.