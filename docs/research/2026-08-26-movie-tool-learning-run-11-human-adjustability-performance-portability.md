# Movie Tool Learning Run 11 — Human adjustability / performance / portability

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

The previous runs established that a Resolve-native rebuild is not enough by itself. A Wedding Motion asset is only production-useful when a human can quickly understand what to change, preview it responsively, move it to another machine, and recover it when dependencies are missing.

This run promotes **Human Adjustability** and **Portable Adjustability** to first-class quality axes.

## Resolve 21 manual authority

Blackmagic Design publishes the DaVinci Resolve 21 instruction manual dated 2026-07-10. New Features Guide remains useful for delta discovery, but the full Resolve 21 manual is the operation/reference authority for stable recipes.

Policy:

`NEW_FEATURES_GUIDE_FINDS_CAPABILITY -> RESOLVE_21_MANUAL_DEFINES_RECIPE`

Use Support Notes for patch deltas, but do not let a patch note replace the full manual for normal operation semantics.

## Human Adjustability axis

A handoff can be visually exact and still be bad for humans to maintain. Track adjustability separately from visual/transport fidelity.

Candidate classes:

- `EASY_INSPECTOR`: normal Edit/Cut Inspector controls, clearly named, no Fusion graph knowledge needed.
- `EASY_TIMELINE`: keyframes/curves can be edited directly on Edit/Cut timeline and their meaning is obvious.
- `GUIDED_FUSION`: Fusion is required, but the graph is bounded, named and documented.
- `EXTERNAL_REBUILD`: source values live outside Resolve and require a compiler/script/sidecar regeneration step.
- `BAKED`: only whole-clip transform/opacity/etc. remains editable; internal motion is rendered.

Preferred Wedding template policy:

1. Expose only high-value controls.
2. Use human names such as `Photo`, `Text`, `Motion Amount`, `Duration`, `Scale`, `Position`, `Color`, `Border`, `Shadow` rather than internal node names.
3. Prefer 3–8 primary controls. Put advanced controls behind an explicit Advanced group if needed.
4. Set useful defaults plus bounded min/max ranges.
5. Avoid exposing coupled low-level parameters that can make the graph invalid.
6. If a parameter can be edited from the Edit/Cut page, do not require opening Fusion only because the implementation is Fusion-backed.

Guardrail:

`FUSION_BACKED != HUMAN_MUST_EDIT_FUSION_GRAPH`

## Keyframe/curve usability

Resolve 21 improves keyframe editing across Edit/Cut. A Wedding `.drfx` should prefer exposed animatable controls so timing changes can be made in the normal editor where possible.

Canary `DV21-HUMAN-KF-01`:

- install a Wedding test `.drfx`,
- add it to a clean timeline,
- change `Motion Amount`, `Scale`, and one color value from Inspector,
- keyframe at least one exposed numeric control from Edit/Cut,
- edit the curve/ease without opening the Fusion graph,
- save/reopen and confirm values and keyframes survive,
- record number of clicks and whether a non-Fusion user can identify the intended controls.

Promotion target: `EASY_INSPECTOR` + `EASY_TIMELINE` only if the recipe passes.

## Proxy/cache is a usability dependency, not deliverable state

Motion assets can be editable but unpleasant if preview performance is too slow. Resolve's proxy, optimized media and render cache systems improve interaction performance but are generated/working-state artifacts and must not be treated as canonical source media.

Rules:

- Human Master and source media remain canonical.
- Proxy/optimized media/cache is rebuildable performance state.
- Golden render validation should record whether optimized media/cache/proxy use was enabled for the render.
- Do not call a project portable merely because playback is fast on the source machine.
- A clean restore must be able to regenerate performance media.

Guardrail:

`CACHE_PRESENT != PROJECT_PORTABLE`

`PROXY_AVAILABLE != SOURCE_AVAILABLE`

## Alpha-sensitive cache/proxy/render paths

For overlays, stamps, cloud elements and other transparent Wedding assets, alpha preservation must be checked independently. Historically Resolve formats such as ProRes 4444/4444 XQ and DNxHR 444 are used for high-fidelity alpha-capable intermediate paths, but exact codec availability and alpha behavior are OS/edition/version dependent.

Therefore no generic `PRORES_4444_ALWAYS_WORKS` claim is allowed.

Canary `DV21-ALPHA-PATH-01`:

- source: known RGBA test pattern with semi-transparent edges,
- import into Resolve 21,
- test normal timeline playback,
- test proxy/optimized/cache candidate used by the project,
- export the intended alpha intermediate,
- re-import the result over checkerboard/background,
- compare alpha edge and RGB values,
- repeat after save/reopen.

Record container, codec, pixel format, OS, Resolve Free/Studio, color management and render settings.

Guardrail:

`ALPHA_IMPORT_OK != ALPHA_CACHE_OK != ALPHA_EXPORT_OK`

## Dependency manifest for easy human recovery

Every reusable Wedding Motion package should expose a small human-readable dependency receipt. Minimum fields:

- package/template id + version,
- tested Resolve 21 patch + edition,
- target category (`Effect`, `Title`, `Generator`, `Transition`, `Fusion`),
- required media files,
- required fonts,
- LUTs,
- OFX/plugins,
- Lottie/OGraf assets,
- expected Inspector controls and defaults,
- relink instructions,
- source Human Master / sidecar path,
- cache/proxy regeneration note,
- known fallback render artifact.

Human recovery should answer, in under one minute:

1. What is missing?
2. Where should it be installed/relinked?
3. What is safe to change?
4. What should not be touched?
5. What fallback can be used if the dependency cannot be restored?

## Font / LUT / OFX dependency policy

Fonts, LUTs and OFX are not assumed to travel with `.drt`, `.setting`, `.drfx`, or project archives unless a documented/tested path proves it for the exact artifact type.

Classify each dependency:

- `EMBEDDED_AND_VERIFIED`
- `BUNDLED_BUT_EXTERNAL_INSTALL`
- `REFERENCE_ONLY`
- `OPTIONAL_WITH_NATIVE_FALLBACK`
- `UNSUPPORTED_ON_TARGET`

Wedding policy prefers native Resolve/Fusion operations and system-safe fonts where visual quality is acceptable. Third-party OFX is allowed only when the improvement clearly outweighs portability cost.

Guardrail:

`PROJECT_OPENS != DEPENDENCIES_RESOLVED`

## Late Edit test

A reusable template must survive the realistic late-change scenario.

Canary `DV21-LATE-EDIT-01`:

- create a 10–15s scene using at least one Text+/template, photo, Lottie/OGraf or alpha overlay,
- save project,
- reopen on a clean Resolve session,
- replace the photo,
- edit the copy,
- shorten the scene by 20%,
- reduce motion intensity,
- change one brand/wedding color,
- render again,
- score how many changes required Fusion graph access, external regeneration, dependency repair or bake replacement.

Trusted human-adjustable target:

- photo and text replacement: no Fusion graph,
- motion amount: no Fusion graph,
- duration/timing: Edit/Cut timeline or exposed control,
- color: Inspector where meaningful,
- zero unexplained missing dependencies.

## Compiler routing update

When two implementations look equivalent, choose in this order:

1. Resolve native Edit/Text+/Resolve FX with easy Inspector controls.
2. Fusion-backed Edit Template with curated exposed controls.
3. Lottie/OGraf direct import when clip-level editability is sufficient.
4. Human Master + `.drfx` generated rebuild with assisted install.
5. Guided Fusion graph.
6. Remotion/other external renderer + sidecar.
7. Bake-only fallback.

This ordering optimizes for **human late editing and portability**, not merely initial automation convenience.

## Trust update

No new runtime promotion is made by this run. All new human-adjustability and alpha-path recipes remain `PENDING_RUNTIME` until tested in Resolve 21.

`NO_CHANGE = false`: new formal quality axes, failure guardrails and runtime canaries were added.
