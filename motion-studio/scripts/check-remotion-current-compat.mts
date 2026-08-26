import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {
  remotionCurrentCompatibilityEvidence,
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
if (remotionWeddingCompatibilityPolicy.latestCompatibilityState !== 'EPHEMERAL_CI_GREEN_RUNTIME_STUDIO_QA_REQUIRED') {
  err('compatibility result must preserve CI-green / local-Studio-QA-required boundary');
}
if (remotionWeddingCompatibilityPolicy.productionDependencyUpgradeState !== 'NOT_REQUESTED_YET') err('production lock upgrade must remain separate from compatibility canary');
if (!remotionLicenseCoordinate.v5ChangeAnnounced) err('v5 license revalidation boundary disappeared');

if (remotionCurrentCompatibilityEvidence.candidateVersion !== remotionCurrentReleaseCoordinate.currentReleaseVersion) {
  err('compatibility evidence candidate version does not match current release coordinate');
}
if (remotionCurrentCompatibilityEvidence.baselineVersion !== remotionCurrentReleaseCoordinate.repoLockedVersion) {
  err('compatibility evidence baseline version does not match repo lock coordinate');
}
for (const [name, result] of Object.entries(remotionCurrentCompatibilityEvidence.checks)) {
  if (!String(result).startsWith('PASS')) err(`compatibility evidence is not passing: ${name}=${result}`);
}
const pathFix = remotionCurrentCompatibilityEvidence.discoveredCompatibilityFixes.find(
  (item) => item.fingerprint === 'REMOTION_PATH_SAMPLING_NULLABLE_TYPE',
);
if (!pathFix) err('path-sampling nullable compatibility fingerprint is missing');
if (pathFix?.resolution.includes('non-null assertions') !== true) err('path-sampling fix must explicitly reject non-null-assertion-only repair');
if (remotionCurrentCompatibilityEvidence.remainingBeforeProductionUpgrade.length < 3) {
  err('production upgrade must retain local Studio/manual QA gates');
}

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

const limits = remotionStudioProtocolBoundary.createElementPayloadV1Limits;
if (limits.maxPayloadCharactersExclusive !== 250000) err('Studio Protocol payload max drifted');
if (limits.maxSourceCodeCharactersExclusive !== 200000) err('Studio Protocol source-code max drifted');
if (limits.maxDependencies !== 100) err('Studio Protocol dependency max drifted');
if (limits.durationInFrames.min !== 1 || limits.durationInFrames.max !== 100000000) err('Studio Protocol duration limits drifted');
if (limits.sourceComponentRule !== 'EXACTLY_ONE_EXPORTED_NAMED_REACT_COMPONENT') err('Element source-component rule drifted');
if (!limits.installationModes.includes('wrapped') || !limits.installationModes.includes('component-owned-sequence')) err('Element installation modes drifted');
if (!remotionStudioProtocolBoundary.weddingPolicy.includes('Use official createElementPayload() instead of reimplementing payload validation.')) {
  err('reuse-before-build rule for official createElementPayload() is missing');
}

for (const guardrail of [
  'LATEST_RELEASE_AVAILABLE != WEDDING_REPO_COMPATIBLE',
  'EPHEMERAL_CI_GREEN != PRODUCTION_LOCKFILE_UPGRADED',
  'CI_RENDER_GREEN != LOCAL_STUDIO_INTERACTION_VERIFIED',
  'STUDIO_INTERACTIVE != SOURCE_OF_TRUTH_MOVED_OUT_OF_CODE',
  'ELEMENT_SOURCE_PUBLIC != SAFE_FOR_SECRETS_OR_PRIVATE_ASSET_URLS',
  'ELEMENT_DEPENDENCY_DECLARED != DEPENDENCY_POLICY_APPROVED',
  'CUSTOM_EDITOR_FEATURE_NAME != CUSTOM_INSPECTOR_VALUE_EDITOR',
  'REMOTION_V4_LICENSE != REMOTION_V5_LICENSE',
]) {
  if (!remotionWeddingCompatibilityPolicy.rules.includes(guardrail)) err(`missing compatibility guardrail: ${guardrail}`);
}

if (errors > 0) {
  console.error(`Remotion current compatibility contract FAILED (${errors})`);
  process.exit(1);
}

console.log('✅ Remotion current compatibility contract preserves locked-vs-latest, CI evidence, Studio Protocol, security and v5 revalidation boundaries.');
console.log(`locked=${remotionCurrentReleaseCoordinate.repoLockedVersion}`);
console.log(`current=${remotionCurrentReleaseCoordinate.currentReleaseVersion}`);
console.log(`patchDistance=${currentPatch - lockedPatch}`);
console.log(`compatibilityState=${remotionWeddingCompatibilityPolicy.latestCompatibilityState}`);
console.log('productionUpgradePerformed=NO');
