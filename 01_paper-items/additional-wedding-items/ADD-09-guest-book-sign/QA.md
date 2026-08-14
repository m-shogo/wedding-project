# ADD-09 ゲストブックサイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-15

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

## Fresh semantic-placeholder polish — 2026-08-15

Observed latest `main` immediately before the bounded production write: `7bff1c10baf81591d64e80a80bb356bdfa569313`.

Fresh `1000 × 1419` actual-size review found one remaining authoring-style operational placeholder in the lower instruction block: `5:42 / TXT_NOTE / [記入方法・設置場所 · LAYOUT DUMMY]`. The visible heading directly above already says `ご記入について`; retaining `設置場所` in the placeholder read like a production-field name rather than guest-facing copy.

Drive authority was live re-read before mutation and remains `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`.

Rollback-safe proof created before mutation:

- `12:2 / ROLLBACK_ADD09_PRE_NOTE_PLACEHOLDER_JA_POLISH_2026_08_15` (`visible=false`)

Production root remained `1:3`. Only the native editable `5:42 / TXT_NOTE` copy changed:

- before: `[記入方法・設置場所 · LAYOUT DUMMY]`
- after: `[ご記入のご案内 · LAYOUT DUMMY]`

The established mixed-style proof metadata hierarchy was preserved explicitly after the copy edit: semantic field `[ご記入のご案内` remains 24 px in the existing navy, while ` · LAYOUT DUMMY]` remains 9 px warm-gray at opacity 0.78.

Post-write actual-size screenshot QA: PASS.

- the lower instruction block now reads as guest-facing copy rather than a CMS/production field;
- the small `LAYOUT DUMMY` suffix remains subordinate;
- Japanese hero, book-spine field, top `GUEST BOOK` role label, three writing rules, date and location remain unchanged;
- no new decoration, image or fake operational fact was added.

Fresh programmatic structure readback now succeeds and supersedes the previous read-block note for the current state:

- production root: `1000 × 1419`, `clipsContent=true`
- native editable text: `8` / visible `7`
- raster IMAGE fills: `0`
- visible text outside production root: `0`
- `5:42` reads `[ご記入のご案内 · LAYOUT DUMMY]` with 24 px semantic field + 9 px muted suffix
- rollback `12:2` reads back hidden
- no flattening or raster replacement.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported bottlenecks were redundant English filler and internal authoring language inside an already-specific physical bookplate composition, not missing media. Drive writes: `0`. Exact Drive folder metadata remains `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`.

## Deferred finalization

Still `NOT_PRINT_READY` pending final writing method / pen placement / installation wording, final location/footer wording, printer bleed/template/profile, and 100% physical proof / venue-distance readability. These remain `DEFERRED_FINALIZATION`.

## Final decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
