import {
  applyAiSuggestion,
  applyHumanSelection,
  listHumanSelectedMaskRevealFields,
  listLockedMaskRevealFields,
  resolveMaskRevealEditableIntent,
  retargetMaskRevealSection,
  setEditableFieldLock,
  type MaskRevealEditableFieldKey,
  type MaskRevealEditableFields,
  type MaskRevealEditableIntent,
  type MaskRevealSection,
} from "./humanEditableMotionIntent";

export type SceneProjectId = "opening" | "profile";
export type ScenePrimarySubject = "IMAGE" | "TEXT" | "MULTI_IMAGE" | "TRANSITION" | "IMPACT";
export type SceneComplexity = "CALM" | "BALANCED" | "BUSY";
export type SceneInstanceStatus = "ADOPTED" | "LOCKED" | "REVIEW";

export interface MaskRevealSceneRecipe {
  recipeId: "scene-recipe-mask-reveal-hero-v1";
  revision: 1;
  label: "Hero Photo + Mask Reveal";
  patternId: "type-mask-reveal";
  primarySubject: "IMAGE";
  secondarySubject: "TEXT";
  authority: "EDITABLE_DEFAULT_ONLY";
}

export interface MaskRevealSceneInstance {
  schemaVersion: "scene-instance/v1";
  sceneId: string;
  projectId: SceneProjectId;
  legacySceneId: string | null;
  status: SceneInstanceStatus;
  authority: "HUMAN_MASTER";
  recipeProvenance: MaskRevealSceneRecipe;
  primarySubject: ScenePrimarySubject;
  secondarySubject: "TEXT";
  complexity: SceneComplexity;
  editableIntent: MaskRevealEditableIntent;
  targetDurationSeconds: number;
  computedDurationSeconds: number;
  durationDeltaSeconds: number;
  humanSelectedFields: MaskRevealEditableFieldKey[];
  lockedFields: MaskRevealEditableFieldKey[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineScenePlacement {
  sceneId: string;
  startSeconds: number;
  endSeconds: number;
  durationSeconds: number;
}

export interface SceneEdge {
  fromSceneId: string;
  toSceneId: string;
  transition: "HARD_CUT";
}

export interface ProjectTimelineV1 {
  schemaVersion: "project-timeline/v1";
  projectId: SceneProjectId;
  authority: "STRUCTURED_SCENE_TIMELINE";
  sceneIds: string[];
  placements: TimelineScenePlacement[];
  edges: SceneEdge[];
  totalComputedDurationSeconds: number;
}

export interface MotionZukanComposerState {
  schemaVersion: "motion-zukan-composer-state/v1";
  scenes: MaskRevealSceneInstance[];
  timelines: ProjectTimelineV1[];
}

export const MOTION_ZUKAN_COMPOSER_STORAGE_KEY = "motion-zukan-composer-state-v1";
export const MOTION_ZUKAN_COMPOSER_CHANGED_EVENT = "motion-zukan-composer-state-changed";

export const maskRevealHeroSceneRecipe: MaskRevealSceneRecipe = {
  recipeId: "scene-recipe-mask-reveal-hero-v1",
  revision: 1,
  label: "Hero Photo + Mask Reveal",
  patternId: "type-mask-reveal",
  primarySubject: "IMAGE",
  secondarySubject: "TEXT",
  authority: "EDITABLE_DEFAULT_ONLY",
};

function projectIdForSection(section: MaskRevealSection): SceneProjectId {
  return section.startsWith("PROFILE_") ? "profile" : "opening";
}

function cloneEditableIntent(intent: MaskRevealEditableIntent): MaskRevealEditableIntent {
  return structuredClone(intent);
}

function nowIso() {
  return new Date().toISOString();
}

function createSceneId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `mz-scene-${crypto.randomUUID()}`;
  return `mz-scene-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sceneStatus(intent: MaskRevealEditableIntent): SceneInstanceStatus {
  return listLockedMaskRevealFields(intent).length > 0 ? "LOCKED" : "ADOPTED";
}

export function computeMaskRevealSceneDuration(intent: MaskRevealEditableIntent) {
  const value = resolveMaskRevealEditableIntent(intent);
  const textStructuralEnd =
    value.layerDelaySeconds +
    value.motionDelaySeconds +
    value.enterDurationSeconds +
    value.holdDurationSeconds +
    value.exitDurationSeconds;

  // IMAGE/VIDEO remains visible for the human target duration.
  // If text timing runs longer, expose the structural difference instead of silently truncating human choices.
  const computedDurationSeconds = Number(Math.max(value.sceneDurationSeconds, textStructuralEnd).toFixed(3));
  return {
    targetDurationSeconds: Number(value.sceneDurationSeconds.toFixed(3)),
    computedDurationSeconds,
    durationDeltaSeconds: Number((computedDurationSeconds - value.sceneDurationSeconds).toFixed(3)),
    textStructuralEndSeconds: Number(textStructuralEnd.toFixed(3)),
  };
}

function refreshSceneDerivedState(scene: MaskRevealSceneInstance, editableIntent: MaskRevealEditableIntent, updatedAt = nowIso()): MaskRevealSceneInstance {
  return {
    ...scene,
    editableIntent,
    ...computeMaskRevealSceneDuration(editableIntent),
    humanSelectedFields: listHumanSelectedMaskRevealFields(editableIntent),
    lockedFields: listLockedMaskRevealFields(editableIntent),
    status: sceneStatus(editableIntent),
    updatedAt,
  };
}

export function adoptMaskRevealScene(
  sourceIntent: MaskRevealEditableIntent,
  sceneId = createSceneId(),
  recipe: MaskRevealSceneRecipe = maskRevealHeroSceneRecipe,
  createdAt = nowIso(),
): MaskRevealSceneInstance {
  const editableIntent = cloneEditableIntent(sourceIntent);
  const timing = computeMaskRevealSceneDuration(editableIntent);

  return {
    schemaVersion: "scene-instance/v1",
    sceneId,
    projectId: projectIdForSection(editableIntent.section),
    legacySceneId: null,
    status: sceneStatus(editableIntent),
    authority: "HUMAN_MASTER",
    recipeProvenance: { ...recipe },
    primarySubject: recipe.primarySubject,
    secondarySubject: recipe.secondarySubject,
    complexity: "CALM",
    editableIntent,
    ...timing,
    humanSelectedFields: listHumanSelectedMaskRevealFields(editableIntent),
    lockedFields: listLockedMaskRevealFields(editableIntent),
    createdAt,
    updatedAt: createdAt,
  };
}

export function updateMaskRevealSceneField<K extends MaskRevealEditableFieldKey>(
  scene: MaskRevealSceneInstance,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  lock = false,
  updatedAt = nowIso(),
): MaskRevealSceneInstance {
  // Property-local correction: change only the human-readable field the person touched.
  // Unrelated Text / Crop / Timing / Motion fields remain byte-for-byte from the adopted SceneInstance.
  const editableIntent = applyHumanSelection(scene.editableIntent, key, value, lock);
  return refreshSceneDerivedState(scene, editableIntent, updatedAt);
}

export function updateMaskRevealSceneFieldLock(
  scene: MaskRevealSceneInstance,
  key: MaskRevealEditableFieldKey,
  locked: boolean,
  updatedAt = nowIso(),
): MaskRevealSceneInstance {
  const editableIntent = setEditableFieldLock(scene.editableIntent, key, locked);
  return refreshSceneDerivedState(scene, editableIntent, updatedAt);
}

export function suggestMaskRevealSceneField<K extends MaskRevealEditableFieldKey>(
  scene: MaskRevealSceneInstance,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  reason: string,
  updatedAt = nowIso(),
): MaskRevealSceneInstance {
  // AI may modify only AI_SUGGESTED. A locked field no-ops; HUMAN_SELECTED remains effective.
  const editableIntent = applyAiSuggestion(scene.editableIntent, key, value, reason);
  return refreshSceneDerivedState(scene, editableIntent, updatedAt);
}

export function retargetMaskRevealSceneSection(
  scene: MaskRevealSceneInstance,
  section: MaskRevealSection,
  updatedAt = nowIso(),
): MaskRevealSceneInstance {
  const editableIntent = retargetMaskRevealSection(scene.editableIntent, section);
  return {
    ...refreshSceneDerivedState(scene, editableIntent, updatedAt),
    projectId: projectIdForSection(section),
  };
}

export function buildProjectTimeline(scenes: MaskRevealSceneInstance[], projectId: SceneProjectId): ProjectTimelineV1 {
  let cursor = 0;
  const projectScenes = scenes.filter((scene) => scene.projectId === projectId);
  const placements = projectScenes.map((scene) => {
    const startSeconds = cursor;
    const endSeconds = Number((startSeconds + scene.computedDurationSeconds).toFixed(3));
    cursor = endSeconds;
    return {
      sceneId: scene.sceneId,
      startSeconds,
      endSeconds,
      durationSeconds: scene.computedDurationSeconds,
    };
  });

  const edges: SceneEdge[] = projectScenes.slice(1).map((scene, index) => ({
    fromSceneId: projectScenes[index].sceneId,
    toSceneId: scene.sceneId,
    transition: "HARD_CUT",
  }));

  return {
    schemaVersion: "project-timeline/v1",
    projectId,
    authority: "STRUCTURED_SCENE_TIMELINE",
    sceneIds: projectScenes.map((scene) => scene.sceneId),
    placements,
    edges,
    totalComputedDurationSeconds: Number(cursor.toFixed(3)),
  };
}

function orderedScenesForTimeline(state: MotionZukanComposerState, projectId: SceneProjectId) {
  const timeline = state.timelines.find((item) => item.projectId === projectId);
  const knownIds = timeline?.sceneIds ?? [];
  const ordered = knownIds
    .map((id) => state.scenes.find((scene) => scene.sceneId === id && scene.projectId === projectId))
    .filter((scene): scene is MaskRevealSceneInstance => Boolean(scene));
  const unlisted = state.scenes.filter(
    (scene) => scene.projectId === projectId && !knownIds.includes(scene.sceneId),
  );
  return [...ordered, ...unlisted];
}

function rebuildTimelines(state: MotionZukanComposerState): MotionZukanComposerState {
  const opening = orderedScenesForTimeline(state, "opening");
  const profile = orderedScenesForTimeline(state, "profile");
  return {
    ...state,
    timelines: [buildProjectTimeline(opening, "opening"), buildProjectTimeline(profile, "profile")],
  };
}

export function emptyMotionZukanComposerState(): MotionZukanComposerState {
  return rebuildTimelines({
    schemaVersion: "motion-zukan-composer-state/v1",
    scenes: [],
    timelines: [],
  });
}

export function adoptSceneInstance(state: MotionZukanComposerState, scene: MaskRevealSceneInstance): MotionZukanComposerState {
  const exists = state.scenes.some((item) => item.sceneId === scene.sceneId);
  const scenes = exists
    ? state.scenes.map((item) => (item.sceneId === scene.sceneId ? scene : item))
    : [...state.scenes, scene];
  const timelines = state.timelines.map((timeline) => {
    const without = timeline.sceneIds.filter((id) => id !== scene.sceneId);
    return timeline.projectId === scene.projectId
      ? { ...timeline, sceneIds: [...without, scene.sceneId] }
      : { ...timeline, sceneIds: without };
  });
  return rebuildTimelines({ ...state, scenes, timelines });
}

export function duplicateSceneInstance(state: MotionZukanComposerState, sceneId: string): MotionZukanComposerState {
  const source = state.scenes.find((scene) => scene.sceneId === sceneId);
  if (!source) return state;

  const duplicatedAt = nowIso();
  const duplicate: MaskRevealSceneInstance = {
    ...structuredClone(source),
    sceneId: createSceneId(),
    legacySceneId: null,
    createdAt: duplicatedAt,
    updatedAt: duplicatedAt,
  };
  const sourceIndex = state.scenes.findIndex((scene) => scene.sceneId === sceneId);
  const scenes = [...state.scenes];
  scenes.splice(sourceIndex + 1, 0, duplicate);
  const timelines = state.timelines.map((timeline) => {
    if (timeline.projectId !== source.projectId) return timeline;
    const ids = [...timeline.sceneIds];
    const timelineIndex = ids.indexOf(sceneId);
    ids.splice(timelineIndex >= 0 ? timelineIndex + 1 : ids.length, 0, duplicate.sceneId);
    return { ...timeline, sceneIds: ids };
  });
  return rebuildTimelines({ ...state, scenes, timelines });
}

export function reorderProjectTimelineScenes(
  state: MotionZukanComposerState,
  projectId: SceneProjectId,
  orderedSceneIds: string[],
): MotionZukanComposerState {
  const expectedIds = state.scenes.filter((scene) => scene.projectId === projectId).map((scene) => scene.sceneId);
  if (
    expectedIds.length !== orderedSceneIds.length ||
    expectedIds.some((id) => !orderedSceneIds.includes(id)) ||
    new Set(orderedSceneIds).size !== orderedSceneIds.length
  ) {
    return state;
  }
  const timelines = state.timelines.map((timeline) =>
    timeline.projectId === projectId ? { ...timeline, sceneIds: [...orderedSceneIds] } : timeline,
  );
  return rebuildTimelines({ ...state, timelines });
}

export function removeSceneInstance(state: MotionZukanComposerState, sceneId: string): MotionZukanComposerState {
  const scenes = state.scenes.filter((scene) => scene.sceneId !== sceneId);
  const timelines = state.timelines.map((timeline) => ({
    ...timeline,
    sceneIds: timeline.sceneIds.filter((id) => id !== sceneId),
  }));
  return rebuildTimelines({ ...state, scenes, timelines });
}

function replaceSceneInState(
  state: MotionZukanComposerState,
  sceneId: string,
  updater: (scene: MaskRevealSceneInstance) => MaskRevealSceneInstance,
): MotionZukanComposerState {
  const original = state.scenes.find((scene) => scene.sceneId === sceneId);
  if (!original) return state;
  const nextScene = updater(original);
  const scenes = state.scenes.map((scene) => (scene.sceneId === sceneId ? nextScene : scene));
  let timelines = state.timelines;
  if (original.projectId !== nextScene.projectId) {
    timelines = state.timelines.map((timeline) => {
      const without = timeline.sceneIds.filter((id) => id !== sceneId);
      return timeline.projectId === nextScene.projectId
        ? { ...timeline, sceneIds: [...without, sceneId] }
        : { ...timeline, sceneIds: without };
    });
  }
  return rebuildTimelines({ ...state, scenes, timelines });
}

export function updateSceneInstanceField<K extends MaskRevealEditableFieldKey>(
  state: MotionZukanComposerState,
  sceneId: string,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
): MotionZukanComposerState {
  return replaceSceneInState(state, sceneId, (scene) => updateMaskRevealSceneField(scene, key, value));
}

export function updateSceneInstanceFieldLock(
  state: MotionZukanComposerState,
  sceneId: string,
  key: MaskRevealEditableFieldKey,
  locked: boolean,
): MotionZukanComposerState {
  return replaceSceneInState(state, sceneId, (scene) => updateMaskRevealSceneFieldLock(scene, key, locked));
}

export function suggestSceneInstanceField<K extends MaskRevealEditableFieldKey>(
  state: MotionZukanComposerState,
  sceneId: string,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  reason: string,
): MotionZukanComposerState {
  return replaceSceneInState(state, sceneId, (scene) => suggestMaskRevealSceneField(scene, key, value, reason));
}

export function retargetSceneInstanceSection(
  state: MotionZukanComposerState,
  sceneId: string,
  section: MaskRevealSection,
): MotionZukanComposerState {
  return replaceSceneInState(state, sceneId, (scene) => retargetMaskRevealSceneSection(scene, section));
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
    return rebuildTimelines(parsed);
  } catch {
    return emptyMotionZukanComposerState();
  }
}

export function saveMotionZukanComposerState(state: MotionZukanComposerState) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(MOTION_ZUKAN_COMPOSER_STORAGE_KEY, JSON.stringify(state));
  if (typeof window !== "undefined") {
    // Deferred to a macrotask (not just a microtask — React 18/19's automatic batching itself
    // runs via a microtask, so a queueMicrotask dispatch was still inside that same batching
    // window) so a listener's setState (e.g. MotionZukanProductionWorkspace syncing to this
    // same state) never runs while React still considers the caller "rendering".
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, { detail: state }));
    }, 0);
  }
}

export function buildMaskRevealSceneExport(scene: MaskRevealSceneInstance) {
  const resolved = resolveMaskRevealEditableIntent(scene.editableIntent);
  return {
    schemaVersion: "scene-export/v1" as const,
    authority: "HUMAN_MASTER" as const,
    sceneId: scene.sceneId,
    projectId: scene.projectId,
    legacySceneId: scene.legacySceneId,
    recipeProvenance: scene.recipeProvenance,
    primarySubject: scene.primarySubject,
    targetDurationSeconds: scene.targetDurationSeconds,
    computedDurationSeconds: scene.computedDurationSeconds,
    durationDeltaSeconds: scene.durationDeltaSeconds,
    humanSelectedFields: scene.humanSelectedFields,
    lockedFields: scene.lockedFields,
    editableIntent: scene.editableIntent,
    effective: resolved,
    rule: "Recipe/default updates are provenance only after adoption; they must not silently rewrite this SceneInstance.",
  };
}
