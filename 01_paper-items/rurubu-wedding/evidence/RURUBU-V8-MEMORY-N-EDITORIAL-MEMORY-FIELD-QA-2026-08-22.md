# RURUBU V8 Memory N — Editorial Memory Field QA

Date: 2026-08-22
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current candidate: `2189:2`
Previous current / rollback: Memory M `2186:31`

## Why this pass existed

Memory M successfully removed the equal-row guide rhythm, but the left page still repeated the same four-scene inventory already carried by the right guide. At whole-spread scale that redundancy left the left page looking like a refined content wireframe rather than an authored editorial memory page.

New professional reference work in this run included JAGDA's 2026 Book & Editorial Design award context around Kazunari Hattori's `here and there` work, JAGDA's broader 2026 annual selection, and Monocle's description of magazine making as continuous adjustment of headlines, photography selects, pace, rhythm, and page adjacency. These were treated as professional observations, not copied layouts.

## Bounded hypothesis

When a book spread repeats the same factual index twice, removing the duplicate can improve pacing only if the vacated area gains a content-owned editorial anchor rather than generic empty luxury space or decorative filler.

## Figma test

Created Memory N from Memory M as a rollback-safe candidate.

Changes on the left page only:

- hid the duplicate `02 / 4 SCENES` list;
- retained the factual essay and `01 / WATERFRONT` cue;
- increased the essay body from 15px to 17px with a 31px line height and moved it into a clearer reading column;
- added one oversized low-opacity native Japanese semantic anchor, `温度`, derived directly from the existing closing sentence;
- added the native reader-facing note `その日の温度が、先に戻る。`;
- did not restore the historical generated contour image;
- did not reuse any V6/V7 image or add an unrelated image role.

The right Guide/Index page from Memory M remained unchanged.

## Rejected intermediate

The first `温度` anchor used a 270px text box at 150px type and wrapped vertically into `温 / 度`. That result was rejected at thumbnail QA. The method switched to a wider 340px box and 128px type so the Japanese semantic word stayed intentionally horizontal.

Structural QA then found an 8px text-box overlap between the semantic anchor and its note. The note was moved down before promotion.

## Three-scale result

- 500px whole spread: PASS
- 1400px reading scale: PASS
- 1587×1123 actual-size: PASS
- visible native text: `22`
- visible IMAGE roles: `0`
- detected text intersections: `0`
- 18px safe-area risks: `0`
- internal/process copy leakage: `0`
- whole-page flattening: `0`

## Promotion

Memory N `2189:2` promoted to current.
Memory M `2186:31` preserved as hidden rollback.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- Drive V8 authority folder re-read: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`

This pass does not claim generation → Drive → Figma closure. No no-approval image-generation path was available in this runtime.
