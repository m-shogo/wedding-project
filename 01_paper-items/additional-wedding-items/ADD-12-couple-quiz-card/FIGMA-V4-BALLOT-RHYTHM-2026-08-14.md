# ADD-12 新郎新婦クイズカード — V4 ballot rhythm refinement

Status: `SELLABLE_VISUAL_QA_REOPENED / V4_BALLOT_RHYTHM_APPLIED / LONG_COPY_REVALIDATION_REQUIRED / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-14

## Live authority

- observed GitHub `main` before write: `ae950d9b0b5bc110115d1e8c77b3ba07d8309e73`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ADD-12 新郎新婦クイズカード`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- production front: `1:2 / ADD12/QuizCard/Front`
- production back: `1:26 / ADD12/QuizCard/Back`
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive folder ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

Drive metadata was re-read live before the Figma write and matched the registered authority.

## Fresh visual defect

A new actual-size `620 × 875` screenshot of the V3 front showed that the ballot still ended too early vertically. The four choices used only a compact upper block while a large lower field remained visually inactive. This preserved a residual "empty premium template" feel even though V3 had already improved the earlier compressed ballot.

The highest-value correction was therefore not imagery or decoration. It was to open the physical ballot cadence so the four hand-mark rows occupy more of the paper in a deliberate stationery rhythm.

## Rollback-safe production edit

Before production mutation, a hidden rollback copy was created on `99_QA`:

- `18:2 / ROLLBACK_ADD12_FRONT_PRE_BALLOT_RHYTHM_V4_2026_08_14`

Production root `1:2` remained stable. Only native auto-layout spacing changed:

- `11:52 / ADD12/Choices/Flow`
- `itemSpacing`: `28 → 42`

No wording, fact, answer, choice count, font size, mark geometry, semantic role, image, color, or back-side content was changed.

## Post-write screenshot QA

Fresh actual-size screenshot of production `1:2`: visual PASS for the intended V4 rhythm.

Observed result:

- choice rows breathe more like a physical hand-mark ballot;
- the lower half is less falsely empty without filling it with decorative UI or imagery;
- Japanese title/question hierarchy remains unchanged;
- all four choices retain equal visual weight and equal circular mark roles;
- the answer-method placeholder remains subordinate;
- date/footer remains clear and uncrowded.

## Long-copy / structure revalidation

A new QA stress clone was created from the post-write production front:

- `18:27 / QA_ADD12_V4_BALLOT_RHYTHM_LONG_COPY_2026_08_14`

The QA clone contains a longer question, four materially longer Japanese options, and a longer answer-method placeholder while preserving native editable text and the new `42px` ballot cadence.

The stress clone was created successfully, but the subsequent mutation required to expose the hidden QA proof for screenshot capture was blocked before execution by the runtime write-safety gate. Therefore this evidence does **not** claim a fresh V4 long-copy screenshot PASS yet.

Previous V3 long-copy evidence remains valid historical structural evidence, but because `Choices/Flow.itemSpacing` changed, V4 long-copy screenshot revalidation is required before the item is re-closed as fully current.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported defect was paper rhythm and vertical composition, not missing media. Generated imagery would weaken the ballot role. Drive asset writes: `0`.

## Next safe action

When Figma write/read safety permits:

1. expose or otherwise render `18:27` on `99_QA`;
2. capture actual-size long-copy screenshot;
3. verify no clipping/collision and read back native structure;
4. if it passes, restore `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` and record V4 as current production authority;
5. if it fails, use rollback `18:2` or reduce the spacing without touching facts or semantics.
