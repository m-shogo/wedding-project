# Mask Reveal Vertical Slice — Palmier → DaVinci Local Verification

Status: ACTIVE / NOT PRODUCTION READY  
Scope: Movie only  
Pattern: `type-mask-reveal`  
Implementation: `impl-type-mask-reveal-davinci-text-plus`  
Sample asset set: `sample-typography-welcome-v1`

## Purpose

Mask Reveal 1件を、Visual Motion Libraryで選ぶところから **real Palmier NLE XML + real DaVinci Actual Preview** まで本当に通すための最小handoff。

このVertical Sliceが完了するまで、次のMotion Patternをproduction migrationしない。

## Current authority chain

```text
Human-readable adopted SceneInstance
→ Canonical Scene state
→ fresh Scene production bundle
→ Palmier real project timeline NLE XML + Scene sidecar
→ DaVinci import / Scene marker match
→ live-context expected values
→ applied/readback + delta
→ Actual DaVinci render
→ 1x / 0.5x Visual QA
```

Authority split:

- SceneInstance human-readable values: production authority
- Canonical Scene state: tool-independent structured representation
- JSON sidecar: current Scene state / handoff serialization, **not a separate Human Master**
- Palmier: Rough timing / placement / timeline ordering
- Palmier real NLE XML: real Palmier project timeline interchange
- DaVinci Resolve: final motion / actual render / final visual QA
- DaVinci applied/readback: implementation evidence
- Actual MP4: implementation evidence
- Remotion: Concept preview helper only

JSON / XML / frame numbers / MP4 must not silently replace `HUMAN_SELECTED` or `LOCKED` Scene values.

## Step 1 — choose one adopted SceneInstance

Open `/movie-coach/motion-library`, select Mask Reveal, and work from one **adopted SceneInstance**.

Before Palmier/DaVinci execution, record:

```text
sceneId
sourceRevision = SceneInstance.updatedAt
projectId
section
sceneMarkerId
humanSelectedFields
lockedFields
```

Generate a fresh `motion-zukan-scene-production/v1` bundle from that exact Scene.

If `updatedAt` changes after sidecar/readback generation, the older handoff/evidence is **STALE** and must be regenerated.

## Step 2 — Human / Canonical values

Use current effective Scene values, not copied historical defaults.

At minimum trace:

```text
Text
Scene Duration
Layer Delay
Motion Delay
Enter Duration
Hold Duration
Position / Offset
Direction
Distance
Scale
Intensity
HUMAN_SELECTED / LOCKED state
```

For the neutral proof the text/sample remains `WELCOME` / `sample-typography-welcome-v1`.

Do **not** hard-code a historical `0.8 sec` reveal duration. Use the current Scene's resolved `enterDurationSeconds` and derive frames later from the live Resolve fps.

For Mask Reveal v1, active Property units are limited to:

```text
Transform
Mask
```

A Position-only correction must not silently rewrite Mask/Text/Media/Hold or unrelated timing values.

## Step 3 — Scene-specific marker

Production handoff uses the marker from the fresh Scene production bundle:

```text
VML_MASK_REVEAL_<SECTION>_<SCENE_TOKEN>
```

Do not use the old Pattern-only `VML_MASK_REVEAL_OPENING_INTRO` as production authority when an adopted SceneInstance exists.

The marker identifies the Scene; it is not an editable motion value.

## Step 4 — Palmier Rough

Palmier remains:

`PALMIER_TIMING_ONLY`

Palmier should:

- place the rough title/media timing from current Human Scene intent
- preserve current Scene marker identity
- preserve project ordering/timing
- export the **real project timeline** as DaVinci-compatible NLE XML

Palmier should not:

- fake exact Fusion Mask Reveal with another effect
- add glow / bounce / shake
- overwrite Human Selected / Locked values
- replace the Scene-specific marker with a Pattern-only marker

If Palmier applies an approximation, preserve separately:

```text
intended Human value
Palmier applied value
difference / delta
```

## Step 5 — Palmier export

Use the project timeline filename and Scene sidecar filename from the fresh production bundle.

Required conceptual pair:

```text
Palmier real project NLE XML
+
fresh Scene-specific Motion Handoff sidecar
```

Do not generate fake NLE XML from app code.

The sidecar serializes the current Scene/handoff state but does not become an independent Human Master.

## Step 6 — DaVinci live context

Before authoring motion, connect to local Resolve and record real:

```text
product / edition
Resolve version
MCP version if available
transport
project name
timeline name
width
height
fps
```

Neutral requested preview target remains:

```text
WELCOME
1280 × 720 target
30fps target
~4 sec target
muted
```

Requested target is not proof of the live Project Context.

Recompute expected DaVinci values from:

```text
current Canonical Scene state
+
live Resolve Project Context
```

Human seconds remain authority; frame numbers are derived using live fps.

## Step 7 — built-in DaVinci implementation

Use built-in:

`Text+ + Fusion + Rectangle Mask`

Reuse recipe:

`fusion-masked-reveal`

Before animation, prove where supported:

- Text+ exists
- StyledText matches current Scene text
- Rectangle Mask exists
- `Text+.EffectMask` connection exists

Apply the current Scene values. Do not begin from old hard-coded Fusion/frame values.

Keep the effect restrained:

- selected reveal direction
- natural settle
- no bounce
- no excessive glow
- no shake
- no decorative effect chain
- no unnecessary motion blur

If keyframe authoring alone is not safely automatable, record `automationGap: KEYFRAME_AUTHORING` and perform only the smallest manual step.

## Step 8 — applied/readback evidence

Capture `davinci-applied-readback/v1` for the same `sceneId` + `sourceRevision`.

Compare:

```text
Human value
→ Canonical value
→ live-context expected value
→ applied/readback value
→ delta
```

Review:

- StyledText
- mask connection
- timing frames
- final position where provable
- direction
- distance / scale where provable
- LOCKED preservation
- Transform / Mask property-local integrity

A stale revision or silent locked-value violation is failure.

Applied/readback evidence alone is not completion.

## Step 9 — Actual Preview

Render from local DaVinci.

Candidate neutral output after QA:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4`

Candidate poster:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png`

Collect actual:

- Resolve version
- renderedAt
- SHA-256
- codec
- dimensions
- fps
- duration/frame count
- sample asset set ID
- implementation ID

Never commit real wedding photos/videos/music through this neutral proof path.

## Step 10 — Visual QA

Check both normal speed and 0.5x.

### 1x

- text clearly reveals rather than only fading
- intended human timing meaning is preserved
- final text is crisp/stable
- no clipping
- no unnecessary effect

### 0.5x

- acceleration/deceleration is coherent
- no accidental bounce/overshoot
- mask edge behaves correctly
- settle is clean
- no unwanted motion after settle

If QA fails, correct the relevant Human-readable Property when possible, regenerate fresh derived values, and re-render.

## Step 11 — truth promotion

Do not move to `PRODUCTION_READY` until all required real evidence exists.

Eligible only after proof:

- implementation `AVAILABLE → TESTED → PRODUCTION_READY` when justified
- actual local Resolve version
- separate `ACTUAL_DAVINCI_RENDER / VERIFIED` preview
- actual asset/poster path
- timestamp/checksum/provenance
- completed `motion-verification/v1` checks

Keep repository-generated Concept evidence separately. Actual does not erase Concept provenance.

## Completion gate

This Vertical Slice completes only when this chain is real:

`Visual Motion Library → adopted SceneInstance → Human values → Canonical state → fresh Scene bundle → Palmier Rough → real project NLE XML + Scene sidecar → DaVinci import → Scene marker match → live-context expected values → applied/readback + delta → Text+/Rectangle Mask implementation → Actual Render → 1x/0.5x Visual QA → Registry/evidence verification`

Only after this passes may the next slice such as `photo-hero-still` begin, unless the mutable complete prompt changes the next priority.
