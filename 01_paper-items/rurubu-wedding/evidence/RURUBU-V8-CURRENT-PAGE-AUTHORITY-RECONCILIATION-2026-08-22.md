# Rurubu WEDDING V8 — Current page authority reconciliation

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Canonical V7/V8 study page: `07_RURUBU_V7_V8_PRO_STUDIES` / page `2052:2`

## Problem observed

A live parent-page audit found that the six V8 Current roots were no longer co-located on the canonical V7/V8 study page even though the V8 clean-room authority originally declared that page as their production/study surface.

Before reconciliation:

- Outer AB `2218:2` → `00_RURUBU_START_HERE`
- Profile Z `2215:2` → `03_RURUBU_EDITORIAL_SYSTEM`
- Story Q `2196:2` → `07_RURUBU_V7_V8_PRO_STUDIES`
- Memory R `2199:2` → `00_RURUBU_START_HERE`
- Cafe X `2212:2` → `07_RURUBU_V7_V8_PRO_STUDIES`
- 1DAY T `2203:2` → `00_RURUBU_START_HERE`

This is a structure/authority defect even when the individual spreads render correctly: future reads/writes, visual comparison, rollback and automated QA can silently target the wrong page.

## Root-cause hypothesis

Figma `use_figma` page context resets between calls. Earlier create/clone/write operations that did not explicitly switch to the item authority page could therefore append or clone page-level nodes onto the reset current page rather than the canonical study page.

This matches the Figma execution contract: page context must be explicitly set with `await figma.setCurrentPageAsync(page)` before page-level writes.

## Corrective action

The six Current roots were moved—not duplicated—onto `07_RURUBU_V7_V8_PRO_STUDIES` and organized as one clean 3×2 Current grid below the historical studies:

Top row, y=8500:

- Outer AB `2218:2` → x=0
- Profile Z `2215:2` → x=1800
- Story Q `2196:2` → x=3600

Bottom row, y=9850:

- Memory R `2199:2` → x=0
- Cafe X `2212:2` → x=1800
- 1DAY T `2203:2` → x=3600

No content, typography, image role, visual design, V6 control, V7 comparison frame or rollback root was intentionally altered by this correction.

A temporary Drive→Figma transport-test frame `2220:2` on `00_RURUBU_START_HERE` was returned to hidden state and is not a Current production root.

## Readback after reconciliation

All six Current roots now report parent:

- page ID: `2052:2`
- page name: `07_RURUBU_V7_V8_PRO_STUDIES`

Post-move structure QA:

| Role | Node | Native text | IMAGE | Text intersections | 18px safe risk |
| --- | --- | ---: | ---: | ---: | ---: |
| Outer | `2218:2` | 12 | 1 | 0 | 0 |
| Profile/Q&A | `2215:2` | 23 | 0 | 0 | 0 |
| Story/Chronology | `2196:2` | 25 | 0 | 0 | 0 |
| Memory/Guide | `2199:2` | 22 | 0 | 0 | 0 |
| Cafe/Table | `2212:2` | 11 | 0 | 0 | 0 |
| 1DAY | `2203:2` | 26 | 0 | 0 | 0 |

Outer AB and Profile Z were also re-screenshot after the page move at thumbnail scale; no visual regression was observed. The parent-page correction itself does not change internal child coordinates.

## Failure learning

State: `RSL-207 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint:

`F-RSL-207-PAGE-CONTEXT-RESET-CAUSES-CURRENT-ROOT-PARENT-AUTHORITY-DRIFT`

Prevention:

1. before any page-level create/clone/move, resolve the exact item authority page by ID/name;
2. call `await figma.setCurrentPageAsync(authorityPage)` in that invocation;
3. after the write, read back each mutated root's `parent.id` and `parent.name` as a completion gate;
4. do not treat a visually correct screenshot as sufficient evidence that the node lives on the correct production page.

This method, not the literal V8 coordinates or page layout, is the only cross-item candidate.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new production Figma image placement: `0`
- V6/V7 image reuse: `0`

The page-authority repair is structural and does not change current image provenance.

## Current state

`V8 AB + Z + Q + R + X + T / ALL_CURRENT_ROOTS_ON_CANONICAL_V7_V8_STUDY_PAGE / STRUCTURE_QA_PASS / ROLLBACK_SAFE / NOT_GLOBAL_WINNER / NOT_PRINT_READY`