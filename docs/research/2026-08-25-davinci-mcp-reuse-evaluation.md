# DaVinci Automation Reuse Evaluation — 2026-08-25

Status: ACTIVE RESEARCH EVIDENCE
Scope: Movie only / Mask Reveal vertical slice
Decision: **Reuse existing Resolve automation before building custom scripting.**

## Executive decision

For `type-mask-reveal`, do **not** build a wedding-project-specific DaVinci automation layer first.

Preferred order:

1. DaVinci built-in Text+ / Fusion / Rectangle Mask
2. existing wedding-project `fusion-masked-reveal` learning recipe
3. existing external DaVinci Resolve MCP, after local safety/compatibility probe
4. manual DaVinci operation where the official scripting API has a real gap
5. custom `.setting` / `.drfx` only if repeated manual work justifies it

Reactor / marketplace assets are **not required for the first Mask Reveal slice**. Built-in Resolve capability is sufficient, so adding a third-party effect would violate Reuse Before Build rather than help it.

---

## Evidence 1 — Blackmagic official training

Source:
- https://www.blackmagicdesign.com/products/davinciresolve/training
- https://www.blackmagicdesign.com/jp/products/davinciresolve/training
- official DaVinci Resolve 20 Fusion / Visual Effects training material

Observed capability:
- current official training includes Resolve 20 Beginner, Fusion and Visual Effects material.
- Text+ is a standard Resolve/Fusion text tool and can be used as the basis of a title that is refined in Fusion.
- Fusion is the built-in node-based motion/VFX environment, so the first Mask Reveal does not require a purchased template.

Wedding use:
- `WELCOME`, names/date, Profile chapter titles.
- text remains independent of the real photo and can be refined without modifying source media.

Reusable: YES
License: built into Resolve / official training
Version note: official training currently targets Resolve 20, but **production verification must record the locally installed Resolve version** rather than infer it from the web.
Confidence: HIGH

---

## Evidence 2 — Palmier official handoff

Source:
- https://www.palmier.io/docs
- https://www.palmier.io/pricing

Observed capability:
- Palmier MCP can operate with project context.
- official documentation describes timeline editing such as trim / split / reorder / clip adjustment.
- export supports NLE XML for DaVinci Resolve.
- timeline/editing/export capability is distinct from paid generation-credit usage.

Wedding use:
- Palmier remains Rough timing / placement.
- actual timeline truth comes from Palmier-exported NLE XML.
- Fusion-specific intent travels beside XML in `motion-handoff/v1` JSON.

Reusable: YES
Confidence: HIGH

---

## Evidence 3 — existing external DaVinci Resolve MCP

Candidate:
- repository: `mrsuber/davinci-resolve-mcp`
- the repository references the wider `samuelgursky/davinci-resolve-mcp` project line
- observed README version during this review: `2.69.3`
- license: MIT
- recent repository activity observed through 2026-08-06

Relevant documented capabilities:
- Resolve project / timeline / render control through the official Scripting API
- Fusion timeline-item composition operations
- Text+ read/write
- Rectangle / Ellipse mask creation
- graph connection validation
- Fusion title insertion
- render / deliver helpers
- guarded / readback-oriented operations
- an in-app bridge path documented for the Resolve free edition, with an explicit supported-until-it-is-not caveat that must be locally rechecked

Relevant live validation artifact:
- `tests/live_fusion_mask_title_validation.py`
- the project records live verification of:
  - inserting a `Text+` Fusion title
  - setting and reading back `StyledText`
  - adding a `RectangleMask`
  - connecting a mask to `Text+.EffectMask`
  - reporting connection failure honestly when a target has no mask input

Why this matters:
- this control surface is very close to the Mask Reveal vertical slice.
- wedding-project should reuse/probe it before creating a new Resolve MCP / Python bridge.

License: MIT
Reusable: CANDIDATE YES, subject to local install/security/version probe
Confidence: HIGH for repository capability; LOCAL VERIFICATION REQUIRED for the locally installed Resolve build

---

## Important API limitations discovered

Source:
- `mrsuber/davinci-resolve-mcp/docs/reference/api-limitations.md`
- live-test commits in that repository

### 1. Fusion title destination track is not fully scriptable

The Resolve scripting API does not expose the Edit page source/auto track selector as a normal destination-track parameter for `InsertFusionTitleIntoTimeline`.

The external project reports live verification that insertion follows the available selector target (V1 in its test path), and locking V1 does not simply redirect insertion to V2.

Impact on wedding workflow:
- do **not** promise that an agent can always insert a title directly above an existing V1 photo on V2/V3 using only the official API.
- where the real timeline needs a different video track, a small manual placement step may remain the correct solution.
- use a disposable validation timeline first instead of mutating the real Opening timeline to work around the limitation.

Confidence: MEDIUM-HIGH external live evidence; recheck on local Resolve version.

### 2. `AddFusionComp()` on a media-backed clip can be misleading

The external project records a live test where an API-created Fusion comp attached to a media-backed clip read back correctly in the graph but did **not** affect the rendered output, while a separately inserted Fusion Title did render.

Impact:
- do not implement Mask Reveal by blindly calling `AddFusionComp()` on the Palmier-imported Hero photo and assume success because the node graph reads back.
- **render evidence is mandatory**.
- prefer the proven Fusion Title path for the first automation experiment.

Confidence: HIGH for the tested versions in that project; local recheck required.

---

## Existing wedding-project reuse

The repository already has:

`movie-dashboard/src/data/fusionNodeTranslator.ts`

with recipe:

`fusion-masked-reveal`

Its learning model already covers the needed concepts:

`MediaIn / photo → Text+ → Rectangle Mask → Merge → MediaOut`

Therefore:
- do not duplicate a second Mask Reveal tutorial.
- Visual Motion Library should reuse/link the existing learning recipe when it needs just-in-time learning.
- DaVinci MCP is an execution transport, not a new source of motion-design truth.

---

## Recommended local execution experiment

Use a **disposable Resolve project**, not the real Opening project first.

1. determine installed Resolve edition/version
2. determine whether a Resolve MCP is already installed; do not create a duplicate integration
3. if needed, inspect the current external MCP release/instructions before installation
4. read-only probe: Resolve version and available capabilities
5. create a disposable project/timeline only after the probe succeeds
6. insert a built-in `Text+` Fusion title
7. set text to `WELCOME`
8. add Rectangle Mask to Text+ and verify the connection/readback
9. author the smallest Mask Reveal animation that can be proven in render
10. render the shared neutral WELCOME sample for 3–8 seconds
11. inspect normal speed and 0.5x
12. only then bring the verified method into the wedding project timeline

No generated `.setting`, installed template, MCP result or node-graph readback becomes production authority until:

`available/generated → installed if applicable → opened-in-davinci → implementation-applied → render-tested → visual-QA → local Resolve version recorded`

---

## Decision for Mask Reveal v1

Implementation authority remains:

`DAVINCI_TEXT_PLUS + Fusion Rectangle Mask`

Automation candidate:

`mrsuber/davinci-resolve-mcp` / current upstream-compatible release

Implementation status stays:

`AVAILABLE`

Preview stays:

`REPO_GENERATED / CONCEPT`

until an actual local DaVinci render exists.

## What NOT to do next

- do not install Reactor just to obtain Mask Reveal
- do not buy a title pack for Mask Reveal
- do not create a wedding-specific Resolve MCP
- do not migrate the remaining Motion Kit entries before this slice works
- do not mark external MCP live tests as proof of our own local render
- do not modify the real Opening timeline before disposable-project verification
- do not treat graph readback alone as render verification

## Next gate

The next real evidence must come from a local Resolve session:

`Resolve version/edition probe → disposable Mask Reveal → actual render → normal/0.5x visual QA → preview provenance + local Resolve version registration`
