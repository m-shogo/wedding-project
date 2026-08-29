import {
  WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT,
  WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_CHECK_COMMAND,
  WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_EXPORT_COMMAND,
} from "./remotionElementIdentityProductionGateReference";
import {
  remotionStudioToolingProductionAdoption,
  type WeddingMovieId,
} from "./remotionStudioToolingProductionDependency";

export const REMOTION_ELEMENT_GATE_ARTIFACT_RECOVERY_SCHEMA =
  "wedding-remotion-element-gate-artifact-recovery-reference/v1" as const;

export function buildRemotionElementGateArtifactRecoveryReference(movieId: WeddingMovieId) {
  const adoptedCandidateIds = [...remotionStudioToolingProductionAdoption[movieId]];
  const required = adoptedCandidateIds.length > 0;

  return {
    schemaVersion: REMOTION_ELEMENT_GATE_ARTIFACT_RECOVERY_SCHEMA,
    authority: "SHA_BOUND_REMOTION_ELEMENT_GATE_ARTIFACT_RECOVERY" as const,
    movieId,
    required,
    adoptedCandidateIds,
    gateArtifactPath: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT,
    currentnessCommand: WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_CHECK_COMMAND,
    recovery: required
      ? [
          "cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-handoff-identities.mts",
          "cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-handoff-identities.mts",
          "cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate.mts",
          WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_EXPORT_COMMAND,
          WEDDING_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_CHECK_COMMAND,
        ]
      : [],
    semantics: {
      unadoptedIsNonBlocking: true,
      adoptedRequiresGateArtifactCurrent: true,
      staleGateArtifactForcesPalmierNotCurrent: true,
      staleGateArtifactForcesDavinciNotCurrent: true,
      staleGateArtifactForcesDavinciRecoveryNotCurrent: true,
      recoveryReferenceDoesNotPerformStudioGuiActual: true,
      recoveryReferenceDoesNotPerformMacDavinciGuiActual: true,
    },
    macRemotionStudioGuiActual: "NOT_RUN" as const,
    macDaVinciGuiActual: "NOT_RUN" as const,
    productionDependencyPromotedByRecoveryReference: false,
    guardrails: [
      "GATE_ARTIFACT_REFERENCE_EXPORTED != GATE_ARTIFACT_CURRENT",
      "GATE_ARTIFACT_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED",
      "GATE_ARTIFACT_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED",
      "STALE_GATE_ARTIFACT => DAVINCI_RECOVERY_NOT_CURRENT",
      "UNADOPTED_REMOTION_ELEMENT_GATE_ARTIFACT_RECOVERY_IS_NON_BLOCKING",
    ],
  };
}
