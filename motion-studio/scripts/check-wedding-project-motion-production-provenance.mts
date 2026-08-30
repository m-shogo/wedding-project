import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {
  getWeddingProjectMotionCanonicalArtifactPaths,
  writeCanonicalJsonArtifact,
} from './wedding-project-motion-artifact-store.mts';
import {attachWeddingProjectMotionProductionProvenance} from './wedding-project-motion-production-provenance.mts';

const temp = mkdtempSync(join(tmpdir(), 'wedding-project-motion-provenance-'));
process.env.WEDDING_PROJECT_MOTION_ARTIFACT_ROOT = temp;

try {
  const sourcePath = join(temp, 'opening-project-motion.json');
  const sourceText = `${JSON.stringify({
    schemaVersion: 'wedding-project-motion-production-handoff/v1',
    projectId: 'opening',
    assignments: [],
    scenes: [],
    summary: {},
    blockers: [],
  }, null, 2)}\n`;
  writeFileSync(sourcePath, sourceText, 'utf8');
  const sourceSha256 = createHash('sha256').update(sourceText).digest('hex');

  const canonical = getWeddingProjectMotionCanonicalArtifactPaths('opening');
  writeCanonicalJsonArtifact(canonical.receipt, {
    schemaVersion: 'motion-studio-project-motion-import-receipt/v1',
    authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_RECEIPT',
    projectId: 'opening',
    source: {path: sourcePath, sha256: sourceSha256},
    assemblyInput: {projectId: 'opening', assemblyReferenceReady: true},
    recovery: {bridge: {palmierCurrent: true, davinciHandoffCurrent: true}},
    evidenceBoundary: {
      remotionStudioGuiActual: 'NOT_RUN',
      macDaVinciGuiActual: 'NOT_RUN',
      productionReady: false,
    },
    guardrails: [],
  });

  const bundlePath = join(temp, 'opening-v1-production-bundle.json');
  writeFileSync(bundlePath, `${JSON.stringify({
    schemaVersion: 'opening-v1-production-bundle/v1',
    authority: 'FINAL_RENDER_BOUND_HANDOFF',
    davinci: {macActualState: 'NOT_RUN', productionReady: false},
  }, null, 2)}\n`);

  const bundleProvenance = attachWeddingProjectMotionProductionProvenance('opening', bundlePath);
  assert.equal(bundleProvenance.sourceExport.sha256, sourceSha256);
  assert.equal(bundleProvenance.currentnessArtifact.state, 'CURRENT');
  assert.equal(bundleProvenance.assemblyGate.palmierCurrent, true);
  assert.equal(bundleProvenance.assemblyGate.davinciHandoffCurrent, true);
  assert.equal(bundleProvenance.assemblyGate.macDaVinciGuiActual, 'NOT_RUN');
  assert.equal(bundleProvenance.assemblyGate.productionReady, false);
  assert.equal(bundleProvenance.evidenceBoundary.remotionStudioGuiActual, 'NOT_RUN');
  assert.equal(bundleProvenance.evidenceBoundary.macDaVinciGuiActual, 'NOT_RUN');
  assert.equal(bundleProvenance.evidenceBoundary.productionReady, false);

  const savedBundle = JSON.parse(readFileSync(bundlePath, 'utf8'));
  assert.deepEqual(savedBundle.projectMotionProvenance, bundleProvenance);

  const recoveryPath = join(temp, 'opening-v1-davinci-production-recovery.json');
  writeFileSync(recoveryPath, `${JSON.stringify({
    schemaVersion: 'wedding-davinci-production-recovery-export/v1',
    authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY',
  }, null, 2)}\n`);
  const recoveryProvenance = attachWeddingProjectMotionProductionProvenance('opening', recoveryPath);
  assert.equal(recoveryProvenance.sourceExport.sha256, sourceSha256);
  assert.equal(recoveryProvenance.receiptArtifact.sha256, bundleProvenance.receiptArtifact.sha256);
  assert.equal(recoveryProvenance.currentnessArtifact.sha256, bundleProvenance.currentnessArtifact.sha256);

  writeFileSync(sourcePath, `${sourceText.trim()}\n `, 'utf8');
  assert.throws(
    () => attachWeddingProjectMotionProductionProvenance('opening', recoveryPath),
    /PROJECT_MOTION_PROVENANCE_NOT_CURRENT_OR_ACTIONABLE:opening:STALE/,
  );

  const afterStaleAttempt = JSON.parse(readFileSync(recoveryPath, 'utf8'));
  assert.equal(afterStaleAttempt.projectMotionProvenance.sourceExport.sha256, sourceSha256);
  assert.equal(afterStaleAttempt.projectMotionProvenance.assemblyGate.macDaVinciGuiActual, 'NOT_RUN');
  assert.equal(afterStaleAttempt.projectMotionProvenance.assemblyGate.productionReady, false);

  console.log('Wedding Project Motion production provenance contract: PASS');
} finally {
  delete process.env.WEDDING_PROJECT_MOTION_ARTIFACT_ROOT;
  rmSync(temp, {recursive: true, force: true});
}
