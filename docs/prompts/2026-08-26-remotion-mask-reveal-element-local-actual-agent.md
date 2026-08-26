# Mask Reveal Remotion Element — Local Studio Actual prompt for Codex / Claude Code

Date: 2026-08-26  
Target: Mac / Remotion Studio `4.0.517`  
Candidate zod: `4.4.3`  
Purpose: prove real install + human adjustability without touching production dependencies

## Mission

Run the first real Studio Protocol Actual for Motion Zukan `type-mask-reveal`.

The repository already proves in CI that the Element source is:

- derived from the canonical `TypographyRevealEngine`;
- free of private/project-relative imports;
- dependency-free at Element payload level;
- accepted by official `createElementPayload()`;
- renderable as standalone source on Remotion `4.0.517` + zod `4.4.3`;
- statically structured with official `Interactive.withSchema()` controls.

This Actual must answer what CI cannot:

```text
Can a human install it into a writable Studio composition,
see understandable controls,
change them,
and get persistent editable source/timeline state?
```

## Hard boundaries

- Do **not** touch, rebase, clean, stage or commit PR #385 / TimingMaster / audio-analysis work.
- Do **not** use another agent's dirty worktree.
- Do **not** edit `main` directly.
- Do **not** convert the production `package.json` / `pnpm-lock.yaml` to 4.0.517 in this run.
- Do **not** install any third-party Element.
- Do **not** use private Wedding photos or private asset URLs in the sandbox.
- Do **not** claim install success from `awaiting-confirmation` alone.
- Do **not** claim controls work merely because `Interactive.withSchema()` appears in source.
- Do **not** add a fake color control. The canonical engine currently hardcodes white text.
- Do **not** add an Element-only exit fade merely to satisfy a guideline; record the gap.

Guardrails:

```text
INSTALL_REQUEST_AWAITING_CONFIRMATION != INSTALL_CONFIRMED
ELEMENT_FILE_WRITTEN != TIMELINE_INSERTION_VERIFIED
INTERACTIVE_SCHEMA_PRESENT != STUDIO_CONTROL_READBACK_VERIFIED
STUDIO_CONTROL_VISIBLE != CONTROL_MUTATION_PERSISTED
LOCAL_ACTUAL_PASS != PRODUCTION_DEPENDENCY_UPGRADE
```

## 1. Protect concurrent work

From the normal repository root:

```bash
git status --short
git branch --show-current
git worktree list
```

Leave every dirty/foreign worktree untouched.

Create a disposable worktree from current remote main:

```bash
git fetch origin main
git worktree add ../wedding-mask-element-actual \
  -b local/mask-reveal-element-actual \
  origin/main
cd ../wedding-mask-element-actual
```

Record:

```bash
git rev-parse HEAD
git status --short
```

Expected: clean.

## 2. Prepare coherent Motion Studio candidate

```bash
cd motion-studio
pnpm install --frozen-lockfile
pnpm typecheck
```

Record baseline versions:

```bash
pnpm exec remotion --version
node -p "require('./node_modules/zod/package.json').version"
```

Expected baseline:

```text
Remotion lock = 4.0.475
zod          = 4.3.6
```

Now temporarily install the coherent candidate in this disposable worktree:

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

Run:

```bash
pnpm exec remotion versions --log=verbose 2>&1 | tee /tmp/mask-element-remotion-versions.txt
pnpm typecheck
```

If there is an unexplained version mismatch, stop and report `VERSION_COHERENCE_MISMATCH`.

## 3. Generate and validate the current Element payload

Still inside `motion-studio`:

```bash
rm -rf out/research/remotion-elements/mask-reveal
node --no-warnings scripts/build-mask-reveal-element-payload.mts
node --no-warnings scripts/check-mask-reveal-element-payload.mts
```

Record from `manifest.json`:

```text
canonicalBlockSha256
elementSourceSha256
sourceStrategy
studioInteractivity.mechanism
actualStudioControlReadback
actualStudioInstallState
```

Expected before Actual:

```text
sourceStrategy = DERIVED_FROM_CANONICAL_ENGINE_PLUS_INTERACTIVE_WRAPPER
mechanism = Interactive.withSchema()
actualStudioControlReadback = NOT_RUN
actualStudioInstallState = NOT_RUN
```

Do not manually edit the generated Element source before the first install attempt.

## 4. Create a neutral writable Studio sandbox

Do not start by installing into a real Wedding composition.

Create a scratch source context under ignored output:

```bash
mkdir -p out/research/remotion-elements/mask-reveal/studio-sandbox/src
```

Create:

`out/research/remotion-elements/mask-reveal/studio-sandbox/src/Root.tsx`

```tsx
import {AbsoluteFill, Composition} from 'remotion';

const ElementInstallSandbox = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#20242b',
      }}
    />
  );
};

export const Root = () => {
  return (
    <Composition
      id="ElementInstallSandbox"
      component={ElementInstallSandbox}
      width={1280}
      height={720}
      fps={30}
      durationInFrames={180}
    />
  );
};
```

Create:

`out/research/remotion-elements/mask-reveal/studio-sandbox/src/index.ts`

```ts
import {registerRoot} from 'remotion';
import {Root} from './Root';

registerRoot(Root);
```

Start Studio on an available port in the Studio Protocol discovery range, for example:

```bash
pnpm exec remotion studio \
  out/research/remotion-elements/mask-reveal/studio-sandbox/src/index.ts \
  --port=3001
```

If `--port=3001` is unavailable or rejected, use another free port from `3000` through `3009` and record it.

In Studio:

1. open `ElementInstallSandbox`;
2. click/focus the Canvas/timeline so this is the most recently focused writable target;
3. confirm the neutral background is visible.

Do not proceed if no writable composition is focused.

## 5. Build a disposable browser install harness using existing Vite

`installInStudio()` must run in a supported browser origin. Official 4.0.517 accepts HTTPS, or HTTP only on `localhost` / `127.0.0.1`.

Do **not** attempt to call it from Node and then misclassify `unsupported-origin` as a Studio failure.

Open another terminal in the same disposable worktree:

```bash
cd movie-dashboard
pnpm install --frozen-lockfile
pnpm add --save-exact @remotion/studio-protocol@4.0.517
mkdir -p remotion-element-actual-harness
```

Copy the generated payload from Motion Studio into the disposable harness:

```bash
cp ../motion-studio/out/research/remotion-elements/mask-reveal/mask-reveal.element-payload.json \
  remotion-element-actual-harness/payload.json
```

Create `remotion-element-actual-harness/index.html`:

```html
<!doctype html>
<html>
  <head><meta charset="UTF-8" /><title>Mask Reveal Element Actual</title></head>
  <body>
    <button id="install">Install Mask Reveal in Studio</button>
    <pre id="result"></pre>
    <script type="module" src="/main.ts"></script>
  </body>
</html>
```

Create `remotion-element-actual-harness/main.ts`:

```ts
import {installInStudio, type StudioElementPayload} from '@remotion/studio-protocol';
import payloadJson from './payload.json';

const button = document.querySelector<HTMLButtonElement>('#install');
const result = document.querySelector<HTMLPreElement>('#result');

if (!button || !result) {
  throw new Error('Harness DOM missing');
}

button.addEventListener('click', async () => {
  result.textContent = 'sending...';
  const response = await installInStudio({
    payload: payloadJson as StudioElementPayload,
  });
  result.textContent = JSON.stringify(response, null, 2);
});
```

Run the harness:

```bash
pnpm exec vite remotion-element-actual-harness \
  --host 127.0.0.1 \
  --port 5174
```

Open the localhost URL in the browser.

## 6. Send the install request and distinguish every state

Before clicking Install, refocus `ElementInstallSandbox` in Remotion Studio.

Click:

```text
Install Mask Reveal in Studio
```

Record the exact response.

A successful transport should resemble:

```text
success = true
status = awaiting-confirmation
studioVersion = 4.0.517
compositionId = ElementInstallSandbox
```

If request fails, use the official error code directly:

```text
unsupported-origin
no-compatible-studio
studio-upgrade-required
no-installable-target
unsupported-protocol
invalid-response
target-expired
request-rejected
request-timed-out
network-error
```

Do not rename these into vague categories.

If the result is `awaiting-confirmation`, mark only:

```text
REQUEST_DELIVERED = PASS
```

Do **not** yet mark install PASS.

## 7. Inspect and approve the Studio confirmation

In Studio, inspect the confirmation dialog before approving.

Verify:

```text
display name = Wedding Mask Reveal
destination = expected sandbox project/composition
source contains WeddingMaskRevealElement
dependencies = none
no private URL/path/token appears
```

If any unexpected dependency or private information appears, decline and record `CONFIRMATION_CONTENT_MISMATCH`.

If correct, explicitly approve the install.

Now record:

```text
CONFIRMATION_APPROVED = PASS
```

## 8. Prove source write and timeline insertion

After approval, from the Motion Studio terminal/worktree inspect:

```bash
git status --short
find out/research/remotion-elements/mask-reveal/studio-sandbox -name '*.element.tsx' -o -name '*.tsx'
```

Identify the actual generated `.element.tsx` path rather than guessing it.

Read the generated source and confirm:

- exactly one exported `WeddingMaskRevealElement` remains;
- no private relative import appeared;
- `Interactive.withSchema()` remains present;
- source hash can be computed;
- installation did not silently add unexpected npm dependencies.

Then in Studio verify:

- Mask Reveal is visible on Canvas;
- an inserted item exists in the timeline;
- the internal item named `Mask Reveal` or `<WeddingMaskReveal>` can be selected.

Record separately:

```text
ELEMENT_SOURCE_WRITTEN
TIMELINE_INSERTED
CANVAS_VISIBLE
INTERACTIVE_ITEM_SELECTABLE
```

## 9. Human-adjustability Actual

This is the main Run44 gate.

### A. 表示テキスト

Select the interactive Mask Reveal item.

Verify a control labeled:

```text
表示テキスト
```

Change:

```text
WELCOME
```

to:

```text
OUR JOURNEY
```

Verify Canvas updates.

Then inspect the source diff/readback and confirm the saved value corresponds to the Studio edit.

Record:

```text
TEXT_CONTROL_VISIBLE
TEXT_CONTROL_CANVAS_UPDATE
TEXT_CONTROL_SOURCE_READBACK
```

### B. 動きの強さ

Verify a control labeled approximately:

```text
動きの強さ (S=やさしい / M=標準 / L=強い)
```

Change `M → L`, scrub through the entrance, and confirm the motion is visibly stronger while remaining stable.

Then restore `M` and verify the readback.

Record:

```text
INTENSITY_CONTROL_VISIBLE
INTENSITY_CHANGE_VISIBLE
INTENSITY_RESTORE_READBACK
```

### C. Whole-element transform

Verify the official transform controls are available for the interactive layer:

```text
translate
scale
rotate
opacity
```

Make a clearly visible temporary adjustment to each one at a time.

For each control:

1. change value;
2. verify Canvas live update;
3. undo;
4. redo;
5. restore initial value.

Initial intended values:

```text
translate = 0px 0px
scale     = 1
rotate    = 0deg
opacity   = 1
```

Record each separately. Do not collapse them into one PASS.

### D. Confirm intentionally absent controls

Verify Run44 does **not** falsely show:

```text
Mask Reveal color control
transparent technical toggle
```

The absence of these is expected in this canary.

Color remains a future canonical-engine capability question.

## 10. Save / reload / restart persistence

After setting text to a harmless final test value such as `OUR JOURNEY`:

1. inspect tracked/sandbox source readback;
2. reload the Studio browser page;
3. confirm Element remains present and editable;
4. stop Studio;
5. restart the same Studio command;
6. reopen `ElementInstallSandbox`;
7. verify Element source and timeline state are still valid;
8. verify controls can still be selected.

Record:

```text
RELOAD_PERSISTENCE
RESTART_PERSISTENCE
POST_RESTART_CONTROL_SELECTABILITY
```

If timeline insertion is source-backed differently than expected, document actual behavior rather than forcing the expected model.

## 11. Post-install render

Render the sandbox after installation using the same candidate toolchain.

First identify the actual sandbox entry/composition after Studio source edits, then run the appropriate equivalent of:

```bash
pnpm exec remotion render \
  out/research/remotion-elements/mask-reveal/studio-sandbox/src/index.ts \
  ElementInstallSandbox \
  out/research/remotion-elements/mask-reveal/studio-sandbox/post-install.mp4 \
  --scale=0.5 \
  --crf=24
```

Verify output exists and hash it:

```bash
shasum -a 256 out/research/remotion-elements/mask-reveal/studio-sandbox/post-install.mp4
```

Use ffprobe if available to record codec/dimensions/duration.

Record:

```text
POST_INSTALL_RENDER = PASS|FAIL
```

Render success is still not a substitute for control readback.

## 12. Exit-animation review — do not silently fix

Current Mask Reveal is entrance-focused. Official Element Guidelines say temporary overlays should generally animate both in and out.

During Actual, observe whether the 120-frame Element feels wrong because it has no default exit.

Classify:

```text
EXIT_ANIMATION_REVIEW =
  ACCEPTABLE_AS_EXTERNALLY_TIMED_TITLE_TREATMENT
  | NEEDS_CANONICAL_EXIT_CAPABILITY
  | NEEDS_MORE_HUMAN_REVIEW
```

Do not add an Element-only fade in this run.

## 13. Evidence report

Write raw evidence under ignored output, for example:

```text
motion-studio/out/research/remotion-elements/mask-reveal/studio-actual-report.json
```

Suggested shape:

```json
{
  "gitMainSha": "...",
  "candidate": {
    "remotion": "4.0.517",
    "zod": "4.4.3",
    "studioProtocol": "4.0.517",
    "versionCoherence": "PASS|FAIL"
  },
  "transport": {
    "requestDelivered": "PASS|FAIL",
    "resultCodeOrStatus": "...",
    "targetComposition": "ElementInstallSandbox",
    "studioVersion": "4.0.517"
  },
  "install": {
    "confirmationContent": "PASS|FAIL",
    "confirmationApproved": "PASS|FAIL",
    "elementSourceWritten": "PASS|FAIL",
    "timelineInserted": "PASS|FAIL",
    "canvasVisible": "PASS|FAIL"
  },
  "humanAdjustability": {
    "textControlVisible": "PASS|FAIL",
    "textMutationCanvas": "PASS|FAIL",
    "textSourceReadback": "PASS|FAIL",
    "intensityControlVisible": "PASS|FAIL",
    "intensityMutationVisible": "PASS|FAIL",
    "translate": "PASS|FAIL",
    "scale": "PASS|FAIL",
    "rotate": "PASS|FAIL",
    "opacity": "PASS|FAIL",
    "unexpectedFakeColorControl": false,
    "unexpectedTransparentControl": false
  },
  "persistence": {
    "reload": "PASS|FAIL",
    "restart": "PASS|FAIL"
  },
  "postInstallRender": {
    "result": "PASS|FAIL",
    "sha256": "..."
  },
  "exitAnimationReview": "ACCEPTABLE_AS_EXTERNALLY_TIMED_TITLE_TREATMENT|NEEDS_CANONICAL_EXIT_CAPABILITY|NEEDS_MORE_HUMAN_REVIEW",
  "productionElementRecommendation": "GO|NO_GO|NEEDS_MORE_EVIDENCE",
  "productionDependencyUpgradePerformed": false,
  "thirdPartyElementInstallPerformed": false,
  "pr385Touched": false
}
```

Do not include personal paths or private asset names in committed summaries.

## 14. Promotion rule

`GO` for the Element itself requires at least:

```text
REQUEST_DELIVERED = PASS
CONFIRMATION_APPROVED = PASS
ELEMENT_SOURCE_WRITTEN = PASS
TIMELINE_INSERTED = PASS
CANVAS_VISIBLE = PASS
TEXT_CONTROL_VISIBLE = PASS
TEXT_CONTROL_CANVAS_UPDATE = PASS
TEXT_CONTROL_SOURCE_READBACK = PASS
INTENSITY_CONTROL_VISIBLE = PASS
INTENSITY_CHANGE_VISIBLE = PASS
translate/scale/rotate/opacity = PASS
RELOAD_PERSISTENCE = PASS
RESTART_PERSISTENCE = PASS
POST_INSTALL_RENDER = PASS
```

Even then, preserve the separate exit-animation review result.

If controls are hard to understand or too many clicks are required, do not mark the UX as successful merely because the API technically worked.

## 15. Return to the user

Report:

1. exact git SHA;
2. exact Remotion/zod/Studio Protocol versions;
3. install request result;
4. confirmation result;
5. actual `.element.tsx` write result;
6. timeline/canvas result;
7. Japanese control visibility/readback;
8. transform control results;
9. reload/restart result;
10. post-install render hash;
11. exit-animation review;
12. `GO|NO_GO|NEEDS_MORE_EVIDENCE`;
13. whether any production dependency/source was changed;
14. confirmation that PR #385 was untouched.

If GUI automation is unavailable, do not fabricate completion. Mark the exact remaining steps as local human/Codex/Claude-required.
