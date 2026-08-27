// generated.ts idempotency-on-resync テスト(P0-D、軽量)。
//
// 同一TimingMasterから pnpm sync:timing-master を2回連続実行し、
// 生成される generated.ts のバイト内容が完全一致することを確認する。
// (generated.meta.json は generatedAt タイムスタンプを含むため意図的に
// 比較対象から除外する。)
//
// 目的: 再sync時にTimingが微妙に動く事故(浮動小数点丸めの非決定性、
// Mapの反復順序への依存、Date.now()等の混入)を検出する。
//
// 実行: node --no-warnings scripts/test-generated-idempotency.mts

import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const generatedPath = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');

const hashOf = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

const runSync = () => {
  execFileSync('node', ['--no-warnings', 'scripts/sync-start-wedding-timing-master.mts'], {cwd: studioRoot, stdio: 'pipe'});
};

console.log('[test-generated-idempotency] 1回目のsyncを実行...');
runSync();
const hashA = hashOf(generatedPath);

console.log('[test-generated-idempotency] 2回目のsyncを実行...');
runSync();
const hashB = hashOf(generatedPath);

if (hashA !== hashB) {
  console.error(`❌ generated-idempotency: FAIL(同一masterからのsyncが決定的でない)`);
  console.error(`  1回目 sha256=${hashA}`);
  console.error(`  2回目 sha256=${hashB}`);
  process.exit(1);
}
console.log(`✅ generated-idempotency: PASS(2回のsync結果が完全一致。sha256=${hashA.slice(0, 16)}...)`);
