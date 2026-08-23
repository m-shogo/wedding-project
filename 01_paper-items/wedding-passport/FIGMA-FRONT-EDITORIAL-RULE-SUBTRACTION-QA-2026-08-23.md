# WEDDING PASSPORT Front Editorial Rule Subtraction QA — 2026-08-23

Status: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Target

- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current front: `181:52 / CURRENT_SELECTED / PASSPORT FRONT / FIELD JOURNAL`
- Current back: `181:80 / CURRENT_SELECTED / PASSPORT BACK / RETURN NOTE` — unchanged
- realistic front stress: `182:2`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Visible problem

Fresh whole/reading/actual-size review found `181:75 / DECOR / EDITORIAL RULE`, a 540×12 dark horizontal rule between the Japanese subhead and the large `10.24` date.

The FIELD JOURNAL identity is already carried by the stitched brick binding, inserted cobalt paper, mustard index tab, page-edge fields, native Japanese hierarchy and large date. The rule did not visibly bind otherwise disconnected roles, represent a fold/trim/binding function, or identify the artifact. At whole-item scale it increasingly read as a generic editorial/template divider.

## Bounded test

Rollback-safe comparisons changed only that rule visibility:

- Current comparison: `195:2 / QA / PASSPORT FRONT / NO EDITORIAL RULE / 2026-08-23`
- realistic long-copy comparison: `195:30 / QA / PASSPORT FRONT STRESS / NO EDITORIAL RULE / 2026-08-23`

Result:

- whole/thumbnail: cleaner reading path from subhead directly to `10.24`;
- reading scale: stronger physical-journal rather than generic editorial-template reading;
- native actual size `1480×2100`: PASS;
- realistic long-copy: PASS with long couple names and long closing copy.

The rule was therefore removed from Current and stress.

## Rollback / Current mutation

Complete pre-change hidden rollbacks:

- Current front rollback: `195:58 / ROLLBACK / PASSPORT FRONT / PRE-EDITORIAL-RULE-SUBTRACTION / 2026-08-23`
- stress rollback: `195:86 / ROLLBACK / PASSPORT FRONT STRESS / PRE-EDITORIAL-RULE-SUBTRACTION / 2026-08-23`

Adopted Current:

- `181:75 / DECOR / EDITORIAL RULE`: hidden
- corresponding stress rule `182:25`: hidden
- QA comparisons `195:2 / 195:30`: hidden after verification
- back `181:80`: unchanged.

## Structure readback after adoption

Current front `181:52`:
- visible native text: `7`
- fixed-height text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- editorial rule visible: `false`

Stress front `182:2`:
- visible native text: `7`
- fixed-height text: `0`
- visible text outside root: `0`
- IMAGE fills: `0`
- editorial rule visible: `false`

All variable/factual copy remains native editable text. No image/SVG role changed.

## Hybrid / asset decision

- native text: unchanged
- fixed physical paper/binding/tab/edge geometry: unchanged
- generated/composed asset: `0`
- replaceable image role: `0`
- image generation: `0`
- Drive write: `0`

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was an unsupported divider, not missing imagery or illustration.

## Learning state

`VERIFIED_LOCAL` only. This re-applies the existing whole-item rule/rail binding-function audit: do not remove rules globally, and do not retain them merely because they look editorial. A rule should prove a reader-facing, physical, grouping or binding function at whole-item scale. Here it did not, while the date hierarchy remained stronger after subtraction.

The prior FIELD JOURNAL family-diversity selection remains valid. This is a bounded polish of that Current, not a new art direction.

## Finalization

WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY` until final names/issue copy, printer template/profile, paper/finishing and physical proof are authoritative.
