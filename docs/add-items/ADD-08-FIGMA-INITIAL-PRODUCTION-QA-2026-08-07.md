# ADD-08 Figma initial production QA — 2026-08-07

- Starting / pre-write main: `0cb781e10d3ac1ce09848e7c43b8f31a22b65aea`
- Figma production authority: `xvJH23nWjWAApd3yOwr4y3`
- Production frame: `1:3` (`FRAME_MENU_SUPPORT_A4`), 1400 × 1980 px (A4 portrait working canvas)
- Rollback proof: `99_QA` / `1:19`
- Drive authority: `ADD-08_メニュー補助サイン` / `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`; no Drive asset write required.

## Live QA

Created the first editable production instead of stopping at SPEC/PREPARED_FOR_FIGMA. The design uses a restrained hotel/table-information editorial direction rather than reusing passport, boarding-pass, or rounded-card UI. All unknown menu, allergy, dietary and final guidance copy is represented by explicit `LAYOUT DUMMY` native text; no food/drink/allergy facts were invented.

Screenshot QA was captured at 1400 × 1980. Structure readback: 11 native text nodes, hidden `GUIDE_SAFE_10MM`, visible overflow 0. Variable content remains editable and is not rasterized. Rollback proof was duplicated before later refinement.

## Status

`FIGMA_INITIAL_PRODUCTION_CREATED / WHOLE_ITEM_SCREENSHOT_QA_PASS / STRUCTURE_QA_PASS / NATIVE_EDITABLE_PASS / SEMANTIC_PLACEHOLDERS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Deferred finalization

Final food/drink copy, confirmed allergy/dietary wording and venue operating guidance, printer bleed/template/profile, and 100% physical proof remain `DEFERRED_FINALIZATION`. They do not block moving to the next item after reading/detail QA.