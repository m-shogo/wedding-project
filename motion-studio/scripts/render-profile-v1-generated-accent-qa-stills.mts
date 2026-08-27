import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'out/qa/profile-v1-generated-accents');
mkdirSync(outDir, {recursive: true});

const frames = [
  {id: '01-departure-boarding-title', frame: 18},
  {id: '02-intersection-route-line', frame: 105},
  {id: '03-arrival-door-light', frame: 248},
] as const;
const failures: string[] = [];

for (const item of frames) {
  const outPath = join(outDir, `${item.id}-f${item.frame}.png`);
  console.log(`▶ ProfileV1GeneratedAccentsPreview frame=${item.frame} → ${outPath}`);
  const result = spawnSync(
    'pnpm',
    [
      'exec',
      'remotion',
      'still',
      'src/index-profile-v1.ts',
      'ProfileV1GeneratedAccentsPreview',
      outPath,
      `--frame=${item.frame}`,
      '--scale=0.5',
    ],
    {cwd: studioRoot, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8'},
  );
  if (result.status !== 0) {
    failures.push(item.id);
    const tail = (result.stderr || result.stdout || '').trim().split('\n').slice(-8).join('\n  ');
    console.error(`❌ ${item.id}\n  ${tail}`);
  } else {
    console.log(`✅ ${item.id}`);
  }
}

if (failures.length) {
  console.error(`Profile V1 generated accent visual smoke failed: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`✅ Profile V1 generated accent QA stills: ${frames.length}枚`);
