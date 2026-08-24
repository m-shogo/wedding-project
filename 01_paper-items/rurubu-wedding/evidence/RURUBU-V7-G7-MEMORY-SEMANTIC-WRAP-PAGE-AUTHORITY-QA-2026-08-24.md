# Rurubu V7 G7 Memory/Guide — semantic-wrap + page-authority QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Canonical study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Live-state discovery before design write

The latest live-state readback found that G6 `2421:2`, although visually valid in isolation, had been created under the wrong page:

- G6 before repair: parent `845:2 / 00_RURUBU_START_HERE`, x `10700`, y `14500`, visible `true`.
- all other current V7 roots: parent `2052:2`.
- all current V8 roots: parent `2052:2`.

This exactly matches existing RSL-207 page-context authority drift. No new failure ID was created.

Rollback-safe correction used the already-verified replacement method:

1. resolve exact page `2052:2`;
2. `await figma.setCurrentPageAsync(authorityPage)`;
3. move the existing G6 root with `authorityPage.appendChild(g6)` rather than duplicating it;
4. restore intended comparison position `x10700 / y13000`;
5. read back parent/position.

After repair, G6 parent readback was `2052:2`.

## New professional typography research → local hypothesis

This run deepened Japanese composition/line-adjustment research around JLREQ / kinsoku / mojikumi rather than treating line wrapping as a generic responsive-layout problem. Professional Japanese composition distinguishes prohibited or awkward line heads/ends and adjusts measure/spacing/composition so punctuation and semantic units read naturally.

Rurubu-specific hypothesis: a visually stranded short particle/punctuation group in display-support copy should be corrected by the typography system — measure, scale and surrounding geometry — rather than by accepting machine wrapping or inserting decorative containment.

## Observation after G6 three-scale review

G6 solved Guide 01's `時間。` split, but actual-size review exposed a second issue in left sensory copy `2421:7`:

Native characters:

`沖縄、韓国、ハワイ。\n思い出を巡りながら、今日の横浜へ。\nこれからも旅は続きます。`

G6 geometry:

- x `40`
- y `625`
- width `410`
- height `118`
- `Noto Sans JP Bold / 25 px / 36 px line-height`

Actual rendering visually stranded `へ。` after `今日の横浜`, producing an amateur semantic break despite correct underlying text.

Adjacent secondary image starts at x `505`, so blindly widening the text box would risk a new text-image collision.

## G7 bounded candidate

Created G7 `2424:2` on the canonical study page, rollback-safe from corrected G6.

Only `2424:7 / TEXT / V7 MEMORY SENSORY` changed:

- font size `25 → 23 px`
- width `410 → 430 px`
- x/y/height unchanged
- native copy unchanged
- Noto Sans JP Bold retained
- photography/crops/image hashes unchanged
- fixed title graphic unchanged
- numbered guide, palette, rules and other copy unchanged.

The new right edge is x `470`, preserving a `35 px` gap before the secondary photo at x `505`.

## Three-scale QA

- 500px whole-item: PASS; V7 high-energy identity retained.
- 1400px reading: PASS; `思い出を巡りながら、今日の横浜へ。` reads as an intact line.
- 1587×1123 actual-size: PASS; no stranded `へ。`, no hierarchy collapse.

Structure readback:

- native text `20`
- IMAGE fills `6`
- text-text intersections `0`
- text-image intersections `0`
- bounded 18px edge risks `0`
- Japanese font mismatches `0`

## Professional critique

- **Art director:** G7 retains the same high-energy travel-information-magazine personality; the correction is not a de-styling pass.
- **Editorial designer:** grounded route copy reads in the intended sequence without a machine-like particle orphan.
- **Book designer:** left/right pacing and spread rhythm are unchanged.
- **Typographer:** the correction preserves native copy while improving semantic line integrity and optical balance.
- **Photo editor:** photography remains structural dummy only; no place/image truth was promoted.
- **Print designer:** no printer-safe or final-resolution claim was introduced.

## Promotion / rollback

G7 promoted current:

- `2424:2`
- parent `2052:2`
- x `10700`
- y `13000`
- visible `true`
- state `VERIFIED_LOCAL / REAL-PHOTO-BLOCKED`.

G6 preserved as hidden rollback:

- `2421:2`
- `ROLLBACK / V7 G6 / MEMORY+GUIDE / PRE-JAPANESE-SEMANTIC-WRAP-QA / HIDDEN`
- parent `2052:2`
- x `300000`
- visible `false`.

Final page-level readback confirms all 12 current V7/V8 roots are visible under `2052:2` and pairwise current-root overlap is `0`. V6 preferred `JC + IX + JB + IZ + IT + JA` remains untouched.

## Learning state

- RSL-261 strengthened with a second materially different Japanese semantic-wrap case in the same spread; remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` rather than being over-promoted.
- RSL-207 reoccurred as an operational production failure. The run used the known replacement method immediately and did not create a duplicate fingerprint. Prevention gate is now required at every page-level current promotion: exact authority page → explicit page switch → mutation → parent readback.

## Asset / truth state

- image generation `0`
- Drive writes `0`
- new Drive masters `0`
- imageHash changes `0`
- factual/native copy character changes `0`
- photo/crop changes `0`
- final place photography `0`
- V6 changes `0`
- V8 production changes `0`

Current live V7 comparison set: `C8 + K2 + F3 + G7 + H7 + C6D`.
