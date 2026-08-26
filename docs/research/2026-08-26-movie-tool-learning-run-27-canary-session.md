# Movie Tool Learning Run 27 — One-command Resolve Canary Session

Date: 2026-08-26  
Status: IMPLEMENTED / RESOLVE RUNTIME STILL PENDING

## Goal

Run 25 made P0 inputs reproducible. Run 26 made manifest → evidence provenance hydration reproducible. Run 27 removes the remaining setup choreography before a human/local agent opens Resolve.

The new preferred P0 flow is:

```text
select Canary
→ prepare one immutable local Session
→ read RUN.md / plan.md
→ open Resolve manually only when READY
→ edit evidence.json with observed runtime values
→ semantic validation
```

## New Session schema

`resolve-canary-session/v1` records:

- Canary ID
- unique execution ID
- session creation time
- `READY_FOR_RUNTIME` or `BLOCKED_INPUT`
- Canary state at preparation time
- input manifest status
- Resolve major target
- `runtimeLaunchPerformed = false`
- `networkInstallRequested = false`
- local plan/evidence/instruction paths
- exact next action
- guardrails

The schema is intentionally an execution-workspace contract, not a PASS/FAIL evidence contract.

## Structured P0 preparation metadata

The P0 preparation registry now stores structured values:

```text
mode
command
result
manifestPath
```

This prevents the Session builder from parsing shell command strings to guess which preparation mode or manifest belongs to a Canary.

Canonical mappings remain:

```text
DV21-REMOTION-ALPHA-01 -> alpha
DV21-AUDIO-RECOVERY-01 -> audio
DV21-PALMIER-FCPXML-01 -> palmier
```

The fixture checker verifies that structured mode, command, and canonical manifest path stay aligned.

## New one-command Session builder

Script:

```text
motion-studio/scripts/prepare-resolve-canary-session.mts
```

Example:

```bash
cd motion-studio
node --no-warnings scripts/prepare-resolve-canary-session.mts \
  DV21-AUDIO-RECOVERY-01 \
  --execution-id DV21-AUDIO-RECOVERY-01-20260826-MAC-FREE-A
```

The builder reuses existing components instead of duplicating them:

1. structured P0 input preparation route
2. canonical input manifest
3. Canary plan compiler
4. evidence hydrator
5. semantic evidence validator

It writes:

```text
out/canary-sessions/<EXECUTION_ID>/
├── session.json
├── RUN.md
├── plan.md
└── evidence.json
```

No private binary media is copied into the Session folder.

## READY behavior

For a prepared Audio or Alpha Session with valid inputs:

```text
session.status = READY_FOR_RUNTIME
session.runtimeLaunchPerformed = false
evidence.result = NOT_RUN
evidence.capturedAt = null
evidence.promotionEligible = false
```

The next action explicitly tells the local operator/agent to open Resolve manually, confirm a disposable project, capture exact live runtime identity, and then execute `plan.md`.

Therefore:

```text
SESSION_READY != CANARY_PASS
```

## BLOCKED behavior

Palmier preparation currently produces only the synthetic scene specification, not real Palmier FCPXML.

The Session builder therefore preserves:

```text
session.status = BLOCKED_INPUT
evidence.result = BLOCKED
runtimeLaunchPerformed = false
```

The exact manifest `nextAction` is carried into `session.json` and `RUN.md`.

A blocked Session is not permission to open Resolve and improvise missing input.

## Immutable execution IDs

A Session folder is an independent execution workspace.

If:

```text
out/canary-sessions/<EXECUTION_ID>/
```

already exists, the builder fails before overwriting it.

This prevents a later rerun from silently replacing earlier evidence and pretending it was an independent execution.

```text
EXECUTION_ID_REUSE != INDEPENDENT_EXECUTION
```

## CLI / agent integration

`resolve-runtime-canary-plan.mts` now shows:

- structured preparation mode
- preparation command
- manifest path
- hydration command
- one-command Session command

The local Resolve execution-agent prompt now treats the Session builder as the preferred P0 path and falls back to manual evidence skeletons only when automated Session prep is not registered.

## Safety / honesty boundaries

```text
SESSION_PREPARED != RESOLVE_EXECUTED
SESSION_READY != CANARY_PASS
MANIFEST_PREPARED != RUNTIME_EXECUTED
HASH_MATCH != RESOLVE_IMPORT_SUCCESS
EVIDENCE_FILE_VALID != MULTI_RUN_PROMOTION_PROVEN
```

The Session builder does not:

- launch Resolve
- mutate a Resolve project
- claim runtime PASS
- set promotion eligibility
- install network dependencies
- overwrite an existing execution ID

## What remains runtime-only

Run 27 still does not prove:

- Alpha import/working/export behavior
- Audio native UI recovery
- Audio scripting write capability
- Palmier FCPXML fidelity
- save/reopen persistence
- final render parity

Those require an actual Resolve runtime.

`RESEARCH_SATURATED = false`

## Next highest-value work

1. CI-prove READY Audio Session creation end to end
2. CI-prove BLOCKED Palmier Session creation end to end
3. CI-prove duplicate execution ID refusal without evidence overwrite
4. after this infrastructure is merged, perform the first real disposable Resolve Audio or Alpha Session locally
5. add a narrow Palmier real-export attachment helper so a genuine FCPXML can unblock the Palmier Session without hand-editing manifest JSON
