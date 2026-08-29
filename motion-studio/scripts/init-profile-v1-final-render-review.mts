import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const render = spawnSync('pnpm', ['render:profile-v1'], {
  cwd: studioRoot,
  stdio: 'inherit',
});
if (render.status !== 0) process.exit(render.status ?? 1);

const init = spawnSync(
  process.execPath,
  ['--no-warnings', 'scripts/profile-v1-final-render-review.mts', '--init'],
  {cwd: studioRoot, stdio: 'inherit'},
);
if (init.status !== 0) process.exit(init.status ?? 1);

console.log('Profile V1 final-render Human review evidence was initialized only after a fresh guarded production render.');
