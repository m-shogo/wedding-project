import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assertProfileV1MediaInputsReady} from './profile-v1-media-input-gate.mts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'out/qa/profile-v1-real-media');

try {
  assertProfileV1MediaInputsReady(studioRoot);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

mkdirSync(outDir, {recursive: true});

// One representative interior slot midpoint per canonical chapter. Avoid exact slot boundaries:
// the preview intentionally fades one slot out before the next fades in, so a boundary frame can
// be fully transparent even though the composition is healthy. These checkpoints are production
// evidence and must only render after all 17 canonical media slots plus cleared current BGM exist.
const frames = [
  {id: '01-departure', frame: 90},
  {id: '02-separate-journeys', frame: 248},
  {id: '03-intersection', frame: 450},
  {id: '04-adventure', frame: 608},
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
