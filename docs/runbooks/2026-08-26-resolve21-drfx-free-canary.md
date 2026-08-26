# Resolve 21 Free — Neutral DRFX Human-Adjustability Canary

Date: 2026-08-26  
Canary: `DV21-DRFX-FREE-01`  
Status: INPUT GENERATABLE / RESOLVE RUNTIME PENDING

## Goal

Verify the smallest useful scripting-free recovery route for Resolve 21:

```text
Canonical template intent
→ readable .setting source
→ deterministic .drfx bundle
→ human install in Resolve 21
→ Edit Inspector late edit
→ save/reopen
→ render
→ uninstall
```

This is intentionally a **Generator**, not a complicated wedding effect. The first question is whether the packaging/editability recipe itself works reliably in Resolve 21 Free.

## Why a Generator first

The first fixture must isolate the packaging/runtime boundary from unrelated dependencies.

`Wedding Neutral Solid` therefore uses only:

- `GroupOperator`
- built-in `Background`
- `MainOutput1`
- one grouped RGBA `Color` control

It intentionally has no:

- MediaIn
- Text+/font dependency
- LUT
- OFX
- Fuse/plugin
- external image/SVG
- network dependency

This means a failure is easier to classify as packaging/template/runtime behavior rather than a missing dependency.

## Human Adjustability target

The internal source has four `InstanceInput` channels because Fusion represents RGBA separately, but they share one `ControlGroup` and one human-facing label:

```text
Color
```

Expected human surface:

```text
EASY_INSPECTOR
```

The user should not need to open the internal Fusion graph for the routine late edit in this Canary.

```text
INTERNAL_PARAMETER_COUNT != HUMAN_VISIBLE_CONTROL_COUNT
```

## Official native path

Blackmagic's Fusion template documentation describes Edit-page Generator templates and Fusion Template Bundles as a native path. The bundle hierarchy used by this fixture is:

```text
Edit/
└── Generators/
    └── WeddingNeutralSolid/
        └── WeddingNeutralSolid.setting
```

The folder is packaged as a ZIP-compatible bundle and given the lowercase `.drfx` extension.

Packaging evidence does not prove Resolve installation:

```text
DRFX_ARCHIVE_VALID != RESOLVE_INSTALLABLE
```

## Prepare the artifact

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-canary-inputs.mts drfx
```

Generated local files live under Git-ignored `out/`:

```text
out/canary-inputs/drfx/WeddingNeutralSolid.drfx
out/canary-inputs/drfx/WeddingNeutralSolid.manifest.json
out/canary-inputs/drfx/WeddingNeutralSolid.pack-report.json
out/canary-inputs/manifests/DV21-DRFX-FREE-01.json
```

The `.setting` source itself remains reviewable in Git:

```text
fixtures/resolve/drfx/WeddingNeutralSolid.setting
```

## Deterministic packaging

The packer uses a fixed ZIP entry timestamp:

```text
1980-01-01 00:00:00
```

and sorted explicit mappings. Repeated generation from the same `.setting` source is expected to produce the same `.drfx` SHA-256.

This makes runtime evidence attributable to the exact bundle rather than to an ambiguous filename.

Determinism still does not prove runtime validity:

```text
DETERMINISTIC_ARTIFACT != FUSION_RUNTIME_VALID
```

## Prepare an immutable runtime Session

```bash
node --no-warnings scripts/prepare-resolve-canary-session.mts \
  DV21-DRFX-FREE-01 \
  --execution-id DV21-DRFX-FREE-01-YYYYMMDD-MAC-FREE-A
```

The Session must remain:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

until a real Resolve execution begins.

## Resolve 21 runtime procedure

Use a disposable project only.

1. Capture exact Resolve product/version/edition/platform.
2. Install `WeddingNeutralSolid.drfx` using Resolve's normal supported template-bundle route.
3. Record the install dialog/result.
4. Restart Resolve if required by the tested runtime and record whether that was necessary.
5. Go to Edit page → Effects Library → Generators.
6. Locate `Wedding Neutral Solid`.
7. Add it to a disposable timeline.
8. Open Inspector.
9. Record every exposed control before changing anything.
10. Change the human-facing `Color` control to a clearly different value.
11. If the UI offers normal keyframing for the exposed control, perform one small bounded keyframe test and record the result. Do not infer keyframe support from documentation alone.
12. Save the project.
13. Close/reopen the disposable project.
14. Confirm the Generator still exists and the changed Inspector value persists.
15. Render a short neutral sample and hash the output.
16. Remove/uninstall the bundle through the supported route and record whether the template disappears as expected.

## Pass criteria

The first recipe passes only when all required observations are present:

- bundle installs/loads in the tested Resolve 21 edition/platform
- appears in the intended Edit/Generators surface
- expected human-facing control is available without graph spelunking
- changed value is visible and survives save/reopen
- render reflects the Inspector state
- uninstall behavior is observed

## Fail / downgrade cases

Classify honestly:

- archive is readable but Resolve rejects it → `INSTALL_FAIL`
- template appears only in an unexpected library/category → `CATEGORY_MISMATCH`
- template opens but no useful Inspector control is exposed → `HUMAN_ADJUSTABILITY_FAIL`
- routine correction requires opening opaque internal Fusion nodes → expected `EASY_INSPECTOR` is false
- value changes before save but resets after reopen → `SAVE_REOPEN_REGRESSION`
- render does not match the Inspector state → `RENDER_FAIL` / `VISUAL_MISMATCH`
- works only because an undeclared dependency exists → `DEPENDENCY_MISSING_FROM_MANIFEST`

## Trust boundary

Before real execution, only these are known:

- source `.setting` is reviewable
- archive hierarchy is structurally verified
- output hash is deterministic
- dependency declaration is empty
- expected exposed control mapping is explicit

Still unknown until Resolve 21 Actual:

- `.setting` runtime validity
- `.drfx` installability
- Effects Library category/name
- Inspector control rendering
- keyframe behavior
- save/reopen behavior
- final render
- uninstall behavior

Guardrails:

```text
SETTING_STRUCTURE_EXPECTED != FUSION_RUNTIME_VALID
DRFX_ARCHIVE_VALID != RESOLVE_INSTALLABLE
EXPOSED_CONTROL_SCHEMA != HUMAN_USABILITY_PROVEN
NO_DECLARED_EXTERNAL_DEPENDENCY != CLEAN_CONTEXT_PORTABILITY_PROVEN
GENERATED_ARTIFACT != RUNTIME_VERIFIED_HANDOFF
```

## Promotion

One successful run may produce valid PASS evidence, but the generic Canary policy still requires two independent executions before canonical promotion.

Do not use CI archive generation as either independent runtime execution.
