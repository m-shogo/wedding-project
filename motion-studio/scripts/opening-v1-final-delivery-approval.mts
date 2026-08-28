import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const recoveryPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json');
const finalRenderReviewPath = join(studioRoot, 'out/qa/opening-v1-final-render-review.json');
const davinciEvidencePath = join(studioRoot, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const approvalPath = join(studioRoot, 'out/qa/opening-v1-final-delivery-approval.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

type ApprovalDecision = 'HOLD' | 'APPROVE';
type RecoveryBinding = {path: string; sha256: string; sourceRenderSha256: string; cropReviewEvidenceSha256: string; cropReviewBindingFingerprintSha256: string};
type ProductionBundle = {
  schemaVersion: 'opening-v1-production-bundle/v1';
  authority: 'FINAL_RENDER_BOUND_HANDOFF';
  finalRender: {path: string; sha256: string};
  humanCropReview: {evidenceSha256: string; bindingFingerprintSha256: string};
  davinci: {expectedSha256: string; productionReady: false};
};
type RecoverySidecar = {
  schemaVersion: 'wedding-davinci-production-recovery-export/v1';
  authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY';
  sourceBundle: {finalRenderSha256: string; cropReviewEvidenceSha256: string; cropReviewBindingFingerprintSha256: string};
  recovery: {movieId: string; stage: string; artifactPath: string; productionReady: false; actual: {state: string; evidencePath: string}};
};
type FinalRenderReview = {
  schemaVersion: 'opening-v1-final-render-review/v1';
  authority: 'HUMAN_FINAL_RENDER_REVIEW';
  finalRender: {path: string; sha256: string};
  review: {overall: string; reviewer: string | null; reviewedAt: string | null};
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};
type DaVinciEvidence = {
  schemaVersion: 'opening-v1-davinci-finishing-evidence/v1';
  authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE';
  bundle: {path: string; sha256: string};
  productionRecovery: RecoveryBinding;
  sourceRender: {path: string; expectedSha256: string};
  export: {path: string | null; sha256: string | null; watchedWithSound: string};
  review: {overall: string; reviewer: string | null; reviewedAt: string | null};
  productionReady: false;
};
type FinalDeliveryApproval = {
  schemaVersion: 'opening-v1-final-delivery-approval/v1';
  authority: 'HUMAN_FINAL_DELIVERY_APPROVAL';
  boundAt: string;
  productionBundle: {path: string; sha256: string};
  humanFinalRenderReview: {path: string; sha256: string};
  productionRecovery: RecoveryBinding;
  davinciEvidence: {path: string; sha256: string};
  sourceRender: {path: string; sha256: string};
  davinciExport: {path: string; sha256: string};
  decision: ApprovalDecision;
  approver: string | null;
  decidedAt: string | null;
  notes: string;
  productionReady: boolean;
};

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const runNode = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: studioRoot, encoding: 'utf-8'});

function loadCurrentUpstream() {
  if (!existsSync(bundlePath)) throw new Error('FINAL_DELIVERY_BUNDLE_MISSING');
  if (!existsSync(recoveryPath)) throw new Error('FINAL_DELIVERY_RECOVERY_SIDECAR_MISSING');
  if (!existsSync(finalRenderReviewPath)) throw new Error('FINAL_DELIVERY_FINAL_RENDER_REVIEW_MISSING');
  if (!existsSync(davinciEvidencePath)) throw new Error('FINAL_DELIVERY_DAVINCI_EVIDENCE_MISSING');

  const finalReviewStrict = runNode('scripts/opening-v1-final-render-review.mts', ['--strict']);
  if (finalReviewStrict.status !== 0) throw new Error(`FINAL_DELIVERY_HUMAN_FINAL_RENDER_REVIEW_NOT_VERIFIED:${(finalReviewStrict.stdout || finalReviewStrict.stderr || '').trim()}`);
  const upstream = runNode('scripts/opening-v1-davinci-finishing-evidence.mts', ['--strict']);
  if (upstream.status !== 0) throw new Error(`FINAL_DELIVERY_DAVINCI_ACTUAL_NOT_VERIFIED:${(upstream.stdout || upstream.stderr || '').trim()}`);

  const bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as ProductionBundle;
  const recovery = JSON.parse(readFileSync(recoveryPath, 'utf8')) as RecoverySidecar;
  const finalReview = JSON.parse(readFileSync(finalRenderReviewPath, 'utf8')) as FinalRenderReview;
  const davinci = JSON.parse(readFileSync(davinciEvidencePath, 'utf8')) as DaVinciEvidence;
  const recoverySha256 = shaFile(recoveryPath);

  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') throw new Error('FINAL_DELIVERY_BUNDLE_SCHEMA');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') throw new Error('FINAL_DELIVERY_BUNDLE_AUTHORITY');
  if (bundle.davinci.productionReady !== false) throw new Error('FINAL_DELIVERY_UPSTREAM_BUNDLE_MUST_FAIL_CLOSED');
  if (recovery.schemaVersion !== 'wedding-davinci-production-recovery-export/v1' || recovery.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') throw new Error('FINAL_DELIVERY_RECOVERY_CONTRACT');
  if (recovery.recovery?.movieId !== 'opening' || recovery.recovery?.stage !== 'davinciFinishing' || recovery.recovery?.artifactPath !== bundle.finalRender.path) throw new Error('FINAL_DELIVERY_RECOVERY_TARGET_STALE');
  if (recovery.recovery?.productionReady !== false || recovery.recovery?.actual?.state !== 'NOT_RUN' || recovery.recovery?.actual?.evidencePath !== rel(davinciEvidencePath)) throw new Error('FINAL_DELIVERY_RECOVERY_BOUNDARY_INVALID');
  if (recovery.sourceBundle?.finalRenderSha256 !== bundle.finalRender.sha256) throw new Error('FINAL_DELIVERY_RECOVERY_RENDER_STALE');
  if (recovery.sourceBundle?.cropReviewEvidenceSha256 !== bundle.humanCropReview?.evidenceSha256) throw new Error('FINAL_DELIVERY_RECOVERY_CROP_REVIEW_SHA_STALE');
  if (recovery.sourceBundle?.cropReviewBindingFingerprintSha256 !== bundle.humanCropReview?.bindingFingerprintSha256) throw new Error('FINAL_DELIVERY_RECOVERY_CROP_REVIEW_FINGERPRINT_STALE');
  if (finalReview.schemaVersion !== 'opening-v1-final-render-review/v1') throw new Error('FINAL_DELIVERY_FINAL_RENDER_REVIEW_SCHEMA');
  if (finalReview.authority !== 'HUMAN_FINAL_RENDER_REVIEW') throw new Error('FINAL_DELIVERY_FINAL_RENDER_REVIEW_AUTHORITY');
  if (finalReview.productionReady !== false || finalReview.macDaVinciActual !== 'NOT_RUN') throw new Error('FINAL_DELIVERY_FINAL_RENDER_REVIEW_MUST_REMAIN_SEPARATE');
  if (finalReview.review.overall !== 'PASS' || !finalReview.review.reviewer?.trim()) throw new Error('FINAL_DELIVERY_FINAL_RENDER_REVIEW_NOT_PASS');
  if (finalReview.finalRender.path !== bundle.finalRender.path || finalReview.finalRender.sha256 !== bundle.finalRender.sha256) throw new Error('FINAL_DELIVERY_FINAL_RENDER_REVIEW_BINDING_MISMATCH');
  if (davinci.schemaVersion !== 'opening-v1-davinci-finishing-evidence/v1') throw new Error('FINAL_DELIVERY_DAVINCI_SCHEMA');
  if (davinci.authority !== 'MAC_DAVINCI_ACTUAL_EVIDENCE') throw new Error('FINAL_DELIVERY_DAVINCI_AUTHORITY');
  if (davinci.productionReady !== false) throw new Error('FINAL_DELIVERY_DAVINCI_EVIDENCE_MUST_NOT_SELF_PROMOTE');
  if (davinci.productionRecovery?.path !== rel(recoveryPath) || davinci.productionRecovery?.sha256 !== recoverySha256) throw new Error('FINAL_DELIVERY_DAVINCI_RECOVERY_SHA_STALE');
  if (davinci.productionRecovery?.sourceRenderSha256 !== recovery.sourceBundle.finalRenderSha256) throw new Error('FINAL_DELIVERY_DAVINCI_RECOVERY_RENDER_STALE');
  if (davinci.productionRecovery?.cropReviewEvidenceSha256 !== recovery.sourceBundle.cropReviewEvidenceSha256) throw new Error('FINAL_DELIVERY_DAVINCI_RECOVERY_CROP_REVIEW_SHA_STALE');
  if (davinci.productionRecovery?.cropReviewBindingFingerprintSha256 !== recovery.sourceBundle.cropReviewBindingFingerprintSha256) throw new Error('FINAL_DELIVERY_DAVINCI_RECOVERY_CROP_REVIEW_FINGERPRINT_STALE');
  if (davinci.sourceRender.expectedSha256 !== bundle.finalRender.sha256) throw new Error('FINAL_DELIVERY_SOURCE_SHA_CONTRACT_MISMATCH');
  if (!davinci.export.path?.trim() || !davinci.export.sha256?.trim()) throw new Error('FINAL_DELIVERY_DAVINCI_EXPORT_BINDING_MISSING');
  if (davinci.export.watchedWithSound !== 'PASS' || davinci.review.overall !== 'PASS') throw new Error('FINAL_DELIVERY_DAVINCI_HUMAN_REVIEW_NOT_PASS');

  return {bundle, recovery, finalReview, davinci, bundleSha256: shaFile(bundlePath), recoverySha256, finalRenderReviewSha256: shaFile(finalRenderReviewPath), davinciEvidenceSha256: shaFile(davinciEvidencePath)};
}

function initializeApproval() {
  const current = loadCurrentUpstream();
  const approval: FinalDeliveryApproval = {
    schemaVersion: 'opening-v1-final-delivery-approval/v1',
    authority: 'HUMAN_FINAL_DELIVERY_APPROVAL',
    boundAt: new Date().toISOString(),
    productionBundle: {path: rel(bundlePath), sha256: current.bundleSha256},
    humanFinalRenderReview: {path: rel(finalRenderReviewPath), sha256: current.finalRenderReviewSha256},
    productionRecovery: {path: rel(recoveryPath), sha256: current.recoverySha256, sourceRenderSha256: current.recovery.sourceBundle.finalRenderSha256, cropReviewEvidenceSha256: current.recovery.sourceBundle.cropReviewEvidenceSha256, cropReviewBindingFingerprintSha256: current.recovery.sourceBundle.cropReviewBindingFingerprintSha256},
    davinciEvidence: {path: rel(davinciEvidencePath), sha256: current.davinciEvidenceSha256},
    sourceRender: {path: current.bundle.finalRender.path, sha256: current.bundle.finalRender.sha256},
    davinciExport: {path: current.davinci.export.path!, sha256: current.davinci.export.sha256!},
    decision: 'HOLD', approver: null, decidedAt: null, notes: '', productionReady: false,
  };
  mkdirSync(dirname(approvalPath), {recursive: true});
  writeFileSync(approvalPath, `${JSON.stringify(approval, null, 2)}\n`);
  console.log(`Opening V1 final delivery approval initialized: ${rel(approvalPath)}`);
  console.log('decision=HOLD productionReady=false — current recovery chain, Human final-MP4 review and Mac DaVinci Actual export are SHA-bound; final approval remains Human-only.');
}

function verifyApproval(strict: boolean) {
  if (!existsSync(approvalPath)) { console.log('Opening V1 final delivery approval: NOT_RUN (approval file missing)'); if (strict) process.exit(1); return; }
  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  let current: ReturnType<typeof loadCurrentUpstream> | null = null;
  try { current = loadCurrentUpstream(); } catch (error) { fail(error instanceof Error ? error.message : String(error)); }
  let approval: FinalDeliveryApproval | null = null;
  try { approval = JSON.parse(readFileSync(approvalPath, 'utf8')) as FinalDeliveryApproval; } catch { fail('FINAL_DELIVERY_APPROVAL_INVALID_JSON'); }
  if (!approval) { console.log(`Opening V1 final delivery approval: HOLD/BLOCKED (${errors.length})`); for (const error of errors) console.log(`BLOCK / ${error}`); if (strict) process.exit(1); return; }
  if (approval.schemaVersion !== 'opening-v1-final-delivery-approval/v1') fail('FINAL_DELIVERY_APPROVAL_SCHEMA');
  if (approval.authority !== 'HUMAN_FINAL_DELIVERY_APPROVAL') fail('FINAL_DELIVERY_APPROVAL_AUTHORITY');
  if (approval.productionBundle.path !== rel(bundlePath)) fail('FINAL_DELIVERY_APPROVAL_BUNDLE_PATH');
  if (approval.humanFinalRenderReview.path !== rel(finalRenderReviewPath)) fail('FINAL_DELIVERY_APPROVAL_FINAL_RENDER_REVIEW_PATH');
  if (approval.productionRecovery?.path !== rel(recoveryPath)) fail('FINAL_DELIVERY_APPROVAL_RECOVERY_PATH');
  if (approval.davinciEvidence.path !== rel(davinciEvidencePath)) fail('FINAL_DELIVERY_APPROVAL_DAVINCI_EVIDENCE_PATH');
  if (current) {
    if (approval.productionBundle.sha256 !== current.bundleSha256) fail('STALE_FINAL_DELIVERY_BUNDLE_SHA');
    if (approval.humanFinalRenderReview.sha256 !== current.finalRenderReviewSha256) fail('STALE_FINAL_DELIVERY_FINAL_RENDER_REVIEW_SHA');
    if (approval.productionRecovery?.sha256 !== current.recoverySha256) fail('STALE_FINAL_DELIVERY_RECOVERY_SIDECAR');
    if (approval.productionRecovery?.sourceRenderSha256 !== current.recovery.sourceBundle.finalRenderSha256) fail('STALE_FINAL_DELIVERY_RECOVERY_RENDER_SHA');
    if (approval.productionRecovery?.cropReviewEvidenceSha256 !== current.recovery.sourceBundle.cropReviewEvidenceSha256) fail('STALE_FINAL_DELIVERY_RECOVERY_CROP_REVIEW_SHA');
    if (approval.productionRecovery?.cropReviewBindingFingerprintSha256 !== current.recovery.sourceBundle.cropReviewBindingFingerprintSha256) fail('STALE_FINAL_DELIVERY_RECOVERY_CROP_REVIEW_FINGERPRINT');
    if (approval.davinciEvidence.sha256 !== current.davinciEvidenceSha256) fail('STALE_FINAL_DELIVERY_DAVINCI_EVIDENCE_SHA');
    if (approval.sourceRender.path !== current.bundle.finalRender.path || approval.sourceRender.sha256 !== current.bundle.finalRender.sha256) fail('STALE_FINAL_DELIVERY_SOURCE_RENDER');
    if (approval.davinciExport.path !== current.davinci.export.path || approval.davinciExport.sha256 !== current.davinci.export.sha256) fail('STALE_FINAL_DELIVERY_EXPORT');
  }
  const boundAtMs = Date.parse(approval.boundAt);
  const decidedAtMs = approval.decidedAt ? Date.parse(approval.decidedAt) : Number.NaN;
  if (!approval.boundAt || Number.isNaN(boundAtMs)) fail('FINAL_DELIVERY_BOUND_AT_INVALID');
  if (approval.decision !== 'APPROVE') fail(`FINAL_DELIVERY_DECISION_${approval.decision}`);
  if (!approval.approver?.trim()) fail('FINAL_DELIVERY_APPROVER_MISSING');
  if (!approval.decidedAt || Number.isNaN(decidedAtMs)) fail('FINAL_DELIVERY_DECIDED_AT_INVALID');
  else if (!Number.isNaN(boundAtMs) && decidedAtMs < boundAtMs) fail('FINAL_DELIVERY_DECIDED_BEFORE_BINDING');
  if (approval.productionReady !== (approval.decision === 'APPROVE')) fail('FINAL_DELIVERY_PRODUCTION_READY_MUST_MATCH_DECISION');
  if (errors.length > 0) { console.log(`Opening V1 final delivery approval: HOLD/BLOCKED (${errors.length})`); for (const error of errors) console.log(`BLOCK / ${error}`); if (strict) process.exit(1); return; }
  console.log('Opening V1 final delivery approval: APPROVED — current Human final-MP4 review, current crop-bound DaVinci recovery chain, verified Mac DaVinci export and all bound upstream evidence are current.');
  console.log('productionReady=true is valid only for this explicitly human-approved, SHA-bound artifact.');
}

if (mode === 'init') initializeApproval();
else verifyApproval(mode === 'strict');
