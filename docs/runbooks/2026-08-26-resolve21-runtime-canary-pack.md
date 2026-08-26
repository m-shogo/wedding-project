# Resolve 21 Runtime Canary Pack — 2026-08-26

Status: ACTIVE EXECUTION RUNBOOK  
Scope: Movie Tool Learning only  
Goal: convert `PENDING_RUNTIME` Resolve/Palmier/Remotion assumptions into repeatable real-runtime evidence without touching the real wedding project first.

## Why this exists

The repository already has a strong Mask Reveal local gate, but several high-value handoff claims still need the same quality of runtime evidence:

- Palmier real FCPXML clean import
- Remotion ProRes 4444 alpha round-trip
- Lottie/OGraf native import and editability boundary
- DRFX/template install + human-adjustable Inspector controls
- audio fade/volume recovery and scripting write boundary
- DRT editable timeline portability and dependency inventory

This pack standardizes those tests so each one uses the same safety, evidence, pass/fail, save/reopen, and promotion rules.

## Authority split

Keep these separate:

```text
Human Master / Scene Source of Truth
!=
Tool Learning / Runtime Policy Source of Truth
!=
Runtime Evidence
```

A rendered file, screenshot, FCPXML, DRT, DRFX, or readback JSON is evidence or transport. It is not automatically the Human Master.

## Machine-readable authority

- schema: `motion-studio/src/data/resolveRuntimeCanary.schema.ts`
- catalog: `motion-studio/src/data/resolveRuntimeCanaryPack.ts`
- compiler: `motion-studio/scripts/resolve-runtime-canary-plan.mts`
- verifier: `motion-studio/scripts/check-resolve-runtime-canary-pack.mts`
- generic read-only probe: `scripts/davinci/resolve21-runtime-readonly-probe.sh`
- specialized Mask Reveal gate remains valid for `type-mask-reveal`.

## Quick start

From repo root, first run the read-only probe:

```bash
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
```

The probe is only a hint. `resolveVersionFromBundle` is not authoritative runtime proof. Capture exact product/version/edition from the live Resolve UI or a supported live API/MCP connection during the canary.

List canaries:

```bash
cd motion-studio
node --no-warnings scripts/resolve-runtime-canary-plan.mts --list
```

Compile one human-readable execution plan:

```bash
node --no-warnings scripts/resolve-runtime-canary-plan.mts DV21-REMOTION-ALPHA-01
```

Get the exact machine-readable definition:

```bash
node --no-warnings scripts/resolve-runtime-canary-plan.mts DV21-REMOTION-ALPHA-01 --json
```

Generate a fail-closed evidence skeleton:

```bash
node --no-warnings scripts/resolve-runtime-canary-plan.mts DV21-REMOTION-ALPHA-01 --evidence-template
```

Fresh evidence always starts with:

```text
result = NOT_RUN
capturedAt = null
promotionEligible = false
```

Do not hand-edit those fields to claim success before execution evidence exists.

## Canary order

### P0 — execute first

1. `DV21-REMOTION-ALPHA-01`
   - already has a repo render command for a neutral ProRes 4444 alpha asset
   - separates source alpha / import alpha / working-path alpha / export alpha

2. `DV21-AUDIO-RECOVERY-01`
   - proves native human recovery first
   - independently probes write automation
   - never confuses manual recoverability with API write capability

3. `DV21-PALMIER-FCPXML-01`
   - highest Palmier handoff value
   - stays `BLOCKED_INPUT` until a **real Palmier-exported** synthetic timeline FCPXML exists
   - never synthesize fake Palmier XML just to unblock the canary

### P1

4. `DV21-LOTTIE-OGRAF-01`
   - macOS/Windows only until separate evidence expands the platform boundary
   - direct native import and internal parameter editability are separate observations

5. `DV21-DRFX-FREE-01`
   - needs a neutral repo-generated DRFX/template fixture
   - first fixture should avoid third-party plugin dependencies

### P2

6. `DV21-DRT-PORTABILITY-01`
   - proves editable timeline transfer in a clean context
   - never treats DRT as a self-contained dependency archive

## Universal preflight

Before any mutation:

1. fetch latest `main`
2. inspect open Movie PRs
3. preserve unrelated local work
4. use a dedicated Movie branch if evidence/code will be committed
5. confirm a **disposable Resolve project/timeline** is active
6. confirm the real Opening/Profile project is not the mutation target
7. capture exact live Resolve product/version/edition/platform
8. identify every required canary input and hash the exact files when practical
9. do not install network dependencies during first-pass canary execution
10. do not commit private wedding media, copyrighted audio, paid template binaries, or secrets

## Runtime evidence rules

For every step record only what was actually observed.

Use `null`, `NOT_RUN`, `BLOCKED`, or `FAIL` when data is unavailable or a step fails. Never infer success from nearby evidence.

Examples:

```text
artifact generated != artifact imports
artifact imports != parameters are editable
parameters editable != easy for a human to adjust
FCPXML parses != timeline fidelity
alpha imports != alpha exports
manual audio recovery != automated audio write
DRT imports != dependencies are bundled
```

## Save/reopen rule

Most interoperability bugs appear only after project serialization/reopen. If the canary definition requires save/reopen, a pre-save screenshot is insufficient.

Capture the same important inventory/readback again after reopen.

## Render rule

When `promotion.requiresRender = true`, a render artifact is mandatory.

Record at least:

- output path
- codec/container
- width/height/fps where relevant
- SHA-256
- visual review result

Render Cache / Proxy Media / Optimized Media are not final source-truth evidence.

## Promotion rule

The catalog intentionally requires **two independent executions** before promotion.

A single successful execution may produce a valid `PASS` evidence record, but it does not by itself justify changing the canonical capability to `REPRODUCED`.

Promotion requires:

```text
minimumIndependentExecutions >= 2
+
all required evidence present
+
all pass criteria satisfied
+
no fail criterion triggered
+
required save/reopen completed
+
required render completed
```

If a later Resolve patch invalidates the behavior, move the capability to `NEEDS_REVALIDATION`; do not preserve a stale `RUNTIME_VERIFIED` label.

## Evidence storage

Use a unique execution ID such as:

```text
DV21-REMOTION-ALPHA-01-20260826-MAC-FREE-A
```

If evidence contains only neutral/non-private data, it may be committed under a dedicated Movie evidence path in a focused PR. If it contains private paths/media/project names, keep the raw local evidence out of Git and commit only a sanitized summary/hash where appropriate.

Never overwrite previous independent evidence to make the latest run look cleaner.

## Specialized Mask Reveal relation

The existing Mask Reveal local gate remains the first Scene-level Actual proof:

`docs/runbooks/2026-08-25-mask-reveal-local-davinci-actual-gate.md`

Use it for SceneInstance/Human Master → Text+ + Rectangle Mask → Actual DaVinci render.

Use this generic Canary Pack for cross-tool/runtime capabilities that must be reusable across many Motion Patterns.

## Completion target for this phase

This phase is complete when the highest-value P0 canaries have real evidence and the policy can honestly distinguish:

```text
PENDING_RUNTIME
RUNTIME_VERIFIED / REPRODUCED
FAILED
BLOCKED_INPUT
NEEDS_REVALIDATION
```

Do not call research saturated while the P0 runtime canaries remain unexecuted.
