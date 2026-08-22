# NRSL — Actual-size factual microtype must be checked in physical units

Date: 2026-08-22
Owner: non-Rurubu Figma quality-improvement task
State: `VERIFIED_CROSS_ITEM`
Failure fingerprint: `FACTUAL_MICROTYPE_LOOKS_FINE_ON_SCREEN_BUT_IS_TOO_SMALL_AT_PHYSICAL_SCALE`

## Source items

- ADD-12 新郎新婦クイズカード
- ADD-13 メッセージカード

## Visible problem

Both selected designs looked acceptable in zoomed Figma screenshots and had no overflow, clipping, fixed-height, or text-collision failure. However, converting their pixel canvases back to the verified physical paper dimensions exposed factual dates that had drifted into screen-only microtype.

ADD-12 A6 portrait:

- canvas: `620 px` wide = `105 mm`;
- date before: `12 px` ≈ `2.03 mm / 5.76 pt`;
- bounded repair: `16 px` ≈ `2.71 mm / 7.68 pt`.

ADD-13 A6 landscape:

- canvas: `1400 px` wide = `148 mm`;
- front date before: `20 px` ≈ `2.11 mm / 5.99 pt`;
- back date before: `19 px` ≈ `2.01 mm / 5.69 pt`;
- bounded repair: `26 px` ≈ `2.75 mm / 7.79 pt`.

The issue was not that “all text under 8 pt is invalid.” The issue was that reader-facing factual copy had become unnecessarily fragile because the design had only been judged in Figma pixel space.

## Root-cause hypothesis

Figma visual QA can overestimate legibility when the reviewer sees a 500–1400 px render without translating it back to the actual printed object. Microtype can therefore pass thumbnail, reading-scale, overflow, and collision checks while still being too small for robust physical reading.

## Bounded experiments

### ADD-12

Changed only the native factual date role on Current front/back and the matching long-copy stress frames.

- `12 px → 16 px`;
- all other layout, question, answer, paper, punch, and copy roles unchanged;
- complete hidden rollback pair created first.

### ADD-13

Changed only the native factual date role on Current front/back and matching long-copy stress frames.

- front `20 px → 26 px`;
- back `19 px → 26 px`;
- writing area, rules, title, prompt, paper geometry, and copy unchanged;
- complete hidden rollback pair created first.

## Three-scale / structure evidence

ADD-12:

- whole/current: PASS;
- native actual `620×875`: PASS;
- front/back long-copy screenshot: PASS;
- Current front/back fixed-height text `0`, outside-root text `0`, IMAGE fills `0`;
- stress front/back fixed-height `0`, outside `0`, IMAGE fills `0`.

ADD-13:

- whole/current: PASS;
- native actual `1400×993`: PASS;
- factual date became more readable without competing with handwriting content;
- Current front/back fixed-height text `0`, outside-root text `0`, IMAGE fills `0`;
- stress front/back fixed-height `0`, outside `0`, IMAGE fills `0`.

## Drive / Figma / GitHub evidence

ADD-12:

- Figma: `oZ24SbwGkeAfFJcXlbxCoD`
- Current: `59:54 / 59:84`
- stress: `59:99 / 59:129`
- rollback: `62:2 / 62:32`
- Drive: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- evidence: `01_paper-items/additional-wedding-items/ADD-12-couple-quiz-card/FIGMA-ACTUAL-SIZE-DATE-LEGIBILITY-QA-2026-08-22.md`
- Git commit: `f47e2f77160be200803076d33e74424c4535e3ad`

ADD-13:

- Figma: `8ad7bEPAc8I88gs1JxsWhe`
- Current: `52:72 / 52:91`
- stress: `52:109 / 52:128`
- rollback: `53:2 / 53:21`
- Drive: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- evidence: `01_paper-items/additional-wedding-items/ADD-13-message-card/FIGMA-ACTUAL-SIZE-DATE-LEGIBILITY-QA-2026-08-22.md`
- Git commit: `55d83887887eaa775311f61f341a3aa4ee91c0f5`

Drive writes: `0`.
Generated assets: `0`.

## What must remain item-specific

Do not transfer the exact `16 px`, `26 px`, date placement, palette, A6 layout, or any “8 pt minimum” as a universal visual rule. Typeface, contrast, paper, print method, semantic importance, viewing distance, and artifact type can justify different values.

## Cross-item applicability

For factual or required microcopy in a print artifact:

1. confirm the real physical paper dimensions;
2. convert the Figma text size from canvas pixels to physical mm/pt;
3. distinguish factual reader-facing copy from optional decorative microtype;
4. if the physical size is fragile, make a bounded enlargement without changing the art direction;
5. re-check native actual-size screenshot, dynamic/stress copy, outside-root bounds, and surrounding hierarchy.

This is now `VERIFIED_CROSS_ITEM` because two materially different A6 artifacts reproduced the same failure class and benefited from the same QA method without visual regression.

## Next receiving-item experiment

Test one materially different small print item such as a tag/ticket only when its live screenshot and verified physical dimensions contain factual microtype that appears suspicious. Do not reopen already-stable items just to force a third reproduction. If the method is independently useful again under a different artifact/printing context, consider project-rule promotion.