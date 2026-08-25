// public/demo/start-129/<ROLE>/ (Git管理外)をスキャンし、
// src/data/start129/demoAssetLibrary.generated.ts を再生成する。
//
// 無料ダミー素材(pnpm fetch:start-129-demo等で取得)を置いた場合だけ反映される。
// 何も置かれていなくてもエラーにはならず、空のlibraryを生成する
// (Remotion側はStartDemoBackdropで抽象placeholderへ自動フォールバックする)。

import {existsSync, mkdirSync, readdirSync, statSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {START_129_ASSET_ROLES} from '../src/data/start129/assetRoles.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const demoRoot = join(studioRoot, 'public/demo/start-129');
const outFile = join(studioRoot, 'src/data/start129/demoAssetLibrary.generated.ts');
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm', '.mov']);

mkdirSync(demoRoot, {recursive: true});

const library: Record<string, string[]> = {};
for (const {role} of START_129_ASSET_ROLES) {
  const roleDir = join(demoRoot, role);
  if (!existsSync(roleDir)) {
    library[role] = [];
    continue;
  }
  library[role] = readdirSync(roleDir)
    .filter((f) => !f.startsWith('.'))
    .filter((f) => statSync(join(roleDir, f)).isFile())
    .filter((f) => exts.has(f.slice(f.lastIndexOf('.')).toLowerCase()))
    .sort()
    .map((f) => `demo/start-129/${role}/${f}`);
}

writeFileSync(
  outFile,
  `// このファイルは自動生成。手で編集しない。
// 再生成: pnpm sync:start-129-demo-assets
// role → public/配下の相対パス一覧(staticFile()にそのまま渡せる)。
// 空配列のroleはStartDemoBackdropが抽象placeholderへフォールバックする。

export const start129DemoAssetLibrary: Record<string, string[]> = ${JSON.stringify(library, null, 2)};
`,
);

let total = 0;
for (const [role, files] of Object.entries(library)) {
  if (files.length > 0) {
    console.log(`✅ ${role}: ${files.length}件`);
  }
  total += files.length;
}
console.log(`\nsrc/data/start129/demoAssetLibrary.generated.ts を更新(計${total}件、無ければ全roleがplaceholder)`);
