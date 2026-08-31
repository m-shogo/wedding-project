import type {SceneProjectId} from "./visualSceneComposer";

export const MOTION_ZUKAN_SCENE_FOCUS_REQUEST_EVENT = "motion-zukan:scene-focus-request";
export const MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT = "motion-zukan:scene-focus-resolved";

export type MotionZukanSceneFocusAxis = "PATTERN_SWITCH" | "DURATION" | "PACING" | "TRANSITION";
export type MotionZukanSceneFocusSurface = "SCENE_BOUND_A_B_COMPARE" | "SCENE_TIMING_AND_A_B_COMPARE";

export type MotionZukanSceneFocusRequest = {
  projectId: SceneProjectId;
  sceneId: string;
  sourceRevision: string;
  axis: MotionZukanSceneFocusAxis;
  surface: MotionZukanSceneFocusSurface;
  requestedBy: "PROJECT_RHYTHM_CORRECTION_QUEUE";
};

export function isMotionZukanSceneFocusRequest(value: unknown): value is MotionZukanSceneFocusRequest {
  if (!value || typeof value !== "object") return false;
  const request = value as Partial<MotionZukanSceneFocusRequest>;
  return (request.projectId === "opening" || request.projectId === "profile")
    && typeof request.sceneId === "string"
    && request.sceneId.length > 0
    && typeof request.sourceRevision === "string"
    && request.sourceRevision.length > 0
    && (request.axis === "PATTERN_SWITCH" || request.axis === "DURATION" || request.axis === "PACING" || request.axis === "TRANSITION")
    && (request.surface === "SCENE_BOUND_A_B_COMPARE" || request.surface === "SCENE_TIMING_AND_A_B_COMPARE")
    && request.requestedBy === "PROJECT_RHYTHM_CORRECTION_QUEUE";
}

export function requestMotionZukanSceneFocus(request: MotionZukanSceneFocusRequest) {
  window.dispatchEvent(new CustomEvent<MotionZukanSceneFocusRequest>(MOTION_ZUKAN_SCENE_FOCUS_REQUEST_EVENT, {detail: request}));
}

export function announceMotionZukanSceneFocusResolved(request: MotionZukanSceneFocusRequest) {
  window.dispatchEvent(new CustomEvent<MotionZukanSceneFocusRequest>(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT, {detail: request}));
}
