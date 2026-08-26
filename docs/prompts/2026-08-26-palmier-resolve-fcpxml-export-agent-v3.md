# wedding-project — Palmier → Resolve FCPXML Export Agent v3

Status: ACTIVE / SUPERSEDES v2 FOR DV21-PALMIER-FCPXML-01  
Scope: Movie Tool Learning only  
Canary: `DV21-PALMIER-FCPXML-01`

## Mission

Build the exact neutral Palmier canary scene v2, prove the intended scene is present through Palmier readback, export it through the current Resolve-target queued export lifecycle, validate the exact completed FCPXML against the v2 scene fingerprint, attach it honestly, and stop before Resolve Actual unless a Resolve-capable local agent is explicitly continuing.

Do not touch the real wedding Opening/Profile project or timeline.

## Read first

1. `docs/runbooks/2026-08-26-palmier-fcpxml-canary-scene-v2.md`
2. `docs/runbooks/2026-08-26-palmier-real-export-attach.md`
3. `docs/research/2026-08-26-movie-tool-learning-run-34-palmier-current-export-terminal-nested-title-scale.md`
4. `motion-studio/src/data/resolveCanaryInputFixtures.ts`
5. `motion-studio/scripts/validate-palmier-fcpxml-scene-contract.mts`
6. `motion-studio/scripts/attach-palmier-canary-v2-export.mts`

## Hard guardrails

- Use only neutral/non-private canary media.
- Never mutate/export the real Opening/Profile timeline.
- Read project/timeline state before mutation.
- Use exact timeline IDs, not ambiguous active-state assumptions.
- Use one bounded mutation then readback.
- Preserve failed/canceled export jobs; never rescue a failed attempt with an old file.
- `export_project` submission is not completion.
- Match terminal export by exact `jobId`.
- Do not attach a completed export unless the v2 scene-contract validator passes.
- Scene-contract PASS is not Palmier provenance.
- Palmier provenance is not Resolve import proof.
- Never synthesize a positive Palmier export in repo/CI.

## Phase 0 — repo + spec

From repo root:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
```

Preserve unrelated dirty work.

Then:

```bash
cd motion-studio
node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier
```

Confirm:

```text
schemaVersion = palmier-fcpxml-canary-scene-spec/v2
fixtureId = palmier-resolve-handoff-synthetic-scene-v2
status = BLOCKED_REAL_TOOL_EXPORT_REQUIRED
```

## Phase 1 — Palmier current-tool discovery

Read the current Palmier project/timeline/tool state before building anything.

Confirm the live tool schema supports the needed current paths. Expected from current upstream evidence:

```text
update_text style.widthScale / style.heightScale
set_keyframes property=scale
create_timeline
set_active_timeline
add_clips with child timeline mediaRef
get_timeline
export_project
manage_exports
```

If the live schema differs, report the difference. Do not brute-force guessed fields.

## Phase 2 — build/readback the v2 fingerprint

Build the full spec from:

```text
motion-studio/out/canary-inputs/palmier/palmier-fcpxml-synthetic-scene-spec.json
```

The four exact stable markers are mandatory:

```text
PALMIER_CANARY_TEXT_SCALE
PALMIER_CANARY_TITLE_BOX_TRANSFORM
PALMIER_CANARY_NEST_L1
PALMIER_CANARY_NEST_L2
```

### Text-scale probe

Create title text:

```text
PALMIER_CANARY_TEXT_SCALE
```

Set/read back:

```text
style.widthScale = 1.5
style.heightScale = 0.75
scale keyframes = 2 clearly different values, linear
```

Do not use title-box size/rotation as a substitute for this probe.

### Title-box transform probe

Create title text:

```text
PALMIER_CANARY_TITLE_BOX_TRANSFORM
```

Keep independent text scale at unity. Apply:

```text
non-default title clip transform box size
rotation = 15 degrees
```

Read it back before export.

### Nested timelines

Create non-empty:

```text
PALMIER_CANARY_NEST_L2
PALMIER_CANARY_NEST_L1
```

Build:

```text
L2 -> nested into L1 -> L1 nested into root canary timeline
```

Use the exact child timeline IDs returned/read by Palmier when setting `mediaRef`.

Read back all timeline IDs and nested carrier positions before export.

## Phase 3 — pre-export scene audit

Before export, return/read one inventory snapshot containing at least:

```text
root canary timeline id/name
text-scale title clip id + style + keyframes
title-box probe clip id + transform + rotation
L1 timeline id/name
L2 timeline id/name
root -> L1 carrier
L1 -> L2 carrier
ordinary video/audio probe clip ids
```

If any mandatory probe is missing, fix the canary scene before export. Do not proceed with a knowingly incomplete scene.

## Phase 4 — record export start + submit exact timeline

Record `exportStartedAt` immediately before submission.

Prefer unique output. If supplying a path, use an absolute unique `.fcpxml` path with:

```text
overwrite = false
```

Submit equivalent to:

```text
export_project(
  mode = "fcpxml",
  fcpxmlTarget = "resolve",
  timelineId = "<EXACT_ROOT_CANARY_TIMELINE_ID>",
  outputPath = "<OPTIONAL_UNIQUE_ABSOLUTE_PATH>",
  overwrite = false
)
```

Record verbatim:

```text
status
jobId
queuePosition
path
format
timeline
durationFrames
durationSeconds
fps
warnings
```

## Phase 5 — exact job terminal state

Use:

```text
manage_exports(action = "list")
```

Find the exact returned `jobId` only.

Proceed only when:

```text
status = completed
```

Stop/preserve failure on:

```text
failed
canceled
```

`waiting/preparing/exporting/canceling` are non-terminal.

## Phase 6 — v2 scene-contract validation

Use the exact completed job path:

```bash
node --no-warnings scripts/validate-palmier-fcpxml-scene-contract.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>"
```

Require:

```text
contractResult = PASS
provenance = UNVERIFIED_BY_SCENE_CONTRACT
resolveRuntime = NOT_RUN
```

If it fails, preserve that export as a failed canary attempt. Do not attach another similar old file under the same attempt.

## Phase 7 — v2 wrapper structure/freshness/provenance

Inspect:

```bash
node --no-warnings scripts/attach-palmier-canary-v2-export.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>" \
  --inspect-only
```

Freshness:

```bash
node --no-warnings scripts/attach-palmier-canary-v2-export.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>" \
  --export-started-at "<EXPORT_STARTED_AT>" \
  --check-freshness-only
```

Only after you genuinely observed the real Palmier Resolve-target export:

```bash
node --no-warnings scripts/attach-palmier-canary-v2-export.mts \
  --fcpxml "<EXACT_COMPLETED_JOB_PATH>" \
  --export-started-at "<EXPORT_STARTED_AT>" \
  --attest-real-palmier-export
```

## Phase 8 — immutable Resolve Session

```bash
node --no-warnings scripts/prepare-resolve-canary-session.mts \
  DV21-PALMIER-FCPXML-01 \
  --execution-id DV21-PALMIER-FCPXML-01-<UNIQUE_ID> \
  --reuse-existing
```

Require:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

## Return report

Return concise structured evidence:

### Repo/Palmier
- repo HEAD
- Palmier version/build if observable
- root canary timeline ID/name

### Scene v2 readback
- four marker identities
- independent text scale style/keyframe readback
- title-box transform/rotation readback
- L1/L2 IDs and carrier positions

### Export job
- exportStartedAt
- exact jobId
- exact path
- initial status
- terminal status
- warnings/error/result

### Contract/attachment
- v2 scene-contract result
- structure result
- freshness result
- FCPXML version
- attached SHA-256
- provenance level

### Session
- execution ID
- READY/BLOCKED
- evidence.result

Do not report Resolve PASS here unless Resolve Actual was separately executed and validated.

## Semantic rules

```text
TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE
STATIC_AUDIO_VOLUME != AUDIO_AUTOMATION
EXPORT_QUEUED != EXPORT_SUCCEEDED
SCENE_MARKER_MATCH != REAL_PALMIER_PROVENANCE
REAL_PALMIER_PROVENANCE != RESOLVE_IMPORT_VERIFIED
FCPXML_PARAM_EMITTED != RESOLVE_TITLE_PARITY
FCPXML_NEST_STRUCTURE != RESOLVE_NEST_EDITABILITY
```
