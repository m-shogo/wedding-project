import type { MotionZukanProductionWorkspaceState } from "./motionZukanProductionWorkspace";
import type { MotionZukanComposerState, SceneProjectId } from "./visualSceneComposer";
import type { WeddingProjectMotionAssignmentState } from "./weddingProjectMotionAssignments";

export const MOTION_ZUKAN_WORKSPACE_HANDOFF_SCHEMA = "motion-zukan-workspace-handoff/v1" as const;
export const MOTION_ZUKAN_WORKSPACE_HANDOFF_AUTHORITY = "HUMAN_MASTER_WORKSPACE_TRANSFER" as const;

export interface MotionZukanWorkspaceHandoff {
  schemaVersion: typeof MOTION_ZUKAN_WORKSPACE_HANDOFF_SCHEMA;
  authority: typeof MOTION_ZUKAN_WORKSPACE_HANDOFF_AUTHORITY;
  projectId: SceneProjectId;
  exportedAt: string;
  composer: MotionZukanComposerState;
  workspace: MotionZukanProductionWorkspaceState;
  projectMotionAssignments: WeddingProjectMotionAssignmentState;
  evidenceBoundary: {
    externalProductionGateEvaluated: false;
    remotionStudioGuiActual: "NOT_RUN";
    macDaVinciGuiActual: "NOT_RUN";
    finalDeliveryApproved: false;
  };
}

export type MotionZukanWorkspaceHandoffParseResult =
  | { ok: true; handoff: MotionZukanWorkspaceHandoff }
  | { ok: false; error: string };

function validProjectId(value: unknown): value is SceneProjectId {
  return value === "opening" || value === "profile";
}

function validComposer(value: unknown): value is MotionZukanComposerState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<MotionZukanComposerState>;
  return (
    candidate.schemaVersion === "motion-zukan-composer-state/v1" &&
    Array.isArray(candidate.scenes) &&
    Array.isArray(candidate.timelines) &&
    candidate.scenes.every((scene) =>
      Boolean(scene) &&
      scene.schemaVersion === "scene-instance/v1" &&
      validProjectId(scene.projectId) &&
      scene.authority === "HUMAN_MASTER",
    ) &&
    candidate.timelines.every((timeline) =>
      Boolean(timeline) &&
      timeline.schemaVersion === "project-timeline/v1" &&
      validProjectId(timeline.projectId) &&
      timeline.authority === "STRUCTURED_SCENE_TIMELINE",
    )
  );
}

function validWorkspace(value: unknown): value is MotionZukanProductionWorkspaceState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<MotionZukanProductionWorkspaceState>;
  return (
    candidate.schemaVersion === "motion-zukan-production-workspace/v1" &&
    Array.isArray(candidate.assets) &&
    Array.isArray(candidate.sceneMeta) &&
    Array.isArray(candidate.musicMarkers) &&
    Array.isArray(candidate.designSettings) &&
    Array.isArray(candidate.versions)
  );
}

function validProjectMotionAssignments(value: unknown): value is WeddingProjectMotionAssignmentState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<WeddingProjectMotionAssignmentState>;
  return (
    candidate.schemaVersion === "wedding-project-motion-assignments/v1" &&
    Array.isArray(candidate.assignments) &&
    candidate.assignments.every((item) =>
      Boolean(item) &&
      typeof item.patternId === "string" &&
      validProjectId(item.projectId) &&
      item.assignedBy === "HUMAN_MASTER" &&
      typeof item.assignedAt === "string",
    )
  );
}

function projectStateExists(handoff: Pick<MotionZukanWorkspaceHandoff, "projectId" | "composer">) {
  return handoff.composer.timelines.some((timeline) => timeline.projectId === handoff.projectId);
}

export function buildMotionZukanWorkspaceHandoff(
  composer: MotionZukanComposerState,
  workspace: MotionZukanProductionWorkspaceState,
  projectMotionAssignments: WeddingProjectMotionAssignmentState,
  projectId: SceneProjectId,
  exportedAt = new Date().toISOString(),
): MotionZukanWorkspaceHandoff {
  return {
    schemaVersion: MOTION_ZUKAN_WORKSPACE_HANDOFF_SCHEMA,
    authority: MOTION_ZUKAN_WORKSPACE_HANDOFF_AUTHORITY,
    projectId,
    exportedAt,
    composer: structuredClone(composer),
    workspace: structuredClone(workspace),
    projectMotionAssignments: structuredClone(projectMotionAssignments),
    evidenceBoundary: {
      externalProductionGateEvaluated: false,
      remotionStudioGuiActual: "NOT_RUN",
      macDaVinciGuiActual: "NOT_RUN",
      finalDeliveryApproved: false,
    },
  };
}

export function parseMotionZukanWorkspaceHandoff(raw: string): MotionZukanWorkspaceHandoffParseResult {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { ok: false, error: "JSONとして読み取れません" };
  }
  if (!value || typeof value !== "object") return { ok: false, error: "handoff objectがありません" };
  const handoff = value as Partial<MotionZukanWorkspaceHandoff>;
  if (
    handoff.schemaVersion !== MOTION_ZUKAN_WORKSPACE_HANDOFF_SCHEMA ||
    handoff.authority !== MOTION_ZUKAN_WORKSPACE_HANDOFF_AUTHORITY
  ) {
    return { ok: false, error: "対応していないhandoff schemaまたはauthorityです" };
  }
  if (!validProjectId(handoff.projectId)) return { ok: false, error: "projectIdが不正です" };
  if (!validComposer(handoff.composer)) return { ok: false, error: "composer stateが不正です" };
  if (!validWorkspace(handoff.workspace)) return { ok: false, error: "production workspace stateが不正です" };
  if (!validProjectMotionAssignments(handoff.projectMotionAssignments)) {
    return { ok: false, error: "project motion assignment stateが不正です" };
  }
  if (!projectStateExists({ projectId: handoff.projectId, composer: handoff.composer })) {
    return { ok: false, error: "project timelineがhandoff内にありません" };
  }
  if (
    !handoff.evidenceBoundary ||
    handoff.evidenceBoundary.externalProductionGateEvaluated !== false ||
    handoff.evidenceBoundary.remotionStudioGuiActual !== "NOT_RUN" ||
    handoff.evidenceBoundary.macDaVinciGuiActual !== "NOT_RUN" ||
    handoff.evidenceBoundary.finalDeliveryApproved !== false
  ) {
    return { ok: false, error: "Production/GUI Actual authority boundaryが不正です" };
  }
  return { ok: true, handoff: structuredClone(handoff as MotionZukanWorkspaceHandoff) };
}