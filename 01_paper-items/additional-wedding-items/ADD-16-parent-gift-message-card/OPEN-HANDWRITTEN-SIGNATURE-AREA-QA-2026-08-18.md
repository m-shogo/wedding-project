# ADD-16 両親贈呈品メッセージカード — Open handwritten signature area QA

Status: `VERIFIED_LOCAL / SELECTED_V3_UPDATED / LONG_COPY_STRUCTURE_PRESERVED / LEGACY_PRESERVED`
Date: 2026-08-18
Start main SHA: `16ac2ff4db5d18abd99cea8315b3af24142c07f6`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- clean-room page: `18:2 / CLEANROOM / ADD-16 / V3 HOME HORIZON / 2026-08-17`
- selected back: `18:14`
- hidden long-copy back: `18:37`
- retained legacy: `1:2 / 1:13` — untouched
- Drive authority: `ADD-16_両親贈呈品メッセージカード / 1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`

## Visible issue

Fresh selected-back review originally showed the optional handwritten-signature role as a complete thin rectangular border around an otherwise quiet open paper field. The rectangle did not carry trim, export, scan, perforation or other physical semantics, so it read more like a form field than a family-facing stationery surface.

A later 2026-08-18 actual-size review found a second residue after the border had already been removed: the visible helper copy `自筆署名欄（任意）` remained printed inside the open area. The semantic signature role was already communicated by native `[ふたりの署名]` and the reserved `AREA_HANDWRITTEN_SIGNATURE` geometry, so the helper line now read as implementation/form language rather than family-facing copy.

## Bounded rollback-safe tests

Original containment test:

- `28:2 / QA / ADD-16 / OPEN HANDWRITTEN SIGNATURE AREA / 2026-08-18`
- `AREA_HANDWRITTEN_SIGNATURE` kept its full `260×120` semantic geometry while its visible stroke was removed.

Follow-up helper-label test:

- `33:2 / QA / ADD16 / BACK / QUIET SIGNATURE AREA / 2026-08-18`
- only `META / HANDWRITTEN / 自筆署名欄（任意）` was hidden;
- `[ふたりの署名]`, date, message hierarchy, mint horizon/origin mark and semantic writing-area geometry were preserved.

The follow-up comparison was stronger at whole/reading scale because the lower field became a quiet letter/signature area rather than a labeled form control. No family identity or final signature content was invented.

## Promotion / rollback

Original pre-change copies remain:

- selected back rollback: `28:14 / ROLLBACK / ADD-16 / BACK PRE-OPEN-SIGNATURE-AREA / 2026-08-18`
- stress back rollback: `28:26 / ROLLBACK / ADD-16 / BACK STRESS PRE-OPEN-SIGNATURE-AREA / 2026-08-18`

Before the follow-up helper-label change, another exact hidden rollback was created:

- `33:14 / ROLLBACK / ADD16 / BACK / PRE_QUIET_SIGNATURE_AREA / 2026-08-18`

The verified follow-up was applied only to selected back `18:14`. Comparison `33:2` was hidden after adoption. Front `18:3`, retained legacy `1:2 / 1:13`, and all family/final copy remain unchanged.

## Structure QA

Selected back now preserves:

- `AREA_HANDWRITTEN_SIGNATURE`: x `370`, y `835`, `260×120`, semantic geometry retained, visible strokes `0`;
- `META / HANDWRITTEN`: hidden from guest-facing output;
- native `[ふたりの署名]` remains editable and visible;
- visible text outside root: `0`;
- visible native text count after helper-label subtraction: `6`;
- IMAGE fills: `0`.

The semantic writing-area rectangle remains in Figma even though it is visually open, so future editors retain a clear role boundary without printing an unnecessary box or internal helper label.

## Screenshot QA

- whole / 500–700 px: PASS; the back is calmer and less form-like;
- actual-size `700×1036`: PASS; the signature role remains understandable through `[ふたりの署名]` and the open reserved field;
- no new collision or root overflow was introduced by the helper-label subtraction.

## Drive / image decision

Drive authority was live-read before the follow-up Figma write and matched `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`. Drive writes: `0`.

Image generation: `NOT_REQUIRED`. This remains a typography/containment problem; generated family/photo imagery would add risk without solving it.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / OPEN_HANDWRITTEN_AREA_POLISHED / INTERNAL_HELPER_LABEL_REMOVED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

This does not establish that all borders or labels should be removed. The transferable principle is only that visible containment/helper copy should prove a real reader-facing or physical job; semantic geometry and editable roles should remain in the Figma structure even when not printed.
