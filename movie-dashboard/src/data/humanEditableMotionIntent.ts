export type EditableDecisionState = "DEFAULT" | "AI_SUGGESTED" | "HUMAN_SELECTED" | "LOCKED";

export interface EditableValue<T> {
  defaultValue: T;
  aiSuggestedValue: T | null;
  aiReason: string | null;
  humanSelectedValue: T | null;
  locked: boolean;
}

export type MaskRevealSection = "OPENING_INTRO" | "OPENING_CHORUS" | "PROFILE_CHAPTER" | "PROFILE_COUPLE_STORY";
export type MaskRevealIntensity = "S" | "M" | "L";
export type MaskRevealDirection = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type PositionPreset =
  | "TOP_LEFT"
  | "TOP"
  | "TOP_RIGHT"
  | "LEFT"
  | "CENTER"
  | "RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM"
  | "BOTTOM_RIGHT";

export interface MaskRevealEditableFields {
  text: EditableValue<string>;
  mediaLabel: EditableValue<string>;
  sceneDurationSeconds: EditableValue<number>;
  layerDelaySeconds: EditableValue<number>;
  motionDelaySeconds: EditableValue<number>;
  enterMotion: EditableValue<"MASK_REVEAL">;
  enterDurationSeconds: EditableValue<number>;
  holdMotion: EditableValue<"HOLD">;
  holdDurationSeconds: EditableValue<number>;
  exitMotion: EditableValue<"NONE">;
  exitDurationSeconds: EditableValue<number>;
  staggerDelaySeconds: EditableValue<number>;
  positionPreset: EditableValue<PositionPreset>;
  positionXPercent: EditableValue<number>;
  positionYPercent: EditableValue<number>;
  positionOffsetXPercent: EditableValue<number>;
  positionOffsetYPercent: EditableValue<number>;
  direction: EditableValue<MaskRevealDirection>;
  distancePercent: EditableValue<number>;
  scaleFromPercent: EditableValue<number>;
  scaleToPercent: EditableValue<number>;
  cropFocus: EditableValue<"CENTER" | "SUBJECT_SAFE">;
  intensity: EditableValue<MaskRevealIntensity>;
}

export interface MaskRevealEditableIntent {
  schemaVersion: "human-editable-motion/v1";
  patternId: "type-mask-reveal";
  section: MaskRevealSection;
  fields: MaskRevealEditableFields;
  davinciImplementation: {
    implementationId: "impl-type-mask-reveal-davinci-text-plus";
    easyLabel: "下からスッと文字が出る";
    detailLabel: "Mask Reveal / Ease Out";
    tools: readonly ["Text+", "Fusion", "Rectangle Mask", "Keyframe", "Spline"];
  };
}

function editable<T>(defaultValue: T, aiSuggestedValue: T | null = null, aiReason: string | null = null): EditableValue<T> {
  return { defaultValue, aiSuggestedValue, aiReason, humanSelectedValue: null, locked: false };
}

export function resolveEditableValue<T>(value: EditableValue<T>): T {
  return value.humanSelectedValue ?? value.aiSuggestedValue ?? value.defaultValue;
}

export function getEditableDecisionState<T>(value: EditableValue<T>): EditableDecisionState {
  if (value.locked) return "LOCKED";
  if (value.humanSelectedValue !== null) return "HUMAN_SELECTED";
  if (value.aiSuggestedValue !== null) return "AI_SUGGESTED";
  return "DEFAULT";
}

export function createDefaultMaskRevealEditableIntent(section: MaskRevealSection = "OPENING_INTRO"): MaskRevealEditableIntent {
  const profile = section.startsWith("PROFILE_");
  const sceneDuration = profile ? 5 : 4;
  const layerDelay = profile ? 0.8 : 0.6;
  const enterDuration = profile ? 0.7 : 0.6;
  const holdDuration = Number((sceneDuration - layerDelay - enterDuration).toFixed(1));

  return {
    schemaVersion: "human-editable-motion/v1",
    patternId: "type-mask-reveal",
    section,
    fields: {
      text: editable("WELCOME"),
      mediaLabel: editable("Hero Photo"),
      sceneDurationSeconds: editable(4, sceneDuration, profile ? "Profileは文字を読む時間を長めに確保するため。" : "Opening introは4秒でテンポを保つため。"),
      layerDelaySeconds: editable(0.6, layerDelay, profile ? "写真を先に見せてから章タイトルを出すため。" : "写真を一瞬先に見せてからタイトルを入れるため。"),
      motionDelaySeconds: editable(0),
      enterMotion: editable("MASK_REVEAL"),
      enterDurationSeconds: editable(0.6, enterDuration, profile ? "Profileでは急がず読みやすく入れるため。" : "Openingではテンポを損なわず自然に見せるため。"),
      holdMotion: editable("HOLD"),
      holdDurationSeconds: editable(2.8, holdDuration, "Scene DurationからDelayとEnterを引いた読み時間。"),
      exitMotion: editable("NONE"),
      exitDurationSeconds: editable(0),
      staggerDelaySeconds: editable(0),
      positionPreset: editable("BOTTOM_RIGHT"),
      positionXPercent: editable(80),
      positionYPercent: editable(78),
      positionOffsetXPercent: editable(0),
      positionOffsetYPercent: editable(0),
      direction: editable("UP"),
      distancePercent: editable(12),
      scaleFromPercent: editable(100),
      scaleToPercent: editable(100),
      cropFocus: editable("SUBJECT_SAFE"),
      intensity: editable("S"),
    },
    davinciImplementation: {
      implementationId: "impl-type-mask-reveal-davinci-text-plus",
      easyLabel: "下からスッと文字が出る",
      detailLabel: "Mask Reveal / Ease Out",
      tools: ["Text+", "Fusion", "Rectangle Mask", "Keyframe", "Spline"],
    },
  };
}

export type MaskRevealEditableFieldKey = keyof MaskRevealEditableFields;

export function applyHumanSelection<K extends MaskRevealEditableFieldKey>(
  intent: MaskRevealEditableIntent,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  lock = false,
): MaskRevealEditableIntent {
  return {
    ...intent,
    fields: {
      ...intent.fields,
      [key]: {
        ...intent.fields[key],
        humanSelectedValue: value,
        locked: lock || intent.fields[key].locked,
      },
    },
  } as MaskRevealEditableIntent;
}

export function setEditableFieldLock<K extends MaskRevealEditableFieldKey>(
  intent: MaskRevealEditableIntent,
  key: K,
  locked: boolean,
): MaskRevealEditableIntent {
  return {
    ...intent,
    fields: {
      ...intent.fields,
      [key]: { ...intent.fields[key], locked },
    },
  };
}

export function applyAiSuggestion<K extends MaskRevealEditableFieldKey>(
  intent: MaskRevealEditableIntent,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  reason: string,
): MaskRevealEditableIntent {
  const current = intent.fields[key];
  if (current.locked) return intent;
  return {
    ...intent,
    fields: {
      ...intent.fields,
      [key]: { ...current, aiSuggestedValue: value, aiReason: reason },
    },
  } as MaskRevealEditableIntent;
}

export function retargetMaskRevealSection(intent: MaskRevealEditableIntent, section: MaskRevealSection): MaskRevealEditableIntent {
  const nextDefaults = createDefaultMaskRevealEditableIntent(section);
  const fields = { ...intent.fields } as MaskRevealEditableFields;

  (Object.keys(fields) as MaskRevealEditableFieldKey[]).forEach((key) => {
    const current = intent.fields[key];
    const next = nextDefaults.fields[key];
    fields[key] = {
      ...current,
      defaultValue: next.defaultValue,
      aiSuggestedValue: current.locked ? current.aiSuggestedValue : next.aiSuggestedValue,
      aiReason: current.locked ? current.aiReason : next.aiReason,
    } as never;
  });

  return { ...intent, section, fields };
}

export function resolveMaskRevealEditableIntent(intent: MaskRevealEditableIntent) {
  const f = intent.fields;
  return {
    text: resolveEditableValue(f.text),
    mediaLabel: resolveEditableValue(f.mediaLabel),
    sceneDurationSeconds: resolveEditableValue(f.sceneDurationSeconds),
    layerDelaySeconds: resolveEditableValue(f.layerDelaySeconds),
    motionDelaySeconds: resolveEditableValue(f.motionDelaySeconds),
    enterMotion: resolveEditableValue(f.enterMotion),
    enterDurationSeconds: resolveEditableValue(f.enterDurationSeconds),
    holdMotion: resolveEditableValue(f.holdMotion),
    holdDurationSeconds: resolveEditableValue(f.holdDurationSeconds),
    exitMotion: resolveEditableValue(f.exitMotion),
    exitDurationSeconds: resolveEditableValue(f.exitDurationSeconds),
    staggerDelaySeconds: resolveEditableValue(f.staggerDelaySeconds),
    positionPreset: resolveEditableValue(f.positionPreset),
    positionXPercent: resolveEditableValue(f.positionXPercent),
    positionYPercent: resolveEditableValue(f.positionYPercent),
    positionOffsetXPercent: resolveEditableValue(f.positionOffsetXPercent),
    positionOffsetYPercent: resolveEditableValue(f.positionOffsetYPercent),
    direction: resolveEditableValue(f.direction),
    distancePercent: resolveEditableValue(f.distancePercent),
    scaleFromPercent: resolveEditableValue(f.scaleFromPercent),
    scaleToPercent: resolveEditableValue(f.scaleToPercent),
    cropFocus: resolveEditableValue(f.cropFocus),
    intensity: resolveEditableValue(f.intensity),
  };
}

export function listLockedMaskRevealFields(intent: MaskRevealEditableIntent) {
  return (Object.keys(intent.fields) as MaskRevealEditableFieldKey[]).filter((key) => intent.fields[key].locked);
}

export function listHumanSelectedMaskRevealFields(intent: MaskRevealEditableIntent) {
  return (Object.keys(intent.fields) as MaskRevealEditableFieldKey[]).filter((key) => intent.fields[key].humanSelectedValue !== null);
}
