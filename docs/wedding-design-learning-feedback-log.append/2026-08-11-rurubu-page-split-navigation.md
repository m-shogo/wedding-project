# 2026-08-11 — Rurubu production-file page split feedback

Rurubu WEDDING only.

## Visible problem
The design file had become hard to operate because Current, active candidates, same-day experiments, and older rollback studies were all effectively one long canvas.

## Principle tested
Treat Figma information architecture as part of production UX. Preserve evidence and node IDs, but separate active work from history instead of deleting it.

## Verified result
- `01_RURUBU_WEDDING` now contains only 11 baseline/current top-level frames.
- `05_RURUBU_WORKING` now contains active CU `834:3`, CV `848:2`, CM `818:2` only.
- `06_RURUBU_0811_STUDIES` page `853:19`: 46 same-day study frames.
- `90_RURUBU_ARCHIVE_0807_0810` page `853:18`: 138 older study frames.
- `00_RURUBU_START_HERE` was updated and screenshot-verified after the split.
- Current outer `77:18` and inside `77:290` remain untouched.

## Reusable feedback
1. Keep Working intentionally tiny: active candidates/staging only.
2. Separate same-day studies from older archive; chronological rollback evidence stays available without polluting production navigation.
3. Prefer reparenting over recreation so node IDs and provenance survive cleanup.
4. Start-page copy should state which pages are editable, comparable, and historical.
5. Figma cleanup is not visual-design completion; image/provenance gates remain independent.

Asset state remains unchanged: Q60 exact Figma placement is still incomplete.
