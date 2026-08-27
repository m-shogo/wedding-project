import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (command: string, args: string[]) => {
  const result = spawnSync(command, args, {cwd: studioRoot, stdio: 'inherit'});
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run('pnpm', ['prepare:opening-v1']);
run('pnpm', ['check:opening-photos:strict']);
run('pnpm', ['check:opening-sound:strict']);
run('pnpm', ['opening:assembly-preflight:strict']);
run('pnpm', ['opening:preview-review:strict']);
run('pnpm', ['exec', 'remotion', 'render', 'src/index-opening-v1.ts', 'OpeningV1', 'out/opening/opening_v1.mp4']);
run(process.execPath, ['--no-warnings', 'scripts/check-opening-render.mts', 'out/opening/opening_v1.mp4']);
run(process.execPath, ['--no-warnings', 'scripts/opening-v1-final-render-review.mts', '--init']);

console.log('Opening V1 final-render Human review evidence was initialized only after a fresh guarded production render.');
console.log('Production bundle export remains blocked until a human completes this final MP4 review.');
