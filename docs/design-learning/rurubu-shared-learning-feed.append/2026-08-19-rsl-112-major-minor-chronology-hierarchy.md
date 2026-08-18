# RSL-112 — Chronology facts can stay complete while visual importance becomes unequal

Source scope/item: Rurubu WEDDING / V6 Outer ES
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The back-cover chronology was factually complete and structurally safe, but at whole-item scale it read as small scattered event metadata beneath a strong photo field. All events carried too-similar visual responsibility, so the lower half looked less edited than the rest of the magazine.

## Root-cause hypothesis

Chronological order and visual importance are different dimensions. Native dates/titles can preserve complete sequence while only the editorially meaningful milestones carry dominant scale. Equal treatment is not required for factual correctness and can create UI/list rhythm.

## Bounded test

On rollback-safe clone ES `1815:2` from EO `1780:2`, change only the back chronology:

- promote 01 / 03 / 05 as large native-number beats;
- keep 02 / 04 as smaller bridge events;
- retain the WEDDING terminal as strongest closure;
- use only three short purposeful color rules for the major beats;
- preserve all photography, image hashes, factual native fields and front-cover geometry.

## Expected improvement

Stronger print-magazine scan hierarchy and a clearer photo → chronology → WEDDING reading path without adding cards, new photos or generated decoration.

## Regression risk

Large numerals can collide with variable event date/title copy, and extra rules can become decorative noise. Actual-size structure QA is required after the scale change.

## Evidence

Initial candidate looked stronger but structure QA found five real text contacts around 02/03/05, so it was not adopted. After repositioning native date/title roles:

- whole / 500px: PASS;
- reading / 1200px: PASS;
- actual-size back `1815:3` 794×1123: PASS;
- visible native text: 24;
- text collision: 0;
- 18px safe-area risk: 0;
- page overflow: 0;
- visible back images: unchanged 2 roles.

Figma evidence: preferred ES `1815:2`, back `1815:3`; hidden rollback EO `1780:2`.
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-ES-ET-EDITORIAL-HIERARCHY-QA-2026-08-19.md`.

## What must remain Rurubu-specific

Exact event hierarchy, dates, 01/03/05 selection, magenta/cyan/yellow palette, back-cover geometry, typography sizes and Rurubu-like travel-magazine grammar.

## Cross-item applicability hypothesis

When another print artifact contains ordered facts that look like an equal-weight list, independently test whether chronology/order can remain native and complete while major/minor visual importance is differentiated. Do not copy this event pattern or color treatment.
