# ADD-03 当日タイムテーブルボード — QA

Status: `CURRENT / DAY_BROADSHEET_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

Figma file: `woFUHUqZcvNkih8o42xeH4`.

Current selected family:

- A2 selected: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED` — `1400×1980`;
- A3 selected: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED` — `990×1400`;
- clean-room study page: `42:2 / VNEXT_FAMILY_DIVERSITY_B / ADD-03 / 2026-08-21`;
- A2 clean-room master: `42:3 / VNEXT_SELECTED_CANDIDATE / ADD-03 A2 / DAY BROADSHEET`;
- A3 independent reflow: `43:4 / VNEXT_SELECTED_CANDIDATE / ADD-03 A3 / DAY BROADSHEET REFLOW`;
- A2 long-copy proof: `43:26 / QA / ADD-03 A2 DAY BROADSHEET / LONG COPY STRESS`;
- A3 long-copy proof: `43:47 / QA / ADD-03 A3 DAY BROADSHEET / LONG COPY STRESS`;
- pre-family-diversity rollback: `45:2 / 45:22`;
- pre-2026-08-23 date-tab-subtraction rollbacks: `47:23 / 47:44 / 47:66 / 47:87`;
- older TIDE DAY and legacy production remain preserved as history/comparison only.

Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`.

Primary current evidence:

- `FIGMA-FAMILY-DIVERSITY-DAY-BROADSHEET-PROMOTION-2026-08-21.md`;
- `FIGMA-DAY01-TAB-SUBTRACTION-QA-2026-08-23.md`.

## Authority-drift correction — 2026-08-22

The live Figma roots and the later family-diversity promotion already selected `DAY BROADSHEET`, but this canonical `QA.md` still pointed to the superseded `TIDE DAY` family. That stale pointer could cause a later agent to inspect or mutate the wrong visual generation.

Live readback confirmed the stable production roots and exact Drive authority. This QA file was synchronized to current production truth without rolling back the newer family-diversity work.

## DAY 01 tab subtraction — 2026-08-23

Fresh whole-item review found that the top-right yellow `DAY 01 / 10.24` tab duplicated the already-authoritative native `2026.10.24 SAT / YOKOHAMA` line and added a generic English label without a trim, fold, binding, wayfinding, or other physical function.

A rollback-safe A2 comparison `47:2` hid only `DATE_TAB` and `DATE_TAB_TYPE`. The no-tab version improved headline/date hierarchy while preserving chronology and printed-program character. Before production mutation, A2/A3 Current and both long-copy proofs were copied to hidden rollback roots `47:23 / 47:44 / 47:66 / 47:87`.

The tab roles are now hidden in:

- A2 Current `14:2`;
- A3 Current `15:40`;
- A2 long-copy proof `43:26`;
- A3 long-copy proof `43:47`.

No confirmed date/place information was removed. The completed comparison was hidden after verification.

## Current visual direction

`DAY BROADSHEET` treats the day as a printed program/broadsheet rather than an event dashboard or simulated airline system.

Current first-glance hierarchy:

1. Japanese-first `今日を、ひらく。`;
2. `2026.10.24 SAT / YOKOHAMA`;
3. large `14:10` + `挙式`;
4. large `14:40` + unresolved interval guidance;
5. large `15:00` + `披露宴`;
6. warm closing copy.

The composition now uses a cobalt binding/spine, warm paper field, simple chronology and thin print rules without the redundant date badge. The dominant grammar is a physical day-program sheet, not the superseded dark saturated field plus large rounded tide/sun/capsule gestures.

## Three-scale visual QA

Rechecked live after the 2026-08-23 subtraction:

- A2 whole / thumbnail: PASS;
- A2 reading / high-resolution: PASS;
- A3 native `990×1400`: PASS;
- A2 realistic long-copy proof after the same subtraction: PASS.

The timetable remains immediately scannable from large time numerals while Japanese hierarchy stays dominant. No card-grid, fake flight/gate/class data, barcode, repeated badge, shadow or gradient is required.

## Structure / long-copy QA

Current production readback after the date-tab subtraction:

- A2 `14:2`: `1400×1980`, visible native text `13`, fixed-height `0`, outside visible text `0`, visible date-tab roles `0`, IMAGE fills `0`;
- A3 `15:40`: `990×1400`, visible native text `13`, fixed-height `0`, outside visible text `0`, text bounding-box collisions `0`, visible date-tab roles `0`, IMAGE fills `0`.

Dedicated long-copy stress remains at `43:26 / 43:47`. Ceremony, transfer and reception guidance were expanded to realistic multi-line Japanese copy and remain inside their editorial lanes after the same tab subtraction.

A2 geometry reports six text bounding-box intersections between each large time box and its adjacent event/guide boxes. Fresh native screenshot inspection confirms these are pre-existing wide-box overlaps rather than visible glyph collisions and were not introduced by the 2026-08-23 change.

All factual and variable information remains native editable text. No variable copy is baked into SVG or raster.

## Fact / placeholder contract

Confirmed facts only:

- date: `2026.10.24 SAT`;
- location: `YOKOHAMA`;
- Ceremony: `14:10–14:40`;
- transfer interval: `14:40–15:00`, activity remains unresolved and must stay native semantic guidance;
- Reception: `15:00–17:30`.

Do not invent opening time, venue floor, gate, flight number, QR, transport credential or other operational fact.

## Hybrid authoring / Drive

- native text: factual / variable copy;
- native editable geometry: binding and chronology rules with clear print/editorial function;
- redundant `DAY 01` date badge: removed from Current visibility after bounded proof;
- reusable SVG: `0` required;
- generated raster: `0`;
- replaceable IMAGE fills: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: current screenshot evidence does not show photography or illustration as the quality bottleneck. Large-format chronology, distance readability and printed-program character remain stronger without decorative travel imagery.

## Professional visual judgment

Current Professional Design Council score remains **91 / 100 / PASS / NO VETO** from the family-diversity promotion evidence. The 2026-08-23 change is a bounded editorial subtraction, not a new visual-generation claim.

`DAY BROADSHEET` replaced `TIDE DAY` because it preserved timetable function while removing a suite-level repeated dark-field + rounded-sweep grammar. The current design should not be reopened merely to create activity; reopen only when fresh screenshot evidence, final copy, printing constraints or physical proof exposes a concrete defect.

## Historical QA retained

Older evidence remains historical/process evidence only, including the prior `TIDE DAY` Professional vNext and earlier V2/V3 cleanup runs. Their PASS states do not override the Current pointers above.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs exist:

- final `14:40–15:00` wording;
- exact printer template / bleed / safe-area values;
- font availability and PDF embedding/output proof;
- physical A2/A3 proof;
- venue placement and real viewing-distance check.

These deferred inputs do not block other non-Rurubu design work.