# V5 outer clean-room S — timeline microtype

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / S_WINS_R_TIMELINE_READABILITY / CURRENT_NOT_PROMOTED`

## Authority refresh

Immediately before the experiment, live clean-room R, Current outer `77:18`, Current inside `77:290`, Q60 Drive state, and latest GitHub main were re-read. Only Rurubu WEDDING was touched.

## Visible problem

R had removed the UI-like back footer and Friends caption fields, but its six-event journey timeline still used 9 px year/event labels. At actual-size scale they were visually weaker than the surrounding editorial copy and too close to diagram-widget microtype.

## Principle tested

Increase actual-size legibility through typography rather than adding containers:

- keep the six-event zig-zag route
- preserve all native copy and semantic nodes
- increase only year/event labels from `9 px` to `10.5 px`
- widen/recenter their text boxes beneath each dot
- no card, pill, badge, image, crop, gradient, shadow, or generated asset

Expected improvement: more credible print-scale reading without flattening the lively route rhythm.

Regression risk: larger Japanese/Latin date boxes could collide with each other, with the route dots, or with the new journey deck.

## Figma implementation

Created:
- `667:2 / V5_OUTER_RURUBU_CLEANROOM_S_TIMELINE_MICROTYPE_2026_08_10`
- back page `667:3`
- temporary cover comparator `667:132`
- fold guide `667:163`

Timeline:
- all six year labels → `10.5 px`, 14 px line-height
- all six event labels → `10.5 px`, 14 px line-height
- each box recentered to width `112`
- original staggered dot geometry retained

## QA-caught regressions

### Text intersection

Fresh programmatic QA detected one overlap between `ふたりの旅年表` and the new journey deck. The candidate was not accepted in that state.

The deck was moved down, and text intersection QA returned `0`.

### Text-vs-shape collision

Even after text intersection became `0`, actual-size screenshot QA showed the journey deck visually crossing colored timeline dots. This is not detectable by text-vs-text intersection alone.

The deck was therefore moved below the route to `x=44 / y=966 / 560×22`, creating a reading order of:

`section title → 6-event route → compact native closing line`

A new actual-size back-page screenshot confirmed that the colored dots no longer strike through the sentence.

## Visual result

Compared with R:
- years/events are more legible at actual size
- the route remains light and print-native rather than becoming a dashboard component
- the closing sentence now uses lower blank space deliberately instead of colliding with the route
- no new visual container was introduced

S is retained as the stronger back-cover comparator over R for timeline readability. It is not promoted to production Current because the outer cover still lacks the real Q60 hero.

## Fresh structure evidence

Final S readback after repair:
- root: `667:2`
- back: `667:3`
- visible native text: `44`
- same-parent text overlaps: `0`
- fold `667:163`: visible, `2 × 1122.5`
- journey deck/tag are children of `667:3`
- temporary hero `667:132`: hash `539c259be8036b481d06b4f76db9a39b407d90e8` (history comparator only)

Protected image hashes unchanged:
- back main `667:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `667:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `667:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- logo `667:137` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `667:138` → `0cbbf09357938365c2550f08928be1db33fa6060`

## Asset state

- generated: none
- Q60 Drive source: verified/materialized earlier in this run
- Q60 placed in Figma: no
- S duplicate placed: yes
- S actual-size/page/whole visual QA: yes
- structure QA: yes
- production outer Current promotion: no
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V6: remains closed

## Reusable lesson

Microtype improvements must be checked against **shapes as well as text**. A text-intersection pass can be clean while a dot, rule, or decorative route still cuts through live copy. Actual-size screenshot QA remains mandatory after typographic expansion.
