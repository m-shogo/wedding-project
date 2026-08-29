import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const temp = mkdtempSync(join(tmpdir(), 'wedding-davinci-session-plan-'));
const snapshot = join(temp, 'session-plan.json');
const run = (script: string, args: string[]) => spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', script), ...args], {
  cwd: root,
  encoding: 'utf8',
});

try {
  const write = run('wedding-davinci-actual-session-plan.mts', ['--write', `--output=${snapshot}`]);
  if (write.status !== 0) throw new Error(`plan write failed: ${write.stderr || write.stdout}`);

  const current = run('wedding-davinci-actual-session-plan-snapshot.mts', [`--snapshot=${snapshot}`, '--strict-current', '--json']);
  if (current.status !== 0) throw new Error(`current snapshot rejected: ${current.stderr || current.stdout}`);
  const currentAudit = JSON.parse(current.stdout);
  if (currentAudit.state !== 'CURRENT' || currentAudit.current !== true) throw new Error('fresh transported plan must be CURRENT');
  if (currentAudit.evidenceBoundary?.macDavinciResolveGuiActual !== 'NOT_PROMOTED_BY_SNAPSHOT_AUDIT') throw new Error('snapshot audit Actual boundary mismatch');
  if (currentAudit.evidenceBoundary?.productionReady !== false) throw new Error('snapshot audit must stay productionReady=false');

  const stale = JSON.parse(readFileSync(snapshot, 'utf8'));
  stale.projects.opening.handoffIdentitySha256 = `${stale.projects.opening.handoffIdentitySha256 ?? 'none'}-stale`;
  writeFileSync(snapshot, `${JSON.stringify(stale, null, 2)}\n`);

  const staleCheck = run('wedding-davinci-actual-session-plan-snapshot.mts', [`--snapshot=${snapshot}`, '--strict-current', '--json']);
  if (staleCheck.status === 0) throw new Error('stale transported plan unexpectedly passed strict-current');
  const staleAudit = JSON.parse(staleCheck.stdout);
  if (staleAudit.state !== 'STALE') throw new Error(`expected STALE, got ${staleAudit.state}`);
  if (!staleAudit.mismatches.includes('OPENING_HANDOFFIDENTITYSHA256_STALE')) throw new Error('Opening handoff identity stale reason missing');

  console.log('Wedding DaVinci Actual session plan snapshot contract: PASS');
  console.log('Fresh transported plan: CURRENT');
  console.log('Mutated Opening handoff identity: STALE / strict fail-close');
  console.log('Mac DaVinci GUI Actual promotion: FORBIDDEN');
} finally {
  rmSync(temp, {recursive: true, force: true});
}
