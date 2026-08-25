// public/demo/start-129/<ROLE>/ の実素材を ffprobe で検査し、
// role の aspectHint(assetRoles.ts)と実際の向き(landscape/portrait)が
// 一致しているかを機械検証する。
//
// これは「見た目が正しい」ことの証明ではなく、「明らかに向きが違う素材が
// 紛れ込んでいない」ことの最低限のガード。過去に16:9roleへ縦動画・縦写真が
// 混入した実例があったため追加(docs/learning-entries/start-129-production-lessons.md)。

import {execFileSync} from 'node:child_process';
import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {START_129_ASSET_ROLES} from '../src/data/start129/assetRoles.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const demoRoot = join(studioRoot, 'public/demo/start-129');
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm', '.mov']);

type Orientation = 'landscape' | 'portrait' | 'square';

const probeDims = (path: string): {width: number; height: number} | null => {
  try {
    const out = execFileSync(
      'ffprobe',
      ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path],
      {encoding: 'utf-8'},
    ).trim();
    const [w, h] = out.split(',').map(Number);
    if (!w || !h) return null;
    return {width: w, height: h};
  } catch {
    return null;
  }
};

const orientationOf = (w: number, h: number): Orientation => {
  if (w === h) return 'square';
  return w > h ? 'landscape' : 'portrait';
};

// aspectHintから期待されるorientation。
// 16:9/9:16は実装(StartDemoBackdrop/cover)がその向きを前提に選ばれているため厳密に検査する。
// 4:5(HERO_CLOSE/DETAIL_HAND)は常にcover fitのdetail/panelとして使われ、
// 特定の向きにレイアウトが依存していないため、向きを問わず許容する。
const expectedOrientation = (hint: string): Orientation[] => {
  if (hint === '16:9') return ['landscape'];
  if (hint === '9:16') return ['portrait'];
  return ['landscape', 'portrait', 'square'];
};

const errors: string[] = [];
let checked = 0;

for (const {role, aspectHint, labelJa} of START_129_ASSET_ROLES) {
  const roleDir = join(demoRoot, role);
  if (!existsSync(roleDir)) continue;
  const files = readdirSync(roleDir)
    .filter((f) => !f.startsWith('.'))
    .filter((f) => statSync(join(roleDir, f)).isFile())
    .filter((f) => exts.has(extname(f).toLowerCase()));

  for (const file of files) {
    const path = join(roleDir, file);
    const dims = probeDims(path);
    if (!dims) {
      errors.push(`${role}/${file}: ffprobeでdimensionを取得できない(壊れたファイルの可能性)`);
      continue;
    }
    checked += 1;
    const actual = orientationOf(dims.width, dims.height);
    const expected = expectedOrientation(aspectHint);
    if (!expected.includes(actual)) {
      errors.push(
        `${role}(${labelJa})/${file}: ${dims.width}x${dims.height} は${actual}だが、aspectHint=${aspectHint}は${expected.join('/')}を期待`,
      );
    }
  }
}

if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\nstart-129 media orientation check: ${errors.length}件のエラー(${checked}件中)`);
  process.exit(1);
}

console.log(`✅ start-129 media orientation OK: ${checked}件のローカル素材すべてrole aspectHintと一致。`);
console.log('注意: 向きの一致のみを検証。人物・ロゴ・看板・品質は目視確認が必須(このcheckでは検出できない)。');
