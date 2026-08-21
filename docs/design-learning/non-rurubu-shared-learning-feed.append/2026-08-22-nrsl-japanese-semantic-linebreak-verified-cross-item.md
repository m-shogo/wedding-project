# NRSL — Japanese semantic line-break QA verified cross-item

Date: 2026-08-22
State: `VERIFIED_CROSS_ITEM`

This entry advances the earlier ADD-07 local candidate in `2026-08-22-nrsl-japanese-action-phrase-orphan-break.md` after independent reproduction in ADD-12.

## Source verification 1 — ADD-07 escort-card guide

A2 short action phrases were structurally valid but visually machine-wrapped:

- `お名前を探 / す`
- `カードを取 / る`
- `行き先の卓 / へ`

A bounded typography comparison showed that role-specific measure + type adjustment (`220→250 px`, `42→40 px`) kept the short actions as semantic units while realistic longer actions still wrapped naturally to two lines. A3 was independently checked and intentionally left unchanged because its existing smaller reflow already had natural breaks.

Evidence:
- Figma `rplj1IWXP4XVKjWDQRg3dU / 32:2`
- item evidence `01_paper-items/additional-wedding-items/ADD-07-escort-card-guide-board/FIGMA-STEP-TYPOGRAPHY-LINEBREAK-POLISH-2026-08-22.md`
- commit `5a6059389f183d8fd245f7829d3bae56fa61a141`

## Independent verification 2 — ADD-12 couple quiz

A materially different A6 quiz front independently reproduced the same normalized defect. Its title was native auto-height and entirely inside the frame, but the second phrase rendered as:

`どこまで知って / る？`

Two smaller-font comparisons (`40 px`, `38 px`) were rejected because they still left an awkward short final line and weakened the display scale. A third bounded test retained `42 px` and the same wording but encoded intentional semantic phrase breaks:

- `ふたりのこと、`
- `どこまで`
- `知ってる？`

The new screenshot reads as intentional Japanese display typography rather than machine wrapping. Front/back/stress remain native, auto-height, outside-root `0`, IMAGE `0`.

Evidence:
- Figma `oZ24SbwGkeAfFJcXlbxCoD / 59:54`
- rollback `61:92`
- item evidence `01_paper-items/additional-wedding-items/ADD-12-couple-quiz-card/FIGMA-JAPANESE-TITLE-SEMANTIC-LINEBREAK-POLISH-2026-08-22.md`
- commit `afc077e5889678550638812d5d2b80f2fb704c77`

## Verified transferable principle

**Bounds correctness is not Japanese editorial correctness.**

For short Japanese action/headline roles, reading-scale QA must inspect whether automatic wrapping:

- strands one grammatical/inflexional character or an unnaturally short ending;
- splits a short verb phrase at a point that impairs instant recognition;
- produces a visibly machine-set rhythm even when overflow/collision checks are all green.

Preferred repair order:

1. identify the semantic phrase units;
2. test a role-appropriate text measure / wrap behavior;
3. when wording is fixed and the intended phrase structure is known, use intentional native-text line breaks where that produces the strongest editorial reading;
4. alter font size only within actual-size legibility limits;
5. rerun realistic longer-copy stress where the role itself is variable.

Do **not** promote a universal one-line rule. Natural multi-line Japanese is valid; the requirement is meaningful phrase-level breaking rather than accidental orphan endings.

## Regression risks

- forcing one line can overcrowd the physical artifact;
- shrinking type just to avoid a wrap can fail actual-size print legibility;
- hard-coded line breaks are inappropriate for genuinely variable copy unless the final wording is authoritative or the role has a controlled text contract.

## What must not transfer

Do not transfer exact widths, font sizes, wording, palette, hanging-card geometry, quiz punch-card layout, or line-count targets between items.

## Next receiving-item use

Use this as a QA-method default when a future non-Rurubu artifact has short Japanese display/action roles. It is now `VERIFIED_CROSS_ITEM`, but not yet a universal visual-style rule; project-rule promotion should wait for another distinct reproduction or explicit project-wide direction.