import {
  getFinalChecks,
  sceneMetaFor,
  type FinalCheckItem,
  type MotionZukanProductionWorkspaceState,
} from "./motionZukanProductionWorkspace";
import {openingProductionGate} from "./openingProductionGate.generated";
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

export interface OpeningV1ProductionMediaGateV1 {
  authority: "MOTION_STUDIO_OPENING_V1_MEDIA_GATE";
  expectedPhotoCount: number;
  resolvedPhotoCount: number;
  photoMissingCount: number;
  photoSlots: Array<{
    key: string;
    resolved: boolean;
    path: string | null;
  }>;
  bgm: {
    assetId: string;
    status: string;
    playable: boolean;
  };
  ambience: Array<{
    assetId: string;
    status: string;
    playable: boolean;
  }>;
  ambiencePlayableCount: number;
  ambienceExpectedCount: number;
  ambienceReadyForMix: boolean;
  blockingGatePass: boolean;
  nextAction: string;
}

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
    openingV1Media: OpeningV1ProductionMediaGateV1 | null;
  };
  handoff: {
    readyForPalmierDaVinciAssembly: boolean;
    productionReady: false;
    blockers: string[];
    warnings: string[];
    rule: string;
  };
}

function buildOpeningV1ProductionMediaGate(projectId: SceneProjectId): OpeningV1ProductionMediaGateV1 | null {
  if (projectId !== "opening") return null;
  const ambiencePlayableCount = openingProductionGate.ambience.filter((asset) => asset.playable).length;
  return {
    authority: "MOTION_STUDIO_OPENING_V1_MEDIA_GATE",
    expectedPhotoCount: openingProductionGate.expectedPhotoCount,
    resolvedPhotoCount: openingProductionGate.resolvedPhotoCount,
    photoMissingCount: openingProductionGate.photoMissingCount,
    photoSlots: openingProductionGate.photoSlots.map((slot) => ({
      key: slot.key,
      resolved: slot.resolved,
      path: slot.path,
    })),
    bgm: {...openingProductionGate.bgm},
    ambience: openingProductionGate.ambience.map((asset) => ({...asset})),
    ambiencePlayableCount,
    ambienceExpectedCount: openingProductionGate.ambience.length,
    ambienceReadyForMix: ambiencePlayableCount === openingProductionGate.ambience.length,
    blockingGatePass: !openingProductionGate.finalBlocked,
    nextAction: openingProductionGate.nextAction,
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
  const openingV1Media = buildOpeningV1ProductionMediaGate(projectId);
  const openingV1MediaBlockingGatePass = openingV1Media?.blockingGatePass ?? true;
  const blockers = [
    ...typography.blockers,
    ...finalChecks.filter((check) => !check.ok).map((check) => `FINAL_CHECK:${check.id}:${check.detail}`),
    ...(openingV1Media && openingV1Media.photoMissingCount > 0
      ? [`OPENING_V1_PHOTOS:${openingV1Media.resolvedPhotoCount}/${openingV1Media.expectedPhotoCount}:MISSING_${openingV1Media.photoMissingCount}`]
      : []),
    ...(openingV1Media && !openingV1Media.bgm.playable
      ? [`OPENING_V1_BGM:${openingV1Media.bgm.assetId}:${openingV1Media.bgm.status}`]
      : []),
  ];
  const warnings = openingV1Media && !openingV1Media.ambienceReadyForMix
    ? [`OPENING_V1_AMBIENCE:${openingV1Media.ambiencePlayableCount}/${openingV1Media.ambienceExpectedCount}:MIX_NOT_READY`]
    : [];
  const readyForAssembly =
    typography.summary.batchReadyForPalmierDaVinciHandoff &&
    finalChecksPass &&
    openingV1MediaBlockingGatePass;

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
      openingV1Media,
    },
    handoff: {
      readyForPalmierDaVinciAssembly: readyForAssembly,
      productionReady: false,
      blockers,
      warnings,
      rule: "Assembly-readyは全Sceneのcurrent Typography package + Production Workspace final checksに加え、OpeningではMotion Studio正本の11写真/BGM blocking gateが揃った状態だけを示す。現地音はmix readinessとして別表示する。DaVinci Mac Actual / Human promotion / Scene-bound Release GateなしにproductionReadyへ昇格しない。",
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
