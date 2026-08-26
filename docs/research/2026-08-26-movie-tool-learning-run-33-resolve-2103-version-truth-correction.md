# Movie Tool Learning Run 33 — Resolve 21.0.3 version truth correction

Date: 2026-08-26  
Status: CURRENT VERSION AUTHORITY / RUNTIME IDENTITY STILL PENDING  
Scope: Movie Tool Learning only

## Why this correction exists

Earlier Run 04/05/30 research and one Decision/Policy path began treating `DaVinci Resolve 21.0.4` as either:

- the current official Resolve 21 release, or
- an already observed local runtime.

A fresh primary-source check on 2026-08-26 does not support that claim.

Blackmagic Design's current Support Center lists:

```text
DaVinci Resolve 21.0.3 Update
Date: 2026-07-22
Platforms: Mac OS / Linux / Windows x86 / Windows ARM
```

Official source:

- https://www.blackmagicdesign.com/jp/support

No current official Support Center listing for Resolve 21.0.4 was found during this correction pass.

Therefore the current planning coordinate is:

```text
Resolve major = 21
targetPatch = 21.0.3
testedPatch = null until Actual runtime capture
```

## Root cause

The old `resolveHandoffSidecarSchema` required a non-null `testedPatch` even when every relevant runtime state was still `PENDING_RUNTIME`.

That schema design encouraged a planning/current-release version to be written into a field named `testedPatch`, which then made an unexecuted runtime look tested.

Run 33 separates the concepts:

```text
targetPatch
= planning/current documented release coordinate

testedPatch
= exact patch observed during a real runtime execution
```

Guardrail:

```text
TARGET_PATCH != TESTED_PATCH
```

## Machine-readable correction

`motion-studio/src/data/resolveHandoff.schema.ts` now allows:

```text
targetPatch?: 21.x.x
testedPatch: 21.x.x | null
```

The current pending alpha policy uses:

```text
targetPatch = 21.0.3
testedPatch = null
```

A legacy sidecar with a real string `testedPatch` remains schema-compatible. This is deliberate so actual historical runtime evidence is not invalidated merely by adding `targetPatch`.

## Retracted claims

The following claims are no longer Current authority unless independently reproduced:

- `Resolve Actual baseline: 21.0.4`
- `Blackmagic Support officially listed 21.0.4 on 2026-08-05`
- `the local free Resolve installation was proven to be 21.0.4`
- any capability described as specifically introduced/available in 21.0.4 solely because those old notes said so

This does not mean every non-version-specific finding in those documents is wrong.

For example, Resolve 21 major-version documentation about native Lottie/OGraf, Fusion Macro Editor and Fairlight Animator remains useful where it is supported by the Resolve 21 official guide independently of the bad patch claim.

## Historical documents

These files remain useful as research history but must not override Run 33 for version truth:

- `docs/research/2026-08-26-movie-tool-learning-run-04-summary.md`
- `docs/research/2026-08-26-movie-tool-learning-run-04-backlog.md`
- `docs/research/2026-08-26-movie-tool-learning-run-04-source-priority.md`
- `docs/research/2026-08-26-movie-tool-learning-run-04-instruction-pattern.md`
- `docs/research/2026-08-26-movie-tool-learning-run-04-resolve-2104-drfx-and-remotion-version-coherence.md`

The historical filename containing `2104` is not evidence of an official or observed runtime.

High-authority documents corrected directly in Run 33:

- `motion-studio/src/data/resolveHandoffPolicy.ts`
- `motion-studio/src/data/resolveHandoff.schema.ts`
- `docs/decisions/2026-08-26-tool-learning-routing-update-run04.md`
- `docs/decisions/2026-08-26-palmier-davinci-handoff-fidelity-v1.md`
- `docs/research/2026-08-26-movie-tool-learning-run-05-resolve21-official-manual-crosscheck.md`
- `docs/research/2026-08-26-movie-tool-learning-run-30-palmier-export-freshness-and-pr341-salvage.md`

## Local runtime identity rule

Official release information and local runtime identity are different authorities.

```text
DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY
```

Before Lottie, DRFX, Palmier or any other Resolve Actual:

1. prepare an immutable Canary Session;
2. inspect/capture the live Resolve product/version/edition/platform;
3. write only the observed runtime identity into evidence;
4. keep unavailable values null;
5. execute the capability-specific readback/save-reopen/render steps;
6. validate evidence;
7. do not promote from one execution.

If the installed local patch is different from the current planning target, do not rewrite history or fake a match. Record the actual patch and decide whether the capability requires patch-specific revalidation.

## Local-agent handoff

The GitHub-side preparation for the first Lottie + DRFX Actual is already available:

```text
docs/prompts/2026-08-26-resolve21-lottie-drfx-local-actual-agent.md
motion-studio/scripts/prepare-resolve-local-actual-batch.mts
```

Actual GUI/runtime execution requires a local agent such as Codex / Claude Code on the machine that has Resolve installed.

GitHub CI alone cannot promote:

```text
Lottie importability
alpha preservation
DRFX installability
Inspector usability
save/reopen persistence
render parity
uninstall behavior
```

## Promotion boundary

Run 33 corrects metadata truth only.

It does not produce runtime PASS evidence.

```text
CORRECT_TARGET_VERSION != RUNTIME_VERIFIED
POLICY_PARSE_SUCCESS != ACTUAL_RUNTIME_CAPTURE
ONE_PASS != REPRODUCED
```

`RESEARCH_SATURATED = false` because local Resolve Actual remains the next high-value evidence source.
