# ADD-08 Figma editorial refinement QA — 2026-08-09

- Starting / pre-write main: `3272e4024cd5e0e652b3c5025e1c864cec89e4e6`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`
- Figma authority: `xvJH23nWjWAApd3yOwr4y3`
- Production frame: `1:3` (`FRAME_MENU_SUPPORT_A4`), 1400 × 1980
- Pre-edit rollback proof: `3:2` (`QA_ADD08_PRE_EDITORIAL_REFINEMENT_2026_08_09`)
- Long-copy stress proof: `3:18` (`QA_ADD08_LONG_COPY_STRESS_2026_08_09`)
- Drive authority: `ADD-08_メニュー補助サイン` / `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`

## Highest-value visible defect

The live initial production was structurally safe but still read like a generic information-board template: a thick teal header band, English kicker/category labels, all content stacked into one vertical lane, large unused gaps, and a blue vertical callout marker. The information hierarchy was serviceable but not yet strong enough for a sellable Japanese print/editorial piece.

## Figma refinement

Created a full rollback duplicate before editing production. Then refined the production frame natively:

- reduced the thick teal top band to a 10 px restrained edge accent;
- hid `TABLE INFORMATION · WEDDING DAY` and `MENU SUPPORT` instead of adding more decorative English;
- changed the main Japanese title to `Noto Serif JP Bold` at 66 px and widened it to the full editorial measure;
- changed the main placeholder copy to `Noto Serif JP Medium` and removed the internal production sentence from the visible sign;
- reflowed allergy and dietary sections into a balanced two-column editorial grid;
- converted the former 8 × 250 px blue vertical marker into a 1180 × 2 px teal horizontal rule;
- reflowed the staff guidance below that rule as a single wide information block;
- normalized the footer to `2026.10.24 · YOKOHAMA`;
- kept all variable content as native editable text and did not add cards, badges, gradients, shadows, fake transport data, images, or decorative UI.

## Screenshot QA

Whole/reading/detail QA was captured at the full 1400 × 1980 production size after the refinement. The result has a clearer Japanese editorial hierarchy, stronger negative-space control, no web-card/UI treatment, and no visible collision in the production frame.

A separate long-copy proof was created from the refined production. It tested:

- two-line main menu/drink copy;
- longer allergy guidance in the left 500 px column;
- longer dietary guidance in the right 500 px column;
- longer staff guidance across the 1180 px information block.

The stress screenshot showed the longer dummy strings wrapping inside their assigned regions without cross-column collision or frame-boundary escape.

## Structure readback

Production `1:3` remains 1400 × 1980 with `clipsContent=true` and 11 native text nodes. `TXT_KICKER` and `TXT_MENU_CATEGORY` remain present but `visible=false` for rollback-safe subtraction. All visible Japanese display text has no missing font. No text or variable content was rasterized or flattened.

Rollback proof `3:2` preserves the complete pre-edit state. Stress proof `3:18` preserves the long-copy verification state. Drive assets were not changed because the defect was composition/typography rather than missing or defective source media.

## Status

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / WHOLE_READING_DETAIL_QA_PASS / LONG_COPY_STRESS_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / DRIVE_AUTHORITY_VERIFIED / NOT_PRINT_READY`

## Deferred finalization

The following remain `DEFERRED_FINALIZATION` and do not block progression:

- final food/drink copy;
- confirmed allergy/dietary wording and venue operating guidance;
- printer bleed/template/profile;
- 100% physical proof and venue/table visibility check.
