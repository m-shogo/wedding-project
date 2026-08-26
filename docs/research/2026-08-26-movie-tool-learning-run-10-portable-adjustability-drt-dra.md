# Movie Tool Learning Run 10 — Portable Adjustability / DRT / DRA / relink strategy

Date: 2026-08-26
Scope: Movie Tool Learning only. DaVinci Resolve 21 major baseline.

## Why this run exists

Human adjustability is not enough if the editable structure breaks when moved to another project or computer. Reusable wedding motion therefore needs a second human-facing axis: Portable Adjustability.

New principle:

`EASY_TO_EDIT_LOCAL != EASY_TO_EDIT_AFTER_HANDOFF`

## Resolve 21 DRT improvement

The Resolve 21 New Features Guide documents an improved `.drt` import dialog. A timeline import can now:

- show timeline settings,
- optionally set project settings from the imported timeline,
- automatically link to existing Media Pool clips.

This makes `.drt` a stronger native handoff candidate for complete or partial wedding timelines than raw FCPXML once the content is already Resolve-native.

Important boundary:

`.drt` carries timeline/project reconstruction information, but does not by itself mean all source media, fonts, LUTs, OFX or external template dependencies travel with it.

Guardrail:

`DRT_NATIVE_TIMELINE != SELF_CONTAINED_PACKAGE`

## DRA role

Project Archive (`.dra`) remains the full-project portability route when media must travel with the Resolve project. Historical Blackmagic documentation establishes DRA as a project archive containing project data plus copied media. Later releases also expanded archive coverage for some connected media workflows.

For Wedding production, use DRA as the final archival/recovery candidate rather than as the everyday motion-library format.

Preferred scope:

- `.drfx`: reusable motion/template distribution
- `.drt`: editable timeline transfer
- `.dra`: full project + media archive / disaster recovery / machine migration

Guardrail:

`REUSABLE_TEMPLATE != TIMELINE_TRANSFER != PROJECT_ARCHIVE`

Do not use one format for all three jobs.

## Portable Adjustability taxonomy

- `SELF_CONTAINED_NATIVE`: opens with editable structure and required assets included.
- `NATIVE_WITH_RELINK`: structure survives; media relink may be required.
- `NATIVE_WITH_DEPENDENCIES`: structure survives but fonts/LUT/OFX/plugin/template installation is required.
- `SIDE_CAR_REQUIRED`: editable reconstruction requires Human Master JSON or another sidecar.
- `BAKED_PORTABLE`: playback travels, internal editability does not.

Every Golden Handoff should record both Human Adjustability and Portable Adjustability.

## Dependency manifest v1

Every wedding motion/timeline package intended for reuse should generate or carry a manifest containing:

- Resolve major/tested patch
- timeline FPS/resolution
- color-management fingerprint
- media list + content hash when practical
- `.drfx` bundle IDs/versions
- fonts
- LUTs
- OFX/plugins
- Lottie/OGraf source assets
- Remotion-generated alpha renders and their sidecar Human Master
- expected Media Pool bin paths
- relink root hints (relative, not machine-specific when possible)
- expected exposed Inspector controls

## Routing consequence

For an effect that is used across multiple timelines:

1. Prefer `.drfx` template distribution.
2. Instantiate the template in timelines.
3. Use `.drt` when handing a finished editable timeline between Resolve projects/machines.
4. Use `.dra` for full archival/migration with media.
5. Keep Human Master sidecar even when DRT/DRA works, so intent is recoverable independently of Resolve internals.

## Late-edit workflow

A practical Wedding handoff should let a human perform late edits in this order without external regeneration:

1. copy/text change
2. photo replacement
3. timing/duration
4. motion intensity/easing
5. color/accent
6. audio level/fade

If any of 1-5 requires rebuilding the effect from scratch, Human Adjustability is not `LOW`.

## New Canaries

### DV21-DRT-PORT-01

Export a Resolve-native timeline containing:
- a Text+ title,
- one `.drfx` wedding template instance,
- one linked media clip,
- keyframes,
- one Lottie/OGraf clip if available.

Import into a clean project using Resolve 21's DRT dialog. Test:
- project setting adoption,
- automatic Media Pool linking,
- template editability,
- keyframe survival,
- missing dependency reporting,
- save/reopen.

### DV21-DRT-CLEAN-MACHINE-01

Repeat the same DRT on a clean user profile or second machine/context with no preinstalled Wedding `.drfx`. Verify whether template references resolve, fail visibly, or flatten. This determines whether DRT requires a bundle manifest/install step.

### DV21-DRA-ARCHIVE-01

Archive a small Wedding project to DRA, restore in a clean context, then verify:
- media online,
- timelines intact,
- Fusion/template editability,
- font/LUT/OFX dependencies,
- Lottie/OGraf source availability,
- render parity.

### DV21-DEPENDENCY-FAIL-01

Deliberately remove one font, one LUT or one optional plugin before restore. Record the failure fingerprint and the minimum human recovery instruction. Convert each observed failure into a guardrail.

## Human-facing packaging rule

A package is not considered user-friendly merely because Resolve can technically restore it. The handoff must include one short human instruction block:

- what file to open/import,
- which dependencies must be installed first,
- what should automatically relink,
- where the 3-8 common controls are,
- what not to touch,
- how to verify the result.

Guardrail:

`PORTABLE != SELF_EXPLANATORY`

## Evidence state

Resolve 21 DRT import improvements are official-document evidence. Wedding clean-context DRT/DRA behavior remains PENDING_RUNTIME until the canaries are executed.

## Research saturation

NO_CHANGE is false. Portable Adjustability is now separated from local Human Adjustability, and DRT/DRFX/DRA responsibilities are explicitly routed rather than conflated.