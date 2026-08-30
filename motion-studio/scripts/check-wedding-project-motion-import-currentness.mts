import assert from 'node:assert/strict';
import {buildWeddingProjectMotionImportReceiptFromText} from './wedding-project-motion-import-receipt.mts';
import {buildWeddingProjectMotionReceiptCurrentnessFromText} from './wedding-project-motion-import-currentness.mts';

const readyExport = {
  schemaVersion: 'wedding-project-motion-production-handoff/v1',
  authority: 'DERIVED_FROM_HUMAN_PROJECT_AND_SCENE_ASSIGNMENTS',
  projectId: 'profile',
  assignments: [
    {
      patternId: 'quiet-caption',
      sceneId: 'profile-scene-01',
      assignedBy: 'HUMAN_MASTER',
      assignedAt: '2026-08-30T06:10:00.000Z',
      sceneAssignedAt: '2026-08-30T06:11:00.000Z',
      usageStage: 'FINAL',
      usageResolved: true,
      sceneResolved: true,
    },
  ],
  scenes: [
    {
      schemaVersion: 'wedding-scene-motion-production-handoff/v1',
      projectId: 'profile',
      scene: {sceneId: 'profile-scene-01'},
      motions: [
        {
          patternId: 'quiet-caption',
          usageStage: 'FINAL',
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
};

const exportText = JSON.stringify(readyExport, null, 2);
const receipt = buildWeddingProjectMotionImportReceiptFromText(
  exportText,
  '/tmp/profile project motion.json',
  'profile',
);
const receiptText = JSON.stringify(receipt, null, 2);

const current = buildWeddingProjectMotionReceiptCurrentnessFromText(
  receiptText,
  exportText,
  '/tmp/profile-receipt.json',
  '/tmp/profile project motion.json',
  'profile',
);
assert.equal(current.state, 'CURRENT');
assert.deepEqual(current.blockerCodes, []);
assert.equal(current.assemblyGate.palmierCurrent, true);
assert.equal(current.assemblyGate.davinciHandoffCurrent, true);
assert.equal(current.assemblyGate.macDaVinciGuiActual, 'NOT_RUN');
assert.equal(current.assemblyGate.productionReady, false);
assert.deepEqual(current.recoveryActions, []);

const changedExport = structuredClone(readyExport) as any;
changedExport.assignments[0].sceneId = 'profile-scene-02';
const stale = buildWeddingProjectMotionReceiptCurrentnessFromText(
  receiptText,
  JSON.stringify(changedExport, null, 2),
  '/tmp/profile-receipt.json',
  "/tmp/profile project's motion.json",
  'profile',
);
assert.equal(stale.state, 'STALE');
assert.deepEqual(stale.blockerCodes, ['PROJECT_MOTION_IMPORT_RECEIPT_STALE']);
assert.equal(stale.assemblyGate.palmierCurrent, false);
assert.equal(stale.assemblyGate.davinciHandoffCurrent, false);
assert.equal(stale.assemblyGate.macDaVinciGuiActual, 'NOT_RUN');
assert.equal(stale.assemblyGate.productionReady, false);
assert.equal(stale.recoveryActions[0]?.kind, 'COMMAND');
assert.match(stale.recoveryActions[0]?.command ?? '', /wedding-project-motion-import-receipt\.mts/);
assert.match(stale.recoveryActions[0]?.command ?? '', /--movie=profile/);
assert.match(stale.recoveryActions[0]?.command ?? '', /profile project/);
assert.equal(stale.recoveryActions[1]?.kind, 'HUMAN');

const blockedExport = structuredClone(readyExport) as any;
blockedExport.assignments[0].sceneId = null;
blockedExport.assignments[0].sceneResolved = false;
blockedExport.assignments[0].sceneAssignedAt = null;
blockedExport.scenes = [];
blockedExport.summary.sceneAssignedCount = 0;
blockedExport.summary.unassignedSceneCount = 1;
blockedExport.summary.sceneHandoffReadyCount = 0;
blockedExport.summary.allAssignedMotionsReadyForHandoffReference = false;
blockedExport.blockers = ['PROJECT_MOTION_SCENE_NOT_ASSIGNED:quiet-caption'];
const blockedText = JSON.stringify(blockedExport, null, 2);
const blockedReceipt = buildWeddingProjectMotionImportReceiptFromText(
  blockedText,
  '/tmp/profile-motion-blocked.json',
  'profile',
);
const blockedCurrent = buildWeddingProjectMotionReceiptCurrentnessFromText(
  JSON.stringify(blockedReceipt),
  blockedText,
  '/tmp/profile-blocked-receipt.json',
  '/tmp/profile-motion-blocked.json',
  'profile',
);
assert.equal(blockedCurrent.state, 'CURRENT');
assert.equal(blockedCurrent.assemblyGate.palmierCurrent, false);
assert.equal(blockedCurrent.assemblyGate.davinciHandoffCurrent, false);
assert.equal(blockedCurrent.assemblyGate.macDaVinciGuiActual, 'NOT_RUN');

assert.throws(
  () =>
    buildWeddingProjectMotionReceiptCurrentnessFromText(
      receiptText,
      exportText,
      '/tmp/profile-receipt.json',
      '/tmp/profile-motion.json',
      'opening',
    ),
  /PROJECT_MOTION_CURRENTNESS_PROJECT_MISMATCH:profile:opening/,
);
assert.throws(
  () =>
    buildWeddingProjectMotionReceiptCurrentnessFromText(
      JSON.stringify({schemaVersion: 'old'}),
      exportText,
      '/tmp/invalid-receipt.json',
      '/tmp/profile-motion.json',
    ),
  /PROJECT_MOTION_IMPORT_RECEIPT_INVALID:schema/,
);

console.log('Wedding project Motion import receipt currentness contract: PASS');
