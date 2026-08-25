# Palmier FCPXML project-context / OTIO boundary research

Status: OBSERVED / NEEDS_RUNTIME_VERIFICATION  
Date: 2026-08-26  
Scope: Movie only

## Why this matters

Palmier -> DaVinci handoff fidelity must not be scored only from clip placement and visible transform values. The current Palmier FCPXML exporter also emits sequence-level project context that can affect downstream playback and grading.

## Upstream evidence pinned for this observation

Palmier upstream file inspected at commit:

`8805801fa4df8bc2dbc57cb0a854a1f5108f95c6`

`Sources/PalmierPro/Export/FCPXMLExporter.swift`

The exporter explicitly emits the sequence format with:

- timeline width / height from the Palmier timeline
- timeline fps from the Palmier timeline
- `colorSpace = "1-1-1 (Rec. 709)"`

For nested sequence resources it also emits:

- `audioLayout = "stereo"`
- `audioRate = "48k"`

The same source documents that Palmier's Resolve target uses Resolve-specific value encoding for position, scale and crop, based on reverse-engineered Resolve round-trips.

### Existing transport boundary confirmed in the same source

Transported:

- placement / trims / speed / lanes / enabled state
- text basics
- position / scale / rotation / flip
- position / scale / rotation keyframes
- static crop
- opacity and opacity keyframes
- static volume
- source start timecode

Not transported:

- audio volume keyframes
- audio fades
- text background boxes
- crop keyframes
- title rotation / scale
- color and effects
- edge softness / edge rounding
- Lottie clips

## New guardrail: Project Context Fidelity is separate from Motion Fidelity

Do not mark a Palmier -> DaVinci handoff `EXACT` merely because transforms and timing visually match.

Track at least these fidelity dimensions separately:

1. `TIMELINE_GEOMETRY_FIDELITY`
   - fps
   - width / height
   - aspect ratio
   - timecode origin / source timecode behavior

2. `COLOR_CONTEXT_FIDELITY`
   - Palmier-exported FCPXML currently declares Rec.709
   - verify imported DaVinci timeline/project color-management state and output tags separately
   - do not infer HDR / wide-gamut preservation from clip-level fidelity

3. `AUDIO_CONTEXT_FIDELITY`
   - exporter currently declares stereo / 48 kHz on emitted sequence resources
   - verify source media, imported timeline, Fairlight bus/channel layout and final render independently

4. `MOTION_FIDELITY`
   - position / scale / rotation / crop / opacity

5. `EDITABILITY_FIDELITY`
   - whether the imported value is still natively adjustable rather than baked

## Golden Handoff canary extension

The existing Golden Handoff canary should add explicit project-context assertions.

### Palmier source scene

Record in Human Master / sidecar:

- expected fps
- expected resolution
- expected aspect ratio
- expected color intent
- expected audio sample rate / channel intent
- source media timecode if present

### FCPXML parse/readback

Assert:

- `format.frameDuration`
- `format.width`
- `format.height`
- `format.colorSpace`
- `sequence.audioLayout`
- `sequence.audioRate`
- source start-timecode metadata

### DaVinci clean import readback

Do not rely on successful import alone. Record observed:

- timeline fps
- timeline resolution
- clip/media relink state
- project/timeline color-management interpretation
- audio sample rate / channel layout where accessible
- visual transform/crop/opacity values
- editability of rebuilt Fusion artifacts

### Final render QA

Compare not only frame pixels but:

- fps / duration
- resolution
- audio presence and sync
- audio channel count / sample rate metadata
- color tags / obvious gamma shift
- alpha where relevant

## OTIO routing boundary

Current OpenTimelineIO documentation states that the core `opentimelineio` package ships its native `.otio`, `.otiod` and `.otioz` adapters. FCP XML / AAF / CMX 3600 and similar adapters come through the separate `OpenTimelineIO-Plugins` ecosystem and may have varying community-maintenance levels.

OTIO's own adapter documentation also states that native `.otio` is the lossless representation for OTIO's data model while conversion to other formats is lossy according to the target format and adapter implementation.

Therefore:

- do **not** introduce `Palmier -> OTIO -> FCPXML -> DaVinci` as the default path merely because OTIO is standardized
- keep Palmier's native Resolve-targeted FCPXML as the preferred current timeline interchange while it has explicit Resolve-specific value compensation
- evaluate OTIO as a canonical/intermediate representation only when it adds an actual capability (pipeline manipulation, packaging, validation, adapter independence) and prove the extra conversion does not reduce fidelity
- if OTIO is introduced, record exact adapter package/version and test the output with the same clean-import canary

## Instruction recipe addition

For Codex / DaVinci handoff instructions, include project context before asking for reconstruction:

```text
Target: DaVinci Resolve
Timeline: <exact timeline>
Expected FPS: <fps>
Expected resolution: <width>x<height>
Expected color intent: <e.g. SDR Rec.709; verify, do not silently change>
Expected audio intent: <sample rate / channel layout>
Source: fresh Palmier Resolve-targeted FCPXML + Human Master sidecar

1. Import into a clean test timeline/project context.
2. Read back timeline/media/project context before rebuilding lost properties.
3. Rebuild only properties classified as non-transported.
4. Preserve imported native values that already match.
5. Verify project context + motion + editability + final render separately.
```

This prevents a visually plausible motion rebuild from hiding an fps, color or audio-context mismatch.

## Trust state

- Palmier source behavior above: `EVIDENCE_VERIFIED`
- Palmier -> DaVinci project-context behavior: `NEEDS_RUNTIME_VERIFICATION`
- OTIO as replacement for Palmier Resolve-targeted FCPXML: `NOT_PREFERRED / UNVERIFIED`
- Existing native Palmier Resolve-targeted FCPXML route: remains `PREFERRED_CANDIDATE`, not `TRUSTED`, until clean DaVinci import and final readback pass

## Next high-value runtime tests

1. Fresh Palmier Resolve-targeted FCPXML -> DaVinci 21.0.3 clean import.
2. Read back fps/resolution/color/audio context before any manual changes.
3. Compare transform/crop/opacity behavior with the Human Master.
4. Rebuild edge softness/rounding and text background through Fusion artifact path.
5. Test audio volume/fade recovery separately; do not conflate it with visual Fusion rebuild.
6. Lottie: test direct Resolve 21 native import and alpha/editability independently of FCPXML.

Research is not saturated while these runtime checks remain open.
