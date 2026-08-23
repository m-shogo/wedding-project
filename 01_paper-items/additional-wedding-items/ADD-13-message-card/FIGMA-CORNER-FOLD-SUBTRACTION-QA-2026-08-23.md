# ADD-13 Message Card — Corner-Fold Cue Subtraction QA — 2026-08-23

Status: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE`
Start main: `45abd19107f5d357f5e60b4727f41015d9c5a727`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Visible problem

Fresh native-size review of the selected `RESORT DESK LETTER` found that the yellow paper-fold cues no longer read convincingly as physical folds at whole-item scale:

- front `52:75 / PAPER / CORNER FOLD` read as a detached triangular accent at the top-right;
- back `52:108 / PAPER / BOTTOM FOLD` sat on the writing surface and visually touched the final writing-rule region, reading more like a warning/marker glyph than useful stationery construction.

The current stationery identity was already carried by the green letterhead/address strip, terracotta paper edge, open writing surface, native Japanese typography and writing rules. The fold cues were therefore tested as removable fixed decoration rather than preserved by layer name alone.

## Bounded comparison

Only fold-cue visibility changed. Text, writing lanes, rules, colors, paper fields, dimensions and semantic roles were unchanged.

- front comparison: `61:2 / QA / ADD-13 / FRONT / NO CORNER FOLD / 2026-08-23`
- back comparison: `61:21 / QA / ADD-13 / BACK / NO BOTTOM FOLD / 2026-08-23`

Result:

- front: calmer top edge; `YOKOHAMA · LETTER 01` and the large Japanese title become the clear first read;
- back: uninterrupted writing surface; no symbol-like triangle competing with the final writing rule;
- stationery identity remains legible without the fold cues.

Comparisons were hidden after adoption.

## Promotion / rollback

Complete pre-change copies were preserved hidden:

- selected front rollback: `61:39`
- selected back rollback: `61:58`
- long-copy front rollback: `61:76`
- long-copy back rollback: `61:95`

Adopted Current changes:

- front `52:72`: `52:75 / PAPER / CORNER FOLD` → hidden;
- back `52:91`: `52:108 / PAPER / BOTTOM FOLD` → hidden;
- front stress `52:109`: `52:112 / PAPER / CORNER FOLD` → hidden;
- back stress `52:128`: `52:145 / PAPER / BOTTOM FOLD` → hidden.

## Three-scale QA

Fresh selected screenshots after adoption:

- front whole / reading / native `1400×993`: PASS;
- back whole / reading / native `1400×993`: PASS.

The change is a subtraction only; no copy, line breaks, handwriting geometry or information hierarchy changed.

## Structure readback

After adoption:

- selected front: visible native text `6`, fixed-height text `0`, outside text `0`, text collisions `0`, IMAGE fills `0`, visible fold cues `0`;
- selected back: visible native text `6`, fixed-height text `0`, outside text `0`, text collisions `0`, IMAGE fills `0`, visible fold cues `0`;
- long-copy front/back: same structural PASS values and visible fold cues `0`.

Handwriting area remains `900×870`, preserving the existing `56.32%` writing-area ratio and the >=55% requirement.

## Hybrid / asset decision

- variable/factual copy: native Figma text;
- writing rules / paper fields: simple native functional geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the defect was unsupported fixed decoration, not missing imagery.

## Drive authority

Live-read exact Drive authority before Git write:

- `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive write: `0`

## Learning state

`VERIFIED_LOCAL` only. This re-applies the existing project QA method: a named physical cue must still read as that physical function at whole-item scale. Do not promote a rule that all folds/corner cues should be removed; retain them where they materially communicate real paper construction or useful interaction.

## Result

`CORNER_FOLD_CUE_SUBTRACTION_PASS / CURRENT_RETAINED_AS_RESORT_DESK_LETTER / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
