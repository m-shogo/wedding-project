import {
  getEditableDecisionState,
  listHumanSelectedMaskRevealFields,
  listLockedMaskRevealFields,
  resolveMaskRevealEditableIntent,
  type MaskRevealEditableFieldKey,
  type MaskRevealEditableIntent,
} from "./humanEditableMotionIntent";
import { buildMaskRevealMotionHandoffManifest } from "./maskRevealHandoff";
import { buildMaskRevealPromptOutputs, type MotionPromptOutputs } from "./visualMotionLibrary";

export interface MaskRevealEditableProductionOutputs extends MotionPromptOutputs {
  editableSourceOfTruthJson: string;
  motionHandoffJson: string;
}

function readableFieldName(key: MaskRevealEditableFieldKey) {
  const labels: Record<MaskRevealEditableFieldKey, string> = {
    text: "Text",
    mediaLabel: "Image / Video",
    sceneDurationSeconds: "Scene Duration",
    layerDelaySeconds: "Layer Delay",
    motionDelaySeconds: "Motion Delay",
    enterMotion: "Enter Motion",
    enterDurationSeconds: "Motion Duration",
    holdMotion: "Hold Motion",
    holdDurationSeconds: "Hold",
    exitMotion: "Exit Motion",
    exitDurationSeconds: "Exit Duration",
    staggerDelaySeconds: "Stagger Delay",
    positionPreset: "Position",
    positionXPercent: "Position X",
    positionYPercent: "Position Y",
    positionOffsetXPercent: "Position Offset X",
    positionOffsetYPercent: "Position Offset Y",
    direction: "Direction",
    distancePercent: "Distance",
    scaleFromPercent: "Scale From",
    scaleToPercent: "Scale To",
    cropFocus: "Crop / Focus",
    intensity: "Intensity",
  };
  return labels[key];
}

function formatValue(value: unknown) {
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(1);
  return String(value);
}

export function buildMaskRevealEditableSourceOfTruth(intent: MaskRevealEditableIntent) {
  const resolved = resolveMaskRevealEditableIntent(intent);
  const fields = Object.fromEntries(
    (Object.keys(intent.fields) as MaskRevealEditableFieldKey[]).map((key) => {
      const field = intent.fields[key];
      return [
        key,
        {
          label: readableFieldName(key),
          state: getEditableDecisionState(field),
          default: field.defaultValue,
          aiSuggested: field.aiSuggestedValue,
          aiReason: field.aiReason,
          humanSelected: field.humanSelectedValue,
          locked: field.locked,
          effective: resolved[key],
        },
      ];
    }),
  );

  return {
    schemaVersion: "human-editable-motion/v1" as const,
    authority: "HUMAN_MASTER" as const,
    patternId: intent.patternId,
    section: intent.section,
    rule: "HUMAN_SELECTED / LOCKED must never be silently overwritten by Claude, Codex, Palmier, automation, preset updates, or DaVinci handoff generation.",
    fields,
    implementation: intent.davinciImplementation,
  };
}

export function buildMaskRevealEditableProductionOutputs(intent: MaskRevealEditableIntent): MaskRevealEditableProductionOutputs {
  const resolved = resolveMaskRevealEditableIntent(intent);
  const legacyInput = {
    text: resolved.text,
    mediaLabel: resolved.mediaLabel,
    section: intent.section,
    intensity: resolved.intensity,
    durationSeconds: resolved.enterDurationSeconds,
  } as const;
  const base = buildMaskRevealPromptOutputs(legacyInput);
  const sourceOfTruth = buildMaskRevealEditableSourceOfTruth(intent);
  const legacyHandoff = buildMaskRevealMotionHandoffManifest(legacyInput);
  const lockedKeys = listLockedMaskRevealFields(intent);
  const humanSelectedKeys = listHumanSelectedMaskRevealFields(intent);

  const lockedLines = lockedKeys.length
    ? lockedKeys.map((key) => `- ${readableFieldName(key)}: ${formatValue(sourceOfTruth.fields[key].effective)}`)
    : ["- none"];
  const humanLines = humanSelectedKeys.length
    ? humanSelectedKeys.map((key) => `- ${readableFieldName(key)}: ${formatValue(sourceOfTruth.fields[key].effective)}`)
    : ["- none yet"];

  const humanBrief = [
    `${intent.section} / Mask Reveal`,
    `Scene Duration: ${resolved.sceneDurationSeconds.toFixed(1)} sec`,
    `Text: ${resolved.text}`,
    `Layer Delay: ${resolved.layerDelaySeconds.toFixed(1)} sec`,
    `Motion Delay: ${resolved.motionDelaySeconds.toFixed(1)} sec`,
    `Enter: ${resolved.enterMotion} / ${resolved.enterDurationSeconds.toFixed(1)} sec / ${resolved.direction}`,
    `Hold: ${resolved.holdDurationSeconds.toFixed(1)} sec`,
    `Exit: ${resolved.exitMotion} / ${resolved.exitDurationSeconds.toFixed(1)} sec`,
    `Position: ${resolved.positionPreset} (X ${resolved.positionXPercent}% / Y ${resolved.positionYPercent}%)`,
    `Offset: X ${resolved.positionOffsetXPercent}% / Y ${resolved.positionOffsetYPercent}%`,
    `Distance: ${resolved.distancePercent}%`,
    `Scale: ${resolved.scaleFromPercent}% → ${resolved.scaleToPercent}%`,
    `Crop / Focus: ${resolved.cropFocus}`,
    `Intensity: ${resolved.intensity}`,
    "人間が1項目だけ変更した場合、無関係なText / Crop / Timing / Motionを再生成しない。",
  ].join("\n");

  const claudeCreativeInstruction = [
    "HUMAN MASTER AUTHORITY",
    "HUMAN_SELECTED / LOCKED values override AI suggestions and must not be silently changed.",
    "",
    "HUMAN LOCKED",
    ...lockedLines,
    "",
    "HUMAN SELECTED",
    ...humanLines,
    "",
    "EFFECTIVE EDITABLE INTENT",
    humanBrief,
    "",
    "AI MAY ADJUST",
    "- exact easing only when not locked",
    "- sub-frame keyframe timing only when it does not change the human-readable timing intent",
    "- minor crop only within the selected Crop / Focus rule and only when media/crop is not locked",
    "",
    "If a locked value makes the scene invalid, report the conflict. Do not replace it.",
    "Use exactly the registered pattern type-mask-reveal; do not invent a substitute effect.",
  ].join("\n");

  const palmierInstruction = [
    "PALMIER ROUGH / HUMAN MASTER AUTHORITY",
    `Scene Duration: ${resolved.sceneDurationSeconds.toFixed(1)} sec`,
    `Media: ${resolved.mediaLabel}`,
    `Text: ${resolved.text}`,
    `Layer Delay: ${resolved.layerDelaySeconds.toFixed(1)} sec`,
    `Reserved Enter Duration: ${resolved.enterDurationSeconds.toFixed(1)} sec`,
    `Hold: ${resolved.holdDurationSeconds.toFixed(1)} sec`,
    `Position intent: ${resolved.positionPreset} / X ${resolved.positionXPercent}% / Y ${resolved.positionYPercent}%`,
    `Direction: ${resolved.direction}`,
    "Do not bake a substitute effect when exact Mask Reveal is unavailable.",
    "Preserve locked/human-selected intent in the sidecar manifest for DaVinci finishing.",
    "If Palmier applies an approximation, record intended value, applied value, and delta instead of erasing the intent.",
  ].join("\n");

  const davinciFinishManifest = [
    "DAVINCI FINAL / HUMAN MASTER AUTHORITY",
    `Implementation: ${intent.davinciImplementation.implementationId}`,
    `Text: ${resolved.text}`,
    `Scene Duration: ${resolved.sceneDurationSeconds.toFixed(1)} sec`,
    `Layer Delay: ${resolved.layerDelaySeconds.toFixed(1)} sec`,
    `Motion Delay: ${resolved.motionDelaySeconds.toFixed(1)} sec`,
    `Enter: ${resolved.enterMotion} / ${resolved.enterDurationSeconds.toFixed(1)} sec`,
    `Hold: ${resolved.holdDurationSeconds.toFixed(1)} sec`,
    `Exit: ${resolved.exitMotion} / ${resolved.exitDurationSeconds.toFixed(1)} sec`,
    `Position: ${resolved.positionPreset} / X ${resolved.positionXPercent}% / Y ${resolved.positionYPercent}%`,
    `Position Offset: X ${resolved.positionOffsetXPercent}% / Y ${resolved.positionOffsetYPercent}%`,
    `Direction: ${resolved.direction} / Distance ${resolved.distancePercent}%`,
    `Scale: ${resolved.scaleFromPercent}% → ${resolved.scaleToPercent}%`,
    `Intensity: ${resolved.intensity}`,
    "Tools: Text+ / Fusion / Rectangle Mask / Keyframe / Spline",
    "LOCKED values must match the sidecar editable source of truth.",
    "Actual render is implementation evidence, not the source of truth.",
    "Verification required: opened-in-davinci → render-tested → visual-QA → record local Resolve version",
  ].join("\n");

  const machine = {
    schemaVersion: "mask-reveal-production/v2",
    authority: "HUMAN_MASTER",
    editableSourceOfTruth: sourceOfTruth,
    resolved,
    palmier: {
      capability: "PALMIER_TIMING_ONLY",
      intended: resolved,
      applied: null,
      delta: null,
    },
    davinci: {
      implementationId: intent.davinciImplementation.implementationId,
      lockedFields: lockedKeys,
      adjustableOnlyWhenUnlocked: ["exactEasing", "subFrameTiming", "minorCropWithinFocusRule"],
    },
  } as const;

  const handoff = {
    ...legacyHandoff,
    schemaVersion: "motion-handoff/v2-human-editable",
    authority: "HUMAN_MASTER",
    editableSourceOfTruth: sourceOfTruth,
    resolvedEditableIntent: resolved,
    palmierDeltaEvidence: {
      humanDecision: resolved,
      appliedValue: null,
      difference: null,
      rule: "Populate appliedValue/difference only from actual Palmier output; never overwrite humanDecision.",
    },
  };

  return {
    ...base,
    humanBrief,
    claudeCreativeInstruction,
    palmierInstruction,
    davinciFinishManifest,
    machineJson: JSON.stringify(machine, null, 2),
    editableSourceOfTruthJson: JSON.stringify(sourceOfTruth, null, 2),
    motionHandoffJson: JSON.stringify(handoff, null, 2),
  };
}
