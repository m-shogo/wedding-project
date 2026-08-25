import {
  resolveMaskRevealEditableIntent,
  type MaskRevealEditableIntent,
  type MaskRevealSection,
  type PositionPreset,
} from "./humanEditableMotionIntent";

export type LayerDelayPreset = "IMMEDIATE" | "SHORT_WAIT" | "PHOTO_FIRST";
export type PresetMatch<T extends string> = T | "CUSTOM";

export interface DaVinciProjectContext {
  fps: number;
  width: number;
  height: number;
}

export const MASK_REVEAL_VERTICAL_SLICE_CONTEXT: DaVinciProjectContext = {
  fps: 30,
  width: 1280,
  height: 720,
};

export const layerDelayPresetOptions: ReadonlyArray<{ id: LayerDelayPreset; label: string }> = [
  { id: "IMMEDIATE", label: "すぐ" },
  { id: "SHORT_WAIT", label: "少し待ってから" },
  { id: "PHOTO_FIRST", label: "写真をしっかり見せてから" },
];

const positionMap: Record<PositionPreset, { label: string; xPercent: number; yPercent: number }> = {
  TOP_LEFT: { label: "左上", xPercent: 20, yPercent: 22 },
  TOP: { label: "上", xPercent: 50, yPercent: 22 },
  TOP_RIGHT: { label: "右上", xPercent: 80, yPercent: 22 },
  LEFT: { label: "左", xPercent: 20, yPercent: 50 },
  CENTER: { label: "中央", xPercent: 50, yPercent: 50 },
  RIGHT: { label: "右", xPercent: 80, yPercent: 50 },
  BOTTOM_LEFT: { label: "左下", xPercent: 20, yPercent: 78 },
  BOTTOM: { label: "下", xPercent: 50, yPercent: 78 },
  BOTTOM_RIGHT: { label: "右下", xPercent: 80, yPercent: 78 },
};

export const positionPresetOptions = (Object.entries(positionMap) as Array<[PositionPreset, (typeof positionMap)[PositionPreset]]>).map(([id, value]) => ({
  id,
  label: value.label,
}));

function isProfile(section: MaskRevealSection) {
  return section.startsWith("PROFILE_");
}

export function resolveLayerDelayPreset(preset: LayerDelayPreset, section: MaskRevealSection) {
  const profile = isProfile(section);
  if (preset === "IMMEDIATE") return 0;
  if (preset === "SHORT_WAIT") return profile ? 0.8 : 0.6;
  return profile ? 1.4 : 1.1;
}

export function detectLayerDelayPreset(intent: MaskRevealEditableIntent): PresetMatch<LayerDelayPreset> {
  const value = resolveMaskRevealEditableIntent(intent).layerDelaySeconds;
  const found = layerDelayPresetOptions.find(({ id }) => Math.abs(resolveLayerDelayPreset(id, intent.section) - value) < 0.001);
  return found?.id ?? "CUSTOM";
}

export function resolvePositionPreset(preset: PositionPreset) {
  const value = positionMap[preset];
  return {
    preset,
    label: value.label,
    xPercent: value.xPercent,
    yPercent: value.yPercent,
    xNormalized: value.xPercent / 100,
    yNormalized: value.yPercent / 100,
  };
}

export function detectPositionPreset(intent: MaskRevealEditableIntent): PresetMatch<PositionPreset> {
  const resolved = resolveMaskRevealEditableIntent(intent);
  const preset = resolvePositionPreset(resolved.positionPreset);
  return Math.abs(preset.xPercent - resolved.positionXPercent) < 0.001 && Math.abs(preset.yPercent - resolved.positionYPercent) < 0.001
    ? resolved.positionPreset
    : "CUSTOM";
}

export function secondsToFrames(seconds: number, fps: number) {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps must be a positive finite number");
  return Math.round(seconds * fps);
}

export function resolveCanonicalMaskRevealState(intent: MaskRevealEditableIntent) {
  const value = resolveMaskRevealEditableIntent(intent);
  return {
    schemaVersion: "mask-reveal-canonical/v1" as const,
    authority: "HUMAN_EDITABLE_CANONICAL" as const,
    patternId: intent.patternId,
    section: intent.section,
    text: value.text,
    mediaLabel: value.mediaLabel,
    timingSeconds: {
      sceneDuration: value.sceneDurationSeconds,
      layerDelay: value.layerDelaySeconds,
      motionDelay: value.motionDelaySeconds,
      enterDuration: value.enterDurationSeconds,
      holdDuration: value.holdDurationSeconds,
      exitDuration: value.exitDurationSeconds,
      staggerDelay: value.staggerDelaySeconds,
    },
    motion: {
      enter: value.enterMotion,
      hold: value.holdMotion,
      exit: value.exitMotion,
      direction: value.direction,
      distanceNormalized: value.distancePercent / 100,
      intensity: value.intensity,
    },
    position: {
      preset: value.positionPreset,
      xNormalized: value.positionXPercent / 100,
      yNormalized: value.positionYPercent / 100,
      offsetXNormalized: value.positionOffsetXPercent / 100,
      offsetYNormalized: value.positionOffsetYPercent / 100,
    },
    scale: {
      from: value.scaleFromPercent / 100,
      to: value.scaleToPercent / 100,
    },
    cropFocus: value.cropFocus,
    presetState: {
      layerDelay: detectLayerDelayPreset(intent),
      position: detectPositionPreset(intent),
    },
  };
}

export function buildMaskRevealDaVinciValueBridge(
  intent: MaskRevealEditableIntent,
  context: DaVinciProjectContext = MASK_REVEAL_VERTICAL_SLICE_CONTEXT,
) {
  const canonical = resolveCanonicalMaskRevealState(intent);
  const frames = (seconds: number) => ({ seconds, resolvedFrames: secondsToFrames(seconds, context.fps) });

  return {
    schemaVersion: "davinci-value-bridge/v1" as const,
    source: "CANONICAL_SCENE_STATE" as const,
    implementationId: intent.davinciImplementation.implementationId,
    projectContext: { ...context },
    timing: {
      sceneDuration: frames(canonical.timingSeconds.sceneDuration),
      layerDelay: frames(canonical.timingSeconds.layerDelay),
      motionDelay: frames(canonical.timingSeconds.motionDelay),
      enterDuration: frames(canonical.timingSeconds.enterDuration),
      holdDuration: frames(canonical.timingSeconds.holdDuration),
      exitDuration: frames(canonical.timingSeconds.exitDuration),
      staggerDelay: frames(canonical.timingSeconds.staggerDelay),
    },
    position: {
      xNormalized: canonical.position.xNormalized,
      yNormalized: canonical.position.yNormalized,
      offsetXNormalized: canonical.position.offsetXNormalized,
      offsetYNormalized: canonical.position.offsetYNormalized,
    },
    motion: {
      direction: canonical.motion.direction,
      distanceNormalized: canonical.motion.distanceNormalized,
      intensity: canonical.motion.intensity,
    },
    scale: canonical.scale,
    tools: intent.davinciImplementation.tools,
    rule: "Preset labelからDaVinci値へ直接飛ばさない。Human UI → Canonical scene state → Project Context → DaVinci implementation value の順で導出する。",
  };
}
