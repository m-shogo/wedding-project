# RSL-257 — precise temporal data needs source authority

Date: 2026-08-24
Scope: Rurubu WEDDING
State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-257-PLAUSIBLE-PRECISE-TEMPORAL-DATA-MASQUERADES-AS-VERIFIED-EDITORIAL-FACT`

## Observation

A polished editorial layout can make arbitrary clock values look researched, scheduled, or documentary even when they entered only as design-test data.

Current Rurubu content authorities distinguish layout dummy content from verified real content and do not supply the precise Cafe/model-course times that had become visible in V7/V8.

## Root cause

Exact time values have unusually strong factual affordance. When typography makes them prominent, readers reasonably infer that the schedule came from a real itinerary, reservation, opening time, or documented event. Using invented precision to strengthen hierarchy therefore creates a truth defect rather than harmless placeholder specificity.

## Local multi-system test

V7 Cafe:
- H6 `2404:2`: `11:40 / ひと休み`
- H7 `2407:2`: `ひと休み`
- result: 500 / 1400 / 1587×1123 PASS; existing photo-caption binding preserved.

V8 Cafe:
- AS4 `2355:27`: `11:40 / ひと休み`
- AS5 `2407:25`: `ひと休み`
- result: 500 / 1400 / 1587×1123 PASS; restrained book composition preserved.

V7 1DAY:
- C6B `2383:2`: `09:00 / 12:30 / 16:00 / 19:00`
- C6C `2409:2`: `朝 / 昼 / 午後 / 夜`
- result: three-scale PASS; high-energy scan rhythm remains.

V8 1DAY:
- AT3 `2342:2`: `10:00 / 11:40 / 15:10 / 18:30`
- AT4 `2409:37`: `朝 / 昼 / 午後 / 夜`
- result: three-scale PASS; restrained vertical pace remains.

Final page-level probe: exact clock-time strings across all current V7+V8 roots `0`.

## Verified lesson

Use exact temporal precision when the source authority actually supports it. If the project only knows sequence/daypart, express sequence/daypart rather than fabricating exact times to create guidebook authority.

This is not a rule against times. Real reservation times, actual event schedules, verified opening hours, transport timetables, and agreed model-course schedules may and should use exact values when useful.

## Promotion boundary

This has reproduced across materially different V7/V8 systems and two editorial roles, but remains within one Rurubu WEDDING item. Therefore it is a `CROSS_ITEM_CANDIDATE`, not `VERIFIED_CROSS_ITEM` and not a project-wide rule.
