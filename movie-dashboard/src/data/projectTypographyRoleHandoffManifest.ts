import type {MotionZukanProductionWorkspaceState} from "./motionZukanProductionWorkspace";
import {
  buildProjectProductionHandoffManifest,
  type ProjectProductionHandoffManifestV1,
} from "./projectProductionHandoffManifest";
import type {TypographyProductionRoleContextV1} from "./typographyProductionRoleContextStore";
import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import {buildTypographyProjectDeliveryBatch, type TypographyProjectDeliveryBatchV1} from "./typographyProjectDeliveryBatch";
import type {MotionZukanComposerState, SceneProjectId} from "./visualSceneComposer";

export interface ProjectTypographyRoleHandoffManifestV1 {
  schemaVersion: "wedding-movie-project-role-handoff/v1";
  authority: "DERIVED_FROM_PROJECT_HANDOFF_AND_PERSISTED_HUMAN_ROLE_CONTEXT";
  projectId: SceneProjectId;
  base: ProjectProductionHandoffManifestV1;
  typography: TypographyProjectDeliveryBatchV1;
  roleHandoff: {
    required: true;
    currentRoleContexts: number;
    totalScenes: number;
    ready: boolean;
    productionReady: false;
    studioGuiActual: "NOT_RUN";
    davinciGuiActual: "NOT_RUN";
    blockers: string[];
    rule: string;
  };
}

export function buildProjectTypographyRoleHandoffManifest(
  projectId: SceneProjectId,
  composer: MotionZukanComposerState,
  workspace: MotionZukanProductionWorkspaceState,
  selections: TypographyProductionSelectionV1[],
  roleContexts: TypographyProductionRoleContextV1[],
): ProjectTypographyRoleHandoffManifestV1 {
  const timeline = composer.timelines.find((item) => item.projectId === projectId);
  if (!timeline) throw new Error("PROJECT_TYPOGRAPHY_ROLE_HANDOFF_TIMELINE_MISSING");
  const base = buildProjectProductionHandoffManifest(projectId, composer, workspace, selections);
  const typography = buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections, roleContexts);
  const ready = typography.summary.batchReadyForPalmierDaVinciHandoff;
  return {
    schemaVersion: "wedding-movie-project-role-handoff/v1",
    authority: "DERIVED_FROM_PROJECT_HANDOFF_AND_PERSISTED_HUMAN_ROLE_CONTEXT",
    projectId,
    base,
    typography,
    roleHandoff: {
      required: true,
      currentRoleContexts: typography.summary.currentRoleContexts,
      totalScenes: typography.summary.totalScenes,
      ready,
      productionReady: false,
      studioGuiActual: "NOT_RUN",
      davinciGuiActual: "NOT_RUN",
      blockers: [...typography.blockers],
      rule: "Opening/Profile assemblyへ渡すTypographyは、各Sceneのcurrent routeだけでなくrevision-bound Human role contextも必須。role + pattern + PRIMARY/FALLBACK/CUSTOMを保持するが、Mac/Studio/Resolve ActualやproductionReadyを自動昇格しない。",
    },
  };
}

export function buildProjectTypographyRoleHandoffManifestJson(
  projectId: SceneProjectId,
  composer: MotionZukanComposerState,
  workspace: MotionZukanProductionWorkspaceState,
  selections: TypographyProductionSelectionV1[],
  roleContexts: TypographyProductionRoleContextV1[],
) {
  return JSON.stringify(buildProjectTypographyRoleHandoffManifest(projectId, composer, workspace, selections, roleContexts), null, 2);
}
