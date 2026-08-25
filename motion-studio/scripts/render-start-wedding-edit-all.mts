// A/B/C × Clean/Guide の6本をStart Wedding Edit(曲頭〜2番サビ後の間奏まで)でrenderする。
// 129秒固定は無効。durationはComposition側(sourceEndSec由来)に従う。

import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const isFinal = process.argv.includes('--final');
const outDir = join(studioRoot, isFinal ? 'out/start-wedding-edit-final' : 'out/start-wedding-edit');
mkdirSync(outDir, {recursive: true});

const variants = ['A', 'B', 'C'] as const;
const modes = ['Clean', 'Guide'] as const;
const scale = isFinal ? '1' : '0.5';
const crf = isFinal ? '18' : '24';

const failures: string[] = [];
for (const v of variants) {
  for (const m of modes) {
    const id = `StartWeddingEdit-${v}-${m}`;
    const out = join(outDir, `start_wedding_edit_${v.toLowerCase()}_${m.toLowerCase()}.mp4`);
    console.log(`\n▶ ${id} → ${out.replace(studioRoot + '/', '')}`);
    const r = spawnSync(
      'pnpm',
      ['exec', 'remotion', 'render', 'src/index-start-wedding-edit.ts', id, out, `--scale=${scale}`, `--crf=${crf}`],
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
console.log('   次: pnpm qa:start-wedding-edit-render で機械QAを実行し、その後フル視聴すること。');
