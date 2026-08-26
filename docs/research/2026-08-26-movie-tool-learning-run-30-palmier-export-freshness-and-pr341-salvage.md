# Movie Tool Learning Run 30 — Palmier export freshness gate / PR #341 knowledge salvage

Date: 2026-08-26  
Status: IMPLEMENTED GUARDRAIL / RESOLVE RUNTIME STILL PENDING  
Scope: Movie Tool Learning only

## Why this run exists

Run 28 made it possible to attach an operator-attested real Palmier DaVinci/Resolve FCPXML without inventing provenance. Run 29 made the first neutral DRFX recovery fixture deterministic and runtime-session-ready.

An audit of older open PR #341 found several still-useful export/handoff lessons that were not yet on main, but the branch also contains version-sensitive or superseded wording. Merging all six old research notes verbatim would preserve stale assumptions alongside newer Run 28/29 contracts.

Run 30 therefore salvages the durable knowledge into current contracts and implements the highest-value missing guardrail directly: **fresh-artifact verification before Palmier provenance attestation**.

## 1. Palmier Issue #182 — correction and retained lesson

Older PR #341 research recorded an XML/FCPXML export false-success/stale-file failure mode from Palmier upstream Issue #182.

Follow-up research in the same PR correctly established that:

- Issue #182 is closed,
- the upstream fix landed through PR #183,
- current Palmier main must not be described as definitely still containing that bug.

Therefore the current classification is:

```text
historical failure evidence
+ upstream fixed
+ version-scoped/general regression guardrail retained
```

The durable lesson is not “Palmier export is broken.” It is:

```text
FILE_EXISTS != FRESH_EXPORT
```

A file can already exist at a reused destination even when the current job did not produce it.

## 2. Freshness becomes a machine-readable attachment gate

`attach-palmier-real-export.mts` now requires full attachments to carry an explicit export-attempt start time:

```text
--export-started-at <ISO8601>
```

The operator records this immediately before starting the Palmier export.

The helper reads the candidate FCPXML filesystem modification time and rejects it when it is materially older than the recorded export attempt. A 2-second tolerance exists only for filesystem timestamp granularity/rounding.

Stored freshness evidence includes:

- `exportStartedAt`
- `sourceModifiedAt`
- millisecond values for both
- tolerance
- `freshAfterExportStart = true`

This freshness record is embedded into both:

- the Palmier real-export attachment record
- the generated Human Master `actualExport`

so the expected inventory is tied not only to a filename/hash but to the export attempt that supplied it.

## 3. Freshness and provenance remain separate authorities

New mode:

```text
--check-freshness-only
```

performs structure + freshness checks without mutating the manifest and without claiming Palmier provenance.

A successful freshness-only result remains:

```text
provenance = UNVERIFIED_BY_FRESHNESS
```

Guardrails:

```text
FRESH_ARTIFACT != REAL_PALMIER_PROVENANCE
FCPXML_STRUCTURE_VALID != REAL_PALMIER_PROVENANCE
OPERATOR_ATTESTATION != CRYPTOGRAPHIC_PROVENANCE
```

Full attachment therefore requires three independently meaningful gates:

```text
recognizable timeline-shaped FCPXML
→ fresh for this recorded export attempt
→ explicit operator attestation that Palmier produced it
```

Only after that may the input manifest become `PREPARED`.

Resolve runtime is still separate:

```text
REAL_EXPORT_ATTACHMENT != RESOLVE_RUNTIME_EVIDENCE
```

## 4. Unique output paths remain recommended

Freshness checking is a defensive gate, not a reason to reuse one destination forever.

Preferred export instruction remains:

```text
read exact project/timeline
→ record export start time
→ choose unique fresh output path
→ run Palmier Resolve-target FCPXML export
→ wait for terminal export result where the local integration exposes one
→ inspect structure
→ verify freshness
→ attest provenance
→ hash/attach
→ clean Resolve import
→ read back inventory/properties
```

Example naming intent:

```text
<project>-<timeline>-resolve-<timestamp>-<source-head>.fcpxml
```

A queued/started job or 100% progress display is not itself completion evidence.

## 5. Project Context Fidelity is separate from Motion Fidelity

PR #341 also identified a useful handoff dimension that remains valid.

Palmier FCPXML evidence showed sequence/project context such as timeline geometry and declared audio/color context. Therefore a visually correct transform comparison is insufficient to certify the whole handoff.

Future Golden Handoff evidence should keep these dimensions separate:

### Timeline Geometry Fidelity

- fps
- width / height
- aspect ratio
- timecode behavior

### Color Context Fidelity

- declared/interpreted color intent
- Resolve project/timeline color management readback where possible
- final output tags / obvious gamma shift checks

### Audio Context Fidelity

- sample rate
- channel layout
- audio presence/sync
- Fairlight interpretation/output metadata

### Motion Fidelity

- position / scale / rotation
- crop
- opacity
- timing / interpolation where observable

### Editability Fidelity

- whether values remain natively adjustable
- whether recovery became a constrained Inspector surface, full Fusion graph, or baked asset

Guardrail:

```text
MOTION_PARITY != PROJECT_CONTEXT_PARITY
```

## 6. OTIO remains a conditional tool, not the default Palmier → Resolve bridge

The older research also found that “standard interchange” must not be equated with a higher-fidelity production route.

For this workflow, the preferred candidate remains the shortest destination-aware route:

```text
Palmier Human Master / Canonical Motion Spec
+
Palmier Resolve-targeted FCPXML
+
explicit rebuild/source artifacts
→ Resolve
```

Do not introduce by default:

```text
Palmier → OTIO → FCPX XML adapter → Resolve
```

merely because OTIO is standardized.

The extra adapter boundary must prove a concrete benefit with its current feature matrix, maintenance status and Golden Handoff evidence.

Guardrail:

```text
STANDARD_INTERCHANGE != TRUSTED_HANDOFF
```

OTIO remains useful for its own canonical editorial model, analysis/normalization and future verified adapter paths.

## 7. Native rebuild routing knowledge retained from PR #341

The useful routing conclusions remain compatible with newer Run 29 work:

- Prefer the simplest native Resolve property when semantic equivalence is actually verified.
- Reusable visual recovery graphs should prefer constrained Macro/Edit Template/DRFX surfaces rather than forcing humans into opaque Fusion graphs.
- One-off deterministic Fusion rebuilds can remain `.setting`/bounded composition candidates.
- Lottie should prefer the original `.lottie` native import route before node reconstruction or baking when the target runtime supports it.
- Edge rounding/complex visual semantics remain recipe-specific runtime canaries; API/documentation presence alone is not parity proof.
- Audio volume/fade automation remains separate from visual reconstruction and must not be promoted from unrelated Fusion/Fairlight capabilities.

Run 29 materially advanced the reusable-template branch by creating a deterministic neutral DRFX with one human-facing Color control. It still needs real Resolve install/edit/save-reopen/render evidence.

## 8. Fairlight Animator distinction retained

Resolve 21 Fairlight Animator is useful for audio-driven **visual** motion, such as level-reactive scale/glow/pulse.

It is not evidence of a scripting write surface for clip volume, fade handles or automation curves.

Guardrail:

```text
FAIRLIGHT_ANIMATOR != FAIRLIGHT_AUDIO_AUTOMATION_WRITE
```

Audio Volume/Fade therefore remains an assisted/runtime-revalidation path until a real supported write surface is reproduced.

## 9. Version authority correction during salvage

Some PR #341 notes were written against a 21.0.3 baseline.

The current Wedding Tool Learning baseline is **Resolve 21.0.4**. Version-sensitive claims from the old branch are therefore not copied verbatim.

Historical evidence remains useful, but future runtime evidence must capture the exact live:

```text
product
version/patch
edition
platform
```

Guardrail:

```text
PATCH_UPDATE => REVALIDATE_DEPENDENT_CAPABILITIES_ONLY
```

Do not invalidate unrelated exporter knowledge merely because Resolve patch version changes, and do not silently carry patch-sensitive runtime claims forward.

## 10. CI proof added by Run 30

The focused Palmier attachment CI now verifies without fabricating a real Palmier export:

1. generic FCPXML structure inspection keeps provenance unverified;
2. a deliberately old FCPXML is rejected relative to the current export-attempt timestamp;
3. a freshly touched FCPXML can pass freshness-only checking;
4. freshness-only still reports unverified provenance;
5. a fresh file without real-Palmier attestation cannot become PREPARED;
6. failed attachment leaves the BLOCKED manifest unchanged;
7. BLOCKED Palmier manifests still cannot be reused as runtime-ready inputs;
8. the generated Canary plan exposes structure → freshness → attestation → Session in the correct order.

No CI step claims that its generic FCPXML came from Palmier.

## 11. What remains runtime-pending

Run 30 does not resolve the highest-value actuals:

- genuine local Palmier Resolve-targeted FCPXML positive attachment
- clean Resolve 21 import
- project-context readback
- transform/crop/opacity/text editability and visual parity
- audio fade/volume recovery
- Lottie native import portability
- DRFX install / Inspector usability / save-reopen / render / uninstall

`RESEARCH_SATURATED = false`

## PR #341 disposition

After this Run 30 knowledge salvage is merged, PR #341 should be closed as superseded rather than merged wholesale.

Reason:

- its durable guardrails are retained here or already implemented by Runs 28–30;
- its useful OTIO/project-context/native-routing distinctions are consolidated here;
- its Issue #182 correction is preserved;
- version-sensitive 21.0.3 wording is intentionally not reintroduced into the 21.0.4 baseline;
- keeping both the old six-document branch and the consolidated current authority open would create duplicate/conflicting research truth.
