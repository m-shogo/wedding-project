# Mask Reveal Local DaVinci Actual Gate — 2026-08-25

Status: ACTIVE EXECUTION RUNBOOK / updated for SceneInstance authority  
Scope: Movie only / `type-mask-reveal` vertical slice  
Goal: move from repository-generated Concept evidence to **real local DaVinci Actual evidence** without touching the real Opening/Profile timeline until disposable validation and scratch handoff pass.

## Current authority

Read together with:

- `docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md`
- `docs/decisions/2026-08-25-motion-zukan-output-format-clarification.md`
- `docs/decisions/2026-08-25-motion-zukan-preset-first-davinci-value-bridge.md`
- `docs/decisions/2026-08-26-motion-zukan-property-stack-customization.md`
- `docs/runbooks/2026-08-25-mask-reveal-sceneinstance-handoff-addendum.md`
- `docs/runbooks/2026-08-25-mask-reveal-davinci-applied-evidence-gate.md`
- `movie-dashboard/src/data/maskRevealSceneProductionBundle.ts`
- `movie-dashboard/src/data/maskRevealDaVinciAppliedEvidence.ts`

Current truth before local execution:

- Pattern: `type-mask-reveal`
- implementation: `impl-type-mask-reveal-davinci-text-plus`
- current preview authority: `REPO_GENERATED / CONCEPT`
- target: `ACTUAL_DAVINCI_RENDER`
- sample: `sample-typography-welcome-v1`
- Palmier role: `PALMIER_TIMING_ONLY`
- DaVinci role: final motion + render
- Human-readable adopted `SceneInstance` values remain production authority
- JSON/XML/frame numbers/MP4 are serialization or evidence, not Human Master

Legacy scratch marker `VML_MASK_REVEAL_OPENING_INTRO` may still appear in historical Pattern-level examples, but **production handoff uses the current Scene-specific marker**:

`VML_MASK_REVEAL_<SECTION>_<SCENE_TOKEN>`

## Phase 0 — Git / concurrency safety

Before local app work:

1. fetch latest `main`
2. confirm clean worktree or preserve unrelated local changes
3. inspect open PRs
4. create a Movie-only branch from latest main
5. do not touch Paper Item / Rurubu / Passport files
6. reconcile any conflicting Movie PR before writing

Recommended execution branch:

`movie/local-mask-reveal-davinci-actual`

## Phase 1 — select the adopted SceneInstance

Choose one adopted current Mask Reveal SceneInstance and record:

```text
sceneId
sourceRevision = SceneInstance.updatedAt
projectId
section
sceneMarkerId
humanSelectedFields
lockedFields
```

Generate a fresh `motion-zukan-scene-production/v1` bundle from that Scene.

If `updatedAt` changes after export/readback, previous execution evidence is **STALE**. Regenerate before applying anything further.

Do not begin local implementation from copied fixed Fusion values when current human-readable Scene values exist.

## Phase 2 — establish Canonical values

Resolve the current effective Scene values and Canonical state.

At minimum trace:

- text
- Scene Duration
- Layer Delay
- Motion Delay
- Enter Duration
- Hold Duration
- Position / Offset
- Direction
- Distance
- Scale
- Intensity
- Human Selected / Locked state

For Mask Reveal v1, the active Property units are:

```text
Transform
Mask
```

Do not add unrelated Blur/Perspective/universal Inspector structures merely for this proof.

## Phase 3 — read-only environment probe

Run:

```bash
bash scripts/davinci/mask-reveal-readonly-probe.sh
```

This performs no mutation. Treat its app/MCP discovery only as hints.

The authoritative Resolve identity must come from a live Resolve connection or actual Resolve UI, not Finder/bundle metadata alone.

## Phase 4 — reuse existing Resolve integration

Use in this order:

1. DaVinci built-in `Text+` / Fusion / Rectangle Mask
2. existing repo recipe `fusion-masked-reveal`
3. already-installed compatible DaVinci MCP
4. current external `davinci-resolve-mcp` after current compatibility/security check
5. smallest manual DaVinci action only if the local API genuinely cannot author a required keyframe

Do not install Reactor, marketplace effects, paid templates, or custom `.setting` assets for Mask Reveal v1.

If an MCP setup/update is required, recheck current upstream instructions first. Do not blindly execute a stale copied install command.

If one Resolve UI action is required to expose local scripting/bridge transport, request only that exact action and immediately resume afterwards.

## Phase 5 — authoritative live Resolve context

Connect to local Resolve and record:

- product / edition
- full Resolve version
- MCP version if exposed
- transport
- project name
- timeline name
- width
- height
- fps

Create a disposable project/timeline, not the real wedding project.

Neutral requested preview target remains:

```text
WELCOME
1280 × 720 target
30fps target
4 sec target
muted
neutral dark background
```

But requested target values are not proof of the live Project Context.

Rebuild the expected DaVinci values from:

```text
current Canonical Scene state
+
live Resolve Project Context
```

Human seconds remain authority; frame numbers are derived from live fps.

## Phase 6 — disposable Mask Reveal implementation

Use built-in:

`Text+ + Rectangle Mask`

Minimum graph intent:

`Text+ → MediaOut`, with Rectangle Mask connected to `Text+.EffectMask`.

Before animation/render, prove where supported:

- Text+ exists
- StyledText matches current Scene text (`WELCOME` for neutral proof)
- Rectangle Mask exists
- mask connection exists

Implement the **current Scene's resolved values**.

Do not use a copied `approximately 0.8 seconds` as authority. Use current `enterDurationSeconds`, then derive the representable frame timing from live fps.

Visual intent:

- reveal follows current direction
- restrained motion
- natural settle
- no bounce
- no glow
- no shake
- no decorative chain
- no unnecessary motion blur

If keyframe authoring alone is unsupported:

1. keep all possible setup/readback automated
2. perform the smallest manual keyframe action
3. record `automationGap: KEYFRAME_AUTHORING`
4. still require Actual render evidence

## Phase 7 — applied/readback evidence

Use `davinci-applied-readback/v1`.

The evidence must use the same `sceneId` and `sourceRevision` as the current Scene production bundle.

Capture only proven values; unavailable values remain null.

Compare:

```text
Human Scene value
→ Canonical value
→ live-context expected DaVinci value
→ applied/readback value
→ delta
```

Review `LOCKED` preservation explicitly.

Also review Property-local integrity for active units:

```text
Transform
Mask
```

A one-property correction that silently changes unrelated properties is not a clean correction. Record any real secondary dependency explicitly.

Readback alone is not completion.

## Phase 8 — Actual DaVinci render

Render the neutral sample from local DaVinci itself.

Candidate preview path after QA:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4`

Candidate poster:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png`

Only the neutral WELCOME proof may be committed by this path. Never commit private wedding media, copyrighted audio, or paid/licensed template binaries.

Collect actual measurements:

- Resolve version
- renderedAt
- SHA-256
- codec
- width / height
- fps
- frame count or duration
- sample asset set ID
- implementation ID

### 1x QA

- clear mask reveal
- intended timing meaning preserved
- final text crisp/stable
- no clipping
- no accidental extra motion/effect

### 0.5x QA

- coherent acceleration/deceleration
- no overshoot/bounce
- mask edge behaves correctly
- settle is clean

If either review fails, keep verification false, correct the relevant human-readable property when possible, rebuild derived values, and re-render.

## Phase 9 — promotion rules

Only after real evidence exists may code move beyond Concept-only state.

Eligible after proof:

- implementation `AVAILABLE → TESTED → PRODUCTION_READY` only if all required gates justify it
- actual Resolve version
- separate `ACTUAL_DAVINCI_RENDER / VERIFIED` preview record
- actual preview/poster paths
- actual timestamp/checksum/provenance
- completed `motion-verification/v1` checks

Never erase the repository-generated Concept provenance.

The Actual MP4 is Implementation Evidence, not Source of Truth.

## Phase 10 — Palmier → DaVinci scratch handoff

After standalone DaVinci proof, create a scratch Palmier project timeline.

Palmier responsibilities:

- rough timing
- text/placement intent
- current Scene-specific marker identity
- export the **real project timeline** as DaVinci-compatible NLE XML

For Mask Reveal, Palmier remains `PALMIER_TIMING_ONLY`.

Use filenames and marker from the fresh Scene production bundle rather than hard-coded Pattern-level names.

Required conceptual pair:

```text
Palmier real project NLE XML
+
fresh Scene-specific Motion Handoff sidecar
```

For Palmier approximation preserve separately:

```text
intended Human value
Palmier applied value
difference / delta
```

Then:

1. import real Palmier XML into disposable/scratch DaVinci project
2. confirm timing/order/relink
3. locate current Scene-specific marker
4. apply the already-tested Mask Reveal
5. capture fresh applied/readback evidence
6. render again
7. compare with standalone validation result

## Phase 11 — real wedding project

Do not modify the real Opening/Profile timeline until the disposable DaVinci and Palmier scratch handoff gates pass.

After they pass, reuse the verified implementation locally with selected real wedding media. Never commit private originals.

## Failure policy

Never turn a failed or unavailable observation into a guessed success.

Examples:

- graph exists but rendered output does not reveal → FAIL
- local Resolve version differs from external evidence → local evidence wins
- Palmier XML export unavailable → XML gate remains failed
- Actual file exists but no 1x/0.5x review → visual QA remains false
- stale Scene revision → discard/recreate execution evidence
- locked value silently violated → implementation review fails
- property-local edit changes unrelated property without explicit dependency → correction review fails

## Completion gate

Mask Reveal is technically complete only when this chain is real:

`search → Concept preview → adopted SceneInstance → Human values → Canonical state → fresh bundle → Palmier Rough → real NLE XML + sidecar → DaVinci import → Scene marker match → expected/live-context values → applied/readback + delta → built-in Text+ Mask Reveal → Actual DaVinci MP4 → 1x/0.5x QA → provenance/version → verified UI preview`

Until then, do not migrate the next Motion Pattern or mass-convert the 36 Motion Kit / 97 Director Recipes.
