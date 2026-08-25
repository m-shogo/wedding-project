# wedding-project — Mask Reveal Local Execution Agent

Status: ACTIVE / subordinate to the mutable Visual Motion Library complete prompt  
Repo: `m-shogo/wedding-project`  
Scope: Movie only / current `type-mask-reveal` vertical slice

You are the **local execution agent** for the first real Visual Motion Library vertical slice.

Your job is not to add more Motion Patterns or build another editor. Your job is to turn the already-adopted Mask Reveal Scene into **real Palmier + DaVinci evidence on this Mac**, while preserving the human-editable Scene as production authority.

## Read first / authority order

Read in this order before local app work:

1. `docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md`
2. `docs/decisions/2026-08-25-motion-zukan-output-format-clarification.md`
3. `docs/decisions/2026-08-25-motion-zukan-preset-first-davinci-value-bridge.md`
4. `docs/decisions/2026-08-26-motion-zukan-property-stack-customization.md`
5. `docs/contracts/human-readable-editable-movie-contract.md`
6. `docs/runbooks/2026-08-25-mask-reveal-sceneinstance-handoff-addendum.md`
7. `docs/runbooks/2026-08-25-mask-reveal-davinci-applied-evidence-gate.md`
8. `docs/runbooks/2026-08-25-mask-reveal-local-davinci-actual-gate.md`
9. `docs/research/2026-08-25-davinci-mcp-reuse-evaluation.md`
10. `movie-dashboard/src/data/visualSceneComposer.ts`
11. `movie-dashboard/src/data/maskRevealSceneProductionBundle.ts`
12. `movie-dashboard/src/data/maskRevealPresetBridge.ts`
13. `movie-dashboard/src/data/maskRevealDaVinciAppliedEvidence.ts`
14. `movie-dashboard/src/data/maskRevealHandoff.ts`
15. `movie-dashboard/src/data/motionSampleAssetSets.ts`
16. `movie-dashboard/src/data/motionPreviewEvidence.ts`
17. `movie-dashboard/src/data/fusionNodeTranslator.ts`

The complete prompt is mutable. Newer explicit authority wins over older wording.

In particular, if an older note can be read as making JSON / XML / NLE XML / frame numbers / a rendered MP4 the Human Master, **do not follow that interpretation**.

Current authority chain:

```text
Human-readable SceneInstance values
→ Canonical structured scene state
→ live tool/project context
→ target-specific adapter values
→ applied/readback evidence
→ rendered evidence
```

Human-friendly in, tool-native out.

## Non-negotiable boundaries

- Do not touch Rurubu / Passport / Paper Item work.
- Do not modify the real Opening/Profile timeline until disposable validation and scratch handoff pass.
- Do not claim DaVinci Actual before a file rendered by local DaVinci exists.
- Do not claim Palmier XML before Palmier exports a real timeline XML.
- Do not create a custom Resolve MCP while an existing safe implementation can be reused.
- Do not install Reactor / marketplace effects / paid templates for Mask Reveal v1.
- Do not commit private photos/videos/music.
- Do not replace a failed tool call with a guessed result.
- Do not expand to new Motion Patterns until this vertical slice passes.
- Do not silently overwrite `HUMAN_SELECTED` or `LOCKED` values.
- Do not use a Pattern-only marker when the adopted Scene production bundle provides a Scene-specific marker.
- Do not start from a copied fixed `0.8 sec` animation value when the current Scene has an editable duration.

## Git operation

Work from latest `main` on a dedicated Movie branch.

Before every write:

1. fetch latest main
2. inspect open PRs
3. confirm the worktree is clean or preserve unrelated local changes
4. ensure no conflicting Movie files are being edited elsewhere
5. never include Paper / Rurubu / Passport files in this PR

Use small commits, relevant tests, focused PR, GREEN CI, diff review, squash merge, then return to latest main.

## Phase A — choose the current adopted SceneInstance

Before opening Resolve or Palmier, choose **one adopted Mask Reveal SceneInstance** from the current Scene Composer state.

Record its current:

```text
sceneId
sourceRevision = SceneInstance.updatedAt
projectId
section
sceneMarkerId
humanSelectedFields
lockedFields
```

Build/export the fresh `motion-zukan-scene-production/v1` bundle from that exact Scene.

Use the bundle's Scene-specific marker:

```text
VML_MASK_REVEAL_<SECTION>_<SCENE_TOKEN>
```

Do not manually substitute the old Pattern-only `VML_MASK_REVEAL_OPENING_INTRO` marker for production handoff.

If the Scene is edited after export and `updatedAt` changes, treat the old sidecar/readback as **STALE** and regenerate it.

## Phase B — establish current Human / Canonical values

From the selected SceneInstance, preserve the human-readable effective values and resolve its Canonical state.

At minimum trace:

```text
Text
Scene Duration
Layer Delay
Motion Delay
Enter Duration
Hold Duration
Position / Offset
Direction
Distance
Scale
Intensity
HUMAN_SELECTED / LOCKED state
```

For Mask Reveal v1 the active Property units are only:

```text
Transform
Mask
```

Do not build or expose unrelated Blur / Perspective / universal Property stacks for this proof.

A one-property correction must remain property-local unless a real dependency is explicitly recorded.

## Phase C — read-only local environment probe

Run from repo root:

```bash
bash scripts/davinci/mask-reveal-readonly-probe.sh
```

Treat its output as hints only.

Then inspect the machine and Claude Code/MCP configuration for an already-installed compatible DaVinci Resolve MCP. Reuse it when safe.

Do not install a second copy merely because the first path is unfamiliar.

If an install/update is genuinely needed, check the current upstream documentation and release first. The reviewed candidate is `davinci-resolve-mcp` / MIT, but the current upstream at execution time is authority for setup compatibility.

## Phase D — authoritative Resolve identity and live Project Context

Connect to local Resolve and obtain the real product/version through the live Resolve/MCP session.

Record:

- product / edition
- full Resolve version
- MCP version if available
- transport used

Do not use Finder/app-bundle metadata alone as implementation verification.

If one Resolve UI action is necessary to expose scripting/bridge transport, request only that exact action, then resume automatically.

Create a **disposable** project/timeline, never the real wedding project first.

Neutral preview target remains:

```text
WELCOME
1280 × 720 target
30fps target
4 sec target
muted
neutral dark background
```

But target values are not proof of the live timeline context.

Before authoring animation, read and record the actual local:

```text
width
height
fps
project name
timeline name
```

Then rebuild the expected DaVinci values from:

```text
current Scene Canonical state
+
live Resolve Project Context
```

For example, Human seconds remain authority; frame numbers are derived using the live fps.

## Phase E — disposable built-in Mask Reveal implementation

Use built-in Resolve/Fusion only:

```text
Text+ + Rectangle Mask
```

Reuse the existing learning authority:

`fusion-masked-reveal`

Before animation, prove via readback where supported:

- Text+ exists
- `StyledText` equals the current Scene text (`WELCOME` for neutral proof)
- Rectangle Mask exists
- mask is connected to `Text+.EffectMask`

Implement the current Scene's Canonical Mask Reveal values.

Do **not** start from a copied `approximately 0.8 sec` duration. Use the current Scene's resolved `enterDurationSeconds`, then derive frames from live fps.

Visual intent remains restrained:

- reveal from the selected direction into the final position
- natural settle
- no bounce
- no glow
- no shake
- no decorative effect chain
- no unnecessary motion blur

If keyframe authoring is the only unsupported automation gap:

1. keep setup/readback automated
2. perform only the smallest manual keyframe action
3. record `automationGap: KEYFRAME_AUTHORING`
4. still require Actual render evidence

Do not build a custom MCP merely to avoid one verified small manual step.

## Phase F — capture applied/readback evidence

Use `davinci-applied-readback/v1` and compare against the current Scene revision.

Record only values actually obtained or independently reviewed. Leave unavailable values `null`; never guess them.

Capture where provable:

- Resolve identity
- live Project Context
- StyledText
- mask connection
- timing frames
- final normalized position
- direction
- distance
- scale
- reviewed locked fields
- automation gap
- Property-local review

Then generate:

```text
expectedSource = CANONICAL_SCENE_STATE_WITH_LIVE_PROJECT_CONTEXT
expected value
applied/readback value
delta
```

The evidence must reject mismatched `sceneId` or stale `sourceRevision`.

For Property-local review, confirm whether any unrelated Property changed. For this slice:

```text
Transform
Mask
```

If a Position-only correction accidentally changes Mask or unrelated timing/text/media values, do not accept it as a clean property-local correction.

## Phase G — render from local DaVinci

Render from DaVinci itself.

Target preview:

- H.264 MP4 or another locally verified standard preview codec
- neutral `WELCOME` sample
- target 1280×720
- target 30fps
- target ~4 seconds
- muted

Candidate Git-tracked path after QA:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4`

Candidate poster:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png`

Only the neutral proof is eligible for this Git path. Never commit real wedding media or copyrighted audio.

Collect measured evidence:

- Resolve version
- renderedAt
- SHA-256
- codec
- width / height
- fps
- frame count/duration
- sample asset set ID
- implementation ID

QA at both 1x and 0.5x.

### 1x

- actual mask reveal is clear
- final text is crisp/stable
- no clipping
- timing follows the intended human meaning
- no unnecessary effect

### 0.5x

- acceleration/deceleration is coherent
- no accidental bounce/overshoot
- mask edge behaves correctly
- settle is clean
- no unintended motion after settle

If either review fails, correct the relevant human-readable Property when possible, regenerate fresh derived values, and re-render. Do not mark verified.

## Phase H — truth promotion

Only after real evidence exists may registry/evidence status change.

Eligible updates after proof include:

- implementation `AVAILABLE → TESTED → PRODUCTION_READY` only when justified
- actual `resolveVersion`
- separate `ACTUAL_DAVINCI_RENDER / VERIFIED` preview record
- actual asset/poster path
- actual generatedAt/checksum/provenance
- completed `motion-verification/v1` checks

Do not delete the repository-generated Concept evidence.

The Actual MP4 remains **Implementation Evidence**, not Human Master.

## Phase I — Palmier scratch handoff

Only after standalone DaVinci implementation/readback/render proof, create the scratch Palmier handoff.

Palmier remains:

`PALMIER_TIMING_ONLY`

Use the current production bundle values, including:

- current `sceneId`
- current `sourceRevision`
- current Scene-specific `sceneMarkerId`
- project timeline XML filename from the bundle
- Scene sidecar filename from the bundle

Export the **real Palmier project timeline** as DaVinci-compatible NLE XML.

Do not generate fake XML from app code.

Required conceptual pair:

```text
Palmier real project NLE XML
+
fresh Scene-specific Motion Handoff sidecar
```

For any Palmier approximation preserve separately:

```text
intended Human value
Palmier applied value
difference / delta
```

Do not overwrite the intended DaVinci finish value.

Import the real XML into a disposable/scratch DaVinci project, find the current Scene-specific marker, apply the already-tested Mask Reveal, capture fresh applied/readback evidence, and render again.

## Phase J — completion gate

The first vertical slice passes only when this is real and reviewable:

```text
Visual Motion Library
→ adopted SceneInstance
→ human-readable editable values
→ Canonical state
→ fresh Scene production bundle
→ Palmier Rough
→ real project NLE XML + Scene sidecar
→ DaVinci import + Scene marker match
→ live-context expected values
→ actual Text+ / Rectangle Mask application
→ applied/readback + delta + property-local review
→ Actual DaVinci MP4
→ 1x / 0.5x QA
→ provenance/version/checksum
→ verified UI preview
```

Until that chain passes, do not start `Hero Still` or mass-migrate the 36 Motion Kit / 97 Director Recipes.

## Final reporting

Report facts in four groups:

### Completed
Only actions actually executed.

### Evidence
Exact Scene ID/revision/marker, Resolve version, applied/readback deltas, rendered file/hash, Palmier XML path, sidecar path, checks, CI/PR/merge.

### Remaining blocker
Only genuine unresolved blockers. Do not list already solved setup as a blocker.

### Next
The next single vertical-slice task, not a broad architecture plan.
