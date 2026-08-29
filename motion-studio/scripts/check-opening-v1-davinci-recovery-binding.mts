import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const evidence = readFileSync(join(root, 'scripts/opening-v1-davinci-finishing-evidence.mts'), 'utf8');
const errors: string[] = [];
const need = (token: string) => { if (!evidence.includes(token)) errors.push(`missing ${token}`); };

for (const token of [
  "const recoveryPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json');",
  "schemaVersion: 'wedding-davinci-production-recovery-export/v1'",
  "authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY'",
  'productionRecovery: RecoveryBinding;',
  "DAVINCI_FINISHING_RECOVERY_SIDECAR_MISSING",
  "DAVINCI_FINISHING_RECOVERY_SIDECAR_INVALID_JSON",
  "DAVINCI_FINISHING_RECOVERY_SIDECAR_CONTRACT",
  "DAVINCI_FINISHING_RECOVERY_BUNDLE_STALE",
  "DAVINCI_FINISHING_RECOVERY_RENDER_STALE",
  "DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_SHA_STALE",
  "DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_FINGERPRINT_STALE",
  "DAVINCI_FINISHING_RECOVERY_TARGET_STALE",
  "DAVINCI_FINISHING_RECOVERY_MUST_PRECEDE_ACTUAL",
  "DAVINCI_FINISHING_RECOVERY_EVIDENCE_PATH_STALE",
  'sha256: recoverySha256',
  'sourceRenderSha256: recovery.sourceBundle.finalRenderSha256',
  'cropReviewEvidenceSha256: recovery.sourceBundle.cropReviewEvidenceSha256',
  'cropReviewBindingFingerprintSha256: recovery.sourceBundle.cropReviewBindingFingerprintSha256',
  "STALE_DAVINCI_FINISHING_RECOVERY_PATH",
  "STALE_DAVINCI_FINISHING_RECOVERY_SIDECAR",
  "STALE_DAVINCI_FINISHING_RECOVERY_RENDER_SHA",
  "STALE_DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_SHA",
  "STALE_DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_FINGERPRINT",
  "recovery.recovery?.actual?.state !== 'NOT_RUN'",
  "recovery.recovery?.bridge?.macDaVinciActualVerified !== false",
  "recovery.recovery?.bridge?.finalDeliveryApproved !== false",
  "All Mac GUI Actual verdicts remain NOT_RUN.",
  'productionReady: false',
]) need(token);

if (evidence.includes("productionReady: true")) errors.push('Opening DaVinci evidence must not self-promote productionReady');
if (!evidence.includes("if (evidence.productionRecovery?.sha256 !== recoverySha256) fail('STALE_DAVINCI_FINISHING_RECOVERY_SIDECAR')")) errors.push('Opening DaVinci strict verification must invalidate when recovery sidecar bytes change');
if (!evidence.includes("if (evidence.productionRecovery?.cropReviewBindingFingerprintSha256 !== recovery.sourceBundle.cropReviewBindingFingerprintSha256) fail('STALE_DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_FINGERPRINT')")) errors.push('Opening DaVinci strict verification must bind current crop-review fingerprint');

if (errors.length) {
  console.error(`Opening DaVinci recovery binding contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Opening DaVinci recovery binding contracts OK: Actual evidence is initialized only from the current crop-bound recovery sidecar and goes stale when recovery/render/crop evidence SHA or crop fingerprint changes; GUI Actual and production readiness remain fail-closed.');
