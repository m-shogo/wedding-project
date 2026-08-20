# Rurubu V6 feedback — GV / GR — 2026-08-20

## Experiment 1 — Outer GV full-width WEDDING closing

Visible problem: GU back chronology ended too compactly on the left, leaving lower-right cream space visually accidental.

Principle tested: use native closing cadence before adding filler photography/container.

Expected improvement: stronger back-cover landing and less unfinished lower-page whitespace.

Regression risks: wrapped ordinal, title/date collision, footer/safe-area pressure, poster-like overstatement.

Evidence:
- whole spread comparison: GV stronger than GU;
- actual-size back `2006:3 / 794×1123`: PASS;
- text collisions 0;
- 18px safe-area risks 0;
- image changes 0.

Intermediate failures:
- 06 wrapped vertically due to narrow text box;
- repaired candidate then showed 6–8px contacts between 06 and date/WEDDING;
- both were fixed before adoption.

Status: ADOPTED / VERIFIED_LOCAL.

Next Rurubu application: use the same diagnostic only where semantic content is complete but page closure is visually underpowered. Do not add closing typography merely to fill space.

## Experiment 2 — 1DAY GR Japanese-first utility microcopy

Visible problem: GQ lower-left utility labels still looked like template/schema tokens despite an otherwise mature travel-guide composition.

Principle tested: convert generic helper labels to reader-facing native copy while preserving facts/assets/layout.

Expected improvement: reduce AI/template feel and improve Japanese travel-magazine plausibility without new decoration.

Regression risks: Japanese strings may expand and collide; intentional English category language could be lost if translated indiscriminately.

Evidence:
- whole spread comparison: GR more reader-facing than GQ;
- actual-size left `2007:3 / 794×1123`: PASS;
- text collisions 0;
- 18px safe-area risks 0;
- photo/time/itinerary facts unchanged;
- image hashes unchanged.

Intermediate failure:
- `旅のコツ` inherited an over-wide box and overlapped the main note headline by 17px;
- width repaired before adoption.

Status: ADOPTED / VERIFIED_LOCAL.

Next Rurubu application: continue scanning meaningful helper/utility copy for production-schema language, but keep intentional masthead/category English and avoid cosmetic translation for its own sake.

## Run asset state

Generated: 0.
Adopted generated: 0.
New Drive save: 0.
New external binary placement: 0.
New image hash: 0.
Native variable text: preserved.
Replaceable photo roles: preserved.
V7: untouched/HOLD.