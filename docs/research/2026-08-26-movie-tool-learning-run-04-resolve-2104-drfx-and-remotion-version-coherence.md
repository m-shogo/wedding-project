# Movie Tool Learning Run 04 — Resolve 21.0.4 / scripting scope / DRFX portability / Remotion version coherence

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

Run 03 established Remotion-native routing candidates. This run checks the highest-value unresolved boundaries that affect whether Codex can safely hand editable motion into the currently available Resolve Free environment without pretending that a documented capability is executable automation.

## 1. Resolve version authority correction

Previous research pinned the latest stable Resolve 21 line to 21.0.3. Blackmagic Design's official Support Center now lists **DaVinci Resolve 21.0.4 / Resolve Studio 21.0.4**, released 2026-08-05.

The 21.0.4 release notes add, among other items, scripting-API support for reviewing currently selected timeline clips.

The local wedding-project decision record already contains real-machine evidence that the installed application is **Resolve Free 21.0.4** and that external scripting is unavailable in that edition/environment. Therefore:

- version baseline for future Resolve Actual canaries becomes 21.0.4,
- Studio scripting capability and Free runtime availability remain separate dimensions,
- older 21.0.3 evidence is not deleted; only claims depending on patch-level API behavior become Needs Revalidation.

Guardrail:

`PATCH_UPDATE => REVALIDATE_DEPENDENT_CAPABILITIES_ONLY`

Do not invalidate unrelated Palmier exporter knowledge just because Resolve moved from 21.0.3 to 21.0.4.

## 2. Selected Timeline Clips is a targeting improvement, not a write capability

Resolve 21.0.4's shipped Developer/Scripting README is reported by downstream implementers as adding `Timeline.GetSelectedClips()` and `MediaPoolItem.GetTimeline()`. A Resolve 21.0.4.5 macOS Studio runtime report reproduces both APIs and the new render-setting keys.

This matters for Instruction Reliability because a Studio-side Codex/Resolve instruction can now target the clips the human explicitly selected instead of relying only on playhead position or scanning all TimelineItems.

Preferred Studio instruction pattern when available:

1. Human selects the intended timeline clips.
2. Instruction states Page + Timeline + expected selected count/name constraints.
3. Script reads `Timeline.GetSelectedClips()`.
4. Abort if selection is empty or does not match the bounded scope.
5. Apply only a separately verified mutation surface.
6. Read back the changed property and compare to Human Master.

But `GetSelectedClips()` is read/scope evidence only. It does **not** prove any property is writable.

Guardrail:

`READ_SCOPE_AVAILABLE != WRITE_CAPABILITY_AVAILABLE`

This is especially important for audio volume/fade, which must stay ASSISTED/PENDING until a real write surface is reproduced.

Free-environment note: because the current Resolve Free environment cannot expose the required external scripting path, selected-clip API improvements currently raise **Studio automation reliability**, not Free automation availability.

## 3. `.drfx` is the strongest scripting-free rebuild/package candidate found so far

Blackmagic's Fusion manuals document Fusion Template Bundles as a normal distribution mechanism. The recipe is deterministic:

- Build the expected template directory structure.
- Place `.setting` template files into the correct directory.
- Include icon files and associated assets when required.
- ZIP the directory structure.
- Rename the ZIP extension to lowercase `.drfx`.
- Install by double-clicking the `.drfx` file or dragging it into the Fusion page, then approving the install dialog.

Documented Edit-page bundle hierarchy:

- `Edit/Effects`
- `Edit/Generators`
- `Edit/Titles`
- `Edit/Transitions`

Fusion-page templates use `Fusion`.

This is important because it does not require the external Developer API for the install action. It is therefore a better first recovery route for the current Resolve Free environment than promising `ImportFusionComp()` automation that cannot be invoked externally there.

New compiler route:

`Canonical Motion Spec -> generated .setting + bundled assets -> .drfx -> human install -> native Edit/Fusion template`

Candidate fidelity:

- transport of the original Palmier property: still `REBUILD_VALUES` or `REBUILD_ASSET` depending on the source capability,
- Resolve packaging: native reusable template candidate,
- automation availability in current Free environment: `GENERATE_ARTIFACT + ASSISTED_INSTALL`, not `EXTERNAL_AUTO_APPLY`,
- editability after install: depends on which Macro controls are exposed and must be checked by runtime canary.

Guardrail:

`GENERATABLE_DRFX != RUNTIME_VERIFIED_TEMPLATE`

A syntactically valid ZIP hierarchy is not enough. Clean-context install, Effects Library visibility, control exposure, save/reopen, dependency relink and render parity are required before Trusted promotion.

## 4. DRFX dependency and uninstall semantics

The Fusion manual explicitly allows associated assets to be included in the bundle. It also states the bundle is kept as one bundle rather than being unpacked back into independent template files; deleting the bundle removes the associated templates in that bundle.

Therefore every generated Wedding `.drfx` should have a sidecar manifest before promotion:

- bundle id/version,
- target category (Effect/Generator/Title/Transition/Fusion),
- `.setting` files,
- embedded asset paths,
- font dependencies that cannot be embedded,
- LUT/OFX/plugin dependencies,
- Resolve minimum/tested version,
- expected exposed controls,
- uninstall/reinstall verification state.

This is a portability requirement, not optional documentation.

## 5. Remotion package version coherence

The official Remotion CLI source warns that mismatched Remotion package versions can produce type errors, feature incompatibilities, failed renders and unclear errors. Its remediation explicitly says to keep all Remotion packages on the same version and remove range prefixes such as `^` when pinning.

Current wedding-project lockfile resolves `remotion` and the used `@remotion/*` packages coherently to 4.0.475, but `package.json` still uses broad `^4.0.0` ranges. The lockfile protects the current install, but a clean dependency refresh can move packages unexpectedly if the lock is regenerated.

Guardrails:

`REMOTION_UPGRADE_IS_ATOMIC`

`LOCKFILE_COHERENCE != MANIFEST_PINNING`

Before the 4.0.508 runtime canary, create a clean upgrade branch where all used Remotion packages are changed together to the exact same candidate version. Never upgrade only `remotion` or one Studio-related package in isolation.

## 6. Compiler routing update

For Palmier/Remotion capabilities that need Resolve-native editability in the current Free environment, use this order until runtime canaries disprove it:

1. Existing Resolve-native import that requires no script (FCPXML, Lottie/OGraf, media import).
2. Native Edit/Text+ property already transported by FCPXML.
3. Generated `.setting` packaged as `.drfx`, installed through Resolve UI.
4. Human Master guided native rebuild in Edit/Fusion/Fairlight.
5. Alpha render + sidecar as bake fallback.
6. Studio external scripting only when the actual environment is Studio and the mutation path is runtime verified.

This deliberately routes around edition-unavailable automation rather than treating Free Resolve as a broken Studio installation.

## 7. New canaries

### DV-DRFX-FREE-01 — clean-context template install

On Resolve Free 21.0.4:

- create a trivial generated `.setting` with one obvious visual parameter and one exposed numeric control,
- package it under the correct `.drfx` hierarchy,
- install using the documented UI path,
- confirm it appears in the expected Effects Library category,
- add it to a clean timeline,
- mutate the exposed control manually,
- save/reopen,
- render before/after frames,
- remove the bundle and verify uninstall behavior.

Promote only the exact recipe/category that passes.

### DV-DRFX-DEPS-01 — dependency portability

Build a bundle with an embedded image/SVG plus a deliberately external font dependency. Install into a clean user profile/context and record which dependencies travel and which require sidecar installation.

### DV-SEL-2104-01 — selected-clip scope (Studio-only when available)

In Resolve Studio 21.0.4 or later:

- select two non-adjacent clips,
- read `Timeline.GetSelectedClips()`,
- verify count/identity/order behavior,
- run a harmless verified mutation only on those clips,
- confirm no unselected clip changed.

This validates Instruction Reliability, not general scripting trust.

### RM-VERSION-COHERENCE-01

In a clean Remotion upgrade branch:

- pin every used `remotion` / `@remotion/*` package to the exact same candidate version,
- run `remotion versions --log=verbose`, typecheck and existing checks,
- render the Golden set on 4.0.475 and candidate version,
- block upgrade on unexplained visual or runtime differences.

## Trust-state changes from this run

- Resolve latest patch authority: **21.0.4 Evidence-backed**.
- `Timeline.GetSelectedClips()`: **Evidence-backed / runtime report exists externally / not Wedding Runtime Verified**.
- `.drfx` package/install recipe: **officially documented / Wedding Runtime Pending**.
- `.drfx` as Free-friendly recovery route: **preferred candidate**, not yet Trusted.
- Audio volume/fade scripting write: **unchanged; still PENDING/ASSISTED**.
- Remotion exact-version atomic upgrade rule: **source-backed Guardrail**.

## Failure fingerprints converted to guardrails

- `version-authority-stale`: claiming 21.0.3 is current after 21.0.4 release -> check official Support patch version before each Resolve Actual run.
- `read-implies-write`: a new getter is mistaken for mutation support -> classify read scope and write capability independently.
- `studio-capability-promised-on-free`: documented Developer API is promised in Free -> evaluate Edition/Execution Availability before instruction generation.
- `drfx-zip-is-enough`: a generated archive is called portable without clean install/reopen/dependency test -> keep PENDING_RUNTIME.
- `remotion-partial-upgrade`: one Remotion package changes version alone -> block; upgrade atomically.

## Research saturation

NO_CHANGE is false. This run found a newer Resolve patch, a new selected-clip scope API, a scripting-free `.drfx` recovery path with official packaging semantics, and a Remotion version-coherence guardrail. High-value runtime backlog remains, so `RESEARCH_SATURATED` is not applicable.

## Evidence

Primary:

- Blackmagic Design Support Center — DaVinci Resolve 21.0.4 update, 2026-08-05.
- Blackmagic Design Fusion Reference Manual — Fusion Template Bundles / `.drfx` creation and installation.
- remotion-dev/remotion source — CLI version mismatch warning/remediation.

Secondary runtime evidence:

- samuelgursky/davinci-resolve-mcp issue #131 — shipped 21.0.4 README API additions and live Studio 21.0.4.5 reproduction. This is supporting evidence only; Wedding Runtime remains pending.
