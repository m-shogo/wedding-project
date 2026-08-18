# WEDDING PASSPORT V3 — back brand subtraction QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / BACK_REDUNDANT_BRAND_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `8e8719acb6baab191bcde2ccf6b36d55173919cb`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected clean-room V3 front: `144:3` unchanged
- selected clean-room V3 back: `144:26`
- back long-copy stress: `145:29`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production remains untouched.

## Visible issue

Fresh whole/read/actual review found the small top-left `WEDDING PASSPORT` on the V3 back redundant. The front still uses the artifact/category label, while the back already has a dominant Japanese closing headline, body copy, date/location, issue role and route field. Repeating the English micro-brand on the back added generic template microcopy without a factual, navigational or physical-paper function.

## Bounded comparison

Rollback-safe comparison:

- `167:2 / QA / PASSPORT V3 BACK / BRAND SUBTRACTION / 2026-08-18`

Only the back `TEXT / BRAND / WEDDING PASSPORT` was hidden. Japanese headline, body, `[最終メッセージ]`, `2026.10.24 / YOKOHAMA`, `[発行情報]`, route artwork, colors, page geometry and front design were unchanged.

The comparison was stronger: the first reader-facing content is now the Japanese closing headline, and the back reads as a deliberate closing page rather than a repeated branded template.

## Promotion / rollback

Promoted to selected back:

- selected brand node `144:29` hidden;
- matching hidden stress brand `145:32` hidden.

Hidden pre-change rollback:

- selected back `167:19`;
- back stress `167:36`.

The comparison `167:2` was hidden after promotion. Front `144:3` was intentionally unchanged because its small artifact/category label has a different role.

## Three-scale / structural QA

Post-promotion:

- whole item / 500px: PASS;
- reading scale: PASS;
- actual native `1480×2100`: PASS;
- selected visible native text: `4`;
- selected outside visible text: `0`;
- selected proof-language leakage: `0`;
- selected text collisions: `0`;
- hidden back stress visible native text: `4`;
- hidden back stress outside text: `0`;
- hidden back stress proof-language leakage: `0`;
- hidden back stress text collisions: `0`;
- IMAGE fills: `0`.

## Drive / asset decision

Exact Drive authority was live-read successfully before the write. No image generation or Drive write was required because the defect was redundant microcopy, not missing fixed art.

## Decision

`BACK_REDUNDANT_BRAND_SUBTRACTION_PASS`.

The selected clean-room WEDDING PASSPORT family keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Legacy production and all rollback/history remain preserved.