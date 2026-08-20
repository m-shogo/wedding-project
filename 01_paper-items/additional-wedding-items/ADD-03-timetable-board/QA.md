# ADD-03 当日タイムテーブルボード — QA

Status: `CURRENT / VNEXT_PRO_TIDE_DAY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

Figma file: `woFUHUqZcvNkih8o42xeH4`.

Current selected Professional vNext family:

- A2 selected: `14:2 / VNEXT_PRO_ADD03_TIDE_DAY_A2_SELECTED` — `1400×1980`;
- A3 selected: `15:40 / VNEXT_PRO_ADD03_TIDE_DAY_A3_SELECTED` — `990×1400`;
- vNext source page: `36:2 / VNEXT_PRO / ADD-03 / DAY OF JOURNEY / 2026-08-21`;
- selected A2 clean-room master: `36:20 / VNEXT_SELECTED_CANDIDATE / ADD-03 A2 / TIDE DAY`;
- selected A3 clean-room master: `37:2 / VNEXT_SELECTED_CANDIDATE / ADD-03 A3 / TIDE DAY REFLOW`;
- vNext A2 long-copy proof: `37:22 / QA / ADD-03 VNEXT A2 / LONG COPY STRESS` — hidden after QA;
- vNext A3 long-copy proof: `37:42 / QA / ADD-03 VNEXT A3 / LONG COPY STRESS` — hidden after QA;
- exact pre-vNext selected rollback: `40:111 / ROLLBACK / ADD-03 / PRE-VNEXT-PROMOTION / 2026-08-21`;
- older legacy production remains untouched: `1:5 / FRAME_TIMETABLE_BOARD`.

Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`.

Primary vNext evidence: `FIGMA-VNEXT-PRO-TIDE-DAY-PROMOTION-2026-08-21.md`.

## Current visual direction

`TIDE DAY / ONE CONTINUOUS DAY` treats the timetable as one continuous wedding-day movement rather than cards, a data chart, or simulated transport UI.

Current first-glance hierarchy:

1. `今日を、めぐる。` + `2026.10.24 SAT / YOKOHAMA`;
2. large `14:10` + `挙式`;
3. `14:40` + unresolved `14:40–15:00` native guidance;
4. large `15:00` + `披露宴`;
5. warm closing copy.

The deep-ocean field provides distance contrast while cyan/yellow/coral tide gestures create wedding-trip movement. The large fixed fields are deliberately bounded away from expanded variable-copy lanes after long-copy QA. No event cards, fake flight/gate/class data, barcode, route nodes, repeated badges, shadows, gradients or generated imagery are required.

## Clean-room vNext provenance

The 2026-08-21 Professional vNext pass started from blank frames and reused only factual/non-visual requirements:

- A2 `1400×1980` and A3 `990×1400` working formats;
- confirmed date/location;
- confirmed Ceremony and Reception intervals;
- unresolved `14:40–15:00` semantic guidance role;
- print/readability constraints.

Three independent blank-frame A2 directions were made before selection:

- `36:3 / SUN PATH / DAYLIGHT SCORE`;
- `36:20 / TIDE / ONE CONTINUOUS DAY`;
- `36:40 / WIND CLOCK / BIG TYPE`.

`TIDE` was selected because it provided the best balance of emotional excitement, chronology, long-distance readability and travel/Hawaii warmth without using fake airline vocabulary. The retained prior selected design was opened only after the new candidate passed its own screenshot/structure/stress QA.

## Professional visual judgment

Professional Design Council score: `92 / 100`.

The prior `DAY INDEX / CHRONOGRAPHIC SHEET` remains competent editorial history, but the new TIDE DAY family clearly wins the explicit current brief for stronger pop, travel energy, celebration and memorable large-format presence while keeping time information immediate.

Current state therefore holds:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

## Structure / stress QA

Post-promotion current selected readback:

- A2 `14:2`: `1400×1980`, `clipsContent=true`, visible native text `15`, auto-height `15/15`, IMAGE fills `0`, outside visible text `0`;
- A3 `15:40`: `990×1400`, `clipsContent=true`, visible native text `15`, auto-height `15/15`, IMAGE fills `0`, outside visible text `0`;
- all factual/variable roles remain native editable text;
- no variable copy is baked into SVG/raster.

Realistic long-copy stress on `37:22 / 37:42` initially revealed fixed cyan/coral tide fields entering expanded Ceremony/Reception copy lanes. Only those fixed field widths were reduced. Facts, typography, time positions and semantic roles were unchanged.

After the bounded repair:

- A2/A3 stress screenshots PASS;
- Ceremony/Reception expanded guidance keeps a stable dark-navy copy lane;
- transfer expanded guidance remains clear of the yellow time field;
- stress roots keep auto-height native text and outside visible text `0`;
- stress proofs are hidden after verification.

This consumes the existing cross-item QA rule that dynamic copy must be revalidated against fixed decoration; it does not introduce a new shared-learning claim.

## Fact / placeholder contract

Confirmed facts only:

- date: `2026.10.24 SAT`;
- location: `YOKOHAMA`;
- Ceremony: `14:10–14:40`;
- transfer interval: `14:40–15:00`, activity remains unresolved and represented only through native semantic guidance;
- Reception: `15:00–17:30`.

Do not invent opening time, venue floor, gate, flight number, QR, transport credential or other operational fact. Unknown guidance stays native editable placeholder copy.

## Hybrid authoring / Drive

- native text: factual/variable copy;
- editable Figma geometry: fixed tide movement fields;
- reusable SVG: `0` needed;
- generated raster: `0`;
- replaceable IMAGE fills: `0`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: screenshot diagnosis showed that chronology, scale, movement and viewing-distance readability were the actual design bottlenecks. Photography/illustration would compete with the timetable rather than solve that problem.

## Historical QA retained

Previous clean-room V2 evidence remains valid as historical structure/process evidence only and is preserved in Git history, including:

- `CLEANROOM-V2-DAY-INDEX-QA-2026-08-15.md`;
- `FIGMA-CLEANROOM-V2-NATIVE-TEXT-RESILIENCE-JA-TITLE-2026-08-17.md`;
- `FIGMA-GENERIC-ENGLISH-CLOSING-REMOVAL-2026-08-18.md`;
- `FIGMA-REDUNDANT-DURATION-CONNECTOR-SUBTRACTION-QA-2026-08-19.md`;
- `FIGMA-REDUNDANT-TBD-STATUS-REMOVAL-QA-2026-08-19.md`.

Those older PASS states do not substitute for the current vNext visual evidence above.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs exist:

- final `14:40–15:00` wording;
- exact printer template / bleed / safe-area values;
- font availability and PDF embedding/output proof;
- physical A2/A3 proof;
- venue placement and approximately 1.5–2m viewing-distance check.

These deferred items do not block progression to ADD-04. Reopen the current selected family only if a fresh screenshot or authoritative input exposes a concrete defect.