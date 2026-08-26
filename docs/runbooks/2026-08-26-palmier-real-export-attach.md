# Palmier real FCPXML attach → Resolve 21 Canary

Date: 2026-08-26  
Status: ACTIVE / RUNTIME STILL REQUIRED  
Canary: `DV21-PALMIER-FCPXML-01`

## Goal

Move the Palmier → Resolve 21 canary from:

```text
BLOCKED_REAL_TOOL_EXPORT_REQUIRED
```

to an honestly prepared local runtime session **only after a human/local operator has actually exported a fresh neutral synthetic scene from Palmier**.

This route never synthesizes Palmier FCPXML in the repo and never treats an old file that happens to exist as proof that the current export attempt succeeded.

## Authority split

```text
Synthetic Scene Spec
= what to build in Palmier

Real Palmier FCPXML
= transport artifact produced by Palmier

Export freshness record
= evidence that this file was modified no earlier than the recorded export attempt

Human Master sidecar
= expected scene inventory + known transport/loss targets

Resolve Evidence
= what Resolve 21 actually imported/read back
```

Do not collapse these into one source of truth.

## Why freshness is a separate gate

Palmier upstream Issue #182 documented an older XML/FCPXML false-success/stale-output failure mode. That issue is **closed and fixed upstream by PR #183**. It must not be cited as proof that current Palmier main still has the bug.

The lesson remains useful as a version-scoped/general export QA guardrail:

```text
FILE_EXISTS != FRESH_EXPORT
```

A fixed output path can contain yesterday's valid file even when today's export failed. Therefore every canary records the export start time and checks the candidate file's modification time before operator provenance attestation.

## Step 1 — generate the scene specification

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier
```

This writes the neutral scene specification and a **BLOCKED** manifest.

It intentionally does **not** create `.fcpxml` or `.xml`.

## Step 2 — record export start and use a unique output path

Immediately before starting the Palmier export, record an ISO-8601 UTC timestamp. The exact mechanism is local-environment dependent; preserve the resulting value as `<ISO8601>`.

Example value:

```text
2026-08-26T07:50:00.000Z
```

Use a unique fresh output path for that attempt when possible, for example:

```text
<prefix>-<timeline>-resolve-<timestamp>.fcpxml
```

Then build/export the neutral scene using Palmier's actual DaVinci/Resolve FCPXML path.

High-impact production choices are not involved: use only neutral/non-private canary media and the fixed synthetic scene inventory.

## Step 3 — inspect the candidate file without claiming provenance

```bash
node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml /path/to/palmier-export.fcpxml \
  --inspect-only
```

Inspection checks only basic FCPXML timeline shape:

- `<fcpxml version="...">`
- `<sequence>`
- `<spine>`
- file byte length

The result always reports:

```text
provenance = UNVERIFIED_BY_STRUCTURE
```

Therefore:

```text
FCPXML_STRUCTURE_VALID != REAL_PALMIER_PROVENANCE
```

## Step 4 — verify freshness without claiming provenance

Use the timestamp recorded immediately before the export:

```bash
node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml /path/to/palmier-export.fcpxml \
  --export-started-at <ISO8601> \
  --check-freshness-only
```

The helper compares the source FCPXML filesystem modification time with the recorded export start time. A 2-second tolerance exists only for filesystem timestamp granularity/clock rounding.

If the candidate is materially older than the recorded export attempt, attachment fails closed.

A successful freshness-only result reports:

```text
freshAfterExportStart = true
provenance = UNVERIFIED_BY_FRESHNESS
```

Freshness is not provenance:

```text
FRESH_ARTIFACT != REAL_PALMIER_PROVENANCE
```

It also is not Resolve proof:

```text
FRESH_ARTIFACT != RESOLVE_IMPORT_VERIFIED
```

## Step 5 — attach only after freshness + operator confirmation

If and only if:

1. structure inspection is acceptable,
2. freshness check passes for this export attempt, and
3. the file was actually exported from Palmier's DaVinci/Resolve export path from the neutral canary scene,

run:

```bash
node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml /path/to/palmier-export.fcpxml \
  --export-started-at <ISO8601> \
  --attest-real-palmier-export
```

The attestation is explicit because neither file structure nor freshness can prove the producing application.

The tool copies the neutral export into the Git-ignored local canary area using a hash-derived filename, then generates:

```text
palmier-real-fcpxml
human-master-sidecar
palmier-scene-spec          (support only)
palmier-export-attachment   (support only)
```

The manifest changes to:

```text
status = PREPARED
```

but runtime remains unexecuted.

## Generated Human Master

The Human Master sidecar is generated from the canonical Synthetic Scene Spec plus the exact attached FCPXML identity.

It records:

- expected timeline settings
- expected scene elements
- expected transported properties
- known audio automation omissions
- exact FCPXML SHA-256
- FCPXML schema version
- scene-spec SHA-256
- export start timestamp
- source FCPXML modification timestamp
- freshness decision/tolerance
- provenance level

This avoids manually retyping expected inventory after export and ties the Human Master to the exact fresh artifact.

## Provenance level

Current provenance is deliberately:

```text
OPERATOR_ATTESTED_REAL_PALMIER_EXPORT
```

not cryptographically verified provenance.

```text
OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE
```

If Palmier later emits an official machine-verifiable exporter marker/signature, this contract can be strengthened without rewriting Resolve evidence history.

## Step 6 — prepare a READY runtime session without overwriting the attachment

```bash
node --no-warnings scripts/prepare-resolve-canary-session.mts \
  DV21-PALMIER-FCPXML-01 \
  --execution-id DV21-PALMIER-FCPXML-01-YYYYMMDD-MAC-FREE-A \
  --reuse-existing
```

For Palmier, `--reuse-existing` means:

- do not regenerate the BLOCKED scene-spec manifest
- require an existing `PREPARED` manifest
- require both `palmier-real-fcpxml` and `human-master-sidecar`
- let the normal evidence hydrator re-hash every attached file
- fail closed if hashes or files changed

A BLOCKED manifest is rejected by this path.

## Step 7 — only now open Resolve 21

Use a disposable Resolve 21 project/timeline.

Capture the exact live:

- Resolve product
- 21.x patch version
- Free / Studio edition
- platform
- project/timeline identity

Then follow the generated `plan.md` and edit only the generated `evidence.json` with observed values.

## Promotion boundary

Attachment does not prove import fidelity.

```text
FILE_EXISTS != FRESH_EXPORT
FRESH_ARTIFACT != REAL_PALMIER_PROVENANCE
REAL_EXPORT_ATTACHMENT != RESOLVE_RUNTIME_EVIDENCE
PREPARED_INPUT != RESOLVE_IMPORT_VERIFIED
PARSE_SUCCESS != TIMELINE_FIDELITY
```

The Canary still requires real import/readback/save-reopen evidence and two independent executions before canonical promotion.

## Replacement policy

If a PREPARED Palmier attachment already exists, the attach helper refuses replacement by default.

To intentionally replace it:

```text
--replace-attached-export
```

The replacement must itself pass the current freshness gate and attestation requirements.

Do not replace an old attachment merely to make a failed run disappear. Existing runtime Session/evidence directories remain separate and immutable by execution ID.

## CI honesty boundary

CI does not fabricate a successful real-Palmier attachment.

CI proves only:

- generic FCPXML inspection keeps provenance unverified
- an FCPXML older than the current export-start timestamp is rejected as stale
- a fresh FCPXML can pass freshness-only while provenance remains unverified
- freshness alone cannot bypass explicit real-Palmier attestation
- a failed attach does not mutate the blocked manifest
- `--reuse-existing` rejects a BLOCKED Palmier manifest
- the plan exposes the structure → freshness → attestation → Session route

Positive `PREPARED` attachment still requires a genuine local Palmier export.
