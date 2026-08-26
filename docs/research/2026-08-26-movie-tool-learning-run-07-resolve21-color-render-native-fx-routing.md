# Movie Tool Learning Run 07 — Resolve 21 color/render context + native Resolve FX routing

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

A handoff can preserve timeline geometry and motion yet still render differently because project/output color context or effect color management differs. Separately, a reusable wedding effect should not default to Fusion when Resolve 21 already provides a simpler native effect.

## 1. Render-job output context is part of fidelity

DaVinci Resolve 21 adds a per-render-job option to override RCM or ACES outputs. Therefore `same project color management` is not sufficient evidence that two exports used the same output transform.

Golden Handoff / Delivery evidence must capture:

- project color science / color management mode,
- timeline color space where applicable,
- output color space/gamma,
- whether a Deliver render job overrides RCM/ACES output,
- render preset name plus actual resolved settings,
- codec/container/bit depth/alpha behavior,
- viewer/render comparison context.

Guardrail:

`PROJECT_COLOR_CONTEXT != RENDER_JOB_COLOR_CONTEXT`

Do not call a visual mismatch a motion mismatch until color/output context is matched.

## 2. OFX color behavior is version/dependency sensitive

Resolve 21 supports OpenFX 1.5 Color Management APIs for colorspace-aware effects. This should provide more robust color handling, but it also means a Golden effect recipe involving OFX has additional dependencies:

- Resolve 21.x patch,
- OFX/plugin name and version,
- plugin color-management awareness,
- project color-management mode,
- input/output transform state.

A `.drfx` template that references an OFX plugin is not self-contained merely because the template bundle installs.

Guardrail:

`DRFX_INSTALLED != OFX_DEPENDENCY_PORTABLE`

Every template sidecar manifest must list external OFX dependencies and tested versions. Missing/non-matching OFX must fail closed to a guided fallback, not silently render a different look.

## 3. Prefer built-in Resolve FX before custom Fusion where semantics match

Resolve 21 includes/updates native Resolve FX including Picture in Picture and Video Collage improvements. Picture in Picture provides framing/shape controls from the Edit/Cut effect workflow.

For a simple wedding photo inset, floating video window, border/frame or collage-style composition, compiler routing should check a native Resolve FX semantic match before generating a custom Fusion graph.

Preferred order:

1. Native Edit/Cut property.
2. Native Resolve FX with sufficient editable controls.
3. Text+/native title where appropriate.
4. Fusion Macro/Edit Template packaged as `.drfx`.
5. Full Fusion composition.
6. Bake only when portability/editability cannot be preserved.

Guardrail:

`CUSTOM_FUSION_REQUIRES_NATIVE_ROUTE_CHECK`

Native does not automatically mean visually identical; semantic and render parity still need a Canary.

## 4. New canaries

### DV21-COLOR-RENDER-01

Create one synthetic timeline and render it twice:

- A: project output context with no render override,
- B: explicit per-render-job RCM/ACES output override.

Record project settings, job settings and frame hashes/visual diff. Confirm the verifier can distinguish a color-context mismatch from a motion mismatch.

### DV21-OFX-DEPS-01

Create a trivial template using one known OFX effect. Package/install in a clean context where:

1. matching OFX version is present,
2. OFX is missing,
3. a different version is present if safe/available.

Record install visibility, warning behavior, render result and fallback behavior.

### DV21-NATIVE-FX-01

Build the same simple picture-in-picture look by:

- native Resolve Picture in Picture FX,
- minimal Fusion Macro.

Compare parameter coverage, editability, keyframe workflow, save/reopen portability, render parity and dependency footprint. Prefer the native recipe when fidelity is sufficient.

## 5. Verification recipe refinement

Before comparing Palmier/Remotion render with Resolve:

1. Match timeline FPS/resolution.
2. Match project color context.
3. Confirm Deliver render-job override state.
4. Confirm codec/container/alpha interpretation.
5. Confirm font/LUT/OFX dependencies.
6. Only then compare transform/mask/text/motion.

This avoids false motion failures caused by delivery/color differences.

## Trust-state changes

- Per-render-job RCM/ACES output override: official Resolve 21 evidence; Wedding Runtime Pending.
- OFX 1.5 colorspace-aware API support: official Resolve 21 evidence; specific plugin behavior remains dependency/runtime scoped.
- Picture in Picture native FX route: official Resolve 21 evidence; Wedding semantic parity Pending.

## Research saturation

NO_CHANGE is false. This run adds a missing render-color fidelity axis and a concrete Reuse-Before-Build route using native Resolve FX. High-value runtime backlog remains.

## Primary evidence

- Blackmagic Design, DaVinci Resolve 21 New Features Guide, General Improvements: per-render-job override for RCM/ACES outputs.
- Blackmagic Design, DaVinci Resolve 21 New Features Guide, Color: OpenFX 1.5 Color Management APIs.
- Blackmagic Design, DaVinci Resolve 21 New Features Guide, Resolve FX: Picture in Picture / Video Collage.
