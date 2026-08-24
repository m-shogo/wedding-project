# RSL-260 — Inside-edge text reserve is under-specified before binding authority

Date: 2026-08-24
Source scope/item: Rurubu WEDDING / V7 Memory+Guide
State: `TESTED_LOCAL / PRINTER-TEMPLATE-BLOCKED`

Fingerprint: `F-RSL-260-INSIDE-EDGE-TEXT-RESERVE-IS-UNDER-SPECIFIED-BEFORE-BINDING-AUTHORITY`

## Visible problem

The current V7 G4 Memory spread passed screenshot and structure QA, but one native Hawaii-memory caption sat only `18.7 px` from the spread center. The exact printer, binding, creep, fold tolerance and final template are not yet authoritative, so this distance could not be called either safe or unsafe.

## New research observation

Current Adobe InDesign facing-page guidance distinguishes inside/outside margins and permits extra inside margin for binding. Booklet/imposition settings also make page spacing/bleed dependent on the output and binding setup. The professional implication is that center-fold proximity is a production condition, not merely a screenshot-aesthetic condition.

## Root-cause hypothesis

A non-crossing text role can be optically successful on screen while retaining unnecessary binding sensitivity if it sits close to the spread center and has room to move without losing semantic ownership.

## Bounded test

G4 `2395:2` → G5 `2418:2`.

Only `TEXT / V7 MEMORY CAPTION` moved:
- x `505 → 465`
- width `270` unchanged
- center distance `18.7 → 58.7 px`
- characters, font, size, line-height, photo roles, crops, palette and other geometry unchanged.

G4 is preserved as a hidden rollback.

## Evidence

- whole-item / 500 px: PASS
- reading / 1400 px: PASS
- actual-size design / 1587×1123: PASS
- visible native text `20`
- IMAGE fills `6`
- text intersections `0`
- bounded outer-edge risks `0`
- current V7/V8 root overlaps `0`

Figma:
- G5 current `2418:2`
- moved caption `2418:9`
- G4 rollback `2395:2`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-G5-MEMORY-GUTTER-RESERVE-QA-2026-08-24.md`

## What is verified vs blocked

Verified locally for design: moving this specific caption farther from the center does not damage hierarchy, caption ownership, typography or spread rhythm.

Blocked for print: no exact gutter/fold/binding safe distance is verified. Do not promote `58.7 px`, any mm conversion based on the current study dimensions, or this coordinate as a project rule.

## Cross-item applicability hypothesis

On another facing-page print artifact, independently audit non-crossing text near the inside edge. If the role can gain inside reserve with a bounded rollback-safe move and no semantic/visual regression, test the more robust placement. Final safety remains subordinate to the actual printer template, binding method, creep/imposition and physical proof.

## Before/after learning check

YES. New binding/inside-margin research changed the live decision from another visual-decoration pass to a center-fold production-reserve audit.
