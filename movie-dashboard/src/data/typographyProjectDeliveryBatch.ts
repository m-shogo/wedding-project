import {
  buildTypographySceneDeliveryPackage,
  type TypographySceneDeliveryPackageV1,
} from "./typographySceneDeliveryPackage";
import {buildTypographySceneRoleDeliveryPackage, type TypographySceneRoleDeliveryPackageV1} from "./typographySceneRoleDeliveryPackage";
import type {TypographyProductionRoleContextV1} from "./typographyProductionRoleContextStore";
import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import type {MaskRevealSceneInstance, ProjectTimelineV1, SceneProjectId} from "./visualSceneComposer";

export type TypographyProjectDeliverySceneStatus = "CURRENT_PACKAGE_READY" | "MISSING_HUMAN_ROUTE" | "STALE_HUMAN_ROUTE";
export type TypographyProjectRoleContextStatus = "CURRENT_ROLE_CONTEXT" | "MISSING_ROLE_CONTEXT" | "STALE_ROLE_CONTEXT" | "ROLE_CONTEXT_NOT_REQUIRED";

export interface TypographyProjectDeliverySceneItemV1 {
  sceneId: string;
  sourceRevision: string;
  status: TypographyProjectDeliverySceneStatus;
  selectedPatternId: string | null;
  selectedRevision: string | null;
  package: TypographySceneDeliveryPackageV1 | null;
  blocker: string | null;
  roleContextStatus: TypographyProjectRoleContextStatus;
  productionRole: TypographyProductionRoleContextV1["productionRole"] | null;
  selectionClass: TypographySceneRoleDeliveryPackageV1["handoffSummary"]["selectionClass"] | null;
  rolePackage: TypographySceneRoleDeliveryPackageV1 | null;
  roleBlocker: string | null;
}

export interface TypographyProjectDeliveryBatchV1 {
  schemaVersion: "wedding-movie-typography-project-delivery/v1";
  authority: "DERIVED_PROJECT_HANDOFF";
  projectId: SceneProjectId;
  timeline: {authority: "STRUCTURED_SCENE_TIMELINE"; sceneIds: string[]; placements: ProjectTimelineV1["placements"]; totalComputedDurationSeconds: number};
  scenes: TypographyProjectDeliverySceneItemV1[];
  summary: {
    totalScenes: number;
    currentPackages: number;
    missingRoutes: number;
    staleRoutes: number;
    roleContextRequired: boolean;
    currentRoleContexts: number;
    missingRoleContexts: number;
    staleRoleContexts: number;
    batchReadyForPalmierDaVinciHandoff: boolean;
    productionReady: false;
  };
  blockers: string[];
  executionRule: string;
  evidenceRule: string;
}

function orderedProjectScenes(scenes: MaskRevealSceneInstance[], timeline: ProjectTimelineV1) {
  const byId = new Map(scenes.map((scene) => [scene.sceneId, scene]));
  return timeline.sceneIds.map((sceneId) => byId.get(sceneId)).filter((scene): scene is MaskRevealSceneInstance => Boolean(scene));
}

function classifyRoleContext(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  context: TypographyProductionRoleContextV1 | null,
  required: boolean,
) {
  if (!required) return {status: "ROLE_CONTEXT_NOT_REQUIRED" as const, rolePackage: null, blocker: null};
  if (!context) return {status: "MISSING_ROLE_CONTEXT" as const, rolePackage: null, blocker: "HUMAN_SELECTED_TYPOGRAPHY_ROLE_REQUIRED"};
  const fresh = context.projectId === scene.projectId && context.sourceRevision === scene.updatedAt && context.patternId === selection.patternId && context.routeSelectedAt === selection.selectedAt;
  if (!fresh) return {status: "STALE_ROLE_CONTEXT" as const, rolePackage: null, blocker: "STALE_HUMAN_SELECTED_TYPOGRAPHY_ROLE"};
  try {
    return {status: "CURRENT_ROLE_CONTEXT" as const, rolePackage: buildTypographySceneRoleDeliveryPackage(scene, selection, context.productionRole), blocker: null};
  } catch {
    return {status: "STALE_ROLE_CONTEXT" as const, rolePackage: null, blocker: "INVALID_HUMAN_SELECTED_TYPOGRAPHY_ROLE"};
  }
}

export function buildTypographyProjectDeliveryBatch(
  projectId: SceneProjectId,
  scenes: MaskRevealSceneInstance[],
  timeline: ProjectTimelineV1,
  selections: TypographyProductionSelectionV1[],
  roleContexts?: TypographyProductionRoleContextV1[],
): TypographyProjectDeliveryBatchV1 {
  if (timeline.projectId !== projectId) throw new Error("TYPOGRAPHY_PROJECT_DELIVERY_TIMELINE_PROJECT_MISMATCH");
  const projectScenes = orderedProjectScenes(scenes.filter((scene) => scene.projectId === projectId), timeline);
  const selectionByScene = new Map(selections.map((selection) => [selection.sceneId, selection]));
  const roleContextRequired = roleContexts !== undefined;
  const roleContextByScene = new Map((roleContexts ?? []).map((context) => [context.sceneId, context]));

  const items: TypographyProjectDeliverySceneItemV1[] = projectScenes.map((scene) => {
    const selection = selectionByScene.get(scene.sceneId) ?? null;
    const baseRole = {roleContextStatus: roleContextRequired ? "MISSING_ROLE_CONTEXT" as const : "ROLE_CONTEXT_NOT_REQUIRED" as const, productionRole: null, selectionClass: null, rolePackage: null, roleBlocker: roleContextRequired ? "HUMAN_SELECTED_TYPOGRAPHY_ROLE_REQUIRED" : null};
    if (!selection) return {sceneId: scene.sceneId, sourceRevision: scene.updatedAt, status: "MISSING_HUMAN_ROUTE", selectedPatternId: null, selectedRevision: null, package: null, blocker: "HUMAN_SELECTED_TYPOGRAPHY_ROUTE_REQUIRED", ...baseRole};
    if (selection.sourceRevision !== scene.updatedAt) return {sceneId: scene.sceneId, sourceRevision: scene.updatedAt, status: "STALE_HUMAN_ROUTE", selectedPatternId: selection.patternId, selectedRevision: selection.sourceRevision, package: null, blocker: "STALE_HUMAN_SELECTED_TYPOGRAPHY_ROUTE", ...baseRole};
    const role = classifyRoleContext(scene, selection, roleContextByScene.get(scene.sceneId) ?? null, roleContextRequired);
    return {
      sceneId: scene.sceneId,
      sourceRevision: scene.updatedAt,
      status: "CURRENT_PACKAGE_READY",
      selectedPatternId: selection.patternId,
      selectedRevision: selection.sourceRevision,
      package: buildTypographySceneDeliveryPackage(scene, selection),
      blocker: null,
      roleContextStatus: role.status,
      productionRole: role.rolePackage?.productionUse.productionRole ?? null,
      selectionClass: role.rolePackage?.productionUse.choiceKind ?? null,
      rolePackage: role.rolePackage,
      roleBlocker: role.blocker,
    };
  });

  const currentPackages = items.filter((item) => item.status === "CURRENT_PACKAGE_READY").length;
  const missingRoutes = items.filter((item) => item.status === "MISSING_HUMAN_ROUTE").length;
  const staleRoutes = items.filter((item) => item.status === "STALE_HUMAN_ROUTE").length;
  const currentRoleContexts = items.filter((item) => item.roleContextStatus === "CURRENT_ROLE_CONTEXT").length;
  const missingRoleContexts = items.filter((item) => item.roleContextStatus === "MISSING_ROLE_CONTEXT").length;
  const staleRoleContexts = items.filter((item) => item.roleContextStatus === "STALE_ROLE_CONTEXT").length;
  const blockers = items.flatMap((item) => [item.blocker, item.roleBlocker].filter((value): value is string => Boolean(value)).map((value) => `${item.sceneId}:${value}`));
  const routeReady = items.length > 0 && currentPackages === items.length;
  const roleReady = !roleContextRequired || currentRoleContexts === items.length;

  return {
    schemaVersion: "wedding-movie-typography-project-delivery/v1",
    authority: "DERIVED_PROJECT_HANDOFF",
    projectId,
    timeline: {authority: "STRUCTURED_SCENE_TIMELINE", sceneIds: [...timeline.sceneIds], placements: timeline.placements.map((placement) => ({...placement})), totalComputedDurationSeconds: timeline.totalComputedDurationSeconds},
    scenes: items,
    summary: {totalScenes: items.length, currentPackages, missingRoutes, staleRoutes, roleContextRequired, currentRoleContexts, missingRoleContexts, staleRoleContexts, batchReadyForPalmierDaVinciHandoff: routeReady && roleReady, productionReady: false},
    blockers,
    executionRule: "UI/production manifest経由では全SceneがCURRENT_PACKAGE_READYかつCURRENT_ROLE_CONTEXTの時だけbatch exportする。既存4引数contract callerはroute-only互換を維持する。Scene/route更新後のstale contextをsilent rebaseしない。",
    evidenceRule: "role + pattern + PRIMARY/FALLBACK/CUSTOMはHuman-selected role/routeからderivedする。batchReadyはproductionReadyを意味せず、Mac Actual / Human promotion / Scene-bound Release Gateは別証拠のまま維持する。",
  };
}

export function buildTypographyProjectDeliveryBatchJson(projectId: SceneProjectId, scenes: MaskRevealSceneInstance[], timeline: ProjectTimelineV1, selections: TypographyProductionSelectionV1[], roleContexts?: TypographyProductionRoleContextV1[]) {
  return JSON.stringify(buildTypographyProjectDeliveryBatch(projectId, scenes, timeline, selections, roleContexts), null, 2);
}
