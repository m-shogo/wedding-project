# Remotion 4.0.517 Studio Local Actual — Codex / Claude Code execution prompt

Use this prompt on the target Mac only. This is a **local Actual verification**, not a production dependency upgrade.

## Mission

Verify that Wedding Motion Studio is not only CI-compatible but genuinely usable in the real Remotion Studio GUI with the current coherent candidate cohort:

```text
remotion                  4.0.517
@remotion/cli             4.0.517
@remotion/google-fonts    4.0.517
@remotion/paths           4.0.517
@remotion/zod-types       4.0.517
zod                       4.4.3
```

Why `zod 4.4.3` is mandatory for this Actual:

- the production repo currently uses exact `zod 4.3.6`;
- Run42 proved a Remotion 4.0.517 render can succeed while still warning that `zod 4.3.6` is mismatched;
- a second Canary with exact `zod 4.4.3` passed `remotion versions --log=verbose`, TypeScript, official Element payload validation and render;
- therefore the target-Mac Actual must test the **coherent cohort**, not a warning-bearing partial upgrade.

Guardrail:

```text
RENDER_SUCCESS_WITH_VERSION_WARNING != VERSION_COHERENT
```

## Hard boundaries

- Do **not** touch, rebase, clean, stage or commit PR #385 / TimingMaster / audio-analysis work.
- Do **not** work in another agent's dirty worktree.
- Do **not** change `main` directly.
- Do **not** commit a production `package.json` / `pnpm-lock.yaml` upgrade in this run.
- Do **not** install random third-party Elements or npm packages.
- Do **not** expose private Wedding photos, private asset URLs, tokens, API keys, paid-template source or personal filesystem paths in committed evidence.
- Do **not** claim Studio Actual PASS from screenshots alone. Perform the interaction and record readback.
- Do **not** undo the null-safe Run40 path-sampling repair with non-null assertions.

State boundaries:

```text
COHERENT_CI_GREEN != LOCAL_STUDIO_USABLE
STUDIO_LAUNCHES != HUMAN_EDITABILITY_VERIFIED
ELEMENT_LIBRARY_VISIBLE != ELEMENT_INSTALL_VERIFIED
LOCAL_ACTUAL_GO != PRODUCTION_LOCK_UPGRADED
```

## 1. Protect concurrent work

From the normal repo root:

```bash
git status --short
git branch --show-current
git worktree list
```

If the current worktree is dirty or belongs to another task, leave it untouched.

Create a disposable worktree from the latest remote main:

```bash
git fetch origin main
git worktree add ../wedding-remotion-actual -b local/remotion-4.0.517-studio-actual origin/main
cd ../wedding-remotion-actual
```

Record:

```bash
git rev-parse HEAD
git status --short
```

Expected: clean worktree.

## 2. Baseline verification

```bash
cd motion-studio
pnpm install --frozen-lockfile
pnpm exec remotion --version
node -p "require('./node_modules/zod/package.json').version"
pnpm typecheck
```

Expected baseline coordinate before temporary candidate install:

```text
Remotion lock: 4.0.475
zod:          4.3.6
```

Do not continue if the baseline itself is broken.

## 3. Install the coherent candidate in this disposable worktree only

Save baseline identity first:

```bash
shasum -a 256 package.json pnpm-lock.yaml
cp package.json /tmp/wedding-remotion-package-baseline.json
cp pnpm-lock.yaml /tmp/wedding-remotion-lock-baseline.yaml
```

Install the coherent candidate:

```bash
pnpm add --save-exact \
  remotion@4.0.517 \
  @remotion/cli@4.0.517 \
  @remotion/google-fonts@4.0.517 \
  @remotion/paths@4.0.517 \
  @remotion/zod-types@4.0.517 \
  zod@4.4.3
```

Assert exact versions:

```bash
node <<'NODE'
const remotionVersion = '4.0.517';
for (const pkg of [
  'remotion',
  '@remotion/cli',
  '@remotion/google-fonts',
  '@remotion/paths',
  '@remotion/zod-types',
]) {
  const actual = require(`./node_modules/${pkg}/package.json`).version;
  console.log(`${pkg}=${actual}`);
  if (actual !== remotionVersion) process.exitCode = 1;
}
const zod = require('./node_modules/zod/package.json').version;
console.log(`zod=${zod}`);
if (zod !== '4.4.3') process.exitCode = 1;
NODE
```

Now run the coherence gate:

```bash
pnpm exec remotion versions --log=verbose 2>&1 | tee /tmp/wedding-remotion-versions.txt
```

FAIL this Actual immediately if the output contains an unexplained version mismatch / wrong-version warning.

Then run:

```bash
pnpm typecheck
pnpm check:motion
pnpm check:assets
pnpm check:parts
pnpm check:presets
pnpm check:director-recipes
```

Do not silently patch around failures before recording the exact failure fingerprint.

## 4. Launch Studio

Start the normal Studio:

```bash
pnpm dev
```

Record only non-private environment coordinates:

```text
candidate Remotion version
candidate zod version
macOS version
uname -m
node -v
pnpm -v
browser if relevant
```

Do not commit username/home-directory paths.

## 5. Core Studio Actual checks

Use neutral or synthetic compositions whenever possible.

Record every check as:

```text
PASS | FAIL | BLOCKED | NOT_APPLICABLE
```

### A. Launch / composition / Canvas / Timeline

Verify all of these by actual interaction:

1. Studio opens without fatal error.
2. Composition list appears.
3. A neutral composition opens.
4. A representative Wedding composition opens.
5. Canvas renders.
6. Timeline renders.
7. Scrubbing changes the preview.
8. Play/pause works.
9. Selecting an editable item updates the relevant Inspector/editor surface.

### B. Run40 path-sampling regression

Open a composition that exercises the paper-plane route / Stamp Rush route.

Verify:

- no runtime exception from `getPointAtLength()` / `getTangentAtLength()`;
- the plane appears on a valid route;
- scrubbing at the beginning, middle and end remains stable;
- route scene remains visually plausible.

If this fails, classify:

```text
PATH_SAMPLING_RUNTIME_REGRESSION
```

Do not reintroduce non-null assertions as a quick fix.

### C. Native crop control

On an item where the current Studio exposes crop controls:

1. locate crop controls;
2. make a clearly visible temporary crop change;
3. verify Canvas live update;
4. undo;
5. redo;
6. restore original state.

Record:

```text
cropControlVisible
canvasLiveUpdate
undoWorks
redoWorks
returnedToOriginal
```

If the control is unavailable because of current component structure, use:

```text
BLOCKED_BY_COMPONENT_STRUCTURE
```

Do not manufacture a new component solely to make this test pass.

### D. Media source replacement

Using a safe local neutral asset:

1. locate native source replacement if exposed;
2. replace a source temporarily;
3. verify Canvas changes;
4. restore the original source.

Record:

```text
sourceReplacementVisible
replacementApplied
canvasUpdated
originalRestored
```

### E. Inspector / human adjustability

For at least one prop-driven composition:

- edit a safe string, number or boolean;
- verify Canvas changes;
- restore original value;
- judge whether the label is understandable without opening source.

If a current schema already uses zod `.describe()`, verify its tooltip/help behavior. If none does, record:

```text
NOT_APPLICABLE_CURRENT_SCHEMA
```

Do not add a fake `.describe()` field just to produce a PASS.

### F. Code-editor handoff

Observe/test the current `Open in editor` behavior if available.

Record:

```text
openInEditorVisible
editorDetected
sourceLocationOpened
```

Remember: this is external code-editor integration, not arbitrary custom Inspector widgets.

### G. Elements/library surface

Observe whether the current Studio exposes Elements/library browsing.

Do **not** install arbitrary third-party Elements in this run.

Record:

```text
elementLibrarySurfaceVisible
externalLibraryConfigSurfaceVisibleOrNotObserved
thirdPartyInstallPerformed=false
```

The Wedding Mask Reveal clean-install Actual is a **separate canary**. Visibility alone is not install verification.

### H. Save / reload / restart

Make one harmless temporary Studio edit in the disposable worktree and then:

1. inspect tracked diff;
2. reload browser;
3. verify expected behavior;
4. stop Studio;
5. restart Studio;
6. reopen the same composition;
7. verify no corruption/fatal error;
8. restore the temporary edit before final cleanup unless preserving it is necessary for evidence.

Record exactly which tracked file changed, if any.

## 6. Post-GUI neutral render

After GUI interaction:

```bash
rm -f out/common/stamp_test_preview.mp4
pnpm render:stamp-test:preview
ffprobe -v error \
  -show_entries stream=codec_name,width,height,r_frame_rate \
  -show_entries format=duration \
  -of json \
  out/common/stamp_test_preview.mp4
shasum -a 256 out/common/stamp_test_preview.mp4
```

Expected core readback:

```text
codec_name = h264
width      = 1920
height     = 1080
```

This proves post-GUI render health, not visual parity.

## 7. Evidence report

Write raw local evidence under ignored output, for example:

```text
motion-studio/out/research/remotion-4.0.517-studio-actual/report.json
```

Minimum shape:

```json
{
  "candidate": {
    "remotion": "4.0.517",
    "zod": "4.4.3",
    "versionCoherence": "PASS|FAIL"
  },
  "baseline": {
    "remotion": "4.0.475",
    "zod": "4.3.6"
  },
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
  "failures": [],
  "render": {
    "sha256": "...",
    "codec": "h264",
    "width": 1920,
    "height": 1080
  },
  "productionUpgradeRecommendation": "GO|NO_GO|NEEDS_MORE_EVIDENCE"
}
```

Do not put private filenames or personal paths in the committed summary.

## 8. Promotion rule

`GO` requires all of these:

- exact Remotion family = `4.0.517`;
- exact zod = `4.4.3`;
- `remotion versions --log=verbose` has no unexplained mismatch;
- baseline/candidate checks pass;
- Studio launches on target Mac;
- representative compositions render/scrub;
- path-sampling regression is clean;
- crop behavior is actually usable or its applicability is honestly classified;
- no critical source-replacement regression;
- save/reload/restart stable;
- post-GUI render succeeds;
- no unexplained tracked-source mutation.

`GO` means only:

> Open a separate bounded production dependency-upgrade PR for the coherent candidate cohort.

It does **not** authorize changing main in this run.

## 9. Failure fingerprints

Use specific classifications where possible:

```text
VERSION_IDENTITY_MISMATCH
VERSION_COHERENCE_MISMATCH
STUDIO_LAUNCH_FAILURE
CANVAS_RUNTIME_FAILURE
TIMELINE_INTERACTION_FAILURE
PATH_SAMPLING_RUNTIME_REGRESSION
CROP_CONTROL_UNAVAILABLE_OR_BROKEN
MEDIA_SOURCE_REPLACEMENT_UNAVAILABLE_OR_BROKEN
COMPONENT_STRUCTURE_BLOCKS_NATIVE_EDITABILITY
SAVE_RELOAD_PERSISTENCE_FAILURE
POST_GUI_RENDER_FAILURE
```

Record reproduction before changing code.

## 10. Return to the user

Return:

1. exact git SHA tested;
2. exact Remotion + zod versions;
3. `remotion versions` coherence result;
4. non-private environment coordinate;
5. PASS/FAIL/BLOCKED table;
6. failure reproduction steps;
7. render hash/readback;
8. `GO|NO_GO|NEEDS_MORE_EVIDENCE`;
9. tracked-source mutation yes/no;
10. confirmation that PR #385 / TimingMaster was untouched.

If `GO`, stop. Do not perform the production lock upgrade unless separately instructed.
