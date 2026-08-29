import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assertProfileV1MediaInputsReady} from './profile-v1-media-input-gate.mts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(studioRoot, 'out/preview/profile_v1_real_media_preview.mp4');
const allowMissingMediaSmoke = process.argv.includes('--allow-missing-media-smoke');

const framingCheck = spawnSync(
  process.execPath,
  ['--no-warnings', 'scripts/sync-profile-v1-framing-verdicts.mts'],
  {cwd: studioRoot, encoding: 'utf8'},
);
if (framingCheck.status !== 0) {
  if (framingCheck.stdout) process.stdout.write(framingCheck.stdout);
  if (framingCheck.stderr) process.stderr.write(framingCheck.stderr);
  console.error('PROFILE_REAL_MEDIA_PREVIEW_BLOCKED: Human crop/focus evidence changed without a current generated framing snapshot.');
  console.error('Run: node --no-warnings scripts/sync-profile-v1-framing-verdicts.mts --write');
  process.exit(framingCheck.status ?? 1);
}

if (!allowMissingMediaSmoke) {
  try {
    assertProfileV1MediaInputsReady(studioRoot);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
} else {
  console.log('SMOKE ONLY / explicit missing-media preview allowed; this is not production review evidence.');
}

mkdirSync(dirname(output), {recursive: true});

const result = spawnSync(
  'pnpm',
  [
    'exec',
    'remotion',
    'render',
    'src/index-profile-v1.ts',
    'ProfileV1RealMediaPreview',
    output,
    '--scale=0.5',
    '--crf=24',
  ],
  {cwd: studioRoot, stdio: 'inherit'},
);

if (result.status !== 0) process.exit(result.status ?? 1);
console.log(`✅ Profile V1 real-media preview: ${output}${allowMissingMediaSmoke ? ' (SMOKE ONLY)' : ''}`);
