# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-18
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Current authority

- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected clean-room V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy stress: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS`
- retained legacy production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

Retained production `1:3` is historical rollback/comparison evidence only. The clean-room V4 is the current selected sellable candidate and must be used for future non-Rurubu QA/finalization work.

## Clean-room V4 direction

V4 was created from a blank frame under the current zero-reuse mandate. It does not use the retained production as a component/layout source.

Current V4 characteristics:

- working canvas `1000×1419`;
- Japanese headline `旅の記録に、一言を。` is the first visual read;
- native date `2026.10.24` remains editable;
- large fixed-art journey line provides a distinct guest-book identity without card/dashboard UI;
- lower operational roles remain native semantic placeholders;
- raster IMAGE fill count `0`;
- legacy remains untouched.

Earlier V2/V3 studies and retained production remain comparison/history only.

## 2026-08-18 guest-facing placeholder cleanup

Detailed evidence:

- `FIGMA-CLEANROOM-V4-PROOF-LANGUAGE-CLEANUP-2026-08-18.md`

Fresh actual-size screenshot showed three internal authoring strings still visible inside the selected V4:

- `[記帳案内 · LAYOUT DUMMY]`
- `[記帳方法・ペン位置・設置案内 · LAYOUT DUMMY]`
- `[設置場所・補足情報 · LAYOUT DUMMY]`

Rollback-safe selected copy was preserved at:

- `21:2 / ROLLBACK_ADD09_V4_PRE_PROOF_LANGUAGE_CLEANUP_2026_08_18`

The selected V4 now uses native guest-facing semantic placeholders:

- `[ご記帳のご案内]`
- `[記入方法・ペンのご案内]`
- `[設置場所・補足情報]`

No fixed-art geometry, headline, date, safe area, image role or legacy node changed.

Post-write readback / screenshot:

- actual-size `1000×1419`: PASS;
- selected visible text outside root: `0`;
- IMAGE fills: `0`;
- implementation/proof suffixes are absent from the selected print surface;
- unresolved operations remain explicit native editable text.

The long-copy frame `17:4` remains separate QA evidence and is hidden after validation.

## Hybrid authoring / asset decision

- variable / unresolved operations: native Figma text;
- fixed journey-line decoration: editable vector/fixed art;
- replaceable raster role: not required;
- image generation: `NOT_REQUIRED`.

Drive write in the 2026-08-18 cleanup: `0`.

## Historical evidence

Older production-focused QA remains available through Git history and item files, including:

- `FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`
- `CLEANROOM-V2-V3-STUDY-2026-08-15.md`
- `FIGMA-PROOF-SUFFIX-REMOVAL-2026-08-17.md`

These are historical evidence and do not supersede the current clean-room V4 authority.

## Deferred finalization

Still `NOT_PRINT_READY` pending authoritative:

- final writing method / pen placement;
- final installation wording / placement;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

These remain `DEFERRED_FINALIZATION` and do not reopen the current sellable visual decision.

## Current decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
