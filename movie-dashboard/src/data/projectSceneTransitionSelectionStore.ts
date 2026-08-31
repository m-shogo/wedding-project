import type {MaskRevealSceneInstance, ProjectTimelineV1, SceneProjectId} from "./visualSceneComposer";

export type ProjectSceneTransitionKind = "HARD_CUT" | "CROSS_DISSOLVE";

export interface ProjectSceneTransitionSelectionV1 {
  schemaVersion: "project-scene-transition-selection/v1";
  authority: "HUMAN_SELECTED_TRANSITION";
  projectId: SceneProjectId;
  fromSceneId: string;
  toSceneId: string;
  fromRevision: string;
  toRevision: string;
  transition: ProjectSceneTransitionKind;
  durationFrames: number;
  selectedAt: string;
}

export interface ResolvedProjectSceneTransitionV1 {
  fromSceneId: string;
  toSceneId: string;
  transition: ProjectSceneTransitionKind;
  durationFrames: number;
  status: "DEFAULT_HARD_CUT" | "CURRENT_HUMAN_SELECTION" | "STALE_HUMAN_SELECTION";
  selectedAt: string | null;
}

export const PROJECT_SCENE_TRANSITION_SELECTION_STORAGE_KEY = "wedding-project-scene-transition-selection-v1";
export const PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT = "wedding-project-scene-transition-selection-changed";
export const MAX_CROSS_DISSOLVE_FRAMES = 30;
export const MIN_CROSS_DISSOLVE_FRAMES = 6;

function readAll(): ProjectSceneTransitionSelectionV1[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(PROJECT_SCENE_TRANSITION_SELECTION_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item?.schemaVersion === "project-scene-transition-selection/v1") : [];
  } catch {
    return [];
  }
}

export function listProjectSceneTransitionSelections(projectId?: SceneProjectId) {
  const all = readAll();
  return projectId ? all.filter((item) => item.projectId === projectId) : all;
}

function writeAll(items: ProjectSceneTransitionSelectionV1[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(PROJECT_SCENE_TRANSITION_SELECTION_STORAGE_KEY, JSON.stringify(items));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PROJECT_SCENE_TRANSITION_SELECTION_CHANGED_EVENT, {detail: items}));
  }
}

function edgeKey(projectId: SceneProjectId, fromSceneId: string, toSceneId: string) {
  return `${projectId}:${fromSceneId}->${toSceneId}`;
}

export function saveProjectSceneTransitionSelection(selection: ProjectSceneTransitionSelectionV1) {
  const durationFrames = selection.transition === "HARD_CUT"
    ? 0
    : Math.max(MIN_CROSS_DISSOLVE_FRAMES, Math.min(MAX_CROSS_DISSOLVE_FRAMES, Math.round(selection.durationFrames)));
  const normalized = {...selection, durationFrames};
  const key = edgeKey(selection.projectId, selection.fromSceneId, selection.toSceneId);
  const next = readAll().filter((item) => edgeKey(item.projectId, item.fromSceneId, item.toSceneId) !== key);
  next.push(normalized);
  writeAll(next);
  return normalized;
}

export function resolveProjectSceneTransitions(
  projectId: SceneProjectId,
  scenes: MaskRevealSceneInstance[],
  timeline: ProjectTimelineV1,
  selections = listProjectSceneTransitionSelections(projectId),
): ResolvedProjectSceneTransitionV1[] {
  const sceneById = new Map(scenes.filter((scene) => scene.projectId === projectId).map((scene) => [scene.sceneId, scene]));
  const selectionByEdge = new Map(selections.map((item) => [edgeKey(item.projectId, item.fromSceneId, item.toSceneId), item]));
  return timeline.sceneIds.slice(1).map((toSceneId, index) => {
    const fromSceneId = timeline.sceneIds[index];
    const fromScene = sceneById.get(fromSceneId);
    const toScene = sceneById.get(toSceneId);
    const selection = selectionByEdge.get(edgeKey(projectId, fromSceneId, toSceneId));
    if (!selection || !fromScene || !toScene) {
      return {fromSceneId, toSceneId, transition: "HARD_CUT", durationFrames: 0, status: "DEFAULT_HARD_CUT", selectedAt: null};
    }
    const current = selection.fromRevision === fromScene.updatedAt && selection.toRevision === toScene.updatedAt;
    if (!current) {
      return {fromSceneId, toSceneId, transition: selection.transition, durationFrames: selection.durationFrames, status: "STALE_HUMAN_SELECTION", selectedAt: selection.selectedAt};
    }
    return {fromSceneId, toSceneId, transition: selection.transition, durationFrames: selection.transition === "HARD_CUT" ? 0 : selection.durationFrames, status: "CURRENT_HUMAN_SELECTION", selectedAt: selection.selectedAt};
  });
}

export function createProjectSceneTransitionSelection(
  projectId: SceneProjectId,
  fromScene: MaskRevealSceneInstance,
  toScene: MaskRevealSceneInstance,
  transition: ProjectSceneTransitionKind,
  durationFrames: number,
): ProjectSceneTransitionSelectionV1 {
  if (fromScene.projectId !== projectId || toScene.projectId !== projectId) throw new Error("TRANSITION_PROJECT_MISMATCH");
  return {
    schemaVersion: "project-scene-transition-selection/v1",
    authority: "HUMAN_SELECTED_TRANSITION",
    projectId,
    fromSceneId: fromScene.sceneId,
    toSceneId: toScene.sceneId,
    fromRevision: fromScene.updatedAt,
    toRevision: toScene.updatedAt,
    transition,
    durationFrames: transition === "HARD_CUT" ? 0 : durationFrames,
    selectedAt: new Date().toISOString(),
  };
}
