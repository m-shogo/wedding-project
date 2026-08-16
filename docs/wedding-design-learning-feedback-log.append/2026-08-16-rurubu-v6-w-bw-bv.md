# Rurubu V6 feedback — W + BW/BV — 2026-08-16

Scope: Rurubu WEDDING only.

## Meaningful visual change

### Profile / Q&A

Before: BT `1488:2`

Observed problem:

- Q&A left question column and right photo column read as separate systems;
- lower-left/center cream field remained too empty;
- structure was correct but page still felt template-assembled.

Bounded experiment:

- duplicate BT;
- reuse the verified textless Rurubu composed route texture as one bounded Q&A background role;
- keep native question/answer copy and replaceable photos independent;
- tighten Q4–Q6.

Intermediate reject/fix:

- first pass let Q4 copy slide below the hero-photo z-order;
- fixed Q4 native text-box width and the texture position before promotion.

After: BW `1502:2`

Visual result:

- travel-route texture fills the dead field without creating six cards;
- Q1/Q4 remain the hierarchy anchors;
- hero/support photos remain dominant;
- page reads more like one authored travel-magazine interview spread.

Evidence:

- 500px whole-item PASS;
- 1200px spread PASS;
- actual Q&A 794×1123 PASS;
- native text 25;
- replaceable photos 2;
- text/text collision 0;
- unintended text/photo collision 0;
- 18px text safe risk 0.

Decision: `ADOPT BW / HIDE BT AS ROLLBACK`.

## Rejected comparison

Outer X `1506:2` tested removal of the existing colored year blocks from Outer W.

Result:

- less block/UI impression;
- but too much loss of travel-information-magazine energy;
- W remained stronger at thumbnail/reading scales.

Decision: `REJECT X / KEEP W`.

## Current best V6

- Outer W `1491:2`
- Profile/Q&A BW `1502:2`
- Story/Chronology BV `1498:159`
- V7: HOLD

## Learning

Promoted locally to `CROSS_ITEM_CANDIDATE` as RSL-053:

- when repeated information already has hierarchy but lacks continuity, one bounded composed decoration can be better than new cards/micro-geometry;
- subtraction is not inherently better: removing meaningful editorial labels can over-sanitize an information-magazine layout.

Rurubu-specific palette, texture, geometry, photo choices and literal treatment do not transfer.
