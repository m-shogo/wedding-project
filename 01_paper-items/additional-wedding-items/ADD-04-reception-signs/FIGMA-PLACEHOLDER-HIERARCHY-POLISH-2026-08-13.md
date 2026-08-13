# ADD-04 — Placeholder Hierarchy Polish — 2026-08-13

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

Authority before write:
- current `main`: `7a415d472360e8f02688910618e27dff40d1d31e`
- Current: `VISUAL_REOPENED / FIGMA_EDIT_ALLOWED`
- Figma: `qWlF9THLR1G76hLcx1zYOx / 1:3 / 1:14`
- Drive: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`

Fresh actual-size review found `[受付案内 · LAYOUT DUMMY]` and `[受付名 · LAYOUT DUMMY]` structurally correct but visually too strong, making the pair read like proof sheets.

Rollback proof:
- `12:2 / ROLLBACK_ADD04_GROOM_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- `12:19 / ROLLBACK_ADD04_BRIDE_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Native-text polish:
- `5:57 / 5:73`: primary field remains 21px; `LAYOUT DUMMY` suffix → 9px warm-gray, opacity 0.78.
- `5:58 / 5:74`: primary field remains 18px; `LAYOUT DUMMY` suffix → 8px warm-gray, opacity 0.78.

Fresh 740×1050 screenshots for both frames pass. Structure readback: each frame 11 native text / 10 visible / IMAGE 0 / outside 0 / clipsContent=true. No flattening or rasterization.

`IMAGE_GENERATION_NOT_REQUIRED`; Drive writes 0.
