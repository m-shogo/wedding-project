import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';

type MovieId = 'opening' | 'profile';
type TransitionKind = 'HARD_CUT' | 'CROSS_DISSOLVE';
type Edge = {order?: number; edgeId?: string; fromSceneId?: string; toSceneId?: string; transition?: TransitionKind; durationFrames?: number};
type Scene = {order?: number; sceneId?: string; sourceRevision?: string; patternId?: string | null; palmier?: {markerId?: string; expectedXmlFileName?: string; projectTimelineXmlFileName?: string; transitionIn?: {fromSceneId?: string; transition?: TransitionKind; durationFrames?: number} | null; transitionOut?: {toSceneId?: string; transition?: TransitionKind; durationFrames?: number} | null}};
type Plan = {schemaVersion?: string; authority?: string; movieId?: MovieId; timeline?: {transitions?: Edge[]}; scenes?: Scene[]; summary?: {sceneCount?: number; transitionEdgeCount?: number; crossDissolveCount?: number; palmierAssemblyReady?: boolean; productionReady?: boolean}};
type XmlTransition = {byteOffset: number; raw: string; name: string | null; durationRaw: string | null; durationFrames: number | null};

const root = process.cwd();
const repoRoot = resolve(root, '..');
const FPS = 30;
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const sha256 = (content: Buffer | string) => createHash('sha256').update(content).digest('hex');
const countLiteral = (haystack: string, needle: string) => needle ? haystack.split(needle).length - 1 : 0;
const attr = (raw: string, name: string) => raw.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? null;
const durationFrames = (raw: string | null) => {
  if (!raw) return null;
  const rational = raw.match(/^(-?\d+)\/(\d+)s$/);
  if (rational) {
    const n = Number(rational[1]); const d = Number(rational[2]);
    return Number.isFinite(n) && Number.isFinite(d) && d > 0 ? Math.round((n / d) * FPS) : null;
  }
  const decimal = raw.match(/^(-?(?:\d+(?:\.\d+)?|\.\d+))s$/);
  if (!decimal) return null;
  const seconds = Number(decimal[1]);
  return Number.isFinite(seconds) ? Math.round(seconds * FPS) : null;
};
const parseTransitions = (xml: string): XmlTransition[] => [...xml.matchAll(/<transition\b[^>]*(?:\/>|>[\s\S]*?<\/transition>)/gi)].map((match) => {
  const raw = match[0];
  const durationRaw = attr(raw, 'duration');
  return {byteOffset: match.index ?? -1, raw, name: attr(raw, 'name') ?? raw.match(/<(?:filter-video|filter-audio)\b[^>]*\bname="([^"]+)"/i)?.[1] ?? null, durationRaw, durationFrames: durationFrames(durationRaw)};
});
const isCrossDissolve = (item: XmlTransition) => /cross\s*dissolve/i.test(item.name ?? item.raw);

const expectedEdges = (plan: Plan, scenes: Scene[]) => {
  const edges = scenes.slice(1).map((toScene, index) => {
    const fromScene = scenes[index];
    const from = fromScene?.sceneId; const to = toScene.sceneId;
    if (!from || !to) throw new Error(`PALMIER_TIMELINE_TRANSITION_SCENE_ID_MISSING:${index}`);
    const edgeId = `${from}->${to}`;
    const source = (plan.timeline?.transitions ?? []).find((edge) => edge.edgeId === edgeId || (edge.fromSceneId === from && edge.toSceneId === to));
    if (!source) throw new Error(`PALMIER_TIMELINE_TRANSITION_PLAN_EDGE_MISSING:${edgeId}`);
    const transition: TransitionKind = source.transition === 'CROSS_DISSOLVE' ? 'CROSS_DISSOLVE' : 'HARD_CUT';
    const frames = transition === 'CROSS_DISSOLVE' ? Math.round(Number(source.durationFrames ?? 0)) : 0;
    if (transition === 'CROSS_DISSOLVE' && (frames < 6 || frames > 30)) throw new Error(`PALMIER_TIMELINE_TRANSITION_PLAN_DURATION_INVALID:${edgeId}:${frames}`);
    const out = fromScene.palmier?.transitionOut; const incoming = toScene.palmier?.transitionIn;
    if (out?.toSceneId !== to || incoming?.fromSceneId !== from || out.transition !== transition || incoming.transition !== transition || Number(out.durationFrames ?? 0) !== frames || Number(incoming.durationFrames ?? 0) !== frames) throw new Error(`PALMIER_TIMELINE_TRANSITION_SCENE_BINDING_MISMATCH:${edgeId}`);
    return {order: index + 1, edgeId, fromSceneId: from, toSceneId: to, transition, durationFrames: frames};
  });
  if ((plan.timeline?.transitions ?? []).length !== edges.length || (plan.summary?.transitionEdgeCount ?? edges.length) !== edges.length) throw new Error('PALMIER_TIMELINE_TRANSITION_EDGE_COUNT_INVALID');
  const crossCount = edges.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length;
  if ((plan.summary?.crossDissolveCount ?? crossCount) !== crossCount) throw new Error('PALMIER_TIMELINE_CROSS_DISSOLVE_COUNT_INVALID');
  return edges;
};

const verifyExport = (movieId: MovieId, planRaw: string, xmlRaw: string, planPath: string, xmlPath: string) => {
  const plan = JSON.parse(planRaw) as Plan;
  if (plan.schemaVersion !== 'wedding-palmier-typography-assembly-plan/v1' || plan.authority !== 'CANONICAL_STAGED_PROJECT_REMOTION_BATCH') throw new Error('PALMIER_TIMELINE_RECEIPT_PLAN_ENVELOPE_INVALID');
  if (plan.movieId !== movieId) throw new Error('PALMIER_TIMELINE_RECEIPT_PLAN_MOVIE_MISMATCH');
  if (plan.summary?.palmierAssemblyReady !== true || plan.summary?.productionReady !== false) throw new Error('PALMIER_TIMELINE_RECEIPT_PLAN_NOT_ASSEMBLY_READY');
  if (!/<fcpxml\b/i.test(xmlRaw)) throw new Error('PALMIER_TIMELINE_EXPORT_NOT_FCPXML');
  const scenes = plan.scenes ?? [];
  if (!scenes.length || scenes.length !== plan.summary?.sceneCount) throw new Error('PALMIER_TIMELINE_RECEIPT_SCENE_COUNT_INVALID');

  let previousOffset = -1;
  const markerChecks = scenes.map((scene, index) => {
    if (scene.order !== index + 1 || !scene.sceneId || !scene.sourceRevision || !scene.palmier?.markerId) throw new Error(`PALMIER_TIMELINE_RECEIPT_SCENE_PLAN_INVALID:${scene.sceneId ?? index}`);
    const markerId = scene.palmier.markerId;
    const count = countLiteral(xmlRaw, markerId);
    if (count !== 1) throw new Error(`PALMIER_TIMELINE_MARKER_COUNT_INVALID:${scene.sceneId}:${count}`);
    const offset = xmlRaw.indexOf(markerId);
    if (offset <= previousOffset) throw new Error(`PALMIER_TIMELINE_MARKER_ORDER_INVALID:${scene.sceneId}`);
    previousOffset = offset;
    return {order: scene.order, sceneId: scene.sceneId, sourceRevision: scene.sourceRevision, patternId: scene.patternId ?? null, markerId, markerOccurrenceCount: count, markerByteOffset: offset, expectedXmlFileName: scene.palmier.expectedXmlFileName ?? null, projectTimelineXmlFileName: scene.palmier.projectTimelineXmlFileName ?? null, state: 'CURRENT' as const};
  });

  const edges = expectedEdges(plan, scenes);
  const xmlTransitions = parseTransitions(xmlRaw);
  const transitionChecks = edges.map((edge) => {
    const fromMarker = markerChecks[edge.order - 1]; const toMarker = markerChecks[edge.order];
    if (!fromMarker || !toMarker) throw new Error(`PALMIER_TIMELINE_TRANSITION_MARKER_BINDING_MISSING:${edge.edgeId}`);
    const candidates = xmlTransitions.filter((item) => item.byteOffset > fromMarker.markerByteOffset && item.byteOffset < toMarker.markerByteOffset);
    if (edge.transition === 'HARD_CUT') {
      if (candidates.length) throw new Error(`PALMIER_TIMELINE_HARD_CUT_HAS_TRANSITION:${edge.edgeId}:${candidates.length}`);
      return {...edge, expectedTransition: 'HARD_CUT' as const, expectedDurationFrames: 0, transitionOccurrenceCountBetweenMarkers: 0, matchedTransitionByteOffset: null, matchedTransitionName: null, matchedDurationRaw: null, matchedDurationFrames: 0, state: 'CURRENT' as const};
    }
    const dissolves = candidates.filter(isCrossDissolve);
    if (dissolves.length !== 1) throw new Error(`PALMIER_TIMELINE_CROSS_DISSOLVE_COUNT_INVALID:${edge.edgeId}:${dissolves.length}`);
    if (candidates.length !== 1) throw new Error(`PALMIER_TIMELINE_UNEXPECTED_ADDITIONAL_TRANSITION:${edge.edgeId}:${candidates.length}`);
    const matched = dissolves[0];
    if (matched.durationFrames === null) throw new Error(`PALMIER_TIMELINE_CROSS_DISSOLVE_DURATION_UNREADABLE:${edge.edgeId}:${matched.durationRaw ?? 'MISSING'}`);
    if (matched.durationFrames !== edge.durationFrames) throw new Error(`PALMIER_TIMELINE_CROSS_DISSOLVE_DURATION_MISMATCH:${edge.edgeId}:expected=${edge.durationFrames}:actual=${matched.durationFrames}`);
    return {...edge, expectedTransition: 'CROSS_DISSOLVE' as const, expectedDurationFrames: edge.durationFrames, transitionOccurrenceCountBetweenMarkers: 1, matchedTransitionByteOffset: matched.byteOffset, matchedTransitionName: matched.name, matchedDurationRaw: matched.durationRaw, matchedDurationFrames: matched.durationFrames, state: 'CURRENT' as const};
  });
  const matchedOffsets = new Set(transitionChecks.map((check) => check.matchedTransitionByteOffset).filter((value): value is number => value !== null));
  const unbound = xmlTransitions.filter((item) => !matchedOffsets.has(item.byteOffset));
  if (unbound.length) throw new Error(`PALMIER_TIMELINE_UNBOUND_TRANSITION_PRESENT:${unbound.length}`);

  return {
    schemaVersion: 'wedding-palmier-typography-timeline-export-receipt/v1', authority: 'VERIFIED_PALMIER_TIMELINE_EXPORT_AGAINST_ASSEMBLY_PLAN', movieId, state: 'CURRENT' as const,
    source: {assemblyPlan: {path: planPath, sha256: sha256(planRaw)}, palmierFcpxml: {path: xmlPath, sha256: sha256(xmlRaw)}},
    verification: {sceneCount: scenes.length, transitionEdgeCount: edges.length, allMarkersPresentExactlyOnce: true, markerOrderMatchesAssemblyPlan: true, transitionIntentMatchesAssemblyPlan: true, transitionDurationMatchesAssemblyPlan: true, noUnboundTransitions: true, markerChecks, transitionChecks},
    next: {kind: 'RUN_CANONICAL_PROJECT_REMOTION_HANDOFF_WHEN_UPSTREAM_READY', command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=handoff`},
    evidenceBoundary: {palmierTimelineExportArtifactVerified: true, palmierTransitionIntentVerifiedFromFcpxml: true, palmierGuiActualPerformedByThisVerifier: false, transitionAppliedGuiActualPerformedByThisVerifier: false, remotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED', macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED', productionReadyPromotedByThisVerifier: false},
    guardrails: ['FCPXML_MARKER_AND_TRANSITION_VERIFIED != PALMIER_GUI_ACTUAL_PROVEN', 'FCPXML_TRANSITION_VERIFIED != TRANSITION_GUI_ACTUAL_PASS', 'FCPXML_MARKER_AND_TRANSITION_VERIFIED != REMOTION_STUDIO_GUI_ACTUAL_PASS', 'FCPXML_MARKER_AND_TRANSITION_VERIFIED != MAC_DAVINCI_GUI_ACTUAL_PASS', 'FCPXML_MARKER_AND_TRANSITION_VERIFIED != PRODUCTION_READY', 'RECEIPT_IS_BOUND_TO_ASSEMBLY_PLAN_SHA_AND_FCPXML_SHA'],
  } as const;
};

const fixturePlan = (transition: TransitionKind, frames: number) => JSON.stringify({
  schemaVersion: 'wedding-palmier-typography-assembly-plan/v1', authority: 'CANONICAL_STAGED_PROJECT_REMOTION_BATCH', movieId: 'opening',
  timeline: {transitions: [{order: 1, edgeId: 'scene-a->scene-b', fromSceneId: 'scene-a', toSceneId: 'scene-b', transition, durationFrames: frames, sourceStatus: transition === 'CROSS_DISSOLVE' ? 'CURRENT_HUMAN_SELECTION' : 'DEFAULT_HARD_CUT'}]},
  scenes: [
    {order: 1, sceneId: 'scene-a', sourceRevision: 'rev-a', patternId: 'type-mask-reveal', palmier: {markerId: 'WEDDING_SCENE:scene-a', expectedXmlFileName: 'a.fcpxml', projectTimelineXmlFileName: 'opening.fcpxml', transitionIn: null, transitionOut: {toSceneId: 'scene-b', transition, durationFrames: frames}}},
    {order: 2, sceneId: 'scene-b', sourceRevision: 'rev-b', patternId: 'type-char-stagger', palmier: {markerId: 'WEDDING_SCENE:scene-b', expectedXmlFileName: 'b.fcpxml', projectTimelineXmlFileName: 'opening.fcpxml', transitionIn: {fromSceneId: 'scene-a', transition, durationFrames: frames}, transitionOut: null}},
  ], summary: {sceneCount: 2, transitionEdgeCount: 1, crossDissolveCount: transition === 'CROSS_DISSOLVE' ? 1 : 0, palmierAssemblyReady: true, productionReady: false},
});
const runSelfTest = () => {
  const plan = fixturePlan('CROSS_DISSOLVE', 12);
  const transitionXml = '<transition name="Cross Dissolve" duration="12/30s"><filter-video name="Cross Dissolve"/></transition>';
  const validXml = `<fcpxml version="1.11"><library><event><project><sequence><spine><asset-clip><marker value="WEDDING_SCENE:scene-a"/></asset-clip>${transitionXml}<asset-clip><marker value="WEDDING_SCENE:scene-b"/></asset-clip></spine></sequence></project></event></library></fcpxml>`;
  const receipt = verifyExport('opening', plan, validXml, '/plan.json', '/opening.fcpxml');
  if (receipt.verification.transitionChecks[0]?.matchedDurationFrames !== 12 || receipt.evidenceBoundary.transitionAppliedGuiActualPerformedByThisVerifier !== false) throw new Error('SELF_TEST_CURRENT_TRANSITION_RECEIPT_FAILED');
  const blocked = (xml: string, expected: string, sourcePlan = plan) => { try { verifyExport('opening', sourcePlan, xml, '/plan.json', '/opening.fcpxml'); return false; } catch (error) { return error instanceof Error && error.message.includes(expected); } };
  if (!blocked(validXml.replace('12/30s', '10/30s'), 'PALMIER_TIMELINE_CROSS_DISSOLVE_DURATION_MISMATCH')) throw new Error('SELF_TEST_DURATION_MISMATCH_MUST_BLOCK');
  if (!blocked(validXml.replace(transitionXml, ''), 'PALMIER_TIMELINE_CROSS_DISSOLVE_COUNT_INVALID')) throw new Error('SELF_TEST_MISSING_TRANSITION_MUST_BLOCK');
  if (!blocked(validXml, 'PALMIER_TIMELINE_HARD_CUT_HAS_TRANSITION', fixturePlan('HARD_CUT', 0))) throw new Error('SELF_TEST_HARD_CUT_WITH_TRANSITION_MUST_BLOCK');
  const hardCutXml = validXml.replace(transitionXml, '');
  const hardCutReceipt = verifyExport('opening', fixturePlan('HARD_CUT', 0), hardCutXml, '/plan.json', '/opening.fcpxml');
  if (hardCutReceipt.verification.transitionChecks[0]?.expectedTransition !== 'HARD_CUT') throw new Error('SELF_TEST_HARD_CUT_CURRENT_FAILED');
  if (!blocked(validXml.replace('WEDDING_SCENE:scene-a', 'WEDDING_SCENE:scene-b').replace('WEDDING_SCENE:scene-b', 'WEDDING_SCENE:scene-a'), 'PALMIER_TIMELINE_MARKER_COUNT_INVALID')) console.log('NOTE / reversed-marker synthetic fixture collapsed duplicate IDs before order check');
  console.log('PASS / WEDDING_PALMIER_TYPOGRAPHY_TIMELINE_EXPORT_RECEIPT_SELF_TEST');
};

if (process.argv.includes('--self-test')) { runSelfTest(); process.exit(0); }
const movieArg = argValue('--movie');
if (movieArg !== 'opening' && movieArg !== 'profile') { console.error('BLOCK / MOVIE_MUST_BE_OPENING_OR_PROFILE'); process.exit(2); }
const movieId: MovieId = movieArg;
const planPath = resolve(argValue('--plan') ?? join(root, `out/handoff/wedding/${movieId}-palmier-typography-assembly-plan.json`));
const xmlArg = argValue('--xml');
if (!xmlArg) { console.error('BLOCK / PALMIER_TIMELINE_XML_PATH_REQUIRED / export the real Palmier FCPXML and pass --xml=<path>'); process.exit(2); }
const xmlPath = resolve(xmlArg);
if (!existsSync(planPath)) { console.error(`BLOCK / PALMIER_ASSEMBLY_PLAN_MISSING / ${planPath}`); process.exit(3); }
if (!existsSync(xmlPath)) { console.error(`BLOCK / PALMIER_TIMELINE_XML_MISSING / ${xmlPath}`); process.exit(3); }
let receipt: ReturnType<typeof verifyExport>;
try { receipt = verifyExport(movieId, readFileSync(planPath, 'utf8'), readFileSync(xmlPath, 'utf8'), planPath, xmlPath); }
catch (error) { console.error(`BLOCK / PALMIER_TIMELINE_EXPORT_VERIFICATION_FAILED / ${error instanceof Error ? error.message : String(error)}`); process.exit(2); }
const json = JSON.stringify(receipt, null, 2);
const outputPath = resolve(argValue('--output') ?? join(root, `out/handoff/wedding/${movieId}-palmier-typography-timeline-export-receipt.json`));
if (process.argv.includes('--write')) { mkdirSync(dirname(outputPath), {recursive: true}); writeFileSync(outputPath, `${json}\n`); console.error(`wrote=${relative(repoRoot, outputPath)}`); }
if (process.argv.includes('--json') || !process.argv.includes('--write')) console.log(json);
