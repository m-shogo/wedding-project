# ADD-02 Spain — Sellable visual reopen / 2026-08-27

Status: `CURRENT_VISUAL_OVERRIDE / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / SPAIN_LOCAL_ART_DIRECTION_REBUILD_REQUIRED / CURRENT_PRODUCTION_UNCHANGED / NOT_PRINT_READY`

This is the newest item-specific visual-status authority for ADD-02 Spain only. It supersedes the `SELLABLE_VISUAL_QA_PASS` portion of `QA.md` for Spain until a new blank-frame candidate is independently verified. Existing structural, factual, long-copy, rollback, date-legibility and family-authority evidence remains valid.

## Live authority

- latest `main` observed immediately before this write: `e7e8f34384e6bb202c0307abdedd7ffa7b149c68`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Spain production root: `2:29 / FRAME_TABLE_SIGN_SPAIN`
- exact Drive folder verified live: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive write: `0`
- Figma production mutation: `0`
- image generation: `0`

## Fresh visual evidence

Fresh live screenshots were reviewed at:

- whole-item / thumbnail: max dimension `500px`;
- reading scale: max dimension `1000px`;
- native root is `1000×1480`.

The design remains structurally clean, but the reopened visual question is different: **if this arrived today as a new paid wedding table-sign proposal, would it be selected?** On that criterion, Spain should no longer be treated as visually complete.

Visible issues:

1. The lower `COURTYARD FLOOR` is composed of five isolated rectangular `TILE A–E` blocks. At whole and reading scales these do not read convincingly as ceramic/courtyard material; they read as generic colored UI/content blocks.
2. The central `COBALT COLUMN + SAFFRON SLIVER` is a very large vertical bar with no reader-facing, physical-paper, architectural or information-binding job strong enough to justify its visual mass.
3. The composition is split into a red header, sparse cream body, a large vertical rail, and a rectangular bottom module. The result is closer to a layout/system exercise than a sellable destination-specific wedding graphic.
4. Placeholder copy is not itself the defect. The problem remains even when judging only hierarchy, negative space, fixed-art meaning and destination specificity.

Live metadata confirms the visual grammar is carried by generic primitives rather than hidden raster problems:

- `173:88 / DECOR / FESTIVE TOP FIELD`
- `173:89 / DECOR / COBALT COLUMN`
- `173:90 / DECOR / SAFFRON SLIVER`
- `173:91 / DECOR / COURTYARD FLOOR`
- `173:92–96 / DECOR / TILE A–E`

Semantic copy remains native Figma text, and no IMAGE fills are implicated.

## Decision

`SPAIN_LOCAL_SELLABLE_VISUAL_PASS = REOPENED`.

Do **not** mutate Current `2:29` incrementally to fix this. The user-mandated clean-room policy applies: the next serious Spain proposal must start from a blank `1000×1480` frame using only verified facts/constraints/semantic requirements. Current Spain remains untouched as comparison/rollback history.

The previously rejected Spain V5 (`COURTYARD TILE FOLD`) and V6 (`SUNLIT ARCHWAY POSTER`) are terminal evidence for their respective failure fingerprints. Do not restyle or resume them. A future direction needs a materially new premise, not another rearrangement of tile rectangles or one quiet arch.

## Hybrid-authoring direction for the next clean-room candidate

Initial role split:

- destination/table/theme/description/date: native Figma text;
- reusable flat fixed-art: editable SVG only if a new item-specific concept genuinely needs it;
- generated/composed asset: only if fresh role diagnosis shows that material/atmosphere is the bottleneck;
- replaceable IMAGE role: `0` unless a specific future visual diagnosis justifies it;
- no variable/factual copy baked into SVG/raster.

No new image asset is justified by this audit alone. The defect is current fixed-art grammar, not missing photography.

## Next gate

1. create a materially new Spain direction on a **blank frame** without viewing/copying Current layout during construction;
2. use only size, table number, date and semantic content roles as input;
3. verify at `500px → 1000px → 1000×1480`;
4. run realistic long-copy and native-text structure readback;
5. compare against retained Current only after the candidate has matured;
6. restore `SELLABLE_VISUAL_QA_PASS` for Spain only if the new candidate clearly wins.

Learning state: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / CLEANROOM_METHOD_SWITCH_REQUIRED`. No project-wide rule is promoted from this single Spain finding.