import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {
  remotionCurrentFeatureDelta,
  remotionCurrentReleaseCoordinate,
  remotionLicenseCoordinate,
  remotionStudioProtocolBoundary,
  remotionWeddingCompatibilityPolicy,
} from '../src/data/remotionCurrentCompatibility.ts';

let errors = 0;
const err = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {dependencies?: Record<string, string>};
const lock = readFileSync(join(root, 'pnpm-lock.yaml'), 'utf8');

const remotionPackages = ['remotion', '@remotion/cli', '@remotion/google-fonts', '@remotion/paths', '@remotion/zod-types'];
for (const pkg of remotionPackages) {
  if (packageJson.dependencies?.[pkg] !== '^4.0.0') err(`${pkg} package.json range changed unexpectedly: ${packageJson.dependencies?.[pkg]}`);
}

const expectedLocked = remotionCurrentReleaseCoordinate.repoLockedVersion;
for (const pkg of remotionPackages) {
  const escaped = pkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`['\"]?${escaped}['\"]?:[\\s\\S]{0,180}?version: ${expectedLocked.replaceAll('.', '\\.')}`);
  if (!pattern.test(lock)) err(`pnpm lock does not show ${pkg} at expected baseline ${expectedLocked}`);
}

if (remotionCurrentReleaseCoordinate.currentReleaseVersion !== '4.0.517') err('current Remotion release coordinate drifted');
const currentPatch = Number(remotionCurrentReleaseCoordinate.currentReleaseVersion.split('.')[2]);
const lockedPatch = Number(remotionCurrentReleaseCoordinate.repoLockedVersion.split('.')[2]);
if (currentPatch - lockedPatch !== 42) err(`expected 42 patch releases of coordinate distance, got ${currentPatch - lockedPatch}`);
if (remotionWeddingCompatibilityPolicy.latestCompatibilityState !== 'PENDING_EPHEMERAL_CI') err('compatibility state must remain pending before current-version canary runs');
if (remotionWeddingCompatibilityPolicy.productionDependencyUpgradeState !== 'NOT_REQUESTED_YET') err('production lock upgrade must remain separate from compatibility canary');
if (!remotionLicenseCoordinate.v5ChangeAnnounced) err('v5 license revalidation boundary disappeared');

const feature = (id: string) => remotionCurrentFeatureDelta.find((item) => item.id === id);
for (const id of ['studio-crop', 'studio-code-editor-integration', 'studio-3d-transform-controls', 'zod-description-tooltips', 'agent-skills-and-context', 'elements-studio-protocol', 'studio-library-browser', 'renderer-fast-start', 'gsap-package']) {
  if (!feature(id)) err(`missing current feature delta: ${id}`);
}
const editor = feature('studio-code-editor-integration');
if (!editor || !('correction' in editor) || !String(editor.correction).includes('not custom Inspector property widgets')) {
  err('custom editor ambiguity correction is missing');
}
const gsap = feature('gsap-package');
if (!gsap || gsap.adoption !== 'DO_NOT_ADD_BY_DEFAULT') err('@remotion/gsap must not become a default dependency merely because it is new');

for (const expected of [
  'Studio writes installed source to an .element.tsx file.',
  'Only dependencies declared by the Element payload are installed.',
  'The same component implementation can back Player preview and installed Element source.',
  'installInStudio() and drag delivery require confirmation in Studio.',
]) {
  if (!remotionStudioProtocolBoundary.officialBehavior.includes(expected)) err(`Studio Protocol boundary missing: ${expected}`);
}

for (const guardrail of [
  'LATEST_RELEASE_AVAILABLE != WEDDING_REPO_COMPATIBLE',
  'EPHEMERAL_CI_GREEN != PRODUCTION_LOCKFILE_UPGRADED',
  'STUDIO_INTERACTIVE != SOURCE_OF_TRUTH_MOVED_OUT_OF_CODE',
  'ELEMENT_SOURCE_PUBLIC != SAFE_FOR_SECRETS_OR_PRIVATE_ASSET_URLS',
  'CUSTOM_EDITOR_FEATURE_NAME != CUSTOM_INSPECTOR_VALUE_EDITOR',
  'REMOTION_V4_LICENSE != REMOTION_V5_LICENSE',
]) {
  if (!remotionWeddingCompatibilityPolicy.rules.includes(guardrail)) err(`missing compatibility guardrail: ${guardrail}`);
}

if (errors > 0) {
  console.error(`Remotion current compatibility contract FAILED (${errors})`);
  process.exit(1);
}

console.log('✅ Remotion current compatibility contract preserves locked-vs-latest, Studio Protocol, security and v5 revalidation boundaries.');
console.log(`locked=${remotionCurrentReleaseCoordinate.repoLockedVersion}`);
console.log(`current=${remotionCurrentReleaseCoordinate.currentReleaseVersion}`);
console.log(`patchDistance=${currentPatch - lockedPatch}`);
console.log('productionUpgradePerformed=NO');
