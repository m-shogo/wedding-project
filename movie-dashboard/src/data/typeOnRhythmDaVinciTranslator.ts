export type TypeOnRhythmMotionIntensity = "S" | "M" | "L";

export interface TypeOnRhythmDaVinciTranslatorInput {
  text: string;
  intensity: TypeOnRhythmMotionIntensity;
  color: string;
  fps: number;
}

const intensityScale: Record<TypeOnRhythmMotionIntensity, number> = {
  S: 0.55,
  M: 0.8,
  L: 1,
};

function requirePositiveFps(fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
}

function secondsToFrames(seconds: number, fps: number) {
  return Math.max(1, Math.round(seconds * fps));
}

/**
 * Canonical TypographyRevealEngine(mode="word-stagger") → DaVinci Fusion Text+ Follower spec.
 *
 * Blackmagic's official Fusion product guidance states that Follower can sequence text line by
 * line, word by word, or character by character. This translator only derives deterministic
 * expected values; it does not claim that the live Resolve parameter binding has been verified.
 */
export function buildTypeOnRhythmDaVinciTranslatorSpec(
  input: TypeOnRhythmDaVinciTranslatorInput,
) {
  requirePositiveFps(input.fps);
  const strength = intensityScale[input.intensity];

  // Keep aligned with TypographyRevealEngine(mode="word-stagger"):
  // perWordDelay = fps * 0.22, wordDuration = fps * 0.32,
  // translateY = 30 * strength, opacity 0→1, Easing.out(Easing.cubic).
  const perWordDelaySeconds = 0.22;
  const wordDurationSeconds = 0.32;
  const translateYPixels = Number((30 * strength).toFixed(3));
  const perWordDelayFrames = secondsToFrames(perWordDelaySeconds, input.fps);
  const wordDurationFrames = secondsToFrames(wordDurationSeconds, input.fps);
  const words = input.text.split(" ");
  const wordCount = words.length;
  const totalRippleFrames =
    wordCount <= 1
      ? wordDurationFrames
      : (wordCount - 1) * perWordDelayFrames + wordDurationFrames;

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-type-on-rhythm" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "word-stagger" as const,
      splitStrategy: "SPACE_DELIMITED_MATCH_CANONICAL" as const,
      perWordDelaySeconds,
      wordDurationSeconds,
      translateYPixels,
      opacityFrom: 0,
      opacityTo: 1,
      easing: "EASE_OUT_CUBIC" as const,
    },
    implementation: {
      implementationId: "impl-type-type-on-rhythm-davinci-text-plus-follower-words" as const,
      target: "FUSION_TEXT_PLUS_FOLLOWER_WORDS" as const,
      tools: ["Text+", "Follower", "Keyframe", "Spline"] as const,
      text: input.text,
      words,
      color: input.color,
      intensity: input.intensity,
      fps: input.fps,
      follower: {
        range: "ALL_WORDS" as const,
        unit: "WORDS" as const,
        order: "LEFT_TO_RIGHT" as const,
        delayType: "BETWEEN_EACH_WORD" as const,
        delayFrames: perWordDelayFrames,
      },
      animation: {
        startFrame: 0,
        endFrame: wordDurationFrames,
        translateY: { fromPixels: translateYPixels, toPixels: 0 },
        opacity: { from: 0, to: 1 },
        easing: "EASE_OUT_CUBIC" as const,
      },
      expectedRipple: {
        wordCount,
        totalRippleFrames,
        totalRippleSeconds: Number((totalRippleFrames / input.fps).toFixed(3)),
      },
    },
    evidence: {
      sourceClass: "BLACKMAGIC_OFFICIAL_PRODUCT_GUIDANCE" as const,
      followerCapability: "Follower supports sequential text animation line-by-line, word-by-word, or character-by-character" as const,
      runtimeApplyState: "NOT_RUN" as const,
      runtimeReadbackState: "NOT_RUN" as const,
      renderParityState: "NOT_RUN" as const,
      liveParameterBindingState: "NOT_VERIFIED" as const,
    },
    guardrails: [
      "OFFICIAL_WORD_LEVEL_CAPABILITY != LIVE_PARAMETER_BINDING_VERIFIED",
      "TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED",
      "EXPECTED_VALUES != RENDER_PARITY_VERIFIED",
      "WORD_LEVEL_REVEAL != PALMIER_TIMELINE_PLACEMENT",
    ] as const,
  };
}
