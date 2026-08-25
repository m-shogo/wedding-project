# Visual Motion Library Current Audit — 2026-08-25

Status: ACTIVE BASELINE
Scope: Movie only (`movie-dashboard`, `motion-studio`, movie docs). Paper Item / Rurubu / Passport are explicitly out of scope.
Prompt authority: `docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md`

## Executive summary

The repository already contains most of the raw material needed for the new Visual Motion Library. The correct move is not to create another parallel motion system. The existing 36-preset Motion Kit, 97 Director Recipes, Movie Coach/Dictionary, Comparison Lab, Palmier Handoff and Remotion preview infrastructure should be reclassified and connected behind a smaller source-of-truth model.

The first production vertical slice remains **Mask Reveal**. Existing `type-mask-slide` / MaskRevealTitle assets are useful prior art, but they are not evidence of an actual DaVinci implementation. Until a DaVinci render is produced from the registered implementation, the preview must remain `REPO_GENERATED` / `CONCEPT`, never `ACTUAL_DAVINCI_RENDER`.

## Current main / repository state

- Default branch: `main`
- Open PR at audit start: 0
- Movie work must use a dedicated branch and must not modify Paper Item production paths.
- Existing repository instructions correctly prioritize actual wedding movie completion over infrastructure growth.
- Existing instructions still contain historical CapCut / Remotion authority that needs scope clarification rather than destructive removal.

## Existing asset classification

| Existing asset | Classification | Decision |
|---|---|---|
| Profile Movie Coach | KEEP + MERGE | Keep the Profile-specific readability/story guidance. Link patterns into it rather than duplicate a second profile system. |
| 逆引きDaVinci辞典 | SPLIT + MERGE | Separate technical Vocabulary from visual Motion Pattern. Keep the learning content as just-in-time links. |
| Motion Kit 36 (`startMotionKit.ts`) | MERGE | Strong seed set for Motion Pattern Registry. Existing ids/metadata should migrate through adapters; do not preserve “36” as a product goal. |
| Director Recipes 97 | KEEP + SPLIT | Keep true multi-pattern editorial recipes; move simple single-motion entries down to Pattern where appropriate. Do not preserve “97” as a goal. |
| StaRt Showcase | REFERENCE_ONLY + PROJECT_MAPPING | Keep as a project-specific comparison/reference surface. It must not define the shared motion ontology. |
| StaRt Selection | KEEP | Human Favorite/Maybe/Reject decisions remain separate from implementation verification. |
| StaRt Production Workspace | KEEP + PROJECT_MAPPING | Project execution surface; consume shared Pattern/Recipe ids. |
| Movie Review / Before-After / Comparison Lab | KEEP + MERGE | Reuse for same-sample visual comparisons and human decisions. |
| Reference Breakdown | KEEP | Use for Preview Reference vs Training Reference separation. |
| Palmier Handoff | MERGE + RENAME OVER TIME | Current handoff already proves useful. Evolve toward NLE XML + Motion Handoff Manifest rather than replacing it. |
| Assets / Photo plan / Prompt Bank | KEEP | Inputs for Pattern slots and Prompt Generator. Do not make Prompt Bank the product center. |
| Remotion Motion Studio | REFERENCE_ONLY / PREVIEW_AUX | Retain when useful for neutral concept previews, comparisons or unique overlays. It is not shared production authority. |
| Opening V1 Short Candidate Remotion implementation | KEEP AS LEGACY/SHORT AUTHORITY | Its existing source-of-truth remains valid for that specific Short Candidate. This does not make Remotion the new common production line. |

## Main architectural conflict found

`CLAUDE.md` currently says the Opening V1 Short Candidate uses Remotion as implementation source-of-truth and Palmier/CapCut only for polish. That statement was correct for the existing Short Candidate, but it conflicts if interpreted as the global future workflow.

Resolution:

1. Preserve Remotion authority for the existing **Opening V1 Short Candidate** only.
2. Define the new shared production line as:
   `Visual Motion Library → Prompt Generator → Palmier Rough → NLE XML + Motion Handoff Manifest → DaVinci Final`.
3. Keep Remotion as auxiliary preview/reference implementation where it is genuinely useful.
4. Do not auto-promote any Remotion preview to actual DaVinci evidence.

## Motion Kit findings

The current Motion Kit already contains close matches for the proposed vertical slice and MVP:

- `type-mask-slide`
- `type-char-stagger`
- `type-tracking-burst`
- `photo-static-hero`
- `photo-small-push`
- `photo-slow-pull`
- `photo-directional-pan`
- `photo-split-panel`
- `cut-hard-accent`
- `cut-match-shape`
- route/wipe/impact candidates

Problems to correct:

- engine/status fields are too coarse for Palmier-vs-DaVinci verification.
- Japanese-first natural-language aliases are missing as a first-class schema.
- Preview provenance is not tied strongly enough to implementation provenance.
- Input slot schemas are not first-class.
- Opening/Profile suitability is implicit rather than explicit.
- Existing `remotion` values describe renderability, not production truth.

## Director Recipe findings

The 97-recipe catalog is already structured as editorial combinations and references Motion Kit ids. This is valuable and should not be rewritten wholesale.

However:

- true recipes should remain Layer C.
- single-motion concepts masquerading as recipes should eventually move to Layer B.
- project-specific StaRt section recommendations belong in Project Mapping, not in the shared Pattern definition.
- human approval must remain separate from implementation verification.

## Palmier findings

Existing repo docs already position Palmier as a rough-edit / MCP tool and include a section-based handoff exporter. Historical docs still say CapCut is final.

Current official Palmier documentation (checked 2026-08-25):

Source: https://www.palmier.io/docs
Observed capability:
- MCP agent can see project context.
- agent can trim, split, reorder and adjust clips.
- export supports MP4 H.264/H.265/ProRes.
- export supports NLE XML for Premiere Pro, DaVinci Resolve and Final Cut.
Wedding use: Palmier is suitable as the rough timeline and timing authority before DaVinci finishing.
Reusable: YES.
License/cost note: official page states editing and export stay free; generation credit usage is separate and should not be assumed free.
Confidence: HIGH (official source).

## DaVinci findings

Current official Blackmagic training page (checked 2026-08-25):

Source: https://www.blackmagicdesign.com/products/davinciresolve/training
Observed capability:
- official DaVinci Resolve 20 Beginner guide.
- official Fusion introduction and motion graphics training.
- official Visual Effects Guide to DaVinci Resolve 20.
- Fusion is the node-based VFX/motion-graphics environment inside Resolve.
Wedding use: final Text/Text+, masks, keyframes/easing, Fusion-only effects, Color, Fairlight and Deliver.
Reusable: YES; official/built-in implementation takes precedence over custom work.
License: Resolve has free and Studio variants; each implementation must record whether Studio-only functionality is required.
Confidence: HIGH (official source).

Version rule:
- Registry must record the **locally tested Resolve version**, not infer it from web documentation.
- Official training currently anchors to Resolve 20, but production verification is local-version-specific.

## Reuse Before Build decision for Mask Reveal

Before building a new effect:

- searchedExistingPatterns: YES — `type-mask-slide`, `MaskRevealTitle`, Motion Kit/recipe references exist.
- searchedDaVinciBuiltins: YES at capability level — Text+/Fusion mask/keyframe workflow is supported by official Resolve/Fusion training; exact local preset still requires in-app verification.
- searchedExternalSources: YES — official Blackmagic training first. No marketplace asset is needed for the first vertical slice.
- whyExistingOptionsFail: Existing Remotion code proves a visual concept but does not prove DaVinci behavior or Palmier handoff fidelity.
- whyNewPatternIsNeeded: A new *registry record*, not a new invented effect, is needed to connect Japanese-first discovery, input slots, prompt outputs, Palmier capability, DaVinci implementation and preview provenance.

## Minimal architecture decision

Create only these shared authorities initially:

1. `Motion Pattern Registry`
2. `Implementation Registry`
3. `Preview Registry`
4. `Vocabulary Registry` (small, linked only as needed)
5. `Recipe Registry` adapter over existing Director Recipes
6. `Project Mapping` adapter for StaRt/Profile

Do **not** migrate all 36/97 entries first.

Vertical slice order:

1. `type-mask-reveal`
2. `photo-hero-still`
3. `camera-gentle-push` (Profile validation)

## Mask Reveal vertical slice gate

A complete slice requires:

- discoverable by Japanese aliases
- neutral preview visible with provenance badge
- clear Japanese-first explanation
- Text slot + optional Hero Photo slot
- Opening/Profile applicability
- Human Brief
- Claude Creative Instruction
- Palmier Instruction
- DaVinci Finish Manifest
- Machine JSON
- NLE XML handoff path documented
- actual DaVinci implementation registered
- actual DaVinci render registered as `ACTUAL_DAVINCI_RENDER`
- local Resolve version recorded
- visual QA passed

Until the last four items are completed in a local Resolve environment, status must stop at `AVAILABLE`/`TESTED` as evidence permits; never claim `PRODUCTION_READY`.

## Anti-overbuild gate

Do not add another pattern while Mask Reveal still lacks a real DaVinci render unless the added work is strictly required to finish Mask Reveal.

The existing 36/97 catalogs remain accessible during migration, but their counts are no longer success metrics.
