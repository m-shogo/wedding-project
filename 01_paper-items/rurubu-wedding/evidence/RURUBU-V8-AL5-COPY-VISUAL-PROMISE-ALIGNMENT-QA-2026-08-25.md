# RURUBU V8 AL5 — COPY / VISUAL PROMISE ALIGNMENT QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Before

Current Story/Chronology AL4 `2434:36` contained no visible IMAGE fills, but its intro said:

`写真をめくりながら、出会った頃から今日までをたどる。`

The sentence directly promised a photo-browsing reading action that the actual spread did not provide. This was not a missing-decoration problem; it was a mismatch between editorial copy and the page's real media structure.

## Professional research observation

New research rotated to book-design/editorial theory rather than another photo/crop reference.

- IDEA No.387 treats Japanese book design through relationships between words, figure and form rather than as independent styling layers.
- IDEA No.381 frames editing itself as part of book design.

Local hypothesis: supporting editorial copy should describe the actual reading experience available on the page. A restrained, text-led spread should not simulate a richer photographic interaction in prose merely to sound book-like.

This is an observation converted into a bounded Rurubu test, not a permanent rule copied from the sources.

## Bounded experiment

Rollback-safe AL5 `2500:2` cloned from AL4. Only `L_INTRO` changed.

Before:

`何気ない寄り道も、振り返ればふたりの時間になる。`
`写真をめくりながら、出会った頃から今日までをたどる。`

After:

`何気ない寄り道も、振り返ればふたりの時間になる。`
`出来事をたどりながら、出会った頃から今日までを振り返る。`

No chronology facts/dummies, type size/weight, coordinates, grid, rule, palette, image, crop, decoration or other reader-facing text changed.

## Three-scale QA

- 500px whole-item: PASS
- 1400px reading/page: PASS
- 1587×1123 actual-size/detail: DESIGN QA PASS

The revised line preserves the quiet book rhythm and measure of AL4 while removing the false photo interaction. No new module, card, rule or decoration was introduced.

## Structure QA

AL5 `2500:2`:

- native text: `23`
- visible IMAGE fill: `0`
- text-text intersections: `0`
- 18px edge risks: `0`
- Japanese text using Inter: `0`
- parent: `2052:2`

Final page-level readback after promotion:

- V7/V8 current roots: `12`
- all current roots parented to `2052:2`
- all current roots visible
- pairwise current-root overlap: `0`

## Promotion / rollback

- AL5 `2500:2` → CURRENT / VERIFIED_LOCAL at `3600 / 8500`
- AL4 `2434:36` → `ROLLBACK / V8 AL4 / STORY+CHRONOLOGY / PRE-COPY-VISUAL-PROMISE-ALIGNMENT / HIDDEN`, `x=300000`

## Professional critique

- Art director: PASS — the spread's idea remains quiet reflection + uneven chronology; copy no longer claims an absent photo device.
- Editorial designer: PASS — reading order and density unchanged; supporting text now matches the real content structure.
- Book designer: PASS — text-led pacing remains coherent with V8 rather than imitating a photobook interaction that is not present.
- Typographer: PASS — same measure, scale and line count; no new Japanese wrap defect.
- Photo editor: PASS for truth boundary — no unverified photo is implied to be browsed on this spread. This does not resolve the broader final-photography gate elsewhere in V8.
- Print designer: DESIGN QA PASS only — printer template, preflight and physical proof remain unresolved.

## Learning state

`RSL-267 / VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint:

`F-RSL-267-EDITORIAL-COPY-PROMISES-MISSING-MEDIA-INTERACTION`

Transferable principle: reader-facing support copy should not directly promise a media interaction or evidence type that the current page does not actually provide.

Do not transfer literally: V8 wording, cream/navy styling, chronology grid, headline scale, whitespace or coordinates.

## Asset truth

- image generation: `0`
- Drive write: `0`
- new master: `0`
- new image hash: `0`
- final photography adoption: `0`
- V6 edits: `0`
- V7 production edits: `0`

AL5 is DESIGN-QA verified, not REAL-CONTENT complete and not print-ready.
