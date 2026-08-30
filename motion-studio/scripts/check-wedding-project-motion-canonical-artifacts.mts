import assert from 'node:assert/strict';
import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {getWeddingProjectMotionCanonicalArtifactPaths} from './wedding-project-motion-artifact-store.mts';

const root = resolve(new URL('..', import.meta.url).pathname);
const temp = mkdtempSync(join(tmpdir(), 'wedding-project-motion-canonical-'));
const artifactRoot = join(temp, 'artifacts');
const env = {...process.env, WEDDING_PROJECT_MOTION_ARTIFACT_ROOT: artifactRoot};

const readyExport = {
  schemaVersion: 'wedding-project-motion-production-handoff/v1',
  authority: 'DERIVED_FROM_HUMAN_PROJECT_AND_SCENE_ASSIGNMENTS',
  projectId: 'profile',
  assignments: [
    {
      patternId: 'quiet-caption',
      sceneId: 'profile-scene-01',
      assignedBy: 'HUMAN_MASTER',
      assignedAt: '2026-08-30T08:30:00.000Z',
      sceneAssignedAt: '2026-08-30T08:31:00.000Z',
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

const exportPath = join(temp, 'profile-project-motion.json');
writeFileSync(exportPath, JSON.stringify(readyExport, null, 2));

const run = (script: string, args: string[]) =>
  spawnSync(process.execPath, ['--no-warnings', script, ...args], {
    cwd: root,
    encoding: 'utf8',
    env,
  });

const imported = run('scripts/wedding-project-motion-import-receipt.mts', [
  `--input=${exportPath}`,
  '--movie=profile',
  '--save-current',
]);
assert.equal(imported.status, 0, imported.stderr);
assert.match(imported.stderr, /canonicalProjectMotionReceipt=/);

process.env.WEDDING_PROJECT_MOTION_ARTIFACT_ROOT = artifactRoot;
const canonical = getWeddingProjectMotionCanonicalArtifactPaths('profile');
delete process.env.WEDDING_PROJECT_MOTION_ARTIFACT_ROOT;
assert.equal(existsSync(canonical.receipt), true);
const savedReceipt = JSON.parse(readFileSync(canonical.receipt, 'utf8'));
assert.equal(savedReceipt.projectId, 'profile');
assert.equal(savedReceipt.source.path, exportPath);
assert.equal(savedReceipt.evidenceBoundary.remotionStudioGuiActual, 'NOT_RUN');
assert.equal(savedReceipt.evidenceBoundary.macDaVinciGuiActual, 'NOT_RUN');
assert.equal(savedReceipt.evidenceBoundary.productionReady, false);

const checked = run('scripts/wedding-project-motion-import-currentness.mts', [
  '--movie=profile',
  '--use-current',
]);
assert.equal(checked.status, 0, checked.stderr);
assert.match(checked.stdout, /"state": "CURRENT"/);
assert.match(checked.stderr, /canonicalProjectMotionCurrentness=/);
assert.equal(existsSync(canonical.currentness), true);
const savedCurrentness = JSON.parse(readFileSync(canonical.currentness, 'utf8'));
assert.equal(savedCurrentness.state, 'CURRENT');
assert.equal(savedCurrentness.assemblyGate.palmierCurrent, true);
assert.equal(savedCurrentness.assemblyGate.davinciHandoffCurrent, true);
assert.equal(savedCurrentness.assemblyGate.macDaVinciGuiActual, 'NOT_RUN');
assert.equal(savedCurrentness.assemblyGate.productionReady, false);

const changedExport = structuredClone(readyExport) as any;
changedExport.assignments[0].sceneId = 'profile-scene-02';
writeFileSync(exportPath, JSON.stringify(changedExport, null, 2));
const staleHandoff = run('scripts/export-wedding-production-handoff.mts', ['--movie=profile']);
assert.equal(staleHandoff.status, 2);
assert.match(staleHandoff.stdout, /"state": "STALE"/);
assert.match(staleHandoff.stdout, /PROJECT_MOTION_IMPORT_RECEIPT_STALE/);
assert.match(staleHandoff.stderr, /--save-current/);
assert.match(staleHandoff.stderr, /Mac Remotion Studio GUI Actual remains NOT_RUN/);
assert.match(staleHandoff.stderr, /Mac DaVinci Actual remains NOT_RUN/);
assert.doesNotMatch(staleHandoff.stderr, /production bundle export failed/);
const staleArtifact = JSON.parse(readFileSync(canonical.currentness, 'utf8'));
assert.equal(staleArtifact.state, 'STALE');
assert.equal(staleArtifact.assemblyGate.palmierCurrent, false);
assert.equal(staleArtifact.assemblyGate.davinciHandoffCurrent, false);

rmSync(exportPath);
const missingSource = run('scripts/export-wedding-production-handoff.mts', ['--movie=profile']);
assert.equal(missingSource.status, 2);
assert.match(missingSource.stderr, /canonical Project Motion artifact could not be validated/);
assert.match(missingSource.stderr, /--save-current/);
assert.match(missingSource.stderr, /Mac Remotion Studio GUI Actual remains NOT_RUN/);
assert.match(missingSource.stderr, /Mac DaVinci Actual remains NOT_RUN/);

console.log('Wedding project Motion canonical artifact contract: PASS');
