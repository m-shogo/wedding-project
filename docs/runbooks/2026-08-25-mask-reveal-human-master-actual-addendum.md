# Mask Reveal Human Master Actual Gate — Addendum

Status: ACTIVE ADDENDUM / aligned with current SceneInstance authority  
Scope: Movie only / current `type-mask-reveal` vertical slice

Parent contracts and decisions:

1. `docs/contracts/human-readable-editable-movie-contract.md`
2. `docs/contracts/visual-scene-composer-design-rules.md`
3. `docs/decisions/2026-08-25-motion-zukan-output-format-clarification.md`
4. `docs/decisions/2026-08-25-motion-zukan-preset-first-davinci-value-bridge.md`
5. `docs/decisions/2026-08-26-motion-zukan-property-stack-customization.md`
6. `docs/runbooks/2026-08-25-mask-reveal-davinci-applied-evidence-gate.md`
7. `docs/runbooks/2026-08-25-mask-reveal-local-davinci-actual-gate.md`

This addendum does **not** restart or replace the current Mask Reveal work. It defines the Human Master requirements that must survive Palmier / DaVinci execution.

## Core authority

The master production authority is the human-readable, human-editable adopted SceneInstance state.

For the current slice:

```text
authority = HUMAN_MASTER
```

`HUMAN_SELECTED` and `LOCKED` values override:

- DEFAULT
- AI_SUGGESTED
- Claude/Codex decisions
- Palmier approximation
- automation defaults
- preset/recipe updates
- derived DaVinci implementation values

If a locked value cannot be implemented safely, report the conflict. Do not silently replace it.

## Source of Truth vs serialization

The **Source of Truth** is the human-readable Scene meaning and its property-level decision state.

JSON / XML / NLE XML are not the Human Master themselves. They may serialize or transport the current Scene state.

Correct relation:

```text
Human-readable Scene values
→ Canonical Scene state
→ optional JSON sidecar serialization
→ target-specific tool values
→ applied/readback evidence
→ Actual render evidence
```

If an older note says `Editable Source of Truth JSON`, interpret it as **a serialized snapshot of the Human Master**, not as authority independent of the SceneInstance.

## Required human-readable Scene snapshot

Before the first real DaVinci render, preserve a fresh snapshot of the current adopted SceneInstance containing at minimum:

```text
sceneId
sourceRevision = SceneInstance.updatedAt
sceneMarkerId
Text
Image / Video intent
Scene Duration
Layer Delay
Motion Delay
Enter Motion
Enter Duration
Hold Motion
Hold Duration
Exit Motion
Exit Duration
Stagger Delay
Position Preset
Position X / Y
Position Offset X / Y
Direction
Distance
Scale From / To
Crop / Focus
Intensity
DEFAULT / AI_SUGGESTED / HUMAN_SELECTED / LOCKED state
AI recommendation reason where present
```

The current editable schema remains:

`human-editable-motion/v1`

The production sidecar may serialize these values, but serialization format must not become a competing authority.

## Pre-render gate

Before creating the disposable DaVinci animation/render:

1. choose one adopted SceneInstance;
2. record its current `sceneId` and `sourceRevision`;
3. resolve effective Human values;
4. resolve Canonical Scene state;
5. record HUMAN_SELECTED fields;
6. record LOCKED fields;
7. generate a fresh Scene production bundle/sidecar serialization;
8. read live Resolve Project Context;
9. derive DaVinci implementation values from Canonical values + live context.

Do not start from hard-coded Fusion numbers when a human-readable value already exists.

Implementation-specific Text+ coordinates, Rectangle Mask controls, keyframe frames, and Spline handles are derived detail/evidence.

## Neutral WELCOME proof

The neutral proof still uses:

- sample: `sample-typography-welcome-v1`
- text: `WELCOME`
- requested target: 1280 × 720 / 30fps / ~4 sec / muted
- no real wedding media

These target properties do not override the adopted Scene's editable animation values.

Do not copy a fixed `0.8 sec` reveal duration merely because an older example used it. Use the current Scene's resolved duration and derive representable frames from the live project fps.

## DaVinci application and applied evidence

When implementing in DaVinci:

1. read current Human values;
2. resolve Canonical state;
3. capture live Resolve identity/context;
4. derive expected DaVinci values;
5. apply the minimum built-in Text+ / Fusion / Rectangle Mask implementation;
6. capture actual readback where supported;
7. compare expected vs applied/readback;
8. preserve delta separately;
9. render the neutral Actual Preview;
10. compare the result back to the Human meaning.

Use the evidence chain:

```text
Human value
→ Canonical value
→ live-context expected value
→ applied/readback value
→ delta
→ Actual DaVinci MP4
```

The real `Actual DaVinci MP4` is **Implementation Evidence**. It does not become the editable source of truth.

A visually good render that silently violates a locked value is a failed implementation.

## Property Stack / Property-local correction gate

For Mask Reveal v1, only the Properties actually used by the Motion are in scope:

```text
Transform
Mask
```

Property-local correction gate:

- Position-only correction should not silently rewrite Mask/Text/Media/Hold.
- Delay-only correction should not reselect media or replace the Motion.
- Direction/Mask correction should not silently reset Transform values.
- If a real secondary dependency exists, record the exact dependency and exact secondary Property.

Preset/AI updates must not overwrite HUMAN_SELECTED / LOCKED values.

## Palmier delta gate

For scratch Palmier handoff, preserve three concepts separately:

```text
Human Decision
Palmier Applied Value
Difference / Delta
```

Palmier approximation is capability evidence. It must not overwrite the intended Human/DaVinci finish values.

The project-level handoff remains conceptually:

```text
Palmier real project timeline NLE XML
+
fresh Scene-specific Motion Handoff sidecar
```

Use the current Scene-specific marker generated from the Scene production bundle. Do not hard-code a Pattern-only marker when the current Scene marker is available.

## Freshness gate

The Scene production bundle/readback must match the current:

```text
sceneId
sourceRevision
```

If `SceneInstance.updatedAt` changes, older sidecar/readback evidence is STALE and must be regenerated.

Never apply stale derived values to a newer Human Scene revision.

## Promotion gate

Mask Reveal is not complete merely because `ACTUAL_DAVINCI_RENDER` exists.

Before `TESTED / PRODUCTION_READY` promotion, require both:

### Implementation proof

- local Resolve version/context
- expected vs applied/readback evidence
- Actual DaVinci render
- 1x Visual QA
- 0.5x Visual QA
- checksum/provenance
- Concept/Actual separation

### Human-editability proof

- fresh adopted Scene snapshot exists
- important values are human-readable
- HUMAN_SELECTED / LOCKED survives handoff
- applied/readback is compared to the current Scene revision
- one-property correction can be expressed without scene-wide regeneration
- Palmier applied/delta evidence does not replace Human intent

If either group is incomplete, keep Production Ready false.

## Final completion chain

```text
Visual Motion Library
→ adopted Human Master SceneInstance
→ Human values / property decisions
→ Canonical Scene state
→ fresh production bundle
→ Palmier Rough
→ real project NLE XML + Scene sidecar
→ DaVinci import / Scene marker match
→ live-context expected values
→ applied/readback + Difference / Delta
→ Actual DaVinci MP4
→ 1x / 0.5x QA
→ locks / property-local integrity / provenance preserved
→ verified UI preview
```

The human must still be able to answer:

> 「位置だけ直したい」「Delayだけ直したい」「Holdだけ長くしたい」時に、どの値を変えればいいか？

If that is not obvious, the vertical slice is not finished.
