# Movie Tool Learning Run 21 — bounded Resolve instruction scope in the handoff sidecar

Date: 2026-08-26
Scope: Movie Tool Learning only.

## Problem

A technically valid rebuild recipe can still be unsafe if it does not say exactly what the human/Codex may touch. Tool capability and instruction reliability must remain separate.

The existing research principle `read -> scope -> edit -> verify` is therefore promoted into the machine-readable Resolve handoff contract.

## Implementation

`motion-studio/src/data/resolveHandoff.schema.ts` now requires an `executionScope` with:

- target timeline,
- clip ids / track ids when known,
- allowed edits,
- forbidden edits,
- preconditions,
- explicit abort conditions,
- post-edit readback requirements.

`resolveHandoffPolicy.ts` provides a conservative Free/macOS alpha-handoff fixture that refuses ambiguous scope, stale/missing source artifacts, mismatched Resolve context, unsupported capabilities and high-impact changes.

## Instruction Reliability rule

Every generated Resolve instruction should be derivable from:

1. `resolve` context — major / tested patch / edition / platform / page,
2. `executionScope`,
3. Human Master values,
4. capability-specific native route,
5. verification recipe.

Guardrail:

`VALID_RECIPE + AMBIGUOUS_SCOPE = UNSAFE_INSTRUCTION`

## High-impact boundary

The baseline sidecar explicitly forbids automatic:

- replacement of important photos,
- final-copy changes,
- scene reordering,
- deletion of clips/tracks,
- mutation of unrelated timeline items.

These stay human decisions even when a technical mutation surface exists.

## Preferred Resolve/Codex instruction shape

A concrete execution instruction should state, in this order:

- Target: Resolve 21 version/edition/platform.
- Page.
- Timeline.
- Selected/identified clip or track scope.
- Purpose.
- Human Master values.
- Preferred native structure.
- Allowed edits.
- Forbidden edits.
- Preconditions.
- Abort-if conditions.
- Post-edit readback.
- Render/save-reopen checkpoint when evaluating Trusted status.

Do not collapse unsupported capability into instruction wording. If the desired mutation surface is unavailable, route to assisted rebuild, DRFX/template, direct asset import, or bake fallback as appropriate.

## New canary — DV21-INSTRUCTION-SCOPE-01

In a synthetic Resolve 21 timeline containing three visually obvious clips:

1. identify exactly one target clip and one allowed property,
2. create an instruction from the sidecar scope,
3. make the intended bounded edit,
4. read back the target property,
5. compare all non-target clip/timeline state before/after,
6. deliberately rerun with ambiguous target scope and confirm the instruction aborts rather than guessing.

Pass requires both successful intended mutation **and zero unrelated mutations**.

## Failure fingerprints

- `capability-exists-so-just-run-it`: capability availability is mistaken for safe targeting -> require execution scope.
- `ambiguous-target-guessed`: timeline/clip identity missing -> abort.
- `unsupported-intent-worded-as-command`: instruction language implies a write surface that is not verified -> route/reclassify first.
- `readback-only-target`: target looks correct but unrelated clips were not diffed -> compare bounded non-target state too.
- `high-impact-auto-choice`: technical ability is used to replace/delete/reorder human-owned content -> forbidden.

## Saturation

NO_CHANGE is false. Instruction Reliability is now represented in the same machine-readable artifact as Handoff Fidelity, Human Adjustability and Runtime evidence.
