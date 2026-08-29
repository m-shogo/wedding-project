import type {
  CharStaggerDaVinciEvaluatedEvidenceV1,
  CharStaggerDaVinciLiveParameterBindingV1,
} from "./charStaggerDaVinciEvidenceCapture";

export type CharStaggerPromotionBlocker =
  | "MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS"
  | "LIVE_PARAMETER_BINDINGS_INCOMPLETE"
  | "VISUAL_QA_1X_NOT_PASS"
  | "VISUAL_QA_HALF_SPEED_NOT_PASS"
  | "VISUAL_QA_REVIEW_TIMESTAMP_MISSING";

export interface CharStaggerDaVinciPromotionAssessmentV1 {
  schemaVersion: "char-stagger-davinci-promotion-assessment/v1";
  authority: "DERIVED_GATE_ONLY";
  patternId: "type-char-stagger";
  sceneId: string;
  sourceRevision: string;
  eligibleForHumanPromotionReview: boolean;
  requiredBindingRoles: CharStaggerDaVinciLiveParameterBindingV1["role"][];
  capturedBindingRoles: CharStaggerDaVinciLiveParameterBindingV1["role"][];
  blockers: CharStaggerPromotionBlocker[];
  automaticPromotionAllowed: false;
  productionReady: false;
  rule: string;
}

const REQUIRED_BINDING_ROLES: CharStaggerDaVinciLiveParameterBindingV1["role"][] = [
  "TEXT_PLUS_TOOL",
  "FOLLOWER_MODIFIER",
  "FOLLOWER_DELAY",
  "FOLLOWER_ORDER",
  "TRANSLATE_Y",
  "OPACITY",
  "EASING",
];

function capturedBindingRoles(evidence: CharStaggerDaVinciEvaluatedEvidenceV1) {
  const roles = new Set<CharStaggerDaVinciLiveParameterBindingV1["role"]>();
  for (const binding of evidence.liveParameterBindings) {
    if (binding.toolName.trim() && binding.inputName.trim()) roles.add(binding.role);
  }
  return REQUIRED_BINDING_ROLES.filter((role) => roles.has(role));
}

export function assessCharStaggerDaVinciPromotionEligibility(
  evidence: CharStaggerDaVinciEvaluatedEvidenceV1,
): CharStaggerDaVinciPromotionAssessmentV1 {
  const capturedRoles = capturedBindingRoles(evidence);
  const blockers: CharStaggerPromotionBlocker[] = [];

  if (!evidence.allMachineComparableChecksPass) {
    blockers.push("MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS");
  }
  if (capturedRoles.length !== REQUIRED_BINDING_ROLES.length) {
    blockers.push("LIVE_PARAMETER_BINDINGS_INCOMPLETE");
  }
  if (evidence.visualQa.oneX !== "PASS") {
    blockers.push("VISUAL_QA_1X_NOT_PASS");
  }
  if (evidence.visualQa.halfSpeed !== "PASS") {
    blockers.push("VISUAL_QA_HALF_SPEED_NOT_PASS");
  }
  if (!evidence.visualQa.reviewedAt?.trim()) {
    blockers.push("VISUAL_QA_REVIEW_TIMESTAMP_MISSING");
  }

  return {
    schemaVersion: "char-stagger-davinci-promotion-assessment/v1",
    authority: "DERIVED_GATE_ONLY",
    patternId: "type-char-stagger",
    sceneId: evidence.sceneId,
    sourceRevision: evidence.sourceRevision,
    eligibleForHumanPromotionReview: blockers.length === 0,
    requiredBindingRoles: [...REQUIRED_BINDING_ROLES],
    capturedBindingRoles: capturedRoles,
    blockers,
    automaticPromotionAllowed: false,
    productionReady: false,
    rule: "Eligibility only means the evidence package is complete enough for a human promotion review. It must not mutate typographyProductionRoutes, mark DaVinci implementation available, or claim production readiness automatically.",
  };
}
