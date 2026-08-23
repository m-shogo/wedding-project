# ADD-06 — Night-water reflection subtraction QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_UPDATED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before Git write: `5245fa0c22eb349969a43234986f8c883b0144a0`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current root: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- long-copy proof: `47:19`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- Drive metadata read back live; Drive write `0`.

## Visible problem

Fresh actual-size review showed that the third developed-print scene used a yellow moon plus a narrow vertical yellow `PRINT / REFLECTION` bar. At whole-item scale those two shapes read together as an exclamation-mark-like pictogram rather than a photographic night-water exposure.

That accidental symbol weakened the stated fixed-art role. The strip should read as three abstract developed prints, not a UI/status icon or punctuation mark.

## Bounded comparison

Rollback-safe comparison:

- `52:2 / QA / ADD-06 / DEVELOPED PRINT 3 / NO EXCLAMATION-LIKE REFLECTION / 2026-08-23`

Only the third print's `PRINT / REFLECTION` visibility changed. The moon, night-sky field, water field, all typography, layout, photo frames, colors, date/place and semantic roles stayed unchanged.

Result:

- whole-item: PASS — the third panel reads as moon over water instead of punctuation/UI;
- reading scale: PASS;
- native `990×1400`: PASS;
- long-copy proof: PASS after the same bounded subtraction.

## Promotion / rollback

Before Current mutation, full hidden rollback copies were preserved:

- `52:33 / ROLLBACK / ADD-06 / PRE-NIGHT-REFLECTION-SUBTRACTION / 2026-08-23`
- `52:64 / ROLLBACK / ADD-06 / PRE-NIGHT-REFLECTION-SUBTRACTION / LONG COPY / 2026-08-23`

Promoted change:

- Current `45:2`: `50:79 / PRINT / REFLECTION` hidden;
- stress `47:19`: `50:94 / PRINT / REFLECTION` hidden;
- completed comparison `52:2` hidden after verification.

## Structure readback

Current `45:2`:
- visible native text `7`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- third-print reflection visible `false`.

Stress `47:19`:
- visible native text `7`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- third-print reflection visible `false`.

## Hybrid / image decision

- semantic/factual copy remains native Figma text;
- fixed developed-print art remains editable native vector/shape composition;
- generated raster `0`;
- replaceable image role `0`;
- Drive write `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported defect was semantic fragmentation inside existing fixed art, not missing photography or illustration.

## Learning state

`VERIFIED_LOCAL`.

When fixed art is intended to represent a physical/visual cue such as a developed photo, inspect the assembled cue at whole-item scale. Separate primitives can accidentally combine into a strong unrelated symbol. Prefer a bounded subtraction before adding more detail when the accidental symbol is the actual defect.

Do not transfer the specific moon/water geometry or assume vertical reflections are generally wrong. The transferable hypothesis is to verify the assembled reading of fixed-art components, not their individual layer names.

## Result

`CURRENT_UPDATED / DEVELOPED_PRINT_READING_CLARIFIED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.
