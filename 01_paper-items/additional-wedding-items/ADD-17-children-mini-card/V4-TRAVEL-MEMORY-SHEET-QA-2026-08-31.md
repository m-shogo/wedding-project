# ADD-17 子ども向けミニカード / ぬりえ — V4 TRAVEL MEMORY SHEET QA / 2026-08-31

State: `V4_CLEANROOM_CREATED / STRUCTURE_QA_PASS / SELLABLE_VISUAL_QA_IN_PROGRESS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run start / pre-write latest `main`: `00e0fd7017dc14a2644714aee92768b691f717d1`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- live pre-run page: `0:1 / CURRENT_SELECTED / ADD-17 / FOLDOUT DISCOVERY MAP / 2026-08-22`
- new V4 page: `87:2 / V4 / ADD-17 / TRAVEL MEMORY SHEET / 2026-08-31`
- new V4 front: `87:3`
- new V4 back: `87:16`
- exact Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- Drive write: `0`
- generated/raster asset: `0`

The older production / V2 / V3 / vNext material was not duplicated into V4. V4 was authored from a blank page and blank frames. Older work remains comparison / rollback only.

## V4 art direction

`TRAVEL MEMORY SHEET` is an age-independent, neutral activity sheet rather than a fake ticket/passport or web-card composition.

Front reading flow:
1. `きょうの旅のきろく`
2. `きょうの旅を、かいてみよう。`
3. open drawing/writing field
4. small guide
5. name/date

Back reading flow:
1. `もうひとつ、のこしておこう`
2. `いちばん心にのこったこと`
3. open writing rules
4. optional small sketch corner
5. name/date

Visual system: warm paper, deep navy memory spine, small apricot entry tick, restrained sage corner/edge cues. No Rurubu grammar, no airplane/passport literalism, no fake badge/status UI, no stock imagery, no generated child/person imagery.

## Hybrid roles

- variable/reader copy: native Figma text
- writing/drawing areas: editable native geometry
- fixed flat accents: editable native vector/shape roles
- replaceable photo: not required
- generated/composed raster: not required
- raster IMAGE fills: `0`

## Print-first geometry

Working production geometry follows the retained verified A6 physical model:

- trim: `105 × 148mm`
- bleed: `3mm` each side
- bleed canvas: `111 × 154mm`
- Figma scale: `10px/mm`
- canvas: `1110 × 1540px`
- hidden safe guide: `8mm from trim` = `110px from bleed edge`
- fold / punch / perforation: not currently required
- QR: not applicable
- handwriting/drawing area: primary functional surface; physical pen/pencil proof remains required

## Actual-size typography

At `10px/mm`, 1 Figma px ≈ 0.2835pt.

- front title `74px` ≈ `21.0pt`
- back title `70px` ≈ `19.8pt`
- small supporting roles were raised during this run from 26–34px-class values to mostly `34–36px` ≈ `9.6–10.2pt`
- name/date labels `36px` ≈ `10.2pt`

This correction avoids leaving kid-facing helper/name/date roles in the ~7–9pt range at A6 actual size.

## Structure QA

Front `87:3` before the small-type correction:
- visible native text: `7`
- fixed-height text: `0`
- text outside root: `0`
- IMAGE fills: `0`

Back `87:16` before the small-type correction:
- visible native text: `6`
- fixed-height text: `0`
- text outside root: `0`
- IMAGE fills: `0`

All semantic text uses `textAutoResize=HEIGHT`. The back sketch label was widened while increasing type size so the functional annotation does not collapse into microtype.

## Three-scale QA

- thumbnail / 3-second scan: V4 front/back screenshots captured at ~505×700; hierarchy reads as physical activity stationery rather than dashboard/card UI.
- reading scale: front/back reviewed after blank-frame construction; title → activity field → identity/date sequence remains clear.
- actual-size / print-detail: back re-rendered at native `1110×1540` after microtype correction; supporting copy was increased to ~10pt-class where practical.

`SELLABLE_VISUAL_QA_PASS` is intentionally not promoted in this evidence yet. A final whole-family V4 comparison plus long-copy/activity stress should be completed before promotion.

## Resolution / CMYK

- raster IMAGE fills: `0`
- effective PPI: `N/A`
- `RESOLUTION_WARNING`: none
- CMYK risks: deep navy, apricot, sage and warm paper may shift/dull; grayscale hierarchy must remain legible
- black construction is not finalized until printer profile/specification is known

## Deferred / blocked finalization

Final wedding adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative child attendance/count/age/activity-use information exists.

`DESIGN_COMPLETE != PRINT_READY`.

Still required for `PRINT_READY`:
- authoritative child attendance/count/age/use decision
- printer template/profile confirmation
- final trim/bleed/safe readback against vendor template
- paper stock and writable-surface suitability
- 100% actual-size black pen / pencil / crayon usability proof
- CMYK/profile proof and grayscale hierarchy check
- PDF export, font embed, transparency, overprint/knockout and preflight
- physical proof / handling proof
