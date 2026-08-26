# ADD-05 — NO_YELLOW_FOLD promotion QA — 2026-08-27

State: `VERIFIED_LOCAL / ADOPTED`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Bounded repair only. The Current RIBBON FOLD art direction, confirmed copy, punch geometry, typography, paper fields and coral vertical ribbon were retained. Only the detached mango/yellow horizontal fold role was tested and changed.

No clean-room whole-item rebuild was performed in this repair. Existing V3 clean-room provenance remains valid.

## Live authority before write

- GitHub latest main at write preparation: `0a4c4a07a2a4dd95b16b591a0126fdea3b3cae8b`
- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- 50×80 front Current: `31:2`
- 45×70 front Current: `31:10`
- optional 50×80 back Current: `31:18`
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- Drive metadata re-read: folder ID matched; no Drive write was required.

## Visible problem

Across all three Current faces, the mango/yellow horizontal rectangle crossing the coral ribbon read as a detached button/status bar rather than a physical ribbon fold. The problem was strongest on the 45×70 reflow.

## Bounded comparison

Fresh rollback-safe Figma comparison frames were created from the three Current faces, hiding only `RIBBON FOLD / MANGO`:

- `38:2` — 50×80 front NO_YELLOW_FOLD comparison
- `38:10` — 45×70 front NO_YELLOW_FOLD comparison
- `38:18` — 50×80 back NO_YELLOW_FOLD comparison

No text, punch, coral ribbon, navy field, spacing or size changed.

### Three-scale result

- 50×80 front: native `500×800` PASS; hierarchy remains `Thank you. → supporting line → date`; the detached UI-like crossbar is removed.
- 45×70 front: native `450×700` PASS; the smaller format improves most because the button/status-bar reading disappears.
- optional back: native `500×800` PASS; `Have a safe trip home.` remains first read and the reverse composition becomes cleaner.

At whole/read/native scales, the coral vertical ribbon plus physical punch still provide sufficient gift-tag / wrapping identity. The mango rectangle was not required to preserve celebration or artifact recognition.

## Promotion / rollback

Before Current mutation, complete rollback clones were saved:

- `39:2` — PRE-NO-YELLOW-FOLD 50×80 front
- `39:10` — PRE-NO-YELLOW-FOLD 45×70 front
- `39:18` — PRE-NO-YELLOW-FOLD back

Current mutation:

- `31:5 / RIBBON FOLD / MANGO` → hidden
- `31:13 / RIBBON FOLD / MANGO` → hidden
- `31:21 / RIBBON FOLD / MANGO` → hidden

The comparison roots `38:2 / 38:10 / 38:18` were hidden after verification.

## Structure readback

### 50×80 front `31:2`
- visible native text: `3`
- fixed-height text: `0`
- outside-root text: `0`
- IMAGE fills: `0`
- mango fold: hidden
- punch: `31:6`, `50×50`, visible

### 45×70 front `31:10`
- visible native text: `3`
- fixed-height text: `0`
- outside-root text: `0`
- IMAGE fills: `0`
- mango fold: hidden
- punch: `31:14`, `50×50`, visible

### optional back `31:18`
- visible native text: `2`
- fixed-height text: `0`
- outside-root text: `0`
- IMAGE fills: `0`
- mango fold: hidden
- punch: `31:22`, `50×50`, visible

## Hybrid authoring / image generation

- confirmed copy/date: native Figma text
- coral ribbon / paper fields: simple native geometry
- punch: native physical role
- generated/composed raster: not required
- replaceable image role: not required
- image generation: `0`
- Drive write: `0`

The defect was fixed-geometry semantics, not missing imagery. Image generation would not have addressed the problem.

## Decision

`NO_YELLOW_FOLD = VERIFIED_LOCAL / ADOPTED`.

Restore `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` for the Current visual state, while retaining `NOT_PRINT_READY` until real gift/package attachment, stock, printer and physical proof inputs are complete.

The earlier connected-fold SVG branch remains terminal `REJECTED_PRE_FIGMA`; do not revive it without a materially different requirement.
