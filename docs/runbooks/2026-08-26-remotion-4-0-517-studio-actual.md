# Runbook — Remotion 4.0.517 Studio Actual

Date: 2026-08-26  
Status: `READY_FOR_LOCAL_ACTUAL`

## Purpose

Run40 established that Wedding Motion Studio is CI-compatible with Remotion `4.0.517` after handling nullable `@remotion/paths` sampling safely.

This runbook covers the remaining local-only evidence before considering a real production dependency upgrade.

## Current truth

```text
repo lock                  4.0.475
candidate                  4.0.517
CI TypeScript              PASS
canonical contracts        PASS
composition discovery      PASS
neutral H.264 render       PASS
local Studio Actual        NOT_RUN
production lock upgrade    NOT_PERFORMED
```

The detailed Codex / Claude Code execution prompt is:

`docs/prompts/2026-08-26-remotion-4-0-517-studio-local-actual-agent.md`

## Required local checks

Run in a disposable worktree only.

| Check | Required result |
|---|---|
| exact package identity | all five direct Remotion packages = `4.0.517` |
| Studio launch | PASS |
| composition discovery | PASS |
| Canvas render | PASS |
| timeline scrub/playback | PASS |
| paper-plane / Stamp Rush regression | PASS |
| native crop control | PASS |
| media source replacement | PASS or honest `BLOCKED_BY_COMPONENT_STRUCTURE` |
| Inspector prop edit | PASS |
| Open in editor | observed honestly; not a custom Inspector claim |
| Elements/library UI | observe only; do not install third-party Elements |
| save/reload/restart | PASS |
| neutral render after GUI | H.264 / 1920x1080 / hashed |

## Critical distinction

The result must keep these states separate:

```text
CI_COMPATIBLE
LOCAL_STUDIO_USABLE
PRODUCTION_LOCK_UPGRADED
ELEMENT_INSTALL_VERIFIED
```

One does not imply the next.

## Privacy / concurrency

- Do not touch PR #385 / TimingMaster work.
- Do not use another agent's dirty worktree.
- Prefer neutral/synthetic compositions for screenshots.
- Do not commit screenshots containing private Wedding photos.
- Do not record personal filesystem paths in evidence.
- Do not install unreviewed third-party Element dependencies.

## Evidence

Store raw local evidence under an ignored output path such as:

`motion-studio/out/research/remotion-4.0.517-studio-actual/`

Minimum report fields:

```text
git SHA
candidate version
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

> It is reasonable to open a separate bounded PR that updates the production Remotion package/lock coordinate.

It does **not** authorize automatically editing `main` or installing Elements.

## If Actual fails

Do not downgrade evidence to a vague “Studio issue”. Classify the failure:

- `STUDIO_LAUNCH_FAILURE`
- `CANVAS_RUNTIME_FAILURE`
- `TIMELINE_INTERACTION_FAILURE`
- `PATH_SAMPLING_RUNTIME_REGRESSION`
- `CROP_CONTROL_UNAVAILABLE_OR_BROKEN`
- `MEDIA_SOURCE_REPLACEMENT_UNAVAILABLE_OR_BROKEN`
- `SAVE_RELOAD_PERSISTENCE_FAILURE`
- `POST_GUI_RENDER_FAILURE`
- `VERSION_IDENTITY_MISMATCH`
- `COMPONENT_STRUCTURE_BLOCKS_NATIVE_EDITABILITY`

Record exact reproduction steps before changing code.
