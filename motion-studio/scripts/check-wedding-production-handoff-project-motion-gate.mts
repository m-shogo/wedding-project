import assert from 'node:assert/strict';
import {mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {buildWeddingProjectMotionImportReceiptFromText} from './wedding-project-motion-import-receipt.mts';

const root = resolve(new URL('..', import.meta.url).pathname);
const temp = mkdtempSync(join(tmpdir(), 'wedding-project-motion-gate-'));

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

const exportPath = join(temp, 'profile project motion.json');
const exportText = JSON.stringify(readyExport, null, 2);
writeFileSync(exportPath, exportText);
const receiptPath = join(temp, 'profile receipt.json');
writeFileSync(
  receiptPath,
  JSON.stringify(buildWeddingProjectMotionImportReceiptFromText(exportText, exportPath, 'profile'), null, 2),
);

const runHandoff = (args: string[]) =>
  spawnSync(process.execPath, ['--no-warnings', 'scripts/export-wedding-production-handoff.mts', ...args], {
    cwd: root,
    encoding: 'utf8',
  });

const missingPair = runHandoff(['--movie=profile', `--project-motion-receipt=${receiptPath}`]);
assert.equal(missingPair.status, 2);
assert.match(missingPair.stderr, /must be supplied together/);

const changedExport = structuredClone(readyExport) as any;
changedExport.assignments[0].sceneId = 'profile-scene-02';
writeFileSync(exportPath, JSON.stringify(changedExport, null, 2));
const stale = runHandoff([
  '--movie=profile',
  `--project-motion-receipt=${receiptPath}`,
  `--project-motion-export=${exportPath}`,
]);
assert.equal(stale.status, 2);
assert.match(stale.stdout, /"state": "STALE"/);
assert.match(stale.stdout, /PROJECT_MOTION_IMPORT_RECEIPT_STALE/);
assert.match(stale.stderr, /Project Motion import receipt is not current and assembly-actionable/);
assert.match(stale.stderr, /wedding-project-motion-import-receipt\.mts/);
assert.match(stale.stderr, /Mac Remotion Studio GUI Actual remains NOT_RUN/);
assert.match(stale.stderr, /Mac DaVinci Actual remains NOT_RUN/);
assert.doesNotMatch(stale.stdout + stale.stderr, /production bundle export failed/);

writeFileSync(exportPath, exportText);
const current = runHandoff([
  '--movie=profile',
  `--project-motion-receipt=${receiptPath}`,
  `--project-motion-export=${exportPath}`,
]);
assert.match(current.stdout, /Project Motion receipt currentness gate: profile=CURRENT/);
assert.doesNotMatch(current.stdout + current.stderr, /Project Motion import receipt is not current/);
// Fresh-clone production media is intentionally unavailable, so the canonical exporter should fail later.
assert.notEqual(current.status, 0);
assert.match(current.stderr, /production bundle export failed/);

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
const blockedExportPath = join(temp, 'blocked profile motion.json');
const blockedReceiptPath = join(temp, 'blocked profile receipt.json');
writeFileSync(blockedExportPath, blockedText);
writeFileSync(
  blockedReceiptPath,
  JSON.stringify(
    buildWeddingProjectMotionImportReceiptFromText(blockedText, blockedExportPath, 'profile'),
    null,
    2,
  ),
);
const blockedCurrent = runHandoff([
  '--movie=profile',
  `--project-motion-receipt=${blockedReceiptPath}`,
  `--project-motion-export=${blockedExportPath}`,
]);
assert.equal(blockedCurrent.status, 2);
assert.match(blockedCurrent.stdout, /"state": "CURRENT"/);
assert.match(blockedCurrent.stdout, /"palmierCurrent": false/);
assert.match(blockedCurrent.stderr, /not current and assembly-actionable/);
assert.doesNotMatch(blockedCurrent.stdout + blockedCurrent.stderr, /production bundle export failed/);

console.log('Wedding production handoff Project Motion currentness gate contract: PASS');
