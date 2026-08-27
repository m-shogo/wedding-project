import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const composition = readFileSync(join(root, 'src/compositions/profile/ProfileV1.tsx'), 'utf8');
const rootFile = readFileSync(join(root, 'src/ProfileV1Root.tsx'), 'utf8');
const renderScript = readFileSync(join(root, 'scripts/render-profile-v1-production.mts'), 'utf8');
const productionPreflight = readFileSync(join(root, 'scripts/profile-v1-production-preflight.mts'), 'utf8');
const renderQa = readFileSync(join(root, 'scripts/check-profile-render.mts'), 'utf8');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'profileV1RuntimeMedia',
  'profileV1Chapters',
  "staticFile('audio/profile/bgm-main.mp3')",
  '<Audio', '<Sequence', '<OffthreadVideo', 'muted', "objectFit: 'cover'", 'PROFILE MEDIA REQUIRED',
]) requireText(composition, token, `production composition missing: ${token}`);

for (const forbidden of [
  'REAL-MEDIA PREVIEW INPUT', 'RUNTIME MEDIA RESOLVED', 'crop/focus/color/emotional-fit/content QA: NOT_RUN',
  'productionReady: true', "macDaVinciActualState: 'PASS'",
]) if (composition.includes(forbidden)) errors.push(`production composition contains review/promotion token: ${forbidden}`);

for (const token of [
  "import {ProfileV1} from './compositions/profile/ProfileV1'", 'id="ProfileV1"', 'component={ProfileV1}', 'durationInFrames={30 * video.fps}',
]) requireText(rootFile, token, `ProfileV1Root missing production registration: ${token}`);

for (const token of [
  "'scripts/profile-v1-production-preflight.mts', '--strict'", "'ProfileV1'", "'out/profile/profile_v1.mp4'", "'scripts/check-profile-render.mts'",
]) requireText(renderScript, token, `production render script missing: ${token}`);
for (const token of [
  'scripts/check-profile-v1-generated-accents.mts',
  "scripts/profile-v1-assembly-preflight.mts', ['--json']",
  "generatedAccents.state === 'PASS' && assemblyReady",
]) requireText(productionPreflight, token, `full production preflight missing: ${token}`);
if (renderScript.includes("'scripts/profile-v1-assembly-preflight.mts', '--strict'")) {
  errors.push('production render bypasses generated-accent contracts by calling assembly preflight directly');
}
for (const token of ['audio stream missing', 'duration: 30', 'width: 1920', 'height: 1080', 'fps: 30']) {
  requireText(renderQa, token, `Profile final render QA missing: ${token}`);
}

if (errors.length) {
  console.error(`Profile V1 production composition contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Profile V1 production composition contracts OK: generated-accent contracts + strict assembly gate → clean runtime-media+BGM render → technical media QA, without review chrome or fabricated Mac/production state.');
