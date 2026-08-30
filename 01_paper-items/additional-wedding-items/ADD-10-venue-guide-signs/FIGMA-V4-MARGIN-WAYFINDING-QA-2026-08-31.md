# ADD-10 会場案内サイン — Figma V4 MARGIN WAYFINDING QA

Date: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start/main authority: `e5d8b62ada716a12a6dc378977034de24442a2eb`
Result: `V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / LEGACY_V3_PRESERVED / NOT_PRINT_READY`

## Live authority

- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- new blank V4 page: `61:2 / V4 / ADD-10 / MARGIN WAYFINDING / 2026-08-31`
- V4 LEFT: `61:3`
- V4 RIGHT: `61:14`
- V4 FORWARD: `61:25`
- hidden long-copy stress: `63:6`
- exact Drive folder: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- Drive writes: `0`
- retained prior selected V3 remains untouched: `49:3 / 49:19 / 49:33`
- retained earlier V4/history also remains untouched.

## V4 exclusive clean-room provenance

This V4 family was authored on a newly created blank Figma page and blank A4 frames. No production/V2/V3 frame was duplicated, restyled, or used as a component library. Prior designs were opened only for post-build comparison and rollback/history.

The new visual direction is `MARGIN WAYFINDING`:

- warm paper field instead of the prior full dark-field composition;
- one deep-navy physical margin rail;
- one narrow yellow entry tick with a signal/wayfinding role;
- Japanese-first destination hierarchy;
- oversized coral directional silhouette as the dominant navigation cue;
- deep-navy instruction field at the physical bottom edge;
- no fake airport code, ticket credential, badge, card grid, decorative English, gradient, shadow, stock imagery, or generic AI background.

The result is materially different from the retained V3 `COLOR SIGNAL`: the information is no longer contained in a full dark panel, the arrow crosses an open paper field, and the composition uses an editorial margin/edge grammar rather than a web-like block stack.

## Hybrid authoring roles

- destination / floor-room / guidance / date / sign label: native editable Figma text;
- destination + floor-room: native vertical Auto Layout for variable-copy resilience;
- directional arrow: one editable SVG vector tree per sign;
- margin rail / entry tick / bottom instruction field: simple native fixed geometry;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- IMAGE fills: `0`.

Image generation was not used because ADD-10 is a pure wayfinding object; imagery would reduce recognition speed and add stock/AI-template risk without solving a real visual defect.

## Three-scale visual QA

### Thumbnail / 3-second scan

PASS. At approximately `495×700` rendered size, RIGHT and FORWARD both preserve the first-read sequence `destination → direction → guidance`; the coral direction gesture remains unmistakable without relying on microcopy.

### Reading scale

PASS. LEFT at `637×900` keeps `会場案内`, `[目的地]`, `[階数・部屋名]`, the direction gesture and the bottom instruction field as five distinct hierarchy levels. It does not read as an admin dashboard or equal-card template.

### Actual-size / print-detail

PASS at the working A4 canvas `1400×1980`, corresponding to `210×297 mm` (`6.667 px/mm`). A fresh `1400×1980` render shows clean vector edges, no hairline dependence and no small low-opacity ornament required for recognition.

Approximate point equivalents from the working A4 geometry:

- destination `116 px` ≈ `49.3 pt`;
- floor/room `52 px` ≈ `22.1 pt`;
- guidance `50 px` ≈ `21.3 pt`;
- sign label `46 px` ≈ `19.6 pt`;
- date `28 px` ≈ `11.9 pt`.

These are credible at A4 actual size; final viewing-distance proof still depends on installation location.

## Long-copy stress and structural readback

QA-only LEFT clone `63:6` used:

- `[メインダイニング・レセプション会場]`
- `[ホテル棟 3階・オーシャンビュー バンケットルーム]`

The first stress render exposed two weaknesses: the original destination role was too large and the new Auto Layout frame retained its default white fill. Both were corrected rather than accepted visually.

Final V4 uses a transparent `1120 px` copy flow, destination `116 px`, floor/room `52 px`, native `HEIGHT` auto-resize, and `48 px` inter-role spacing. Fresh stress render passes without collision with the arrow or bottom instruction field. Stress `63:6` was hidden after QA.

Fresh structural readback for LEFT / RIGHT / FORWARD:

- canvas: `1400×1980` each;
- visible native text: `5` each;
- outside visible text: `0` each;
- IMAGE fills: `0` each;
- editable VECTOR count: `1` each;
- destination/floor native flow: `1` each;
- text roles use `textAutoResize=HEIGHT`;
- stress destination height: `278 px`;
- stress floor/room height: `124 px`;
- stress outside text: `0`.

The earlier disconnected/clipped arrow construction was caught by screenshot QA and replaced with a single editable vector silhouette before promotion.

## Sellable visual decision

`SELLABLE_VISUAL_QA_PASS`.

The V4 family is selected because it is a clean-room, item-specific wayfinding system with a strong Japanese hierarchy, immediate directional recognition, coherent LEFT/RIGHT/FORWARD family behavior, credible A4 print density, and no generic template/card grammar. The retained V3 remains as rollback/comparison evidence only and is not the V4 production base.

The earlier `DESIGN_QA_PASS_WITH_PLACEHOLDERS` is reused only for already-verified semantic/structural expectations; V4 has fresh long-copy and structural readback of its own.

## Print-first status

Working physical authority: A4 portrait `210×297 mm`. Raster effective PPI: `N/A` because V4 contains no IMAGE fills. `RESOLUTION_WARNING`: none.

No bleed was added speculatively. `trim / bleed / safe` remain `DEFERRED_FINALIZATION` until the printer/template authority is fixed. The left margin rail and bottom instruction field intentionally meet working trim; final bleed extension must follow the selected printer template rather than an assumed 3 mm value.

Physical/install checks still required:

- final destination names, room/floor terminology and exact LEFT/RIGHT/FORWARD truth per installation point;
- final sign count and installation locations;
- frame/stand/wall-mount occlusion and safe-area proof;
- matte/low-glare venue-light proof and first-time visitor route walk-through;
- printer template/profile and final trim/bleed/safe geometry;
- CMYK proof for deep navy, saturated coral, yellow and warm cream; grayscale hierarchy must remain recognizable;
- final black construction according to printer specification; do not infer rich black/100K/registration black now;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% physical proof.

QR / punch / fold / handwriting / sticker application: not applicable to ADD-10 in the current authority.

`DESIGN_COMPLETE != PRINT_READY` remains in force.