# Rurubu WEDDING V8 — OUTER-01 Print Photo Gate QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Current production roots changed: **none**

## Live authority re-read

- GitHub main immediately before latest-main branch rebuild: `2ed1685a7fe59d78ede0b44839323b67622019a6`
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
- V6 control preserved: `JC + IX + JB + IZ + IT + JA`
- V8 current preserved: `AV + AK + AL + AQ + AS + AT`
- current Outer: `2273:24 / AV`
- current Outer image role: `2273:36`
- existing OUTER-01 art-direction brief: `2270:2`
- V8 Drive authority: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`

## New professional / production research used

Fresh official Adobe guidance was used only to establish a working preflight comparison method:

- Photoshop: `300 ppi` is the standard high-quality print target, unless the printer requires a different value.
- InDesign: print quality must be evaluated using **effective PPI at final placed size**, not source dimensions in isolation.

This does **not** replace final printer authority.

## Verified Drive counterpart

Drive file:
- ID: `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- `v8_ocean_light_essay_master.png`
- bytes: `9016`
- measured source dimensions: `1600×1200 px`

The V8 folder was live re-read and still contains the five existing V8 masters only; no new OUTER-01 role-specific generated master exists.

## Working role calculation

Working spread physical geometry: `420×297 mm` for `1587.4×1123` Figma units.

Outer image role `2273:36` is `647×386` Figma units, corresponding to roughly `171×102 mm`.

Conditional calculation using the verified Drive counterpart at that role size:

- limiting width: `1600 px / 6.74 in ≈ 237 ppi`
- `300 ppi` usable width target: about `2025 px`
- with the existing brief's ~15% crop reserve: conservative master long-edge target `>=2400 px`

### Provenance truth boundary

The Drive master counterpart and Figma image hash remain separate provenance facts. Exact byte identity is not proven. Therefore the `~237 ppi` value is **not** claimed as a direct measurement of the current Figma image bytes.

## Figma change

Added a non-production, rollback-safe companion panel next to the existing OUTER-01 art-direction brief:

- node: `2277:2`
- name: `V8 / PHOTO ART DIRECTION / OUTER-01 / PRINT PHOTO GATE / 2026-08-22`
- status: `TEST_GATE / NOT PRINT READY`

The panel records the final-size/effective-PPI acceptance method without modifying AV or any other current spread.

### Figma correction learned during the write

The first panel wording could imply that the Drive master was byte-identical to the Figma image node. That statement exceeded verified provenance. It was corrected immediately to:

- `DRIVE MASTER COUNTERPART`
- conditional `if used 1:1` effective-resolution wording
- explicit `Figma imageHashとのexact byte identityは未証明`

Final panel screenshot QA passed after correction.

## Asset truth this run

- new image-model generation: `0`
- new Drive masters: `0`
- new production Figma image placements: `0`
- V6/V7 production image reuse: `0`
- new production image hash: `0`
- new Figma production spread: `0`
- new Figma QA/production-brief panel: `1` (`2277:2`)

## Git concurrency handling

A first branch was created from `97616faf...`, but unrelated main work merged concurrently as `2ed1685a...` (PR #102). The evidence was rebuilt from the new latest main instead of forcing the stale branch forward. The stale PR was superseded rather than merged.

## Verdict

`VERIFIED_LOCAL_PRODUCTION_MEASUREMENT_METHOD / NOT_PRINT_READY / NO_CURRENT_SPREAD_CHANGE`

This run improves the acceptance criteria for the next role-specific OUTER-01 generation. It does not claim the current abstract support image is print-ready or that V8 has closed the photography gap to V6.

Learning record:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-22-rsl-224-effective-ppi-final-size-gate.md`
