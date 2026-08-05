# WEDDING PASSPORT — restrained menu ring pattern QA

Date: 2026-08-05
Current authority before write: `main@c4e0e3a86c125d3c346a1af6ba3b9dcbe1266ec5`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `02_INSIDE`
- Production frame: `18:90 / FRAME_MENU_DRINK`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- RURUBU/るるぶ scope: not read or written

## Live defect

The menu/drink reading area retained eight evenly spaced concentric background rings. In the live whole-frame screenshot the repeated rings remained visible behind the variable menu and drink copy, creating an AI-like mechanical target pattern and adding visual noise around content that still needs to accept final Japanese course and beverage names.

The rings did not encode course count, drink category, print marks, fold position, or any other functional information.

## Rollback-safe proof

Production was duplicated to `99_QA` as:

- `65:2 / QA_MENU_RESTRAINED_RING_PATTERN_PROOF_2026_08_05`

The proof retained all eight ring nodes but hid five of them. Whole-item screenshot QA confirmed that three widely spaced rings preserve a restrained passport/watermark cue without competing with menu text.

## Figma mutation

Existing production nodes changed only by `visible=true → false`:

- `18:95 / BG_PATTERN_RING_80`
- `18:97 / BG_PATTERN_RING_170`
- `18:98 / BG_PATTERN_RING_215`
- `18:100 / BG_PATTERN_RING_305`
- `18:101 / BG_PATTERN_RING_350`

Visible rings retained:

- `18:96 / BG_PATTERN_RING_125`
- `18:99 / BG_PATTERN_RING_260`
- `18:102 / BG_PATTERN_RING_395`

No node was deleted, flattened, rasterized, moved, resized, renamed, or detached. All hidden nodes remain available for rollback.

## Visual and structural QA

Post-change production screenshot verified:

- the target-like density is reduced from eight visible rings to three;
- menu and drink copy remain unobstructed and readable;
- the two-column hierarchy, visa panel, dividers, folio, title, and note remain unchanged;
- no clipping, overlap, missing content, or new artifact was introduced;
- production remains `1480 × 2100`, `clipsContent=true`;
- all native editable text and semantic nodes remain intact.

## Drive

No Drive write and no asset regeneration. The verified defect was native Figma decoration only, and the live Drive authority folder ID matched the GitHub register.

## Status

`LIVE_VISUAL_FIX_APPLIED / MEANINGLESS_RING_DENSITY_REDUCED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

## Remaining blocks

- confirmed venue course names and actual course count;
- confirmed drink categories and included beverages;
- final Japanese wording and allergen handling;
- final decision on whether the decorative visa panel and English closing note remain in print;
- printer template, bleed/safe/fold specification;
- 100% actual-size proof print;
- final PDF preflight and placeholder exclusion gate.
