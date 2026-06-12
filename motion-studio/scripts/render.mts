// レンダーランナー。sceneRegistryの定義からpreset付きで書き出す。
//
// 使い方:
//   pnpm render <テンプレートID> <preset>
//   pnpm render --all <preset>
//
// preset:
//   preview  確認用。50%スケール・低画質 → out/preview/
//   draft    調整用。1080p・標準画質    → out/draft/
//   final    納品用。1080p・高画質      → registryのoutputパスへ
//            (kind=alphaは透過VP9 WebM、opaqueはMP4)
//   prores   alpha素材のProRes 4444 MOV(CapCutでWebM透過が読めない時の代替)

import {spawnSync} from 'node:child_process';
import {basename} from 'node:path';
import {templates, templateById} from '../src/data/sceneRegistry.ts';

const PRESETS = ['preview', 'draft', 'final', 'prores'] as const;
type Preset = (typeof PRESETS)[number];

const [, , target, presetArg] = process.argv;
const preset = presetArg as Preset;

const usage = () => {
  console.log('使い方: pnpm render <テンプレートID|--all> <preset>');
  console.log(`preset: ${PRESETS.join(' / ')}`);
  console.log('\nテンプレート一覧:');
  for (const t of templates.filter((x) => x.kind !== 'preview-only')) {
    console.log(`  ${t.id}  (${t.kind})  → out/${t.output}`);
  }
  process.exit(1);
};

if (!target || !PRESETS.includes(preset)) {
  usage();
}

const buildArgs = (id: string): string[] | null => {
  const t = templateById(id);
  if (!t) {
    console.error(`❌ registryに無いテンプレートID: ${id}`);
    return null;
  }
  if (t.kind === 'preview-only' && preset !== 'preview') {
    console.error(`❌ ${id} はpreview-only。preset=previewのみ使える`);
    return null;
  }
  const name = t.output ? basename(t.output) : id;
  const alphaFlags = ['--image-format=png', '--pixel-format=yuva420p'];

  switch (preset) {
    case 'preview':
      return ['render', id, `out/preview/${name}_preview.mp4`, '--scale=0.5', '--crf=28'];
    case 'draft':
      return ['render', id, `out/draft/${name}_draft.mp4`, '--crf=23'];
    case 'final':
      if (t.kind === 'alpha') {
        return ['render', id, `out/${t.output}.webm`, '--codec=vp9', ...alphaFlags];
      }
      return ['render', id, `out/${t.output}.mp4`, '--crf=16'];
    case 'prores':
      if (t.kind !== 'alpha') {
        console.error(`❌ ${id} はalpha素材ではないのでproresは不要(finalを使う)`);
        return null;
      }
      return [
        'render',
        id,
        `out/${t.output}.mov`,
        '--codec=prores',
        '--prores-profile=4444',
        '--image-format=png',
        '--pixel-format=yuva444p10le',
      ];
  }
};

const targets =
  target === '--all'
    ? templates.filter((t) => t.kind !== 'preview-only').map((t) => t.id)
    : [target];

let failed = 0;
for (const id of targets) {
  const args = buildArgs(id);
  if (!args) {
    failed++;
    continue;
  }
  console.log(`\n▶ ${id} [${preset}] → ${args[2]}`);
  const r = spawnSync('pnpm', ['exec', 'remotion', ...args], {stdio: 'inherit'});
  if (r.status !== 0) {
    failed++;
    console.error(`❌ レンダリング失敗: ${id}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed}件失敗`);
  process.exit(1);
}
console.log(`\n完了: ${targets.length}件 [${preset}]`);
