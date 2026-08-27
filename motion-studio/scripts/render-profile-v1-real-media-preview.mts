import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(studioRoot, 'out/preview/profile_v1_real_media_preview.mp4');
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
console.log(`✅ Profile V1 real-media preview: ${output}`);
