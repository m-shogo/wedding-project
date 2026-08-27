import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(studioRoot, 'out/preview/profile_v1_full_structure_preview.mp4');
const evidencePath = join(studioRoot, 'out/qa/profile-v1-full-structure-review.json');
const componentPath = join(studioRoot, 'src/compositions/profile/ProfileV1FullStructurePreview.tsx');
const productionPlanPath = join(studioRoot, 'src/data/profileV1ProductionPlan.ts');
const sourcePlanPath = join(studioRoot, '../01_profile-movie/chapter-plan.md');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type ChapterId = 'departure' | 'separate-journeys' | 'intersection' | 'adventure' | 'arrival';
type Evidence = {
  schemaVersion: 'profile-v1-full-structure-review/v1';
  authority: 'HUMAN_FULL_STRUCTURE_REVIEW';
  boundAt: string;
  preview: {path: string; sha256: string};
  component: {path: string; sha256: string};
  productionPlan: {path: string; sha256: string};
  sourcePlan: {path: string; sha256: string};
  chapters: Array<{
    id: ChapterId;
    checkpointFrame: number;
    chapterOrder: QaState;
    visualHierarchy: QaState;
    pacing: QaState;
    mediaRoleClarity: QaState;
  }>;
  transitions: {
    chapterFlow: QaState;
    emotionalArc: QaState;
  };
  review: {
    overall: QaState;
    reviewer: string | null;
    reviewedAt: string | null;
    notes: string;
  };
  realMediaReviewed: false;
  bgmReviewed: false;
  contentAccuracyReviewed: false;
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

function currentBindings() {
  for (const [label, path] of [
    ['PROFILE_FULL_STRUCTURE_PREVIEW_MISSING', previewPath],
    ['PROFILE_FULL_STRUCTURE_COMPONENT_MISSING', componentPath],
    ['PROFILE_PRODUCTION_PLAN_MISSING', productionPlanPath],
    ['PROFILE_CHAPTER_PLAN_MISSING', sourcePlanPath],
  ] as const) {
    if (!existsSync(path)) throw new Error(label);
  }
  return {
    preview: {path: rel(previewPath), sha256: shaFile(previewPath)},
    component: {path: rel(componentPath), sha256: shaFile(componentPath)},
    productionPlan: {path: rel(productionPlanPath), sha256: shaFile(productionPlanPath)},
    sourcePlan: {path: rel(sourcePlanPath), sha256: shaFile(sourcePlanPath)},
  };
}

function initializeEvidence() {
  const evidence: Evidence = {
    schemaVersion: 'profile-v1-full-structure-review/v1',
    authority: 'HUMAN_FULL_STRUCTURE_REVIEW',
    boundAt: new Date().toISOString(),
    ...currentBindings(),
    chapters: [
      {id: 'departure', checkpointFrame: 90, chapterOrder: 'NOT_RUN', visualHierarchy: 'NOT_RUN', pacing: 'NOT_RUN', mediaRoleClarity: 'NOT_RUN'},
      {id: 'separate-journeys', checkpointFrame: 270, chapterOrder: 'NOT_RUN', visualHierarchy: 'NOT_RUN', pacing: 'NOT_RUN', mediaRoleClarity: 'NOT_RUN'},
      {id: 'intersection', checkpointFrame: 450, chapterOrder: 'NOT_RUN', visualHierarchy: 'NOT_RUN', pacing: 'NOT_RUN', mediaRoleClarity: 'NOT_RUN'},
      {id: 'adventure', checkpointFrame: 630, chapterOrder: 'NOT_RUN', visualHierarchy: 'NOT_RUN', pacing: 'NOT_RUN', mediaRoleClarity: 'NOT_RUN'},
      {id: 'arrival', checkpointFrame: 810, chapterOrder: 'NOT_RUN', visualHierarchy: 'NOT_RUN', pacing: 'NOT_RUN', mediaRoleClarity: 'NOT_RUN'},
    ],
    transitions: {chapterFlow: 'NOT_RUN', emotionalArc: 'NOT_RUN'},
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    realMediaReviewed: false,
    bgmReviewed: false,
    contentAccuracyReviewed: false,
    macDaVinciActual: 'NOT_RUN',
    productionReady: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Profile full structure review initialized: ${rel(evidencePath)}`);
  console.log('All human verdicts remain NOT_RUN; structure review cannot approve real media, BGM, content accuracy, Mac Actual or production readiness.');
}

function verifyEvidence(strict: boolean) {
  if (!existsSync(evidencePath)) {
    console.log('Profile full structure review: NOT_RUN (evidence file missing)');
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
  if (evidence.schemaVersion !== 'profile-v1-full-structure-review/v1') fail('PROFILE_FULL_STRUCTURE_REVIEW_SCHEMA');
  if (evidence.authority !== 'HUMAN_FULL_STRUCTURE_REVIEW') fail('PROFILE_FULL_STRUCTURE_REVIEW_AUTHORITY');
  if (current) {
    if (evidence.preview.sha256 !== current.preview.sha256) fail('STALE_PROFILE_FULL_STRUCTURE_PREVIEW');
    if (evidence.component.sha256 !== current.component.sha256) fail('STALE_PROFILE_FULL_STRUCTURE_COMPONENT');
    if (evidence.productionPlan.sha256 !== current.productionPlan.sha256) fail('STALE_PROFILE_PRODUCTION_PLAN');
    if (evidence.sourcePlan.sha256 !== current.sourcePlan.sha256) fail('STALE_PROFILE_CHAPTER_PLAN');
  }

  const expectedIds: ChapterId[] = ['departure', 'separate-journeys', 'intersection', 'adventure', 'arrival'];
  if (evidence.chapters.length !== expectedIds.length) fail('PROFILE_FULL_STRUCTURE_CHAPTER_COUNT');
  for (const id of expectedIds) {
    const chapter = evidence.chapters.find((item) => item.id === id);
    if (!chapter) {
      fail(`PROFILE_FULL_STRUCTURE_CHAPTER_MISSING:${id}`);
      continue;
    }
    for (const key of ['chapterOrder', 'visualHierarchy', 'pacing', 'mediaRoleClarity'] as const) {
      if (chapter[key] !== 'PASS') fail(`PROFILE_FULL_STRUCTURE_${key.toUpperCase()}_${chapter[key]}:${id}`);
    }
  }
  if (evidence.transitions.chapterFlow !== 'PASS') fail(`PROFILE_FULL_STRUCTURE_CHAPTER_FLOW_${evidence.transitions.chapterFlow}`);
  if (evidence.transitions.emotionalArc !== 'PASS') fail(`PROFILE_FULL_STRUCTURE_EMOTIONAL_ARC_${evidence.transitions.emotionalArc}`);
  if (evidence.review.overall !== 'PASS') fail(`PROFILE_FULL_STRUCTURE_OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) fail('PROFILE_FULL_STRUCTURE_REVIEWER_MISSING');
  if (!evidence.review.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) fail('PROFILE_FULL_STRUCTURE_REVIEWED_AT_INVALID');

  if (evidence.realMediaReviewed !== false) fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_REAL_MEDIA_REVIEW');
  if (evidence.bgmReviewed !== false) fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_BGM_REVIEW');
  if (evidence.contentAccuracyReviewed !== false) fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_CONTENT_ACCURACY');
  if (evidence.macDaVinciActual !== 'NOT_RUN') fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_MAC_DAVINCI_ACTUAL');
  if (evidence.productionReady !== false) fail('STRUCTURE_REVIEW_MUST_NOT_CLAIM_PRODUCTION_READY');

  if (errors.length > 0) {
    console.log(`Profile full structure review: BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    if (strict) process.exit(1);
    return;
  }

  console.log('Profile full structure review: PASS for the current SHA-bound neutral 5-chapter structure preview.');
  console.log('realMediaReviewed=false bgmReviewed=false contentAccuracyReviewed=false macDaVinciActual=NOT_RUN productionReady=false remain mandatory boundaries.');
}

if (mode === 'init') initializeEvidence();
else verifyEvidence(mode === 'strict');
