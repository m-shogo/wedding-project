import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';

type MovieId = 'opening' | 'profile';
type TransitionKind = 'HARD_CUT' | 'CROSS_DISSOLVE';
type AssemblyTransition = {
  order?: number;
  edgeId?: string;
  fromSceneId?: string;
  toSceneId?: string;
  transition?: TransitionKind;
  durationFrames?: number;
  sourceStatus?: string;
};
type AssemblyPlan = {
  schemaVersion?: string;
  authority?: string;
  movieId?: MovieId;
  timeline?: {transitions?: AssemblyTransition[]};
  scenes?: Array<{
    order?: number;
    sceneId?: string;
    sourceRevision?: string;
    patternId?: string | null;
    palmier?: {
      markerId?: string;
      expectedXmlFileName?: string;
      projectTimelineXmlFileName?: string;
      transitionIn?: {fromSceneId?: string; transition?: TransitionKind; durationFrames?: number} | null;
      transitionOut?: {toSceneId?: string; transition?: TransitionKind; durationFrames?: number} | null;
    };
  }>;
  summary?: {sceneCount?: number; transitionEdgeCount?: number; crossDissolveCount?: number; palmierAssemblyReady?: boolean; productionReady?: boolean};
};

type XmlTransition = {
  byteOffset: number;
  raw: string;
  name: string | null;
  durationRaw: string | null;
  durationFrames: number | null;
};

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const TIMELINE_FPS = 30;
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const sha256 = (content: Buffer | string) => createHash('sha256').update(content).digest('hex');
const countLiteral = (haystack: string, needle: string) => needle.length === 0 ? 0 : haystack.split(needle).length - 1;
const attr = (raw: string, name: string) => raw.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? null;

const parseFcpxmlDurationFrames = (raw: string | null) => {
  if (!raw) return null;
  const rational = raw.match(/^(-?\d+)\/(\d+)s$/);
  if (rational) {
    const numerator = Number(rational[1]);
    const denominator = Number(rational[2]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return null;
    return Math.round((numerator / denominator) * TIMELINE_FPS);
  }
  const decimal = raw.match(/^(-?(?:\d+(?:\.\d+)?|\.\d+))s$/);
  if (decimal) {
    const seconds = Number(decimal[1]);
    return Number.isFinite(seconds) ? Math.round(seconds * TIMELINE_FPS) : null;
  }
  return null;
};

const parseXmlTransitions = (xmlRaw: string): XmlTransition[] => {
  const transitions: XmlTransition[] = [];
  const pattern = /<transition\b[^>]*(?:\/>|>[\s\S]*?<\/transition>)/gi;
  for (const match of xmlRaw.matchAll(pattern)) {
    const raw = match[0];
    const directName = attr(raw, 'name');
    const nestedName = raw.match(/<(?:filter-video|filter-audio)\b[^>]*\bname="([^"]+)"/i)?.[1] ?? null;
    const durationRaw = attr(raw, 'duration');
    transitions.push({
      byteOffset: match.index ?? -1,
      raw,
      name: directName ?? nestedName,
      durationRaw,
      durationFrames: parseFcpxmlDurationFrames(durationRaw),
    });
  }
  return transitions;
};

const isCrossDissolve = (transition: XmlTransition) => /cross\s*dissolve/i.test(transition.name ?? transition.raw);

const validatePlanTransitions = (plan: AssemblyPlan, scenes: NonNullable<AssemblyPlan['scenes']>) => {
  const expectedEdges = scenes.slice(1).map((toScene, index) => {
    const fromScene = scenes[index];
    const fromSceneId = fromScene?.sceneId;
    const toSceneId = toScene?.sceneId;
    if (!fromSceneId || !toSceneId) throw new Error(`PALMIER_TIMELINE_TRANSITION_SCENE_ID_MISSING:${index}`);
    const edgeId = `${fromSceneId}->${toSceneId}`;
    const source = (plan.timeline?.transitions ?? []).find((edge) => edge.edgeId === edgeId || (edge.fromSceneId === fromSceneId && edge.toSceneId === toSceneId));
    if (!source) throw new Error(`PALMIER_TIMELINE_TRANSITION_PLAN_EDGE_MISSING:${edgeId}`);
    const transition: TransitionKind = source.transition === 'CROSS_DISSOLVE' ? 'CROSS_DISSOLVE' : 'HARD_CUT';
    const durationFrames = transition === 'CROSS_DISSOLVE' ? Math.round(Number(source.durationFrames ?? 0)) : 0;
    if (transition === 'CROSS_DISSOLVE' && (durationFrames < 6 || durationFrames > 30)) {
      throw new Error(`PALMIER_TIMELINE_TRANSITION_PLAN_DURATION_INVALID:${edgeId}:${durationFrames}`);
    }
    const transitionOut = fromScene?.palmier?.transitionOut;
    const transitionIn = toScene?.palmier?.transitionIn;
    if (transitionOut?.toSceneId !== toSceneId || transitionIn?.fromSceneId !== fromSceneId || transitionOut.transition !== transition || transitionIn.transition !== transition || Number(transitionOut.durationFrames ?? 0) !== durationFrames || Number(transitionIn.durationFrames ?? 0) !== durationFrames) {
      throw new Error(`PALMIER_TIMELINE_TRANSITION_SCENE_BINDING_MISMATCH:${edgeId}`);
    }
    return {order: index + 1, edgeId, fromSceneId, toSceneId, transition, durationFrames};
  });
  if ((plan.summary?.transitionEdgeCount ?? expectedEdges.length) !== expectedEdges.length) throw new Error('PALMIER_TIMELINE_TRANSITION_EDGE_COUNT_INVALID');
  if ((plan.timeline?.transitions ?? []).length !== expectedEdges.length) throw new Error('PALMIER_TIMELINE_TRANSITION_PLAN_COUNT_INVALID');
  const crossCount = expectedEdges.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length;
  if ((plan.summary?.crossDissolveCount ?? crossCount) !== crossCount) throw new Error('PALMIER_TIMELINE_CROSS_DISSOLVE_COUNT_INVALID');
  return expectedEdges;
};

const verifyExport = (movieId: MovieId, planRaw: string, xmlRaw: string, planPath: string, xmlPath: string) => {
  const plan = JSON.parse(planRaw) as AssemblyPlan;
  if (plan.schemaVersion !== 'wedding-palmier-typography-assembly-plan/v1' || plan.authority !== 'CANONICAL_STAGED_PROJECT_REMOTION_BATCH') {
    throw new Error('PALMIER_TIMELINE_RECEIPT_PLAN_ENVELOPE_INVALID');
  }
  if (plan.movieId !== movieId) throw new Error('PALMIER_TIMELINE_RECEIPT_PLAN_MOVIE_MISMATCH');
  if (plan.summary?.palmierAssemblyReady !== true || plan.summary?.productionReady !== false) {
    throw new Error('PALMIER_TIMELINE_RECEIPT_PLAN_NOT_ASSEMBLY_READY');
  }
  if (!/<fcpxml\b/i.test(xmlRaw)) throw new Error('PALMIER_TIMELINE_EXPORT_NOT_FCPXML');
  const scenes = plan.scenes ?? [];
  if (scenes.length === 0 || scenes.length !== plan.summary?.sceneCount) throw new Error('PALMIER_TIMELINE_RECEIPT_SCENE_COUNT_INVALID');

  let previousOffset = -1;
  const markerChecks = scenes.map((scene, index) => {
    if (scene.order !== index + 1 || !scene.sceneId || !scene.sourceRevision || !scene.palmier?.markerId) {
      throw new Error(`PALMIER_TIMELINE_RECEIPT_SCENE_PLAN_INVALID:${scene.sceneId ?? index}`);
    }
    const markerId = scene.palmier.markerId;
    const count = countLiteral(xmlRaw, markerId);
    if (count !== 1) throw new Error(`PALMIER_TIMELINE_MARKER_COUNT_INVALID:${scene.sceneId}:${count}`);
    const offset = xmlRaw.indexOf(markerId);
    if (offset <= previousOffset) throw new Error(`PALMIER_TIMELINE_MARKER_ORDER_INVALID:${scene.sceneId}`);
    previousOffset = offset;
    return {
      order: scene.order,
      sceneId: scene.sceneId,
      sourceRevision: scene.sourceRevision,
      patternId: scene.patternId ?? null,
      markerId,
      markerOccurrenceCount: count,
      markerByteOffset: offset,
      expectedXmlFileName: scene.palmier.expectedXmlFileName ?? null,
      projectTimelineXmlFileName: scene.palmier.projectTimelineXmlFileName ?? null,
      state: 'CURRENT' as const,
    };
  });

  const expectedEdges = validatePlanTransitions(plan, scenes);
  const xmlTransitions = parseXmlTransitions(xmlRaw);
  const transitionChecks = expectedEdges.map((edge) => {
    const fromMarker = markerChecks[edge.order - 1];
    const toMarker = markerChecks[edge.order];
    if (!fromMarker || !toMarker) throw new Error(`PALMIER_TIMELINE_TRANSITION_MARKER_BINDING_MISSING:${edge.edgeId}`);
    const candidates = xmlTransitions.filter((item) => item.byteOffset > fromMarker.markerByteOffset && item.byteOffset < toMarker.markerByteOffset);
    if (edge.transition === 'HARD_CUT') {
      if (candidates.length !== 0) throw new Error(`PALMIER_TIMELINE_HARD_CUT_HAS_TRANSITION:${edge.edgeId}:${candidates.length}`);
      return {
        ...edge,
        expectedTransition: 'HARD_CUT' as const,
        expectedDurationFrames: 0,
        transitionOccurrenceCountBetweenMarkers: 0,
        matchedTransitionByteOffset: null,
        matchedTransitionName: null,
        matchedDurationRaw: null,
        matchedDurationFrames: 0,
        state: 'CURRENT' as const,
      };
    }
    const dissolveCandidates = candidates.filter(isCrossDissolve);
    if (dissolveCandidates.length !== 1) throw new Error(`PALMIER_TIMELINE_CROSS_DISSOLVE_COUNT_INVALID:${edge.edgeId}:${dissolveCandidates.length}`);
    if (candidates.length !== 1) throw new Error(`PALMIER_TIMELINE_UNEXPECTED_ADDITIONAL_TRANSITION:${edge.edgeId}:${candidates.length}`);
    const matched = dissolveCandidates[0];
    if (matched.durationFrames === null) throw new Error(`PALMIER_TIMELINE_CROSS_DISSOLVE_DURATION_UNREADABLE:${edge.edgeId}:${matched.durationRaw ?? 'MISSING'}`);
    if (matched.durationFrames !== edge.durationFrames) throw new Error(`PALMIER_TIMELINE_CROSS_DISSOLVE_DURATION_MISMATCH:${edge.edgeId}:expected=${edge.durationFrames}:actual=${matched.durationFrames}`);
    return {
      ...edge,
      expectedTransition: 'CROSS_DISSOLVE' as const,
      expectedDurationFrames: edge.durationFrames,
      transitionOccurrenceCountBetweenMarkers: candidates.length,
      matchedTransitionByteOffset: matched.byteOffset,
      matchedTransitionName: matched.name,
      matchedDurationRaw: matched.durationRaw,
      matchedDurationFrames: matched.durationFrames,
      state: 'CURRENT' as const,
    };
  });

  const matchedTransitionOffsets = new Set(transitionChecks.map((check) => check.matchedTransitionByteOffset).filter((value): value is number => value !== null));
  const unboundTransitions = xmlTransitions.filter((item) => !matchedTransitionOffsets.has(item.byteOffset));
  if (unboundTransitions.length !== 0) throw new Error(`PALMIER_TIMELINE_UNBOUND_TRANSITION_PRESENT:${unboundTransitions.length}`);

  return {
    schemaVersion: 'wedding-palmier-typography-timeline-export-receipt/v1',
    authority: 'VERIFIED_PALMIER_TIMELINE_EXPORT_AGAINST_ASSEMBLY_PLAN',
    movieId,
    state: 'CURRENT' as const,
    source: {
      assemblyPlan: {path: planPath, sha256: sha256(planRaw)},
      palmierFcpxml: {path: xmlPath, sha256: sha256(xmlRaw)},
    },
    verification: {
      sceneCount: scenes.length,
      transitionEdgeCount: expectedEdges.length,
      allMarkersPresentExactlyOnce: true,
      markerOrderMatchesAssemblyPlan: true,
      transitionIntentMatchesAssemblyPlan: true,
      transitionDurationMatchesAssemblyPlan: true,
      noUnboundTransitions: true,
      markerChecks,
      transitionChecks,
    },
    next: {
      kind: 'RUN_CANONICAL_PROJECT_REMOTION_HANDOFF_WHEN_UPSTREAM_READY',
      command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=handoff`,
    },
    evidenceBoundary: {
      palmierTimelineExportArtifactVerified: true,
      palmierTransitionIntentVerifiedFromFcpxml: true,
      palmierGuiActualPerformedByThisVerifier: false,
      transitionAppliedGuiActualPerformedByThisVerifier: false,
      remotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
      macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
      productionReadyPromotedByThisVerifier: false,
    },
    guardrails: [
      'FCPXML_MARKER_AND_TRANSITION_VERIFIED != PALMIER_GUI_ACTUAL_PROVEN',
      'FCPXML_TRANSITION_VERIFIED != TRANSITION_GUI_ACTUAL_PASS',
      'FCPXML_MARKER_AND_TRANSITION_VERIFIED != REMOTION_STUDIO_GUI_ACTUAL_PASS',
      'FCPXML_MARKER_AND_TRANSITION_VERIFIED != MAC_DAVINCI_GUI_ACTUAL_PASS',
      'FCPXML_MARKER_AND_TRANSITION_VERIFIED != PRODUCTION_READY',
      'RECEIPT_IS_BOUND_TO_ASSEMBLY_PLAN_SHA_AND_FCPXML_SHA',
    ],
  } as const;
};

const runSelfTest = () => {
  const plan = JSON.stringify({
    schemaVersion: 'wedding-palmier-typography-assembly-plan/v1',
    authority: 'CANONICAL_STAGED_PROJECT_REMOTION_BATCH',
    movieId: 'opening',
    timeline: {transitions: [{order: 1, edgeId: 'scene-a->scene-b', fromSceneId: 'scene-a', toSceneId: 'scene-b', transition: 'CROSS_DISSOLVE', durationFrames: 12, sourceStatus: 'CURRENT_HUMAN_SELECTION'}]},
    scenes: [
      {order: 1, sceneId: 'scene-a', sourceRevision: 'rev-a', patternId: 'type-mask-reveal', palmier: {markerId: 'WEDDING_SCENE:scene-a', expectedXmlFileName: 'a.fcpxml', projectTimelineXmlFileName: 'opening.fcpxml', transitionIn: null, transitionOut: {toSceneId: 'scene-b', transition: 'CROSS_DISSOLVE', durationFrames: 12}}},
      {order: 2, sceneId: 'scene-b', sourceRevision: 'rev-b', patternId: 'type-char-stagger', palmier: {markerId: 'WEDDING_SCENE:scene-b', expectedXmlFileName: 'b.fcpxml', projectTimelineXmlFileName: 'opening.fcpxml', transitionIn: {fromSceneId: 'scene-a', transition: 'CROSS_DISSOLVE', durationFrames: 12}, transitionOut: null}},
    ],
    summary: {sceneCount: 2, transitionEdgeCount: 1, crossDissolveCount: 1, palmierAssemblyReady: true, productionReady: false},
  });
  const validXml = '<fcpxml version="1.11"><library><event><project><sequence><spine><asset-clip><marker value="WEDDING_SCENE:scene-a"/></asset-clip><transition name="Cross Dissolve" duration="12/30s"><filter-video name="Cross Dissolve"/></transition><asset-clip><marker value="WEDDING_SCENE:scene-b"/></asset-clip></spine></sequence></project></event></library></fcpxml>';
  const receipt = verifyExport('opening', plan, validXml, '/plan.json', '/opening.fcpxml');
  if (receipt.state !== 'CURRENT' || receipt.verification.markerChecks.length !== 2 || receipt.verification.transitionChecks.length !== 1) throw new Error('SELF_TEST_CURRENT_RECEIPT_FAILED');
  if (receipt.verification.transitionChecks[0]?.matchedDurationFrames !== 12 || receipt.verification.transitionIntentMatchesAssemblyPlan !== true) throw new Error('SELF_TEST_TRANSITION_BINDING_FAILED');
  if (receipt.evidenceBoundary.palmierGuiActualPerformedByThisVerifier !== false || receipt.evidenceBoundary.transitionAppliedGuiActualPerformedByThisVerifier !== false || receipt.evidenceBoundary.productionReadyPromotedByThisVerifier !== false) throw new Error('SELF_TEST_EVIDENCE_BOUNDARY_FAILED');

  let durationBlocked = false;
  try {
    verifyExport('opening', plan, validXml.replace('duration="12/30s"', 'duration="10/30s"'), '/plan.json', '/opening.fcpxml');
  } catch (error) {
    durationBlocked = error instanceof Error && error.message.includes('PALMIER_TIMELINE_CROSS_DISSOLVE_DURATION_MISMATCH');
  }
  if (!durationBlocked) throw new Error('SELF_TEST_TRANSITION_DURATION_MISMATCH_MUST_BLOCK');

  let missingTransitionBlocked = false;
  try {
    verifyExport('opening', plan, validXml.replace('<transition name="Cross Dissolve" duration="12/30s"><filter-video name="Cross Dissolve"/></transition>', ''), '/plan.json', '/opening.fcpxml');
  } catch (error) {
    missingTransitionBlocked = error instanceof Error && error.message.includes('PALMIER_TIMELINE_CROSS_DISSOLVE_COUNT_INVALID');
  }
  if (!missingTransitionBlocked) throw new Error('SELF_TEST_MISSING_TRANSITION_MUST_BLOCK');

  const hardCutPlan = plan.replace('"transition":"CROSS_DISSOLVE","durationFrames":12', '"transition":"HARD_CUT","durationFrames":0').replace('"crossDissolveCount":1', '"crossDissolveCount":0');
  let unexpectedTransitionBlocked = false;
  try {
    verifyExport('opening', hardCutPlan, validXml, '/plan.json', '/opening.fcpxml');
  } catch (error) {
    unexpectedTransitionBlocked = error instanceof Error && error.message.includes('PALMIER_TIMELINE_HARD_CUT_HAS_TRANSITION');
  }
  if (!unexpectedTransitionBlocked) throw new Error('SELF_TEST_HARD_CUT_WITH_TRANSITION_MUST_BLOCK');

  let reversedBlocked = false;
  try {
    verifyExport('opening', plan, validXml.replace('<asset-clip><marker value="WEDDING_SCENE:scene-a"/></asset-clip><transition name="Cross Dissolve" duration="12/30s"><filter-video name="Cross Dissolve"/></transition><asset-clip><marker value="WEDDING_SCENE:scene-b"/></asset-clip>', '<asset-clip><marker value="WEDDING_SCENE:scene-b"/></asset-clip><transition name="Cross Dissolve" duration="12/30s"><filter-video name="Cross Dissolve"/></transition><asset-clip><marker value="WEDDING_SCENE:scene-a"/></asset-clip>'), '/plan.json', '/opening.fcpxml');
  } catch (error) {
    reversedBlocked = error instanceof Error && error.message.includes('PALMIER_TIMELINE_MARKER_ORDER_INVALID');
  }
  if (!reversedBlocked) throw new Error('SELF_TEST_REVERSED_MARKERS_MUST_BLOCK');

  let duplicateBlocked = false;
  try {
    verifyExport('opening', plan, validXml.replace('</spine>', '<marker value="WEDDING_SCENE:scene-a"/></spine>'), '/plan.json', '/opening.fcpxml');
  } catch (error) {
    duplicateBlocked = error instanceof Error && error.message.includes('PALMIER_TIMELINE_MARKER_COUNT_INVALID');
  }
  if (!duplicateBlocked) throw new Error('SELF_TEST_DUPLICATE_MARKERS_MUST_BLOCK');
  console.log('PASS / WEDDING_PALMIER_TYPOGRAPHY_TIMELINE_EXPORT_RECEIPT_SELF_TEST');
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
const planPath = resolve(argValue('--plan') ?? join(motionStudioRoot, `out/handoff/wedding/${movieId}-palmier-typography-assembly-plan.json`));
const xmlArg = argValue('--xml');
if (!xmlArg) {
  console.error('BLOCK / PALMIER_TIMELINE_XML_PATH_REQUIRED / export the real Palmier FCPXML and pass --xml=<path>');
  process.exit(2);
}
const xmlPath = resolve(xmlArg);
if (!existsSync(planPath)) {
  console.error(`BLOCK / PALMIER_ASSEMBLY_PLAN_MISSING / ${planPath}`);
  process.exit(3);
}
if (!existsSync(xmlPath)) {
  console.error(`BLOCK / PALMIER_TIMELINE_XML_MISSING / ${xmlPath}`);
  process.exit(3);
}

let receipt: ReturnType<typeof verifyExport>;
try {
  receipt = verifyExport(movieId, readFileSync(planPath, 'utf8'), readFileSync(xmlPath, 'utf8'), planPath, xmlPath);
} catch (error) {
  console.error(`BLOCK / PALMIER_TIMELINE_EXPORT_VERIFICATION_FAILED / ${error instanceof Error ? error.message : String(error)}`);
  process.exit(2);
}
const json = JSON.stringify(receipt, null, 2);
const outputPath = resolve(argValue('--output') ?? join(motionStudioRoot, `out/handoff/wedding/${movieId}-palmier-typography-timeline-export-receipt.json`));
if (process.argv.includes('--write')) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${json}\n`);
  console.error(`wrote=${relative(repoRoot, outputPath)}`);
}
if (process.argv.includes('--json') || !process.argv.includes('--write')) console.log(json);
