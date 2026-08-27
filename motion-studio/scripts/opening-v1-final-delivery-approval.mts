import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const davinciEvidencePath = join(studioRoot, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const approvalPath = join(studioRoot, 'out/qa/opening-v1-final-delivery-approval.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

type ApprovalDecision = 'HOLD' | 'APPROVE';

type ProductionBundle = {
  schemaVersion: 'opening-v1-production-bundle/v1';
  authority: 'FINAL_RENDER_BOUND_HANDOFF';
  finalRender: {path: string; sha256: string};
  davinci: {expectedSha256: string; productionReady: false};
};

type DaVinciEvidence = {
  schemaVersion: 'opening-v1-davinci-finishing-evidence/v1';
  authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE';
  bundle: {path: string; sha256: string};
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
const runNode = (script: string, args: string[] = []) => spawnSync(
  process.execPath,
  ['--no-warnings', script, ...args],
  {cwd: studioRoot, encoding: 'utf-8'},
);

function loadCurrentUpstream() {
  if (!existsSync(bundlePath)) throw new Error('FINAL_DELIVERY_BUNDLE_MISSING');
  if (!existsSync(davinciEvidencePath)) throw new Error('FINAL_DELIVERY_DAVINCI_EVIDENCE_MISSING');

  const upstream = runNode('scripts/opening-v1-davinci-finishing-evidence.mts', ['--strict']);
  if (upstream.status !== 0) {
    throw new Error(`FINAL_DELIVERY_DAVINCI_ACTUAL_NOT_VERIFIED:${(upstream.stdout || upstream.stderr || '').trim()}`);
  }

  const bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as ProductionBundle;
  const davinci = JSON.parse(readFileSync(davinciEvidencePath, 'utf8')) as DaVinciEvidence;
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') throw new Error('FINAL_DELIVERY_BUNDLE_SCHEMA');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') throw new Error('FINAL_DELIVERY_BUNDLE_AUTHORITY');
  if (bundle.davinci.productionReady !== false) throw new Error('FINAL_DELIVERY_UPSTREAM_BUNDLE_MUST_FAIL_CLOSED');
  if (davinci.schemaVersion !== 'opening-v1-davinci-finishing-evidence/v1') throw new Error('FINAL_DELIVERY_DAVINCI_SCHEMA');
  if (davinci.authority !== 'MAC_DAVINCI_ACTUAL_EVIDENCE') throw new Error('FINAL_DELIVERY_DAVINCI_AUTHORITY');
  if (davinci.productionReady !== false) throw new Error('FINAL_DELIVERY_DAVINCI_EVIDENCE_MUST_NOT_SELF_PROMOTE');
  if (davinci.sourceRender.expectedSha256 !== bundle.finalRender.sha256) throw new Error('FINAL_DELIVERY_SOURCE_SHA_CONTRACT_MISMATCH');
  if (!davinci.export.path?.trim() || !davinci.export.sha256?.trim()) throw new Error('FINAL_DELIVERY_DAVINCI_EXPORT_BINDING_MISSING');
  if (davinci.export.watchedWithSound !== 'PASS' || davinci.review.overall !== 'PASS') throw new Error('FINAL_DELIVERY_DAVINCI_HUMAN_REVIEW_NOT_PASS');

  return {
    bundle,
    davinci,
    bundleSha256: shaFile(bundlePath),
    davinciEvidenceSha256: shaFile(davinciEvidencePath),
  };
}

function initializeApproval() {
  const current = loadCurrentUpstream();
  const approval: FinalDeliveryApproval = {
    schemaVersion: 'opening-v1-final-delivery-approval/v1',
    authority: 'HUMAN_FINAL_DELIVERY_APPROVAL',
    boundAt: new Date().toISOString(),
    productionBundle: {path: rel(bundlePath), sha256: current.bundleSha256},
    davinciEvidence: {path: rel(davinciEvidencePath), sha256: current.davinciEvidenceSha256},
    sourceRender: {path: current.bundle.finalRender.path, sha256: current.bundle.finalRender.sha256},
    davinciExport: {path: current.davinci.export.path!, sha256: current.davinci.export.sha256!},
    decision: 'HOLD',
    approver: null,
    decidedAt: null,
    notes: '',
    productionReady: false,
  };
  mkdirSync(dirname(approvalPath), {recursive: true});
  writeFileSync(approvalPath, `${JSON.stringify(approval, null, 2)}\n`);
  console.log(`Opening V1 final delivery approval initialized: ${rel(approvalPath)}`);
  console.log('decision=HOLD productionReady=false — a human must explicitly change the bound artifact after final export review.');
}

function verifyApproval(strict: boolean) {
  if (!existsSync(approvalPath)) {
    console.log('Opening V1 final delivery approval: NOT_RUN (approval file missing)');
    if (strict) process.exit(1);
    return;
  }

  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  let current: ReturnType<typeof loadCurrentUpstream> | null = null;
  try {
    current = loadCurrentUpstream();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }

  let approval: FinalDeliveryApproval | null = null;
  try {
    approval = JSON.parse(readFileSync(approvalPath, 'utf8')) as FinalDeliveryApproval;
  } catch {
    fail('FINAL_DELIVERY_APPROVAL_INVALID_JSON');
  }
  if (!approval) {
    console.log(`Opening V1 final delivery approval: HOLD/BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    if (strict) process.exit(1);
    return;
  }

  if (approval.schemaVersion !== 'opening-v1-final-delivery-approval/v1') fail('FINAL_DELIVERY_APPROVAL_SCHEMA');
  if (approval.authority !== 'HUMAN_FINAL_DELIVERY_APPROVAL') fail('FINAL_DELIVERY_APPROVAL_AUTHORITY');
  if (approval.productionBundle.path !== rel(bundlePath)) fail('FINAL_DELIVERY_APPROVAL_BUNDLE_PATH');
  if (approval.davinciEvidence.path !== rel(davinciEvidencePath)) fail('FINAL_DELIVERY_APPROVAL_DAVINCI_EVIDENCE_PATH');

  if (current) {
    if (approval.productionBundle.sha256 !== current.bundleSha256) fail('STALE_FINAL_DELIVERY_BUNDLE_SHA');
    if (approval.davinciEvidence.sha256 !== current.davinciEvidenceSha256) fail('STALE_FINAL_DELIVERY_DAVINCI_EVIDENCE_SHA');
    if (approval.sourceRender.path !== current.bundle.finalRender.path || approval.sourceRender.sha256 !== current.bundle.finalRender.sha256) {
      fail('STALE_FINAL_DELIVERY_SOURCE_RENDER');
    }
    if (approval.davinciExport.path !== current.davinci.export.path || approval.davinciExport.sha256 !== current.davinci.export.sha256) {
      fail('STALE_FINAL_DELIVERY_EXPORT');
    }
  }

  const boundAtMs = Date.parse(approval.boundAt);
  const decidedAtMs = approval.decidedAt ? Date.parse(approval.decidedAt) : Number.NaN;
  if (!approval.boundAt || Number.isNaN(boundAtMs)) fail('FINAL_DELIVERY_BOUND_AT_INVALID');
  if (approval.decision !== 'APPROVE') fail(`FINAL_DELIVERY_DECISION_${approval.decision}`);
  if (!approval.approver?.trim()) fail('FINAL_DELIVERY_APPROVER_MISSING');
  if (!approval.decidedAt || Number.isNaN(decidedAtMs)) fail('FINAL_DELIVERY_DECIDED_AT_INVALID');
  else if (!Number.isNaN(boundAtMs) && decidedAtMs < boundAtMs) fail('FINAL_DELIVERY_DECIDED_BEFORE_BINDING');
  if (approval.productionReady !== (approval.decision === 'APPROVE')) fail('FINAL_DELIVERY_PRODUCTION_READY_MUST_MATCH_DECISION');

  if (errors.length > 0) {
    console.log(`Opening V1 final delivery approval: HOLD/BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    if (strict) process.exit(1);
    return;
  }

  console.log('Opening V1 final delivery approval: APPROVED — current DaVinci export and all bound upstream evidence are current.');
  console.log('productionReady=true is valid only for this explicitly human-approved, SHA-bound artifact.');
}

if (mode === 'init') initializeApproval();
else verifyApproval(mode === 'strict');
