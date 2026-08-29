import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(studioRoot, 'out/preview/profile_v1_departure_structure_preview.mp4');
const evidencePath = join(studioRoot, 'out/qa/profile-v1-departure-structure-review.json');
const componentPath = join(studioRoot, 'src/compositions/profile/ProfileV1DeparturePreview.tsx');
const sourcePlanPath = join(studioRoot, '../01_profile-movie/chapter-plan.md');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type Evidence = {
  schemaVersion: 'profile-v1-departure-structure-review/v1';
  authority: 'HUMAN_STRUCTURE_PREVIEW_REVIEW';
  boundAt: string;
  preview: {path: string; sha256: string};
  component: {path: string; sha256: string};
  sourcePlan: {path: string; sha256: string};
  checkpoints: Array<{
    id: 'airport' | 'runway' | 'window';
    frame: number;
    timing: QaState;
    visualFlow: QaState;
    readability: QaState;
  }>;
  review: {
    overall: QaState;
    reviewer: string | null;
    reviewedAt: string | null;
    notes: string;
  };
  realMediaReviewed: false;
  bgmReviewed: false;
  productionReady: false;
};

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

function currentBindings() {
  if (!existsSync(previewPath)) throw new Error('PROFILE_DEPARTURE_STRUCTURE_PREVIEW_MISSING');
  if (!existsSync(componentPath)) throw new Error('PROFILE_DEPARTURE_COMPONENT_MISSING');
  if (!existsSync(sourcePlanPath)) throw new Error('PROFILE_DEPARTURE_SOURCE_PLAN_MISSING');
  return {
    preview: {path: rel(previewPath), sha256: shaFile(previewPath)},
    component: {path: rel(componentPath), sha256: shaFile(componentPath)},
    sourcePlan: {path: rel(sourcePlanPath), sha256: shaFile(sourcePlanPath)},
  };
}

function initializeEvidence() {
  const current = currentBindings();
  const evidence: Evidence = {
    schemaVersion: 'profile-v1-departure-structure-review/v1',
    authority: 'HUMAN_STRUCTURE_PREVIEW_REVIEW',
    boundAt: new Date().toISOString(),
    ...current,
    checkpoints: [
      {id: 'airport', frame: 45, timing: 'NOT_RUN', visualFlow: 'NOT_RUN', readability: 'NOT_RUN'},
      {id: 'runway', frame: 145, timing: 'NOT_RUN', visualFlow: 'NOT_RUN', readability: 'NOT_RUN'},
      {id: 'window', frame: 245, timing: 'NOT_RUN', visualFlow: 'NOT_RUN', readability: 'NOT_RUN'},
    ],
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    realMediaReviewed: false,
    bgmReviewed: false,
    productionReady: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Profile departure structure review initialized: ${rel(evidencePath)}`);
  console.log('All verdicts remain NOT_RUN. This review covers structure only; it cannot approve real media, BGM or production readiness.');
}

function verifyEvidence(strict: boolean) {
  if (!existsSync(evidencePath)) {
    console.log('Profile departure structure review: NOT_RUN (evidence file missing)');
    if (strict) process.exit(1);
    return;
  }

  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  let current: ReturnType<typeof currentBindings> | null = null;
  try {
    current = currentBindings();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }

  const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence;
  if (evidence.schemaVersion !== 'profile-v1-departure-structure-review/v1') fail('PROFILE_DEPARTURE_REVIEW_SCHEMA');
  if (evidence.authority !== 'HUMAN_STRUCTURE_PREVIEW_REVIEW') fail('PROFILE_DEPARTURE_REVIEW_AUTHORITY');
  if (current) {
    if (evidence.preview.sha256 !== current.preview.sha256 || evidence.preview.path !== current.preview.path) fail('STALE_PROFILE_DEPARTURE_PREVIEW');
    if (evidence.component.sha256 !== current.component.sha256) fail('STALE_PROFILE_DEPARTURE_COMPONENT');
    if (evidence.sourcePlan.sha256 !== current.sourcePlan.sha256) fail('STALE_PROFILE_DEPARTURE_SOURCE_PLAN');
  }
  for (const checkpoint of evidence.checkpoints) {
    if (checkpoint.timing !== 'PASS') fail(`PROFILE_DEPARTURE_TIMING_${checkpoint.timing}:${checkpoint.id}`);
    if (checkpoint.visualFlow !== 'PASS') fail(`PROFILE_DEPARTURE_VISUAL_FLOW_${checkpoint.visualFlow}:${checkpoint.id}`);
    if (checkpoint.readability !== 'PASS') fail(`PROFILE_DEPARTURE_READABILITY_${checkpoint.readability}:${checkpoint.id}`);
  }
  if (evidence.review.overall !== 'PASS') fail(`PROFILE_DEPARTURE_OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) fail('PROFILE_DEPARTURE_REVIEWER_MISSING');
  if (!evidence.review.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) fail('PROFILE_DEPARTURE_REVIEWED_AT_INVALID');
  if (evidence.realMediaReviewed !== false) fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_REAL_MEDIA_REVIEW');
  if (evidence.bgmReviewed !== false) fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_BGM_REVIEW');
  if (evidence.productionReady !== false) fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_PRODUCTION_READY');

  if (errors.length > 0) {
    console.log(`Profile departure structure review: BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    if (strict) process.exit(1);
    return;
  }

  console.log('Profile departure structure review: PASS for the current SHA-bound 10-second placeholder structure preview.');
  console.log('realMediaReviewed=false bgmReviewed=false productionReady=false remain mandatory boundaries.');
}

if (mode === 'init') initializeEvidence();
else verifyEvidence(mode === 'strict');
