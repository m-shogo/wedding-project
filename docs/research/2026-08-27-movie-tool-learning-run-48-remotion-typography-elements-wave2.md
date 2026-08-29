# Movie Tool Learning Run 48 — Typography Remotion Elements wave 2

Date: 2026-08-27

## Result

The shared canonical Typography Element Kit now covers six Motion Zukan patterns without creating a second motion implementation:

1. `type-mask-reveal` → `mask`
2. `type-char-stagger` → `stagger`
3. `type-type-on-rhythm` → `word-stagger`
4. `type-word-punch` → `punch`
5. `type-tracking-burst` → `tracking`
6. `type-vertical-wipe` → `vertical-wipe`

Wave 2 added the last three patterns through config-only builder/checker pairs. Motion behavior remains derived from `TypographyRevealEngine`.

## Shared human controls

All six candidates expose the same bounded Studio surface:

- text
- intensity
- color
- translate
- scale
- rotate
- opacity

Exit behavior remains canonical `fade` for the temporary Element wrapper. Production dependencies are not promoted.

## CI scaling

The Typography Elements workflow now:

- watches builder/checker files through path globs;
- regenerates and validates all six official Element payloads;
- prepares one six-candidate Mac Studio Actual batch;
- renders all six generated standalone Element sources;
- rechecks Motion Zukan registry honesty;
- keeps Studio install/control readback as `NOT_RUN`.

## Actual boundary

`ELEMENT_CANDIDATE` still means CI payload + standalone render evidence only.

The following remain Mac GUI Actual evidence and must not be inferred from CI:

- Studio confirmation approval;
- `.element.tsx` write;
- timeline insertion;
- Inspector control mutation;
- source readback;
- undo/redo;
- reload/restart persistence;
- exit visual confirmation;
- post-install render.

## Next target

After PR #396 is GREEN and merged, continue from current `main` rather than rebuilding the Element pipeline. The next implementation should either:

- add the next high-value canonical Typography modes (`outline`, `hop`, `triplet`) through the same Kit; or
- if Mac GUI access is available, execute the six-candidate bounded Actual and promote only genuinely proven candidates.
