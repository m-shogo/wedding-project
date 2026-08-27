import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {scripts?: Record<string, string>};
const scripts = pkg.scripts ?? {};
const errors: string[] = [];

const expected: Record<string, string> = {
  'prepare:opening-v1': 'pnpm sync:photos && pnpm check:opening-photos && pnpm opening:preflight',
  'dev:opening-v1': 'pnpm prepare:opening-v1 && remotion studio src/index-opening-v1.ts',
  'render:opening-v1': 'node --no-warnings scripts/init-opening-v1-final-render-review.mts',
  'render:opening-v1:preview': 'pnpm prepare:opening-v1 && pnpm opening:assembly-preflight:strict && remotion render src/index-opening-v1.ts OpeningV1 out/preview/opening_v1_preview.mp4 --scale=0.5 --crf=24',
  'qa:opening-stills': 'pnpm prepare:opening-v1 && node --no-warnings scripts/render-opening-v1-qa-stills.mts',
  'opening:assembly-preflight:strict': 'node --no-warnings scripts/opening-v1-assembly-preflight.mts --strict',
  'opening:preview-review:init': 'node --no-warnings scripts/init-opening-v1-preview-review.mts',
  'opening:preview-review': 'node --no-warnings scripts/opening-v1-preview-review.mts',
  'opening:preview-review:strict': 'node --no-warnings scripts/opening-v1-preview-source-fingerprint.mts --strict && node --no-warnings scripts/opening-v1-preview-review.mts --strict',
  'opening:final-render-review:init': 'node --no-warnings scripts/init-opening-v1-final-render-review.mts',
  'opening:final-render-review': 'node --no-warnings scripts/opening-v1-final-render-review.mts',
  'opening:final-render-review:strict': 'node --no-warnings scripts/opening-v1-final-render-review.mts --strict',
  'opening:production-bundle:finalize': 'pnpm opening:final-render-review:strict && pnpm export:opening-v1-production-bundle',
  'export:opening-v1-production-bundle': 'node --no-warnings scripts/export-opening-v1-production-bundle.mts',
  'opening:davinci-finishing:init': 'node --no-warnings scripts/opening-v1-davinci-finishing-evidence.mts --init',
  'opening:davinci-finishing:strict': 'node --no-warnings scripts/opening-v1-davinci-finishing-evidence.mts --strict',
  'opening:final-delivery-approval:init': 'node --no-warnings scripts/opening-v1-final-delivery-approval.mts --init',
  'opening:final-delivery-approval:strict': 'node --no-warnings scripts/opening-v1-final-delivery-approval.mts --strict',
  'opening:production-status': 'node --no-warnings scripts/opening-v1-production-status.mts',
};

for (const [name, command] of Object.entries(expected)) {
  if (scripts[name] !== command) errors.push(`${name} drifted: expected ${command}, got ${scripts[name] ?? '<missing>'}`);
}
for (const command of Object.values(expected)) {
  for (const match of command.matchAll(/scripts\/([A-Za-z0-9._-]+\.mts)/g)) {
    if (!existsSync(join(root, 'scripts', match[1]))) errors.push(`command references missing script: ${match[1]}`);
  }
}
for (const name of ['opening:final-render-review','opening:davinci-finishing','opening:final-delivery-approval']) {
  if (!scripts[name]) errors.push(`missing non-strict inspection command: ${name}`);
}

const assemblyPath = join(root, 'scripts/opening-v1-assembly-preflight.mts');
const assembly = readFileSync(assemblyPath, 'utf8');
for (const token of [
  "import {verifyIntakeReceipt} from './verify-production-media-intake-receipt.mts';",
  "verifyIntakeReceipt({project: 'opening', targetDirectory: openingPhotoDir})",
  'const photosReady = photoFilesReady && photoReceiptCurrent;',
  'PHOTO_INTAKE_RECEIPT_STALE',
  'out/intake/opening-media-intake.json',
  'scripts/intake-production-media.mts --project opening',
  'scripts/verify-production-media-intake-receipt.mts --project opening',
]) {
  if (!assembly.includes(token)) errors.push(`Opening assembly missing SHA-bound photo intake contract: ${token}`);
}
if (assembly.includes("'実写真11枚をcanonical filenameで投入',\n  'pnpm sync:photos'")) {
  errors.push('Opening assembly recovery must not treat raw filename placement + sync as canonical production provenance');
}

const preview = scripts['render:opening-v1:preview'] ?? '';
const assemblyStrictIndex = preview.indexOf('pnpm opening:assembly-preflight:strict');
const remotionRenderIndex = preview.indexOf('remotion render src/index-opening-v1.ts OpeningV1');
if (assemblyStrictIndex < 0) errors.push('render:opening-v1:preview must require the strict real-media/BGM assembly gate');
if (remotionRenderIndex < 0) errors.push('render:opening-v1:preview must retain the canonical OpeningV1 Remotion render');
if (assemblyStrictIndex >= remotionRenderIndex) errors.push('render:opening-v1:preview must run assembly-preflight:strict before invoking Remotion');

const qaCommand = scripts['qa:opening-stills'] ?? '';
if (qaCommand.includes('--allow-missing-media-smoke')) errors.push('qa:opening-stills must never expose the CI-only missing-media smoke bypass');
const qaStillsPath = join(root, 'scripts/render-opening-v1-qa-stills.mts');
const qaStills = readFileSync(qaStillsPath, 'utf8');
for (const token of [
  "scripts/opening-v1-assembly-preflight.mts', '--strict'",
  '--allow-missing-media-smoke',
  'SMOKE ONLY',
  'this is not production QA evidence',
]) {
  if (!qaStills.includes(token)) errors.push(`Opening QA stills missing production/smoke guardrail: ${token}`);
}
const qaGateIndex = qaStills.indexOf("'scripts/opening-v1-assembly-preflight.mts', '--strict'");
const qaRemotionIndex = qaStills.indexOf("'remotion'");
if (qaGateIndex < 0 || qaRemotionIndex < 0 || qaGateIndex >= qaRemotionIndex) {
  errors.push('Opening QA stills must run the strict assembly input gate before Remotion in normal production mode');
}

const render = scripts['render:opening-v1'] ?? '';
if (render.includes('export:opening-v1-production-bundle')) errors.push('render:opening-v1 must stop after fresh render + Human final-review initialization; it must not export the production bundle before Human review');
if (!render.includes('init-opening-v1-final-render-review.mts')) errors.push('render:opening-v1 must use the guarded fresh-render/final-review initializer');
const finalize = scripts['opening:production-bundle:finalize'] ?? '';
if (!finalize.startsWith('pnpm opening:final-render-review:strict && ')) errors.push('production bundle finalize must require current Human final-MP4 review before export');
if (!finalize.endsWith('pnpm export:opening-v1-production-bundle')) errors.push('production bundle finalize must export only after final-review strict passes');

if (errors.length) {
  console.error(`Opening V1 production command surface FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Opening V1 production command surface OK: ${Object.keys(expected).length} guarded commands require SHA-current canonical photo intake + BGM assembly before preview and production QA stills, isolate placeholder smoke behind an explicit CI-only flag, then fresh render -> Human final MP4 review -> production bundle finalize -> DaVinci Actual -> final approval without premature export.`);
