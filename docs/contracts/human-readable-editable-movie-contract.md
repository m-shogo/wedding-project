# Human-Readable / Human-Editable Movie Contract

Status: ACTIVE / CROSS-CUTTING  
Scope: `wedding-project` Movie only  
Applies to: Opening / Profile / Visual Motion Library / Scene Recipe / Scene Composer / Prompt Generator / Palmier Handoff / DaVinci Handoff / Movie Review / Learning / existing Remotion previews and legacy Movie assets where they are still active or referenced.

## Purpose

This project is not an AI-first video generator. It is a **human-editable wedding movie production system assisted by AI**.

The source of truth must remain understandable and repairable by a person.

The intended loop is:

`AI suggests/assembles → human understands → human edits only the intended value → Palmier rough → DaVinci final → accepted human decision becomes reusable evidence`

AI output is not final authority.

## 1. Human-readable values are canonical

Prefer values whose visible meaning is obvious to a person:

- Scene duration
- layer start / delay
- motion delay
- motion duration
- hold duration
- stagger delay
- position
- direction
- distance
- scale
- enter / hold / exit motion
- crop/focus
- text
- media asset
- intensity
- section role

Do not make opaque AI-only scores the production authority.

Bad source of truth:

```text
creativeEnergy = 0.73
cinematicness = 0.82
motionMagic = 0.61
```

Good source of truth:

```text
Scene Duration = 5.0 sec
Text Delay = 0.8 sec
Text Position = Bottom Right
Enter Motion = Mask Reveal
Enter Duration = 0.6 sec
Image Motion = Subtle Push
Image Scale = 100% → 104%
```

Internal normalized values may exist, but they must be derived from a human-readable value and never replace it as the only explanation.

## 2. AI suggestion and human decision are separate states

For editable production values, preserve these concepts where useful:

```text
DEFAULT
AI_SUGGESTED
HUMAN_SELECTED
LOCKED
```

Example:

```text
Text Position
DEFAULT: center
AI_SUGGESTED: left-bottom
reason: subject occupies the right side
HUMAN_SELECTED: right-bottom
LOCKED: true
```

Rules:

- `HUMAN_SELECTED` wins over `AI_SUGGESTED`.
- `LOCKED` values must not be silently changed by Claude, Codex, Palmier, automation, migration, preset updates, or DaVinci handoff generation.
- When no human decision exists, AI may propose a default, but must keep the proposal identifiable as a proposal.
- Do not rewrite unrelated human-selected properties when one property is changed.

## 3. Human correction must be local, not regeneration-first

A person should not need to reprompt the whole scene to change one value.

Bad workflow:

`"もう少し左" → AI regenerates scene → timing/crop/text also change`

Preferred workflow:

`Text Position: Right Bottom → Left Bottom`

Only the selected property changes unless another dependency is explicitly required.

This principle applies to:

- position
- delay
- duration
- motion choice
- motion strength
- crop/focus
- scale
- text
- scene duration
- image/video choice
- transition

## 4. Beginner → detail → DaVinci progressive disclosure

User-facing controls should expose three levels when useful.

### Easy

```text
位置: 右下
画像の動き: ゆっくり寄る
文字の登場: 下からスッと
強さ: 弱
少し待ってから表示
```

### Detail

```text
X: 80%
Y: 78%
Scale: 100% → 104%
Delay: 0.8 sec
Duration: 0.6 sec
Ease: Ease Out
```

### DaVinci

Only when necessary:

```text
Text+
Fusion node
keyframe
Spline
mask
motion blur
```

Do not expose every DaVinci parameter in the Scene Composer simply because it exists.

## 5. Presets are editable defaults, not immutable templates

A Scene Recipe or Motion preset provides useful starting values.

Example:

```text
Travel Location Reveal
Image Motion: Subtle Push
Text Motion: Mask Reveal
Text Delay: 0.6 sec
Position: Bottom Right
```

Every relevant value remains human-editable.

A preset update must not silently overwrite an existing human-selected production decision.

## 6. Structured scene state is more important than rendered output

The editable scene structure is authoritative; MP4/WebM is an evidence/render output.

A useful scene remains reconstructable from values such as:

```text
asset
text
sceneDuration
layerStart
motionDelay
motionDuration
hold
position
direction
distance
scale
enter/hold/exit
intensity
```

Do not reduce an accepted Scene to a flattened render if its editable structure can be preserved.

## 7. Image and text motion remain independently editable

Image/video motion and typography motion are separate concerns.

Example:

```text
IMAGE
Subtle Push
Duration: 5 sec

TEXT
Mask Reveal
Start: 0.8 sec
Duration: 0.6 sec
Position: Bottom Right
```

A user must be able to replace only `Mask Reveal` without rebuilding the image motion, or replace the image motion without changing the text choice.

## 8. Total duration, motion duration, and hold are explicit

Do not assume a layer must move for its full visible duration.

Example:

```text
Image Total: 5 sec
Motion: 2 sec
Hold: 3 sec
```

For text, prefer explicit phases:

```text
Enter: 0.6 sec
Hold: 2.8 sec
Exit: 0.5 sec
```

The hold/reading interval is a first-class production value, especially for Profile Movie.

## 9. Delay is a first-class editable value

Distinguish at least:

- Layer Delay / start offset
- Motion Delay
- Stagger Delay

Do not collapse all delay behavior into an opaque preset.

## 10. Position is human-friendly first

Prefer presets first:

- top-left
- top
- top-right
- left
- center
- right
- bottom-left
- bottom
- bottom-right

Store/derive percentage positions when useful:

```text
X: 0–100%
Y: 0–100%
```

Allow small percentage offsets for correction.

Position and motion direction are separate values.

## 11. AI recommendations should explain why

When AI proposes a value, store/show a short human-readable reason when useful.

Examples:

```text
Recommended position: Left Bottom
Reason: the subject occupies the right side of the photo.
```

```text
Recommended Text Delay: 0.8 sec
Reason: show the photo first, then introduce the title.
```

The reason is a learning aid, not an unquestionable rule.

## 12. Prompt generation respects human locks

Generated Claude/Palmier instructions should separate:

### HUMAN LOCKED

Values the agent must preserve.

### AI MAY ADJUST

Only narrowly permitted values such as a minor crop, sub-frame timing, or ease fine-tuning when explicitly allowed.

Example:

```text
HUMAN LOCKED
Image: hawaii.jpg
Text: HAWAII
Position: bottom-right
Scene Duration: 4.0 sec
Motion Pattern: type-mask-reveal

AI MAY ADJUST
minor crop within face-safe bounds
ease fine tuning
```

If the agent believes a locked value makes the scene invalid, it must report the conflict rather than silently replace the value.

## 13. Palmier handoff preserves decisions and deltas

Palmier is Rough, not final authority.

When practical, preserve:

```text
Human Decision
AI/Palmier Applied Value
Difference
```

Example:

```text
Human Text Delay: 0.8 sec
Applied: 0.65 sec
Delta: -0.15 sec
```

A Palmier approximation must not erase the intended DaVinci finish instruction.

## 14. DaVinci handoff distinguishes locked and adjustable

The finish manifest should make it obvious what was intentionally chosen by the human.

Example:

```text
LOCKED
Text: SHOGO & SHIORI
Position: Bottom Right
Scene Duration: 5 sec

ADJUSTABLE
exact easing
minor crop
motion blur
sub-frame keyframe timing
```

DaVinci remains the final precision tool, but it should not become a place where the original scene intent is lost.

## 15. Review feedback uses human language and property-level edits

Review options should prefer understandable problems:

- 写真が違う
- 文字位置が違う
- Delayが早い / 遅い
- Motionが強い / 弱い
- Sceneが短い / 長い
- Transitionが派手
- 写真を読む時間が足りない
- Cropで顔が切れる

Do not force users to know Fusion terminology merely to request a correction.

## 16. Human corrections become evidence, not rigid law

Accepted edits may improve future suggestions.

Example:

```text
Observed:
Profile title delays accepted at 0.6–1.0 sec in 3 scenes.

Suggested default:
0.8 sec
```

But do not convert a small number of preferences into a permanent hard rule.

Keep:

- evidence count
- project context
- accepted/rejected state
- optional reason

## 17. Applies retroactively to existing Movie work

This contract applies not only to new Scene Composer work but also to active/referenced existing Movie assets when they are edited, migrated, reviewed, or reused.

This includes at minimum:

- Visual Motion Library
- Motion Kit / existing 36 patterns
- Director Recipes / existing 97 recipes
- StaRt Showcase / StaRt Selection / StaRt Production
- Profile Movie Coach
- Movie Review / Before-After
- Prompt management
- Palmier Handoff
- DaVinci/Fusion learning and handoff
- current Mask Reveal vertical slice
- existing Remotion previews/compositions when still used as preview/reference/fallback
- Opening V1 Short Candidate when explicitly revisited

Do not perform a destructive mass migration only to comply with this contract. Apply it opportunistically and explicitly when touching each active area.

## 18. Current Mask Reveal vertical slice requirements

The currently running `type-mask-reveal` slice must prove more than a render.

Its evidence should make the following human-editable intent recoverable:

```text
Text
Layer start / Text Delay
Enter Motion
Enter Duration
Direction
Final Position
Scene Duration
Hold interval
Human lock state
DaVinci implementation
```

Actual DaVinci render is evidence of implementation; it does not replace those values as source of truth.

## 19. Opening and Profile share the contract

Opening may use shorter hold and stronger accents.

Profile may use longer hold and more restrained motion.

The data model should not fork into unrelated systems.

Human-readable parameters remain the same; presets/defaults differ by project/section role.

## 20. Definition of done

A feature is not human-editable merely because the source code can be edited.

A production-facing Movie feature satisfies this contract when:

1. a person can understand what the current values mean;
2. the important values can be changed independently;
3. changing one property does not unnecessarily regenerate unrelated properties;
4. AI suggestion is distinguishable from human decision;
5. locked decisions survive prompt/Palmier/DaVinci handoff;
6. actual preview/render provenance is truthful;
7. the editable state can reconstruct the intended scene;
8. the user can perform common corrections without knowing implementation-specific jargon.

## Core principle

> **AIの出力を人間が頑張って修正するのではなく、人間が理解・修正できる構造をAIが埋める。**

AI exists to make the human's editing work easier. The production model must stay understandable, editable, and recoverable by a person.
