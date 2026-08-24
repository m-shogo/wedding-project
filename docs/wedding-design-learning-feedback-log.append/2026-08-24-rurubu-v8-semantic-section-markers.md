# Rurubu V8 — semantic section-marker truth gate feedback

Date: 2026-08-24
Scope: Rurubu WEDDING only

## What changed

Live V8 was already `UNPAGINATED_STUDY / SECTION-ORDER-TRUTH-GATED`, but five current spreads still exposed top-left ordinal markers `01 / ふたり` through `05 / 一日旅`. AV3's contents navigation had already moved to semantic-only labels, so the remaining ordinals created a contradictory partially-finalized chapter architecture.

Rollback-safe candidates changed only the unsupported ordinal prefix while retaining each page-role label:

- AW5 `2434:2`: `01 / ふたり` → `ふたり`
- AL4 `2434:36`: `02 / 物語` → `物語`
- AQ5 `2434:74`: `03 / 記憶` → `記憶`
- AS6 `2434:109`: `04 / 食卓` → `食卓`
- AT5 `2434:134`: `05 / 一日旅` → `一日旅`

## Result

All five passed whole-item and actual-size screenshot QA, with reading hierarchy preserved. Structure QA returned text collision `0`, 18px edge risk `0`, Japanese font mismatch `0`; promoted V8 current-root overlap `0`.

Current V8 set after promotion:
`AV3 2431:2 + AW5 2434:2 + AL4 2434:36 + AQ5 2434:74 + AS6 2434:109 + AT5 2434:134`

Superseded AW4 / AL3 / AQ4 / AS5 / AT4 are hidden rollback at `x=300000` on authority page `2052:2`.

## Learning

No new failure ID. This strengthens RSL-251:
`F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

Decision principle: keep numbers only when they have a reader-facing referent such as authoritative quantity, sequence, time, issue, navigation/finding, or cross-reference. Do not use ordinals only to simulate unresolved publication architecture.

State remains `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`; V7/V8 are distinct systems but the same Rurubu WEDDING item.

## Truth boundary

- image generation `0`
- Drive writes `0`
- new Drive masters `0`
- new image hashes `0`
- photo/crop changes `0`
- final photography adopted `0`
- V6 changes `0`
- V7 production changes `0`

V8 remains REAL-CONTENT-BLOCKED / NOT PRINT READY.
