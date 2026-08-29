# Movie Tool Learning Run 36 — Palmier Scene v2 → Resolve Effective Runtime Plan

Date: 2026-08-26  
Status: IMPLEMENTED PRE-RUNTIME / LOCAL RESOLVE ACTUAL STILL REQUIRED  
Scope: Movie Tool Learning only

## Why this run exists

Run35 upgraded the real Palmier synthetic scene and added a deterministic FCPXML scene fingerprint, but the existing generic Resolve canary definition still asked only for the older root inventory/transform/audio observations.

That created a second coverage gap:

```text
SCENE_V2_READY != RUNTIME_PLAN_V2_READY
```

A local agent could correctly export the v2 Palmier scene, create a generic Resolve Session, and still fail to explicitly record:

- independent text width/height scale behavior;
- text-scale animation timing/editability;
- title-box transform omission/mapping separately;
- L1/L2 nested representation/timing/editability;
- visual render checkpoint for the newly added probes.

Run36 closes that gap without rewriting the historical generic six-canary catalog.

## Architecture decision — effective overlay, not destructive catalog rewrite

The canonical generic `resolveRuntimeCanaryPack.ts` remains intact for backward compatibility and existing canaries.

Palmier scene v2 gets a dedicated effective runtime definition:

```text
motion-studio/src/data/resolvePalmierFCPXMLV2Runtime.ts
```

Reason:

- only Palmier FCPXML changed coverage;
- rewriting the large generic pack increases unrelated regression risk;
- historical v1 sessions/evidence should remain interpretable;
- a v2-specific runtime path can require stronger evidence without silently changing old session semantics.

This is an execution overlay, not a claim that the base source evidence was runtime verified.

## Effective capability references

The v2 runtime definition preserves existing canonical handoff refs and adds three source-evidence-scoped refs:

```text
title-independent-text-scale
  -> movie-dashboard/src/data/palmierFCPXMLCurrentEvidence.ts

title-box-transform-scale-rotation
  -> movie-dashboard/src/data/palmierFCPXMLCurrentEvidence.ts

nested-timeline-compound
  -> movie-dashboard/src/data/palmierFCPXMLCurrentEvidence.ts
```

These are deliberately typed as:

```text
SOURCE_EVIDENCE
```

not `RUNTIME_VERIFIED` handoff properties.

## Effective runtime steps

The Palmier v2 runtime step set is now exactly:

```text
import-clean
inventory-readback
core-property-readback
independent-text-scale-readback
title-box-omission-readback
nested-timeline-readback
visual-checkpoint-render
save-reopen
```

### Independent text scale

Runtime must identify the exact title:

```text
PALMIER_CANARY_TEXT_SCALE
```

and capture:

- appearance;
- animation timing;
- Inspector/readback surface if exposed;
- keyframe/editability observation if exposed;
- start/mid/end visual state.

### Title-box transform

Runtime must separately identify:

```text
PALMIER_CANARY_TITLE_BOX_TRANSFORM
```

and classify its source box size / 15-degree rotation as:

- transported;
- dropped;
- unexpectedly mapped;
- readback unavailable.

This prevents the older coarse title scale/rotation classification from contaminating independent text-scale evidence.

### Nested timelines

Runtime must explicitly inspect both:

```text
PALMIER_CANARY_NEST_L1
PALMIER_CANARY_NEST_L2
```

including representation, timing/trim, linked A/V behavior and meaningful editability.

```text
FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED
```

## Render requirement added

The old generic Palmier canary did not require render evidence.

Scene v2 now requires a short neutral render spanning the text-scale animation and nested section.

Promotion for one evidence file requires:

```text
requiresRender = true
required RENDER evidence
RENDER artifact with SHA-256
completed HUMAN_REVIEW
```

Why:

Property/readback evidence alone cannot prove that asymmetric text scaling and animation look correct over time.

But render remains separate from editability:

```text
VISUAL_PARITY != PARAMETRIC_EDITABILITY
RENDER_SUCCESS != NESTED_EDITABILITY
```

## Dedicated evidence semantics

Added:

```text
motion-studio/scripts/validate-palmier-fcpxml-v2-resolve-evidence.mts
```

It validates:

- exact v2 input IDs;
- exact 8-step set;
- fail-closed NOT_RUN/BLOCKED behavior;
- promotion requires every step PASS;
- all required inputs present;
- completed human review;
- RENDER artifact exists;
- every RENDER artifact used for promotion has SHA-256.

This validator decides only internal eligibility of one execution.

```text
INTERNALLY_ELIGIBLE_PASS != REPRODUCED
```

The effective canary still requires two independent executions.

## Dedicated Session builder

Added:

```text
motion-studio/scripts/prepare-palmier-fcpxml-v2-resolve-session.mts
```

It intentionally reuses the existing generic Palmier hydration path first:

```text
PREPARED real Palmier manifest
-> generic prepare-resolve-canary-session --reuse-existing
-> generic hash/input hydration and fail-closed checks
-> replace only plan.md/evidence.json/RUN.md with effective scene-v2 runtime definitions
-> validate v2 evidence skeleton
```

If the manifest is still blocked, the generic route fails before a Session is created.

Therefore:

```text
BASE_SESSION_HYDRATION != V2_RUNTIME_EXECUTION
PREPARED_MANIFEST_REQUIRED
```

## Dedicated plan compiler

Added:

```text
motion-studio/scripts/resolve-palmier-fcpxml-v2-runtime-plan.mts
```

It exposes:

- effective definition identity;
- source/capability refs;
- exact v2 attachment route;
- all runtime steps;
- evidence requirements;
- pass/fail criteria;
- render/save-reopen/two-run promotion requirements;
- fail-closed evidence template.

## Local Actual prompt

Added:

```text
docs/prompts/2026-08-26-resolve21-palmier-fcpxml-v2-actual-agent.md
```

This is the preferred Resolve-side agent entry after a real v2 Palmier export is attached.

It does not require external Resolve scripting. The primary canary is import/readback/render/save-reopen and can be executed through supported native UI/local computer-control paths.

## Current boundary

Run36 still does not prove any Resolve behavior.

No real Palmier positive export was created in CI, and no Resolve runtime was launched.

```text
EFFECTIVE_PLAN_COMPILES != RESOLVE_EXECUTED
EVIDENCE_TEMPLATE_VALID != RUNTIME_PASS
RENDER_REQUIRED != RENDER_PRODUCED
```

## Next highest-value work

After focused CI passes, the remaining high-value path is no longer more source prose.

It is:

```text
real Palmier scene-v2 build/readback
-> exact queued export terminal completion
-> scene-contract/freshness/provenance attachment
-> effective v2 Resolve Session
-> Resolve Actual A
-> evidence validation
-> independent Resolve Actual B
```

At the first step above, a local Palmier-capable Codex/Claude Code/computer-control agent becomes required.

At the Resolve step, a local Resolve-capable agent becomes required.

```text
RESEARCH_SATURATED_PRE_RUNTIME = near_true
RUNTIME_EVIDENCE_SATURATED = false
```
