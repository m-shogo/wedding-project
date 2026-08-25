# Mask Reveal Local Resolve Verification — Execution Prompt

Status: ACTIVE / EXECUTION HANDOFF
Scope: Movie only
Repository: `m-shogo/wedding-project`
Pattern: `type-mask-reveal`
Goal: **produce the first real `ACTUAL_DAVINCI_RENDER` evidence without disturbing the real Opening/Profile timelines.**

You are the local execution agent for the Wedding Visual Motion Library / Palmier × DaVinci vertical slice.

This is not a request to expand the Motion Library. Do not add another Pattern until this one has real local render evidence.

---

## 0. Read authority first

Before mutating anything, read the latest `main` versions of:

1. `docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md`
2. `docs/reviews/2026-08-25-visual-motion-library-current-audit.md`
3. `docs/handoff/MASK-REVEAL-VERTICAL-SLICE.md`
4. `docs/research/2026-08-25-davinci-mcp-reuse-evaluation.md`
5. `movie-dashboard/src/data/visualMotionLibrary.ts`
6. `movie-dashboard/src/data/maskRevealHandoff.ts`
7. `movie-dashboard/src/data/motionSampleAssetSets.ts`
8. `movie-dashboard/src/data/fusionNodeTranslator.ts`

Then check:

- latest `main`
- open PRs
- current Movie-related branches/work in progress

Do not touch Rurubu / Passport / Paper Item files.
Do not modify another agent's active branch.

---

## 1. Stop condition before implementation

The current expected state is:

- Pattern: `type-mask-reveal`
- implementation: `impl-type-mask-reveal-davinci-text-plus`
- implementation status: not yet `PRODUCTION_READY`
- preview: Concept / repository-generated, not Actual DaVinci
- common sample: `sample-typography-welcome-v1`
- sample text: `WELCOME`
- sample format authority: 1280×720 / 30fps / 4 seconds / muted / neutral

If `main` already contains a **locally verified Actual DaVinci render with Resolve version and Visual QA evidence**, do not redo it. Audit that evidence and continue only with missing completion gates.

---

## 2. Reuse Before Build — DaVinci side

Do not create a wedding-specific Resolve MCP or custom automation layer first.

Reuse order:

1. DaVinci built-in Text+
2. Fusion Rectangle Mask / standard Fusion controls
3. existing `fusion-masked-reveal` learning recipe in this repo
4. already-installed DaVinci MCP, if present and compatible
5. current external `davinci-resolve-mcp` candidate only if no equivalent connection already exists
6. explicit small manual step where Resolve's scripting API has a verified gap
7. custom `.setting` / `.drfx` only if built-in + existing automation genuinely cannot finish this vertical slice

Do not install Reactor or a marketplace title pack for this Mask Reveal test.

---

## 3. Resolve connection / version probe

First perform read-only checks.

Determine and record:

- DaVinci Resolve edition: Free or Studio
- exact local Resolve version
- whether a DaVinci Resolve MCP/integration is already configured
- integration version, if present
- whether it can:
  - read current project/timeline
  - create a disposable project/timeline
  - insert a Fusion `Text+` title
  - read/write Text+ StyledText
  - add a Rectangle Mask
  - inspect/verify graph connections
  - author input animation or apply an existing `.comp`/template
  - render/export a short sample

If no integration exists, verify the current upstream/source/license/instructions before installing anything.

Preferred candidate from research:

- existing open-source `davinci-resolve-mcp` project line
- MIT licensed
- use its current documentation, not assumptions frozen in this prompt

For Resolve Free, do not pretend Studio external scripting works. If the current integration documents a supported in-app bridge, verify that path on this actual machine/version before using it.

Record failures as evidence. Do not turn a failed probe into a claimed success.

---

## 4. Protect real wedding projects

Do **not** begin with the real Opening or Profile project.

Create a disposable project/timeline with a clearly temporary name such as:

`_wedding_vml_mask_reveal_probe_<timestamp>`

Use only neutral/synthetic test content needed for the WELCOME preview.

Do not modify camera originals, real photo originals, purchased assets, music, lyrics, or paid templates.

If a reusable local sample background already exists for `sample-typography-welcome-v1`, use it. Otherwise create a simple neutral test background locally; do not generate a fake bride/groom image.

---

## 5. Do not use a known misleading route blindly

External live evidence found an important Resolve API risk:

- a Fusion comp added programmatically to a **media-backed clip** may read back as a valid graph while not affecting the rendered output on tested versions.
- an independently inserted Fusion Title did render in those tests.

Therefore:

- do not use `AddFusionComp()` on a Hero photo and declare success from graph readback alone.
- prefer a built-in Fusion `Text+` title / proven title path for the first automation experiment.
- **render output is the evidence**, not node existence.

Also remember:

- the official Resolve scripting API may not allow choosing an arbitrary destination video track for Fusion title insertion.
- if that limitation blocks the real timeline overlay position, document one small manual placement step rather than inventing an automation success.

The disposable validation timeline can be structured around the API instead of fighting this limitation.

---

## 6. Build the smallest real Mask Reveal

Target visual behavior:

- text: `WELCOME`
- neutral and restrained
- letters/title appear from behind a clean rectangular reveal boundary
- no bounce
- no glow
- no unnecessary particles
- no excessive motion blur
- no shake
- no template-look embellishment
- settle must be calm and readable

Use built-in Text+ and a Rectangle Mask or an equivalent standard Fusion mask mechanism.

Use the existing repo learning authority `fusion-masked-reveal` for conceptual node roles instead of creating a second tutorial.

### Animation implementation

Before writing new code, probe the installed integration for existing animation/modifier/expression/`.comp` authoring capabilities.

If it already supports the required animation, use it.

If it supports declarative/offline `.comp` authoring and safe live application, prefer that over hand-writing another automation framework.

If the only missing piece is a tiny one-off Fusion operation and the installed integration has an existing guarded inline-script action, that can be used **only after**:

- confirming the call is scoped to the disposable project/item
- keeping the script minimal
- reading back the resulting controls/graph where possible
- proving it through render

Do not turn the one-off into a new wedding-project scripting framework.

---

## 7. Intensity S first

For the first Actual Preview, use `S` only.

Do not lock arbitrary production numbers just because the old concept preview used them.

Tune only enough to achieve a restrained reveal and record the actual tested values after visual verification.

M/L variants are out of scope until S is proven.

---

## 8. Render the Actual Preview

Render a 3–8 second sample; target the shared sample authority when possible:

- 1280×720
- 30fps
- 4 seconds
- no audio / muted
- `WELCOME`
- neutral comparison background

Suggested local filename:

`mask-reveal-welcome-davinci-v1.mp4`

This file may remain local if binary/video policy excludes it from Git. Git should track its metadata/provenance and local path convention, not force a large binary into the repository.

Do not register a screenshot or graph dump as `ACTUAL_DAVINCI_RENDER`.

---

## 9. Visual QA

Review the rendered output at:

1. 1.0x
2. 0.5x

Check:

- reveal boundary is clean
- mask edge itself is not visually exposed
- acceleration/deceleration feels intentional
- no accidental overshoot/bounce
- settle is stable
- text remains readable
- neutral sample makes the motion itself easy to judge
- no unnecessary effect was introduced
- output visibly matches the implementation being registered

If possible, compare against the existing Concept Preview, but do not force the DaVinci result to mimic a Remotion implementation when the built-in Resolve behavior is cleaner.

Record Pass/Fail and concise notes.

A failed first render is useful evidence. Fix the actual defect and rerender; do not simply mark it verified.

---

## 10. Promotion rules

Only after local evidence exists, update the registries.

### Implementation

Record:

- exact local Resolve version
- implementation method actually used
- installed state if an artifact is involved
- tested=true only after render test
- verified=true only after Visual QA pass

`PRODUCTION_READY` requires all relevant gates, not merely a successful MCP call.

### Preview

Create/update a preview record with:

- `sourceType: ACTUAL_DAVINCI_RENDER`
- actual local render provenance
- implementationId
- `sampleAssetSetId: sample-typography-welcome-v1`
- exact Resolve version
- generatedAt
- local/Git-safe asset path convention
- verified state matching Visual QA

Do **not** overwrite or relabel the old Concept Preview as Actual. Keep Concept and Actual provenance distinct.

---

## 11. Palmier vertical-slice handoff

After the standalone DaVinci implementation is proven, connect it to Palmier without changing the role split.

Palmier responsibility:

- rough title timing
- rough placement
- clip order
- timeline truth

Palmier must export its **real** DaVinci-compatible NLE XML.

Use the existing section-aware marker authority:

`VML_MASK_REVEAL_<SECTION>`

Do not reintroduce a generic marker such as `MOTION:type-mask-reveal`.

Carry together:

1. Palmier NLE XML
2. Motion Handoff Manifest JSON

Do not fabricate Palmier XML in wedding-project code.

If Palmier is not connected in the current local session, finish and merge the independently proven DaVinci implementation evidence first, then leave the Palmier execution gate explicitly pending. Do not claim it ran.

---

## 12. Git workflow

Before editing Git files after the local test:

1. fetch/latest `main`
2. confirm open PRs and concurrent Movie work
3. create a clean Movie-only branch
4. keep changes limited to the evidence/registry/handoff required by this Mask Reveal verification
5. run relevant Movie Dashboard checks/build
6. review the diff for accidental Paper Item changes
7. push
8. PR
9. CI green
10. squash merge
11. confirm latest `main`

If `main` advances while working, re-evaluate before merge. Do not overwrite another agent's Movie changes.

---

## 13. Evidence report required

At completion, leave a concise Git-tracked report containing:

- Resolve edition/version
- DaVinci integration/MCP used and version
- whether an integration was already present or newly installed
- disposable project/timeline name
- actual implementation route
- exact tested Mask Reveal values that matter
- rendered preview filename/path convention
- Visual QA 1x result
- Visual QA 0.5x result
- known API/manual limitations encountered
- implementation status after evidence
- preview status after evidence
- Palmier handoff status
- remaining blockers

Separate:

- verified facts
- external prior evidence
- assumptions
- unresolved items

---

## 14. Completion condition

This task is complete only when evidence supports:

`Visual Motion Library selection`
→ `Mask Reveal input/manifest`
→ `real DaVinci implementation`
→ `real DaVinci render`
→ `1x + 0.5x Visual QA`
→ `local Resolve version/provenance recorded`

Then, if Palmier is locally available:

→ `Palmier Rough`
→ `real Palmier NLE XML`
→ `NLE XML + Motion Handoff Manifest`
→ `DaVinci import/reapply verified implementation`
→ `final vertical-slice confirmation`

Until these facts exist, do not say the Vertical Slice is complete and do not expand the library just to show progress.
