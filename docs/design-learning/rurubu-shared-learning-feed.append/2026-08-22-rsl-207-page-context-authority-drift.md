# RSL-207 — Page-context reset can cause current-root authority drift

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source capability: Figma page-level create/clone/move
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible / operational problem

The six live V8 Current roots rendered individually but were distributed across three different Figma pages. The canonical V7/V8 study authority had originally placed the V8 clean-room work on `07_RURUBU_V7_V8_PRO_STUDIES`.

This created a hidden operational defect: a visual screenshot could pass while future writes, comparison, rollback or QA used the wrong page context.

## Root-cause hypothesis

`use_figma` page context resets between invocations. Page-level create/clone operations that rely on the reset `currentPage` rather than explicitly setting the authority page can append valid-looking nodes to the wrong page.

## Bounded correction

All six current V8 roots were moved—not duplicated—to the canonical page `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES` in a clean 3×2 grid. Their internal design and semantic content were not changed.

After the move, all six roots were read back with the same parent page and all retained zero text collisions / zero 18px safe-area risks.

## Evidence

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-CURRENT-PAGE-AUTHORITY-RECONCILIATION-2026-08-22.md`

Current roots after repair:

- Outer AB `2218:2`
- Profile Z `2215:2`
- Story Q `2196:2`
- Memory R `2199:2`
- Cafe X `2212:2`
- 1DAY T `2203:2`

All report parent `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`.

## Failure fingerprint

`F-RSL-207-PAGE-CONTEXT-RESET-CAUSES-CURRENT-ROOT-PARENT-AUTHORITY-DRIFT`

Operation/capability: Figma page-level create / clone / move
Environment/tool path: `use_figma` / Figma Plugin API
Symptom: visually valid Current root appears on a non-authority page
Likely cause class: invocation page context reset + missing explicit `setCurrentPageAsync(authorityPage)`
Replacement method:

1. resolve exact authority page before page-level mutation;
2. explicitly call `await figma.setCurrentPageAsync(authorityPage)`;
3. perform create/clone/move;
4. read back `parent.id` and `parent.name` for every mutated page-level root.

Stop condition: do not declare page-level write complete when only screenshot appearance is verified.

## What must NOT transfer

Do not transfer the literal V8 page, x/y coordinates, grid, role order or Rurubu study organization to other items.

## Cross-item applicability

The method is broadly applicable to Figma automation because page-context reset is a tooling behavior, but another item should verify the prevention gate against its own exact authority page before promotion to project rule.