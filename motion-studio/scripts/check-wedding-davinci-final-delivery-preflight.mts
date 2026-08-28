import {spawnSync} from 'node:child_process';
import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const readinessScript = join(root, 'scripts/wedding-davinci-delivery-readiness.mts');
const preflightScript = join(root, 'scripts/wedding-davinci-final-delivery-preflight.mts');
const fixturePath = join(root, 'out/qa/wedding-davinci-final-delivery-preflight-fixture.json');

const run = (script: string, args: string[] = []) => spawnSync(
  process.execPath,
  ['--no-warnings', script, ...args],
  {cwd: root, encoding: 'utf8'},
);

const liveResult = run(readinessScript, ['--json']);
if (liveResult.status !== 0) throw new Error(liveResult.stderr || liveResult.stdout || 'Live readiness failed');
const live = JSON.parse(liveResult.stdout);
mkdirSync(dirname(fixturePath), {recursive: true});
writeFileSync(fixturePath, `${JSON.stringify(live, null, 2)}\n`);

const blockedResult = run(preflightScript, ['--snapshot', fixturePath, '--json']);
if (blockedResult.status !== 0) throw new Error(blockedResult.stderr || blockedResult.stdout || 'Non-strict preflight must report without crashing');
const blocked = JSON.parse(blockedResult.stdout);
if (blocked.snapshot.state !== 'CURRENT') throw new Error(`Fresh fixture must be CURRENT: ${blockedResult.stdout}`);
if (live.ready === false) {
  if (blocked.state !== 'UPSTREAM_BLOCKED' || blocked.eligible !== false) {
    throw new Error(`CURRENT snapshot must not imply delivery-ready: ${blockedResult.stdout}`);
  }
  const strictBlocked = run(preflightScript, ['--snapshot', fixturePath, '--strict']);
  if (strictBlocked.status === 0) throw new Error('Strict final delivery preflight must fail when current live Wedding readiness is blocked');
}

const stale = structuredClone(live);
stale.profile.finalApprovalSha256 = stale.profile.finalApprovalSha256
  ? `${stale.profile.finalApprovalSha256.slice(0, -1)}0`
  : 'synthetic-stale-final-approval-sha';
writeFileSync(fixturePath, `${JSON.stringify(stale, null, 2)}\n`);
const staleResult = run(preflightScript, ['--snapshot', fixturePath, '--json']);
if (staleResult.status !== 0) throw new Error(staleResult.stderr || staleResult.stdout || 'Non-strict stale preflight must report without crashing');
const staleReport = JSON.parse(staleResult.stdout);
if (staleReport.state !== 'STALE' || staleReport.eligible !== false) {
  throw new Error(`Stale transported snapshot must block final delivery: ${staleResult.stdout}`);
}
if (!staleReport.blockerCodes.includes('WEDDING_DAVINCI_SNAPSHOT_STALE')) {
  throw new Error(`Stale snapshot blocker code missing: ${staleResult.stdout}`);
}
const strictStale = run(preflightScript, ['--snapshot', fixturePath, '--strict']);
if (strictStale.status === 0) throw new Error('Strict final delivery preflight must fail for stale snapshot');

rmSync(fixturePath, {force: true});
console.log(`Wedding DaVinci final delivery preflight contract OK: live=${live.state}; CURRENT!=READY is preserved; stale Profile approval SHA fails closed`);
