# Rurubu V5 — production-file page split and navigation QA

Date: 2026-08-11
Scope: Rurubu WEDDING only

## Authority reread
Before writes, re-read `AGENTS.md`, `CLAUDE.md`, the live comparator reconciliation, Drive `00_Figma本番前_Current Authority・制作ルール`, live Figma Start/Current/Review/Working pages, and the latest CV learning evidence.

## Visible problem
The user explicitly reported that Figma had become hard to read. The production Current page still contained 185 top-level V5 experiment frames mixed around true Current and baseline wireframes. The existing Start/Review/Working split helped, but `01_RURUBU_WEDDING` remained an extremely long experiment canvas and `05_RURUBU_WORKING` accumulated same-day history.

## Principle tested
Production-file information architecture is part of design quality. Keep true Current, active comparator work, same-day studies, and rollback history on different pages while preserving node IDs and rollback evidence. Do not delete experiments merely to make the file clean.

## Changes
- True Current page `01_RURUBU_WEDDING` / page `0:1` now keeps only 11 baseline/current top-level frames, including Current outer `77:18` and Current inside `77:290`.
- Moved 2026-08-07 through 2026-08-10 V5 experiments to `90_RURUBU_ARCHIVE_0807_0810` / page `853:18`: 138 frames.
- Moved non-active 2026-08-11 experiments to `06_RURUBU_0811_STUDIES` / page `853:19`: 46 frames.
- `05_RURUBU_WORKING` / page `834:2` now contains only three active frames: CU `834:3`, CV `848:2`, CM `818:2`.
- `04_RURUBU_REVIEW` remains the compact Best-vs-Current comparison and is unchanged.
- Updated `00_RURUBU_START_HERE` copy so Current / Review / Working / Studies / Archive responsibilities are explicit.

## QA evidence
- Start page screenshot reviewed after the final copy update: PASS. Four routing cards fit without wrapping/collision and the subtitle clearly states Working has only three active candidates.
- Start page body now identifies `06_RURUBU_0811_STUDIES / 90_RURUBU_ARCHIVE_0807_0810` and the 46 / 138 frame counts.
- Current outer `77:18` and Current inside `77:290` were not edited.
- Node IDs of moved experiments were preserved because frames were reparented, not recreated.
- CV remains outer Best comparator; CM remains inside Best comparator.
- No image was generated, adopted, or placed in this organization-only experiment.

## Asset truth
Drive Q60 was re-read as the exact stored JPEG and materialized to runtime again: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, 1330×1220, 155,439 bytes, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`. This does not count as Figma placement. Exact Q60 Figma placement and visual QA remain open.

## Adoption decision
ADOPT the page split. It materially improves production usability without touching artwork or deleting rollback history.

Current gate remains: PHOTO_ROLE_PASS 9/10, dominant 2/3, V5 NOT COMPLETE, V6 NOT STARTED.
