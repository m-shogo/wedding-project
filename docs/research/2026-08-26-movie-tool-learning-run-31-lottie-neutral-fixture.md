# Movie Tool Learning Run 31 — Deterministic Neutral Lottie Fixture

Date: 2026-08-26  
Status: INPUT ARTIFACT IMPLEMENTED / RESOLVE 21 RUNTIME PENDING  
Scope: Movie Tool Learning only

## Why this run exists

`DV21-LOTTIE-OGRAF-01` remained `BLOCKED_INPUT` even though Resolve 21 officially documents native OGraf/Lottie import on macOS and Windows. The missing piece was a neutral, legally clean, reproducible `.lottie` input whose identity and expected behavior could be tied to Canary evidence.

Run 31 creates that missing input without pretending that package validity proves Resolve behavior.

## Official routing evidence

Blackmagic's DaVinci Resolve 21 New Features Guide documents that OGraf `.json` and Lottie `.lottie` animation can be dragged into the Media Pool or timeline on macOS and Windows and treated like a rendered animation clip while recognizing alpha transparency. The same Resolve 21 generation also adds Fusion `OGrafLoader`.

Therefore the preferred recovery route for an original Lottie source remains:

```text
retain source .lottie
→ native Resolve import first
→ alpha / duration / clip-level editability / save-reopen
→ inspect OGrafLoader/internal editability separately
→ bake only as a lower-editability fallback
```

Guardrail:

```text
FCPXML_OMITS_LOTTIE != LOTTIE_MUST_BE_BAKED
```

## dotLottie packaging choice

The official dotLottie specification currently lists v2 as latest/recommended for new feature-rich workflows, while v1 remains documented as widely supported.

The first Resolve Canary intentionally uses **dotLottie v1** because the fixture requires only one animation and no themes/state machines/fonts/assets.

Minimal archive:

```text
manifest.json
animations/wedding-neutral-alpha-motion.json
```

This avoids testing Resolve's newest dotLottie packaging features at the same time as basic native import.

```text
COMPATIBILITY_ORIENTED_V1_CHOICE != RESOLVE_V2_UNSUPPORTED
```

## Fixture design

Fixture ID:

```text
wedding-neutral-alpha-motion-v1
```

The animation is deliberately simple:

- 512 × 512
- 30 fps
- `ip=0`
- `op=90`
- 3 seconds
- one shape layer
- one circle
- horizontal position keyframes
- no background layer
- no external assets
- no fonts
- no URL/data-URI image payload

This creates two highly visible runtime questions:

1. does motion play?
2. does the empty canvas stay transparent over a contrasting lower layer?

## Source/provenance policy

Both source JSON files are stored in Git and are self-authored synthetic test data:

```text
fixtures/resolve/lottie/WeddingNeutralAlphaMotion.manifest.json
fixtures/resolve/lottie/WeddingNeutralAlphaMotion.animation.json
```

The package manifest explicitly records:

```text
source = SELF_AUTHORED_SYNTHETIC
copyrightedContent = false
thirdPartyAssets = []
```

This keeps the Canary independent from paid/public template licensing and removes network dependencies.

## Structural source checks

Before packaging, the generator requires:

- dotLottie manifest version `1`
- exactly one expected animation ID
- active animation ID match
- self-authored/non-copyrighted marker
- fps/resolution/in/out frames matching the fixture spec
- empty Lottie `assets` array
- exactly one shape layer (`ty=4`)
- animated position keyframes
- no `http://`, `https://`, `data:image`, `images/`, or `fonts/` dependency token

These are source-contract checks, not a Lottie renderer.

```text
LOTTIE_JSON_STRUCTURE_VALID != RESOLVE_RENDER_FIDELITY
```

## Deterministic dotLottie packaging

New stdlib-only packer:

```text
scripts/davinci/deterministic-dotlottie-pack.py
```

It:

- accepts explicit source→archive mappings only;
- rejects absolute/parent-traversal archive paths;
- requires root `manifest.json`;
- requires at least one `animations/*.json` entry;
- validates manifest v1 animation IDs resolve to packaged files;
- sorts archive paths;
- fixes ZIP timestamps to `1980-01-01 00:00:00`;
- records per-entry SHA-256.

Repeated builds from identical source are expected to produce the same `.lottie` SHA-256.

```text
DETERMINISTIC_DOTLOTTIE != RESOLVE_IMPORTABLE
```

## Machine-readable contracts

New schemas:

```text
resolve-lottie-fixture-spec/v1
resolve-lottie-fixture-manifest/v1
```

The fixture manifest records:

- fixture/canary identity
- dotLottie version and animation ID
- source paths/hashes
- generated `.lottie` path/hash
- archive inventory/hashes/timestamp policy
- timing/geometry
- visual intent
- source/copyright/dependency policy
- expected runtime behavior as PENDING/UNKNOWN
- runtime guardrails

## Canary pipeline integration

`DV21-LOTTIE-OGRAF-01` now has structured generic input preparation:

```text
mode = lottie
manifest = out/canary-inputs/manifests/DV21-LOTTIE-OGRAF-01.json
input id = neutral-lottie
```

This reuses the existing common pipeline:

```text
fixture generation
→ SHA manifest
→ Evidence hydration
→ immutable Session
→ Resolve Actual
```

No Lottie-specific evidence format is introduced.

## Human/editability boundary

Resolve documentation describes native import behavior, but import success must not be promoted to source-parametric editability.

The runtime Canary explicitly separates:

### Native clip behavior

- import acceptance
- alpha
- observed duration/playback
- clip-level trim
- clip-level reposition/scale
- save/reopen

### Internal animation behavior

- source animation controls/keyframes exposure
- Fusion representation
- `OGrafLoader` presence/behavior

Guardrail:

```text
NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY
```

This is important for the Wedding workflow: a native source clip can still be valuable even if its internal Lottie keyframes are not exposed as normal Resolve keyframes.

## Platform scope

The documented direct-import capability is scoped to macOS/Windows. The neutral package itself is cross-platform ZIP/JSON, but that does not certify Resolve Linux behavior.

```text
MACOS_WINDOWS_CAPABILITY != LINUX_CAPABILITY
```

## Focused CI proof

The Run 31 CI is designed to prove only the pre-runtime boundary:

1. Python packer syntax;
2. TypeScript contracts;
3. generic Canary registry consistency;
4. dry-run remains `PENDING_RUNTIME`;
5. real deterministic `.lottie` generation;
6. exact v1 archive hierarchy;
7. fixed timestamps/no path traversal;
8. source provenance/dependency contract;
9. two builds produce identical `.lottie` SHA;
10. Evidence hydration remains `NOT_RUN`;
11. Session becomes `READY_FOR_RUNTIME` without launching Resolve;
12. input-specific honesty guardrails reach `RUN.md`.

CI still does **not** prove:

- Resolve importability
- alpha preservation
- playback fidelity
- clip-level trim/reposition behavior
- save/reopen
- internal editability
- OGrafLoader behavior

## Guardrails

```text
DOTLOTTIE_ARCHIVE_VALID != RESOLVE_IMPORTABLE
LOTTIE_JSON_STRUCTURE_VALID != RESOLVE_RENDER_FIDELITY
ALPHA_INTENT != RESOLVE_ALPHA_PROOF
NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY
MACOS_WINDOWS_CAPABILITY != LINUX_CAPABILITY
```

## Next Actual

Generate one immutable Session and execute `DV21-LOTTIE-OGRAF-01` on a documented macOS/Windows Resolve 21 runtime.

The first high-value readback is not “does Fusion have a Lottie node?” It is:

```text
Can Resolve use the original .lottie directly as a transparent, trimmable, save/reopen-safe clip?
```

Only after that should the internal-control/OGrafLoader path be evaluated.

`RESEARCH_SATURATED = false`
