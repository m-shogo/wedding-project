# Rurubu V8 AQ / AR — editorial specificity + typographic time scale

Date: 2026-08-22

## What changed

- Memory/Guide AM → AQ `2256:2`
  - removed the duplicated large standalone `温度`
  - promoted concrete remembered moments as the main native typographic mass
  - kept the reflective temperature sentence as support
- 1DAY AO → AR `2257:2`
  - removed redundant vertical timeline axis + circular markers
  - preserved exact times, actions, and elapsed-time y-spacing
  - strengthened native time/action typography

## Why

The current V8 was already cleaner than earlier studies, but two different forms of AI/editorial shorthand remained:

1. a concept word becoming an easy standalone design token even when more specific article-owned language was available;
2. timeline UI furniture remaining after the actual data was already fully encoded by native labels and position.

Both were tested on rollback-safe duplicates and promoted only after three-scale screenshot QA plus structural QA.

## QA

AQ:
- 500 / 1000 / 1587×1123 PASS
- native text 21
- IMAGE 0
- intersections 0
- 18px safe risk 0

AR:
- 500 / 1000 / 1587×1123 PASS
- native text 21
- IMAGE 0
- intersections 0
- 18px safe risk 0
- exact schedule data unchanged

## Learning state

- RSL-217 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- RSL-218 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

No project-wide visual rule was promoted.

## Asset truth

- new image generation 0
- new Drive master 0
- new Figma image placement 0
- V6/V7 image reuse 0
- unchanged DNS-blocked upload route not retried
