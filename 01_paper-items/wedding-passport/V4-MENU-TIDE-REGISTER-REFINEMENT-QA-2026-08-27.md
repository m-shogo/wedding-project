# WEDDING PASSPORT V4 — Menu Tide Register Refinement QA

State: `VERIFIED_LOCAL / V4_MENU_FAMILY_COHERENCE_PASS / STRUCTURE_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`

Run start latest-main SHA: `eea0234963077c067b4652f502fa5776e294dc7b`

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- V4 clean-room evidence: `01_paper-items/wedding-passport/FIGMA-V4-CLEANROOM-HARBOR-ATLAS-2026-08-27.md`
- prior V4 structural refinement: `01_paper-items/wedding-passport/V4-EDITORIAL-PAPER-AUTO-LAYOUT-QA-2026-08-27.md`
- Figma: `UbK8KmuWJcDeGScsN49Uor`
- V4 page: `212:2 / V4_CLEANROOM_2026_08_27`
- target: `212:13 / V4 / 02 MENU + DRINK / OPEN CHAPTER LEDGER`
- exact Drive authority live-confirmed: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- no Rurubu item-specific Figma / Drive / GitHub content was read or modified

## Visible problem

Fresh family thumbnails for Cover / Menu / Seating / Back showed that the Menu page was structurally clear after the earlier chapter-flag repair, but its lower field remained visually underused compared with the established V4 Harbor Atlas family. The content ended around the lower-middle of the page and the allergy note floated in a large quiet field, making the Menu feel less intentionally finished than Cover, Seating, and Back.

The defect was not missing factual copy or a missing photo. It was a family-coherence and physical-page-composition issue.

## Bounded V4-only refinement

A rollback-safe copy was created before mutation:

- `223:2 / ROLLBACK / V4 MENU / PRE-TIDE-REGISTER / 2026-08-27`

A new fixed-art role was added to Menu only:

- `223:47 / FIXED ART / MENU / TIDE REGISTER`
- size: `1480×450`
- final position: `x=0 / y=1740`
- construction: editable composed SVG node tree
- visual job: a shallow lower-right mineral-water field with restrained contour/tide lines and six oxblood register ticks
- factual/variable copy baked into art: `0`
- raster IMAGE fills: `0`

The first placement at `y=1650` sat too close to the allergy-note quiet zone at thumbnail scale. It was therefore lowered to `y=1740` after screenshot review. The adjustment kept the fixed art subordinate to the food/drink hierarchy and prevented the footer note from reading as part of the graphic.

## Why no image-generation batch was run

`FINAL MISSING ASSET LIST`: `0` new raster/image-generation roles.

The diagnosed defect did not require photography, illustration, or a new raster master. A flat reusable composed graphic was the more appropriate hybrid-authoring role, so editable SVG was used instead of forcing an image-generation quota.

## Visual QA

Fresh screenshot review after final placement:

- whole / ~500px: PASS — Menu now has an intentional lower-page finish and clearer family resemblance to Harbor Atlas without copying the Cover/Back silhouette;
- reading scale: PASS — food remains dominant, drink remains subordinate, and the lower fixed art does not pull ahead of content;
- actual-size / native `1480×2100`: PASS — allergy note remains readable and visually separated from the contour field; no visible collision or crop failure.

## Structure QA

Post-refinement live readback for `212:13`:

- native visible text: `35`;
- fixed-height text: `0`;
- outside visible text: `0`;
- raster IMAGE-fill nodes: `0`;
- fixed-art role: `223:47`, `1480×450`, `y=1740`;
- page-wide flattening: `0`.

All variable menu/drink/allergy copy remains native editable text.

## Learning

`VERIFIED_LOCAL`:

> When a sparse lower field makes a print page feel unfinished but the factual content density is already appropriate, add only a bounded fixed-art ending gesture with a clear page-rhythm job; do not stretch content, add cards, or generate filler imagery merely to consume whitespace.

Item-specific and not transferable: the Harbor Atlas palette, exact tide geometry, oxblood ticks, coordinates, and Menu composition.

## Promotion / next

V4 remains `NOT_PROMOTED` and `NOT_PRINT_READY`.

Next safe task:

1. run the four-frame V4 booklet-family coherence review again at whole / reading / actual-size scales;
2. close any remaining V4-only visual defect without consulting retained Current as construction input;
3. once V4 is mature, compare it against retained Current and promote only if V4 clearly wins;
4. keep Drive master persistence separately blocked until a valid connector `file_uri` transport exists.
