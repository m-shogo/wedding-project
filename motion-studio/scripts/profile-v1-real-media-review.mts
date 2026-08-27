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
const previewSourcePaths = [
  'src/index-profile-v1.ts',
  'src/ProfileV1Root.tsx',
  'src/compositions/profile/ProfileV1RealMediaPreview.tsx',
  'scripts/render-profile-v1-real-media-preview.mts',
  'src/data/profileV1RuntimeMedia.generated.ts',
  'src/data/profileV1ProductionPlan.ts',
  'src/data/theme.ts',
] as const;
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
type PreviewSource = {path: string; sha256: string};

type MediaEvidence = {
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
};

type ChapterEvidence = {
  chapterId: string;
  title: string;
  visualFlow: QaState;
  readability: QaState;
  mediaRoleFit: QaState;
};

type Evidence = {
  schemaVersion: 'profile-v1-real-media-review/v1';
  authority: 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW';
  boundAt: string;
  preview: {path: string; sha256: string};
  previewSourceFingerprintSha256: string;
  previewSources: PreviewSource[];
  runtimeManifestSha256: string;
  productionPlanSha256: string;
  previewComponentSha256: string;
  canonicalPlanFingerprint: string;
  media: MediaEvidence[];
  chapters: ChapterEvidence[];
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
const qaAxes = ['crop', 'focus', 'color', 'emotionalFit', 'contentAccuracy'] as const;
const chapterQaAxes = ['visualFlow', 'readability', 'mediaRoleFit'] as const;
const isQaState = (value: unknown): value is QaState => value === 'NOT_RUN' || value === 'PASS' || value === 'FAIL';

function previewSourceBinding() {
  const previewSources = previewSourcePaths.map((path) => {
    const absolute = join(studioRoot, path);
    if (!existsSync(absolute)) throw new Error(`PROFILE_REAL_MEDIA_PREVIEW_SOURCE_MISSING:${path}`);
    return {path, sha256: shaFile(absolute)};
  });
  const previewSourceFingerprintSha256 = shaBuffer(
    previewSources.map((source) => `${source.path}\0${source.sha256}`).join('\n'),
  );
  return {previewSourceFingerprintSha256, previewSources};
}

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
    ...previewSourceBinding(),
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
    previewSourceFingerprintSha256: current.previewSourceFingerprintSha256,
    previewSources: current.previewSources,
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
  console.log(`previewSourceFingerprintSha256=${evidence.previewSourceFingerprintSha256}`);
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
  const boundAtMs = Date.parse(evidence.boundAt);
  if (!evidence.boundAt || Number.isNaN(boundAtMs)) blockers.push('BOUND_AT_INVALID');

  let current: ReturnType<typeof currentBindings> | null = null;
  try {
    current = currentBindings();
  } catch (error) {
    blockers.push(error instanceof Error ? error.message : String(error));
  }

  if (!Array.isArray(evidence.media)) {
    blockers.push('MEDIA_REVIEW_NOT_ARRAY');
  } else {
    const mediaIds = evidence.media.map((item) => item?.slot).filter((slot): slot is string => typeof slot === 'string');
    const duplicateMediaIds = mediaIds.filter((slot, index) => mediaIds.indexOf(slot) !== index);
    for (const slot of [...new Set(duplicateMediaIds)]) blockers.push(`MEDIA_EVIDENCE_DUPLICATE:${slot}`);

    if (current) {
      const canonicalMediaIds = new Set(current.media.map((item) => item.slot));
      for (const saved of evidence.media) {
        if (!saved || typeof saved.slot !== 'string' || !canonicalMediaIds.has(saved.slot)) {
          blockers.push(`MEDIA_EVIDENCE_UNKNOWN:${saved?.slot ?? 'INVALID'}`);
        }
      }
      for (const item of current.media) {
        const matching = evidence.media.filter((candidate) => candidate?.slot === item.slot);
        if (matching.length !== 1) {
          if (matching.length === 0) blockers.push(`MEDIA_EVIDENCE_MISSING:${item.slot}`);
          continue;
        }
        const saved = matching[0];
        if (
          saved.file !== item.file ||
          saved.sha256 !== item.sha256 ||
          saved.extension !== item.extension ||
          saved.chapterId !== item.chapterId ||
          saved.label !== item.label
        ) blockers.push(`STALE_MEDIA:${item.slot}`);
      }
    }
  }

  if (current) {
    if (evidence.preview.path !== current.preview.path || evidence.preview.sha256 !== current.preview.sha256) blockers.push('STALE_REAL_MEDIA_PREVIEW');
    if (evidence.previewSourceFingerprintSha256 !== current.previewSourceFingerprintSha256) blockers.push('STALE_REAL_MEDIA_PREVIEW_SOURCE_FINGERPRINT');
    const savedSources = new Map(Array.isArray(evidence.previewSources) ? evidence.previewSources.map((source) => [source.path, source.sha256]) : []);
    for (const source of current.previewSources) {
      if (savedSources.get(source.path) !== source.sha256) blockers.push(`STALE_REAL_MEDIA_PREVIEW_SOURCE:${source.path}`);
    }
    if (!Array.isArray(evidence.previewSources) || evidence.previewSources.length !== current.previewSources.length) {
      blockers.push(`PREVIEW_SOURCE_COUNT:${Array.isArray(evidence.previewSources) ? evidence.previewSources.length : 0}/${current.previewSources.length}`);
    }
    if (evidence.runtimeManifestSha256 !== current.runtimeManifestSha256) blockers.push('STALE_RUNTIME_MEDIA_MANIFEST');
    if (evidence.productionPlanSha256 !== current.productionPlanSha256) blockers.push('STALE_PROFILE_PRODUCTION_PLAN');
    if (evidence.previewComponentSha256 !== current.previewComponentSha256) blockers.push('STALE_REAL_MEDIA_PREVIEW_COMPONENT');
    if (evidence.canonicalPlanFingerprint !== current.canonicalPlanFingerprint) blockers.push('STALE_CANONICAL_PLAN_FINGERPRINT');
  }

  if (!Array.isArray(evidence.media) || evidence.media.length !== 17) blockers.push(`MEDIA_REVIEW_COUNT:${Array.isArray(evidence.media) ? evidence.media.length : 0}/17`);
  if (Array.isArray(evidence.media)) {
    for (const media of evidence.media) {
      if (!media || typeof media.qa !== 'object' || media.qa === null) {
        blockers.push(`MEDIA_QA_INVALID:${media?.slot ?? 'INVALID'}`);
        continue;
      }
      for (const axis of qaAxes) {
        const state = media.qa[axis];
        if (!isQaState(state)) blockers.push(`MEDIA_QA_INVALID:${media.slot}:${axis}`);
        else if (state !== 'PASS') blockers.push(`MEDIA_QA_${state}:${media.slot}:${axis}`);
      }
    }
  }

  if (!Array.isArray(evidence.chapters)) {
    blockers.push('CHAPTER_REVIEW_NOT_ARRAY');
  } else {
    if (evidence.chapters.length !== profileV1Chapters.length) blockers.push(`CHAPTER_REVIEW_COUNT:${evidence.chapters.length}/${profileV1Chapters.length}`);
    const chapterIds = evidence.chapters.map((chapter) => chapter?.chapterId).filter((id): id is string => typeof id === 'string');
    const duplicateChapterIds = chapterIds.filter((id, index) => chapterIds.indexOf(id) !== index);
    for (const id of [...new Set(duplicateChapterIds)]) blockers.push(`CHAPTER_EVIDENCE_DUPLICATE:${id}`);

    const canonicalChapterIds = new Set(profileV1Chapters.map((chapter) => chapter.id));
    for (const saved of evidence.chapters) {
      if (!saved || typeof saved.chapterId !== 'string' || !canonicalChapterIds.has(saved.chapterId)) {
        blockers.push(`CHAPTER_EVIDENCE_UNKNOWN:${saved?.chapterId ?? 'INVALID'}`);
      }
    }
    for (const chapter of profileV1Chapters) {
      const matching = evidence.chapters.filter((saved) => saved?.chapterId === chapter.id);
      if (matching.length === 0) {
        blockers.push(`CHAPTER_EVIDENCE_MISSING:${chapter.id}`);
        continue;
      }
      if (matching.length !== 1) continue;
      const saved = matching[0];
      if (saved.title !== chapter.title) blockers.push(`CHAPTER_EVIDENCE_STALE_TITLE:${chapter.id}`);
      for (const axis of chapterQaAxes) {
        const state = saved[axis];
        if (!isQaState(state)) blockers.push(`CHAPTER_QA_INVALID:${chapter.id}:${axis}`);
        else if (state !== 'PASS') blockers.push(`CHAPTER_${axis.toUpperCase()}_${state}:${chapter.id}`);
      }
    }
  }

  if (!evidence.review || evidence.review.overall !== 'PASS') blockers.push(`OVERALL_${evidence.review?.overall ?? 'INVALID'}`);
  if (!evidence.review?.reviewer?.trim()) blockers.push('REVIEWER_MISSING');
  const reviewedAtMs = evidence.review?.reviewedAt ? Date.parse(evidence.review.reviewedAt) : Number.NaN;
  if (!evidence.review?.reviewedAt || Number.isNaN(reviewedAtMs)) blockers.push('REVIEWED_AT_INVALID');
  else if (!Number.isNaN(boundAtMs) && reviewedAtMs < boundAtMs) blockers.push('REVIEWED_BEFORE_BINDING');

  const mediaReviewed = Array.isArray(evidence.media)
    ? evidence.media.filter((media) => media?.qa && qaAxes.every((axis) => media.qa[axis] === 'PASS')).length
    : 0;
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
