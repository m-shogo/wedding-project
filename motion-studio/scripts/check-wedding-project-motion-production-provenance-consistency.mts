import assert from 'node:assert/strict';
import {verifyWeddingProjectMotionProductionProvenanceValues} from './verify-wedding-project-motion-production-provenance.mts';

const sourceSha = 'a'.repeat(64);
const receiptSha = 'b'.repeat(64);
const currentnessSha = 'c'.repeat(64);
const provenance = {
  schemaVersion: 'wedding-project-motion-production-provenance/v1',
  authority: 'SHA_BOUND_CURRENT_PROJECT_MOTION_IMPORT',
  projectId: 'profile',
  sourceExport: {path: '/tmp/profile-project-motion.json', sha256: sourceSha},
  receiptArtifact: {path: '/tmp/project-motion-import-receipt.json', sha256: receiptSha},
  currentnessArtifact: {path: '/tmp/project-motion-import-currentness.json', sha256: currentnessSha, state: 'CURRENT'},
  assemblyGate: {
    palmierCurrent: true,
    davinciHandoffCurrent: true,
    macDaVinciGuiActual: 'NOT_RUN',
    productionReady: false,
  },
  evidenceBoundary: {
    remotionStudioGuiActual: 'NOT_RUN',
    macDaVinciGuiActual: 'NOT_RUN',
    productionReady: false,
  },
  guardrails: [],
};
const bundle = {projectMotionProvenance: structuredClone(provenance)};
const recovery = {projectMotionProvenance: structuredClone(provenance)};
const markdown = [
  '# DaVinci Wedding Production Recovery Attachment',
  `project-motion-source-sha256: ${sourceSha}`,
  `project-motion-receipt-sha256: ${receiptSha}`,
  `project-motion-currentness-sha256: ${currentnessSha}`,
  'project-motion-currentness-state: CURRENT',
  'palmier-project-motion-current: yes',
  'davinci-project-motion-handoff-current: yes',
  'mac-remotion-studio-gui-actual: NOT_RUN',
  'mac-davinci-gui-actual: NOT_RUN',
  'production-ready-by-project-motion-provenance: no',
].join('\n');

const current = verifyWeddingProjectMotionProductionProvenanceValues(
  'profile',
  bundle,
  recovery,
  markdown,
  structuredClone(provenance),
);
assert.equal(current.state, 'CURRENT');
assert.equal(current.sourceSha256, sourceSha);
assert.equal(current.macRemotionStudioGuiActual, 'NOT_RUN');
assert.equal(current.macDaVinciGuiActual, 'NOT_RUN');
assert.equal(current.productionReady, false);

assert.equal(
  verifyWeddingProjectMotionProductionProvenanceValues('profile', {}, {}, '', undefined).state,
  'NOT_APPLICABLE',
);

const recoveryDrift = structuredClone(recovery);
recoveryDrift.projectMotionProvenance.sourceExport.sha256 = 'd'.repeat(64);
assert.throws(
  () => verifyWeddingProjectMotionProductionProvenanceValues('profile', bundle, recoveryDrift, markdown, provenance),
  /PROJECT_MOTION_PROVENANCE_CONSISTENCY_BUNDLE_RECOVERY_DRIFT:profile/,
);

const canonicalDrift = structuredClone(provenance);
canonicalDrift.receiptArtifact.sha256 = 'e'.repeat(64);
assert.throws(
  () => verifyWeddingProjectMotionProductionProvenanceValues('profile', bundle, recovery, markdown, canonicalDrift),
  /PROJECT_MOTION_PROVENANCE_CONSISTENCY_CANONICAL_DRIFT:profile/,
);

assert.throws(
  () => verifyWeddingProjectMotionProductionProvenanceValues('profile', bundle, recovery, `${markdown}\nproject-motion-source-sha256: ${sourceSha}`, provenance),
  /PROJECT_MOTION_PROVENANCE_CONSISTENCY_MARKDOWN_DRIFT:profile/,
);

const promoted = structuredClone(bundle);
promoted.projectMotionProvenance.evidenceBoundary.macDaVinciGuiActual = 'PASS';
assert.throws(
  () => verifyWeddingProjectMotionProductionProvenanceValues('profile', promoted, recovery, markdown, provenance),
  /PROJECT_MOTION_PROVENANCE_CONSISTENCY_BUNDLE_RECOVERY_DRIFT:profile|PROJECT_MOTION_PROVENANCE_CONSISTENCY_BOUNDARY_INVALID:profile/,
);

assert.throws(
  () => verifyWeddingProjectMotionProductionProvenanceValues('profile', bundle, {}, markdown, provenance),
  /PROJECT_MOTION_PROVENANCE_CONSISTENCY_PARTIAL_ATTACHMENT:profile/,
);

console.log('Wedding Project Motion production provenance consistency contract: PASS');
