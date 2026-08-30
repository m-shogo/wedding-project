import {z} from 'zod';
import type {ProductionRecoveryAction} from './resolveHandoff.schema.ts';

const usageStageSchema = z.enum(['ROUGH', 'FINAL']);

const importedAssignmentSchema = z.object({
  patternId: z.string().min(1),
  sceneId: z.string().min(1).nullable(),
  assignedBy: z.literal('HUMAN_MASTER'),
  assignedAt: z.string().min(1),
  sceneAssignedAt: z.string().min(1).nullable(),
  usageStage: usageStageSchema.nullable(),
  usageResolved: z.boolean(),
  sceneResolved: z.boolean(),
});

const importedSceneMotionSchema = z.object({
  patternId: z.string().min(1),
  usageStage: usageStageSchema,
  implementationVerified: z.boolean(),
  previewVerified: z.boolean(),
}).passthrough();

const importedSceneSchema = z.object({
  schemaVersion: z.string().min(1),
  projectId: z.enum(['opening', 'profile']),
  scene: z.object({
    sceneId: z.string().min(1),
  }).passthrough(),
  motions: z.array(importedSceneMotionSchema),
  readiness: z.object({
    handoffReferenceReady: z.boolean(),
  }).passthrough(),
  blockers: z.array(z.string()),
}).passthrough();

export const weddingProjectMotionProductionHandoffImportSchema = z.object({
  schemaVersion: z.literal('wedding-project-motion-production-handoff/v1'),
  authority: z.literal('DERIVED_FROM_HUMAN_PROJECT_AND_SCENE_ASSIGNMENTS'),
  projectId: z.enum(['opening', 'profile']),
  assignments: z.array(importedAssignmentSchema),
  scenes: z.array(importedSceneSchema),
  summary: z.object({
    projectAssignmentCount: z.number().int().nonnegative(),
    sceneAssignedCount: z.number().int().nonnegative(),
    unassignedSceneCount: z.number().int().nonnegative(),
    staleSceneReferenceCount: z.number().int().nonnegative(),
    unresolvedUsageCount: z.number().int().nonnegative(),
    sceneHandoffReadyCount: z.number().int().nonnegative(),
    allAssignedMotionsReadyForHandoffReference: z.boolean(),
    productionReady: z.literal(false),
    remotionStudioGuiActual: z.literal('NOT_RUN'),
    macDaVinciGuiActual: z.literal('NOT_RUN'),
  }),
  blockers: z.array(z.string()),
  rule: z.string().min(1),
});

export type WeddingProjectMotionProductionHandoffImport = z.infer<
  typeof weddingProjectMotionProductionHandoffImportSchema
>;

export interface WeddingProjectMotionAssemblyInputV1 {
  schemaVersion: 'motion-studio-project-motion-assembly-input/v1';
  authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_BRIDGE';
  projectId: 'opening' | 'profile';
  acceptedAssignmentCount: number;
  sceneReferenceCount: number;
  roughReferenceCount: number;
  finalReferenceCount: number;
  assemblyReferenceReady: boolean;
  blockerCodes: string[];
  blockerActions: ProductionRecoveryAction[];
  productionReady: false;
  remotionStudioGuiActual: 'NOT_RUN';
  macDaVinciGuiActual: 'NOT_RUN';
  guardrails: string[];
}

function blockerAction(projectId: 'opening' | 'profile', blockerCode: string, index: number): ProductionRecoveryAction {
  const encoded = encodeURIComponent(blockerCode);
  return {
    id: `${projectId}-project-motion-${index + 1}`,
    kind: 'HUMAN',
    label: `Resolve project Motion blocker: ${blockerCode}`,
    purpose: `Return to Motion Zukan / Scene Composer and resolve the Human project Motion assignment or verification issue (${encoded}).`,
  };
}

export function parseWeddingProjectMotionProductionHandoff(
  value: unknown,
): WeddingProjectMotionProductionHandoffImport {
  const parsed = weddingProjectMotionProductionHandoffImportSchema.parse(value);
  if (parsed.scenes.some((scene) => scene.projectId !== parsed.projectId)) {
    throw new Error('PROJECT_MOTION_IMPORT_PROJECT_MISMATCH');
  }
  if (parsed.summary.projectAssignmentCount !== parsed.assignments.length) {
    throw new Error('PROJECT_MOTION_IMPORT_ASSIGNMENT_COUNT_MISMATCH');
  }
  return parsed;
}

export function buildWeddingProjectMotionAssemblyInput(
  value: unknown,
): WeddingProjectMotionAssemblyInputV1 {
  const imported = parseWeddingProjectMotionProductionHandoff(value);
  const derivedBlockers = new Set<string>(imported.blockers);

  for (const assignment of imported.assignments) {
    if (!assignment.usageResolved || assignment.usageStage === null) {
      derivedBlockers.add(`PROJECT_MOTION_USAGE_NOT_RESOLVED:${assignment.patternId}`);
    }
    if (assignment.sceneId === null) {
      derivedBlockers.add(`PROJECT_MOTION_SCENE_NOT_ASSIGNED:${assignment.patternId}`);
    } else if (!assignment.sceneResolved) {
      derivedBlockers.add(`PROJECT_MOTION_STALE_SCENE_REF:${assignment.patternId}:${assignment.sceneId}`);
    }
  }

  for (const scene of imported.scenes) {
    if (!scene.readiness.handoffReferenceReady) {
      derivedBlockers.add(`PROJECT_MOTION_SCENE_HANDOFF_NOT_READY:${scene.scene.sceneId}`);
    }
    for (const motion of scene.motions) {
      if (!motion.implementationVerified) {
        derivedBlockers.add(`PROJECT_MOTION_IMPLEMENTATION_NOT_VERIFIED:${scene.scene.sceneId}:${motion.patternId}`);
      }
      if (!motion.previewVerified) {
        derivedBlockers.add(`PROJECT_MOTION_PREVIEW_NOT_VERIFIED:${scene.scene.sceneId}:${motion.patternId}`);
      }
    }
  }

  const blockerCodes = [...derivedBlockers];
  const motions = imported.scenes.flatMap((scene) => scene.motions);
  return {
    schemaVersion: 'motion-studio-project-motion-assembly-input/v1',
    authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_BRIDGE',
    projectId: imported.projectId,
    acceptedAssignmentCount: imported.assignments.length,
    sceneReferenceCount: imported.scenes.length,
    roughReferenceCount: motions.filter((motion) => motion.usageStage === 'ROUGH').length,
    finalReferenceCount: motions.filter((motion) => motion.usageStage === 'FINAL').length,
    assemblyReferenceReady: blockerCodes.length === 0,
    blockerCodes,
    blockerActions: blockerCodes.map((blocker, index) => blockerAction(imported.projectId, blocker, index)),
    productionReady: false,
    remotionStudioGuiActual: 'NOT_RUN',
    macDaVinciGuiActual: 'NOT_RUN',
    guardrails: [
      'DASHBOARD_PROJECT_MOTION_EXPORT != MOTION_STUDIO_IMPORT_ACCEPTED',
      'MOTION_STUDIO_IMPORT_ACCEPTED != PALMIER_APPLICATION_PERFORMED',
      'MOTION_STUDIO_IMPORT_ACCEPTED != DAVINCI_APPLICATION_PERFORMED',
      'PROJECT_MOTION_VERIFICATION_METADATA != REMOTION_STUDIO_GUI_ACTUAL',
      'PROJECT_MOTION_VERIFICATION_METADATA != MAC_DAVINCI_GUI_ACTUAL',
      'PROJECT_MOTION_ASSEMBLY_REFERENCE_READY != PRODUCTION_READY',
    ],
  };
}
