# ADD-16 両親贈呈品メッセージカード — Handwritten Label Visibility Reconciliation

Status: `AUTHORITY_RECONCILED / NO_FIGMA_MUTATION_REQUIRED`
Date: 2026-08-19
Start authority SHA: `8470fabc829cb5f09f434745efb989a1f5dd5ec4`

## Live authority readback

- Figma: `ylmVBbwNcnjueYrymNpa3c`
- clean-room V3 back: `18:14`
- `18:24 / AREA_HANDWRITTEN_SIGNATURE`: visible semantic `260×120` rectangle, stroke count `0`;
- `18:25 / META / HANDWRITTEN / 自筆署名欄（任意）`: `visible=false`;
- `18:23 / TXT_COUPLE_SIGNATURE`: visible native `[ふたりの署名]`.
- Drive: `ADD-16_両親贈呈品メッセージカード / 1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O` live readback matched.

## Reconciliation

The current `QA.md` still stated that the native helper label `自筆署名欄（任意）` remained visible/retained. Live Figma shows the intended later polish state instead: the semantic handwriting-area geometry remains available to editors, while the internal helper label is hidden from the guest-facing paper.

This is consistent with the project rule that implementation/proof language belongs in node names, hidden QA, or GitHub evidence rather than on the printed surface when it has no reader-facing job.

No Figma mutation was needed in this run. The live selected design is already correct; only durable QA authority required correction.
