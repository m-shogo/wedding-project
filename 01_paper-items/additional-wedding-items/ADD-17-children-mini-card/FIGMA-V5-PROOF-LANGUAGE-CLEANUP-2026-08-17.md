# ADD-17 子ども向けミニカード / ぬりえ — V5 proof-language cleanup

Date: 2026-08-17
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V5_PRODUCTION_POLISHED / PROOF_LANGUAGE_CLEANUP_PASS / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Start authority SHA: `10bc6880babae89ffbbd65b677b7a2736ae75e62`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- item authority: `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/REQUIREMENT-CHECK.md`
- Figma: `PAvkRggJiRuXVypi3RgZCN`
- production front: `2:2`
- production back: `2:5`
- Drive authority: `ADD-17_子ども向けミニカード_ぬりえ` / `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`

## Visible issue

Fresh production screenshot/readback found internal proof-language on the otherwise sellable neutral V5 template:

- front `15:43 / TXT_PROMPT`: `[お題 · LAYOUT DUMMY]`
- back `15:61 / TXT_PROMPT`: `[ひとこと案内 · LAYOUT DUMMY]`

The semantic uncertainty is legitimate because final child use/copy is not authoritative. The visible `LAYOUT DUMMY` suffix is implementation language and does not belong on the guest-facing print surface.

## Bounded Figma change

Before mutation, hidden rollback copies were created:

- `25:2` — front pre-cleanup
- `25:19` — back pre-cleanup

Only the proof suffix was removed:

- `[お題 · LAYOUT DUMMY]` → `[お題]`
- `[ひとこと案内 · LAYOUT DUMMY]` → `[ひとこと案内]`

No child identity, age, count, interest, personalization, final activity wording, or other unresolved fact was invented.

## Screenshot / structure QA

Post-change front/back were reviewed at thumbnail and native actual size `1110×1540`.

Structural readback:

- front `2:2`: 6 visible native text nodes / IMAGE fills 0 / proof-language matches 0 / outside text 0
- back `2:5`: 7 visible native text nodes / IMAGE fills 0 / proof-language matches 0 / outside text 0
- rollback `25:2`: hidden
- rollback `25:19`: hidden
- Drive writes: 0
- image generation: 0

The neutral field-journal art direction and editable vector/text structure remain unchanged.

## Decision / blocker

`PROOF_LANGUAGE_CLEANUP_PASS`.

The existing visual status remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

`BLOCKED_REQUIRED_INPUT` remains only for final adoption / actual-use finalization: authoritative child attendance, approximate age/count, venue provision, whether this item is needed, personalization requirements, final wording and physical handling are still unknown. This cleanup does not resolve or bypass that gate.
