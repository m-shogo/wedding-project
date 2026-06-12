// pnpm check:assets
// assets.tsに登録された素材の実ファイル存在を検証する。
// 解決ルール:
//   public/... out/... → motion-studio/ 相対
//   ../...             → リポジトリルート相対
//   ~ or /             → ローカル絶対(external前提。チェック対象外)
// status別の扱い:
//   ready/placeholder → 存在しなければエラー
//   missing           → 入手待ちとして情報表示のみ
//   external          → スキップ

import {existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assets} from '../src/data/assets.ts';
import {openingProject} from '../src/data/openingProject.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
let errors = 0;

const resolvePath = (p: string): string | null => {
  if (p.startsWith('~') || p.startsWith('/')) {
    return null;
  }
  return resolve(studioRoot, p);
};

console.log(`素材レジストリ: ${Object.keys(assets).length}件\n`);

for (const asset of Object.values(assets)) {
  const abs = resolvePath(asset.path);
  if (asset.status === 'external') {
    console.log(`ℹ️  [external] ${asset.id} — repo外管理 (${asset.path})`);
    continue;
  }
  if (asset.status === 'missing') {
    console.log(`ℹ️  [missing ] ${asset.id} — 入手待ち${asset.note ? `: ${asset.note}` : ''}`);
    continue;
  }
  if (abs === null) {
    errors++;
    console.error(
      `❌ [${asset.status}] ${asset.id} — 絶対パスはexternal以外で使わない (${asset.path})`,
    );
    continue;
  }
  if (existsSync(abs)) {
    console.log(`✅ [${asset.status}] ${asset.id} — ${asset.path}`);
  } else {
    errors++;
    console.error(
      `❌ [${asset.status}] ${asset.id} — ファイルが無い: ${asset.path}\n` +
        `   → render系なら書き出しコマンドを実行、写真なら配置するか statusをmissingに変える`,
    );
  }
}

// シーンから参照されていない素材(掃除の参考)
const used = new Set(openingProject.scenes.flatMap((s) => s.assets));
const unused = Object.keys(assets).filter(
  (id) => !used.has(id) && assets[id].type !== 'render',
);
if (unused.length > 0) {
  console.log(`\nℹ️  どのシーンからも参照されていない素材(render以外): ${unused.join(', ')}`);
}

console.log('');
if (errors > 0) {
  console.error(`check:assets 失敗 — エラー${errors}件`);
  process.exit(1);
}
console.log('check:assets 成功');
