import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';

type MovieId = 'opening' | 'profile';
type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type DurationState = QaState | 'NOT_APPLICABLE';

type FinishingEvidence = {
  authority?: string;
  productionRecovery?: {path?: string; sha256?: string};
  sourceRender?: {shaMatch?: QaState};
  resolve?: {timelineInsertion?: QaState; durationAndFps?: QaState};
  finishing?: {color?: QaState; audio?: QaState; titleSafeAndFraming?: QaState; playback1x?: QaState; playbackHalfSpeed?: QaState};
  export?: {duration?: QaState; dimensions?: QaState; fps?: QaState; audioPresent?: QaState; watchedWithSound?: QaState};
  review?: {overall?: QaState; reviewer?: string | null; reviewedAt?: string | null};
  productionReady?: boolean;
};

type TransitionEvidence = {
  schemaVersion?: string;
  authority?: string;
  movieId?: MovieId;
  sourceRecovery?: {path?: string; sha256?: string};
  palmierTransitionProof?: {transitionProofSha256?: string; transitionEdgeCount?: number; crossDissolveCount?: number};
  edges?: Array<{edgeId?: string; transition?: 'HARD_CUT' | 'CROSS_DISSOLVE'; durationFrames?: number; actual?: {preservation?: QaState; durationPreserved?: DurationState}}>; 
  review?: {overall?: QaState; reviewer?: string | null; reviewedAt?: string | null};
  macDaVinciActual?: 'NOT_RUN';
  productionReady?: boolean;
};

type CompletionReceipt = {
  schemaVersion: 'wedding-davinci-actual-completion-receipt/v1';
  authority: 'DERIVED_MAC_DAVINCI_ACTUAL_COMPLETION_RECEIPT';
  movieId: MovieId;
  generatedAt: string;
  state: 'CURRENT';
  sourceRecovery: {path: string; sha256: string};
  finishingEvidence: {path: string; sha256: string; reviewOverall: 'PASS'};
  transitionActualEvidence: {path: string; sha256: string; reviewOverall: 'PASS'; transitionProofSha256: string; transitionEdgeCount: number; crossDissolveCount: number};
  binding: {sameRecoverySha256: true; finishingEvidencePass: true; transitionEvidencePass: true; humanEvidenceCurrent: true};
  evidenceBoundary: {derivedReceiptOnly: true; performsMacDaVinciGuiActual: false; macDaVinciActualWasHumanRecorded: true; productionReady: false};
};

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const sha = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const shaFile = (path: string) => sha(readFileSync(path));
const rel = (base: string, path: string) => relative(base, path).replaceAll('\\', '/');
const isSha = (value: unknown): value is string => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const pathsFor = (base: string, movieId: MovieId) => ({
  recovery: join(base, `out/handoff/${movieId}-v1/${movieId}-v1-davinci-production-recovery.json`),
  finishing: join(base, `out/qa/${movieId}-v1-davinci-finishing-evidence.json`),
  transition: join(base, `out/qa/${movieId}-v1-davinci-transition-actual-evidence.json`),
  receipt: join(base, `out/qa/${movieId}-v1-davinci-actual-completion-receipt.json`),
});
const readJson = <T>(path: string, code: string): T => {
  if (!existsSync(path)) throw new Error(`${code}_MISSING`);
  try { return JSON.parse(readFileSync(path, 'utf8')) as T; } catch { throw new Error(`${code}_INVALID_JSON`); }
};
const finishingVerdicts = (e: FinishingEvidence) => [e.sourceRender?.shaMatch, e.resolve?.timelineInsertion, e.resolve?.durationAndFps, e.finishing?.color, e.finishing?.audio, e.finishing?.titleSafeAndFraming, e.finishing?.playback1x, e.finishing?.playbackHalfSpeed, e.export?.duration, e.export?.dimensions, e.export?.fps, e.export?.audioPresent, e.export?.watchedWithSound];

function verifyFinishing(e: FinishingEvidence, recoverySha: string) {
  if (e.authority !== 'MAC_DAVINCI_ACTUAL_EVIDENCE') throw new Error('DAVINCI_COMPLETION_FINISHING_AUTHORITY_INVALID');
  if (e.productionReady !== false) throw new Error('DAVINCI_COMPLETION_FINISHING_MUST_NOT_SELF_PROMOTE');
  if (e.productionRecovery?.sha256 !== recoverySha) throw new Error('DAVINCI_COMPLETION_FINISHING_RECOVERY_SHA_STALE');
  if (finishingVerdicts(e).some((v) => v !== 'PASS')) throw new Error('DAVINCI_COMPLETION_FINISHING_VERDICTS_NOT_ALL_PASS');
  if (e.review?.overall !== 'PASS' || !e.review.reviewer || !e.review.reviewedAt) throw new Error('DAVINCI_COMPLETION_FINISHING_REVIEW_NOT_PASS');
}

function verifyTransition(e: TransitionEvidence, movieId: MovieId, recoverySha: string) {
  if (e.schemaVersion !== 'wedding-davinci-transition-actual-evidence/v1' || e.authority !== 'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL' || e.movieId !== movieId) throw new Error('DAVINCI_COMPLETION_TRANSITION_AUTHORITY_INVALID');
  if (e.productionReady !== false || e.macDaVinciActual !== 'NOT_RUN') throw new Error('DAVINCI_COMPLETION_TRANSITION_MUST_NOT_SELF_PROMOTE');
  if (e.sourceRecovery?.sha256 !== recoverySha) throw new Error('DAVINCI_COMPLETION_TRANSITION_RECOVERY_SHA_STALE');
  const p = e.palmierTransitionProof;
  if (!p || !isSha(p.transitionProofSha256) || !Number.isInteger(p.transitionEdgeCount) || !Number.isInteger(p.crossDissolveCount)) throw new Error('DAVINCI_COMPLETION_TRANSITION_PROOF_INVALID');
  const edges = e.edges ?? [];
  if (edges.length !== p.transitionEdgeCount) throw new Error('DAVINCI_COMPLETION_TRANSITION_EDGE_COUNT_MISMATCH');
  const seen = new Set<string>();
  for (const edge of edges) {
    if (!edge.edgeId || seen.has(edge.edgeId)) throw new Error('DAVINCI_COMPLETION_TRANSITION_EDGE_ID_INVALID');
    seen.add(edge.edgeId);
    if (edge.actual?.preservation !== 'PASS') throw new Error(`DAVINCI_COMPLETION_TRANSITION_PRESERVATION_NOT_PASS:${edge.edgeId}`);
    if (edge.transition === 'CROSS_DISSOLVE') {
      if (edge.actual.durationPreserved !== 'PASS') throw new Error(`DAVINCI_COMPLETION_TRANSITION_DURATION_NOT_PASS:${edge.edgeId}`);
      if (!Number.isInteger(edge.durationFrames) || (edge.durationFrames ?? 0) <= 0) throw new Error(`DAVINCI_COMPLETION_TRANSITION_DURATION_INVALID:${edge.edgeId}`);
    } else if (edge.transition === 'HARD_CUT') {
      if (edge.actual?.durationPreserved !== 'NOT_APPLICABLE') throw new Error(`DAVINCI_COMPLETION_HARD_CUT_DURATION_STATE_INVALID:${edge.edgeId}`);
    } else throw new Error(`DAVINCI_COMPLETION_TRANSITION_TYPE_INVALID:${edge.edgeId}`);
  }
  if (edges.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length !== p.crossDissolveCount) throw new Error('DAVINCI_COMPLETION_TRANSITION_CROSS_DISSOLVE_COUNT_MISMATCH');
  if (e.review?.overall !== 'PASS' || !e.review.reviewer || !e.review.reviewedAt) throw new Error('DAVINCI_COMPLETION_TRANSITION_REVIEW_NOT_PASS');
}

function buildReceipt(base: string, movieId: MovieId): CompletionReceipt {
  const paths = pathsFor(base, movieId);
  if (!existsSync(paths.recovery)) throw new Error('DAVINCI_COMPLETION_RECOVERY_MISSING');
  const recoverySha = shaFile(paths.recovery);
  const finishing = readJson<FinishingEvidence>(paths.finishing, 'DAVINCI_COMPLETION_FINISHING_EVIDENCE');
  const transition = readJson<TransitionEvidence>(paths.transition, 'DAVINCI_COMPLETION_TRANSITION_EVIDENCE');
  verifyFinishing(finishing, recoverySha);
  verifyTransition(transition, movieId, recoverySha);
  const proof = transition.palmierTransitionProof!;
  return {
    schemaVersion: 'wedding-davinci-actual-completion-receipt/v1', authority: 'DERIVED_MAC_DAVINCI_ACTUAL_COMPLETION_RECEIPT', movieId, generatedAt: new Date().toISOString(), state: 'CURRENT',
    sourceRecovery: {path: rel(base, paths.recovery), sha256: recoverySha},
    finishingEvidence: {path: rel(base, paths.finishing), sha256: shaFile(paths.finishing), reviewOverall: 'PASS'},
    transitionActualEvidence: {path: rel(base, paths.transition), sha256: shaFile(paths.transition), reviewOverall: 'PASS', transitionProofSha256: proof.transitionProofSha256!, transitionEdgeCount: proof.transitionEdgeCount!, crossDissolveCount: proof.crossDissolveCount!},
    binding: {sameRecoverySha256: true, finishingEvidencePass: true, transitionEvidencePass: true, humanEvidenceCurrent: true},
    evidenceBoundary: {derivedReceiptOnly: true, performsMacDaVinciGuiActual: false, macDaVinciActualWasHumanRecorded: true, productionReady: false},
  };
}

function verifyReceipt(base: string, movieId: MovieId, receipt: CompletionReceipt) {
  if (receipt.schemaVersion !== 'wedding-davinci-actual-completion-receipt/v1' || receipt.authority !== 'DERIVED_MAC_DAVINCI_ACTUAL_COMPLETION_RECEIPT' || receipt.movieId !== movieId || receipt.state !== 'CURRENT') throw new Error('DAVINCI_COMPLETION_RECEIPT_CONTRACT_INVALID');
  if (receipt.evidenceBoundary?.derivedReceiptOnly !== true || receipt.evidenceBoundary?.performsMacDaVinciGuiActual !== false || receipt.evidenceBoundary?.macDaVinciActualWasHumanRecorded !== true || receipt.evidenceBoundary?.productionReady !== false) throw new Error('DAVINCI_COMPLETION_RECEIPT_EVIDENCE_BOUNDARY_INVALID');
  const current = buildReceipt(base, movieId);
  if (receipt.sourceRecovery.path !== current.sourceRecovery.path || receipt.sourceRecovery.sha256 !== current.sourceRecovery.sha256) throw new Error('STALE_DAVINCI_COMPLETION_RECOVERY');
  if (receipt.finishingEvidence.path !== current.finishingEvidence.path || receipt.finishingEvidence.sha256 !== current.finishingEvidence.sha256) throw new Error('STALE_DAVINCI_COMPLETION_FINISHING_EVIDENCE');
  if (receipt.transitionActualEvidence.path !== current.transitionActualEvidence.path || receipt.transitionActualEvidence.sha256 !== current.transitionActualEvidence.sha256) throw new Error('STALE_DAVINCI_COMPLETION_TRANSITION_EVIDENCE');
  if (receipt.transitionActualEvidence.transitionProofSha256 !== current.transitionActualEvidence.transitionProofSha256 || receipt.transitionActualEvidence.transitionEdgeCount !== current.transitionActualEvidence.transitionEdgeCount || receipt.transitionActualEvidence.crossDissolveCount !== current.transitionActualEvidence.crossDissolveCount) throw new Error('STALE_DAVINCI_COMPLETION_TRANSITION_PROOF');
  if (receipt.binding?.sameRecoverySha256 !== true || receipt.binding?.finishingEvidencePass !== true || receipt.binding?.transitionEvidencePass !== true || receipt.binding?.humanEvidenceCurrent !== true) throw new Error('DAVINCI_COMPLETION_RECEIPT_BINDING_INVALID');
}

function writeFixture(base: string, movieId: MovieId) {
  const paths = pathsFor(base, movieId);
  mkdirSync(dirname(paths.recovery), {recursive: true}); mkdirSync(dirname(paths.finishing), {recursive: true});
  writeFileSync(paths.recovery, JSON.stringify({movieId, authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY'}));
  const recoverySha = shaFile(paths.recovery); const pass = 'PASS' as const;
  writeFileSync(paths.finishing, JSON.stringify({authority:'MAC_DAVINCI_ACTUAL_EVIDENCE',productionRecovery:{sha256:recoverySha},sourceRender:{shaMatch:pass},resolve:{timelineInsertion:pass,durationAndFps:pass},finishing:{color:pass,audio:pass,titleSafeAndFraming:pass,playback1x:pass,playbackHalfSpeed:pass},export:{duration:pass,dimensions:pass,fps:pass,audioPresent:pass,watchedWithSound:pass},review:{overall:pass,reviewer:'human',reviewedAt:'2026-09-01T00:00:00.000Z'},productionReady:false}));
  writeFileSync(paths.transition, JSON.stringify({schemaVersion:'wedding-davinci-transition-actual-evidence/v1',authority:'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL',movieId,sourceRecovery:{sha256:recoverySha},palmierTransitionProof:{transitionProofSha256:'d'.repeat(64),transitionEdgeCount:2,crossDissolveCount:1},edges:[{edgeId:'edge-1',transition:'HARD_CUT',durationFrames:0,actual:{preservation:pass,durationPreserved:'NOT_APPLICABLE'}},{edgeId:'edge-2',transition:'CROSS_DISSOLVE',durationFrames:12,actual:{preservation:pass,durationPreserved:pass}}],review:{overall:pass,reviewer:'human',reviewedAt:'2026-09-01T00:00:00.000Z'},macDaVinciActual:'NOT_RUN',productionReady:false}));
  return paths;
}

function selfTest() {
  const base = mkdtempSync(join(tmpdir(), 'wedding-davinci-completion-'));
  try {
    const movieId: MovieId = 'opening'; const paths = writeFixture(base, movieId); const receipt = buildReceipt(base, movieId); verifyReceipt(base, movieId, receipt);
    const finishing = readJson<FinishingEvidence>(paths.finishing, 'SELFTEST_FINISHING'); finishing.finishing!.audio = 'FAIL'; writeFileSync(paths.finishing, JSON.stringify(finishing));
    let finishingBlocked = false; try { verifyReceipt(base, movieId, receipt); } catch (error) { finishingBlocked = String(error).includes('FINISHING'); } if (!finishingBlocked) throw new Error('SELFTEST_FINISHING_DRIFT_NOT_BLOCKED');
    writeFixture(base, movieId); const fresh = buildReceipt(base, movieId); const transition = readJson<TransitionEvidence>(paths.transition, 'SELFTEST_TRANSITION'); transition.edges![1].actual!.durationPreserved = 'FAIL'; writeFileSync(paths.transition, JSON.stringify(transition));
    let transitionBlocked = false; try { verifyReceipt(base, movieId, fresh); } catch (error) { transitionBlocked = String(error).includes('TRANSITION'); } if (!transitionBlocked) throw new Error('SELFTEST_TRANSITION_DRIFT_NOT_BLOCKED');
    console.log('Wedding DaVinci Actual completion receipt self-test: PASS'); console.log('finishingDrift=BLOCKED transitionDrift=BLOCKED productionReady=false guiActualPerformedByReceipt=false');
  } finally { rmSync(base, {recursive: true, force: true}); }
}

if (process.argv.includes('--self-test')) { selfTest(); process.exit(0); }
const movieRaw = argValue('--movie'); if (movieRaw !== 'opening' && movieRaw !== 'profile') throw new Error('Use --movie=opening|profile'); const movieId = movieRaw as MovieId; const paths = pathsFor(root, movieId);
if (process.argv.includes('--write')) { const receipt = buildReceipt(root, movieId); mkdirSync(dirname(paths.receipt), {recursive: true}); writeFileSync(paths.receipt, `${JSON.stringify(receipt, null, 2)}\n`); console.log(`Wedding DaVinci Actual completion receipt: CURRENT (${movieId})`); process.exit(0); }
const receipt = readJson<CompletionReceipt>(paths.receipt, 'DAVINCI_COMPLETION_RECEIPT'); verifyReceipt(root, movieId, receipt); if (process.argv.includes('--json')) console.log(JSON.stringify(receipt, null, 2)); else console.log(`Wedding DaVinci Actual completion receipt: CURRENT (${movieId})`);
