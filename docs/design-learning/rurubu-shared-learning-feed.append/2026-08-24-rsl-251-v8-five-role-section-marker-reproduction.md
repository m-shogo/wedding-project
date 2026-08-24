# RSL-251 — V8 five-role semantic section-marker reproduction

Date: 2026-08-24
Source scope: Rurubu WEDDING / V8 editorial-monograph clean-room system
State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

Fingerprint:
`F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

## Observation

V8 was explicitly `UNPAGINATED_STUDY / SECTION-ORDER-TRUTH-GATED`. AV3 already used semantic-only contents navigation, but five live spread kickers still exposed `01 / ふたり` through `05 / 一日旅` as if final chapter order existed.

## Root-cause hypothesis

The numbers survived because they looked book-like and systematic, not because a final section order, page architecture, or other finding job had been verified. This is the same underlying failure class previously observed in V7 and AV3, now reproduced across all remaining V8 content roles.

## New/deeper professional input

W3C/JLREQ frames running heads and related page furniture as signposts for finding/understanding current content, while heading guidance treats headings as logical structure. The useful design job is semantic orientation; unsupported ordinals add false structural authority.

## Test

Rollback-safe clones changed only the top-left visible marker:

- AW5 `2434:2`: `01 / ふたり` → `ふたり`
- AL4 `2434:36`: `02 / 物語` → `物語`
- AQ5 `2434:74`: `03 / 記憶` → `記憶`
- AS6 `2434:109`: `04 / 食卓` → `食卓`
- AT5 `2434:134`: `05 / 一日旅` → `一日旅`

No layout, photography, crop, type style/size, body copy, palette, or image hash changed.

## Result

All five passed whole-item and native 1587×1123 visual review, with reading-scale hierarchy preserved. Structure QA for every candidate returned text collisions `0`, 18px edge risks `0`, Japanese font mismatch `0`; candidate overlap `0`.

After promotion, V8 current set is AV3 + AW5 + AL4 + AQ5 + AS6 + AT5; current-root overlap `0`; superseded AW4/AL3/AQ4/AS5/AT4 are hidden rollback at `x=300000` on page `2052:2`.

## Verified principle

Do not remove numbers categorically. Require a reader-facing referent. Valid jobs include quantity, verified sequence, time, issue, navigation/finding, cross-reference, or another authoritative structural role. If final section order is unresolved, a semantic content label can remain without an ordinal.

## What must not transfer

Do not transfer V8 cream/navy styling, marker position, type scale, copy, or book-like restraint to other items. Only the semantic truth test and rollback/QA method are cross-item candidates.

## Evidence

`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AW5-AL4-AQ5-AS6-AT5-SEMANTIC-SECTION-MARKER-QA-2026-08-24.md`
