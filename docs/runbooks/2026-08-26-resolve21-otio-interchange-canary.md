# Resolve 21 — OTIO / OTIOZ Editorial Interchange Canary

Date: 2026-08-26  
Canary: `DV21-OTIO-INTERCHANGE-01`  
Status: INPUT GENERATABLE / RESOLVE RUNTIME PENDING

## Goal

Verify Resolve 21 behavior for a standards-only OpenTimelineIO editorial core while keeping four separate questions separate:

```text
PLAIN_OTIO_EDITORIAL_IMPORT
OTIOZ_MEDIA_BUNDLE_IMPORT
RESOLVE_OTIO_EXPORT
RESOLVE_VENDOR_METADATA_BOUNDARY
```

Do not use this canary to claim Palmier motion parity or arbitrary effect portability.

## Prepare and validate

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-otio-fixture.mts
node --no-warnings scripts/validate-resolve-otio-fixture.mts
```

Expected manifest:

```text
out/canary-inputs/manifests/DV21-OTIO-INTERCHANGE-01.json
```

Expected generated inputs:

```text
out/canary-inputs/otio/neutral-editorial-core.otio
out/canary-inputs/otio/neutral-editorial-core.otioz
out/canary-inputs/otio/otio-human-master.json
```

Synthetic media is generated under:

```text
out/canary-inputs/otio/media/
```

## Prepare immutable Session

```bash
node --no-warnings scripts/prepare-resolve-otio-session.mts \
  --execution-id DV21-OTIO-INTERCHANGE-01-YYYYMMDD-MAC-FREE-A
```

To intentionally reuse an already-generated fixture, only after it validates:

```bash
node --no-warnings scripts/prepare-resolve-otio-session.mts \
  --execution-id DV21-OTIO-INTERCHANGE-01-YYYYMMDD-MAC-FREE-A \
  --reuse-existing
```

Never reuse an old execution ID.

Before Resolve opens, expect:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

## Runtime 0 — live identity

Use a disposable Resolve project and record:

```text
product
version / patch
Free or Studio
platform
```

Current release/download information is not a substitute for the installed runtime identity.

```text
DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY
```

## Runtime 1 — plain OTIO

Use a fresh disposable context.

Import the exact hashed:

```text
neutral-editorial-core.otio
```

Record:

- exact supported UI/API route used;
- import warning/error;
- timeline fps;
- track inventory;
- clip inventory;
- media online/offline state;
- relink requirement and path behavior.

Plain OTIO carries references, not bundled media.

```text
OTIO_FILE != MEDIA_PACKAGE
```

## Runtime 2 — OTIOZ

Use another clean disposable context.

Import the exact hashed:

```text
neutral-editorial-core.otioz
```

Record:

- import warning/error;
- where/how media is extracted if observable;
- whether bundled media links automatically;
- timeline fps;
- track/clip inventory.

Do not generalize bundled media to fonts/LUTs/OFX/DRFX/template dependencies.

```text
OTIOZ_MEDIA_BUNDLED != DEPENDENCY_COMPLETE
```

## Runtime 3 — editorial core readback

Compare against `otio-human-master.json` property by property.

Required observations:

### Tracks

```text
V1_OTIO_CANARY : Video
A1_OTIO_CANARY : Audio
```

### Clips

```text
OTIO_CLIP_A
OTIO_CLIP_B
OTIO_CLIP_A_REPEAT
OTIO_AUDIO
```

Record source in and duration, not just name presence.

### Gap

```text
OTIO_CANARY_GAP
30 frames
```

### Transition

```text
OTIO_CANARY_DISSOLVE
SMPTE_Dissolve
15 frame in offset
15 frame out offset
```

Record Resolve's actual mapped transition name/type/duration separately.

### Marker

```text
OTIO_CANARY_MARKER
```

Record actual Resolve marker location and visible mapping.

One timeline import PASS is insufficient if individual fields map incorrectly.

```text
STANDARD_OBJECT_PRESENT != DESTINATION_UI_MAPPING_VERIFIED
```

## Runtime 4 — bounded human late edit

Make exactly one ordinary native editorial correction, for example:

- bounded clip trim; and
- one marker move if needed for a second obvious readback.

Record:

```text
before
native UI surface used
after
how easy it was to find/edit
```

Save, close/reopen the disposable project, and verify the edited values remain.

Do not hand-edit OTIO JSON to make this step pass.

```text
SERIALIZED_EDITABLE != HUMAN_ADJUSTABLE
```

## Runtime 5 — Resolve OTIO export

Export the edited disposable Resolve timeline through the supported OTIO route.

Record:

```text
export path
SHA-256
export route/options
```

Add the artifact to evidence with:

```text
kind = OTIO_EXPORT
sha256 = <64 hex>
```

Then inspect it:

```bash
node --no-warnings scripts/inspect-resolve-exported-otio.mts \
  <RESOLVE_EXPORTED_OTIO> \
  --output <REPORT_JSON>
```

The inspector reports standard editorial objects and exact `Resolve_OTIO` metadata locations separately.

## Runtime 6 — clean reimport

Re-import Resolve's exported OTIO into another clean disposable context.

Re-check:

- track/clip inventory;
- bounded trim;
- marker state;
- gap state;
- transition state.

This is required because serialization presence alone does not prove Resolve can reconstruct the same editable result.

```text
INSPECTION_REPORT != CLEAN_REIMPORT_PROOF
```

## Optional secondary vendor-effect probe

Only after the core canary evidence is recorded:

1. add one simple built-in Resolve Transform or Dynamic Zoom change in a disposable copy;
2. export another OTIO;
3. inspect it with `inspect-resolve-exported-otio.mts`;
4. record whether `Resolve_OTIO` metadata includes the bounded built-in effect values/keyframes.

This probe is secondary and cannot decide the core canary result.

Never infer third-party OpenFX portability.

```text
RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS
BUILT_IN_EFFECT_OBSERVED != THIRD_PARTY_OFX_PORTABLE
```

## Evidence validation

After material edits:

```bash
node --no-warnings scripts/validate-resolve-otio-evidence.mts \
  out/canary-sessions/<EXECUTION_ID>/evidence.json
```

One execution becomes internally promotion-eligible only when:

- result = PASS;
- every OTIO runtime step = PASS;
- required OTIO + OTIOZ inputs are present and hashed;
- human review is completed;
- Resolve-produced `OTIO_EXPORT` artifact is recorded and hashed.

Render artifacts are intentionally not accepted as proof for this canary.

## Promotion boundary

```text
ONE_PASS != REPRODUCED
```

Run a second independent execution before canonical promotion.

## Failure fingerprints

Prefer one primary fingerprint:

```text
OTIO_IMPORT_FAIL
OTIOZ_IMPORT_FAIL
MEDIA_RELINK_MISMATCH
EDITORIAL_TIMING_MISMATCH
TRANSITION_MAPPING_MISMATCH
MARKER_MAPPING_MISMATCH
SAVE_REOPEN_REGRESSION
OTIO_EXPORT_FAIL
ROUNDTRIP_REIMPORT_FAIL
HUMAN_ADJUSTABILITY_FAIL
VENDOR_METADATA_OVERCLAIM
OTHER
```

Preserve the failed execution instead of silently replacing it.
