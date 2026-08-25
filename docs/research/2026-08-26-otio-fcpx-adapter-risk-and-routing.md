# OTIO FCPX Adapter Risk / Routing Update

Status: RESEARCH EVIDENCE / ROUTING GUARDRAIL  
Date: 2026-08-26  
Scope: wedding-project Movie / Tool Learning Base

## Finding

OpenTimelineIO itself remains useful as a canonical editorial interchange model, but its FCP X XML path should not be treated as a higher-fidelity bridge to DaVinci Resolve merely because OTIO is a standard interchange framework.

Current upstream evidence shows:

1. OTIO documents `.otio` as its only lossless format for the complete OTIO data model. Other formats are lossy according to both the target format and adapter implementation.
2. The FCP X XML adapter's own feature matrix does not support transitions, audio/video effects, speed effects, CDL, or image sequence references.
3. In November 2025, OpenTimelineIO maintainers explicitly proposed removing the FCP X XML adapter from the curated `OpenTimelineIO-Plugins` package because it had no active maintainer, needed significant work, and had produced incorrect timeline translation reports. The removal was completed through the linked follow-up PR.
4. Current OTIO adapter documentation now lists `fcpx_xml` as an additional adapter rather than a batteries-included curated adapter.

## Routing consequence

Do not introduce this route by default:

```text
Palmier
  -> OTIO
  -> FCPX XML adapter
  -> DaVinci Resolve
```

That route adds another lossy adapter boundary and, for FCPX XML specifically, currently adds a maintenance/reliability risk.

For the current Palmier -> DaVinci workflow, prefer:

```text
Palmier Human Master / Canonical Motion Spec
  +
Palmier Resolve-targeted FCPXML
  +
Motion sidecar / rebuild artifacts
  -> DaVinci Resolve
```

unless a specific measured use case proves an OTIO route superior.

## OTIO remains valuable for

- canonical editorial timeline representation where OTIO-native semantics are sufficient;
- internal timeline analysis / normalization;
- future adapters with a verified feature matrix and active maintenance;
- `.otio` / `.otiod` / `.otioz` persistence when preserving OTIO's own data model is the objective;
- tooling that does not depend on FCPX XML-specific effects or transport fidelity.

## Tool Selection Guardrail

`STANDARD_INTERCHANGE != TRUSTED_HANDOFF`.

A format or framework being standardized/open does not make a concrete adapter path lossless or reliable.

Before routing production through an adapter, require:

1. current maintainer / release health;
2. explicit feature matrix;
3. known unsupported semantics;
4. source/issue evidence for translation correctness;
5. Golden timeline import/export test;
6. target NLE clean-import readback;
7. measured benefit over the direct native-targeted path.

If a direct exporter contains destination-specific mapping/corrections, do not replace it with a generic multi-hop route without measured evidence.

## Handoff Fidelity classification

For `OTIO fcpx_xml -> DaVinci` at the current evidence level:

- Editorial clip/track structure: EVIDENCE_AVAILABLE, capability-dependent.
- Transitions: LOST through the adapter feature matrix.
- Audio/video effects: LOST through the adapter feature matrix.
- Speed effects: LOST through the adapter feature matrix.
- Color Decision List: LOST through the adapter feature matrix.
- General production reliability: NEEDS_REVALIDATION / not Trusted due to maintainer status and reported translation problems.

This is not a claim that every timeline will fail. It is a routing rule that the path must prove itself capability-by-capability before production use.

## Instruction Pattern update

When Codex/Claude is asked to "use OTIO because it is more standard", translate that into:

> First compare the actual source and destination capability matrices. Prefer the shortest verified native path. Do not add OTIO/FCPX conversion merely for architectural neatness. If OTIO is proposed, state exactly which semantics it preserves, which adapter is used, its current maintenance status, and the Golden Handoff evidence proving it is better than the current direct route.

## Verification backlog

OTIO is not globally rejected. Reconsider only when one of these occurs:

- an actively maintained FCPX adapter with improved feature coverage appears;
- DaVinci gains a verified native OTIO path relevant to this workflow;
- a different OTIO adapter offers a demonstrably better route;
- a Golden Handoff shows a concrete production advantage over Palmier's Resolve-targeted FCPXML.

## Evidence

- AcademySoftwareFoundation/OpenTimelineIO `docs/tutorials/write-an-adapter.md`: `.otio` is the only lossless OTIO format; other adapter formats are lossy according to target format/adapter implementation.
- OpenTimelineIO/otio-fcpx-xml-adapter README: current feature matrix.
- OpenTimelineIO/OpenTimelineIO-Plugins issue #11 (2025-11-05): removal rationale cites no active maintainer, significant work needed, and reports of incorrect timeline translation; completed by linked PR #14.
- AcademySoftwareFoundation/OpenTimelineIO current adapter docs: `fcpx_xml` appears under additional adapters, not curated batteries-included adapters.

## Research saturation

Not saturated. This update removes a misleading future route, but high-value runtime backlog remains for clean DaVinci import, Fusion `.setting` rebuild, Lottie direct import/package behavior, audio Volume/Fade recovery, and full Golden Handoff parity.
