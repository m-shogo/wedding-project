import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {appendProjectRemotionIdentityRecoveryMarkdown} from './append-wedding-project-remotion-identity-recovery-markdown.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const START = '<!-- PROJECT_MOTION_PROVENANCE_START -->';
const END = '<!-- PROJECT_MOTION_PROVENANCE_END -->';

export function buildProjectMotionProvenanceMarkdownSection(recoveryExport: any, movieId: 'opening' | 'profile') {
  if (
    recoveryExport?.schemaVersion !== 'wedding-davinci-production-recovery-export/v1' ||
    recoveryExport?.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY'
  ) {
    throw new Error('PROJECT_MOTION_PROVENANCE_MARKDOWN_RECOVERY_CONTRACT_INVALID');
  }
  const provenance = recoveryExport.projectMotionProvenance;
  if (!provenance) return null;
  const palmierBindingArtifact = recoveryExport.projectMotionPalmierBindingArtifact;
  const resolveHandoffArtifact = recoveryExport.projectMotionResolveHandoffArtifact;
  if (
    provenance.schemaVersion !== 'wedding-project-motion-production-provenance/v1' ||
    provenance.authority !== 'SHA_BOUND_CURRENT_PROJECT_MOTION_IMPORT' ||
    provenance.projectId !== movieId ||
    provenance.currentnessArtifact?.state !== 'CURRENT' ||
    provenance.assemblyGate?.palmierCurrent !== true ||
    provenance.assemblyGate?.davinciHandoffCurrent !== true ||
    provenance.assemblyGate?.macDaVinciGuiActual !== 'NOT_RUN' ||
    provenance.assemblyGate?.productionReady !== false ||
    provenance.evidenceBoundary?.remotionStudioGuiActual !== 'NOT_RUN' ||
    provenance.evidenceBoundary?.macDaVinciGuiActual !== 'NOT_RUN' ||
    provenance.evidenceBoundary?.productionReady !== false ||
    !palmierBindingArtifact ||
    typeof palmierBindingArtifact.path !== 'string' ||
    palmierBindingArtifact.path.length === 0 ||
    !resolveHandoffArtifact ||
    typeof resolveHandoffArtifact.path !== 'string' ||
    resolveHandoffArtifact.path.length === 0
  ) {
    throw new Error(`PROJECT_MOTION_PROVENANCE_MARKDOWN_CONTRACT_INVALID:${movieId}`);
  }
  for (const [label, value] of [
    ['source-sha256', provenance.sourceExport?.sha256],
    ['receipt-sha256', provenance.receiptArtifact?.sha256],
    ['currentness-sha256', provenance.currentnessArtifact?.sha256],
    ['palmier-binding-artifact-sha256', palmierBindingArtifact.sha256],
    ['resolve-handoff-artifact-sha256', resolveHandoffArtifact.sha256],
  ] as const) {
    if (typeof value !== 'string' || !/^[a-f0-9]{64}$/.test(value)) {
      throw new Error(`PROJECT_MOTION_PROVENANCE_MARKDOWN_SHA_INVALID:${label}`);
    }
  }

  return [
    START,
    '## Project Motion Provenance',
    '',
    `project-motion-project: ${movieId}`,
    `project-motion-source-export: ${provenance.sourceExport.path}`,
    `project-motion-source-sha256: ${provenance.sourceExport.sha256}`,
    `project-motion-receipt-artifact: ${provenance.receiptArtifact.path}`,
    `project-motion-receipt-sha256: ${provenance.receiptArtifact.sha256}`,
    `project-motion-currentness-artifact: ${provenance.currentnessArtifact.path}`,
    `project-motion-currentness-sha256: ${provenance.currentnessArtifact.sha256}`,
    'project-motion-currentness-state: CURRENT',
    `palmier-project-motion-binding-artifact: ${palmierBindingArtifact.path}`,
    `palmier-project-motion-binding-artifact-sha256: ${palmierBindingArtifact.sha256}`,
    `resolve-project-motion-handoff-sidecar: ${resolveHandoffArtifact.path}`,
    `resolve-project-motion-handoff-sidecar-sha256: ${resolveHandoffArtifact.sha256}`,
    'palmier-project-motion-current: yes',
    'davinci-project-motion-handoff-current: yes',
    'mac-remotion-studio-gui-actual: NOT_RUN',
    'mac-davinci-gui-actual: NOT_RUN',
    'production-ready-by-project-motion-provenance: no',
    '',
    'This section is provenance only. It does not prove Palmier application, DaVinci application, GUI Actual, or final delivery approval.',
    END,
  ].join('\n');
}

export function appendProjectMotionProvenanceRecoveryMarkdown(
  movieId: 'opening' | 'profile',
  recoveryPath: string,
  markdownPath: string,
) {
  if (!existsSync(recoveryPath)) throw new Error(`PROJECT_MOTION_PROVENANCE_MARKDOWN_RECOVERY_MISSING:${recoveryPath}`);
  if (!existsSync(markdownPath)) throw new Error(`PROJECT_MOTION_PROVENANCE_MARKDOWN_TARGET_MISSING:${markdownPath}`);
  const recoveryExport = JSON.parse(readFileSync(recoveryPath, 'utf8'));
  const section = buildProjectMotionProvenanceMarkdownSection(recoveryExport, movieId);
  if (!section) return {attached: false as const};

  const current = readFileSync(markdownPath, 'utf8');
  const escapedStart = START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedEnd = END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const withoutExisting = current
    .replace(new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}\\n?`, 'g'), '')
    .trimEnd();
  writeFileSync(markdownPath, `${withoutExisting}\n\n${section}\n`, 'utf8');
  return {
    attached: true as const,
    sourceSha256: recoveryExport.projectMotionProvenance.sourceExport.sha256,
    palmierBindingArtifactSha256: recoveryExport.projectMotionPalmierBindingArtifact.sha256,
    resolveHandoffArtifactSha256: recoveryExport.projectMotionResolveHandoffArtifact.sha256,
  };
}

function main() {
  const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.slice('--movie='.length);
  if (movieArg !== 'opening' && movieArg !== 'profile') {
    console.error('Usage: node --no-warnings scripts/append-wedding-project-motion-provenance-recovery-markdown.mts --movie=opening|profile');
    process.exit(1);
  }
  const config = movieArg === 'opening'
    ? {
        recovery: join(root, 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json'),
        markdown: join(root, 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.md'),
      }
    : {
        recovery: join(root, 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json'),
        markdown: join(root, 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.md'),
      };
  const result = appendProjectMotionProvenanceRecoveryMarkdown(movieArg, config.recovery, config.markdown);
  console.log(`Project Motion recovery Markdown provenance: ${result.attached ? 'ATTACHED' : 'NOT_APPLICABLE'}`);
  if (result.attached) {
    console.log(`projectMotionSourceSha256=${result.sourceSha256}`);
    console.log(`palmierProjectMotionBindingArtifactSha256=${result.palmierBindingArtifactSha256}`);
    console.log(`resolveProjectMotionHandoffSidecarSha256=${result.resolveHandoffArtifactSha256}`);
  }

  const remotionIdentity = appendProjectRemotionIdentityRecoveryMarkdown(movieArg, config.recovery, config.markdown);
  console.log(`Project Remotion identity recovery Markdown: ${remotionIdentity.attached ? 'ATTACHED' : 'NOT_APPLICABLE'}`);
  if (remotionIdentity.attached) {
    console.log(`resolveRemotionIdentitySidecarSha256=${remotionIdentity.resolveSidecarSha256}`);
    console.log(`projectRemotionIdentityReceiptSha256=${remotionIdentity.receiptSha256}`);
  }
  console.log(`markdown=${relative(root, config.markdown).replaceAll('\\', '/')}`);
  console.log('Mac Remotion Studio GUI Actual remains NOT_RUN.');
  console.log('Mac DaVinci Actual remains NOT_RUN.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
