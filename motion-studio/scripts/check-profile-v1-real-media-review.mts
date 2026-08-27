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
  "STALE_RUNTIME_MEDIA_MANIFEST",
  "STALE_PROFILE_PRODUCTION_PLAN",
  "STALE_REAL_MEDIA_PREVIEW_COMPONENT",
  "STALE_CANONICAL_PLAN_FINGERPRINT",
  "STALE_MEDIA:",
  "MEDIA_QA_",
  "CHAPTER_VISUAL_FLOW_",
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

console.log('Profile V1 real-media Human QA contracts OK: review evidence is bound to preview, all 17 media files, runtime manifest and canonical plan; verdicts initialize NOT_RUN and cannot promote BGM/Mac Actual/production readiness.');
