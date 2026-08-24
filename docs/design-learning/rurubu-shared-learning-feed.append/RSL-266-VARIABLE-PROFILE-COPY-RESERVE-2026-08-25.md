# RSL-266 — Placeholder-short profile fields conceal variable-copy wrap fragility

Date: 2026-08-25
Source scope/item: Rurubu WEDDING / V7 Profile+Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-266-SHORT-PLACEHOLDER-HIDES-VARIABLE-PROFILE-COPY-WRAP-FRAGILITY`

## Visible problem

V7 K3 used `回答待ち` for unresolved profile values. The current layout therefore looked structurally safe, but its replaceable text boxes had not been tested with plausible Japanese production-length values. A rollback-safe synthetic stress exposed awkward end-of-line breaks, including a one-character final fragment.

## Root-cause hypothesis

A truth-safe placeholder can be much shorter than eventual real content. If a layout is approved only with that placeholder, fixed-width/fixed-height text roles may appear robust while remaining fragile to normal production copy.

## Consumed neutral learning

`NRSL-001` from the non-Rurubu neutral feed was consumed only as a QA-method hypothesis: after a material spatial decision involving variable copy, rerun fresh realistic copy stress. No non-Rurubu item-specific Figma, Drive, asset, coordinates, palette or production path was inspected or copied.

## Professional research observation

JAGAT describes line length, line spacing and type size as conditions for readable composition. Pentagram's *No Man's Land* describes an editorial framework as needing enough flexibility to hold varied content without losing publication identity. These observations were treated as hypotheses, not permanent rules.

## Bounded experiment

K3 stress `2496:2` used clearly synthetic, non-factual Japanese strings and exposed weak wrapping. K4 `2497:2` changed only six replaceable profile-value text-box widths; no reader-facing current copy or styling changed. K4 stress `2497:50` was re-run. The first K4 stress still left a weak final one-character line in the charm field, so that field received one additional width correction before final verification.

Final K4 synthetic-stress result:
- 500px: PASS
- 1400px: PASS
- text-text intersections: `0`
- 18px edge risks: `0`
- Japanese→Inter mismatch: `0`

Current-copy K4:
- 500px: PASS
- 1400px: PASS
- 1587×1123: DESIGN QA PASS
- native text: `26`
- text-text intersections: `0`

## Verified principle

When a replaceable text role is currently represented by a much shorter placeholder, do not treat placeholder fit as variable-content readiness. Before promoting a spatial layout, test plausible language-specific lengths on a rollback-safe copy. Prefer preserving semantic phrase integrity by adjusting the actual text role's available measure before adding containers, shrinking type aggressively, or inventing content.

## Limits / do not transfer

Do not transfer K4's exact widths, coordinates, profile categories, V7 typography or page composition. This test does not guarantee arbitrary future copy lengths and does not authorize fabricated personal data. Actual profile content and all Q&A answers remain subject to fresh REAL CONTENT QA.

## Cross-item applicability hypothesis

A materially different print item with unresolved replaceable text can independently test the same method: placeholder-short state → realistic synthetic stress → bounded spatial correction → three-scale + collision QA. Cross-item promotion requires independent evidence.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-K4-PROFILE-VARIABLE-COPY-RESERVE-QA-2026-08-25.md`
Figma current: `2497:2`
Figma stress: `2497:50`
