# Mask Reveal Run45 — Mac Studio Actual prompt for Codex / Claude Code

Date: 2026-08-26  
Target: macOS / Remotion Studio 4.0.517  
Scope: `type-mask-reveal` after canonical color + exit integration

## Mission

Prove the real Studio behavior that GitHub CI cannot prove.

Run45 adds two canonical capabilities:

```text
TypographyRevealEngine.color
TypographyRevealEngine.exitAnimation
```

The generated Element exposes `文字色` through `Interactive.withSchema()` and invokes the canonical engine with:

```text
mode = mask
transparent = true
exitAnimation = fade
```

Do not treat request transport, source generation, or static schema presence as proof that Studio editing works.

## Hard boundaries

- Do not touch unrelated dirty worktrees.
- Do not modify PR #385 / TimingMaster / audio-analysis work.
- Do not edit `main` directly.
- Do not upgrade production dependencies permanently.
- Do not install third-party Elements.
- Do not use private Wedding photos or private asset URLs.
- Do not claim install success from `awaiting-confirmation`.
- Do not claim `文字色` works merely because `type: 'color'` exists in source.
- Do not replace the canonical exit with a wrapper-only fade.
- Do not mark Studio Actual PASS unless every required readback below is observed.

Guardrails:

```text
REQUEST_DELIVERED != INSTALL_CONFIRMED
SCHEMA_PRESENT != CONTROL_VISIBLE
CONTROL_VISIBLE != CONTROL_MUTATION_PERSISTED
EXIT_SOURCE_PRESENT != EXIT_VISUALLY_VERIFIED
LOCAL_ACTUAL_PASS != PRODUCTION_DEPENDENCY_UPGRADE
```

## 1. Start from the Run45 branch or merged commit

Use a disposable worktree based on the exact Run45 branch/commit being tested.

Record:

```bash
git rev-parse HEAD
git status --short
git branch --show-current
```

Expected worktree state before setup:

```text
clean
```

## 2. Prepare the bounded Remotion candidate

Inside `motion-studio`:

```bash
pnpm install --frozen-lockfile
pnpm typecheck
```

Temporarily install a coherent 4.0.517 candidate only in this disposable worktree:

```bash
pnpm add --save-exact \
  remotion@4.0.517 \
  @remotion/cli@4.0.517 \
  @remotion/google-fonts@4.0.517 \
  @remotion/paths@4.0.517 \
  @remotion/zod-types@4.0.517 \
  @remotion/studio-protocol@4.0.517 \
  zod@4.4.3
```

Then:

```bash
pnpm exec remotion versions --log=verbose
pnpm typecheck
```

Stop if the candidate is incoherent.

## 3. Generate the current Element artifacts

```bash
rm -rf out/research/remotion-elements/mask-reveal
node --no-warnings scripts/build-mask-reveal-element-payload.mts
node --no-warnings scripts/check-mask-reveal-element-payload.mts
```

Record from `manifest.json`:

```text
canonicalBlockSha256
elementSourceSha256
studioInteractivity.editableFields
studioInteractivity.colorControl
exitAnimation.mode
exitAnimation.elementOnlyImplementation
actualStudioControlReadback
actualStudioInstallState
```

Required pre-Actual state:

```text
colorControl = CANONICAL_ENGINE_BACKED
exitAnimation.mode = CANONICAL_FADE
exitAnimation.elementOnlyImplementation = false
actualStudioControlReadback = NOT_RUN
actualStudioInstallState = NOT_RUN
```

## 4. Protect the backward-compatible canonical default

Before installing the Element, render the repository concept that calls `TypographyRevealEngine` without the new props.

The important behavior is:

```text
no explicit color prop
→ white

no explicit exitAnimation prop
→ no forced fade-out
```

Record a frame near the end of the concept and confirm the text has not faded merely because Run45 added the new capability.

This proves:

```text
NEW_CAPABILITY != NEW_DEFAULT_BEHAVIOR
```

## 5. Start a neutral writable Studio sandbox

Use the same neutral 1280x720 / 30fps / 180-frame scratch composition pattern from the Run44 Actual procedure.

Run Studio on a free port from 3000 through 3009.

Confirm:

```text
Studio version = 4.0.517
writable composition focused
neutral background visible
```

## 6. Send the install request from a localhost browser origin

Use `installInStudio()` from a localhost browser harness.

Record the exact return value.

Expected transport success may be:

```text
success = true
status = awaiting-confirmation
```

Classify that only as:

```text
REQUEST_DELIVERED = PASS
INSTALL_CONFIRMED = NOT_YET
```

## 7. Human confirmation

Inspect the Studio confirmation dialog before approving.

Confirm the dialog identifies the intended Mask Reveal Element and does not request unexpected dependencies or unrelated writes.

Only then click Approve.

After approval separately verify:

```text
.element.tsx written
Timeline item inserted
Canvas item visible
```

Each is an independent PASS/FAIL field.

## 8. Verify the Studio control surface

Select the useful internal Mask Reveal item.

The following controls must be visible and understandable:

```text
表示テキスト
動きの強さ
文字色
translate
scale
rotate
opacity
```

Do not require a user-facing exit toggle. Run45 intentionally treats exit fade as fixed temporary-overlay behavior.

## 9. Mutate each semantic control

### Text

Change:

```text
WELCOME
→ TEST TITLE
```

Verify Canvas and source readback.

### Intensity

Change:

```text
M
→ L
```

Verify the entrance movement becomes stronger and source readback changes.

### Color

Change:

```text
#ffffff
→ #f0d37a
```

Verify all of the following independently:

```text
color picker accepts the value
Canvas text visibly changes color
source readback contains the changed value
reload preserves it
```

This is the critical new Run45 control proof.

### Transform

Mutate translate, scale, rotate and opacity one at a time.

For each one verify:

```text
Canvas changes
source readback changes
undo restores
redo reapplies
```

## 10. Verify the canonical exit visually

Use the installed Element's own duration.

At 30fps / 120 frames, inspect approximately:

```text
frame 100  -> fully visible
frame 109  -> exit beginning vicinity
frame 114  -> partially faded
frame 119  -> effectively zero opacity
```

Exact frame behavior should follow the generated canonical source, not this prose if the duration/fps differs.

Verify:

```text
entrance still works
middle hold remains stable
end fades out
```

Then inspect the installed source and confirm the exit comes from the embedded canonical `TypographyRevealEngine` capability rather than a second wrapper-only interpolation.

Required classification:

```text
CANONICAL_EXIT_VISUAL = PASS
ELEMENT_ONLY_EXIT_DUPLICATION = NO
```

## 11. Persistence checks

After text/intensity/color/transform edits:

1. undo;
2. redo;
3. reload Studio;
4. close and restart Studio;
5. reopen the composition.

Confirm the intended persisted edits survive without malformed source.

## 12. Post-install render

Render the sandbox composition after installation and edits.

Verify:

```text
render succeeds
custom color is visible
exit fade is visible
no unexpected background is introduced
no missing dependency error occurs
```

## 13. Final result table

Report every item separately:

```text
REQUEST_DELIVERED=
CONFIRMATION_DIALOG_CORRECT=
HUMAN_APPROVE=
ELEMENT_FILE_WRITTEN=
TIMELINE_INSERTION=
CANVAS_VISIBLE=
TEXT_CONTROL_VISIBLE=
INTENSITY_CONTROL_VISIBLE=
COLOR_CONTROL_VISIBLE=
TRANSFORM_CONTROLS_VISIBLE=
TEXT_MUTATION_READBACK=
INTENSITY_MUTATION_READBACK=
COLOR_MUTATION_READBACK=
TRANSLATE_MUTATION_READBACK=
SCALE_MUTATION_READBACK=
ROTATE_MUTATION_READBACK=
OPACITY_MUTATION_READBACK=
CANONICAL_EXIT_VISUAL=
UNDO_REDO=
RELOAD_PERSISTENCE=
STUDIO_RESTART_PERSISTENCE=
POST_INSTALL_RENDER=
PRODUCTION_DEPENDENCY_UPGRADE_PERFORMED=NO
```

Only when every required Studio field is PASS may the repository evidence be upgraded from `NOT_RUN` to a verified Actual state.
