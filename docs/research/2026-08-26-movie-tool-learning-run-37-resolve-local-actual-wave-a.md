# Movie Tool Learning Run 37 — Resolve 21 Local Actual Wave A

Date: 2026-08-26  
Status: IMPLEMENTED PRE-RUNTIME / LOCAL RESOLVE ACTUAL REQUIRED  
Scope: Movie Tool Learning only

## Why this run exists

The Tool Learning Base already had deterministic inputs and immutable Session preparation for the main Resolve canaries, but the human execution surface was fragmented:

- Alpha and Audio were `READY_TO_EXECUTE` through the generic canary/session path;
- Lottie and DRFX had a dedicated two-canary local batch;
- Palmier now has its own stronger scene-v2 path and cannot be honestly batched until a real Palmier export exists.

That meant the first local Resolve operator still had to discover and assemble multiple entry points before doing the actual high-value runtime work.

The gap is operational, not a new codec/import capability claim:

```text
CANARY_INPUT_READY != HUMAN_EXECUTION_READY
```

Run37 adds a single **Wave A** preparation and execution route for the four high-value canaries that can be prepared without a real Palmier export.

## Fresh Resolve 21 primary-source re-check

Before adding another execution workflow, the current Blackmagic Design authority was checked again on 2026-08-26.

Official Support Center still lists:

```text
DaVinci Resolve 21.0.3 Update
2026-07-22
```

Official Resolve welcome/manual page lists:

```text
DaVinci Resolve 21 Manual
2026-07-10
```

Primary sources:

- https://www.blackmagicdesign.com/jp/support
- https://www.blackmagicdesign.com/welcome/en/W-DRE-03

No newer official 21.x update was found in this re-check. This is a freshness confirmation, not runtime identity.

```text
DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY
TARGET_PATCH != TESTED_PATCH
```

The product baseline stays Resolve 21. The local Actual must record the exact installed/live version rather than assuming it equals 21.0.3.

## Wave A contents

Added:

```text
motion-studio/scripts/prepare-resolve-local-actual-wave-a.mts
```

Wave A contains, in priority order:

```text
DV21-REMOTION-ALPHA-01
DV21-AUDIO-RECOVERY-01
DV21-LOTTIE-OGRAF-01
DV21-DRFX-FREE-01
```

Each remains an independent canary with its own:

- execution ID;
- input manifest;
- Session;
- `plan.md`;
- `RUN.md`;
- `evidence.json`;
- promotion boundary.

The batch is only a human-friendly preparation/orchestration layer.

```text
WAVE_PREPARED != RESOLVE_EXECUTED
```

## Explicit exclusions

### Palmier FCPXML

Palmier is not silently skipped or faked.

It is explicitly excluded because:

```text
REAL_PALMIER_EXPORT_REQUIRED
```

The correct Palmier path remains:

```text
scene-v2 build in real Palmier
-> exact queued export terminal completion
-> scene-contract/freshness/provenance attach
-> Palmier v2 effective Resolve Session
-> Resolve Actual
```

### DRT portability

`DV21-DRT-PORTABILITY-01` remains a P2 canary and is intentionally outside the first high-value Wave A. It can be executed after the P0/P1 evidence gap is reduced.

## Alpha preparation choice

The Wave A helper accepts:

```text
--reuse-alpha
```

Only Alpha may receive the existing generic Session preparer's explicit `--reuse-existing` path.

This is not a generic reuse flag for every canary.

Without `--reuse-alpha`, the authoritative Alpha preparer decides its normal render/preparation path.

With `--reuse-alpha`, the exact existing neutral source still has to survive manifest/hash validation.

```text
REUSE_REQUEST != INPUT_PROVENANCE_BYPASS
```

## Human adjustability is part of Wave A

The Wave A summary records a human-facing focus for every canary.

### Alpha

The operator must understand where transparency could be lost:

```text
source
import
working path
export
```

This makes late troubleshooting understandable instead of treating alpha as one boolean.

### Audio

The first question is whether a human can reproduce the Palmier-lost envelope precisely using native controls.

The scripting-write probe is separate.

```text
MANUAL_RECOVERY != AUTOMATED_WRITE
```

The operator records timing/dB precision, listening result and recovery friction.

### Lottie

The operator distinguishes:

```text
native import
clip-level editing
source/internal parameter editing
```

This prevents a usable native animation clip from being incorrectly labeled fully source-parametric.

### DRFX

The operator explicitly judges whether a routine late edit is available from the normal Inspector without opening an opaque Fusion graph.

```text
PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE
```

This is directly relevant to Wedding production: the handoff is only good if normal last-minute changes are easy for a human.

## New local execution prompt

Added:

```text
docs/prompts/2026-08-26-resolve21-wave-a-local-actual-agent.md
```

It gives the local Resolve-capable agent one ordered workflow while preserving independent evidence.

It also adds a standard failure fingerprint set including:

```text
HUMAN_ADJUSTABILITY_FAIL
```

A failure is retained and converted into a bounded next experiment instead of being overwritten by a retry.

## Safety / provenance behavior

Wave A preparation must never:

- launch Resolve;
- mark a runtime step PASS;
- set `promotionEligible=true`;
- reuse an existing execution ID;
- mutate the real wedding project;
- fabricate Palmier FCPXML;
- install external dependencies inside Resolve.

Every prepared Session must remain:

```text
READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

## Why this is better than extending the old Lottie/DRFX batch

The existing Lottie/DRFX local batch is preserved for backward compatibility and focused testing.

Run37 adds a new Wave A entry rather than silently changing the old batch from two canaries to four. This avoids surprising existing instructions and preserves earlier evidence/session semantics.

```text
NEW_EXECUTION_PROFILE > SILENT_OLD_PROFILE_MUTATION
```

## Runtime boundary

Run37 does not prove:

- Resolve Alpha round-trip;
- Fairlight manual envelope precision;
- audio automation script writes;
- Lottie import/alpha/internal editing;
- DRFX installation or Inspector usability.

Those are now cheaper to execute, but still runtime-pending.

## Next highest-value work

After CI, the next high-value action is a local Resolve Wave A execution on the installed Resolve 21 runtime.

At that boundary a local Codex / Claude Code / computer-control agent is required.

If the user is not ready to run local Actual yet, further source research should only continue when it finds a genuinely new official capability/version change or a concrete unresolved implementation gap.

```text
RESEARCH_SATURATED_PRE_RUNTIME = near_true
RUNTIME_EVIDENCE_SATURATED = false
```
