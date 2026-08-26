# Movie Tool Learning Run 14 — Resolve 21 DRT/DRA portability and human-adjustable handoff

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

Human adjustability is only useful if a timeline/template remains editable after it moves to another project or workstation. This run separates timeline interchange (`.drt`) from full project/media archival (`.dra`) and defines what each artifact is allowed to promise.

## 1. Resolve 21 improves DRT import

The DaVinci Resolve 21 New Features Guide documents a new Import Timeline dialog for `.drt` files. The dialog exposes:

- timeline name,
- timeline resolution,
- timeline frame rate,
- an option to set project settings from the imported timeline,
- an option to automatically link to matching clips already present in the Media Pool.

This makes `.drt` a stronger native timeline-handoff artifact in Resolve 21 because geometry/rate context is visible before import and media that already exists in the receiving project can be conformed automatically.

Guardrail:

`DRT_IMPORT_CONTEXT_VISIBLE != DRT_SELF_CONTAINED`

The dialog improves import reliability but does not make a timeline file a complete media/package archive.

## 2. DRT responsibility

Use `.drt` when the goal is:

- transfer one editable Resolve timeline,
- preserve Resolve-native timeline structures,
- move between projects/workstations that already have or can relink the required media,
- retain native title/effect/keyframe structures where supported.

Do not use `.drt` as the only wedding delivery artifact when the receiver does not already have the media and dependencies.

Sidecar dependency manifest remains required for portability-sensitive handoff:

- source media identities/paths/hashes where practical,
- fonts,
- LUTs,
- OFX/plugin dependencies,
- `.drfx` bundle id/version,
- Lottie/OGraf assets,
- color-management fingerprint,
- timeline resolution/fps,
- expected relink behavior.

Guardrail:

`EDITABLE_TIMELINE != COMPLETE_PACKAGE`

## 3. DRA responsibility

Long-standing official Blackmagic training documentation describes a DaVinci Resolve Project Archive (`.dra`) as a folder containing the project plus copied media intended to be restored on another computer without the normal media relink step. Later Blackmagic release documentation also explicitly added classes of project media such as VFX Connect media to DRA archives.

Therefore `.dra` is the stronger candidate when the goal is whole-project recovery or workstation migration.

However, do not assume external dependencies are embedded merely because media is archived. Fonts, OFX plugins, system-level LUT locations, externally installed `.drfx` bundles and licenses must be tested separately.

Guardrail:

`DRA_HAS_MEDIA != DRA_HAS_EVERY_DEPENDENCY`

## 4. Packaging hierarchy for Wedding Motion

Preferred artifact responsibility:

- `.drfx`: reusable motion/title/effect template package.
- `.drt`: editable timeline transfer between Resolve projects.
- `.dra`: project + media archival/recovery candidate.
- Human Master JSON: intent and rebuild source of truth.
- dependency manifest: non-media requirements and tested versions.
- alpha render: last-resort visual fallback, never the only editable master.

Do not conflate these formats into one generic "backup" label in the Motion Zukan UI.

## 5. Portable Adjustability classification

Add a separate portability result to human adjustability:

- `LOCAL_EASY`: easy to edit on the source workstation only.
- `RELINKABLE`: portable when listed media/dependencies are available.
- `BUNDLED_TEMPLATE`: template dependencies packaged and clean-install tested.
- `ARCHIVE_VERIFIED`: restored in a clean Resolve environment with editability retained.
- `BAKED_ONLY`: visual portability only.

A recipe cannot be called Wedding Portable merely because it can be exported.

Guardrail:

`EXPORTABLE != PORTABLE_EDITABLE`

## 6. New canaries

### DV21-DRT-PORT-02 — native timeline transfer

Build a timeline containing:

- normal source media,
- Text+,
- one keyframed native Resolve FX,
- one `.drfx` template instance,
- one Lottie/OGraf asset,
- audio with manually created keyframes.

Export `.drt`, import into a clean Resolve 21 project, and record:

- timeline settings dialog values,
- project-setting adoption behavior,
- automatic Media Pool linking,
- which items stay online,
- which dependencies fail,
- whether Text+/effect/template parameters remain editable,
- save/reopen and render parity.

### DV21-DRA-ARCHIVE-02 — workstation recovery

Archive the same project as `.dra`, move it into a clean context, restore it and test:

- original source media availability,
- timeline editability,
- Lottie/OGraf asset availability,
- `.drfx` behavior,
- font substitution/missing-font detection,
- LUT behavior,
- OFX/plugin behavior,
- audio state,
- final render parity.

Every dependency must be recorded as INCLUDED / RELINKED / EXTERNAL_INSTALL / MISSING.

### DV21-PORTABLE-HUMAN-01

After DRT or DRA transfer, a second human should be able to change:

- a photo,
- a text string,
- motion intensity,
- color,
- clip duration,

without opening a Fusion graph or reconstructing the template from scratch.

This is the final portability usability criterion.

## 7. Tool-selection consequence

For reviewable/editable Wedding handoff:

1. keep Human Master JSON regardless of packaging format,
2. use `.drfx` for reusable effect/title behavior,
3. use `.drt` for timeline-native exchange when media/dependencies are managed separately,
4. use `.dra` for project recovery/migration when practical,
5. keep alpha render only as visual fallback.

## Trust-state changes

- Resolve 21 `.drt` import dialog/context/link options: official/evidence-backed.
- `.drt` as self-contained package: explicitly NOT trusted.
- `.dra` as project+media archive candidate: official historical behavior, Resolve 21 Wedding Runtime Pending.
- fonts/LUT/OFX/installed template portability through DRA: PENDING_RUNTIME.

## Evidence

Primary:

- Blackmagic Design — DaVinci Resolve 21 New Features Guide, "DRT Timeline Import Supports Link and Conform Options".
- Blackmagic Design official DaVinci Resolve training/manual material — Project Archive `.dra` copies project and media for restore on another computer.

Older official documentation is used only for stable archive semantics; Resolve 21-specific runtime behavior must be revalidated by the canaries above.
