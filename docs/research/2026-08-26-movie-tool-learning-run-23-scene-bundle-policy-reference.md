# Movie Tool Learning Run 23 — Scene Production Bundle vs Tool Learning policy authority

Date: 2026-08-26
Scope: Movie Tool Learning only.

## Problem

Run 16-22 promoted Resolve handoff/recovery knowledge into machine-readable contracts, while Motion Zukan already had a scene-specific Production Bundle carrying Human Master state and Palmier/DaVinci target data.

Copying all Transport/Editability/Human Adjustability/Runtime policy fields into every Scene Bundle would create two sources of truth:

- scene values could be fresh while policy is stale,
- policy could be corrected after a Resolve/Palmier update while old scene bundles continue carrying obsolete copies,
- every new Tool Learning axis would require migrations across every pattern-specific bundle.

## Authority split

Keep two distinct authorities:

### Scene authority

`SceneInstance / MaskRevealSceneProductionBundle`

Owns:

- human-selected production values,
- locks,
- Scene timing,
- source revision/freshness,
- scene identity/marker,
- Palmier target filename/instruction,
- DaVinci implementation/value bridge/applied evidence.

### Tool Learning policy authority

Canonical Tool Learning registries / generic Resolve handoff schema own:

- transport class,
- automation availability,
- post-handoff editability,
- Human Adjustability,
- platform/edition/version constraints,
- runtime/evidence state,
- dependencies/recovery/verification semantics.

Guardrail:

`SCENE_SOURCE_OF_TRUTH != TOOL_POLICY_SOURCE_OF_TRUTH`

## Implementation

`MaskRevealSceneProductionBundleV1` now includes a `handoffPolicy` reference block rather than duplicated policy records.

It contains:

- `role: REFERENCE_ONLY`,
- canonical Palmier/DaVinci registry path,
- Human Adjustability registry path,
- generic Resolve handoff schema path,
- the exact `maskRevealActiveHandoffPropertyIds` applicable to this pattern,
- an explicit rule forbidding duplicated policy truth in the Scene Bundle.

The existing Scene Production Bundle verifier now fails if this reference-only boundary disappears.

## Why IDs, not copied records

`maskRevealActiveHandoffPropertyIds` already expresses the pattern-to-capability relationship. Reusing those IDs gives the scene bundle stable semantic links while allowing Tool Learning to correct or revalidate each capability centrally.

This also supports dependency-scoped revalidation:

- a Resolve patch that only affects Lottie does not invalidate unrelated Transform policy,
- a Palmier exporter fix can update the canonical capability once,
- existing Scene Bundles can be regenerated from current Scene values while resolving current policy at use time.

## Instruction flow

Preferred flow becomes:

`Human Scene state -> fresh Scene Production Bundle -> capability IDs -> current Tool Learning policy -> target-specific Palmier/Resolve instruction -> actual readback/evidence`

The Scene Bundle never fabricates Palmier NLE XML, and Tool Learning policy never overwrites Human Master values.

## Failure fingerprints

- `scene-bundle-copies-policy`: full policy records serialized into each scene bundle -> replace with canonical references.
- `policy-corrected-scene-stale`: new evidence updates registry but old scene copy stays wrong -> prevented by reference-only model.
- `generic-policy-overwrites-scene`: recovery policy is treated as Human Master -> forbidden.
- `capability-link-by-name`: prose labels are used instead of stable capability IDs -> use canonical IDs.

## Canary — MZ-HANDOFF-POLICY-REF-01

1. Build a Mask Reveal Scene Bundle.
2. Confirm Human Master values are contained in the bundle.
3. Confirm applicable handoff property IDs are referenced, not duplicated records.
4. Change one canonical Tool Learning policy classification in a synthetic test fixture.
5. Re-resolve policy without changing the Scene/Human Master data.
6. Confirm the resulting target instruction changes only where the capability policy changed.
7. Confirm Scene revision/freshness remains independent of Tool policy revision.

## Saturation

NO_CHANGE is false. The accumulated Tool Learning knowledge is now integrated with Motion Zukan without creating a competing Scene source of truth.
