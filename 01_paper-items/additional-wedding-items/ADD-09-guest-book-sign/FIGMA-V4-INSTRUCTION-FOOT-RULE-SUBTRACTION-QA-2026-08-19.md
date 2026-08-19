# ADD-09 Guest Book V4 — Instruction Foot Rule Subtraction QA

Date: 2026-08-19
Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Start authority SHA: `d15f85d83ad7fb0995af636606c7285484b6a603`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected clean-room V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy proof: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS`
- retained legacy: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

## Visible problem

Fresh whole-item / reading / actual-size review found a full-width thin dark `VECTOR / FOOT RULE` between the operational note and the footer placeholder in the lower instruction block.

The instruction block was already visibly grouped by:

- the rust vertical `VECTOR / INSTRUCTION INDEX`;
- three native Japanese semantic text roles;
- shared left alignment and vertical rhythm.

The horizontal rule therefore behaved more like an input/form separator than a necessary editorial binder.

## Bounded comparison

Rollback-safe comparison:

- `26:2 / QA_ADD09_V4_NO_INSTRUCTION_FOOT_RULE_2026_08_19`

Only `VECTOR / FOOT RULE` was hidden. The headline, date, primary continuous journey line, three open route nodes, rust instruction index, copy and spacing were unchanged.

The comparison retained clear lower-block grouping while reading less like a form UI, so it was adopted.

## Adopted Figma change

Pre-change rollback copies:

- selected: `27:2 / ROLLBACK_ADD09_V4_PRE_INSTRUCTION_FOOT_RULE_SUBTRACTION_2026_08_19`
- stress: `27:22 / ROLLBACK_ADD09_V4_STRESS_PRE_INSTRUCTION_FOOT_RULE_SUBTRACTION_2026_08_19`

Adopted hidden rule:

- selected `16:3`: `16:20 / VECTOR / FOOT RULE` hidden
- stress `17:4`: `17:21 / VECTOR / FOOT RULE` hidden

Comparison `26:2` was hidden after adoption.

## Stress-evidence semantic cleanup

During native-size long-copy review, the hidden stress proof still contained internal authoring phrases such as `LAYOUT DUMMY` even though production had already been cleaned.

A dedicated hidden rollback was created before cleanup:

- `29:2 / ROLLBACK_ADD09_V4_STRESS_PRE_SEMANTIC_COPY_CLEANUP_2026_08_19`

Stress nodes `17:19 / 17:20 / 17:22` were replaced with equally demanding native Japanese semantic long-copy that preserves the same text-box heights (`76 / 58 / 17 px`) and therefore does not weaken the layout stress. Visible proof-language after cleanup: `0`.

## Three-scale visual QA

- whole-item / ~500px: PASS; Japanese headline, date, one journey-line system and the lower instruction block remain immediate.
- reading / ~1000px: PASS; removing the lower foot rule reduces form/table semantics without weakening instruction grouping.
- selected actual-size / `1000×1419`: PASS.
- long-copy actual-size / `1000×1419`: PASS after temporarily showing `17:4`; stress was returned hidden afterward.

## Structure QA

Post-adoption live readback:

- selected visible native text: `5`
- selected outside text: `0`
- selected proof-language: `0`
- stress visible native text: `5` when inspected
- stress outside text: `0`
- stress proof-language: `0`
- selected/stress foot rule: hidden
- stress returned hidden after QA
- IMAGE additions: `0`

A generic absolute-bounding-box intersection detector reports headline/date pairs (`16:6 ↔ 16:7`, stress `17:7 ↔ 17:8`) because the headline text box extends under the date's box. Actual-size screenshots show no glyph collision; the visible Japanese headline and date remain optically separated. This pre-existing geometry was not changed in this bounded test.

## Asset / Drive decision

The exact Drive folder was live-read before adoption and Git evidence write.

- Drive write: `0`
- image generation: `0`

The defect was redundant native separator geometry and stale hidden QA copy, not a missing raster/SVG asset.

## Learning state

`VERIFIED_LOCAL` only. No new shared-learning entry is necessary: this is another item-specific application of the existing binding-function check in `NRSL-002`. The rust vertical instruction index was retained because it still groups the lower information; only the redundant horizontal rule was removed.

## Deferred finalization

No deferred-input state changed. Final writing method, pen placement, installation wording/location, printer specifications and physical venue proof remain `DEFERRED_FINALIZATION / NOT_PRINT_READY`.
