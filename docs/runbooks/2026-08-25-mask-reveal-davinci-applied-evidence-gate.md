# Mask Reveal DaVinci Applied-Value Evidence Gate

Status: ACTIVE / MUTABLE  
Scope: Movie only / current `type-mask-reveal` Vertical Slice

Parent authority:

- `docs/contracts/human-readable-editable-movie-contract.md`
- `docs/decisions/2026-08-25-motion-zukan-preset-first-davinci-value-bridge.md`
- `docs/decisions/2026-08-25-motion-zukan-output-format-clarification.md`
- `docs/decisions/2026-08-26-motion-zukan-property-stack-customization.md`
- `docs/runbooks/2026-08-25-mask-reveal-sceneinstance-handoff-addendum.md`

This gate does not restart the Mask Reveal work. It defines how the already-adopted Human Master Scene is compared with the values actually applied/read back from local DaVinci Resolve.

## Authority chain

Use this order:

```text
Human-readable Scene values
→ Canonical structured scene state
→ live Resolve Project Context
→ expected DaVinci implementation values
→ applied/readback values
→ delta/comparison evidence
→ Actual render
```

Never reverse this chain.

DaVinci readback, Fusion node values, frame numbers, JSON and MP4 are evidence/serialization. They do not automatically replace `HUMAN_SELECTED` or `LOCKED` values.

## Property Stack boundary

For the current Mask Reveal Vertical Slice, do not build a universal Inspector.

Only the Property units actually used by this Motion are part of this evidence gate:

```text
Transform
Mask
```

Mask Reveal v1 does not require unrelated Blur / Perspective / extra Opacity stacks merely to satisfy a generic schema.

Property-local review must preserve the rule:

> Preset First → Property-local Override → DaVinci Final Precision.

If Position is corrected, do not silently change Mask, Text, Media, Hold, or another unrelated Property. If a secondary dependency is genuinely required, record its exact Property and reason.

## Source revision gate

Every local execution must start from one adopted `SceneInstance` and its current:

```text
sceneId
sourceRevision = SceneInstance.updatedAt
sceneMarkerId
```

The sidecar export and DaVinci readback must use the same `sceneId` and `sourceRevision`.

If `SceneInstance.updatedAt` changes after the sidecar/readback was created, the old execution evidence is STALE. Regenerate from the current Scene before applying anything else.

## Preview target vs live Project Context

For the neutral Vertical Slice, the requested preview target remains:

```text
1280 × 720
30fps
WELCOME
muted
```

This requested target is not proof of the actual local Resolve timeline context.

Before authoring keyframes, read the real local timeline/project context and record:

- width
- height
- fps
- Resolve product/version
- MCP version when available
- transport
- project name
- timeline name

Then derive the expected implementation values again using the live Project Context.

Example:

```text
Human Layer Delay = 0.6 sec
live fps = 30
expected = 18 frames
```

If live fps were different, keep `0.6 sec` as the Human Master meaning and recompute frames. Do not change the human value merely to preserve an old frame number.

## Readback schema

Use:

`movie-dashboard/src/data/maskRevealDaVinciAppliedEvidence.ts`

Pending evidence starts as:

```text
schemaVersion = davinci-applied-evidence/v1
authority = EVIDENCE_ONLY
status = PENDING_LOCAL_DAVINCI
productionReady = false
```

Actual local readback uses:

```text
schemaVersion = davinci-applied-readback/v1
```

Record only values actually obtained or independently reviewed. Leave unavailable values null; do not guess them.

Useful readbacks include:

- StyledText
- Text+.EffectMask / Rectangle Mask connection
- layer delay frames
- motion delay frames
- enter duration frames
- hold duration frames
- exit duration frames
- final normalized position where the local API can prove it
- direction where independently provable
- distance/scale where independently provable
- reviewed LOCKED fields
- Property-local review for Transform / Mask
- automation gap, if any

## Comparison

The comparison authority is:

```text
expectedSource = CANONICAL_SCENE_STATE_WITH_LIVE_PROJECT_CONTEXT
```

For each provable property preserve both:

```text
expected
applied/readback
delta
```

A non-zero delta is not automatically failure. It must be interpreted according to whether the property is locked, whether DaVinci requires frame rounding, and whether the difference changes the human-readable intent.

A `LOCKED` value that is silently violated is failure.

`propertyLocalIntegrity=false` is also a review failure until the unrelated change is explained and either reverted or recorded as a real dependency.

## Frame rounding

Seconds remain Human Master.

Frame conversion uses the live project fps and may round to the closest representable frame. Preserve both forms:

```text
seconds
expected frames
applied frames
delta frames
```

Do not back-write rounded frame values into the human seconds field automatically.

## Property-local correction

If comparison/visual QA shows one property needs correction, change that human-readable property only unless a real dependency requires another change.

Examples:

```text
Position only
Delay only
Hold only
Distance only
```

For Mask Reveal, group review under the active Property units:

```text
Transform: Position / Distance / Scale / motion timing
Mask: connection / reveal direction / mask behavior
```

Do not regenerate unrelated Text / Media / Crop / Timing / Motion properties.

If a secondary dependency is required, name the exact dependency and the exact secondary property before changing it.

## Actual render gate

Readback alone is not completion.

After implementation/readback:

1. render from local DaVinci
2. collect file/hash/codec/dimensions/fps/duration/version
3. QA at 1x
4. QA at 0.5x
5. keep Concept evidence separate
6. update Actual verification using measured facts only

`productionReady` remains false until all required Actual gates pass.

## Palmier handoff

For Project-level Palmier handoff use the real Palmier NLE XML plus the fresh Scene sidecar export.

The Scene-specific marker from the current production bundle is authoritative for identifying the Scene in production handoff:

```text
VML_MASK_REVEAL_<SECTION>_<SCENE_TOKEN>
```

Do not fall back to the old Pattern-only marker when multiple SceneInstances are present.

Palmier approximation must preserve:

```text
intended Human value
applied value
delta
```

and must never rewrite Human Master values.

## Completion condition

This gate passes only when a reviewer can trace:

```text
Human Scene value
→ Canonical value
→ live-context expected DaVinci value
→ applied/readback value
→ delta
→ Property-local integrity
→ Actual render evidence
```

and can still answer clearly which human-readable property to edit for a one-property correction.
