# Movie Tool Learning Run 18 — Palmier current FCPXML tests as stronger handoff evidence

Date: 2026-08-26
Scope: Movie Tool Learning only.

## Why this run exists

Previous runs read Palmier's exporter implementation and its transport comments. This run checks the current official test suite so Tool Learning does not trust implementation comments alone.

Source commit inspected: `palmier-io/palmier-pro@8805801fa4df8bc2dbc57cb0a854a1f5108f95c6`.

## Current test-backed findings

Palmier's `FCPXMLExporterTests.swift` confirms several behaviors with explicit assertions.

### FCPXML schema header

- Default exported header is asserted as FCPXML `1.10`.
- Explicit `1.14` selection is asserted to produce a `1.14` header.

This reinforces the existing schema-canary rule:

`RESOLVE_21 != FORCE_HIGHEST_FCPXML_SCHEMA`

1.10 remains the compatibility baseline; a higher schema is a candidate that must earn its use through Resolve 21 import/runtime evidence.

### Color/timeline resource context

The exporter test asserts the main format includes `colorSpace="1-1-1 (Rec. 709)"` and expected frame-format naming. This is stronger evidence that Palmier intentionally writes a color-space declaration, but it still does not prove that the receiving Resolve project's color-management configuration is equivalent.

Guardrail:

`FCPXML_COLORSPACE_DECLARATION != RESOLVE_PROJECT_COLOR_MANAGEMENT_PARITY`

### Missing/unresolvable media behavior

A clip referencing unresolved media is tested to be skipped rather than emitted as a broken asset/ref clip.

That means artifact QA must compare expected clip count/identity to exported clip count. A syntactically valid FCPXML may silently omit an unresolved source.

New failure fingerprint:

`VALID_XML_WITH_MISSING_CLIP`

Verification recipe must include:

- expected clip inventory before export,
- exported asset/ref/video inventory after XML parse,
- Resolve timeline inventory after import.

### Shared-source asset/resource behavior

The tests assert that repeated references to the same source collapse to one asset resource and that different Palmier media refs pointing at the same source file also collapse to one asset. This is intentional to avoid Resolve relinker problems from multiple assets sharing one `media-rep src`.

This matters for Human Master identity: logical clip identity and physical media identity must stay separate.

Guardrail:

`LOGICAL_CLIP_ID != PHYSICAL_MEDIA_RESOURCE_ID`

### Apostrophe/path handling

Palmier has an explicit regression test that an apostrophe in a source path becomes `%27`; the test comment states Resolve relinking fails when the apostrophe lands as `&apos;`.

This is exactly the kind of failure fingerprint Tool Learning should preserve.

New canary extension `PL-DV21-PATH-01`:

- source filename/path with apostrophe,
- spaces,
- Japanese characters,
- composed/decomposed Unicode where feasible,
- clean Resolve 21 import/relink,
- save/reopen.

### Still-image transform route

The tests assert still images export as `<video>` with transform data rather than requiring a compound media wrapper. This reinforces that still-photo Wedding scenes deserve their own Golden case rather than assuming video behavior covers them.

### A/V compound/ref-clip routing

The tests explicitly cover one-sided A/V clips and shared A/V sources. Palmier wraps certain sources in a compound `<media>` and uses `<ref-clip>` so Resolve honors `srcEnable`; tests state Resolve ignores `srcEnable` on bare asset-clips.

This is important implementation evidence for audio/video separation and should not be simplified away by an intermediate converter.

Guardrail:

`NORMALIZE_FCPXML_STRUCTURE_WITHOUT_RESOLVE_TESTS = UNSAFE`

An XML cleanup/adapter may look semantically equivalent while removing a Resolve-specific workaround.

### Transform keyframes

The test suite asserts a position `<param>` with `<keyframeAnimation>` and explicit linear keyframes. Therefore keyframed transform transport is not merely mentioned in comments; it is covered by exporter tests.

Trust state remains:

- exporter emission: TEST-BACKED,
- Resolve visual/readback parity: RUNTIME PENDING unless already reproduced by a specific Wedding canary.

### Static audio volume vs audio envelope/fades

The tests assert static audio volume emits a self-closing `<adjust-volume amount="..."/>` with no keyframe animation.

Separately, a deliberate non-export test sets `fadeInFrames` and asserts no fade element/channel-layout element is emitted.

This strongly supports the current split:

- static clip volume: Transport candidate,
- keyframed envelope/fades: Lost in this FCPXML path and Recovery required.

Do not infer that the existence of `<adjust-volume>` implies envelope transport.

Guardrail:

`STATIC_AUDIO_VOLUME_TRANSPORT != AUDIO_AUTOMATION_TRANSPORT`

## Evidence hierarchy improvement

For exporter capabilities, future Tool Learning should grade evidence approximately as:

1. current source + current regression test,
2. current source without test,
3. current official docs/release note,
4. current issue/discussion,
5. community reproduction.

A test does not prove Resolve runtime parity, but it materially raises confidence in what Palmier actually emits.

## New/expanded canaries

### PL-DV21-INVENTORY-01

Synthetic timeline containing:

- same media used twice,
- two logical media refs to the same source file,
- one deliberately unresolved media ref,
- still image,
- A/V source used video-only,
- same source audio-only,
- apostrophe + Japanese path cases.

Validate:

1. Palmier expected inventory,
2. parsed FCPXML inventory/resource graph,
3. clean Resolve 21 timeline/media-pool inventory,
4. relink state,
5. save/reopen.

### PL-DV21-AUDIO-STATIC-01

Compare static -6.0206 dB-like exported volume behavior against Resolve readback/audible/rendered result, while verifying that no envelope/fade is accidentally inferred.

## Failure fingerprints converted to guardrails

- `implementation-comment-only`: exporter comment is treated as enough -> inspect test coverage where available.
- `xml-valid-means-complete`: unresolved media was skipped but parse passed -> inventory diff required.
- `adapter-removes-resolve-workaround`: generic XML normalization rewrites compound/ref structure -> preserve unless Resolve canary proves equivalence.
- `static-volume-implies-envelope`: `<adjust-volume>` transport is generalized to fades/keyframes -> forbidden.
- `source-path-happy-only`: only ASCII/simple paths are tested -> add path canary.

## Saturation

NO_CHANGE is false. Current Palmier regression tests provide stronger evidence for schema selection, shared-resource routing, path encoding, A/V ref-clip workarounds, transform keyframes, static volume, and deliberate fade omission.
