# Movie Tool Learning Run 02 — Resolve 21.0.3 rebuild boundaries

Date: 2026-08-26
Status: OBSERVED / IMPLEMENTATION-READY RESEARCH
Scope: Movie only
Parent: `docs/research/2026-08-26-movie-tool-learning-run-01.md`

## Why this run matters

Run 01 established which Palmier properties are transported by the current Resolve-target FCPXML exporter and which are Lost/Rebuild candidates. This run narrows the next implementation boundary: which Lost properties are realistically scriptable/rebuildable in current Resolve, and which should not be promised as full Codex automation yet.

## Fresh evidence

### DaVinci Resolve current stable baseline

Blackmagic Design's current support page lists **DaVinci Resolve 21.0.3**, released **2026-07-22**, as the latest Resolve 21 update available at the time of this run.

Relevant release-note deltas:
- improved keyframe editing,
- new ease modes for retime speed/frame curves,
- Fusion Studio 21.0.3 improved `.drfx` asset handling.

**Implication:** Golden/Canary evidence for Motion Zukan rebuild should record exact Resolve patch version, not only `21.x`. Keyframe and `.drfx` packaging behavior are version-sensitive enough to require `21.0.3` as the present baseline.

## Scripting boundary found

### 1. Fusion composition reconstruction is script-addressable

The Resolve scripting API exposes timeline-item operations including:
- `AddFusionComp()`
- `ImportFusionComp(path)`
- `ExportFusionComp(path, compIndex)`
- lookup/load/rename/delete of Fusion comps.

`TimelineItem:SetProperty()` also exposes deterministic video-side values such as Pan/Tilt, Zoom, Rotation, Crop and CropSoftness.

**Preferred native route:** deterministic Lost/Rebuild effects such as text background, crop/transform reconstruction, mask softness, and reusable Fusion graphs should first test a generated Fusion composition / `.setting` + `ImportFusionComp()` route before being classified as manual.

### 2. Audio is a different automation class

The currently documented TimelineItem property surface is video-transform oriented. It does not expose Fairlight clip/track volume, audio pan, EQ, audio automation curves, or fade handles as writable TimelineItem properties.

A current open-source Resolve MCP limitation audit reports a live mutation test on Resolve 21.0.0 where `SetProperty('Volume'|'Level'|'Gain'|'AudioVolume', ...)` returned false. It also warns that `Pan` is the **video transform Pan**, not audio pan.

This is community/runtime evidence rather than Blackmagic official API documentation, but it materially changes our implementation assumption.

**Correction:**
- Audio Volume Keyframe and Audio Fade remain `REBUILD_VALUES`.
- Do **not** promote them to `AUTO_REBUILD` merely because Resolve has a scripting API.
- Until a supported write path is verified, classify them as `ASSISTED_REBUILD` / `MANUAL_VALUE_REBUILD` candidates with exact Human Master values preserved.
- A generated guide/marker/sidecar can still reduce manual work even when Fairlight automation itself cannot be written safely.

## Updated rebuild matrix

| Lost/Rebuild property | Current preferred path | Automation class | Evidence state |
|---|---|---|---|
| Text background box | generated Fusion comp / macro | AUTO_REBUILD candidate | API/native path known; runtime pending |
| Crop keyframes | Fusion comp first; Edit keyframe fallback | AUTO_REBUILD candidate | API/native path known; runtime pending |
| Title rotation/scale | Fusion/Text+ or transported video transform where semantically valid | AUTO_REBUILD candidate | runtime pending |
| Edge softness | Fusion mask / `CropSoftness` only where semantics match | AUTO_REBUILD candidate | runtime pending |
| Edge rounding | Fusion mask/macro | AUTO_REBUILD candidate | runtime pending |
| Lottie | native Resolve 21 `.lottie`/OGraf re-import | REBUILD_ASSET | official feature evidence; runtime pending |
| Audio volume keyframes | Human Master values → Fairlight/Edit manual application unless supported write path found | ASSISTED_REBUILD candidate | API limitation evidence; actual workflow pending |
| Audio fades | Human Master duration/curve → Edit/Fairlight manual application unless supported write path found | ASSISTED_REBUILD candidate | API limitation evidence; actual workflow pending |
| Palmier Color | Color page intent/value recipe | REBUILD_INTENT | no 1:1 mapping claim |
| Palmier Effects | per-effect Resolve FX/Fusion route | REBUILD_INTENT / ASSISTED | per-effect validation required |

## New instruction guardrails

### GL-06 — Never use `Pan` as an audio control

In Resolve scripting, TimelineItem `Pan` is a **video transform** property. An agent instruction saying only `set pan` is unsafe. Instructions must say `video transform pan` or `Fairlight/audio pan` explicitly.

### GL-07 — Separate graph automation from Fairlight automation

`Resolve scripting available = everything scriptable` is false. Fusion graph import/export has a concrete API surface; Fairlight automation needs its own verified capability record.

### GL-08 — Version-pin rebuild evidence

Record exact Resolve version in every Canary/Golden result. Evidence produced on 21.0.0 must not silently certify 21.0.3, and vice versa, when keyframe or `.drfx` behavior is involved.

### GL-09 — `.drfx` packaging needs a portability canary

Because 21.0.3 specifically changed `.drfx` asset handling, a successful local macro import is not enough. Package dependencies, install on a clean test context where possible, re-open, verify assets resolve, then render.

## Instruction recipe delta

For Codex/DaVinci rebuild work, use explicit capability routing:

```text
Target: DaVinci Resolve 21.0.3
Timeline: <name>, <fps>, <resolution>
Clip: <stable identity>
Human Master property: <property/value/timing>
Transport state: FCPXML_TRANSPORTED | REBUILD_REQUIRED
Preferred native route: EDIT | FUSION | COLOR | FAIRLIGHT
Automation capability: VERIFIED_WRITE | GENERATED_ARTIFACT | ASSISTED_MANUAL | UNKNOWN
Editable-after-rebuild: required
Verification: readback + render checkpoint + dependency check
```

Do not instruct Codex to "recreate everything automatically". The compiler/router must choose a route per property.

## Canary split

The previous `lost-rebuild-01` Canary should be split logically into two evidence groups even if they live in one synthetic scene.

### A. `lost-rebuild-visual-01`

Test deterministic visual rebuild:
- Text background box
- Crop animation
- Title rotation/scale
- Edge softness
- Edge rounding
- Lottie

Goal:
- generated artifact imports,
- controls remain editable,
- render matches Human Master intent,
- `.drfx`/asset dependencies survive re-open/package test.

### B. `lost-rebuild-audio-01`

Test:
- audio volume keyframe
- fade in/out

Goal:
1. probe actual Resolve 21.0.3 scripting write surface first,
2. if unsupported, prove the minimal assisted workflow,
3. preserve exact dB/time/curve values in Human Master,
4. measure how much manual operation remains,
5. do not label `AUTO_REBUILD` unless a supported repeatable mutation path is demonstrated.

## Tool-selection consequence

When an effect can be deterministically represented as a Fusion graph, prefer:

`Canonical Motion Spec → Fusion artifact/compiler → ImportFusionComp → editable readback`

over
`baked video → DaVinci`.

For Fairlight values with no verified scripting mutation path, prefer:

`Canonical Audio Spec → exact assisted rebuild instructions + verification`

over unsupported/private project-file mutation.

Do not reverse engineer or mutate opaque Resolve project internals merely to claim automation. Native/supportable portability is more important than a fake 100% automation rate.

## Backlog delta

High-value unresolved work remains:

1. Actual Resolve 21.0.3 `ImportFusionComp()` Canary with generated composition.
2. `.setting`/macro generation for text background + mask softness/rounding.
3. `.drfx` clean-context portability test on 21.0.3.
4. Native Lottie/OGraf timing, trim, alpha, re-open and packaging behavior.
5. Actual audio mutation probe on 21.0.3; confirm whether 21.0.0 limitation persists.
6. If audio write remains unsupported, design the fastest exact assisted workflow and UI instructions.
7. Transform/crop parity across aspect-ratio mismatch remains unverified.

## Current status

`RESEARCH_SATURATED = false`

Reason: this run eliminated an important false assumption (general Resolve scripting does not imply Fairlight automation writes), but multiple high-value Actual Canaries remain.
