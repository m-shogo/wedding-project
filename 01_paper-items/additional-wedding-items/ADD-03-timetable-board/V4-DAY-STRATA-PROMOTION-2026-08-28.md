# ADD-03 — V4 DAY STRATA clean-room promotion

Date: 2026-08-28
Start/main authority: `7fa3f2b6fa5894d46363e48adc0d68534aaf5107`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Figma file: `woFUHUqZcvNkih8o42xeH4`
Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
Scope firewall: non-Rurubu only; no Rurubu item-specific Figma/Drive/GitHub target was read or reused.

## V4 clean-room facts / constraints

The V4 construction started on a new blank page and inherited facts/semantic constraints only:

- A2 `1400×1980`;
- A3 `990×1400`;
- `2026.10.24 SAT`;
- `YOKOHAMA`;
- Ceremony `14:10–14:40`;
- unresolved interval `14:40–15:00`, kept as native placeholder guidance;
- Reception `15:00–17:30`;
- no invented gate/floor/flight/QR/opening-time/transport credential;
- all factual/variable copy remains native text.

No previous production/V2/V3/VNext layout, decorative vector, rail, crop, image or generated asset was used as a visual construction source. The old Current was not visually revealed until V4 independently passed its own QA.

## Clean-room V4

New page:

- `51:2 / V4_CLEANROOM_ADD03_TIMETABLE_2026_08_28`.

A2:

- `51:3 / V4 / ADD-03 / A2 / DAY STRATA / CLEANROOM` — `1400×1980`.

A3 independent reflow:

- `53:2 / V4 / ADD-03 / A3 / DAY STRATA / INDEPENDENT REFLOW` — `990×1400`.

The V4 direction uses the timetable itself as the dominant visual rather than adding tourism imagery or a dashboard-like card system. The reading path is carried by three deliberately unequal time strata plus one narrow chronology thread:

- navy ceremony time field;
- mustard unresolved-interval time field;
- rust reception time field;
- warm paper lanes for all variable guidance;
- separate `17:30` reception-end marker.

Visible title/copy remains Japanese-first and functional: `本日のタイムテーブル` plus the confirmed date/location line.

## Hybrid authoring split

- native text: all date/location/time/event/guidance/end information;
- composed fixed decoration: one semantic `DECOR / COMPOSED / DAY STRATA / NO TEXT` role per size;
- reusable SVG: `0` required;
- generated raster: `0`;
- replaceable IMAGE role: `0`;
- IMAGE fills: `0`;
- page flattening: none.

The composed role contains no authoritative wording.

## FINAL MISSING ASSET LIST

`0 production raster assets missing`.

Fresh diagnosis showed the quality problem is chronology hierarchy / distance readability / variable-copy support, not missing photography or illustration. Adding generated imagery would compete with the timetable and would not solve the observed defect.

Accordingly:

- generation candidates: `0`;
- Drive new asset IDs: none;
- Drive write: `0`.

This is an evidence-based zero-generation decision under the image-generation-centered policy, not a skipped workflow.

## First A2 failure and method switch

The initial fresh thumbnail exposed a real line-break failure: `14:10` wrapped into two lines inside its first time field. It was repaired by widening the native time lane and adjusting the time size without weakening its hierarchy. Redundant top-right/footer helper copy was also removed rather than retained as filler.

The first A2 long-copy proof then exposed a more important failure despite geometric `outside=0`:

- long 14:40 guidance escaped the mustard support field;
- long Reception guidance remained white after leaving the rust field, becoming unreadable on warm paper.

Normalized failure fingerprint: `TEXT_SUPPORT_FIT_FAILURE`.

The failed proof is retained as:

- `51:28 / QA FAILED / ADD-03 V4 A2 / TEXT_SUPPORT_FIT_FAILURE`.

Method switch: color fields were restricted to stable **time emphasis only**, while event/guidance copy was moved/kept on the warm paper field in dark ink. Type size was not reduced to force the copy into a fixed support.

Second A2 stress proof:

- `52:2 / QA / ADD-03 V4 A2 DAY STRATA / LONG COPY STRESS V2`.

A3 stress proof:

- `53:25 / QA / ADD-03 V4 A3 DAY STRATA / LONG COPY STRESS`.

Both were hidden after verification.

## Three-scale / long-copy QA

A2:

- whole/thumbnail ~500px: PASS after the 14:10 repair;
- reading ~1000px: PASS;
- native `1400×1980`: PASS;
- realistic multi-line stress: PASS after text-support method switch.

A3:

- whole/thumbnail ~500px: PASS;
- reading ~1000px: PASS;
- native `990×1400`: PASS;
- realistic multi-line stress: PASS.

The V4 preserves a strong large-time scan path at viewing distance while variable guidance remains on stable paper lanes.

## Structure QA before legacy reveal

A2 production candidate `51:3`:

- visible native text: `13`;
- fixed-height visible text: `0`;
- outside visible text: `0`;
- text bounding-box collisions: `0`;
- IMAGE fills: `0`.

A2 stress `52:2`: same structural result.

A3 production candidate `53:2`:

- visible native text: `13`;
- fixed-height visible text: `0`;
- outside visible text: `0`;
- text bounding-box collisions: `0`;
- IMAGE fills: `0`.

A3 stress `53:25`: same structural result.

## Legacy comparison — only after V4 maturity

Only after all V4 checks above was the retained Current revealed:

- old A2 Current `14:2`;
- old A3 Current `15:40`.

The retained DAY BROADSHEET Current remained clean and readable, but at whole-item scale its three schedule rows were much more equal/repeated and the large full-height blue spine acted as a stronger template signature. The time numerals were also materially smaller relative to the physical board.

V4 is a clear win for this physical timetable role because:

- time numerals dominate immediately at distance;
- the three periods have unequal, intentional visual weight rather than repeated row treatment;
- the chronology thread has a real sequencing function;
- variable guidance remains outside fixed color supports and survives long-copy stress;
- no fake travel credential, badge, card grid, generic English or decorative image was needed.

Decision: `CLEAR_V4_WIN`.

## Promotion / rollback

Previous Current was preserved at:

- `55:2 / ROLLBACK_ADD03_PRE_V4_PROMOTION_2026_08_28`.

Retained Current IDs were then updated from the V4 clean-room sources:

- A2 Current `14:2` ← V4 source `51:3`;
- A3 Current `15:40` ← V4 source `53:2`.

Fresh post-promotion screenshots were reviewed for both retained Current IDs.

Post-promotion readback:

- A2 `14:2`: `1400×1980`, visible native text `13`, fixed-height `0`, outside `0`, IMAGE fills `0`, one `DECOR / COMPOSED / DAY STRATA / NO TEXT` role;
- A3 `15:40`: `990×1400`, visible native text `13`, fixed-height `0`, outside `0`, IMAGE fills `0`, one `DECOR / COMPOSED / DAY STRATA A3 / NO TEXT` role.

## Learning state

`TEXT_SUPPORT_FIT_FAILURE`: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL`.

Locally verified principle: when timetable guidance is variable, a fixed color field should not silently become the text-fit contract unless its long-copy envelope is proven. For this item, keeping variable guidance on stable paper and using color primarily for fixed time emphasis preserved both hierarchy and resilience.

Do not transfer the exact navy/mustard/rust fields, coordinates, title treatment or chronology layout to another item. Only the failure fingerprint and QA method may transfer.

## State

`V4_DAY_STRATA_SELECTED / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEAR_LEGACY_WIN / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

`NOT_PRINT_READY` remains because final 14:40–15:00 wording, exact printer bleed/safe-area template, PDF/font embedding proof, physical A2/A3 proof and real venue viewing-distance proof are still deferred.

## Next safe target

Proceed to `ADD-04` as a new V4 blank-frame clean-room item. Do not reuse DAY STRATA as a suite template.