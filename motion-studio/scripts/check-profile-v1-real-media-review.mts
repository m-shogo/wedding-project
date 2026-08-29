import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const review = readFileSync(join(root, 'scripts/profile-v1-real-media-review.mts'), 'utf8');
const renderer = readFileSync(join(root, 'scripts/render-profile-v1-real-media-preview.mts'), 'utf8');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "schemaVersion: 'profile-v1-real-media-review/v1'",
  "authority: 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW'",
  "out/preview/profile_v1_real_media_preview.mp4",
  "profileV1RuntimeMedia",
  "profileV1Chapters",
  "profileV1ProductionContract",
  "runtime.resolvedCount !== 17",
  "shaFile(absolute)",
  "previewSourceFingerprintSha256",
  "previewSources: PreviewSource[]",
  "src/index-profile-v1.ts",
  "src/ProfileV1Root.tsx",
  "scripts/render-profile-v1-real-media-preview.mts",
  "src/data/theme.ts",
  "runtimeManifestSha256",
  "productionPlanSha256",
  "previewComponentSha256",
  "canonicalPlanFingerprint",
  "crop: 'NOT_RUN'",
  "focus: 'NOT_RUN'",
  "color: 'NOT_RUN'",
  "emotionalFit: 'NOT_RUN'",
  "contentAccuracy: 'NOT_RUN'",
  "visualFlow: 'NOT_RUN'",
  "readability: 'NOT_RUN'",
  "mediaRoleFit: 'NOT_RUN'",
  "review: {overall: 'NOT_RUN', reviewer: null",
  "bgmReviewed: false",
  "macDaVinciActual: 'NOT_RUN'",
  "productionReady: false",
  "STALE_REAL_MEDIA_PREVIEW",
  "STALE_REAL_MEDIA_PREVIEW_SOURCE_FINGERPRINT",
  "STALE_REAL_MEDIA_PREVIEW_SOURCE:",
  "PREVIEW_SOURCE_COUNT:",
  "STALE_RUNTIME_MEDIA_MANIFEST",
  "STALE_PROFILE_PRODUCTION_PLAN",
  "STALE_REAL_MEDIA_PREVIEW_COMPONENT",
  "STALE_CANONICAL_PLAN_FINGERPRINT",
  "MEDIA_EVIDENCE_DUPLICATE:",
  "MEDIA_EVIDENCE_UNKNOWN:",
  "MEDIA_EVIDENCE_MISSING:",
  "saved.chapterId !== item.chapterId",
  "saved.label !== item.label",
  "MEDIA_QA_INVALID:",
  "CHAPTER_EVIDENCE_DUPLICATE:",
  "CHAPTER_EVIDENCE_UNKNOWN:",
  "CHAPTER_EVIDENCE_MISSING:",
  "CHAPTER_EVIDENCE_STALE_TITLE:",
  "CHAPTER_QA_INVALID:",
  "BOUND_AT_INVALID",
  "REVIEWED_BEFORE_BINDING",
  "reviewedAtMs < boundAtMs",
  "REVIEWER_MISSING",
  "mode === 'strict' && !status.humanReviewComplete",
]) {
  requireText(review, token, `Profile real-media Human QA contract missing: ${token}`);
}

for (const forbidden of [
  "overall: 'PASS'",
  "bgmReviewed: true",
  "macDaVinciActual: 'PASS'",
  "productionReady: true",
  "humanReviewComplete: true",
]) {
  if (review.includes(forbidden)) errors.push(`Profile real-media review fabricates approval/readiness: ${forbidden}`);
}

if (!review.includes('reviewedAtMs < boundAtMs')) {
  errors.push('Profile real-media Human review must occur after its current preview evidence binding');
}
if (!review.includes('evidence.previewSourceFingerprintSha256 !== current.previewSourceFingerprintSha256')) {
  errors.push('Profile real-media Human review must invalidate when the preview render implementation fingerprint changes');
}
if (!review.includes('savedSources.get(source.path) !== source.sha256')) {
  errors.push('Profile real-media Human review must compare each current preview source by path and SHA');
}

for (const token of [
  "'ProfileV1RealMediaPreview'",
  "out/preview/profile_v1_real_media_preview.mp4",
  "'--scale=0.5'",
  "'--crf=24'",
]) {
  requireText(renderer, token, `Profile real-media preview renderer missing: ${token}`);
}

if (errors.length) {
  console.error(`Profile V1 real-media Human QA contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Profile V1 real-media Human QA contracts OK: review evidence is bound to the preview movie plus current index/root/composition/render-command/theme implementation, canonical 17-slot identities, canonical 5-chapter identities, runtime manifest and production plan; Human review must occur after the current binding, source/media/chapter drift fails closed, and verdicts cannot promote BGM/Mac Actual/production readiness.');
