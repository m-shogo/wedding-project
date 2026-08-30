import type { SceneProjectId } from "./visualSceneComposer";

export interface WeddingProjectMotionAssignment {
  patternId: string;
  projectId: SceneProjectId;
  assignedBy: "HUMAN_MASTER";
  assignedAt: string;
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

export function loadWeddingProjectMotionAssignments(): WeddingProjectMotionAssignmentState {
  if (typeof localStorage === "undefined") return emptyWeddingProjectMotionAssignments();
  try {
    const raw = localStorage.getItem(WEDDING_PROJECT_MOTION_ASSIGNMENTS_STORAGE_KEY);
    if (!raw) return emptyWeddingProjectMotionAssignments();
    const parsed = JSON.parse(raw) as WeddingProjectMotionAssignmentState;
    if (parsed.schemaVersion !== "wedding-project-motion-assignments/v1" || !Array.isArray(parsed.assignments)) {
      return emptyWeddingProjectMotionAssignments();
    }
    const assignments = parsed.assignments.filter((item) =>
      typeof item?.patternId === "string" &&
      (item.projectId === "opening" || item.projectId === "profile") &&
      item.assignedBy === "HUMAN_MASTER" &&
      typeof item.assignedAt === "string",
    );
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
      { patternId, projectId, assignedBy: "HUMAN_MASTER", assignedAt: new Date().toISOString() },
    ],
  };
}

export function assignedProjectsForPattern(state: WeddingProjectMotionAssignmentState, patternId: string): SceneProjectId[] {
  return state.assignments.filter((item) => item.patternId === patternId).map((item) => item.projectId);
}
