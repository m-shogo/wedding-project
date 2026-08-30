import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

type MovieId = 'opening' | 'profile';
type Receipt = {
  schemaVersion?: string;
  authority?: string;
  movieId?: MovieId;
  state?: string;
  source?: {
    assemblyPlan?: {path?: string; sha256?: string};
    palmierFcpxml?: {path?: string; sha256?: string};
  };
  verification?: {
    sceneCount?: number;
    allMarkersPresentExactlyOnce?: boolean;
    markerOrderMatchesAssemblyPlan?: boolean;
    markerChecks?: Array<{state?: string; markerOccurrenceCount?: number}>;
  };
  evidenceBoundary?: {
    palmierGuiActualPerformedByThisVerifier?: boolean;
    productionReadyPromotedByThisVerifier?: boolean;
  };
};

const motionStudioRoot = process.cwd();
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const sha256 = (content: string) => createHash('sha256').update(content).digest('hex');

const evaluate = (movieId: MovieId, receipt: Receipt, planRaw: string | null, xmlRaw: string | null) => {
  const invalid = (detail: string) => ({state: 'INVALID' as const, detail});
  const stale = (detail: string) => ({state: 'STALE' as const, detail});
  if (receipt.schemaVersion !== 'wedding-palmier-typography-timeline-export-receipt/v1' || receipt.authority !== 'VERIFIED_PALMIER_TIMELINE_EXPORT_AGAINST_ASSEMBLY_PLAN') return invalid('RECEIPT_ENVELOPE_INVALID');
  if (receipt.movieId !== movieId || receipt.state !== 'CURRENT') return invalid('RECEIPT_MOVIE_OR_STATE_INVALID');
  if (!receipt.source?.assemblyPlan?.path || !receipt.source.assemblyPlan.sha256 || !receipt.source?.palmierFcpxml?.path || !receipt.source.palmierFcpxml.sha256) return invalid('RECEIPT_SOURCE_BINDING_MISSING');
  if (receipt.verification?.allMarkersPresentExactlyOnce !== true || receipt.verification?.markerOrderMatchesAssemblyPlan !== true) return invalid('RECEIPT_MARKER_VERIFICATION_INVALID');
  const markerChecks = receipt.verification?.markerChecks ?? [];
  if (markerChecks.length === 0 || markerChecks.length !== receipt.verification?.sceneCount || markerChecks.some((check) => check.state !== 'CURRENT' || check.markerOccurrenceCount !== 1)) return invalid('RECEIPT_MARKER_CHECKS_INVALID');
  if (receipt.evidenceBoundary?.palmierGuiActualPerformedByThisVerifier !== false || receipt.evidenceBoundary?.productionReadyPromotedByThisVerifier !== false) return invalid('RECEIPT_EVIDENCE_BOUNDARY_INVALID');
  if (planRaw === null) return stale('ASSEMBLY_PLAN_MISSING');
  if (xmlRaw === null) return stale('PALMIER_FCPXML_MISSING');
  if (sha256(planRaw) !== receipt.source.assemblyPlan.sha256) return stale('ASSEMBLY_PLAN_SHA_DRIFT');
  if (sha256(xmlRaw) !== receipt.source.palmierFcpxml.sha256) return stale('PALMIER_FCPXML_SHA_DRIFT');
  return {state: 'CURRENT' as const, detail: null};
};

const runSelfTest = () => {
  const plan = '{"plan":1}';
  const xml = '<fcpxml><marker value="A"/></fcpxml>';
  const receipt: Receipt = {
    schemaVersion: 'wedding-palmier-typography-timeline-export-receipt/v1',
    authority: 'VERIFIED_PALMIER_TIMELINE_EXPORT_AGAINST_ASSEMBLY_PLAN',
    movieId: 'opening',
    state: 'CURRENT',
    source: {assemblyPlan: {path: '/plan.json', sha256: sha256(plan)}, palmierFcpxml: {path: '/timeline.fcpxml', sha256: sha256(xml)}},
    verification: {sceneCount: 1, allMarkersPresentExactlyOnce: true, markerOrderMatchesAssemblyPlan: true, markerChecks: [{state: 'CURRENT', markerOccurrenceCount: 1}]},
    evidenceBoundary: {palmierGuiActualPerformedByThisVerifier: false, productionReadyPromotedByThisVerifier: false},
  };
  if (evaluate('opening', receipt, plan, xml).state !== 'CURRENT') throw new Error('SELF_TEST_CURRENT_FAILED');
  const drift = evaluate('opening', receipt, plan, `${xml}<!--drift-->`);
  if (drift.state !== 'STALE' || drift.detail !== 'PALMIER_FCPXML_SHA_DRIFT') throw new Error('SELF_TEST_FCPXML_DRIFT_FAILED');
  if (evaluate('opening', receipt, null, xml).state !== 'STALE') throw new Error('SELF_TEST_MISSING_PLAN_FAILED');
  console.log('PASS / WEDDING_PALMIER_TYPOGRAPHY_TIMELINE_RECEIPT_CURRENTNESS_SELF_TEST');
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
const receiptPath = resolve(argValue('--receipt') ?? join(motionStudioRoot, `out/handoff/wedding/${movieId}-palmier-typography-timeline-export-receipt.json`));
if (!existsSync(receiptPath)) {
  const missing = {schemaVersion: 'wedding-palmier-typography-timeline-export-receipt-currentness/v1', movieId, state: 'MISSING', detail: 'PALMIER_TIMELINE_EXPORT_RECEIPT_MISSING', next: {kind: 'VERIFY_REAL_PALMIER_FCPXML', command: `node --no-warnings scripts/verify-wedding-palmier-typography-timeline-export.mts --movie=${movieId} --xml='<real-palmier-fcpxml-path>' --write`}, evidenceBoundary: {palmierGuiActualPerformedByThisCheck: false, macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED', productionReadyPromotedByThisCheck: false}} as const;
  if (process.argv.includes('--json')) console.log(JSON.stringify(missing, null, 2));
  else console.log(`palmierTimelineExportReceipt=MISSING\nnextCommand=${missing.next.command}`);
  if (process.argv.includes('--strict')) process.exit(3);
  process.exit(0);
}

let receipt: Receipt;
try {
  receipt = JSON.parse(readFileSync(receiptPath, 'utf8')) as Receipt;
} catch (error) {
  console.error(`BLOCK / PALMIER_TIMELINE_EXPORT_RECEIPT_PARSE_FAILED / ${error instanceof Error ? error.message : String(error)}`);
  process.exit(2);
}
const planPath = receipt.source?.assemblyPlan?.path ? resolve(receipt.source.assemblyPlan.path) : null;
const xmlPath = receipt.source?.palmierFcpxml?.path ? resolve(receipt.source.palmierFcpxml.path) : null;
const planRaw = planPath && existsSync(planPath) ? readFileSync(planPath, 'utf8') : null;
const xmlRaw = xmlPath && existsSync(xmlPath) ? readFileSync(xmlPath, 'utf8') : null;
const result = evaluate(movieId, receipt, planRaw, xmlRaw);
const next = result.state === 'CURRENT'
  ? {kind: 'RUN_CANONICAL_PROJECT_REMOTION_HANDOFF_WHEN_UPSTREAM_READY', command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=handoff`}
  : {kind: 'REVERIFY_REAL_PALMIER_FCPXML', command: `node --no-warnings scripts/verify-wedding-palmier-typography-timeline-export.mts --movie=${movieId} --xml='${xmlPath ?? '<real-palmier-fcpxml-path>'}' --write`};
const report = {
  schemaVersion: 'wedding-palmier-typography-timeline-export-receipt-currentness/v1',
  authority: 'READ_ONLY_PALMIER_TIMELINE_EXPORT_RECEIPT_CURRENTNESS',
  movieId,
  state: result.state,
  detail: result.detail,
  receiptPath,
  source: {assemblyPlan: planPath, palmierFcpxml: xmlPath},
  next,
  evidenceBoundary: {palmierGuiActualPerformedByThisCheck: false, macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED', productionReadyPromotedByThisCheck: false},
  guardrails: ['CURRENT_RECEIPT != PALMIER_GUI_ACTUAL_PROVEN', 'CURRENT_RECEIPT != MAC_DAVINCI_GUI_ACTUAL_PASS', 'CURRENT_RECEIPT != PRODUCTION_READY'],
} as const;
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`palmierTimelineExportReceipt=${report.state}`);
  if (report.detail) console.log(`detail=${report.detail}`);
  console.log(`next=${report.next.kind}`);
  console.log(`nextCommand=${report.next.command}`);
  console.log('macDaVinciGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('productionReadyPromotedByThisCheck=NO');
}
if (process.argv.includes('--strict') && report.state !== 'CURRENT') process.exit(report.state === 'STALE' ? 3 : 2);
