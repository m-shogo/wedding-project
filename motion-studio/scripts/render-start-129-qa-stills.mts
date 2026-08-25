// StaRt 129秒 3案(A/B/C) x Guideモードで、代表15時点のstillをrenderする。
// CI GREENだけでなく、このartifactを実際に目視してから完成と判断する。

import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {START_129_FPS, START_129_QA_STILL_SECONDS} from '../src/data/start129/sections.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'out/qa/start-129');
mkdirSync(outDir, {recursive: true});

const variants = ['A', 'B', 'C'] as const;
const failures: string[] = [];

for (const variant of variants) {
  for (const sec of START_129_QA_STILL_SECONDS) {
    const frame = Math.round(sec * START_129_FPS);
    const id = `${variant}-${String(sec).padStart(3, '0')}s-f${frame}`;
    const outPath = join(outDir, `${id}.png`);
    const result = spawnSync(
      'pnpm',
      [
        'exec',
        'remotion',
        'still',
        'src/index-start-129.ts',
        `Start129-${variant}-Guide`,
        outPath,
        `--frame=${frame}`,
        '--scale=0.5',
      ],
      {cwd: studioRoot, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf-8'},
    );
    if (result.status !== 0) {
      failures.push(id);
      const tail = (result.stderr || result.stdout || '').trim().split('\n').slice(-8).join('\n  ');
      console.error(`❌ ${id}\n  ${tail}`);
    } else {
      console.log(`✅ ${id}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`start-129 QA still render failed: ${failures.join(', ')}`);
  process.exit(1);
}

console.log(`\nstart-129 QA stills: out/qa/start-129/ に ${variants.length * START_129_QA_STILL_SECONDS.length}枚を書き出しました。`);
console.log('必ず目視してから完成と判断する(CI GREENだけで承認しない)。');
