# ADD-09 ゲストブックサイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-14

## Current authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- page: `01_PRODUCTION`
- production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- reopened visual evidence: `01_paper-items/additional-wedding-items/ADD-09-guest-book-sign/FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`

This file supersedes the old 2026-08-02 `PASS / PREPARED_FOR_FIGMA` planning snapshot.

## Fresh visual spot-check — 2026-08-12

Fresh live screenshot review of production `1:3` confirmed the promoted bookplate/editorial direction meets the reopened sellable gate: Japanese headline `旅の記録に、一言を。` is the primary visual event; the deep-navy left spine gives the sign a physical guest-book identity; `GUEST BOOK` remains subordinate metadata; instruction and operational placeholders remain native editable text; and three restrained writing rules support the guest-book role without becoming form/UI boxes.

## Rollback-safe English filler removal — 2026-08-14

Observed latest `main` immediately before evidence write: `2df777806cd62e8f9942e45a44bc6d8d9ac798d4`.

Fresh actual-size production review at `1000 × 1419` found one remaining template-like repetition in the navy spine: `GUEST / BOOK / ARCHIVE`. The small top `GUEST BOOK` label already communicates the English role, while the Japanese hero carries the guest-facing hierarchy. The spine mark therefore repeated the same concept as decorative English filler rather than useful information.

Rollback-safe proof was created before mutation:

- `11:2 / ROLLBACK_ADD09_PRE_SPINE_FILLER_REMOVAL_2026_08_14` (`visible=false`)

Production root remained `1:3`. Only `5:35 / TXT_SPINE_MARK` was hidden. No Japanese guest-facing copy, semantic placeholder, writing rule, footer, safe-area geometry, or installation wording was changed.

Post-write actual-size screenshot QA: PASS.

- the navy spine now reads as a quieter physical book-spine field rather than a template branding rail;
- the Japanese headline, instruction hierarchy and three writing rules remain visually dominant;
- the small top `GUEST BOOK` role label remains available without redundant English repetition;
- no dashboard/card feel, image insertion, gradient, shadow or replacement decoration was introduced.

## Verified structure

Production `1:3` remains a `1000 × 1419`, `clipsContent=true` native composition. Prior verified structure contained `8` native editable text nodes and `0` raster IMAGE fills; the 2026-08-14 polish hides one existing text node rather than flattening or raster-replacing content. Primary semantic placeholders remain:

- `5:38 / TXT_INSTRUCTION` = `[記入案内 · LAYOUT DUMMY]`
- `5:42 / TXT_NOTE` = `[記入方法・設置場所 · LAYOUT DUMMY]`

A fresh screenshot confirms the intended post-write visual state. Programmatic structure readback was attempted again on 2026-08-14 but the Figma runtime safety gate blocked that read-only plugin call before execution; therefore no unverified new node-count claim is added here. Existing structural/long-copy evidence remains valid because the bounded mutation only changed visibility of `TXT_SPINE_MARK`.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported bottleneck was redundant English filler inside an already-specific physical bookplate composition, not missing media. Drive writes: `0`. Exact Drive folder metadata was re-read live on 2026-08-14 and remains `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`.

## Deferred finalization

Still `NOT_PRINT_READY` pending final writing method / pen placement / installation wording, final location/footer wording, printer bleed/template/profile, and 100% physical proof / venue-distance readability. These remain `DEFERRED_FINALIZATION`.

## Final decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
