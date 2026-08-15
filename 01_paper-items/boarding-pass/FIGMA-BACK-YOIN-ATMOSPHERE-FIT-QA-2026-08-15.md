# BOARDING PASS — Back 余韻 Atmosphere Fit QA

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BACK_YOIN_ATMOSPHERE_FIT_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before the Git write: `3df397fbf6c5a16a2bc0a14eb15dd74465396f54`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- production back: `8:73 / FRAME_BACK`
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`

## Visible problem

Fresh native 1200×550 screenshot showed only the first glyph `余` of the intended low-opacity atmosphere word `余韻` on the right side of the back ticket.

Live readback proved the text node itself still contained the correct native characters `余韻`:

- node: `21:168 / BOARDING_BACK_V2_ATMOSPHERE`
- font: `Noto Serif JP SemiBold`
- font size: `168`
- opacity: about `0.045`
- original text box: `320×200`
- position: `x=825 / y=270`
- parent `clipsContent=true`

The two 168 px Japanese glyphs exceeded the available text-box measure, so the second glyph was visually clipped even though the string and structure were correct.

## Rollback-safe comparison

Created clean-room comparison:

- `29:2 / QA_BOARDING_BACK_FULL_YOIN_ATMOSPHERE_2026_08_15`
- atmosphere text clone: `29:18`

Only the atmosphere text-box width changed:

- `320 → 360 px`

Characters, font size, opacity, color, y-position, thank-you title/body, burgundy rule, date/location, stock texture and all other visual roles were unchanged.

## Three-scale screenshot QA

Comparison result:

- whole-item / 500 px: PASS; `余韻` reads as one faint atmosphere word rather than a clipped single character;
- reading / 1000 px: PASS; the right-side atmosphere remains subordinate to `きょうを、ありがとう。` and the three-line Japanese body;
- actual-size / 1200×550: PASS; both glyphs are fully visible with no collision or trim escape.

The comparison was selected because it fixes semantic loss without adding decoration, changing the atmosphere scale, or increasing visual weight.

## Production promotion

Before promotion, preserved a full hidden rollback:

- `30:2 / ROLLBACK_BOARDING_BACK_PRE_FULL_YOIN_ATMOSPHERE_2026_08_15`

Production root remained:

- `8:73 / FRAME_BACK`

Production change:

- `21:168 / BOARDING_BACK_V2_ATMOSPHERE`
- width `320 → 360 px`
- characters remain `余韻`
- font size remains `168`
- opacity remains about `0.045`

The comparison `29:2` was hidden after promotion.

## Post-write structure readback

Production back:

- size: `1200×550`
- `clipsContent=true`
- native text nodes: `8`
- visible text nodes: `4`
- IMAGE-fill roles: `1` (`IMG_TICKET_STOCK_TEXTURE_REPLACEABLE`)
- outside visible text: `0`
- atmosphere: `余韻`, `x=825`, `y=270`, `360×200`, `168 px`, opacity about `0.045`
- rollback `30:2`: hidden and preserved
- comparison `29:2`: hidden after promotion

No flattening or rasterization was introduced.

## Drive / image generation

Drive metadata was freshly read before the production write and matched the expected non-Rurubu authority folder.

- Drive write: `0`
- generated image candidates: `0`
- decision: `IMAGE_GENERATION_NOT_REQUIRED`

The defect was native Japanese text fitting, not missing image/art direction.

## Decision

`BACK_YOIN_ATMOSPHERE_FIT_PASS`.

BOARDING PASS remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`.