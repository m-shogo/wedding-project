# Mask Reveal Human Master Actual Gate — Addendum

Status: ACTIVE ADDENDUM  
Scope: Movie only / current `type-mask-reveal` vertical slice  
Parent contracts:

1. `docs/contracts/human-readable-editable-movie-contract.md`
2. `docs/contracts/visual-scene-composer-design-rules.md`
3. `docs/runbooks/2026-08-25-mask-reveal-local-davinci-actual-gate.md`

This addendum does **not** restart or replace the current Mask Reveal work. It adds the Human Master requirements to the existing Palmier / DaVinci Actual execution path.

## Core authority

The master production authority is the human-editable scene intent, not an MP4, not a Fusion graph, and not an AI score.

Current implementation files:

- `movie-dashboard/src/data/humanEditableMotionIntent.ts`
- `movie-dashboard/src/data/maskRevealEditableProduction.ts`
- `movie-dashboard/src/components/MaskRevealEditableWorkspace.tsx`
- `movie-dashboard/src/data/maskRevealHandoff.ts`

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
- DaVinci handoff generation

If a locked value cannot be implemented safely, report the conflict. Do not silently replace it.

## Required human-readable source of truth

Before the first real DaVinci render, create/export a snapshot of the current editable intent containing at minimum:

```text
Text
Image / Video
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

The current schema authority is:

```text
human-editable-motion/v1
```

The generated production/handoff projection may evolve independently, but it must continue to reference the same human-editable intent.

## Pre-render snapshot gate

Before creating the disposable DaVinci animation/render:

1. resolve the current effective values from the Human Master state;
2. save/export the `Editable Source of Truth JSON`;
3. record the list of `HUMAN_SELECTED` fields;
4. record the list of `LOCKED` fields;
5. record AI suggestion + reason separately from effective human values;
6. use those effective values to create the DaVinci implementation.

Do not start from hard-coded Fusion numbers when a human-readable production value already exists.

Implementation-specific values such as exact Text+ coordinates, Rectangle Mask controls, keyframe frame numbers, or Spline handles are derived detail/evidence.

## Neutral WELCOME proof values

The neutral proof still uses:

- sample: `sample-typography-welcome-v1`
- text: `WELCOME`
- 1280 × 720
- 30fps
- 4-second neutral preview target
- muted
- no real wedding media

But the actual animation must now also be recoverable from the Human Master intent.

Example expected readable structure:

```text
Scene Duration: 4.0 sec
Text: WELCOME
Layer Delay: 0.6 sec
Motion Delay: 0.0 sec
Enter Motion: MASK_REVEAL
Enter Duration: 0.6 sec
Hold: 2.8 sec
Direction: UP / 下からスッと
Position: BOTTOM_RIGHT
X: 80%
Y: 78%
Distance: 12%
Scale: 100% → 100%
Intensity: S / 弱
```

These are editable defaults/suggestions unless the human selects/locks them. Do not reinterpret this example as a new immutable preset.

## DaVinci application gate

When implementing in DaVinci:

1. read Human Master effective values;
2. derive the minimum Text+ / Fusion / Rectangle Mask / Keyframe values needed;
3. record any derived values separately;
4. render the neutral Actual Preview;
5. compare the rendered result back to the human-readable source of truth.

The comparison must answer understandable questions:

- Did the text start at the intended delay?
- Did the enter motion use the intended direction?
- Did it settle at the intended position?
- Was motion duration close to the intended duration?
- Was the hold/read interval preserved?
- Did Scale / Distance / Intensity remain within the intended meaning?
- Were all `LOCKED` values preserved?

A visually good render that silently violates a locked value is a failed implementation.

## Actual render evidence boundary

The real DaVinci MP4 remains:

```text
Implementation Evidence
```

It does not become:

```text
Source of Truth
```

The correct relation is:

```text
Human Editable Intent
        ↓
DaVinci derived implementation
        ↓
Actual DaVinci Render
        ↓
Visual / timing / provenance evidence
```

Do not reconstruct future editable state by reverse-engineering only the MP4.

## Palmier delta gate

For the scratch Palmier handoff, preserve three concepts separately:

```text
Human Decision
Palmier Applied Value
Difference / Delta
```

Examples:

```text
Human Layer Delay: 0.8 sec
Palmier Applied: 0.65 sec
Delta: -0.15 sec
```

```text
Human Position: BOTTOM_RIGHT
Palmier Applied: approximate lower-right placement
Delta: APPROX_POSITION
```

Palmier approximation is evidence about tool capability. It must not overwrite the intended DaVinci finish value.

## NLE XML + sidecar

Continue the existing two-file authority:

```text
Palmier real timeline NLE XML
+
Motion Handoff Manifest JSON
```

Do not generate fake NLE XML from app code.

The sidecar must include or reference:

- Human Master editable source of truth
- effective values
- human-selected fields
- locked fields
- Palmier intended/applied/delta evidence when available
- DaVinci implementation ID
- Actual verification evidence

## Property-local correction gate

When reviewing the Actual render, corrections must be property-local whenever possible.

Examples:

```text
Position: BOTTOM_RIGHT → BOTTOM_LEFT
```

must not implicitly change:

- Text
- media
- Crop / Focus
- Scene Duration
- Hold
- Enter Motion

Likewise:

```text
Enter Duration: 0.6 → 0.8 sec
```

must not reselect the image, rewrite the title, or replace the motion pattern.

If a dependency requires a secondary change, record the dependency and the exact secondary property affected.

## Scene Composer compatibility

Do not create a second unrelated data model for Scene Composer.

Current direction:

```text
MotionPattern
→ MotionInstance
→ SceneRecipe
→ SceneInstance
→ ProjectTimeline
```

The current Mask Reveal editable intent proves the MotionInstance/SceneInstance-level human-editable values. Future Scene Composer adoption should reuse these concepts rather than flattening the scene into a rendered asset.

Do not mass-migrate 36 Motion Kit / 97 Director Recipes for this addendum.

## Promotion gate update

Mask Reveal is not complete merely because `ACTUAL_DAVINCI_RENDER` exists.

Before `TESTED / PRODUCTION_READY` promotion, require both:

### Implementation proof

- local Resolve version
- actual DaVinci render
- 1x Visual QA
- 0.5x Visual QA
- checksum/provenance
- Concept/Actual separation

### Human-editability proof

- editable source of truth snapshot exists
- important fields are understandable
- HUMAN_SELECTED / LOCKED state survives handoff
- Actual implementation is compared against human-readable intent
- a one-property correction can be expressed without scene-wide regeneration
- Palmier applied/delta evidence does not replace human intent

If either group is incomplete, keep Production Ready false.

## Final completion chain

The current vertical slice succeeds only when this is real:

```text
Visual Motion Library
→ Human Master editable Mask Reveal intent
→ Prompt projections
→ Palmier Rough
→ real NLE XML + sidecar
→ DaVinci import
→ derived Text+ / Fusion implementation
→ Actual DaVinci MP4
→ 1x / 0.5x QA
→ compare Actual back to Human Master values
→ preserve locks / deltas / provenance
→ verified UI preview
```

The human must be able to answer after completion:

> 「位置だけ直したい」「Delayだけ直したい」「Holdだけ長くしたい」時に、どの値を変えればいいか？

If the answer is not obvious, the slice is not finished.
