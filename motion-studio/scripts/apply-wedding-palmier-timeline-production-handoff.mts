import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {isAbsolute, join, relative, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const root = process.cwd();
type MovieId = 'opening' | 'profile';
type TransitionKind = 'HARD_CUT' | 'CROSS_DISSOLVE';
type TransitionCheck = {
  order?: number;
  edgeId?: string;
  fromSceneId?: string;
  toSceneId?: string;
  expectedTransition?: TransitionKind;
  expectedDurationFrames?: number;
  transitionOccurrenceCountBetweenMarkers?: number;
  matchedDurationFrames?: number;
  state?: string;
};
type TimelineReceipt = {
  schemaVersion?: string;
  authority?: string;
  movieId?: MovieId;
  state?: string;
  source?: {assemblyPlan?: {path?: string; sha256?: string}; palmierFcpxml?: {path?: string; sha256?: string}};
  verification?: {
    sceneCount?: number;
    transitionEdgeCount?: number;
    allMarkersPresentExactlyOnce?: boolean;
    markerOrderMatchesAssemblyPlan?: boolean;
    transitionIntentMatchesAssemblyPlan?: boolean;
    transitionDurationMatchesAssemblyPlan?: boolean;
    noUnboundTransitions?: boolean;
    transitionChecks?: TransitionCheck[];
  };
  evidenceBoundary?: {palmierTransitionIntentVerifiedFromFcpxml?: boolean; transitionAppliedGuiActualPerformedByThisVerifier?: boolean};
};

const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const movieArg = argValue('--movie');
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('BLOCK / MOVIE_MUST_BE_OPENING_OR_PROFILE');
  process.exit(2);
}
const movieId: MovieId = movieArg;
const resolveArg = (value: string) => isAbsolute(value) ? value : resolve(root, value);
const defaultRecovery = join(root, `out/handoff/${movieId === 'opening' ? 'opening-v1' : 'profile-v1'}/${movieId}-v1-davinci-production-recovery.json`);
const defaultReceipt = join(root, `out/handoff/wedding/${movieId}-palmier-typography-timeline-export-receipt.json`);
const recoveryPath = resolveArg(argValue('--recovery') ?? defaultRecovery);
const receiptPath = resolveArg(argValue('--receipt') ?? defaultReceipt);
const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const displayPath = (path: string) => {
  const rel = relative(root, path).replaceAll('\\', '/');
  return rel.startsWith('..') ? path : rel;
};
const block = (code: string, detail?: string): never => {
  console.error(`BLOCK / ${code}${detail ? ` / ${detail}` : ''}`);
  console.error('Palmier GUI Actual remains NOT_RUN unless a human actually performed it.');
  console.error('Transition Applied GUI Actual remains NOT_RUN unless a human actually performed it.');
  console.error('Mac DaVinci Resolve GUI Actual remains NOT_RUN unless a human actually performed it.');
  process.exit(2);
};

if (!existsSync(recoveryPath)) block('PALMIER_TIMELINE_DAVINCI_RECOVERY_MISSING', displayPath(recoveryPath));
if (!existsSync(receiptPath)) block('PALMIER_TIMELINE_EXPORT_RECEIPT_MISSING', displayPath(receiptPath));
const checker = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/check-wedding-palmier-typography-timeline-export-receipt.mts'), `--movie=${movieId}`, `--receipt=${receiptPath}`, '--strict'], {cwd: root, encoding: 'utf8'});
if (checker.status !== 0) block('PALMIER_TIMELINE_EXPORT_RECEIPT_NOT_CURRENT', [checker.stdout?.trim(), checker.stderr?.trim()].filter(Boolean).join(' / '));

let receipt: TimelineReceipt;
let recovery: any;
try {
  receipt = JSON.parse(readFileSync(receiptPath, 'utf8')) as TimelineReceipt;
  recovery = JSON.parse(readFileSync(recoveryPath, 'utf8'));
} catch (error) {
  block('PALMIER_TIMELINE_PRODUCTION_BINDING_JSON_INVALID', error instanceof Error ? error.message : String(error));
}
if (receipt.schemaVersion !== 'wedding-palmier-typography-timeline-export-receipt/v1' || receipt.authority !== 'VERIFIED_PALMIER_TIMELINE_EXPORT_AGAINST_ASSEMBLY_PLAN' || receipt.movieId !== movieId || receipt.state !== 'CURRENT') block('PALMIER_TIMELINE_EXPORT_RECEIPT_CONTRACT_INVALID');
if (recovery?.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') block('PALMIER_TIMELINE_DAVINCI_RECOVERY_AUTHORITY_INVALID');

const transitionChecks = receipt.verification?.transitionChecks ?? [];
const expectedEdges = Math.max(0, Number(receipt.verification?.sceneCount ?? 0) - 1);
if (
  receipt.verification?.transitionIntentMatchesAssemblyPlan !== true ||
  receipt.verification?.transitionDurationMatchesAssemblyPlan !== true ||
  receipt.verification?.noUnboundTransitions !== true ||
  receipt.evidenceBoundary?.palmierTransitionIntentVerifiedFromFcpxml !== true ||
  receipt.evidenceBoundary?.transitionAppliedGuiActualPerformedByThisVerifier !== false ||
  transitionChecks.length !== expectedEdges ||
  transitionChecks.length !== receipt.verification?.transitionEdgeCount ||
  transitionChecks.some((check) => check.state !== 'CURRENT' || !check.edgeId || !check.fromSceneId || !check.toSceneId || (check.expectedTransition !== 'HARD_CUT' && check.expectedTransition !== 'CROSS_DISSOLVE'))
) block('PALMIER_TIMELINE_TRANSITION_PROOF_INVALID');

const assemblyPlanPath = receipt.source?.assemblyPlan?.path ? resolveArg(receipt.source.assemblyPlan.path) : null;
const fcpxmlPath = receipt.source?.palmierFcpxml?.path ? resolveArg(receipt.source.palmierFcpxml.path) : null;
if (!assemblyPlanPath || !fcpxmlPath) block('PALMIER_TIMELINE_EXPORT_RECEIPT_SOURCE_BINDING_MISSING');
if (!existsSync(assemblyPlanPath)) block('PALMIER_TIMELINE_ASSEMBLY_PLAN_MISSING');
if (!existsSync(fcpxmlPath)) block('PALMIER_TIMELINE_FCPXML_MISSING');
const assemblyPlanSha256 = sha256(readFileSync(assemblyPlanPath));
const fcpxmlSha256 = sha256(readFileSync(fcpxmlPath));
if (assemblyPlanSha256 !== receipt.source?.assemblyPlan?.sha256) block('PALMIER_TIMELINE_ASSEMBLY_PLAN_SHA_DRIFT');
if (fcpxmlSha256 !== receipt.source?.palmierFcpxml?.sha256) block('PALMIER_TIMELINE_FCPXML_SHA_DRIFT');

const receiptSha256 = sha256(readFileSync(receiptPath));
const transitionProof = transitionChecks.map((check) => ({
  order: check.order ?? null,
  edgeId: check.edgeId!,
  fromSceneId: check.fromSceneId!,
  toSceneId: check.toSceneId!,
  transition: check.expectedTransition!,
  durationFrames: check.expectedDurationFrames ?? 0,
  transitionOccurrenceCountBetweenMarkers: check.transitionOccurrenceCountBetweenMarkers ?? 0,
  matchedDurationFrames: check.matchedDurationFrames ?? 0,
  state: 'CURRENT',
}));
recovery.palmierTimelineExport = {
  authority: 'SHA_BOUND_PALMIER_TIMELINE_EXPORT_HANDOFF',
  movieId,
  state: 'CURRENT',
  receipt: {path: displayPath(receiptPath), sha256: receiptSha256},
  assemblyPlan: {path: displayPath(assemblyPlanPath), sha256: assemblyPlanSha256},
  palmierFcpxml: {path: displayPath(fcpxmlPath), sha256: fcpxmlSha256},
  verification: {
    sceneCount: receipt.verification?.sceneCount ?? null,
    transitionEdgeCount: transitionProof.length,
    crossDissolveCount: transitionProof.filter((edge) => edge.transition === 'CROSS_DISSOLVE').length,
    allMarkersPresentExactlyOnce: receipt.verification?.allMarkersPresentExactlyOnce === true,
    markerOrderMatchesAssemblyPlan: receipt.verification?.markerOrderMatchesAssemblyPlan === true,
    transitionIntentMatchesAssemblyPlan: true,
    transitionDurationMatchesAssemblyPlan: true,
    noUnboundTransitions: true,
    transitionChecks: transitionProof,
  },
  palmierGuiActual: 'NOT_RUN',
  transitionAppliedGuiActual: 'NOT_RUN',
  remotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionReady: false,
  guardrails: [
    'PALMIER_TIMELINE_EXPORT_CURRENT != PALMIER_GUI_ACTUAL_PASS',
    'PALMIER_TRANSITION_FCPXML_VERIFIED != TRANSITION_GUI_ACTUAL_PASS',
    'PALMIER_TIMELINE_EXPORT_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_PASS',
    'PALMIER_TIMELINE_EXPORT_CURRENT != MAC_DAVINCI_GUI_ACTUAL_PASS',
    'PALMIER_TIMELINE_EXPORT_CURRENT != PRODUCTION_READY',
  ],
};
writeFileSync(recoveryPath, `${JSON.stringify(recovery, null, 2)}\n`);

console.log('palmierTimelineProductionHandoff=CURRENT');
console.log(`movieId=${movieId}`);
console.log(`recovery=${displayPath(recoveryPath)}`);
console.log(`receiptSha256=${receiptSha256}`);
console.log(`assemblyPlanSha256=${assemblyPlanSha256}`);
console.log(`palmierFcpxmlSha256=${fcpxmlSha256}`);
console.log(`transitionEdgesVerified=${transitionProof.length}`);
console.log('palmierGuiActual=NOT_RUN');
console.log('transitionAppliedGuiActual=NOT_RUN');
console.log('remotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
console.log('productionReady=NO');
