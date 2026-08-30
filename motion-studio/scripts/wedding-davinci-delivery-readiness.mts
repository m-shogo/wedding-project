import {spawnSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runWeddingProjectMotionProvenancePreflight} from './wedding-project-motion-provenance-preflight.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'out/handoff/wedding/wedding-davinci-delivery-readiness.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');

type AuditReport = {
  state: string;
  current: boolean;
  mismatches: readonly string[];
  recovery: {sha256: string | null; sourceRenderSha256: string | null};
  actualEvidence: {sha256: string | null; reviewOverall: string};
  finalApproval: {
    sha256: string | null;
    current: boolean;
    decision: string;
    productionReady: boolean;
  };
};

const runAudit = (scriptName: string): AuditReport => {
  const result = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', scriptName), '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(`${scriptName} failed: ${result.stderr || result.stdout}`);
  }
  return JSON.parse(result.stdout) as AuditReport;
};

const nextGate = (audit: AuditReport, projectMotionState: 'CURRENT' | 'NOT_APPLICABLE' | 'INVALID') => {
  if (projectMotionState === 'INVALID') return 'REVALIDATE_PROJECT_MOTION_PROVENANCE';
  if (audit.state === 'INVALID') return 'REPAIR_INVALID_BINDING';
  if (audit.state === 'STALE') return 'REBUILD_STALE_BINDING';
  if (audit.state === 'CURRENT_FAIL') return 'FIX_DAVINCI_ACTUAL';
  if (audit.state === 'NOT_RUN' || audit.state === 'CURRENT_NOT_RUN') return 'RUN_MAC_DAVINCI_ACTUAL';
  if (!audit.finalApproval.current || !audit.finalApproval.productionReady) return 'RUN_FINAL_DELIVERY_APPROVAL';
  return 'READY';
};

const projectEntry = (
  audit: AuditReport,
  projectMotion: ReturnType<typeof runWeddingProjectMotionProvenancePreflight>,
) => {
  const ready = projectMotion.state !== 'INVALID' && audit.state === 'CURRENT_PASS' && audit.finalApproval.current && audit.finalApproval.productionReady;
  return {
    ready,
    handoffIdentitySha256: audit.recovery.sha256,
    sourceRenderSha256: audit.recovery.sourceRenderSha256,
    auditState: audit.state,
    auditCurrent: audit.current,
    mismatches: [...audit.mismatches],
    projectMotion,
    davinciActualEvidenceSha256: audit.actualEvidence.sha256,
    davinciActualReviewOverall: audit.actualEvidence.reviewOverall,
    finalApprovalSha256: audit.finalApproval.sha256,
    finalApprovalCurrent: audit.finalApproval.current,
    finalApprovalDecision: audit.finalApproval.decision,
    nextGate: nextGate(audit, projectMotion.state),
  };
};

const openingAudit = runAudit('opening-v1-davinci-actual-binding-audit.mts');
const profileAudit = runAudit('profile-v1-davinci-actual-binding-audit.mts');
const openingProjectMotion = runWeddingProjectMotionProvenancePreflight(root, 'opening');
const profileProjectMotion = runWeddingProjectMotionProvenancePreflight(root, 'profile');
const opening = projectEntry(openingAudit, openingProjectMotion);
const profile = projectEntry(profileAudit, profileProjectMotion);
const ready = opening.ready && profile.ready;

const report = {
  schemaVersion: 'wedding-davinci-delivery-readiness/v1',
  authority: 'DERIVED_WEDDING_DAVINCI_DELIVERY_READINESS',
  ready,
  state: ready ? 'READY' : 'BLOCKED',
  opening,
  profile,
  outputPath: rel(outPath),
  guardrails: [
    'OPENING_AND_PROFILE_MUST_BOTH_BE_READY',
    'PROJECT_MOTION_PROVENANCE_CURRENT_OR_NOT_APPLICABLE_REQUIRED',
    'PROJECT_MOTION_PROVENANCE_DRIFT => REVALIDATE_BEFORE_DELIVERY',
    'HANDOFF_IDENTITY_SHA_CHANGED => REVALIDATE_DAVINCI_ACTUAL',
    'DAVINCI_ACTUAL_EVIDENCE_SHA_CHANGED => REVALIDATE_FINAL_APPROVAL',
    'NOT_RUN != VERIFIED',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
  ],
} as const;

if (process.argv.includes('--write')) {
  mkdirSync(dirname(outPath), {recursive: true});
  writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`);
}

if (process.argv.includes('--json') || process.argv.includes('--write')) console.log(JSON.stringify(report, null, 2));
else console.log(`Wedding DaVinci delivery readiness: ${report.state} / Opening=${opening.nextGate} / Profile=${profile.nextGate}`);

if (process.argv.includes('--strict') && !report.ready) process.exit(1);
