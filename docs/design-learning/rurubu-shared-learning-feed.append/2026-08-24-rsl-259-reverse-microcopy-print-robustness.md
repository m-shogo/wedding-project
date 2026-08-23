# RSL-259 — Reverse microcopy print-robustness remains a proof-gated hypothesis

Date: 2026-08-24
Source scope/item: Rurubu WEDDING / V7 Island Picks + 1DAY

State: `TESTED_LOCAL / PRINT-PROOF-BLOCKED`

Fingerprint:
`F-RSL-259-SMALL-REVERSE-MICROCOPY-IS-SCREEN-LEGIBLE-BUT-PREPRESS-FRAGILE-ON-SATURATED-PROCESS-FIELD`

## Visible problem

V7 C6C's reader-facing deck `見るだけじゃなく、食べて、歩いて、話す旅。` was screen-legible but unusually small (`12.5 px / Noto Sans JP Regular`) and reversed to white over a saturated cobalt field.

## New professional observation

Current Adobe InDesign trapping/overprint guidance treats registration, trapping and overprint behavior as press/output-dependent production concerns. Small 100% black text commonly benefits from default overprinting; reverse/knockout text does not inherit that same black-text behavior. Therefore a clean Figma screenshot is not sufficient evidence that small reverse process-color type will reproduce robustly on press.

## Root-cause hypothesis

A visually acceptable reverse microcopy role can still be unnecessarily fragile in print when its essential reader-facing message is carried by very small regular-weight knockout text over a saturated process-color field.

## Local test

- source C6C `2409:2` / deck `2409:7`: `12.5 px`;
- candidate/current C6D `2413:2` / deck `2413:7`: `14 px`;
- copy, font family/style, line-height, box, color, field, position and all surrounding composition preserved.

## Evidence

- 500 px whole-item: PASS and clearer;
- 1400 px reading: PASS and clearer;
- `1587×1123` actual-size design screenshot: PASS;
- visible native text `20`;
- IMAGE fills `6`;
- text collisions `0`;
- 18 px edge risks `0`;
- Japanese font mismatch `0`;
- current V7/V8 root overlap `0`.

## Why this is not VERIFIED_LOCAL yet

The test proves a local **design** improvement, not press robustness. Exact printer, paper, process, output intent, trapping/RIP, separations and physical proof are still unknown. Therefore RSL-259 must remain `TESTED_LOCAL / PRINT-PROOF-BLOCKED` until real prepress/physical evidence exists.

## Transfer boundary

Potentially transferable hypothesis:
- essential reverse/knockout microcopy should receive a dedicated print-production risk review rather than relying only on screen readability;
- separations/overprint/trapping and the print provider's conditions should be checked before final production.

Must NOT transfer:
- `14 px` as a universal minimum;
- V7 cobalt color;
- exact copy, hierarchy, dimensions or composition;
- a blanket rule to enlarge all small text.

## Next test

When the real printer/template/output conditions are authoritative, export/preflight a representative reverse-text role, inspect separations/overprint behavior, and compare a physical proof before promoting this principle further.

Evidence path:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-C6D-REVERSE-MICROCOPY-PRINT-ROBUSTNESS-QA-2026-08-24.md`
