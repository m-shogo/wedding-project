# 2026-08-15 — Rurubu FO image-set coherence feedback

Scope source: Rurubu WEDDING. Cross-item transfer is principle-only.

## Problem observed

A page can pass individual image provenance/crop/structure checks and still feel fake when adjacent photos imply unrelated destinations or stories. FN's lower Memory Spots set exposed this: technically accepted coast/resort/street images formed a synthetic travel collage against the native Yokohama-oriented context.

## Principle tested

Audit multi-photo artifacts at **set level** after individual asset QA:

1. Does each image fit its semantic caption/role?
2. Do adjacent images plausibly belong to one editorial story?
3. Is repeated source use actually harmful at whole-item scale?
4. If a repeated source is removed, what visual/binding job disappears?

FO `1200:2` reassigned three lower image roles using existing verified sources and improved semantic continuity without generation or new decoration. FP `1202:2` then tried removing the remaining repeated waterfront via a text-only third role; this reduced density and binding and was rejected.

## Expected improvement

Reduce synthetic-stock/AI-collage feeling before generating additional imagery, while preserving genuine photo-led hierarchy.

## Regression risks

- Overconstraining all imagery to one visual source can become repetitive.
- Deduplication can become a false optimization and remove useful editorial mass.
- A semantically correct image can still be weak in resolution/crop, so set-level coherence never replaces individual asset QA.

## Evidence

- FO 1000px spread: PASS.
- FO actual-size right page ≈795×1123: PASS.
- 52 visible native text nodes; 6 visible IMAGE fills.
- absolute text intersections: 0.
- 18px safe-area risks: 0.
- FP duplicate-removal treatment: REJECTED and hidden.
- Current `77:18 / 77:290`: untouched.

## Asset/transport learning

The exact Q60 master was freshly materialized from Drive and a first-class Figma `upload_assets` target was used with the mounted JPEG. The upload still failed before mutation because `mcp.figma.com` could not resolve. This is the same normalized failure fingerprint `FIGMA_UPLOAD_DNS_MCP_FIGMA_COM`; no cosmetic retry followed.

## Cross-item applicability

Other wedding print items may independently test **image-set narrative coherence** and **deduplication-vs-binding**. Do not copy Rurubu imagery, photo ratios, overlap, colors, or magazine grammar.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.