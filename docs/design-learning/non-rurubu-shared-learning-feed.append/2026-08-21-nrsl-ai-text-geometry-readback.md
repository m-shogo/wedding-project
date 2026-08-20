# NRSL — AI-authored Figma text geometry requires structural readback

Date: 2026-08-21
Source scope: non-Rurubu
State: `VERIFIED_CROSS_ITEM`

## Visible problem

Two newly authored vNext clean-room items looked visually correct in screenshots, but native text layers had invalid editable geometry: rendered glyphs visually overflowed nominal `10px` text boxes with `textAutoResize=NONE`.

This was first observed in WEDDING PASSPORT and then independently reproduced in BOARDING PASS.

## Root cause

AI/Figma authoring can create text nodes whose visual rendering looks plausible while the node's real editable bounds remain stale or artificially small. Screenshot-only QA therefore cannot prove native text resilience, collision safety, or future editability.

The failure fingerprint is:

`AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID`

Operation/capability: programmatic Figma text authoring.
Environment/tool path: Figma Plugin API authored native text.
Symptom family: `textAutoResize=NONE` + nominal height `10px` while rendered text is much taller.
Likely cause class: incomplete text-box sizing after programmatic creation.
Evidence date: 2026-08-21.
Replacement method: structural text readback followed by explicit font loading and `textAutoResize=HEIGHT` where a fixed width / variable height role is intended.

## Passport bounded test

Item: WEDDING PASSPORT vNext.

Selected roots:
- front `178:2`
- back `178:16`

Observed:
- 16/16 text nodes used `textAutoResize=NONE` with height `10px`.

Rollback:
- `179:28`
- `179:42`

Bounded repair:
- load required Inter / Noto Sans JP fonts;
- preserve x/y/width;
- change only `textAutoResize` to `HEIGHT`;
- verify actual heights and screenshots;
- create long-copy stress copies `180:2 / 180:16`.

Result: `VERIFIED_LOCAL`.

Evidence:
- `01_paper-items/wedding-passport/FIGMA-VNEXT-PROFESSIONAL-QA-2026-08-21.md`
- Git commit `4ff19ff7772820ec38ecd9690b0a34ea253bd3e2`.

## Boarding Pass independent reproduction

Item: BOARDING PASS vNext, materially different horizontal ticket/stub artifact.

Selected roots:
- front `60:3`
- back `60:33`

Observed:
- 21/21 text nodes independently reproduced `textAutoResize=NONE` + height `10px`.

Rollback:
- `61:2`
- `61:32`

Repair used the same method only after independent readback confirmed the same fingerprint. Long-copy stress copies `62:2 / 62:32` verified the corrected bounds against guest-name, reception, table, final-guide, and message expansion.

Result: `VERIFIED_CROSS_ITEM`.

Evidence:
- `01_paper-items/boarding-pass/FIGMA-VNEXT-PROFESSIONAL-QA-2026-08-21.md`
- Git commit `2f301fb01e4bc5cca04d127a92d990116b937fc5`.

## Three-scale evidence

Whole-item:
- both Passport and Boarding screenshots remained visually unchanged after the geometry repair.

Reading scale:
- hierarchy and line breaks remained coherent; the repair did not introduce visual regression.

Actual-size/detail/structure:
- node heights became real rendered text bounds;
- variable-copy stress could then be evaluated using actual bottoms and spacing rather than misleading 10px boxes;
- no variable text was rasterized.

## Regression risk

Do not blindly set every text node to `HEIGHT`.

- single-line roles whose width is intentionally content-driven may require `WIDTH_AND_HEIGHT`;
- fixed-height clipping may be intentional in rare cases;
- mixed-font nodes require font ranges to be loaded before mutation;
- changing auto-resize can reveal previously hidden wraps, so screenshot QA is still mandatory after repair.

The transferable rule is structural readback + role-appropriate resize behavior, not one universal resize mode.

## What must remain item-specific

Do not transfer Passport or Boarding layout, palette, headline scale, tropical forms, stub geometry, perforation, or any decorative treatment. Only the QA method and failure fingerprint transfer.

## Cross-item applicability

For every newly AI-authored Figma candidate containing native text, before claiming long-copy/editability PASS:

1. read back each meaningful text node's width, height, `textAutoResize`, characters and font;
2. flag implausibly small bounds relative to rendered content;
3. load required fonts before mutation;
4. apply role-appropriate auto-resize on a rollback-safe candidate;
5. re-run screenshot QA;
6. run realistic long-copy stress only after the bounds are trustworthy.

## Next receiving-item experiment

At the next clean-room target, 青春ふたりきっぷ, inspect native text geometry immediately after first full-size authoring rather than waiting until the final QA stage. If the same fingerprint appears again, treat the method as a strong candidate for `PROMOTED_PROJECT_RULE` after confirming that the correction remains beneficial in the compact collectible-ticket context.
