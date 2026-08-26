# Movie Tool Learning Run 19 — Resolve 21 Lottie/OGraf platform boundary and editability

Date: 2026-08-26
Scope: Movie Tool Learning only.

## New official evidence

Blackmagic's Resolve 21 New Features Guide explicitly states support for OGraf `.json` and Lottie `.lottie` HTML-based animation on **macOS and Windows**.

The same guide states:

- a `.json` / `.lottie` can be dropped into the Media Pool like media,
- it can be dropped directly onto the timeline,
- the timeline treats it like a **fully rendered animation clip**,
- alpha is recognized and transparency is maintained,
- Fusion adds an `OGrafLoader` node to load OGraf/Lottie directly into a composition.

This adds an important dimension that was missing from the earlier edition/version model: target operating system.

Guardrail:

`RESOLVE_21_CAPABILITY != CROSS_PLATFORM_CAPABILITY`

A capability documented for Resolve 21 must still record platform scope.

## Tool Learning model update

The machine-readable Resolve handoff sidecar now records:

- major/version patch,
- edition,
- **platform**,
- target page.

Current schema enum:

- `MACOS`
- `WINDOWS`
- `LINUX`
- `UNKNOWN`

This prevents a future compiler/router from promising Lottie/OGraf direct import on Linux based only on the Resolve major version.

## Lottie direct timeline import remains clip-level

The phrase "fully rendered animation clip" remains crucial. It supports:

- playback,
- alpha compositing,
- timeline placement/trim candidate,

but not a claim that every original Lottie property becomes a Resolve Inspector/keyframe parameter.

Current classification remains:

- transport: `REBUILD_ASSET` / native asset re-import rather than FCPXML transport,
- timeline editability: clip-level candidate,
- internal parametric editability: PENDING_RUNTIME,
- deeper editing: investigate `OGrafLoader` separately.

Guardrail:

`LOTTIE_DIRECT_IMPORT != LOTTIE_PARAMETER_IMPORT`

## Recovery routing

If Palmier FCPXML does not transport a Lottie clip:

1. Keep the original `.lottie`/OGraf asset in the dependency manifest.
2. On macOS/Windows Resolve 21, direct-import the original asset before baking it to video.
3. If clip-level controls are sufficient, use the direct timeline route.
4. If internal/graph-level control is needed, evaluate `OGrafLoader` in Fusion.
5. If portability or runtime fails, fall back to alpha render + Human Master sidecar.

This route optimizes for native source retention and Human Adjustability rather than treating every FCPXML loss as a visual bake requirement.

## New canary — DV21-LOTTIE-PLATFORM-01

Primary Wedding environment:

- Resolve 21 / macOS,
- clean project,
- original `.lottie` asset with visible alpha and motion,
- dependency sidecar records target platform.

Validate:

1. direct Media Pool import,
2. direct timeline drop,
3. alpha composite,
4. trim/start/end behavior,
5. speed/retime behavior if available,
6. save/reopen,
7. `.drt` transfer into another clean project,
8. missing-original-asset behavior,
9. render parity,
10. Inspector/Fusion parameter editability inventory.

Do not generalize pass results to Windows until reproduced there; do not claim Linux availability without new official/runtime evidence.

## New canary — DV21-OGRAFLOADER-01

In Fusion:

1. load the same Lottie/OGraf asset through `OGrafLoader`,
2. inventory exposed controls/inputs,
3. identify whether meaningful source parameters are editable or only clip/loader-level settings,
4. save/reopen,
5. package/transfer,
6. compare render against direct timeline import.

This canary decides whether `OGrafLoader` materially improves Human Adjustability or merely provides graph placement.

## Failure fingerprints

- `major-version-only-routing`: compiler sees Resolve 21 and promises all 21 features -> require platform/edition/version context.
- `fully-rendered-means-parametric`: rendered animation clip is treated as editable original animation -> forbidden.
- `fcpxml-lost-means-bake`: original Lottie exists but system immediately renders video -> direct source import first on supported platforms.
- `mac-pass-generalized-to-linux`: one platform runtime becomes global trust -> platform-scoped trust only.

## Evidence

Primary:

- Blackmagic Design — DaVinci Resolve 21 New Features Guide, “Support for OGraf HTML Graphics and Lottie Animations”.

## Saturation

NO_CHANGE is false. Platform becomes a first-class Capability Availability dimension and Lottie recovery routing is now explicitly platform-scoped.
