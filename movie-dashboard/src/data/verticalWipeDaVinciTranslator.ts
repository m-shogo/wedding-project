export interface VerticalWipeDaVinciTranslatorInput {
  text: string;
  color: string;
  fps: number;
}

function requirePositiveFps(fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
}

/**
 * Canonical TypographyRevealEngine(mode="vertical-wipe") → Fusion mask reveal intent.
 *
 * Remotion reveals the title by animating clip-path top inset from 100% to 0% over 0.5s
 * with cubic-out easing. The title itself stays fully opaque. The translator therefore keeps
 * a normalized visible-region contract and deliberately leaves concrete Fusion mask tool/input
 * names unverified until a real Resolve Actual records them.
 */
export function buildVerticalWipeDaVinciTranslatorSpec(input: VerticalWipeDaVinciTranslatorInput) {
  requirePositiveFps(input.fps);
  const durationSeconds = 0.5;
  const durationFrames = Math.max(1, Math.round(input.fps * durationSeconds));

  return {
    schemaVersion: "davinci-typography-translator/v1" as const,
    patternId: "type-vertical-wipe" as const,
    canonical: {
      engine: "TypographyRevealEngine" as const,
      mode: "vertical-wipe" as const,
      durationSeconds,
      direction: "TOP_TO_BOTTOM" as const,
      topInsetFromNormalized: 1,
      topInsetToNormalized: 0,
      textOpacity: 1,
      easing: "EASE_OUT_CUBIC" as const,
    },
    implementation: {
      implementationId: "impl-type-vertical-wipe-davinci-text-plus-mask" as const,
      target: "FUSION_TEXT_PLUS_MASK_REVEAL" as const,
      tools: ["Text+", "Mask", "Keyframe", "Spline"] as const,
      text: input.text,
      color: input.color,
      fps: input.fps,
      animation: {
        startFrame: 0,
        endFrame: durationFrames,
        direction: "TOP_TO_BOTTOM" as const,
        normalizedTopInset: {from: 1, to: 0},
        textOpacity: 1,
        easing: "EASE_OUT_CUBIC" as const,
      },
      maskBinding: {
        state: "NOT_VERIFIED" as const,
        rule: "Do not invent a Fusion mask tool type, input name, coordinate convention or inversion flag. Record the exact live graph and normalized reveal mapping in a real Mac Resolve Actual.",
      },
    },
    evidence: {
      runtimeApplyState: "NOT_RUN" as const,
      runtimeReadbackState: "NOT_RUN" as const,
      maskBindingState: "NOT_RUN" as const,
      renderParityState: "NOT_RUN" as const,
    },
    guardrails: [
      "TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED",
      "CANONICAL_CLIP_PATH != VERIFIED_FUSION_MASK_BINDING",
      "TOP_TO_BOTTOM_INTENT != LIVE_MASK_COORDINATE_CONVENTION_VERIFIED",
      "EXPECTED_VALUES != RENDER_PARITY_VERIFIED",
    ] as const,
  };
}
