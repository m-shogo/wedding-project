import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const batchRoot = join(repoRoot, 'movie-dashboard', 'out', 'remotion-element-actual-batch');
const manifestPath = join(batchRoot, 'batch-manifest.json');
const evidencePath = join(batchRoot, 'studio-actual-evidence.json');
const summaryPath = join(batchRoot, 'studio-actual-summary.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL' | 'BLOCKED';
type CandidateActual = {
  patternId: string;
  requestTransport: QaState;
  confirmationDialog: QaState;
  elementFileWritten: QaState;
  timelineInsertion: QaState;
  controlMutation: QaState;
  sourceReadback: QaState;
  undoRedo: QaState;
  reloadPersistence: QaState;
  studioRestartPersistence: QaState;
  exitVisual: QaState;
  postInstallRender: QaState;
  notes: string;
};
type Evidence = {
  schemaVersion: 'remotion-element-studio-actual-evidence/v1';
  authority: 'MAC_REMOTION_STUDIO_ACTUAL_EVIDENCE';
  studioVersionTarget: '4.0.517';
  boundAt: string;
  batchManifest: {path: string; sha256: string};
  candidates: CandidateActual[];
  review: {overall: QaState; reviewer: string | null; reviewedAt: string | null; notes: string};
  productionDependencyPromoted: false;
};
type CandidateSummary = {
  patternId: string;
  pass: number;
  fail: number;
  blocked: number;
  notRun: number;
  total: number;
  complete: boolean;
};
type Summary = {
  schemaVersion: 'remotion-element-studio-actual-summary/v1';
  authority: 'MAC_REMOTION_STUDIO_ACTUAL_STATUS_SUMMARY';
  studioVersionTarget: '4.0.517';
  generatedAt: string;
  batchManifest: {path: string; sha256: string | null; current: boolean};
  evidence: {path: string; present: boolean; valid: boolean};
  overall: QaState;
  humanReviewed: boolean;
  candidates: CandidateSummary[];
  totals: {pass: number; fail: number; blocked: number; notRun: number; checks: number; completedCandidates: number; candidateCount: number};
  blockerCodes: string[];
  productionDependencyPromoted: false;
  guardrails: ['SUMMARY_EXPORTED != STUDIO_ACTUAL_VERIFIED', 'STUDIO_ACTUAL_VERIFIED != PRODUCTION_DEPENDENCY_PROMOTED'];
};

const axes = ['requestTransport','confirmationDialog','elementFileWritten','timelineInsertion','controlMutation','sourceReadback','undoRedo','reloadPersistence','studioRestartPersistence','exitVisual','postInstallRender'] as const;
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => path.replace(`${repoRoot}/`, '').replaceAll('\\', '/');

function loadManifest() {
  if (!existsSync(manifestPath)) throw new Error('STUDIO_ACTUAL_BATCH_MANIFEST_MISSING:run node --no-warnings scripts/prepare-typography-elements-studio-actual-batch.mts first');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as any;
  if (manifest.purpose !== 'BOUNDED_MAC_STUDIO_ACTUAL_BATCH') throw new Error('STUDIO_ACTUAL_BATCH_PURPOSE_MISMATCH');
  if (manifest.studioVersionTarget !== '4.0.517') throw new Error('STUDIO_ACTUAL_VERSION_TARGET_MISMATCH');
  if (!Array.isArray(manifest.candidates) || manifest.candidates.length !== 9) throw new Error('STUDIO_ACTUAL_CANDIDATE_COUNT_MISMATCH');
  return {manifest, sha256: shaFile(manifestPath)};
}

function candidateSummary(candidate: CandidateActual): CandidateSummary {
  const states = axes.map((axis) => candidate[axis]);
  const count = (state: QaState) => states.filter((value) => value === state).length;
  const pass = count('PASS');
  return {
    patternId: candidate.patternId,
    pass,
    fail: count('FAIL'),
    blocked: count('BLOCKED'),
    notRun: count('NOT_RUN'),
    total: axes.length,
    complete: pass === axes.length,
  };
}

function writeSummary({manifestSha, manifestCurrent, evidence, evidenceValid, blockerCodes}: {
  manifestSha: string | null;
  manifestCurrent: boolean;
  evidence: Evidence | null;
  evidenceValid: boolean;
  blockerCodes: string[];
}) {
  let manifestCandidateIds: string[] = [];
  try { manifestCandidateIds = loadManifest().manifest.candidates.map((candidate: any) => candidate.patternId); } catch {}
  const evidenceById = new Map((evidence?.candidates ?? []).map((candidate) => [candidate.patternId, candidate]));
  const ids = manifestCandidateIds.length > 0 ? manifestCandidateIds : (evidence?.candidates ?? []).map((candidate) => candidate.patternId);
  const candidates = ids.map((patternId) => {
    const actual = evidenceById.get(patternId);
    if (actual) return candidateSummary(actual);
    return {patternId, pass: 0, fail: 0, blocked: 0, notRun: axes.length, total: axes.length, complete: false};
  });
  const totals = candidates.reduce((acc, candidate) => ({
    pass: acc.pass + candidate.pass,
    fail: acc.fail + candidate.fail,
    blocked: acc.blocked + candidate.blocked,
    notRun: acc.notRun + candidate.notRun,
    checks: acc.checks + candidate.total,
    completedCandidates: acc.completedCandidates + (candidate.complete ? 1 : 0),
    candidateCount: acc.candidateCount + 1,
  }), {pass: 0, fail: 0, blocked: 0, notRun: 0, checks: 0, completedCandidates: 0, candidateCount: 0});
  const humanReviewed = Boolean(evidence?.review.reviewer?.trim() && evidence.review.reviewedAt && !Number.isNaN(Date.parse(evidence.review.reviewedAt)));
  const overall: QaState = !evidence ? 'NOT_RUN' : blockerCodes.length > 0 ? (evidence.review.overall === 'FAIL' ? 'FAIL' : 'BLOCKED') : evidence.review.overall;
  const summary: Summary = {
    schemaVersion: 'remotion-element-studio-actual-summary/v1',
    authority: 'MAC_REMOTION_STUDIO_ACTUAL_STATUS_SUMMARY',
    studioVersionTarget: '4.0.517',
    generatedAt: new Date().toISOString(),
    batchManifest: {path: rel(manifestPath), sha256: manifestSha, current: manifestCurrent},
    evidence: {path: rel(evidencePath), present: existsSync(evidencePath), valid: evidenceValid},
    overall,
    humanReviewed,
    candidates,
    totals,
    blockerCodes: [...new Set(blockerCodes)].sort(),
    productionDependencyPromoted: false,
    guardrails: ['SUMMARY_EXPORTED != STUDIO_ACTUAL_VERIFIED', 'STUDIO_ACTUAL_VERIFIED != PRODUCTION_DEPENDENCY_PROMOTED'],
  };
  mkdirSync(dirname(summaryPath), {recursive: true});
  writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
  console.log(`Remotion Studio Actual summary: ${rel(summaryPath)} / overall=${summary.overall} / candidates=${totals.completedCandidates}/${totals.candidateCount} / checks PASS=${totals.pass} FAIL=${totals.fail} BLOCKED=${totals.blocked} NOT_RUN=${totals.notRun}`);
}

function init() {
  const {manifest, sha256} = loadManifest();
  const candidates: CandidateActual[] = manifest.candidates.map((candidate: any) => ({
    patternId: candidate.patternId,
    requestTransport: 'NOT_RUN', confirmationDialog: 'NOT_RUN', elementFileWritten: 'NOT_RUN', timelineInsertion: 'NOT_RUN',
    controlMutation: 'NOT_RUN', sourceReadback: 'NOT_RUN', undoRedo: 'NOT_RUN', reloadPersistence: 'NOT_RUN',
    studioRestartPersistence: 'NOT_RUN', exitVisual: 'NOT_RUN', postInstallRender: 'NOT_RUN', notes: '',
  }));
  const evidence: Evidence = {
    schemaVersion: 'remotion-element-studio-actual-evidence/v1', authority: 'MAC_REMOTION_STUDIO_ACTUAL_EVIDENCE', studioVersionTarget: '4.0.517',
    boundAt: new Date().toISOString(), batchManifest: {path: rel(manifestPath), sha256}, candidates,
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''}, productionDependencyPromoted: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  writeSummary({manifestSha: sha256, manifestCurrent: true, evidence, evidenceValid: true, blockerCodes: ['STUDIO_ACTUAL_OVERALL_NOT_RUN', 'STUDIO_ACTUAL_REVIEWER_MISSING', 'STUDIO_ACTUAL_REVIEWED_AT_INVALID']});
  console.log(`Remotion Studio Actual evidence initialized: ${rel(evidencePath)}`);
  console.log('All Mac Studio GUI verdicts remain NOT_RUN. init is not Actual execution.');
}

function verify(strict: boolean) {
  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  let manifest: any = null; let manifestSha: string | null = null;
  try { const loaded = loadManifest(); manifest = loaded.manifest; manifestSha = loaded.sha256; } catch (error) { fail(error instanceof Error ? error.message : String(error)); }
  if (!existsSync(evidencePath)) {
    fail('STUDIO_ACTUAL_EVIDENCE_MISSING');
    writeSummary({manifestSha, manifestCurrent: false, evidence: null, evidenceValid: false, blockerCodes: errors});
    console.log('Remotion Studio Actual evidence: NOT_RUN (evidence file missing)');
    if (strict) process.exit(1);
    return;
  }
  let evidence: Evidence | null = null;
  try { evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence; } catch { fail('STUDIO_ACTUAL_EVIDENCE_INVALID_JSON'); }
  if (!evidence) {
    writeSummary({manifestSha, manifestCurrent: false, evidence: null, evidenceValid: false, blockerCodes: errors});
    console.log(`Remotion Studio Actual evidence: BLOCKED (${errors.length})`); errors.forEach((error) => console.log(`BLOCK / ${error}`)); if (strict) process.exit(1); return;
  }
  if (evidence.schemaVersion !== 'remotion-element-studio-actual-evidence/v1') fail('STUDIO_ACTUAL_EVIDENCE_SCHEMA_MISMATCH');
  if (evidence.authority !== 'MAC_REMOTION_STUDIO_ACTUAL_EVIDENCE') fail('STUDIO_ACTUAL_EVIDENCE_AUTHORITY_MISMATCH');
  if (evidence.studioVersionTarget !== '4.0.517') fail('STUDIO_ACTUAL_EVIDENCE_VERSION_MISMATCH');
  if (evidence.productionDependencyPromoted !== false) fail('STUDIO_ACTUAL_EVIDENCE_MUST_NOT_SELF_PROMOTE');
  let manifestCurrent = false;
  if (manifest && manifestSha) {
    if (evidence.batchManifest.path !== rel(manifestPath)) fail('STALE_STUDIO_ACTUAL_MANIFEST_PATH');
    if (evidence.batchManifest.sha256 !== manifestSha) fail('STALE_STUDIO_ACTUAL_MANIFEST_SHA');
    const expectedIds = manifest.candidates.map((item: any) => item.patternId).sort();
    const actualIds = evidence.candidates.map((item) => item.patternId).sort();
    if (JSON.stringify(expectedIds) !== JSON.stringify(actualIds)) fail('STUDIO_ACTUAL_EVIDENCE_CANDIDATE_DRIFT');
    manifestCurrent = evidence.batchManifest.path === rel(manifestPath) && evidence.batchManifest.sha256 === manifestSha && JSON.stringify(expectedIds) === JSON.stringify(actualIds);
  }
  for (const candidate of evidence.candidates) for (const axis of axes) if (candidate[axis] !== 'PASS') fail(`${candidate.patternId}:${axis}:${candidate[axis]}`);
  if (evidence.review.overall !== 'PASS') fail(`STUDIO_ACTUAL_OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) fail('STUDIO_ACTUAL_REVIEWER_MISSING');
  if (!evidence.review.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) fail('STUDIO_ACTUAL_REVIEWED_AT_INVALID');
  writeSummary({manifestSha, manifestCurrent, evidence, evidenceValid: true, blockerCodes: errors});
  if (errors.length) {
    console.log(`Remotion Studio Actual evidence: BLOCKED (${errors.length})`); errors.forEach((error) => console.log(`BLOCK / ${error}`)); if (strict) process.exit(1); return;
  }
  console.log('Remotion Studio Actual evidence: ACTUAL_VERIFIED — all 9 candidates passed Mac Studio confirmation, insertion, control mutation/readback, persistence, exit visual, and post-install render checks.');
  console.log('Production dependency remains unpromoted; promotion is a separate decision.');
}

if (mode === 'init') init(); else verify(mode === 'strict');
