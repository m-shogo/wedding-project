# Run 04 verification note

- Research/decision changes are Movie-only.
- Accidental `docs/research/README.tmp` was removed before PR creation.
- The Remotion policy verifier is deliberately not wired into the production `pnpm check` yet because current `package.json` uses `^4.0.0` while the committed lockfile resolves 4.0.475. The verifier records and checks that current coherent state; the exact-pin migration must update manifest and lockfile atomically in its own runtime canary.
- No Resolve runtime execution occurred in this GitHub-only run; `.drfx`, selected-clip scripting, audio write, and Lottie internal editability remain PENDING_RUNTIME.
