# NRSL — Japanese short-action phrase orphan break

Date: 2026-08-22
Source scope/item: non-Rurubu / ADD-07 エスコートカード案内ボード
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A2 escort-card steps were structurally valid (`textAutoResize=HEIGHT`, no outside-root text, no text/text collision) but rendered short Japanese actions with a one-character grammatical ending stranded on the second line:

- `お名前を探 / す`
- `カードを取 / る`
- `行き先の卓 / へ`

At whole-item scale this made an otherwise physical/editorial design look mechanically wrapped.

## Root-cause hypothesis

Bounds correctness is not Japanese editorial correctness. In compact semantic action roles, a line break that isolates one inflectional/particle character can weaken phrase recognition and visual rhythm even when every glyph fits its box.

## Bounded test

On rollback-safe A2 clones only:

- width `220 → 250`, font `42`: still awkward (`REJECTED`);
- width `220 → 250`, font `42 → 40`: all three short actions became one-line semantic units (`VERIFIED_LOCAL`).

The selected treatment was then stress-tested with longer plausible actions. Those wrapped to two lines without clipping or single-character orphan endings.

## Expected improvement

Preserve short action phrases as readable semantic units at the scale where they function as instructions, without globally shrinking typography or widening unrelated layout roles.

## Regression risk

- blindly reducing Japanese font size can create actual-size legibility loss;
- blindly forcing one line can overcrowd the physical object;
- some Japanese phrases are naturally multi-line and should break at a meaningful phrase boundary rather than being kept on one line at all costs.

The transferable method is to review optical/semantic line breaks, not to impose a universal one-line rule.

## Three-scale evidence

Source A2 Current `32:2` after repair:

- whole-item: PASS;
- reading / higher-resolution render: PASS;
- actual-size structure: native text remains auto-height and inside the card fields.

Stress `39:71`:

- long actions wrap to two lines;
- fixed-height text `0`;
- outside-root text `0`;
- IMAGE fills `0`;
- screenshot PASS.

A3 `32:16` was independently checked and left unchanged because its existing two-line breaks were already natural. This prevents the learning from becoming a mechanical cross-size restyling rule.

## Evidence

- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- Current A2: `32:2`
- untouched A3: `32:16`
- rejected comparison: `39:25`
- selected comparison: `39:48`
- long-copy stress: `39:71`
- rollback: `40:2`
- Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`
- item evidence: `01_paper-items/additional-wedding-items/ADD-07-escort-card-guide-board/FIGMA-STEP-TYPOGRAPHY-LINEBREAK-POLISH-2026-08-22.md`
- item evidence commit: `5a6059389f183d8fd245f7829d3bae56fa61a141`

## What must remain item-specific

Do not transfer ADD-07's plum field, hanging-card metaphor, card widths, font sizes, exact 250px measure, step wording, rail geometry, palette or spacing.

## Cross-item applicability hypothesis

On another materially different compact Japanese action/instruction role, add a reading-scale check for:

- one-character grammatical orphan lines;
- unnatural split of a short verb phrase;
- technically fitting text that reads as machine-wrapped.

Prefer changing text measure or role-specific line-breaking first. Change font size only within actual-size legibility limits.

## Next receiving-item experiment

Apply to a different compact paper artifact with short Japanese operational phrases, such as a quiz answer/action role, small guidance label, or ticket instruction. If the method independently improves readability without reducing physical legibility, promote toward `VERIFIED_CROSS_ITEM`.