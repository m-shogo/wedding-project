# Rurubu WEDDING V6 — AA + CX/CY Native Text Resilience QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `VERIFIED_LOCAL / PROMOTED_TO_PREFERRED / V7_HOLD / NOT_PRINT_READY`

## Authority readback

Before mutation, live Figma was re-read and matched the Rurubu current authority:

- Outer AA `1592:2` — preferred;
- Profile/Q&A CW `1593:2` — preferred;
- Story/Chronology CQ `1569:2` — preferred;
- Start Here — `V5 FU/FX · V6 AA + CW/CQ INSIDE STUDIES · V7 HOLD`.

Drive V6 root was also re-read live:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

The project-wide shared learning system, Rurubu feed, neutral non-Rurubu feed and current hybrid-authoring policy were read before writes. No non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths were inspected or edited.

## Transferred hypothesis

A newer neutral cross-scope learning entry was `VERIFIED_CROSS_ITEM` for a structural QA defect: native text can look correct in screenshots while remaining `textAutoResize=NONE` in fragile fixed-height boxes.

The method was treated as a hypothesis for Rurubu until independently tested here. No non-Rurubu layout, node ID, copy, palette or dimensions were transferred.

## Initial audit

AA/CW/CQ visible native text was audited structurally in addition to screenshot QA.

### Intended fixed display typography

Several large masthead/display roles remain deliberately fixed-height, for example the cover destination headline and chronology display numerals. They are not generic variable-copy roles and were not bulk-converted.

### Fragile variable/factual roles found

CW contained fixed-height variable Profile values and the Q04 question.

CQ contained fixed-height semantic copy that may change later, including:

- Story body;
- chronology deck;
- Event 01–06 dates;
- Event 01–06 titles;
- Event 01–06 copy.

A first bounded conversion also tested the Profile pullquote as unlimited auto-height. Realistic stress showed that this was the wrong contract: a long decorative pullquote expanded into nearby Profile data. The pullquote was therefore restored to its bounded display role instead of forcing every native text node into one rule.

## Rollback-safe candidates

Current preferred frames were cloned before repair:

- CW → CX `1601:2`;
- CQ → CY `1601:81`.

No changes were made to Outer AA.

## CX repair — Profile / Q&A

### Profile values

Six Profile values changed from fixed-height boxes to native `textAutoResize=HEIGHT`, retaining their widths, fonts, text roles and positions.

The bounded Profile pullquote was intentionally restored to fixed display geometry after the first stress disproved unlimited auto-height for that role.

### Q04

The Q04 question was converted to native auto-height. Because its answer must move when the question wraps, Q04 question + answer were placed in one native vertical auto-layout stack:

- `STACK / QA_Q04_NATIVE_AUTOHEIGHT`.

The number `04` remains an independent display role.

## CY repair — Story / chronology

The Story body and chronology deck were converted to native auto-height.

Event 01–06 dates, titles and copy were converted from fixed-height variable text to height-following native text.

For each event, title + copy were placed into a native vertical auto-layout stack so expanded titles push the related copy down instead of overlapping it:

- `STACK / EVENT_1_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_2_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_3_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_4_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_5_TITLE_COPY_AUTOHEIGHT`;
- `STACK / EVENT_6_TITLE_COPY_AUTOHEIGHT`.

Dates and event numerals remain independent native roles so the existing editorial composition is preserved.

## First stress — rejected structural attempt

The first realistic-copy proof found real regressions:

- Profile: long pullquote collided with Profile value 2;
- Q&A: longer Q04 question collided with its answer;
- chronology: longer Event 01–05 titles collided with their copy.

That proof was not adopted and is preserved hidden as rejected QA evidence.

Root cause: converting isolated text boxes to auto-height is insufficient when downstream copy is absolutely positioned. Variable pairs need a structural relationship, while bounded display copy should retain an explicit text-fit contract.

## Second stress — PASS

After the stack repair, second hidden proofs were created:

- CX proof `1603:9`;
- CY proof `1603:89`.

Stress included materially longer Japanese content, including:

- `神奈川県川崎市多摩区 / KANAGAWA`;
- `カフェ・スイーツ・ご当地グルメ`;
- a longer Profile holiday description;
- a longer Q04 question and multi-line answer;
- longer Story body/deck;
- materially longer Event 01–06 titles and two-line event copy.

Final second-pass structural result:

- Profile collisions: `0`;
- Q&A collisions: `0`;
- Story collisions: `0`;
- chronology collisions: `0`;
- 18px text safe-area risks: `0` on all four pages.

The stress proofs were returned to hidden state after actual-size screenshot evidence.

## Three-scale visual evidence

The repair intentionally preserves the chosen composition while strengthening editability.

CX current-copy QA:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Profile actual-size `794×1123`: PASS;
- Q&A actual-size `794×1123`: PASS.

CY current-copy QA:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Story actual-size `794×1123`: PASS;
- chronology actual-size `794×1123`: PASS.

Second-pass realistic-copy proofs were also captured at actual page size for Profile, Q&A, Story and chronology after collision checks returned zero.

## Promotion transaction

Fresh Figma/GitHub/Drive state was re-read immediately before promotion.

Promoted:

- Outer AA `1592:2` — unchanged preferred;
- CX `1601:2` → `PREFERRED / V6_INSIDE_CX_NATIVE_TEXT_RESILIENCE_2026_08_17`;
- CY `1601:81` → `PREFERRED / V6_INSIDE_CY_NATIVE_TEXT_RESILIENCE_2026_08_17`.

Rollback preserved:

- CW `1593:2` → hidden rollback;
- CQ `1569:2` → hidden rollback;
- first failed stress proofs remain hidden/rejected;
- second-pass stress proofs remain hidden QA evidence.

Start Here readback:

`V5 FU/FX · V6 AA + CX/CY INSIDE STUDIES · V7 HOLD`

Post-promotion structural readback:

- affected audited variable/factual roles still fixed-height: `0`;
- visible text collisions across AA + CX/CY: `0`;
- 18px text safe-area risks: `0`;
- active raster/image roles: `25`;
- active image hashes: unchanged;
- generated section assets adopted: `0`.

## Asset lifecycle truth

- newly image-generated assets: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster bytes: `0`;
- image hashes changed: `0`;
- native variable/factual text preserved: `YES`;
- photo replaceability preserved: `YES`;
- rollback preserved: `YES`;
- visual hierarchy intentionally preserved: `YES`;
- realistic-copy structural stress: `PASS`;
- V7 touched: `NO`.

## Learning state

Rurubu result: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

The generalizable lesson is not "make every text node auto-height." It is:

1. screenshot PASS does not prove native variable-text resilience;
2. audit variable/factual native text structurally;
3. use auto-height where copy is expected to vary;
4. when one text role must push another, encode that relationship with native auto-layout/HUG behavior;
5. keep bounded display copy bounded when the editorial role has a real text-fit contract;
6. realistic long-copy stress is mandatory after the structural change.

Exact Rurubu copy, typography, positions, stack widths and chronology composition remain Rurubu-specific.

## Result / limits

`V6 AA + CX/CY = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / NATIVE_TEXT_RESILIENCE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

Final legitimate photography, final personal copy, exact printer template, PDF preflight and physical proof remain outstanding. No completion or print-ready claim is made.