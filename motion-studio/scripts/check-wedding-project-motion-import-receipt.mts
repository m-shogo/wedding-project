import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {
  buildWeddingProjectMotionImportReceiptFromText,
} from './wedding-project-motion-import-receipt.mts';

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

const sourceText = JSON.stringify(readyExport, null, 2);
const receipt = buildWeddingProjectMotionImportReceiptFromText(sourceText, '/tmp/profile-motion-export.json', 'profile');
assert.equal(receipt.authority, 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_RECEIPT');
assert.equal(receipt.projectId, 'profile');
assert.equal(receipt.source.sha256, createHash('sha256').update(sourceText).digest('hex'));
assert.equal(receipt.assemblyInput.assemblyReferenceReady, true);
assert.equal(receipt.assemblyInput.finalReferenceCount, 1);
assert.equal(receipt.recovery.stage, 'davinciFinishing');
assert.equal(receipt.recovery.actual.state, 'NOT_RUN');
assert.equal(receipt.evidenceBoundary.remotionStudioGuiActual, 'NOT_RUN');
assert.equal(receipt.evidenceBoundary.macDaVinciGuiActual, 'NOT_RUN');
assert.equal(receipt.evidenceBoundary.productionReady, false);

const changedText = `${sourceText}\n`;
const changedReceipt = buildWeddingProjectMotionImportReceiptFromText(changedText, '/tmp/profile-motion-export.json', 'profile');
assert.notEqual(changedReceipt.source.sha256, receipt.source.sha256);

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
const blockedReceipt = buildWeddingProjectMotionImportReceiptFromText(
  JSON.stringify(blockedExport),
  '/tmp/profile-motion-export-blocked.json',
  'profile',
);
assert.equal(blockedReceipt.assemblyInput.assemblyReferenceReady, false);
assert.equal(blockedReceipt.recovery.stage, 'projectMotionAssembly');
assert.equal(blockedReceipt.recovery.bridge.palmierCurrent, false);
assert.equal(blockedReceipt.recovery.bridge.davinciHandoffCurrent, false);
assert.equal(blockedReceipt.recovery.actual.state, 'NOT_RUN');

assert.throws(
  () => buildWeddingProjectMotionImportReceiptFromText(sourceText, '/tmp/profile-motion-export.json', 'opening'),
  /PROJECT_MOTION_IMPORT_RECEIPT_PROJECT_MISMATCH:profile:opening/,
);

console.log('Wedding project Motion import receipt contract: PASS');
