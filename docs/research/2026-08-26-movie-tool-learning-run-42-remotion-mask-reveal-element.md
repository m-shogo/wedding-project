# Movie Tool Learning Run 42 — Motion Zukan Mask Reveal → Remotion Element candidate

Date: 2026-08-26  
Scope: Movie Tool Learning / Motion Zukan / Remotion reuse-before-build  
Studio install Actual: **NOT RUN**

## Why this run exists

Run40 established that Remotion `4.0.517` is CI-compatible with Wedding Motion Studio after a real forward-compatibility fix, and identified Studio Protocol / Elements as a high-value reuse surface.

The next question is not “can we make another animation?”. It is:

> Can one existing Motion Zukan implementation be delivered as a Remotion Element without creating a second, drifting animation implementation?

## First canary selection — `type-mask-reveal`

The first candidate is Motion Zukan pattern:

```text
patternId: type-mask-reveal
legacy preset: type-mask-slide
engine: TypographyRevealEngine
mode: mask
```

Reasons:

- it already exists in the canonical Motion Zukan registry;
- it is useful in both Opening and Profile;
- the existing repository Concept Preview already reuses `TypographyRevealEngine` instead of recreating timing/easing;
- it is text-first, so the canary does not require private Wedding photos;
- it can have zero Element dependencies because `remotion` is provided by Remotion projects;
- its motion is visually obvious enough to inspect later in Studio Actual;
- its current Concept Preview has a stable coordinate: `1280x720 / 30fps / 120 frames`;
- it already participates in the broader Palmier / DaVinci Mask Reveal vertical-slice research, so this adds a Remotion editing surface without inventing a new semantic pattern.

## Rejected naive approach — copy the engine into an Element file

`TypographyRevealEngine` currently lives inside the larger:

`motion-studio/src/motion-kit/engines.tsx`

That file also contains other engines and an internal `./routeLineMath` import. Copying the whole file into an Element would create avoidable project-relative dependencies. Manually copying only the Mask Reveal logic would be worse: it would create an Element-only animation implementation that could drift away from the Motion Kit engine.

Guardrail:

```text
ELEMENT_DELIVERY_SURFACE != SECOND_MOTION_IMPLEMENTATION
```

## Chosen source strategy — derive from the canonical engine

Run42 adds:

`motion-studio/scripts/build-mask-reveal-element-payload.mts`

The script:

1. reads `src/motion-kit/engines.tsx`;
2. fail-closed locates the canonical Typography block between `MotionIntensity` and `CameraTransformMode`;
3. extracts that block directly;
4. internalizes the canonical exported type/function declarations for the generated file;
5. adds only a thin exported `WeddingMaskRevealElement` wrapper with safe defaults;
6. fixes the wrapper to canonical `mode="mask"`;
7. declares **zero Element dependencies**;
8. uses the existing Concept Preview dimensions/duration (`1280x720`, `120 frames`);
9. invokes Remotion's official `@remotion/studio-protocol createElementPayload()`;
10. writes ignored source/payload/manifest evidence under `out/research/remotion-elements/mask-reveal/`.

The generated source therefore has this conceptual structure:

```text
Remotion project-provided imports
↓
canonical TypographyRevealEngine source, derived from engines.tsx
↓
thin WeddingMaskRevealElement wrapper
```

It is not a manually maintained animation clone.

## Why a thin wrapper is needed

The canonical engine expects a `text` prop. A directly inserted Element should still have a useful initial state.

The wrapper gives defaults:

```text
text = WELCOME
intensity = M
transparent = true
mode = mask (fixed by this Motion Pattern)
```

The wrapper is delivery/editing glue. The animation timing/easing/transform implementation remains canonical-derived.

## Official Studio Protocol constraints used

The v4.0.517 official `createElementPayload()` and Element dependency implementation establish these relevant boundaries:

- source must contain exactly one exported named React component;
- a regular visual component should normally use installation mode `wrapped`;
- `react`, `react-dom`, and `remotion` are project-provided and must not be declared as Element dependencies;
- `@remotion/*` dependencies, if needed, use `version: null`;
- non-Remotion dependencies must use exact semantic versions;
- source and payload size/dependency-count limits are validated by the official function.

Run42 does **not** reimplement those rules as the authority. It calls the official validator in the candidate CI environment.

## Candidate CI

Focused workflow:

`.github/workflows/remotion-mask-reveal-element-ci.yml`

The job:

1. installs the locked Wedding baseline;
2. runs baseline TypeScript and the existing Mask Reveal reuse contract;
3. ephemerally installs the Remotion `4.0.517` family plus `@remotion/studio-protocol@4.0.517` inside the CI runner only;
4. asserts exact package versions;
5. runs candidate TypeScript;
6. derives the Element source from the canonical engine;
7. calls official `createElementPayload()`;
8. validates provenance, zero dependencies, dimensions, duration, one exported component and no private relative imports;
9. creates a temporary Remotion entrypoint that imports the generated standalone Element source;
10. renders it with Remotion `4.0.517`;
11. requires a non-empty rendered MP4 and prints its hash;
12. leaves production `package.json` / lock promotion undone.

This is stronger than schema-only validation:

```text
CANONICAL SOURCE
→ DERIVED STANDALONE SOURCE
→ OFFICIAL PAYLOAD VALIDATION
→ CANDIDATE BUNDLE/RENDER
```

## Honesty boundary

Even if focused CI is GREEN, these claims remain forbidden:

```text
ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED
STANDALONE_RENDER_GREEN != STUDIO_DRAG_DROP_VERIFIED
STUDIO_LIBRARY_SURFACE_EXISTS != WEDDING_ELEMENT_LIBRARY_INTEGRATED
CI_CANDIDATE_DEPENDENCY_INSTALL != PRODUCTION_DEPENDENCY_UPGRADE
```

Studio install/drag, generated `.element.tsx` destination, editability, Inspector behavior and save/reopen must be tested in a local Remotion Studio Actual after Run41 proves the candidate Studio environment itself is healthy.

## Privacy / dependency result

For the Mask Reveal candidate:

```text
private Wedding media required: NO
private URL required: NO
Element dependencies: 0
third-party install performed: NO
```

This makes it a good first clean-install canary.

## Relationship to Motion Zukan Try-on

Existing Try-on design remains non-destructive:

```text
Current Scene Human Master
→ transient Try-on Draft
→ candidate Motion
→ explicit Adopt only
```

Remotion Elements do not replace this rule. A future “Install/Open in Studio” action is another delivery surface; it must not silently mutate the Human Master or mark a Motion as selected/locked.

## Future promotion sequence

The evidence ladder should remain:

```text
1. Payload candidate validates                ← Run42
2. Generated standalone source renders         ← Run42
3. Remotion Studio 4.0.517 local environment   ← Run41 Actual
4. Element install into disposable project     ← future clean-project Actual
5. Generated .element.tsx inspected            ← future clean-project Actual
6. Human text/intensity edit verified           ← future clean-project Actual
7. Save/reopen persistence verified             ← future clean-project Actual
8. Motion Zukan delivery UI integration         ← only after above
```

Do not jump from 2 to 8.

## Primary evidence

- Wedding `movie-dashboard/src/data/visualMotionLibrary.ts`.
- Wedding `motion-studio/src/motion-kit/renderablePresets.ts`.
- Wedding `motion-studio/src/motion-kit/engines.tsx`.
- Wedding `VisualMotionMaskRevealConcept.tsx` and `StartMotionKitRoot.tsx`.
- Remotion v4.0.517 Studio Protocol `createElementPayload()` docs/source.
- Remotion v4.0.517 Element dependency validation source.
- Run40 Remotion current-compatibility result.

## Saturation

`NO_CHANGE` is false.

Run42 moves Motion Zukan→Studio Elements from an architectural idea to a concrete candidate compiler path while preserving the existing motion implementation as the authority.
