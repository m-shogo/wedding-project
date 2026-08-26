export type TripletMotionIntensity = "S" | "M" | "L";

export interface TripletDaVinciTranslatorInput {
  text: string;
  intensity: TripletMotionIntensity;
  color: string;
  fps: number;
}

const intensityScale: Record<TripletMotionIntensity, number> = {S: 0.55, M: 0.8, L: 1};

function requirePositiveFps(fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
}

/** Canonical TypographyRevealEngine(mode="triplet") -> Text+ / Transform pulse intent. */
export function buildTripletDaVinciTranslatorSpec(input: TripletDaVinciTranslatorInput) {
  requirePositiveFps(input.fps);
  const strength = intensityScale[input.intensity];
  const firstHit = Math.round(input.fps * 0.12);
  const hitFrames = [firstHit, firstHit + 6, firstHit + 12] as const;
  const pulseDurationFrames = 6;
  const scalePeakDelta = Number((0.25 * strength).toFixed(6));

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-triplet" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "triplet" as const,
      hitFrames,
      pulseDurationFrames,
      scaleBase: 1,
      scalePeakDelta,
      opacityAppearStartFrame: firstHit - 2,
      opacityAppearEndFrame: firstHit,
      pulseShape: "LINEAR_DECAY_PER_HIT_SUMMED" as const,
    },
    implementation: {
      implementationId: "impl-type-triplet-davinci-text-plus-transform-pulses" as const,
      target: "FUSION_TEXT_PLUS_TRANSFORM_PULSES" as const,
      tools: ["Text+", "Transform", "Keyframe", "Spline"] as const,
      text: input.text,
      color: input.color,
      intensity: input.intensity,
      fps: input.fps,
      animation: {
        hitFrames,
        pulseDurationFrames,
        scaleBase: 1,
        scalePeakDelta,
        opacity: {startFrame: firstHit - 2, endFrame: firstHit, from: 0, to: 1},
        pulseShape: "LINEAR_DECAY_PER_HIT_SUMMED" as const,
      },
      transformBinding: {
        state: "NOT_VERIFIED" as const,
        rule: "Do not guess the live Resolve/Fusion Transform input names or spline representation. Record exact bindings and read back all three pulse peaks/returns in a Mac Actual.",
      },
    },
    evidence: {runtimeApplyState: "NOT_RUN" as const, runtimeReadbackState: "NOT_RUN" as const, pulseBindingState: "NOT_RUN" as const, renderParityState: "NOT_RUN" as const},
    guardrails: [
      "THREE_HIT_TIMING_SPEC != THREE_VISIBLE_PEAKS_VERIFIED",
      "LINEAR_DECAY_INTENT != LIVE_FUSION_SPLINE_VERIFIED",
      "TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED",
      "EXPECTED_VALUES != RENDER_PARITY_VERIFIED",
    ] as const,
  };
}
