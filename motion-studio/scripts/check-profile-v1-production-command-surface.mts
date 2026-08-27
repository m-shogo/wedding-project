import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  scripts?: Record<string, string>;
};
const scripts = pkg.scripts ?? {};
const errors: string[] = [];

const expected: Record<string, string> = {
  'prepare:profile-v1': 'pnpm profile:generated-accents:check && pnpm profile:media:sync && pnpm profile:media:check && pnpm profile:assembly-preflight',
  'dev:profile-v1': 'pnpm prepare:profile-v1 && remotion studio src/index-profile-v1.ts',
  'profile:generated-accents:check': 'node --no-warnings scripts/check-profile-v1-generated-accents.mts',
  'profile:media:sync': 'node --no-warnings scripts/sync-profile-v1-runtime-media.mts --write',
  'profile:media:check': 'node --no-warnings scripts/check-profile-v1-runtime-media.mts',
  'profile:assembly-preflight': 'node --no-warnings scripts/profile-v1-assembly-preflight.mts',
  'profile:assembly-preflight:strict': 'node --no-warnings scripts/profile-v1-assembly-preflight.mts --strict',
  'profile:bgm-rights:init': 'node --no-warnings scripts/profile-v1-bgm-rights-approval.mts --init',
  'profile:bgm-rights:strict': 'node --no-warnings scripts/profile-v1-bgm-rights-approval.mts --strict',
  'profile:structure-review:init': 'node --no-warnings scripts/profile-v1-full-structure-review.mts --init',
  'profile:structure-review:strict': 'node --no-warnings scripts/profile-v1-full-structure-review.mts --strict',
  'render:profile-v1:structure-preview': 'node --no-warnings scripts/render-profile-v1-full-structure-preview.mts',
  'render:profile-v1:real-media-preview': 'pnpm prepare:profile-v1 && node --no-warnings scripts/render-profile-v1-real-media-preview.mts',
  'qa:profile-v1:real-media-stills': 'pnpm prepare:profile-v1 && node --no-warnings scripts/render-profile-v1-real-media-qa-stills.mts',
  'profile:real-media-review:init': 'node --no-warnings scripts/init-profile-v1-real-media-review.mts',
  'profile:real-media-review:strict': 'node --no-warnings scripts/profile-v1-real-media-review.mts --strict',
  'render:profile-v1': 'node --no-warnings scripts/render-profile-v1-production.mts',
  'check:profile-render': 'node --no-warnings scripts/check-profile-render.mts out/profile/profile_v1.mp4',
  'profile:final-render-review:init': 'node --no-warnings scripts/profile-v1-final-render-review.mts --init',
  'profile:final-render-review:strict': 'node --no-warnings scripts/profile-v1-final-render-review.mts --strict',
  'export:profile-v1-production-bundle': 'node --no-warnings scripts/export-profile-v1-production-bundle.mts',
  'profile:davinci-finishing:init': 'node --no-warnings scripts/profile-v1-davinci-finishing-evidence.mts --init',
  'profile:davinci-finishing:strict': 'node --no-warnings scripts/profile-v1-davinci-finishing-evidence.mts --strict',
  'profile:final-delivery-approval:init': 'node --no-warnings scripts/profile-v1-final-delivery-approval.mts --init',
  'profile:final-delivery-approval:strict': 'node --no-warnings scripts/profile-v1-final-delivery-approval.mts --strict',
  'profile:production-status': 'node --no-warnings scripts/profile-v1-production-status.mts',
  'profile:production-status:strict': 'node --no-warnings scripts/profile-v1-production-status.mts --strict',
};

for (const [name, expectedCommand] of Object.entries(expected)) {
  if (scripts[name] !== expectedCommand) {
    errors.push(`${name} drifted: expected ${expectedCommand}, got ${scripts[name] ?? '<missing>'}`);
  }
}

for (const command of Object.values(expected)) {
  for (const match of command.matchAll(/scripts\/([A-Za-z0-9._-]+\.mts)/g)) {
    const path = join(root, 'scripts', match[1]);
    if (!existsSync(path)) errors.push(`command references missing script: ${match[1]}`);
  }
}

for (const required of [
  'profile:bgm-rights',
  'profile:structure-review',
  'profile:real-media-review',
  'profile:final-render-review',
  'profile:davinci-finishing',
  'profile:final-delivery-approval',
]) {
  if (!scripts[required]) errors.push(`missing non-strict inspection command: ${required}`);
}

if (scripts['render:profile-v1']?.includes('remotion render')) {
  errors.push('render:profile-v1 must use the guarded production renderer, not bypass it with raw remotion render');
}
if (!scripts['prepare:profile-v1']?.startsWith('pnpm profile:generated-accents:check && pnpm profile:media:sync')) {
  errors.push('prepare:profile-v1 must validate canonical generated accents before refreshing runtime media');
}
if (!scripts['prepare:profile-v1']?.includes('pnpm profile:assembly-preflight')) {
  errors.push('prepare:profile-v1 must still report assembly readiness after generated-accent/media checks');
}

if (errors.length) {
  console.error(`Profile V1 production command surface FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Profile V1 production command surface OK: ${Object.keys(expected).length} guarded commands validate Motion Zukan generated accents, refresh runtime media, and bind Human review initialization to a fresh current-input preview without bypassing production gates.`);
