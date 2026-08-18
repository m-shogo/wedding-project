# ADD-06 フォトブースサイン — V3 Lens Reticle Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS`
Date: 2026-08-19
Start authority SHA: `f84f1e1efdb6cacf2dd84a5f1be6b14885e51f63`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- selected clean-room V3: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- long-copy proof: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15`
- retained legacy production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- Drive write: `0`

The selected V3 remains the current clean-room family. This run did not use retained legacy production as an authoring source and did not mutate it.

## Visible problem

Fresh whole-item and actual-size review found the editable lens target still contained four simultaneous targeting cues:

1. blue outer ring;
2. grey dashed intermediate reticle;
3. mint crosshair layer;
4. dark inner aperture ring.

With `BEST SHOT` and `写真撮影はこちら` already carrying the photo-booth meaning, the dashed reticle plus crosshair pushed the fixed vector toward radar/target/UI semantics rather than a restrained camera-lens mark.

## Bounded comparison

Two rollback-safe comparisons were created from the current selected clean-room V3 only:

- `33:2 / QA_ADD06_V3_LENS_SIMPLIFY_A_NO_DASHED_RETICLE_2026_08_19`
  - hid only the grey dashed reticle;
- `33:22 / QA_ADD06_V3_LENS_SIMPLIFY_B_NO_RETICLE_NO_CROSSHAIR_2026_08_19`
  - hid the grey dashed reticle and mint crosshair;
  - retained the blue outer ring and dark inner aperture.

At reading scale, B was the stronger treatment: the lens semantic remained immediate, while the radar/target-widget impression disappeared. A was improved over the starting state but still retained the crosshair UI cue.

Both comparison roots were returned to hidden state after adoption.

## Adopted Figma change

Selected V3 `25:3`:

- `25:7` dashed reticle: hidden;
- `25:8` mint crosshair: hidden;
- `25:6` blue outer lens ring: retained;
- `25:9` dark inner aperture: retained.

Long-copy proof `25:41` was synchronized:

- `25:45` dashed reticle: hidden;
- `25:46` mint crosshair: hidden;
- `25:44` blue outer lens ring: retained;
- `25:47` dark inner aperture: retained.

Pre-change rollback copies:

- `34:2 / ROLLBACK_ADD06_V3_PRE_LENS_RETICLE_SUBTRACTION_2026_08_19` — hidden;
- `34:22 / ROLLBACK_ADD06_V3_STRESS_PRE_LENS_RETICLE_SUBTRACTION_2026_08_19` — hidden.

## Three-scale visual QA

- whole / thumbnail (`maxDimension=500`): PASS — `BEST SHOT`, Japanese direction text, simple lens symbol and footer remain immediately legible;
- reading scale (`maxDimension=1000`): PASS — comparison B is materially quieter than the starting target treatment without creating false premium emptiness;
- actual size (`990×1400`): PASS — the two-ring lens remains intentional and clean; no dashed/crosshair micro-geometry is needed for meaning.

The long-copy proof was temporarily shown and reviewed at native `990×1400`, then returned to hidden state. The longer Japanese direction line and longer installation-location placeholder remain visually clear with the simplified lens.

## Structure QA

Post-adoption readback:

### Selected `25:3`

- root: `990×1400`;
- visible native text: `4`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- same-parent text collisions: `0`;
- visible lens children: blue outer ring + dark inner aperture only.

### Long-copy proof `25:41`

- visible native text: `4`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- same-parent text collisions: `0`;
- visible lens children: blue outer ring + dark inner aperture only;
- proof returned to hidden state after screenshot QA.

No variable copy was baked into vector/raster content.

## Asset / generation decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported defect was excess UI-like vector treatment, not missing hero imagery, texture, or photography. No generated asset and no Drive asset were added.

## Result

`VERIFIED_LOCAL / LENS_RETICLE_UI_SUBTRACTION_ADOPTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Deferred physical/vendor gates remain unchanged.