# Movie Tool Learning Run 29 — Deterministic Neutral DRFX Fixture

Date: 2026-08-26  
Status: INPUT ARTIFACT IMPLEMENTED / RESOLVE 21 RUNTIME PENDING

## Why this run exists

Earlier runs established `.drfx` as the strongest scripting-free Resolve-native rebuild/package candidate for the current Resolve Free environment, but `DV21-DRFX-FREE-01` remained blocked because the repo had no neutral artifact to install.

Run 29 creates the missing **test input** without promoting the runtime capability.

## Evidence hierarchy used

Primary source:

- Blackmagic Design Fusion 20.3 Reference Manual, Chapter 6 — Fusion Generators, Effects and Template Bundles.

The official path establishes that Fusion compositions can become Edit-page Generator templates with custom controls, and that Template Bundles package the expected `Edit/Generators` hierarchy as `.drfx`.

Secondary implementation evidence:

- public `.setting` examples were inspected only to confirm the serialized `GroupOperator` / `InstanceInput` / `MainOutput1` shape used by real Edit Generators.

Guardrail:

```text
OFFICIAL_TEMPLATE_CONCEPT + PUBLIC_SERIALIZATION_EXAMPLE
!=
WEDDING_RUNTIME_VERIFIED_SETTING
```

## Fixture choice

Fixture:

```text
wedding-neutral-solid-generator-v1
```

Display intent:

```text
Wedding Neutral Solid
```

Category:

```text
Edit/Generators
```

The first fixture is deliberately boring. That is a feature.

It uses one built-in Background and exposes only its RGBA color channels as one grouped human-facing `Color` control.

No Text+, no media, no font, no LUT, no OFX, no plugin and no external image are allowed in the first recipe.

This minimizes unrelated failure causes during the first Resolve Free install canary.

## Human Adjustability as a first-class contract

The internal setting contains four `InstanceInput` values:

```text
ColorRed
ColorGreen
ColorBlue
ColorAlpha
```

but all share the human-facing label `Color` and one control group.

The desired human interaction is therefore:

```text
one obvious Color control in the Edit Inspector
```

not four implementation concepts the editor must understand.

```text
INTERNAL_PARAMETER_COUNT != HUMAN_VISIBLE_CONTROL_COUNT
```

Expected state remains a candidate until actual UI observation:

```text
expectedHumanAdjustability = EASY_INSPECTOR
runtimeState = PENDING_RUNTIME
```

## Reviewable `.setting` source

The source artifact is stored as UTF-8 text under:

```text
motion-studio/fixtures/resolve/drfx/WeddingNeutralSolid.setting
```

Keeping the `.setting` source in Git provides:

- human review
- diffability
- reproducible rebuild
- no opaque binary source-of-truth

The generated `.drfx` remains under ignored `out/`.

## Fail-closed source checks

Before packaging, the generator checks for required structural tokens including:

- `GroupOperator`
- ordered exposed inputs
- `InstanceInput`
- `MainOutput1 = InstanceOutput`
- built-in `Background`
- `UseFrameFormatSettings`
- expected ActiveTool

It also rejects external/runtime-specific tokens in the neutral source such as:

- `Loader`
- `Fuse.`
- `ofx.`
- font declarations
- LUT references
- `SxSFilename`
- obvious machine-specific absolute paths

This is structural QA, not a Fusion parser.

```text
SETTING_STRUCTURE_EXPECTED != FUSION_RUNTIME_VALID
```

## Deterministic `.drfx` packaging

New stdlib-only packer:

```text
scripts/davinci/deterministic-drfx-pack.py
```

It accepts explicit source→archive mappings, rejects absolute/parent-traversal archive paths, sorts entries and assigns the fixed ZIP timestamp:

```text
1980-01-01 00:00:00
```

Expected bundle inventory for v1 is exactly:

```text
Edit/Generators/WeddingNeutralSolid/WeddingNeutralSolid.setting
```

No extra file is silently bundled.

Repeated packaging from the same source is expected to produce the same `.drfx` SHA-256.

This is useful for evidence attribution but is not runtime proof.

```text
DETERMINISTIC_ARTIFACT != RESOLVE_INSTALLABLE
```

## Machine-readable fixture manifest

New contracts:

```text
resolve-drfx-fixture-spec/v1
resolve-drfx-fixture-manifest/v1
```

They record:

- fixture/canary ID
- target category
- source setting path/hash
- generated DRFX path/hash
- exact archive inventory
- fixed timestamp policy
- dependency inventory
- expected exposed controls
- expected Human Adjustability
- packaging checks
- runtime state
- guardrails

The declared dependency lists for v1 are all empty.

That means only:

```text
NO_DECLARED_EXTERNAL_DEPENDENCY
```

not:

```text
CLEAN_CONTEXT_PORTABILITY_PROVEN
```

## Canary Pack integration

`DV21-DRFX-FREE-01` now has structured input preparation metadata:

```text
mode = drfx
manifest = out/canary-inputs/manifests/DV21-DRFX-FREE-01.json
```

The normal pipeline can therefore perform:

```text
DRFX generation
→ SHA manifest
→ Evidence hydration
→ immutable local Session
```

without a one-off DRFX-only evidence system.

The generated Canary input ID is exactly:

```text
neutral-drfx
```

which matches the existing Runtime Canary definition.

## CI proof added

The focused DRFX CI verifies:

1. Python packer compiles.
2. TypeScript compiles.
3. dry-run remains `PENDING_RUNTIME`.
4. DRFX and manifests are generated.
5. archive contains only the expected official hierarchy.
6. ZIP entry timestamp is fixed.
7. no path traversal exists.
8. source has no declared external dependency tokens.
9. machine-readable dependency lists are empty.
10. all internal RGBA inputs map to one human-facing `Color` label.
11. generating the bundle twice produces the same `.drfx` SHA-256.
12. Evidence hydration remains `NOT_RUN` and `promotionEligible=false`.
13. Session preparation is `READY_FOR_RUNTIME` but `runtimeLaunchPerformed=false`.

## What CI still cannot prove

CI does not run Resolve and therefore cannot prove:

- `.setting` runtime validity
- `.drfx` installability
- Edit/Generators discovery
- Inspector control appearance
- keyframe UI
- save/reopen persistence
- render parity
- uninstall behavior

These remain the purpose of `DV21-DRFX-FREE-01` Actual.

## New/strengthened guardrails

```text
DRFX_ARCHIVE_VALID != RESOLVE_INSTALLABLE
SETTING_STRUCTURE_EXPECTED != FUSION_RUNTIME_VALID
EXPOSED_CONTROL_SCHEMA != HUMAN_USABILITY_PROVEN
NO_DECLARED_EXTERNAL_DEPENDENCY != CLEAN_CONTEXT_PORTABILITY_PROVEN
GENERATED_ARTIFACT != RUNTIME_VERIFIED_HANDOFF
DETERMINISTIC_ARTIFACT != RUNTIME_EVIDENCE
```

## Compiler routing impact

For simple reusable visual controls in Resolve Free, the candidate route is now executable up to the runtime boundary:

```text
Canonical Motion Spec
→ reviewable .setting source
→ deterministic .drfx
→ input manifest
→ runtime Session
→ human install / Inspector adjustment
```

If the Actual passes, later Wedding templates can reuse this packaging recipe while keeping their own capability/dependency/runtime evidence separate.

Do not jump directly from this neutral Generator to complex Text Background/Crop/Title Transform trust. Each recipe or shared primitive still needs evidence appropriate to its behavior.

## Research saturation

NO_CHANGE is false. A high-value blocked Canary now has a reproducible input artifact and Session route, but the real Resolve 21 install/edit/save/reopen/render Actual remains outstanding.

`RESEARCH_SATURATED = false`
