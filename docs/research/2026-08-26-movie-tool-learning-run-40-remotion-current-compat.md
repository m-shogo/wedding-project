# Movie Tool Learning Run 40 — Remotion current 4.x compatibility / Studio Protocol / reuse-before-build

Date: 2026-08-26  
Scope: Movie Tool Learning only  
Production dependency upgrade: **NOT PERFORMED**

## Why this run exists

Wedding Motion Studio resolves the direct Remotion family to `4.0.475`, while the official Remotion GitHub latest release is `4.0.517` (published 2026-08-25).

A 42-patch coordinate gap contains meaningful Studio, Elements, agent and renderer changes. This run deliberately separates:

```text
LATEST_RELEASE_DISCOVERY
EPHEMERAL_COMPATIBILITY
PRODUCTION_DEPENDENCY_UPGRADE
STUDIO_ELEMENTS_INTEGRATION
V5_REVALIDATION
```

Do not collapse those into “latest exists, therefore upgrade”.

## Current coordinates

### Wedding repo

`motion-studio/pnpm-lock.yaml` resolves these direct packages to `4.0.475`:

- `remotion`
- `@remotion/cli`
- `@remotion/google-fonts`
- `@remotion/paths`
- `@remotion/zod-types`

`package.json` remains at `^4.0.0`; the lockfile is the reproducible coordinate.

### Official current release

Remotion official GitHub `releases/latest`:

```text
v4.0.517
published: 2026-08-25T15:09:07Z
```

Guardrail:

```text
LATEST_RELEASE_AVAILABLE != WEDDING_REPO_COMPATIBLE
```

## High-value changes since the Wedding lock

### v4.0.500 — editing friction reduction

Official release notes include crop items, canvas crop controls, Studio media-source replacement, property-to-editor navigation, batch effect prop edits, composition metadata presets and SVG paint controls.

Wedding consequence: use native Studio crop/source replacement before inventing custom controls for the same task.

### v4.0.503 — code editor / Agent Skills / Element security

Official release notes include external code-editor selection, Agent Skills update detection, Element installation confirmation/preflight and secure third-party Studio Protocol requests.

Important correction: the release phrase **custom editors** means configuring the external code editor Studio opens (VS Code, Cursor, Windsurf, Zed, WebStorm, custom executable, etc.). It does **not** mean arbitrary custom widgets for the Studio property Inspector.

```text
FEATURE_NAME_AMBIGUITY
CUSTOM_EDITOR_FEATURE_NAME != CUSTOM_INSPECTOR_VALUE_EDITOR
```

### v4.0.508 — human editing + guidance

Official release notes include Studio 3D transform controls and display of zod `.describe()` text as prop-editor tooltips.

For Wedding, `.describe()` is high-value because Human Master guidance can appear beside editable props. 3D controls remain opt-in only when a recipe actually needs perspective/3D.

### v4.0.516–4.0.517 — Studio library / agent / renderer maturity

Relevant changes include:

- Agent Skills settings;
- copy agent context from Inspector rows;
- keyframe/navigation improvements;
- rulers/guides and pixel grid;
- timeline media/font previews;
- Elements browsing inside Studio;
- external Element libraries;
- `Config.addElementLibrary()`;
- renderer Fast Start fixes;
- new `@remotion/gsap` package.

The major opportunity is not “use GSAP”. It is shrinking the gap between:

```text
Motion Zukan preview
→ reusable implementation
→ Studio insertion
→ human adjustment
→ Codex/Claude source edit
```

## Studio Protocol — reuse instead of a second component system

Official v4.0.517 component-library integration documentation states that an Element contains component source plus insertion data, Studio writes installed source into `.element.tsx`, and only declared dependencies are installed.

The same self-contained component implementation can be used for both `<Player>` preview and installed Element source. This is the preferred reuse path:

```text
canonical recipe / Human Master
→ self-contained Remotion component
→ same implementation in Player preview
→ createElementPayload()
→ Studio install / drag
→ .element.tsx in project
→ ordinary source + Studio editing
```

Do not maintain a separate gallery-only animation that merely imitates production.

```text
STUDIO_INTERACTIVE != SOURCE_OF_TRUTH_MOVED_OUT_OF_CODE
```

### Official payload contract — do not reimplement

The v4.0.517 `createElementPayload()` implementation validates, among other things:

- source code shorter than 200,000 characters;
- full payload shorter than 250,000 characters;
- at most 100 dependencies;
- safe lowercase slug;
- exactly one exported named React component in source;
- duration from 1 to 100,000,000 frames;
- installation mode `wrapped` or `component-owned-sequence`.

Wedding should call the official validator rather than reproducing these rules.

## Studio Protocol security boundary

An Element is executable React source and may install npm dependencies. Studio confirmation shows destination, source and dependencies, but after confirmation the source and package lifecycle scripts can execute with project file/network access.

Wedding policy:

- no secrets/API keys/tokens;
- no private Wedding asset URLs that must remain private;
- no paid-template source copied into a source-visible Element;
- minimal reviewed dependency allowlist;
- no auto-confirm of third-party Elements;
- clean-project installation test;
- Player-preview vs installed-Element comparison.

```text
ELEMENT_INSTALL_REQUEST_ACCEPTED != INSTALL_CONFIRMED
ELEMENT_SOURCE_PUBLIC != SAFE_FOR_SECRETS_OR_PRIVATE_ASSET_URLS
ELEMENT_DEPENDENCY_DECLARED != DEPENDENCY_POLICY_APPROVED
ELEMENT_PREVIEW_MATCH != CLEAN_PROJECT_INSTALL_VERIFIED
```

## `@remotion/gsap` routing

v4.0.517 introduces `@remotion/gsap`, but it is not a default Wedding dependency. Existing frame-driven Remotion primitives remain preferable when they express the Human Master cleanly and deterministically.

```text
NEW_PACKAGE_AVAILABLE != DEFAULT_DEPENDENCY
```

## License / v5 boundary

Official v4.0.517 `LICENSE.md` lists the current Free License eligibility including individuals and qualifying small organizations, while explicitly announcing a Remotion 5 license change.

The current v5 migration guide also describes planned API/runtime changes. Therefore v5 is a separate revalidation event, not an automatic continuation of this v4 result.

```text
REMOTION_V4_LICENSE != REMOTION_V5_LICENSE
```

## Compatibility Canary design

Production package/lock files are not changed by this run. Focused CI performs:

1. frozen install of Wedding lock `4.0.475`;
2. baseline contract/typecheck;
3. runner-only update of the five direct Remotion packages to `4.0.517`;
4. exact installed-version assertion;
5. TypeScript;
6. canonical motion/asset/part/preset/director checks;
7. composition discovery;
8. neutral H.264 render smoke plus ffprobe.

```text
EPHEMERAL_CI_GREEN != PRODUCTION_LOCKFILE_UPGRADED
```

## Actual first-run failure — useful compatibility evidence

The first 4.0.517 Canary did **not** pass TypeScript.

The candidate packages installed correctly and all five direct Remotion packages resolved exactly to `4.0.517`, but TypeScript reported nullable geometry in:

```text
src/components/opening/PlaneOnRoute.tsx
src/compositions/opening/StampRushFullRoute.tsx
```

`getPointAtLength()` / `getTangentAtLength()` values could no longer be consumed as unconditionally non-null.

Remotion's current docs explain the forward boundary: in v5, path sampling beyond path length returns `null`; current 4.x types already expose that safer contract.

Failure fingerprint:

```text
REMOTION_PATH_SAMPLING_NULLABLE_TYPE
```

The repair intentionally does **not** use non-null assertions.

- reusable `PlaneOnRoute`: if geometry cannot be sampled, render no plane for that component instance;
- `StampRushFullRoute`: preserve the whole scene and fail-soft to the active segment destination plus the `from → to` direction.

For normal in-range Wedding paths, no visual change is expected.

## Actual compatibility result

After the null-safe fix, focused GitHub Actions Canary `32973905349` reached:

```text
baseline frozen install                   PASS
baseline TypeScript                       PASS
4.0.517 five-package ephemeral install    PASS
exact installed-version assertion         PASS
4.0.517 TypeScript                        PASS
canonical motion contracts                PASS
composition discovery                     PASS
neutral H.264 render 1920x1080             PASS
ffprobe readback                           PASS
```

Therefore the current trust state is:

```text
Remotion 4.0.517 CI compatibility = GREEN
Production dependency upgrade     = NOT PERFORMED
Local Remotion Studio interaction = NOT VERIFIED YET
Elements clean-project install    = NOT VERIFIED YET
```

Guardrail:

```text
CI_RENDER_GREEN != LOCAL_STUDIO_INTERACTION_VERIFIED
```

## What remains before a production Remotion upgrade

1. Launch Remotion Studio on the target Mac using the candidate version.
2. Open representative Wedding compositions and verify canvas/timeline behavior.
3. Exercise the specific new controls that justify upgrading: especially crop/source replacement and relevant Studio editing affordances.
4. If local Studio QA is acceptable, perform a deliberate package/lock update in a separate bounded change.
5. Re-run the full Motion Studio CI after that real lock update.

Do not change the production lock merely because the ephemeral runner is GREEN.

## Agent / Instruction Reliability consequence

Recent Studio releases include Agent Skills management and focused context copying. Candidate future flow:

```text
selected composition / sequence / property
+ Human Master intent
+ canonical recipe id
+ allowed edit boundary
+ Studio context
→ Codex/Claude bounded source edit
→ Studio visual readback
```

```text
AGENT_SKILL_AVAILABLE != INSTRUCTION_RELIABILITY_VERIFIED
```

## Primary evidence

- Remotion official releases `v4.0.500`, `v4.0.503`, `v4.0.508`, `v4.0.516`, `v4.0.517`.
- Remotion v4.0.517 Studio Protocol component-library integration docs.
- Remotion v4.0.517 Studio Protocol security docs.
- Remotion v4.0.517 `packages/studio-protocol/src/element-payload.ts`.
- Remotion v4.0.517 `Open in code editor` docs.
- Remotion v4.0.517 path-sampling docs and v5 migration guide.
- Remotion v4.0.517 `LICENSE.md`.
- Wedding repo `motion-studio/pnpm-lock.yaml`.
- GitHub Actions compatibility Canary `32973905349`.

## Saturation

`NO_CHANGE` is false.

Run40 converted “Remotion is behind latest” from a vague maintenance concern into a measured compatibility result, discovered and fixed a real forward-compatibility issue, and identified Studio Protocol as a reuse-before-build route for Motion Zukan without moving semantic truth out of the canonical registry.
