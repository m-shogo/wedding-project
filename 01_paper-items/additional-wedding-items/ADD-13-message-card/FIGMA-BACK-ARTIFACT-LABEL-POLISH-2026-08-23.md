# ADD-13 メッセージカード — Back artifact-label polish / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_UPDATED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start GitHub main: `fa27a2b0a18e8a2259aed57330e862af666ef064`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72 / RESORT DESK LETTER`
- Current back: `52:91`
- long-copy back stress: `52:128`
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive write: `0`

## Visible problem

The back side used `CHECKOUT NOTE` in the dark-green strip. At actual-size review this read less like guest-facing artifact identity and more like an internal art-direction label or hotel checkout instruction. The front already uses a deliberate duplex identity, `YOKOHAMA · LETTER 01`, so the back label also weakened front/back editorial continuity.

This is not a blanket English-removal rule. The problem was the mismatch between the label's apparent meaning and the actual message-card role.

## Bounded comparison

A rollback-safe comparison was created as `55:2` without mutating Current.

1. `YOKOHAMA · LETTER 02` was tested first. It wrapped into an awkward three-line `YOKOH / AMA ...` treatment inside the 120px strip and was rejected.
2. The comparison switched method to the shorter `LETTER 02`. It stayed on one line at the existing Inter Bold 20px, preserved the strip geometry, and paired cleanly with the front's `LETTER 01` identity.

No layout, palette, handwriting area, writing rules, paper fold, name/date role, or factual copy changed.

## Promotion

Before production mutation, full hidden rollback clones were created:

- `55:20 / ROLLBACK / ADD13 / BACK / PRE-LETTER-02 STRIP / 2026-08-23`
- `55:38 / ROLLBACK / ADD13 / BACK STRESS / PRE-LETTER-02 STRIP / 2026-08-23`

Promoted changes:

- Current back `52:91` renamed to `CURRENT / FAMILY-DIVERSE / ADD13 / BACK / LETTER 02`;
- `52:94 / TEXT / STRIP`: `CHECKOUT NOTE` → `LETTER 02`;
- hidden long-copy stress `52:131`: same label change;
- the comparison study `55:2` was hidden after adoption.

The text remains native editable Figma text. No image/SVG/raster asset was added.

## Screenshot QA

Current `52:91` was reviewed again at native `1400×993` after promotion:

- whole-item: PASS;
- reading scale: PASS;
- actual-size: PASS;
- the strip now reads as a compact duplex artifact identifier rather than an instruction;
- the message title, writing field, name/date and bottom fold remain unchanged.

## Long-copy stress defect caught during post-change QA

Revealing hidden stress `52:128` exposed a separate typography defect in the retained stress proof: the prior long title produced an orphaned Japanese ending (`を。`) because the 220px title lane was being mechanically wrapped.

This did not affect the short Current title, but it invalidated the old claim that the stress proof itself was editorially clean.

Method switch:

- kept Current title unchanged;
- stress title only was changed to an editorial fallback at 28px with explicit semantic line breaks:
  - `帰る前に、`
  - `今日の思い出と`
  - `ふたりへの`
  - `言葉を。`
- the first 32px fallback was rejected because Figma still stranded `と` on its own line;
- the final 28px stress fallback passed screenshot review without orphaned particles/endings.

The stress proof was re-hidden after QA.

## Hybrid authoring / assets

- variable/factual/reader-facing copy: native Figma text;
- fixed paper/rules/fold: existing simple native geometry;
- generated/composed raster: `0`;
- editable SVG added: `0`;
- replaceable image role added: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the visible issue was artifact-label semantics and Japanese editorial line breaking, not missing imagery.

## Result

`VERIFIED_LOCAL / CURRENT_UPDATED / ROLLBACK_SAFE / THREE_SCALE_PASS / STRESS_EDITORIAL_LINE_BREAK_REPAIRED / NOT_PRINT_READY`.

The broader transferable lesson remains bounded: an English artifact label may stay when it has a real reader-facing identity job, but labels that read like internal concept names or misleading instructions should be tested against the actual artifact role. Do not generalize this into an English-removal rule.
