# Rurubu WEDDING V7 — Memory+Guide G / Cafe+Table H QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
GitHub main observed before these writes: `8d50f5bea62ccb763b5e3f2acbdcde69afc6dead`
State: `TESTED_LOCAL / SIX-ROLE STUDY COVERAGE COMPLETE / NOT PREFERRED / NOT PRINT READY`

## Authority truth

- V6 control is unchanged.
- V8 current is unchanged.
- Other wedding items were not touched.
- V7 Drive folder remains `1dxEJ5fTLIh03-9or1DXG_mwRajzJXJNR / RURUBU_V7_HAWAII_EDITORIAL_2026-08-21`.
- No final Hawaii-specific photo master was added in this run.
- All photographs used below are explicitly named `STRUCTURAL PHOTO DUMMY / ... / NOT FINAL HAWAII`.

## Fresh professional research used

This phase deliberately switched from type/cover research to travel-guide utility and food-editorial practice.

### Travel-guide utility

Research into LOST iN, Time Out, Flaneur and Cereal reinforced four useful principles:
- travel-guide personality can come from typography and editorial sequencing without resorting to city clichés;
- raw listings become place-identifying only after editorial selection and a stable information architecture;
- local function and lived observation are stronger than generic map/marker decoration;
- guide utility and magazine-like essay pacing can coexist as different page jobs.

The Rurubu-specific hypothesis was: **if exact location/coordinate truth is not available, do not invent a map or pseudo-geographic UI. Preserve utility through a clear sequence of reader actions, time-of-day labels and photo responsibilities instead.**

### Food editorial

Research into The Gourmand, Toothsome, Picnic and Fare reinforced that successful food magazines are not simply galleries of beautiful dishes. Food can be treated as culture, people, atmosphere and memory, while design varies between dominant photography, quieter text and detailed reading. Toothsome explicitly describes art direction as a reason readers should “eat with their eyes”; Picnic focuses on people and dining culture rather than food glamour alone; Fare combines food, buildings, people and local history.

The Rurubu-specific hypothesis was: **a food spread should not become a repeated dish-card catalogue. Give photography unequal responsibility and let sensory/context copy carry the atmosphere around the meal.**

No surface styling from these publications was copied.

---

# Memory+Guide G

Candidate:
- `2295:2 / V7 PRO STUDY G / HAWAII POP EDITORIAL / MEMORY+GUIDE / CLEANROOM / TESTED_LOCAL / STRUCTURAL PHOTO DUMMIES / 2026-08-23`
- parent `2052:2`
- size `1587.4×1123`

The spread was authored from a blank frame using factual/editorial copy only. V8 layout and styling were not reused.

## Composition

Left page = memory/photo essay:
- `03 / 記憶`;
- `場所より先に、記憶が戻ってくる。`;
- one dominant structural photo role;
- a sensory three-line beat;
- one smaller supporting photo + caption;
- article-owned reflection as the close.

Right page = useful four-stop guide:
- `寄り道案内`;
- `4つの寄り道。`;
- 01 朝 / 海辺を歩く;
- 02 昼 / 小さな店に入る;
- 03 夕 / 街の光を見る;
- 04 夜 / 食卓で終える.

The four entries intentionally do not share equal visual treatment. There is no fake map, invented pin/coordinate system, card grid or UI timeline rail.

## Photo truth

Visible structural dummies:
- `2295:6` dominant memory — hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- `2295:8` secondary memory — `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- `2295:19` guide 01 — `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- `2295:23` guide 03 — `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- `2295:30` guide 04 — `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

None is claimed as final Hawaii photography.

## QA

- whole-item / 500 px: PASS;
- reading / 1400 px: PASS;
- actual-size / 1587×1123: PASS;
- visible native text: `23`;
- text-box intersections: `0`;
- 18 px text safe risks: `0`;
- unintended one-character line-end candidates: `0`;
- all visible image roles explicitly named as structural/not-final-Hawaii: true.

Decision: `TESTED_LOCAL`. The information architecture is useful enough for comparison; real-content and print gates remain open.

---

# Cafe+Table H

Candidate:
- `2296:2 / V7 PRO STUDY H / HAWAII POP EDITORIAL / CAFE+TABLE / CLEANROOM / TESTED_LOCAL / STRUCTURAL PHOTO DUMMIES / 2026-08-23`
- parent `2052:2`
- size `1587.4×1123`

## Composition

Left Cafe page:
- dominant cafe structural photo;
- cobalt title field;
- native `食べたものより、` lead;
- fixed exact Japanese display phrase `食卓を\n覚えている。`;
- native sensory beats `カップの音。 / 窓の光。 / 次の店を決める会話。`;
- one smaller contextual photo beat;
- article-owned closing copy.

Right Dinner page:
- one large dinner structural photo rather than repeated dish modules;
- `料理、皿、手元、店の空気。` as the opening editorial idea;
- native support + closing copy below;
- no cards, badges, fake menu UI, shadow polish or decorative English.

## Fixed display source

Editable source:
- `2296:23 / SOURCE / V7 CAFE FIXED DISPLAY TITLE / EDITABLE`
- exact source preserved hidden after export.

Placed fixed graphic:
- `2296:26 / FIXED PNG / V7 CAFE DISPLAY TITLE / 4X / SOURCE PRESERVED`
- image hash `cb12fc4f50e539973bdd5b85a8e367781994f71a`.

This is Figma-composed/rasterized fixed display art, not image-model generation. The page is not flattened.

## Failures caught and corrected

1. `04 / 食卓` was initially created before the dominant photo/cobalt field and became hidden under later nodes. Thumbnail QA caught the z-order failure. The exact native kicker was moved onto the cobalt field and brought to front; no duplicate was created.
2. Structure QA found a `90×60 px` text-box intersection between `夜の横浜を、ゆっくり味わう。` and the dinner note. The note was moved below the close and QA was rerun.

## Photo truth

- cafe dominant `2296:4` — `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- cafe secondary `2296:11` — `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- dinner dominant `2296:17` — `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

All are structural dummies / not final Hawaii.

## QA

- whole-item / 500 px: PASS;
- reading / 1400 px: PASS;
- actual-size / 1587×1123: PASS;
- visible native text: `14`;
- text-box intersections after correction: `0`;
- 18 px text safe risks: `0`;
- unintended one-character line-end candidates: `0`;
- exact editable fixed-title source preserved hidden.

Decision: `TESTED_LOCAL`. The visual system is suitable for six-role comparison, but final Hawaii food/location photography and print gates remain open.

---

# Live V7 six-role coverage after this run

Direct Plugin API readback on page `2052:2` now confirms all six comparable V7 study roles are represented:

1. Outer/Cover — `2282:2 / V7 PRO STUDY C2 ... TESTED_LOCAL`;
2. Profile+Q&A — `2059:50 / V7 PRO STUDY E ...`;
3. Story+Chronology — `2290:4 / V7 PRO STUDY F ... TESTED_LOCAL`;
4. Memory+Guide — `2295:2 / V7 PRO STUDY G ... TESTED_LOCAL`;
5. Cafe+Table — `2296:2 / V7 PRO STUDY H ... TESTED_LOCAL`;
6. 1DAY Plan — represented by `2286:2 / V7 PRO STUDY C4 / ISLAND PICKS+1DAY ... TESTED_LOCAL`.

This means the **live current-study V7 role set is now 6/6 represented for comparison**. It does not mean final Hawaii assets, preferred selection, or print readiness are complete.

## Asset lifecycle truth

- image-model generation: `0`;
- new Drive masters: `0`;
- final Hawaii photography adopted: `0`;
- new clean-room spreads in this phase: `2` (Memory G, Cafe H);
- new fixed Figma-composed display graphic in this phase: `1` (Cafe title);
- V6/V8 changed: `0`.

## Next gate

Now that V7 has all six roles represented, the next high-value work is not V9. It is:
1. compare the complete V7 sequence against V6 and V8 at matched scales;
2. identify the weakest V7 roles rather than polishing the newest work by recency;
3. create role-specific Hawaii photography briefs for the roles where imagery is the actual bottleneck;
4. only promote a system/component after comparative evidence.