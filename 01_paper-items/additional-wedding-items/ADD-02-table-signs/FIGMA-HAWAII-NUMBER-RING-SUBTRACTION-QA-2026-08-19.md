# ADD-02 Hawaii — table-number contour-ring subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / HAWAII_NUMBER_RING_SUBTRACTION_PASS / FAMILY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Start authority SHA: `d54089354b763fa2204b86e51b7ef2982fdf40e4`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Hawaii production root: `2:2 / FRAME_TABLE_SIGN_HAWAII`
- other ten current table-sign roots remain unchanged
- Drive authority: `ADD-02_11卓の国別テーブルサイン` / `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- existing print grain and all legacy/rollback history remain preserved.

## Visible problem

Fresh actual-size Hawaii review found the large native table number `01` surrounded by two thin `V4_CONTOUR_RING` ellipses. The country art, Japanese label, semantic note and large table number already carried the hierarchy. Around the number, the double contour read more like a badge/widget than destination-specific print structure, especially after earlier family cleanup removed other template/design-study signals.

This was treated as an item-specific bounded problem. No assumption was made that circles are globally bad or that the other ten country signs should match Hawaii visually.

## Bounded comparison

Rollback-safe comparison:

- `89:2 / QA / ADD-02 HAWAII / NUMBER RING SUBTRACTION / 2026-08-19`

Only these decorative rings were hidden:

- `V4_CONTOUR_RING`
- `V4_CONTOUR_RING_STROKE`

`HAWAII`, `ハワイ`, native `01`, native semantic country-note placeholder, coastal hero art, accent rule and print grain were unchanged.

Comparison result: the `01` remained immediately scannable while the lower-right field became less badge-like and more editorial. The open number also aligned better with other country signs that already use large unboxed identifiers without forcing a shared layout.

## Promotion / rollback

Promoted on Hawaii production only:

- `21:212 / V4_CONTOUR_RING` hidden;
- `21:213 / V4_CONTOUR_RING_STROKE` hidden.

Hidden pre-change rollback:

- `89:23 / ROLLBACK / ADD-02 HAWAII / PRE NUMBER-RING SUBTRACTION / 2026-08-19`

Comparison `89:2` was hidden after promotion.

## Three-scale / structure QA

Fresh post-change Hawaii screenshot:

- whole/read scale: PASS;
- actual native `1000×1480`: PASS.

Post-write readback:

- visible native texts: `4` (`HAWAII`, `ハワイ`, country-note placeholder, `01`);
- IMAGE fills: `1` existing tiled archival grain;
- contour-ring nodes still exist for rollback/history but are hidden;
- no guest-facing descriptor/proof filler reintroduced;
- table number remains native editable text;
- country-note placeholder remains native editable text.

No seating/guest model changed; this item is a table sign, not a guest-list expansion.

## Drive / image decision

Drive authority metadata was live-read before the edit. New Drive assets: `0`. Image generation: `0`.

The concrete defect was UI-like containment around an already-strong identifier, not missing destination imagery.

## Decision

`HAWAII_NUMBER_RING_SUBTRACTION_PASS`.

ADD-02 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The change is intentionally Hawaii-specific; the other ten country compositions remain untouched.