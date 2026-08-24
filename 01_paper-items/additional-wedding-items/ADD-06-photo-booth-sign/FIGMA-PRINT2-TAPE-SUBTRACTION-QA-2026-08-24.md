# ADD-06 Photo Booth — Developed Print 2 Tape Subtraction QA

Date: 2026-08-24
Start main: `29d086324be48f26bf4f7754d2c47e919c173598`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Non-Rurubu only. Rurubu production was not inspected or changed.

Target Figma file: `SVMALDUyhc2chxHa4fvdjx`
Current root: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
Long-copy proof: `47:19 / QA / FAMILY-DIVERSE ADD-06 / PHOTO STRIP LONG COPY STRESS`
Exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

## Visible problem

Fresh whole-item and actual-size screenshots showed the small magenta strip at the top of the second developed print reading less like photographic tape and more like a UI/status/progress accent. The print already had a clear physical white paper field, coral exposure field, dark shadow field and yellow flash circle, so the extra strip did not add a necessary photographic or mounting function.

The affected semantic fixed-art role was:

- Current `50:74 / PRINT / TAPE`
- stress `50:89 / PRINT / TAPE`

This was a screenshot-supported fixed-art ambiguity, not a missing-image problem.

## Bounded comparison

A rollback-safe comparison was created from Current:

- `54:2 / QA / ADD-06 / DEVELOPED PRINT 2 / NO MAGENTA TAPE / 2026-08-24`

Only `PRINT / TAPE` was hidden. No copy, position, typography, photo-strip stock, paper frame, exposure geometry, other developed print, date/location, or Japanese hierarchy changed.

Result:

- whole-item: PASS and cleaner;
- reading scale: PASS;
- native `990×1400`: PASS;
- second developed print reads more as a small photographic exposure and less as a UI/status card.

## Promotion and rollback

Before mutating production, full hidden rollbacks were created:

- Current rollback: `54:33 / ROLLBACK / ADD-06 / PRE-PRINT2-TAPE-SUBTRACTION / CURRENT / 2026-08-24`
- stress rollback: `54:64 / ROLLBACK / ADD-06 / PRE-PRINT2-TAPE-SUBTRACTION / STRESS / 2026-08-24`

Then the tape was hidden in:

- Current `45:2` → `50:74 / PRINT / TAPE = hidden`
- stress `47:19` → `50:89 / PRINT / TAPE = hidden`

The comparison `54:2` was hidden after verification.

## Post-change QA

Fresh Current screenshot at native `990×1400`: PASS.

Fresh realistic long-copy screenshot: PASS.

Structure readback:

- Current: visible native text `7`, fixed-height text `0`, IMAGE fills `0`, print-2 tape hidden;
- stress: visible native text `7`, fixed-height text `0`, IMAGE fills `0`, print-2 tape hidden.

Existing semantic Japanese line-break and long-copy protections remain intact. No type shrinking was used.

## Hybrid authoring / asset decision

- variable/factual copy: native editable Figma text;
- developed-print fixed art: clipped native geometry;
- generated raster: `0`;
- replaceable image role: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was one ambiguous fixed-art cue, not missing photography or illustration.

## Learning state

`VERIFIED_LOCAL` application of the existing rule that physical-looking fixed cues must be judged by their assembled whole-item meaning, not their layer name. A node called `TAPE` does not automatically read as tape; if it behaves visually like a UI/status accent and the artifact remains stronger without it, bounded subtraction is valid.

This is not a blanket rule to remove mounting tape from photographic compositions. Preserve it when it visibly attaches or mounts the paper/photo.

## Decision

`PRINT2_TAPE_SUBTRACTION_PASS / CURRENT_RETAINED_AND_POLISHED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
