# Movie Tool Learning Run 34 — Palmier current export lifecycle / nested timeline / title-scale correction

Date: 2026-08-26  
Status: CURRENT PALMIER SOURCE EVIDENCE / RESOLVE RUNTIME STILL PENDING  
Scope: Movie Tool Learning only

## Why this run exists

Runs 28–30 made Palmier real-export attachment fail closed on structure, freshness and explicit operator provenance. A new upstream source audit found three high-value changes/corrections that should be folded into the Tool Learning Base before the first Resolve Actual:

1. current Palmier has an explicit queued export lifecycle with `jobId` and `manage_exports`, so export submission must no longer be treated as completion;
2. current FCPXML exporter supports reachable nested timelines as FCPXML compound/media resources and upstream tests cover multi-level nesting;
3. the old coarse `title rotation/scale = non-transport` classification is no longer precise enough: current exporter has a dedicated title scale parameter for independent text scaling, while title-box transform scale/rotation remains a different omission/rebuild concern.

## Current Palmier coordinate

Official GitHub release API checked on 2026-08-26:

```text
latest release = v0.7.6
published_at = 2026-08-19T04:03:00Z
```

Current upstream source audited at:

```text
repository = palmier-io/palmier-pro
commit = 8805801fa4df8bc2dbc57cb0a854a1f5108f95c6
commit date = 2026-08-24
```

Primary files read:

- `Sources/PalmierPro/Agent/Tools/ToolExecutor+Export.swift`
- `Sources/PalmierPro/Export/FCPXMLExporter.swift`
- `Tests/PalmierProTests/Export/FCPXMLExporterTests.swift`

Current release/source coordinates are evidence coordinates, not a claim that the installed local Palmier is already that exact build. Local Actual must capture the live tool version separately.

```text
UPSTREAM_CURRENT_VERSION != LOCAL_RUNTIME_VERSION
```

## 1. `export_project` submission is not export completion

Current `export_project` enqueues work and returns a payload containing at least:

```text
status = started | queued
jobId
queuePosition
path
mode
format/timeline metadata where applicable
```

For FCPXML, `fcpxmlTarget` accepts:

```text
resolve
fcp
```

and defaults to the Resolve target.

Current `manage_exports(action="list")` returns project export jobs newest first with:

```text
jobId
filename
path
status
progress
queuePosition when waiting
error when present
warnings when present
result when present
```

Terminal states visible in the export implementation include:

```text
completed
failed
canceled
```

Therefore the current preferred Palmier instruction is:

```text
read exact project/timeline
→ record export-start timestamp
→ call export_project(mode=fcpxml, fcpxmlTarget=resolve, explicit timelineId)
→ capture exact jobId + returned path
→ use manage_exports(action=list)
→ match the exact jobId
→ wait for terminal status
→ preserve warnings/error/result
→ only completed proceeds to structure/freshness/provenance attachment
```

Guardrails:

```text
EXPORT_QUEUED != EXPORT_SUCCEEDED
PROGRESS_100 != TERMINAL_SUCCESS
JOB_ID_MUST_MATCH_TERMINAL_RESULT
TERMINAL_SUCCESS != FRESHNESS_PROVENANCE
```

Do not infer a job is stuck from elapsed time alone. Observe the queue status/result instead.

## 2. Output-path behavior strengthens freshness guidance

Current source behavior:

- when `outputPath` is omitted, Palmier writes to Downloads and chooses a unique filename if the default destination already exists or is reserved;
- when an explicit `outputPath` is supplied, overwrite defaults to `true`;
- `overwrite=false` rejects an already-existing destination;
- outputPath must be absolute and the parent directory must already exist.

Therefore the safest canary path is one of:

```text
A. omit outputPath and use Palmier's unique Downloads path
or
B. provide a unique absolute path with overwrite=false
```

A fixed path with default overwrite remains valid Palmier behavior, but is less useful for provenance/failure debugging.

```text
OVERWRITE_ALLOWED != RECOMMENDED_CANARY_PROVENANCE
```

Run30 freshness checking remains useful even with the current queue because terminal success and file freshness are independent evidence dimensions.

## 3. FCPXML version is a compatibility gate, not a fidelity tier

Current exporter supports FCPXML version attributes:

```text
1.10
1.11
1.12
1.13
1.14
```

and defaults to `1.10`.

The exporter source explicitly says the body uses elements that have existed since FCPXML 1.1 and describes the version attribute as the import gate that Resolve/FCP literal allow-lists. Its compatibility note says:

```text
1.10 -> DaVinci Resolve 18+
1.11–1.14 -> DaVinci Resolve 21+
```

The upstream test also verifies the default 1.10 header and explicit 1.14 selection.

This does **not** justify saying 1.14 has higher Palmier handoff fidelity than 1.10.

```text
FCPXML_VERSION_ATTRIBUTE != HANDOFF_FIDELITY_LEVEL
```

Choose the broadest destination-compatible version unless a concrete importer requirement says otherwise.

## 4. Current exporter transport matrix remains mostly stable

Current source comments still state that FCPXML transports:

- clip placement/trims
- speed
- lane order
- enabled state
- text + font/face/size/color/alignment/stroke
- position/scale/rotation/flip
- position/scale/rotation keyframes
- static crop
- opacity + opacity keyframes
- static volume
- source start timecode

Resolve-target encoding still applies Resolve-specific compensation for transform/crop values.

Current non-transport list still includes:

- audio volume keyframes
- audio fades
- text background boxes
- crop keyframes
- title-box rotation/scale semantics not covered by the independent text-scale path
- color/effects
- edge softness/rounding
- Lottie clips

The last two must not be confused with Palmier's ability to render or package those features in other output modes.

## 5. Audio automation behavior is more precise than simply `LOST`

### Static volume

Current `volumeNode` emits static volume as `<adjust-volume amount="...dB"/>` when clip volume is non-unity.

Upstream test:

```text
reducedVolumeExportsAdjustVolumeInDecibels
```

verifies 0.5 linear volume becomes approximately -6.0206 dB.

### Volume keyframes

Upstream test:

```text
volumeKeyframesCollapseToStaticLevel
```

constructs a `volumeTrack` with keyframes but verifies that only the static clip volume is emitted; no audio keyframe animation is serialized.

The exporter source comments this as a Resolve round-trip limitation.

Therefore the correct handoff interpretation is:

```text
Palmier volume automation
→ FCPXML static clip volume survives
→ automation curve is omitted
```

not:

```text
all audio volume is lost
```

Guardrail:

```text
STATIC_AUDIO_VOLUME_TRANSPORT != AUDIO_AUTOMATION_TRANSPORT
```

### Audio fade

The upstream `fadesAndChannelLayoutAreNotExported` test creates a fade-in and asserts no fade element appears.

So Human Master must retain fade duration/curve separately for Resolve rebuild.

## 6. Independent text scale must be split from title-box transform scale/rotation

This is the most important classification correction in this run.

Current exporter has `titleTransformNodes(for:style:)`, which derives a title `scale` parameter from:

```text
TextStyle.widthScale
TextStyle.heightScale
clip text-scale keyframes
```

The upstream test:

```text
textScaleExportsAsIndependentTitleTransform
```

sets asymmetric independent text scale and a scale animation, then asserts the expected title scale parameter/keyframes exist in FCPXML.

Therefore the old coarse sentence:

```text
Title scale is not transported
```

is no longer safe.

The current distinction is:

### A. independent text scaling

```text
TextStyle widthScale/heightScale + text-scale animation
→ title scale param emitted by Palmier FCPXML
→ Resolve Actual still required
```

### B. title-box transform width/height + rotation

The upstream `textBoxTransformExportsTitlePositionAndOpacity` test gives the title a box transform with width/height + rotation and expects:

- title position behavior,
- opacity behavior,
- an `adjust-transform` whose scale remains `1 1`,
- no transported title-box rotation semantics.

Therefore title-box scale/rotation remains a rebuild target.

Guardrails:

```text
TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE
FCPXML_PARAM_EMITTED != RESOLVE_TITLE_PARITY
```

The machine-readable correction lives in:

```text
movie-dashboard/src/data/palmierFCPXMLCurrentEvidence.ts
```

and explicitly marks the old coarse `title-rotation-scale` property as needing semantic split rather than silently deleting its useful DRFX recovery intent.

## 7. Nested timelines are now a real FCPXML transport candidate

Current exporter:

- discovers reachable child timelines;
- creates nested `<media>` / `<sequence>` resources;
- emits parent carrier `<ref-clip>` elements;
- preserves audio/video stream selection where needed;
- clamps frozen carriers to remaining child content;
- drops missing/empty nested sources with warning behavior.

Upstream nested-timeline tests cover:

```text
nestEmitsCompoundResourceAndRefClip
linkedCarrierPairCollapsesIntoOneRefClip
twoLevelNestingEmitsBothCompounds
frozenCarrierClampsToChildContent
emptyOrMissingChildDropsCarrier
```

This is stronger source/test evidence than our previous Tool Learning Base had.

But exporter tests are not Resolve runtime proof.

```text
FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED
NESTED_TIMELINE_TRANSPORT != NESTED_TIMELINE_EDITABILITY
```

High-value future Actual:

- parent timeline
- child timeline
- grandchild timeline
- one linked A/V carrier
- one trimmed/frozen nested carrier
- import into clean Resolve 21
- inspect compound/timeline structure and editability
- save/reopen

Do not enlarge the first Palmier FCPXML Actual silently if it would make failure diagnosis harder; nested transport can be a dedicated follow-up Canary after the flat-scene baseline.

## 8. Instruction reliability update

Preferred Palmier export instruction pattern becomes:

```text
READ
- get current project/timeline identities
- choose exact timelineId
- inspect required neutral assets/scene state

SCOPE
- one synthetic timeline only
- no wedding production timeline
- fcpxmlTarget=resolve
- choose unique destination or overwrite=false

EXPORT
- record export-start timestamp
- export_project(...)
- save returned jobId + path

VERIFY TERMINAL JOB
- manage_exports(action=list)
- match exact jobId
- preserve status/progress/warnings/error/result
- abort attachment on failed/canceled/non-terminal state

VERIFY ARTIFACT
- inspect FCPXML structure
- freshness check against export-start timestamp
- explicit operator/local-agent provenance confirmation
- hash/attach

VERIFY DESTINATION
- prepare immutable Resolve Session
- clean Resolve import/readback/save-reopen
```

This is a concrete example of the global instruction rule:

```text
read → scope → edit/export → verify
```

where `verify` must validate both the producing tool's job state and the produced artifact.

## 9. Trusted-state implications

No property becomes `RUNTIME_VERIFIED` from this run.

What improves:

- Palmier export lifecycle evidence: stronger and current-source-backed
- nested timeline FCPXML generation: source + upstream tests
- independent text scale: source + upstream tests
- static-vs-automated audio distinction: source + upstream tests

Still pending:

- real Palmier local export through current installed version
- Resolve 21 native import/readback
- nested compound interpretation in Resolve
- independent title scale visual/editability parity in Resolve
- audio reconstruction behavior in Resolve

`RESEARCH_SATURATED = false`.
