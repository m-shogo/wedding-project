# Palmier real FCPXML attach → Resolve 21 Canary

Date: 2026-08-26  
Status: ACTIVE / RUNTIME STILL REQUIRED  
Canary: `DV21-PALMIER-FCPXML-01`

## Goal

Move the Palmier → Resolve 21 canary from:

```text
BLOCKED_REAL_TOOL_EXPORT_REQUIRED
```

to an honestly prepared local runtime session **only after a human/local operator has actually exported a fresh neutral synthetic scene from Palmier and the exact Palmier export job has reached terminal success**.

This route never synthesizes Palmier FCPXML in the repo and never treats an old file that happens to exist, an `export_project` submission response, or a progress display as proof that the current export attempt succeeded.

## Current upstream coordinate

Current Palmier source was re-audited in Tool Learning Run 34 against:

```text
latest release = v0.7.6
current source commit = 8805801fa4df8bc2dbc57cb0a854a1f5108f95c6
```

The installed/local Palmier version must still be captured separately when Actual is executed.

```text
UPSTREAM_CURRENT_VERSION != LOCAL_RUNTIME_VERSION
```

## Authority split

```text
Synthetic Scene Spec
= what to build in Palmier

Palmier Export Job
= producing-tool execution identity/status/warnings/result

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

## Why terminal job state and freshness are separate gates

Current Palmier `export_project` queues the export and returns:

```text
status = started | queued
jobId
path
queuePosition
```

Current `manage_exports(action="list")` exposes the export jobs with exact `jobId`, status, progress, path, warnings/error/result. Terminal states include completed/failed/canceled.

Therefore:

```text
EXPORT_QUEUED != EXPORT_SUCCEEDED
PROGRESS_100 != TERMINAL_SUCCESS
JOB_ID_MUST_MATCH_TERMINAL_RESULT
```

Separately, Palmier upstream Issue #182 documented an older XML/FCPXML false-success/stale-output failure mode. That issue is **closed and fixed upstream by PR #183**. It must not be cited as proof that current Palmier still has that bug.

The durable artifact lesson remains:

```text
FILE_EXISTS != FRESH_EXPORT
```

A fixed output path can contain an older valid file, and terminal success alone does not prove that the candidate path/hash is the intended fresh artifact for this attachment.

```text
TERMINAL_SUCCESS != FRESHNESS_PROVENANCE
```

## Step 1 — generate the scene specification

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier
```

This writes the neutral scene specification and a **BLOCKED** manifest.

It intentionally does **not** create `.fcpxml` or `.xml`.

## Step 2 — read/scope Palmier before export

Before mutation/export:

1. confirm the exact Palmier project;
2. confirm the exact synthetic timeline ID/name;
3. confirm the production Opening/Profile timeline is not the target;
4. confirm the neutral assets/scene inventory;
5. capture the live Palmier version when available;
6. choose `mode=fcpxml` and `fcpxmlTarget=resolve` explicitly;
7. pass the exact `timelineId` rather than relying on an ambiguous active timeline.

This keeps the instruction pattern bounded:

```text
read → scope → export → verify
```

## Step 3 — record export start and choose a safe destination

Immediately before calling `export_project`, record an ISO-8601 UTC timestamp and preserve it as `<ISO8601>`.

Example:

```text
2026-08-26T07:50:00.000Z
```

Current Palmier source supports two safe canary strategies:

### A. Prefer Palmier-generated unique Downloads path

Omit `outputPath`. Palmier chooses its default Downloads filename and makes it unique when the destination already exists or is reserved by another job.

### B. Explicit unique path

Use an absolute, unique path and set:

```text
overwrite = false
```

Example naming intent:

```text
<prefix>-<timeline>-resolve-<timestamp>.fcpxml
```

An explicit fixed path with default `overwrite=true` is supported Palmier behavior but is less useful for canary provenance/debugging.

```text
OVERWRITE_ALLOWED != RECOMMENDED_CANARY_PROVENANCE
```

## Step 4 — submit the current Palmier Resolve-target export

Use Palmier's actual Agent/MCP export path with the equivalent of:

```text
export_project(
  mode = fcpxml,
  fcpxmlTarget = resolve,
  timelineId = <EXACT_SYNTHETIC_TIMELINE_ID>,
  outputPath = <UNIQUE_ABSOLUTE_PATH>  // optional; omit for Palmier unique Downloads path
  overwrite = false                   // when an explicit unique path is used
)
```

Capture the returned:

```text
jobId
path
status
queuePosition
warnings if present
```

Do **not** proceed to attachment merely because this call returned successfully.

## Step 5 — verify the exact export job reached terminal success

Call:

```text
manage_exports(action = list)
```

Find the row whose `jobId` exactly matches the ID returned by Step 4.

Preserve:

```text
jobId
filename
path
status
progress
warnings
error
result
```

Only:

```text
status = completed
```

may proceed to artifact inspection.

If the exact job is:

```text
waiting
preparing
exporting
canceling
```

it is non-terminal; wait for a later bounded check rather than guessing from elapsed time.

If it is:

```text
failed
canceled
```

preserve the failure/warnings/error and stop this execution attempt. Do not attach an older file at the returned path.

Guardrails:

```text
EXPORT_SUBMISSION != EXPORT_COMPLETION
ELAPSED_TIME != STUCK_EXPORT_PROOF
PROGRESS_100 != TERMINAL_SUCCESS
OTHER_JOB_COMPLETED != THIS_JOB_COMPLETED
```

## Step 6 — inspect the candidate file without claiming provenance

Use the **path belonging to the completed exact jobId**:

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

## Step 7 — verify freshness without claiming provenance

Use the timestamp recorded immediately before `export_project`:

```bash
node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml /path/to/palmier-export.fcpxml \
  --export-started-at <ISO8601> \
  --check-freshness-only
```

The helper compares the source FCPXML filesystem modification time with the recorded export start time. A 2-second tolerance exists only for filesystem timestamp granularity/clock rounding.

If the candidate is materially older than the recorded export attempt, attachment fails closed even if an export job elsewhere completed.

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

## Step 8 — attach only after terminal job + structure + freshness + operator confirmation

If and only if:

1. the exact Palmier `jobId` reached `completed`,
2. the job's returned path is the candidate being attached,
3. structure inspection is acceptable,
4. freshness check passes for this export attempt, and
5. the file was actually exported from Palmier's DaVinci/Resolve export path from the neutral canary scene,

run:

```bash
node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml /path/to/palmier-export.fcpxml \
  --export-started-at <ISO8601> \
  --attest-real-palmier-export
```

The attestation is explicit because neither job state, file structure nor freshness can cryptographically prove the producing application/project state.

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

but Resolve runtime remains unexecuted.

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

Run34 additionally requires the local execution report to retain the Palmier export `jobId`, terminal status, returned path and warnings/error/result beside the Session evidence, even though the current attachment schema does not yet promote those values into cryptographic provenance.

## Provenance level

Current provenance remains deliberately:

```text
OPERATOR_ATTESTED_REAL_PALMIER_EXPORT
```

not cryptographically verified provenance.

```text
OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE
```

If Palmier later emits an official machine-verifiable exporter marker/signature, this contract can be strengthened without rewriting Resolve evidence history.

## Step 9 — prepare a READY runtime session without overwriting the attachment

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

## Step 10 — only now open Resolve 21

Use a disposable Resolve 21 project/timeline.

Capture the exact live:

- Resolve product
- 21.x patch version
- Free / Studio edition
- platform
- project/timeline identity

Then follow the generated `plan.md` and edit only the generated `evidence.json` with observed values.

## Current FCPXML semantic cautions from Run34

Current Palmier exporter/tests add two important readback distinctions:

### Audio

```text
static clip volume transports
volume keyframe automation collapses to static volume
fade is omitted
```

Do not report all volume as lost and do not report automation as transported.

### Titles

```text
independent text width/height scale + text-scale animation
!=
title-box transform scale/rotation
```

Current source/tests emit the independent text-scale title param, while title-box transform scale/rotation remains a rebuild concern. Resolve Actual must verify the imported title semantics before promotion.

### Nested timelines

Current Palmier exporter/tests generate nested timeline compound/media + ref-clip structures, including two-level nesting. This is source/test evidence only until a dedicated Resolve nested-compound Actual passes.

## Promotion boundary

Attachment does not prove import fidelity.

```text
EXPORT_QUEUED != EXPORT_SUCCEEDED
JOB_ID_MUST_MATCH_TERMINAL_RESULT
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

The replacement must itself pass the current terminal-job, freshness and attestation requirements at the process level.

Do not replace an old attachment merely to make a failed run disappear. Existing runtime Session/evidence directories remain separate and immutable by execution ID.

## CI honesty boundary

CI does not fabricate a successful real-Palmier attachment or fake a Palmier export queue job.

CI proves only:

- generic FCPXML inspection keeps provenance unverified
- an FCPXML older than the current export-start timestamp is rejected as stale
- a fresh FCPXML can pass freshness-only while provenance remains unverified
- freshness alone cannot bypass explicit real-Palmier attestation
- a failed attach does not mutate the blocked manifest
- `--reuse-existing` rejects a BLOCKED Palmier manifest
- current documentation requires exact-job terminal success before local attachment

Positive `PREPARED` attachment still requires a genuine local Palmier export.
