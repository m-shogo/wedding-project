# Movie Tool Learning Run 28 — Palmier real-export attachment

Date: 2026-08-26  
Status: IMPLEMENTED / REAL PALMIER EXPORT + RESOLVE RUNTIME STILL REQUIRED

## Problem closed in this run

Before Run 28, Palmier P0 Canary could generate a neutral scene specification and a BLOCKED manifest, but there was no safe machine-readable route to connect a **genuine Palmier-exported FCPXML** to the existing Canary Session pipeline.

A human would have needed to edit manifest/evidence JSON manually, creating three risks:

1. wrong file/hash attachment
2. scene-spec being mistaken for the real export
3. Session builder overwriting an attached manifest by rerunning Palmier scene-spec preparation

Run 28 removes those manual steps without pretending CI has a real Palmier export.

## New attachment boundary

New helper:

```text
motion-studio/scripts/attach-palmier-real-export.mts
```

The helper has two modes.

### Inspect-only

```text
--inspect-only
```

Checks FCPXML shape only:

- root/version
- sequence
- spine
- bytes

The result is always:

```text
provenance = UNVERIFIED_BY_STRUCTURE
```

Therefore:

```text
FCPXML_STRUCTURE_VALID != REAL_PALMIER_PROVENANCE
```

### Full attachment

Requires the explicit flag:

```text
--attest-real-palmier-export
```

The operator is asserting that the file came from Palmier's actual DaVinci/Resolve exporter and from the neutral canary scene.

This is useful provenance but not cryptographic proof:

```text
OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE
```

## Why attestation is explicit

FCPXML is an interchange format. A syntactically plausible FCPXML file does not inherently prove which application emitted it.

The repo must not infer Palmier provenance from XML shape, filenames, or an issue/doc statement.

The strongest honest local state currently available is:

```text
OPERATOR_ATTESTED_REAL_PALMIER_EXPORT
```

If Palmier later adds a stable exporter signature/metadata marker that can be read mechanically, provenance can be upgraded independently.

## New machine-readable contracts

New schemas:

```text
palmier-fcpxml-inspection/v1
palmier-resolve-canary-human-master/v1
palmier-real-export-attachment/v1
```

They separate:

- structural inspection
- Human Master expectation
- real-export attachment/provenance
- later Resolve runtime evidence

## Human Master generation

The user should not have to manually retype the synthetic expected inventory after exporting from Palmier.

The helper derives a fresh Human Master sidecar from:

```text
canonical Synthetic Scene Spec
+
actual attached FCPXML SHA-256
+
actual FCPXML schema version
```

The Human Master includes:

- timeline target
- required scene elements
- expected transport behavior
- known audio automation omissions
- scene-spec hash
- actual export hash/version
- operator-attested provenance level

This keeps expected behavior and observed Resolve behavior separate.

```text
HUMAN_MASTER_EXPECTATION != RESOLVE_OBSERVED_RESULT
```

## Hash-addressed local attachment

The attached neutral FCPXML is copied into the Git-ignored canary workspace using an FCPXML-hash prefix.

This avoids carrying the operator's original machine-specific path into the runtime evidence pipeline.

The manifest stores SHA-256 for:

- real FCPXML
- generated Human Master
- scene spec
- attachment record

The existing Hydrator re-hashes these before Session evidence is created.

## Manifest transition

Before real export:

```text
BLOCKED_REAL_TOOL_EXPORT_REQUIRED
```

After explicit real-export attachment:

```text
PREPARED
```

This means inputs are ready, not that Resolve passed.

```text
PREPARED_INPUT != RESOLVE_IMPORT_VERIFIED
REAL_EXPORT_ATTACHMENT != RESOLVE_RUNTIME_EVIDENCE
```

## Session builder bug prevented

Run 27's Session builder reran the registered preparation mode every time.

For Palmier, that would regenerate the scene-spec-only BLOCKED manifest and destroy the attachment state.

Run 28 changes Palmier `--reuse-existing` semantics:

```text
--reuse-existing
+
mode = palmier
```

means:

- do not rerun scene-spec preparation
- require existing manifest
- require `status = PREPARED`
- require input IDs `palmier-real-fcpxml` and `human-master-sidecar`
- then run normal hash hydration/semantic validation

A BLOCKED manifest is rejected.

For Alpha, `--reuse-existing` keeps its prior meaning: reuse the rendered alpha source.

Audio still regenerates its deterministic synthetic input.

## CI strategy

The important honesty rule is that CI must not create a fake file and then mark it as `OPERATOR_ATTESTED_REAL_PALMIER_EXPORT` merely to exercise a positive code path.

The dedicated Palmier attachment CI therefore checks only safe negative/structural behavior:

1. generic FCPXML can be inspected
2. inspection says `UNVERIFIED_BY_STRUCTURE`
3. attachment without attestation fails
4. failed attachment does not mutate the BLOCKED manifest
5. Palmier Session `--reuse-existing` rejects a BLOCKED manifest
6. CLI plan exposes inspect → attest → reuse-existing route

Positive attachment remains a local real-Palmier operation.

## Human adjustability relation

This run is transport preparation, not UI design, but it improves human usability by reducing the real Palmier handoff to explicit commands instead of manifest editing.

The human only needs to make one high-impact truth claim:

```text
"this file really came from Palmier's Resolve exporter"
```

The system handles path normalization, hashes, Human Master generation, manifest construction, evidence hydration, and Session creation.

## New guardrails

```text
FCPXML_STRUCTURE_VALID != REAL_PALMIER_PROVENANCE
OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE
REAL_EXPORT_ATTACHMENT != RESOLVE_RUNTIME_EVIDENCE
HUMAN_MASTER_EXPECTATION != RESOLVE_OBSERVED_RESULT
BLOCKED_MANIFEST != REUSABLE_RUNTIME_INPUT
```

## Remaining P0 actuals

Still not runtime verified:

- Palmier FCPXML clean import fidelity in Resolve 21
- imported Transform/Crop/static-volume readback
- confirmed audio fade/keyframe omission in actual import
- save/reopen stability
- independent execution #2

`RESEARCH_SATURATED = false`
