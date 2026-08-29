import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const recoveryPath = join(root, 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json');
const evidencePath = join(root, 'out/qa/profile-v1-davinci-finishing-evidence.json');
const approvalPath = join(root, 'out/qa/profile-v1-final-delivery-approval.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

type AuditState = 'NOT_RUN' | 'CURRENT_NOT_RUN' | 'CURRENT_PASS' | 'CURRENT_FAIL' | 'STALE' | 'INVALID';
const mismatches: string[] = [];
let recovery: any = null;
let evidence: any = null;
let approval: any = null;
let recoverySha256: string | null = null;
let evidenceSha256: string | null = null;
let approvalSha256: string | null = null;
let invalid = false;

if (existsSync(recoveryPath)) {
  recoverySha256 = sha(recoveryPath);
  try { recovery = JSON.parse(readFileSync(recoveryPath, 'utf8')); }
  catch { invalid = true; mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_INVALID_JSON'); }
}
if (existsSync(evidencePath)) {
  evidenceSha256 = sha(evidencePath);
  try { evidence = JSON.parse(readFileSync(evidencePath, 'utf8')); }
  catch { invalid = true; mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_EVIDENCE_INVALID_JSON'); }
}
if (existsSync(approvalPath)) {
  approvalSha256 = sha(approvalPath);
  try { approval = JSON.parse(readFileSync(approvalPath, 'utf8')); }
  catch { invalid = true; mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_INVALID_JSON'); }
}

if (recovery) {
  if (recovery.schemaVersion !== 'wedding-davinci-production-recovery-export/v1') mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_SCHEMA');
  if (recovery.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_AUTHORITY');
  if (recovery.recovery?.movieId !== 'profile' || recovery.recovery?.stage !== 'davinciFinishing') mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_TARGET');
  if (recovery.recovery?.productionReady !== false) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_READINESS_BOUNDARY');
}

if (evidence) {
  if (evidence.schemaVersion !== 'profile-v1-davinci-finishing-evidence/v1') mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_EVIDENCE_SCHEMA');
  if (evidence.authority !== 'MAC_DAVINCI_ACTUAL_EVIDENCE') mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_EVIDENCE_AUTHORITY');
  if (evidence.productionReady !== false) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_EVIDENCE_READINESS_BOUNDARY');
  if (evidence.productionRecovery?.path !== rel(recoveryPath)) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_PATH_STALE');
  if (!recoverySha256 || evidence.productionRecovery?.sha256 !== recoverySha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RECOVERY_SHA_STALE');
  if (recovery) {
    if (evidence.productionRecovery?.sourceRenderSha256 !== recovery.sourceBundle?.finalRenderSha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_RENDER_SHA_STALE');
    if (evidence.productionRecovery?.realMediaHumanQaEvidenceSha256 !== recovery.sourceBundle?.realMediaHumanQaEvidenceSha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_HUMAN_QA_SHA_STALE');
    if (evidence.productionRecovery?.realMediaHumanQaBindingFingerprintSha256 !== recovery.sourceBundle?.realMediaHumanQaBindingFingerprintSha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_HUMAN_QA_FINGERPRINT_STALE');
  }
}

if (approval) {
  if (approval.schemaVersion !== 'profile-v1-final-delivery-approval/v1' || approval.authority !== 'HUMAN_FINAL_DELIVERY_APPROVAL') mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_CONTRACT');
  if (approval.productionRecovery?.path !== rel(recoveryPath)) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_RECOVERY_PATH_STALE');
  if (!recoverySha256 || approval.productionRecovery?.sha256 !== recoverySha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_RECOVERY_SHA_STALE');
  if (!evidenceSha256 || approval.davinciEvidence?.sha256 !== evidenceSha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_EVIDENCE_SHA_STALE');
  if (recovery) {
    if (approval.productionRecovery?.sourceRenderSha256 !== recovery.sourceBundle?.finalRenderSha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_RENDER_SHA_STALE');
    if (approval.productionRecovery?.realMediaHumanQaEvidenceSha256 !== recovery.sourceBundle?.realMediaHumanQaEvidenceSha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_HUMAN_QA_SHA_STALE');
    if (approval.productionRecovery?.realMediaHumanQaBindingFingerprintSha256 !== recovery.sourceBundle?.realMediaHumanQaBindingFingerprintSha256) mismatches.push('PROFILE_DAVINCI_ACTUAL_AUDIT_APPROVAL_HUMAN_QA_FINGERPRINT_STALE');
  }
}

const qaValues = evidence ? [
  evidence.sourceRender?.shaMatch,
  evidence.resolve?.timelineInsertion,
  evidence.resolve?.durationAndFps,
  evidence.finishing?.color,
  evidence.finishing?.audio,
  evidence.finishing?.titleSafeAndFraming,
  evidence.finishing?.playback1x,
  evidence.finishing?.playbackHalfSpeed,
  evidence.export?.duration,
  evidence.export?.dimensions,
  evidence.export?.fps,
  evidence.export?.audioPresent,
  evidence.export?.watchedWithSound,
  evidence.review?.overall,
] : [];
const hasFail = qaValues.includes('FAIL');
const allPass = qaValues.length > 0 && qaValues.every((value) => value === 'PASS');
const allNotRun = qaValues.length > 0 && qaValues.every((value) => value === 'NOT_RUN');

let state: AuditState;
if (invalid) state = 'INVALID';
else if (!evidence) state = 'NOT_RUN';
else if (!recovery || mismatches.length > 0) state = 'STALE';
else if (allPass) state = 'CURRENT_PASS';
else if (hasFail) state = 'CURRENT_FAIL';
else state = 'CURRENT_NOT_RUN';

const approvalCurrent = Boolean(
  approval && recoverySha256 && evidenceSha256 &&
  approval.productionRecovery?.sha256 === recoverySha256 &&
  approval.davinciEvidence?.sha256 === evidenceSha256 &&
  approval.productionRecovery?.sourceRenderSha256 === recovery?.sourceBundle?.finalRenderSha256 &&
  approval.productionRecovery?.realMediaHumanQaEvidenceSha256 === recovery?.sourceBundle?.realMediaHumanQaEvidenceSha256 &&
  approval.productionRecovery?.realMediaHumanQaBindingFingerprintSha256 === recovery?.sourceBundle?.realMediaHumanQaBindingFingerprintSha256
);

const report = {
  schemaVersion: 'profile-v1-davinci-actual-binding-audit/v1',
  authority: 'DERIVED_DAVINCI_ACTUAL_BINDING_AUDIT',
  state,
  current: state === 'CURRENT_NOT_RUN' || state === 'CURRENT_PASS' || state === 'CURRENT_FAIL',
  productionReady: false,
  recovery: {
    path: rel(recoveryPath),
    exists: existsSync(recoveryPath),
    sha256: recoverySha256,
    sourceRenderSha256: recovery?.sourceBundle?.finalRenderSha256 ?? null,
    realMediaHumanQaEvidenceSha256: recovery?.sourceBundle?.realMediaHumanQaEvidenceSha256 ?? null,
    realMediaHumanQaBindingFingerprintSha256: recovery?.sourceBundle?.realMediaHumanQaBindingFingerprintSha256 ?? null,
  },
  actualEvidence: {
    path: rel(evidencePath),
    exists: existsSync(evidencePath),
    sha256: evidenceSha256,
    boundAt: evidence?.boundAt ?? null,
    boundRecoverySha256: evidence?.productionRecovery?.sha256 ?? null,
    boundSourceRenderSha256: evidence?.productionRecovery?.sourceRenderSha256 ?? null,
    boundRealMediaHumanQaEvidenceSha256: evidence?.productionRecovery?.realMediaHumanQaEvidenceSha256 ?? null,
    boundRealMediaHumanQaBindingFingerprintSha256: evidence?.productionRecovery?.realMediaHumanQaBindingFingerprintSha256 ?? null,
    reviewOverall: evidence?.review?.overall ?? 'NOT_RUN',
    reviewer: evidence?.review?.reviewer ?? null,
    allChecksPass: allPass,
    allChecksNotRun: allNotRun,
  },
  finalApproval: {
    path: rel(approvalPath),
    exists: existsSync(approvalPath),
    sha256: approvalSha256,
    current: approvalCurrent,
    decision: approval?.decision ?? 'NOT_RUN',
    productionReady: approval?.productionReady === true,
    boundRecoverySha256: approval?.productionRecovery?.sha256 ?? null,
    boundDavinciEvidenceSha256: approval?.davinciEvidence?.sha256 ?? null,
  },
  mismatches,
  guardrails: [
    'ACTUAL_EVIDENCE_EXISTS != MAC_DAVINCI_ACTUAL_VERIFIED',
    'RECOVERY_SIDECAR_CHANGED => ACTUAL_EVIDENCE_STALE',
    'SOURCE_RENDER_CHANGED => ACTUAL_EVIDENCE_STALE',
    'PROFILE_REAL_MEDIA_HUMAN_QA_CHANGED => ACTUAL_EVIDENCE_STALE',
    'ACTUAL_EVIDENCE_OR_RECOVERY_CHANGED => FINAL_APPROVAL_STALE',
    'CURRENT_PASS != FINAL_DELIVERY_APPROVED',
  ],
} as const;

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Profile DaVinci Actual binding audit: ${report.state} / approvalCurrent=${report.finalApproval.current} / mismatches=${mismatches.length}`);
if (process.argv.includes('--strict-current') && !report.current) process.exit(1);
