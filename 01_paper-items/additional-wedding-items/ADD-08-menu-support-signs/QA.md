# ADD-08 メニュー補助サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-12

## Current authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- page: `01_PRODUCTION`
- production: `1:3 / FRAME_MENU_SUPPORT_A4`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- reopened visual evidence: `docs/add-items/ADD-08-REOPENED-VISUAL-QA-2026-08-10.md`

This file supersedes its old 2026-08-02 `SPEC_QA_PASS / DRIVE_UPLOAD_BLOCKED` snapshot. The Drive folder now exists and was re-read live; Figma production is already implemented and visually promoted.

## Fresh visual QA — 2026-08-12

Fresh live screenshot review at `990 × 1400` render size confirmed the culinary-editorial V2 direction remains sellable:

- Japanese headline dominates the ivory main field;
- the deep-navy right marginalia clearly separates allergy / dietary notes without equal web-card boxes;
- rust / mint index accents provide hierarchy without fake UI, gradients, shadows, badges or generic travel imagery;
- the staff CTA remains large and readable rather than collapsing into an info strip;
- no raster imagery is required by the current visual problem.

A remaining typography defect was found in the navy right rail: the semantic placeholder strings were wrapping so `LAYOUT DUMMY` appeared as an accidental second line.

## Rollback-safe production polish

Before editing, production `1:3` was cloned to hidden rollback:

- `6:2 / ROLLBACK_ADD08_PRE_RIGHT_RAIL_PLACEHOLDER_POLISH_2026_08_12`

Production root ID `1:3` was preserved.

Native editable text changes:

- `4:58 / TXT_ALLERGY_BODY`
  - before: `[アレルギー案内 · LAYOUT DUMMY]`, 20 px, wrapped to 2 lines
  - after: `[アレルギー · LAYOUT DUMMY]`, 16 px / 24 px line-height, single line
- `4:62 / TXT_DIETARY_BODY`
  - before: `[食事制限案内 · LAYOUT DUMMY]`, 20 px, wrapped to 2 lines
  - after: `[食事制限 · LAYOUT DUMMY]`, 16 px / 24 px line-height, single line

The surrounding headings `アレルギーについて` / `食事制限について` already carry the full semantic role, so shortening the dummy body removes redundant wording without losing meaning.

## Post-write screenshot QA

Fresh post-write screenshot confirmed:

- both right-rail semantic placeholders stay on one line;
- placeholder copy is visually subordinate to `01 / 02` and the Japanese headings;
- navy-field spacing is calmer and less like exposed implementation copy;
- the main ivory field, rust accent rule and staff CTA were not altered;
- no clipping, overlap, image insertion or new decorative UI element was introduced.

## Structure readback

Production `1:3` after polish:

- canvas: `1400 × 1980`
- `clipsContent=true`
- native editable text: `15`
- raster IMAGE fills: `0`
- text outside production root: `0`
- safe-area text risks against `4:66 / GUIDE_SAFE_10MM`: `0`
- `4:58`: `[アレルギー · LAYOUT DUMMY]`, `245 × 24`, `16 px`
- `4:62`: `[食事制限 · LAYOUT DUMMY]`, `245 × 24`, `16 px`
- rollback `6:2` exists and is hidden

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_FIX`.

The observed bottleneck was typography inside an already-distinctive editorial composition. Drive writes: `0`. Exact Drive folder metadata was re-read before the Figma write.

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
