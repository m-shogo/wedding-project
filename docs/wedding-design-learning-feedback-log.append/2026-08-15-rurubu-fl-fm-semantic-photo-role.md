# 2026-08-15 — Rurubu FL/FM feedback append

This append belongs to the long-lived `docs/wedding-design-learning-feedback-log.md` history. It is split into an append file to avoid overwriting concurrent wedding-item learning writes.

## Verified feedback 1 — photo meaning is part of fidelity

A dominant image can be sharp, attractive and well-cropped yet still fail the design if its destination/story semantics contradict the native editorial context. In Rurubu FL, replacing a foreign-looking cliff/coast dominant back photo with an already-verified waterfront source improved Yokohama issue coherence at thumbnail, reading and actual-size scales without adding decoration.

Future receiving items should test the principle, not copy the image or Rurubu composition: before generating or enlarging a dominant image, verify `role + place/story truth + printed size + crop + provenance`.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Verified feedback 2 — real-person identity boundary must be visible in the design system

Rurubu EO used recognizable generic/generated people next to native real-person labels. That is not merely a provenance paperwork problem; the visual composition itself creates an identity claim. FM corrected this by keeping `SHOGO` / `SHI-CHAN` as native text while changing raster roles to clearly non-person atmosphere images.

Project consequence: any wedding image role connected to a real person should carry an explicit identity state before generation/selection/adoption. Suggested neutral states: `VERIFIED_REAL`, `NONPERSON_ATMOSPHERE`, `PLACEHOLDER_REPLACEABLE`; never `GENERATED_PERSON_AS_REAL`.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Failure feedback — binary transport fingerprint remains active

The exact Drive Q60 master was materialized and targeted at a rollback-safe Figma duplicate. The official upload endpoint again failed before mutation because `mcp.figma.com` could not resolve. Normalized fingerprint remains `FIGMA_UPLOAD_DNS_MCP_FIGMA_COM`.

Per the shared failure-memory rule, no repeated cosmetic retry was performed. Continue productive Figma/asset work and retry only after a material environment/capability change.

## V6 implication

V6 clean-room image briefs should include, before any generation:
- semantic role and editorial purpose;
- destination/story truth;
- human identity status;
- target printed size/aspect/crop;
- focal point and text-safe zone;
- provenance state and expected Drive/Figma evidence;
- explicit negatives, including generated recognizable people standing in for real wedding participants.

This should reduce both aesthetic drift and false completion claims.