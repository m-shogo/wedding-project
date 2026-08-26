import {
  evaluateDaVinciHumanPromotionGate,
  type DaVinciEvidenceState,
  type DaVinciLiveParameterBindingV1,
  type DaVinciVisualQaV1,
} from "./davinciFollowerEvidenceContract";
import type {TypographyProductionPatternId} from "./typographySceneProductionRouting";

export type TypographyDaVinciActualCandidatePatternId = Exclude<TypographyProductionPatternId, "type-mask-reveal">;

export const typographyDaVinciRequiredBindingRoles = {
  "type-char-stagger": ["TEXT_PLUS_TOOL", "FOLLOWER_MODIFIER", "FOLLOWER_DELAY", "FOLLOWER_ORDER", "TRANSLATE_Y", "OPACITY", "EASING"],
  "type-type-on-rhythm": ["TEXT_PLUS_TOOL", "FOLLOWER_MODIFIER", "FOLLOWER_UNIT", "FOLLOWER_DELAY", "FOLLOWER_ORDER", "TRANSLATE_Y", "OPACITY", "EASING"],
  "type-word-punch": ["TEXT_PLUS_TOOL", "TRANSFORM_TOOL", "SCALE", "OPACITY", "EASING"],
  "type-tracking-burst": ["TEXT_PLUS_TOOL", "CHARACTER_SPACING_INPUT", "NATIVE_UNIT_CALIBRATION", "TRACKING_START", "TRACKING_END", "OPACITY", "EASING"],
  "type-vertical-wipe": ["TEXT_PLUS_TOOL", "MASK_TOOL", "MASK_INPUT", "MASK_COORDINATE_CONVENTION", "MASK_INVERSION", "REVEAL_START", "REVEAL_END", "EASING"],
  "type-outline-fill": ["TEXT_PLUS_TOOL", "FILL_SHADING_BINDING", "STROKE_SHADING_BINDING", "STROKE_WIDTH_UNIT_CALIBRATION", "OUTLINE_APPEAR", "FILL_OPACITY", "STROKE_WIDTH", "EASING"],
  "type-baseline-hop": ["TEXT_PLUS_TOOL", "BASELINE_POSITION_BINDING", "POSITION_UNIT_CALIBRATION", "OPACITY", "HOP_POSITION", "OPACITY_EASING", "BOUNCE_SPLINE"],
  "type-triplet": ["TEXT_PLUS_TOOL", "TRANSFORM_BINDING", "HIT_1", "HIT_2", "HIT_3", "PULSE_DECAY", "OPACITY"],
} as const satisfies Record<TypographyDaVinciActualCandidatePatternId, readonly string[]>;

export function evaluateTypographyDaVinciHumanPromotionGate({
  patternId,
  machineChecks,
  bindings,
  visualQa,
}: {
  patternId: TypographyDaVinciActualCandidatePatternId;
  machineChecks: readonly DaVinciEvidenceState[];
  bindings: readonly DaVinciLiveParameterBindingV1<string>[];
  visualQa: DaVinciVisualQaV1;
}) {
  return evaluateDaVinciHumanPromotionGate({
    machineChecks,
    bindings,
    requiredBindingRoles: typographyDaVinciRequiredBindingRoles[patternId],
    visualQa,
  });
}

export function getTypographyDaVinciRequiredBindingRoles(patternId: TypographyDaVinciActualCandidatePatternId) {
  return [...typographyDaVinciRequiredBindingRoles[patternId]];
}
