# ADD-08 Drink V3 — Deeper Ledger Rhythm QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `xvJH23nWjWAApd3yOwr4y3`
- selected Drink V3: `21:3`
- selected content stack: `23:2 / LAYOUT / DRINK CONTENT STACK`
- long-copy proof: `23:34`
- long-copy content stack: `23:64`
- Drive: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Allergy/Dietary V2 and World Trip V3 were not changed.

## Visible problem

Fresh whole-item review of Drink V3 after the Japanese-first cleanup showed the beverage ledger still ending too early in the cream field. The right teal fixed-art field successfully carried the full page height, but the editable drink information stayed compressed near the top, producing a large lower blank zone and a `premium-by-emptiness` risk.

The problem was vertical rhythm, not missing imagery, missing copy, or missing decoration.

## Bounded comparison

Two rollback-safe selected comparisons were created without changing copy, type scale, teal art, header, footer, or facts:

- `29:2`: content stack `y=420`, `itemSpacing=48`
- `29:43`: content stack `y=420`, `itemSpacing=64`

The second candidate made better use of the paper field while keeping the sections clearly grouped, so it became the lead comparison.

A dedicated long-copy comparison `29:84` applied the same `y=420 / itemSpacing=64` treatment to the existing realistic stress copy.

Long-copy geometry:

- stack height: `1212`
- stack bottom: `1632 / 1980`
- footer y: `1795`
- stack-to-footer reserve: `163px`

Actual-size screenshot review remained clear and did not create cramped or card-like grouping.

## Adopted change

The selected Drink V3 and its existing long-copy proof now use:

- content stack y: `420` (was `356`)
- item spacing: `64` (was `28`)

Pre-change rollback copies:

- selected: `29:125`
- long-copy: `29:166`

Comparison nodes are retained hidden after QA.

## Structural QA

Selected `21:3`:

- stack height `1048`, bottom `1468`
- footer reserve `327px`
- visible text outside root `0`
- text-to-text collisions `0`
- IMAGE fills `0`

Long-copy `23:34`:

- stack height `1212`, bottom `1632`
- footer reserve `163px`
- visible text outside root `0`
- text-to-text collisions `0`
- IMAGE fills `0`

Variable drink/menu copy remains native editable text. No raster or SVG contains final food/drink data.

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported bottleneck was distribution of existing semantic content across the physical A4 field. Drive write: `0`.

## Decision

Drink V3 remains part of the selected clean-room family and keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`. The change improves paper-field rhythm without adding decoration or reducing final-copy tolerance.