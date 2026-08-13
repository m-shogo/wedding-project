# ADD-07 エスコートカード案内ボード — placeholder polish — 2026-08-12

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A2_A3_REFLOW_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before evidence write: `0c8fbe6bf7f6b6dc246470ab8ce7d534c7e1a466`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- page: `0:1 / ADD-07_ESCORT_CARD_GUIDE`
- A2 production: `1:2 / FRAME_ADD07_A2_PORTRAIT`
- A3 production: `1:17 / FRAME_ADD07_A3_REFLOW_COMPARE`
- exact Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- RURUBU/るるぶ area was not read or written.

## Fresh visual defect

Fresh live A2 and A3 screenshots confirmed the staggered Japanese-first editorial composition is still strong and does not warrant a redesign. One small production-quality defect remained in both sizes: the footer semantic placeholder `[WELCOME DESK · LAYOUT DUMMY]` read as internal English implementation copy and weakened the Japanese-first print hierarchy.

This was a semantic typography issue, not an image or composition bottleneck.

## Rollback-safe Figma change

Before mutation, both live production sizes were cloned and hidden:

- `5:2 / ROLLBACK_ADD07_A2_PRE_PLACEHOLDER_POLISH_2026_08_12`
- `5:22 / ROLLBACK_ADD07_A3_PRE_PLACEHOLDER_POLISH_2026_08_12`

Production frame IDs were preserved. Native editable location text changed in both frames from:

- `[WELCOME DESK · LAYOUT DUMMY]`

to:

- `[カード設置場所 · LAYOUT DUMMY]`

Mutated nodes:

- A2: `4:48 / TXT_META_PLACE`, `440 × 28`
- A3: `4:67 / TXT_META_PLACE`, approximately `311.08 × 20`

No other production layer was changed.

## Post-write screenshot QA

Fresh post-write screenshots were read at A2 reading scale and A3 reading/detail scale.

- the Japanese semantic placeholder remains on one line in both formats;
- it stays visually subordinate to the date and primary instruction;
- no accidental collision with the footer rule was introduced;
- 01→02→03 diagonal choreography remains unchanged;
- no new box, UI panel, raster decoration or fake travel data was introduced.

## Structure readback

A2 `1:2`:

- `1400 × 1980`, `clipsContent=true`
- native editable text: `11`
- IMAGE fills: `0`
- text outside root: `0`
- semantic placeholder: `[カード設置場所 · LAYOUT DUMMY]`

A3 `1:17`:

- `990 × 1400`, `clipsContent=true`
- native editable text: `11`
- IMAGE fills: `0`
- text outside root: `0`
- semantic placeholder: `[カード設置場所 · LAYOUT DUMMY]`

Both hidden rollback copies were read back successfully.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_FIX`.

No image asset was generated or added because the observed defect was semantic typography. Drive writes: `0`; exact Drive folder metadata was re-read before the Figma write.

## 2026-08-13 placeholder hierarchy polish

Fresh live readback at `main` `f18e48b98e490f9d6fe6d3ae8d702140a0aaa5fc` confirmed the production text still used one uniform style for the entire semantic placeholder. The field label itself was acceptable, but the proof-only `LAYOUT DUMMY` suffix still read at the same weight/size as guest-facing copy.

Existing hidden rollback copies created before this hierarchy pass were confirmed present:

- A2: `9:2 / ROLLBACK_ADD07_A2_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- A3: `9:22 / ROLLBACK_ADD07_A3_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production roots stayed unchanged (`1:2` / `1:17`). Native text nodes were polished non-destructively:

- A2 `4:48`: semantic field stays 18 px; only `LAYOUT DUMMY` becomes 9 px warm-gray at 0.78 opacity.
- A3 `4:67`: semantic field stays approximately 12.726 px; only `LAYOUT DUMMY` becomes 7 px warm-gray at 0.78 opacity.

Post-write structural readback:

- A2: `1400 × 1980`, `clipsContent=true`, native text `11`, IMAGE fills `0`, text outside root `0`.
- A3: `990 × 1400`, `clipsContent=true`, native text `11`, IMAGE fills `0`, text outside root `0`.
- Both nodes remain native editable text with the same semantic placeholder string; only the suffix range styling changed.

Drive authority was re-read immediately before the Figma work and remains `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`; Drive writes `0`.

Image generation was not required because the defect was proof-metadata hierarchy, not missing imagery.

## Decision

`ADD_07_PLACEHOLDER_HIERARCHY_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
