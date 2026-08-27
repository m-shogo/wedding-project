import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'out/qa/profile-v1-departure');
mkdirSync(outDir, {recursive: true});

// Chapter 1 source authority explicitly asks for a 10-second first prototype.
// These frames sample the three structural beats without claiming real media or BGM evidence.
const frames = [
  {id: '01-airport', frame: 45},
  {id: '02-runway', frame: 145},
  {id: '03-window', frame: 245},
] as const;
const failures: string[] = [];

for (const item of frames) {
  const outPath = join(outDir, `${item.id}-f${item.frame}.png`);
  console.log(`▶ ProfileV1DeparturePreview frame=${item.frame} → ${outPath}`);
  const result = spawnSync(
    'pnpm',
    [
      'exec',
      'remotion',
      'still',
      'src/index-profile-v1.ts',
      'ProfileV1DeparturePreview',
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

if (failures.length > 0) {
  console.error(`Profile V1 departure visual smoke failed: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`✅ Profile V1 departure QA stills: ${frames.length}枚`);
