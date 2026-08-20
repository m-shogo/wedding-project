# Rurubu WEDDING V6 — HT timeline native-hierarchy subtraction QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

The live HR chronology page was already photo-led, but three decorative rectangles still survived as UI-like framing: the yellow section kicker background, Event 05 rule, and the WEDDING terminal rule. At whole-spread and actual-size review, these bars competed with the native 01→03→05→06 hierarchy and made the lower page read more like a timeline component than a magazine chronology.

## Hypothesis

The current photo hierarchy and native Japanese typography are mature enough to carry grouping without those rectangles. Removing the now-redundant bars should reduce diagram/UI character while preserving sequence, contrast, and editability.

## Rollback-safe test

Duplicated HR `2033:111` into candidate HT `2040:2` and changed only the timeline right page.

- Kept Story left page unchanged.
- Kept hero image hash `e3738476f760932bb5b09c9d60f174dd6c84049d` unchanged.
- Kept Event 03 image hash `439a719d73f28e8dd2889f2026cccb15f345ec63` and `350×260` geometry unchanged.
- Hid `DECOR / TIMELINE_KICK_YELLOW`.
- Hid `DECOR / EVENT5_EDITORIAL_RULE`.
- Hid `DECOR / WEDDING_TERMINAL_YELLOW`.
- After the yellow kicker was removed, its tiny kicker text no longer had a useful readable role and was hidden as well.
- Increased Event 05/06 native-number responsibility and rebalanced their positions without adding a container.
- No new image, generated asset, Drive save, binary placement, or image hash.

## Rejected / corrected state

The first HT geometry looked cleaner visually but structure QA found Event 05 problems:

- Event 05 date overlapped the enlarged `05` by `9×18px`.
- `05` overlapped the Event 05 title by `9×38px`.
- `05` overlapped Event 05 body copy by `9×12px`.
- Event 05 title/copy exceeded the 18px right safe area.

HT was not promoted in that state. Event 05 number was moved left and the date/title stack moved inward. A second structure audit returned zero collisions and zero safe-area risks.

## Three-scale evidence

### Whole item / thumbnail

HT reduces colored-bar fragmentation. The large hero, Event 03 photo, and native 01/05/06 numerals carry hierarchy without decorative containers.

### Reading/page scale

The chronology reads as `01 出会い → 03 ふたり旅 → 05 入籍 → 06 WEDDING`, with 02/04 remaining quieter bridge events. The lower page is visibly less diagram-like than HR.

### Actual size

HT timeline right `2040:28 / 794×1123`:

- visible native text: `27`;
- text collisions: `0`;
- 18px safe-area risks: `0`;
- page-level stray text: `0`;
- visible image roles: `2`;
- hero image role unchanged;
- Event 03 image role unchanged.

## Decision

`HT ADOPTED / VERIFIED_LOCAL`

- Preferred spread: `2040:2 / PREFERRED / V6_INSIDE_HT_TIMELINE_NATIVE_HIERARCHY_SUBTRACTION_2026_08_20`
- Timeline right: `2040:28 / PAGE / TIMELINE_EDITORIAL_HT_NATIVE_HIERARCHY_SUBTRACTION`
- HR `2033:111` preserved hidden as rollback.
- V7 untouched / HOLD.

## Asset lifecycle state

- generated: `0`;
- adopted generated: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native text preserved: YES;
- replaceable images preserved: YES;
- whole/page/actual-size visual QA: PASS.
