// pnpm export:stills
// 主要Compositionのstill(PNG)を exports/previews/ に生成する。
// 制作コックピット(exports/index.html)のサムネイル用。画像はGit管理しない。
//
// - 順番に1つずつ生成する(並列にしない。レンダリングが重いため)
// - 1つ失敗しても続行し、最後に失敗一覧を出す。全失敗のみexit 1
// - Composition IDに日本語があるため、shell経由ではなくspawnSyncの引数配列で渡す
// - 生成に時間がかかるので通常の `pnpm export` には含めない。
//   見た目を更新したいときに `pnpm export:stills && pnpm export` を実行する

import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {previewStills} from './preview-stills.config.mts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewDir = join(studioRoot, 'exports/previews');
mkdirSync(previewDir, {recursive: true});

const failures: string[] = [];
const succeeded: string[] = [];

console.log(`プレビューstill生成: ${previewStills.length}件(順次実行)\n`);

for (const p of previewStills) {
  const outPath = join(previewDir, p.file);
  console.log(`▶ ${p.compositionId} (frame=${p.frame}) → exports/previews/${p.file}`);
  const result = spawnSync(
    'pnpm',
    ['exec', 'remotion', 'still', p.compositionId, outPath, `--frame=${p.frame}`],
    {cwd: studioRoot, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf-8'},
  );
  if (result.status === 0) {
    succeeded.push(p.compositionId);
    console.log(`  ✅ 生成完了\n`);
  } else {
    failures.push(p.compositionId);
    const tail = (result.stderr || result.stdout || '')
      .trim()
      .split('\n')
      .slice(-5)
      .join('\n  ');
    console.error(`  ❌ 失敗:\n  ${tail}\n`);
  }
}

console.log('---');
console.log(`成功: ${succeeded.length}件 / 失敗: ${failures.length}件`);
if (failures.length > 0) {
  console.error(`失敗したComposition: ${failures.join(', ')}`);
}
if (succeeded.length === 0) {
  console.error('export:stills 失敗 — 全Compositionの生成に失敗');
  process.exit(1);
}
console.log('export:stills 完了 — `pnpm export:home` でコックピットに反映する');
