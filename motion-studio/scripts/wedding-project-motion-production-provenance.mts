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

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

function readJson(path: string) {
  return JSON.parse(readFileSync(path, 'utf8')) as any;
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
  writeCanonicalJsonArtifact(absoluteArtifactPath, {
    ...artifact,
    projectMotionProvenance: provenance,
  });
  return provenance;
}
