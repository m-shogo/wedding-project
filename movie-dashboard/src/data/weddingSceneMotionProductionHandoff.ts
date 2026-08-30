import { getWeddingProductionMotionUsage } from "./weddingProductionMotionUsage";
import type { WeddingProjectMotionAssignmentState } from "./weddingProjectMotionAssignments";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export interface WeddingSceneMotionProductionHandoffV1 {
  schemaVersion: "wedding-scene-motion-production-handoff/v1";
  authority: "DERIVED_FROM_HUMAN_SCENE_ASSIGNMENTS";
  scene: {
    sceneId: string;
    projectId: "opening" | "profile";
    sourceRevision: string;
  };
  motions: Array<{
    patternId: string;
    japaneseName: string;
    commonName: string;
    usageStage: "ROUGH" | "FINAL";
    assignedBy: "HUMAN_MASTER";
    assignedAt: string;
    sceneAssignedAt: string | null;
    implementationStatus: string;
    previewStatus: string;
    verifiedImplementation: boolean;
    verifiedPreview: boolean;
    palmierIntent: "ROUGH_ASSEMBLY_REFERENCE";
    davinciIntent: "FINAL_REBUILD_OR_NATIVE_APPLICATION_REFERENCE";
  }>;
  readiness: {
    assignmentCount: number;
    allAssignmentsResolveToProductionUsage: boolean;
    allImplementationVerified: boolean;
    allPreviewVerified: boolean;
    handoffReferenceReady: boolean;
    productionReady: false;
    remotionStudioGuiActual: "NOT_RUN";
    macDaVinciGuiActual: "NOT_RUN";
  };
  blockers: string[];
  rule: string;
}

export function buildWeddingSceneMotionProductionHandoff(
  scene: MaskRevealSceneInstance,
  assignmentState: WeddingProjectMotionAssignmentState,
): WeddingSceneMotionProductionHandoffV1 {
  const usage = getWeddingProductionMotionUsage();
  const usageByPattern = new Map(usage.used.map((record) => [record.patternId, record]));
  const sceneAssignments = assignmentState.assignments.filter(
    (assignment) => assignment.projectId === scene.projectId && assignment.sceneId === scene.sceneId,
  );
  const motions = sceneAssignments.flatMap((assignment) => {
    const record = usageByPattern.get(assignment.patternId);
    if (!record) return [];
    return [{
      patternId: record.patternId,
      japaneseName: record.japaneseName,
      commonName: record.commonName,
      usageStage: record.usageStage,
      assignedBy: assignment.assignedBy,
      assignedAt: assignment.assignedAt,
      sceneAssignedAt: assignment.sceneAssignedAt,
      implementationStatus: record.implementationStatus,
      previewStatus: record.previewStatus,
      verifiedImplementation: record.verifiedImplementation,
      verifiedPreview: record.verifiedPreview,
      palmierIntent: "ROUGH_ASSEMBLY_REFERENCE" as const,
      davinciIntent: "FINAL_REBUILD_OR_NATIVE_APPLICATION_REFERENCE" as const,
    }];
  });
  const unresolved = sceneAssignments.filter((assignment) => !usageByPattern.has(assignment.patternId));
  const allImplementationVerified = motions.every((motion) => motion.verifiedImplementation);
  const allPreviewVerified = motions.every((motion) => motion.verifiedPreview);
  const blockers = [
    ...unresolved.map((assignment) => `SCENE_MOTION_USAGE_NOT_FOUND:${assignment.patternId}`),
    ...motions.filter((motion) => !motion.verifiedImplementation).map((motion) => `SCENE_MOTION_IMPLEMENTATION_NOT_VERIFIED:${motion.patternId}`),
    ...motions.filter((motion) => !motion.verifiedPreview).map((motion) => `SCENE_MOTION_PREVIEW_NOT_VERIFIED:${motion.patternId}`),
  ];
  return {
    schemaVersion: "wedding-scene-motion-production-handoff/v1",
    authority: "DERIVED_FROM_HUMAN_SCENE_ASSIGNMENTS",
    scene: { sceneId: scene.sceneId, projectId: scene.projectId, sourceRevision: scene.updatedAt },
    motions,
    readiness: {
      assignmentCount: sceneAssignments.length,
      allAssignmentsResolveToProductionUsage: unresolved.length === 0,
      allImplementationVerified,
      allPreviewVerified,
      handoffReferenceReady: sceneAssignments.length > 0 && blockers.length === 0,
      productionReady: false,
      remotionStudioGuiActual: "NOT_RUN",
      macDaVinciGuiActual: "NOT_RUN",
    },
    blockers,
    rule: "Human MasterがこのSceneへ明示割当したROUGH/FINAL MotionだけをPalmier rough / DaVinci finalの参照として渡す。assignmentやverified source metadataはGUI Actual実行・Human QA・productionReadyを意味しない。",
  };
}

export function buildWeddingSceneMotionProductionHandoffJson(
  scene: MaskRevealSceneInstance,
  assignmentState: WeddingProjectMotionAssignmentState,
) {
  return JSON.stringify(buildWeddingSceneMotionProductionHandoff(scene, assignmentState), null, 2);
}
