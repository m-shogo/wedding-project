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
  'render:opening-v1:preview': 'pnpm prepare:opening-v1 && remotion render src/index-opening-v1.ts OpeningV1 out/preview/opening_v1_preview.mp4 --scale=0.5 --crf=24',
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
console.log(`Opening V1 production command surface OK: ${Object.keys(expected).length} guarded commands enforce fresh render -> Human final MP4 review -> production bundle finalize -> DaVinci Actual -> final approval without premature export.`);
