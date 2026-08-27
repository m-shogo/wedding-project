import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(studioRoot, '..');
const read = (base: string, relative: string) => readFileSync(join(base, relative), 'utf8');
const sourcePlan = read(repoRoot, '01_profile-movie/chapter-plan.md');
const preview = read(studioRoot, 'src/compositions/profile/ProfileV1DeparturePreview.tsx');
const root = read(studioRoot, 'src/ProfileV1Root.tsx');
const entry = read(studioRoot, 'src/index-profile-v1.ts');
const renderQa = read(studioRoot, 'scripts/render-profile-v1-departure-qa-stills.mts');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of ['Chapter 1 出発', '- 10秒', '- BGMあり', '- テロップあり']) {
  requireText(sourcePlan, token, `Profile source plan missing departure prototype contract: ${token}`);
}
for (const token of [
  'PROFILE MOVIE V1 / STRUCTURE PREVIEW ONLY',
  'REAL MEDIA SLOT',
  'PLACEHOLDER — REAL MEDIA NOT CLAIMED',
  'CHAPTER 1 / 出発',
  'BGM RIGHTS: NOT CLAIMED HERE',
  'HUMAN PREVIEW QA: NOT_RUN',
  "{label: 'AIRPORT'",
  "{label: 'RUNWAY'",
  "{label: 'WINDOW'",
]) {
  requireText(preview, token, `Profile departure preview missing: ${token}`);
}
for (const token of [
  'id="ProfileV1DeparturePreview"',
  'component={ProfileV1DeparturePreview}',
  'durationInFrames={10 * video.fps}',
  'fps={video.fps}',
  'width={video.width}',
  'height={video.height}',
]) {
  requireText(root, token, `Profile departure composition contract missing: ${token}`);
}
requireText(entry, 'registerRoot(ProfileV1Root)', 'Profile V1 entry does not register its root');
for (const token of ['frame: 45', 'frame: 145', 'frame: 245', 'src/index-profile-v1.ts', 'ProfileV1DeparturePreview']) {
  requireText(renderQa, token, `Profile departure visual smoke missing: ${token}`);
}

for (const forbidden of ['staticFile(', '<Audio', '<Video', '<Img']) {
  if (preview.includes(forbidden)) errors.push(`Structure preview must not claim or load missing production media: ${forbidden}`);
}
if (preview.includes('HUMAN PREVIEW QA: PASS')) errors.push('Structure preview must not fabricate Human preview QA');

if (errors.length > 0) {
  console.error(`Profile V1 departure preview contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Profile V1 departure preview contracts OK: the source-authorized 10-second first prototype is renderable with three neutral structural beats, no real-media/BGM claims, and Human preview QA remains NOT_RUN.');
