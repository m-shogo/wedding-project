# ADD-03 当日タイムテーブルボード — QA

Status: `CURRENT / V4_DAY_STRATA_SELECTED / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEAR_LEGACY_WIN / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-28
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Primary evidence: `V4-DAY-STRATA-PROMOTION-2026-08-28.md`

## Current Figma authority

Figma file: `woFUHUqZcvNkih8o42xeH4`.

Current retained production roots:

- A2 Current: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED` — now contains selected V4 DAY STRATA, `1400×1980`;
- A3 Current: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED` — now contains selected V4 DAY STRATA independent reflow, `990×1400`.

V4 clean-room / QA authority:

- page `51:2 / V4_CLEANROOM_ADD03_TIMETABLE_2026_08_28`;
- A2 clean-room source `51:3 / V4 / ADD-03 / A2 / DAY STRATA / CLEANROOM`;
- A3 clean-room source `53:2 / V4 / ADD-03 / A3 / DAY STRATA / INDEPENDENT REFLOW`;
- failed first A2 stress retained as `51:28 / QA FAILED / ADD-03 V4 A2 / TEXT_SUPPORT_FIT_FAILURE`;
- passing A2 stress `52:2 / QA / ADD-03 V4 A2 DAY STRATA / LONG COPY STRESS V2`;
- passing A3 stress `53:25 / QA / ADD-03 V4 A3 DAY STRATA / LONG COPY STRESS`;
- pre-V4 production rollback `55:2 / ROLLBACK_ADD03_PRE_V4_PROMOTION_2026_08_28`.

Older DAY BROADSHEET / TIDE DAY / V2/V3/VNext studies and historical QA remain preserved as comparison/process history only and are no longer the Current visual source.

Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`.

## Fact / placeholder contract

Confirmed facts only:

- date: `2026.10.24 SAT`;
- location: `YOKOHAMA`;
- Ceremony: `14:10–14:40`;
- unresolved interval: `14:40–15:00`; final activity/guidance wording remains native placeholder copy;
- Reception: `15:00–17:30`.

Do not invent opening time, venue floor, gate, flight number, QR, transport credential or other operational fact.

## Current V4 visual direction

`DAY STRATA` is a large-format timetable poster whose visual hierarchy is the chronology itself rather than decorative travel imagery or a repeated dashboard/card system.

Reading order:

1. `本日のタイムテーブル`;
2. `2026.10.24 SAT · YOKOHAMA`;
3. large navy `14:10` ceremony time field;
4. offset mustard `14:40` unresolved-guidance time field;
5. large rust `15:00` reception time field;
6. separate `17:30` reception-end marker.

A narrow chronology thread binds the three time fields. Variable event/guidance copy sits on stable warm paper rather than being forced into fixed-height color supports.

## Image-generation / hybrid authoring

`FINAL MISSING ASSET LIST: 0 production raster assets missing`.

Fresh diagnosis found chronology hierarchy, distance readability and text-support resilience—not missing photography/illustration—to be the quality bottleneck.

- native text: all authoritative / variable wording;
- semantic composed fixed art: one `DECOR / COMPOSED / DAY STRATA ... / NO TEXT` role per size;
- generated raster candidates: `0`;
- reusable SVG: `0` required;
- replaceable IMAGE fills: `0`;
- Drive write: `0`.

This is a deliberate image-generation-centered zero-generation decision, not a skipped asset workflow.

## Long-copy failure and repair

The first A2 long-copy proof reproduced `TEXT_SUPPORT_FIT_FAILURE`: variable 14:40 guidance escaped the mustard field and long white reception guidance became unreadable after leaving the rust field.

The failed proof is preserved at `51:28`.

Method switch:

- do not shrink type;
- restrict colored strata to fixed time emphasis;
- keep variable guide copy on stable warm paper lanes in dark ink.

Second A2 proof `52:2` and A3 proof `53:25` both pass with realistic multi-line QA copy.

## Three-scale / structure QA

A2:

- thumbnail ~500px: PASS;
- reading ~1000px: PASS;
- native `1400×1980`: PASS;
- long-copy stress: PASS after method switch.

A3:

- thumbnail ~500px: PASS;
- reading ~1000px: PASS;
- native `990×1400`: PASS;
- long-copy stress: PASS.

Current post-promotion structure:

- A2 `14:2`: visible native text `13`, fixed-height `0`, outside visible text `0`, IMAGE fills `0`;
- A3 `15:40`: visible native text `13`, fixed-height `0`, outside visible text `0`, IMAGE fills `0`.

No variable copy is baked into fixed art and no page flattening was introduced.

## Legacy comparison / promotion

The retained previous Current was visually opened only after V4 passed its own three-scale, long-copy and structure gates.

The old DAY BROADSHEET remained readable, but its schedule rows were more equal/repeated, the full-height blue spine acted as a stronger template signature, and the time numerals were weaker for the physical board’s distance-reading role.

Decision: `CLEAR_V4_WIN`.

Before production mutation, old Current A2/A3 were preserved at `55:2`. Existing Current root IDs `14:2 / 15:40` were retained and populated from the selected V4 clean-room sources. Fresh post-promotion screenshots and structure readback pass.

## Learning state

`TEXT_SUPPORT_FIT_FAILURE`: `VERIFIED_LOCAL` for ADD-03.

Transferable only as a QA hypothesis: when a variable auto-height copy role depends on a fixed decorative support, realistic long-copy must prove the support boundary/contrast. Do not transfer ADD-03’s exact palette, strata geometry, chronology thread or title treatment to another item.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs exist:

- final `14:40–15:00` wording;
- exact printer template / bleed / safe-area values;
- font availability and PDF embedding/output proof;
- physical A2/A3 proof;
- venue placement and real viewing-distance check.

These deferred inputs do not block continuing the V4 clean-room queue.

## Next target

`ADD-04` V4 clean-room. Start from blank; do not reuse DAY STRATA as a suite template.