# Visual Scene Composer Design Rules

Status: ACTIVE / MUTABLE  
Scope: `wedding-project` Movie only  
Parent contract: `docs/contracts/human-readable-editable-movie-contract.md`

## Purpose

Visual Scene Composer is not a full NLE and not an autonomous 90-second movie generator.

It is a human-editable scene design tool where a person can **see, choose, insert, adjust, adopt, and accumulate scenes** without needing to know motion terminology or DaVinci/Fusion internals.

The intended flow is:

`Visual Motion Library → Scene Recipe Library → Scene Composer → Adopt Scene → Project Timeline → Human / Claude / Palmier / DaVinci / JSON outputs`

The parent Human-Readable / Human-Editable Movie Contract always wins when this document conflicts with it.

---

## 1. Core data hierarchy

Keep these concepts separate:

```text
MotionPattern
  ↓
MotionInstance
  ↓
SceneRecipe
  ↓
SceneInstance
  ↓
ProjectTimeline
```

### MotionPattern

Reusable semantic motion, for example:

- Mask Reveal
- Gentle Push
- Character Stagger
- Directional Pan

A MotionPattern describes **what kind of motion it is**, not the final scene.

### MotionInstance

A MotionPattern plus human-editable parameters for one use:

- duration
- delay
- direction
- distance
- intensity
- scale
- easing class/preset when needed

### SceneRecipe

A reusable combination and useful starting point.

Example:

```text
Travel Location Reveal
Image: Gentle Push
Text: Mask Reveal
Text Delay: 0.6 sec
Position: Bottom Right
```

A recipe is a **template/default**, never the final authority after the user edits it.

### SceneInstance

The adopted, project-specific scene with actual image/video/text/timing/position/motion values.

This is the main human-editable production unit.

### ProjectTimeline

Ordered SceneInstances plus inter-scene relationships, total duration, audio/beat references, and project-level output settings.

---

## 2. Scene Composer starts from intent, not technical jargon

The Composer should first help answer:

> このSceneの主役は何か？

Recommended simple choices:

- 写真
- 文字
- 複数写真
- 場面転換
- 盛り上がり

This becomes scene hierarchy, for example:

```text
Primary: IMAGE
Secondary: TEXT
Accent: GRAPHIC
```

The UI should then filter/recommend appropriate motions instead of showing every possible motion equally.

This is a UX mechanism for enforcing hierarchy, not merely a warning message.

---

## 3. One strong primary motion per scene

Default rule:

- one strong primary motion
- optional subtle secondary motion
- accents only when they support the primary subject

Do not make every layer move strongly at the same time.

A scene may internally have multiple MotionInstances, but visual hierarchy must remain obvious.

When useful, show a non-blocking complexity indicator such as:

- Calm
- Balanced
- Busy

Do not create an opaque `motionMagicScore` as authority. The indicator must be derived from understandable motions and layer roles.

---

## 4. Layers remain independently editable

Default conceptual layers:

- IMAGE / VIDEO
- TEXT
- GRAPHIC
- AUDIO / TIMING reference

Image/video motion and text motion must remain separate.

A user must be able to change only:

```text
Text Enter Motion: Mask Reveal → Fade Up
```

without changing:

- image choice
- crop
- image motion
- scene duration
- unrelated text

Do not regenerate unrelated properties unless an explicit dependency requires it.

---

## 5. Scene time has target and computed truth

There are two useful concepts:

### Target / Budget Duration

What the user intends, for example:

```text
このSceneは4秒くらい
```

### Computed Duration

The actual structural end time:

```text
computedSceneDuration = max(layerStartOffset + layerVisibleDuration)
```

The computed duration is the structural truth.

The target duration is a planning constraint/default.

If they differ, do not silently stretch or truncate human-selected values. Show the difference and let the user adjust the relevant layer/timing.

---

## 6. Motion duration and visible duration are separate

A layer may remain visible after motion finishes.

Example:

```text
Image Visible: 5.0 sec
Motion: 2.0 sec
Hold: 3.0 sec
```

For text, prefer phases:

```text
Enter: 0.6 sec
Hold: 2.8 sec
Exit: 0.5 sec
```

Profile Movie defaults should generally preserve longer reading/hold intervals than Opening Movie defaults.

---

## 7. Delay types stay distinct

At minimum preserve:

- Layer Delay / Start Offset
- Motion Delay
- Stagger Delay

Do not collapse them into one generic `delay` when the behaviors are different.

User-facing wording may stay simple, but the structured state must retain the distinction.

---

## 8. Position and motion direction are different

Position answers:

> どこに置く？

Direction answers:

> どちらから／どちらへ動く？

Use 9-grid position presets first:

- top-left
- top
- top-right
- left
- center
- right
- bottom-left
- bottom
- bottom-right

Then allow small percentage offsets.

Example:

```text
Position Preset: bottom-right
Offset X: -3%
Offset Y: -2%
```

Do not force users to edit raw X/Y before presets.

---

## 9. Motion distance and scale use understandable presets first

Prefer:

```text
Distance: Small / Medium / Large
Intensity: Weak / Normal / Strong
```

with detailed numeric values available in the Detail layer.

Scale should be visible in human-readable form, for example:

```text
100% → 104%
```

Preset values must be visually QA'd. A preset is not valid merely because a mathematically neat number was chosen.

---

## 10. UI progressive disclosure

Default UI order:

```text
かんたん
↓
詳細
↓
DaVinci
```

### かんたん

Examples:

- 写真を見せる時間: 5秒
- 動く時間: 2秒
- 止まって見せる時間: 3秒
- 位置: 右下
- 写真の動き: ゆっくり寄る
- 文字の登場: 下からスッと
- 強さ: 弱

### 詳細

Examples:

- X / Y
- Position Offset
- Layer Delay
- Motion Delay
- Motion Duration
- Stagger Delay
- Scale start/end
- Distance
- Enter / Hold / Exit
- Crop / Focus

### DaVinci

Only expose when useful:

- Text+
- Fusion
- Keyframe
- Spline
- Mask
- Motion Blur
- implementation-specific settings

The Scene Composer must not become a thin clone of DaVinci's inspector.

---

## 11. Preview has two different jobs

Do not mix these concepts.

### Neutral Motion Preview

Uses common sample assets/text so motions can be compared fairly.

Purpose:

> この動き自体を選ぶ

Useful controls:

- loop
- 0.5x / 1x
- before/after when meaningful
- truthful provenance

### Actual Scene Preview

Uses the user's selected image/video/text and current SceneInstance values.

Purpose:

> 自分のSceneとして成立するか確認する

Both are valuable and should remain conceptually distinct.

---

## 12. Preview provenance remains mandatory

Use truthful provenance such as:

- ACTUAL_DAVINCI_RENDER
- ACTUAL_PALMIER_RENDER
- REPO_GENERATED
- OFFICIAL_EXTERNAL_REFERENCE
- CONCEPT_ONLY
- MISSING

Never show a concept/Remotion preview as if it proves actual DaVinci implementation.

An MP4 is evidence, not the editable source of truth.

---

## 13. Transitions belong to the edge between scenes

A transition conceptually connects two SceneInstances.

Prefer project timeline structure such as:

```text
Scene A
  ↓
SceneEdge / Transition
  ↓
Scene B
```

rather than pretending every transition is owned entirely by Scene A or Scene B.

This avoids ambiguity when reordering, duplicating, or deleting scenes.

A hard cut is also a valid edge state.

---

## 14. Audio is primarily project/timeline-level

For MVP, do not duplicate full audio state inside every scene.

Prefer project/timeline-level audio with references from scenes:

- time marker
- beat marker
- phrase marker
- section cue

A SceneInstance may reference a cue but should not become an independent mini audio editor.

---

## 15. Safe Area and output profile are project defaults

Aspect ratio, frame size, title-safe/action-safe, and output profile should normally be project/output settings inherited by scenes.

Allow scene-level exceptions only when needed.

Do not require each layer to manually redefine the same safe-area information.

---

## 16. Opening and Profile share one Composer

Do not fork unrelated systems.

Same structural values, different defaults:

### Opening defaults

- shorter scenes
- shorter holds
- stronger accent allowed
- faster transitions where appropriate

### Profile defaults

- longer reading holds
- restrained motion
- readability and photo recognition prioritized

These are defaults/recommendations, not hard restrictions.

---

## 17. AI assembles; human directs

AI may:

- recommend MotionPatterns
- recommend position with reason
- recommend timing with reason
- fill defaults
- assemble selected SceneRecipes
- detect conflicts
- generate handoff outputs

AI must not silently replace human-selected/locked production decisions.

The user remains responsible for the creative intent:

- which photo/video
- which scene/recipe
- how long to show it
- text
- position
- intensity
- overall feeling

AI reduces technical friction; it does not become the autonomous director.

---

## 18. Recommendations preserve reason and state

Where useful:

```text
AI Suggested: left-bottom
Reason: subject occupies the right side
Human Selected: right-bottom
Locked: true
```

The reason is useful for both learning and review.

Do not convert small amounts of accepted evidence into rigid global rules.

---

## 19. Scene adoption creates an instance, not a link to a mutable recipe

When the user presses `採用`:

- create/update a SceneInstance
- copy the recipe defaults as editable initial values
- preserve recipe provenance/reference
- subsequent recipe changes must not silently rewrite human-selected SceneInstance values

The adopted scene should immediately affect the Project Timeline duration/budget.

---

## 20. Structured timeline is authority for all outputs

Do not maintain separate hand-edited giant prompts as competing authorities.

One structured Scene Timeline should generate:

- Human Brief
- Claude Creative Instruction
- Palmier Instruction
- DaVinci Finish Manifest
- JSON / machine-readable representation

Each output is a projection of the same human-editable scene state.

---

## 21. Palmier and DaVinci roles

### Palmier

Rough production:

- trim
- split
- order
- rough timing
- rough motion when supported
- rough typography placement

### DaVinci Resolve

Final precision:

- exact timing
- typography
- Edit / Text / Text+
- Fusion
- Color
- Fairlight
- crop/focus
- easing
- motion polish
- final export

Palmier approximation must not overwrite the intended DaVinci finish values.

---

## 22. Reuse Before Build remains mandatory

Before custom motion implementation, prefer:

1. DaVinci built-in
2. Fusion built-in
3. Blackmagic official asset/template
4. `.drfx`
5. `.setting`
6. Reactor
7. license-confirmed free DaVinci asset
8. purchased asset when justified
9. existing repo implementation
10. custom implementation

The goal is not to invent a unique implementation for every motion name.

---

## 23. Existing asset counts are not product requirements

Do not preserve `36 Motion Kit` or `97 Director Recipes` merely because those counts already exist.

Classify existing assets as needed:

- KEEP
- MERGE
- SPLIT
- RENAME
- DEPRECATE
- REFERENCE_ONLY

Do not mass-migrate or mass-rebuild old assets only to satisfy this rule set.

Apply the rules incrementally when an asset is touched, reused, reviewed, or promoted.

---

## 24. Legacy Scene model migration must be non-destructive

The existing movie-dashboard Scene model is already used by storyboard/local state.

Do not immediately overload or destructively replace the legacy flat Scene shape just to add Composer fields.

Preferred migration direction:

```text
Legacy Scene
  ↕ sceneId
ComposerSceneDetail / SceneInstance
```

Prove the Composer model first. Only promote it to wider authority after migration/compatibility is verified.

---

## 25. MVP intentionally stays smaller than an NLE

For the first complete vertical slices, prefer enough capability to prove the product loop rather than unlimited layers/tracks.

Recommended proof:

```text
HAWAII scene
Image: 1
Text: HAWAII
Image Motion: Gentle Push
Text Motion: Mask Reveal
Text Delay: 0.6 sec
Position: Bottom Right
Target: 4 sec
Preview
→ Adopt
→ Timeline total +4 sec
→ Human / Palmier / DaVinci outputs
```

Then prove:

1. Hero Scene
2. Profile Scene with multiple photos and longer hold

Do not build a general-purpose track editor before these loops work end-to-end.

---

## 26. Definition of done for a Scene Composer slice

A slice is not done only because a preview/video exists.

It is done when a person can:

1. find the motion/recipe without knowing the technical name;
2. understand what the scene's primary subject is;
3. insert actual media/text;
4. understand and locally edit timing/motion/position values;
5. see hold/reading time;
6. distinguish AI suggestion from human decision;
7. lock important values;
8. preview with truthful provenance;
9. adopt a SceneInstance;
10. see its effect on the Project Timeline;
11. generate consistent Human / Palmier / DaVinci outputs;
12. later understand exactly what to change without rebuilding the whole scene.

## Core principle

> **見て選び、人間が意味を理解できる値だけを必要な分だけ直し、そのままSceneとして積み上げられること。**

The Composer should remove the need to know motion vocabulary while preserving the ability to make precise human corrections later.
