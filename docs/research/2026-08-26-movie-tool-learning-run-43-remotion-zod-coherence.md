# Movie Tool Learning Run 43 — Remotion 4.0.517 / zod 4.4.3 version coherence

Date: 2026-08-26  
Scope: Movie Tool Learning / Remotion current compatibility  
Production dependency upgrade: **NOT PERFORMED**

## Why this run exists

Run40 proved that Wedding Motion Studio could compile, discover compositions and render on Remotion `4.0.517` after fixing nullable path sampling.

Run42 then exercised a new surface: `@remotion/studio-protocol@4.0.517` plus a canonical-derived Mask Reveal Element payload and standalone render.

That render **succeeded**, but the Remotion CLI emitted a version-coherence warning:

```text
zod: installed 4.3.6, required 4.4.3
```

This matters because:

```text
RENDER_SUCCESS_WITH_VERSION_WARNING != VERSION_COHERENT
```

A successful render is evidence of functional compatibility, but it is not permission to ignore the version set Remotion itself expects.

## Baseline and candidate coordinates

Current Wedding production coordinate remains:

```text
Remotion direct family: 4.0.475 via pnpm lock
zod:                   4.3.6 exact in package.json
```

The coherent ephemeral candidate established by Run42 is:

```text
remotion                  4.0.517
@remotion/cli             4.0.517
@remotion/google-fonts    4.0.517
@remotion/paths           4.0.517
@remotion/zod-types       4.0.517
zod                       4.4.3
```

`@remotion/studio-protocol@4.0.517` was additionally present in the Element Canary, but it remains optional tooling and has **not** been promoted into Wedding production dependencies.

## Actual discovery path

### Run42 first focused execution

GitHub Actions run:

```text
32976052216
```

The following all succeeded:

- baseline Wedding install;
- baseline typecheck;
- Remotion `4.0.517` family install;
- official `createElementPayload()` validation;
- generated standalone Element bundle;
- 120-frame H.264 standalone Element render.

However, during render the CLI printed a version mismatch warning for `zod 4.3.6` and explicitly required `4.4.3`.

Therefore the trust state was **not** promoted to version-coherent merely because the MP4 existed.

Failure / warning fingerprint:

```text
REMOTION_ZOD_VERSION_COHERENCE_WARNING
```

### Run42 coherent rerun

The Canary was strengthened to install exact `zod@4.4.3` together with Remotion `4.0.517` and to execute:

```text
remotion versions --log=verbose
```

GitHub Actions run:

```text
32976279665
```

Result:

```text
exact Remotion versions           PASS
exact zod 4.4.3                  PASS
remotion versions mismatch gate  PASS
TypeScript                       PASS
official Element payload         PASS
standalone Element render        PASS
Motion Studio regression CI      PASS
```

This is the current coherent candidate evidence.

## Decision

Future Remotion `4.0.517` compatibility checks and local Studio Actual must use the coherent candidate **cohort**, not only the five direct Remotion packages.

Required candidate set for the current upgrade evaluation:

```text
Remotion family = 4.0.517
zod            = 4.4.3
```

Guardrail:

```text
REMOTION_VERSION_COHORT != REMOTION_PACKAGES_ONLY
```

## CI change

`Remotion Current Compatibility CI` is upgraded so the ephemeral candidate now:

1. starts from frozen Wedding baseline;
2. installs the five direct Remotion packages at `4.0.517`;
3. installs exact `zod@4.4.3`;
4. asserts every candidate version;
5. runs `remotion versions --log=verbose`;
6. fails if version mismatch / wrong-version output remains;
7. runs TypeScript and canonical contracts;
8. discovers compositions;
9. performs the neutral H.264 render + ffprobe;
10. keeps all package/lock mutation inside the CI runner.

## Production upgrade boundary

This run does **not** modify `motion-studio/package.json` or `pnpm-lock.yaml` in production.

The current source continues to use:

```text
zod = 4.3.6
```

That is intentional until target-Mac Studio Actual is completed.

A future production upgrade PR should be treated as one coherent dependency change and must not update Remotion while silently leaving an acknowledged version mismatch behind.

Potential future production upgrade unit:

```text
Remotion direct family 4.0.517
+ zod 4.4.3
```

`@remotion/studio-protocol` should only be added to production dependencies if Wedding actually adopts a runtime/build-time Element transport implementation; its availability alone is not justification.

## Human editability consequence

The candidate is being evaluated because Studio improvements may reduce manual friction for:

- crop;
- media source replacement;
- Inspector-driven prop editing;
- code-editor handoff;
- Elements/library browsing.

Those are GUI claims and remain target-Mac Actual work.

```text
COHERENT_CI_GREEN != LOCAL_STUDIO_USABLE
```

## Relationship to Mask Reveal Element

Run42 established that `type-mask-reveal` can be transformed from the canonical `TypographyRevealEngine` into a dependency-free standalone Element source, validated by official `createElementPayload()` and rendered successfully.

Still not verified:

```text
Studio confirmation dialog
actual .element.tsx write
actual timeline insertion
actual editability after insertion
save/reload/restart
clean-project re-import/reinstall
preview-vs-installed visual parity
```

Therefore:

```text
ELEMENT_PAYLOAD_VALID != ELEMENT_INSTALL_VERIFIED
```

The next local-only canary should test the Mask Reveal Element in a clean disposable Remotion project/worktree without third-party Elements or private Wedding assets.

## Codex / Claude boundary

The following remaining work requires a local agent or human with access to the target Mac GUI:

- Remotion Studio 4.0.517 launch and interaction;
- native crop control Actual;
- media source replacement Actual;
- Elements/library UI Actual;
- Mask Reveal Element confirmation/install/readback;
- save/reload/restart behavior.

GitHub-only research should not fabricate these results.

## Current trust state

```text
Remotion 4.0.517 functional CI compatibility       PASS
Remotion 4.0.517 + zod 4.4.3 version coherence   PASS
Mask Reveal official payload validation           PASS
Mask Reveal standalone render                     PASS
Local Remotion Studio Actual                      NOT_RUN
Mask Reveal Studio install Actual                 NOT_RUN
Production dependency upgrade                     NOT_PERFORMED
```

## Saturation

`NO_CHANGE` is false.

Run43 corrected an important hidden assumption from Run40: matching only the `@remotion/*`/`remotion` versions is not enough to establish a coherent current toolchain. The compatibility gate now includes the exact zod coordinate required by the current Remotion CLI and will fail closed if the mismatch reappears.
