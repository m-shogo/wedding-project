import {
  getFinalChecks,
  sceneMetaFor,
  type FinalCheckItem,
  type MotionZukanProductionWorkspaceState,
} from "./motionZukanProductionWorkspace";
import {
  buildTypographyProjectDeliveryBatch,
  type TypographyProjectDeliveryBatchV1,
} from "./typographyProjectDeliveryBatch";
import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import type {
  MaskRevealSceneInstance,
  MotionZukanComposerState,
  SceneProjectId,
} from "./visualSceneComposer";

export interface ProjectProductionHandoffManifestV1 {
  schemaVersion: "wedding-movie-project-production-handoff/v1";
  authority: "DERIVED_HANDOFF_MANIFEST";
  projectId: SceneProjectId;
  typography: TypographyProjectDeliveryBatchV1;
  productionWorkspace: {
    finalChecks: FinalCheckItem[];
    finalChecksPass: boolean;
    scenes: Array<{
      sceneId: string;
      status: string;
      note: string;
      assetIds: string[];
      assignedAssets: Array<{
        assetId: string;
        label: string;
        kind: string;
        sourceRef: string;
        placeholder: boolean;
        updatedAt: string;
      }>;
    }>;
    musicMarkers: Array<{
      markerId: string;
      label: string;
      kind: string;
      timeSeconds: number;
    }>;
    design: {
      fontFamily: string;
      textColor: string;
      safeAreaPercent: number;
      updatedAt: string;
    } | null;
  };
  handoff: {
    readyForPalmierDaVinciAssembly: boolean;
    productionReady: false;
    blockers: string[];
    rule: string;
  };
}

export function buildProjectProductionHandoffManifest(
  projectId: SceneProjectId,
  composer: MotionZukanComposerState,
  workspace: MotionZukanProductionWorkspaceState,
  selections: TypographyProductionSelectionV1[],
): ProjectProductionHandoffManifestV1 {
  const timeline = composer.timelines.find((item) => item.projectId === projectId);
  if (!timeline) throw new Error("PROJECT_PRODUCTION_HANDOFF_TIMELINE_MISSING");
  const typography = buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections);
  const finalChecks = getFinalChecks(composer, workspace, projectId);
  const finalChecksPass = finalChecks.every((check) => check.ok);
  const projectScenes = timeline.sceneIds
    .map((sceneId) => composer.scenes.find((scene) => scene.sceneId === sceneId && scene.projectId === projectId))
    .filter((scene): scene is MaskRevealSceneInstance => Boolean(scene));
  const assetById = new Map(workspace.assets.map((asset) => [asset.assetId, asset]));
  const scenes = projectScenes.map((scene) => {
    const meta = sceneMetaFor(workspace, scene.sceneId);
    return {
      sceneId: scene.sceneId,
      status: meta.status,
      note: meta.note,
      assetIds: [...meta.assetIds],
      assignedAssets: meta.assetIds.flatMap((assetId) => {
        const asset = assetById.get(assetId);
        return asset
          ? [{
              assetId: asset.assetId,
              label: asset.label,
              kind: asset.kind,
              sourceRef: asset.sourceRef,
              placeholder: asset.placeholder,
              updatedAt: asset.updatedAt,
            }]
          : [];
      }),
    };
  });
  const musicMarkers = workspace.musicMarkers
    .filter((marker) => marker.projectId === projectId)
    .map((marker) => ({
      markerId: marker.markerId,
      label: marker.label,
      kind: marker.kind,
      timeSeconds: marker.timeSeconds,
    }));
  const design = workspace.designSettings.find((item) => item.projectId === projectId) ?? null;
  const blockers = [
    ...typography.blockers,
    ...finalChecks.filter((check) => !check.ok).map((check) => `FINAL_CHECK:${check.id}:${check.detail}`),
  ];
  const readyForAssembly = typography.summary.batchReadyForPalmierDaVinciHandoff && finalChecksPass;

  return {
    schemaVersion: "wedding-movie-project-production-handoff/v1",
    authority: "DERIVED_HANDOFF_MANIFEST",
    projectId,
    typography,
    productionWorkspace: {
      finalChecks,
      finalChecksPass,
      scenes,
      musicMarkers,
      design: design ? {
        fontFamily: design.fontFamily,
        textColor: design.textColor,
        safeAreaPercent: design.safeAreaPercent,
        updatedAt: design.updatedAt,
      } : null,
    },
    handoff: {
      readyForPalmierDaVinciAssembly: readyForAssembly,
      productionReady: false,
      blockers,
      rule: "Assembly-readyは全Sceneのcurrent Typography package + Production Workspace final checksが揃った状態だけを示す。DaVinci Mac Actual / Human promotion / Scene-bound Release GateなしにproductionReadyへ昇格しない。",
    },
  };
}

export function buildProjectProductionHandoffManifestJson(
  projectId: SceneProjectId,
  composer: MotionZukanComposerState,
  workspace: MotionZukanProductionWorkspaceState,
  selections: TypographyProductionSelectionV1[],
) {
  return JSON.stringify(buildProjectProductionHandoffManifest(projectId, composer, workspace, selections), null, 2);
}
