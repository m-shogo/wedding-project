# Movie Tool Learning Run 25 — Resolve P0 Canary Input Readiness

Date: 2026-08-26  
Status: IMPLEMENTED / RESOLVE RUNTIME STILL PENDING

## Goal

Run 24 standardized runtime canary execution. Run 25 removes the next friction point: neutral, reproducible, hashable inputs for the P0 canaries.

The objective is not to create fake runtime evidence. It is to make the exact canary inputs cheap and deterministic to prepare before Resolve is opened.

## Added input preparation

### DV21-REMOTION-ALPHA-01

Preparation command:

```bash
cd motion-studio
node --no-warnings scripts/prepare-resolve-canary-inputs.mts alpha
```

This reuses the existing authoritative Remotion command:

```text
render:stamp-test:prores
= ProRes 4444
+ PNG frame render
+ yuva444p10le
```

The preparer does not invent another alpha render route. It renders/reuses the existing neutral `透過確認-押印` composition, computes SHA-256, captures ffprobe metadata, and writes an input manifest.

Source codec/metadata remains input evidence only:

```text
SOURCE_CODEC_METADATA != RESOLVE_ALPHA_IMPORT_PROOF
```

### DV21-AUDIO-RECOVERY-01

Preparation command:

```bash
cd motion-studio
node --no-warnings scripts/prepare-resolve-canary-inputs.mts audio
```

It generates a neutral, non-copyrighted fixture locally:

- 440 Hz synthetic tone
- 6 seconds
- 48 kHz
- stereo
- PCM 24-bit WAV

It also generates an explicit Human Master envelope:

- fade in: 0.50 s
- fade out: 0.75 s
- 0.50 s → -12 dB
- 2.00 s → -3 dB
- 4.00 s → -9 dB
- 5.25 s → -6 dB

The exact target values are the intended envelope, not proof of what Resolve applied.

```text
TARGET_DB_VALUES_ARE_HUMAN_MASTER_NOT_RUNTIME_EVIDENCE
MANUAL_RECOVERY != AUTOMATED_WRITE
```

### DV21-PALMIER-FCPXML-01

Preparation command:

```bash
cd motion-studio
node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier
```

This deliberately does **not** generate FCPXML.

It writes only a synthetic Palmier scene specification containing:

- linked A/V clip
- repeated logical clip using the same physical media source
- transform keyframes
- static crop
- text properties
- static audio volume
- audio volume keyframes
- audio fade in/out
- expected transport/known-omission inventory

The resulting manifest remains:

```text
BLOCKED_REAL_TOOL_EXPORT_REQUIRED
```

until a human/local agent builds that scene in Palmier and uses Palmier's real DaVinci/Resolve exporter.

```text
SCENE_SPEC != FCPXML_EXPORT
REAL_PALMIER_EXPORT_REQUIRED
```

## Manifest contract

Generated local manifests use:

```text
resolve-canary-input-manifest/v1
```

They carry:

- canary ID
- preparation mode
- exact local file path
- SHA-256
- ffprobe metadata where applicable
- Human Master or expected inventory where applicable
- next action
- guardrails

They live under ignored `motion-studio/out/` and are not production source truth by themselves.

## CI promotion

`Resolve Runtime Canary Pack CI` now does more than static schema checking:

- validates fixture contracts
- dry-runs Alpha / Audio / Palmier preparation
- actually generates the neutral Audio WAV
- ffprobes and hashes the Audio fixture through the preparation script
- writes the Audio Human Master and manifest
- generates the Palmier scene specification
- confirms the Palmier manifest is still blocked
- fails if Palmier preparation creates any `.fcpxml` or `.xml`

The heavy Remotion ProRes render remains a local/runtime-preparation command; CI instead verifies that the existing authoritative render command still uses ProRes 4444 + `yuva444p10le` and the expected output path.

## CLI integration

`resolve-runtime-canary-plan.mts` now displays registered input preparation directly alongside the canary plan. A local execution agent should not have to search another document to discover how to prepare P0 inputs.

## Honesty boundary

This run proves **input preparation**, not DaVinci behavior.

It does not promote:

- alpha import/export
- audio UI recovery
- audio scripting write
- Palmier FCPXML fidelity

from `PENDING_RUNTIME`.

`RESEARCH_SATURATED = false`

Next highest-value work remains real Resolve execution of Alpha and Audio, plus producing the required real Palmier FCPXML from the synthetic scene spec.
