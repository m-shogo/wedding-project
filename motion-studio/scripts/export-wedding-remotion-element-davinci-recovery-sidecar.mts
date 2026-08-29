import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const bundlePath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-effective-handoff-bundle.json');
const outputPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-davinci-recovery-sidecar.json');
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

if (!existsSync(bundlePath)) {
  throw new Error('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_REQUIRED_BEFORE_DAVINCI_RECOVERY_SIDECAR');
}

const rawBundle = readFileSync(bundlePath, 'utf8');
const bundle = JSON.parse(rawBundle);
if (bundle.schemaVersion !== 'wedding-remotion-element-effective-handoff-bundle/v1') {
  throw new Error('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_SCHEMA_MISMATCH');
}
if (bundle.authority !== 'SHA_BOUND_REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE') {
  throw new Error('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_AUTHORITY_MISMATCH');
}
if (!/^[a-f0-9]{64}$/.test(bundle.bundleSha256 ?? '')) {
  throw new Error('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_SHA_MISSING');
}

const projects = (bundle.projects ?? []).map((project: any) => ({
  movieId: project.movieId,
  adoptedCandidateIds: [...(project.adoptedCandidateIds ?? [])],
  gateState: project.gateState,
  recoveryCurrentAllowed: Boolean(project.davinci?.recoveryCurrentAllowed),
  sourceEffectiveHandoffBundleSha256: bundle.bundleSha256,
  sourceGateArtifactSha256: bundle.sourceGateArtifactSha256,
  blockerCodes: [...(project.blockerCodes ?? [])],
  recovery: project.davinci?.recoveryCurrentAllowed
    ? []
    : [
        'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-handoff-identities.mts',
        'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-handoff-identities.mts',
        'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate.mts',
        'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-production-gate-artifact.mts',
        'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate-artifact.mts',
        'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-effective-handoff-bundle.mts',
        'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-effective-handoff-bundle.mts',
        'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-davinci-recovery-sidecar.mts',
      ],
}));

const stablePayload = {
  schemaVersion: 'wedding-remotion-element-davinci-recovery-sidecar/v1',
  authority: 'SHA_BOUND_REMOTION_ELEMENT_DAVINCI_RECOVERY_SIDECAR',
  sourceEffectiveHandoffBundlePath: 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-effective-handoff-bundle.json',
  sourceEffectiveHandoffBundleSha256: bundle.bundleSha256,
  sourceEffectiveHandoffBundleFileSha256: sha256(rawBundle),
  sourceGateArtifactSha256: bundle.sourceGateArtifactSha256,
  projects,
  macRemotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionDependencyPromotedBySidecarExport: false,
  guardrails: [
    'DAVINCI_RECOVERY_SIDECAR_EXPORTED != DAVINCI_RECOVERY_EXECUTED',
    'SOURCE_EFFECTIVE_HANDOFF_BUNDLE_STALE => DAVINCI_RECOVERY_SIDECAR_STALE',
    'SOURCE_GATE_ARTIFACT_STALE => DAVINCI_RECOVERY_SIDECAR_STALE',
    'DAVINCI_RECOVERY_SIDECAR_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED',
    'DAVINCI_RECOVERY_SIDECAR_CURRENT != FINAL_DELIVERY_APPROVED',
  ],
};

const sidecar = {...stablePayload, sidecarSha256: sha256(JSON.stringify(stablePayload))};
mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(sidecar, null, 2)}\n`);
console.log(`wrote=${outputPath}`);
console.log(`sidecarSha256=${sidecar.sidecarSha256}`);
console.log(`sourceEffectiveHandoffBundleSha256=${sidecar.sourceEffectiveHandoffBundleSha256}`);
console.log(`sourceGateArtifactSha256=${sidecar.sourceGateArtifactSha256}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
