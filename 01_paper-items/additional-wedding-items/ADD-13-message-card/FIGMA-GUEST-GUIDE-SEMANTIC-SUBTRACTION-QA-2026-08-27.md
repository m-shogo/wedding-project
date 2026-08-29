# ADD-13 — Guest-guide semantic subtraction QA — 2026-08-27

State: `VERIFIED_LOCAL / ADOPTED`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Bounded semantic-copy repair only. The Current `RESORT DESK LETTER` art direction, A6 landscape geometry, handwriting area, stationery strips/edges, writing rules, title, prompt, name/date roles and prior clean-room provenance were retained.

Only the guest-facing `TEXT / GUIDE` sentence was tested:

`書く場所は、広めに。`

No replacement filler copy was added.

## Live authority before write

- GitHub latest main at write preparation: `b0dceb36a0c4382207b7509733dc9cae80cd4989`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current back: `52:91 / CURRENT / FAMILY-DIVERSE / ADD13 / BACK / LETTER 02`
- hidden realistic back stress: `52:128 / QA / ADD13 / BACK / LONG COPY STRESS / FAMILY-DIVERSE`
- guide Current: `52:100`
- guide stress: `52:137`
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive metadata re-read: exact folder ID matched; no Drive write required.

## Visible problem

At native `1400×993`, `書く場所は、広めに。` reads as a statement about the designer's layout decision rather than a guest action or necessary instruction.

The back face is already self-explanatory through:

- `LETTER 02`
- `帰る前に、ひとこと。`
- `[自由記入]`
- the large ruled handwriting surface
- `おなまえ`
- `2026.10.24`

Therefore the guide added authoring-process language to a finished guest-facing artifact without a reader-facing job.

## Bounded comparison

Rollback-safe guide-hidden comparisons were created:

- `62:2` — Current back with only `TEXT / GUIDE` hidden
- `62:20` — realistic long-copy back with only `TEXT / GUIDE` hidden

No writing rule, name/date position, heading, handwriting geometry or palette changed.

### Three-scale / long-copy result

- whole-item: PASS and more finished-stationery-like; the page reads directly from headline into the writing surface.
- reading scale: PASS; no grouping or instruction loss.
- native `1400×993`: PASS.
- realistic long-copy comparison: PASS; the longer Japanese title/prompt remains legible and the absence of the internal guide creates no ambiguity.

The guide-hidden state is stronger because it removes designer-internal commentary without weakening the writing task.

## Promotion / rollback

Complete rollback clones were created before Current mutation:

- `62:38` — PRE-GUIDE-HIDDEN Current back
- `62:56` — PRE-GUIDE-HIDDEN long-copy back

Promoted Current mutation:

- `52:100 / TEXT / GUIDE` → hidden
- `52:137 / TEXT / GUIDE` → hidden in stress

The comparison roots `62:2 / 62:20` were hidden after verification.

## Structure readback

### Current back `52:91`

- canvas: `1400×993`
- visible native text: `5`
- fixed-height text: `0`
- outside-root text: `0`
- text collision count: `0`
- IMAGE fills: `0`
- `TEXT / GUIDE`: hidden
- handwriting area: `52:99 / AREA_HANDWRITING_MAIN = 900×870`
- handwriting area ratio: `56.32%`
- required minimum: `55%`

### hidden long-copy back `52:128`

- visible native text in stress state: `5`
- fixed-height text: `0`
- outside-root text: `0`
- text collision count: `0`
- IMAGE fills: `0`
- `TEXT / GUIDE`: hidden
- handwriting area remains `900×870 / 56.32%`

## Hybrid authoring / image decision

- variable/factual/guest-facing copy: native editable Figma text
- writing rules / paper structure: simple native functional geometry
- generated/composed raster: `0`
- replaceable image roles: `0`
- image generation: `0`
- Drive write: `0`

`IMAGE_GENERATION_NOT_REQUIRED`: this defect was semantic audience mismatch, not missing imagery. Additional travel/resort imagery would reduce the handwriting function and introduce stock/AI-template risk.

## Learning

Visible finished-product copy must have a reader-facing job. A sentence can be grammatically correct, beautifully typeset and structurally safe while still being wrong because it explains the designer's layout intent rather than helping the guest.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Do not transfer ADD-13's stationery layout, palette, writing geometry or exact copy. Transfer only the QA question: **is this sentence for the reader, or is it the designer explaining the design?**

## Decision

`GUEST_GUIDE_SEMANTIC_SUBTRACTION = VERIFIED_LOCAL / ADOPTED`.

Restore `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` for ADD-13 Current while retaining `NOT_PRINT_READY` until final prompt/name policy, pen/paper test, printer profile and physical proof are authoritative.
