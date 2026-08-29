import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const bundlePath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-effective-handoff-bundle.json');
const sidecarPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-davinci-recovery-sidecar.json');
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

const blockers: string[] = [];
let rawBundle = '';
let bundle: any = null;
let sidecar: any = null;

if (!existsSync(bundlePath)) blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_MISSING');
else {
  try {
    rawBundle = readFileSync(bundlePath, 'utf8');
    bundle = JSON.parse(rawBundle);
  } catch {
    blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_INVALID');
  }
}

if (!existsSync(sidecarPath)) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_MISSING');
else {
  try { sidecar = JSON.parse(readFileSync(sidecarPath, 'utf8')); }
  catch { blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_INVALID'); }
}

if (sidecar) {
  if (sidecar.schemaVersion !== 'wedding-remotion-element-davinci-recovery-sidecar/v1') blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_SCHEMA_MISMATCH');
  if (sidecar.authority !== 'SHA_BOUND_REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR') blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_AUTHORITY_MISMATCH');
  const stablePayload = {...sidecar};
  delete stablePayload.sidecarSha256;
  if (sidecar.sidecarSha256 !== sha256(JSON.stringify(stablePayload))) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_SELF_SHA_INVALID');
}

if (bundle && sidecar) {
  if (sidecar.sourceEffectiveHandoffBundleSha256 !== bundle.bundleSha256) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_BUNDLE_SHA_STALE');
  if (sidecar.sourceEffectiveHandoffBundleFileSha256 !== sha256(rawBundle)) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_BUNDLE_FILE_SHA_STALE');
  if (sidecar.sourceGateArtifactSha256 !== bundle.sourceGateArtifactSha256) blockers.push('REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_GATE_SHA_STALE');

  for (const bundleProject of bundle.projects ?? []) {
    const project = sidecar.projects?.find((item: any) => item.movieId === bundleProject.movieId);
    if (!project) {
      blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_PROJECT_MISSING:${bundleProject.movieId}`);
      continue;
    }
    if (JSON.stringify(project.adoptedCandidateIds ?? []) !== JSON.stringify(bundleProject.adoptedCandidateIds ?? [])) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_ADOPTION_STALE:${bundleProject.movieId}`);
    if (project.gateState !== bundleProject.gateState) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_GATE_STATE_STALE:${bundleProject.movieId}`);
    if (Boolean(project.recoveryCurrentAllowed) !== Boolean(bundleProject.davinci?.recoveryCurrentAllowed)) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_RECOVERY_STATE_STALE:${bundleProject.movieId}`);
    if (project.sourceEffectiveHandoffBundleSha256 !== bundle.bundleSha256) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_PROJECT_BUNDLE_SHA_STALE:${bundleProject.movieId}`);
    if (project.sourceGateArtifactSha256 !== bundle.sourceGateArtifactSha256) blockers.push(`REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_PROJECT_GATE_SHA_STALE:${bundleProject.movieId}`);
  }
}

const blockerCodes = [...new Set(blockers)].sort();
const current = blockerCodes.length === 0;
console.log(JSON.stringify({
  schemaVersion: 'wedding-remotion-element-davinci-recovery-sidecar-currentness/v1',
  authority: 'SHA_BOUND_REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR_CURRENTNESS',
  current,
  effectiveDavinciRecoveryCurrentAllowed: current,
  blockerCodes,
  macRemotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  finalDeliveryApprovedByThisCheck: false,
  productionDependencyPromotedByThisCheck: false,
  recovery: current ? [] : [
    'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-handoff-identities.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-handoff-identities.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate.mts',
    'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-production-gate-artifact.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate-artifact.mts',
    'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-effective-handoff-bundle.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-effective-handoff-bundle.mts',
    'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-davinci-recovery-sidecar.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-davinci-recovery-sidecar.mts',
  ],
}, null, 2));
console.log(`davinciRecoverySidecarCurrent=${current ? 'YES' : 'NO'}`);
console.log(`effectiveDavinciRecoveryCurrentAllowed=${current ? 'YES' : 'NO'}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
for (const blocker of blockerCodes) console.error(`BLOCK / ${blocker}`);
if (!current) process.exit(1);
