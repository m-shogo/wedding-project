import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, join, relative, resolve} from 'node:path';
import {tmpdir} from 'node:os';

type MovieId = 'opening' | 'profile';
type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type DurationQaState = QaState | 'NOT_APPLICABLE';
type TransitionType = 'HARD_CUT' | 'CROSS_DISSOLVE';

type TransitionProof = {
  edgeId: string;
  fromSceneId: string | null;
  toSceneId: string | null;
  transition: TransitionType;
  durationFrames: number;
  transitionOccurrenceCountBetweenMarkers: number;
  matchedDurationFrames: number;
  state: 'CURRENT';
};

type RecoverySidecar = {
  schemaVersion: 'wedding-davinci-production-recovery-export/v1';
  authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY';
  recovery: {
    movieId: MovieId;
    stage: 'davinciFinishing';
    productionReady: false;
    actual: {state: 'NOT_RUN'; evidencePath: string};
    bridge: {macDaVinciActualVerified: false; finalDeliveryApproved: false};
  };
  palmierTimelineExport: {
    authority: 'SHA_BOUND_PALMIER_TIMELINE_EXPORT_HANDOFF';
    movieId: MovieId;
    state: 'CURRENT';
    receipt: {path?: string; sha256: string};
    assemblyPlan: {path?: string; sha256: string};
    palmierFcpxml: {path?: string; sha256: string};
    verification: {
      transitionIntentMatchesAssemblyPlan: true;
      transitionDurationMatchesAssemblyPlan: true;
      noUnboundTransitions: true;
      transitionEdgeCount: number;
      transitionChecks: Array<{
        edgeId: string;
        fromSceneId?: string;
        toSceneId?: string;
        transition: TransitionType;
        durationFrames?: number;
        transitionOccurrenceCountBetweenMarkers?: number;
        matchedDurationFrames?: number;
        state: 'CURRENT';
      }>;
    };
    palmierGuiActual: 'NOT_RUN';
    transitionAppliedGuiActual: 'NOT_RUN';
    remotionStudioGuiActual: 'NOT_RUN';
    macDaVinciGuiActual: 'NOT_RUN';
    productionReady: false;
  };
};

type TransitionActualEvidence = {
  schemaVersion: 'wedding-davinci-transition-actual-evidence/v1';
  authority: 'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL';
  movieId: MovieId;
  boundAt: string;
  sourceRecovery: {path: string; sha256: string};
  palmierTransitionProof: {
    receiptSha256: string;
    assemblyPlanSha256: string;
    palmierFcpxmlSha256: string;
    transitionProofSha256: string;
    transitionEdgeCount: number;
    crossDissolveCount: number;
  };
  edges: Array<TransitionProof & {
    actual: {
      preservation: QaState;
      durationPreserved: DurationQaState;
      notes: string;
    };
  }>;
  review: {
    overall: QaState;
    reviewer: string | null;
    reviewedAt: string | null;
    notes: string;
  };
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const shaBytes = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const shaFile = (path: string) => shaBytes(readFileSync(path));
const stableProof = (proof: TransitionProof[]) => JSON.stringify(proof.map((edge) => ({
  edgeId: edge.edgeId,
  fromSceneId: edge.fromSceneId,
  toSceneId: edge.toSceneId,
  transition: edge.transition,
  durationFrames: edge.durationFrames,
  transitionOccurrenceCountBetweenMarkers: edge.transitionOccurrenceCountBetweenMarkers,
  matchedDurationFrames: edge.matchedDurationFrames,
  state: edge.state,
})));
const transitionProofSha256 = (proof: TransitionProof[]) => shaBytes(stableProof(proof));

function normalizeProof(recovery: RecoverySidecar, movieId: MovieId): TransitionProof[] {
  const bound = recovery.palmierTimelineExport;
  if (recovery.schemaVersion !== 'wedding-davinci-production-recovery-export/v1' || recovery.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') throw new Error('DAVINCI_TRANSITION_RECOVERY_CONTRACT_INVALID');
  if (recovery.recovery?.movieId !== movieId || recovery.recovery?.stage !== 'davinciFinishing') throw new Error('DAVINCI_TRANSITION_RECOVERY_TARGET_STALE');
  if (recovery.recovery?.productionReady !== false || recovery.recovery?.actual?.state !== 'NOT_RUN' || recovery.recovery?.bridge?.macDaVinciActualVerified !== false || recovery.recovery?.bridge?.finalDeliveryApproved !== false) throw new Error('DAVINCI_TRANSITION_RECOVERY_MUST_PRECEDE_ACTUAL');
  if (!bound || bound.authority !== 'SHA_BOUND_PALMIER_TIMELINE_EXPORT_HANDOFF' || bound.movieId !== movieId || bound.state !== 'CURRENT') throw new Error('DAVINCI_TRANSITION_PALMIER_HANDOFF_NOT_CURRENT');
  if (bound.verification?.transitionIntentMatchesAssemblyPlan !== true || bound.verification?.transitionDurationMatchesAssemblyPlan !== true || bound.verification?.noUnboundTransitions !== true) throw new Error('DAVINCI_TRANSITION_PALMIER_PROOF_INCOMPLETE');
  if (bound.palmierGuiActual !== 'NOT_RUN' || bound.transitionAppliedGuiActual !== 'NOT_RUN' || bound.remotionStudioGuiActual !== 'NOT_RUN' || bound.macDaVinciGuiActual !== 'NOT_RUN' || bound.productionReady !== false) throw new Error('DAVINCI_TRANSITION_UPSTREAM_EVIDENCE_BOUNDARY_INVALID');
  const checks = bound.verification?.transitionChecks ?? [];
  if (checks.length !== bound.verification?.transitionEdgeCount) throw new Error('DAVINCI_TRANSITION_EDGE_COUNT_MISMATCH');
  const proof = checks.map((check): TransitionProof => ({
    edgeId: check.edgeId,
    fromSceneId: check.fromSceneId ?? null,
    toSceneId: check.toSceneId ?? null,
    transition: check.transition,
    durationFrames: check.durationFrames ?? 0,
    transitionOccurrenceCountBetweenMarkers: check.transitionOccurrenceCountBetweenMarkers ?? 0,
    matchedDurationFrames: check.matchedDurationFrames ?? 0,
    state: check.state,
  }));
  const edgeIds = new Set<string>();
  for (const edge of proof) {
    if (!edge.edgeId || edgeIds.has(edge.edgeId)) throw new Error('DAVINCI_TRANSITION_EDGE_ID_INVALID');
    edgeIds.add(edge.edgeId);
    if (edge.state !== 'CURRENT') throw new Error(`DAVINCI_TRANSITION_EDGE_NOT_CURRENT:${edge.edgeId}`);
    if (edge.transition === 'HARD_CUT') {
      if (edge.durationFrames !== 0 || edge.transitionOccurrenceCountBetweenMarkers !== 0 || edge.matchedDurationFrames !== 0) throw new Error(`DAVINCI_TRANSITION_HARD_CUT_PROOF_INVALID:${edge.edgeId}`);
    } else if (edge.transition === 'CROSS_DISSOLVE') {
      if (!Number.isInteger(edge.durationFrames) || edge.durationFrames <= 0 || edge.transitionOccurrenceCountBetweenMarkers !== 1 || edge.matchedDurationFrames !== edge.durationFrames) throw new Error(`DAVINCI_TRANSITION_CROSS_DISSOLVE_PROOF_INVALID:${edge.edgeId}`);
    } else {
      throw new Error(`DAVINCI_TRANSITION_TYPE_UNSUPPORTED:${edge.edgeId}`);
    }
  }
  return proof;
}

function loadRecovery(path: string, movieId: MovieId) {
  if (!existsSync(path)) throw new Error('DAVINCI_TRANSITION_RECOVERY_MISSING');
  let recovery: RecoverySidecar;
  try { recovery = JSON.parse(readFileSync(path, 'utf8')) as RecoverySidecar; }
  catch { throw new Error('DAVINCI_TRANSITION_RECOVERY_INVALID_JSON'); }
  return {recovery, proof: normalizeProof(recovery, movieId), sha256: shaFile(path)};
}

function buildInitialEvidence(movieId: MovieId, recoveryPath: string, recovery: RecoverySidecar, recoverySha256: string, proof: TransitionProof[], root: string): TransitionActualEvidence {
  const bound = recovery.palmierTimelineExport;
  return {
    schemaVersion: 'wedding-davinci-transition-actual-evidence/v1',
    authority: 'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL',
    movieId,
    boundAt: new Date().toISOString(),
    sourceRecovery: {path: relative(root, recoveryPath).replaceAll('\\', '/'), sha256: recoverySha256},
    palmierTransitionProof: {
      receiptSha256: bound.receipt.sha256,
      assemblyPlanSha256: bound.assemblyPlan.sha256,
      palmierFcpxmlSha256: bound.palmierFcpxml.sha256,
      transitionProofSha256: transitionProofSha256(proof),
      transitionEdgeCount: proof.length,
      crossDissolveCount: proof.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length,
    },
    edges: proof.map((edge) => ({
      ...edge,
      actual: {
        preservation: 'NOT_RUN',
        durationPreserved: edge.transition === 'CROSS_DISSOLVE' ? 'NOT_RUN' : 'NOT_APPLICABLE',
        notes: '',
      },
    })),
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    macDaVinciActual: 'NOT_RUN',
    productionReady: false,
  };
}

function verifyEvidence(evidence: TransitionActualEvidence, current: ReturnType<typeof loadRecovery>, movieId: MovieId, recoveryPath: string, root: string, strict: boolean) {
  const errors: string[] = [];
  const fail = (code: string) => errors.push(code);
  if (evidence.schemaVersion !== 'wedding-davinci-transition-actual-evidence/v1' || evidence.authority !== 'HUMAN_MAC_DAVINCI_TRANSITION_ACTUAL' || evidence.movieId !== movieId) fail('DAVINCI_TRANSITION_EVIDENCE_CONTRACT_INVALID');
  if (evidence.productionReady !== false || evidence.macDaVinciActual !== 'NOT_RUN') fail('DAVINCI_TRANSITION_EVIDENCE_MUST_NOT_SELF_PROMOTE');
  const boundAtMs = Date.parse(evidence.boundAt);
  if (!evidence.boundAt || Number.isNaN(boundAtMs)) fail('DAVINCI_TRANSITION_BOUND_AT_INVALID');
  if (evidence.sourceRecovery.path !== relative(root, recoveryPath).replaceAll('\\', '/')) fail('STALE_DAVINCI_TRANSITION_RECOVERY_PATH');
  if (evidence.sourceRecovery.sha256 !== current.sha256) fail('STALE_DAVINCI_TRANSITION_RECOVERY_SHA');
  const bound = current.recovery.palmierTimelineExport;
  if (evidence.palmierTransitionProof.receiptSha256 !== bound.receipt.sha256) fail('STALE_DAVINCI_TRANSITION_RECEIPT_SHA');
  if (evidence.palmierTransitionProof.assemblyPlanSha256 !== bound.assemblyPlan.sha256) fail('STALE_DAVINCI_TRANSITION_ASSEMBLY_PLAN_SHA');
  if (evidence.palmierTransitionProof.palmierFcpxmlSha256 !== bound.palmierFcpxml.sha256) fail('STALE_DAVINCI_TRANSITION_FCPXML_SHA');
  if (evidence.palmierTransitionProof.transitionProofSha256 !== transitionProofSha256(current.proof)) fail('STALE_DAVINCI_TRANSITION_PROOF_SHA');
  if (evidence.palmierTransitionProof.transitionEdgeCount !== current.proof.length) fail('STALE_DAVINCI_TRANSITION_EDGE_COUNT');
  if (evidence.palmierTransitionProof.crossDissolveCount !== current.proof.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length) fail('STALE_DAVINCI_TRANSITION_CROSS_DISSOLVE_COUNT');
  if (evidence.edges.length !== current.proof.length) fail('DAVINCI_TRANSITION_ACTUAL_EDGE_COUNT_MISMATCH');
  current.proof.forEach((proofEdge, index) => {
    const actualEdge = evidence.edges[index];
    if (!actualEdge || stableProof([actualEdge]) !== stableProof([proofEdge])) {
      fail(`STALE_DAVINCI_TRANSITION_EDGE_BINDING:${proofEdge.edgeId}`);
      return;
    }
    if (actualEdge.actual.preservation !== 'PASS') fail(`DAVINCI_TRANSITION_PRESERVATION_${actualEdge.actual.preservation}:${proofEdge.edgeId}`);
    if (proofEdge.transition === 'CROSS_DISSOLVE' && actualEdge.actual.durationPreserved !== 'PASS') fail(`DAVINCI_TRANSITION_DURATION_${actualEdge.actual.durationPreserved}:${proofEdge.edgeId}`);
    if (proofEdge.transition === 'HARD_CUT' && actualEdge.actual.durationPreserved !== 'NOT_APPLICABLE') fail(`DAVINCI_TRANSITION_HARD_CUT_DURATION_MUST_BE_NOT_APPLICABLE:${proofEdge.edgeId}`);
  });
  if (evidence.review.overall !== 'PASS') fail(`DAVINCI_TRANSITION_OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) fail('DAVINCI_TRANSITION_REVIEWER_MISSING');
  const reviewedAtMs = evidence.review.reviewedAt ? Date.parse(evidence.review.reviewedAt) : Number.NaN;
  if (!evidence.review.reviewedAt || Number.isNaN(reviewedAtMs)) fail('DAVINCI_TRANSITION_REVIEWED_AT_INVALID');
  else if (!Number.isNaN(boundAtMs) && reviewedAtMs < boundAtMs) fail('DAVINCI_TRANSITION_REVIEWED_BEFORE_BINDING');

  if (errors.length > 0) {
    console.log(`Wedding DaVinci transition Actual evidence: BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    console.log('Mac DaVinci Resolve GUI Actual remains NOT_RUN in repository authority; Human PASS values are only accepted inside this evidence file after actual GUI review.');
    if (strict) process.exitCode = 1;
    return false;
  }
  console.log(`Wedding DaVinci transition Actual evidence: ACTUAL_VERIFIED (${movieId})`);
  console.log(`transitionEdgesVerified=${current.proof.length}`);
  console.log(`crossDissolvesVerified=${current.proof.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length}`);
  console.log('productionReady remains false; final delivery approval is a separate Human gate.');
  return true;
}

function runSelfTest() {
  const dir = mkdtempSync(join(tmpdir(), 'wedding-davinci-transition-actual-'));
  try {
    const recoveryPath = join(dir, 'recovery.json');
    const evidencePath = join(dir, 'evidence.json');
    const recovery: RecoverySidecar = {
      schemaVersion: 'wedding-davinci-production-recovery-export/v1', authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY',
      recovery: {movieId: 'opening', stage: 'davinciFinishing', productionReady: false, actual: {state: 'NOT_RUN', evidencePath: 'out/qa/opening-v1-davinci-finishing-evidence.json'}, bridge: {macDaVinciActualVerified: false, finalDeliveryApproved: false}},
      palmierTimelineExport: {
        authority: 'SHA_BOUND_PALMIER_TIMELINE_EXPORT_HANDOFF', movieId: 'opening', state: 'CURRENT',
        receipt: {sha256: 'receipt-sha'}, assemblyPlan: {sha256: 'assembly-sha'}, palmierFcpxml: {sha256: 'fcpxml-sha'},
        verification: {transitionIntentMatchesAssemblyPlan: true, transitionDurationMatchesAssemblyPlan: true, noUnboundTransitions: true, transitionEdgeCount: 2, transitionChecks: [
          {edgeId: 's1->s2', fromSceneId: 's1', toSceneId: 's2', transition: 'HARD_CUT', durationFrames: 0, transitionOccurrenceCountBetweenMarkers: 0, matchedDurationFrames: 0, state: 'CURRENT'},
          {edgeId: 's2->s3', fromSceneId: 's2', toSceneId: 's3', transition: 'CROSS_DISSOLVE', durationFrames: 12, transitionOccurrenceCountBetweenMarkers: 1, matchedDurationFrames: 12, state: 'CURRENT'},
        ]},
        palmierGuiActual: 'NOT_RUN', transitionAppliedGuiActual: 'NOT_RUN', remotionStudioGuiActual: 'NOT_RUN', macDaVinciGuiActual: 'NOT_RUN', productionReady: false,
      },
    };
    writeFileSync(recoveryPath, `${JSON.stringify(recovery, null, 2)}\n`);
    const current = loadRecovery(recoveryPath, 'opening');
    const initialized = buildInitialEvidence('opening', recoveryPath, current.recovery, current.sha256, current.proof, dir);
    if (initialized.edges.some((edge) => edge.actual.preservation !== 'NOT_RUN')) throw new Error('SELF_TEST_INIT_PROMOTED_ACTUAL');
    const completed: TransitionActualEvidence = JSON.parse(JSON.stringify(initialized));
    completed.edges.forEach((edge) => { edge.actual.preservation = 'PASS'; if (edge.transition === 'CROSS_DISSOLVE') edge.actual.durationPreserved = 'PASS'; });
    completed.review = {overall: 'PASS', reviewer: 'self-test-human-fixture', reviewedAt: new Date(Date.parse(completed.boundAt) + 1000).toISOString(), notes: 'synthetic fixture only'};
    writeFileSync(evidencePath, `${JSON.stringify(completed, null, 2)}\n`);
    if (!verifyEvidence(completed, current, 'opening', recoveryPath, dir, false)) throw new Error('SELF_TEST_VALID_EVIDENCE_BLOCKED');
    recovery.palmierTimelineExport.verification.transitionChecks[1].durationFrames = 10;
    recovery.palmierTimelineExport.verification.transitionChecks[1].matchedDurationFrames = 10;
    writeFileSync(recoveryPath, `${JSON.stringify(recovery, null, 2)}\n`);
    const staleCurrent = loadRecovery(recoveryPath, 'opening');
    if (verifyEvidence(completed, staleCurrent, 'opening', recoveryPath, dir, false)) throw new Error('SELF_TEST_STALE_PROOF_NOT_BLOCKED');
    console.log('selfTest=PASS');
  } finally {
    rmSync(dir, {recursive: true, force: true});
  }
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  const movieArg = argValue('--movie');
  if (movieArg !== 'opening' && movieArg !== 'profile') {
    console.error('BLOCK / MOVIE_MUST_BE_OPENING_OR_PROFILE');
    process.exit(2);
  }
  const movieId: MovieId = movieArg;
  const root = resolve(argValue('--root') ?? process.cwd());
  const defaultDir = join(root, `out/handoff/${movieId === 'opening' ? 'opening-v1' : 'profile-v1'}`);
  const recoveryPath = resolve(argValue('--recovery') ?? join(defaultDir, `${movieId}-v1-davinci-production-recovery.json`));
  const evidencePath = resolve(argValue('--evidence') ?? join(root, `out/qa/${movieId}-v1-davinci-transition-actual-evidence.json`));
  const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';
  const current = loadRecovery(recoveryPath, movieId);
  if (mode === 'init') {
    const evidence = buildInitialEvidence(movieId, recoveryPath, current.recovery, current.sha256, current.proof, root);
    mkdirSync(dirname(evidencePath), {recursive: true});
    writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
    console.log(`Wedding DaVinci transition Actual evidence initialized: ${relative(root, evidencePath).replaceAll('\\', '/')}`);
    console.log(`transitionEdges=${current.proof.length}`);
    console.log('Every applicable Human transition verdict remains NOT_RUN. Mac DaVinci Resolve GUI Actual remains NOT_RUN until it is truly performed.');
  } else if (!existsSync(evidencePath)) {
    console.log(`Wedding DaVinci transition Actual evidence: NOT_RUN (${movieId}; evidence file missing)`);
    if (mode === 'strict') process.exitCode = 1;
  } else {
    let evidence: TransitionActualEvidence;
    try { evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as TransitionActualEvidence; }
    catch { console.error('BLOCK / DAVINCI_TRANSITION_EVIDENCE_INVALID_JSON'); process.exit(2); }
    verifyEvidence(evidence, current, movieId, recoveryPath, root, mode === 'strict');
  }
}
