# ADD-03 — Placeholder Hierarchy Polish — 2026-08-13

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`

Authority before write:
- `main`: `60e7ef43d3540808dbb992f4b62a0823f2224cb3`
- Current: `VISUAL_REOPENED / FIGMA_EDIT_ALLOWED`
- Figma: `woFUHUqZcvNkih8o42xeH4 / 1:5`
- Drive: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`

Fresh 1400×1980 visual review found that `[挙式案内 · LAYOUT DUMMY]`, `TBD · LAYOUT DUMMY / ご案内`, and `[披露宴案内 · LAYOUT DUMMY]` still gave proof metadata too much guest-facing weight.

Rollback proof: `10:2 / ROLLBACK_ADD03_PLACEHOLDER_TEXT_PRE_HIERARCHY_2026_08_13` on `99_QA`, hidden.

Production changes, native text only:
- `6:43`: `[挙式案内] · LAYOUT DUMMY`; suffix 11px muted gray at 0.70 opacity.
- `6:46`: factual state remains `TBD`; only `LAYOUT DUMMY` is reduced to 10px muted gray at 0.70 opacity. No event was invented.
- `6:52`: `[披露宴案内] · LAYOUT DUMMY`; suffix 11px muted gray at 0.70 opacity.

Post-write actual-size screenshot: PASS. Ceremony/reception times remain dominant; the sand TBD row remains visibly unconfirmed; proof metadata now reads as metadata rather than event copy.

Structure readback: 1400×1980, `clipsContent=true`, native text 19, visible text 18, IMAGE fills 0, visible text outside root 0, rollback hidden, no flattening/raster text replacement.

Image generation: not required. Drive writes: 0.