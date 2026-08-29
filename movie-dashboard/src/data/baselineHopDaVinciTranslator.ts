export type BaselineHopMotionIntensity = "S" | "M" | "L";

export interface BaselineHopDaVinciTranslatorInput {
  text: string;
  intensity: BaselineHopMotionIntensity;
  color: string;
  fps: number;
}

const intensityScale: Record<BaselineHopMotionIntensity, number> = {S: 0.55, M: 0.8, L: 1};

function requirePositiveFps(fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
}

/** Canonical TypographyRevealEngine(mode="hop") -> Text+ baseline translation without inventing live Fusion input names. */
export function buildBaselineHopDaVinciTranslatorSpec(input: BaselineHopDaVinciTranslatorInput) {
  requirePositiveFps(input.fps);
  const strength = intensityScale[input.intensity];
  const opacityEndFrame = Math.max(1, Math.round(input.fps * 0.5));
  const hopEndFrame = Math.max(1, Math.round(input.fps * 0.7));
  const translateFromPx = Number((-90 * strength).toFixed(6));

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-baseline-hop" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "hop" as const,
      opacityDurationSeconds: 0.5,
      hopDurationSeconds: 0.7,
      opacityEasing: "EASE_OUT_CUBIC" as const,
      hopEasing: "REMOTION_EASING_BOUNCE" as const,
      translateYFromPx: translateFromPx,
      translateYToPx: 0,
    },
    implementation: {
      implementationId: "impl-type-baseline-hop-davinci-text-plus-baseline" as const,
      target: "FUSION_TEXT_PLUS_BASELINE_POSITION" as const,
      tools: ["Text+", "Keyframe", "Spline"] as const,
      text: input.text,
      color: input.color,
      intensity: input.intensity,
      fps: input.fps,
      animation: {
        opacity: {startFrame: 0, endFrame: opacityEndFrame, from: 0, to: 1, easing: "EASE_OUT_CUBIC" as const},
        baselineY: {startFrame: 0, endFrame: hopEndFrame, fromPx: translateFromPx, toPx: 0, easing: "REMOTION_EASING_BOUNCE" as const},
      },
      baselineBinding: {
        state: "NOT_VERIFIED" as const,
        rule: "Do not guess whether Resolve parity is best represented by Text+ Center, Transform offset, Layout Position or another input. Record the live binding and coordinate/unit calibration in Mac Actual.",
      },
    },
    evidence: {runtimeApplyState: "NOT_RUN" as const, runtimeReadbackState: "NOT_RUN" as const, baselineBindingState: "NOT_RUN" as const, renderParityState: "NOT_RUN" as const},
    guardrails: [
      "REMOTION_BOUNCE_EASING != VERIFIED_FUSION_SPLINE",
      "CANONICAL_PIXEL_OFFSET != VERIFIED_FUSION_POSITION_UNIT",
      "TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED",
      "EXPECTED_VALUES != RENDER_PARITY_VERIFIED",
    ] as const,
  };
}
