# Rurubu V5 FG rejection → FH back-timeline hierarchy

Date: 2026-08-15
Scope: Rurubu WEDDING only

## Source problem

FE remained the strongest front cover, but its back-cover lower travel timeline was visually too quiet at thumbnail/reading scale. The six milestones were technically present yet read like small metadata rather than a deliberate magazine module. A separate front-cover experiment also tested whether Feature 02 could lose its white-border/cyan-card treatment.

## FG experiment — rejected

- Safe duplicate: `1190:2`.
- Test 1 removed the Feature 02 white border and cyan underline and placed native caption text directly on the photograph.
- Test 2 narrowed the same photo into a portrait-like clipping to create stronger scale contrast.
- Result: both variants weakened the photograph/caption relationship; Feature 02 looked pasted on, crop quality worsened, and caption scale became too small at whole-item scale.
- Status: `REJECTED`.
- Preserved evidence: `REJECTED_HIDDEN_OUTER_FG_FEATURE02_CARD_SUBTRACTION_2026_08_15`.

### Root cause learned

Subtraction is not automatically an improvement. A border/rule that visually binds image + caption can be semantically useful in a collage. Remove containment only when the replacement still creates a clear physical/editorial relationship at thumbnail scale.

## FH experiment — adopted

- Safe duplicate: `1190:194`.
- Front composition intentionally preserved from FE except for a 03 text-box collision repair.
- Back timeline title increased from 30→34 px.
- Milestone dates increased 19→22 px; labels 11→12 px.
- Six events remain native editable text and retain factual placeholders/dates.
- 3×2 rhythm tightened and six short vertical rails use purposeful magenta/cyan/yellow sequencing rather than one repeated accent.
- No new image, card, gradient, shadow or generated asset was added.

## Expected improvement

Make the lower quarter of the back cover read as a real editorial travel-log module rather than leftover small metadata, while preserving the large photography hierarchy above it.

## Regression risk

Larger dates could crowd the bottom safe area or collide with labels/footer. Colored rails could become decorative noise if repeated elsewhere without semantic hierarchy.

## Evidence

- whole-item / ~500 px: PASS; FH is visibly stronger than FE in the lower back-cover rhythm.
- reading / 1000 px spread: PASS.
- actual-size back `1190:195` ≈ 798×1123: PASS; dates/labels are legible and bottom space remains controlled.
- actual-size front `1190:324` = 794×1123: PASS after moving Feature 03 title to x=114.
- final visible native text: 35.
- final visible IMAGE fills: 7.
- same-parent absolute text intersections: 0.
- 18 px text safe-area risks: 0.
- exact secondary Q60 node in FH: `1190:381` / image hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- Drive secondary remains `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, JPEG, 10,284 bytes.
- Drive dominant Q60 master remains `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes; dominant exact Figma placement is still OPEN.

## Adoption state

- FH `1190:194`: `VERIFIED_LOCAL_ADOPTED` and renamed `BEST_CLEANROOM_OUTER_FH_REVIEW_2026_08_15`.
- FE `1186:2`: hidden rollback.
- FG `1190:2`: hidden rejected study.
- Inside EO `1107:285`: unchanged.
- Current `77:18 / 77:290`: untouched.
- generated: 0.
- newly adopted generated assets: 0.
- new external binary placed: 0.

## Next application

For V6, treat small timeline/date modules as part of the cover's visual mass, not bookkeeping. Test scale, alignment and color rails at thumbnail first; then run actual-size and variable-copy/safe-area checks. Do not blindly remove photo borders/rules when they are the only element making a collage read as an intentional clipping.