import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildWeddingDavinciProductionRecovery, type WeddingMovieId} from '../src/data/weddingDavinciProductionRecovery.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.split('=')[1];
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Usage: node --no-warnings scripts/export-wedding-davinci-production-recovery.mts --movie=opening|profile');
  process.exit(1);
}
const movieId = movieArg as WeddingMovieId;
const config = movieId === 'opening'
  ? {
      bundle: 'out/handoff/opening-v1/opening-v1-production-bundle.json',
      sidecar: 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json',
      schemaVersion: 'opening-v1-production-bundle/v1',
      cropReview: 'out/qa/opening-v1-crop-review-evidence.json',
      audioReview: 'out/qa/opening-v1-audio-listening-review.json',
      realMediaReview: null,
    }
  : {
      bundle: 'out/handoff/profile-v1/profile-v1-production-bundle.json',
      sidecar: 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json',
      schemaVersion: 'profile-v1-production-bundle/v1',
      cropReview: null,
      audioReview: null,
      realMediaReview: 'out/qa/profile-v1-real-media-review.json',
    };

const bundlePath = join(root, config.bundle);
const sidecarPath = join(root, config.sidecar);
const shaText = (text: string) => createHash('sha256').update(text).digest('hex');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');

if (!existsSync(bundlePath)) {
  console.error(`DaVinci production recovery export blocked: missing ${config.bundle}`);
  process.exit(1);
}
let bundle: any;
try {
  bundle = JSON.parse(readFileSync(bundlePath, 'utf8'));
} catch {
  console.error(`DaVinci production recovery export blocked: invalid JSON ${config.bundle}`);
  process.exit(1);
}
if (bundle.schemaVersion !== config.schemaVersion || bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') {
  console.error('DaVinci production recovery export blocked: production bundle contract mismatch');
  process.exit(1);
}
if (bundle.davinci?.productionReady !== false || bundle.davinci?.macActualState !== 'NOT_RUN') {
  console.error('DaVinci production recovery export blocked: source bundle must remain fail-closed before Mac Actual');
  process.exit(1);
}

let openingCropBinding: null | {path: string; evidenceSha256: string; bindingFingerprintSha256: string} = null;
let openingAudioBinding: null | {path: string; evidenceSha256: string; previewSha256: string; bgmSha256: string} = null;
if (movieId === 'opening') {
  const cropReviewPath = join(root, config.cropReview!);
  if (!existsSync(cropReviewPath)) {
    console.error('DaVinci production recovery export blocked: Opening crop review evidence missing');
    process.exit(1);
  }
  let cropReview: any;
  try {
    cropReview = JSON.parse(readFileSync(cropReviewPath, 'utf8'));
  } catch {
    console.error('DaVinci production recovery export blocked: Opening crop review evidence invalid JSON');
    process.exit(1);
  }
  const currentCropSha = shaFile(cropReviewPath);
  if (cropReview.schemaVersion !== 'opening-v1-crop-review-evidence/v1' || cropReview.authority !== 'HUMAN_OPENING_CROP_REVIEW' || cropReview.overall !== 'PASS') {
    console.error('DaVinci production recovery export blocked: Opening crop review contract is not current PASS evidence');
    process.exit(1);
  }
  if (!cropReview.bindingFingerprintSha256 || bundle.humanCropReview?.evidencePath !== config.cropReview || bundle.humanCropReview?.evidenceSha256 !== currentCropSha || bundle.humanCropReview?.bindingFingerprintSha256 !== cropReview.bindingFingerprintSha256) {
    console.error('DaVinci production recovery export blocked: Opening crop review bundle binding is stale');
    process.exit(1);
  }
  if (bundle.davinci?.expectedCropReviewEvidenceSha256 !== currentCropSha || bundle.davinci?.expectedCropReviewBindingFingerprintSha256 !== cropReview.bindingFingerprintSha256) {
    console.error('DaVinci production recovery export blocked: Opening DaVinci crop binding is stale');
    process.exit(1);
  }
  openingCropBinding = {
    path: config.cropReview,
    evidenceSha256: currentCropSha,
    bindingFingerprintSha256: cropReview.bindingFingerprintSha256,
  };

  const audioReviewPath = join(root, config.audioReview!);
  if (!existsSync(audioReviewPath)) {
    console.error('DaVinci production recovery export blocked: Opening audio listening Human QA evidence missing');
    process.exit(1);
  }
  let audioReview: any;
  try {
    audioReview = JSON.parse(readFileSync(audioReviewPath, 'utf8'));
  } catch {
    console.error('DaVinci production recovery export blocked: Opening audio listening Human QA evidence invalid JSON');
    process.exit(1);
  }
  const currentAudioSha = shaFile(audioReviewPath);
  if (
    audioReview.schemaVersion !== 'opening-v1-audio-listening-review/v1' ||
    audioReview.authority !== 'HUMAN_OPENING_AUDIO_LISTENING_REVIEW' ||
    audioReview.review?.overall !== 'PASS' ||
    !audioReview.review?.reviewer?.trim() ||
    audioReview.remotionStudioActual !== 'NOT_RUN' ||
    audioReview.macDaVinciActual !== 'NOT_RUN' ||
    audioReview.productionReady !== false
  ) {
    console.error('DaVinci production recovery export blocked: Opening audio listening Human QA contract is not current PASS evidence');
    process.exit(1);
  }
  if (
    bundle.humanAudioListeningReview?.evidencePath !== config.audioReview ||
    bundle.humanAudioListeningReview?.evidenceSha256 !== currentAudioSha ||
    bundle.humanAudioListeningReview?.previewSha256 !== audioReview.preview?.sha256 ||
    bundle.humanAudioListeningReview?.bgmSha256 !== audioReview.bgm?.sha256 ||
    bundle.humanAudioListeningReview?.overall !== 'PASS'
  ) {
    console.error('DaVinci production recovery export blocked: Opening audio listening bundle binding is stale');
    process.exit(1);
  }
  if (
    bundle.palmier?.audioListeningReviewEvidenceSha256 !== currentAudioSha ||
    bundle.palmier?.audioListeningPreviewSha256 !== audioReview.preview?.sha256 ||
    bundle.palmier?.audioListeningBgmSha256 !== audioReview.bgm?.sha256 ||
    bundle.davinci?.expectedAudioListeningReviewEvidenceSha256 !== currentAudioSha ||
    bundle.davinci?.expectedAudioListeningPreviewSha256 !== audioReview.preview?.sha256 ||
    bundle.davinci?.expectedAudioListeningBgmSha256 !== audioReview.bgm?.sha256
  ) {
    console.error('DaVinci production recovery export blocked: Opening Palmier/DaVinci audio listening binding is stale');
    process.exit(1);
  }
  openingAudioBinding = {
    path: config.audioReview,
    evidenceSha256: currentAudioSha,
    previewSha256: audioReview.preview.sha256,
    bgmSha256: audioReview.bgm.sha256,
  };
}

let profileRealMediaQaBinding: null | {
  path: string;
  evidenceSha256: string;
  bindingFingerprintSha256: string;
  previewSourceFingerprintSha256: string;
  canonicalPlanFingerprint: string;
} = null;
if (movieId === 'profile') {
  const reviewPath = join(root, config.realMediaReview!);
  if (!existsSync(reviewPath)) {
    console.error('DaVinci production recovery export blocked: Profile real-media Human QA evidence missing');
    process.exit(1);
  }
  let review: any;
  try {
    review = JSON.parse(readFileSync(reviewPath, 'utf8'));
  } catch {
    console.error('DaVinci production recovery export blocked: Profile real-media Human QA evidence invalid JSON');
    process.exit(1);
  }
  const currentReviewSha = shaFile(reviewPath);
  if (
    review.schemaVersion !== 'profile-v1-real-media-review/v1' ||
    review.authority !== 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW' ||
    review.review?.overall !== 'PASS' ||
    !review.review?.reviewer?.trim() ||
    review.macDaVinciActual !== 'NOT_RUN' ||
    review.productionReady !== false
  ) {
    console.error('DaVinci production recovery export blocked: Profile real-media Human QA contract is not current PASS evidence');
    process.exit(1);
  }
  const bound = bundle.realMediaHumanQa;
  if (
    bound?.evidencePath !== config.realMediaReview ||
    bound?.evidenceSha256 !== currentReviewSha ||
    !bound?.bindingFingerprintSha256 ||
    bound?.previewSourceFingerprintSha256 !== review.previewSourceFingerprintSha256 ||
    bound?.canonicalPlanFingerprint !== review.canonicalPlanFingerprint ||
    bound?.overall !== 'PASS'
  ) {
    console.error('DaVinci production recovery export blocked: Profile real-media Human QA bundle binding is stale');
    process.exit(1);
  }
  if (
    bundle.upstreamHumanEvidence?.realMediaReviewSha256 !== currentReviewSha ||
    bundle.upstreamHumanEvidence?.realMediaReviewBindingFingerprintSha256 !== bound.bindingFingerprintSha256 ||
    bundle.palmier?.realMediaHumanQaBindingFingerprintSha256 !== bound.bindingFingerprintSha256 ||
    bundle.davinci?.expectedRealMediaHumanQaEvidenceSha256 !== currentReviewSha ||
    bundle.davinci?.expectedRealMediaHumanQaBindingFingerprintSha256 !== bound.bindingFingerprintSha256
  ) {
    console.error('DaVinci production recovery export blocked: Profile Palmier/DaVinci Human QA binding is stale');
    process.exit(1);
  }
  profileRealMediaQaBinding = {
    path: config.realMediaReview,
    evidenceSha256: currentReviewSha,
    bindingFingerprintSha256: bound.bindingFingerprintSha256,
    previewSourceFingerprintSha256: review.previewSourceFingerprintSha256,
    canonicalPlanFingerprint: review.canonicalPlanFingerprint,
  };
}

const recovery = buildWeddingDavinciProductionRecovery(movieId);
if (recovery.artifactPath !== bundle.finalRender?.path || recovery.artifactPath !== bundle.davinci?.handoffAsset) {
  console.error('DaVinci production recovery export blocked: handoff artifact path mismatch');
  process.exit(1);
}
if (!bundle.finalRender?.sha256 || bundle.finalRender.sha256 !== bundle.davinci?.expectedSha256) {
  console.error('DaVinci production recovery export blocked: source render SHA binding mismatch');
  process.exit(1);
}

const payload = {
  schemaVersion: 'wedding-davinci-production-recovery-export/v1',
  authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY',
  generatedAt: new Date().toISOString(),
  sourceBundle: {
    path: config.bundle,
    schemaVersion: bundle.schemaVersion,
    finalRenderPath: bundle.finalRender.path,
    finalRenderSha256: bundle.finalRender.sha256,
    ...(openingCropBinding ? {
      cropReviewEvidencePath: openingCropBinding.path,
      cropReviewEvidenceSha256: openingCropBinding.evidenceSha256,
      cropReviewBindingFingerprintSha256: openingCropBinding.bindingFingerprintSha256,
    } : {}),
    ...(openingAudioBinding ? {
      audioListeningReviewEvidencePath: openingAudioBinding.path,
      audioListeningReviewEvidenceSha256: openingAudioBinding.evidenceSha256,
      audioListeningPreviewSha256: openingAudioBinding.previewSha256,
      audioListeningBgmSha256: openingAudioBinding.bgmSha256,
    } : {}),
    ...(profileRealMediaQaBinding ? {
      realMediaHumanQaEvidencePath: profileRealMediaQaBinding.path,
      realMediaHumanQaEvidenceSha256: profileRealMediaQaBinding.evidenceSha256,
      realMediaHumanQaBindingFingerprintSha256: profileRealMediaQaBinding.bindingFingerprintSha256,
      realMediaHumanQaPreviewSourceFingerprintSha256: profileRealMediaQaBinding.previewSourceFingerprintSha256,
      realMediaHumanQaCanonicalPlanFingerprint: profileRealMediaQaBinding.canonicalPlanFingerprint,
    } : {}),
  },
  recovery,
};
const text = `${JSON.stringify(payload, null, 2)}\n`;
mkdirSync(dirname(sidecarPath), {recursive: true});
writeFileSync(sidecarPath, text);
console.log(`DaVinci production recovery exported: ${rel(sidecarPath)}`);
console.log(`recoverySha256=${shaText(text)}`);
console.log(`finalRenderSha256=${bundle.finalRender.sha256}`);
if (openingCropBinding) {
  console.log(`cropReviewEvidenceSha256=${openingCropBinding.evidenceSha256}`);
  console.log(`cropReviewBindingFingerprintSha256=${openingCropBinding.bindingFingerprintSha256}`);
}
if (openingAudioBinding) {
  console.log(`audioListeningReviewEvidenceSha256=${openingAudioBinding.evidenceSha256}`);
  console.log(`audioListeningPreviewSha256=${openingAudioBinding.previewSha256}`);
  console.log(`audioListeningBgmSha256=${openingAudioBinding.bgmSha256}`);
}
if (profileRealMediaQaBinding) {
  console.log(`realMediaHumanQaEvidenceSha256=${profileRealMediaQaBinding.evidenceSha256}`);
  console.log(`realMediaHumanQaBindingFingerprintSha256=${profileRealMediaQaBinding.bindingFingerprintSha256}`);
}
console.log('Mac DaVinci Actual remains NOT_RUN; recovery export is not execution evidence.');
