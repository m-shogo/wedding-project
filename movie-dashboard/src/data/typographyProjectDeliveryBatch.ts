import {
  buildTypographySceneDeliveryPackage,
  type TypographySceneDeliveryPackageV1,
} from "./typographySceneDeliveryPackage";
import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import type {
  MaskRevealSceneInstance,
  ProjectTimelineV1,
  SceneProjectId,
} from "./visualSceneComposer";

export type TypographyProjectDeliverySceneStatus =
  | "CURRENT_PACKAGE_READY"
  | "MISSING_HUMAN_ROUTE"
  | "STALE_HUMAN_ROUTE";

export interface TypographyProjectDeliverySceneItemV1 {
  sceneId: string;
  sourceRevision: string;
  status: TypographyProjectDeliverySceneStatus;
  selectedPatternId: string | null;
  selectedRevision: string | null;
  package: TypographySceneDeliveryPackageV1 | null;
  blocker: string | null;
}

export interface TypographyProjectDeliveryBatchV1 {
  schemaVersion: "wedding-movie-typography-project-delivery/v1";
  authority: "DERIVED_PROJECT_HANDOFF";
  projectId: SceneProjectId;
  timeline: {
    authority: "STRUCTURED_SCENE_TIMELINE";
    sceneIds: string[];
    placements: ProjectTimelineV1["placements"];
    totalComputedDurationSeconds: number;
  };
  scenes: TypographyProjectDeliverySceneItemV1[];
  summary: {
    totalScenes: number;
    currentPackages: number;
    missingRoutes: number;
    staleRoutes: number;
    batchReadyForPalmierDaVinciHandoff: boolean;
    productionReady: false;
  };
  blockers: string[];
  executionRule: string;
  evidenceRule: string;
}

function orderedProjectScenes(
  scenes: MaskRevealSceneInstance[],
  timeline: ProjectTimelineV1,
) {
  const byId = new Map(scenes.map((scene) => [scene.sceneId, scene]));
  return timeline.sceneIds
    .map((sceneId) => byId.get(sceneId))
    .filter((scene): scene is MaskRevealSceneInstance => Boolean(scene));
}

export function buildTypographyProjectDeliveryBatch(
  projectId: SceneProjectId,
  scenes: MaskRevealSceneInstance[],
  timeline: ProjectTimelineV1,
  selections: TypographyProductionSelectionV1[],
): TypographyProjectDeliveryBatchV1 {
  if (timeline.projectId !== projectId) {
    throw new Error("TYPOGRAPHY_PROJECT_DELIVERY_TIMELINE_PROJECT_MISMATCH");
  }

  const projectScenes = orderedProjectScenes(
    scenes.filter((scene) => scene.projectId === projectId),
    timeline,
  );
  const selectionByScene = new Map(selections.map((selection) => [selection.sceneId, selection]));

  const items: TypographyProjectDeliverySceneItemV1[] = projectScenes.map((scene) => {
    const selection = selectionByScene.get(scene.sceneId) ?? null;
    if (!selection) {
      return {
        sceneId: scene.sceneId,
        sourceRevision: scene.updatedAt,
        status: "MISSING_HUMAN_ROUTE",
        selectedPatternId: null,
        selectedRevision: null,
        package: null,
        blocker: "HUMAN_SELECTED_TYPOGRAPHY_ROUTE_REQUIRED",
      };
    }
    if (selection.sourceRevision !== scene.updatedAt) {
      return {
        sceneId: scene.sceneId,
        sourceRevision: scene.updatedAt,
        status: "STALE_HUMAN_ROUTE",
        selectedPatternId: selection.patternId,
        selectedRevision: selection.sourceRevision,
        package: null,
        blocker: "STALE_HUMAN_SELECTED_TYPOGRAPHY_ROUTE",
      };
    }
    return {
      sceneId: scene.sceneId,
      sourceRevision: scene.updatedAt,
      status: "CURRENT_PACKAGE_READY",
      selectedPatternId: selection.patternId,
      selectedRevision: selection.sourceRevision,
      package: buildTypographySceneDeliveryPackage(scene, selection),
      blocker: null,
    };
  });

  const currentPackages = items.filter((item) => item.status === "CURRENT_PACKAGE_READY").length;
  const missingRoutes = items.filter((item) => item.status === "MISSING_HUMAN_ROUTE").length;
  const staleRoutes = items.filter((item) => item.status === "STALE_HUMAN_ROUTE").length;
  const blockers = items.flatMap((item) => item.blocker ? [`${item.sceneId}:${item.blocker}`] : []);
  const batchReady = items.length > 0 && currentPackages === items.length;

  return {
    schemaVersion: "wedding-movie-typography-project-delivery/v1",
    authority: "DERIVED_PROJECT_HANDOFF",
    projectId,
    timeline: {
      authority: "STRUCTURED_SCENE_TIMELINE",
      sceneIds: [...timeline.sceneIds],
      placements: timeline.placements.map((placement) => ({...placement})),
      totalComputedDurationSeconds: timeline.totalComputedDurationSeconds,
    },
    scenes: items,
    summary: {
      totalScenes: items.length,
      currentPackages,
      missingRoutes,
      staleRoutes,
      batchReadyForPalmierDaVinciHandoff: batchReady,
      productionReady: false,
    },
    blockers,
    executionRule:
      "全SceneがCURRENT_PACKAGE_READYになった時だけbatch exportする。Scene revision変更後のstale routeや未選択Sceneをsilent skipしない。Palmier実timeline XMLは別途exportする。",
    evidenceRule:
      "batchReadyForPalmierDaVinciHandoffはproductionReadyを意味しない。各SceneのMac Actual / Human promotion / Scene-bound Release Gateは個別packageと同じく別証拠のまま維持する。",
  };
}

export function buildTypographyProjectDeliveryBatchJson(
  projectId: SceneProjectId,
  scenes: MaskRevealSceneInstance[],
  timeline: ProjectTimelineV1,
  selections: TypographyProductionSelectionV1[],
) {
  return JSON.stringify(
    buildTypographyProjectDeliveryBatch(projectId, scenes, timeline, selections),
    null,
    2,
  );
}
