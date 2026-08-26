# Movie Tool Learning Run 34 — Resolve 21 Free vs Studio execution availability

Date: 2026-08-26  
Status: OFFICIAL-CAPABILITY CROSSCHECK / RUNTIME STILL REQUIRED  
Scope: Movie Tool Learning only

## Why this run exists

The Tool Learning Base already separates handoff fidelity from runtime verification, but one execution dimension needs a sharper boundary: **a Resolve capability may exist in product documentation while being unavailable in the installed edition or through the local execution path**.

This matters directly for Codex/Claude instructions. A generated `.setting`, `.drfx`, FCPXML or `.lottie` can still be useful in Resolve Free even when external Developer API automation is unavailable. Conversely, the existence of Python/Lua/Developer API documentation must not cause an instruction generator to promise external scripting on Resolve Free.

## Official evidence

Blackmagic Design's current Resolve Studio product page explicitly lists **Scripting and Automation** as a DaVinci Resolve Studio capability and says Studio supports Python and Lua scripting plus the Developer API.

Current official product page:

- https://www.blackmagicdesign.com/jp/products/davinciresolve/studio

Blackmagic Design staff also state on the official forum that external scripting is a DaVinci Resolve Studio feature. This is supporting official-staff evidence; the product page is the stronger current product-scope source.

Therefore:

```text
DEVELOPER_API_DOCUMENTED != AVAILABLE_IN_FREE
CAPABILITY_EXISTS != EXECUTION_PATH_AVAILABLE
```

## Execution availability dimensions

Every automated/guided Resolve recipe should distinguish at least:

```text
Capability Availability
Edition Availability
Execution Path Availability
Mutation Surface Availability
Instruction Reliability
Runtime Verification
```

Do not collapse them into a single `supported` boolean.

### Example — Lottie native import

- Capability Availability: officially documented in Resolve 21 on supported platforms
- Edition dependency: no external Developer API required for ordinary native import
- Execution Path: Edit/Media Pool GUI path
- Runtime Verification: Wedding canary pending

Preferred first route remains native import, not scripting.

### Example — DRFX install

- Capability Availability: native template-bundle mechanism
- Edition dependency: first canary intentionally targets Resolve Free
- Execution Path: supported Resolve UI install / Effects Library
- Runtime Verification: Wedding canary pending

Preferred first route remains generated artifact + human/local-agent assisted install.

### Example — Python/Lua Developer API automation

- Capability Availability: Resolve Studio feature
- Edition Availability: Studio required for the external Developer API path
- Execution Path: external scripting must be available/configured in the real runtime
- Mutation Surface: each exact API/property still needs verification
- Runtime Verification: recipe-specific

A Studio license does not prove that every requested mutation exists.

```text
STUDIO_SCRIPTING_AVAILABLE != PROPERTY_WRITE_AVAILABLE
```

## Codex / Claude routing rule

Before generating a Resolve execution instruction, determine:

1. target Page and Human Master intent;
2. whether the shortest correct path is native GUI/import/template before scripting;
3. live edition when available;
4. whether the requested execution path requires Studio;
5. whether the exact mutation surface is Runtime Verified;
6. bounded scope and post-edit readback.

Routing:

```text
Native import / native Edit control / DRFX UI route
  -> prefer when sufficient and editable

External Developer API
  -> only when Studio + execution availability + exact mutation recipe are verified

Assisted GUI rebuild
  -> use when Free lacks the external API path or the exact write surface is not verified

Bake fallback
  -> only when native/rebuild routes are unsuitable and portability is more important than parametric editability
```

## Important distinction for local agents

A local Codex/Claude agent may be able to prepare files, run shell checks and guide/perform GUI steps depending on its computer-control environment. That is **not the same thing as Resolve Developer API availability**.

Do not infer:

```text
LOCAL_AGENT_PRESENT => RESOLVE_SCRIPTING_API_AVAILABLE
```

The local Actual prompt must begin with live runtime identity and supported-path checks rather than attempting undocumented API brute force.

## Current Wedding implications

For the next two neutral canaries:

### `DV21-LOTTIE-OGRAF-01`

Use native `.lottie` import first. The canary is about import, alpha, timing, clip-level editability, save/reopen and source/internal editability. External scripting is unnecessary to establish the primary result.

### `DV21-DRFX-FREE-01`

Use supported `.drfx` installation and Inspector editing. This specifically tests a scripting-free reusable recovery path suitable for Resolve Free.

Only after these paths are understood should a Studio-specific automation canary be added.

## Guardrails

```text
DEVELOPER_API_DOCUMENTED != AVAILABLE_IN_FREE
CAPABILITY_EXISTS != EXECUTION_PATH_AVAILABLE
STUDIO_SCRIPTING_AVAILABLE != PROPERTY_WRITE_AVAILABLE
LOCAL_AGENT_PRESENT != RESOLVE_SCRIPTING_API_AVAILABLE
NATIVE_GUI_PATH_BEFORE_SCRIPTING_WHEN_EQUIVALENT
FREE_LIMITATION != HANDOFF_FAILURE
```

## Runtime backlog

Still high value:

- live edition/version capture on the actual Resolve machine
- Lottie native import + alpha + save/reopen
- DRFX install + Inspector human adjustability + render + uninstall
- Studio-only external scripting canary when Studio is actually available
- exact Fairlight volume/fade write/readback surface rather than general scripting inference

`RESEARCH_SATURATED = false`.
