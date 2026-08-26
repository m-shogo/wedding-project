# Movie Tool Learning Run 22 — AI generation instruction reliability

Date: 2026-08-26
Scope: Movie Tool Learning only.

## Goal

Bring AI image/video generation into the same Human Master -> bounded tool instruction discipline used for Palmier and Resolve.

A saved prompt is not enough. A retry can drift because the provider, host product, model, reference roles, exposed controls or availability changed.

## Implementation

Added `motion-studio/src/data/generatedAssetInstruction.ts`.

`buildGeneratedAssetInstruction()` compiles a `GeneratedAssetProvenance` record into an execution brief containing:

- provider,
- host product,
- model/version,
- availability and check timestamp,
- asset kind / rebuild class,
- purpose,
- prompt / negative prompt,
- reference assets with semantic role,
- generation parameters,
- Must Preserve,
- May Vary,
- Forbidden Changes,
- abort/guardrail behavior,
- post-generation provenance and human-review requirements.

## Instruction reliability rules

`PROMPT != COMPLETE_INSTRUCTION`

`REFERENCE_FILE != REFERENCE_ROLE`

`MODEL_AVAILABLE_ELSEWHERE != REQUESTED_HOST_AVAILABLE`

`SUCCESSFUL_RETRY_ONCE != DETERMINISTIC_REGENERATION`

The instruction explicitly aborts rather than silently changing model/provider/host or replacing a missing reference asset.

## High-impact decisions

Generation instructions must not infer/substitute:

- important real people/photos,
- final copy,
- scene order,
- destructive replacement/deletion,
- a materially different creative subject when the request is ambiguous.

The output may vary only inside the `mayVary` boundary preserved in Human Intent.

## Tool routing

Use a generator for source asset creation when its strengths matter (e.g. reference consistency, camera motion, first/last frames, native audio). Once generated pixels are accepted, put timing, transforms, text and other routinely editable production controls into Palmier/Remotion/Resolve where possible.

Guardrail:

`GENERATOR_STRENGTH != TIMELINE_EDITOR_REPLACEMENT`

This preserves Human Adjustability and reduces expensive regeneration for simple editorial changes.

## New canary — AI-INSTRUCTION-01

1. Create a synthetic non-person generation provenance record.
2. Compile the bounded instruction.
3. Remove a required reference and confirm execution policy aborts rather than substitutes.
4. Mark the requested host/model unavailable and confirm route selection re-evaluates rather than silently switches.
5. Generate when available.
6. Record actual provider/host/model/settings and output provenance.
7. Human-review Must Preserve / Forbidden Changes.
8. Retry once later and keep rebuild class `REBUILD_INTENT` unless deterministic reproduction is actually demonstrated.

## Saturation

NO_CHANGE is false. AI generation now has a machine-readable instruction pattern rather than a prompt-only recovery model.
