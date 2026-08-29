import {
  remotionStudioToolingProductionAdoption,
  type WeddingMovieId,
} from "./remotionStudioToolingProductionDependency";
import {
  WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_ARTIFACT,
  WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_CHECK_COMMAND,
  WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_EXPORT_COMMAND,
} from "./remotionElementHandoffIdentityReference";

export const WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_SCHEMA =
  "wedding-remotion-element-identity-production-gate/v1" as const;
export const WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_COMMAND =
  "cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate.mts" as const;
export const WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT =
  "movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-production-gate.json" as const;
export const WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_SCHEMA =
  "wedding-remotion-element-identity-production-gate-artifact/v1" as const;
export const WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_EXPORT_COMMAND =
  "cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-production-gate-artifact.mts" as const;
export const WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_CHECK_COMMAND =
  "cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate-artifact.mts" as const;

export function buildRemotionElementIdentityProductionGateReference(movieId: WeddingMovieId) {
  const adoptedCandidateIds = [...remotionStudioToolingProductionAdoption[movieId]];
  const required = adoptedCandidateIds.length > 0;

  return {
    schemaVersion: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_SCHEMA,
    authority: "SHA_BOUND_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE" as const,
    movieId,
    required,
    adoptedCandidateIds,
    identityArtifactPath: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_ARTIFACT,
    gateArtifact: {
      schemaVersion: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_SCHEMA,
      path: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT,
      authority: "SHA_BOUND_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT" as const,
      shaBound: true,
      carriesPalmierCurrentness: true,
      carriesDavinciCurrentness: true,
      carriesDavinciRecoveryCurrentness: true,
    },
    commands: {
      exportIdentity: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_EXPORT_COMMAND,
      checkIdentity: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_CHECK_COMMAND,
      checkProductionGate: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_COMMAND,
      exportProductionGateArtifact: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_EXPORT_COMMAND,
      checkProductionGateArtifact: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_CHECK_COMMAND,
    },
    semantics: {
      unadoptedIsNonBlocking: true,
      adoptedRequiresCurrentShaBoundIdentity: true,
      staleIdentityForcesPalmierNotCurrent: true,
      staleIdentityForcesDavinciNotCurrent: true,
      staleGateArtifactForcesDavinciRecoveryNotCurrent: true,
      currentIdentityDoesNotVerifyStudioActual: true,
      currentIdentityDoesNotVerifyMacDavinciActual: true,
    },
    macRemotionStudioGuiActual: "NOT_RUN" as const,
    macDaVinciGuiActual: "NOT_RUN" as const,
    productionDependencyPromotedByGateReference: false,
    guardrails: [
      "UNADOPTED_REMOTION_ELEMENT_IDENTITY_GATE_IS_NON_BLOCKING",
      "ADOPTED_ELEMENT_REQUIRES_CURRENT_SHA_BOUND_IDENTITY_BEFORE_PALMIER_HANDOFF_CURRENT",
      "ADOPTED_ELEMENT_REQUIRES_CURRENT_SHA_BOUND_IDENTITY_BEFORE_DAVINCI_HANDOFF_CURRENT",
      "ADOPTED_ELEMENT_REQUIRES_CURRENT_SHA_BOUND_GATE_ARTIFACT_BEFORE_DAVINCI_RECOVERY_CURRENT",
      "CANONICAL_ELEMENT_SOURCE_CHANGED => IDENTITY_GATE_BLOCKED",
      "IDENTITY_GATE_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED",
      "IDENTITY_GATE_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED",
    ],
  };
}
