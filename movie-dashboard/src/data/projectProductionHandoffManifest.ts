import {
  getFinalChecks,
  sceneMetaFor,
  type FinalCheckItem,
  type MotionZukanProductionWorkspaceState,
} from "./motionZukanProductionWorkspace";
import {openingProductionGate} from "./openingProductionGate.generated";
import {openingV1PhotoPlanForSlot} from "./openingV1PhotoProductionPlan";
import {profileProductionGate} from "./profileProductionGate.generated";
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
    chapter: string;
    ordinalInChapter: number;
    placements: Array<{
      startSeconds: number;
      endSeconds: number;
      role: string;
    }>;
    qa: {
      crop: "NOT_RUN";
      focus: "NOT_RUN";
      color: "NOT_RUN";
      motion: "NOT_RUN";
    };
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

export interface ProfileV1ProductionMediaGateV1 {
  authority: "MOTION_STUDIO_PROFILE_V1_MEDIA_GATE";
  chapterCount: number;
  chapters: Array<{
    chapterId: string;
    order: number;
    title: string;
    role: string;
    editIntent: readonly string[];
    requiredCount: number;
    readyCount: number;
    ready: boolean;
  }>;
  expectedMediaCount: number;
  resolvedMediaCount: number;
  mediaMissingCount: number;
  mediaSlots: Array<{
    id: string;
    chapterId: string;
    label: string;
    kind: string;
    canonicalStem: string;
    file: string | null;
    ready: boolean;
  }>;
  bgm: {
    assetId: string;
    path: string;
    fileExists: boolean;
    rightsState: string;
    ready: boolean;
  };
  structureReview: {
    state: "NOT_RUN" | "BLOCKED" | "PASS";
    evidencePath: string;
    boundPreviewSha256: string | null;
    currentPreviewSha256: string | null;
    reviewer: string | null;
    reviewedAt: string | null;
    blockers: readonly string[];
    humanReviewComplete: boolean;
  };
  qa: {
    structurePreview: "NOT_RUN" | "BLOCKED" | "PASS";
    preview: "NOT_RUN";
    humanContent: "NOT_RUN";
    audio: "NOT_RUN";
    macDaVinciActual: "NOT_RUN";
  };
  blockingGatePass: boolean;
  nextActions: string[];
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
    profileV1Media: ProfileV1ProductionMediaGateV1 | null;
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
    photoSlots: openingProductionGate.photoSlots.map((slot) => {
      const plan = openingV1PhotoPlanForSlot(slot.key);
      if (!plan) throw new Error(`OPENING_V1_PHOTO_PLAN_MISSING:${slot.key}`);
      return {
        key: slot.key,
        resolved: slot.resolved,
        path: slot.path,
        chapter: plan.chapter,
        ordinalInChapter: plan.ordinalInChapter,
        placements: plan.placements.map((placement) => ({...placement})),
        qa: {...plan.qa},
      };
    }),
    bgm: {...openingProductionGate.bgm},
    ambience: openingProductionGate.ambience.map((asset) => ({...asset})),
    ambiencePlayableCount,
    ambienceExpectedCount: openingProductionGate.ambience.length,
    ambienceReadyForMix: ambiencePlayableCount === openingProductionGate.ambience.length,
    blockingGatePass: !openingProductionGate.finalBlocked,
    nextAction: openingProductionGate.nextAction,
  };
}

function buildProfileV1ProductionMediaGate(projectId: SceneProjectId): ProfileV1ProductionMediaGateV1 | null {
  if (projectId !== "profile") return null;
  return {
    authority: "MOTION_STUDIO_PROFILE_V1_MEDIA_GATE",
    chapterCount: profileProductionGate.chapterCount,
    chapters: profileProductionGate.chapters.map((chapter) => ({
      ...chapter,
      editIntent: [...chapter.editIntent],
    })),
    expectedMediaCount: profileProductionGate.expectedMediaCount,
    resolvedMediaCount: profileProductionGate.resolvedMediaCount,
    mediaMissingCount: profileProductionGate.mediaMissingCount,
    mediaSlots: profileProductionGate.mediaSlots.map((slot) => ({...slot})),
    bgm: {...profileProductionGate.bgm},
    structureReview: {
      ...profileProductionGate.structureReview,
      blockers: [...profileProductionGate.structureReview.blockers],
    },
    qa: {...profileProductionGate.qa},
    blockingGatePass: profileProductionGate.blockingGatePass,
    nextActions: [...profileProductionGate.nextActions],
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
  const profileV1Media = buildProfileV1ProductionMediaGate(projectId);
  const openingV1MediaBlockingGatePass = openingV1Media?.blockingGatePass ?? true;
  const profileV1MediaBlockingGatePass = profileV1Media?.blockingGatePass ?? true;
  const blockers = [
    ...typography.blockers,
    ...finalChecks.filter((check) => !check.ok).map((check) => `FINAL_CHECK:${check.id}:${check.detail}`),
    ...(openingV1Media && openingV1Media.photoMissingCount > 0
      ? [`OPENING_V1_PHOTOS:${openingV1Media.resolvedPhotoCount}/${openingV1Media.expectedPhotoCount}:MISSING_${openingV1Media.photoMissingCount}`]
      : []),
    ...(openingV1Media && !openingV1Media.bgm.playable
      ? [`OPENING_V1_BGM:${openingV1Media.bgm.assetId}:${openingV1Media.bgm.status}`]
      : []),
    ...(profileV1Media && profileV1Media.mediaMissingCount > 0
      ? [`PROFILE_V1_MEDIA:${profileV1Media.resolvedMediaCount}/${profileV1Media.expectedMediaCount}:MISSING_${profileV1Media.mediaMissingCount}`]
      : []),
    ...(profileV1Media && !profileV1Media.bgm.ready
      ? [`PROFILE_V1_BGM:${profileV1Media.bgm.assetId}:${profileV1Media.bgm.rightsState}`]
      : []),
  ];
  const warnings = [
    ...(openingV1Media && !openingV1Media.ambienceReadyForMix
      ? [`OPENING_V1_AMBIENCE:${openingV1Media.ambiencePlayableCount}/${openingV1Media.ambienceExpectedCount}:MIX_NOT_READY`]
      : []),
    ...(profileV1Media && profileV1Media.structureReview.state !== "PASS"
      ? [`PROFILE_V1_STRUCTURE_REVIEW:${profileV1Media.structureReview.state}`]
      : []),
  ];
  const readyForAssembly =
    typography.summary.batchReadyForPalmierDaVinciHandoff &&
    finalChecksPass &&
    openingV1MediaBlockingGatePass &&
    profileV1MediaBlockingGatePass;

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
      profileV1Media,
    },
    handoff: {
      readyForPalmierDaVinciAssembly: readyForAssembly,
      productionReady: false,
      blockers,
      warnings,
      rule: "Assembly-readyは全Sceneのcurrent Typography package + Production Workspace final checksに加え、OpeningではMotion Studio正本の11写真/BGM gate、Profileでは5章17実素材role + BGM権利gateが揃った状態だけを示す。Profileの章role/editIntentとSHA-bound structure review状態もhandoffへ保持するが、structure reviewは実素材/BGM/content/Mac Actualの代替ではない。各media gateのHuman QA / Mac ActualはNOT_RUNを保持し、DaVinci Mac Actual / Human promotion / Scene-bound Release GateなしにproductionReadyへ昇格しない。",
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
