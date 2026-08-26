# ADD-05 — Connected Fold Pre-Figma Rejection

Date: 2026-08-26
Start main: `ee8f3e961053016423d3a65ed5a0589036d1444b`
State: `REJECTED_PRE_FIGMA / CURRENT_UNCHANGED / NO_YELLOW_FOLD_REMAINS_PENDING`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Non-Rurubu only. No Rurubu item-specific Figma, Drive, asset, layout or GitHub path was inspected or reused.

## Live authority recheck

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- Current 50×80 front: `31:2`
- Current 45×70 front: `31:10`
- Current optional 50×80 back: `31:18`
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- Drive metadata was re-read live before this decision; no Drive write was made.

## Live visual evidence

Fresh native screenshots were re-rendered for all three Current faces.

- `31:2` — 500×800: mango fold still reads as a detached horizontal control crossing the coral ribbon.
- `31:10` — 450×700: the problem is strongest at the smaller format; the mango rectangle reads as a button/status bar rather than a material turn.
- `31:18` — 500×800: the same detached-crossbar reading reproduces on the reverse composition.

Current metadata also reconfirmed the 50×80 front geometry: coral ribbon `31:4` at `x=330 / w=74`, mango fold `31:5` at `x=286 / y=450 / 162×70`.

## Pre-Figma comparison of the connected-fold asset

Existing serious-comparison asset:

`assets/ribbon-fold-connected-junction-candidate.svg`

The candidate was evaluated as a role-only composition proxy against the live 45×70 geometry. This was intentionally **not** treated as Figma three-scale evidence or a production comparison.

Result:

- the extra return planes make the mango role more visibly connected than the Current rectangle;
- however, at 45×70 scale the silhouette reads as an arrow/tab or small origami/clip-art object;
- that new reading is not gift-wrap materiality and introduces a stronger pictogram/UI cue than the defect it was meant to solve;
- continuing to refine this SVG would violate the stop condition already written into the item audit: reject rather than iterate indefinitely when the connected fold becomes origami/clip-art-like at 45×70.

Therefore the connected-fold SVG is now `REJECTED_PRE_FIGMA`. It must not be uploaded to Drive or placed into Current unless a future materially different requirement justifies reopening it.

## Remaining bounded test

The only remaining visual test for this role is now:

1. `CURRENT`
2. `NO_YELLOW_FOLD` — hide only the mango rectangle

Do not create another fold/junction variant before this subtraction test is run in Figma.

If `NO_YELLOW_FOLD` wins at whole-item → reading → native actual-size on 50×80 front, 45×70 front and optional back, promote only that local subtraction with rollback and structure/punch/copy-clearance readback.

If Current wins, reject the original physical-cue hypothesis and close the audit.

## Hybrid / asset decision

- confirmed copy/date: native Figma text
- coral ribbon: existing simple native geometry
- mango Current role: pending bounded subtraction test
- connected-fold SVG: `REJECTED_PRE_FIGMA`
- generated raster: `0`
- replaceable image role: `0`
- Drive write: `0`

Image generation is not required because the defect is fixed-geometry semantics at a 45×70 / 50×80 physical scale, not missing hero photography, illustration or texture.

## Learning state

The item remains `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING` because the winning Current-vs-subtraction state has not yet been tested in Figma.

This run does produce one terminal result: `CONNECTED_FOLD = REJECTED_PRE_FIGMA`.

No cross-item rule is promoted.
