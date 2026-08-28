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
    }
  : {
      bundle: 'out/handoff/profile-v1/profile-v1-production-bundle.json',
      sidecar: 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json',
      schemaVersion: 'profile-v1-production-bundle/v1',
      cropReview: null,
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
console.log('Mac DaVinci Actual remains NOT_RUN; recovery export is not execution evidence.');
