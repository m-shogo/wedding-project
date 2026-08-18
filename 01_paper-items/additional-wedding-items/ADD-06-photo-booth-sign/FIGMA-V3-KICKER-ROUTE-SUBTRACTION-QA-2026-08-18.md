# ADD-06 フォトブースサイン — V3 kicker / route subtraction QA

Status: `VERIFIED_LOCAL / CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `da9adca6c7f6deded79fead42fde586ac8e40fe1`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- selected V3: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- long-copy proof: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15`
- retained legacy: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

## Visible issue

Fresh actual-size review showed that three fixed elements were no longer carrying enough reader-facing value:

- `PHOTO SPOT` kicker;
- its small mint rule;
- the lower decorative route sweep with endpoint dots.

`BEST SHOT`, the large editable lens target and native `写真撮影はこちら` already establish the photo-booth role clearly. Keeping an additional English kicker plus a travel-like sweep made the poster feel closer to a generic themed template/UI illustration than a confident physical sign.

This was a subtraction test, not a new art-direction rebuild. The selected clean-room V3 composition, typography, lens vector, date, placement placeholder and bottom mint field were kept intact.

## Bounded comparison

A rollback-safe comparison was created from the already-selected clean-room V3:

- `32:2 / QA_ADD06_V3_SUBTRACT_KICKER_ROUTE_2026_08_18`

Only these roles were hidden in the comparison:

- `TXT_PHOTO_SPOT_KICKER`;
- `DECOR_KICKER_RULE`;
- `VECTOR_ROUTE_SWEEP_V3_EDITABLE`.

Whole/read/actual review showed a clearer first read:

`BEST SHOT → 写真撮影はこちら → lens target → date / placement`.

The comparison reduced decorative travel/UI signals without creating faux-premium emptiness; the large title/lens pair still carries the page.

## Adopted Figma change / rollback

Before selected mutation, exact hidden rollback copies were created:

- selected rollback: `32:22 / ROLLBACK_ADD06_V3_PRE_KICKER_ROUTE_SUBTRACTION_2026_08_18`;
- long-copy rollback: `32:42 / ROLLBACK_ADD06_V3_STRESS_PRE_KICKER_ROUTE_SUBTRACTION_2026_08_18`.

The same three roles were then hidden in selected V3 and its long-copy proof:

Selected `25:3`:

- `25:14 / TXT_PHOTO_SPOT_KICKER` → hidden;
- `25:20 / DECOR_KICKER_RULE` → hidden;
- `25:10 / VECTOR_ROUTE_SWEEP_V3_EDITABLE` → hidden.

Stress `25:41`:

- `25:52 / TXT_PHOTO_SPOT_KICKER` → hidden;
- `25:58 / DECOR_KICKER_RULE` → hidden;
- `25:48 / VECTOR_ROUTE_SWEEP_V3_EDITABLE` → hidden.

Comparison `32:2` was hidden after adoption. Legacy production was not changed.

## Post-write QA

Fresh selected `990×1400` screenshot: PASS.

Structural readback:

- selected visible native text: `4`;
- selected IMAGE fills: `0`;
- selected visible text outside root: `0`;
- selected text-to-text collision: `0`;
- long-copy visible native text: `4`;
- long-copy IMAGE fills: `0`;
- long-copy visible text outside root: `0`;
- long-copy text-to-text collision: `0`;
- comparison + both rollback roots are hidden after QA.

The previous native auto-layout repair for long subtitle/note flow remains intact. No variable/factual copy was rasterized or removed.

## Drive / image decision

Drive authority metadata was live-read before the Figma write and remains `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`.

Drive write: `0`.

Image generation: `NOT_REQUIRED_THIS_CHANGE`. The concrete defect was redundant fixed English/decorative routing, not missing imagery.

## Decision

`KICKER_ROUTE_SUBTRACTION_PASS`.

ADD-06 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

Still deferred: authoritative final booth wording/location, stand/mount/installation geometry, printer template/bleed, venue-lighting and physical 1.5–3m proof.