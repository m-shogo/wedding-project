# Mask Reveal Local DaVinci Actual Gate — 2026-08-25

Status: ACTIVE EXECUTION RUNBOOK  
Scope: Movie only / `type-mask-reveal` vertical slice  
Goal: move from verified repository-generated Concept evidence to **real local DaVinci Actual evidence** without touching the real Opening/Profile timeline until the disposable validation passes.

## Authority

Read first:

- `docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md`
- `docs/research/2026-08-25-davinci-mcp-reuse-evaluation.md`
- `movie-dashboard/src/data/visualMotionLibrary.ts`
- `movie-dashboard/src/data/maskRevealHandoff.ts`
- `movie-dashboard/src/data/motionSampleAssetSets.ts`
- `movie-dashboard/src/data/motionPreviewEvidence.ts`
- `movie-dashboard/src/data/fusionNodeTranslator.ts`

Current truth before this run:

- Pattern: `type-mask-reveal`
- DaVinci implementation: `impl-type-mask-reveal-davinci-text-plus`
- Implementation status: `AVAILABLE`, not tested
- Current preview: `REPO_GENERATED / CONCEPT`
- Current Concept render QA: PASS, but `productionAuthority=false`
- Target: `ACTUAL_DAVINCI_RENDER`
- Shared sample: `sample-typography-welcome-v1`
- Marker authority: `VML_MASK_REVEAL_<SECTION>`
- Palmier role: `PALMIER_TIMING_ONLY`
- DaVinci role: final motion + render

## Reuse decision

Do not create a wedding-project-specific Resolve bridge first.

Use in this order:

1. DaVinci built-in `Text+` / Fusion / Rectangle Mask
2. existing repo learning recipe `fusion-masked-reveal`
3. an already-installed DaVinci Resolve MCP if present
4. current external `davinci-resolve-mcp` after local compatibility/security probe
5. smallest manual DaVinci step only when the real scripting/API boundary prevents safe automation

Do not install Reactor, a marketplace title pack, `.drfx`, or a custom `.setting` for Mask Reveal v1. Built-in Resolve is enough.

## External MCP evidence reused

Current reviewed candidate:

- package/repository line: `davinci-resolve-mcp`
- reviewed README version: `2.69.3`
- license: MIT
- README advertises Resolve 18.5+
- its live validation `tests/live_fusion_mask_title_validation.py` creates a disposable project and verifies:
  - `resolve_control("get_version")`
  - Fusion `Text+` insertion
  - `StyledText` write + independent readback
  - Rectangle/Ellipse Mask creation
  - successful connection to `Text+.EffectMask`
  - honest connection failure when the target has no mask input
  - cleanup of the disposable project

External evidence is **not our local render evidence**. It only justifies reuse.

## Phase 0 — Git and concurrency safety

Before local app work:

1. fetch latest `main`
2. confirm current branch/worktree is clean
3. inspect open PRs
4. create a Movie-only branch from latest `main`
5. do not edit Paper Item / Rurubu / Passport files
6. if another Movie PR touches the same files, stop and reconcile before writing

Recommended branch:

`movie/local-mask-reveal-davinci-actual`

## Phase 1 — Read-only environment probe

Run from repo root:

```bash
bash scripts/davinci/mask-reveal-readonly-probe.sh
```

This probe is intentionally weak evidence. It only discovers local hints and performs no mutation.

Record, but do not yet promote anything from:

- Resolve application path
- bundle version/build
- whether a DaVinci MCP binary/config appears to exist

The authoritative version/edition must come from a live Resolve connection, preferably `resolve_control(action="get_version")` or the actual Resolve UI if a scripting connection is unavailable.

## Phase 2 — Reuse existing MCP before installing

Check the machine and Claude Code/MCP configuration before installing anything.

If a compatible DaVinci MCP is already present, reuse it.

If none exists, inspect the current upstream documentation/release again before setup. Do not use a stale copied install command blindly.

At the time this runbook was written, the upstream quick start was:

```bash
npx davinci-resolve-mcp setup
```

but current upstream documentation is the authority when the local run actually happens.

### Studio vs Free edition

Do not guess edition from the app bundle.

For Studio, the reviewed MCP documentation expects Resolve running with:

`Preferences > General > External scripting using > Local`

For the free edition, the reviewed MCP documents an in-app bridge launched through Resolve `Workspace > Scripts`. Treat that as a compatibility path that must be rechecked against the current upstream and local Resolve version. Do not present it as guaranteed forever.

If one UI action is required to expose the local scripting transport, request only that single action, then continue automatically.

## Phase 3 — Authoritative live probe

Before creating any project:

1. connect to Resolve
2. call/read `get_version`
3. record:
   - product / edition string
   - full version string
   - MCP version if exposed
   - transport used: Studio local scripting or free-edition in-app bridge
4. make no Production Ready / Actual changes yet

Failure to connect is a blocker. Do not substitute the macOS bundle version as proof.

## Phase 4 — Disposable implementation validation

Use a disposable project, never the real Opening/Profile project first.

Suggested project name:

`_wedding_vml_mask_reveal_<timestamp>`

Suggested timeline:

`vml_mask_reveal_validation`

Required timeline/sample contract:

- 1280 × 720
- 30fps
- 4 seconds / 120 frames target
- muted
- neutral dark background
- exact text: `WELCOME`
- no real wedding photo
- no copyrighted music
- no third-party template

Required implementation authority:

`DAVINCI_TEXT_PLUS + Fusion Rectangle Mask`

Minimum graph intent:

`Text+ → MediaOut` with Rectangle Mask connected to `Text+.EffectMask`.

If a background/merge is needed for the neutral sample, keep it minimal and document it. Do not add decorative nodes.

### Mandatory readbacks

Before animation/render, prove:

- Text+ exists
- `StyledText` reads back as `WELCOME`
- Rectangle Mask exists
- mask connection to `Text+.EffectMask` is confirmed

A node graph that merely exists is not enough. Rendering remains mandatory.

## Phase 5 — Mask Reveal animation

Visual intent:

- reveal from below/upward into the final text position
- short and restrained
- target user duration for v1: approximately 0.8 seconds
- ease into the settled state
- no bounce
- no glow
- no shake
- no unnecessary motion blur
- no secondary effects

Do not invent fixed keyframe values merely to automate them.

Use the safest keyframe/input method supported by the locally installed Resolve/MCP version and confirm via readback where possible.

If keyframe authoring is the only unsupported automation gap:

1. keep all setup/readback automated
2. make the smallest manual keyframe operation in the disposable project
3. record the gap explicitly as `automationGap: KEYFRAME_AUTHORING`
4. still require actual render evidence

Do not build a custom MCP just to avoid one small verified manual step.

## Phase 6 — Actual DaVinci render

Render the shared neutral sample from DaVinci itself.

Target:

- H.264 MP4 or another standard preview codec supported by the local Resolve build
- 1280 × 720
- 30fps
- approximately 4 seconds
- no audio

Candidate Git-tracked neutral preview path after QA:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4`

Candidate poster:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png`

These may be committed because they contain only the neutral WELCOME sample and built-in Resolve output. Do **not** use this rule to commit real photos, private video, music, paid templates, or other licensed binary assets.

## Phase 7 — Actual render evidence

For the DaVinci-rendered file, record:

- exact local Resolve version
- render timestamp
- render path
- SHA-256
- codec
- width / height
- fps
- frame count or duration
- sample asset set ID
- implementation ID

Then QA at both:

### 1x

Check:

- text clearly reveals rather than simply fades
- timing feels restrained
- final text is crisp and stable
- no clipping
- no accidental movement after settle
- no extra effect distracts from the text

### 0.5x

Check:

- acceleration/deceleration makes sense
- no abrupt velocity jump
- no accidental overshoot/bounce
- mask edge does not expose unwanted portions
- settle is clean

Capture representative stills if useful.

## Phase 8 — Truth promotion rules

Only after all required evidence exists may code change from Concept-only state.

The following updates become eligible:

### DaVinci implementation

`impl-type-mask-reveal-davinci-text-plus`

- `status`: `TESTED`, then `PRODUCTION_READY` only if all gates pass
- `tested`: `true`
- `resolveVersion`: actual local version
- `verified`: `true`

### Actual preview

Create/register a separate preview record with:

- `sourceType: ACTUAL_DAVINCI_RENDER`
- `status: VERIFIED`
- actual MP4 `assetPath`
- poster path if generated
- `generatedBy: DaVinci Resolve`
- actual `generatedAt`
- implementation ID
- sample asset set ID
- actual Resolve version
- `verified: true`

Do not overwrite history in a way that erases the repository-generated Concept preview. Both can remain with different provenance.

### Motion verification evidence

Fill the `motion-verification/v1` fields using actual measurements only:

- `candidatePreviewAssetPath`
- `renderSha256`
- `renderedAt`
- `resolveVersion`
- every completed check
- `productionReady`

Any unverified field remains false/null.

## Phase 9 — Palmier → DaVinci handoff proof

Once the disposable DaVinci implementation itself is proven, complete the real handoff mechanics on a scratch Palmier timeline before touching the final Opening timeline.

Palmier responsibilities:

- rough timing
- text placement intent
- marker/section identity
- export the **real timeline** as DaVinci-compatible NLE XML

For Mask Reveal, Palmier remains `PALMIER_TIMING_ONLY`; do not fake a Fusion reveal there.

Required pair:

- `palmier-mask-reveal-timeline.xml`
- `mask-reveal-motion-handoff.json`

Use marker:

`VML_MASK_REVEAL_OPENING_INTRO`

Then:

1. import Palmier XML into DaVinci
2. confirm timing/order/relink
3. apply the already-verified Mask Reveal implementation at the marker
4. render again
5. compare with the disposable implementation result
6. only then consider the end-to-end vertical slice passed

## Phase 10 — Real wedding project

Do not modify the real Opening/Profile timeline until Phases 1–9 pass.

When they pass:

- reuse the verified implementation
- use the actual selected wedding media locally
- never commit private originals
- keep the effect secondary to Story / Photo / Emotion / Readability / Music

## Failure policy

Never convert a failure into a guessed success.

Examples:

- MCP can read graph but render is unchanged → FAIL, investigate render path
- title inserts on an unexpected track → record API limitation; do not force the real timeline
- local Resolve version differs from external test version → local render decides
- Palmier XML export is unavailable → keep NLE XML gate failed; do not invent XML
- actual file exists but has not been visually reviewed → keep `visualQa1x/visualQaHalfSpeed=false`

## Completion gate

Mask Reveal vertical slice is technically complete only when this chain is real:

`search → Concept preview → meaning → inputs → Prompt outputs → Palmier Rough → real NLE XML → sidecar Manifest → DaVinci import → built-in Text+ Mask Reveal → Actual DaVinci MP4 → 1x/0.5x Visual QA → provenance + version → verified UI preview`

Until then, do not migrate the next 36/97 motions into the new architecture.
