# Runbook — Remotion 4.0.517 Studio Actual

Date: 2026-08-26  
Status: `READY_FOR_LOCAL_ACTUAL`

## Purpose

Run40 established functional CI compatibility with Remotion `4.0.517` after nullable `@remotion/paths` handling was fixed.

Run42/Run43 added a second requirement: the candidate must also be version-coherent with the zod coordinate expected by the current Remotion CLI.

The target-Mac Actual must therefore use:

```text
Remotion family  4.0.517
zod             4.4.3
```

The production repo still remains:

```text
Remotion lock   4.0.475
zod             4.3.6
```

No production dependency upgrade has been performed.

## Current truth

```text
repo Remotion lock             4.0.475
repo zod                       4.3.6
candidate Remotion             4.0.517
candidate zod                  4.4.3
functional CI compatibility    PASS
version-coherence CI           PASS
canonical contracts            PASS
composition discovery          PASS
neutral H.264 render           PASS
local Studio Actual            NOT_RUN
Mask Reveal Element install    NOT_RUN
production lock upgrade        NOT_PERFORMED
```

Detailed execution prompt:

`docs/prompts/2026-08-26-remotion-4-0-517-studio-local-actual-agent.md`

## Why zod is part of the candidate

A Run42 standalone render succeeded on Remotion `4.0.517` while the CLI warned:

```text
zod 4.3.6 installed / 4.4.3 required
```

A strengthened rerun with exact `zod@4.4.3` passed:

- exact package assertions;
- `remotion versions --log=verbose` mismatch gate;
- TypeScript;
- official Element payload validation;
- standalone Element render;
- Motion Studio regression CI.

Therefore:

```text
RENDER_SUCCESS_WITH_VERSION_WARNING != VERSION_COHERENT
REMOTION_VERSION_COHORT != REMOTION_PACKAGES_ONLY
```

## Required local checks

Run in a disposable worktree only.

| Check | Required result |
|---|---|
| exact Remotion identity | all five direct Remotion packages = `4.0.517` |
| exact zod identity | `4.4.3` |
| `remotion versions --log=verbose` | no unexplained mismatch |
| Studio launch | PASS |
| composition discovery | PASS |
| Canvas render | PASS |
| timeline scrub/playback | PASS |
| paper-plane / Stamp Rush regression | PASS |
| native crop control | PASS or honest component-structure block |
| media source replacement | PASS or honest component-structure block |
| Inspector prop edit | PASS |
| Open in editor | observed honestly; not a custom Inspector claim |
| Elements/library UI | observe only; third-party install prohibited |
| save/reload/restart | PASS |
| neutral render after GUI | H.264 / 1920x1080 / hashed |

## Critical state separation

Keep these independent:

```text
FUNCTIONAL_CI_COMPATIBLE
VERSION_COHERENT
LOCAL_STUDIO_USABLE
PRODUCTION_LOCK_UPGRADED
ELEMENT_INSTALL_VERIFIED
```

One does not imply the next.

## Privacy / concurrency

- Do not touch PR #385 / TimingMaster work.
- Do not use or clean another agent's dirty worktree.
- Prefer neutral/synthetic compositions for screenshots.
- Do not commit private Wedding photos or private filenames.
- Do not record personal filesystem paths in evidence.
- Do not install unreviewed third-party Element dependencies.

## Evidence

Store raw evidence under ignored output, for example:

`motion-studio/out/research/remotion-4.0.517-studio-actual/`

Minimum report fields:

```text
git SHA
baseline Remotion/zod
candidate Remotion/zod
remotion versions coherence result
macOS / arch / Node / pnpm
PASS|FAIL|BLOCKED per check
failure reproduction steps
render SHA-256 + ffprobe readback
GO|NO_GO|NEEDS_MORE_EVIDENCE
tracked-source mutation yes/no
PR #385 untouched confirmation
```

## Promotion

`GO` means only:

> It is reasonable to open a separate bounded PR that updates the production dependency cohort to Remotion `4.0.517` + zod `4.4.3`.

It does **not** authorize automatically editing `main` or installing Elements.

`@remotion/studio-protocol` remains optional research tooling until a real Wedding Element transport is intentionally adopted.

## Separate Mask Reveal Element Actual

The current Studio Actual only observes the Elements/library surface.

The following require a separate clean-project canary:

```text
Mask Reveal confirmation dialog
.element.tsx write
actual timeline insertion
post-install prop/source editability
save/reload/restart
clean-context reinstall
preview-vs-installed comparison
```

Do not infer those from library visibility.

## Failure classification

Use precise fingerprints:

- `VERSION_IDENTITY_MISMATCH`
- `VERSION_COHERENCE_MISMATCH`
- `STUDIO_LAUNCH_FAILURE`
- `CANVAS_RUNTIME_FAILURE`
- `TIMELINE_INTERACTION_FAILURE`
- `PATH_SAMPLING_RUNTIME_REGRESSION`
- `CROP_CONTROL_UNAVAILABLE_OR_BROKEN`
- `MEDIA_SOURCE_REPLACEMENT_UNAVAILABLE_OR_BROKEN`
- `COMPONENT_STRUCTURE_BLOCKS_NATIVE_EDITABILITY`
- `SAVE_RELOAD_PERSISTENCE_FAILURE`
- `POST_GUI_RENDER_FAILURE`

Record exact reproduction steps before changing code.
