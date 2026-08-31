# ADD-06 フォトブースサイン — QA

Status: `CURRENT / V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / ACTUAL_SIZE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority — V4

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current V4 page: `59:2 / V4 / ADD-06 / LIGHT WINDOW / 2026-08-31`
- Current V4 root: `59:3 / V4 / ADD-06 / LIGHT WINDOW / A3 BLEED 303x426mm`
- hidden V4 long-copy proof: `60:2 / QA / HIDDEN / V4 LONG COPY / LIGHT WINDOW`
- hidden trim guide: `59:4`
- hidden 12mm safe guide: `59:5`
- editable flash SVG: `59:10`
- retained previous V3 Current: `56:106 / STRIP IN THE LIGHT` — comparison / rollback only

Exact Drive authority:

- folder: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- prior V3 SVG master: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1 / photo-strip-continuous-developed-prints-v2.svg` — retained history only, **not used by V4**

Current V4 evidence:

- `V4-LIGHT-WINDOW-QA-2026-08-31.md`

Retained V3 evidence remains historical comparison/rollback only:

- `CLEANROOM-V3-STRIP-IN-THE-LIGHT-PROMOTION-QA-2026-08-25.md`
- `CONTINUOUS-PHOTO-STRIP-V2-REFINEMENT-QA-2026-08-25.md`
- `OBSERVED-TOP-CORAL-CROP-WEB-HEADER-RISK-2026-08-27.md`
- `FIGMA-TOP-CORAL-CROP-SUBTRACTION-QA-2026-08-27.md`

## V4 exclusive clean-room result

V4 was created on a new blank page/frame. No old production/V2/V3 frame, continuous photo strip, old lower dark field, old vectors, old crop or ornament was duplicated into V4. Verified semantic copy and physical requirements were manually re-authored.

V4 direction: **LIGHT WINDOW**.

- warm paper field;
- deep-blue asymmetric right light field;
- mint + silver aperture/light window;
- one editable SVG flash glyph;
- Japanese-first hero typography;
- native lower date/location stack;
- no generated raster, fake people, fake camera UI, badge grid, or web-card layout.

Reading hierarchy:

1. `写真撮影はこちら`;
2. `フォトブース` / guidance;
3. light-window fixed art;
4. `写真を撮って、今日を持って帰ろう。`;
5. date + `[会場内設置場所]`.

## Three-scale / visual comparison

Live final V4 screenshots:

- thumbnail `356×500`: **PASS** — hero first-read is immediate at sign distance;
- reading `712×1000`: **PASS** — Japanese hierarchy and asymmetric aperture remain coherent;
- actual/native `1010×1420`: **PASS** — type, rules and fixed art hold at production detail scale.

Retained V3 `56:106` was separately re-rendered at 500px for comparison. V4 is materially different from V3's tilted continuous photo-strip + lower dark field and is selected as the valid V4-exclusive authority.

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is restored on **V4**, not inherited from the old V3 label.

## Print-first authority

Item `SPEC.md` confirms:

- primary trim: **A3 portrait 297 × 420 mm**;
- bleed: **3 mm each side**;
- V4 bleed canvas: **303 × 426 mm / 1010 × 1420 px**;
- safe: **12 mm inside trim**;
- viewing distance: about **1.5–3 m**;
- working scale: 3.333 px/mm.

Actual-size typography:

- hero ≈ **83.3 pt**;
- `フォトブース` ≈ **37.4 pt**;
- guidance ≈ **25.5 pt**;
- closing ≈ **27.2 pt**;
- date ≈ **27.2 pt**;
- location ≈ **26.4 pt**;
- English item label ≈ **18.7 pt**.

No microtype is used. Fixed rules are also physically credible at current scale: 0.6mm silver note rule, 2.4mm mint anchor, 3.0mm aperture ring.

No fold, punch, perforation, QR, handwriting field, sticker application or binding applies to the primary A3 sign. Stand/board/mounting and venue sightline remain deferred.

## Structure / long-copy QA

Initial screenshot QA found a real V4 first-draft fault: the lower native Auto Layout clipped date/location. It was corrected before pass.

Final:

- visible native text roles: 7;
- fixed-height visible text: 0;
- all visible production text inside confirmed 12mm safe: **PASS**;
- lower native info Auto Layout: `59:22`;
- raster IMAGE fills: 0;
- generated raster: 0;
- hidden stress proof remains hidden.

Stress includes long guidance, `[メインダイニング前・フォトブース特設スペース]`, and longer closing copy. All remain native auto-height, safe, and collision-free.

## Raster / CMYK

V4 contains no raster IMAGE fills.

- effective PPI: `N/A`;
- `RESOLUTION_WARNING`: `NONE`.

CMYK/print risks still requiring proof:

- deep blue may darken;
- mint may gray out;
- silver-gray may lose contrast against warm paper;
- cream may shift yellow depending on stock/profile;
- final black construction must follow printer specification rather than assuming rich black/100K.

Grayscale hierarchy is structurally retained, but actual grayscale/profile proof is still required.

## Drive / generation

Drive folder was live-confirmed on 2026-08-31. No Drive write was required.

`IMAGE_GENERATION_NOT_REQUIRED`: V4 gains its identity through typography, physical sign geometry and editable light/aperture vector art; adding raster imagery would not solve a missing production role.

## Deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

Keep `NOT_PRINT_READY` until all applicable final inputs/proofs exist:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile;
- CMYK + grayscale proof and final black construction;
- PDF export / font embedding;
- transparency / overprint / knockout check;
- preflight;
- 100% proof or physical print/venue-lighting proof.

## Decision / next

`V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / ACTUAL_SIZE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.

Continue progression order with ADD-07, while ADD-01 remains separately blocked only on real-photo Figma import and ADD-15 remains separately blocked on its explicit deployment decision.