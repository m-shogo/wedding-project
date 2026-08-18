# WEDDING PASSPORT V3 — orphan index rule subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ORPHAN_INDEX_RULE_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `6b31c69905805d18a67a5d551541dcca15d1b8c8`

## Authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `UbK8KmuWJcDeGScsN49Uor`
- selected front: `144:3`
- selected front stress: `145:4`
- selected back: `144:26` unchanged
- Drive: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visible issue
Fresh whole-item review found `DECOR / ORANGE INDEX RULE` still visible on the V3 front after the pseudo-navigation text below it had already been removed. The line no longer bound, separated, indexed, or supported any visible semantic content and read as an orphan template divider above the couple-name block.

## Bounded comparison
A rollback-safe candidate `169:2 / QA / PASSPORT V3 FRONT / NO ORPHAN INDEX RULE / 2026-08-19` hid only the orange rule. Date, title, subtitle, route/contour artwork, couple-name placeholder, YOKOHAMA, paper geometry and all native semantic text stayed unchanged.

Whole/reading review was stronger without the divider: the route field now resolves directly into the lower identity block instead of stopping at an unexplained UI-like separator.

## Promotion / rollback
- selected `144:21 / DECOR / ORANGE INDEX RULE`: hidden
- stress matching rule: hidden
- hidden rollback front: `169:27`
- hidden rollback stress: `169:52`
- comparison `169:2`: hidden after adoption
- legacy production: unchanged

## QA
- whole/thumbnail: PASS
- reading scale: PASS
- actual-size root: `1480×2100`
- selected visible native text: `7`
- selected IMAGE fills: `0`
- selected outside text: `0`
- stress visible native text: `7`
- stress IMAGE fills: `0`
- stress outside text: `0`

No variable copy was rasterized or removed.

## Asset decision
Image generation: `0`. Drive write: `0`. The defect was an orphan native divider, not missing imagery.

## Decision
`ORPHAN_INDEX_RULE_SUBTRACTION_PASS`. WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.