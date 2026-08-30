import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  buildWeddingPalmierProjectMotionBindingArtifact,
  buildWeddingProjectMotionAssemblyBinding,
  buildWeddingProjectMotionProductionProvenance,
} from './wedding-project-motion-production-provenance.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
type MovieId = 'opening' | 'profile';
const readJson = (path: string) => JSON.parse(readFileSync(path, 'utf8')) as any;
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

function stableProvenanceShape(value: any) {
  if (!value) return null;
  return {
    schemaVersion: value.schemaVersion, authority: value.authority, projectId: value.projectId,
    sourceSha256: value.sourceExport?.sha256, receiptSha256: value.receiptArtifact?.sha256,
    currentnessSha256: value.currentnessArtifact?.sha256, currentnessState: value.currentnessArtifact?.state,
    palmierCurrent: value.assemblyGate?.palmierCurrent, davinciHandoffCurrent: value.assemblyGate?.davinciHandoffCurrent,
    macDaVinciGuiActual: value.assemblyGate?.macDaVinciGuiActual,
    remotionStudioGuiActual: value.evidenceBoundary?.remotionStudioGuiActual,
    evidenceMacDaVinciGuiActual: value.evidenceBoundary?.macDaVinciGuiActual,
    productionReady: value.evidenceBoundary?.productionReady,
  };
}

function stableAssemblyBindingShape(value: any) {
  if (!value) return null;
  return {
    schemaVersion: value.schemaVersion, authority: value.authority, projectId: value.projectId,
    sourceExportSha256: value.sourceExportSha256, receiptArtifactSha256: value.receiptArtifactSha256,
    currentnessArtifactSha256: value.currentnessArtifactSha256, currentnessState: value.currentnessState,
    palmierCurrent: value.palmierCurrent, davinciHandoffCurrent: value.davinciHandoffCurrent,
    remotionStudioGuiActual: value.remotionStudioGuiActual, macDaVinciGuiActual: value.macDaVinciGuiActual,
    productionReady: value.productionReady,
  };
}

function assertSha(label: string, value: unknown) {
  if (typeof value !== 'string' || !/^[a-f0-9]{64}$/.test(value)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_SHA_INVALID:${label}`);
}

export function verifyWeddingProjectMotionProductionProvenanceValues(movieId: MovieId, bundle: any, recovery: any, markdown: string, currentProvenance?: any) {
  const bundleProvenance = bundle?.projectMotionProvenance ?? null;
  const recoveryProvenance = recovery?.projectMotionProvenance ?? null;
  if (!bundleProvenance && !recoveryProvenance) return {state: 'NOT_APPLICABLE' as const};
  if (!bundleProvenance || !recoveryProvenance) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PARTIAL_ATTACHMENT:${movieId}`);

  const bundleShape = stableProvenanceShape(bundleProvenance);
  const recoveryShape = stableProvenanceShape(recoveryProvenance);
  if (JSON.stringify(bundleShape) !== JSON.stringify(recoveryShape)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_BUNDLE_RECOVERY_DRIFT:${movieId}`);
  if (
    bundleShape?.schemaVersion !== 'wedding-project-motion-production-provenance/v1' || bundleShape?.authority !== 'SHA_BOUND_CURRENT_PROJECT_MOTION_IMPORT' ||
    bundleShape?.projectId !== movieId || bundleShape?.currentnessState !== 'CURRENT' || bundleShape?.palmierCurrent !== true || bundleShape?.davinciHandoffCurrent !== true ||
    bundleShape?.macDaVinciGuiActual !== 'NOT_RUN' || bundleShape?.remotionStudioGuiActual !== 'NOT_RUN' ||
    bundleShape?.evidenceMacDaVinciGuiActual !== 'NOT_RUN' || bundleShape?.productionReady !== false
  ) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_BOUNDARY_INVALID:${movieId}`);
  assertSha('source', bundleShape.sourceSha256); assertSha('receipt', bundleShape.receiptSha256); assertSha('currentness', bundleShape.currentnessSha256);

  const palmierBinding = stableAssemblyBindingShape(bundle?.palmier?.projectMotionBinding);
  const davinciBinding = stableAssemblyBindingShape(bundle?.davinci?.expectedProjectMotionBinding);
  if (!palmierBinding || !davinciBinding) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_ASSEMBLY_BINDING_MISSING:${movieId}`);
  if (JSON.stringify(palmierBinding) !== JSON.stringify(davinciBinding)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PALMIER_DAVINCI_DRIFT:${movieId}`);
  const expectedBinding = stableAssemblyBindingShape(buildWeddingProjectMotionAssemblyBinding(bundleProvenance));
  if (JSON.stringify(palmierBinding) !== JSON.stringify(expectedBinding)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_ASSEMBLY_BINDING_PROVENANCE_DRIFT:${movieId}`);
  if (
    palmierBinding.schemaVersion !== 'wedding-project-motion-assembly-binding/v1' || palmierBinding.authority !== 'PROJECT_MOTION_PROVENANCE_DERIVED_BINDING' ||
    palmierBinding.projectId !== movieId || palmierBinding.currentnessState !== 'CURRENT' || palmierBinding.palmierCurrent !== true || palmierBinding.davinciHandoffCurrent !== true ||
    palmierBinding.remotionStudioGuiActual !== 'NOT_RUN' || palmierBinding.macDaVinciGuiActual !== 'NOT_RUN' || palmierBinding.productionReady !== false
  ) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_ASSEMBLY_BINDING_BOUNDARY_INVALID:${movieId}`);
  assertSha('palmier-source', palmierBinding.sourceExportSha256); assertSha('palmier-receipt', palmierBinding.receiptArtifactSha256); assertSha('palmier-currentness', palmierBinding.currentnessArtifactSha256);

  const palmierArtifact = bundle?.palmier?.projectMotionBindingArtifact;
  const davinciArtifact = bundle?.davinci?.expectedProjectMotionBindingArtifact;
  const recoveryArtifact = recovery?.projectMotionPalmierBindingArtifact;
  if (!palmierArtifact || !davinciArtifact || !recoveryArtifact) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PALMIER_ARTIFACT_REF_MISSING:${movieId}`);
  if (JSON.stringify(palmierArtifact) !== JSON.stringify(davinciArtifact) || JSON.stringify(palmierArtifact) !== JSON.stringify(recoveryArtifact)) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PALMIER_ARTIFACT_REF_DRIFT:${movieId}`);
  }
  if (typeof palmierArtifact.path !== 'string' || palmierArtifact.path.length === 0) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PALMIER_ARTIFACT_PATH_INVALID:${movieId}`);
  assertSha('palmier-binding-artifact', palmierArtifact.sha256);

  if (currentProvenance && JSON.stringify(bundleShape) !== JSON.stringify(stableProvenanceShape(currentProvenance))) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_CANONICAL_DRIFT:${movieId}`);
  }

  for (const expected of [
    `project-motion-source-sha256: ${bundleShape.sourceSha256}`, `project-motion-receipt-sha256: ${bundleShape.receiptSha256}`,
    `project-motion-currentness-sha256: ${bundleShape.currentnessSha256}`, 'project-motion-currentness-state: CURRENT',
    'palmier-project-motion-current: yes', 'davinci-project-motion-handoff-current: yes', 'mac-remotion-studio-gui-actual: NOT_RUN',
    'mac-davinci-gui-actual: NOT_RUN', 'production-ready-by-project-motion-provenance: no',
  ]) {
    const count = markdown.split(expected).length - 1;
    if (count !== 1) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_MARKDOWN_DRIFT:${movieId}:${expected}:${count}`);
  }

  return {
    state: 'CURRENT' as const, sourceSha256: bundleShape.sourceSha256 as string,
    receiptSha256: bundleShape.receiptSha256 as string, currentnessSha256: bundleShape.currentnessSha256 as string,
    palmierDavinciBindingCurrent: true as const, palmierBindingArtifactSha256: palmierArtifact.sha256 as string,
    recoveryCarriesPalmierBindingArtifact: true as const,
    macRemotionStudioGuiActual: 'NOT_RUN' as const, macDaVinciGuiActual: 'NOT_RUN' as const, productionReady: false as const,
  };
}

export function verifyWeddingProjectMotionProductionProvenanceFiles(movieId: MovieId, bundlePath: string, recoveryPath: string, markdownPath: string) {
  if (!existsSync(bundlePath)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_BUNDLE_MISSING:${bundlePath}`);
  if (!existsSync(recoveryPath)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_RECOVERY_MISSING:${recoveryPath}`);
  if (!existsSync(markdownPath)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_MARKDOWN_MISSING:${markdownPath}`);
  const bundle = readJson(bundlePath); const recovery = readJson(recoveryPath);
  const hasProvenance = Boolean(bundle.projectMotionProvenance || recovery.projectMotionProvenance);
  const currentProvenance = hasProvenance ? buildWeddingProjectMotionProductionProvenance(movieId) : undefined;
  const result = verifyWeddingProjectMotionProductionProvenanceValues(movieId, bundle, recovery, readFileSync(markdownPath, 'utf8'), currentProvenance);
  if (result.state === 'CURRENT') {
    const ref = bundle.palmier.projectMotionBindingArtifact;
    const sidecarPath = resolve(dirname(bundlePath), ref.path);
    if (!existsSync(sidecarPath)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PALMIER_ARTIFACT_MISSING:${movieId}`);
    if (shaFile(sidecarPath) !== ref.sha256) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PALMIER_ARTIFACT_SHA_DRIFT:${movieId}`);
    const actual = readJson(sidecarPath);
    const expected = buildWeddingPalmierProjectMotionBindingArtifact(bundle.projectMotionProvenance);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`PROJECT_MOTION_PROVENANCE_CONSISTENCY_PALMIER_ARTIFACT_CONTENT_DRIFT:${movieId}`);
  }
  return result;
}

function main() {
  const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.slice('--movie='.length);
  if (movieArg !== 'opening' && movieArg !== 'profile') { console.error('Usage: node --no-warnings scripts/verify-wedding-project-motion-production-provenance.mts --movie=opening|profile'); process.exit(1); }
  const outDir = join(root, 'out', 'handoff', `${movieArg}-v1`);
  const result = verifyWeddingProjectMotionProductionProvenanceFiles(movieArg, join(outDir, `${movieArg}-v1-production-bundle.json`), join(outDir, `${movieArg}-v1-davinci-production-recovery.json`), join(outDir, `${movieArg}-v1-davinci-production-recovery.md`));
  console.log(`Project Motion production provenance consistency: ${result.state}`);
  if (result.state === 'CURRENT') {
    console.log(`projectMotionSourceSha256=${result.sourceSha256}`); console.log(`palmierProjectMotionBindingArtifactSha256=${result.palmierBindingArtifactSha256}`);
    console.log('DaVinci recovery carries Palmier Project Motion binding artifact: CURRENT'); console.log('Palmier -> DaVinci Project Motion binding: CURRENT');
  }
  console.log('Mac Remotion Studio GUI Actual remains NOT_RUN.'); console.log('Mac DaVinci Actual remains NOT_RUN.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try { main(); } catch (error) {
    console.error(error instanceof Error ? error.message : String(error)); console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
    console.error('Mac DaVinci Actual remains NOT_RUN.'); process.exit(2);
  }
}
