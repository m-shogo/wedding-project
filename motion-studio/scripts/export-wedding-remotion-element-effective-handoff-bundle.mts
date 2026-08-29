import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const gateArtifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-production-gate.json');
const outputPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-effective-handoff-bundle.json');
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

if (!existsSync(gateArtifactPath)) {
  throw new Error('REMOTION_ELEMENT_GATE_ARTIFACT_REQUIRED_BEFORE_EFFECTIVE_HANDOFF_BUNDLE');
}

const rawGate = readFileSync(gateArtifactPath, 'utf8');
const gate = JSON.parse(rawGate);
if (gate.schemaVersion !== 'wedding-remotion-element-identity-production-gate-artifact/v1') {
  throw new Error('REMOTION_ELEMENT_GATE_ARTIFACT_SCHEMA_MISMATCH');
}
if (gate.authority !== 'SHA_BOUND_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT') {
  throw new Error('REMOTION_ELEMENT_GATE_ARTIFACT_AUTHORITY_MISMATCH');
}
if (!/^[a-f0-9]{64}$/.test(gate.artifactSha256 ?? '')) {
  throw new Error('REMOTION_ELEMENT_GATE_ARTIFACT_SHA_MISSING');
}

const projects = (gate.projects ?? []).map((project: any) => ({
  movieId: project.movieId,
  adoptedCandidateIds: [...(project.adoptedCandidateIds ?? [])],
  identityRequired: Boolean(project.identityRequired),
  gateState: project.gateState,
  palmier: {
    currentAllowed: Boolean(project.effectivePalmierCurrentAllowed),
    gateArtifactSha256: gate.artifactSha256,
  },
  davinci: {
    handoffCurrentAllowed: Boolean(project.effectiveDavinciCurrentAllowed),
    recoveryCurrentAllowed: Boolean(project.effectiveDavinciRecoveryCurrentAllowed),
    gateArtifactSha256: gate.artifactSha256,
  },
  blockerCodes: [...(project.blockerCodes ?? [])],
}));

const stablePayload = {
  schemaVersion: 'wedding-remotion-element-effective-handoff-bundle/v1',
  authority: 'SHA_BOUND_REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE',
  sourceGateArtifactPath: 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-production-gate.json',
  sourceGateArtifactSha256: gate.artifactSha256,
  sourceGateFileSha256: sha256(rawGate),
  projects,
  productionGateBlocked: Boolean(gate.productionGateBlocked),
  macRemotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionDependencyPromotedByBundleExport: false,
  guardrails: [
    'BUNDLE_EXPORTED != PALLMIER_CURRENT_VERIFIED'.replace('PALLMIER', 'PALMIER'),
    'SOURCE_GATE_ARTIFACT_STALE => BUNDLE_STALE',
    'BUNDLE_STALE => EFFECTIVE_PALMIER_CURRENT_FALSE',
    'BUNDLE_STALE => EFFECTIVE_DAVINCI_HANDOFF_CURRENT_FALSE',
    'BUNDLE_STALE => EFFECTIVE_DAVINCI_RECOVERY_CURRENT_FALSE',
    'BUNDLE_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED',
    'BUNDLE_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED',
  ],
};
const bundle = {...stablePayload, bundleSha256: sha256(JSON.stringify(stablePayload))};
mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(bundle, null, 2)}\n`);
console.log(`wrote=${outputPath}`);
console.log(`bundleSha256=${bundle.bundleSha256}`);
console.log(`sourceGateArtifactSha256=${bundle.sourceGateArtifactSha256}`);
console.log(`productionGateBlocked=${bundle.productionGateBlocked ? 'YES' : 'NO'}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
