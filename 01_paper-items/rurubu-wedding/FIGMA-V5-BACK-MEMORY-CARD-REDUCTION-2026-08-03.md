# Rurubu V5 — Back Memory Card Reduction

Date: 2026-08-03
Status: `VERIFIED / ADOPTED_FOR_V5_CURRENT / GLOBAL_RULE_NOT_YET_PROMOTED`

## Visible problem

The main memory text next to the large back-cover photograph was placed inside a white rectangular panel and topped by a rounded magenta `MEMORY 01` pill. Although legible, this repeated the contained-card language already identified as a Web/UI and template risk. It also made the text feel detached from the photograph rather than edited as part of one feature.

## Principle tested

Attempt subtraction before adding decoration. When a photograph and its accompanying copy already occupy a stable grid, hierarchy can be carried by native type, a short rule, spacing, and color instead of a full background card and pill.

## Bounded live change

Target: Figma file `bfM0d4c9dCeBv5pCkJ3TNM`, page `01_RURUBU_WEDDING`, outer V5 node `77:18`.

Mutated nodes:

- `77:28` `BACK_VISUAL_MAIN_TEXT_BG` — hidden
- `77:86` `MAIN_TEXT_STICKER` — hidden
- `77:87` `MAIN_TEXT_STICKER_TXT` — retained as native text, recolored magenta, left aligned, and placed directly above the heading
- `77:144` `AUTH_MAIN_TEXT_RULE_V5` — shortened to match the actual text block rather than the former card height

Preserved:

- photo node `77:24` and its image hash
- heading `77:30`
- body text `77:31`
- semantic node names
- native editable text
- outer Current frame `77:18`
- V4 rollback frames `59:2` and `59:178`

## Verification

### Whole-spread screenshot QA

The post-change spread shows:

- the memory copy now reads as a magazine annotation attached to the dominant photograph
- less white-box containment and less rounded-pill repetition
- more continuity with the cream paper field
- preserved visual separation through the magenta rule and label
- no overlap, clipping, text loss, or new contrast issue

### Structural QA

A live node audit confirmed:

- `77:28` and `77:86` are hidden, not deleted
- `77:87`, `77:30`, and `77:31` remain native text
- `77:24` retains image hash `2cfd19cf1701db58039a4fc645e4279832ec465a`
- semantic names and parent relationships remain intact
- V4 rollback frames remain present

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT`

This is not yet a universal rule that every caption or side text must be direct type. Containment remains appropriate where image contrast, grouping, or format semantics genuinely require it.

## Reusable candidate lesson

When a secondary editorial text block sits beside—not over—a photograph on a quiet paper background, direct native type with a short alignment rule can create stronger magazine continuity than a full card. The gain comes from shared alignment, proportional rule length, and clear type hierarchy, not merely from hiding a rectangle.

## Next application

Continue auditing V5 one module at a time. Prioritize dominant-image quality when binary-safe transfer becomes available; meanwhile, remove only containers that lack a semantic or contrast function and verify every subtraction for dependent contrast changes.