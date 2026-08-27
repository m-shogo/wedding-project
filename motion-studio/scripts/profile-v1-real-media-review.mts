import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {profileV1Chapters, profileV1ProductionContract} from '../src/data/profileV1ProductionPlan.ts';
import {profileV1RuntimeMedia} from '../src/data/profileV1RuntimeMedia.generated.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(studioRoot, 'out/preview/profile_v1_real_media_preview.mp4');
const evidencePath = join(studioRoot, 'out/qa/profile-v1-real-media-review.json');
const runtimeManifestPath = join(studioRoot, 'src/data/profileV1RuntimeMedia.generated.ts');
const productionPlanPath = join(studioRoot, 'src/data/profileV1ProductionPlan.ts');
const previewComponentPath = join(studioRoot, 'src/compositions/profile/ProfileV1RealMediaPreview.tsx');
const mode = process.argv.includes('--init')
  ? 'init'
  : process.argv.includes('--strict')
    ? 'strict'
    : process.argv.includes('--json')
      ? 'json'
      : 'status';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type RuntimeSlot = {
  id: string;
  chapterId: string;
  label: string;
  canonicalStem: string;
  file: string | null;
  staticFilePath: string | null;
  extension: string | null;
  resolved: boolean;
};

type Evidence = {
  schemaVersion: 'profile-v1-real-media-review/v1';
  authority: 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW';
  boundAt: string;
  preview: {path: string; sha256: string};
  runtimeManifestSha256: string;
  productionPlanSha256: string;
  previewComponentSha256: string;
  canonicalPlanFingerprint: string;
  media: Array<{
    slot: string;
    chapterId: string;
    label: string;
    file: string;
    extension: string;
    sha256: string;
    qa: {
      crop: QaState;
      focus: QaState;
      color: QaState;
      emotionalFit: QaState;
      contentAccuracy: QaState;
    };
  }>;
  chapters: Array<{
    chapterId: string;
    title: string;
    visualFlow: QaState;
    readability: QaState;
    mediaRoleFit: QaState;
  }>;
  review: {overall: QaState; reviewer: string | null; reviewedAt: string | null; notes: string};
  bgmReviewed: false;
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const runtime = profileV1RuntimeMedia as unknown as {
  expectedCount: number;
  resolvedCount: number;
  missingCount: number;
  slots: RuntimeSlot[];
};
const shaBuffer = (value: Buffer | string) => createHash('sha256').update(value).digest('hex');
const shaFile = (path: string) => shaBuffer(readFileSync(path));
const shaJson = (value: unknown) => shaBuffer(JSON.stringify(value));
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

function currentBindings() {
  if (!existsSync(previewPath)) {
    throw new Error('PROFILE_REAL_MEDIA_PREVIEW_MISSING:run node --no-warnings scripts/render-profile-v1-real-media-preview.mts');
  }
  if (runtime.expectedCount !== 17 || runtime.slots.length !== 17) {
    throw new Error(`PROFILE_REAL_MEDIA_SLOT_COUNT_INVALID:${runtime.slots.length}/${runtime.expectedCount}`);
  }
  if (runtime.resolvedCount !== 17 || runtime.missingCount !== 0) {
    throw new Error(`PROFILE_REAL_MEDIA_NOT_READY:${runtime.resolvedCount}/17`);
  }

  const media = runtime.slots.map((slot) => {
    if (!slot.resolved || !slot.staticFilePath || !slot.file || !slot.extension) {
      throw new Error(`PROFILE_REAL_MEDIA_SLOT_UNRESOLVED:${slot.id}`);
    }
    const absolute = join(studioRoot, 'public', slot.staticFilePath);
    if (!existsSync(absolute)) throw new Error(`PROFILE_REAL_MEDIA_FILE_MISSING:${slot.id}:${slot.staticFilePath}`);
    return {
      slot: slot.id,
      chapterId: slot.chapterId,
      label: slot.label,
      file: rel(absolute),
      extension: slot.extension,
      sha256: shaFile(absolute),
    };
  });

  return {
    preview: {path: rel(previewPath), sha256: shaFile(previewPath)},
    runtimeManifestSha256: shaFile(runtimeManifestPath),
    productionPlanSha256: shaFile(productionPlanPath),
    previewComponentSha256: shaFile(previewComponentPath),
    canonicalPlanFingerprint: shaJson({chapters: profileV1Chapters, contract: profileV1ProductionContract}),
    media,
  };
}

function initializeEvidence() {
  const current = currentBindings();
  const evidence: Evidence = {
    schemaVersion: 'profile-v1-real-media-review/v1',
    authority: 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW',
    boundAt: new Date().toISOString(),
    preview: current.preview,
    runtimeManifestSha256: current.runtimeManifestSha256,
    productionPlanSha256: current.productionPlanSha256,
    previewComponentSha256: current.previewComponentSha256,
    canonicalPlanFingerprint: current.canonicalPlanFingerprint,
    media: current.media.map((item) => ({
      ...item,
      qa: {
        crop: 'NOT_RUN',
        focus: 'NOT_RUN',
        color: 'NOT_RUN',
        emotionalFit: 'NOT_RUN',
        contentAccuracy: 'NOT_RUN',
      },
    })),
    chapters: profileV1Chapters.map((chapter) => ({
      chapterId: chapter.id,
      title: chapter.title,
      visualFlow: 'NOT_RUN',
      readability: 'NOT_RUN',
      mediaRoleFit: 'NOT_RUN',
    })),
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    bgmReviewed: false,
    macDaVinciActual: 'NOT_RUN',
    productionReady: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Profile V1 real-media review evidence initialized: ${rel(evidencePath)}`);
  console.log('All Human visual/content verdicts remain NOT_RUN; BGM and Mac DaVinci Actual stay separate.');
}

function evaluate() {
  const blockers: string[] = [];
  if (!existsSync(evidencePath)) {
    return {
      schemaVersion: 'profile-v1-real-media-review-status/v1',
      authority: 'DERIVED_REAL_MEDIA_REVIEW_STATUS',
      state: 'NOT_RUN' as const,
      humanReviewComplete: false,
      blockers: ['REAL_MEDIA_REVIEW_EVIDENCE_MISSING'],
      mediaExpected: 17,
      mediaReviewed: 0,
      bgmReviewed: false,
      macDaVinciActual: 'NOT_RUN' as const,
      productionReady: false,
    };
  }

  let evidence: Evidence;
  try {
    evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence;
  } catch {
    return {
      schemaVersion: 'profile-v1-real-media-review-status/v1',
      authority: 'DERIVED_REAL_MEDIA_REVIEW_STATUS',
      state: 'BLOCKED' as const,
      humanReviewComplete: false,
      blockers: ['REAL_MEDIA_REVIEW_EVIDENCE_INVALID_JSON'],
      mediaExpected: 17,
      mediaReviewed: 0,
      bgmReviewed: false,
      macDaVinciActual: 'NOT_RUN' as const,
      productionReady: false,
    };
  }

  if (evidence.schemaVersion !== 'profile-v1-real-media-review/v1') blockers.push('SCHEMA_VERSION');
  if (evidence.authority !== 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW') blockers.push('AUTHORITY');
  if (evidence.bgmReviewed !== false) blockers.push('BGM_REVIEW_MUST_REMAIN_SEPARATE');
  if (evidence.macDaVinciActual !== 'NOT_RUN') blockers.push('MAC_DAVINCI_ACTUAL_MUST_REMAIN_SEPARATE');
  if (evidence.productionReady !== false) blockers.push('REAL_MEDIA_REVIEW_CANNOT_PROMOTE_PRODUCTION');

  let current: ReturnType<typeof currentBindings> | null = null;
  try {
    current = currentBindings();
  } catch (error) {
    blockers.push(error instanceof Error ? error.message : String(error));
  }

  if (current) {
    if (evidence.preview.path !== current.preview.path || evidence.preview.sha256 !== current.preview.sha256) blockers.push('STALE_REAL_MEDIA_PREVIEW');
    if (evidence.runtimeManifestSha256 !== current.runtimeManifestSha256) blockers.push('STALE_RUNTIME_MEDIA_MANIFEST');
    if (evidence.productionPlanSha256 !== current.productionPlanSha256) blockers.push('STALE_PROFILE_PRODUCTION_PLAN');
    if (evidence.previewComponentSha256 !== current.previewComponentSha256) blockers.push('STALE_REAL_MEDIA_PREVIEW_COMPONENT');
    if (evidence.canonicalPlanFingerprint !== current.canonicalPlanFingerprint) blockers.push('STALE_CANONICAL_PLAN_FINGERPRINT');
    for (const item of current.media) {
      const saved = evidence.media.find((candidate) => candidate.slot === item.slot);
      if (!saved) blockers.push(`MEDIA_EVIDENCE_MISSING:${item.slot}`);
      else if (saved.file !== item.file || saved.sha256 !== item.sha256 || saved.extension !== item.extension) blockers.push(`STALE_MEDIA:${item.slot}`);
    }
  }

  if (evidence.media.length !== 17) blockers.push(`MEDIA_REVIEW_COUNT:${evidence.media.length}/17`);
  for (const media of evidence.media) {
    for (const [axis, state] of Object.entries(media.qa)) {
      if (state !== 'PASS') blockers.push(`MEDIA_QA_${state}:${media.slot}:${axis}`);
    }
  }
  if (evidence.chapters.length !== 5) blockers.push(`CHAPTER_REVIEW_COUNT:${evidence.chapters.length}/5`);
  for (const chapter of evidence.chapters) {
    if (chapter.visualFlow !== 'PASS') blockers.push(`CHAPTER_VISUAL_FLOW_${chapter.visualFlow}:${chapter.chapterId}`);
    if (chapter.readability !== 'PASS') blockers.push(`CHAPTER_READABILITY_${chapter.readability}:${chapter.chapterId}`);
    if (chapter.mediaRoleFit !== 'PASS') blockers.push(`CHAPTER_MEDIA_ROLE_FIT_${chapter.mediaRoleFit}:${chapter.chapterId}`);
  }
  if (evidence.review.overall !== 'PASS') blockers.push(`OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) blockers.push('REVIEWER_MISSING');
  if (!evidence.review.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) blockers.push('REVIEWED_AT_INVALID');

  const mediaReviewed = evidence.media.filter((media) => Object.values(media.qa).every((state) => state === 'PASS')).length;
  const humanReviewComplete = blockers.length === 0;
  return {
    schemaVersion: 'profile-v1-real-media-review-status/v1',
    authority: 'DERIVED_REAL_MEDIA_REVIEW_STATUS',
    state: humanReviewComplete ? ('PASS' as const) : ('BLOCKED' as const),
    humanReviewComplete,
    blockers,
    mediaExpected: 17,
    mediaReviewed,
    bgmReviewed: false,
    macDaVinciActual: 'NOT_RUN' as const,
    productionReady: false,
  };
}

if (mode === 'init') {
  initializeEvidence();
} else {
  const status = evaluate();
  if (mode === 'json') console.log(JSON.stringify(status, null, 2));
  else {
    console.log(`Profile V1 real-media Human QA: ${status.state} (${status.mediaReviewed}/${status.mediaExpected} media approved)`);
    for (const blocker of status.blockers) console.log(`BLOCK / ${blocker}`);
  }
  if (mode === 'strict' && !status.humanReviewComplete) process.exit(1);
}
