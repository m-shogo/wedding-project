import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runWeddingProjectMotionProvenancePreflight} from './wedding-project-motion-provenance-preflight.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'out/handoff/wedding/wedding-davinci-delivery-readiness.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

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

type TransitionActualEvidence = {
  schemaVersion: string;
  authority: string;
  movieId: string;
  palmierTransitionProof?: {
    transitionProofSha256?: string;
    transitionEdgeCount?: number;
    crossDissolveCount?: number;
  };
  review?: {overall?: string};
};

type TransitionGate = {
  current: boolean;
  state: 'CURRENT' | 'BLOCKED';
  evidencePath: string;
  evidenceSha256: string | null;
  proofSha256: string | null;
  edgeCount: number | null;
  crossDissolveCount: number | null;
  reviewOverall: string;
  blocker: string | null;
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

const transitionGate = (movieId: 'opening' | 'profile'): TransitionGate => {
  const evidencePath = join(root, `out/qa/${movieId}-v1-davinci-transition-actual-evidence.json`);
  const result = spawnSync(process.execPath, [
    '--no-warnings',
    join(root, 'scripts/wedding-final-delivery-transition-gate.mts'),
    `--movie=${movieId}`,
  ], {cwd: root, encoding: 'utf8'});
  let evidence: TransitionActualEvidence | null = null;
  if (existsSync(evidencePath)) {
    try { evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as TransitionActualEvidence; }
    catch { evidence = null; }
  }
  const current = result.status === 0;
  return {
    current,
    state: current ? 'CURRENT' : 'BLOCKED',
    evidencePath: rel(evidencePath),
    evidenceSha256: existsSync(evidencePath) ? shaFile(evidencePath) : null,
    proofSha256: evidence?.palmierTransitionProof?.transitionProofSha256 ?? null,
    edgeCount: Number.isInteger(evidence?.palmierTransitionProof?.transitionEdgeCount) ? evidence!.palmierTransitionProof!.transitionEdgeCount! : null,
    crossDissolveCount: Number.isInteger(evidence?.palmierTransitionProof?.crossDissolveCount) ? evidence!.palmierTransitionProof!.crossDissolveCount! : null,
    reviewOverall: evidence?.review?.overall ?? 'NOT_RUN',
    blocker: current ? null : (result.stderr || result.stdout || 'FINAL_DELIVERY_TRANSITION_GATE_BLOCKED').trim().split('\n')[0],
  };
};

const nextGate = (audit: AuditReport, projectMotionState: 'CURRENT' | 'NOT_APPLICABLE' | 'INVALID', transition: TransitionGate) => {
  if (projectMotionState === 'INVALID') return 'REVALIDATE_PROJECT_MOTION_PROVENANCE';
  if (audit.state === 'INVALID') return 'REPAIR_INVALID_BINDING';
  if (audit.state === 'STALE') return 'REBUILD_STALE_BINDING';
  if (audit.state === 'CURRENT_FAIL') return 'FIX_DAVINCI_ACTUAL';
  if (audit.state === 'NOT_RUN' || audit.state === 'CURRENT_NOT_RUN') return 'RUN_MAC_DAVINCI_ACTUAL';
  if (!transition.current) return 'RUN_DAVINCI_TRANSITION_ACTUAL';
  if (!audit.finalApproval.current || !audit.finalApproval.productionReady) return 'RUN_FINAL_DELIVERY_APPROVAL';
  return 'READY';
};

const projectEntry = (
  audit: AuditReport,
  projectMotion: ReturnType<typeof runWeddingProjectMotionProvenancePreflight>,
  transition: TransitionGate,
) => {
  const ready = projectMotion.state !== 'INVALID' && audit.state === 'CURRENT_PASS' && transition.current && audit.finalApproval.current && audit.finalApproval.productionReady;
  return {
    ready,
    handoffIdentitySha256: audit.recovery.sha256,
    sourceRenderSha256: audit.recovery.sourceRenderSha256,
    auditState: audit.state,
    auditCurrent: audit.current,
    mismatches: [...audit.mismatches],
    projectMotion,
    transitionGate: transition,
    transitionActualEvidenceSha256: transition.evidenceSha256,
    transitionProofSha256: transition.proofSha256,
    davinciActualEvidenceSha256: audit.actualEvidence.sha256,
    davinciActualReviewOverall: audit.actualEvidence.reviewOverall,
    finalApprovalSha256: audit.finalApproval.sha256,
    finalApprovalCurrent: audit.finalApproval.current,
    finalApprovalDecision: audit.finalApproval.decision,
    nextGate: nextGate(audit, projectMotion.state, transition),
  };
};

const openingAudit = runAudit('opening-v1-davinci-actual-binding-audit.mts');
const profileAudit = runAudit('profile-v1-davinci-actual-binding-audit.mts');
const openingProjectMotion = runWeddingProjectMotionProvenancePreflight(root, 'opening');
const profileProjectMotion = runWeddingProjectMotionProvenancePreflight(root, 'profile');
const openingTransitionGate = transitionGate('opening');
const profileTransitionGate = transitionGate('profile');
const opening = projectEntry(openingAudit, openingProjectMotion, openingTransitionGate);
const profile = projectEntry(profileAudit, profileProjectMotion, profileTransitionGate);
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
    'TRANSITION_ACTUAL_EVIDENCE_MUST_BIND_TO_SAME_CURRENT_RECOVERY_AS_DAVINCI_FINISHING_EVIDENCE',
    'TRANSITION_ACTUAL_EVIDENCE_SHA_CHANGED => READINESS_SNAPSHOT_STALE',
    'CROSS_DISSOLVE_REQUIRES_HUMAN_DURATION_PRESERVATION_PASS',
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