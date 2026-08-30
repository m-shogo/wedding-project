import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {
  appendProjectMotionProvenanceRecoveryMarkdown,
  buildProjectMotionProvenanceMarkdownSection,
} from './append-wedding-project-motion-provenance-recovery-markdown.mts';

const sha = 'a'.repeat(64);
const sidecarSha = 'b'.repeat(64);
const resolveSidecarSha = 'c'.repeat(64);
const recovery = {
  schemaVersion: 'wedding-davinci-production-recovery-export/v1',
  authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY',
  recovery: {actual: {state: 'NOT_RUN'}, bridge: {macDaVinciActualVerified: false}},
  projectMotionPalmierBindingArtifact: {
    path: 'opening-v1-palmier-project-motion-binding.json',
    sha256: sidecarSha,
  },
  projectMotionResolveHandoffArtifact: {
    path: 'opening-v1-resolve-project-motion-handoff.json',
    sha256: resolveSidecarSha,
  },
  projectMotionProvenance: {
    schemaVersion: 'wedding-project-motion-production-provenance/v1', authority: 'SHA_BOUND_CURRENT_PROJECT_MOTION_IMPORT', projectId: 'opening',
    sourceExport: {path: '/tmp/opening-project-motion.json', sha256: sha}, receiptArtifact: {path: '/tmp/project-motion-import-receipt.json', sha256: sha},
    currentnessArtifact: {path: '/tmp/project-motion-import-currentness.json', sha256: sha, state: 'CURRENT'},
    assemblyGate: {palmierCurrent: true, davinciHandoffCurrent: true, macDaVinciGuiActual: 'NOT_RUN', productionReady: false},
    evidenceBoundary: {remotionStudioGuiActual: 'NOT_RUN', macDaVinciGuiActual: 'NOT_RUN', productionReady: false}, guardrails: [],
  },
};

const section = buildProjectMotionProvenanceMarkdownSection(recovery, 'opening');
assert.ok(section);
assert.match(section, /## Project Motion Provenance/);
assert.match(section, /project-motion-currentness-state: CURRENT/);
assert.match(section, /palmier-project-motion-binding-artifact: opening-v1-palmier-project-motion-binding.json/);
assert.match(section, new RegExp(`palmier-project-motion-binding-artifact-sha256: ${sidecarSha}`));
assert.match(section, /resolve-project-motion-handoff-sidecar: opening-v1-resolve-project-motion-handoff.json/);
assert.match(section, new RegExp(`resolve-project-motion-handoff-sidecar-sha256: ${resolveSidecarSha}`));
assert.match(section, /palmier-project-motion-current: yes/);
assert.match(section, /davinci-project-motion-handoff-current: yes/);
assert.match(section, /mac-remotion-studio-gui-actual: NOT_RUN/);
assert.match(section, /mac-davinci-gui-actual: NOT_RUN/);
assert.match(section, /production-ready-by-project-motion-provenance: no/);
assert.match(section, new RegExp(`project-motion-source-sha256: ${sha}`));

assert.equal(buildProjectMotionProvenanceMarkdownSection({schemaVersion: 'wedding-davinci-production-recovery-export/v1', authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY'}, 'opening'), null);

const invalid = structuredClone(recovery);
invalid.projectMotionProvenance.assemblyGate.macDaVinciGuiActual = 'PASS';
assert.throws(() => buildProjectMotionProvenanceMarkdownSection(invalid, 'opening'), /PROJECT_MOTION_PROVENANCE_MARKDOWN_CONTRACT_INVALID:opening/);

const missingSidecar = structuredClone(recovery);
delete (missingSidecar as any).projectMotionPalmierBindingArtifact;
assert.throws(() => buildProjectMotionProvenanceMarkdownSection(missingSidecar, 'opening'), /PROJECT_MOTION_PROVENANCE_MARKDOWN_CONTRACT_INVALID:opening/);

const missingResolveSidecar = structuredClone(recovery);
delete (missingResolveSidecar as any).projectMotionResolveHandoffArtifact;
assert.throws(() => buildProjectMotionProvenanceMarkdownSection(missingResolveSidecar, 'opening'), /PROJECT_MOTION_PROVENANCE_MARKDOWN_CONTRACT_INVALID:opening/);

const invalidSidecarSha = structuredClone(recovery);
invalidSidecarSha.projectMotionPalmierBindingArtifact.sha256 = 'bad';
assert.throws(() => buildProjectMotionProvenanceMarkdownSection(invalidSidecarSha, 'opening'), /PROJECT_MOTION_PROVENANCE_MARKDOWN_SHA_INVALID:palmier-binding-artifact-sha256/);

const invalidResolveSidecarSha = structuredClone(recovery);
invalidResolveSidecarSha.projectMotionResolveHandoffArtifact.sha256 = 'bad';
assert.throws(() => buildProjectMotionProvenanceMarkdownSection(invalidResolveSidecarSha, 'opening'), /PROJECT_MOTION_PROVENANCE_MARKDOWN_SHA_INVALID:resolve-handoff-artifact-sha256/);

const temp = mkdtempSync(join(tmpdir(), 'project-motion-recovery-markdown-'));
try {
  const recoveryPath = join(temp, 'recovery.json');
  const markdownPath = join(temp, 'recovery.md');
  writeFileSync(recoveryPath, `${JSON.stringify(recovery, null, 2)}\n`, 'utf8');
  writeFileSync(markdownPath, '# DaVinci Wedding Production Recovery Attachment\n\nmac-davinci-gui-actual: NOT_RUN\n', 'utf8');

  const first = appendProjectMotionProvenanceRecoveryMarkdown('opening', recoveryPath, markdownPath);
  assert.equal(first.attached, true);
  assert.equal(first.palmierBindingArtifactSha256, sidecarSha);
  assert.equal(first.resolveHandoffArtifactSha256, resolveSidecarSha);
  const once = readFileSync(markdownPath, 'utf8');
  assert.equal((once.match(/## Project Motion Provenance/g) ?? []).length, 1);
  assert.equal((once.match(/palmier-project-motion-binding-artifact-sha256:/g) ?? []).length, 1);
  assert.equal((once.match(/resolve-project-motion-handoff-sidecar-sha256:/g) ?? []).length, 1);
  assert.match(once, /This section is provenance only/);

  const second = appendProjectMotionProvenanceRecoveryMarkdown('opening', recoveryPath, markdownPath);
  assert.equal(second.attached, true);
  const twice = readFileSync(markdownPath, 'utf8');
  assert.equal((twice.match(/## Project Motion Provenance/g) ?? []).length, 1);
  assert.equal((twice.match(/PROJECT_MOTION_PROVENANCE_START/g) ?? []).length, 1);
  assert.equal((twice.match(/palmier-project-motion-binding-artifact-sha256:/g) ?? []).length, 1);
  assert.equal((twice.match(/resolve-project-motion-handoff-sidecar-sha256:/g) ?? []).length, 1);
} finally {
  rmSync(temp, {recursive: true, force: true});
}

console.log('Wedding Project Motion recovery Markdown provenance contract: PASS');
