# WEDDING PASSPORT — Front Sky Paper Edge Subtraction QA / 2026-08-24

State: `VERIFIED_LOCAL / CURRENT_UPDATED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`

## Live authority

- start / pre-write `main`: `003123c6c81e9c56300cd987c8e5c1c24ce38821`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current front: `181:52 / CURRENT_SELECTED / PASSPORT FRONT / FIELD JOURNAL`
- Current back: `181:80 / CURRENT_SELECTED / PASSPORT BACK / RETURN NOTE` — unchanged
- realistic front stress: `182:2`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive authority metadata read back live; Drive write `0`.

## Visible problem

Fresh whole / reading / actual-size review showed `181:71 / FRONT / SKY PAPER EDGE`, a 610×70 pale-blue rectangle above the olive lower page field. Although named as a paper edge, it was separated from the olive field by visible cream space and did not connect to a fold, binding, trim, inserted sheet, copy role, or other physical layer.

At whole-item scale it therefore read less like a stacked page edge and more like a floating UI/status rail. The front already retains stronger physical-journal identity through the brick stitched binding, cobalt paper insert, mustard index tab, olive lower page field, native Japanese hierarchy and oversized date.

## Bounded comparison

Rollback-safe comparisons changed only `FRONT / SKY PAPER EDGE` visibility:

- normal: `196:2 / QA / PASSPORT FRONT / NO DETACHED SKY EDGE / 2026-08-24`
- realistic long-copy: `196:30 / QA / PASSPORT FRONT STRESS / NO DETACHED SKY EDGE / 2026-08-24`

No copy, typography, spacing, stitched binding, cobalt insert, mustard tab, olive field, date or semantic role changed.

## Three-scale / stress result

- whole / thumbnail: PASS — the lower-right area reads as one intentional olive paper field rather than a stack plus detached rail;
- reading scale: PASS — headline → subhead → date → factual line → couple field remains unchanged and clearer;
- native actual size `1480×2100`: PASS;
- realistic long-copy stress: PASS with long couple names and long closing copy;
- physical-artifact regression: none observed; FIELD JOURNAL identity remains stronger through retained binding and paper roles.

Decision: adopt the subtraction.

## Production mutation and rollback

Complete pre-change hidden rollbacks:

- `197:2 / ROLLBACK / PASSPORT FRONT / PRE-SKY-EDGE-SUBTRACTION / 2026-08-24`
- `197:30 / ROLLBACK / PASSPORT FRONT STRESS / PRE-SKY-EDGE-SUBTRACTION / 2026-08-24`

Adopted change:

- Current front `181:52`: `181:71 / FRONT / SKY PAPER EDGE` hidden.
- stress front `182:2`: `182:21 / FRONT / SKY PAPER EDGE` hidden.
- completed QA comparisons `196:2 / 196:30` hidden after verification.
- Current back `181:80` unchanged.

## Structure readback

Current front `181:52`:
- visible native text `7`;
- fixed-height text `0`;
- visible text outside root `0`;
- IMAGE fills `0`;
- `FRONT / SKY PAPER EDGE visible=false`.

Stress front `182:2`:
- visible native text `7`;
- fixed-height text `0`;
- visible text outside root `0`;
- IMAGE fills `0`;
- `FRONT / SKY PAPER EDGE visible=false`.

## Hybrid / image decision

- variable/factual/emotional copy: native Figma text, unchanged;
- retained physical binding / paper insert / index / lower page field: native fixed geometry;
- detached sky edge: removed rather than replaced;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported defect was unsupported fixed geometry, not missing imagery, atmosphere, texture or illustration.

## Learning state

`VERIFIED_LOCAL` only.

This re-applies the existing whole-item binding/physical-cue test: a layer name such as `paper edge`, `tab`, `rail` or `fold` does not prove that the rendered mark actually reads as that physical role. When the mark is spatially detached and reads as UI decoration, test bounded subtraction rather than preserving it by name.

Do not generalize this into removing paper edges globally. The brick binding, cobalt insert, mustard index tab and olive page field remain because they still perform legible artifact-level roles.

## Result

WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY` pending final names/issue copy, printer template/profile, paper/finishing and physical proof.
