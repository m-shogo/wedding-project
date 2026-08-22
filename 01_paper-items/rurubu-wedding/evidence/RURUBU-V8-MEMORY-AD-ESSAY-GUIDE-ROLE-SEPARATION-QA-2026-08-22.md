# Rurubu WEDDING V8 — Memory/Guide AD essay-guide role separation QA

Date: 2026-08-22
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current candidate: `2228:2`
Previous current / rollback: `2199:2`
Scope: Rurubu WEDDING only

## Problem

Memory R had a good article-owned left-page essay and a good four-part right-page guide/index, but the left-page micro furniture still read `01 / WATERFRONT`. The right page already owns numbered guide item `01 朝 / 海辺を歩く`. This made the left essay appear to be another instance of the right-page guide item rather than a different editorial role.

## Fresh professional input

The 2026 New York Times Magazine redesign discussion with Gail Bichler was used as a new process reference. The redesign treats layout, text/image combination, pacing, caption/rule/page-furniture standards and the edit as one integrated system. A relevant transferable point is that page furniture and format should clarify what a piece is doing for the reader rather than merely repeat a visual convention.

Rurubu hypothesis: adjacent pages can look clean but still feel templated or confusing when page furniture implies the same semantic/navigation job on both pages. Before adding decoration, verify that labels and numbering declare the correct role of each page.

## Rollback-safe test

Created AD from R without editing R in place.

Only the left essay micro furniture changed:

- from `01 / WATERFRONT / 風の強さまで、覚えている。`
- to `海辺 / 朝の記憶 / 風の強さまで、覚えている。`

This removes the duplicate guide number and uses Japanese article-owned wording derived directly from the existing essay content. The right page keeps its functional numbered guide `01 朝 / 02 昼 / 03 夕 / 04 夜` unchanged.

No image, decorative object, invented event, card, badge, shadow, gradient, or arbitrary accent was added.

## Visual QA

- 500px whole spread: PASS — the left page now reads as an essay/memory field while the right page owns navigation/index numbering.
- 1000px reading scale: PASS — micro furniture is legible and does not compete with the main headline.
- 1587×1123 actual size: PASS — Japanese wording is stable and the guide remains easy to scan.

## Structural QA after promotion

Current AD `2228:2`:

- parent page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
- current position: `x=0 / y=9850`
- visible native text: `22`
- visible IMAGE roles: `0`
- text intersections: `0`
- 18px safe-area risks: `0`
- accidental one-character explicit Japanese wrap candidates: `0`
- intentional standalone daypart labels retained: `朝 / 昼 / 夕 / 夜`
- variable text remains native/editable

Rollback R `2199:2`:

- renamed `ROLLBACK / V8 MEMORY R / ARTICLE-OWNED TYPE MASS / HIDDEN / 2026-08-22`
- hidden at `x=7200 / y=8500`

## Professional critique

- Art director: PASS locally — no visual gimmick added; the spread's idea remains memory essay vs useful guide.
- Editorial designer: PASS — page furniture now reinforces distinct left/right semantic jobs.
- Book designer: PASS locally — the verso/recto relationship is clearer without changing the established rhythm.
- Typographer: PASS — no accidental single-character Japanese wrap; standalone `朝/昼/夕/夜` labels are intentional semantic units.
- Photo editor: NOT APPLICABLE — no legitimate role-specific photography was available or inserted.
- Print designer: DESIGN QA only; final printer template/preflight/physical proof remain separate.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- RSL-208 DNS-blocked Drive→Figma submit route was not repeated

## Decision

`AD 2228:2 = VERIFIED_LOCAL / MEMORY_CURRENT`

AD is locally stronger than R for page-role clarity. This does not make V8 the global winner or print-ready.
