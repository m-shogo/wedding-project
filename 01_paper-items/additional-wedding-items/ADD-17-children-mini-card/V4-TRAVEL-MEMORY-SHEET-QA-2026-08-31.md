# ADD-17 子ども向けミニカード / ぬりえ — V4 TRAVEL MEMORY SHEET QA / 2026-08-31

State: `V4_SELECTED / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / STRUCTURE_QA_PASS / ACTIVITY_CAPACITY_QA_PASS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run-start latest `main`: `9a090ea567d0ba4c1dc98d86eede81c3797c0e6b`
- pre-write latest `main`: `9a090ea567d0ba4c1dc98d86eede81c3797c0e6b`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- retained previous selected page: `0:1 / CURRENT_SELECTED / ADD-17 / FOLDOUT DISCOVERY MAP / 2026-08-22`
- V4 page: `87:2 / V4 / ADD-17 / TRAVEL MEMORY SHEET / 2026-08-31`
- V4 front: `87:3`
- V4 back: `87:16`
- exact Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- Drive write: `0`
- generated/raster asset: `0`

V4 was authored from blank frames. Older production / V2 / V3 / vNext material was not duplicated into V4 and remains comparison / rollback only.

## V4 art direction

`TRAVEL MEMORY SHEET` is an age-independent, neutral activity sheet rather than a fake ticket/passport, generic kid-character product, or web-card composition.

Front reading flow:
1. `きょうの旅のきろく`
2. `きょうの旅を、かいてみよう。`
3. open drawing/writing field
4. small guide
5. name/date

Back reading flow:
1. `もうひとつ、のこしておこう`
2. `いちばん心にのこったこと`
3. six open writing rules
4. optional small sketch corner
5. name/date

Visual system: warm paper, deep navy memory spine, small apricot entry tick, restrained sage edge/sketch cues. No Rurubu grammar, no airplane/passport literalism, no fake badge/status UI, no stock imagery, no generated child/person imagery.

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
- safe: `8mm from trim` = `110px from bleed edge`
- fold / punch / perforation: not currently required
- QR: not applicable
- handwriting/drawing area: primary functional surface; physical pen/pencil/crayon proof remains required

Final structural readback after the 2026-08-31 correction shows:

- front `87:3`: native text `7`, fixed-height text `0`, text outside root `0`, unsafe text `0`, IMAGE fills `0`
- back `87:16`: native text `6`, fixed-height text `0`, text outside root `0`, unsafe text `0`, IMAGE fills `0`

During final actual-size QA, the front kicker and multiple back text roles were found 5–15px inside the nominal 8mm safe requirement or 2px beyond its bottom edge. They were moved into the verified safe area rather than weakening the safe rule. The optional back sketch label also intersected its L-shaped corner cue; the cue was widened/repositioned and the label moved/darkened so the functional instruction no longer crosses a rule.

## Actual-size typography

At `10px/mm`, 1 Figma px ≈ `0.2835pt`.

- front title `74px` ≈ `21.0pt`
- back title `70px` ≈ `19.8pt`
- supporting roles mostly `34–36px` ≈ `9.6–10.2pt`
- name/date labels `36px` ≈ `10.2pt`

This avoids leaving kid-facing helper/name/date roles in microtype territory.

## Activity-capacity QA

The final functional surfaces were measured at actual production scale rather than stress-testing fixed guest-facing titles as if they were variable copy:

- front free drawing/writing field: `82 × 65mm`
- back writing rules: `6` lines, each `79mm` wide
- back line pitch: `11.2mm`
- name writing lane: approximately `48mm`
- optional back sketch corner: approximately `22.5 × 16.5mm`

The title, lead and instructional sentences are fixed copy, so a synthetic long-title clone would not represent a production variable role. A temporary hidden clone was used to probe that distinction, then removed after it produced irrelevant fixed-copy collisions. The production V4 retains no hidden stress debris. The actual variable/physical-writing surfaces remain spacious and separate from trim/safe boundaries.

## Three-scale / sellable visual QA

- thumbnail / 3-second scan: front/back read immediately as a coordinated physical activity-stationery pair, not an admin/dashboard/card UI.
- reading scale: Japanese title hierarchy → activity surface → identity/date remains clear on both faces.
- actual-size / print-detail: safe geometry, ~10pt-class support text, line spacing, writing area and sketch label/corner relationship were checked and corrected.
- V4 is materially different from retained `FOLDOUT DISCOVERY MAP`; the retained previous selected design remains rollback/comparison only.
- the restrained family language does not rely on generic AI backgrounds, decorative English filler, meaningless badges, fake travel credentials, or generated children.

Result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

## Resolution / CMYK

- raster IMAGE fills: `0`
- effective PPI: `N/A`
- `RESOLUTION_WARNING`: none
- CMYK risks: deep navy, apricot, sage and warm paper may shift/dull; grayscale hierarchy must remain legible
- the slightly darkened sage sketch instruction still requires CMYK/physical proof on the selected stock
- black construction is not finalized until printer profile/specification is known

## Deferred / blocked finalization

Final wedding adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative child attendance/count/age/activity-use information exists. This input does not revoke the V4 visual/design gates; it controls whether the item is actually produced and how many age adaptations are needed.

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
