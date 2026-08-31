import {spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';

type MovieId = 'opening' | 'profile';
type StageState = 'NOT_STAGED' | 'STAGED_CURRENT' | 'HANDOFF_CURRENT' | 'INVALID';
type TransitionKind = 'HARD_CUT' | 'CROSS_DISSOLVE';

type ScenePackage = {
  identity?: {sceneId?: string; projectId?: MovieId; sourceRevision?: string; patternId?: string};
  canonical?: {engine?: string; mode?: string; humanMasterPreserved?: boolean};
  timeline?: {owner?: string; capability?: string; expectedXmlFileName?: string; sceneMarkerId?: string; xmlGeneratedExternally?: boolean; instruction?: string};
  davinci?: {routeStatus?: string; translatorSpecAvailable?: boolean; actualEvidenceState?: string};
  remotion?: {studioInstallActual?: string; studioControlReadbackActual?: string};
  files?: {deliverySidecarFileName?: string; palmierTimelineXmlFileName?: string; davinciActualArtifactHint?: string | null; davinciEvidenceCaptureHint?: string | null};
  release?: {productionReady?: boolean};
};

type BatchTransition = {
  fromSceneId?: string;
  toSceneId?: string;
  transition?: TransitionKind;
  durationFrames?: number;
  status?: 'DEFAULT_HARD_CUT' | 'CURRENT_HUMAN_SELECTION' | 'STALE_HUMAN_SELECTION';
  selectedAt?: string | null;
};

type Batch = {
  schemaVersion?: string;
  authority?: string;
  projectId?: MovieId;
  timeline?: {
    sceneIds?: string[];
    placements?: Array<Record<string, unknown>>;
    transitions?: BatchTransition[];
    totalComputedDurationSeconds?: number;
  };
  scenes?: Array<{
    sceneId?: string;
    sourceRevision?: string;
    status?: string;
    selectedPatternId?: string | null;
    roleContextStatus?: string;
    productionRole?: string | null;
    selectionClass?: string | null;
    package?: ScenePackage | null;
  }>;
  summary?: {totalScenes?: number; currentPackages?: number; currentRoleContexts?: number; batchReadyForPalmierDaVinciHandoff?: boolean; productionReady?: boolean};
};

type StageReport = {
  state: StageState;
  blocker: string | null;
  detail: string | null;
  canonicalArtifacts: {batch: string; roleManifest: string; identityReceipt: string; recovery: string};
  checks: {stageVerification: string; handoffVerification: string};
};

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const validateTransitions = (sceneIds: string[], sourceTransitions: BatchTransition[] | undefined) => {
  const byEdge = new Map((sourceTransitions ?? []).map((item) => [`${item.fromSceneId}->${item.toSceneId}`, item]));
  return sceneIds.slice(1).map((toSceneId, index) => {
    const fromSceneId = sceneIds[index];
    const edgeKey = `${fromSceneId}->${toSceneId}`;
    const source = byEdge.get(edgeKey);
    if (source?.status === 'STALE_HUMAN_SELECTION') throw new Error(`PALMIER_ASSEMBLY_TRANSITION_STALE:${edgeKey}`);
    const transition: TransitionKind = source?.transition === 'CROSS_DISSOLVE' ? 'CROSS_DISSOLVE' : 'HARD_CUT';
    const durationFrames = transition === 'CROSS_DISSOLVE' ? Math.round(Number(source?.durationFrames ?? 0)) : 0;
    if (transition === 'CROSS_DISSOLVE' && (durationFrames < 6 || durationFrames > 30)) {
      throw new Error(`PALMIER_ASSEMBLY_TRANSITION_DURATION_INVALID:${edgeKey}:${durationFrames}`);
    }
    return {
      order: index + 1,
      edgeId: edgeKey,
      fromSceneId,
      toSceneId,
      transition,
      durationFrames,
      sourceStatus: source?.status ?? 'DEFAULT_HARD_CUT',
      selectedAt: source?.selectedAt ?? null,
      palmierInstruction: transition === 'CROSS_DISSOLVE'
        ? `Human-selected CROSS_DISSOLVE ${durationFrames}f. Palmier timelineで ${fromSceneId} -> ${toSceneId} の境界へ同じframe長を適用し、実FCPXML export後にmarker/timingと合わせてHuman確認する。`
        : `HARD_CUT. ${fromSceneId} -> ${toSceneId} の境界に追加transitionを入れない。`,
    };
  });
};

const buildPlan = (movieId: MovieId, stage: StageReport, batch: Batch) => {
  if (batch.schemaVersion !== 'wedding-movie-typography-project-delivery/v1' || batch.authority !== 'DERIVED_PROJECT_HANDOFF') {
    throw new Error('PALMIER_ASSEMBLY_BATCH_ENVELOPE_INVALID');
  }
  if (batch.projectId !== movieId) throw new Error('PALMIER_ASSEMBLY_BATCH_MOVIE_MISMATCH');
  if (batch.summary?.batchReadyForPalmierDaVinciHandoff !== true) throw new Error('PALMIER_ASSEMBLY_BATCH_NOT_READY');
  if (batch.summary?.productionReady !== false) throw new Error('PALMIER_ASSEMBLY_BATCH_MUST_NOT_CLAIM_PRODUCTION_READY');
  const sceneIds = batch.timeline?.sceneIds ?? [];
  const sceneById = new Map((batch.scenes ?? []).map((scene) => [scene.sceneId, scene]));
  if (sceneIds.length === 0 || sceneIds.length !== batch.summary?.totalScenes) throw new Error('PALMIER_ASSEMBLY_TIMELINE_SCENE_COUNT_INVALID');
  const transitions = validateTransitions(sceneIds, batch.timeline?.transitions);
  const transitionInByScene = new Map(transitions.map((edge) => [edge.toSceneId, edge]));
  const transitionOutByScene = new Map(transitions.map((edge) => [edge.fromSceneId, edge]));

  const scenes = sceneIds.map((sceneId, index) => {
    const scene = sceneById.get(sceneId);
    if (!scene || scene.status !== 'CURRENT_PACKAGE_READY' || scene.roleContextStatus !== 'CURRENT_ROLE_CONTEXT' || !scene.package) {
      throw new Error(`PALMIER_ASSEMBLY_SCENE_NOT_CURRENT:${sceneId}`);
    }
    const pkg = scene.package;
    if (pkg.identity?.sceneId !== sceneId || pkg.identity?.projectId !== movieId || pkg.identity?.sourceRevision !== scene.sourceRevision) {
      throw new Error(`PALMIER_ASSEMBLY_SCENE_IDENTITY_MISMATCH:${sceneId}`);
    }
    if (pkg.timeline?.owner !== 'Palmier' || pkg.timeline?.capability !== 'PALMIER_TIMING_ONLY' || pkg.timeline?.xmlGeneratedExternally !== true) {
      throw new Error(`PALMIER_ASSEMBLY_TIMELINE_AUTHORITY_MISMATCH:${sceneId}`);
    }
    if (pkg.canonical?.humanMasterPreserved !== true) throw new Error(`PALMIER_ASSEMBLY_HUMAN_MASTER_NOT_PRESERVED:${sceneId}`);
    if (pkg.davinci?.actualEvidenceState !== 'NOT_RUN' || pkg.release?.productionReady !== false) {
      throw new Error(`PALMIER_ASSEMBLY_GUI_OR_RELEASE_EVIDENCE_INVALID:${sceneId}`);
    }
    const transitionIn = transitionInByScene.get(sceneId) ?? null;
    const transitionOut = transitionOutByScene.get(sceneId) ?? null;
    return {
      order: index + 1,
      sceneId,
      sourceRevision: scene.sourceRevision,
      patternId: scene.selectedPatternId,
      productionRole: scene.productionRole,
      selectionClass: scene.selectionClass,
      canonical: {engine: pkg.canonical?.engine, mode: pkg.canonical?.mode, humanMasterPreserved: true},
      palmier: {
        owner: 'Palmier',
        capability: 'PALMIER_TIMING_ONLY',
        markerId: pkg.timeline?.sceneMarkerId,
        expectedXmlFileName: pkg.timeline?.expectedXmlFileName,
        projectTimelineXmlFileName: pkg.files?.palmierTimelineXmlFileName,
        instruction: pkg.timeline?.instruction,
        transitionIn: transitionIn ? {
          fromSceneId: transitionIn.fromSceneId,
          transition: transitionIn.transition,
          durationFrames: transitionIn.durationFrames,
          instruction: transitionIn.palmierInstruction,
        } : null,
        transitionOut: transitionOut ? {
          toSceneId: transitionOut.toSceneId,
          transition: transitionOut.transition,
          durationFrames: transitionOut.durationFrames,
          instruction: transitionOut.palmierInstruction,
        } : null,
      },
      davinci: {
        routeStatus: pkg.davinci?.routeStatus,
        translatorSpecAvailable: pkg.davinci?.translatorSpecAvailable,
        actualEvidenceState: 'NOT_RUN',
        actualArtifactHint: pkg.files?.davinciActualArtifactHint ?? null,
        evidenceCaptureHint: pkg.files?.davinciEvidenceCaptureHint ?? null,
      },
      remotionStudioGuiActual: pkg.remotion?.studioInstallActual ?? 'NOT_RUN',
      productionPackageFileName: pkg.files?.deliverySidecarFileName,
      productionReady: false,
    };
  });

  return {
    schemaVersion: 'wedding-palmier-typography-assembly-plan/v1',
    authority: 'CANONICAL_STAGED_PROJECT_REMOTION_BATCH',
    movieId,
    stage: {
      state: stage.state,
      stageVerification: stage.checks.stageVerification,
      handoffVerification: stage.checks.handoffVerification,
      canonicalArtifacts: {...stage.canonicalArtifacts},
    },
    timeline: {
      authority: 'STRUCTURED_SCENE_TIMELINE',
      totalComputedDurationSeconds: batch.timeline?.totalComputedDurationSeconds ?? null,
      placements: batch.timeline?.placements ?? [],
      transitions,
    },
    scenes,
    summary: {
      sceneCount: scenes.length,
      transitionEdgeCount: transitions.length,
      crossDissolveCount: transitions.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length,
      patternIds: [...new Set(scenes.map((scene) => scene.patternId).filter(Boolean))],
      productionRoles: [...new Set(scenes.map((scene) => scene.productionRole).filter(Boolean))],
      palmierAssemblyReady: true,
      productionReady: false,
    },
    operatorSequence: [
      '1. KEEP_CANONICAL_STAGE_CURRENT',
      '2. ASSEMBLE_SCENES_IN_STRUCTURED_TIMELINE_ORDER',
      '3. APPLY_HUMAN_SELECTED_SCENE_EDGE_TRANSITIONS_AT_EXACT_FRAME_DURATION',
      '4. PRESERVE_EACH_SCENE_MARKER_AND_HUMAN_MASTER_VALUES',
      '5. EXPORT_REAL_PALMIER_TIMELINE_XML_WITH_MARKERS',
      '6. VERIFY_EXPORTED_TIMELINE_TRANSITION_AND_MARKER_INTENT',
      '7. RUN_CANONICAL_PROJECT_REMOTION_HANDOFF',
      '8. GENERATE_DAVINCI_SESSION_PLAN_AND_START_GATE',
      '9. HUMAN_EXECUTES_MAC_DAVINCI_GUI_ACTUAL_ONLY_AFTER_GATE_ALLOWED',
    ],
    nextCommands: {
      recheckStage: `node --no-warnings scripts/check-wedding-project-remotion-production-stage-status.mts --movie=${movieId} --strict`,
      canonicalHandoff: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=handoff`,
      davinciSessionPlan: 'node --no-warnings scripts/wedding-davinci-actual-session-plan.mts --write',
    },
    evidenceBoundary: {
      remotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
      palmierTimelineActual: 'NOT_EXECUTED_BY_THIS_PLAN',
      macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
      transitionIntentAppliedActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
      productionReadyPromotedByThisPlan: false,
    },
    guardrails: [
      'ASSEMBLY_PLAN != PALMIER_TIMELINE_EXPORT_COMPLETED',
      'TRANSITION_INTENT_IN_PLAN != PALMIER_TRANSITION_ACTUAL_APPLIED',
      'ASSEMBLY_PLAN != REMOTION_STUDIO_GUI_ACTUAL_PASS',
      'ASSEMBLY_PLAN != MAC_DAVINCI_GUI_ACTUAL_PASS',
      'ASSEMBLY_PLAN_MUST_NOT_SYNTHESIZE_NLE_XML',
      'ASSEMBLY_PLAN_MUST_NOT_PROMOTE_PRODUCTION_READY',
    ],
  } as const;
};

const runSelfTest = () => {
  const movieId: MovieId = 'opening';
  const stage: StageReport = {
    state: 'STAGED_CURRENT', blocker: null, detail: null,
    canonicalArtifacts: {batch: '/batch.json', roleManifest: '/role.json', identityReceipt: '/receipt.json', recovery: '/recovery.json'},
    checks: {stageVerification: 'CURRENT', handoffVerification: 'NOT_RUN'},
  };
  const packageFor = (sceneId: string, sourceRevision: string): ScenePackage => ({
    identity: {sceneId, projectId: movieId, sourceRevision, patternId: 'type-mask-reveal'},
    canonical: {engine: 'TypographyRevealEngine', mode: 'mask-reveal', humanMasterPreserved: true},
    timeline: {owner: 'Palmier', capability: 'PALMIER_TIMING_ONLY', expectedXmlFileName: `${sceneId}.fcpxml`, sceneMarkerId: `WEDDING_SCENE:${sceneId}`, xmlGeneratedExternally: true, instruction: 'Place and trim in Palmier.'},
    davinci: {routeStatus: 'DAVINCI_IMPLEMENTATION_AVAILABLE', translatorSpecAvailable: true, actualEvidenceState: 'NOT_RUN'},
    remotion: {studioInstallActual: 'NOT_RUN', studioControlReadbackActual: 'NOT_RUN'},
    files: {deliverySidecarFileName: `${sceneId}-production-package.json`, palmierTimelineXmlFileName: 'opening.fcpxml', davinciActualArtifactHint: null, davinciEvidenceCaptureHint: null},
    release: {productionReady: false},
  });
  const batch: Batch = {
    schemaVersion: 'wedding-movie-typography-project-delivery/v1', authority: 'DERIVED_PROJECT_HANDOFF', projectId: movieId,
    timeline: {
      sceneIds: ['scene-1', 'scene-2'],
      placements: [
        {sceneId: 'scene-1', startSeconds: 0, durationSeconds: 2},
        {sceneId: 'scene-2', startSeconds: 2, durationSeconds: 2},
      ],
      transitions: [{fromSceneId: 'scene-1', toSceneId: 'scene-2', transition: 'CROSS_DISSOLVE', durationFrames: 12, status: 'CURRENT_HUMAN_SELECTION', selectedAt: '2026-08-31T12:00:00.000Z'}],
      totalComputedDurationSeconds: 4,
    },
    scenes: [
      {sceneId: 'scene-1', sourceRevision: 'rev-1', status: 'CURRENT_PACKAGE_READY', selectedPatternId: 'type-mask-reveal', roleContextStatus: 'CURRENT_ROLE_CONTEXT', productionRole: 'TITLE', selectionClass: 'PRIMARY', package: packageFor('scene-1', 'rev-1')},
      {sceneId: 'scene-2', sourceRevision: 'rev-2', status: 'CURRENT_PACKAGE_READY', selectedPatternId: 'quiet-caption', roleContextStatus: 'CURRENT_ROLE_CONTEXT', productionRole: 'DATE', selectionClass: 'FALLBACK', package: packageFor('scene-2', 'rev-2')},
    ],
    summary: {totalScenes: 2, currentPackages: 2, currentRoleContexts: 2, batchReadyForPalmierDaVinciHandoff: true, productionReady: false},
  };
  const plan = buildPlan(movieId, stage, batch);
  if (plan.summary.palmierAssemblyReady !== true || plan.summary.productionReady !== false) throw new Error('SELF_TEST_READINESS_BOUNDARY_FAILED');
  if (plan.scenes[0]?.palmier.markerId !== 'WEDDING_SCENE:scene-1') throw new Error('SELF_TEST_MARKER_BINDING_FAILED');
  if (plan.scenes[0]?.davinci.actualEvidenceState !== 'NOT_RUN') throw new Error('SELF_TEST_DAVINCI_ACTUAL_BOUNDARY_FAILED');
  if (plan.timeline.transitions[0]?.transition !== 'CROSS_DISSOLVE' || plan.timeline.transitions[0]?.durationFrames !== 12) throw new Error('SELF_TEST_TRANSITION_BINDING_FAILED');
  if (plan.scenes[0]?.palmier.transitionOut?.durationFrames !== 12 || plan.scenes[1]?.palmier.transitionIn?.durationFrames !== 12) throw new Error('SELF_TEST_SCENE_TRANSITION_PACKET_FAILED');
  if (plan.evidenceBoundary.transitionIntentAppliedActual !== 'NOT_RUN_UNLESS_HUMAN_EXECUTED') throw new Error('SELF_TEST_TRANSITION_ACTUAL_BOUNDARY_FAILED');

  const staleBatch: Batch = structuredClone(batch);
  staleBatch.timeline!.transitions![0].status = 'STALE_HUMAN_SELECTION';
  let staleRejected = false;
  try { buildPlan(movieId, stage, staleBatch); } catch (error) { staleRejected = String(error).includes('PALMIER_ASSEMBLY_TRANSITION_STALE'); }
  if (!staleRejected) throw new Error('SELF_TEST_STALE_TRANSITION_NOT_REJECTED');
  console.log('PASS / WEDDING_PALMIER_TYPOGRAPHY_ASSEMBLY_PLAN_SELF_TEST');
};

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const movieArg = argValue('--movie');
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('BLOCK / MOVIE_MUST_BE_OPENING_OR_PROFILE');
  process.exit(2);
}
const movieId: MovieId = movieArg;
const statusResult = spawnSync(process.execPath, ['--no-warnings', join(motionStudioRoot, 'scripts/check-wedding-project-remotion-production-stage-status.mts'), `--movie=${movieId}`, '--json'], {cwd: motionStudioRoot, encoding: 'utf8'});
if (statusResult.status !== 0) {
  console.error(`BLOCK / PROJECT_REMOTION_STAGE_STATUS_CHECK_FAILED / ${statusResult.stderr || statusResult.stdout}`);
  process.exit(2);
}
const stage = JSON.parse(statusResult.stdout) as StageReport;
if (stage.state !== 'STAGED_CURRENT' && stage.state !== 'HANDOFF_CURRENT') {
  console.error(`BLOCK / CANONICAL_PROJECT_REMOTION_STAGE_NOT_CURRENT / state=${stage.state} / blocker=${stage.blocker ?? 'NONE'}`);
  process.exit(stage.state === 'NOT_STAGED' ? 3 : 2);
}

const batch = JSON.parse(readFileSync(stage.canonicalArtifacts.batch, 'utf8')) as Batch;
let plan: ReturnType<typeof buildPlan>;
try {
  plan = buildPlan(movieId, stage, batch);
} catch (error) {
  console.error(`BLOCK / PALMIER_ASSEMBLY_PLAN_INVALID / ${error instanceof Error ? error.message : String(error)}`);
  process.exit(2);
}

const json = JSON.stringify(plan, null, 2);
const outputPath = resolve(argValue('--output') ?? join(motionStudioRoot, `out/handoff/wedding/${movieId}-palmier-typography-assembly-plan.json`));
if (process.argv.includes('--write')) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${json}\n`);
  console.error(`wrote=${relative(repoRoot, outputPath)}`);
}
if (process.argv.includes('--json') || !process.argv.includes('--write')) console.log(json);