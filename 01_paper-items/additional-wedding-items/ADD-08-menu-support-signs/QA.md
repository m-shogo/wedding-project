# ADD-08 メニュー補助サイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / ALLERGY_JAPANESE_FIRST_CATEGORY_PASS / WORLD_TRIP_TITLE_FIELD_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-20
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

Figma file: `xvJH23nWjWAApd3yOwr4y3`

Current selected clean-room family:

- Drink Menu Guide → V3 `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- Allergy / Dietary Information → V2 `18:19 / CLEANROOM_ADD08_V2_STRONG_A4_ALLERGY_DIETARY`
- World Trip Special Menu Introduction → V3 `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`

Current long-copy evidence:

- Drink V3 → `23:34 / QA_CLEANROOM_ADD08_V3_DRINK_LONG_COPY_STRESS_FINAL_2026_08_15`
- Allergy / Dietary V2 → `18:64 / QA_CLEANROOM_ADD08_V2_A4_ALLERGY_DIETARY_LONG_COPY_STRESS_2026_08_15`
- World Trip V3 → `23:75 / QA_CLEANROOM_ADD08_V3_WORLD_LONG_COPY_STRESS_FINAL_2026_08_15`

Retained legacy production `1:3 / FRAME_MENU_SUPPORT_A4` remains rollback/history only.

Exact Drive authority, live-read before this reconciliation:

- `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Drive write: `0`.

## Current clean-room visual family

The three selected artifacts intentionally do not repeat one template:

- **Drink V3** — navy/cream beverage ledger with a broad teal fixed-art field; Japanese section labels and simplified curve artwork.
- **Allergy / Dietary V2** — Japanese-first safety sign with a functional navy binding field, two clearly separated information columns and restrained mint rules.
- **World Trip V3** — rust Japanese title on one continuous paper surface, three editorial culinary chapters and one long navy route curve.

All variable/factual menu, drink, allergy, dietary and operational wording remains native editable Figma text. Current selected family uses IMAGE fills `0`; no raster or generated production asset is required by the diagnosed defects.

## Current adopted visual refinements

### Drink V3 — retained 2026-08-18/19 cleanup

The selected Drink V3 has already removed non-semantic infographic/UI residue while preserving the fixed teal art field:

- decorative `DRINK MENU GUIDE` and `WEDDING JOURNEY` filler hidden;
- fake measure labels `01–06` hidden;
- section labels are Japanese-first `アルコール / ソフトドリンク / ご案内`;
- twelve non-semantic measure ticks hidden;
- internal full-width section rules 02/03 hidden because spacing/headings already group the sections;
- one opening rule remains because it still binds the intro to the beverage content field;
- beverage curves and teal fixed-art field retained.

Three-scale and long-copy evidence remains PASS with outside visible text `0`, collisions `0`, IMAGE `0`.

Evidence:

- `FIGMA-SELECTED-FAMILY-JAPANESE-FIRST-CLEANUP-2026-08-18.md`
- `FIGMA-DRINK-V3-MEASURE-TICK-SUBTRACTION-QA-2026-08-19.md`
- `FIGMA-DRINK-V3-INTERNAL-RULE-SUBTRACTION-QA-2026-08-19.md`

### Allergy / Dietary V2 — Japanese-first category binding adopted 2026-08-20

A previous bounded test showed that removing the navy top category field entirely weakened page binding, so the field remains. The remaining defect was the isolated English label `ALLERGY / DIETARY INFORMATION` above otherwise Japanese-first operational content.

Adopted native text:

- selected `18:24 / TXT_MENU_CATEGORY` → `アレルギー・食事制限のご案内`;
- stress `18:69 / TXT_MENU_CATEGORY` → same wording.

Rollback / comparison:

- comparison `48:2` hidden after adoption;
- pre-change rollback `49:2 / 49:16` hidden/preserved.

Current selected/stress readback from the 2026-08-20 evidence:

- visible native text `8 / 8`;
- outside visible text `0 / 0`;
- same-parent text collisions `0 / 0`;
- visible proof language `0 / 0`;
- IMAGE fill nodes `0 / 0`.

Fresh live ~500px screenshot in this run: PASS. The navy field still performs a real binding role; only the generic language mismatch was removed.

Evidence: `FIGMA-ALLERGY-V2-JAPANESE-CATEGORY-LABEL-QA-2026-08-20.md`.

### World Trip V3 — title containment subtraction adopted 2026-08-20

After earlier target/checkpoint cleanup, the remaining `1400×410` rust title rectangle still behaved like a large web/header section and separated the Japanese title from the paper more strongly than necessary.

Bounded comparisons tested:

- `47:78` shallow rust field;
- `47:116` no field / native rust typographic title.

The typographic-only direction was stronger and adopted:

- `DECOR / RUST TITLE FIELD` hidden in selected/stress;
- native rust `TEXT / TITLE` at `y=72`;
- native `TEXT / INTRO` at `y=348`;
- chapter content, semantic placeholders, route vector and date preserved.

Rollback:

- selected pre-change `47:154` hidden;
- stress pre-change `47:192` hidden;
- comparisons hidden after adoption.

Current selected/stress readback from the 2026-08-20 evidence:

- visible native text `14 / 14`;
- outside visible text `0 / 0`;
- same-parent text collisions `0 / 0`;
- proof language `0 / 0`;
- IMAGE fills `0 / 0`.

Fresh live ~500px screenshot in this run: PASS. The page now reads as one editorial paper surface rather than a colored web-header plus content section.

Evidence: `FIGMA-WORLD-TRIP-V3-TITLE-FIELD-SUBTRACTION-QA-2026-08-20.md`.

## Retained 2026-08-19 simplification evidence

The following validated changes remain part of the current family and were not reverted:

- Allergy/Dietary dashed center separator removed while top/bottom mint grouping rules remain;
- World Trip orbit circles and non-semantic checkpoint dots removed while the single long route curve remains;
- hidden long-copy proofs use semantic Japanese stress text rather than guest-visible `LAYOUT DUMMY` language.

Evidence:

- `FIGMA-ALLERGY-V2-CENTER-SEPARATOR-SUBTRACTION-QA-2026-08-19.md`
- `FIGMA-WORLD-TRIP-V3-ORBIT-CHECKPOINT-SUBTRACTION-QA-2026-08-19.md`

## Structure / editability QA

Current family contract:

- A4 working size `1400×1980` per selected artifact;
- variable/factual copy remains native editable text;
- no final food/drink/allergy facts are baked into SVG/raster;
- selected family IMAGE fills `0`;
- long-copy proofs remain separate and hidden after review;
- rollback/comparison candidates remain preserved;
- legacy remains preserved and is not overwritten.

No fresh live screenshot in this run exposed a defect requiring a new clean-room version. The two stale 2026-08-20 item-specific adoptions are now reflected by this Current QA file.

## Hybrid authoring / image decision

- variable/factual content: native editable Figma text;
- fixed curves/rules/fields: editable native vector/geometry;
- generated/composed raster: `0`;
- replaceable image role: not required;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: current defects were generic-English hierarchy and excessive containment/UI-like vector treatment, not missing photography, illustration or paper texture.

## Deferred finalization

Still `NOT_PRINT_READY` pending authoritative:

- final food and drink copy;
- confirmed allergy/dietary wording and venue-operation guidance;
- final venue/footer wording;
- printer bleed/template/profile;
- 100% physical proof and table/venue visibility check;
- any A5 variants must be independently reflowed rather than mechanically scaled from A4.

These are `DEFERRED_FINALIZATION` and do not reopen the current sellable visual family.

## Current decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / ALLERGY_JAPANESE_FIRST_CATEGORY_PASS / WORLD_TRIP_TITLE_FIELD_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-09 ゲストブックサイン`.
