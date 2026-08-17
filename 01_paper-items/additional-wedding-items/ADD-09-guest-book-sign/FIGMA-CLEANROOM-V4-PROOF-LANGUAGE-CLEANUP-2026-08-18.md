# ADD-09 ゲストブックサイン — Clean-room V4 Proof-language Cleanup

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `e504561c845499445a45c58aae3cd65438a0a17a`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected clean-room V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy stress: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS`
- retained legacy production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4`

## Live defect

Fresh actual-size screenshot of the selected V4 revealed that the guest-facing lower information block still printed internal authoring language:

- `[記帳案内 · LAYOUT DUMMY]`
- `[記帳方法・ペン位置・設置案内 · LAYOUT DUMMY]`
- `[設置場所・補足情報 · LAYOUT DUMMY]`

The selected V4 composition itself remained strong, but these suffixes made the sign read as a Figma proof rather than a finished guest artifact. Current policy requires unresolved information to remain semantic placeholders without internal `DUMMY / QA / PROOF / TEMP` language on the printed surface.

## Rollback-safe change

Pre-change selected V4 was cloned and hidden:

- `21:2 / ROLLBACK_ADD09_V4_PRE_PROOF_LANGUAGE_CLEANUP_2026_08_18`

Only the three native semantic placeholder strings changed:

- `[記帳案内 · LAYOUT DUMMY]` → `[ご記帳のご案内]`
- `[記帳方法・ペン位置・設置案内 · LAYOUT DUMMY]` → `[記入方法・ペンのご案内]`
- `[設置場所・補足情報 · LAYOUT DUMMY]` → `[設置場所・補足情報]`

No headline, date, journey-line artwork, lower rule, layout geometry, safe area, raster or legacy node was changed.

## QA

Post-write actual-size screenshot at `1000×1419` confirms:

- Japanese headline remains the primary visual event;
- the large journey-line fixed art remains intact;
- the lower block now reads as guest-facing unresolved information rather than implementation metadata;
- selected visible text outside root: `0`;
- IMAGE fills remain `0`;
- all unresolved operational information remains native editable text.

The existing long-copy stress `17:4` was retained as QA evidence and hidden again after inspection. Its internal stress copy is not production copy.

Result: `GUEST_FACING_PLACEHOLDER_CLEANUP_PASS`.

## Drive / image decision

Drive authority was live re-read and remains `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`.

Drive write: `0`.
Image generation: `NOT_REQUIRED`.

The bottleneck was proof-language leakage, not missing imagery.

## Current state

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
