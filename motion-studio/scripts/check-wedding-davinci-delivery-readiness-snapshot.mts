import {spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const readinessScript = join(root, 'scripts/wedding-davinci-delivery-readiness.mts');
const snapshotAuditScript = join(root, 'scripts/wedding-davinci-delivery-readiness-snapshot.mts');
const fixturePath = join(root, 'out/qa/wedding-davinci-readiness-snapshot-contract-fixture.json');

const run = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});
const liveResult = run(readinessScript, ['--json']);
if (liveResult.status !== 0) throw new Error(liveResult.stderr || liveResult.stdout || 'Live readiness command failed');
const live = JSON.parse(liveResult.stdout);
mkdirSync(dirname(fixturePath), {recursive: true});
writeFileSync(fixturePath, `${JSON.stringify(live, null, 2)}\n`);

const currentResult = run(snapshotAuditScript, ['--snapshot', fixturePath, '--json', '--strict-current']);
if (currentResult.status !== 0) throw new Error(currentResult.stderr || currentResult.stdout || 'Fresh snapshot must be CURRENT');
const current = JSON.parse(currentResult.stdout);
if (current.state !== 'CURRENT' || current.current !== true || current.mismatches.length !== 0) throw new Error(`Fresh readiness snapshot was not CURRENT: ${currentResult.stdout}`);
if (current.snapshot.carriedReady !== live.ready) throw new Error('Snapshot audit changed Wedding ready semantics');
if (!('openingActualCompletionReceiptSha256' in current.live) || !('openingFinalApprovalCompletionBindingSha256' in current.live)) throw new Error('Snapshot audit must expose completion receipt and final binding SHAs');

const mutateAndExpect = (label: string, mutate: (snapshot: any) => void, mismatch: string) => {
  const candidate = JSON.parse(JSON.stringify(live));
  mutate(candidate);
  writeFileSync(fixturePath, `${JSON.stringify(candidate, null, 2)}\n`);
  const result = run(snapshotAuditScript, ['--snapshot', fixturePath, '--json']);
  if (result.status !== 0) throw new Error(`${label}: non-strict stale audit should report, not crash: ${result.stderr || result.stdout}`);
  const report = JSON.parse(result.stdout);
  if (report.state !== 'STALE' || report.current !== false || !report.mismatches.includes(mismatch)) throw new Error(`${label}: expected ${mismatch}: ${result.stdout}`);
  const strict = run(snapshotAuditScript, ['--snapshot', fixturePath, '--strict-current']);
  if (strict.status === 0) throw new Error(`${label}: strict-current must fail closed`);
};

mutateAndExpect('recovery drift', (snapshot) => {
  snapshot.opening.handoffIdentitySha256 = snapshot.opening.handoffIdentitySha256
    ? `${snapshot.opening.handoffIdentitySha256.slice(0, -1)}0`
    : 'synthetic-stale-recovery-sha';
}, 'OPENING_HANDOFF_IDENTITY_SHA256_STALE');

mutateAndExpect('Actual completion receipt drift', (snapshot) => {
  snapshot.opening.davinciActualCompletionReceiptSha256 = snapshot.opening.davinciActualCompletionReceiptSha256
    ? `${snapshot.opening.davinciActualCompletionReceiptSha256.slice(0, -1)}0`
    : 'synthetic-stale-completion-receipt-sha';
}, 'OPENING_DAVINCI_ACTUAL_COMPLETION_RECEIPT_SHA256_STALE');

mutateAndExpect('final approval completion binding drift', (snapshot) => {
  snapshot.profile.finalApprovalCompletionBindingSha256 = snapshot.profile.finalApprovalCompletionBindingSha256
    ? `${snapshot.profile.finalApprovalCompletionBindingSha256.slice(0, -1)}0`
    : 'synthetic-stale-final-binding-sha';
}, 'PROFILE_FINAL_APPROVAL_COMPLETION_BINDING_SHA256_STALE');

const gateDrift = JSON.parse(JSON.stringify(live));
gateDrift.opening.approvalCompletionGate = {...gateDrift.opening.approvalCompletionGate, current: !gateDrift.opening.approvalCompletionGate.current};
writeFileSync(fixturePath, `${JSON.stringify(gateDrift, null, 2)}\n`);
const gateResult = run(snapshotAuditScript, ['--snapshot', fixturePath, '--json']);
if (gateResult.status !== 0) throw new Error(gateResult.stderr || gateResult.stdout || 'Gate drift audit should report, not crash');
const gateReport = JSON.parse(gateResult.stdout);
if (gateReport.state !== 'STALE' || !gateReport.mismatches.includes('OPENING_FINAL_APPROVAL_COMPLETION_GATE_STATE_STALE')) throw new Error(`Final approval completion gate drift must stale snapshot: ${gateResult.stdout}`);

rmSync(fixturePath, {force: true});
console.log(`Wedding DaVinci readiness snapshot contract OK: live=${live.state}; CURRENT snapshot passes; recovery/completion receipt/final binding/gate drift fail closed`);
