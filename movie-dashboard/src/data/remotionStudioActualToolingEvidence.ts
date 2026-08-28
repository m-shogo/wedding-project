import {remotionElementStudioActualBatch} from "./remotionElementCandidates";

export type RemotionStudioActualToolingState = "NOT_RUN" | "VERIFIED";

/**
 * Production handoffで参照するRemotion Studio Actual tooling evidence。
 * これはTypography Element toolingの証拠参照であり、Opening/Profileのproduction gateではない。
 */
export function buildRemotionStudioActualToolingEvidence() {
  const batch = remotionElementStudioActualBatch;
  return {
    authority: "MOTION_ZUKAN_REMOTION_STUDIO_ACTUAL_TOOLING_REFERENCE" as const,
    batchSchemaVersion: batch.schemaVersion,
    summaryPath: batch.evidence.summaryPath,
    summarySchemaVersion: batch.evidence.summarySchemaVersion,
    summaryAuthority: batch.evidence.summaryAuthority,
    evidencePath: batch.evidence.path,
    statusCommand: batch.evidence.statusCommand,
    strictCommand: batch.evidence.strictCommand,
    candidateCount: batch.evidence.candidateCount,
    checkAxesPerCandidate: batch.evidence.checkAxesPerCandidate,
    currentRepoState: batch.evidence.currentRepoState as RemotionStudioActualToolingState,
    humanReviewed: batch.evidence.humanReviewed,
    productionDependencyPromoted: batch.productionDependencyPromoted,
    guardrails: [
      "TOOLING_EVIDENCE_REFERENCED != STUDIO_ACTUAL_VERIFIED",
      "STUDIO_ACTUAL_SUMMARY_EXPORTED != WEDDING_MOVIE_PRODUCTION_BLOCKED",
      "ELEMENT_NOT_ADOPTED_BY_PROJECT => TOOLING_ACTUAL_IS_NON_BLOCKING",
      "STUDIO_ACTUAL_VERIFIED != PRODUCTION_DEPENDENCY_PROMOTED",
    ],
  };
}
