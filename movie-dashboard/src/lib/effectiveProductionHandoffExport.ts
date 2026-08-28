import {buildOpeningProductionStatusHandoff} from "../data/openingProductionStatusHandoff";
import {buildProfileProductionStatusHandoff} from "../data/profileProductionStatusHandoff";
import {
  buildPalmierWeddingProductionGate,
  type PalmierWeddingProductionMovieId,
  type PalmierWeddingProductionProject,
} from "./palmierWeddingProductionGate";

export const EFFECTIVE_PRODUCTION_HANDOFF_OVERLAY_SCHEMA = "wedding-effective-production-handoff-overlay/v1" as const;

type EffectiveProductionOverlay = {
  schemaVersion: typeof EFFECTIVE_PRODUCTION_HANDOFF_OVERLAY_SCHEMA;
  authority: "MOTION_STUDIO_EFFECTIVE_WEDDING_PRODUCTION_GATE";
  movieId: PalmierWeddingProductionMovieId;
  productionReady: boolean;
  effectiveProductionState: PalmierWeddingProductionProject["effectiveProductionState"];
  blockingAuthorities: string[];
  effectiveNextGate: PalmierWeddingProductionProject["effectiveNextGate"];
  remotionStudioToolingDependency: PalmierWeddingProductionProject["remotionStudioToolingDependency"];
  guardrails: readonly string[];
};

function buildOverlay(movieId: PalmierWeddingProductionMovieId): EffectiveProductionOverlay {
  const project = buildPalmierWeddingProductionGate(movieId).projects.find((item) => item.movieId === movieId);
  if (!project) {
    throw new Error(`Effective production project is missing: ${movieId}`);
  }
  return {
    schemaVersion: EFFECTIVE_PRODUCTION_HANDOFF_OVERLAY_SCHEMA,
    authority: "MOTION_STUDIO_EFFECTIVE_WEDDING_PRODUCTION_GATE",
    movieId,
    productionReady: project.productionReady,
    effectiveProductionState: project.effectiveProductionState,
    blockingAuthorities: [...project.blockingAuthorities],
    effectiveNextGate: {
      authority: project.effectiveNextGate.authority,
      state: project.effectiveNextGate.state,
      stage: project.effectiveNextGate.stage,
      artifactPath: project.effectiveNextGate.artifactPath,
      blockerCodes: [...project.effectiveNextGate.blockerCodes],
      blockerActions: project.effectiveNextGate.blockerActions.map((action) => ({...action})),
      recovery: [...project.effectiveNextGate.recovery],
      adoptedCandidateIds: [...project.effectiveNextGate.adoptedCandidateIds],
    },
    remotionStudioToolingDependency: {
      ...project.remotionStudioToolingDependency,
      adoptedCandidateIds: [...project.remotionStudioToolingDependency.adoptedCandidateIds],
      unknownCandidateIds: [...project.remotionStudioToolingDependency.unknownCandidateIds],
      recoveryActions: project.remotionStudioToolingDependency.recoveryActions.map((action) => ({...action})),
      recovery: [...project.remotionStudioToolingDependency.recovery],
      guardrails: [...project.remotionStudioToolingDependency.guardrails],
    },
    guardrails: [
      "CANONICAL_HANDOFF_REMAINS_SOURCE_OF_WEDDING_MEDIA_AND_STAGE_EVIDENCE",
      "EFFECTIVE_OVERLAY_EXPORTED != EFFECTIVE_GATE_COMPLETED",
      "REMOTION_DEPENDENCY_OVERLAY_EXPORTED != STUDIO_ACTUAL_VERIFIED",
      "HUMAN_QA_NOT_RUN != HUMAN_QA_PASS",
      "MAC_DAVINCI_ACTUAL_NOT_RUN != MAC_DAVINCI_ACTUAL_VERIFIED",
    ],
  };
}

export function buildOpeningEffectiveProductionHandoff() {
  return {
    ...buildOpeningProductionStatusHandoff(),
    effectiveProduction: buildOverlay("opening"),
  };
}

export function buildProfileEffectiveProductionHandoff() {
  return {
    ...buildProfileProductionStatusHandoff(),
    effectiveProduction: buildOverlay("profile"),
  };
}

export function buildOpeningEffectiveProductionHandoffJson() {
  return JSON.stringify(buildOpeningEffectiveProductionHandoff(), null, 2);
}

export function buildProfileEffectiveProductionHandoffJson() {
  return JSON.stringify(buildProfileEffectiveProductionHandoff(), null, 2);
}
