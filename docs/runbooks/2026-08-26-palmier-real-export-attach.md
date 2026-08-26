# Palmier real FCPXML attach → Resolve 21 Canary

Date: 2026-08-26  
Status: ACTIVE / RUNTIME STILL REQUIRED  
Canary: `DV21-PALMIER-FCPXML-01`

## Goal

Move the Palmier → Resolve 21 canary from:

```text
BLOCKED_REAL_TOOL_EXPORT_REQUIRED
```

to an honestly prepared local runtime session **only after a human/local operator has actually exported the neutral synthetic scene from Palmier**.

This route never synthesizes Palmier FCPXML in the repo.

## Authority split

```text
Synthetic Scene Spec
= what to build in Palmier

Real Palmier FCPXML
= transport artifact produced by Palmier

Human Master sidecar
= expected scene inventory + known transport/loss targets

Resolve Evidence
= what Resolve 21 actually imported/read back
```

Do not collapse these into one source of truth.

## Step 1 — generate the scene specification

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier
```

This writes the neutral scene specification and a **BLOCKED** manifest.

It intentionally does **not** create `.fcpxml` or `.xml`.

## Step 2 — build/export in Palmier

Use the generated scene specification to build the neutral scene in Palmier.

Export using Palmier's actual DaVinci/Resolve FCPXML path.

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

## Step 4 — attach only after operator confirmation

If and only if the file was actually exported from Palmier's DaVinci/Resolve export path from the neutral canary scene:

```bash
node --no-warnings scripts/attach-palmier-real-export.mts \
  --fcpxml /path/to/palmier-export.fcpxml \
  --attest-real-palmier-export
```

The attestation is explicit because file structure alone cannot prove the producing application.

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

The Human Master sidecar is generated from the canonical Synthetic Scene Spec plus the exact attached FCPXML hash/version.

It records:

- expected timeline settings
- expected scene elements
- expected transported properties
- known audio automation omissions
- exact FCPXML SHA-256
- FCPXML schema version
- scene-spec SHA-256
- provenance level

This avoids manually retyping expected inventory after export.

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

## Step 5 — prepare a READY runtime session without overwriting the attachment

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

## Step 6 — only now open Resolve 21

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

Do not replace an old attachment merely to make a failed run disappear. Existing runtime Session/evidence directories remain separate and immutable by execution ID.

## CI honesty boundary

CI does not fabricate a successful real-Palmier attachment.

CI only proves:

- generic FCPXML inspection keeps provenance unverified
- full attach fails without explicit real-Palmier attestation
- a failed attach does not mutate the blocked manifest
- `--reuse-existing` rejects a BLOCKED Palmier manifest
- the plan exposes the correct real-export route

Positive `PREPARED` attachment requires a genuine local Palmier export.
