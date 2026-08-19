# ADD-02 Japan — generic note subtraction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / PRODUCTION_ADOPTED / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Start authority SHA: `35ba4795947946a8f4b55a33793b63b2285356e9`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Japan production: `2:47`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Visible problem

Fresh whole-item review showed the Japan country-note role as two lines:

- `旅の記憶を、静かな余白に。`
- `［国テーマ説明文］`

The first line was generic travel/wedding filler rather than Japan-specific information. The country title, Japanese name, fixed Japan artwork and unresolved semantic country-description role already carried the composition. Keeping a generic emotional sentence above the unresolved field made the sign read more like a template rather than an item-specific destination card.

## Bounded comparison

Created rollback-safe comparison:

- `109:2 / QA / ADD-02 JAPAN / SEMANTIC NOTE ONLY / 2026-08-19`

Only `TXT_JP_NOTE` changed:

- before: `旅の記憶を、静かな余白に。\n［国テーマ説明文］`
- comparison: `［国テーマ説明］`

Country names, large `06`, red sun, landscape lines, rust binder, print grain, geometry and all other roles were unchanged.

At whole-item scale the semantic-only version was stronger: the lower cream field became more editorial and less like generic travel-stationery copy while the unresolved field remained explicit.

## Adoption / rollback

Before production mutation, preserved hidden rollback:

- `110:2 / ROLLBACK / ADD-02 JAPAN / PRE_GENERIC_NOTE_REMOVAL / 2026-08-19`

Production `2:47` now keeps only native editable `［国テーマ説明］` in `21:340 / TXT_JP_NOTE`.

Comparison `109:2` was hidden after adoption.

## Three-scale / structure QA

- whole / ~500 px: PASS;
- reading / ~1000 px: PASS;
- actual canvas: `1000×1480`;
- visible native texts: `4`;
- visible IMAGE roles: `1` existing print-grain role;
- outside visible text: `0`;
- visible text collisions: `0`.

No final country-description copy was invented and no variable copy was baked into raster/SVG.

## Drive / image decision

Drive folder was live-read immediately before mutation and matched the exact authority. Drive write: `0`.

Image generation: `0`. The defect was generic filler copy, not missing imagery.

## Decision

`GENERIC_TRAVEL_FILLER_REMOVAL_PASS`.

This is item-specific copy subtraction, not a rule to remove all supporting prose. Reader-facing prose should remain when it carries real item-specific meaning.