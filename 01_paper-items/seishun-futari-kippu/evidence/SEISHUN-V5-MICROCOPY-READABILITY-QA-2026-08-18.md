# 青春ふたりきっぷ V5 — microcopy readability QA

Date: 2026-08-18
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_CANDIDATE / MICROCOPY_READABILITY_HARDENED / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.

## Live target

- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- selected clean-room V5: `52:25 / V5 / ARCHIVAL JOURNEY COUPON / 720x250`
- Drive authority remains: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`

## Visible issue

Fresh actual-size review found that the selected V5 composition remained healthy, but two pieces of fixed authoritative microcopy were unnecessarily small for a 720×250 physical ticket:

- `WEDDING JOURNEY TICKET` — 9px;
- `No.1024` — 10px.

Both are real fixed-copy authority, not decorative filler, so removal was not appropriate. The bounded test was readability hardening rather than redesign.

## Figma change

A hidden rollback was created before editing:

- `57:2 / ROLLBACK / V5 PRE MICROCOPY READABILITY / 2026-08-18`

Selected V5 changes only:

- subtitle `52:32`: 9px → 10px;
- issue number `52:41`: 10px → 11px;
- authoritative wording unchanged;
- title, route, phrase, date seal, print bands, editable vectors and crop cues unchanged;
- no raster/image role added;
- retained production and V4 study untouched.

## QA

Fresh screenshot: native `720×250` PASS.

Post-change structural readback:

- visible native text: 10;
- text outside root: 0;
- text-to-text collisions: 0;
- IMAGE fills added: 0;
- variable/factual copy baked into raster/SVG: 0.

The subtitle and issue number remain subordinate to the 34px Japanese title and route/date hierarchy, but are less fragile at actual print size.

## Asset / Drive

- generated assets: 0;
- Drive writes: 0;
- existing Drive authority unchanged.

## Decision

`VERIFIED_LOCAL / MICROCOPY_READABILITY_HARDENED`.

V5 remains the selected clean-room candidate with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. No new visual direction was warranted because the existing clean-room composition remained strong; the change is a bounded actual-size readability correction with rollback preserved.
