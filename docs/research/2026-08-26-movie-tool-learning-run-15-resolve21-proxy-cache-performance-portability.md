# Movie Tool Learning Run 15 — Resolve 21 proxy/cache performance vs portability

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

Wedding Motion templates can be editable yet frustrating if playback is slow. Performance helpers must be tracked separately from source truth and package portability, otherwise a project can appear healthy on one workstation and fail after transfer or cache cleanup.

## 1. Resolve 21 adds background proxy generation

The DaVinci Resolve 21 New Features Guide documents Background Rendering preferences with independent task toggles, including Proxy Generation. Background work can also pause when foreground UI activity resumes.

This improves the human editing experience because proxy generation can happen without occupying the main interaction loop.

Guardrail:

`BACKGROUND_GENERATION != SOURCE_TRUTH`

The fact that Resolve can generate proxies in the background does not change the ownership/portability semantics of the underlying media.

## 2. Stable Blackmagic semantics: Proxy Media vs Render Cache vs Optimized Media

Blackmagic's official Resolve documentation historically distinguishes these performance paths:

- Proxy Media: independent media files on disk; intended to be portable/relinkable.
- Render Cache: project-scoped derived media for heavy effects/compositions; not intended as an external portable asset.
- Optimized Media: Resolve-managed derived media for playback; not an export/package source of truth.
- Timeline Proxy Mode: playback-resolution reduction, not a generated replacement media package.

These are stable conceptual distinctions, but exact Resolve 21 file/container defaults and alpha behavior require runtime revalidation.

Guardrails:

`PROXY_MEDIA != RENDER_CACHE`

`OPTIMIZED_MEDIA != PORTABLE_PROXY`

`TIMELINE_PROXY_MODE != MEDIA_PROXY`

`CACHE_PRESENT != PROJECT_PORTABLE`

## 3. Motion Zukan needs separate state axes

Every Wedding motion recipe should track at least:

### Source state

- ORIGINAL_SOURCE_AVAILABLE
- HUMAN_MASTER_AVAILABLE
- DEPENDENCY_MANIFEST_AVAILABLE

### Performance state

- NO_DERIVED_MEDIA
- PROXY_AVAILABLE
- OPTIMIZED_MEDIA_AVAILABLE
- CACHE_AVAILABLE

### Portability state

- LOCAL_ONLY
- RELINKABLE_PROXY
- DRT_RELINKABLE
- DRA_ARCHIVE_VERIFIED
- BAKED_ONLY

Never derive portability from performance state.

## 4. Human adjustability consequence

A highly editable Fusion/Resolve template can still be poor for humans if every parameter change triggers slow playback. Preferred workflow:

1. preserve original source + Human Master,
2. use Proxy Media for heavy original footage where appropriate,
3. use Resolve cache for heavy effects as an ephemeral local acceleration layer,
4. keep template Inspector controls simple,
5. invalidate/regenerate cache instead of treating it as deliverable truth.

For still-photo-heavy wedding compositions, proxying may add little value; cache may matter more for Fusion/OFX-heavy sections. Compiler routing should choose performance aids based on bottleneck rather than apply them universally.

Guardrail:

`PERFORMANCE_OPTIMIZATION_IS_BOTTLENECK_SPECIFIC`

## 5. Alpha warning

Older official Resolve documentation shows cache/optimized-media format choice can affect fidelity and key/alpha-sensitive data. Therefore the Run 13 three-stage alpha model remains mandatory:

- ALPHA_IMPORT,
- ALPHA_WORKING_PATH,
- ALPHA_EXPORT.

If cache or optimized media is enabled for an alpha-heavy wedding motion, it becomes part of ALPHA_WORKING_PATH verification.

Guardrail:

`FAST_PLAYBACK != ALPHA_SAFE`

## 6. New canaries

### DV21-PROXY-BG-01 — background proxy usability

In Resolve 21:

- enable background proxy generation,
- import representative heavy media,
- confirm proxy task proceeds in background,
- resume active editing and observe pause/interaction behavior,
- verify relink/original switching,
- save/reopen,
- transfer proxy plus project/timeline to a clean context and verify relinkability.

### DV21-CACHE-EPHEMERAL-01 — cache is disposable

For a heavy Fusion/OFX clip:

- render/cache until real-time playback is achieved,
- record cache state,
- clear/delete cache,
- reopen project,
- confirm source/template remains editable and cache can regenerate,
- verify no Human Master or dependency information was stored only in cache.

### DV21-ALPHA-CACHE-01 — alpha working-path safety

For an alpha asset/template:

- composite reference matte,
- test representative cache/optimized settings,
- compare before/after matte edges and premultiplication behavior,
- clear/regenerate cache,
- export through trusted alpha deliver candidate.

Promote only the exact cache/codec recipe that passes.

### DV21-PERF-HUMAN-01 — human editing latency

Measure a simple late-edit task before/after the chosen performance optimization:

- change photo,
- adjust motion intensity,
- scrub,
- change color,
- render preview.

Record whether the optimization actually improves human adjustment time. Avoid complexity that does not pay back.

## 7. Packaging implication

Do not package Render Cache as a required wedding handoff dependency.

Proxy Media may be optionally shipped when it materially improves collaborative editing, but the dependency manifest must still point to original source identity and state whether proxies are disposable/rebuildable.

DRA/DRT portability canaries must be executed with and without local cache to prove the project is not accidentally cache-dependent.

## Trust-state changes

- Resolve 21 background proxy generation: official/evidence-backed, Wedding Runtime Pending.
- Proxy/Cache/Optimized conceptual separation: official stable evidence; Resolve 21 implementation details pending canary.
- Render Cache as source/package truth: explicitly prohibited.
- performance optimization as a separate Motion Zukan axis: promoted policy.

## Evidence

Primary:

- Blackmagic Design — DaVinci Resolve 21 New Features Guide, Background Rendering / Proxy Generation.
- Blackmagic Design official Resolve documentation — Proxy Media vs Timeline Proxy Mode / Render Cache / Optimized Media conceptual distinctions.

Older official documentation is used only for stable semantics and must not be treated as proof of Resolve 21 codec defaults or runtime alpha behavior.
