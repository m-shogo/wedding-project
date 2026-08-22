# Rurubu V8 — 1DAY AG time-data role purity QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Canonical page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Previous Current: T `2203:2`
New Current: AG `2233:2`

## Visible problem

T already separated the left page's experiential pacing from the right page's exact time scale, but the right page still mixed English action labels (`START / CAFE / WALK / TABLE`) with the same experiential Japanese words already used on the left (`海辺 / 長めに / 寄り道 / ゆっくり`). The right page therefore carried two semantic jobs at once: exact schedule data and a partial duplicate of the left page's pace vocabulary.

## Fresh professional research used as a hypothesis

- It's Nice That, Computer Arts Collection: clearly differentiated internal sections answer different editorial needs, while pacing comes from controlled variation in image scale and section structure.
- It's Nice That, New York Times Magazine 2026 redesign: caption specs, rules, folios and page furniture are standardised when they need to orient the reader; structure should clarify editorial function rather than add decoration.
- It's Nice That, Office Magazine issue 21: a flexible grid acts as a base that can be broken intentionally, not a reason to add arbitrary visual variation.

Rurubu-specific hypothesis: when facing pages deliberately own different editorial jobs, the data page should use labels that improve the data's meaning and should not repeat the experiential vocabulary merely to create visual variety.

## Bounded change

Created rollback-safe duplicate AG from T.

Left page retained unchanged as experiential pace:

- `海辺`
- `長めに`
- `寄り道`
- `ゆっくり`

Right page now owns schedule/time-data semantics:

- `10:00  海辺`
- `11:40  カフェ`
- `15:10  街歩き`
- `18:30  食卓`

Removed from the visible Current treatment:

- `START`
- `CAFE`
- `WALK`
- `TABLE`

Updated page furniture:

- `一日の時刻 / 4つの停留点`
- `時間を読む。 / 余白も読む。`
- `時刻の距離が、そのまま一日のリズムになる。`
- `時刻差を実寸の間隔として配置。`

No image, card, badge, shadow, gradient, invented event, or V6/V7 asset was added.

T `2203:2` is preserved hidden as rollback.

## Three-scale QA

- 500px whole spread: PASS
- 1400px reading scale: PASS
- 1587×1123 actual size: PASS

## Structural QA

- Current root: AG `2233:2`
- parent page: `2052:2`
- visible native text: `22`
- IMAGE fills: `0`
- text intersections: `0`
- 18px safe-area risk: `0`
- accidental explicit one-character Japanese wrap candidates: `0`
- variable copy remains native editable text
- old T preserved as hidden rollback

## Result

AG is promoted locally over T because the left and right pages now have cleaner complementary jobs: experiential pace on the left and exact schedule/action data on the right. The improvement comes from semantic role purity, not additional decoration.

State: `RSL-212 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Failure fingerprint:

`F-RSL-212-FACING-PAGES-DIFFERENT-VISUALLY-BUT-STILL-DUPLICATE-SEMANTIC-VOCABULARY`

Do not transfer the exact 1DAY wording, time labels, composition, or scale relationships to other wedding items. Only test the general question: do adjacent pages actually own different editorial jobs, or do they merely look different while repeating the same semantic layer?
