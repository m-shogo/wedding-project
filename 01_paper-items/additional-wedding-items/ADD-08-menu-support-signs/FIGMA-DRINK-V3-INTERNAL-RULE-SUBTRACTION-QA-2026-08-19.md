# ADD-08 Drink V3 — Internal Section Rule Subtraction QA

Date: 2026-08-19
Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Start authority SHA: `6b4972df9b276ea46c35db74fa2b5d2cb8bc2284`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected Drink V3: `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- long-copy proof: `23:34 / QA_CLEANROOM_ADD08_V3_DRINK_LONG_COPY_STRESS_FINAL_2026_08_15`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- retained legacy production was not modified.

## Visible problem

Fresh whole-item and actual-size review found two full-width dark horizontal rules between `アルコール → ソフトドリンク → ご案内`. The three sections were already separated by large vertical rhythm, colored Japanese headings and distinct native text blocks. The two internal rules therefore added a ledger/form-table reading rather than meaningful binding.

The top rust rule directly below the introductory guidance still performs a real opening/binding role and was intentionally retained.

## Bounded comparison

Rollback-safe comparison:

- `38:2 / QA_ADD08_DRINK_V3_NO_INTERNAL_SECTION_RULES_2026_08_19`

Only these roles were hidden in the comparison:

- `DECOR / RULE 02`
- `DECOR / RULE 03`

No title, copy, section label, spacing, teal fixed-art field, beverage curves, footer, image role or factual placeholder changed.

The comparison read more like an editorial drink list and less like a web/admin ledger, while section comprehension remained immediate.

## Adopted Figma change

Pre-change rollback copies:

- selected: `39:2 / ROLLBACK_ADD08_DRINK_V3_PRE_INTERNAL_RULE_SUBTRACTION_2026_08_19`
- long-copy: `39:43 / ROLLBACK_ADD08_DRINK_V3_STRESS_PRE_INTERNAL_RULE_SUBTRACTION_2026_08_19`

Adopted hidden rules:

Selected `21:3`:

- `23:7 / DECOR / RULE 02` → hidden
- `23:10 / DECOR / RULE 03` → hidden

Long-copy `23:34`:

- `23:69 / DECOR / RULE 02` → hidden
- `23:72 / DECOR / RULE 03` → hidden

Comparison `38:2` was hidden after adoption.

## Three-scale visual QA

- whole-item / ~500px: PASS; the A4 reads as title field → intro → three beverage-information groups → date without form-like internal separators.
- reading / ~1000px: PASS; colored Japanese section headings and whitespace remain sufficient grouping cues.
- actual-size / `1400×1980`: PASS; body rhythm remains intentional and the right teal fixed-art field still balances the cream information field.
- long-copy actual-size: PASS after temporarily showing `23:34`; long Japanese stress copy remains legible and no rule removal caused grouping ambiguity.

## Structure QA

Post-adoption live readback:

- selected visible native text: `9`
- selected visible text outside root: `0`
- selected text-to-text collisions: `0`
- long-copy visible native text: `9`
- long-copy visible text outside root: `0`
- long-copy text-to-text collisions: `0`
- selected and stress internal RULE 02/03: hidden
- long-copy proof returned to hidden state after screenshot QA
- IMAGE fills added: `0`
- variable/factual copy remains native editable text

## Asset / Drive decision

Drive folder was live-read before Figma adoption and remained the exact ADD-08 authority folder.

- Drive write: `0`
- image generation: `0`

The diagnosed defect was redundant native separator geometry, not missing photography, illustration or texture.

## Learning state

`VERIFIED_LOCAL` only. This run does not create a new project rule: the existing `NRSL-002` binding-function method already covers the decision. The important result is item-specific: two internal rules were redundant here, while the top rust rule remains functional and was retained.

## Deferred finalization

No deferred-input state changed. Final drink copy, venue guidance, printer/bleed/profile and physical proof remain `DEFERRED_FINALIZATION / NOT_PRINT_READY`.
