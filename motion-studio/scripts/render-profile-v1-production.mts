import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (command: string, args: string[]) => spawnSync(command, args, {cwd: root, encoding: 'utf8', stdio: 'inherit'});

const preflight = run(process.execPath, ['--no-warnings', 'scripts/profile-v1-assembly-preflight.mts', '--strict']);
if (preflight.status !== 0) {
  console.error('Profile V1 production render blocked: assembly preflight is not ready.');
  process.exit(1);
}

mkdirSync(join(root, 'out/profile'), {recursive: true});
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const render = run(pnpm, ['exec', 'remotion', 'render', 'src/index-profile-v1.ts', 'ProfileV1', 'out/profile/profile_v1.mp4']);
if (render.status !== 0) process.exit(render.status ?? 1);

const qa = run(process.execPath, ['--no-warnings', 'scripts/check-profile-render.mts', 'out/profile/profile_v1.mp4']);
if (qa.status !== 0) process.exit(qa.status ?? 1);

console.log('Profile V1 production candidate rendered and technical QA passed.');
console.log('Human final-render review / Mac DaVinci Actual / final delivery approval remain separate gates.');
