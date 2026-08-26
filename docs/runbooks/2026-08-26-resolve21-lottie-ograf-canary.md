# Resolve 21 — Neutral Lottie / OGraf Native Import Canary

Date: 2026-08-26  
Canary: `DV21-LOTTIE-OGRAF-01`  
Status: INPUT GENERATABLE / RESOLVE RUNTIME PENDING

## Goal

Verify the shortest native recovery route for a Palmier Lottie omission:

```text
retain original/self-authored .lottie
→ native Resolve 21 import
→ alpha check
→ clip-level trim/reposition
→ save/reopen
→ separately inspect internal editability / OGrafLoader
```

Do not rebuild a Lottie in Fusion or bake it to video before proving the native source-import route.

## Platform boundary

Blackmagic's Resolve 21 New Features Guide documents OGraf `.json` and Lottie `.lottie` native import on:

- macOS
- Windows

The first canary therefore does not generalize to Linux.

```text
MACOS_WINDOWS_CAPABILITY != LINUX_CAPABILITY
```

## Neutral fixture

Fixture ID:

```text
wedding-neutral-alpha-motion-v1
```

Generated artifact:

```text
out/canary-inputs/lottie/WeddingNeutralAlphaMotion.lottie
```

Intent:

- dotLottie v1 package
- 512 × 512
- 30 fps
- 90 frames / 3 seconds
- transparent canvas
- one self-authored solid circle
- obvious horizontal position animation
- no image assets
- no fonts
- no URLs/network assets
- no third-party media

The fixture is intentionally simple so import/alpha problems are not confused with dependency failures.

## Why dotLottie v1

The dotLottie project currently recommends v2 for new feature-rich packages, while v1 remains documented as widely supported.

This canary needs no themes, state machines, fonts or image assets. The v1 structure is therefore intentionally used as the compatibility-oriented minimal package:

```text
manifest.json
animations/wedding-neutral-alpha-motion.json
```

Choosing v1 is a canary design decision, not a claim that Resolve cannot read v2.

## Prepare the artifact

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-canary-inputs.mts lottie
```

This generates under ignored `out/`:

```text
out/canary-inputs/lottie/WeddingNeutralAlphaMotion.lottie
out/canary-inputs/lottie/WeddingNeutralAlphaMotion.fixture.json
out/canary-inputs/lottie/WeddingNeutralAlphaMotion.pack-report.json
out/canary-inputs/manifests/DV21-LOTTIE-OGRAF-01.json
```

The source JSON remains reviewable in Git:

```text
fixtures/resolve/lottie/WeddingNeutralAlphaMotion.manifest.json
fixtures/resolve/lottie/WeddingNeutralAlphaMotion.animation.json
```

## Prepare immutable Session

```bash
node --no-warnings scripts/prepare-resolve-canary-session.mts \
  DV21-LOTTIE-OGRAF-01 \
  --execution-id DV21-LOTTIE-OGRAF-01-YYYYMMDD-MAC-FREE-A
```

Before Resolve runtime, expect:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

## Runtime procedure

Use a disposable project/timeline only.

1. Capture exact Resolve product/version/edition/platform.
2. Confirm the tested platform is macOS or Windows for this canary.
3. Record the `.lottie` SHA-256 from the Session/input manifest.
4. Import or drag `WeddingNeutralAlphaMotion.lottie` into the Media Pool or directly onto a disposable timeline using the normal Resolve-supported path.
5. Record whether the clip is accepted and its observed duration.
6. Place it above a contrasting Resolve-generated background.
7. Verify that areas outside the moving circle remain transparent rather than black/opaque.
8. Verify the circle visibly moves across the canvas.
9. Trim the clip to a shorter duration using ordinary Edit-page clip controls.
10. Reposition/scale the clip at the clip level.
11. Save the disposable project, close/reopen, and verify alpha/playback/trim/reposition remain usable.
12. Open/inspect the Fusion representation only after native clip behavior is recorded.
13. Record whether source/internal animation controls or keyframes are directly editable.
14. Separately record whether `OGrafLoader` is available/meaningful for this source in the tested runtime.
15. Do not call the source parametrically editable merely because a clip or loader node exists.

## Pass boundary

The native-import portion may pass when:

- Resolve accepts the exact `.lottie` on the documented platform;
- alpha visibly composites correctly;
- observed clip timing is sane for the 3-second source;
- normal clip-level trim/reposition remains usable;
- save/reopen preserves the usable state.

Internal editability is a separate observation and may legitimately be limited.

```text
NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY
```

## Fail / downgrade cases

- package is structurally valid but Resolve rejects it → `IMPORT_FAIL`
- clip imports but transparent canvas becomes opaque/black → alpha failure
- trim/reposition is unusable after reopen → `SAVE_REOPEN_REGRESSION`
- import works but internal keyframes are not editable → native clip route may still pass while internal editability remains limited
- OGrafLoader exists but does not expose source-level controls → do not infer parametric editability
- behavior works on macOS/Windows but is generalized to Linux → invalid promotion scope

## Runtime honesty

Before Actual, only these are proven:

- dotLottie package is a readable deterministic ZIP;
- manifest points to the packaged animation;
- source timing/geometry are structurally checked;
- the fixture is self-authored synthetic geometry with no third-party assets;
- the package contains no declared external dependency.

Still runtime-pending:

- Resolve importability
- alpha preservation
- rendered playback fidelity
- clip-level behavior
- save/reopen
- internal editability
- OGrafLoader behavior

Guardrails:

```text
DOTLOTTIE_ARCHIVE_VALID != RESOLVE_IMPORTABLE
LOTTIE_JSON_STRUCTURE_VALID != RESOLVE_RENDER_FIDELITY
ALPHA_INTENT != RESOLVE_ALPHA_PROOF
NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY
MACOS_WINDOWS_CAPABILITY != LINUX_CAPABILITY
```

## Promotion

One successful run is not canonical trust. Follow the Canary Pack requirement for independent executions before promotion.
