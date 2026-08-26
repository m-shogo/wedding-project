import type {
  TypeOnRhythmBindingRole,
  TypeOnRhythmDaVinciEvaluatedEvidenceV1,
} from "./typeOnRhythmDaVinciEvidenceCapture";

export type TypeOnRhythmPromotionBlocker =
  | "MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS"
  | "LIVE_PARAMETER_BINDINGS_INCOMPLETE"
  | "VISUAL_QA_1X_NOT_PASS"
  | "VISUAL_QA_HALF_SPEED_NOT_PASS"
  | "VISUAL_QA_REVIEW_TIMESTAMP_MISSING";

const requiredBindingRoles: TypeOnRhythmBindingRole[] = [
  "TEXT_PLUS_TOOL",
  "FOLLOWER_MODIFIER",
  "FOLLOWER_UNIT",
  "FOLLOWER_DELAY",
  "FOLLOWER_ORDER",
  "TRANSLATE_Y",
  "OPACITY",
  "EASING",
];

export function assessTypeOnRhythmDaVinciPromotionEligibility(
  evidence: TypeOnRhythmDaVinciEvaluatedEvidenceV1,
) {
  const blockers: TypeOnRhythmPromotionBlocker[] = [];
  if (!evidence.allMachineComparableChecksPass) blockers.push("MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS");
  if (evidence.capturedBindingRoles.length !== requiredBindingRoles.length) blockers.push("LIVE_PARAMETER_BINDINGS_INCOMPLETE");
  if (evidence.visualQa.oneX !== "PASS") blockers.push("VISUAL_QA_1X_NOT_PASS");
  if (evidence.visualQa.halfSpeed !== "PASS") blockers.push("VISUAL_QA_HALF_SPEED_NOT_PASS");
  if (!evidence.visualQa.reviewedAt?.trim()) blockers.push("VISUAL_QA_REVIEW_TIMESTAMP_MISSING");

  return {
    schemaVersion: "type-on-rhythm-davinci-promotion-assessment/v1" as const,
    authority: "DERIVED_GATE_ONLY" as const,
    patternId: "type-type-on-rhythm" as const,
    sceneId: evidence.sceneId,
    sourceRevision: evidence.sourceRevision,
    eligibleForHumanPromotionReview: blockers.length === 0,
    requiredBindingRoles: [...requiredBindingRoles],
    capturedBindingRoles: [...evidence.capturedBindingRoles],
    blockers,
    automaticPromotionAllowed: false as const,
    productionReady: false as const,
    rule: "ELIGIBLE means only that word-level Follower Actual evidence is complete enough for human review. Never mutate typographyProductionRoutes, claim DAVINCI_IMPLEMENTATION_AVAILABLE, or set productionReady automatically.",
  };
}
