import {createHash} from 'node:crypto';
import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';
import {tmpdir} from 'node:os';

type MovieId = 'opening' | 'profile';
type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type TransitionType = 'HARD_CUT' | 'CROSS_DISSOLVE';

type TransitionEvidence = {
  schemaVersion: 'wedding-davinci-transition-actual-evidence/v1';
  authority: 'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL';
  movieId: MovieId;
  sourceRecovery: {path: string; sha256: string};
  palmierTransitionProof: {
    transitionProofSha256: string;
    transitionEdgeCount: number;
    crossDissolveCount: number;
  };
  edges: Array<{
    edgeId: string;
    transition: TransitionType;
    durationFrames: number;
    actual: {preservation: QaState; durationPreserved: QaState | 'NOT_APPLICABLE'; notes: string};
  }>;
  review: {overall: QaState; reviewer: string | null; reviewedAt: string | null; notes: string};
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

type FinishingEvidence = {
  schemaVersion: string;
  authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE';
  productionRecovery: {path: string; sha256: string};
  review: {overall: QaState; reviewer: string | null; reviewedAt: string | null};
  productionReady: false;
};

type GateReceipt = {
  schemaVersion: 'wedding-final-delivery-transition-gate/v1';
  authority: 'SHA_BOUND_FINAL_DELIVERY_TRANSITION_GATE';
  movieId: MovieId;
  checkedAt: string;
  sourceRecovery: {path: string; sha256: string};
  transitionActualEvidence: {path: string; sha256: string; transitionProofSha256: string; transitionEdgeCount: number; crossDissolveCount: number};
  davinciFinishingEvidence: {path: string; sha256: string};
  state: 'CURRENT';
  macDaVinciGuiActual: 'NOT_RUN';
  productionReady: false;
};

const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const readJson = <T>(path: string, code: string): T => {
  if (!existsSync(path)) throw new Error(`${code}_MISSING`);
  try { return JSON.parse(readFileSync(path, 'utf8')) as T; }
  catch { throw new Error(`${code}_INVALID_JSON`); }
};
const rel = (root: string, path: string) => relative(root, path).replaceAll('\\', '/');

function verify(movieId: MovieId, root: string, recoveryPath: string, transitionPath: string, finishingPath: string): GateReceipt {
  const transition = readJson<TransitionEvidence>(transitionPath, 'FINAL_DELIVERY_TRANSITION_EVIDENCE');
  const finishing = readJson<FinishingEvidence>(finishingPath, 'FINAL_DELIVERY_FINISHING_EVIDENCE');
  if (!existsSync(recoveryPath)) throw new Error('FINAL_DELIVERY_RECOVERY_MISSING');
  const recoverySha = sha(recoveryPath);

  if (transition.schemaVersion !== 'wedding-davinci-transition-actual-evidence/v1' || transition.authority !== 'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL' || transition.movieId !== movieId) throw new Error('FINAL_DELIVERY_TRANSITION_EVIDENCE_CONTRACT');
  if (transition.productionReady !== false || transition.macDaVinciActual !== 'NOT_RUN') throw new Error('FINAL_DELIVERY_TRANSITION_EVIDENCE_BOUNDARY');
  if (transition.sourceRecovery.path !== rel(root, recoveryPath) || transition.sourceRecovery.sha256 !== recoverySha) throw new Error('FINAL_DELIVERY_TRANSITION_RECOVERY_STALE');
  if (transition.review.overall !== 'PASS' || !transition.review.reviewer?.trim() || !transition.review.reviewedAt) throw new Error('FINAL_DELIVERY_TRANSITION_HUMAN_REVIEW_NOT_PASS');
  if (!Array.isArray(transition.edges) || transition.edges.length !== transition.palmierTransitionProof.transitionEdgeCount) throw new Error('FINAL_DELIVERY_TRANSITION_EDGE_COUNT_STALE');
  const crossDissolves = transition.edges.filter((edge) => edge.transition === 'CROSS_DISSOLVE');
  if (crossDissolves.length !== transition.palmierTransitionProof.crossDissolveCount) throw new Error('FINAL_DELIVERY_TRANSITION_CROSS_DISSOLVE_COUNT_STALE');
  for (const edge of transition.edges) {
    if (edge.actual.preservation !== 'PASS') throw new Error(`FINAL_DELIVERY_TRANSITION_PRESERVATION_NOT_PASS:${edge.edgeId}`);
    if (edge.transition === 'CROSS_DISSOLVE') {
      if (edge.durationFrames <= 0 || edge.actual.durationPreserved !== 'PASS') throw new Error(`FINAL_DELIVERY_TRANSITION_DURATION_NOT_PASS:${edge.edgeId}`);
    } else if (edge.transition === 'HARD_CUT') {
      if (edge.durationFrames !== 0 || edge.actual.durationPreserved !== 'NOT_APPLICABLE') throw new Error(`FINAL_DELIVERY_HARD_CUT_ACTUAL_INVALID:${edge.edgeId}`);
    } else throw new Error(`FINAL_DELIVERY_TRANSITION_TYPE_UNSUPPORTED:${edge.edgeId}`);
  }

  const expectedFinishingSchema = movieId === 'opening' ? 'opening-v1-davinci-finishing-evidence/v1' : 'profile-v1-davinci-finishing-evidence/v1';
  if (finishing.schemaVersion !== expectedFinishingSchema || finishing.authority !== 'MAC_DAVINCI_ACTUAL_EVIDENCE') throw new Error('FINAL_DELIVERY_FINISHING_EVIDENCE_CONTRACT');
  if (finishing.productionReady !== false || finishing.review.overall !== 'PASS' || !finishing.review.reviewer?.trim() || !finishing.review.reviewedAt) throw new Error('FINAL_DELIVERY_FINISHING_EVIDENCE_NOT_VERIFIED');
  if (finishing.productionRecovery.path !== rel(root, recoveryPath) || finishing.productionRecovery.sha256 !== recoverySha) throw new Error('FINAL_DELIVERY_FINISHING_RECOVERY_STALE');
  if (finishing.productionRecovery.sha256 !== transition.sourceRecovery.sha256) throw new Error('FINAL_DELIVERY_ACTUAL_EVIDENCE_RECOVERY_SPLIT_BRAIN');

  return {
    schemaVersion: 'wedding-final-delivery-transition-gate/v1',
    authority: 'SHA_BOUND_FINAL_DELIVERY_TRANSITION_GATE',
    movieId,
    checkedAt: new Date().toISOString(),
    sourceRecovery: {path: rel(root, recoveryPath), sha256: recoverySha},
    transitionActualEvidence: {path: rel(root, transitionPath), sha256: sha(transitionPath), transitionProofSha256: transition.palmierTransitionProof.transitionProofSha256, transitionEdgeCount: transition.palmierTransitionProof.transitionEdgeCount, crossDissolveCount: transition.palmierTransitionProof.crossDissolveCount},
    davinciFinishingEvidence: {path: rel(root, finishingPath), sha256: sha(finishingPath)},
    state: 'CURRENT', macDaVinciGuiActual: 'NOT_RUN', productionReady: false,
  };
}

function selfTest() {
  const root = mkdtempSync(join(tmpdir(), 'wedding-final-delivery-transition-gate-'));
  try {
    const recoveryPath = join(root, 'recovery.json');
    const transitionPath = join(root, 'transition.json');
    const finishingPath = join(root, 'finishing.json');
    writeFileSync(recoveryPath, '{"fixture":"current"}\n');
    const recoverySha = sha(recoveryPath);
    const transition: TransitionEvidence = {
      schemaVersion:'wedding-davinci-transition-actual-evidence/v1', authority:'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL', movieId:'opening',
      sourceRecovery:{path:'recovery.json',sha256:recoverySha}, palmierTransitionProof:{transitionProofSha256:'proof-sha',transitionEdgeCount:2,crossDissolveCount:1},
      edges:[
        {edgeId:'a->b',transition:'HARD_CUT',durationFrames:0,actual:{preservation:'PASS',durationPreserved:'NOT_APPLICABLE',notes:''}},
        {edgeId:'b->c',transition:'CROSS_DISSOLVE',durationFrames:12,actual:{preservation:'PASS',durationPreserved:'PASS',notes:''}},
      ], review:{overall:'PASS',reviewer:'human-fixture',reviewedAt:new Date().toISOString(),notes:''}, macDaVinciActual:'NOT_RUN', productionReady:false,
    };
    const finishing: FinishingEvidence = {schemaVersion:'opening-v1-davinci-finishing-evidence/v1',authority:'MAC_DAVINCI_ACTUAL_EVIDENCE',productionRecovery:{path:'recovery.json',sha256:recoverySha},review:{overall:'PASS',reviewer:'human-fixture',reviewedAt:new Date().toISOString()},productionReady:false};
    writeFileSync(transitionPath, `${JSON.stringify(transition,null,2)}\n`); writeFileSync(finishingPath, `${JSON.stringify(finishing,null,2)}\n`);
    const current = verify('opening',root,recoveryPath,transitionPath,finishingPath);
    if (current.state !== 'CURRENT' || current.transitionActualEvidence.transitionEdgeCount !== 2) throw new Error('SELF_TEST_CURRENT_GATE_FAILED');
    transition.edges[1].actual.durationPreserved = 'FAIL'; writeFileSync(transitionPath, `${JSON.stringify(transition,null,2)}\n`);
    let blocked = false; try { verify('opening',root,recoveryPath,transitionPath,finishingPath); } catch (error) { blocked = String(error).includes('FINAL_DELIVERY_TRANSITION_DURATION_NOT_PASS'); }
    if (!blocked) throw new Error('SELF_TEST_FAILED_TRANSITION_NOT_BLOCKED');
    transition.edges[1].actual.durationPreserved = 'PASS'; writeFileSync(transitionPath, `${JSON.stringify(transition,null,2)}\n`);
    writeFileSync(recoveryPath, '{"fixture":"drifted"}\n');
    blocked = false; try { verify('opening',root,recoveryPath,transitionPath,finishingPath); } catch (error) { blocked = String(error).includes('FINAL_DELIVERY_TRANSITION_RECOVERY_STALE'); }
    if (!blocked) throw new Error('SELF_TEST_RECOVERY_DRIFT_NOT_BLOCKED');
    console.log('selfTest=PASS');
  } finally { rmSync(root,{recursive:true,force:true}); }
}

if (process.argv.includes('--self-test')) selfTest();
else {
  const movie = argValue('--movie'); if (movie !== 'opening' && movie !== 'profile') { console.error('BLOCK / MOVIE_MUST_BE_OPENING_OR_PROFILE'); process.exit(2); }
  const root = resolve(argValue('--root') ?? process.cwd());
  const handoffDir = join(root,`out/handoff/${movie === 'opening' ? 'opening-v1' : 'profile-v1'}`);
  const recoveryPath = resolve(argValue('--recovery') ?? join(handoffDir,`${movie}-v1-davinci-production-recovery.json`));
  const transitionPath = resolve(argValue('--transition-evidence') ?? join(root,`out/qa/${movie}-v1-davinci-transition-actual-evidence.json`));
  const finishingPath = resolve(argValue('--finishing-evidence') ?? join(root,`out/qa/${movie}-v1-davinci-finishing-evidence.json`));
  const outputPath = argValue('--write') ? resolve(argValue('--output') ?? join(handoffDir,`${movie}-v1-final-delivery-transition-gate.json`)) : null;
  try {
    const receipt = verify(movie,root,recoveryPath,transitionPath,finishingPath);
    if (outputPath) writeFileSync(outputPath,`${JSON.stringify(receipt,null,2)}\n`);
    console.log('finalDeliveryTransitionGate=CURRENT'); console.log(`movieId=${movie}`); console.log(`transitionEdgesVerified=${receipt.transitionActualEvidence.transitionEdgeCount}`); console.log(`crossDissolvesVerified=${receipt.transitionActualEvidence.crossDissolveCount}`); console.log(`transitionProofSha256=${receipt.transitionActualEvidence.transitionProofSha256}`); console.log('macDaVinciGuiActual=NOT_RUN'); console.log('productionReady=NO');
  } catch (error) { console.error(`BLOCK / ${error instanceof Error ? error.message : String(error)}`); console.error('Final delivery remains blocked. Mac DaVinci GUI authority is not promoted by this gate.'); process.exit(2); }
}
