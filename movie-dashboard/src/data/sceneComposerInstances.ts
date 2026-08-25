import {
  applyAiSuggestion,
  applyHumanSelection,
  resolveMaskRevealEditableIntent,
  retargetMaskRevealSection,
  setEditableFieldLock,
  type MaskRevealEditableFieldKey,
  type MaskRevealEditableFields,
  type MaskRevealEditableIntent,
  type MaskRevealSection,
} from "./humanEditableMotionIntent";

export type ScenePrimarySubject = "MEDIA" | "TEXT" | "MULTI_MEDIA" | "TRANSITION" | "MOMENT";
export type SceneInstanceStatus = "ADOPTED" | "REVIEW" | "LOCKED";

export interface MotionZukanSceneInstance {
  schemaVersion: "motion-zukan-scene-instance/v1";
  sceneInstanceId: string;
  projectId: "opening" | "profile";
  legacySceneId: string | null;
  title: string;
  primarySubject: ScenePrimarySubject;
  secondarySubject: "TEXT" | "MEDIA" | null;
  patternIds: readonly ["type-mask-reveal"];
  sourceRecipeId: string | null;
  targetDurationSeconds: number;
  computedDurationSeconds: number;
  durationDeltaSeconds: number;
  editableIntent: MaskRevealEditableIntent;
  authority: "HUMAN_MASTER";
  status: SceneInstanceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MotionZukanProjectTimeline {
  schemaVersion: "motion-zukan-project-timeline/v1";
  projectId: "opening" | "profile";
  orderedSceneInstanceIds: string[];
  totalComputedDurationSeconds: number;
}

export interface MotionZukanComposerState {
  schemaVersion: "motion-zukan-composer-state/v1";
  scenes: MotionZukanSceneInstance[];
  timelines: MotionZukanProjectTimeline[];
}

export const MOTION_ZUKAN_COMPOSER_STORAGE_KEY = "motion-zukan-composer-state-v1";

function projectIdFor(section: MaskRevealSection): "opening" | "profile" {
  return section.startsWith("PROFILE_") ? "profile" : "opening";
}

function round1(value: number) {
  return Number(value.toFixed(1));
}

export function computeMaskRevealSceneDuration(intent: MaskRevealEditableIntent) {
  const value = resolveMaskRevealEditableIntent(intent);
  const textEnd =
    value.layerDelaySeconds +
    value.motionDelaySeconds +
    value.enterDurationSeconds +
    value.holdDurationSeconds +
    value.exitDurationSeconds;

  // The media layer is visible for the user's target Scene Duration.
  // If text timing runs longer, computed structural duration exposes that conflict.
  const computedDurationSeconds = round1(Math.max(value.sceneDurationSeconds, textEnd));
  return {
    targetDurationSeconds: round1(value.sceneDurationSeconds),
    computedDurationSeconds,
    durationDeltaSeconds: round1(computedDurationSeconds - value.sceneDurationSeconds),
    textEndSeconds: round1(textEnd),
  };
}

function cloneIntent(intent: MaskRevealEditableIntent): MaskRevealEditableIntent {
  return structuredClone(intent);
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `mz-scene-${crypto.randomUUID()}`;
  return `mz-scene-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isoNow() {
  return new Date().toISOString();
}

function sceneStatusForIntent(intent: MaskRevealEditableIntent): SceneInstanceStatus {
  return Object.values(intent.fields).some((field) => field.locked) ? "LOCKED" : "ADOPTED";
}

export function createMaskRevealSceneInstance(
  intent: MaskRevealEditableIntent,
  options: { sceneInstanceId?: string; now?: string; title?: string } = {},
): MotionZukanSceneInstance {
  const resolved = resolveMaskRevealEditableIntent(intent);
  const timing = computeMaskRevealSceneDuration(intent);
  const now = options.now ?? isoNow();
  return {
    schemaVersion: "motion-zukan-scene-instance/v1",
    sceneInstanceId: options.sceneInstanceId ?? createId(),
    projectId: projectIdFor(intent.section),
    legacySceneId: null,
    title: options.title ?? `${resolved.text} / Mask Reveal`,
    primarySubject: "MEDIA",
    secondarySubject: "TEXT",
    patternIds: ["type-mask-reveal"],
    sourceRecipeId: null,
    ...timing,
    editableIntent: cloneIntent(intent),
    authority: "HUMAN_MASTER",
    status: sceneStatusForIntent(intent),
    createdAt: now,
    updatedAt: now,
  };
}

export function emptyMotionZukanComposerState(): MotionZukanComposerState {
  return {
    schemaVersion: "motion-zukan-composer-state/v1",
    scenes: [],
    timelines: [
      {
        schemaVersion: "motion-zukan-project-timeline/v1",
        projectId: "opening",
        orderedSceneInstanceIds: [],
        totalComputedDurationSeconds: 0,
      },
      {
        schemaVersion: "motion-zukan-project-timeline/v1",
        projectId: "profile",
        orderedSceneInstanceIds: [],
        totalComputedDurationSeconds: 0,
      },
    ],
  };
}

function recalculateTimeline(state: MotionZukanComposerState, projectId: "opening" | "profile") {
  const existing = state.timelines.find((timeline) => timeline.projectId === projectId);
  const orderedSceneInstanceIds = existing?.orderedSceneInstanceIds.filter((id) =>
    state.scenes.some((scene) => scene.sceneInstanceId === id && scene.projectId === projectId),
  ) ?? [];
  const totalComputedDurationSeconds = round1(
    orderedSceneInstanceIds.reduce((sum, id) => {
      const scene = state.scenes.find((item) => item.sceneInstanceId === id);
      return sum + (scene?.computedDurationSeconds ?? 0);
    }, 0),
  );
  const next: MotionZukanProjectTimeline = {
    schemaVersion: "motion-zukan-project-timeline/v1",
    projectId,
    orderedSceneInstanceIds,
    totalComputedDurationSeconds,
  };
  return [...state.timelines.filter((timeline) => timeline.projectId !== projectId), next];
}

function recalculateAllTimelines(state: MotionZukanComposerState): MotionZukanComposerState {
  let next = { ...state, timelines: recalculateTimeline(state, "opening") };
  next = { ...next, timelines: recalculateTimeline(next, "profile") };
  return next;
}

export function adoptSceneInstance(
  state: MotionZukanComposerState,
  scene: MotionZukanSceneInstance,
): MotionZukanComposerState {
  const withoutDuplicate = state.scenes.filter((item) => item.sceneInstanceId !== scene.sceneInstanceId);
  const existingTimeline = state.timelines.find((timeline) => timeline.projectId === scene.projectId);
  const alreadyOrdered = existingTimeline?.orderedSceneInstanceIds.includes(scene.sceneInstanceId) ?? false;
  const timelines = state.timelines.map((timeline) =>
    timeline.projectId === scene.projectId && !alreadyOrdered
      ? { ...timeline, orderedSceneInstanceIds: [...timeline.orderedSceneInstanceIds, scene.sceneInstanceId] }
      : timeline,
  );
  return recalculateAllTimelines({ ...state, scenes: [...withoutDuplicate, scene], timelines });
}

export function removeSceneInstance(state: MotionZukanComposerState, sceneInstanceId: string) {
  const scenes = state.scenes.filter((scene) => scene.sceneInstanceId !== sceneInstanceId);
  const timelines = state.timelines.map((timeline) => ({
    ...timeline,
    orderedSceneInstanceIds: timeline.orderedSceneInstanceIds.filter((id) => id !== sceneInstanceId),
  }));
  return recalculateAllTimelines({ ...state, scenes, timelines });
}

function replaceScene(
  state: MotionZukanComposerState,
  sceneInstanceId: string,
  updater: (scene: MotionZukanSceneInstance) => MotionZukanSceneInstance,
) {
  const scenes = state.scenes.map((scene) => (scene.sceneInstanceId === sceneInstanceId ? updater(scene) : scene));
  return recalculateAllTimelines({ ...state, scenes });
}

export function updateSceneInstanceField<K extends MaskRevealEditableFieldKey>(
  state: MotionZukanComposerState,
  sceneInstanceId: string,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  now = isoNow(),
): MotionZukanComposerState {
  return replaceScene(state, sceneInstanceId, (scene) => {
    // Property-local correction: only the requested human-readable field is selected.
    // Text / Crop / Timing / Motion siblings are not regenerated.
    const editableIntent = applyHumanSelection(scene.editableIntent, key, value);
    const timing = computeMaskRevealSceneDuration(editableIntent);
    const resolved = resolveMaskRevealEditableIntent(editableIntent);
    return {
      ...scene,
      title: key === "text" ? `${resolved.text} / Mask Reveal` : scene.title,
      ...timing,
      editableIntent,
      status: sceneStatusForIntent(editableIntent),
      updatedAt: now,
    };
  });
}

export function updateSceneInstanceFieldLock(
  state: MotionZukanComposerState,
  sceneInstanceId: string,
  key: MaskRevealEditableFieldKey,
  locked: boolean,
  now = isoNow(),
) {
  return replaceScene(state, sceneInstanceId, (scene) => {
    const editableIntent = setEditableFieldLock(scene.editableIntent, key, locked);
    return {
      ...scene,
      editableIntent,
      status: sceneStatusForIntent(editableIntent),
      updatedAt: now,
    };
  });
}

export function suggestSceneInstanceField<K extends MaskRevealEditableFieldKey>(
  state: MotionZukanComposerState,
  sceneInstanceId: string,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  reason: string,
  now = isoNow(),
) {
  return replaceScene(state, sceneInstanceId, (scene) => {
    // AI suggestion may change only the suggestion layer. Human selection stays effective;
    // locked values cause applyAiSuggestion to no-op.
    const editableIntent = applyAiSuggestion(scene.editableIntent, key, value, reason);
    return { ...scene, editableIntent, status: sceneStatusForIntent(editableIntent), updatedAt: now };
  });
}

export function retargetSceneInstanceSection(
  state: MotionZukanComposerState,
  sceneInstanceId: string,
  section: MaskRevealSection,
  now = isoNow(),
) {
  const original = state.scenes.find((scene) => scene.sceneInstanceId === sceneInstanceId);
  if (!original) return state;
  const oldProjectId = original.projectId;
  const nextProjectId = projectIdFor(section);
  const moved = replaceScene(state, sceneInstanceId, (scene) => {
    const editableIntent = retargetMaskRevealSection(scene.editableIntent, section);
    return {
      ...scene,
      projectId: nextProjectId,
      editableIntent,
      ...computeMaskRevealSceneDuration(editableIntent),
      status: sceneStatusForIntent(editableIntent),
      updatedAt: now,
    };
  });
  if (oldProjectId === nextProjectId) return moved;

  const timelines = moved.timelines.map((timeline) => {
    const without = timeline.orderedSceneInstanceIds.filter((id) => id !== sceneInstanceId);
    return timeline.projectId === nextProjectId
      ? { ...timeline, orderedSceneInstanceIds: [...without, sceneInstanceId] }
      : { ...timeline, orderedSceneInstanceIds: without };
  });
  return recalculateAllTimelines({ ...moved, timelines });
}

export function loadMotionZukanComposerState(): MotionZukanComposerState {
  if (typeof localStorage === "undefined") return emptyMotionZukanComposerState();
  try {
    const raw = localStorage.getItem(MOTION_ZUKAN_COMPOSER_STORAGE_KEY);
    if (!raw) return emptyMotionZukanComposerState();
    const parsed = JSON.parse(raw) as MotionZukanComposerState;
    if (parsed.schemaVersion !== "motion-zukan-composer-state/v1" || !Array.isArray(parsed.scenes) || !Array.isArray(parsed.timelines)) {
      return emptyMotionZukanComposerState();
    }
    return recalculateAllTimelines(parsed);
  } catch {
    return emptyMotionZukanComposerState();
  }
}

export function saveMotionZukanComposerState(state: MotionZukanComposerState) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(MOTION_ZUKAN_COMPOSER_STORAGE_KEY, JSON.stringify(state));
}
