# RURUBU V7/V8 — temporal truth gate QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
State: `DESIGN_QA_PASS / TEMPORAL_TRUTH_GATED / REAL_CONTENT_BLOCKED / NOT_PRINT_READY`

## Authority audit

Current content authorities re-read:

- `01_paper-items/rurubu-wedding/CONTENT-INTAKE.md`
- `01_paper-items/rurubu-wedding/CURRENT-CONTENT-GAPS-20260730.md`
- `01_paper-items/rurubu-wedding/DUMMY-CONTENT-PACK.md`

These files define content capacity and explicitly distinguish placeholders/dummies from real Current authority. None supplies the exact Cafe time `11:40`, V7 1DAY times `09:00 / 12:30 / 16:00 / 19:00`, or V8 1DAY times `10:00 / 11:40 / 15:10 / 18:30` as verified itinerary facts.

Search results only traced those times back to prior Rurubu design evidence/learning artifacts, not to independent content authority. Therefore the values were self-referential design data rather than grounded source data.

## V7 Cafe H6 → H7

Baseline H6 `2404:2`:
- caption `11:40 / ひと休み`;
- direct photo-caption binding and secondary-photo transition role already verified structurally.

H7 `2407:2`:
- native caption becomes `ひと休み`;
- all photography, layout, fixed display graphics, hierarchy, color and copy otherwise unchanged.

Three-scale QA:
- 500: PASS
- 1400: PASS
- 1587×1123: PASS for DESIGN QA

Structure QA:
- visible native text `11`
- text intersections `0`
- 18px edge risks `0`
- Japanese font mismatch `0`
- exact clock-time strings `0`

Decision: H7 promoted; H6 hidden rollback.

## V8 Cafe AS4 → AS5

Baseline AS4 `2355:27` also carried `11:40 / ひと休み` without content authority.

AS5 `2407:25` changes only that native caption to `ひと休み`.

Three-scale QA:
- 500: PASS
- 1400: PASS
- 1587×1123: PASS for DESIGN QA

Structure QA:
- visible native text `11`
- text intersections `0`
- 18px edge risks `0`
- Japanese font mismatch `0`
- exact clock-time strings `0`

Decision: AS5 promoted; AS4 hidden rollback.

## V7 1DAY C6B → C6C

Baseline C6B `2383:2` used exact time navigation:
- `09:00 / 海から始める`
- `12:30 / 甘いもの休憩`
- `16:00 / 街を歩く`
- `19:00 / 食卓で締める`

C6C `2409:2` preserves V7's unequal scan rhythm and action/photo sequence but substitutes truth-safe dayparts:
- `朝 / 海から始める`
- `昼 / 甘いもの休憩`
- `午後 / 街を歩く`
- `夜 / 食卓で締める`

Existing spatial truth gate remains: no route map without verified geography.

Three-scale QA:
- 500: PASS
- 1400: PASS
- 1587×1123: PASS for DESIGN QA

Structure QA:
- visible native text `20`
- text intersections `0`
- 18px edge risks `0`
- Japanese font mismatch `0`
- exact clock-time strings `0`

Decision: C6C promoted; C6B hidden rollback.

## V8 1DAY AT3 → AT4

Baseline AT3 `2342:2` used exact time navigation and summary:
- `10:00 / 海辺`
- `11:40 / カフェ`
- `15:10 / 街歩き`
- `18:30 / 食卓`
- `10:00から18:30。寄り道しながら、横浜をゆっくり歩く。`

AT4 `2409:37` keeps the restrained vertical time/pace grammar while removing unsupported precision:
- `朝 / 海辺`
- `昼 / カフェ`
- `午後 / 街歩き`
- `夜 / 食卓`
- `朝から夜まで。寄り道しながら、横浜をゆっくり歩く。`

Existing spatial truth gate remains: no route map without verified geography.

Three-scale QA:
- 500: PASS
- 1400: PASS
- 1587×1123: PASS for DESIGN QA

Structure QA:
- visible native text `17`
- text intersections `0`
- 18px edge risks `0`
- Japanese font mismatch `0`
- exact clock-time strings `0`

Decision: AT4 promoted; AT3 hidden rollback.

## Final live readback

Current V7:
`C8 2381:2 + K2 2391:2 + F3 2387:2 + G4 2395:2 + H7 2407:2 + C6C 2409:2`

Current V8:
`AV2 2347:2 + AW4 2391:50 + AL3 2388:2 + AQ4 2396:2 + AS5 2407:25 + AT4 2409:37`

Verified after promotion:
- all 12 current roots visible;
- parent page `2052:2`;
- pairwise overlap `0`;
- precise clock-time strings in the 12 current roots `0`.

V6 control remains unchanged.

## Figma failure fingerprint

During the first AT4 mutation, character-only `findOne(...)` inside the clone selected hidden duplicate text descendants. The write returned apparently successful node IDs, but fresh screenshot/readback showed the visible `R_TIME0..3` roles still contained exact times.

Fingerprint:
`F-RSL-258-CLONED-FRAME-HIDDEN-DUPLICATE-TEXT-INTERCEPTS-CHARACTER-ONLY-MUTATION`

Corrected method:
1. restrict candidates to `visible` text;
2. select by semantic role names `R_TIME0 / R_TIME1 / R_TIME2 / R_TIME3 / R_MAP_NOTE`;
3. assert exactly one visible match;
4. mutate;
5. read back visible characters;
6. only then screenshot/QA.

Correction verified: visible AT4 values read back `朝 / 昼 / 午後 / 夜`, exact-time probe `0`.

## Learning decision

### RSL-257
`F-RSL-257-PLAUSIBLE-PRECISE-TEMPORAL-DATA-MASQUERADES-AS-VERIFIED-EDITORIAL-FACT`

State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`.

Principle: exact temporal precision is valuable when it is real. If current authority only supports a generic model course or structural test, do not use exact clock values merely because they improve hierarchy or make a guide feel researched. Use a truth-safe abstraction such as dayparts until actual itinerary/reservation/schedule authority exists.

This is not a rule against exact time design.

### RSL-258
State: `VERIFIED_LOCAL` Figma-production lesson.

Principle: in cloned frames that may contain hidden rollback/duplicate descendants, character-only text targeting is unsafe. Prefer visible semantic-role targeting with uniqueness assertion and visible readback.

## Asset / print truth

- image generation `0`
- Drive writes `0`
- new Drive masters `0`
- new image hashes `0`
- final photography adopted `0`
- factual photos verified `0`
- V6 changes `0`

DESIGN QA passes; REAL CONTENT / final photography / printer template / preflight / physical proof remain separate blocked gates.
