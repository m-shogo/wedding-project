export type TypographyMotionIntensity = "S" | "M" | "L";

export interface CharStaggerDaVinciTranslatorInput {
  text: string;
  intensity: TypographyMotionIntensity;
  color: string;
  fps: number;
}

const intensityScale: Record<TypographyMotionIntensity, number> = {
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
 * Canonical TypographyRevealEngine(mode="stagger") → DaVinci Fusion Text+ Follower translation.
 *
 * Blackmagic's official Fusion guidance describes Follower as the Text+ modifier for sequential
 * character animation, with a configurable delay between characters and keyframable transform/
 * styling values. This function does not touch Resolve; it produces the deterministic values an
 * Actual agent/human must apply and read back before the route can be called verified.
 */
export function buildCharStaggerDaVinciTranslatorSpec(
  input: CharStaggerDaVinciTranslatorInput,
) {
  requirePositiveFps(input.fps);
  const strength = intensityScale[input.intensity];

  // Keep these constants aligned with TypographyRevealEngine's canonical stagger mode:
  // perCharDelay = fps * 0.06, charDuration = fps * 0.28, translateY = 40 * strength.
  const perCharacterDelaySeconds = 0.06;
  const characterDurationSeconds = 0.28;
  const translateYPixels = Number((40 * strength).toFixed(3));
  const perCharacterDelayFrames = secondsToFrames(perCharacterDelaySeconds, input.fps);
  const characterDurationFrames = secondsToFrames(characterDurationSeconds, input.fps);
  const visibleCharacters = Array.from(input.text).length;
  const totalRippleFrames =
    visibleCharacters <= 1
      ? characterDurationFrames
      : (visibleCharacters - 1) * perCharacterDelayFrames + characterDurationFrames;

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-char-stagger" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "stagger" as const,
      perCharacterDelaySeconds,
      characterDurationSeconds,
      translateYPixels,
      opacityFrom: 0,
      opacityTo: 1,
      easing: "EASE_OUT_CUBIC" as const,
    },
    implementation: {
      implementationId: "impl-type-char-stagger-davinci-text-plus-follower" as const,
      target: "FUSION_TEXT_PLUS_FOLLOWER" as const,
      tools: ["Text+", "Follower", "Keyframe", "Spline"] as const,
      text: input.text,
      color: input.color,
      intensity: input.intensity,
      fps: input.fps,
      follower: {
        range: "ALL_CHARACTERS" as const,
        order: "LEFT_TO_RIGHT" as const,
        delayType: "BETWEEN_EACH_CHARACTER" as const,
        delayFrames: perCharacterDelayFrames,
      },
      animation: {
        startFrame: 0,
        endFrame: characterDurationFrames,
        translateY: { fromPixels: translateYPixels, toPixels: 0 },
        opacity: { from: 0, to: 1 },
        easing: "EASE_OUT_CUBIC" as const,
      },
      expectedRipple: {
        characterCount: visibleCharacters,
        totalRippleFrames,
        totalRippleSeconds: Number((totalRippleFrames / input.fps).toFixed(3)),
      },
    },
    evidence: {
      sourceClass: "BLACKMAGIC_OFFICIAL_GUIDANCE" as const,
      followerCapability: "Text+ Follower supports sequential character animation with delay" as const,
      runtimeApplyState: "NOT_RUN" as const,
      runtimeReadbackState: "NOT_RUN" as const,
      renderParityState: "NOT_RUN" as const,
    },
    guardrails: [
      "TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED",
      "FOLLOWER_CAPABILITY_DOCUMENTED != PARAMETER_NAMES_RUNTIME_VERIFIED",
      "EXPECTED_VALUES != RENDER_PARITY_VERIFIED",
    ] as const,
  };
}
