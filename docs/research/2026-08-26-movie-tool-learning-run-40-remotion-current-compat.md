# Movie Tool Learning Run 40 — Remotion current 4.x compatibility / Studio Protocol / reuse-before-build

Date: 2026-08-26  
Scope: Movie Tool Learning only  
Production dependency upgrade: **NOT PERFORMED**

## Why this run exists

The Wedding Motion Studio currently resolves Remotion family packages to `4.0.475`, while the official Remotion GitHub latest release is `4.0.517` (published 2026-08-25).

A 42-patch coordinate gap now includes meaningful Studio, Elements, agent and renderer changes. The correct response is not to blindly update production dependencies. This run separates:

```text
LATEST_RELEASE_DISCOVERY
EPHEMERAL_COMPATIBILITY
PRODUCTION_DEPENDENCY_UPGRADE
STUDIO_ELEMENTS_INTEGRATION
V5_REVALIDATION
```

## Current coordinates

### Wedding repo

`motion-studio/pnpm-lock.yaml` resolves these direct Remotion packages to `4.0.475`:

- `remotion`
- `@remotion/cli`
- `@remotion/google-fonts`
- `@remotion/paths`
- `@remotion/zod-types`

`package.json` intentionally remains broad at `^4.0.0` for now; the lockfile is the actual reproducible coordinate.

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

Official release notes include:

- crop items;
- canvas crop controls;
- change media sources from Studio;
- open properties in editor;
- batch effect prop edits;
- composition metadata presets;
- SVG paint controls for Interactive;
- `push cut` transition presentation.

Wedding consequence:

Crop/source replacement should be evaluated as a human-editability improvement before we build custom controls for the same task.

### v4.0.503 — code-editor + Agent Skills + Element security

Official release notes include:

- Studio `Open in code editor` support;
- editor picker/default editor;
- configurable custom external code editor;
- Agent Skills update/outdated detection;
- Element installation confirmation and server-side preflight;
- secure third-party Studio Protocol install requests;
- containment of Element writes inside the project.

### Important correction — `custom editors`

The release phrase “Support custom editors” is easy to misread. Official `Open in code editor` documentation shows this means configuring the **external code editor** that Studio opens (VS Code, Cursor, Windsurf, Zed, WebStorm, custom executable, etc.).

It does **not** mean arbitrary custom widgets for the Studio property Inspector.

Failure fingerprint:

```text
FEATURE_NAME_AMBIGUITY
```

Guardrail:

```text
CUSTOM_EDITOR_FEATURE_NAME != CUSTOM_INSPECTOR_VALUE_EDITOR
```

### v4.0.508 — human editing + guidance

Official release notes include:

- Studio 3D transform controls;
- zod `.describe()` text shown as prop-editor tooltip;
- Open in Terminal / Finder;
- source/canvas interaction fixes;
- new media/effect capabilities.

Wedding consequence:

`zod.describe()` is especially relevant: Human Master field guidance can potentially appear directly next to editable Studio props without creating another help UI.

3D controls are a candidate only when the Wedding recipe actually needs 3D/perspective. Do not add 3D motion merely because the Studio gained controls.

### v4.0.516–4.0.517 — Studio library / agent / renderer maturity

Official release notes include:

- Agent Skills settings;
- copy agent context from Inspector rows;
- keyframe/navigation UI improvements;
- rulers/guides;
- pixel grid;
- timeline/media/font previews;
- Canvas Capture usability improvements;
- Elements library browsing inside Studio;
- external Element libraries;
- `Config.addElementLibrary()` object configuration;
- source-copyable Elements work;
- renderer Fast Start fixes;
- new `@remotion/gsap` package.

Wedding consequence:

The biggest opportunity is not GSAP. It is reducing the gap between:

```text
Motion Zukan preview
→ reusable implementation
→ Studio insertion
→ human Inspector adjustment
→ Codex/Claude source edit
```

## Studio Protocol — reuse instead of a second component system

Official Remotion v4.0.517 component-library integration documentation says:

- an Element contains one component's source code plus insertion data;
- Studio writes the component source into an `.element.tsx` file;
- Studio installs only dependencies declared in the Element payload;
- the component library itself does not need to be published/installed in the target project;
- the same component implementation can be used for `<Player>` preview and installed Element source;
- `createElementPayload()` validates the payload;
- `installInStudio()` or `setStudioDragData()` can deliver it to Studio;
- preview dimensions, duration and initial values should match the installed Element.

This directly supports reuse-before-build.

### Proposed Wedding architecture

Keep:

```text
Motion Zukan canonical registry / recipe / Human Master
```

as semantic authority.

Use Studio Protocol as a **delivery/editing surface**, not a second truth store:

```text
canonical recipe
→ self-contained Remotion component
→ same component in Player preview
→ createElementPayload()
→ Studio install / drag
→ .element.tsx source in project
→ ordinary source + Studio editing
```

Do not create a separate “gallery-only animation” implementation that visually imitates the production component.

Guardrail:

```text
STUDIO_INTERACTIVE != SOURCE_OF_TRUTH_MOVED_OUT_OF_CODE
```

## Studio Protocol security boundary

Official v4.0.517 security documentation says an Element contains executable React source and may declare npm dependencies.

Studio confirmation displays destination, source code and declared dependencies before installation. Declining does not write source files or install packages. However, after confirmation, source code and package lifecycle scripts execute with project file/network access.

Wedding policy:

- never embed secrets/API keys/tokens;
- never embed private wedding asset URLs that should not become source-visible;
- never copy paid template source into a public/source-copyable Element;
- dependencies must be minimal and reviewed/allowlisted;
- do not auto-confirm third-party Element installs;
- test install in a clean project/context;
- compare Player preview with installed Element;
- treat drag provenance as unverified unless independently known.

Guardrails:

```text
ELEMENT_INSTALL_REQUEST_ACCEPTED != INSTALL_CONFIRMED
ELEMENT_SOURCE_PUBLIC != SAFE_FOR_SECRETS_OR_PRIVATE_ASSET_URLS
ELEMENT_PREVIEW_MATCH != CLEAN_PROJECT_INSTALL_VERIFIED
```

## Agent / Instruction Reliability consequence

The recent Studio direction includes Agent Skills management and copying focused agent context from Inspector rows.

This is relevant to the Tool Learning Base because a good instruction should carry exact scope/context rather than asking an agent to rediscover the whole project.

Candidate future pattern:

```text
selected composition / sequence / property
+ Human Master intent
+ canonical recipe id
+ allowed edit boundary
+ copied Studio context
→ Codex/Claude bounded source edit
→ Studio visual readback
```

Do not treat “Agent Skills installed” as proof that a specific instruction is reliable.

```text
AGENT_SKILL_AVAILABLE != INSTRUCTION_RELIABILITY_VERIFIED
```

## `@remotion/gsap` routing

v4.0.517 introduces `@remotion/gsap`.

Do **not** add it by default. Existing Remotion frame-driven primitives remain preferable when they express the Human Master cleanly and deterministically.

Use GSAP only if a concrete recipe benefits enough to justify another animation dependency and its render determinism/SSR behavior is separately verified.

```text
NEW_PACKAGE_AVAILABLE != DEFAULT_DEPENDENCY
```

## License / policy coordinate

Official `v4.0.517` `LICENSE.md` says the Free License includes:

- individuals;
- for-profit organizations with up to 3 employees;
- non-profit/not-for-profit organizations;
- evaluation use.

Eligible users may create videos/images commercially or non-commercially and modify Remotion for their own use, subject to the license terms.

The same file explicitly states that the license will change in Remotion 5.0.

Therefore:

```text
REMOTION_V4_LICENSE != REMOTION_V5_LICENSE
```

A future v5 upgrade automatically places license compatibility into `Needs Revalidation`.

## Compatibility Canary

Production package/lock files are not changed in this run.

Focused CI performs:

1. frozen install of Wedding lock (`4.0.475`);
2. baseline contract/typecheck;
3. **runner-only** `pnpm add --save-exact` of the five direct Remotion packages at `4.0.517`;
4. exact installed-version assertion;
5. TypeScript;
6. canonical motion/asset/part/preset/director checks;
7. composition discovery;
8. neutral render smoke + ffprobe.

The package/lock mutation exists only inside the CI runner.

```text
EPHEMERAL_CI_GREEN != PRODUCTION_LOCKFILE_UPGRADED
```

If this Canary is GREEN, the next production-upgrade step still requires a deliberate package/lock update plus local Studio visual/manual QA.

## Trust-state result before CI

- `Remotion 4.0.517 current release`: official/evidence-backed.
- `Wedding repo 4.0.475 locked coordinate`: repo-runtime reproducible.
- `4.0.517 Wedding compatibility`: **PENDING_EPHEMERAL_CI**.
- `Elements/Studio Protocol as Motion Zukan delivery surface`: strong architecture candidate, not Wedding Verified.
- `production dependency upgrade`: not performed.
- `v5`: not current stable; license/API/package behavior needs future revalidation.

## Primary evidence

- Remotion GitHub release `v4.0.500`.
- Remotion GitHub release `v4.0.503`.
- Remotion GitHub release `v4.0.508`.
- Remotion GitHub release `v4.0.516`.
- Remotion GitHub release `v4.0.517` / `releases/latest`.
- Remotion v4.0.517 docs — `Studio Protocol / Integrating a component library with Studio`.
- Remotion v4.0.517 docs — `Studio Protocol security`.
- Remotion v4.0.517 docs — `Open in code editor`.
- Remotion v4.0.517 `LICENSE.md`.
- Wedding repo `motion-studio/pnpm-lock.yaml`.
