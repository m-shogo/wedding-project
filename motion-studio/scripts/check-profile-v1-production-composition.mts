import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const composition = readFileSync(join(root, 'src/compositions/profile/ProfileV1.tsx'), 'utf8');
const rootFile = readFileSync(join(root, 'src/ProfileV1Root.tsx'), 'utf8');
const packageJson = readFileSync(join(root, 'package.json'), 'utf8');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "profileV1RuntimeMedia",
  "profileV1Chapters",
  "staticFile('audio/profile/bgm-main.mp3')",
  '<Audio',
  '<Sequence',
  '<OffthreadVideo',
  'muted',
  'objectFit: \'cover\'',
  'PROFILE MEDIA REQUIRED',
]) requireText(composition, token, `production composition missing: ${token}`);

for (const forbidden of [
  'REAL-MEDIA PREVIEW INPUT',
  'RUNTIME MEDIA RESOLVED',
  'crop/focus/color/emotional-fit/content QA: NOT_RUN',
  'productionReady: true',
  'macDaVinciActualState: \'PASS\'',
]) {
  if (composition.includes(forbidden)) errors.push(`production composition contains review/promotion token: ${forbidden}`);
}

for (const token of [
  "import {ProfileV1} from './compositions/profile/ProfileV1'",
  'id="ProfileV1"',
  'component={ProfileV1}',
  'durationInFrames={30 * video.fps}',
]) requireText(rootFile, token, `ProfileV1Root missing production registration: ${token}`);

requireText(packageJson, '"render:profile-v1"', 'package script render:profile-v1 missing');
requireText(packageJson, 'profile-v1-assembly-preflight.mts --strict', 'render must require strict assembly preflight');
requireText(packageJson, 'ProfileV1 out/profile/profile_v1.mp4', 'render must target ProfileV1 production composition');

if (errors.length) {
  console.error(`Profile V1 production composition contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Profile V1 production composition contracts OK: runtime media + cleared BGM path are used without review chrome or fabricated production/Mac Actual state.');
