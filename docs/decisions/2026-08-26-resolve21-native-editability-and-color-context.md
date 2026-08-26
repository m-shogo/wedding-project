# Resolve 21 native editability / color-context routing decision

Date: 2026-08-26
Scope: Movie only.

## Decision

Resolve 21 is the major baseline. Patch versions are recorded as runtime coordinates, not treated as a different product family.

Compiler routing for Wedding Motion must prefer the smallest native editable path that preserves Human Master semantics:

1. Native Edit/Cut property or Resolve FX.
2. Native Text+/Title.
3. Fusion Macro saved as Edit Template and distributed via `.drfx`, exposing only semantic controls.
4. Full Fusion composition only when graph-level access is genuinely required.
5. Alpha/render bake only as portability fallback.

Fusion-backed Edit templates are not considered Fusion-page-only: Resolve 21 can keyframe their exposed parameters directly in the Edit Keyframe Editor. Audio envelopes lost in Palmier FCPXML remain transport LOST, but Resolve 21 Edit supports subframe/audio-sample-accurate keyframe positioning, so current Free recovery is `ASSISTED_REBUILD + SAMPLE_ACCURATE_UI` rather than low-precision manual approximation.

Visual handoff verification must separate motion fidelity from output/color fidelity. Project color management and Deliver-job RCM/ACES override state are recorded independently; OFX/plugin version and color-management awareness are explicit dependencies.

## Guardrails

- `FUSION_BACKED_TEMPLATE != FUSION_PAGE_ONLY`
- `EXPOSE_MINIMUM_CONTROLS`
- `HANDOFF_LOST != NATIVE_RECOVERY_LOW_PRECISION`
- `PROJECT_COLOR_CONTEXT != RENDER_JOB_COLOR_CONTEXT`
- `DRFX_INSTALLED != OFX_DEPENDENCY_PORTABLE`
- `CUSTOM_FUSION_REQUIRES_NATIVE_ROUTE_CHECK`

## Runtime gates

No recipe becomes Trusted from documentation alone. Promote only after clean-context install/import, parameter edit/readback, save/reopen, dependency check and render parity on Resolve 21.
