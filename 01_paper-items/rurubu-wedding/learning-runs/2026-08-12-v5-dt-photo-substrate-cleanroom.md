# Rurubu V5 — DT photo-substrate clean-room comparator

Date: 2026-08-12
Scope: Rurubu WEDDING V5 only

## Visible problem

Live outer comparator DS `977:2` was materially better than the legacy Current, but it still read as a hero photograph followed by stacked feature modules. At thumbnail and actual-size scales, the lower-half information behaved too much like a web/content layout placed under an image rather than one continuous Japanese travel-magazine cover.

Scratch-selection question: **DS would not be selected from scratch.**

## Principle / capability tested

Start from subtraction and rebuild hierarchy from photograph + native Japanese typography + editorial anchors. Treat the photograph as the page substrate rather than a module. Use unequal scale, overlap, direct type, and thin color rules; do not add cards, rounded containers, shadows, or gradients.

## Safe experiment

- Preserved DS `977:2` unchanged.
- Duplicated it into rollback-safe clean-room candidate DT `982:2`.
- Front node: `982:131 / FRONT_COVER_DT_DESTINATION_TABLOID_CLEANROOM`.
- Extended the verified Yokohama image `982:133` to `793.7 × 650` so it carries the upper ~58% of the page.
- Rebuilt the primary hierarchy with native text: destination line → yellow kick → 82px `横浜 / ふたり旅。` → feature headline.
- Let support photo `982:153` cross the hero/lower-paper boundary.
- Rebuilt feature 01 as an oversized number + direct text spine instead of a card.
- Compressed feature 02 into a small cyan-rule caption family.
- Rebuilt feature 03 as a large asymmetric street photograph with a separate yellow rule and left-edge number/headline.
- Reused existing cyan/yellow editorial rules rather than adding decoration.

## Iteration / rejected intermediate states

1. First DT lower-half pass left too much dead space around feature 03 and crowded feature 02 against the street photograph.
2. The next pass still let feature 02's second line visually collide with the photo boundary.
3. These states were **not adopted**. Feature 02 typography was reduced to `15.5px / 18px`, its text box tightened, and the street photograph moved down until the actual-size read was clean.

## Expected improvement

- stronger Japanese travel-magazine recognition at thumbnail scale
- a single photo-led page rhythm rather than hero + modules
- clearer `横浜 → ふたり旅 → 01 → photo features` reading order
- more deliberate asymmetric density without losing editability

## Regression risk

- large photo substrate can reduce text contrast or overstate one destination image
- tilted support photography can become scrapbook-like if overused
- compressed 02/03 micro-headings can fail actual-size legibility
- existing Figma hero is visually verified but is **not** the exact Q60 Drive master/derivative lifecycle proof

## Verification evidence

Three-scale review:

- DS `977:2` vs DT `982:2` at 500px whole-item thumbnail: DT selected.
- DT whole spread at reading scale: PASS.
- DT front `982:131` at 1800px actual-size/detail review: PASS after spacing repair.
- Promoted Review snapshot: `987:2 / BEST OUTER — DT — source 982:2`.
- Previous DS Review `979:2` retained hidden as rollback.
- Start Here status updated to `DT outer / DF inside` without touching Current.

Structure QA on DT:

- visible native text: `37`
- visible IMAGE-fill nodes: `7`
- same-parent text intersections: `0`
- fold guide `982:184`: `x=792.7000122070312`, `2 × 1122.5`
- hero node `982:133` Figma image hash: `5d1739f42059246431108b7944fd7b16d9c92c42`
- support `982:153` hash: `2f9f122f14028031931ec6925586a09f1fd0cb01`
- street `982:167` hash: `9cdc28331cd0c54e4de0f84ad70afb865c23a6dd`

Drive fresh readback remained separate from Figma visual reuse:

- Q60 master Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, `155439` bytes.
- Q60 role derivative Drive ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, JPEG, `10284` bytes.
- No exact Drive→Figma binary placement was claimed in this run.

## Adopted / rejected status

**DT ADOPTED AS BEST OUTER COMPARATOR.**

DS remains preserved as rollback/comparison evidence. Current outer `77:18` and inside `77:290` remain untouched.

## Next application

Keep the photo-substrate principle available for later editorial work, but do not propagate it mechanically. V5 remains incomplete until the exact cover-hero asset lifecycle and final print/fold/safe-area/ledger gate are closed. V6 remains unstarted.

Status: `DT_VERIFIED_AND_PROMOTED_AS_COMPARATOR / CURRENT_UNCHANGED / Q60_EXACT_FIGMA_PLACEMENT_OPEN / V5_NOT_COMPLETE / V6_NOT_STARTED`
