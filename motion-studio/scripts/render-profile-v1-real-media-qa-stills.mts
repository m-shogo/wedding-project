import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'out/qa/profile-v1-real-media');
mkdirSync(outDir, {recursive: true});

// One representative midpoint per canonical chapter. On a fresh clone these intentionally
// render explicit REAL MEDIA MISSING surfaces; on a media-populated machine the same frames
// render the exact runtime-manifest files and become the Human real-media QA input.
const frames = [
  {id: '01-departure', frame: 90},
  {id: '02-separate-journeys', frame: 270},
  {id: '03-intersection', frame: 450},
  {id: '04-adventure', frame: 630},
  {id: '05-arrival', frame: 810},
] as const;
const failures: string[] = [];

for (const item of frames) {
  const outPath = join(outDir, `${item.id}-f${item.frame}.png`);
  console.log(`▶ ProfileV1RealMediaPreview frame=${item.frame} → ${outPath}`);
  const result = spawnSync(
    'pnpm',
    [
      'exec',
      'remotion',
      'still',
      'src/index-profile-v1.ts',
      'ProfileV1RealMediaPreview',
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
  console.error(`Profile V1 real-media visual smoke failed: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`✅ Profile V1 real-media QA stills: ${frames.length}枚`);
