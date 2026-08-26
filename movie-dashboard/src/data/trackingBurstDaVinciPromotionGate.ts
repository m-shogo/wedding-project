import { capturedDaVinciBindingRoles } from "./davinciFollowerEvidenceContract";
import type {
  TrackingBurstBindingRole,
  TrackingBurstDaVinciEvaluatedEvidenceV1,
} from "./trackingBurstDaVinciEvidenceCapture";

export type TrackingBurstPromotionBlocker =
  | "MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS"
  | "LIVE_PARAMETER_BINDINGS_INCOMPLETE"
  | "NATIVE_TRACKING_UNIT_CALIBRATION_NOT_PASS"
  | "VISUAL_QA_1X_NOT_PASS"
  | "VISUAL_QA_HALF_SPEED_NOT_PASS"
  | "VISUAL_QA_REVIEW_TIMESTAMP_MISSING";

const requiredBindingRoles: TrackingBurstBindingRole[] = [
  "TEXT_PLUS_TOOL",
  "CHARACTER_SPACING_INPUT",
  "NATIVE_UNIT_CALIBRATION",
  "TRACKING_START",
  "TRACKING_END",
  "OPACITY",
  "EASING",
];

export function assessTrackingBurstDaVinciPromotionEligibility(
  evidence: TrackingBurstDaVinciEvaluatedEvidenceV1,
) {
  const capturedBindingRoles = capturedDaVinciBindingRoles(
    evidence.liveParameterBindings,
    requiredBindingRoles,
  );
  const blockers: TrackingBurstPromotionBlocker[] = [];
  if (!evidence.allMachineComparableChecksPass) blockers.push("MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS");
  if (capturedBindingRoles.length !== requiredBindingRoles.length) blockers.push("LIVE_PARAMETER_BINDINGS_INCOMPLETE");
  if (evidence.checks.nativeUnitCalibrationRecorded !== "PASS") blockers.push("NATIVE_TRACKING_UNIT_CALIBRATION_NOT_PASS");
  if (evidence.visualQa.oneX !== "PASS") blockers.push("VISUAL_QA_1X_NOT_PASS");
  if (evidence.visualQa.halfSpeed !== "PASS") blockers.push("VISUAL_QA_HALF_SPEED_NOT_PASS");
  if (!evidence.visualQa.reviewedAt?.trim()) blockers.push("VISUAL_QA_REVIEW_TIMESTAMP_MISSING");

  return {
    schemaVersion: "tracking-burst-davinci-promotion-assessment/v1" as const,
    authority: "DERIVED_GATE_ONLY" as const,
    patternId: "type-tracking-burst" as const,
    sceneId: evidence.sceneId,
    sourceRevision: evidence.sourceRevision,
    eligibleForHumanPromotionReview: blockers.length === 0,
    requiredBindingRoles: [...requiredBindingRoles],
    capturedBindingRoles,
    blockers,
    automaticPromotionAllowed: false as const,
    productionReady: false as const,
    rule: "ELIGIBLE only means Tracking Burst has real native-unit calibration, live binding evidence, exact normalized readback and visual QA. Never promote routing automatically.",
  };
}
