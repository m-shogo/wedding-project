# ADD-08 World Trip V3 — title-field subtraction QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE`
Start/live authority SHA immediately before Figma write: `371143b9d6f1d995298a08080f92fefd7734a021`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected World Trip V3: `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`
- long-copy proof: `23:75 / QA_CLEANROOM_ADD08_V3_WORLD_LONG_COPY_STRESS_FINAL_2026_08_15`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Drive metadata was live-read before the design work; Drive writes: `0`.

## Visible problem

Fresh whole/read/actual-size review showed that the World Trip V3 hierarchy had matured after earlier subtraction of generic English, the oversized chapter containment field, target-like orbit circles and non-semantic checkpoint dots. However, the top `1400×410` rust rectangle still behaved like a large web/header section around the Japanese title.

The native title, intro, three editorial chapters and the remaining single route curve were already sufficient to establish the item. The field occupied roughly one-fifth of the page height and separated the title from the rest of the paper more strongly than the content hierarchy required.

This was a containment-mass problem, not a missing-image problem.

## Bounded comparison

Selected production was not changed during evaluation. Two rollback-safe comparison duplicates were created:

1. `47:78 / QA_ADD08_WORLD_V3_SHALLOW_TITLE_FIELD_2026_08_20`
   - title field reduced from `410px` to `320px`;
   - title/intro moved upward;
   - rust field retained.
2. `47:116 / QA_ADD08_WORLD_V3_TYPOGRAPHIC_TITLE_NO_FIELD_2026_08_20`
   - title field hidden;
   - native title changed from white to the existing item-specific rust color;
   - title moved to `y=72`;
   - intro moved to `y=348`;
   - all chapter content, route geometry, date, placeholders and type sizes otherwise preserved.

The shallow-field version reduced the section mass but still read as a header band. The typographic-only version was stronger: the title became part of one continuous paper surface, while the rust title, numbered chapter rhythm and navy route retained enough identity and asymmetry without a web-section container.

No Rurubu item-specific design, asset, palette or layout was inspected or copied. The neutral containment/binding QA principle was used only as a hypothesis and independently tested here.

## Adoption / rollback

Before selected mutation, full hidden rollback copies were preserved:

- `47:154 / ROLLBACK_ADD08_WORLD_V3_PRE_TYPOGRAPHIC_TITLE_2026_08_20`
- `47:192 / ROLLBACK_ADD08_WORLD_V3_STRESS_PRE_TYPOGRAPHIC_TITLE_2026_08_20`

Adopted selected/stress change:

- `DECOR / RUST TITLE FIELD` → hidden;
- `TEXT / TITLE` remains native editable text, existing rust color, `y=72`;
- `TEXT / INTRO` remains native editable text, `y=348`;
- no title wording, chapter wording, placeholder, chapter geometry, route vector, date or semantic role was removed.

Comparison nodes `47:78 / 47:116` were hidden after adoption.

## Three-scale QA

Selected `21:43`:

- whole-item / 500px: PASS;
- reading / 1000px: PASS;
- native actual-size `1400×1980`: PASS.

Long-copy `23:75` was temporarily revealed and reviewed at native `1400×1980`, then returned to hidden state: PASS.

Post-adoption structural readback for selected and stress:

- visible native text: `14` each;
- visible text outside root: `0 / 0`;
- same-parent text collision: `0 / 0`;
- visible proof-language: `0 / 0`;
- IMAGE fill nodes: `0 / 0`;
- rust title field visible: `false / false`;
- title remains native and uses the existing rust solid fill;
- stress returned to hidden QA state after review.

## Hybrid / image decision

- variable/factual copy remains native Figma text;
- fixed route decoration remains editable vector;
- generated asset required: `0`;
- IMAGE fill added: `0`;
- Drive writes: `0`.

Image generation was not used because the screenshot-supported defect was excessive section containment, not missing hero/background imagery.

## Decision

`ADOPTED / WORLD_TRIP_TITLE_FIELD_SUBTRACTION_PASS`.

World Trip V3 remains part of the selected clean-room ADD-08 family and continues to hold `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`.

This result is item-specific. It does not mean colored title fields should be removed globally; a field should remain when it has a proven contrast, binding, physical, or copy-reserve role.