# Movie Tool Learning Run 35 — Palmier FCPXML Canary Scene v2

Date: 2026-08-26  
Status: IMPLEMENTED PRE-RUNTIME / REAL PALMIER + RESOLVE ACTUAL STILL REQUIRED  
Scope: Movie Tool Learning only

## Why this run exists

Run34 corrected current Palmier FCPXML source truth, but the existing `DV21-PALMIER-FCPXML-01` synthetic scene still covered only the older matrix:

- clip placement/timing;
- transform keyframes;
- static crop;
- ordinary text;
- static volume;
- audio volume automation/fade omissions.

It did **not** force a future real Palmier/Resolve execution to exercise the newly discovered high-value boundaries:

- independent text width/height scale;
- text-scale animation;
- title-box transform scale/rotation as a distinct property family;
- two-level nested timeline transport.

Therefore source research had advanced beyond runtime-canary coverage.

```text
SOURCE_TRUTH_COVERED != CANARY_COVERAGE_COMPLETE
```

## Upstream execution-surface cross-check

Palmier current upstream tests show that the canary can be built through supported Agent/MCP surfaces rather than imagined fields.

Checked coordinate:

```text
release = v0.7.6
source commit = 8805801fa4df8bc2dbc57cb0a854a1f5108f95c6
```

Current upstream tests prove at source/test level:

- `update_text` exposes `style.widthScale` and `style.heightScale`, with accepted range 0.1...10;
- a tested example writes widthScale 1.5 and heightScale 0.75 and reads them back;
- `set_keyframes(property="scale")` can create scale animation on a text clip and `get_timeline` reads it back;
- `create_timeline` creates/switches timelines;
- `set_active_timeline` selects by timeline ID;
- `add_clips(entries[].mediaRef=<child timeline id>)` nests a timeline and creates linked video/audio carriers when applicable;
- self-nesting and empty child timelines are rejected.

This is enough to define the v2 Palmier build recipe without inventing unsupported tool fields.

It is **not** Resolve runtime evidence.

## Canary Scene v2

Canonical fixture identity becomes:

```text
schemaVersion = palmier-fcpxml-canary-scene-spec/v2
fixtureId = palmier-resolve-handoff-synthetic-scene-v2
```

The old v1 Human Master fixture remains schema-readable for evidence-history compatibility.

### Stable markers

The scene adds exact ASCII markers:

```text
PALMIER_CANARY_TEXT_SCALE
PALMIER_CANARY_TITLE_BOX_TRANSFORM
PALMIER_CANARY_NEST_L1
PALMIER_CANARY_NEST_L2
```

These names create a deterministic structural fingerprint in the real exported FCPXML.

### Independent text-scale probe

Target:

```text
widthScale = 1.5
heightScale = 0.75
scale keyframes = two distinct values
```

This tests the Run34 correction that independent text scale has its own title parameter path and must not be collapsed into the older coarse `title-rotation-scale` loss classification.

### Title-box transform omission probe

A separate title keeps independent text scale at unity while applying non-default title clip box size and 15-degree title clip rotation.

Expected current exporter structure remains:

```text
adjust-transform scale = 1 1
no title-box rotation attribute
```

This establishes a real-export fingerprint for the distinction:

```text
TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE
```

### Nested timeline probe

Build:

```text
L2 non-empty
-> nested in L1
-> L1 nested in root
```

The real FCPXML is expected to contain two named nested `media/sequence` resources and `ref-clip` carriers. Resolve import/editability remains unknown until Actual.

## New scene-contract validator

Added:

```text
motion-studio/scripts/validate-palmier-fcpxml-scene-contract.mts
```

It checks the exact completed FCPXML for:

- independent text-scale marker title;
- title-local scale param;
- scale keyframe animation;
- separate title-box transform marker;
- unity/no-rotation title-box export shape;
- L1/L2 nested media resources;
- matching ref-clip carriers.

A PASS returns:

```text
provenance = UNVERIFIED_BY_SCENE_CONTRACT
resolveRuntime = NOT_RUN
```

Therefore:

```text
SCENE_MARKER_MATCH != REAL_PALMIER_PROVENANCE
SCENE_CONTRACT_PASS != RESOLVE_IMPORT_VERIFIED
```

## Preferred v2 attachment route

Added wrapper:

```text
motion-studio/scripts/attach-palmier-canary-v2-export.mts
```

Sequence:

```text
exact Palmier completed job path
-> v2 scene-contract validation
-> existing generic structure/freshness/provenance helper
```

The generic lower-level attach helper remains unchanged for backward compatibility.

## Why this is stronger than freshness alone

Before this run, a fresh FCPXML exported from the wrong Palmier timeline could theoretically pass:

```text
structure
freshness
operator attestation
```

if the operator mistakenly selected the wrong neutral timeline.

v2 adds a separate question:

```text
Is this fresh FCPXML structurally the canary scene we intended to test?
```

This still does not prove the producing application, but it closes the wrong-timeline gap.

## CI honesty

CI may generate a hand-written validator-only FCPXML to test the validator's positive/negative behavior.

CI must never treat that file as a real Palmier export or convert the actual canary manifest to `PREPARED`.

The focused workflow checks:

- v2 spec generation stays `BLOCKED_REAL_TOOL_EXPORT_REQUIRED`;
- preparation creates no `.fcpxml`/`.xml`;
- a validator-only conforming fixture passes scene-contract checks while provenance/runtime remain unverified;
- a wrong timeline fails;
- the v2 wrapper still refuses full attachment without explicit real-Palmier attestation.

## Next runtime observations

A future real execution of `DV21-PALMIER-FCPXML-01` must now capture, separately:

- independent text width/height appearance and animation timing;
- title Inspector/editability after import;
- title-box transform omission/rebuild state;
- L1/L2 imported structure and timing;
- nested save/reopen stability;
- nested parametric editability;
- existing static volume vs audio automation/fade boundary.

No capability is promoted here.

```text
RESEARCH_SATURATED = false
```

The next high-value evidence is a real Palmier v2 export followed by Resolve Actual, not more prose about the same source behavior.
