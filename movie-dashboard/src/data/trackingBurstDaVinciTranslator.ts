export type TrackingBurstMotionIntensity = "S" | "M" | "L";

export interface TrackingBurstDaVinciTranslatorInput {
  text: string;
  intensity: TrackingBurstMotionIntensity;
  color: string;
  fps: number;
}

const intensityScale: Record<TrackingBurstMotionIntensity, number> = {
  S: 0.55,
  M: 0.8,
  L: 1,
};

function requirePositiveFps(fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
}

/**
 * Canonical TypographyRevealEngine(mode="tracking") → DaVinci Text+ tracking translation.
 *
 * Canonical values are kept in CSS-em-equivalent normalized units. Resolve/Fusion's native
 * character-spacing control must be calibrated in a real Mac Actual before any native numeric
 * binding is claimed. This avoids inventing a conversion factor from documentation alone.
 */
export function buildTrackingBurstDaVinciTranslatorSpec(input: TrackingBurstDaVinciTranslatorInput) {
  requirePositiveFps(input.fps);
  const strength = intensityScale[input.intensity];
  const durationSeconds = 0.5;
  const durationFrames = Math.max(1, Math.round(input.fps * durationSeconds));
  const trackingFromEm = Number((0.18 * strength).toFixed(6));
  const trackingToEm = 0.02;

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-tracking-burst" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "tracking" as const,
      durationSeconds,
      trackingFromEm,
      trackingToEm,
      opacityFrom: 0,
      opacityTo: 1,
      easing: "EASE_OUT_CUBIC" as const,
    },
    implementation: {
      implementationId: "impl-type-tracking-burst-davinci-text-plus-tracking" as const,
      target: "FUSION_TEXT_PLUS_CHARACTER_SPACING" as const,
      tools: ["Text+", "Keyframe", "Spline"] as const,
      text: input.text,
      color: input.color,
      intensity: input.intensity,
      fps: input.fps,
      animation: {
        startFrame: 0,
        endFrame: durationFrames,
        normalizedTrackingEm: {from: trackingFromEm, to: trackingToEm},
        opacity: {from: 0, to: 1},
        easing: "EASE_OUT_CUBIC" as const,
      },
      nativeUnitCalibration: {
        state: "NOT_VERIFIED" as const,
        rule: "Do not invent a CSS-em to Resolve/Fusion character-spacing conversion. Measure and record the live Text+ input, raw values and normalized calibration in a real Mac Actual.",
      },
    },
    evidence: {
      runtimeApplyState: "NOT_RUN" as const,
      runtimeReadbackState: "NOT_RUN" as const,
      nativeUnitCalibrationState: "NOT_RUN" as const,
      renderParityState: "NOT_RUN" as const,
    },
    guardrails: [
      "TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED",
      "NORMALIZED_TRACKING_EM != VERIFIED_NATIVE_FUSION_UNIT",
      "DOCUMENTED_CAPABILITY != LIVE_INPUT_NAME_VERIFIED",
      "EXPECTED_VALUES != RENDER_PARITY_VERIFIED",
    ] as const,
  };
}
