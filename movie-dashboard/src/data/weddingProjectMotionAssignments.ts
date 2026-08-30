import type { SceneProjectId } from "./visualSceneComposer";

export interface WeddingProjectMotionAssignment {
  patternId: string;
  projectId: SceneProjectId;
  sceneId: string | null;
  assignedBy: "HUMAN_MASTER";
  assignedAt: string;
  sceneAssignedAt: string | null;
}

export interface WeddingProjectMotionAssignmentState {
  schemaVersion: "wedding-project-motion-assignments/v1";
  assignments: WeddingProjectMotionAssignment[];
}

export const WEDDING_PROJECT_MOTION_ASSIGNMENTS_STORAGE_KEY = "wedding-project-motion-assignments-v1";
export const WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT = "wedding-project-motion-assignments-changed";

export function emptyWeddingProjectMotionAssignments(): WeddingProjectMotionAssignmentState {
  return { schemaVersion: "wedding-project-motion-assignments/v1", assignments: [] };
}

function normalizeAssignment(item: WeddingProjectMotionAssignment): WeddingProjectMotionAssignment {
  return {
    ...item,
    sceneId: typeof item.sceneId === "string" && item.sceneId.length > 0 ? item.sceneId : null,
    sceneAssignedAt: typeof item.sceneAssignedAt === "string" ? item.sceneAssignedAt : null,
  };
}

export function loadWeddingProjectMotionAssignments(): WeddingProjectMotionAssignmentState {
  if (typeof localStorage === "undefined") return emptyWeddingProjectMotionAssignments();
  try {
    const raw = localStorage.getItem(WEDDING_PROJECT_MOTION_ASSIGNMENTS_STORAGE_KEY);
    if (!raw) return emptyWeddingProjectMotionAssignments();
    const parsed = JSON.parse(raw) as WeddingProjectMotionAssignmentState;
    if (parsed.schemaVersion !== "wedding-project-motion-assignments/v1" || !Array.isArray(parsed.assignments)) {
      return emptyWeddingProjectMotionAssignments();
    }
    const assignments = parsed.assignments
      .filter((item) =>
        typeof item?.patternId === "string" &&
        (item.projectId === "opening" || item.projectId === "profile") &&
        item.assignedBy === "HUMAN_MASTER" &&
        typeof item.assignedAt === "string",
      )
      .map((item) => normalizeAssignment(item));
    return { schemaVersion: "wedding-project-motion-assignments/v1", assignments };
  } catch {
    return emptyWeddingProjectMotionAssignments();
  }
}

export function saveWeddingProjectMotionAssignments(state: WeddingProjectMotionAssignmentState) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(WEDDING_PROJECT_MOTION_ASSIGNMENTS_STORAGE_KEY, JSON.stringify(state));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT, { detail: state }));
  }
}

export function assignmentForPatternProject(
  state: WeddingProjectMotionAssignmentState,
  patternId: string,
  projectId: SceneProjectId,
) {
  return state.assignments.find((item) => item.patternId === patternId && item.projectId === projectId) ?? null;
}

export function setWeddingProjectMotionAssignment(
  state: WeddingProjectMotionAssignmentState,
  patternId: string,
  projectId: SceneProjectId,
  assigned: boolean,
): WeddingProjectMotionAssignmentState {
  const existing = state.assignments.filter((item) => !(item.patternId === patternId && item.projectId === projectId));
  if (!assigned) return { ...state, assignments: existing };
  return {
    ...state,
    assignments: [
      ...existing,
      {
        patternId,
        projectId,
        sceneId: null,
        assignedBy: "HUMAN_MASTER",
        assignedAt: new Date().toISOString(),
        sceneAssignedAt: null,
      },
    ],
  };
}

export function setWeddingProjectMotionSceneAssignment(
  state: WeddingProjectMotionAssignmentState,
  patternId: string,
  projectId: SceneProjectId,
  sceneId: string | null,
): WeddingProjectMotionAssignmentState {
  const current = assignmentForPatternProject(state, patternId, projectId);
  if (!current) return state;
  const nextSceneId = sceneId && sceneId.length > 0 ? sceneId : null;
  return {
    ...state,
    assignments: state.assignments.map((item) =>
      item.patternId === patternId && item.projectId === projectId
        ? {
            ...item,
            sceneId: nextSceneId,
            sceneAssignedAt: nextSceneId ? new Date().toISOString() : null,
          }
        : item,
    ),
  };
}

export function assignedProjectsForPattern(state: WeddingProjectMotionAssignmentState, patternId: string): SceneProjectId[] {
  return state.assignments.filter((item) => item.patternId === patternId).map((item) => item.projectId);
}
