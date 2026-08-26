# wedding-project — Resolve 21 Lottie + DRFX Local Actual Agent

Status: ACTIVE / LOCAL RUNTIME REQUIRED  
Scope: Movie Tool Learning only  
Target canaries:

- `DV21-LOTTIE-OGRAF-01`
- `DV21-DRFX-FREE-01`

You are the local execution agent running on the Mac/Windows machine that actually has DaVinci Resolve 21 installed.

Your job is to execute two already-prepared neutral runtime canaries honestly and return evidence. Do not broaden scope, do not touch the real wedding Opening/Profile project, and do not promote anything from generated artifacts alone.

## Why this task requires a local agent

GitHub CI can prove deterministic fixture generation, hashes, schemas, and fail-closed Session preparation. It cannot prove what the local DaVinci Resolve GUI/runtime actually imports, exposes, saves, reopens, or renders.

This task therefore requires Codex / Claude Code / another local agent with access to the repository and the local Resolve installation.

## Read first

1. `docs/prompts/2026-08-26-resolve21-runtime-canary-execution-agent.md`
2. `docs/runbooks/2026-08-26-resolve21-lottie-ograf-canary.md`
3. `docs/runbooks/2026-08-26-resolve21-drfx-free-canary.md`
4. `motion-studio/src/data/resolveRuntimeCanary.schema.ts`
5. `motion-studio/src/data/resolveCanarySession.schema.ts`

## Hard safety rules

- Use disposable Resolve projects only.
- Never mutate the real wedding Opening/Profile project or timeline.
- Do not import private wedding media for these canaries.
- Do not install network dependencies or third-party plugins.
- Do not edit Resolve database/project internals directly.
- Do not brute-force undocumented API/property names.
- Do not turn expected values into observed values.
- Do not overwrite a failed Session/evidence file with a later success.
- Do not commit screenshots/renders/local generated evidence automatically.
- Do not claim PASS merely because `.lottie` or `.drfx` generation succeeded.

## Step 0 — confirm repo/main and read-only Resolve identity

From repo root:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
```

Before making any Resolve mutation, record the exact live runtime identity when available:

```text
product
version / patch
Free or Studio edition
platform
```

Bundle metadata is only a hint. Prefer live app/supported runtime evidence.

If the repo has unrelated dirty changes, do not discard them. Stop and report them before continuing.

## Step 1 — prepare both immutable Sessions

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-local-actual-batch.mts \
  --execution-prefix 20260826-MAC-FREE-A
```

Use a new execution prefix if that exact prefix already exists. Never delete/reuse an existing execution ID merely to get a clean run.

Expected batch summary:

```text
out/canary-batches/20260826-MAC-FREE-A.json
```

Expected Sessions:

```text
out/canary-sessions/DV21-LOTTIE-OGRAF-01-20260826-MAC-FREE-A/
out/canary-sessions/DV21-DRFX-FREE-01-20260826-MAC-FREE-A/
```

Before opening Resolve, verify both Sessions say:

```text
status = READY_FOR_RUNTIME
canaryStateAtPreparation = PENDING_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

`catalogStateAtPreparation` may preserve an older catalog value. The effective Session state is allowed to clear only an input blocker after a validated `PREPARED` manifest; it does not prove runtime success.

Guardrail:

```text
PREPARED_MANIFEST_CAN_CLEAR_INPUT_BLOCK_ONLY
```

## Step 2 — execute Lottie first

Session:

```text
out/canary-sessions/DV21-LOTTIE-OGRAF-01-20260826-MAC-FREE-A/
```

Read in order:

1. `session.json`
2. `RUN.md`
3. `plan.md`
4. `evidence.json`

Use a disposable project named something neutral such as:

```text
WeddingCanary-Lottie-20260826-A
```

Follow `docs/runbooks/2026-08-26-resolve21-lottie-ograf-canary.md` exactly.

Required runtime observations include:

- exact Resolve product/version/edition/platform
- exact `.lottie` source hash from the input manifest
- whether native import succeeds
- observed duration
- transparency over a contrasting Resolve-generated background
- visible source motion
- clip-level trim/reposition/scale behavior
- save/reopen behavior
- whether internal/source keyframes are directly editable
- OGrafLoader availability/meaningfulness, recorded separately from import success

Keep these distinctions:

```text
DOTLOTTIE_ARCHIVE_VALID != RESOLVE_IMPORTABLE
ALPHA_INTENT != RESOLVE_ALPHA_PROOF
NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY
CLIP_LEVEL_EDITABLE != SOURCE_PARAMETRIC_EDITABLE
```

After every material `evidence.json` edit:

```bash
node --no-warnings scripts/validate-resolve-canary-evidence.mts \
  out/canary-sessions/DV21-LOTTIE-OGRAF-01-20260826-MAC-FREE-A/evidence.json
```

If import fails, preserve the failure. Do not change the fixture or fabricate a PASS in the same execution ID.

## Step 3 — execute DRFX second

Session:

```text
out/canary-sessions/DV21-DRFX-FREE-01-20260826-MAC-FREE-A/
```

Use a separate disposable project named something neutral such as:

```text
WeddingCanary-DRFX-20260826-A
```

Follow `docs/runbooks/2026-08-26-resolve21-drfx-free-canary.md` exactly.

Required runtime observations include:

- exact Resolve runtime identity
- exact `.drfx` hash
- install/import result
- restart requirement if any
- actual Effects Library category/name
- all exposed Inspector controls before mutation
- whether the intended human-facing `Color` control is easy to use
- keyframe availability if actually exposed
- changed value before save
- changed value after save/reopen
- short neutral render path/hash
- uninstall/remove behavior

Keep these distinctions:

```text
DRFX_ARCHIVE_VALID != RESOLVE_INSTALLABLE
SETTING_STRUCTURE_EXPECTED != FUSION_RUNTIME_VALID
EXPOSED_CONTROL_SCHEMA != HUMAN_USABILITY_PROVEN
NO_DECLARED_EXTERNAL_DEPENDENCY != CLEAN_CONTEXT_PORTABILITY_PROVEN
GENERATED_ARTIFACT != RUNTIME_VERIFIED_HANDOFF
```

After every material `evidence.json` edit:

```bash
node --no-warnings scripts/validate-resolve-canary-evidence.mts \
  out/canary-sessions/DV21-DRFX-FREE-01-20260826-MAC-FREE-A/evidence.json
```

If install/runtime behavior fails, preserve the failed execution and uninstall/clean up only through the supported Resolve route. Do not rewrite the Session as if it had never happened.

## Step 4 — do not promote from one execution

A successful local run may be valid PASS evidence for that one execution, but canonical promotion still requires the Canary Pack's independent execution count.

Keep:

```text
ONE_PASS != REPRODUCED
ONE_MACHINE != PORTABLE
IMPORT_SUCCESS != INTERNAL_EDITABILITY
```

Do not change canonical policy or `REPRODUCED` state solely from this first run.

## Step 5 — return results before committing runtime evidence

Do not automatically commit local screenshots, rendered media, app databases, Resolve projects, or machine-specific paths.

Return a concise report containing:

### Environment

- repo HEAD
- Resolve product/version/edition/platform

### Lottie

- execution ID
- source `.lottie` SHA-256
- import PASS/FAIL
- alpha PASS/FAIL
- observed duration
- trim/reposition/save-reopen result
- internal keyframe editability result
- OGrafLoader observation
- final evidence validator result

### DRFX

- execution ID
- `.drfx` SHA-256
- install PASS/FAIL
- actual category/name
- exposed controls
- keyframe observation
- save/reopen result
- render hash/result
- uninstall result
- final evidence validator result

### Files changed locally

List only the relevant generated Session/evidence paths. Explicitly call out any unrelated dirty files without modifying them.

### Next recommendation

Choose exactly one:

- repeat as independent execution B
- fix a fixture/runtime issue in a new branch
- downgrade/reclassify the capability based on observed failure

Do not silently move on after a failure.
