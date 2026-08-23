# るるぶWEDDING V7 — CURRENT STATUS

Date: 2026-08-23
Direction: Hawaii / high-energy Japanese travel-information editorial, clean-room from V6
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: frozen `JC + IX + JB + IZ + IT + JA`
Production state: `V7_6_OF_6_LIVE_COMPARISON_SET / F2_STORY_CURRENT / TESTED_LOCAL / NOT_PREFERRED / NOT_PRINT_READY`

## Current live V7 comparison set

1. **Outer / Cover C5** `2314:2`
   - current V7 Outer comparison
   - fixed `ハワイ / 旅するWEDDING` display lockup retained
   - redundant English taxonomy removed; lower service/index is reader-facing Japanese
   - 500 / 1400 / `1587×1123` QA PASS
   - native text `18`; IMAGE `6`; text intersections `0`; bounded 18 px safe risks `0`
   - prior C2 `2282:2` hidden rollback
2. **Profile / Q&A K** `2303:2`
   - answer-owned voice + compact prompt indexes
   - 500 / 1400 / `1587×1123` QA PASS
   - native text `30`; IMAGE `5`; intersections `0`; 18 px safe risk `0`
   - prior J `2301:2` hidden rollback
3. **Story / Chronology F2** `2351:2`
   - current V7 Story comparison
   - left Story close accent retained; redundant mirrored right Chronology close rule removed
   - right concluding reflection moved upward so chronology closes through year/event/type/space rather than matching furniture
   - 500 / 1400 / `1587×1123` DESIGN QA PASS
   - native text `24`; IMAGE `4`; text intersections `0`; bounded 18 px safe risks `0`; one-character/kinsoku probe `0`; Japanese font mismatch `0`
   - prior F `2290:4` hidden rollback at `x=300000`
4. **Memory / Guide G2** `2299:2`
   - fixed display title retest passed locally
   - editable source preserved separately
5. **Cafe / Table H3** `2311:2`
   - food-first fixed Table display title; editable source `2311:24`; placed fixed title `2311:29`
   - structural photo dummies remain non-final
   - 500 / 1400 / `1587×1123` QA PASS
   - native text `13`; IMAGE `5`; intersections `0`; bounded safe risk `0`
6. **Island Picks + 1DAY C6** `2316:2`
   - right page removes redundant oversized `01 / 02 / 03 / 04` timeline numerals while preserving exact times/actions
   - time + unequal photo rhythm carry route sequence
   - 500 / 1400 / `1587×1123` QA PASS
   - native text `20`; IMAGE `6`; intersections `0`; bounded 18 px safe risks `0`; accidental explicit one-character lines `0`
   - prior C4 `2286:2` hidden rollback

All six current roots remain on page `2052:2`. V6 was not overwritten.

## Latest verified improvement — Story / Chronology F2

Fresh research deliberately rotated away from recent photo-selection, cover, food and book-grid references and focused on Japanese composition/page architecture:

- W3C *Requirements for Japanese Text Layout (JLREQ)* describes Japanese composition from a designed basic page area and explicit rules for text, headings, figures, tables, punctuation and line composition.
- JAGAT / Toshi Kobayashi, *基本版面の設定と文字の配置*, describes the basic page area as the structural framework for placing text and illustrations.

Rurubu-specific hypothesis:

> When the two sides of a spread have materially different editorial jobs, matching separator/close furniture should not survive only to preserve visual symmetry. If chronology already closes through year scale, event hierarchy, spatial progression and final reflection, independently test whether its mirrored close rule adds any reader job.

This is a local inference from page-architecture research; neither JLREQ nor JAGAT is treated as a rule to remove separators.

### Bounded test

F `2290:4` was cloned rollback-safely to F2 `2351:2`.

Only two right-page properties changed:

- `2351:29 / ACCENT / V7 CHRON CLOSE RULE`: `visible=false`
- `2351:30 / TEXT / V7 CHRON CLOSE`: `y=978 → 946`

Preserved unchanged:

- left Story close rule
- factual/native copy
- fixed Story display title
- all photo roles/crops
- palette
- chronology years/events/notes

### QA result

- whole-item 500 px: PASS
- reading 1400 px: PASS
- actual-size canvas `1587×1123`: PASS for DESIGN QA
- native text `24`
- IMAGE `4`
- text intersections `0`
- bounded 18 px edge risk `0`
- accidental explicit one-character / kinsoku probe findings `0`
- Japanese font mismatch `0`

Professional critique:

- **Art director:** PASS — V7 energy remains, but Story and Chronology no longer share identical closing furniture by default.
- **Editorial designer:** PASS — each page closes according to its content role.
- **Book designer:** PASS — theme + variation is stronger than mirrored component grammar.
- **Typographer:** PASS — native Japanese copy, line breaks and type hierarchy remain unchanged and editable.
- **Photo editor:** unchanged / REAL-CONTENT-BLOCKED because photography is still structural dummy material.
- **Print designer:** DESIGN QA only; exact printer template, bleed/trim/fold, effective image resolution and physical proof remain unverified.

Decision: `F2 ADOPTED AS CURRENT V7 STORY COMPARISON / VERIFIED_LOCAL DESIGN QA / NOT PREFERRED / NOT PRINT READY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-STORY-F2-RIGHT-CLOSE-RULE-SUBTRACTION-QA-2026-08-23.md`.

Learning: `RSL-243 / F-RSL-243-MIRRORED-CLOSE-RULES-EQUALIZE-DIFFERENT-EDITORIAL-PAGE-JOBS`, state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Previous verified V7 improvements retained

- **C6 / RSL-233** — exact time + photo rhythm can carry model-course sequence without redundant oversized ordinal modules.
- **C5 / RSL-232** — duplicate cover taxonomy can simulate magazine voice without adding a reader job.
- **H3 / RSL-231** — a fixed food headline may deserve role-specific display authorship when meaning inside the phrase has unequal visual jobs.
- **H2 / RSL-230** — clean-room direction fails when old destination copy leaks into captions/closing copy even if composition is new.
- **K / RSL-229** — Q&A hierarchy can follow available human voice rather than repeating prompt modules equally.
- **C2/G2 / RSL-227** — fixed identity-bearing copy may be authored as a dedicated display graphic when locally verified; not a blanket rasterize-text rule.

## Drive / asset truth

V7 authority folder:

`1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`

Recorded children remain:

- `1Mdo5oZF29VIH7ybc5lfLcOSkNzZ_cXI0 / v7_one_day_route_master.png`
- `13lhDTUgOADqLFgKq25ZqLkZbRhiSWON6 / v7_food_field_note_master.png`
- `1h4YCWgddoymmAl7tc2_PxmvrRyF7VxVp / v7_guide_map_master.png`
- `18-Fvl_5_IjIxqLi42Nu5R82nTvAIQg_l / v7_hawaii_route_map_master.png`
- `1zjPwT5ZQ_nmzBbfDGQ13EMlidrNOrd1l / v7_hawaii_beach_master.png`
- `1TWWUPMMfKgyBsf33KAfe4kWkbHO9gtsJ / v7_hawaii_flatlay_master.png`
- `1hN0EuiXu5Aa-J31T3_tbdllsDOKORNZt / v7_hawaii_lagoon_master.png`

Previously inspected examples are low-complexity structural graphic placeholders, not legitimate Hawaii photography. Filenames are not evidence of final photo authority.

This F2 run made no Drive write and no new asset claim.

## V7 Cafe / Table photo bottleneck

Cafe H3 `2311:2` remains structurally stronger but photography is still structural dummy evidence. Figma brief `2305:2 / V7 / PHOTO ART DIRECTION / CAFE-TABLE / GENERATION_READY / NOT CURRENT / 2026-08-23` remains the authority for future legitimate Hawaii photography.

The future image requirement remains: first create `食べたい`, then `そこに行きたい`, with believable Hawaii place evidence and without generic resort-stock, sterile flat-lay, plastic-food, fake-text or tropical-shorthand dependence.

## V6 / V7 / V8 comparison note

No overall winner is declared.

- V6 remains frozen control and still has the strongest proven destination/photo density.
- V7 is a materially different six-role high-energy Hawaii comparison system. F2 improves Story/Chronology theme + variation, but legitimate Hawaii photography remains incomplete.
- V8 remains a materially different restrained book/editorial comparison system.

## Learning state

- RSL-227 fixed identity display authoring: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- RSL-229 answer-owned Q&A voice: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- RSL-230 destination-copy semantic leakage: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- RSL-231 fixed food-title responsibility: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- RSL-232 duplicate cover taxonomy: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- RSL-233 time/photo sequence vs redundant numbered timeline modules: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- RSL-243 mirrored close-rule symmetry across different editorial jobs: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- real-photo observations remain below promotion until exact-slot legitimate candidates are tested.

## Asset truth for this run

- new image-model generation: `0`
- newly created Drive masters: `0`
- new image hashes: `0`
- legitimate final photography adopted: `0`
- production photo placements changed: `0`
- native/factual copy changes: `0`
- V6 changes: NO
- V8 changes: NO
- V7 Story DESIGN QA: PASS
- REAL CONTENT QA: BLOCKED on legitimate Hawaii photography
- PRINT TEMPLATE/PREFLIGHT: NOT VERIFIED
- PHYSICAL PROOF: NOT VERIFIED

## Print / truth gates

Do not call V7 preferred, complete or print-ready until independently verified:

1. DESIGN QA
2. REAL CONTENT / legitimate Hawaii photography QA
3. exact printer template / bleed / trim / fold / imposition / PDF preflight
4. effective image resolution after final crop
5. PHYSICAL PROOF

## Next highest-value work

1. Preserve V6 and all hidden V7 rollbacks/rejected evidence.
2. Keep current set `C5 + K + F2 + G2 + H3 + C6` unless a role-valid comparison wins three-scale + structure QA.
3. Highest-value asset target remains legitimate role-specific Hawaii Cafe/Table photography from brief `2305:2` when a legitimate generation path is available.
4. Save accepted masters to the exact V7 Drive authority, read back Drive IDs, place through exact replaceable Figma roles, then verify hash/crop/effective PPI and three scales.
5. Continue common-scale V6/V7/V8 role comparisons; do not create V9 and do not keep styling the newest candidate merely because it is newest.
