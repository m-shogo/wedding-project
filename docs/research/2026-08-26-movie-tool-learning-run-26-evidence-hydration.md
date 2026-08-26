# Movie Tool Learning Run 26 — Resolve Canary Evidence Hydration

Date: 2026-08-26  
Status: IMPLEMENTED / RESOLVE RUNTIME STILL PENDING

## Goal

Run 25 made P0 Canary inputs reproducible and hashable. Run 26 removes the next manual error source: copying input paths and SHA-256 values from `resolve-canary-input-manifest/v1` into `resolve-runtime-canary-evidence/v1` by hand.

The new flow is:

```text
Neutral input generation
→ input manifest
→ hash verification
→ fail-closed evidence hydration
→ human / local-agent Resolve execution
→ runtime readback
→ semantic validation
→ independent-run promotion review
```

Hydration intentionally stops before the Resolve execution boundary.

## Added hydrator

Script:

```text
motion-studio/scripts/hydrate-resolve-canary-evidence.mts
```

Example:

```bash
cd motion-studio
node --no-warnings scripts/hydrate-resolve-canary-evidence.mts \
  out/canary-inputs/manifests/DV21-AUDIO-RECOVERY-01.json \
  --execution-id DV21-AUDIO-RECOVERY-01-20260826-MAC-FREE-A
```

The hydrator:

- parses the manifest through the canonical manifest schema
- resolves the Canary by `canaryId`
- verifies every recorded input/support file exists
- recomputes SHA-256 for every file
- aborts on a missing hash, missing file, or hash mismatch
- starts from `createResolveRuntimeCanaryEvidenceTemplate()`
- binds only file IDs that exactly equal Canary input IDs
- stores unmatched preparation files as `INPUT_SUPPORT`
- records the manifest itself as `INPUT_MANIFEST`
- leaves every runtime step `NOT_RUN`
- keeps `capturedAt = null`
- keeps `promotionEligible = false`

For a normal prepared input manifest:

```text
PREPARED_MANIFEST
→ result = NOT_RUN
```

For Palmier scene-preparation manifests that still require the real Palmier export:

```text
BLOCKED_REAL_TOOL_EXPORT_REQUIRED
→ result = BLOCKED
```

## Why exact ID binding matters

Palmier preparation currently creates:

```text
palmier-scene-spec
```

But the actual Canary requires:

```text
palmier-real-fcpxml
human-master-sidecar
```

The hydrator must not infer that a scene specification satisfies either requirement.

Therefore:

```text
palmier-scene-spec != palmier-real-fcpxml
INPUT_SUPPORT != REQUIRED_RUNTIME_INPUT
```

Only an exact ID match is allowed to set `inputInventory[].present = true`.

## Added semantic evidence validator

Script:

```text
motion-studio/scripts/validate-resolve-canary-evidence.mts
```

It validates more than Zod shape correctness:

- evidence `canaryId` must resolve to a real Canary
- input inventory IDs must exactly match the Canary definition
- step result IDs must exactly match the Canary definition
- `PASS` / `FAIL` require a runtime `capturedAt`
- `NOT_RUN` / `BLOCKED` can never be promotion eligible
- `NOT_RUN` cannot contain executed step results
- `BLOCKED` cannot contain PASS runtime steps
- `promotionEligible=true` requires:
  - `result=PASS`
  - runtime timestamp
  - every Canary step PASS
  - every required input `present=true`
  - required Human Review completed
  - required `RENDER` artifact when the Canary requires render

The validator intentionally does **not** prove `minimumIndependentExecutions >= 2`; that is a cross-evidence decision and cannot be established from a single JSON file.

## CI runtime-neutral proof

`Resolve Runtime Canary Pack CI` now performs an end-to-end preparation/evidence test without launching Resolve.

### Audio

CI:

1. generates the neutral 440 Hz WAV
2. generates the Human Master
3. generates the input manifest
4. hydrates an evidence JSON
5. validates the evidence semantically
6. asserts:
   - `result = NOT_RUN`
   - `capturedAt = null`
   - `promotionEligible = false`
   - both Audio input IDs are present with verified hashes
   - every runtime step remains `NOT_RUN`
   - the input manifest is recorded
   - `MANIFEST_PREPARED != RUNTIME_EXECUTED` is preserved

### Tamper test

CI then appends bytes to the generated WAV and retries hydration.

Expected result:

```text
SHA mismatch
→ hydration FAIL
→ no evidence output written
```

This proves that a stale manifest cannot silently hydrate a changed input.

### Palmier

CI generates only the Palmier synthetic scene specification and blocked manifest, then hydrates evidence.

Expected result:

```text
result = BLOCKED
promotionEligible = false
real Palmier FCPXML input present != true
scene spec stored as INPUT_SUPPORT
```

No XML/FCPXML is synthesized.

## CLI integration

`resolve-runtime-canary-plan.mts` now shows:

- input preparation command
- expected manifest path
- evidence hydration command

A local execution agent can therefore move from Canary selection to input preparation and evidence skeleton creation without searching another document.

## Guardrails learned

```text
MANIFEST_PREPARED != RUNTIME_EXECUTED
HASH_MATCH != RESOLVE_IMPORT_SUCCESS
INPUT_SUPPORT != REQUIRED_RUNTIME_INPUT
EVIDENCE_FILE_VALID != MULTI_RUN_PROMOTION_PROVEN
```

## Honesty boundary

Run 26 improves provenance and execution readiness only.

It does not prove:

- Resolve alpha import/export
- Resolve audio automation UI fidelity
- Resolve audio automation scripting write capability
- Palmier FCPXML import fidelity
- save/reopen behavior
- runtime render parity

All of those remain `PENDING_RUNTIME` until actual Resolve execution occurs.

`RESEARCH_SATURATED = false`

## Next highest-value work

1. execute `DV21-AUDIO-RECOVERY-01` in a disposable Resolve runtime using hydrated evidence
2. execute `DV21-REMOTION-ALPHA-01` with the neutral ProRes 4444 source
3. produce the real Palmier FCPXML from the synthetic scene spec
4. add an execution-finalization helper that records runtime version/timestamp/result while still requiring explicit human/agent observations instead of auto-claiming PASS
