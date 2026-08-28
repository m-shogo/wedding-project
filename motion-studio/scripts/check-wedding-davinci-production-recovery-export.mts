import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildWeddingDavinciProductionRecovery} from '../src/data/weddingDavinciProductionRecovery.ts';
import {assertProductionRecoveryActionTargets} from '../src/data/productionRecoveryActionContract.ts';
import {weddingProductionRecoverySchema} from '../src/data/resolveHandoff.schema.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const exporter = readFileSync(join(root, 'scripts/export-wedding-davinci-production-recovery.mts'), 'utf8');
const orchestrator = readFileSync(join(root, 'scripts/export-wedding-production-handoff.mts'), 'utf8');
const profileBundleExporter = readFileSync(join(root, 'scripts/export-profile-v1-production-bundle.mts'), 'utf8');
const openingHandoff = readFileSync(join(root, 'scripts/opening-v1-davinci-handoff-contract.mts'), 'utf8');
const profileHandoff = readFileSync(join(root, 'scripts/profile-v1-davinci-handoff-contract.mts'), 'utf8');

function expectTargetContractFailure(label: string, actions: Parameters<typeof assertProductionRecoveryActionTargets>[0]) {
  let failed = false;
  try {
    assertProductionRecoveryActionTargets(actions, label);
  } catch {
    failed = true;
  }
  if (!failed) throw new Error(`${label}: invalid recovery action target contract was accepted`);
}

assertProductionRecoveryActionTargets([
  {id: 'valid-route', kind: 'ROUTE', label: 'route', purpose: 'route', route: '/movie-coach/motion-library'},
  {id: 'valid-command', kind: 'COMMAND', label: 'command', purpose: 'command', command: 'pnpm status'},
  {id: 'valid-human', kind: 'HUMAN', label: 'human', purpose: 'human'},
], 'valid synthetic recovery actions');
expectTargetContractFailure('route-without-target', [
  {id: 'invalid-route', kind: 'ROUTE', label: 'route', purpose: 'route'},
]);
expectTargetContractFailure('command-without-target', [
  {id: 'invalid-command', kind: 'COMMAND', label: 'command', purpose: 'command'},
]);
expectTargetContractFailure('human-with-executable-target', [
  {id: 'invalid-human', kind: 'HUMAN', label: 'human', purpose: 'human', command: 'pnpm unsafe'},
]);
expectTargetContractFailure('route-with-command-target', [
  {id: 'ambiguous-route', kind: 'ROUTE', label: 'route', purpose: 'route', route: '/movie-coach/motion-library', command: 'pnpm ambiguous'},
]);

for (const movieId of ['opening', 'profile'] as const) {
  const recovery = buildWeddingDavinciProductionRecovery(movieId);
  const parsed = weddingProductionRecoverySchema.parse(recovery);
  assertProductionRecoveryActionTargets(parsed.blockerActions, `${movieId} parsed recovery`);
  if (parsed.movieId !== movieId) throw new Error(`${movieId}: movie id drift`);
  if (parsed.productionReady) throw new Error(`${movieId}: recovery export must not claim production ready`);
  if (parsed.actual.state !== 'NOT_RUN') throw new Error(`${movieId}: Mac DaVinci Actual must start NOT_RUN`);
  if (parsed.bridge.macDaVinciActualVerified) throw new Error(`${movieId}: export must not verify Mac Actual`);
  if (parsed.bridge.finalDeliveryApproved) throw new Error(`${movieId}: export must not approve final delivery`);
  if (parsed.blockerCodes.join(',') !== 'MAC_DAVINCI_ACTUAL_NOT_VERIFIED') {
    throw new Error(`${movieId}: post-bundle blocker must be Mac Actual`);
  }
  if (!parsed.guardrails.includes('RECOVERY_ACTION_KIND_REQUIRES_MATCHING_TARGET')) {
    throw new Error(`${movieId}: recovery action target guardrail missing`);
  }
  for (const command of ['init', 'status', 'strict'] as const) {
    if (!parsed.actual.commands[command].includes(`${movieId}:davinci-finishing`)) {
      throw new Error(`${movieId}: ${command} command is not canonical`);
    }
  }
  if (!parsed.blockerActions.some((action) => action.kind === 'HUMAN')) {
    throw new Error(`${movieId}: Human Resolve GUI action missing`);
  }
}

for (const required of [
  "bundle.davinci?.productionReady !== false",
  "bundle.davinci?.macActualState !== 'NOT_RUN'",
  "recovery.artifactPath !== bundle.finalRender?.path",
  "bundle.finalRender.sha256 !== bundle.davinci?.expectedSha256",
  "cropReview: 'out/qa/opening-v1-crop-review-evidence.json'",
  "cropReview.schemaVersion !== 'opening-v1-crop-review-evidence/v1'",
  "cropReview.authority !== 'HUMAN_OPENING_CROP_REVIEW'",
  "cropReview.overall !== 'PASS'",
  "bundle.humanCropReview?.evidenceSha256 !== currentCropSha",
  "bundle.humanCropReview?.bindingFingerprintSha256 !== cropReview.bindingFingerprintSha256",
  "bundle.davinci?.expectedCropReviewEvidenceSha256 !== currentCropSha",
  "bundle.davinci?.expectedCropReviewBindingFingerprintSha256 !== cropReview.bindingFingerprintSha256",
  'cropReviewEvidencePath: openingCropBinding.path',
  'cropReviewEvidenceSha256: openingCropBinding.evidenceSha256',
  'cropReviewBindingFingerprintSha256: openingCropBinding.bindingFingerprintSha256',
  "realMediaReview: 'out/qa/profile-v1-real-media-review.json'",
  "review.schemaVersion !== 'profile-v1-real-media-review/v1'",
  "review.authority !== 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW'",
  "review.review?.overall !== 'PASS'",
  "review.macDaVinciActual !== 'NOT_RUN'",
  "bundle.realMediaHumanQa",
  "bound?.evidenceSha256 !== currentReviewSha",
  "bundle.palmier?.realMediaHumanQaBindingFingerprintSha256 !== bound.bindingFingerprintSha256",
  "bundle.davinci?.expectedRealMediaHumanQaEvidenceSha256 !== currentReviewSha",
  "bundle.davinci?.expectedRealMediaHumanQaBindingFingerprintSha256 !== bound.bindingFingerprintSha256",
  'realMediaHumanQaEvidencePath: profileRealMediaQaBinding.path',
  'realMediaHumanQaEvidenceSha256: profileRealMediaQaBinding.evidenceSha256',
  'realMediaHumanQaBindingFingerprintSha256: profileRealMediaQaBinding.bindingFingerprintSha256',
  'realMediaHumanQaPreviewSourceFingerprintSha256: profileRealMediaQaBinding.previewSourceFingerprintSha256',
  'realMediaHumanQaCanonicalPlanFingerprint: profileRealMediaQaBinding.canonicalPlanFingerprint',
  "FINAL_RENDER_BOUND_DAVINCI_RECOVERY",
  "Mac DaVinci Actual remains NOT_RUN; recovery export is not execution evidence.",
]) {
  if (!exporter.includes(required)) throw new Error(`exporter fail-close contract missing: ${required}`);
}

for (const required of [
  "realMediaReview.schemaVersion !== 'profile-v1-real-media-review/v1'",
  "realMediaReview.authority !== 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW'",
  "realMediaReview.review?.overall !== 'PASS'",
  "realMediaReview.macDaVinciActual !== 'NOT_RUN'",
  'realMediaReviewBindingFingerprintSha256',
  'realMediaHumanQa: realMediaHumanQaBinding',
  'realMediaReviewBindingFingerprintSha256,',
  'realMediaHumanQaBindingFingerprintSha256: realMediaReviewBindingFingerprintSha256',
  'expectedRealMediaHumanQaEvidenceSha256: realMediaReviewEvidenceSha256',
  'expectedRealMediaHumanQaBindingFingerprintSha256: realMediaReviewBindingFingerprintSha256',
  'PROFILE_REAL_MEDIA_HUMAN_QA_CHANGED => REGENERATE_PRODUCTION_HANDOFF',
  'PROFILE_REAL_MEDIA_HUMAN_QA_BINDING_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
]) {
  if (!profileBundleExporter.includes(required)) throw new Error(`profile bundle Human QA binding missing: ${required}`);
}

for (const required of [
  "productionExporter: 'scripts/export-opening-v1-production-bundle.mts'",
  "productionExporter: 'scripts/export-profile-v1-production-bundle.mts'",
  "const recovery = run('scripts/export-wedding-davinci-production-recovery.mts'",
  'production bundle export failed; DaVinci recovery was not exported.',
  'recovery sidecar export failed.',
  'Mac DaVinci Actual remains NOT_RUN; handoff export does not execute Resolve GUI work.',
]) {
  if (!orchestrator.includes(required)) throw new Error(`handoff orchestrator contract missing: ${required}`);
}
const bundleIndex = orchestrator.indexOf('const bundle = run(config.productionExporter)');
const recoveryIndex = orchestrator.indexOf("const recovery = run('scripts/export-wedding-davinci-production-recovery.mts'");
if (bundleIndex < 0 || recoveryIndex < 0 || bundleIndex >= recoveryIndex) {
  throw new Error('handoff orchestrator must export the production bundle before DaVinci recovery');
}

for (const [movieId, handoff] of [['opening', openingHandoff], ['profile', profileHandoff]] as const) {
  for (const required of [
    "blockerCodes: Array.isArray(recoverySidecar.recovery?.blockerCodes)",
    "blockerActions: Array.isArray(recoverySidecar.recovery?.blockerActions)",
    "canonicalRecovery: Array.isArray(recoverySidecar.recovery?.canonicalRecovery)",
    "guardrails: Array.isArray(recoverySidecar.recovery?.guardrails)",
    'DAVINCI_RECOVERY_ACTION_EXPORTED != RECOVERY_EXECUTED',
  ]) {
    if (!handoff.includes(required)) throw new Error(`${movieId}: DaVinci handoff recovery surface missing: ${required}`);
  }
  if (!handoff.includes('MAC_DAVINCI_ACTUAL_NOT_VERIFIED')) {
    throw new Error(`${movieId}: DaVinci handoff must validate the stable Mac Actual blocker code`);
  }
  if (!handoff.includes("action?.kind === 'HUMAN'")) {
    throw new Error(`${movieId}: DaVinci handoff must fail closed when Human recovery action is missing`);
  }
}

for (const required of [
  "recoverySidecar.sourceBundle?.cropReviewEvidencePath !== rel(cropReviewPath)",
  "OPENING_DAVINCI_RECOVERY_CROP_REVIEW_PATH_STALE",
  "recoverySidecar.sourceBundle?.cropReviewEvidenceSha256 !== bundle?.humanCropReview?.evidenceSha256",
  "OPENING_DAVINCI_RECOVERY_CROP_REVIEW_SHA_STALE",
  "recoverySidecar.sourceBundle?.cropReviewBindingFingerprintSha256 !== bundle?.humanCropReview?.bindingFingerprintSha256",
  "OPENING_DAVINCI_RECOVERY_CROP_REVIEW_FINGERPRINT_STALE",
  'cropReviewEvidenceSha256: recoverySidecar?.sourceBundle?.cropReviewEvidenceSha256 ?? null',
  'cropReviewBindingFingerprintSha256: recoverySidecar?.sourceBundle?.cropReviewBindingFingerprintSha256 ?? null',
  'CROP_REVIEW_CHANGED => DAVINCI_RECOVERY_SIDECAR_STALE',
]) {
  if (!openingHandoff.includes(required)) throw new Error(`opening: crop-bound recovery revalidation missing: ${required}`);
}
if (profileHandoff.includes('OPENING_DAVINCI_RECOVERY_CROP_REVIEW_SHA_STALE')) {
  throw new Error('profile: Opening-specific crop recovery contract leaked into Profile handoff');
}

for (const required of [
  "PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_MISSING",
  "bundle.realMediaHumanQa?.evidenceSha256 !== currentRealMediaReviewSha256",
  "PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_SHA_STALE",
  "bundle.realMediaHumanQa?.previewSourceFingerprintSha256 !== currentRealMediaReview.previewSourceFingerprintSha256",
  "PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_PREVIEW_SOURCE_STALE",
  "recoverySidecar.sourceBundle?.realMediaHumanQaEvidenceSha256 !== bundle?.realMediaHumanQa?.evidenceSha256",
  "PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_SHA_STALE",
  "recoverySidecar.sourceBundle?.realMediaHumanQaBindingFingerprintSha256 !== bundle?.realMediaHumanQa?.bindingFingerprintSha256",
  "PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_FINGERPRINT_STALE",
  'realMediaHumanQaEvidenceSha256: recoverySidecar?.sourceBundle?.realMediaHumanQaEvidenceSha256 ?? null',
  'realMediaHumanQaBindingFingerprintSha256: recoverySidecar?.sourceBundle?.realMediaHumanQaBindingFingerprintSha256 ?? null',
  'PROFILE_REAL_MEDIA_HUMAN_QA_CHANGED => DAVINCI_RECOVERY_SIDECAR_STALE',
]) {
  if (!profileHandoff.includes(required)) throw new Error(`profile: Human-QA-bound recovery revalidation missing: ${required}`);
}
if (openingHandoff.includes('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_SHA_STALE')) {
  throw new Error('opening: Profile-specific real-media Human QA recovery contract leaked into Opening handoff');
}

console.log('Wedding DaVinci production recovery export + target-safe handoff contracts: PASS (Opening recovery is crop-evidence bound; Profile recovery is real-media Human-QA evidence SHA/fingerprint bound).');
