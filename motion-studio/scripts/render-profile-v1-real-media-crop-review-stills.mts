import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {profileV1RuntimeMedia} from '../src/data/profileV1RuntimeMedia.generated.ts';
import {assertProfileV1MediaInputsReady} from './profile-v1-media-input-gate.mts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'out/qa/profile-v1-real-media-crop-review');
const allowMissingMediaSmoke = process.argv.includes('--allow-missing-media-smoke');
const sampleOnly = process.argv.includes('--sample');
const fps = 30;
const framesPerSlot = 2 * fps;

if (!allowMissingMediaSmoke) {
  try {
    assertProfileV1MediaInputsReady(studioRoot);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
} else {
  console.log('SMOKE ONLY / missing-media crop-review rendering allowed; this is not Human QA evidence.');
}

mkdirSync(outDir, {recursive: true});

const allSlots = profileV1RuntimeMedia.slots.map((slot, index) => ({
  id: slot.id,
  frame: index * framesPerSlot + Math.floor(framesPerSlot / 2),
}));
const slots = sampleOnly
  ? [allSlots[0], allSlots[Math.floor(allSlots.length / 2)], allSlots[allSlots.length - 1]]
  : allSlots;
const failures: string[] = [];

for (const item of slots) {
  const outPath = join(outDir, `${String(item.frame).padStart(4, '0')}-${item.id}.png`);
  console.log(`▶ ProfileV1RealMediaCropReview frame=${item.frame} → ${outPath}`);
  const result = spawnSync(
    'pnpm',
    [
      'exec',
      'remotion',
      'still',
      'src/index-profile-v1.ts',
      'ProfileV1RealMediaCropReview',
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
  console.error(`Profile V1 crop-review still render failed: ${failures.join(', ')}`);
  process.exit(1);
}

console.log(
  `✅ Profile V1 crop-review stills: ${slots.length}/${allSlots.length}${allowMissingMediaSmoke ? ' (SMOKE ONLY)' : ''}`,
);
