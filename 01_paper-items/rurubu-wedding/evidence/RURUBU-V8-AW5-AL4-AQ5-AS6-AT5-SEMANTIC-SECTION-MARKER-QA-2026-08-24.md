# Rurubu V8 AW5 / AL4 / AQ5 / AS6 / AT5 — Semantic Section Marker QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Problem

V8 was already declared `UNPAGINATED_STUDY / SECTION-ORDER-TRUTH-GATED`, and AV3 had removed unverified ordinals from the back-cover contents list. Live audit nevertheless found five current spread kickers still exposing a complete-looking chapter sequence:

- AW4 `2391:52` — `01 / ふたり`
- AL3 `2388:4` — `02 / 物語`
- AQ4 `2396:4` — `03 / 記憶`
- AS5 `2407:27` — `04 / 食卓`
- AT4 `2409:40` — `05 / 一日旅`

Final section order/page architecture is not authoritative. The semantic labels are useful; the ordinals are not yet verified navigation data.

## New/deeper professional research

W3C/JLREQ describes running heads and related page furniture primarily as signposts that help readers find or understand the current content. W3C heading guidance likewise treats headings as logical structure. This supports a stricter distinction between semantic content labels and numeric structure that only looks systematic.

Rurubu hypothesis: preserve the semantic label, but withhold a chapter/section ordinal until it has a real reader-facing referent such as authoritative order, finding/navigation, quantity, issue, time, or cross-reference.

## Bounded candidate set

Each current root was cloned on the authority page. Only one visible native text marker changed in each candidate:

- AW5 `2434:2` / marker `2434:4`: `01 / ふたり` → `ふたり`
- AL4 `2434:36` / marker `2434:38`: `02 / 物語` → `物語`
- AQ5 `2434:74` / marker `2434:76`: `03 / 記憶` → `記憶`
- AS6 `2434:109` / marker `2434:111`: `04 / 食卓` → `食卓`
- AT5 `2434:134` / marker `2434:137`: `05 / 一日旅` → `一日旅`

No factual/body copy, type size/style, page geometry, photo, crop, image hash, palette, or section-specific secondary kicker changed.

## Visual QA

All five candidates were inspected at whole-item thumbnail scale and at native 1587×1123 detail scale. Intermediate reading-scale inspection showed no hierarchy regression.

Result for all five: PASS for DESIGN QA.

Observed effect:

- publication identity remains clearly V8/book-editorial;
- top-left entry labels still orient the reader;
- unsupported chapter sequence no longer contradicts the unpaginated study state;
- contextual secondary labels such as `Q&A / 小さな会話`, `ふたりの年表`, `旅の記憶`, `夜 / 食卓`, and `横浜 / 一日の流れ` remain because they describe actual local page roles rather than unverified global order.

## Structure QA before promotion

Candidates:

- AW5: native text `20`, IMAGE `1`, text collision `0`, 18px edge risk `0`, Japanese font mismatch `0`
- AL4: native text `23`, IMAGE `0`, text collision `0`, 18px edge risk `0`, Japanese font mismatch `0`
- AQ5: native text `15`, IMAGE `2`, text collision `0`, 18px edge risk `0`, Japanese font mismatch `0`
- AS6: native text `11`, IMAGE `1`, text collision `0`, 18px edge risk `0`, Japanese font mismatch `0`
- AT5: native text `17`, IMAGE `1`, text collision `0`, 18px edge risk `0`, Japanese font mismatch `0`
- candidate root overlap `0`

## Promotion readback

Current V8 grid after promotion:

- AV3 `2431:2` → `0 / 8500`
- AW5 `2434:2` → `1800 / 8500`
- AL4 `2434:36` → `3600 / 8500`
- AQ5 `2434:74` → `0 / 9850`
- AS6 `2434:109` → `1800 / 9850`
- AT5 `2434:134` → `3600 / 9850`

All six current roots:

- parent `2052:2`
- `visible=true`
- pairwise overlap `0`

Rollback roots:

- AW4 `2391:50`
- AL3 `2388:2`
- AQ4 `2396:2`
- AS5 `2407:25`
- AT4 `2409:37`

All are `visible=false`, `x=300000`, parent `2052:2`.

## Professional critique

- **Art director:** coherent publication personality retained; subtraction is semantic, not stylistic minimalism.
- **Editorial designer:** page-role labels remain; false global sequence disappears.
- **Book designer:** six-role V8 now uses one consistent section-order truth model with AV3.
- **Typographer:** type hierarchy and optical position are unchanged; only unsupported prefixes changed.
- **Photo editor:** no photography/crop/hash changes; dummies remain explicitly non-final.
- **Print designer:** no pagination/imposition/printer-ready claim added.

## Learning

No new failure fingerprint was created. This is a five-role reproduction of existing **RSL-251**:

`F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

State remains `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE` inside Rurubu WEDDING. It is not `VERIFIED_CROSS_ITEM` because V7 and V8 are two systems within the same item.

The rule is not “remove numbers.” Numbers stay when they do a real job: quantity, verified sequence, time, issue, finding/navigation, cross-reference, or another authoritative referent.

## Asset / truth boundary

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- photo/crop changes: `0`
- final photography adopted: `0`
- V6 changes: `0`
- V7 production changes: `0`

V8 remains REAL-CONTENT-BLOCKED / NOT PRINT READY.
