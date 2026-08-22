# 2026-08-22 — Rurubu V8 Outer AB feedback

## What changed

Outer AA `2216:2` → Outer AB `2218:2`.

Back-cover navigation changed from five equally weighted lines into a reader-facing reading gate:

- `この本の中身`
- functional rule
- stronger `01 ふたり`
- supporting `02 物語 / 03 記憶 / 04 食卓 / 05 1DAY`

Front cover stayed unchanged.

## Why

The previous index was correct but generic. Fresh book-cover research reinforced that the cover should express the publication's internal logic, while typographic hierarchy should come from content and clarity rather than decorative complexity.

The new hierarchy is justified by 01 being the reader's first editorial role, not by a desire to make random lines different sizes.

## Failure / correction

First AB draft let the existing rule cross the enlarged first entry. Rejected before promotion. The rule was moved above the navigation and the three-scale QA repeated.

## QA

- 500px: PASS
- 1400px: PASS
- 1587×1123: PASS
- text intersections: 0
- 18px safe risk: 0
- Japanese explicit one-character line heuristic: 0

## Learning

RSL-206 / `F-RSL-206-FUNCTIONAL-INDEX-REMAINS-GENERIC-WHEN-EVERY-ENTRY-HAS-EQUAL-VISUAL-WEIGHT`

Do not generalize this into 'always make the first item large'. Only apply when the reading entry has a defensible semantic role.

## Asset truth

No new image generation, Drive master, Figma image placement or V6/V7 image reuse occurred.