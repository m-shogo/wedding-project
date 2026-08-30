import {buildWeddingSceneMotionProductionHandoff, type WeddingSceneMotionProductionHandoffV1} from "./weddingSceneMotionProductionHandoff";
import {getWeddingProductionMotionUsage} from "./weddingProductionMotionUsage";
import type {WeddingProjectMotionAssignmentState} from "./weddingProjectMotionAssignments";
import type {MaskRevealSceneInstance, MotionZukanComposerState, SceneProjectId} from "./visualSceneComposer";

export interface WeddingProjectMotionProductionHandoffV1 {
  schemaVersion: "wedding-project-motion-production-handoff/v1";
  authority: "DERIVED_FROM_HUMAN_PROJECT_AND_SCENE_ASSIGNMENTS";
  projectId: SceneProjectId;
  assignments: Array<{
    patternId: string;
    sceneId: string | null;
    assignedBy: "HUMAN_MASTER";
    assignedAt: string;
    sceneAssignedAt: string | null;
    usageStage: "ROUGH" | "FINAL" | null;
    usageResolved: boolean;
    sceneResolved: boolean;
  }>;
  scenes: WeddingSceneMotionProductionHandoffV1[];
  summary: {
    projectAssignmentCount: number;
    sceneAssignedCount: number;
    unassignedSceneCount: number;
    staleSceneReferenceCount: number;
    unresolvedUsageCount: number;
    sceneHandoffReadyCount: number;
    allAssignedMotionsReadyForHandoffReference: boolean;
    productionReady: false;
    remotionStudioGuiActual: "NOT_RUN";
    macDaVinciGuiActual: "NOT_RUN";
  };
  blockers: string[];
  rule: string;
}

export function buildWeddingProjectMotionProductionHandoff(
  projectId: SceneProjectId,
  composer: MotionZukanComposerState,
  assignmentState: WeddingProjectMotionAssignmentState,
): WeddingProjectMotionProductionHandoffV1 {
  const timeline = composer.timelines.find((item) => item.projectId === projectId);
  if (!timeline) throw new Error("WEDDING_PROJECT_MOTION_HANDOFF_TIMELINE_MISSING");

  const usage = getWeddingProductionMotionUsage();
  const usageByPattern = new Map(usage.used.map((record) => [record.patternId, record]));
  const sceneById = new Map(
    timeline.sceneIds.flatMap((sceneId) => {
      const scene = composer.scenes.find((item) => item.projectId === projectId && item.sceneId === sceneId);
      return scene ? [[sceneId, scene] as const] : [];
    }),
  );
  const projectAssignments = assignmentState.assignments.filter((assignment) => assignment.projectId === projectId);
  const assignments = projectAssignments.map((assignment) => {
    const usageRecord = usageByPattern.get(assignment.patternId) ?? null;
    return {
      patternId: assignment.patternId,
      sceneId: assignment.sceneId,
      assignedBy: assignment.assignedBy,
      assignedAt: assignment.assignedAt,
      sceneAssignedAt: assignment.sceneAssignedAt,
      usageStage: usageRecord?.usageStage ?? null,
      usageResolved: Boolean(usageRecord),
      sceneResolved: assignment.sceneId === null ? false : sceneById.has(assignment.sceneId),
    };
  });

  const assignedSceneIds = Array.from(new Set(
    assignments.flatMap((assignment) => assignment.sceneId && assignment.sceneResolved ? [assignment.sceneId] : []),
  ));
  const scenes = assignedSceneIds.flatMap((sceneId) => {
    const scene = sceneById.get(sceneId);
    return scene ? [buildWeddingSceneMotionProductionHandoff(scene as MaskRevealSceneInstance, assignmentState)] : [];
  });
  const unassigned = assignments.filter((assignment) => assignment.sceneId === null);
  const staleSceneReferences = assignments.filter((assignment) => assignment.sceneId !== null && !assignment.sceneResolved);
  const unresolvedUsage = assignments.filter((assignment) => !assignment.usageResolved);
  const sceneBlockers = scenes.flatMap((scene) => scene.blockers.map((blocker) => `SCENE:${scene.scene.sceneId}:${blocker}`));
  const blockers = [
    ...unassigned.map((assignment) => `PROJECT_MOTION_SCENE_NOT_ASSIGNED:${assignment.patternId}`),
    ...staleSceneReferences.map((assignment) => `PROJECT_MOTION_STALE_SCENE_REF:${assignment.patternId}:${assignment.sceneId}`),
    ...unresolvedUsage.map((assignment) => `PROJECT_MOTION_USAGE_NOT_FOUND:${assignment.patternId}`),
    ...sceneBlockers,
  ];
  const sceneHandoffReadyCount = scenes.filter((scene) => scene.readiness.handoffReferenceReady).length;

  return {
    schemaVersion: "wedding-project-motion-production-handoff/v1",
    authority: "DERIVED_FROM_HUMAN_PROJECT_AND_SCENE_ASSIGNMENTS",
    projectId,
    assignments,
    scenes,
    summary: {
      projectAssignmentCount: assignments.length,
      sceneAssignedCount: assignments.filter((assignment) => assignment.sceneId !== null && assignment.sceneResolved).length,
      unassignedSceneCount: unassigned.length,
      staleSceneReferenceCount: staleSceneReferences.length,
      unresolvedUsageCount: unresolvedUsage.length,
      sceneHandoffReadyCount,
      allAssignedMotionsReadyForHandoffReference: blockers.length === 0,
      productionReady: false,
      remotionStudioGuiActual: "NOT_RUN",
      macDaVinciGuiActual: "NOT_RUN",
    },
    blockers,
    rule: "WeddingでHuman Masterが明示採用したROUGH/FINAL Motionだけをproject assemblyへ集約する。project assignmentはexact Scene assignmentまで解決し、Scene-bound implementation/preview verificationがcurrentである必要がある。Motion未採用projectはblockしないが、採用済みMotionの未割当・stale Scene・未検証はPalmier→DaVinci assembly referenceをfail-closeする。export/verification metadataはRemotion Studio GUI Actual、Mac DaVinci GUI Actual、Human QA、productionReadyを意味しない。",
  };
}

export function buildWeddingProjectMotionProductionHandoffJson(
  projectId: SceneProjectId,
  composer: MotionZukanComposerState,
  assignmentState: WeddingProjectMotionAssignmentState,
) {
  return JSON.stringify(buildWeddingProjectMotionProductionHandoff(projectId, composer, assignmentState), null, 2);
}
