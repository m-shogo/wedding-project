# ADD-09 Guest Book Sign — Corner Tab Subtraction QA

Date: 2026-08-23
State: `VERIFIED_LOCAL / ADOPTED_IN_CURRENT / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_MAINTAINED`
Start authority SHA: `9c490822037f219fb8c1e802ec74e48fa578ae42`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope and authority

- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- Current root: `41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / FAMILY DIVERSITY B / 2026-08-21`
- long-copy proof: `41:76`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive write: `0`
- generated assets: `0`

The Current remained the `PEN TRAY WELCOME` family. This run did not reopen the item for a new V2/V3 composition; it audited a screenshot-visible fixed decoration whose purpose had become ambiguous.

## Visible problem

At whole-item and reading scales, the mustard rectangle at the top-right (`CORNER / CHECK-IN TAB`) read as an isolated accent block. It did not bind a text role, reserve a physical fold/trim/punch area, indicate a real check-in function, carry reader-facing information, or materially strengthen the writing-desk metaphor.

Because the Current already has a functional hospitality-green top edge, a coral entry rule, and a connected pen cue with mustard cap in the writing zone, the corner block added a second unrelated accent without a reader-facing job. It therefore risked reading as generic template furniture.

## Bounded test

A rollback-safe comparison was created:

- `47:2 / QA / ADD-09 / NO CHECK-IN TAB / 2026-08-23`

The test changed only the visibility of the cloned `CORNER / CHECK-IN TAB`. Typography, dynamic information stack, entry rule, desk field, paper edge, connected pen, palette, spacing, facts, and placeholders were unchanged.

### Comparison result

The no-tab version improved the first read:

`GUEST BOOK → 旅の途中で、ひとこと。 → lead → operational information → writing-desk prompt`

without reducing the Guest Book / writing-table semantics. The top-right no longer competed with the headline as an unexplained color block, and the existing mustard pen cap retained a small celebratory accent in a place where it has physical meaning.

The comparison therefore passed and was adopted.

## Rollback and production change

Before production mutation, full hidden rollback copies were created:

- `47:38 / ROLLBACK / ADD-09 / PRE-CORNER-TAB-SUBTRACTION / CURRENT / 2026-08-23`
- `47:74 / ROLLBACK / ADD-09 / PRE-CORNER-TAB-SUBTRACTION / LONG COPY / 2026-08-23`

Production change:

- Current tab `41:58` → hidden
- stress tab `41:78` → hidden
- bounded comparison `47:2` → hidden after verification

No other production geometry or copy changed.

## Three-scale QA

Post-change Current `41:56`:

- whole / ~500px: PASS
- reading / ~1000px: PASS
- actual-size `1000×1419`: PASS

The page remains warm, legible, asymmetrical and clearly focused on the guest writing action. Subtraction does not create false premium emptiness because the dynamic copy stack and lower writing-desk field still provide sufficient editorial mass.

## Long-copy and structure QA

The hidden long-copy proof `41:76` was temporarily revealed after the production change and re-screened.

- realistic multiline Japanese stress: PASS
- visible native text: `12`
- fixed-height visible text: `0`
- outside visible text: `0`
- IMAGE fills: `0`
- corner tab visible: `false`

Current `41:56` readback:

- visible native text: `12`
- fixed-height visible text: `0`
- IMAGE fills: `0`
- corner tab visible: `false`

Stress was re-hidden after screenshot verification.

## Hybrid authoring / asset decision

- semantic copy: native Figma text
- dynamic operational copy: native Auto Layout
- physical writing cue: connected native pen geometry
- fixed background/desk fields: simple native geometry
- SVG: not required
- generated/composed raster: not required
- replaceable image role: not required

`IMAGE_GENERATION_NOT_REQUIRED`: the defect was not missing imagery. It was a fixed accent whose purpose could not be defended at whole-item scale.

## Learning state

`VERIFIED_LOCAL` only.

Transferable hypothesis: when a small fixed accent is named after a metaphor (`check-in`, `ticket`, `stamp`, etc.) but carries no actual reader-facing, physical, binding, or navigational job, compare a subtraction version at whole-item scale before retaining it. Do not promote a blanket rule that all corner tabs or accent blocks are bad; physical tags/folds/tabs with real artifact roles may remain correct elsewhere.

## Decision

`41:56` remains Current with the corner tab removed.

Status remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.
