# Movie Tool Learning Run 47 — Motion Zukan Element readiness + bounded Studio Actual batch

Date: 2026-08-27

## Completed in this run

Run46 established three canonical-derived Remotion Element candidates:

- `type-mask-reveal`
- `type-char-stagger`
- `type-type-on-rhythm`

Run47 makes that state visible to a human inside Motion Zukan and removes repeated manual setup from the next Mac Studio Actual.

### Motion Zukan surface

Each of the three candidate cards can now show:

- readiness (`ELEMENT_CANDIDATE` or `STUDIO_ACTUAL_VERIFIED`);
- canonical engine + mode;
- payload slug;
- editable fields;
- standalone render CI state;
- production dependency promotion state;
- Studio install Actual state;
- Studio control readback Actual state.

`ELEMENT_CANDIDATE` deliberately does not mean "installed and usable in Studio".

## Bounded Actual batch preparation

From a disposable worktree with the coherent Remotion 4.0.517 candidate installed in `motion-studio`:

```bash
cd motion-studio
node --no-warnings scripts/prepare-typography-elements-studio-actual-batch.mts
node --no-warnings scripts/check-typography-elements-studio-actual-batch.mts
```

The generated batch lives under ignored output:

```text
movie-dashboard/out/remotion-element-actual-batch/
├── batch-manifest.json
├── index.html
├── main.ts
├── payloads/
│   ├── type-mask-reveal.json
│   ├── type-char-stagger.json
│   └── type-type-on-rhythm.json
└── studio-sandbox/src/
    ├── Root.tsx
    └── index.ts
```

The preparation step rebuilds and rechecks every payload from the canonical source before copying it into the batch.

## Actual execution boundary

Preparation is CI-testable. Actual execution is not.

Mac Actual must still separately prove, for every candidate:

1. install request transport;
2. Studio confirmation dialog content;
3. human approval;
4. `.element.tsx` write;
5. timeline insertion;
6. text/intensity/color/transform mutation;
7. source readback;
8. undo/redo;
9. reload persistence;
10. Studio restart persistence;
11. exit visual;
12. post-install render.

The generated manifest initializes all evidence to `NOT_RUN`.

Guardrails:

```text
AWAITING_CONFIRMATION != INSTALL_CONFIRMED
ELEMENT_FILE_WRITTEN != TIMELINE_INSERTION_VERIFIED
CONTROL_VISIBLE != CONTROL_MUTATION_PERSISTED
REQUEST_TRANSPORT_PASS != STUDIO_ACTUAL_PASS
BATCH_PREPARED != BATCH_EXECUTED
```

## Recommended Mac execution

Use a disposable worktree. Keep production dependencies unchanged.

In `motion-studio`, use the same exact candidate set already proven in CI:

```text
remotion                     4.0.517
@remotion/cli                4.0.517
@remotion/google-fonts       4.0.517
@remotion/paths              4.0.517
@remotion/zod-types          4.0.517
@remotion/studio-protocol    4.0.517
zod                          4.4.3
```

After batch preparation, start the generated writable sandbox on a port from the Studio Protocol discovery range (3000–3009):

```bash
cd motion-studio
pnpm exec remotion studio \
  ../movie-dashboard/out/remotion-element-actual-batch/studio-sandbox/src/index.ts \
  --port=3001
```

In another terminal, use `movie-dashboard` only as the disposable localhost Vite host. Add the Studio Protocol candidate there temporarily, then serve the generated batch directory:

```bash
cd movie-dashboard
pnpm add --save-exact @remotion/studio-protocol@4.0.517
pnpm exec vite out/remotion-element-actual-batch --host 127.0.0.1 --port 5174
```

Before each request, focus `TypographyElementActualSandbox` in Studio. Send only one candidate at a time and finish its full evidence row before moving to the next candidate.

## Current truth

```text
candidate count                = 3
payload validation             = CI candidate
standalone render              = CI candidate
Motion Zukan readiness surface = implemented
Actual batch preparation       = implemented
Studio confirmation            = NOT_RUN
Studio install                 = NOT_RUN
Inspector/control readback     = NOT_RUN
production dependency upgrade  = NO
```

## Next implementation target

After this PR is GREEN and merged:

1. perform the bounded Mac Studio Actual using the generated batch;
2. update only genuinely proven evidence from `NOT_RUN` to `PASS`/`FAIL`;
3. promote a pattern to `STUDIO_ACTUAL_VERIFIED` only when install + control readback + persistence + post-install render all pass;
4. then move the same shared Element kit to the next high-value Typography Reveal modes instead of creating another bespoke pipeline.
