import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(studioRoot, 'out/preview/profile_v1_full_structure_preview.mp4');
mkdirSync(dirname(output), {recursive: true});

const result = spawnSync(
  'pnpm',
  [
    'exec',
    'remotion',
    'render',
    'src/index-profile-v1.ts',
    'ProfileV1FullStructurePreview',
    output,
    '--scale=0.4',
    '--crf=27',
  ],
  {cwd: studioRoot, stdio: 'inherit'},
);

if (result.status !== 0) process.exit(result.status ?? 1);
console.log(`✅ Profile V1 full structure preview: ${output}`);
