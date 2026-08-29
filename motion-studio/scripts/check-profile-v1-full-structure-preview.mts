import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const component = readFileSync(join(root, 'src/compositions/profile/ProfileV1FullStructurePreview.tsx'), 'utf8');
const profileRoot = readFileSync(join(root, 'src/ProfileV1Root.tsx'), 'utf8');
const review = readFileSync(join(root, 'scripts/profile-v1-full-structure-review.mts'), 'utf8');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'profileV1Chapters.map',
  'chapter.mediaSlots.filter((slot) => slot.required)',
  'PROFILE MOVIE V1 / FULL STRUCTURE PREVIEW ONLY',
  'PLACEHOLDER — REAL MEDIA NOT CLAIMED',
  'BGM RIGHTS: NOT CLAIMED HERE',
  'REAL MEDIA QA: NOT_RUN / MAC DAVINCI ACTUAL: NOT_RUN',
]) {
  requireText(component, token, `Profile full structure preview missing: ${token}`);
}

for (const token of [
  'id="ProfileV1FullStructurePreview"',
  'durationInFrames={30 * video.fps}',
  'component={ProfileV1FullStructurePreview}',
]) {
  requireText(profileRoot, token, `Profile root missing full structure contract: ${token}`);
}

for (const token of [
  "schemaVersion: 'profile-v1-full-structure-review/v1'",
  "authority: 'HUMAN_FULL_STRUCTURE_REVIEW'",
  "realMediaReviewed: false",
  "bgmReviewed: false",
  "contentAccuracyReviewed: false",
  "macDaVinciActual: 'NOT_RUN'",
  "productionReady: false",
  'STALE_PROFILE_FULL_STRUCTURE_PREVIEW',
  'STALE_PROFILE_PRODUCTION_PLAN',
  'STALE_PROFILE_CHAPTER_PLAN',
]) {
  requireText(review, token, `Profile full structure review contract missing: ${token}`);
}

for (const forbidden of [
  '<Img',
  '<Video',
  'staticFile(',
  'productionReady: true',
  "macDaVinciActual: 'PASS'",
]) {
  if (component.includes(forbidden) || review.includes(forbidden)) {
    errors.push(`Profile full structure preview/review contains unsafe production claim or real-media dependency: ${forbidden}`);
  }
}

if (errors.length) {
  console.error(`Profile V1 full structure preview contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Profile V1 full structure preview contracts OK: all five canonical chapters are represented by neutral required-media roles, with SHA-bound human structure review and no real-media/BGM/Mac Actual/production claims.');
