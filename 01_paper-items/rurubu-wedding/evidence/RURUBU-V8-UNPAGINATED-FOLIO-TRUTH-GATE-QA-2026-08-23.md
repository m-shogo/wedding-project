# Rurubu WEDDING V8 — Unpaginated Folio Truth-Gate QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Figma page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Purpose

Verify whether the current V8 editorial-monograph study should display fixed numeric folios before final page count, intervening pages, section order, recto/verso behavior, imposition and printer requirements exist.

This is a production-truth test, not a visual restyling pass.

## Fresh professional knowledge

This run rotated to professional book pagination and folio production. Adobe InDesign book-numbering documentation treats page and section numbers as sequence data that update with document order, page insertion/deletion and section options. The useful local hypothesis was:

> A folio is not generic book decoration. If the underlying pagination is not authoritative, a plausible fixed page number can falsely imply production certainty.

This observation was tested locally rather than promoted directly.

## Live before state

Current V8 roots before the test:

- Outer AV2 `2347:2`
- Profile/Q&A AW3 `2357:2`
- Story/Chronology AL2 `2332:2`
- Memory/Guide AQ3 `2337:2`
- Cafe/Table AS4 `2355:27`
- 1DAY/Model Course AT3 `2342:2`

Visible fixed folios:

- `2347:20` = `001`
- `2357:10` = `006`
- `2357:24` = `007`
- `2332:12` = `014`
- `2332:32` = `015`
- `2337:10` = `020`
- `2337:29` = `021`
- `2355:34` = `026`
- `2355:40` = `027`
- `2342:23` = `032`
- `2342:29` = `033`

The sequence implies pages not represented or verified by the current six-role comparison study. Final page count/imposition remains explicitly unknown.

## Rollback-safe test

Before mutation, all six current roots and all 11 folio nodes were re-read from live Figma. Required folio font `Noto Sans JP / Bold` was loaded before mutation.

Six hidden rollback roots were created:

- `2363:2` — AV2 pre-truth-gate rollback
- `2363:24` — AW3 pre-truth-gate rollback
- `2363:58` — AL2 pre-truth-gate rollback
- `2363:96` — AQ3 pre-truth-gate rollback
- `2363:131` — AS4 pre-truth-gate rollback
- `2363:156` — AT3 pre-truth-gate rollback

Only the 11 numeric folio nodes listed above were set `visible=false` on the current roots. Current root names were marked `UNPAGINATED-STUDY` so the study state is explicit.

No change was made to:

- factual/native copy characters
- photo/image hashes
- image crop or placement
- page/root x-y geometry
- palette
- type scale
- grid
- V6 control
- V7 comparison set
- non-Rurubu Figma or Drive scope

## Three-scale visual QA

All six current V8 spreads were reviewed after the change.

| Role | 500px whole-item | 1400px reading | 1587×1123 actual-size |
| --- | --- | --- | --- |
| AV2 | PASS | PASS | PASS for DESIGN QA |
| AW3 | PASS | PASS | PASS for DESIGN QA |
| AL2 | PASS | PASS | PASS for DESIGN QA |
| AQ3 | PASS | PASS | PASS for DESIGN QA |
| AS4 | PASS | PASS | PASS for DESIGN QA |
| AT3 | PASS | PASS | PASS for DESIGN QA |

Removing the unverified folios did not break section identity, reading order, visual balance or publication personality. Section kickers, headings, sequencing and typographic architecture continue to provide navigation at study scale.

## Structural QA after change

| Role | Visible native text | IMAGE | Text intersections | 18px edge/safe risk |
| --- | ---: | ---: | ---: | ---: |
| AV2 `2347:2` | 11 | 1 | 0 | 0 |
| AW3 `2357:2` | 21 | 1 | 0 | 0 |
| AL2 `2332:2` | 23 | 0 | 0 | 0 |
| AQ3 `2337:2` | 15 | 2 | 0 | 0 |
| AS4 `2355:27` | 11 | 1 | 0 | 0 |
| AT3 `2342:2` | 17 | 1 | 0 | 0 |

Additional readback:

- all current roots: `parent=2052:2 / visible=true`
- current-root pairwise overlap: `0`
- all 11 target folio nodes: `visible=false`
- all six new rollback roots: `visible=false`
- Japanese font mismatch: `0`
- prohibited Japanese line-start/end punctuation: `0`
- accidental one-character line issue: `0` (intentional one-character semantic words remain valid where applicable)

## Professional critique

- **Art director:** PASS — the V8 identity remains intact without decorative production claims.
- **Editorial designer:** PASS — section recognition and reading order remain clear; no reader-facing navigation is lost in the current study context.
- **Book designer:** PASS — a book system can be evaluated without pretending its final page sequence already exists.
- **Typographer:** PASS — no line-break, spacing or Japanese-font regression; only visibility of folio furniture changed.
- **Photo editor:** NO CHANGE — existing photo roles remain structural dummies where already documented.
- **Print designer:** IMPROVED TRUTH / NOT PRINT-READY — false pagination certainty is removed, but final folios must be restored only after real pagination/imposition/printer authority exists.

## Decision

Adopt the current six V8 roots as `UNPAGINATED-STUDY` variants with numeric folios withheld.

This does **not** mean final Rurubu should omit page numbers. It means final numeric folios are blocked until the publication has authoritative page order/count, section starts, recto/verso logic, imposition and printer requirements.

Learning recorded as:

`RSL-247 / F-RSL-247-UNVERIFIED-FOLIOS-SIMULATE-FINAL-PAGINATION-BEFORE-PAGE-COUNT-AND-IMPOSITION-EXIST`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Asset / truth boundary

- new image generation: `0`
- new Drive master: `0`
- Drive writes: `0`
- new image hash: `0`
- final photography adopted: `0`
- native/factual copy changed: `0`
- V6 changed: NO
- V7 changed: NO
- DESIGN QA: PASS for this bounded folio change
- REAL CONTENT QA: still BLOCKED where current V8 structural photo dummies exist
- final pagination/imposition: NOT VERIFIED
- PRINT TEMPLATE/PREFLIGHT: NOT VERIFIED
- PHYSICAL PROOF: NOT VERIFIED

No global V6/V7/V8 winner is declared.