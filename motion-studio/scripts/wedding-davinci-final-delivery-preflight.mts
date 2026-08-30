import {spawnSync} from 'node:child_process';
import {isAbsolute, join, resolve} from 'node:path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runWeddingProjectMotionProvenancePreflight} from './wedding-project-motion-provenance-preflight.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultSnapshot = join(root, 'out/handoff/wedding/wedding-davinci-delivery-readiness.json');

const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const requestedSnapshot = argValue('--snapshot');
const snapshotPath = requestedSnapshot
  ? (isAbsolute(requestedSnapshot) ? requestedSnapshot : resolve(root, requestedSnapshot))
  : defaultSnapshot;

const runJson = (script: string, args: string[] = []) => {
  const result = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', script), ...args, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(`${script} failed: ${result.stderr || result.stdout}`);
  return JSON.parse(result.stdout);
};

const live = runJson('wedding-davinci-delivery-readiness.mts');
const snapshotAudit = runJson('wedding-davinci-delivery-readiness-snapshot.mts', ['--snapshot', snapshotPath]);
const projectMotion = {
  opening: runWeddingProjectMotionProvenancePreflight(root, 'opening'),
  profile: runWeddingProjectMotionProvenancePreflight(root, 'profile'),
} as const;

const blockerCodes: string[] = [];
if (snapshotAudit.state === 'NOT_RUN') blockerCodes.push('WEDDING_DAVINCI_SNAPSHOT_REQUIRED');
if (snapshotAudit.state === 'INVALID') blockerCodes.push('WEDDING_DAVINCI_SNAPSHOT_INVALID');
if (snapshotAudit.state === 'STALE') blockerCodes.push('WEDDING_DAVINCI_SNAPSHOT_STALE');
if (projectMotion.opening.state === 'INVALID') blockerCodes.push('OPENING_PROJECT_MOTION_PROVENANCE_NOT_CURRENT');
if (projectMotion.profile.state === 'INVALID') blockerCodes.push('PROFILE_PROJECT_MOTION_PROVENANCE_NOT_CURRENT');
if (!live.opening.ready) blockerCodes.push('OPENING_DAVINCI_DELIVERY_NOT_READY');
if (!live.profile.ready) blockerCodes.push('PROFILE_DAVINCI_DELIVERY_NOT_READY');

const projectMotionCurrent = projectMotion.opening.state !== 'INVALID' && projectMotion.profile.state !== 'INVALID';
const eligible = snapshotAudit.current === true && projectMotionCurrent && live.ready === true && blockerCodes.length === 0;
const state = eligible
  ? 'READY'
  : snapshotAudit.state === 'INVALID'
    ? 'INVALID'
    : snapshotAudit.state === 'STALE'
      ? 'STALE'
      : snapshotAudit.state === 'NOT_RUN'
        ? 'SNAPSHOT_REQUIRED'
        : !projectMotionCurrent
          ? 'PROJECT_MOTION_PREFLIGHT_BLOCKED'
          : 'UPSTREAM_BLOCKED';

const report = {
  schemaVersion: 'wedding-davinci-final-delivery-preflight/v1',
  authority: 'DERIVED_WEDDING_DAVINCI_FINAL_DELIVERY_PREFLIGHT',
  state,
  eligible,
  snapshot: {
    path: snapshotAudit.snapshot.path,
    state: snapshotAudit.state,
    current: snapshotAudit.current,
    mismatches: [...snapshotAudit.mismatches],
  },
  projectMotion,
  opening: {
    ready: live.opening.ready,
    auditState: live.opening.auditState,
    nextGate: live.opening.nextGate,
    handoffIdentitySha256: live.opening.handoffIdentitySha256,
    davinciActualEvidenceSha256: live.opening.davinciActualEvidenceSha256,
    finalApprovalSha256: live.opening.finalApprovalSha256,
  },
  profile: {
    ready: live.profile.ready,
    auditState: live.profile.auditState,
    nextGate: live.profile.nextGate,
    handoffIdentitySha256: live.profile.handoffIdentitySha256,
    davinciActualEvidenceSha256: live.profile.davinciActualEvidenceSha256,
    finalApprovalSha256: live.profile.finalApprovalSha256,
  },
  blockerCodes,
  recovery: eligible ? [] : [
    ...(snapshotAudit.state !== 'CURRENT'
      ? ['node --no-warnings scripts/wedding-davinci-delivery-readiness.mts --write', 'node --no-warnings scripts/wedding-davinci-delivery-readiness-snapshot.mts --strict-current']
      : []),
    ...(projectMotion.opening.state === 'INVALID' ? [projectMotion.opening.command] : []),
    ...(projectMotion.profile.state === 'INVALID' ? [projectMotion.profile.command] : []),
    ...(!live.opening.ready ? [`Opening: complete current gate ${live.opening.nextGate}`] : []),
    ...(!live.profile.ready ? [`Profile: complete current gate ${live.profile.nextGate}`] : []),
  ],
  guardrails: [
    'SNAPSHOT_CURRENT != FINAL_DELIVERY_READY',
    'PROJECT_MOTION_PROVENANCE_MUST_BE_CURRENT_OR_NOT_APPLICABLE_AT_FINAL_DELIVERY',
    'RESOLVE_PROJECT_MOTION_SIDECAR_CHANGED_AFTER_ACTUAL => FINAL_DELIVERY_BLOCKED',
    'FINAL_DELIVERY_READY_REQUIRES_CURRENT_SNAPSHOT_AND_BOTH_MOVIES_READY',
    'NOT_RUN != VERIFIED',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
  ],
} as const;

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Wedding DaVinci final delivery preflight: ${report.state} / Opening=${live.opening.nextGate} / Profile=${live.profile.nextGate}`);

if (process.argv.includes('--strict') && !report.eligible) process.exit(1);
