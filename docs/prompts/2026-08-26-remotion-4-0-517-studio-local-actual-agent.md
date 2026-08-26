# Remotion 4.0.517 Studio Local Actual — Codex / Claude Code execution prompt

Use this prompt on the target Mac only. This is a **local Actual verification**, not a production dependency upgrade.

## Mission

Verify that Wedding Motion Studio is not only CI-compatible with Remotion `4.0.517`, but also usable in the real Remotion Studio GUI for the editing tasks that justify upgrading.

The existing repo baseline remains `4.0.475`. Run40 already proved, in GitHub Actions, that an ephemeral `4.0.517` install passes TypeScript, canonical contracts, composition discovery and a neutral H.264 render after null-safe path sampling fixes.

This run must answer the remaining question:

```text
Does Remotion Studio 4.0.517 actually feel and behave correctly on the target Mac for Wedding editing?
```

## Hard boundaries

- Do **not** touch or rebase PR #385 / TimingMaster / audio-analysis work.
- Do **not** work in another agent's dirty worktree.
- Do **not** change `main` directly.
- Do **not** commit a production `package.json` / `pnpm-lock.yaml` upgrade merely because the GUI launches.
- Do **not** install random third-party Elements or npm packages.
- Do **not** expose private Wedding assets, private URLs, tokens, API keys, paid-template source or personal paths in committed evidence.
- Do **not** claim `Studio Actual PASS` from screenshots alone. Perform the actions and record readback.
- Do **not** use non-null assertions to undo the Run40 path-sampling safety fix.

Guardrails:

```text
CI_RENDER_GREEN != LOCAL_STUDIO_INTERACTION_VERIFIED
STUDIO_LAUNCHES != HUMAN_EDITABILITY_VERIFIED
ELEMENT_LIBRARY_VISIBLE != ELEMENT_INSTALL_VERIFIED
TEMPORARY_4_0_517_WORKTREE != PRODUCTION_LOCKFILE_UPGRADE
```

## 1. Protect concurrent work

From the repo root:

```bash
git status --short
git branch --show-current
git worktree list
```

If the current worktree is dirty or belongs to another task, leave it untouched.

Fetch current `main`, then create a disposable local worktree from current main. Use a unique branch name, for example:

```bash
git fetch origin main
git worktree add ../wedding-remotion-actual -b local/remotion-4.0.517-studio-actual origin/main
cd ../wedding-remotion-actual
```

Before continuing, record:

```bash
git rev-parse HEAD
git status --short
```

Expected: clean worktree.

## 2. Verify the baseline first

```bash
cd motion-studio
pnpm install --frozen-lockfile
pnpm exec remotion --version
pnpm typecheck
```

Record the resolved baseline Remotion version. It should correspond to the repo lock coordinate (`4.0.475`) before the temporary update.

Do not continue if the baseline itself is broken.

## 3. Temporarily install the candidate in this worktree only

Save baseline hashes first:

```bash
shasum -a 256 package.json pnpm-lock.yaml
cp package.json /tmp/wedding-remotion-package-baseline.json
cp pnpm-lock.yaml /tmp/wedding-remotion-lock-baseline.yaml
```

Then update only the five direct Remotion packages used by this repo:

```bash
pnpm add --save-exact \
  remotion@4.0.517 \
  @remotion/cli@4.0.517 \
  @remotion/google-fonts@4.0.517 \
  @remotion/paths@4.0.517 \
  @remotion/zod-types@4.0.517
```

Verify exact installed versions:

```bash
pnpm exec remotion --version
node <<'NODE'
const expected = '4.0.517';
for (const pkg of ['remotion','@remotion/cli','@remotion/google-fonts','@remotion/paths','@remotion/zod-types']) {
  const actual = require(`./node_modules/${pkg}/package.json`).version;
  console.log(`${pkg}=${actual}`);
  if (actual !== expected) process.exitCode = 1;
}
NODE
```

Then re-run:

```bash
pnpm typecheck
pnpm check:motion
pnpm check:assets
pnpm check:parts
pnpm check:presets
pnpm check:director-recipes
```

If these fail, stop GUI testing and record the exact failure. Do not patch around it silently.

## 4. Launch Studio 4.0.517

Start the normal Studio:

```bash
pnpm dev
```

If the command prints a local URL rather than opening automatically, open that URL in the normal browser.

Record:

- Remotion version shown/confirmed by CLI;
- macOS version;
- CPU architecture (`uname -m`);
- Node version (`node -v`);
- pnpm version (`pnpm -v`);
- browser used for Studio if relevant.

Do not record a machine username or home-directory path in committed evidence.

## 5. Core Studio Actual checks

Use neutral or synthetic compositions wherever possible. Do not publish screenshots containing private Wedding photos.

### A. Studio launch and composition discovery

Verify:

1. Studio opens without a fatal error.
2. Composition list appears.
3. Open at least one neutral composition and one representative Wedding composition.
4. Canvas renders rather than remaining blank/erroring.
5. Timeline appears and scrubbing changes the preview.
6. Play/pause works.
7. Selecting a sequence/item updates the relevant Inspector.

Record each as `PASS`, `FAIL`, or `BLOCKED` with a short observation.

### B. Run40 path-sampling regression

Open a composition that exercises the paper-plane route / Stamp Rush route.

Verify:

- no runtime exception from `getPointAtLength()` / `getTangentAtLength()`;
- the plane appears on a normal valid route;
- scrubbing near the beginning and end does not crash Studio;
- route scene remains visually plausible.

This is required because Run40 changed `PlaneOnRoute.tsx` and `StampRushFullRoute.tsx` to handle nullable path sampling safely.

### C. Crop control — main upgrade value

On an item where Studio exposes crop controls:

1. Locate the native crop controls.
2. Make a clearly visible temporary crop adjustment.
3. Confirm Canvas updates immediately.
4. Undo.
5. Redo.
6. Return to the original value.

Record:

```text
cropControlVisible
canvasLiveUpdate
undoWorks
redoWorks
returnedToOriginal
```

Do not infer success from the release notes. This must be observed in the real Studio.

### D. Media source replacement

On a replaceable media item, using a **safe local test asset**:

1. Locate the native source replacement affordance.
2. Replace the source with a temporary neutral asset.
3. Confirm Canvas updates.
4. Restore the original source before finishing.

Record:

```text
sourceReplacementVisible
replacementApplied
canvasUpdated
originalRestored
```

If the current Wedding component structure does not expose this natively, record `BLOCKED_BY_COMPONENT_STRUCTURE`; do not force a rewrite during this Actual run.

### E. Inspector / Human Master usability

For at least one prop-driven composition:

- edit a safe numeric/string/boolean prop in Studio;
- verify the Canvas reflects it;
- restore the original value;
- note whether the control label is understandable without opening source.

If any existing schema field uses zod `.describe()`, check whether the description appears as a tooltip/help surface. If none currently use `.describe()`, record `NOT_APPLICABLE_CURRENT_SCHEMA` rather than creating one just for this test.

### F. Code-editor handoff

Verify whether `Open in editor` / editor picker is present.

You may test opening a source location if it does not disturb another editor session. Do not change committed editor configuration merely for this test.

Record:

```text
openInEditorVisible
editorDetected
sourceLocationOpened
```

Remember: this feature is external code-editor integration, not a custom Inspector widget system.

### G. Elements / library UI

Verify whether the current Studio exposes the Elements/library browsing surface described by v4.0.517.

Do **not** install arbitrary third-party Elements.

Record only:

```text
elementLibrarySurfaceVisible
externalLibraryConfigSurfaceVisibleOrNotObserved
thirdPartyInstallPerformed=false
```

Visibility is not installation verification.

### H. Save / reload / restart

Make one harmless temporary Studio edit in the disposable worktree, then:

1. reload the browser page;
2. confirm expected state behavior;
3. stop Studio;
4. restart `pnpm dev`;
5. reopen the same composition;
6. verify no corruption/fatal error.

If the edit writes source, inspect the diff and record exactly what changed. Restore the temporary edit before the final evidence snapshot unless preserving it is required to prove the mechanism.

## 6. Render after GUI interaction

Stop Studio if needed and run a neutral render:

```bash
rm -f out/common/stamp_test_preview.mp4
pnpm render:stamp-test:preview
ffprobe -v error \
  -show_entries stream=codec_name,width,height,r_frame_rate \
  -show_entries format=duration \
  -of json \
  out/common/stamp_test_preview.mp4
```

Expected core readback:

```text
codec_name = h264
width = 1920
height = 1080
```

Hash the output:

```bash
shasum -a 256 out/common/stamp_test_preview.mp4
```

This is not visual parity proof; it proves the post-GUI candidate environment still renders a valid neutral output.

## 7. Evidence format

Create a local JSON report first. Suggested path inside the disposable worktree:

```text
motion-studio/out/research/remotion-4.0.517-studio-actual/report.json
```

Suggested shape:

```json
{
  "candidateVersion": "4.0.517",
  "baselineVersion": "4.0.475",
  "gitMainSha": "...",
  "environment": {
    "macOS": "...",
    "arch": "...",
    "node": "...",
    "pnpm": "..."
  },
  "checks": {
    "studioLaunch": "PASS|FAIL|BLOCKED",
    "compositionDiscovery": "PASS|FAIL|BLOCKED",
    "canvasRender": "PASS|FAIL|BLOCKED",
    "timelineScrub": "PASS|FAIL|BLOCKED",
    "pathSamplingRegression": "PASS|FAIL|BLOCKED",
    "cropControl": "PASS|FAIL|BLOCKED",
    "mediaSourceReplacement": "PASS|FAIL|BLOCKED",
    "inspectorPropEdit": "PASS|FAIL|BLOCKED",
    "openInEditor": "PASS|FAIL|BLOCKED",
    "elementLibrarySurface": "PASS|FAIL|BLOCKED",
    "saveReloadRestart": "PASS|FAIL|BLOCKED",
    "neutralRenderAfterGui": "PASS|FAIL|BLOCKED"
  },
  "observations": [],
  "render": {
    "path": "out/common/stamp_test_preview.mp4",
    "sha256": "...",
    "codec": "h264",
    "width": 1920,
    "height": 1080
  },
  "productionUpgradeRecommendation": "GO|NO_GO|NEEDS_MORE_EVIDENCE"
}
```

Do not put personal filesystem paths or private asset names in the committed summary.

## 8. Promotion rule

Recommend a real production dependency upgrade only if all of these are true:

- candidate package identity is exactly `4.0.517`;
- baseline and candidate checks pass;
- Studio launches on the target Mac;
- representative compositions render and scrub correctly;
- Run40 path-sampling regression is clean;
- crop controls work in actual use;
- no critical source-replacement regression is found;
- save/reload/restart is stable;
- post-GUI neutral render succeeds;
- no unexplained source mutation remains.

Elements/library visibility is **not required** to upgrade if core Studio editing is healthy, but Elements must remain `UNVERIFIED` until a separate clean-project install canary is performed.

## 9. What to return

Return a concise result with:

1. exact git SHA tested;
2. exact Remotion versions;
3. environment coordinate without personal paths;
4. PASS/FAIL/BLOCKED table;
5. all failures with reproduction steps;
6. screenshots only if they contain no private Wedding content;
7. render hash/readback;
8. `GO`, `NO_GO`, or `NEEDS_MORE_EVIDENCE` for production lock upgrade;
9. whether Codex/Claude changed any tracked source during the test;
10. confirmation that PR #385 / TimingMaster work was untouched.

If the result is `GO`, stop there. Do not perform the production lock upgrade in the same Actual run unless separately instructed.
