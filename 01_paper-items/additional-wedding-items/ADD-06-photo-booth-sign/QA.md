# ADD-06 フォトブースサイン — QA

Status: `CURRENT / CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- page: `0:1 / ADD-06_PHOTO_BOOTH_SIGN`
- selected clean-room V3: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- long-copy proof: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15` — hidden after QA
- retained clean-room V2 comparison: `23:3`
- retained legacy production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

The legacy production and V2 comparison remain untouched as rollback/history. V3 was originally built from a blank A3 frame under the clean-room mandate and remains the selected family.

## Current visual direction

The selected poster now reads primarily as:

`BEST SHOT → 写真撮影はこちら → editable lens target → 2026.10.24 / [会場内設置場所]`.

The large `BEST SHOT` typography and lens target provide the photo-booth semantic cue. The design deliberately avoids cards, badges, fake photography, gradients, shadows and repeated travel icons.

### 2026-08-18 subtraction polish

Fresh actual-size review found three fixed elements no longer carrying enough reader-facing value:

- `PHOTO SPOT` English kicker;
- its small mint rule;
- lower decorative route sweep / endpoint dots.

A rollback-safe comparison `32:2` showed that removing those roles produced a stronger, less template/UI-like first read without creating false premium emptiness. The subtraction was adopted in selected V3 and its long-copy proof.

Hidden in selected `25:3`:

- `25:14 / TXT_PHOTO_SPOT_KICKER`;
- `25:20 / DECOR_KICKER_RULE`;
- `25:10 / VECTOR_ROUTE_SWEEP_V3_EDITABLE`.

Hidden in long-copy proof `25:41`:

- `25:52 / TXT_PHOTO_SPOT_KICKER`;
- `25:58 / DECOR_KICKER_RULE`;
- `25:48 / VECTOR_ROUTE_SWEEP_V3_EDITABLE`.

Rollback evidence:

- `32:22 / ROLLBACK_ADD06_V3_PRE_KICKER_ROUTE_SUBTRACTION_2026_08_18` — hidden;
- `32:42 / ROLLBACK_ADD06_V3_STRESS_PRE_KICKER_ROUTE_SUBTRACTION_2026_08_18` — hidden;
- comparison `32:2` — hidden after adoption.

Detailed evidence: `FIGMA-V3-KICKER-ROUTE-SUBTRACTION-QA-2026-08-18.md`.

## Structure / long-copy QA

The prior long-copy flow repair remains intact: variable subtitle/note flow uses native height-following structure rather than absolute text overlap.

Fresh post-subtraction readback:

- selected root: `990×1400`;
- selected visible native text: `4`;
- selected IMAGE fills: `0`;
- selected visible text outside root: `0`;
- selected text-to-text collisions: `0`;
- long-copy visible native text: `4`;
- long-copy IMAGE fills: `0`;
- long-copy visible text outside root: `0`;
- long-copy text-to-text collisions: `0`;
- comparison and both rollback roots hidden after QA.

Variable date/location copy remains native editable text. No final or variable copy is baked into SVG/raster.

## Asset / Drive decision

Exact Drive folder was live-read before the 2026-08-18 Figma write and remains `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`.

Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the current concrete defects were redundant fixed copy/decorative routing, not missing photography or texture.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs exist:

- final booth wording and exact placement location;
- intended stand/board/mounting method;
- actual installation sightline and 1.5–3m viewing check;
- printer template/profile, final bleed/safe area;
- physical print and venue-lighting proof.

Do not reopen the selected visual family for cosmetic churn unless a fresh screenshot, physical proof or authoritative input exposes a concrete defect.