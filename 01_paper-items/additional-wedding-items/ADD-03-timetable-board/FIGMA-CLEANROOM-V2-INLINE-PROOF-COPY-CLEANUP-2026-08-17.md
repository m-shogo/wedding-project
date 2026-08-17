# ADD-03 当日タイムテーブルボード — Clean-room V2 inline proof-copy cleanup

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED / INLINE_IMPLEMENTATION_SUFFIX_REMOVAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `2d1dec66d34a1292596b3b7b041705d124cdba0f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Shared lesson consumed: `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-17-nrsl-inline-implementation-suffix-removal.md` (`VERIFIED_CROSS_ITEM`)
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- A2 selected clean-room V2: `14:2 / CLEANROOM_V2_ADD03_DAY_INDEX`
- A3 selected clean-room V2: `15:40 / CLEANROOM_V2_ADD03_A3_DAY_INDEX_REFLOW`
- A2 long-copy stress: `15:2`
- A3 long-copy stress: `15:72`
- Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
- retained legacy production remains unchanged.

## Visible problem

Fresh live A2/A3 screenshot and text-node readback showed that the selected clean-room V2 still printed internal implementation terminology inside otherwise valid unresolved semantic placeholders:

- `[挙式案内 · LAYOUT DUMMY]`
- `[進行内容 · LAYOUT DUMMY]`
- `[披露宴案内 · LAYOUT DUMMY]`

The unresolved roles are legitimate and must remain explicit, but `LAYOUT DUMMY` is authoring/proof language rather than guest-facing content. It weakened an otherwise sellable large-format itinerary by making the note rows read like a Figma proof sheet.

`TBD` for the unresolved transfer interval was intentionally retained because the ADD-03 SPEC explicitly requires the provisional transfer role to remain visibly marked `TBD` in the working file. No confirmed fact or time was changed.

## Rollback-safe change

A2 rollback:
- `18:2 / ROLLBACK_ADD03_A2_PRE_INLINE_PROOF_SUFFIX_REMOVAL_2026-08-17` — hidden.

A3 rollback:
- `18:40 / ROLLBACK_ADD03_A3_PRE_INLINE_PROOF_SUFFIX_REMOVAL_2026-08-17` — hidden.

Selected and stress placeholders were shortened only at the lexical layer:

- `[挙式案内 · LAYOUT DUMMY]` → `[挙式案内]`
- `[進行内容 · LAYOUT DUMMY]` → `[進行内容]`
- `[披露宴案内 · LAYOUT DUMMY]` → `[披露宴案内]`

Affected A2 selected text nodes:
- `14:21`
- `14:26`
- `14:34`

Affected A2 stress text nodes:
- `15:21`
- `15:26`
- `15:34`

Affected A3 selected text nodes:
- `15:55`
- `15:59`
- `15:67`

Affected A3 stress text nodes:
- `15:87`
- `15:91`
- `15:99`

No position, size, typography, event time, route geometry, date, location, fixed approved English copy, or image/asset role changed.

## Three-scale visual QA

### A2

- whole / 500px: PASS — the itinerary still reads `14:10 → 14:40–15:00 → 15:00 → 17:30`, and the note rows no longer expose implementation wording;
- reading / 1000px: PASS — `[挙式案内] / [進行内容] / [披露宴案内]` remain explicit but quieter and more artifact-native;
- actual size / `1400×1980`: PASS — no clipping, collision, hierarchy loss, or safe-area regression observed.

### A3

- whole / 500px: PASS;
- actual size / `990×1400`: PASS;
- the independent A3 reflow remains intact and is not a scaled copy of A2.

## Structural readback

A2 selected `14:2`:
- size `1400×1980`;
- native text `23`;
- IMAGE fill `0`;
- visible proof-language matches `0`;
- visible text outside root `0`.

A2 stress `15:2`:
- native text `23`;
- IMAGE fill `0`;
- visible proof-language matches `0`;
- visible text outside root `0`;
- remains hidden after QA.

A3 selected `15:40`:
- size `990×1400`;
- native text `21`;
- IMAGE fill `0`;
- visible proof-language matches `0`;
- visible text outside root `0`.

A3 stress `15:72`:
- native text `21`;
- IMAGE fill `0`;
- visible proof-language matches `0`;
- visible text outside root `0`;
- remains hidden after QA.

The hidden rollback copies intentionally retain the former `LAYOUT DUMMY` strings as rollback evidence.

## Hybrid authoring / Drive

- native text remains the authority for all facts and placeholders;
- no SVG/raster/generated asset was required;
- no image generation was justified by the observed defect;
- Drive write: `0`;
- Drive folder metadata was live-read before the change and matched the registered authority.

## Decision

ADD-03 remains:

`CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / INLINE_IMPLEMENTATION_SUFFIX_REMOVAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

This is a bounded guest-facing lexical cleanup, not a redesign and not a mutation of retained legacy production.
