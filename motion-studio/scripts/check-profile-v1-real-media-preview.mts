import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const preview = readFileSync(join(root, 'src/compositions/profile/ProfileV1RealMediaPreview.tsx'), 'utf8');
const audioPreview = readFileSync(join(root, 'src/compositions/profile/ProfileV1RealMediaAudioPreview.tsx'), 'utf8');
const rootFile = readFileSync(join(root, 'src/ProfileV1Root.tsx'), 'utf8');
const renderScript = readFileSync(join(root, 'scripts/render-profile-v1-real-media-preview.mts'), 'utf8');
const mediaGate = readFileSync(join(root, 'scripts/profile-v1-media-input-gate.mts'), 'utf8');
const runtime = readFileSync(join(root, 'src/data/profileV1RuntimeMedia.generated.ts'), 'utf8');
const framing = readFileSync(join(root, 'src/data/profileV1FramingVerdicts.generated.ts'), 'utf8');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "@remotion/google-fonts/NotoSansJP",
  "profileJapaneseFontFamily",
  "ignoreTooManyRequestsWarning: true",
  "profileV1RuntimeMedia",
  "profileV1Chapters",
  "getProfileV1ApprovedFraming",
  "resolveMediaPresentation",
  "staticFile(slot.staticFilePath)",
  "<Img src={src}",
  "<OffthreadVideo src={src} muted",
  "videoExtensions = new Set(['.mp4', '.mov', '.m4v', '.webm'])",
  "slot.resolved",
  "REAL MEDIA MISSING",
  "RUNTIME MEDIA RESOLVED",
  "FRAMING: {approvedFraming ? 'HUMAN APPROVED' : 'DEFAULT / UNAPPROVED'}",
  "crop/focus framing: {approvedFraming ?",
  "color/emotional-fit/content QA: separate Human gate",
  "Mac DaVinci Actual: NOT_RUN",
]) {
  requireText(preview, token, `Real-media preview missing contract token: ${token}`);
}

for (const token of [
  "<ProfileV1RealMediaPreview />",
  "<Audio src={staticFile('audio/profile/bgm-main.mp3')} volume={0.64}",
]) {
  requireText(audioPreview, token, `Real-media audio preview missing contract token: ${token}`);
}

for (const token of [
  'assertProfileV1MediaInputsReady(studioRoot)',
  "allowMissingMediaSmoke ? 'ProfileV1RealMediaPreview' : 'ProfileV1RealMediaAudioPreview'",
  'RIGHTS-CLEARED BGM INCLUDED',
  'SMOKE ONLY / SILENT',
]) {
  requireText(renderScript, token, `Real-media render path missing audio/guardrail token: ${token}`);
}
for (const token of [
  'finalRenderEligible',
  'report.audio?.ready === true',
]) {
  requireText(mediaGate, token, `Profile media gate must require canonical BGM readiness before audio preview: ${token}`);
}

for (const forbidden of [
  "fontFamily: 'Arial, Helvetica, sans-serif'",
  'openingPhotos',
  'hero-01',
  'productionReady: true',
  'Mac DaVinci Actual: PASS',
  'REAL MEDIA QA: PASS',
]) {
  if (preview.includes(forbidden) || audioPreview.includes(forbidden)) errors.push(`Real-media preview contains unsafe fallback/promotion token: ${forbidden}`);
}

for (const token of [
  "schemaVersion: 'profile-v1-framing-verdicts/v1'",
  "authority: 'GENERATED_FROM_HUMAN_REAL_MEDIA_REVIEW'",
  'sourceEvidence: null',
  'approvedCount: 0',
]) {
  requireText(framing, token, `Generated framing authority missing fail-closed token: ${token}`);
}

for (const token of [
  'id="ProfileV1RealMediaPreview"',
  'component={ProfileV1RealMediaPreview}',
  'id="ProfileV1RealMediaAudioPreview"',
  'component={ProfileV1RealMediaAudioPreview}',
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

console.log('Profile V1 real-media preview contracts OK: canonical media + Human-approved framing feed the review surface, production review video includes BGM only behind the current media/BGM-rights gate, smoke remains silent, and Mac QA remains NOT_RUN.');
