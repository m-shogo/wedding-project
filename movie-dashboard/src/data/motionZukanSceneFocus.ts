import type {SceneProjectId} from "./visualSceneComposer";

export const MOTION_ZUKAN_SCENE_FOCUS_REQUEST_EVENT = "motion-zukan:scene-focus-request";
export const MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT = "motion-zukan:scene-focus-resolved";

export type MotionZukanSceneFocusAxis =
  | "PATTERN_SWITCH"
  | "DURATION"
  | "PACING"
  | "TRANSITION"
  | "CROP_SUBJECT_SAFE"
  | "TITLE_READABLE"
  | "TEXT_MEDIA_CONTRAST"
  | "NO_UNINTENDED_EDGE_CLIP";
export type MotionZukanSceneFocusSurface = "SCENE_BOUND_A_B_COMPARE" | "SCENE_TIMING_AND_A_B_COMPARE" | "REAL_MEDIA_FRAMING_OPERATOR";
export type MotionZukanSceneFocusRequester = "PROJECT_RHYTHM_CORRECTION_QUEUE" | "REAL_MEDIA_VISUAL_CORRECTION_QUEUE";

export type MotionZukanSceneFocusRequest = {
  projectId: SceneProjectId;
  sceneId: string;
  sourceRevision: string;
  axis: MotionZukanSceneFocusAxis;
  surface: MotionZukanSceneFocusSurface;
  requestedBy: MotionZukanSceneFocusRequester;
};

const AXES = new Set<MotionZukanSceneFocusAxis>([
  "PATTERN_SWITCH",
  "DURATION",
  "PACING",
  "TRANSITION",
  "CROP_SUBJECT_SAFE",
  "TITLE_READABLE",
  "TEXT_MEDIA_CONTRAST",
  "NO_UNINTENDED_EDGE_CLIP",
]);
const SURFACES = new Set<MotionZukanSceneFocusSurface>(["SCENE_BOUND_A_B_COMPARE", "SCENE_TIMING_AND_A_B_COMPARE", "REAL_MEDIA_FRAMING_OPERATOR"]);
const REQUESTERS = new Set<MotionZukanSceneFocusRequester>(["PROJECT_RHYTHM_CORRECTION_QUEUE", "REAL_MEDIA_VISUAL_CORRECTION_QUEUE"]);

export function isMotionZukanSceneFocusRequest(value: unknown): value is MotionZukanSceneFocusRequest {
  if (!value || typeof value !== "object") return false;
  const request = value as Partial<MotionZukanSceneFocusRequest>;
  return (request.projectId === "opening" || request.projectId === "profile")
    && typeof request.sceneId === "string"
    && request.sceneId.length > 0
    && typeof request.sourceRevision === "string"
    && request.sourceRevision.length > 0
    && AXES.has(request.axis as MotionZukanSceneFocusAxis)
    && SURFACES.has(request.surface as MotionZukanSceneFocusSurface)
    && REQUESTERS.has(request.requestedBy as MotionZukanSceneFocusRequester);
}

export function requestMotionZukanSceneFocus(request: MotionZukanSceneFocusRequest) {
  window.dispatchEvent(new CustomEvent<MotionZukanSceneFocusRequest>(MOTION_ZUKAN_SCENE_FOCUS_REQUEST_EVENT, {detail: request}));
}

export function announceMotionZukanSceneFocusResolved(request: MotionZukanSceneFocusRequest) {
  window.dispatchEvent(new CustomEvent<MotionZukanSceneFocusRequest>(MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT, {detail: request}));
}
