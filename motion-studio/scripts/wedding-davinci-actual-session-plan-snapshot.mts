import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, isAbsolute, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const requested = argValue('--snapshot');
const snapshotPath = requested
  ? (isAbsolute(requested) ? requested : resolve(root, requested))
  : join(root, 'out/handoff/wedding/wedding-davinci-actual-session-plan.json');

const liveResult = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/wedding-davinci-actual-session-plan.mts'), '--json'], {
  cwd: root,
  encoding: 'utf8',
});
if (liveResult.status !== 0) throw new Error(`live session plan failed: ${liveResult.stderr || liveResult.stdout}`);
const live = JSON.parse(liveResult.stdout);

type SnapshotState = 'NOT_RUN' | 'CURRENT' | 'STALE' | 'INVALID';
const mismatches: string[] = [];
let state: SnapshotState = 'NOT_RUN';
let transported: any = null;

const computeTransportIdentity = (plan: Record<string, any>) => {
  const {transportIdentitySha256: _ignored, ...body} = plan;
  return createHash('sha256').update(JSON.stringify(body)).digest('hex');
};

if (existsSync(snapshotPath)) {
  try {
    transported = JSON.parse(readFileSync(snapshotPath, 'utf8'));
    if (transported.schemaVersion !== live.schemaVersion || transported.authority !== live.authority) {
      state = 'INVALID';
      mismatches.push('SESSION_PLAN_CONTRACT_MISMATCH');
    } else if (transported.evidenceBoundary?.productionReady !== false) {
      state = 'INVALID';
      mismatches.push('SESSION_PLAN_EVIDENCE_BOUNDARY_INVALID');
    } else if (typeof transported.transportIdentitySha256 !== 'string') {
      state = 'INVALID';
      mismatches.push('SESSION_PLAN_TRANSPORT_IDENTITY_MISSING');
    } else if (computeTransportIdentity(transported) !== transported.transportIdentitySha256) {
      state = 'INVALID';
      mismatches.push('SESSION_PLAN_TRANSPORT_IDENTITY_INVALID');
    } else {
      if (transported.transportIdentitySha256 !== live.transportIdentitySha256) {
        mismatches.push('SESSION_PLAN_TRANSPORT_IDENTITY_STALE');
      }
      for (const movieId of ['opening', 'profile'] as const) {
        const oldProject = transported.projects?.[movieId];
        const currentProject = live.projects?.[movieId];
        if (!oldProject || !currentProject) {
          mismatches.push(`${movieId.toUpperCase()}_PROJECT_MISSING`);
          continue;
        }
        const fields = [
          'handoffIdentitySha256',
          'expectedDavinciActualEvidenceSha256',
          'currentNextGate',
          'sessionState',
        ] as const;
        for (const field of fields) {
          if (oldProject[field] !== currentProject[field]) mismatches.push(`${movieId.toUpperCase()}_${field.toUpperCase()}_STALE`);
        }
        if (oldProject.actualEvidence?.recoverySha256 !== currentProject.actualEvidence?.recoverySha256) {
          mismatches.push(`${movieId.toUpperCase()}_ACTUAL_RECOVERY_SHA_STALE`);
        }
      }
      state = mismatches.length === 0 ? 'CURRENT' : 'STALE';
    }
  } catch {
    state = 'INVALID';
    mismatches.push('SESSION_PLAN_INVALID_JSON');
  }
}

const audit = {
  schemaVersion: 'wedding-davinci-actual-session-plan-snapshot/v1',
  authority: 'TRANSPORTED_DAVINCI_ACTUAL_SESSION_PLAN_AUDIT',
  state,
  current: state === 'CURRENT',
  snapshotPath: snapshotPath.startsWith(root) ? snapshotPath.slice(root.length + 1) : snapshotPath,
  transportedIdentitySha256: transported?.transportIdentitySha256 ?? null,
  liveIdentitySha256: live.transportIdentitySha256 ?? null,
  mismatches,
  evidenceBoundary: {
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_SNAPSHOT_AUDIT',
    productionReady: false,
  },
} as const;

if (process.argv.includes('--json')) console.log(JSON.stringify(audit, null, 2));
else {
  console.log(`Wedding DaVinci Actual session plan snapshot: ${audit.state}`);
  for (const mismatch of audit.mismatches) console.log(`BLOCK / ${mismatch}`);
}

if (process.argv.includes('--strict-current') && !audit.current) process.exit(1);
