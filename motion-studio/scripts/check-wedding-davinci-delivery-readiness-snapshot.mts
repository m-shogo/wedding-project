import {spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const readinessScript = join(root, 'scripts/wedding-davinci-delivery-readiness.mts');
const snapshotAuditScript = join(root, 'scripts/wedding-davinci-delivery-readiness-snapshot.mts');
const fixturePath = join(root, 'out/qa/wedding-davinci-readiness-snapshot-contract-fixture.json');

const run = (script: string, args: string[] = []) => spawnSync(
  process.execPath,
  ['--no-warnings', script, ...args],
  {cwd: root, encoding: 'utf8'},
);

const liveResult = run(readinessScript, ['--json']);
if (liveResult.status !== 0) throw new Error(liveResult.stderr || liveResult.stdout || 'Live readiness command failed');
const live = JSON.parse(liveResult.stdout);
mkdirSync(dirname(fixturePath), {recursive: true});
writeFileSync(fixturePath, `${JSON.stringify(live, null, 2)}\n`);

const currentResult = run(snapshotAuditScript, ['--snapshot', fixturePath, '--json', '--strict-current']);
if (currentResult.status !== 0) throw new Error(currentResult.stderr || currentResult.stdout || 'Fresh snapshot must be CURRENT');
const current = JSON.parse(currentResult.stdout);
if (current.state !== 'CURRENT' || current.current !== true || current.mismatches.length !== 0) {
  throw new Error(`Fresh readiness snapshot was not CURRENT: ${currentResult.stdout}`);
}
if (current.snapshot.carriedReady !== live.ready) throw new Error('Snapshot audit changed Wedding ready semantics');

const stale = JSON.parse(readFileSync(fixturePath, 'utf8'));
stale.opening.handoffIdentitySha256 = stale.opening.handoffIdentitySha256
  ? `${stale.opening.handoffIdentitySha256.slice(0, -1)}0`
  : 'synthetic-stale-recovery-sha';
writeFileSync(fixturePath, `${JSON.stringify(stale, null, 2)}\n`);

const staleResult = run(snapshotAuditScript, ['--snapshot', fixturePath, '--json']);
if (staleResult.status !== 0) throw new Error(staleResult.stderr || staleResult.stdout || 'Non-strict stale audit should report, not crash');
const staleReport = JSON.parse(staleResult.stdout);
if (staleReport.state !== 'STALE' || staleReport.current !== false) {
  throw new Error(`Mutated snapshot must be STALE: ${staleResult.stdout}`);
}
if (!staleReport.mismatches.includes('OPENING_HANDOFF_IDENTITY_SHA256_STALE')) {
  throw new Error(`Expected Opening handoff identity mismatch: ${staleResult.stdout}`);
}
const staleStrictResult = run(snapshotAuditScript, ['--snapshot', fixturePath, '--strict-current']);
if (staleStrictResult.status === 0) throw new Error('Strict-current must fail closed for stale transported snapshot');

rmSync(fixturePath, {force: true});
console.log(`Wedding DaVinci readiness snapshot contract OK: live=${live.state}; CURRENT snapshot passes; mutated Opening recovery SHA fails closed`);
