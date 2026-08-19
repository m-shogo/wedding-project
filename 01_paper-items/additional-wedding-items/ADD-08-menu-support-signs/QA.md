# ADD-08 メニュー補助サイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / DRINK_TICK_UI_SUBTRACTION_PASS / DRINK_INTERNAL_RULE_SUBTRACTION_PASS / ALLERGY_CENTER_SEPARATOR_SUBTRACTION_PASS / WORLD_TRIP_ORBIT_CHECKPOINT_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
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
- World Trip uses a rust title field, three editorial culinary chapters and a single long fixed route curve after target/checkpoint simplification.

No raster IMAGE role is required by the diagnosed visual problems. Variable food, drink, allergy, dietary and operational wording remains native editable text.

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

### World Trip V3

Fresh review found implementation/template language still visible to guests. Decorative English kicker/footer were hidden, intro and note copy were converted to guest-facing Japanese/semantic placeholders, and long-copy remains native.

### Allergy / Dietary V2

A prior bounded comparison hid `ALLERGY / DIETARY INFORMATION`, but the removal left an empty navy header field and weakened whole-item binding. That test was rejected. The bilingual category line remains because it has a proven binding role.

## 2026-08-19 Drink V3 measure-tick subtraction

Fresh whole-item / reading / native `1400×1980` review found twelve short horizontal tick marks repeated down the teal fixed-art field. Because fake `01–06` measure labels had already been removed, these ticks no longer represented guest-facing data and made the field read like a chart or measurement UI.

Adopted state:

- selected `21:3`: `21:10` tick group hidden;
- long-copy `23:34`: `23:41` tick group hidden;
- beverage curves and teal field retained;
- pre-change rollback selected `31:43`, long-copy `31:84`, both hidden.

Post-adoption QA remains whole/read/actual-size PASS, selected/stress outside text `0`, collision `0`, IMAGE `0`.

Detailed evidence: `FIGMA-DRINK-V3-MEASURE-TICK-SUBTRACTION-QA-2026-08-19.md`.

## 2026-08-19 Drink V3 internal-section-rule subtraction

Fresh whole-item / reading / native `1400×1980` review found two full-width dark rules between `アルコール → ソフトドリンク → ご案内`. The sections were already grouped by large vertical rhythm, colored Japanese headings and native text blocks, so the two internal rules had stopped performing a meaningful binding role and instead made the cream field read like a form/table ledger.

Rollback-safe comparison:

- `38:2 / QA_ADD08_DRINK_V3_NO_INTERNAL_SECTION_RULES_2026_08_19`

Only `DECOR / RULE 02` and `DECOR / RULE 03` were hidden. The top rust intro rule remains because it still binds the opening guidance to the beverage content field.

Adopted state:

- selected `21:3`: `23:7 / DECOR / RULE 02` hidden; `23:10 / DECOR / RULE 03` hidden;
- long-copy `23:34`: `23:69 / DECOR / RULE 02` hidden; `23:72 / DECOR / RULE 03` hidden;
- pre-change rollback selected `39:2`, long-copy `39:43`, both hidden;
- comparison `38:2` hidden after adoption.

Post-adoption three-scale QA:

- whole-item ~500px: PASS;
- reading ~1000px: PASS;
- selected actual-size `1400×1980`: PASS;
- long-copy actual-size `1400×1980`: PASS after temporary show, then returned hidden.

Post-adoption structure readback:

- selected visible native text `9`, outside text `0`, text collisions `0`, IMAGE additions `0`;
- long-copy visible native text `9`, outside text `0`, text collisions `0`, IMAGE additions `0`.

Detailed evidence: `FIGMA-DRINK-V3-INTERNAL-RULE-SUBTRACTION-QA-2026-08-19.md`.

## 2026-08-19 Allergy/Dietary V2 center-separator subtraction

Fresh whole-item review found the two-column information field still used a grey dashed center separator. The field is already grouped by a shared mint top rule, shared mint bottom rule, aligned Japanese headings and two clear columns, so the dashed center rule had little binding value and read as a form/table UI divider.

Rollback-safe comparison:

- `37:2 / QA_ADD08_ALLERGY_V2_NO_CENTER_DASHED_SEPARATOR_2026-08-19`

Only the center grey separator was hidden. The comparison was stronger at whole-item scale and preserved column comprehension.

Adopted state:

- selected `18:19`: `18:23 / Vector` hidden;
- long-copy `18:64`: `18:68 / Vector` hidden;
- top/bottom mint rules retained;
- selected pre-change rollback `37:16` hidden;
- stress pre-change rollback `37:30` hidden;
- comparison hidden after adoption.

During long-copy QA, internal `LAYOUT DUMMY` suffixes were also found in the hidden stress proof. A separate pre-cleanup rollback `37:44` was preserved, then the two stress bodies were changed to equally demanding native Japanese semantic stress copy without reducing the text-fit test. Both remain `textAutoResize=HEIGHT`.

Post-adoption QA:

- selected actual size `1400×1980`: PASS;
- selected visible native text `8`, outside text `0`, visible proof-language `0`, IMAGE `0`;
- long-copy native-size-equivalent screenshot: PASS;
- long-copy visible native text `8`, outside text `0`, visible proof-language `0`, IMAGE `0`;
- long-copy proof returned to hidden state.

Detailed evidence: `FIGMA-ALLERGY-V2-CENTER-SEPARATOR-SUBTRACTION-QA-2026-08-19.md`.

## 2026-08-19 World Trip V3 orbit / checkpoint subtraction

Fresh reading-scale review found the World Trip fixed-art column still using two concentric orbit circles plus three small checkpoint dots along the long route curve. The chapters, Japanese title, numbering and route curve already carry the culinary-journey concept, so the circles read as a target/scanner widget and the dots as progress/checkpoint controls without semantic meaning.

Rollback-safe comparisons tested outer-orbit-only removal, both-orbit removal, and checkpoint-dot removal. Removing both orbit circles while retaining the long route curve was strongest. The selected and stress roots were then synchronized to remove both circles and the three non-semantic dots while keeping the route itself.

Adopted state:

- selected orbit `21:48 / 21:49`: hidden;
- selected checkpoint dots `21:52 / 21:53 / 21:54`: hidden;
- selected route curve `21:50`: retained;
- stress orbit `23:80 / 23:81`: hidden;
- stress checkpoint dots `23:84 / 23:85 / 23:86`: hidden;
- stress route curve `23:82`: retained;
- pre-change rollback selected/stress `42:2 / 42:40`, hidden.

Post-adoption selected/stress roots retain visible native text `14`, outside text `0`, IMAGE additions `0`, and one intentional long route vector each. The fixed-art field remains asymmetric without scanner/progress UI semantics.

Detailed evidence: `FIGMA-WORLD-TRIP-V3-ORBIT-CHECKPOINT-SUBTRACTION-QA-2026-08-19.md`.

## Structure / editability QA

Current family requirements remain:

- A4 working size `1400×1980` per selected artifact;
- variable/factual copy remains native editable text;
- no final food/drink/allergy facts are baked into SVG/raster;
- no raster IMAGE fill is required in the selected family;
- long-copy proof remains separate and hidden after review;
- rollback candidates remain preserved;
- legacy is preserved and not overwritten.

Historical structural/visual evidence remains available in Git history and item-specific QA evidence files.

## Drive / image decision

Drive folder live-read on 2026-08-19 and remains `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`.

Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`.

The observed bottlenecks were UI-like fixed vector micro-geometry and evidence-copy drift, not missing photography or illustration.

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

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / DRINK_TICK_UI_SUBTRACTION_PASS / DRINK_INTERNAL_RULE_SUBTRACTION_PASS / ALLERGY_CENTER_SEPARATOR_SUBTRACTION_PASS / WORLD_TRIP_ORBIT_CHECKPOINT_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
