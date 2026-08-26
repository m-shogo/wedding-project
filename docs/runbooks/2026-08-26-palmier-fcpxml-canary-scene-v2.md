# Palmier → Resolve FCPXML Canary Scene v2

Date: 2026-08-26  
Status: ACTIVE / REAL PALMIER + RESOLVE RUNTIME STILL REQUIRED  
Canary: `DV21-PALMIER-FCPXML-01`

## Goal

Upgrade the neutral Palmier scene so one real export can test the current high-value handoff boundaries discovered from Palmier v0.7.6/current source:

- ordinary clip/timing/transform/static crop/static volume transport;
- audio volume automation collapse-to-static and fade omission;
- independent text width/height scale + text-scale animation;
- title-box transform scale/rotation as a separate omission/rebuild concern;
- two-level nested timeline export as FCPXML media/sequence + ref-clip carriers.

This is still a synthetic non-private canary. Never use the real wedding Opening/Profile timeline.

## Authority

Generate the exact current scene spec:

```bash
cd motion-studio
node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier
```

Read:

```text
out/canary-inputs/palmier/palmier-fcpxml-synthetic-scene-spec.json
```

Required identity:

```text
schemaVersion = palmier-fcpxml-canary-scene-spec/v2
fixtureId = palmier-resolve-handoff-synthetic-scene-v2
```

Preparation must remain:

```text
BLOCKED_REAL_TOOL_EXPORT_REQUIRED
```

No repo script may synthesize the positive Palmier FCPXML.

## Current Palmier source coordinate

Checked against:

```text
release: v0.7.6
source: palmier-io/palmier-pro@8805801fa4df8bc2dbc57cb0a854a1f5108f95c6
```

Relevant upstream-tested Agent surfaces include:

```text
update_text(style.widthScale, style.heightScale)
set_keyframes(property = scale)
create_timeline
set_active_timeline
add_clips(entries[].mediaRef = child timeline id)
get_timeline readback
```

Do not invent property names when the live tool schema differs. Inspect current Palmier tools first.

## Mandatory scene fingerprint

The real Palmier scene must contain these exact stable markers:

```text
PALMIER_CANARY_TEXT_SCALE
PALMIER_CANARY_TITLE_BOX_TRANSFORM
PALMIER_CANARY_NEST_L1
PALMIER_CANARY_NEST_L2
```

These names exist to distinguish the intended canary export from another fresh timeline.

### Independent text-scale probe

Title text:

```text
PALMIER_CANARY_TEXT_SCALE
```

Target:

```text
widthScale = 1.5
heightScale = 0.75
scale keyframes = two clearly different values, linear
```

Read back the text style and keyframes in Palmier before export.

### Title-box transform omission probe

Title text:

```text
PALMIER_CANARY_TITLE_BOX_TRANSFORM
```

Keep independent text width/height scale at unity. Apply a non-default title clip box transform and 15 degree title clip rotation.

This is deliberately separate from the independent text-scale probe.

```text
TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE
```

### Nested timeline probe

Create:

```text
PALMIER_CANARY_NEST_L2
PALMIER_CANARY_NEST_L1
```

Requirements:

1. L2 is non-empty and contains a neutral visual clip.
2. L2 is inserted into L1 as a timeline mediaRef/carrier.
3. L1 is non-empty.
4. L1 is inserted into the root canary timeline.
5. Read back all timeline IDs/names and carrier positions before export.

The upstream exporter/test expectation is FCPXML `media/sequence` resources plus `ref-clip` carriers. Resolve behavior remains runtime-pending.

## Build discipline

Use:

```text
read -> mutate one bounded item -> readback -> continue
```

Do not build the whole canary blindly and only inspect at the end.

Record at minimum:

- root canary timeline ID/name;
- L1/L2 timeline IDs;
- text-scale title clip ID + style readback + keyframe readback;
- title-box probe clip ID + transform/rotation readback;
- nested carrier IDs/positions;
- ordinary video/audio probe IDs.

## Export lifecycle

Follow the existing terminal job lifecycle from the v2 export agent/runbook:

```text
export_project
-> exact jobId
-> manage_exports exact-job terminal completed
-> exact returned path
```

Never infer success from `started`, `queued`, elapsed time, or progress alone.

## Scene-contract gate

Before generic attachment/freshness/provenance checks, validate that the exact FCPXML actually contains the v2 fingerprint:

```bash
node --no-warnings scripts/validate-palmier-fcpxml-scene-contract.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>"
```

Required result:

```text
contractResult = PASS
provenance = UNVERIFIED_BY_SCENE_CONTRACT
resolveRuntime = NOT_RUN
```

The validator checks:

- the exact independent text-scale marker title exists;
- that title contains a title-local scale parameter and keyframe animation;
- the exact title-box transform marker exists;
- its exported adjust-transform remains unity-scale/no-rotation for the omission probe;
- both named nested timelines exist as media resources;
- each nested media resource has a ref-clip carrier somewhere in the FCPXML.

This proves only that the exported structure resembles the intended canary contract.

```text
SCENE_MARKER_MATCH != REAL_PALMIER_PROVENANCE
SCENE_CONTRACT_PASS != RESOLVE_IMPORT_VERIFIED
```

## Preferred v2 attachment wrapper

Use the v2 wrapper for inspection/freshness/full attachment so the scene-contract gate cannot be accidentally skipped:

```bash
node --no-warnings scripts/attach-palmier-canary-v2-export.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>" \
  --inspect-only
```

Freshness:

```bash
node --no-warnings scripts/attach-palmier-canary-v2-export.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>" \
  --export-started-at "<ISO8601>" \
  --check-freshness-only
```

Full operator-attested attachment:

```bash
node --no-warnings scripts/attach-palmier-canary-v2-export.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>" \
  --export-started-at "<ISO8601>" \
  --attest-real-palmier-export
```

The wrapper runs the v2 scene-contract validator first, then delegates to the existing generic structure/freshness/provenance helper.

## Resolve Session

Only after the manifest becomes `PREPARED`:

```bash
node --no-warnings scripts/prepare-resolve-canary-session.mts \
  DV21-PALMIER-FCPXML-01 \
  --execution-id DV21-PALMIER-FCPXML-01-<UNIQUE_ID> \
  --reuse-existing
```

Required pre-Resolve state:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

## Resolve Actual observations added by v2

In addition to the existing Palmier canary readback, explicitly inspect:

### Independent text scale

- title exists;
- asymmetric width/height appearance survives import;
- scale animation occurs at expected timing;
- inspector/readback editability where observable;
- render checkpoint at start/middle/end.

### Title-box transform probe

- verify the title-box rotation/scale did not silently arrive as if it were the independent text-scale parameter;
- rebuild classification remains separate if omitted.

### Nested timelines

- imported structure/timeline/compound representation;
- L1/L2 timing;
- nested carrier trim/start behavior;
- linked A/V behavior where present;
- save/reopen stability;
- whether nested structure remains meaningfully editable.

## Promotion boundary

Do not promote nested/text-scale capability from Palmier source or scene-contract validation alone.

```text
PALMIER_AGENT_READBACK != FCPXML_EXPORT
FCPXML_SCENE_CONTRACT != PALMIER_PROVENANCE
PALMIER_PROVENANCE != RESOLVE_IMPORT
RESOLVE_IMPORT != VISUAL_PARITY
VISUAL_PARITY != PARAMETRIC_EDITABILITY
ONE_PASS != REPRODUCED
```
