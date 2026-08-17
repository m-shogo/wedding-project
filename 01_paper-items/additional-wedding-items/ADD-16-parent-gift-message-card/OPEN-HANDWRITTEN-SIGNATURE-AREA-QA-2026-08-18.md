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

Fresh selected-back review showed the optional handwritten-signature role as a complete thin rectangular border around an otherwise quiet open paper field. The rectangle did not carry trim, export, scan, perforation or other physical semantics; the role was already identified by native `自筆署名欄（任意）` copy and by reserved writable geometry.

At whole/reading scale the box therefore read more like a form field than a family-facing stationery surface.

## Bounded rollback-safe test

A clean QA duplicate was created:

- `28:2 / QA / ADD-16 / OPEN HANDWRITTEN SIGNATURE AREA / 2026-08-18`

Only one thing changed:

- `AREA_HANDWRITTEN_SIGNATURE` kept its full `260×120` semantic geometry but its visible stroke was removed.

Preserved:

- native label `自筆署名欄（任意）`;
- date and couple-signature roles;
- message copy hierarchy;
- mint horizon / origin mark;
- all native editability;
- no image fill.

The open version reads as intentional whitespace rather than a UI/form control while remaining obvious as an optional writing role.

## Promotion / rollback

Exact pre-change copies were created before promotion:

- selected back rollback: `28:14 / ROLLBACK / ADD-16 / BACK PRE-OPEN-SIGNATURE-AREA / 2026-08-18`
- stress back rollback: `28:26 / ROLLBACK / ADD-16 / BACK STRESS PRE-OPEN-SIGNATURE-AREA / 2026-08-18`

The verified treatment was applied only to:

- selected back `18:14`;
- hidden long-copy back `18:37`.

The QA comparison `28:2` was hidden after promotion. Front `18:3`, retained legacy `1:2 / 1:13`, and all family/final copy remained unchanged.

## Structure QA

Selected back and stress back now preserve:

- `AREA_HANDWRITTEN_SIGNATURE`: x `370`, y `835`, `260×120`, visible strokes `0`;
- `META / HANDWRITTEN`: `自筆署名欄（任意）` remains native text;
- visible text outside root: `0`;
- IMAGE fills: `0`.

The semantic writing-area rectangle remains in Figma even though it is visually open, so future editors retain a clear role boundary without printing an unnecessary box.

## Screenshot QA

- whole / 500 px: PASS; the back becomes calmer and more stationery-like.
- actual-size `700×1036`: PASS; the optional signature label remains legible and the open area is unambiguous.
- realistic long-copy `700×1036`: PASS; message body and long couple-signature copy remain inside the card and the open handwritten area remains available without collision.

## Drive / image decision

Drive authority was live-read before the Figma write and matched `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`. Drive writes: `0`.

Image generation: `NOT_REQUIRED`. This is a typography/containment issue and generated family/photo imagery would add risk without solving it.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / OPEN_HANDWRITTEN_AREA_POLISHED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

This does not establish that all borders should be removed. The transferable principle is only that visible containment should prove a real physical/semantic job; the semantic writing-area geometry itself was deliberately retained.
