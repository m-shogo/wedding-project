# WEDDING PASSPORT — unverified menu content suppression QA

Date: 2026-08-05
Current authority before write: `main@6b0adf93b400b3d196b5d4c716032e3a45beea2a`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `02_INSIDE`
- Production frame: `18:90 / FRAME_MENU_DRINK`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- RURUBU/るるぶ scope: not read or written

## Live defect

Production displayed specific dishes and beverages such as seasonal amuse, seafood appetizer, potage, roasted fish, domestic beef, wine, cocktails, and soft drinks. No live Current-authority evidence established these as the confirmed venue menu. The red stamp also said `APPROVED YOKOHAMA`, which overstated completion while food and beverage content remained unconfirmed.

## Rollback evidence

Before mutation, production was cloned to `99_QA` as:

- `63:2 / QA_MENU_UNVERIFIED_CONTENT_BEFORE_2026_08_05`

The clone preserves the complete pre-change frame.

## Figma mutation

Existing native text nodes only:

- `18:125 / AREA_MENU_COPY`: replaced unverified dish names with six numbered semantic course placeholders.
- `18:129 / AREA_DRINK_COPY`: replaced unverified beverage names with five numbered semantic drink-category placeholders.
- `21:29 / MENU_VISA_STAMP_TEXT`: `APPROVED / YOKOHAMA` → `CONTENT / PENDING`.

No node deletion, flattening, rasterization, resizing, movement, or semantic-name change was performed.

## Visual and structural QA

Post-change whole-frame screenshot verified:

- all placeholders fit without clipping or overlap;
- menu/drink hierarchy and two-column reading order remain intact;
- the visa panel remains visually coherent;
- no confirmed food, drink, venue, guest, or family data was invented;
- frame remains `1480 × 2100`, `clipsContent=true`;
- 12 native editable text nodes remain;
- modified text nodes remain `textAutoResize=HEIGHT` where applicable.

## Drive

No Drive write and no asset regeneration. The defect was native Figma text only.

## Status

`LIVE_VISUAL_FIX_APPLIED / UNVERIFIED_MENU_CONTENT_SUPPRESSED / SEMANTIC_PLACEHOLDERS_ENFORCED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

## Remaining blocks

- confirmed venue course names and course count;
- confirmed drink categories and included beverages;
- final Japanese wording and allergen handling;
- printer template, bleed/safe/fold specification;
- 100% actual-size proof print;
- final PDF preflight and placeholder exclusion gate.
