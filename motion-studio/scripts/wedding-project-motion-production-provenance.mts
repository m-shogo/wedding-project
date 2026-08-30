import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {
  buildWeddingProjectMotionReceiptCurrentnessFromCanonicalReceipt,
  saveWeddingProjectMotionReceiptCurrentness,
} from './wedding-project-motion-import-currentness.mts';
import {
  getWeddingProjectMotionCanonicalArtifactPaths,
  writeCanonicalJsonArtifact,
  type WeddingMovieId,
} from './wedding-project-motion-artifact-store.mts';

export interface WeddingProjectMotionProductionProvenanceV1 {
  schemaVersion: 'wedding-project-motion-production-provenance/v1';
  authority: 'SHA_BOUND_CURRENT_PROJECT_MOTION_IMPORT';
  projectId: WeddingMovieId;
  sourceExport: {path: string; sha256: string};
  receiptArtifact: {path: string; sha256: string};
  currentnessArtifact: {path: string; sha256: string; state: 'CURRENT'};
  assemblyGate: {
    palmierCurrent: true;
    davinciHandoffCurrent: true;
    macDaVinciGuiActual: 'NOT_RUN';
    productionReady: false;
  };
  evidenceBoundary: {
    remotionStudioGuiActual: 'NOT_RUN';
    macDaVinciGuiActual: 'NOT_RUN';
    productionReady: false;
  };
  guardrails: string[];
}

export interface WeddingProjectMotionAssemblyBindingV1 {
  schemaVersion: 'wedding-project-motion-assembly-binding/v1';
  authority: 'PROJECT_MOTION_PROVENANCE_DERIVED_BINDING';
  projectId: WeddingMovieId;
  sourceExportSha256: string;
  receiptArtifactSha256: string;
  currentnessArtifactSha256: string;
  currentnessState: 'CURRENT';
  palmierCurrent: true;
  davinciHandoffCurrent: true;
  remotionStudioGuiActual: 'NOT_RUN';
  macDaVinciGuiActual: 'NOT_RUN';
  productionReady: false;
}

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

function readJson(path: string) {
  return JSON.parse(readFileSync(path, 'utf8')) as any;
}

export function buildWeddingProjectMotionAssemblyBinding(
  provenance: WeddingProjectMotionProductionProvenanceV1,
): WeddingProjectMotionAssemblyBindingV1 {
  return {
    schemaVersion: 'wedding-project-motion-assembly-binding/v1',
    authority: 'PROJECT_MOTION_PROVENANCE_DERIVED_BINDING',
    projectId: provenance.projectId,
    sourceExportSha256: provenance.sourceExport.sha256,
    receiptArtifactSha256: provenance.receiptArtifact.sha256,
    currentnessArtifactSha256: provenance.currentnessArtifact.sha256,
    currentnessState: 'CURRENT',
    palmierCurrent: true,
    davinciHandoffCurrent: true,
    remotionStudioGuiActual: 'NOT_RUN',
    macDaVinciGuiActual: 'NOT_RUN',
    productionReady: false,
  };
}

export function buildWeddingProjectMotionProductionProvenance(
  movie: WeddingMovieId,
): WeddingProjectMotionProductionProvenanceV1 {
  const canonical = getWeddingProjectMotionCanonicalArtifactPaths(movie);
  if (!existsSync(canonical.receipt)) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_RECEIPT_MISSING:${movie}`);
  }

  const currentness = buildWeddingProjectMotionReceiptCurrentnessFromCanonicalReceipt(movie);
  if (
    currentness.state !== 'CURRENT' ||
    !currentness.assemblyGate.palmierCurrent ||
    !currentness.assemblyGate.davinciHandoffCurrent
  ) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_NOT_CURRENT_OR_ACTIONABLE:${movie}:${currentness.state}`);
  }
  if (currentness.assemblyGate.macDaVinciGuiActual !== 'NOT_RUN' || currentness.assemblyGate.productionReady !== false) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_CURRENTNESS_BOUNDARY_INVALID:${movie}`);
  }

  const savedCurrentness = saveWeddingProjectMotionReceiptCurrentness(currentness);
  const receipt = readJson(canonical.receipt);
  if (
    receipt.schemaVersion !== 'motion-studio-project-motion-import-receipt/v1' ||
    receipt.authority !== 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_RECEIPT' ||
    receipt.projectId !== movie ||
    receipt.source?.sha256 !== currentness.currentExport.sha256 ||
    receipt.evidenceBoundary?.remotionStudioGuiActual !== 'NOT_RUN' ||
    receipt.evidenceBoundary?.macDaVinciGuiActual !== 'NOT_RUN' ||
    receipt.evidenceBoundary?.productionReady !== false
  ) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_RECEIPT_CONTRACT_INVALID:${movie}`);
  }

  return {
    schemaVersion: 'wedding-project-motion-production-provenance/v1',
    authority: 'SHA_BOUND_CURRENT_PROJECT_MOTION_IMPORT',
    projectId: movie,
    sourceExport: {
      path: currentness.currentExport.path,
      sha256: currentness.currentExport.sha256,
    },
    receiptArtifact: {
      path: canonical.receipt,
      sha256: shaFile(canonical.receipt),
    },
    currentnessArtifact: {
      path: savedCurrentness,
      sha256: shaFile(savedCurrentness),
      state: 'CURRENT',
    },
    assemblyGate: {
      palmierCurrent: true,
      davinciHandoffCurrent: true,
      macDaVinciGuiActual: 'NOT_RUN',
      productionReady: false,
    },
    evidenceBoundary: {
      remotionStudioGuiActual: 'NOT_RUN',
      macDaVinciGuiActual: 'NOT_RUN',
      productionReady: false,
    },
    guardrails: [
      'PROVENANCE_SOURCE_SHA256_MUST_MATCH_CURRENT_PROJECT_MOTION_EXPORT',
      'PROVENANCE_RECEIPT_SHA256_BINDS_THE_CANONICAL_IMPORT_RECEIPT',
      'PROVENANCE_CURRENTNESS_SHA256_BINDS_THE_CURRENTNESS_ARTIFACT',
      'PALMIER_PROJECT_MOTION_BINDING_MUST_MATCH_TOP_LEVEL_PROVENANCE',
      'DAVINCI_EXPECTED_PROJECT_MOTION_BINDING_MUST_MATCH_PALMIER_BINDING',
      'PROJECT_MOTION_PROVENANCE_ATTACHED != PALMIER_APPLICATION_PERFORMED',
      'PROJECT_MOTION_PROVENANCE_ATTACHED != DAVINCI_APPLICATION_PERFORMED',
      'PROJECT_MOTION_PROVENANCE_ATTACHED != REMOTION_STUDIO_GUI_ACTUAL',
      'PROJECT_MOTION_PROVENANCE_ATTACHED != MAC_DAVINCI_GUI_ACTUAL',
    ],
  };
}

export function attachWeddingProjectMotionProductionProvenance(
  movie: WeddingMovieId,
  artifactPath: string,
) {
  const absoluteArtifactPath = resolve(artifactPath);
  if (!existsSync(absoluteArtifactPath)) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_TARGET_MISSING:${absoluteArtifactPath}`);
  }
  const artifact = readJson(absoluteArtifactPath);
  const provenance = buildWeddingProjectMotionProductionProvenance(movie);
  const assemblyBinding = buildWeddingProjectMotionAssemblyBinding(provenance);

  const nextArtifact: any = {
    ...artifact,
    projectMotionProvenance: provenance,
  };

  // Production bundles own both Palmier and DaVinci handoff surfaces. Bind the
  // exact same current Project Motion provenance into both so a later DaVinci
  // transition cannot silently consume a different Motion Zukan/Scene revision.
  if (artifact?.palmier && artifact?.davinci) {
    nextArtifact.palmier = {
      ...artifact.palmier,
      projectMotionBinding: assemblyBinding,
    };
    nextArtifact.davinci = {
      ...artifact.davinci,
      expectedProjectMotionBinding: assemblyBinding,
    };
  }

  writeCanonicalJsonArtifact(absoluteArtifactPath, nextArtifact);
  return provenance;
}
