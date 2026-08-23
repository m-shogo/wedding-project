# 2026-08-24 — Rurubu temporal truth-gate learning feedback

Scope: Rurubu WEDDING only

## What changed

Current live systems now avoid unsupported exact clock times:

- V7 Cafe H7 `2407:2`: `11:40 / ひと休み` → `ひと休み`
- V8 Cafe AS5 `2407:25`: same truth gate
- V7 1DAY C6C `2409:2`: `09:00 / 12:30 / 16:00 / 19:00` → `朝 / 昼 / 午後 / 夜`
- V8 1DAY AT4 `2409:37`: `10:00 / 11:40 / 15:10 / 18:30` → `朝 / 昼 / 午後 / 夜`, including the summary note

Prior versions remain hidden rollback evidence.

## Why

Re-reading `CONTENT-INTAKE.md`, `CURRENT-CONTENT-GAPS-20260730.md`, and `DUMMY-CONTENT-PACK.md` showed no independent source authority for those exact schedule values. Existing design evidence was self-referential and therefore insufficient to establish factual itinerary data.

The improvement is not aesthetic simplification. It is publication truth: use the strongest precision the source actually supports.

## QA

All four promoted candidates passed 500 / 1400 / 1587×1123 DESIGN QA. Structural probes found:

- text intersections `0`
- 18px edge risks `0`
- Japanese font mismatch `0`
- precise clock-time strings `0`

Final V7+V8 current-root readback: all 12 roots visible under page `2052:2`, pairwise overlap `0`.

## Learning

- RSL-257: precise temporal data needs authority; state `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`.
- RSL-258: a cloned rollback-heavy frame can route character-only text mutation to hidden duplicates; visible semantic-role targeting plus uniqueness assertion/readback fixed the failure. State `VERIFIED_LOCAL`.

## Before/after learning check

YES.

Without the truth audit, the existing exact times would likely have been further styled as navigation hierarchy. Instead, the authority check changed the decision from `how should these times look?` to `do these times exist as verified content?`.

The Figma failure loop also improved: after one AT4 selector failure, the same character-only approach was not repeated. The method switched to visible semantic-role targeting and was verified before promotion.

## Asset truth

- new image generation `0`
- Drive writes `0`
- new masters `0`
- new image hashes `0`
- final photography `0`
- V6 changes `0`

Photography and print readiness remain separate blocked gates.
