# Movie Tool Learning Run 44 — Remotion Element human adjustability / Interactive schema

Date: 2026-08-26  
Scope: Motion Zukan → Remotion Elements → human adjustability  
Production dependency upgrade: **NOT PERFORMED**  
Studio install Actual: **NOT RUN YET**

## Why this run exists

Run42 proved that Motion Zukan `type-mask-reveal` can be derived from the canonical `TypographyRevealEngine`, validated by official `createElementPayload()`, and rendered as a standalone source file on Remotion `4.0.517`.

That established portability, but not human editability.

The product goal is not merely:

```text
Element can be installed
```

It is:

```text
Motion Zukanで見つける
→ Studioへ入れる
→ 人間が意味の分かる項目だけ簡単に調整する
→ 必要ならCodex/Claudeで深いsource edit
```

## Official 4.0.517 guidance changed the design

Remotion's current Element Guidelines say user-facing customization should use the Element's `Interactive` schema rather than treating public React props as the Studio editing UX.

The same official guidance also emphasizes:

- focused, reusable Elements;
- self-contained source;
- minimal dependencies;
- explicit defaults;
- clear names for editable objects;
- generated wrapper Sequence for normal wrapped Elements;
- entrance and exit animation for temporary overlays;
- `Interactive` / interactivity best practices for Studio editing.

Therefore the Run42 wrapper:

```tsx
<WeddingMaskRevealElement text="..." intensity="..." />
```

was a valid source/payload canary but not sufficient evidence of a good Studio editing experience.

Guardrail:

```text
PUBLIC_REACT_PROPS != HUMAN_FRIENDLY_STUDIO_CONTROLS
```

## Official pattern reused instead of invented

Remotion's own `SpinningTextWheel` Element in v4.0.517 uses:

```text
installationMode = wrapped
+ internal Interactive.withSchema()
+ internal Sequence
+ clear schema controls
+ public exported wrapper with inline initial values
```

This means Wedding does **not** need to switch Mask Reveal to `component-owned-sequence` merely to gain controls.

The official pattern allows the normal Element installation wrapper to remain responsible for outer placement/duration while an internal named Interactive layer exposes semantic controls.

## Run44 Mask Reveal design

The canonical motion animation remains unchanged:

```text
src/motion-kit/engines.tsx
└─ TypographyRevealEngine
```

The generated Element source still derives that block automatically.

Only the thin Studio-facing wrapper changes:

```text
canonical TypographyRevealEngine block
→ internalized in generated source
→ Interactive.withSchema() layer
→ public WeddingMaskRevealElement wrapper
→ createElementPayload()
```

This is not a second Mask Reveal implementation.

```text
DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION
```

## Human-facing controls — deliberately small

Run44 exposes only controls that are currently meaningful and truthfully backed by the canonical implementation.

### 1. 表示テキスト

Schema:

```text
type = text-content
label = 表示テキスト
initial = WELCOME
```

Purpose:
- replace a title/caption without opening source;
- make the first control Japanese-first and immediately understandable.

### 2. 動きの強さ

Schema:

```text
type = enum
values = S / M / L
label = 動きの強さ (S=やさしい / M=標準 / L=強い)
```

This reuses the canonical `MotionIntensity` values instead of inventing another intensity model.

### 3. Placement / whole-element transform

Use official:

```text
Interactive.transformSchema
```

Intended editable surface:

- translate;
- scale;
- rotate;
- opacity.

This lets the human position or resize the whole treatment without modifying its internal entrance animation.

## Controls intentionally NOT exposed

### Color

The current canonical `TypographyRevealEngine` hardcodes white text internally.

Run44 does **not** add a fake color picker that cannot faithfully change the canonical motion.

```text
FAKE_COLOR_CONTROL != HUMAN_ADJUSTABILITY
```

A future color control should first be added as an intentional canonical engine capability, then reused by the Element.

### `transparent`

This is a technical implementation option rather than a useful first-level creative choice for the overlay Element.

The Element fixes it to transparent and does not clutter the Studio controls with it.

Principle:

```text
EXPOSE_USEFUL_CONTROLS != EXPOSE_EVERY_PROP
```

### Internal animation keyframes

The current `TypographyRevealEngine` computes animation variables and uses a CSS transform string. Remotion's current interactivity best practices prefer inline `interpolate()` calls and the separate CSS `translate` / `scale` / `rotate` properties for source-editable keyframes.

Run44 does not pretend the internal motion curve is now visually editable in Studio.

The whole-element transform is interactive; the canonical entrance curve remains engine-owned.

## Why `wrapped` remains correct for this canary

Official Remotion Elements use `wrapped` even when internal `Interactive` components exist.

For Mask Reveal:

- outer generated Sequence can control placement/duration of the installed Element;
- inner named `Mask Reveal` Interactive layer exposes semantic controls;
- no need to take ownership of the only Sequence yet;
- fewer installation semantics change at once.

Therefore:

```text
installationMode = wrapped
```

remains the candidate mode.

## Portability / security boundary

The generated Element source still:

- has no project-relative imports;
- has no private Wedding assets;
- has no remote URLs;
- declares zero Element dependencies;
- relies only on React/Remotion packages provided by the target Remotion project;
- contains exactly one exported named component;
- is validated using official `createElementPayload()`.

`react`, `react-dom` and `remotion` are project-provided and must not be declared as Element dependencies.

## Remaining production-readiness gap: exit animation

The official Element Guidelines say temporary overlays should include entrance **and exit** animation.

Current Mask Reveal is entrance-focused. Adding an Element-only exit animation would create behavior divergence from the canonical motion, so Run44 does not bolt one onto the wrapper.

Instead the state remains:

```text
CANDIDATE_NEEDS_STUDIO_ACTUAL_AND_EXIT_ANIMATION_REVIEW
```

Guardrail:

```text
ENTRANCE_ONLY_ELEMENT != PRODUCTION_READY_TEMPORARY_OVERLAY
```

The right future options are:

1. extend the canonical Mask Reveal semantics with an optional exit and reuse it everywhere; or
2. formally classify this pattern as a scene/title treatment whose lifetime is controlled externally and prove that this matches intended use.

Do not hide the gap by adding an Element-only fade.

## Local Actual still required

Static schema presence and successful render cannot prove Studio UX.

The local test must verify:

```text
install request reaches Studio
→ user confirms
→ .element.tsx is actually written
→ Element appears in timeline/canvas
→ Mask Reveal internal item can be selected
→ 表示テキスト control is visible
→ 動きの強さ control is visible
→ transform controls are visible
→ changing each control changes canvas
→ source/readback matches change
→ undo/redo works
→ reload/restart persists without corruption
→ post-install render succeeds
```

State separation:

```text
INSTALL_REQUEST_AWAITING_CONFIRMATION != INSTALL_CONFIRMED
INTERACTIVE_SCHEMA_PRESENT != STUDIO_CONTROL_READBACK_VERIFIED
STUDIO_CONTROL_VISIBLE != CONTROL_MUTATION_PERSISTED
```

## Browser-origin requirement for `installInStudio()`

Official v4.0.517 implementation uses `globalThis.location.origin` and accepts:

- HTTPS;
- HTTP only on `localhost` / `127.0.0.1`.

It probes local Studio ports `3000`–`3009` and selects the most recently focused compatible writable composition.

Therefore a Node-only script is not a valid end-to-end install test.

For the local Actual, reuse the existing `movie-dashboard` Vite environment as a disposable localhost harness instead of inventing another server stack.

## Clean-context strategy

Run42 already proved the generated source has no unresolved private imports and renders standalone.

Run44 local Actual should add a neutral writable Studio sandbox under ignored research output, then install into that sandbox before trying any Wedding composition.

This gives two evidence layers:

```text
standalone source render       = already PASS
neutral Studio install sandbox = local Actual next
Wedding integration            = only after sandbox PASS
```

Do not expose private Wedding assets merely to prove Studio Protocol installation.

## Codex / Claude requirement

The remaining Studio install/control readback is a local GUI workflow and cannot be truthfully completed from GitHub Actions alone.

Use:

`docs/prompts/2026-08-26-remotion-mask-reveal-element-local-actual-agent.md`

on the target Mac with Codex or Claude Code.

## Current trust state

```text
canonical-derived source                    PASS
zero private imports                        PASS
official createElementPayload validation    PASS
standalone render on coherent cohort         PASS
Interactive schema static contract           CANDIDATE
Japanese-first text/intensity labels         CANDIDATE
Studio install confirmation                  NOT_RUN
Studio control visibility/readback           NOT_RUN
control persistence                          NOT_RUN
exit-animation guideline compliance          NEEDS_REVIEW
production-ready Element                     NO
```

## Saturation

`NO_CHANGE` is false.

Run44 turns “human adjustable is important” into an explicit technical contract: semantic controls are exposed through Remotion's current Interactive schema, technical or unsupported controls are intentionally withheld, and Studio Actual remains a separate evidence gate rather than being inferred from TypeScript or render success.
