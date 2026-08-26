# NRSL — Internal layout intent leaking as guest-facing copy

Source scope/item: non-Rurubu / ADD-13 メッセージカード
Date: 2026-08-27
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A finished guest-facing back face contained the native sentence `書く場所は、広めに。`. It was grammatically natural, readable, structurally safe and visually aligned, but at whole/read/native scale it read as the designer explaining that the writing area had been made large rather than as useful guest guidance.

## Evidence before change

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current back: `52:91`
- guide role: `52:100 / TEXT / GUIDE`
- handwriting surface: `52:99 / 900×870`
- handwriting ratio: `56.32%`
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- item evidence: `01_paper-items/additional-wedding-items/ADD-13-message-card/FIGMA-GUEST-GUIDE-SEMANTIC-SUBTRACTION-QA-2026-08-27.md`

## Root-cause hypothesis

Semantic correctness requires an audience check, not only grammar, fit and typography. Authoring-process language can leak into finished copy when a designer describes the purpose of a layout role instead of stating something the reader actually needs to know or do.

## Bounded test

Rollback-safe comparisons hid only `TEXT / GUIDE`:

- Current-back comparison: `62:2`
- realistic long-copy comparison: `62:20`

No title, prompt, handwriting area, rule, date/name role, color or position changed. No replacement filler copy was added.

## Expected improvement

Make the artifact read as finished stationery rather than a prototype/explainer while preserving the writing task and open paper field.

## Regression risk

Removing a sentence that actually contains submission instructions, required pen guidance, privacy information, deadline information or another real guest action would reduce usability. The test is not "delete explanatory text"; it is "prove the reader-facing job of the sentence."

## Three-scale evidence

- whole-item: PASS; headline flows directly into the writing surface.
- reading scale: PASS; no grouping or instruction loss.
- native `1400×993`: PASS.
- realistic long-copy: PASS.
- handwriting surface remains `900×870 / 56.32%`.

## Promotion / structure evidence

Complete pre-change rollback:

- Current back: `62:38`
- long-copy back: `62:56`

Promoted Current:

- `52:100 / TEXT / GUIDE` hidden
- `52:137 / TEXT / GUIDE` hidden in stress

Post-readback Current/stress:

- visible native text `5`
- fixed-height text `0`
- outside text `0`
- text collisions `0`
- IMAGE fills `0`

## Adopted / rejected / blocked status

`VERIFIED_LOCAL / ADOPTED` in ADD-13. The local sellable visual gate was restored after the comparison.

## What must remain item-specific

Do not transfer:

- ADD-13's resort-desk stationery metaphor;
- green/terracotta palette;
- exact copy;
- A6 geometry;
- handwriting-rule placement;
- `LETTER 02` identity.

## Cross-item applicability hypothesis

On another materially different print artifact, inspect visible microcopy that describes the design itself, e.g. "広めにしています", "見やすく配置", "大きく表示", "ここに記入", or English/internal concept equivalents. Independently test retained vs hidden/replaced only when the sentence lacks a real reader-facing action, fact, identity or instruction.

Receiving-item QA question:

**Is this sentence for the reader, or is it the designer explaining the design?**

## Next receiving-item experiment

Test only if a different artifact shows screenshot-visible copy that appears to explain layout intent rather than communicate a guest action/fact. A good receiving item would be a sign, QR guide, quiz, timeline, or parent/child card with suspicious helper microcopy. Do not proactively delete functional instructions.
