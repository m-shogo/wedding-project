# ADD-08 メニュー補助サイン — Selected Family Japanese-first Cleanup

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `5bb6d19ec147bc6e1e957102202a6e956410eca8`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected Drink V3: `21:3`
- selected Allergy / Dietary V2: `18:19`
- selected World Trip V3: `21:43`
- Drink long-copy stress: `23:34`
- World Trip long-copy stress: `23:75`
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`

## Drink V3 — duplicated English/fake-measure reduction

Fresh actual-size review found several remaining template/infographic signals:

- `DRINK MENU GUIDE` repeated the Japanese title without adding guest information;
- `WEDDING JOURNEY` was decorative footer filler;
- right-side `01` through `06` looked like real measurement/data labels even though they encoded no drink facts;
- `ALCOHOL / SOFT DRINK / GUIDE` added English-first section labeling even though all content is Japanese.

A rollback-safe comparison `27:2 / QA_ADD08_DRINK_V3_JA_FIRST_NO_FAKE_MEASURES_2026_08_18` removed only those textual signals while preserving the dark/teal silhouette, beverage fixed-art curve/ticks, Japanese title, all native placeholders and the footer date.

A second comparison `27:43` tested narrowing the teal art field. It made the cream field feel emptier and reduced the intentional asymmetry, so that geometry was rejected. Only the textual cleanup from `27:2` was adopted.

Adopted selected/stress changes:

- hide `TEXT / KICKER`;
- hide `TEXT / FOOTER NOTE`;
- hide decorative/fake-data `TEXT / MEASURE 1..6`;
- `ALCOHOL` → `アルコール`;
- `SOFT DRINK` → `ソフトドリンク`;
- `GUIDE` → `ご案内`.

Rollback:

- selected pre-change: `27:84`;
- stress pre-change: `27:125`.

Post-readback:

- selected outside visible text: `0`;
- stress outside visible text: `0`;
- IMAGE fills remain `0`;
- all menu/drink facts remain native semantic placeholders;
- the teal fixed-art field remains decorative only and no longer pretends to carry six measured values.

Result: `DRINK_JAPANESE_FIRST_FAKE_MEASURE_SUBTRACTION_PASS`.

## World Trip V3 — guest-facing copy cleanup

Fresh screenshot review found that the strong Japanese title/chapter design was still surrounded by authoring/template language:

- `WORLD TRIP SPECIAL MENU` duplicated the Japanese hero;
- `WEDDING JOURNEY` repeated generic suite branding;
- the intro printed `内容は確定後に編集可能なテキストで更新します。`, which is an implementation instruction rather than guest copy;
- `MENU NOTE` was unnecessary English UI-like labeling;
- the note body described future update mechanics rather than the semantic role.

A rollback-safe comparison `27:166 / QA_ADD08_WORLD_V3_GUEST_COPY_CLEANUP_2026_08_18` tested the bounded cleanup and was visually stronger.

Adopted selected changes:

- hide `WORLD TRIP SPECIAL MENU` and `WEDDING JOURNEY`;
- intro becomes `旅するように味わう、この日のための料理紹介。`;
- `MENU NOTE` → `ご案内`;
- note body becomes native semantic placeholder `[アレルギー・提供に関するご案内]`.

The hidden long-copy stress keeps intentionally expanded chapter bodies and a two-line intro role so copy tolerance is still tested; only decorative English labels were removed there as well.

Rollback:

- selected pre-change: `27:204`;
- stress pre-change: `27:242`.

Post-readback:

- selected outside visible text: `0`;
- stress outside visible text: `0`;
- IMAGE fills remain `0`;
- chapter numbers, typography, editable fixed-art orbit/curve and all menu placeholders remain intact.

Result: `WORLD_TRIP_GUEST_COPY_CLEANUP_PASS`.

## Allergy / Dietary V2 — subtraction rejected

A fresh comparison `27:280 / QA_ADD08_ALLERGY_V2_NO_ENGLISH_KICKER_2026_08_18` hid `ALLERGY / DIETARY INFORMATION`.

Unlike Drink/World Trip, the English category line performs a binding function inside the otherwise empty navy header field. Removing it left a large blank colored band and weakened the artifact at whole-item scale. The comparison was therefore rejected and hidden; selected `18:19` was not changed.

This is evidence that the current rule is not “remove all English.” Reader-facing or binding bilingual copy may stay when the whole-item comparison proves a real function.

## Drive / asset decision

Drive authority was live re-read before the work and remains `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`.

Drive write: `0`.
Image generation: `NOT_REQUIRED`.

The bottleneck was guest-facing hierarchy and fake/template labeling, not missing imagery.

## Current state

Selected family remains:

- Drink Menu Guide → V3 `21:3`;
- Allergy / Dietary Information → V2 `18:19`;
- World Trip Special Menu → V3 `21:43`.

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY` remains valid.
