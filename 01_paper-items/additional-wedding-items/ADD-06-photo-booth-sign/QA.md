# ADD-06 フォトブースサイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED_CANDIDATE / LEGACY_PRESERVED / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Updated: 2026-08-15

This file began as the 2026-08-02 pre-Figma QA checklist. The retained production is preserved as rollback/comparison history. The 2026-08-15 clean-room rebuild mandate requires new V2/V3 work to start from blank frames without visual reuse from retained production.

## Live production authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- page: `0:1 / ADD-06_PHOTO_BOOTH_SIGN`
- retained production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- selected clean-room candidate: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- retained clean-room V2 comparison: `23:3 / CLEANROOM_ADD06_V2_A3_PHOTO_SPOT_FIELD_GUIDE`
- Drive folder: `ADD-06_フォトブースサイン` / `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`
- previous promoted-production evidence: `FIGMA-NATIVE-EDITORIAL-PROMOTION-2026-08-12.md`

## 2026-08-15 zero-reuse clean-room rebuild

Observed latest `main` before the run: `ddd3253da041d43ef86147201ab4f9a6eab42ec4`.

The previous production was not duplicated, copied, or used as a component library. Only the current SPEC facts/constraints were used during authoring:

- A3 portrait / 990×1400 working canvas for 297×420 mm;
- 3 mm bleed requirement and 12 mm safe-area requirement;
- viewing distance about 1.5–3 m;
- permitted title roles `PHOTO SPOT`, `BEST SHOT`, `TRAVEL MEMORY`;
- support copy `Capture a memory from our special journey.`;
- wedding date `2026.10.24`;
- unresolved placement kept as native semantic placeholder;
- no real-person generation and no variable copy baked into raster/SVG.

### V2 — field-guide / viewfinder direction

Blank-frame V2:

- section `23:2 / CLEANROOM_ADD06_V2_2026_08_15`;
- root `23:3 / CLEANROOM_ADD06_V2_A3_PHOTO_SPOT_FIELD_GUIDE`;
- new editable vector `23:8 / VECTOR_VIEWFINDER_MARK_V2_EDITABLE`;
- variable/factual copy remained native Figma text;
- raster IMAGE fill count 0;
- hidden `GUIDE_SAFE_12MM` preserves the print-safe reference.

Three-scale screenshot review:

- whole-item / 500 px: PASS for immediate `PHOTO SPOT` recognition and clean central photo-space cue;
- reading / 1000 px: PASS;
- actual-size / 990×1400: PASS.

After V2 was complete, the retained production was viewed for comparison for the first time in this run. V2 improved immediate wayfinding but did not clearly beat the retained production's visual richness, so V2 was preserved as comparison rather than promoted.

### V3 — BEST SHOT / lens-poster direction

A second materially different direction was then authored from another blank A3 frame. No V2 or retained-production nodes/assets were copied.

- section `25:2 / CLEANROOM_ADD06_V3_SELECTED_CANDIDATE_2026_08_15`;
- root `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`;
- new editable SVG/vector roles:
  - `25:5 / VECTOR_LENS_TARGET_V3_EDITABLE`;
  - `25:10 / VECTOR_ROUTE_SWEEP_V3_EDITABLE`;
- native copy roles: `PHOTO SPOT`, `BEST SHOT`, support sentence, `写真撮影はこちら`, date, and semantic placement placeholder;
- 6 visible native text nodes;
- raster IMAGE fill count 0;
- visible text outside root 0;
- safe guide retained hidden.

V3 screenshot QA:

- whole-item / 500 px: PASS; strongest first-read hierarchy of the tested clean-room directions;
- reading scale: PASS; `PHOTO SPOT → BEST SHOT → support → 写真撮影はこちら` remains legible without card/UI containment;
- actual-size / 990×1400: PASS; vector lens/route detail remains crisp and the lower information field reads as a physical poster footer rather than an app panel.

Long-copy QA:

- production text roles were corrected to fixed-width `textAutoResize=HEIGHT` behavior before final QA;
- hidden stress root: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15`;
- stress subtitle, Japanese note, and placement placeholder all remained inside the 990×1400 root;
- stress screenshot at reading scale: PASS;
- stress root hidden after verification.

Comparison decision: V3 is the selected clean-room candidate because it adds stronger 1.5–3 m wayfinding, a distinct photo/lens semantic cue, and clearer thumbnail hierarchy without raster generation, fake photography, cards, badges, gradients, shadows, or old-layout reuse. The retained production remains untouched for rollback/history.

Image decision: `IMAGE_GENERATION_NOT_REQUIRED`. The current clean-room solution is stronger through typography + editable vector semantics; no missing raster role was identified. Drive write 0.

Current result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED_CANDIDATE / LEGACY_PRESERVED`.

## Previous visual / structure QA history

The retained production before the clean-room mandate had already passed a reopened editorial QA:

- Japanese headline `旅の記憶を、ここで一枚。` was the dominant hierarchy;
- production had 11 native text nodes / 10 visible, 0 raster IMAGE fill nodes and 0 visible text outside frame bounds;
- no flatten/raster replacement was introduced and variable text remained native editable;
- a redundant English rail mark was hidden on 2026-08-14 under rollback `19:2`.

This evidence remains valid as historical structural/rollback evidence only; it is not used as the construction source for the clean-room candidate.

## Drive / image asset state

Drive authority is live at `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`. No new Drive asset was required in the 2026-08-15 clean-room rebuild.

## Deferred finalization

- [ ] final photo-booth wording / placement location
- [ ] actual installation sightline and distance check
- [ ] intended stand / board / mounting method
- [ ] printer template/profile, exact bleed/safe-area proof
- [ ] 100% physical print and venue-lighting check

Keep `NOT_PRINT_READY` until physical/vendor checks and final copy are authoritative.