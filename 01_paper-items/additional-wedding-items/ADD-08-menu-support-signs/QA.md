# ADD-08 メニュー補助サイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / DRINK_TICK_UI_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-19
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

Figma file: `xvJH23nWjWAApd3yOwr4y3`

The current selected clean-room family is:

- Drink Menu Guide → V3 `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- Allergy / Dietary Information → V2 `18:19 / CLEANROOM_ADD08_V2_STRONG_A4_ALLERGY_DIETARY`
- World Trip Special Menu Introduction → V3 `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`

Current long-copy evidence:

- Drink V3 → `23:34 / QA_CLEANROOM_ADD08_V3_DRINK_LONG_COPY_STRESS_FINAL_2026_08_15`
- Allergy / Dietary V2 → `18:64 / QA_CLEANROOM_ADD08_V2_A4_ALLERGY_DIETARY_LONG_COPY_STRESS_2026_08_15`
- World Trip V3 → `23:75 / QA_CLEANROOM_ADD08_V3_WORLD_LONG_COPY_STRESS_FINAL_2026_08_15`

Retained legacy production `1:3 / FRAME_MENU_SUPPORT_A4` is historical rollback/comparison evidence only. It is **not** the current selected family and must not be edited as though it were current production.

Exact Drive authority:

- `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`

## Clean-room / visual status

The selected family was authored under the 2026-08-15 zero-reuse clean-room rule. V3 Drink / World Trip and V2 Allergy/Dietary were created without using retained production as a layout/component source. Legacy was used only after candidate completion for comparison.

The family remains visually distinct by role rather than one template repeated three times:

- Drink uses a navy title field, cream beverage ledger and teal fixed-art curve field;
- Allergy / Dietary uses Japanese-first safety hierarchy and a functional bilingual category header;
- World Trip uses a rust title field, three editorial culinary chapters and fixed orbit/route art.

No raster IMAGE role is required by the diagnosed visual problem. Variable food, drink, allergy, dietary and operational wording remains native editable text.

## 2026-08-18 selected-family cleanup

Detailed evidence:

- `FIGMA-SELECTED-FAMILY-JAPANESE-FIRST-CLEANUP-2026-08-18.md`

### Drink V3

Fresh actual-size review found template/infographic text that was not real menu data:

- decorative `DRINK MENU GUIDE`;
- decorative footer `WEDDING JOURNEY`;
- fake measure labels `01`–`06` in the teal fixed-art field;
- English-first `ALCOHOL / SOFT DRINK / GUIDE` section labels.

Rollback-safe comparison proved that removing the decorative/fake-data labels while preserving the wide teal fixed-art field improved the artifact. A second test that narrowed the teal field was rejected because it weakened asymmetry and created excessive cream emptiness.

Adopted result:

- section labels are `アルコール / ソフトドリンク / ご案内`;
- decorative kicker/footer note hidden;
- fake measure labels hidden;
- teal curve artwork preserved as fixed art;
- selected outside visible text `0`;
- long-copy outside visible text `0`;
- IMAGE fills `0`.

Rollback:

- selected `27:84`;
- long-copy `27:125`.

### World Trip V3

Fresh review found implementation/template language still visible to guests:

- `WORLD TRIP SPECIAL MENU` and `WEDDING JOURNEY` repeated the Japanese hierarchy;
- intro contained `内容は確定後に編集可能なテキストで更新します。`;
- `MENU NOTE` was internal/template labeling;
- the note body described future updating rather than the semantic role.

Adopted result:

- decorative English kicker/footer hidden;
- intro is guest-facing `旅するように味わう、この日のための料理紹介。`;
- note label is `ご案内`;
- note body is native semantic placeholder `[アレルギー・提供に関するご案内]`;
- selected outside visible text `0`;
- long-copy outside visible text `0`;
- IMAGE fills `0`.

Rollback:

- selected `27:204`;
- long-copy `27:242`.

### Allergy / Dietary V2

A bounded comparison hid `ALLERGY / DIETARY INFORMATION`, but the removal left an empty navy header field and weakened the whole-item binding. The test was rejected and hidden (`27:280`).

This is intentional: the rule is not “remove all English.” The category line remains because the screenshot comparison proved a real binding/function role in this specific artifact.

## 2026-08-19 Drink V3 measure-tick subtraction

Fresh whole-item / reading / native `1400×1980` review found twelve short horizontal tick marks still repeated down the teal fixed-art field. Because the fake `01–06` measure labels had already been removed, these ticks no longer represented any guest-facing data and made the field read like a chart or measurement UI.

Rollback-safe comparison:

- `31:2 / QA_ADD08_DRINK_V3_NO_MEASURE_TICKS_2026_08_19`

The comparison hid only the 12-vector tick group while preserving the full-width teal field and both cream beverage curves. It was materially cleaner at reading scale without creating the excessive cream emptiness seen in the previously rejected narrow-field test.

Adopted state:

- selected `21:3`: `21:10` tick group hidden;
- long-copy `23:34`: `23:41` tick group hidden;
- beverage curves retained;
- teal field retained;
- comparison hidden after adoption;
- pre-change rollback selected `31:43` hidden;
- pre-change rollback long-copy `31:84` hidden.

Post-adoption QA:

- whole / thumbnail: PASS;
- reading scale: PASS;
- actual size `1400×1980`: PASS;
- long-copy native-size screenshot: PASS and returned to hidden state;
- selected visible native text `9`, IMAGE fills `0`, outside text `0`, same-parent text collisions `0`;
- long-copy visible native text `9`, IMAGE fills `0`, outside text `0`, same-parent text collisions `0`.

Detailed evidence: `FIGMA-DRINK-V3-MEASURE-TICK-SUBTRACTION-QA-2026-08-19.md`.

## Structure / editability QA

Current family requirements remain:

- A4 working size `1400×1980` per selected artifact;
- variable/factual copy remains native editable text;
- no final food/drink/allergy facts are baked into SVG/raster;
- no raster IMAGE fill is required in the selected family;
- long-copy proof remains separate and hidden after review;
- rollback candidates remain preserved;
- legacy is preserved and not overwritten.

Historical structural/visual evidence remains available in:

- `CLEANROOM-V2-COMPARISON-2026-08-15.md`
- `CLEANROOM-V3-DRINK-WORLD-2026-08-15.md`
- `FIGMA-SELECTED-FAMILY-INLINE-PROOF-SUFFIX-REMOVAL-2026-08-17.md`
- earlier reopened production QA files and Git history.

## Drive / image decision

Drive folder live-read on 2026-08-19 and remains `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`.

Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`.

The observed bottleneck was UI-like repeated fixed vector micro-geometry, not missing photography or illustration.

## Deferred finalization

Still `NOT_PRINT_READY` pending authoritative:

- final food and drink copy;
- confirmed allergy/dietary wording and venue-operation guidance;
- final venue/footer wording;
- printer bleed/template/profile;
- 100% physical proof and table/venue visibility check;
- any needed A5 variants must be independently reflowed rather than mechanically scaled from A4.

These are `DEFERRED_FINALIZATION` and do not reopen the current sellable visual family.

## Current decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / DRINK_TICK_UI_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
