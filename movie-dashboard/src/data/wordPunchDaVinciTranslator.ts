export type WordPunchMotionIntensity = "S" | "M" | "L";

export interface WordPunchDaVinciTranslatorInput {
  text: string;
  intensity: WordPunchMotionIntensity;
  color: string;
  fps: number;
}

const intensityScale: Record<WordPunchMotionIntensity, number> = { S: 0.55, M: 0.8, L: 1 };

function requirePositiveFps(fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
}

/**
 * Canonical TypographyRevealEngine(mode="punch") -> Resolve/Fusion translation spec.
 * This is intentionally a whole-title transform, not a Follower: the canonical motion scales the
 * complete rendered title from 1 + 0.18*strength to 1 while opacity rises 0 -> 1 over 0.5s.
 * Blackmagic documents Text+ title animation and Fusion transform/keyframe workflows, but the live
 * tool/input names must still be discovered and read back on the target Resolve build.
 */
export function buildWordPunchDaVinciTranslatorSpec(input: WordPunchDaVinciTranslatorInput) {
  requirePositiveFps(input.fps);
  const strength = intensityScale[input.intensity];
  const durationSeconds = 0.5;
  const durationFrames = Math.max(1, Math.round(input.fps * durationSeconds));
  const scaleFrom = Number((1 + 0.18 * strength).toFixed(6));

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-word-punch" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "punch" as const,
      durationSeconds,
      scaleFrom,
      scaleTo: 1,
      opacityFrom: 0,
      opacityTo: 1,
      easing: "EASE_OUT_CUBIC" as const,
    },
    implementation: {
      implementationId: "impl-type-word-punch-davinci-text-plus-transform" as const,
      target: "FUSION_TEXT_PLUS_TRANSFORM" as const,
      tools: ["Text+", "Transform", "Keyframe", "Spline"] as const,
      text: input.text,
      color: input.color,
      intensity: input.intensity,
      fps: input.fps,
      animation: {
        startFrame: 0,
        endFrame: durationFrames,
        scale: { from: scaleFrom, to: 1 },
        opacity: { from: 0, to: 1 },
        easing: "EASE_OUT_CUBIC" as const,
      },
    },
    evidence: {
      sourceClass: "BLACKMAGIC_OFFICIAL_PRODUCT_GUIDANCE" as const,
      capability: "Fusion supports Text+ title animation, transform tools, keyframes and spline refinement" as const,
      runtimeApplyState: "NOT_RUN" as const,
      runtimeReadbackState: "NOT_RUN" as const,
      liveParameterBindingState: "NOT_VERIFIED" as const,
      renderParityState: "NOT_RUN" as const,
    },
    guardrails: [
      "WHOLE_TITLE_PUNCH != FOLLOWER_ANIMATION",
      "TRANSLATOR_SPEC_IMPLEMENTED != LIVE_TRANSFORM_BINDING_VERIFIED",
      "OFFICIAL_TRANSFORM_CAPABILITY != PARAMETER_NAMES_RUNTIME_VERIFIED",
      "EXPECTED_VALUES != RENDER_PARITY_VERIFIED",
    ] as const,
  };
}
