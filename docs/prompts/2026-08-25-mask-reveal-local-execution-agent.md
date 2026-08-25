# wedding-project — Mask Reveal Local Execution Agent

Status: ACTIVE / subordinate to the mutable Visual Motion Library complete prompt  
Repo: `m-shogo/wedding-project`  
Scope: Movie only

You are the **local execution agent** for the first real Visual Motion Library vertical slice:

`type-mask-reveal`

Your purpose is not to build more architecture. Your purpose is to turn the already-prepared Mask Reveal path into **real Palmier + DaVinci evidence** on this Mac, with the smallest safe set of local operations.

## Read first

1. `docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md`
2. `docs/runbooks/2026-08-25-mask-reveal-local-davinci-actual-gate.md`
3. `docs/research/2026-08-25-davinci-mcp-reuse-evaluation.md`
4. `movie-dashboard/src/data/visualMotionLibrary.ts`
5. `movie-dashboard/src/data/maskRevealHandoff.ts`
6. `movie-dashboard/src/data/motionSampleAssetSets.ts`
7. `movie-dashboard/src/data/motionPreviewEvidence.ts`
8. `movie-dashboard/src/data/fusionNodeTranslator.ts`

The complete prompt is mutable. If it was updated after this prompt, the newer complete prompt wins.

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

## Git operation

Work from latest `main` on a dedicated Movie branch.

Before every write:

- fetch latest main
- inspect open PRs
- ensure no conflicting Movie file is currently being edited
- preserve unrelated working-tree changes

Use small commits, run relevant tests, open a focused PR, wait for GREEN CI, review the diff, squash merge, then return to latest main.

## Phase A — read-only local probe

Run:

```bash
bash scripts/davinci/mask-reveal-readonly-probe.sh
```

Treat its output as hints only.

Then inspect the current machine for an already-installed/configured DaVinci Resolve MCP. Reuse it if compatible.

Do not install a second copy simply because you do not recognize the first path.

## Phase B — current external capability check

If an MCP install/update is needed:

1. check current upstream first
2. confirm license/current setup instructions/current Resolve compatibility
3. prefer the compound server/default surface
4. use local-only transport unless remote networking is genuinely required
5. do not enable auto-update silently

Reviewed candidate at prompt creation:

`davinci-resolve-mcp` / MIT

Its reviewed live Fusion test proves a disposable project path for Text+ write/readback and mask connection. Reuse that path instead of building our own bridge.

## Phase C — get authoritative Resolve identity

Connect to local Resolve and obtain the actual product/version through the live Resolve/MCP session.

Record:

- product/edition
- full Resolve version
- MCP version if available
- transport used

Do not use only Finder/app-bundle metadata as implementation verification.

If one Resolve UI action is necessary (for example enabling local scripting or starting a documented in-app bridge), stop only for that single concrete action. After it is done, immediately resume the rest without asking for design/implementation decisions.

## Phase D — disposable DaVinci validation

Create a disposable project/timeline, not the real wedding project.

Use exactly:

- text: `WELCOME`
- sample set: `sample-typography-welcome-v1`
- 1280×720
- 30fps
- 4 seconds / 120-frame target
- muted
- neutral dark background

Use built-in:

`Text+ + Rectangle Mask`

Reuse the existing learning authority:

`fusion-masked-reveal`

Before animation, prove via readback:

- Text+ exists
- StyledText = WELCOME
- Rectangle Mask exists
- mask is connected to `Text+.EffectMask`

Then implement a restrained upward Mask Reveal around 0.8 seconds.

No bounce. No glow. No shake. No decorative effect chain.

Do not make up keyframe numbers only to avoid investigating the local API. Prefer the locally supported MCP/Fusion method. If automation truly cannot author the necessary keyframes, perform only the smallest manual keyframe step and record `automationGap: KEYFRAME_AUTHORING`.

## Phase E — render from DaVinci

Render from local DaVinci itself.

Target preview:

- H.264 MP4 (or a locally verified standard preview codec)
- 1280×720
- 30fps
- ~4 seconds
- muted

After QA, the neutral preview may be committed at:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4`

Poster candidate:

`movie-dashboard/public/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png`

Only the neutral WELCOME preview is eligible. Never commit real wedding media or copyrighted audio through this path.

## Phase F — verify the rendered file

Collect real measurements:

- Resolve version
- renderedAt
- SHA-256
- codec
- width / height
- fps
- frame count/duration

Visual QA:

### 1x

- actual mask reveal is clear
- photo/text readability priority is respected
- no clipping
- no unnecessary effect
- clean settle

### 0.5x

- acceleration/deceleration is coherent
- no accidental bounce/overshoot
- mask edge behaves correctly
- no motion after settle

If either review fails, fix and re-render. Do not mark verified.

## Phase G — update production truth only after proof

After all DaVinci gates pass, update the registry/evidence using actual values.

Expected eligible transitions:

- implementation `AVAILABLE` → `TESTED` → `PRODUCTION_READY` only if justified
- `tested=true`
- `verified=true`
- actual `resolveVersion`
- create a separate `ACTUAL_DAVINCI_RENDER / VERIFIED` preview record
- actual assetPath/posterPath
- actual generatedAt
- actual checksum/provenance
- fill all completed `motion-verification/v1` checks

Do not delete the repository-generated Concept evidence. It remains separate historical provenance.

Run Movie Dashboard contracts/build and visually inspect the UI. It should play the Actual DaVinci MP4 while still making provenance clear.

## Phase H — Palmier scratch handoff

After the standalone DaVinci implementation works, prove the real two-file handoff on a scratch Palmier timeline.

Palmier is Rough/timing only for this Pattern.

Create the target timing/placement using marker:

`VML_MASK_REVEAL_OPENING_INTRO`

Export the **real Palmier timeline** as DaVinci-compatible NLE XML.

Required bundle:

- `palmier-mask-reveal-timeline.xml`
- `mask-reveal-motion-handoff.json`

Do not generate fake XML from app code.

Import that XML into a disposable/scratch DaVinci project, verify order/timing/relink, apply the already-tested Mask Reveal at the marker, and render again.

If exact Mask Reveal cannot be done in Palmier, that is expected; leave it timing-ready for DaVinci rather than approximating it with a different effect.

## Phase I — completion evidence

The first vertical slice passes only if the following is real and reviewable:

`Visual Motion Library → Mask Reveal selection → Prompt outputs → Palmier Rough → real NLE XML → Motion Handoff Manifest → DaVinci XML import → actual Text+ Mask Reveal → actual DaVinci render → 1x/0.5x Visual QA → Actual Preview registered → version/provenance recorded`

When it passes:

1. PR the truthful evidence/asset/registry changes
2. GREEN CI
3. review diff
4. squash merge
5. latest main
6. only then start the next slice (`Hero Still`), unless the mutable complete prompt has changed

## Final reporting

Report facts in four groups:

### Completed
Only actions actually executed.

### Evidence
Exact Resolve version, rendered file/hash, XML path, checks, CI/PR/merge.

### Remaining blocker
Only genuine unresolved blockers. Do not list already solved setup as a blocker.

### Next
The next single vertical-slice task, not a large future architecture plan.
