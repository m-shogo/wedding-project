import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const handoff = read('src/data/openingProductionStatusHandoff.ts');
const card = read('src/components/OpeningProductionStatusHandoffCard.tsx');
const errors = [];
const need = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'cropReview: {',
  'openingProductionGate.photos.cropQa.humanCropQaState',
  'humanCropQaReviewedCount',
  'humanCropQaRequiredCount',
  'humanCropQaBlockerCodes',
  'evidencePath: openingProductionGate.photos.cropQa.evidencePath',
  'macStudioActualState: openingProductionGate.photos.cropQa.macStudioActualState',
  'macDaVinciActualState: openingProductionGate.photos.cropQa.macDaVinciActualState',
  'productionReady: openingProductionGate.photos.cropQa.productionReady',
  'cropQaRequired: slot.cropQaRequired',
  'effectivePresentation: slot.effectivePresentation',
  'PHOTO_SHA_OR_EFFECTIVE_FOCUS_OR_FIT_CHANGED => HUMAN_CROP_REVIEW_STALE',
  'HUMAN_CROP_REVIEW_PASS != HUMAN_PREVIEW_REVIEW_PASS',
]) need(handoff, token, `Opening handoff missing crop-review UI data contract: ${token}`);

for (const token of [
  'cropReview: "Human crop QA"',
  'const cropReview = media.cropReview',
  'const recovery = davinci.productionRecovery',
  'crop={cropReview.state}',
  'Human crop: {production.readiness.humanCropReviewApproved ? "PASS" : cropReview.state}',
  'HUMAN CROP REVIEW / SCENE &gt; ASSET &gt; DEFAULT',
  'reviewed: {cropReview.reviewedCount}/{cropReview.requiredCount}',
  '{cropReview.evidencePath}',
  'Mac Studio Actual: <span className="font-semibold">{cropReview.macStudioActualState}</span>',
  'DaVinci Actual: <span className="font-semibold">{cropReview.macDaVinciActualState}</span>',
  'Crop review binding: <span className="font-semibold">{sourceRevalidation.cropReview.state}</span>',
  '{davinci.requiredHumanCropReview.path}',
  '{davinci.requiredHumanCropReview.evidenceSha256 ?? "PENDING_CROP_REVIEW"}',
  '{davinci.requiredHumanCropReview.bindingFingerprintSha256 ?? "PENDING_CROP_REVIEW"}',
  'DaVinci recovery sidecar',
  '{recovery.path}',
  '{recovery.actualState}',
  '{recovery.sourceRenderSha256 ?? "PENDING_RECOVERY_EXPORT"}',
  '{recovery.cropReviewEvidenceSha256 ?? "PENDING_RECOVERY_EXPORT"}',
  '{recovery.cropReviewBindingFingerprintSha256 ?? "PENDING_RECOVERY_EXPORT"}',
  'CROP_REVIEW_CHANGED =&gt; DAVINCI_RECOVERY_SIDECAR_STALE',
  'DAVINCI_RECOVERY_SIDECAR_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
  'HUMAN_CROP_REVIEW_PASS != HUMAN_PREVIEW_REVIEW_PASS',
]) need(card, token, `Opening Motion Zukan crop/recovery surface missing: ${token}`);

if (card.includes('crop evidence productionReady: YES') || handoff.includes('productionReady: true')) {
  errors.push('Crop-review surface must not fabricate production readiness');
}
if (!card.includes('NOT_RUN')) errors.push('Opening crop/recovery surface must preserve explicit NOT_RUN vocabulary');
if (card.includes('DaVinci recovery sidecar: PASS') || card.includes('recovery.actualState === "PASS"')) {
  errors.push('Recovery metadata must not be promoted to DaVinci Actual evidence');
}

if (errors.length > 0) {
  console.error(`Opening crop review UI contract FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Opening crop review UI contract OK: Motion Zukan exposes Human crop authority plus crop-bound DaVinci recovery SHA/fingerprint while Actual and production readiness remain separate.');
