import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import {isAbsolute, join, relative, resolve} from 'node:path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultSnapshotPath = join(root, 'out/handoff/wedding/wedding-davinci-delivery-readiness.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');

const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const requestedSnapshot = argValue('--snapshot');
const snapshotPath = requestedSnapshot
  ? (isAbsolute(requestedSnapshot) ? requestedSnapshot : resolve(root, requestedSnapshot))
  : defaultSnapshotPath;

type ProjectSnapshot = {
  handoffIdentitySha256: string | null;
  sourceRenderSha256: string | null;
  auditState: string;
  auditCurrent: boolean;
  transitionGate: {current: boolean; state: string};
  transitionActualEvidenceSha256: string | null;
  transitionProofSha256: string | null;
  davinciActualEvidenceSha256: string | null;
  finalApprovalSha256: string | null;
  finalApprovalCurrent: boolean;
  finalApprovalDecision: string;
  nextGate: string;
};

type ReadinessSnapshot = {
  schemaVersion: string;
  authority: string;
  ready: boolean;
  state: string;
  opening: ProjectSnapshot;
  profile: ProjectSnapshot;
};

const liveResult = spawnSync(process.execPath, [
  '--no-warnings',
  join(root, 'scripts/wedding-davinci-delivery-readiness.mts'),
  '--json',
], {cwd: root, encoding: 'utf8'});
if (liveResult.status !== 0) {
  throw new Error(`Live Wedding DaVinci readiness failed: ${liveResult.stderr || liveResult.stdout}`);
}
const live = JSON.parse(liveResult.stdout) as ReadinessSnapshot;

const mismatches: string[] = [];
let snapshot: ReadinessSnapshot | null = null;
let invalid = false;

if (existsSync(snapshotPath)) {
  try {
    snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8')) as ReadinessSnapshot;
  } catch {
    invalid = true;
    mismatches.push('WEDDING_DAVINCI_READINESS_SNAPSHOT_INVALID_JSON');
  }
}

if (snapshot) {
  if (snapshot.schemaVersion !== 'wedding-davinci-delivery-readiness/v1') {
    mismatches.push('WEDDING_DAVINCI_READINESS_SNAPSHOT_SCHEMA');
  }
  if (snapshot.authority !== 'DERIVED_WEDDING_DAVINCI_DELIVERY_READINESS') {
    mismatches.push('WEDDING_DAVINCI_READINESS_SNAPSHOT_AUTHORITY');
  }

  const compareProject = (project: 'opening' | 'profile') => {
    const expected = live[project];
    const carried = snapshot?.[project];
    if (!carried) {
      mismatches.push(`${project.toUpperCase()}_READINESS_SNAPSHOT_MISSING`);
      return;
    }
    const fields: Array<Exclude<keyof ProjectSnapshot, 'transitionGate'>> = [
      'handoffIdentitySha256',
      'sourceRenderSha256',
      'auditState',
      'auditCurrent',
      'transitionActualEvidenceSha256',
      'transitionProofSha256',
      'davinciActualEvidenceSha256',
      'finalApprovalSha256',
      'finalApprovalCurrent',
      'finalApprovalDecision',
      'nextGate',
    ];
    for (const field of fields) {
      if (carried[field] !== expected[field]) {
        mismatches.push(`${project.toUpperCase()}_${String(field).replace(/([A-Z])/g, '_$1').toUpperCase()}_STALE`);
      }
    }
    if (carried.transitionGate?.current !== expected.transitionGate?.current || carried.transitionGate?.state !== expected.transitionGate?.state) {
      mismatches.push(`${project.toUpperCase()}_TRANSITION_GATE_STATE_STALE`);
    }
  };

  compareProject('opening');
  compareProject('profile');
  if (snapshot.ready !== live.ready) mismatches.push('WEDDING_READY_STATE_STALE');
  if (snapshot.state !== live.state) mismatches.push('WEDDING_READINESS_STATE_STALE');
}

const state = invalid
  ? 'INVALID'
  : !snapshot
    ? 'NOT_RUN'
    : mismatches.length > 0
      ? 'STALE'
      : 'CURRENT';

const report = {
  schemaVersion: 'wedding-davinci-delivery-readiness-snapshot-audit/v1',
  authority: 'DERIVED_WEDDING_DAVINCI_READINESS_SNAPSHOT_AUDIT',
  state,
  current: state === 'CURRENT',
  snapshot: {
    path: rel(snapshotPath),
    exists: existsSync(snapshotPath),
    carriedWeddingState: snapshot?.state ?? null,
    carriedReady: snapshot?.ready ?? false,
  },
  live: {
    state: live.state,
    ready: live.ready,
    openingNextGate: live.opening.nextGate,
    profileNextGate: live.profile.nextGate,
    openingTransitionGate: live.opening.transitionGate?.state ?? 'BLOCKED',
    profileTransitionGate: live.profile.transitionGate?.state ?? 'BLOCKED',
  },
  mismatches,
  guardrails: [
    'SNAPSHOT_CURRENT != WEDDING_DELIVERY_READY',
    'OPENING_OR_PROFILE_BINDING_CHANGED => SNAPSHOT_STALE',
    'DAVINCI_ACTUAL_EVIDENCE_CHANGED => SNAPSHOT_STALE',
    'TRANSITION_ACTUAL_EVIDENCE_CHANGED => SNAPSHOT_STALE',
    'TRANSITION_PROOF_CHANGED => SNAPSHOT_STALE',
    'FINAL_APPROVAL_CHANGED => SNAPSHOT_STALE',
    'NOT_RUN != VERIFIED',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
  ],
} as const;

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Wedding DaVinci readiness snapshot: ${report.state} / live=${live.state} / opening=${live.opening.nextGate} / profile=${live.profile.nextGate}`);

if (process.argv.includes('--strict-current') && !report.current) process.exit(1);