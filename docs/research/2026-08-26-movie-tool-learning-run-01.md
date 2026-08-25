# Movie Tool Learning Run 01 — Palmier → DaVinci handoff truth

Date: 2026-08-26
Status: OBSERVED / IMPLEMENTATION-READY RESEARCH
Scope: Movie only
Base: `8111409c0579a1f332a9323053261b1edc3e628c`

## Why this run matters

The current Motion Zukan has progressed from catalog-only to real local Remotion render evidence for 17 presets, while DaVinci Actual remains a major unverified boundary. This run therefore focused on the real Palmier FCPXML exporter and current DaVinci Resolve 21 native recovery paths instead of collecting another generic feature list.

## Primary evidence read

1. Palmier Pro current source (`8805801fa4df8bc2dbc57cb0a854a1f5108f95c6`):
   - `Sources/PalmierPro/Export/FCPXMLExporter.swift`
   - `Tests/PalmierProTests/Export/FCPXMLExporterTests.swift`
   - `Sources/PalmierPro/Agent/Tools/ToolDefinitions.swift`
2. Blackmagic Design DaVinci Resolve 21 New Features Guide, April 2026.
3. Blackmagic Design DaVinci Resolve 21 support/update page, current through Resolve 21.0.3 (2026-07-22).
4. Blackmagic Design Fusion 21 product/compare pages for Python/Lua automation and macro extensibility.

## New verified source-level findings

### 1. Palmier FCPXML is explicitly target-aware for Resolve

Palmier's exporter is not a generic FCPXML dump. `FCPXMLTarget.resolve` has Resolve-specific value encoding because Resolve interprets some FCPXML transform/crop values differently from Final Cut.

Source comments explicitly document:
- position compensation for conform-fit scaling,
- scale compensation,
- rotation sign inversion,
- Resolve-specific crop encoding,
- source timecode preservation,
- ref-clip use where Resolve ignores `srcEnable` on bare asset clips.

**Implication:** the current Tool Learning Base should treat `Palmier FCPXML → Resolve` as its own tested adapter, not as equivalent to `Palmier FCPXML → Final Cut`.

### 2. Current exporter truth for transported properties

Palmier source declares these as transported to FCPXML/Resolve:
- clip placement / trims,
- speed,
- lane order,
- enabled state,
- text + font / face / size / color / alignment / stroke,
- position / scale / rotation / flip,
- position / scale / rotation keyframes,
- crop (static),
- opacity + opacity keyframes,
- static volume,
- source start timecode.

This is stronger evidence than assumptions based on UI behavior.

### 3. Current exporter truth for Lost / Rebuild candidates

Palmier source explicitly declares these as *not* transported:
- keyframed audio volume,
- audio fades,
- text background boxes,
- crop keyframes,
- title rotation / scale,
- Palmier color and effects,
- edge softness,
- edge rounding,
- Lottie clips.

This matches the current Lost/Rebuild candidate list and upgrades it from conversational hypothesis to source-level evidence.

### 4. Important correction: `LOST` must not mean unrecoverable

Several properties are lost in Palmier FCPXML but have credible DaVinci-native recovery paths:

| Property | FCPXML transport | Recovery class | DaVinci-native path | Current confidence |
|---|---|---|---|---|
| Audio volume keyframes | no | REBUILD_VALUES | Edit/Fairlight audio keyframes/automation | evidence-backed, runtime pending |
| Audio fade | no | REBUILD_VALUES | Edit/Fairlight fade controls | evidence-backed, runtime pending |
| Text background box | no | AUTO/ASSISTED_REBUILD candidate | Text+/Fusion Background + Rectangle/Merge, macro/template | evidence-backed, runtime pending |
| Crop keyframes | no | REBUILD_VALUES / AUTO_REBUILD candidate | Edit crop keyframes or Fusion mask/transform | evidence-backed, runtime pending |
| Title rotation/scale | no | REBUILD_VALUES | Text+/Edit/Fusion transform keyframes | evidence-backed, runtime pending |
| Edge softness | no | AUTO_REBUILD candidate | Fusion mask soft edge | evidence-backed, runtime pending |
| Edge rounding | no | AUTO_REBUILD candidate | Fusion mask / Picture-in-Picture rounding where appropriate | evidence-backed, runtime pending |
| Lottie | no in Palmier FCPXML | REBUILD_ASSET | Resolve 21 native `.lottie`/OGraf import; Fusion OGrafLoader | official Resolve 21 evidence, runtime pending |
| Palmier Color | no | REBUILD_INTENT | Color page nodes using Human Master intent/values | semantic mapping only; no 1:1 numeric claim |
| Palmier Effects | no | REBUILD_INTENT / ASSISTED_REBUILD | Resolve FX or Fusion based on effect purpose | per-effect mapping required |

### 5. Resolve 21 materially improves the rebuild strategy

DaVinci Resolve 21 adds two capabilities directly relevant to Motion Zukan handoff:

- `.json` OGraf and `.lottie` animations can be dragged into the Media Pool/timeline and maintain alpha; Fusion also has `OGrafLoader`.
- Fusion Macro Editor is improved and explicitly supports repackaging multi-node effects into reusable self-contained bundles with restricted exposed controls.

Fusion 21 also officially supports embedded Python/Lua scripting and macros/custom tools.

**Implication:** complex Motion Zukan effects should not default to `DaVinci manual work`. The preferred classification is now:

- `AUTO_REBUILD`: deterministic graph/value reconstruction is possible.
- `ASSISTED_REBUILD`: graph is deterministic, but media-specific visual tuning remains.
- `VISUAL_REBUILD`: tracking/rotoscope/occlusion or other image-content judgement dominates.
- `MANUAL_ONLY`: only after a concrete automation path has been disproven.

## Instruction reliability lesson

Palmier source itself documents Resolve-specific behavior that a generic instruction can easily miss. Therefore DaVinci/Codex handoff instructions should include all of:

1. target NLE = DaVinci Resolve,
2. Resolve version,
3. timeline FPS/resolution,
4. clip identity and scope,
5. Canonical/Human Master values,
6. whether the property came through FCPXML or is a rebuild item,
7. required native destination (Edit / Fusion / Color / Fairlight),
8. required editability after reconstruction,
9. verification readback/render step.

Do not instruct an agent merely to "make it look the same". That destroys the distinction between numeric reproducibility, visual reproducibility, and editability.

## New guardrails

### GL-01 — Target-specific FCPXML
Never infer FCPXML behavior from Final Cut compatibility alone. Palmier currently has explicit Resolve-target compensation.

### GL-02 — Lost transport ≠ lost authority
If FCPXML omits a property but Human Master retains intent/values/assets, classify it as a rebuild path before using `LOST`.

### GL-03 — Lottie is asset-rebuild, not manual recreation
For Resolve 21 on macOS/Windows, prefer native `.lottie`/OGraf re-import before baking or manually rebuilding animation.

### GL-04 — Complex Fusion is not automatically manual
Before assigning a red/manual label, test whether the effect can be represented as a Fusion graph + macro + `.setting`/`.drfx` or Python/Lua-generated graph.

### GL-05 — Source comments are evidence, not runtime proof
Palmier exporter comments/tests establish exporter intent and generated structure. They do **not** replace an actual Resolve import/render test. Keep `EXPECTED` and `OBSERVED_IN_DAVINCI` separate.

## Next high-value canary

### Canary: `lost-rebuild-01`

Use one 5–8 second synthetic scene with deterministic source media and Human Master values containing:

- audio volume keyframe,
- audio fade,
- text background box,
- crop animation,
- title scale + rotation animation,
- edge softness + rounding,
- one Lottie overlay.

Produce:
1. Palmier `.palmier` package as source-of-truth backup,
2. Palmier Resolve-target `.fcpxml`,
3. sidecar Human Master JSON,
4. generated DaVinci rebuild artifacts (`.setting`/macro/script where appropriate),
5. imported Resolve timeline,
6. frame/audio checkpoints at 0/25/50/75/100%,
7. readback of editable controls,
8. final render hash/metadata plus visual comparison.

Promotion rule:
- Transported property → `EXACT/APPROX` only after Resolve actual.
- Rebuilt property → `AUTO_REBUILD/ASSISTED_REBUILD` only after repeatable import + editable readback.
- One successful clip is not enough for Trusted; repeat on a second scene/asset.

## Backlog delta

High-value unresolved items remain, so research is **not saturated**:

1. Actual Resolve 21 import of Palmier current FCPXML exporter output.
2. Determine whether audio volume/fade can be generated through Resolve scripting APIs cleanly or should use Fairlight-specific automation/manual value rebuild.
3. Validate `.setting` generation/import for mask softness, rounding, text background, crop animation.
4. Validate native Lottie/OGraf timing, alpha, trim behavior, and packaging portability.
5. Establish exact Free vs Studio boundary for the automation paths used by our build.
6. Measure Palmier → Resolve transform/crop visual parity across mismatched aspect ratios.
7. Convert the first successful canary into a Golden Motion Test and regression fixture.

## Current status

`RESEARCH_SATURATED = false`

Reason: the exporter truth is now much clearer, but DaVinci Actual and deterministic rebuild artifacts remain unverified and are high value.
