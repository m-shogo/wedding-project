# ADD-03 — Clean-room V8 Pre-Figma Composition Proxy QA

Date: 2026-08-27
State: `TESTED_LOCAL_PRE_FIGMA / TIME_CASCADE_A2_SERIOUS_CANDIDATE / B_C_REJECTED_PRE_FIGMA / CURRENT_UNCHANGED`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start `main`: `6673245cd994f97e4f73f4132034ae51f16a0303`

## Scope / clean-room contract

This is a pre-Figma composition test for the existing V8 `TIME IN MOTION` brief. It does **not** promote or modify production.

The test used only the permitted facts / semantic requirements already recorded in the V8 brief:

- A2 `1400×1980`;
- `2026.10.24 SAT / YOKOHAMA`;
- `14:10–14:40` Ceremony;
- unresolved `14:40–15:00` interval;
- `15:00–17:30` Reception;
- Japanese-first headline / event names / guidance / closing copy.

No current-production composition, old V2/V3 geometry, rail, sidebar, rule, badge, icon, crop, SVG or generated asset was used as construction input. Current `DAY BROADSHEET` remained retained comparison authority only.

## Hybrid authoring decision

The V8 first pass remains intentionally type-first:

- native Figma text when assembled: all factual / variable / emotional copy;
- reusable SVG: `0` required for the first pass;
- generated raster: `0`;
- replaceable IMAGE role: `0`.

The quality bottleneck being tested is typographic rhythm and chronology, not missing photography or illustration.

## Three materially different blank-origin proxy studies

Non-production `1400×1980` composition proxies were generated from the V8 brief to reduce wasted Figma authoring once mutation is available. They are decision aids only and are **not** screenshot/structure evidence for Figma completion.

### A — `TIME CASCADE`

Premise:

- large `14:10 / 14:40 / 15:00` stagger across the sheet;
- event copy attached by optical proximity only;
- no line, route, card, container or decorative English.

Result:

- strongest sense of a day unfolding;
- immediate chronology remains legible;
- warm paper + cobalt/coral type carries enough wedding energy without fixed art;
- first long-copy proxy exposed an important regression: the initial 14:40 copy lane collided with / ran beyond the intended reading lane.

The selected refinement therefore **did not shrink type**. It changed only the copy-lane geometry:

- `14:10` stays left with its copy to the right;
- `14:40` moves to a center-left position with its copy in a bounded right lane;
- `15:00` returns left with its copy to the right;
- realistic multi-line ceremony / transfer / reception guidance fits without overlapping the large times in the refined proxy.

Decision: **A2 = serious Figma candidate**, but it still requires real native-text Auto Height, Japanese line-break and actual-size proof in Figma.

### B — `OPEN COLUMN SHIFT`

Premise:

- times alternate margins;
- guidance remains in a calmer central lane.

Result:

- information remains readable;
- too much inactive paper mass appears between the three moments;
- reads as premium-by-emptiness / art-book spacing rather than a joyful wedding-day programme;
- the alternating margin concept feels more like a layout exercise than item-specific chronology.

Decision: `REJECTED_PRE_FIGMA`.

### C — `CROPPED TIME BROADSIDE`

Premise:

- oversized times approach / crop at the page edge;
- strongest pop / celebratory energy.

Result:

- visually memorable at first glance;
- the cropped numerals become the dominant poster gesture and reduce the timetable/programme reading;
- high risk of trim/safe-area problems at actual size;
- 14:40 becomes festival-poster typography rather than a semantic transition role.

Decision: `REJECTED_PRE_FIGMA`.

## A2 serious-candidate geometry contract

When Figma mutation is safely available, create **one new blank A2 frame** for A2. Do not duplicate Current or the earlier proxy studies.

Initial geometry ranges to reproduce the tested reading rhythm, not exact pixels as immutable design tokens:

- headline: upper-left, large Japanese first read;
- date/place: directly below headline;
- `14:10`: left zone, event/guidance lane immediately to its right;
- `14:40`: center-left zone, event/guidance lane in a bounded right column;
- `15:00`: left zone again, event/guidance lane immediately to its right;
- closing copy: lower-left, with adequate trim reserve.

Use native text roles from the V8 brief. All semantic text must be `textAutoResize=HEIGHT`. Load the Japanese font before authoring and re-assert Auto Height after any explicit resize operation.

## Realistic long-copy contract

The first A proxy failed when transfer guidance was treated as a short single-line placeholder. Therefore Figma A2 must be stress-tested immediately with realistic multi-line Japanese, before comparison to Current.

Minimum stress intent:

- Ceremony guidance expands to 2–3 lines;
- transfer guidance expands to 2–3 lines and must remain fully inside its right-side lane;
- Reception guidance expands to 2–3 lines;
- no time numeral may be reduced merely to make stress pass;
- reject machine-like Japanese orphaning even when bounding boxes fit.

## Required Figma gate

A2 is not a winner yet. When mutation is available:

1. build A2 on a blank A2 frame;
2. ~500px whole-item review;
3. ~1000px reading review;
4. native `1400×1980` review;
5. realistic long-copy stress;
6. structure readback: native semantic text, Auto Height, outside `0`, unintended flatten `0`, IMAGE fill `0`;
7. only then reveal retained `DAY BROADSHEET` for final comparison.

Promote only if A2 preserves Current's instant chronology while adding more movement / wedding-day energy without becoming a festival poster or sparse art-book sheet.

## Current production decision

`DAY BROADSHEET` remains unchanged and retains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`.

This pre-Figma test does not reopen or downgrade Current.

## Asset / Drive decision

- image generation: `0`;
- Drive write: `0`;
- adopted asset: none;
- reason: the experiment is typography-first and no screenshot-supported image bottleneck exists.

## Learning state

`TESTED_LOCAL_PRE_FIGMA` only.

The useful finding is narrow: among the three V8 type-first premises, **staggered time typography can carry movement better than either alternating-margin emptiness or cropped-poster scale, but its copy lanes must be stress-designed from the start**.

Do not promote this to a cross-item rule until real Figma assembly and three-scale evidence verify it.