import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

type MovieId = 'opening' | 'profile';
type FinalApproval = {
  authority?: string;
  productionRecovery?: {path?: string; sha256?: string};
  davinciEvidence?: {path?: string; sha256?: string};
  decision?: string;
  approver?: string | null;
  decidedAt?: string | null;
  productionReady?: boolean;
};
type CompletionReceipt = {
  schemaVersion?: string;
  authority?: string;
  movieId?: string;
  state?: string;
  sourceRecovery?: {path?: string; sha256?: string};
  finishingEvidence?: {path?: string; sha256?: string; reviewOverall?: string};
  transitionActualEvidence?: {path?: string; sha256?: string; reviewOverall?: string; transitionProofSha256?: string};
  binding?: {sameRecoverySha256?: boolean; finishingEvidencePass?: boolean; transitionEvidencePass?: boolean; humanEvidenceCurrent?: boolean};
  evidenceBoundary?: {derivedReceiptOnly?: boolean; performsMacDaVinciGuiActual?: boolean; productionReady?: boolean};
};
type BindingReceipt = {
  schemaVersion: 'wedding-final-approval-completion-binding/v1';
  authority: 'DERIVED_FINAL_APPROVAL_COMPLETION_BINDING';
  movieId: MovieId;
  generatedAt: string;
  state: 'CURRENT';
  finalApproval: {path: string; sha256: string; decision: 'APPROVE'; productionReady: true};
  actualCompletionReceipt: {path: string; sha256: string; transitionProofSha256: string};
  commonRecovery: {sha256: string};
  finishingEvidence: {sha256: string};
  binding: {sameRecoverySha256: true; sameFinishingEvidenceSha256: true; completionEvidenceCurrent: true; finalHumanApprovalCurrent: true};
  evidenceBoundary: {derivedBindingOnly: true; performsMacDaVinciGuiActual: false; performsHumanApproval: false; productionReadyPromotedByThisBinding: false};
};

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (base: string, path: string) => relative(base, path).replaceAll('\\', '/');
const isSha = (value: unknown): value is string => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const pathsFor = (base: string, movieId: MovieId) => ({
  approval: join(base, `out/qa/${movieId}-v1-final-delivery-approval.json`),
  completion: join(base, `out/qa/${movieId}-v1-davinci-actual-completion-receipt.json`),
  binding: join(base, `out/qa/${movieId}-v1-final-approval-completion-binding.json`),
});
const readJson = <T>(path: string, code: string): T => {
  if (!existsSync(path)) throw new Error(`${code}_MISSING`);
  try { return JSON.parse(readFileSync(path, 'utf8')) as T; }
  catch { throw new Error(`${code}_INVALID_JSON`); }
};

function buildBinding(base: string, movieId: MovieId): BindingReceipt {
  const paths = pathsFor(base, movieId);
  const approval = readJson<FinalApproval>(paths.approval, 'FINAL_APPROVAL_COMPLETION_APPROVAL');
  const completion = readJson<CompletionReceipt>(paths.completion, 'FINAL_APPROVAL_COMPLETION_RECEIPT');
  if (approval.authority !== 'HUMAN_FINAL_DELIVERY_APPROVAL') throw new Error('FINAL_APPROVAL_COMPLETION_APPROVAL_AUTHORITY_INVALID');
  if (approval.decision !== 'APPROVE' || approval.productionReady !== true || !approval.approver?.trim() || !approval.decidedAt) throw new Error('FINAL_APPROVAL_COMPLETION_APPROVAL_NOT_CURRENT_PASS');
  if (completion.schemaVersion !== 'wedding-davinci-actual-completion-receipt/v1' || completion.authority !== 'DERIVED_MAC_DAVINCI_ACTUAL_COMPLETION_RECEIPT' || completion.movieId !== movieId || completion.state !== 'CURRENT') throw new Error('FINAL_APPROVAL_COMPLETION_RECEIPT_CONTRACT_INVALID');
  if (completion.binding?.sameRecoverySha256 !== true || completion.binding?.finishingEvidencePass !== true || completion.binding?.transitionEvidencePass !== true || completion.binding?.humanEvidenceCurrent !== true) throw new Error('FINAL_APPROVAL_COMPLETION_RECEIPT_NOT_CURRENT_PASS');
  if (completion.evidenceBoundary?.derivedReceiptOnly !== true || completion.evidenceBoundary?.performsMacDaVinciGuiActual !== false || completion.evidenceBoundary?.productionReady !== false) throw new Error('FINAL_APPROVAL_COMPLETION_RECEIPT_BOUNDARY_INVALID');
  const approvalRecovery = approval.productionRecovery?.sha256;
  const completionRecovery = completion.sourceRecovery?.sha256;
  if (!isSha(approvalRecovery) || approvalRecovery !== completionRecovery) throw new Error('FINAL_APPROVAL_COMPLETION_RECOVERY_SHA_MISMATCH');
  const approvalFinishing = approval.davinciEvidence?.sha256;
  const completionFinishing = completion.finishingEvidence?.sha256;
  if (!isSha(approvalFinishing) || approvalFinishing !== completionFinishing) throw new Error('FINAL_APPROVAL_COMPLETION_FINISHING_EVIDENCE_SHA_MISMATCH');
  const proofSha = completion.transitionActualEvidence?.transitionProofSha256;
  if (!isSha(proofSha)) throw new Error('FINAL_APPROVAL_COMPLETION_TRANSITION_PROOF_SHA_INVALID');
  return {
    schemaVersion: 'wedding-final-approval-completion-binding/v1',
    authority: 'DERIVED_FINAL_APPROVAL_COMPLETION_BINDING',
    movieId,
    generatedAt: new Date().toISOString(),
    state: 'CURRENT',
    finalApproval: {path: rel(base, paths.approval), sha256: shaFile(paths.approval), decision: 'APPROVE', productionReady: true},
    actualCompletionReceipt: {path: rel(base, paths.completion), sha256: shaFile(paths.completion), transitionProofSha256: proofSha},
    commonRecovery: {sha256: approvalRecovery},
    finishingEvidence: {sha256: approvalFinishing},
    binding: {sameRecoverySha256: true, sameFinishingEvidenceSha256: true, completionEvidenceCurrent: true, finalHumanApprovalCurrent: true},
    evidenceBoundary: {derivedBindingOnly: true, performsMacDaVinciGuiActual: false, performsHumanApproval: false, productionReadyPromotedByThisBinding: false},
  };
}

function verifyBinding(base: string, movieId: MovieId, binding: BindingReceipt) {
  if (binding.schemaVersion !== 'wedding-final-approval-completion-binding/v1' || binding.authority !== 'DERIVED_FINAL_APPROVAL_COMPLETION_BINDING' || binding.movieId !== movieId || binding.state !== 'CURRENT') throw new Error('FINAL_APPROVAL_COMPLETION_BINDING_CONTRACT_INVALID');
  if (binding.evidenceBoundary?.derivedBindingOnly !== true || binding.evidenceBoundary?.performsMacDaVinciGuiActual !== false || binding.evidenceBoundary?.performsHumanApproval !== false || binding.evidenceBoundary?.productionReadyPromotedByThisBinding !== false) throw new Error('FINAL_APPROVAL_COMPLETION_BINDING_BOUNDARY_INVALID');
  const current = buildBinding(base, movieId);
  if (binding.finalApproval.path !== current.finalApproval.path || binding.finalApproval.sha256 !== current.finalApproval.sha256) throw new Error('STALE_FINAL_APPROVAL_COMPLETION_FINAL_APPROVAL_SHA');
  if (binding.actualCompletionReceipt.path !== current.actualCompletionReceipt.path || binding.actualCompletionReceipt.sha256 !== current.actualCompletionReceipt.sha256) throw new Error('STALE_FINAL_APPROVAL_COMPLETION_RECEIPT_SHA');
  if (binding.actualCompletionReceipt.transitionProofSha256 !== current.actualCompletionReceipt.transitionProofSha256) throw new Error('STALE_FINAL_APPROVAL_COMPLETION_TRANSITION_PROOF_SHA');
  if (binding.commonRecovery.sha256 !== current.commonRecovery.sha256) throw new Error('STALE_FINAL_APPROVAL_COMPLETION_RECOVERY_SHA');
  if (binding.finishingEvidence.sha256 !== current.finishingEvidence.sha256) throw new Error('STALE_FINAL_APPROVAL_COMPLETION_FINISHING_EVIDENCE_SHA');
  if (binding.binding?.sameRecoverySha256 !== true || binding.binding?.sameFinishingEvidenceSha256 !== true || binding.binding?.completionEvidenceCurrent !== true || binding.binding?.finalHumanApprovalCurrent !== true) throw new Error('FINAL_APPROVAL_COMPLETION_BINDING_FLAGS_INVALID');
}

function verifyCanonicalUpstream(movieId: MovieId) {
  const approvalScript = `scripts/${movieId}-v1-final-delivery-approval.mts`;
  const approval = spawnSync(process.execPath, ['--no-warnings', approvalScript, '--strict'], {cwd: root, encoding: 'utf8'});
  if (approval.status !== 0) throw new Error(`FINAL_APPROVAL_COMPLETION_CANONICAL_APPROVAL_BLOCKED:${(approval.stdout || approval.stderr || '').trim().split('\n')[0]}`);
  const completion = spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-davinci-actual-completion-receipt.mts', `--movie=${movieId}`], {cwd: root, encoding: 'utf8'});
  if (completion.status !== 0) throw new Error(`FINAL_APPROVAL_COMPLETION_CANONICAL_COMPLETION_BLOCKED:${(completion.stderr || completion.stdout || '').trim().split('\n')[0]}`);
}

function writeFixture(base: string, movieId: MovieId) {
  const paths = pathsFor(base, movieId);
  mkdirSync(dirname(paths.approval), {recursive: true});
  const recoverySha = 'a'.repeat(64);
  const finishingSha = 'b'.repeat(64);
  writeFileSync(paths.approval, JSON.stringify({authority:'HUMAN_FINAL_DELIVERY_APPROVAL',productionRecovery:{sha256:recoverySha},davinciEvidence:{sha256:finishingSha},decision:'APPROVE',approver:'human',decidedAt:'2026-09-01T00:00:00.000Z',productionReady:true}));
  writeFileSync(paths.completion, JSON.stringify({schemaVersion:'wedding-davinci-actual-completion-receipt/v1',authority:'DERIVED_MAC_DAVINCI_ACTUAL_COMPLETION_RECEIPT',movieId,state:'CURRENT',sourceRecovery:{sha256:recoverySha},finishingEvidence:{sha256:finishingSha,reviewOverall:'PASS'},transitionActualEvidence:{sha256:'c'.repeat(64),reviewOverall:'PASS',transitionProofSha256:'d'.repeat(64)},binding:{sameRecoverySha256:true,finishingEvidencePass:true,transitionEvidencePass:true,humanEvidenceCurrent:true},evidenceBoundary:{derivedReceiptOnly:true,performsMacDaVinciGuiActual:false,productionReady:false}}));
  return paths;
}

function selfTest() {
  const base = mkdtempSync(join(tmpdir(), 'wedding-final-approval-completion-'));
  try {
    const movieId: MovieId = 'opening';
    const paths = writeFixture(base, movieId);
    const binding = buildBinding(base, movieId);
    verifyBinding(base, movieId, binding);
    const approval = readJson<FinalApproval>(paths.approval, 'SELFTEST_APPROVAL');
    approval.davinciEvidence!.sha256 = 'e'.repeat(64);
    writeFileSync(paths.approval, JSON.stringify(approval));
    let finishingDriftBlocked = false;
    try { verifyBinding(base, movieId, binding); } catch (error) { finishingDriftBlocked = String(error).includes('FINISHING') || String(error).includes('FINAL_APPROVAL'); }
    if (!finishingDriftBlocked) throw new Error('SELFTEST_FINAL_APPROVAL_DRIFT_NOT_BLOCKED');
    writeFixture(base, movieId);
    const fresh = buildBinding(base, movieId);
    const completion = readJson<CompletionReceipt>(paths.completion, 'SELFTEST_COMPLETION');
    completion.transitionActualEvidence!.transitionProofSha256 = 'f'.repeat(64);
    writeFileSync(paths.completion, JSON.stringify(completion));
    let transitionDriftBlocked = false;
    try { verifyBinding(base, movieId, fresh); } catch (error) { transitionDriftBlocked = String(error).includes('COMPLETION') || String(error).includes('TRANSITION'); }
    if (!transitionDriftBlocked) throw new Error('SELFTEST_COMPLETION_DRIFT_NOT_BLOCKED');
    console.log('Wedding final approval completion binding self-test: PASS');
    console.log('finalApprovalDrift=BLOCKED completionProofDrift=BLOCKED guiActual=false humanApprovalPerformed=false');
  } finally { rmSync(base, {recursive: true, force: true}); }
}

if (process.argv.includes('--self-test')) { selfTest(); process.exit(0); }
const movieRaw = argValue('--movie');
if (movieRaw !== 'opening' && movieRaw !== 'profile') throw new Error('Use --movie=opening|profile');
const movieId = movieRaw as MovieId;
const paths = pathsFor(root, movieId);
if (process.argv.includes('--write')) {
  verifyCanonicalUpstream(movieId);
  const binding = buildBinding(root, movieId);
  mkdirSync(dirname(paths.binding), {recursive: true});
  writeFileSync(paths.binding, `${JSON.stringify(binding, null, 2)}\n`);
  console.log(`Wedding final approval completion binding: CURRENT (${movieId})`);
  process.exit(0);
}
const binding = readJson<BindingReceipt>(paths.binding, 'FINAL_APPROVAL_COMPLETION_BINDING');
verifyCanonicalUpstream(movieId);
verifyBinding(root, movieId, binding);
if (process.argv.includes('--json')) console.log(JSON.stringify(binding, null, 2));
else console.log(`Wedding final approval completion binding: CURRENT (${movieId})`);
