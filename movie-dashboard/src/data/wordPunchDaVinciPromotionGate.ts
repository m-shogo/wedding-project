import type { WordPunchDaVinciEvaluatedEvidenceV1, WordPunchBindingRole } from "./wordPunchDaVinciEvidenceCapture";
import { wordPunchRequiredBindingRoles } from "./wordPunchDaVinciEvidenceCapture";

export type WordPunchPromotionBlocker =
  | "MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS"
  | "LIVE_PARAMETER_BINDINGS_INCOMPLETE"
  | "VISUAL_QA_1X_NOT_PASS"
  | "VISUAL_QA_HALF_SPEED_NOT_PASS"
  | "VISUAL_QA_REVIEW_TIMESTAMP_MISSING";

export interface WordPunchDaVinciPromotionAssessmentV1 {
  schemaVersion: "word-punch-davinci-promotion-assessment/v1";
  authority: "DERIVED_GATE_ONLY";
  patternId: "type-word-punch";
  sceneId: string;
  sourceRevision: string;
  eligibleForHumanPromotionReview: boolean;
  requiredBindingRoles: WordPunchBindingRole[];
  capturedBindingRoles: WordPunchBindingRole[];
  blockers: WordPunchPromotionBlocker[];
  automaticPromotionAllowed: false;
  productionReady: false;
  rule: string;
}

export function assessWordPunchDaVinciPromotionEligibility(
  evidence: WordPunchDaVinciEvaluatedEvidenceV1,
): WordPunchDaVinciPromotionAssessmentV1 {
  const blockers: WordPunchPromotionBlocker[] = [];
  if (!evidence.allMachineComparableChecksPass) blockers.push("MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS");
  if (evidence.capturedBindingRoles.length !== wordPunchRequiredBindingRoles.length) {
    blockers.push("LIVE_PARAMETER_BINDINGS_INCOMPLETE");
  }
  if (evidence.visualQa.oneX !== "PASS") blockers.push("VISUAL_QA_1X_NOT_PASS");
  if (evidence.visualQa.halfSpeed !== "PASS") blockers.push("VISUAL_QA_HALF_SPEED_NOT_PASS");
  if (!evidence.visualQa.reviewedAt?.trim()) blockers.push("VISUAL_QA_REVIEW_TIMESTAMP_MISSING");

  return {
    schemaVersion: "word-punch-davinci-promotion-assessment/v1",
    authority: "DERIVED_GATE_ONLY",
    patternId: "type-word-punch",
    sceneId: evidence.sceneId,
    sourceRevision: evidence.sourceRevision,
    eligibleForHumanPromotionReview: blockers.length === 0,
    requiredBindingRoles: [...wordPunchRequiredBindingRoles],
    capturedBindingRoles: [...evidence.capturedBindingRoles],
    blockers,
    automaticPromotionAllowed: false,
    productionReady: false,
    rule: "Eligibility only means the exact canonical readback, live Text+/Transform bindings and 1x/half-speed visual QA are complete enough for a human route-promotion review. Never mutate typographyProductionRoutes or claim production readiness automatically.",
  };
}
