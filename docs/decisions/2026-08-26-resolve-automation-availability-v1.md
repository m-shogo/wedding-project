# Resolve Automation Availability v1

Date: 2026-08-26  
Status: CANONICAL / RUNTIME ROUTES STILL PROPERTY-SCOPED
Scope: Movie / Motion Zukan Tool Learning Base

## Decision

Capability availability and execution availability are separate dimensions.

A Motion Zukan property may have a credible DaVinci-native rebuild route while the user's installed Resolve edition/context does not permit Codex to drive that route externally. Therefore the UI/instruction layer must not translate `AUTO_REBUILD` into `Codex can automate this on any Resolve installation`.

## Current official evidence

Blackmagic Design's current DaVinci Resolve Studio product page lists Python and Lua scripting, developer APIs, workflow integrations, and remote scripting API as Studio capabilities:

- https://www.blackmagicdesign.com/jp/products/davinciresolve/studio

Blackmagic Design's current Fusion 21 comparison page lists embedded Lua/Python scripting, macros and custom-tool extensibility for Fusion 21 in DaVinci Resolve Studio 21 / Fusion Studio 21:

- https://www.blackmagicdesign.com/products/fusion/compare

DaVinci Resolve 21 New Features Guide documents direct `.lottie` / OGraf import and Fusion `OGrafLoader`, which gives a non-external-API asset recovery path:

- https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf

## Guardrail

`CAPABILITY_AVAILABLE != CODEX_EXECUTION_AVAILABLE`

Use the following routing:

1. Resolve edition/context is **Studio and external API route is runtime-verified for the exact mutation**
   - external Codex/Python/Lua automation may be selected.
2. Resolve edition is **Free**
   - do not promise external Developer API automation;
   - prefer direct asset import, editable native UI, Macro/Template artifacts, or assisted rebuild.
3. Resolve edition is **unknown**
   - keep external automation availability unverified;
   - preserve a non-API fallback in the instruction.
4. A property remains `PENDING_RUNTIME` until its actual mutation/import/render Canary passes regardless of edition.

## Why this matters

Without this axis, the Motion Zukan can truthfully say that `ImportFusionComp()` or a developer API exists while still giving the user an instruction they cannot execute in their installed edition. This is an Instruction Reliability failure, not a Capability Availability failure.

## Implementation

Canonical data:
- `movie-dashboard/src/data/resolveAutomationAvailability.ts`

UI:
- `movie-dashboard/src/components/MaskRevealSceneHandoffCard.tsx`
  - shows an explicit automation-availability warning while edition is unresolved.

Verifier:
- `movie-dashboard/scripts/verify-palmier-davinci-handoff-fidelity-contracts.mjs`
  - requires Free/Studio/Unknown as a separate axis;
  - requires external developer/workflow routes to stay Studio-scoped;
  - requires a direct Lottie non-API fallback;
  - requires the Handoff UI to surface the availability boundary.

## Honesty boundary

This decision does not claim that every internal script/macros workflow is unavailable in DaVinci Resolve Free, nor does it infer Free-edition behavior from old forum anecdotes. It only scopes **external developer/API automation** to the current official Studio product contract and keeps other routes capability-by-capability until runtime verification.
