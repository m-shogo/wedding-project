# Movie Tool Learning Run 45 — canonical Typography color + Element exit

Date: 2026-08-26  
Scope: Motion Zukan `type-mask-reveal` / canonical `TypographyRevealEngine` / Remotion Elements 4.0.517  
Base: PR #391 merged as `2d5d34d543f9277c1a1e69617e49d124114401d2`

## Why this run exists

Run44 proved that the generated Mask Reveal Element can expose a small, meaningful `Interactive.withSchema()` surface without changing its neutral visual output.

Two production-readiness gaps remained:

1. the canonical `TypographyRevealEngine` still hardcoded white text, so a Studio color control would have been fake;
2. the official Remotion Element Guidelines require temporary overlays to animate both in and out, while Mask Reveal only had an entrance.

Run45 closes those gaps without creating a second motion implementation.

## Official 4.0.517 evidence

Remotion 4.0.517 `InteractivitySchema` explicitly supports:

```text
type = color
value = CSS color string
```

and shows a color field as a normal `Interactive.withSchema()` control.

The 4.0.517 Element Guidelines also distinguish temporary overlays from backgrounds/full-scene treatments:

```text
temporary overlay / label / callout
→ entrance + exit expected

background / loop / full-scene treatment
→ entrance + exit not required
```

Mask Reveal is currently packaged as a transparent title overlay, so the temporary-overlay rule applies.

Upstream references checked at the exact candidate tag:

- `remotion-dev/remotion@v4.0.517/packages/docs/docs/interactivity-schema.mdx`
- `remotion-dev/remotion@v4.0.517/packages/docs/elements/contributing.mdx`
- `remotion-dev/remotion@v4.0.517/packages/docs/docs/studio/interactivity-best-practices.mdx`

## Canonical capability added

`TypographyRevealEngine` now accepts:

```ts
color?: string;
exitAnimation?: 'none' | 'fade';
```

Defaults are intentionally:

```text
color = #fff
exitAnimation = none
```

This is the compatibility boundary.

Existing Wedding compositions that do not opt in keep the previous white / entrance-only behavior.

```text
NEW_CAPABILITY != NEW_DEFAULT_BEHAVIOR
```

## Color safety

All normal typography modes now derive their text color from the canonical `color` prop.

The outline mode needs special care because its existing behavior animates the fill from transparent white to opaque white while its stroke collapses.

Run45 therefore keeps the exact historical white path for the default values:

```text
#fff / #ffffff
→ existing rgba(255,255,255,fillProgress) path
```

Only a non-white custom color uses CSS `color-mix()` for the animated outline fill.

This avoids changing the default outline pixel path merely to add a capability that existing callers did not request.

## Exit safety

The exit implementation lives inside the canonical engine.

```text
TypographyRevealEngine(exitAnimation="fade")
```

uses the final ~0.35 seconds of the current Sequence duration and fades the whole typography treatment to zero opacity.

The Element wrapper does **not** contain a separate fade implementation.

```text
ELEMENT_EXIT_USES_CANONICAL_ENGINE != ELEMENT_ONLY_DIVERGENCE
```

The canonical default remains `none`, so existing scene/title usages do not suddenly fade out.

## Element behavior

The generated Mask Reveal Element now exposes:

- 表示テキスト
- 動きの強さ
- 文字色
- translate
- scale
- rotate
- opacity

The Element fixes:

```text
mode = mask
transparent = true
exitAnimation = fade
```

The exit is deliberately not another first-level control. It is part of this focused temporary-overlay treatment.

## Why the Element render hash is now allowed to change

Run44 intentionally proved that merely adding Studio controls did not alter the neutral render:

```text
Run42 / Run44 render SHA-256
f6124f7c03ec07dd5d6b01f8c2f533b321da668d8601a9639a75aeeeb748d5d5
```

Run45 is different: the Element now intentionally fades out near its end to satisfy the temporary-overlay behavior.

Therefore the post-Run45 Element render is expected to differ from the Run42/Run44 hash.

That is an intentional semantic change, not an accidental regression.

The compatibility claim is instead:

```text
existing canonical callers using defaults
→ should retain previous visual behavior

Mask Reveal Element temporary overlay
→ intentionally gains canonical exit fade
```

## Studio Actual remains separate

CI can prove:

- canonical source extraction;
- official payload validation;
- typechecking;
- generated-source compilation;
- standalone render;
- static schema contract;
- canonical color/exit wiring.

CI still cannot prove:

- Studio confirmation dialog approval;
- `.element.tsx` file creation;
- Timeline insertion;
- visible `文字色` control;
- live color mutation;
- source readback;
- undo/redo;
- reload/restart persistence.

Those remain Mac GUI Actual checks.

Guardrail:

```text
CI_GREEN != STUDIO_ACTUAL_PASS
```

## Current readiness

Expected manifest state after Run45 generation:

```text
colorControl = CANONICAL_ENGINE_BACKED
exitAnimation.mode = CANONICAL_FADE
exitAnimation.elementOnlyImplementation = false
actualStudioControlReadback = NOT_RUN
actualStudioInstallState = NOT_RUN
productionReadiness = CANDIDATE_NEEDS_STUDIO_ACTUAL
```

Do not promote beyond that state until the local Actual is completed.
