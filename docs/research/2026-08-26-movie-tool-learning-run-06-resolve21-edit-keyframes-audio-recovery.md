# Movie Tool Learning Run 06 — Resolve 21 Edit-page keyframing / sample-accurate audio recovery

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

Run 04/05 established Resolve 21 `.drfx` / Macro / Lottie / Fairlight Animator routes. This run checks whether rebuilt motion has to be edited in Fusion, and whether Palmier-lost audio automation can be recovered with sufficient timing precision inside Resolve 21 even when no scripting write surface is available.

## 1. Resolve 21 Fusion templates can expose keyframeable controls directly in Edit

Blackmagic's DaVinci Resolve 21 New Features Guide documents that Fusion Effects, Generators, Text tools, and transitions placed from the Cut/Edit pages can expose their Fusion parameters directly in the Edit-page Keyframe Editor. One or more such items can be selected and the relevant Fusion parameters keyframed there. The guide also recommends limiting the visible keyframe parameters to only those needed.

This materially improves the Wedding `.drfx` route:

`Canonical Motion Spec -> Fusion graph -> Macro exposes only Human Master controls -> .setting -> .drfx -> Edit page -> Keyframe Editor`

The user does not need to open the Fusion page for every routine timing/intensity edit if the template was authored correctly.

Guardrails:

`FUSION_BACKED_TEMPLATE != FUSION_PAGE_ONLY`

`EXPOSE_MINIMUM_CONTROLS`

A Wedding Motion Template should expose only stable semantic controls such as amount, position, scale, rotation, softness, radius, start/end timing or intensity. Internal helper-node controls must remain hidden.

Important boundary: Blackmagic explicitly distinguishes Edit/Cut-page Fusion effects from normal Fusion clips/compositions. Normal Fusion compositions continue to use Fusion's own keyframe editor. Therefore template packaging/category is part of the capability recipe.

## 2. Resolve 21 supports multi-clip keyframe editing

Resolve 21 lets the Keyframe Editor display and edit keyframes for multiple selected clips at once, including stacked and sequentially arranged selections. This creates a better bounded human recovery path for repeated wedding motions across several photos.

Instruction pattern:

1. Select only the intended clips.
2. Open Keyframe mode.
3. Verify the displayed clip identities/count.
4. Show only the intended parameter family.
5. Apply Human Master values/timing.
6. Re-read curves visually before leaving the scope.

This is a manual/UI reliability improvement; it is not scripting write evidence.

## 3. Resolve 21 audio keyframes are sample-accurate in Edit

The Resolve 21 New Features Guide explicitly states that audio keyframes can be added and moved with subframe, audio-sample accuracy on the Edit page. Markers and duration markers can also start/end between video frames, and timeline scrubbing supports subframe increments with audio feedback when sufficiently zoomed in.

Palmier exporter evidence still classifies Audio Volume keyframes and Fade as not transported through its FCPXML path. Therefore their Palmier->Resolve transport class remains LOST.

However, recovery quality changes:

- transport fidelity: `LOST`,
- automation availability: still `ASSISTED_REBUILD` until a write API is reproduced,
- Resolve native recovery timing precision: `SAMPLE_ACCURATE_UI`,
- Human Master requirement: exact dB/value + absolute/relative timing + curve/ease intent,
- wedding usability: substantially better than frame-rounded manual recreation.

Guardrail:

`HANDOFF_LOST != NATIVE_RECOVERY_LOW_PRECISION`

Do not conflate loss in FCPXML transport with inability to recreate the value accurately in Resolve.

## 4. Audio rebuild instruction contract

For every Palmier audio envelope that cannot transport, preserve a sidecar record containing at minimum:

- timeline/clip stable id or match fingerprint,
- source and timeline time references,
- keyframe time in seconds and/or samples relative to clip start,
- dB/value,
- interpolation/curve intent,
- fade role (`fade-in`, `fade-out`, `duck`, `custom-envelope`),
- expected audible verification point.

Resolve Free instruction should explicitly say:

- Page: Edit (or Fairlight only if that recipe is intentionally selected),
- select exactly the named audio clip,
- zoom until subframe editing is available,
- place/move keyframes using the Human Master timing,
- set level values,
- compare waveform/listening checkpoints,
- do not alter adjacent tracks/clips.

This is safer than a vague instruction such as 'fade the music naturally'.

## 5. New canaries

### DV21-DRFX-EDIT-KF-01 — Edit-page parametric template editability

On Resolve 21 Free:

- install a trivial `.drfx` Fusion Effect/Title with two exposed semantic controls,
- place it from Effects Library on the timeline,
- confirm exposed Fusion parameters appear in the Edit Keyframe Editor,
- keyframe them without entering Fusion,
- save/reopen,
- change clip duration,
- render before/after frames,
- record which controls remain stable/editable.

Only the exact template category/control recipe that passes may be promoted to `PARAMETRIC_NATIVE` editability.

### DV21-MULTI-KF-01 — bounded multi-clip edit

- place three clips with the same compatible template,
- select only clip 1 and clip 3,
- open Keyframe Editor,
- verify both and only both are visible,
- change an exposed parameter,
- confirm clip 2 remains untouched.

This is an Instruction Reliability canary.

### DV21-AUDIO-SAMPLE-01 — sample-accurate assisted rebuild

- create a synthetic Human Master envelope with keyframes intentionally between video-frame boundaries,
- reconstruct it manually in Resolve 21 Edit using subframe/sample-level positioning,
- save/reopen,
- compare timing by waveform/listening and timeline readout,
- render audio and compare envelope timing against the source reference.

Promotion target is `ASSISTED_REBUILD + SAMPLE_ACCURATE_UI`, not AUTO_REBUILD.

## 6. Compiler routing refinement

For visual properties lost from Palmier FCPXML but deterministically known:

1. Resolve-native Edit/Text+ property if semantic match exists.
2. Generated Fusion Macro/Edit template packaged as `.drfx` with minimum exposed controls.
3. Edit-page Keyframe Editor for routine parameter animation.
4. Fusion page only for graph-level or non-exposed edits.
5. Bake fallback only if native/template route fails portability or parity tests.

For audio volume/fades:

1. Preserve exact Human Master envelope sidecar.
2. Use Resolve 21 Edit sample-accurate audio keyframes as current Free recovery path.
3. Re-test official scripting write surfaces on each relevant 21.x patch/Studio runtime.
4. Do not promote to automatic write until a real mutation/readback test passes.

## Trust-state changes

- Edit-page keyframing of Cut/Edit Fusion templates: official Resolve 21 evidence; Wedding Runtime Pending.
- Multi-selected clip keyframe editing: official Resolve 21 evidence; Wedding Runtime Pending.
- Audio sample/subframe keyframe editing: official Resolve 21 evidence; Wedding Runtime Pending.
- Palmier audio keyframe/fade FCPXML transport: unchanged LOST.
- Audio automation scripting: unchanged PENDING/ASSISTED.

## Research saturation

NO_CHANGE is false. This run found a materially better native editability path for `.drfx` templates and a higher-precision Resolve 21 recovery route for Palmier-lost audio automation. Runtime canaries remain, so `RESEARCH_SATURATED` is not applicable.

## Primary evidence

- Blackmagic Design, DaVinci Resolve 21 New Features Guide, Cut/Edit: Keyframe Fusion Effects, Generators and Text Tools in the Keyframe Editor.
- Blackmagic Design, DaVinci Resolve 21 New Features Guide, Cut/Edit: Keyframe and Add Curves for Selected Clips.
- Blackmagic Design, DaVinci Resolve 21 New Features Guide, Cut/Edit: Subframe Support for Audio Keyframing and Markers.
