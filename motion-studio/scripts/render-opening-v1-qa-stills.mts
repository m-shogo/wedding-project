import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'out/qa/opening-v1');
mkdirSync(outDir, {recursive: true});

// 60秒 / 30fps。photo placeholderでもproduction layoutを確認できるよう、
// 地名ラベルとfull/left/right/wideを横断して代表frameを選ぶ。
const frames = [
  {id: '01-cold-open', frame: 24},
  {id: '02-okinawa-full-label', frame: 90},
  {id: '03-okinawa-left', frame: 210},
  {id: '04-seoul-right-label', frame: 420},
  {id: '05-hawaii-full-label', frame: 750},
  {id: '06-hawaii-wide', frame: 840},
  {id: '07-hero-a', frame: 1170},
  {id: '08-hero-b', frame: 1440},
  {id: '09-arrival', frame: 1650},
  {id: '10-ending', frame: 1755},
] as const;

const failures: string[] = [];

for (const item of frames) {
  const outPath = join(outDir, `${item.id}-f${item.frame}.png`);
  console.log(`▶ OpeningV1 frame=${item.frame} → ${outPath}`);
  const result = spawnSync(
    'pnpm',
    [
      'exec',
      'remotion',
      'still',
      'src/index-opening-v1.ts',
      'OpeningV1',
      outPath,
      `--frame=${item.frame}`,
      '--scale=0.5',
    ],
    {cwd: studioRoot, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf-8'},
  );

  if (result.status !== 0) {
    failures.push(item.id);
    const tail = (result.stderr || result.stdout || '')
      .trim()
      .split('\n')
      .slice(-8)
      .join('\n  ');
    console.error(`❌ ${item.id}\n  ${tail}`);
  } else {
    console.log(`✅ ${item.id}`);
  }
}

if (failures.length > 0) {
  console.error(`Opening V1 visual smoke failed: ${failures.join(', ')}`);
  process.exit(1);
}

console.log(`✅ Opening V1 QA stills: ${frames.length}枚`);
