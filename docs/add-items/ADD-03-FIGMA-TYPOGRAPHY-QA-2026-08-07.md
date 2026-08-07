# ADD-03 Figma typography QA — 2026-08-07

## Authority
- GitHub main immediately before write: `d0e65233c5369b41eaa68c2ae2d7ad6f215d86be`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- Production node: `1:5` (`FRAME_TIMETABLE_BOARD`)
- Drive folder: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j` (`ADD-03_当日タイムテーブルボード`)

## Live issue found
The initial production was structurally sound but read as an English-first generic journey timeline. For a Japanese wedding-day printed board, the information hierarchy needed stronger Japanese wayfinding without inventing any unconfirmed schedule facts.

## Figma change
Rollback proof `2:2 / QA_ADD_03_BEFORE_JP_TYPO_2026_08_07` was created before editing production.

Native editable text was refined in place:
- `OUR WEDDING JOURNEY` → `WEDDING DAY`
- date/location line now includes `当日のご案内`
- `CEREMONY` → `CEREMONY / 挙式`
- transfer remains explicitly `TBD · LAYOUT DUMMY` and adds only neutral `ご案内`
- `RECEPTION` → `RECEPTION / 披露宴`
- closing line changed to native Japanese thanks copy

Confirmed times were not changed. Ceremony/reception note placeholders remain explicit layout dummies. No rasterization, flattening, or Drive asset replacement was performed.

## QA
Live design-context readback after the edit confirmed the production remains 1400×1980, semantic timeline groups remain intact, text remains native/editable, and the three confirmed/TBD time blocks remain unchanged. Visual readback shows clearer Japanese event identification while preserving the restrained vertical timeline and print-safe whitespace.

## Status
`DESIGN_QA_PASS_WITH_PLACEHOLDERS` for digital design structure and visual hierarchy.

`NOT_PRINT_READY` remains until final transfer wording, final explanatory copy, installation size decision, printer template/profile, and 100% physical proof are available. Those items are deferred and must not block progress to ADD-04.
