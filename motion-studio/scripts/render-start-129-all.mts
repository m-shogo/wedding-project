// A/B/C × Clean/Guide の6本を129秒フルrenderする。
//   pnpm render:start-129:demo   … DEMO(正規歌詞・音源なしでも可)
//   pnpm render:start-129:final  … FINAL(check-start-129-final-gateを先に通す必要がある)

import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const isFinal = process.argv.includes('--final');
const outDir = join(studioRoot, isFinal ? 'out/start-129-final' : 'out/start-129-demo');
mkdirSync(outDir, {recursive: true});

const variants = ['A', 'B', 'C'] as const;
const modes = ['Clean', 'Guide'] as const;
const scale = isFinal ? '1' : '0.5';
const crf = isFinal ? '18' : '26';

const failures: string[] = [];
for (const v of variants) {
  for (const m of modes) {
    const id = `Start129-${v}-${m}`;
    const out = join(outDir, `start129_${v}_${m.toLowerCase()}.mp4`);
    console.log(`\n▶ ${id} → ${out.replace(studioRoot + '/', '')}`);
    const r = spawnSync(
      'pnpm',
      ['exec', 'remotion', 'render', 'src/index-start-129.ts', id, out, `--scale=${scale}`, `--crf=${crf}`],
      {cwd: studioRoot, stdio: 'inherit'},
    );
    if (r.status !== 0) failures.push(id);
  }
}

if (failures.length) {
  console.error(`\n❌ render失敗: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`\n✅ 6本のrender完了: ${outDir.replace(studioRoot + '/', '')}`);
console.log('   次: pnpm qa:start-129-video で機械QAを実行し、その後フル視聴すること。');
