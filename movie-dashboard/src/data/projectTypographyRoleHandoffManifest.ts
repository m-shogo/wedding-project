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

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, canonicalize(child)]),
    );
  }
  return value;
}

function canonicalJson(value: unknown) {
  return JSON.stringify(canonicalize(value));
}

export function parseAndValidateProjectTypographyRoleHandoffManifest(
  raw: string,
  projectId: SceneProjectId,
  composer: MotionZukanComposerState,
  workspace: MotionZukanProductionWorkspaceState,
  selections: TypographyProductionSelectionV1[],
  roleContexts: TypographyProductionRoleContextV1[],
): ProjectTypographyRoleHandoffManifestV1 {
  const parsed = JSON.parse(raw) as Partial<ProjectTypographyRoleHandoffManifestV1>;
  if (parsed.schemaVersion !== "wedding-movie-project-role-handoff/v1") {
    throw new Error("PROJECT_ROLE_HANDOFF_ENVELOPE_MISMATCH");
  }
  if (parsed.authority !== "DERIVED_FROM_PROJECT_HANDOFF_AND_PERSISTED_HUMAN_ROLE_CONTEXT") {
    throw new Error("PROJECT_ROLE_HANDOFF_AUTHORITY_MISMATCH");
  }
  if (parsed.projectId !== projectId || parsed.base?.projectId !== projectId || parsed.typography?.projectId !== projectId) {
    throw new Error("PROJECT_ROLE_HANDOFF_PROJECT_MISMATCH");
  }
  if (
    parsed.roleHandoff?.studioGuiActual !== "NOT_RUN" ||
    parsed.roleHandoff?.davinciGuiActual !== "NOT_RUN" ||
    parsed.roleHandoff?.productionReady !== false ||
    parsed.base?.handoff?.productionReady !== false ||
    parsed.typography?.summary?.productionReady !== false
  ) {
    throw new Error("PROJECT_ROLE_HANDOFF_MUST_NOT_CLAIM_ACTUAL_OR_PRODUCTION_READY");
  }

  const expected = buildProjectTypographyRoleHandoffManifest(projectId, composer, workspace, selections, roleContexts);
  if (canonicalJson(parsed) !== canonicalJson(expected)) {
    throw new Error("STALE_OR_DRIFTED_PROJECT_ROLE_HANDOFF_MANIFEST");
  }
  return parsed as ProjectTypographyRoleHandoffManifestV1;
}
