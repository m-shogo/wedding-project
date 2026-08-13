# ADD-08 メニュー補助サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-14

## Current authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- page: `01_PRODUCTION`
- production: `1:3 / FRAME_MENU_SUPPORT_A4`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- reopened visual evidence: `docs/add-items/ADD-08-REOPENED-VISUAL-QA-2026-08-10.md`

This file supersedes its old 2026-08-02 `SPEC_QA_PASS / DRIVE_UPLOAD_BLOCKED` snapshot. The Drive folder now exists and was re-read live; Figma production is implemented and visually promoted.

## Fresh visual QA — 2026-08-12

Fresh live screenshot review at `990 × 1400` render size confirmed the culinary-editorial V2 direction remains sellable:

- Japanese headline dominates the ivory main field;
- the deep-navy right marginalia clearly separates allergy / dietary notes without equal web-card boxes;
- rust / mint index accents provide hierarchy without fake UI, gradients, shadows, badges or generic travel imagery;
- the staff CTA remains large and readable rather than collapsing into an info strip;
- no raster imagery is required by the current visual problem.

A remaining typography defect was found in the navy right rail: the semantic placeholder strings were wrapping so `LAYOUT DUMMY` appeared as an accidental second line.

## Rollback-safe production polish — 2026-08-12

Before editing, production `1:3` was cloned to hidden rollback:

- `6:2 / ROLLBACK_ADD08_PRE_RIGHT_RAIL_PLACEHOLDER_POLISH_2026_08_12`

Production root ID `1:3` was preserved.

Native editable text changes:

- `4:58 / TXT_ALLERGY_BODY`
  - before: `[アレルギー案内 · LAYOUT DUMMY]`, 20 px, wrapped to 2 lines
  - after: `[アレルギー · LAYOUT DUMMY]`, single line
- `4:62 / TXT_DIETARY_BODY`
  - before: `[食事制限案内 · LAYOUT DUMMY]`, 20 px, wrapped to 2 lines
  - after: `[食事制限 · LAYOUT DUMMY]`, single line

The surrounding headings `アレルギーについて` / `食事制限について` already carry the full semantic role, so shortening the dummy body removes redundant wording without losing meaning.

## Fresh visual polish — 2026-08-14

Observed latest `main` immediately before the Figma write: `9234e867afda17ab50f2274c7ee30da2daa9bb76`.

Fresh 1400×1980 production review found two remaining English headings functioning primarily as template filler rather than guest-facing information:

- `4:47 / TXT_KICKER / TODAY’S TABLE`
- `4:55 / TXT_RIGHT_INDEX / TABLE\nNOTES`

The Japanese hero `本日の食卓を、ゆっくりお楽しみください。` already establishes the page role. In the navy rail, `01 / アレルギーについて` and `02 / 食事制限について` already establish the marginalia structure. Retaining generic English headings repeated the same information and made the sheet feel more like a branded template than a resolved Japanese wedding print piece.

Rollback-safe proof created before mutation:

- `13:2 / ROLLBACK_ADD08_PRE_ENGLISH_FILLER_REMOVAL_2026_08_14` (`visible=false`)

Production root remained `1:3`. Only the two redundant English nodes were hidden; no Japanese guest-facing copy, semantic placeholder, allergy/dietary role, CTA, footer, rule, safe area or layout geometry was changed.

Post-write screenshot QA at the live 1400×1980 composition: PASS.

- the Japanese hero now enters immediately without a decorative English pre-label;
- the right rail now starts directly with the functional `01 / 02` allergy/dietary hierarchy;
- the navy rail still reads as intentional marginalia rather than a blank column;
- no dashboard/card feel, fake UI, image insertion or excessive empty-premium treatment was introduced.

Post-write structure readback:

- canvas: `1400 × 1980`
- `clipsContent=true`
- native editable text: `15` / visible `13`
- raster IMAGE fills: `0`
- visible text outside production root: `0`
- `4:47` reads back hidden
- `4:55` reads back hidden
- rollback `13:2` reads back hidden
- no flattening or raster replacement.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The observed bottleneck was redundant English filler inside an already-distinctive editorial composition. Drive writes: `0`. Exact Drive folder metadata was re-read before the Figma write and remains `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`.

## Deferred finalization

Still `NOT_PRINT_READY` pending:

- final food / drink copy;
- confirmed allergy / dietary wording and venue operation guidance;
- final venue/footer wording;
- printer bleed/template/profile;
- 100% physical proof and table / venue visibility check.

These remain `DEFERRED_FINALIZATION` and do not invalidate the current visual/structural pass.

## Final decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`