# wedding-project — Resolve 21 Runtime Canary Execution Agent

Status: ACTIVE / Movie Tool Learning  
Repo: `m-shogo/wedding-project`

You are the local execution agent for Resolve 21 runtime canaries.

Your job is to turn one `PENDING_RUNTIME` capability into honest, repeatable runtime evidence. Do not broaden scope, do not touch the real wedding timeline first, and do not promote a capability from generated artifacts or documentation alone.

## Read first

1. `docs/runbooks/2026-08-26-resolve21-runtime-canary-pack.md`
2. `motion-studio/src/data/resolveRuntimeCanary.schema.ts`
3. `motion-studio/src/data/resolveRuntimeCanaryPack.ts`
4. `motion-studio/src/data/resolveCanarySession.schema.ts`
5. `motion-studio/src/data/resolveHandoff.schema.ts`
6. the canary-specific research/decision notes referenced by the capability
7. for Palmier FCPXML, also read `docs/runbooks/2026-08-26-palmier-real-export-attach.md`
8. for Mask Reveal Scene-level proof, also read `docs/runbooks/2026-08-25-mask-reveal-local-davinci-actual-gate.md`

## First commands

From repo root:

```bash
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
cd motion-studio
node --no-warnings scripts/resolve-runtime-canary-plan.mts --list
```

Select exactly one canary and compile it before opening or mutating Resolve:

```bash
node --no-warnings scripts/resolve-runtime-canary-plan.mts <CANARY_ID>
```

### P0 canaries — preferred path

When the plan says `SESSION_PREP_AVAILABLE`, create one immutable local execution session:

```bash
node --no-warnings scripts/prepare-resolve-canary-session.mts \
  <CANARY_ID> \
  --execution-id <UNIQUE_EXECUTION_ID>
```

For Alpha, `--reuse-existing` may be added when the exact existing neutral ProRes render is intentionally being reused.

For Palmier, do **not** use `--reuse-existing` while the scene-spec manifest is BLOCKED. First obtain a genuine **fresh** Palmier DaVinci/Resolve FCPXML export. Record an ISO-8601 timestamp immediately before starting the Palmier export and prefer a unique output path for each attempt. Then inspect structure, verify freshness, attach with explicit operator attestation, and only then create the runtime session with `--reuse-existing` so the PREPARED attachment manifest is preserved:

```bash
node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml <PALMIER_EXPORT.fcpxml> \
  --inspect-only

node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml <PALMIER_EXPORT.fcpxml> \
  --export-started-at <ISO8601> \
  --check-freshness-only

node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml <PALMIER_EXPORT.fcpxml> \
  --export-started-at <ISO8601> \
  --attest-real-palmier-export

node --no-warnings scripts/prepare-resolve-canary-session.mts \
  DV21-PALMIER-FCPXML-01 \
  --execution-id <UNIQUE_EXECUTION_ID> \
  --reuse-existing
```

`--inspect-only` never proves provenance. `--check-freshness-only` proves only that the candidate file is fresh relative to the recorded export attempt; it still does not prove Palmier created it. The attach flag means the operator explicitly confirms that the file really came from Palmier's Resolve export path. Keep these distinctions:

```text
FILE_EXISTS != FRESH_EXPORT
FRESH_ARTIFACT != REAL_PALMIER_PROVENANCE
FCPXML_STRUCTURE_VALID != REAL_PALMIER_PROVENANCE
OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE
REAL_EXPORT_ATTACHMENT != RESOLVE_RUNTIME_EVIDENCE
```

The session is written under:

```text
out/canary-sessions/<UNIQUE_EXECUTION_ID>/
```

Read in this order:

1. `session.json`
2. `RUN.md`
3. `plan.md`
4. `evidence.json`

If `session.status = BLOCKED_INPUT`, do **not** start the Resolve canary. Perform only the `nextAction` needed to obtain the missing real-tool input.

If `session.status = READY_FOR_RUNTIME`, the session still has:

```text
runtimeLaunchPerformed = false
result = NOT_RUN
promotionEligible = false
```

That is the correct state before actual Resolve execution.

Never rerun the same execution ID to overwrite evidence. Create a new execution ID for an independent run.

### Canaries without automated session prep

Use the manual fail-closed skeleton:

```bash
node --no-warnings scripts/resolve-runtime-canary-plan.mts <CANARY_ID> --evidence-template
```

Prepare and hash inputs explicitly, then preserve the same evidence discipline used by P0 sessions.

## Non-negotiable execution rules

- Work on a disposable project/timeline only until the canary passes.
- Never mutate the real Opening/Profile timeline as a canary target.
- Capture exact live Resolve product/version/edition/platform from the live app or supported API; bundle metadata is only a hint.
- Do not install network dependencies during the first pass.
- Reuse existing built-in Resolve features and already-reviewed local integration before adding another MCP/plugin.
- Do not brute-force undocumented property names.
- Do not edit Resolve database/project internals directly to manufacture a pass.
- Do not commit private wedding media, copyrighted audio, paid assets, secrets, or machine-specific private paths.
- A generated `.drfx`, `.setting`, `.fcpxml`, `.drt`, session, manifest, or render does not prove runtime behavior until imported/read back where required.
- Keep Human Master / Tool Policy / Input Manifest / Runtime Evidence as separate authorities.

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

After material edits to evidence JSON, run:

```bash
node --no-warnings scripts/validate-resolve-canary-evidence.mts <EVIDENCE_JSON>
```

The validator checks internal eligibility of one evidence file. It does not prove the required independent-run count.

## Session discipline

Keep these distinctions explicit:

```text
SESSION_PREPARED != RESOLVE_EXECUTED
SESSION_READY != CANARY_PASS
MANIFEST_PREPARED != RUNTIME_EXECUTED
HASH_MATCH != RESOLVE_IMPORT_SUCCESS
EVIDENCE_FILE_VALID != MULTI_RUN_PROMOTION_PROVEN
```

A session is an execution workspace, not proof.

Do not overwrite or delete a failed session after a later success. Independent runs must remain independently identifiable.

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
3. `DV21-PALMIER-FCPXML-01` once a real fresh Palmier export exists
4. `DV21-LOTTIE-OGRAF-01`
5. `DV21-DRFX-FREE-01`
6. `DV21-DRT-PORTABILITY-01`

## Final report format

### Completed
Only steps actually executed.

### Session
Canary ID, execution ID, session path, and whether it began READY or BLOCKED.

### Runtime identity
Exact Resolve product/version/edition/platform/project/timeline used.

### Evidence
Exact inputs/hashes, step results, readbacks, save/reopen result, render/hash where required, human review.

### Result
`PASS`, `FAIL`, or `BLOCKED` with the exact criterion that decided it.

### Promotion
State whether this run is internally promotion-eligible. Separately state that the catalog still requires the minimum independent execution count.

### Next
Only the next highest-value unblocked canary or the exact fixture needed to unblock it.
