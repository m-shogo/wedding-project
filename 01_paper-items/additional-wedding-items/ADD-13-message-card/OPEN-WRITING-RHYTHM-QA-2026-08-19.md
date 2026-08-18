# ADD-13 メッセージカード — Open Writing Rhythm QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `de61bc39e80220edaa180223b8441fc2fca31f8c`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- selected V6 front/back: `27:3 / 27:4`
- hidden long-copy front/back: `27:35 / 27:51`
- Drive authority: `ADD-13_Message_Card / 1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- exact Drive metadata was live-read before the Figma write; Drive write `0`.

## Visible problem

Fresh selected review found the handwriting areas using evenly repeated horizontal guides at relatively high density:

- front: seven equal writing rules;
- back: six equal writing rules.

The semantic writing areas were already large enough and the rules were not required for trim, fold, scan, or any other physical contract. At whole-item scale the repeated equal lines pushed the card toward a form/notepad reading instead of the more open postcard/message-card behavior intended by V6.

## Bounded comparison

Rollback-safe comparison copies were created without changing selected production:

- front `42:2 / QA_ADD13_V6_OPEN_WRITING_RHYTHM_FRONT_2026_08_19`;
- back `42:20 / QA_ADD13_V6_OPEN_WRITING_RHYTHM_BACK_2026_08_19`.

Only every second writing guide was hidden:

- front: keep guides 1 / 3 / 5 / 7 → four visible guides;
- back: keep guides 1 / 3 / 5 → three visible guides.

No title, theme/prompt, name/date role, writing-area geometry, page size, typography, postal edge, palette, image role, or semantic field changed.

The comparison was stronger at whole/reading scale: the handwriting area reads as open paper first, while still retaining enough guidance for guests to write comfortably.

## Adoption / rollback

Before selected mutation, hidden rollbacks were saved:

- `42:36 / ROLLBACK_ADD13_FRONT_PRE_OPEN_WRITING_RHYTHM_2026_08_19`;
- `42:54 / ROLLBACK_ADD13_BACK_PRE_OPEN_WRITING_RHYTHM_2026_08_19`;
- `42:70 / ROLLBACK_ADD13_FRONT_STRESS_PRE_OPEN_WRITING_RHYTHM_2026_08_19`;
- `42:87 / ROLLBACK_ADD13_BACK_STRESS_PRE_OPEN_WRITING_RHYTHM_2026_08_19`.

The same guide visibility change was applied to selected and long-copy stress so QA evidence matches the live selected state. Comparison copies were hidden after adoption.

## Three-scale / structure QA

Fresh selected screenshots:

- front reading-scale `1400×993` source reviewed at 700px long edge: PASS;
- back actual-size `1400×993`: PASS.

Post-write structure readback:

- selected front `27:3`: visible text `5`, visible guides `4`, IMAGE fills `0`, outside text `0`, text collision `0`, writing area `900×870 = 56.32%` of root;
- selected back `27:4`: visible text `4`, visible guides `3`, IMAGE fills `0`, outside text `0`, text collision `0`, writing area `1240×650 = 57.98%` of root;
- front stress `27:35`: visible guides `4`, outside text `0`, text collision `0`;
- back stress `27:51`: visible guides `3`, outside text `0`, text collision `0`.

The SPEC minimum handwriting area of 55% remains satisfied on both faces. All variable copy remains native/editable and no raster/image asset was introduced.

## Result

`OPEN_WRITING_RHYTHM_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LONG_COPY_STRESS_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRESERVED / NOT_PRINT_READY`
