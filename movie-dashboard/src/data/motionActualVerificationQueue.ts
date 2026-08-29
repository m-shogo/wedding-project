export type MotionActualVerificationGate = {
  patternId: string;
  authority: "DAVINCI_EDIT" | "PALMIER_TIMELINE" | "SOURCE_MEDIA";
  requiredInput: string;
  verificationAction: string;
  passCondition: string;
  promotionTarget: "TESTED" | "PRODUCTION_READY";
};

// Source-media Actual renders and independent pixel oracles completed on 2026-08-28.
// New gates must be added here; an empty queue means every registered v1 pattern is at least TESTED.
export const motionActualVerificationQueue: readonly MotionActualVerificationGate[] = [];

export function getMotionActualVerificationGate(patternId: string) {
  return motionActualVerificationQueue.find((gate) => gate.patternId === patternId) ?? null;
}
