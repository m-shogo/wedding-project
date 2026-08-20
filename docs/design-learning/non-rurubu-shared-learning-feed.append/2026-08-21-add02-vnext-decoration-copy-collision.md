# NRSL append — Decoration-to-copy collision survives containment QA

Source scope/item: non-Rurubu / ADD-02 11卓の国別テーブルサイン / vNext Hawaii anchor
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A new clean-room Hawaii table-sign direction passed root containment: all native text remained inside the `1000×1480` frame under realistic extended country-theme copy. However, screenshot QA showed the decorative lagoon sweep entering the expanded text block. The layout was structurally contained but visually obstructed.

## Root-cause hypothesis

Overflow/root-bound checks validate containment, not semantic clearance. Fixed decoration that sits safely beside short production copy can become a collision when a native auto-height text role expands, even though both elements remain fully inside the root.

## Bounded test

Source candidate:

- Figma `LAZAZ0u3RGqtN4bYFPZ3pU`
- `125:3 / VNEXT_A / ADD-02 / HAWAII / ARRIVAL LIGHT`
- hidden stress `126:2 / QA / VNEXT_A / HAWAII / LONG COPY STRESS`

Stress result before correction:

- theme-note native text expanded to `216px` height;
- note bottom remained inside the root at `1216`;
- visible screenshot still showed the lagoon sweep entering the note region.

Bounded correction:

- only the fixed `DECOR / LAGOON SWEEP` was moved/reduced to `x=700, y=1135, 430×140`, rotation `6°`;
- semantic text geometry, table index, date, destination title and other decoration remained unchanged;
- the same change was mirrored in the QA clone only for proof consistency.

Post-correction three-scale/structure evidence:

- selected candidate thumbnail: PASS;
- reading scale: PASS;
- actual-size `1000×1480`: PASS;
- stress screenshot: PASS with the expanded note visually unobstructed;
- stress theme-note bottom `1216`;
- max native text bottom `1350`;
- visible text outside root `0`;
- IMAGE fills `0`.

## Regression risk

Moving decoration away from dynamic copy can weaken composition or create dead space if applied mechanically. The target is a verified semantic clearance zone, not a global rule to keep all art away from text.

## What must remain item-specific

Do not transfer Hawaii's navy/cream/yellow/coral/lagoon palette, sunrise disc, left spine, sweep coordinates, table-sign geometry, or exact copy widths.

## Cross-item applicability hypothesis

When a print design contains native variable/auto-height copy adjacent to fixed vector/raster decoration, long-copy QA should inspect **decoration-to-copy collision in the screenshot**, not only text overflow/root containment. Apply this as a bounded visual check on another materially different print item before promotion.

## Evidence

- item evidence: `01_paper-items/additional-wedding-items/ADD-02-table-signs/FIGMA-VNEXT-PRO-Hawaii-Italy-2026-08-21.md`
- item Git commit: `5356e603826369984fd09b1069a4f2f9b9b8c28a`
- Drive authority readback only: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- Drive writes: `0`

## Next receiving-item experiment

On the next clean-room print artifact with a fixed decorative field near expandable native copy, deliberately stress the copy and compare screenshot clearance before/after any spatial correction. If the same benefit reproduces without harming hierarchy, advance toward `VERIFIED_CROSS_ITEM`.