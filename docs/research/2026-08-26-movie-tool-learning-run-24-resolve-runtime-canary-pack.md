# Movie Tool Learning Run 24 — Resolve Runtime Canary Pack

Date: 2026-08-26  
Status: IMPLEMENTED / RUNTIME EXECUTION STILL PENDING

## Problem

The repository had strong research and a specialized Mask Reveal local DaVinci gate, but high-value cross-tool claims were still spread across research prose and individual canary names. A future agent could understand what should be tested but still execute each test with inconsistent evidence quality.

## Implemented answer

A shared runtime-canary contract now defines:

- exact canary identity and priority
- Resolve major + exact-patch-at-runtime rule
- edition/platform/page scope
- disposable-project safety
- required inputs and preparation commands
- preflight
- ordered mutation/readback/render steps
- explicit abort conditions
- required evidence kinds
- pass criteria
- fail criteria
- promotion rule
- non-equivalence guardrails

A separate evidence schema starts fail-closed and stores only runtime observations.

## Initial canaries

- `DV21-PALMIER-FCPXML-01`
- `DV21-REMOTION-ALPHA-01`
- `DV21-LOTTIE-OGRAF-01`
- `DV21-DRFX-FREE-01`
- `DV21-AUDIO-RECOVERY-01`
- `DV21-DRT-PORTABILITY-01`

## Execution priority

P0:

1. Remotion ProRes 4444 alpha round-trip
2. Audio fade/volume recovery + scripting-write boundary
3. Palmier real FCPXML clean import once a real Palmier export fixture exists

P1:

4. Lottie/OGraf import/editability boundary
5. DRFX install + human-adjustable controls

P2:

6. DRT portability/dependency inventory

## Important boundary decisions

- a single successful run can be valid evidence but does not promote the canonical capability to reproduced
- promotion requires at least two independent executions
- save/reopen is mandatory when the canary says it is
- render is mandatory when the canary says it is
- Palmier FCPXML canary stays `BLOCKED_INPUT` until a real Palmier export exists
- Lottie/OGraf initial platform scope remains macOS/Windows rather than assumed universal desktop support
- audio manual recovery stays separate from automated write capability
- DRT editability stays separate from dependency bundling

## Tooling added

- `motion-studio/src/data/resolveRuntimeCanary.schema.ts`
- `motion-studio/src/data/resolveRuntimeCanaryPack.ts`
- `motion-studio/scripts/resolve-runtime-canary-plan.mts`
- `motion-studio/scripts/check-resolve-runtime-canary-pack.mts`
- `scripts/davinci/resolve21-runtime-readonly-probe.sh`
- `docs/runbooks/2026-08-26-resolve21-runtime-canary-pack.md`
- `docs/prompts/2026-08-26-resolve21-runtime-canary-execution-agent.md`
- `.github/workflows/resolve-runtime-canary-pack-ci.yml`

## Honesty boundary

This run improves execution readiness; it does **not** execute DaVinci Resolve itself.

All capabilities without real evidence remain runtime-pending. Generated plans, evidence skeletons, green TypeScript, and green CI are not substitutes for Resolve runtime proof.

`RESEARCH_SATURATED = false`

The next highest-value work is actual execution of `DV21-REMOTION-ALPHA-01`, followed by `DV21-AUDIO-RECOVERY-01`, while preparing the real Palmier synthetic FCPXML fixture needed for `DV21-PALMIER-FCPXML-01`.
