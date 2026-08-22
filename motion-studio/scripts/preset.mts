// pnpm preset [<id>] [--render] [--still] [--quality=preview|draft|final]
//
// プリセット(テンプレ×propsの名前付き組み合わせ)を一覧・書き出しする。
// 毎回propsを指示しなくても、名前ひとつで同じ素材を出せるようにするためのもの。
//
//   pnpm preset                      一覧
//   pnpm preset intro-dog-cookie     何が出るか + 実行コマンドを表示(実行はしない)
//   pnpm preset intro-dog-cookie --still    静止画で見た目だけ確認
//   pnpm preset intro-dog-cookie --render   動画を書き出す

import {spawnSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join, resolve} from 'node:path';
import {presets, presetById} from '../src/data/presetRegistry.ts';
import type {PresetEntry} from '../src/data/presetRegistry.ts';
import {templateById} from '../src/data/sceneRegistry.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const positional = args.filter((a) => !a.startsWith('--'));
const qualityArg = args.find((a) => a.startsWith('--quality='))?.split('=')[1] ?? 'draft';

const listAll = () => {
  console.log('プリセット一覧\n');
  const byComp = new Map<string, PresetEntry[]>();
  for (const p of presets) {
    if (!byComp.has(p.compositionId)) byComp.set(p.compositionId, []);
    byComp.get(p.compositionId)!.push(p);
  }
  for (const [comp, list] of byComp) {
    const t = templateById(comp);
    console.log(`── ${comp}${t ? ` (${t.durationInFrames}frame)` : ''}`);
    for (const p of list) {
      const mark = p.status === 'approved' ? '✔' : ' ';
      console.log(`  ${mark} ${p.id.padEnd(26)} ${p.label}`);
      console.log(`    ${' '.repeat(26)} ${p.description}`);
    }
    console.log('');
  }
  console.log('使い方:');
  console.log('  pnpm preset <id>            詳細と実行コマンドを表示');
  console.log('  pnpm preset <id> --still    静止画で見た目を確認');
  console.log('  pnpm preset <id> --render   動画を書き出す');
  console.log('\n✔ = 人間確認済み(approved)。無印はdraft。');
};

if (positional.length === 0) {
  listAll();
  process.exit(0);
}

const preset = presetById(positional[0]);
if (!preset) {
  console.error(`エラー: プリセット "${positional[0]}" が見つかりません。`);
  console.error('`pnpm preset` で一覧を確認してください。');
  process.exit(1);
}

const template = templateById(preset.compositionId);
if (!template) {
  console.error(`エラー: compositionId "${preset.compositionId}" がsceneRegistryにありません。`);
  process.exit(1);
}

console.log(`${preset.label}  [${preset.id}]`);
console.log(`  テンプレート : ${preset.compositionId} (${template.durationInFrames}frame)`);
console.log(`  内容         : ${preset.description}`);
console.log(`  使いどころ   : ${preset.usage}`);
console.log(`  状態         : ${preset.status}`);
if (preset.notes) console.log(`  メモ         : ${preset.notes}`);
console.log('  props        :');
for (const [k, v] of Object.entries(preset.props)) {
  console.log(`    ${k.padEnd(16)} ${JSON.stringify(v)}`);
}

// propsは一時ファイルへ渡す。日本語や改行(\n)をシェル経由で壊さないため。
const tmpDir = join(rootDir, 'out', '.preset-props');
const propsPath = join(tmpDir, `${preset.id}.json`);
const writeProps = () => {
  mkdirSync(tmpDir, {recursive: true});
  writeFileSync(propsPath, JSON.stringify(preset.props, null, 2), 'utf8');
};

const isStill = flags.has('--still');
const isRender = flags.has('--render');

if (!isStill && !isRender) {
  writeProps();
  const ext = template.kind === 'alpha' ? 'webm' : 'mp4';
  console.log('\n実行するには:');
  console.log(`  pnpm preset ${preset.id} --still     # 静止画で見た目確認`);
  console.log(`  pnpm preset ${preset.id} --render    # ${ext}で書き出し`);
  console.log(`\nprops JSON: ${propsPath.replace(rootDir + '/', '')}`);
  process.exit(0);
}

writeProps();

if (isStill) {
  const outPath = join('out', 'preset-stills', `${preset.id}.png`);
  mkdirSync(join(rootDir, 'out', 'preset-stills'), {recursive: true});
  const frame = Math.floor(template.durationInFrames / 2);
  console.log(`\n静止画を書き出し中 (frame=${frame})...`);
  const r = spawnSync(
    'pnpm',
    ['exec', 'remotion', 'still', preset.compositionId, outPath, `--frame=${frame}`, `--props=${propsPath}`],
    {cwd: rootDir, stdio: 'inherit'},
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
  console.log(`\n完了: ${outPath}`);
  process.exit(0);
}

// --render
const alpha = template.kind === 'alpha';
const outPath = join('out', 'preset', `${preset.id}.${alpha ? 'webm' : 'mp4'}`);
mkdirSync(join(rootDir, 'out', 'preset'), {recursive: true});
const extra = alpha
  ? ['--codec=vp9', '--image-format=png', '--pixel-format=yuva420p']
  : [];
const quality =
  qualityArg === 'preview' ? ['--scale=0.5', '--crf=28'] : qualityArg === 'final' ? ['--crf=16'] : [];

console.log(`\n書き出し中 (${qualityArg}${alpha ? ' / 透過WebM' : ''})...`);
const r = spawnSync(
  'pnpm',
  ['exec', 'remotion', 'render', preset.compositionId, outPath, `--props=${propsPath}`, ...extra, ...quality],
  {cwd: rootDir, stdio: 'inherit'},
);
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`\n完了: ${outPath}`);
console.log('out/配下はGit管理外。Palmierへはこのファイルをdropする。');
