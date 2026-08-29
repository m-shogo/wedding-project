import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'scripts/opening-v1-production-status.mts'), 'utf8');
const errors: string[] = [];

for (const token of [
  "const audioReviewPath = join(root, 'out/qa/opening-v1-audio-listening-review.json');",
  "run('scripts/opening-v1-audio-listening-review.mts', ['--strict'])",
  "audioListeningReview: withStableBlockerCodes(audioListeningReview)",
  "humanAudioListeningApproved: audioListeningReady",
  "overallState = 'AUDIO_LISTENING_REVIEW_INIT_REQUIRED'",
  "overallState = 'HUMAN_AUDIO_LISTENING_REVIEW_REQUIRED_OR_STALE'",
  "'BGM_RIGHTS_CLEARED != HUMAN_AUDIO_LISTENING_PASS'",
  "'HUMAN_PREVIEW_REVIEW_PASS != HUMAN_AUDIO_LISTENING_PASS'",
  "'PREVIEW_OR_BGM_SHA_CHANGED => HUMAN_AUDIO_LISTENING_REVIEW_STALE'",
  "'HUMAN_AUDIO_LISTENING_PASS != MAC_DAVINCI_ACTUAL_VERIFIED'",
]) {
  if (!source.includes(token)) errors.push(`canonical Opening production status missing audio gate token: ${token}`);
}

const previewReviewIndex = source.indexOf('const previewReview: Stage');
const audioReviewIndex = source.indexOf('const audioListeningReview: Stage');
const finalRenderIndex = source.indexOf('const finalRender: Stage');
if (previewReviewIndex < 0 || audioReviewIndex < 0 || finalRenderIndex < 0 || !(previewReviewIndex < audioReviewIndex && audioReviewIndex < finalRenderIndex)) {
  errors.push('canonical Opening production order must be preview Human QA -> Human audio listening QA -> final render');
}

if (!source.includes("const finalRender: Stage = !audioListeningReady")) {
  errors.push('final render stage must fail closed directly on Human audio listening readiness');
}
if (source.includes("productionReady: audioListeningReady")) {
  errors.push('Human audio listening PASS must never promote productionReady');
}

if (errors.length > 0) {
  console.error(`Opening audio production-status contract FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Opening audio production-status contract OK: canonical status orders visual preview QA -> SHA-bound Human audio listening QA -> final render, without promoting GUI Actual or productionReady.');
