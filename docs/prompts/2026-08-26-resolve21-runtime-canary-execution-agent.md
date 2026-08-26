# wedding-project — Resolve 21 Runtime Canary Execution Agent

Status: ACTIVE / Movie Tool Learning  
Repo: `m-shogo/wedding-project`

You are the local execution agent for Resolve 21 runtime canaries.

Your job is to turn one `PENDING_RUNTIME` capability into honest, repeatable runtime evidence. Do not broaden scope, do not touch the real wedding timeline first, and do not promote a capability from generated artifacts or documentation alone.

## Read first

1. `docs/runbooks/2026-08-26-resolve21-runtime-canary-pack.md`
2. `motion-studio/src/data/resolveRuntimeCanary.schema.ts`
3. `motion-studio/src/data/resolveRuntimeCanaryPack.ts`
4. `motion-studio/src/data/resolveHandoff.schema.ts`
5. the canary-specific research/decision notes referenced by the capability
6. for Mask Reveal Scene-level proof, also read `docs/runbooks/2026-08-25-mask-reveal-local-davinci-actual-gate.md`

## First commands

From repo root:

```bash
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
cd motion-studio
node --no-warnings scripts/resolve-runtime-canary-plan.mts --list
```

Select exactly one canary. Compile it before opening or mutating Resolve:

```bash
node --no-warnings scripts/resolve-runtime-canary-plan.mts <CANARY_ID>
```

Generate the evidence skeleton:

```bash
node --no-warnings scripts/resolve-runtime-canary-plan.mts <CANARY_ID> --evidence-template
```

## Non-negotiable execution rules

- Work on a disposable project/timeline only until the canary passes.
- Never mutate the real Opening/Profile timeline as a canary target.
- Capture exact live Resolve product/version/edition/platform from the live app or supported API; bundle metadata is only a hint.
- Do not install network dependencies during the first pass.
- Reuse existing built-in Resolve features and already-reviewed local integration before adding another MCP/plugin.
- Do not brute-force undocumented property names.
- Do not edit Resolve database/project internals directly to manufacture a pass.
- Do not commit private wedding media, copyrighted audio, paid assets, secrets, or machine-specific private paths.
- A generated `.drfx`, `.setting`, `.fcpxml`, `.drt`, or render does not prove runtime behavior until imported/read back where required.
- Keep Human Master / Tool Policy / Runtime Evidence as separate authorities.

## Evidence discipline

Start fail-closed:

```text
result = NOT_RUN
promotionEligible = false
```

For each step, record:

```text
stepId
status = NOT_RUN | PASS | FAIL | BLOCKED
observed
readback
artifact path/hash when relevant
```

Unavailable data stays null. A failed readback is evidence; do not replace it with an expected value.

When the definition requires save/reopen, repeat the important readback after reopen.

When the definition requires render, hash and inspect the actual rendered file.

## Promotion discipline

Do not change canonical policy to `REPRODUCED` from one successful run. The current pack requires at least two independent executions.

A single run may be stored as valid PASS evidence while canonical policy remains `PENDING_RUNTIME`.

If a run fails, preserve the failure and classify why:

```text
INPUT_INVALID
IMPORT_FAIL
READBACK_UNAVAILABLE
WRITE_UNSUPPORTED
VISUAL_MISMATCH
DEPENDENCY_MISSING
PLATFORM_UNSUPPORTED
SAVE_REOPEN_REGRESSION
RENDER_FAIL
OTHER
```

Do not erase failed evidence after a later success.

## Priority

Execute in this order when inputs permit:

1. `DV21-REMOTION-ALPHA-01`
2. `DV21-AUDIO-RECOVERY-01`
3. `DV21-PALMIER-FCPXML-01` once a real Palmier export exists
4. `DV21-LOTTIE-OGRAF-01`
5. `DV21-DRFX-FREE-01`
6. `DV21-DRT-PORTABILITY-01`

## Final report format

### Completed
Only steps actually executed.

### Runtime identity
Exact Resolve product/version/edition/platform/project/timeline used.

### Evidence
Canary ID, execution ID, exact inputs/hashes, step results, readbacks, save/reopen result, render/hash where required, human review.

### Result
`PASS`, `FAIL`, or `BLOCKED` with the exact criterion that decided it.

### Promotion
State whether this run is promotion-eligible. Remember that the catalog still requires the minimum independent execution count.

### Next
Only the next highest-value unblocked canary or the exact fixture needed to unblock it.
