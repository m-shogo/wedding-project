# WEDDING PASSPORT — Bounded repair candidate spec / 2026-08-25

State: `PRE_FIGMA_REPAIR_SPEC / CURRENT_VISUAL_REOPENED / PRODUCTION_UNCHANGED`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority recheck

- run-start / pre-write `main`: `67c5a3f6ed2acea9260a4942cfceb3b100cd0a6f`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current front: `205:3`
- Current back: `205:21`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata/title live readback: PASS
- Figma write in this run: `0`
- Drive write: `0`
- image generation: `0`

No Rurubu item-specific Figma/Drive/GitHub/asset path was inspected or modified.

## Why this file exists

The existing reopen evidence correctly identifies three material defects, but the next safe authoring run should not need to rediscover candidate geometry. Fresh native `1480×2100` renders were re-inspected and converted into bounded repair hypotheses below.

This file is **not adoption evidence**. No candidate has passed Figma three-scale QA yet.

## Candidate A — front semantic line break

Live node: `205:17 / TEXT / COVER INTRO`
Current geometry: `x=264 / y=690 / w=500 / h=96`
Current visible break:

`今日という一日を、ふたりの旅の記`
`録に。`

### Preferred first test

Keep x/y/width/font/size/line-height unchanged and change only the native text line break to:

`今日という一日を、`
`ふたりの旅の記録に。`

Reason: this preserves the proven 500px cream reading lane, avoids widening into the blue aperture, and fixes the Japanese semantic break without shrinking type.

### Rejection condition

Reject if the second line enters the aperture at reading/native scale, if optical left alignment becomes weak, or if long-copy reserve regresses. Only then test a small width change; do not blindly increase the measure.

## Candidate B — full RETURN NOTE identity in a stable cream lane

Live node: `205:33 / TEXT / BACK KICKER`
Current geometry: `x=176 / y=260 / w=320 / h=34`
Fixed cream aperture begins at `205:27` around `y=220`; yellow sun `205:29` begins around `y=280`.

Fresh native rendering confirms that the identity is not absent: the navy text continues into the navy background, so only the portion lying over the cream aperture is visually legible. This is primarily a **field-ownership/contrast failure**, not a missing-copy failure.

### Preferred first test

Keep label native and move only the kicker downward inside the cream aperture, starting with approximately:

- `x=176`
- `y=340`
- `w=320`

This keeps it above the headline at `y=408`, gives roughly 34px of label height plus a small gap, and places the full label on a light field. The yellow sun may sit behind part of the kicker, but navy-on-yellow remains a valid high-contrast relationship and the text layer must remain above fixed art.

### Rejection condition

Reject if the kicker competes with the headline or appears trapped inside the sun. If so, test a small x-shift left/right while staying fully inside the cream aperture; do not replace it with generic English and do not bake it into SVG.

## Candidate C — factual group moved before decorative gesture is edited

Current factual nodes:

- date `205:36`: `x=760 / y=1660 / w=560 / h=84`
- place `205:37`: `x=764 / y=1758 / w=340 / h=36`
- couple `205:38`: `x=760 / y=1855 / w=520 / h=48`

Fixed lower gesture:

- coral `205:30`: starts around `y=1384.5`
- turquoise `205:31`: spans approximately `y=1540.5 → 1888`

The turquoise gesture visibly crosses `2026.10.24` in the promoted Current.

### Preferred first test

Before distorting the editable SVG gesture, test moving the **entire factual group as one unit** into the large stable navy field above the sweeps, preserving internal spacing and native text. Start with a bounded vertical shift of approximately `-430px`:

- date `y≈1230`
- place `y≈1328`
- couple `y≈1425`

Keep x positions initially unchanged.

Reason: the current back has a large underused navy factual lane in the middle-right. Moving all three facts together preserves their semantic grouping, avoids trimming risk near the bottom, and keeps the travel gesture intact as a subordinate lower-page movement rather than forcing a local vector kink around one date.

### Rejection condition

Reject if the factual group competes with the left headline/message or visually floats without relationship to the lower movement. If rejected, restore rollback and test the second method: bounded reposition/rerouting of `205:31` only, with the date/place/couple group unchanged. Do not move only the date and leave place/couple behind.

## Required safe authoring order

When `figma-use` guidance becomes readable again:

1. re-read latest `main`, Current QA, exact Figma nodes and Drive authority;
2. duplicate `205:3` and `205:21` as hidden rollback roots before any mutation;
3. create rollback-safe comparison roots, not direct production edits;
4. test Candidate A independently;
5. test Candidate B independently;
6. test Candidate C as a grouped factual move;
7. inspect each at ~500px, ~1000px and native `1480×2100`;
8. run realistic long-copy stress after any accepted text/geometry movement;
9. structure-readback native text, `textAutoResize`, fixed-height count, outside count, IMAGE fills and SVG/vector editability;
10. only then copy the winning bounded changes into Current and restore `SELLABLE_VISUAL_QA_PASS` if all three defects are closed.

## Hybrid Authoring contract

- intro / kicker / date / place / couple: native Figma text;
- aperture/sun/sweeps: editable fixed-art SVG/vector;
- raster/image generation: not justified for these defects;
- no variable/factual copy may be baked into SVG/raster.

## Learning state

`ROOT_CAUSE_HYPOTHESIS → PRE_FIGMA_BOUNDED_TEST_SPEC`

Candidate fingerprint remains item-local until tested:

`PROMOTED_CURRENT_FIXED_ART_TEXT_OPTICAL_COLLISION_AND_SEMANTIC_BREAK`

Do not promote the coordinates or this composition as a cross-item rule. The transferable method is only: after promotion, native-size render can reveal field-ownership, fixed-art/text optical collisions, and Japanese semantic breaks that structural checks miss.
