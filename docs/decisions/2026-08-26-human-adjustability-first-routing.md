# Decision — Human Adjustability First for Wedding Motion

Date: 2026-08-26
Status: Active for Movie Tool Learning / Motion Zukan

## Decision

When multiple implementations can reproduce the same Wedding motion, prefer the implementation that a human can understand and adjust in DaVinci Resolve 21 with the least specialized knowledge.

Order of preference:

1. Resolve native Edit/Text+/Resolve FX with clear Inspector controls.
2. Fusion-backed Edit Template / `.drfx` with curated exposed controls.
3. Direct-import asset such as Lottie/OGraf when clip-level editing is sufficient.
4. Generated `.drfx` + Human Master sidecar with assisted install.
5. Guided Fusion graph.
6. External renderer such as Remotion + rebuild sidecar.
7. Baked fallback.

## Required quality axes

Do not collapse these into one Trusted flag:

- Visual/Handoff Fidelity
- Native Editability
- Human Adjustability
- Portable Adjustability
- Automation Availability
- Runtime Evidence
- Dependency Health
- Performance/Rebuildability

A visually exact result may still be unsuitable as a reusable template if the user must enter a complex Fusion graph for routine changes.

## Inspector contract

Reusable Wedding templates should normally expose a small set of semantic controls, ideally 3–8 primary controls. Prefer labels such as Photo, Text, Motion Amount, Duration, Scale, Position, Color, Border and Shadow. Low-level node controls stay hidden unless needed for advanced repair.

Defaults and min/max bounds are part of the template contract.

## Performance contract

Proxy, optimized media and render cache improve editing experience but are rebuildable performance state rather than source truth.

`CACHE_PRESENT != PROJECT_PORTABLE`

`PROXY_AVAILABLE != SOURCE_AVAILABLE`

Do not package or trust a project based solely on cached playback behavior.

## Dependency contract

Every reusable template/timeline package must record external dependencies: fonts, LUTs, OFX/plugins, media, Lottie/OGraf, generated alpha assets and template versions.

`PROJECT_OPENS != DEPENDENCIES_RESOLVED`

Prefer native Resolve/Fusion operations when third-party OFX would materially increase portability or recovery cost.

## Alpha contract

Transparent Wedding overlays require independent verification of import, working/cache path and export.

`ALPHA_IMPORT_OK != ALPHA_CACHE_OK != ALPHA_EXPORT_OK`

No codec/container is globally Trusted without OS + Resolve 21 edition/version + pixel-format runtime evidence.

## Late-edit acceptance

A reusable Wedding motion is not considered human-friendly until a late-edit test confirms that photo replacement, copy change, motion-intensity adjustment, duration/timing change and common color change can be performed without unexplained dependency repair or unnecessary Fusion graph surgery.
