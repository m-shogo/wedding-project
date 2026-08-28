import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const batchRoot = join(repoRoot, 'movie-dashboard', 'out', 'remotion-element-actual-batch');
const manifestPath = join(batchRoot, 'batch-manifest.json');
const evidencePath = join(batchRoot, 'studio-actual-evidence.json');
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
  console.log(`Remotion Studio Actual evidence initialized: ${rel(evidencePath)}`);
  console.log('All Mac Studio GUI verdicts remain NOT_RUN. init is not Actual execution.');
}

function verify(strict: boolean) {
  if (!existsSync(evidencePath)) {
    console.log('Remotion Studio Actual evidence: NOT_RUN (evidence file missing)');
    if (strict) process.exit(1);
    return;
  }
  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  let manifest: any = null; let manifestSha: string | null = null;
  try { const loaded = loadManifest(); manifest = loaded.manifest; manifestSha = loaded.sha256; } catch (error) { fail(error instanceof Error ? error.message : String(error)); }
  let evidence: Evidence | null = null;
  try { evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence; } catch { fail('STUDIO_ACTUAL_EVIDENCE_INVALID_JSON'); }
  if (!evidence) {
    console.log(`Remotion Studio Actual evidence: BLOCKED (${errors.length})`); errors.forEach((error) => console.log(`BLOCK / ${error}`)); if (strict) process.exit(1); return;
  }
  if (evidence.schemaVersion !== 'remotion-element-studio-actual-evidence/v1') fail('STUDIO_ACTUAL_EVIDENCE_SCHEMA_MISMATCH');
  if (evidence.authority !== 'MAC_REMOTION_STUDIO_ACTUAL_EVIDENCE') fail('STUDIO_ACTUAL_EVIDENCE_AUTHORITY_MISMATCH');
  if (evidence.studioVersionTarget !== '4.0.517') fail('STUDIO_ACTUAL_EVIDENCE_VERSION_MISMATCH');
  if (evidence.productionDependencyPromoted !== false) fail('STUDIO_ACTUAL_EVIDENCE_MUST_NOT_SELF_PROMOTE');
  if (manifest && manifestSha) {
    if (evidence.batchManifest.path !== rel(manifestPath)) fail('STALE_STUDIO_ACTUAL_MANIFEST_PATH');
    if (evidence.batchManifest.sha256 !== manifestSha) fail('STALE_STUDIO_ACTUAL_MANIFEST_SHA');
    const expectedIds = manifest.candidates.map((item: any) => item.patternId).sort();
    const actualIds = evidence.candidates.map((item) => item.patternId).sort();
    if (JSON.stringify(expectedIds) !== JSON.stringify(actualIds)) fail('STUDIO_ACTUAL_EVIDENCE_CANDIDATE_DRIFT');
  }
  const axes = ['requestTransport','confirmationDialog','elementFileWritten','timelineInsertion','controlMutation','sourceReadback','undoRedo','reloadPersistence','studioRestartPersistence','exitVisual','postInstallRender'] as const;
  for (const candidate of evidence.candidates) for (const axis of axes) if (candidate[axis] !== 'PASS') fail(`${candidate.patternId}:${axis}:${candidate[axis]}`);
  if (evidence.review.overall !== 'PASS') fail(`STUDIO_ACTUAL_OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) fail('STUDIO_ACTUAL_REVIEWER_MISSING');
  if (!evidence.review.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) fail('STUDIO_ACTUAL_REVIEWED_AT_INVALID');
  if (errors.length) {
    console.log(`Remotion Studio Actual evidence: BLOCKED (${errors.length})`); errors.forEach((error) => console.log(`BLOCK / ${error}`)); if (strict) process.exit(1); return;
  }
  console.log('Remotion Studio Actual evidence: ACTUAL_VERIFIED — all 9 candidates passed Mac Studio confirmation, insertion, control mutation/readback, persistence, exit visual, and post-install render checks.');
  console.log('Production dependency remains unpromoted; promotion is a separate decision.');
}

if (mode === 'init') init(); else verify(mode === 'strict');
