# Movie Tool Learning Run 46 — Remotion Typography Elements shared kit

Date: 2026-08-27

## Goal

Move from a one-off Mask Reveal Element canary to a repeatable Motion Zukan → Remotion Element path without duplicating motion implementations.

## Implementation

- Added `scripts/lib/typography-element-kit.mts` as the shared Studio-facing generator.
- The generator extracts the existing canonical `TypographyRevealEngine` block from `engines.tsx`.
- Mask Reveal now uses the shared kit instead of maintaining a bespoke source generator.
- Added `type-char-stagger` using canonical `mode="stagger"`.
- Added `type-type-on-rhythm` using canonical `mode="word-stagger"`.
- All three Elements expose the same useful Studio surface: text, intensity, color, translate, scale, rotate, opacity.
- All three use canonical `exitAnimation="fade"`; no wrapper-only motion implementation is introduced.
- Added a shared artifact validator and CI rendering of all three standalone generated Element sources.
- Added `movie-dashboard/src/data/remotionElementCandidates.ts` as the machine-readable Motion Zukan → Element readiness registry.
- Added a dashboard contract checker so `ELEMENT_CANDIDATE` cannot silently become `STUDIO_ACTUAL_VERIFIED` without real Mac evidence.
- Preserved the Run45 manifest fields used by the existing Mac Actual procedure (`colorControl`, exit metadata, hashes, Actual state).

## Why these three

The set now covers three materially different title/caption motions from one canonical engine:

1. `type-mask-reveal` — whole title enters through the mask treatment.
2. `type-char-stagger` — characters reveal independently.
3. `type-type-on-rhythm` — words reveal independently, preserving the existing word-spacing fix in the canonical engine.

These are useful in both Opening and Profile movies and prove that the Element path is not coupled to one Mask Reveal implementation.

## Architecture boundary

The shared kit owns only portability and Studio-facing concerns:

```text
canonical TypographyRevealEngine
→ generated self-contained Element source
→ Interactive schema
→ createElementPayload()
→ standalone render canary
→ Motion Zukan Element readiness registry
```

The kit does not reimplement easing, stagger timing, mask motion, word spacing, color semantics, or exit timing.

Guardrail:

`SHARED_ELEMENT_KIT != SHARED_MOTION_IMPLEMENTATION`

## Readiness model

The dashboard registry separates three states:

```text
PREVIEW_ONLY
ELEMENT_CANDIDATE
STUDIO_ACTUAL_VERIFIED
```

Run46 records the three Typography treatments as `ELEMENT_CANDIDATE` only. This means the repo has a generated/validated/renderable candidate path; it does not mean Remotion Studio installation or Inspector editing has been proven.

## Honesty boundary

CI proves source extraction, official payload validation, schema structure and standalone rendering only once the workflow is actually green.

`Studio install / Inspector control mutation / undo-redo / reload-restart` remain `NOT_RUN` until a real Mac Studio Actual is performed.

Additional guardrails:

- `ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED`
- `THREE_ELEMENTS_RENDERABLE != STUDIO_UX_VERIFIED`
- `DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION`
- `PRODUCTION_DEPENDENCY_UPGRADE_PERFORMED = NO`

## Next implementation target

After this PR receives a real GREEN CI run and is squash-merged:

1. surface the Element readiness state on the Motion Zukan UI/cards so a human can distinguish preview-only vs Element candidate at selection time;
2. prepare one bounded Mac Studio Actual batch for the three Typography Elements, reusing the Run45 confirmation/readback rules;
3. promote each record independently to `STUDIO_ACTUAL_VERIFIED` only after install confirmation, Inspector mutation, source readback, undo/redo, reload/restart and post-install render all pass.

Do not mark any of the three as Studio Actual verified until that sequence has actually been executed.
