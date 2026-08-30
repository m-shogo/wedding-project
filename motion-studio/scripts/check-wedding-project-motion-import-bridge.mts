import assert from 'node:assert/strict';
import {
  buildWeddingProjectMotionAssemblyInput,
  parseWeddingProjectMotionProductionHandoff,
} from '../src/data/weddingProjectMotionImport.ts';

const base = {
  schemaVersion: 'wedding-project-motion-production-handoff/v1',
  authority: 'DERIVED_FROM_HUMAN_PROJECT_AND_SCENE_ASSIGNMENTS',
  projectId: 'opening',
  assignments: [
    {
      patternId: 'motion-mask-reveal',
      sceneId: 'opening-scene-01',
      assignedBy: 'HUMAN_MASTER',
      assignedAt: '2026-08-30T06:00:00.000Z',
      sceneAssignedAt: '2026-08-30T06:01:00.000Z',
      usageStage: 'ROUGH',
      usageResolved: true,
      sceneResolved: true,
    },
  ],
  scenes: [
    {
      schemaVersion: 'wedding-scene-motion-production-handoff/v1',
      projectId: 'opening',
      scene: {sceneId: 'opening-scene-01'},
      motions: [
        {
          patternId: 'motion-mask-reveal',
          usageStage: 'ROUGH',
          implementationVerified: true,
          previewVerified: true,
        },
      ],
      readiness: {handoffReferenceReady: true},
      blockers: [],
    },
  ],
  summary: {
    projectAssignmentCount: 1,
    sceneAssignedCount: 1,
    unassignedSceneCount: 0,
    staleSceneReferenceCount: 0,
    unresolvedUsageCount: 0,
    sceneHandoffReadyCount: 1,
    allAssignedMotionsReadyForHandoffReference: true,
    productionReady: false,
    remotionStudioGuiActual: 'NOT_RUN',
    macDaVinciGuiActual: 'NOT_RUN',
  },
  blockers: [],
  rule: 'fixture',
} as const;

const parsed = parseWeddingProjectMotionProductionHandoff(base);
assert.equal(parsed.projectId, 'opening');

const ready = buildWeddingProjectMotionAssemblyInput(base);
assert.equal(ready.authority, 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_BRIDGE');
assert.equal(ready.assemblyReferenceReady, true);
assert.equal(ready.roughReferenceCount, 1);
assert.equal(ready.finalReferenceCount, 0);
assert.deepEqual(ready.blockerCodes, []);
assert.equal(ready.productionReady, false);
assert.equal(ready.remotionStudioGuiActual, 'NOT_RUN');
assert.equal(ready.macDaVinciGuiActual, 'NOT_RUN');

const stale = structuredClone(base) as any;
stale.assignments[0].sceneResolved = false;
stale.scenes = [];
stale.summary.sceneAssignedCount = 0;
stale.summary.staleSceneReferenceCount = 1;
stale.summary.sceneHandoffReadyCount = 0;
stale.summary.allAssignedMotionsReadyForHandoffReference = false;
stale.blockers = ['PROJECT_MOTION_STALE_SCENE_REF:motion-mask-reveal:opening-scene-01'];
const blocked = buildWeddingProjectMotionAssemblyInput(stale);
assert.equal(blocked.assemblyReferenceReady, false);
assert(blocked.blockerCodes.some((code) => code.startsWith('PROJECT_MOTION_STALE_SCENE_REF:')));
assert(blocked.blockerActions.every((action) => action.kind === 'HUMAN'));

const unverified = structuredClone(base) as any;
unverified.scenes[0].motions[0].implementationVerified = false;
unverified.scenes[0].motions[0].previewVerified = false;
unverified.scenes[0].readiness.handoffReferenceReady = false;
const verificationBlocked = buildWeddingProjectMotionAssemblyInput(unverified);
assert(verificationBlocked.blockerCodes.includes('PROJECT_MOTION_IMPLEMENTATION_NOT_VERIFIED:opening-scene-01:motion-mask-reveal'));
assert(verificationBlocked.blockerCodes.includes('PROJECT_MOTION_PREVIEW_NOT_VERIFIED:opening-scene-01:motion-mask-reveal'));
assert(verificationBlocked.blockerCodes.includes('PROJECT_MOTION_SCENE_HANDOFF_NOT_READY:opening-scene-01'));

const wrongProject = structuredClone(base) as any;
wrongProject.scenes[0].projectId = 'profile';
assert.throws(() => parseWeddingProjectMotionProductionHandoff(wrongProject), /PROJECT_MOTION_IMPORT_PROJECT_MISMATCH/);

const badCount = structuredClone(base) as any;
badCount.summary.projectAssignmentCount = 2;
assert.throws(() => parseWeddingProjectMotionProductionHandoff(badCount), /PROJECT_MOTION_IMPORT_ASSIGNMENT_COUNT_MISMATCH/);

const promoted = structuredClone(base) as any;
promoted.summary.productionReady = true;
assert.throws(() => parseWeddingProjectMotionProductionHandoff(promoted));

console.log('Wedding project Motion import bridge contract: PASS');
