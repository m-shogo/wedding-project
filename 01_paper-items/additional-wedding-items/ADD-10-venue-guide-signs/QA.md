# ADD-10 会場案内サイン — QA

Status: `CURRENT / V4_MARGIN_WAYFINDING_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / V3_AND_LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- V4 blank page: `61:2 / V4 / ADD-10 / MARGIN WAYFINDING / 2026-08-31`
- V4 LEFT / RIGHT / FORWARD: `61:3 / 61:14 / 61:25`
- hidden V4 long-copy stress: `63:6`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- detailed V4 evidence: `FIGMA-V4-MARGIN-WAYFINDING-QA-2026-08-31.md`
- Drive writes for V4: `0`

The previous selected V3 `49:3 / 49:19 / 49:33`, its stress `49:47`, earlier V4 `32:3 / 32:15 / 32:27`, V2 and legacy families remain preserved as comparison/rollback history only. They are not construction bases for the selected V4.

## V4 result

The selected V4 was created from blank A4 frames on a new page. It uses a warm paper field, deep-navy physical margin rail, narrow yellow entry tick, Japanese-first type hierarchy, one oversized coral editable-vector direction silhouette, and a deep-navy bottom instruction field. It does not reuse the old production/V2/V3 visual grammar or node groups.

Responsibility split:

- variable/final text: native editable Figma text;
- destination + floor/room resilience: native vertical Auto Layout;
- direction gesture: editable SVG vector tree;
- fixed paper/signal geometry: native shapes;
- raster/generated image fills: `0`;
- replaceable image role: `0`.

Three-scale visual QA and the `1400×1980` actual-size working render pass. LEFT/RIGHT/FORWARD remain immediately distinguishable at thumbnail scale. The new V4 avoids the prior full dark-panel/block-stack grammar and reads as an item-specific editorial wayfinding family rather than a web-card template.

## Structure / long-copy QA

Fresh readback for all three selected V4 frames:

- canvas: `1400×1980` each;
- visible native text: `5` each;
- outside visible text: `0` each;
- IMAGE fills: `0` each;
- editable VECTOR: `1` each;
- destination/floor flow: `1` native Auto Layout each;
- variable text: `textAutoResize=HEIGHT`.

QA-only stress `63:6` uses `[メインダイニング・レセプション会場]` and `[ホテル棟 3階・オーシャンビュー バンケットルーム]`. The first stress render exposed an over-large copy role and default white Auto Layout fill; both were corrected. Final stress renders without copy/arrow/instruction collision and was hidden after QA.

## Print-first status

Working physical authority: A4 portrait `210×297 mm`, `1400×1980 px`, approximately `6.667 px/mm`.

Approximate actual-size text:

- destination `116 px` ≈ `49.3 pt`;
- floor/room `52 px` ≈ `22.1 pt`;
- guidance `50 px` ≈ `21.3 pt`;
- sign label `46 px` ≈ `19.6 pt`;
- date `28 px` ≈ `11.9 pt`.

Raster effective PPI: `N/A`; `RESOLUTION_WARNING`: none.

Do not infer 3 mm bleed. `trim / bleed / safe` remain `DEFERRED_FINALIZATION` until printer/template authority is fixed. The margin rail and bottom instruction field intentionally meet the working trim and must be extended only according to the final printer template.

Remaining physical/production checks:

- final destination/room/floor wording and exact LEFT/RIGHT/FORWARD truth per installation point;
- sign count and installation locations;
- stand/frame/wall-mount occlusion and safe-area proof;
- venue-light / glare proof and first-time visitor route walk-through;
- printer template/profile and final trim/bleed/safe geometry;
- CMYK proof for deep navy, saturated coral, signal yellow and warm cream, with grayscale hierarchy check;
- final black construction according to printer specification;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% physical proof.

QR / punch / fold / handwriting / sticker application: not applicable to current ADD-10 authority.

`DESIGN_COMPLETE != PRINT_READY` remains in force.