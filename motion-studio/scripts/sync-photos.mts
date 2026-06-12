// pnpm sync:photos
// public/photos/ 配下をスキャンして src/data/photoLibrary.generated.ts を再生成する。
// 写真を大量に受け取ったとき、テンプレのphotos欄に入れるパスを手で打たずに済む。
// 実写真はGit管理外だが、このファイル(ファイル名一覧)はGitに入れてよい。

import {readdirSync, statSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const photosRoot = join(studioRoot, 'public/photos');
const outFile = join(studioRoot, 'src/data/photoLibrary.generated.ts');

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const writeLibrary = (lib: Record<string, string[]>): void => {
  const body = `// このファイルは自動生成。手で編集しない。
// 再生成: pnpm sync:photos
// 写真テンプレのphotos欄には、この配列の値をそのまま使える。

export const photoLibrary: Record<string, string[]> = ${JSON.stringify(lib, null, 2)};
`;

  writeFileSync(outFile, body);
};

if (!existsSync(photosRoot)) {
  writeLibrary({});
  console.log('public/photos が無いため空のphotoLibrary.generated.tsを生成');
  process.exit(0);
}

const scanDir = (dir: string): string[] => {
  const abs = join(photosRoot, dir);
  if (!existsSync(abs)) {
    return [];
  }
  return readdirSync(abs)
    .filter((f) => !f.startsWith('.'))
    .filter((f) => statSync(join(abs, f)).isFile())
    .filter((f) => exts.has(f.slice(f.lastIndexOf('.')).toLowerCase()))
    .sort()
    .map((f) => `${dir}/${f}`);
};

const categories = readdirSync(photosRoot)
  .filter((f) => !f.startsWith('.'))
  .filter((f) => statSync(join(photosRoot, f)).isDirectory())
  .sort();

const lib: Record<string, string[]> = {};
for (const c of categories) {
  lib[c] = scanDir(c);
}

writeLibrary(lib);

let total = 0;
for (const [cat, files] of Object.entries(lib)) {
  console.log(`📁 ${cat}: ${files.length}枚`);
  total += files.length;
}
console.log(`\nsrc/data/photoLibrary.generated.ts を更新(計${total}枚)`);
