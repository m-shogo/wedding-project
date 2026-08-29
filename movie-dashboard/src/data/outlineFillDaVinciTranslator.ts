export type OutlineFillMotionIntensity = "S" | "M" | "L";

export interface OutlineFillDaVinciTranslatorInput {
  text: string;
  intensity: OutlineFillMotionIntensity;
  color: string;
  fps: number;
}

const intensityScale: Record<OutlineFillMotionIntensity, number> = {S: 0.55, M: 0.8, L: 1};

function requirePositiveFps(fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
}

/** Canonical outline mode expressed independently of Resolve/Fusion's unverified Text+ shading input names. */
export function buildOutlineFillDaVinciTranslatorSpec(input: OutlineFillDaVinciTranslatorInput) {
  requirePositiveFps(input.fps);
  const strength = intensityScale[input.intensity];
  const durationSeconds = 0.5;
  const durationFrames = Math.max(1, Math.round(input.fps * durationSeconds));
  const outlineAppearFrames = 4;
  const fillStartFrame = Number((durationFrames * 0.35).toFixed(6));
  const strokeWidthFromPx = Number((2.5 * strength).toFixed(6));

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-outline-fill" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "outline" as const,
      durationSeconds,
      outlineAppearFrames,
      fillStartProgress: 0.35,
      fillOpacityFrom: 0,
      fillOpacityTo: 1,
      strokeWidthFromPx,
      strokeWidthToPx: 0,
      color: input.color,
      easing: "EASE_OUT_CUBIC" as const,
    },
    implementation: {
      implementationId: "impl-type-outline-fill-davinci-text-plus-shading" as const,
      target: "FUSION_TEXT_PLUS_FILL_STROKE_SHADING" as const,
      tools: ["Text+", "Shading", "Keyframe", "Spline"] as const,
      text: input.text,
      color: input.color,
      intensity: input.intensity,
      fps: input.fps,
      animation: {
        outlineAppear: {startFrame: 0, endFrame: outlineAppearFrames, opacityFrom: 0, opacityTo: 1},
        fill: {startFrame: fillStartFrame, endFrame: durationFrames, opacityFrom: 0, opacityTo: 1},
        stroke: {startFrame: 0, endFrame: durationFrames, widthFromPx: strokeWidthFromPx, widthToPx: 0},
        easing: "EASE_OUT_CUBIC" as const,
      },
      shadingBinding: {
        state: "NOT_VERIFIED" as const,
        rule: "Do not invent Text+ Shading element numbers, fill/stroke input names, width units or alpha controls. Record the exact live Resolve/Fusion bindings and any unit calibration in a Mac Actual.",
      },
    },
    evidence: {
      runtimeApplyState: "NOT_RUN" as const,
      runtimeReadbackState: "NOT_RUN" as const,
      shadingBindingState: "NOT_RUN" as const,
      renderParityState: "NOT_RUN" as const,
    },
    guardrails: [
      "CANONICAL_STROKE_PX != VERIFIED_TEXT_PLUS_STROKE_UNIT",
      "SHADING_CAPABILITY_EXPECTED != LIVE_SHADING_INPUTS_VERIFIED",
      "TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED",
      "EXPECTED_OUTLINE_FILL_CURVES != RENDER_PARITY_VERIFIED",
    ] as const,
  };
}
