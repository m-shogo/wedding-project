# ADD-08 World Trip V3 — paper-field subtraction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / PRODUCTION_ADOPTED / LONG_COPY_STRESS_PASS / PROOF_LANGUAGE_CLEANUP_PASS / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Start authority SHA: `1ec1487d892a909812c6355a65dddfd4c075f2f0`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected World Trip V3: `21:43`
- long-copy proof: `23:75`
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`

## Visible problem

After earlier removal of target-like orbit circles and checkpoint dots, fresh whole-item review showed a second containment issue: `21:45 / DECOR / PAPER CHAPTER FIELD`, a `1010×1320` near-white rectangle, enclosed almost the entire chapter content even though the page background was already a compatible warm cream.

The rectangle no longer provided essential contrast or physical-paper semantics. Instead it made the editorial chapter stack read as one large card placed inside another page.

## Bounded comparison

Created selected comparison:

- `44:2 / QA / ADD-08 WORLD TRIP V3 / NO PAPER CHAPTER FIELD / 2026-08-19`.

Only the large paper chapter field was hidden. The rust title field, Japanese title/intro, three native chapter groups, date and the single long route curve remained unchanged.

Whole-item result: PASS and stronger. Without the rectangle, the three chapters read directly on the paper surface, while the rust masthead and right-side route still give clear structure and asymmetry.

## Long-copy verification

Created matching stress comparison:

- `44:40 / QA / ADD-08 WORLD TRIP V3 / NO PAPER FIELD LONG COPY / 2026-08-19`.

The no-field layout retained all fourteen visible native text roles with outside text `0`.

During actual-size inspection, the hidden long-copy proof also exposed stale internal authoring language (`LAYOUT DUMMY`) that no longer matched Current's guest-facing semantic-placeholder rule. Before cleanup, the entire stress root was preserved in rollback. Stress text was then replaced with equal-or-greater native Japanese semantic text mass, including long料理名/産地/食材/背景説明 and multi-line operational guidance. No final menu facts were invented.

Post-cleanup actual-size `1400×1980` screenshot: PASS.

## Adoption / rollback

Before mutation, hidden rollbacks were created:

- `45:2 / ROLLBACK / ADD-08 WORLD TRIP V3 / PRE_PAPER_FIELD_SUBTRACTION / 2026-08-19`;
- `45:40 / ROLLBACK / ADD-08 WORLD TRIP V3 STRESS / PRE_PAPER_FIELD_SUBTRACTION / 2026-08-19`.

Adopted state:

- selected `21:43`: paper chapter field hidden;
- stress `23:75`: paper chapter field hidden;
- stress authoring/proof language replaced with guest-facing semantic stress copy while preserving long-copy pressure;
- comparisons `44:2 / 44:40` hidden after adoption;
- long-copy proof returned to hidden state after screenshot QA.

## Structure QA

Selected `21:43`:

- visible native text: `14`;
- IMAGE fills: `0`;
- outside visible text: `0`;
- visible text collisions: `0`;
- visible proof-language count: `0`.

Stress `23:75`:

- visible native text during QA: `14`;
- IMAGE fills: `0`;
- outside visible text: `0`;
- visible text collisions: `0`;
- visible `LAYOUT DUMMY / DUMMY / QA / PROOF / TEMP`: `0`.

No rasterization or variable-copy flattening was introduced.

## Drive / image decision

Exact Drive folder was live-read immediately before mutation and matched authority. Drive write: `0`.

Image generation: `0`. The screenshot-supported defect was unnecessary containment and evidence-copy drift, not missing imagery.

## Decision

`WORLD_TRIP_PAPER_FIELD_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / PROOF_LANGUAGE_CLEANUP_PASS`.

This is consistent with the existing binding-function rule: a large field should remain only when it has a real contrast, grouping, physical or semantic job. The exact rust/cream layout and route treatment remain ADD-08-specific.