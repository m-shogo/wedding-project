# Movie Tool Learning Run 08 — Palmier FCPXML schema versions / nested timelines / Resolve 21

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.
Palmier source snapshot inspected: commit `8805801fa4df8bc2dbc57cb0a854a1f5108f95c6`.

## 1. Palmier now treats FCPXML schema version as an explicit compatibility dimension

Current `FCPXMLExporter.swift` defines selectable FCPXML versions 1.10 through 1.14.

Palmier's own compatibility notes state:

- 1.10: DaVinci Resolve 18+, Final Cut Pro 10.6+
- 1.11: DaVinci Resolve 21+, Final Cut Pro 10.7+
- 1.12: DaVinci Resolve 21+, Final Cut Pro 10.8+
- 1.13: DaVinci Resolve 21+, Final Cut Pro 11+
- 1.14: DaVinci Resolve 21+, Final Cut Pro 12+

Palmier deliberately defaults to 1.10 for broad compatibility, while noting that every element it currently emits existed since FCPXML 1.1 and that the version attribute is primarily an importer allow-list gate.

Implication for Wedding Resolve 21:

- Resolve 21 major baseline does not imply 'always export 1.14'.
- FCPXML schema version becomes part of the handoff fingerprint.
- Keep 1.10 as a conservative baseline until runtime proves a higher schema version materially improves something without regressions.

Guardrail:

`RESOLVE_21 != FORCE_HIGHEST_FCPXML_SCHEMA`

## 2. Resolve-specific target remains a first-class encoding choice

Palmier explicitly documents that Resolve interprets several FCPXML values differently from spec-literal Final Cut behavior. `FCPXMLTarget.resolve` remains the default and applies Resolve-specific encoding for position/scale/rotation/crop.

Handoff receipt must therefore record both:

- `fcpxmlTarget = resolve`,
- `fcpxmlVersion = 1.10|1.11|1.12|1.13|1.14`.

A file generated with target `fcp` is not equivalent merely because Resolve imports it.

## 3. Nested timelines are exported as compound resources

Current Palmier source recursively discovers reachable nested timelines, guards against repeated visits, and emits nested timelines as FCPXML media/sequence compound resources. Nested sequence format resources are generated when geometry differs from the parent.

The nested sequence writes:

- format / frame duration / width / height,
- Rec.709 color space,
- stereo audio layout,
- 48 kHz audio rate.

This creates a new high-value handoff surface: nested wedding scenes should no longer be assumed to flatten or disappear solely because they are nested in Palmier.

Guardrail:

`NESTED_TIMELINE_EXPORTED != NESTED_TIMELINE_RUNTIME_PARITY`

Resolve must still be tested for nesting structure, trim/retime behavior, editable child content, audio context and save/reopen behavior.

## 4. Linked A/V handling is more deliberate than a flat clip export

Palmier indexes linked video/audio pairs with matching media ref, timing, duration, trim, speed and enable state. When a pair matches exactly it can export as one asset clip while retaining audio volume; otherwise compound/ref-clip handling is used where needed.

This means Golden tests must include both:

- exact linked A/V pair,
- intentionally mismatched/unlinked A/V pair.

Do not generalize from a video-only test.

## 5. Source timecode is part of transport

Palmier reads source timecodes before rendering FCPXML and emits source start timecode so Resolve does not flag a mismatch against embedded media timecode.

Golden Handoff should therefore include at least one source whose embedded start timecode is non-zero and verify:

- no false mismatch prompt,
- correct trim/source position,
- save/reopen stability.

## 6. Transport matrix reconfirmed at current source snapshot

Current source comments still explicitly classify as transported:

- clip placement/trims,
- speed,
- lane order,
- enabled state,
- text/font/face/size/color/alignment/stroke,
- position/scale/rotation/flip plus position/scale/rotation keyframes,
- crop (static),
- opacity plus keyframes,
- static volume,
- source start timecode.

Current source still explicitly classifies as not transported:

- keyframed audio volume,
- audio fades,
- text background boxes,
- crop keyframes,
- title rotation/scale,
- color/effects,
- edge softness/rounding,
- Lottie clips.

This reconfirms prior capability knowledge against a newer concrete Palmier source snapshot.

## 7. Open issue state is not capability authority

Palmier GitHub issue #154 remains open requesting professional XML/FCPXML interoperability, but current source already includes FCPXML export with Resolve targeting.

Therefore issue state alone is not current-capability evidence. Issues remain useful for intent/history/failures, but official current source outranks an old open request.

Guardrail:

`ISSUE_STATUS != CURRENT_CAPABILITY`

Evidence priority for a current implementation question:

1. current source + tests,
2. current official docs/tool definitions,
3. current release notes,
4. current issue/PR discussion,
5. community evidence.

## 8. New canaries

### PL-DV21-SCHEMA-01

Export the same synthetic Palmier timeline to Resolve-target FCPXML using schema versions 1.10 and 1.14.

In Resolve 21:

- clean import both,
- compare import warnings,
- compare timeline structure,
- inspect transform/crop/text/opacity values,
- save/reopen,
- render parity.

Prefer the lowest schema version with full required behavior unless a higher one proves a concrete benefit.

### PL-DV21-NEST-01

Synthetic project:

- parent 1920x1080 timeline,
- nested child with same geometry,
- nested child with different geometry,
- motion/text/opacity inside children,
- one linked A/V source,
- one unlinked/mismatched A/V source.

Verify Resolve 21 import structure, editability, nested timing, audio, geometry and save/reopen.

### PL-DV21-TC-01

Use media with non-zero embedded source timecode. Export Palmier Resolve-target FCPXML, import into clean Resolve 21 and verify no erroneous source-timecode mismatch and correct source trims.

## Research saturation

NO_CHANGE is false. Current Palmier source adds a previously under-modeled FCPXML schema-version dimension and confirms nested timeline/linked A/V/source-timecode behavior. Runtime backlog remains.

## Primary evidence

- `palmier-io/palmier-pro`, `Sources/PalmierPro/Export/FCPXMLExporter.swift`, commit `8805801fa4df8bc2dbc57cb0a854a1f5108f95c6`.
- `palmier-io/palmier-pro`, Agent tool definitions for `export_project` and `fcpxmlTarget`.
