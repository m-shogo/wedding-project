import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';

type MovieId = 'opening' | 'profile';
type AssemblyPlan = {
  schemaVersion?: string;
  authority?: string;
  movieId?: MovieId;
  scenes?: Array<{order?: number; sceneId?: string; sourceRevision?: string; patternId?: string | null; palmier?: {markerId?: string; expectedXmlFileName?: string; projectTimelineXmlFileName?: string}}>; 
  summary?: {sceneCount?: number; palmierAssemblyReady?: boolean; productionReady?: boolean};
};

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const sha256 = (content: Buffer | string) => createHash('sha256').update(content).digest('hex');
const countLiteral = (haystack: string, needle: string) => needle.length === 0 ? 0 : haystack.split(needle).length - 1;

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
      allMarkersPresentExactlyOnce: true,
      markerOrderMatchesAssemblyPlan: true,
      markerChecks,
    },
    next: {
      kind: 'RUN_CANONICAL_PROJECT_REMOTION_HANDOFF_WHEN_UPSTREAM_READY',
      command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=handoff`,
    },
    evidenceBoundary: {
      palmierTimelineExportArtifactVerified: true,
      palmierGuiActualPerformedByThisVerifier: false,
      remotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
      macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
      productionReadyPromotedByThisVerifier: false,
    },
    guardrails: [
      'FCPXML_MARKER_VERIFIED != PALMIER_GUI_ACTUAL_PROVEN',
      'FCPXML_MARKER_VERIFIED != REMOTION_STUDIO_GUI_ACTUAL_PASS',
      'FCPXML_MARKER_VERIFIED != MAC_DAVINCI_GUI_ACTUAL_PASS',
      'FCPXML_MARKER_VERIFIED != PRODUCTION_READY',
      'RECEIPT_IS_BOUND_TO_ASSEMBLY_PLAN_SHA_AND_FCPXML_SHA',
    ],
  } as const;
};

const runSelfTest = () => {
  const plan = JSON.stringify({
    schemaVersion: 'wedding-palmier-typography-assembly-plan/v1',
    authority: 'CANONICAL_STAGED_PROJECT_REMOTION_BATCH',
    movieId: 'opening',
    scenes: [
      {order: 1, sceneId: 'scene-a', sourceRevision: 'rev-a', patternId: 'type-mask-reveal', palmier: {markerId: 'WEDDING_SCENE:scene-a', expectedXmlFileName: 'a.fcpxml', projectTimelineXmlFileName: 'opening.fcpxml'}},
      {order: 2, sceneId: 'scene-b', sourceRevision: 'rev-b', patternId: 'type-char-stagger', palmier: {markerId: 'WEDDING_SCENE:scene-b', expectedXmlFileName: 'b.fcpxml', projectTimelineXmlFileName: 'opening.fcpxml'}},
    ],
    summary: {sceneCount: 2, palmierAssemblyReady: true, productionReady: false},
  });
  const validXml = '<fcpxml version="1.11"><library><event><project><sequence><spine><marker value="WEDDING_SCENE:scene-a"/><marker value="WEDDING_SCENE:scene-b"/></spine></sequence></project></event></library></fcpxml>';
  const receipt = verifyExport('opening', plan, validXml, '/plan.json', '/opening.fcpxml');
  if (receipt.state !== 'CURRENT' || receipt.verification.markerChecks.length !== 2) throw new Error('SELF_TEST_CURRENT_RECEIPT_FAILED');
  if (receipt.evidenceBoundary.palmierGuiActualPerformedByThisVerifier !== false || receipt.evidenceBoundary.productionReadyPromotedByThisVerifier !== false) throw new Error('SELF_TEST_EVIDENCE_BOUNDARY_FAILED');
  let reversedBlocked = false;
  try {
    verifyExport('opening', plan, validXml.replace('<marker value="WEDDING_SCENE:scene-a"/><marker value="WEDDING_SCENE:scene-b"/>', '<marker value="WEDDING_SCENE:scene-b"/><marker value="WEDDING_SCENE:scene-a"/>'), '/plan.json', '/opening.fcpxml');
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
