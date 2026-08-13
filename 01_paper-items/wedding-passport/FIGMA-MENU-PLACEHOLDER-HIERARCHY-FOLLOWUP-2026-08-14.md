# WEDDING PASSPORT — Menu Placeholder Hierarchy Follow-up

Date: 2026-08-14
State: `SELLABLE_VISUAL_QA_REOPENED / MENU_PLACEHOLDER_HIERARCHY_FOLLOWUP_REQUIRED / PRODUCTION_UNCHANGED / NOT_PRINT_READY`

## Live authority

- observed latest `main` immediately before this evidence write: `8e93fbf19ed146303cf159237e1a4b1aa151a8ad`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- menu production: `18:90 / FRAME_MENU_DRINK / 1480×2100`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Fresh screenshot diagnosis

Fresh whole/reading/actual-size review confirms the integrated V5 menu composition remains materially stronger than the older card/sidebar versions, but exposes a residual proof-metadata hierarchy defect:

- 24 visible native text nodes contain `LAYOUT DUMMY`;
- `116:72 / MENU_V3_DUMMY_NOTE` is already visually subordinate (`14px`, opacity `0.60`) and does not require another change;
- the other 23 semantic placeholders keep `LAYOUT DUMMY` at the same size/color hierarchy as the guest-facing semantic field;
- examples: course names are `25px` including the suffix, course descriptions `15px`, drink values `20px`, and the allergy line `18px`;
- at actual size this reads more like proof metadata / a calibration sheet than a finished wedding menu, even though the underlying composition remains strong.

The seating production `18:131` was freshly reviewed in the same run and does not show this defect strongly enough to warrant a production edit.

## Bounded intended fix

Do not redesign the menu or add imagery. Preserve each semantic field and all current geometry. Demote only the ` · LAYOUT DUMMY]` suffix to a small muted warm-gray auxiliary hierarchy:

- course name suffix: approximately `9px`;
- course description suffix: approximately `7px`;
- drink category suffix: approximately `7px`;
- drink value suffix: approximately `8px`;
- allergy suffix: approximately `8px`.

All variable menu/drink facts must remain native editable placeholders; do not invent menu content.

## Write result this run

A rollback-safe production mutation was attempted only after re-reading latest `main`, Current, item-specific evidence, exact Figma production, and exact Drive authority. The Figma mutation was blocked by the runtime write-safety gate before execution.

Therefore:

- production Figma change: `0`;
- rollback created this run: `0`;
- Drive change: `0`;
- generated image: `0`;
- production structure remains unchanged.

This is a transient write blocker, not a reason to stop the non-Rurubu visual task. Resume with the bounded suffix-only edit when Figma writes are permitted, then close with post-write whole/reading/actual-size screenshots and structural readback.

## Image decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The concrete defect is typography/proof-metadata hierarchy, not a missing hero, background, texture, or editorial image role.
