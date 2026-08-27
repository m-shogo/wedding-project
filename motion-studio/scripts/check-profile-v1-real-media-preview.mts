import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const preview = readFileSync(join(root, 'src/compositions/profile/ProfileV1RealMediaPreview.tsx'), 'utf8');
const rootFile = readFileSync(join(root, 'src/ProfileV1Root.tsx'), 'utf8');
const runtime = readFileSync(join(root, 'src/data/profileV1RuntimeMedia.generated.ts'), 'utf8');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "profileV1RuntimeMedia",
  "profileV1Chapters",
  "staticFile(slot.staticFilePath)",
  "<Img src={src}",
  "<OffthreadVideo src={src} muted",
  "videoExtensions = new Set(['.mp4', '.mov', '.m4v', '.webm'])",
  "slot.resolved",
  "REAL MEDIA MISSING",
  "RUNTIME MEDIA RESOLVED",
  "crop/focus/color/emotional-fit/content QA: NOT_RUN",
  "Mac DaVinci Actual: NOT_RUN",
]) {
  requireText(preview, token, `Real-media preview missing contract token: ${token}`);
}

for (const forbidden of [
  'openingPhotos',
  'hero-01',
  'productionReady: true',
  'Mac DaVinci Actual: PASS',
  'REAL MEDIA QA: PASS',
]) {
  if (preview.includes(forbidden)) errors.push(`Real-media preview contains unsafe fallback/promotion token: ${forbidden}`);
}

for (const token of [
  'id="ProfileV1RealMediaPreview"',
  'component={ProfileV1RealMediaPreview}',
  'durationInFrames={30 * video.fps}',
]) {
  requireText(rootFile, token, `ProfileV1Root missing real-media composition contract: ${token}`);
}

requireText(runtime, '"expectedCount": 17', 'Runtime manifest must retain 17 canonical slots');
requireText(runtime, '"resolvedCount": 0', 'Fresh clone runtime manifest must remain 0/17');

if (errors.length) {
  console.error(`Profile V1 real-media preview contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Profile V1 real-media preview contracts OK: canonical runtime media is rendered when resolved, missing slots stay explicit, image/video handling is extension-aware, and Human/Mac QA remains NOT_RUN.');
