import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {basename, dirname, join} from 'node:path';

const START = '<!-- PROJECT_REMOTION_IDENTITY_START -->';
const END = '<!-- PROJECT_REMOTION_IDENTITY_END -->';
const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const SHA256_RE = /^[a-f0-9]{64}$/;

export function buildProjectRemotionIdentityMarkdownSection(recoveryExport: any, movieId: 'opening' | 'profile') {
  const identity = recoveryExport?.projectRemotionIdentity;
  if (!identity) return null;
  const receipt = identity.receipt;
  if (
    identity.authority !== 'RESOLVE_PROJECT_REMOTION_IDENTITY_HANDOFF' ||
    identity.movieId !== movieId ||
    identity.state !== 'CURRENT' ||
    identity.remotionStudioGuiActual !== 'NOT_RUN' ||
    identity.macDaVinciGuiActual !== 'NOT_RUN' ||
    identity.productionReady !== false ||
    receipt?.authority !== 'SHA_BOUND_PROJECT_REMOTION_ELEMENT_IDENTITY_VERIFICATION' ||
    receipt?.projectId !== movieId ||
    receipt?.state !== 'CURRENT' ||
    receipt?.remotionStudioGuiActual !== 'NOT_RUN' ||
    receipt?.macDaVinciGuiActual !== 'NOT_RUN' ||
    receipt?.productionReady !== false
  ) {
    throw new Error(`PROJECT_REMOTION_IDENTITY_MARKDOWN_CONTRACT_INVALID:${movieId}`);
  }
  for (const [label, value] of [
    ['resolve-sidecar-sha256', identity.resolveSidecar?.sha256],
    ['receipt-sha256', receipt.sha256],
    ['source-batch-sha256', receipt.sourceBatchSha256],
    ['handoff-identity-artifact-sha256', receipt.handoffIdentityArtifactSha256],
    ['canonical-engine-block-sha256', receipt.canonicalTypographyEngineBlockSha256],
  ] as const) {
    if (typeof value !== 'string' || !SHA256_RE.test(value)) {
      throw new Error(`PROJECT_REMOTION_IDENTITY_MARKDOWN_SHA_INVALID:${label}`);
    }
  }
  if (!Array.isArray(receipt.selectedPatternIds) || receipt.selectedPatternIds.length === 0) {
    throw new Error(`PROJECT_REMOTION_IDENTITY_MARKDOWN_PATTERNS_MISSING:${movieId}`);
  }
  if (!Number.isInteger(receipt.verifiedSceneBindingCount) || receipt.verifiedSceneBindingCount <= 0) {
    throw new Error(`PROJECT_REMOTION_IDENTITY_MARKDOWN_SCENE_COUNT_INVALID:${movieId}`);
  }

  return [
    START,
    '## Project Remotion Element Identity',
    '',
    `project-remotion-identity-project: ${movieId}`,
    'project-remotion-identity-state: CURRENT',
    `resolve-remotion-identity-sidecar: ${identity.resolveSidecar.path}`,
    `resolve-remotion-identity-sidecar-sha256: ${identity.resolveSidecar.sha256}`,
    `project-remotion-identity-receipt: ${receipt.path}`,
    `project-remotion-identity-receipt-sha256: ${receipt.sha256}`,
    `project-remotion-source-batch-sha256: ${receipt.sourceBatchSha256}`,
    `remotion-handoff-identity-artifact-sha256: ${receipt.handoffIdentityArtifactSha256}`,
    `canonical-typography-engine-block-sha256: ${receipt.canonicalTypographyEngineBlockSha256}`,
    `selected-remotion-patterns: ${receipt.selectedPatternIds.join(', ')}`,
    `verified-scene-bindings: ${receipt.verifiedSceneBindingCount}`,
    'mac-remotion-studio-gui-actual: NOT_RUN',
    'mac-davinci-gui-actual: NOT_RUN',
    'production-ready-by-project-remotion-identity: no',
    '',
    'CURRENT here proves only SHA/currentness integrity for the selected Remotion Element identities. It does not prove Studio GUI Actual, DaVinci GUI Actual, or final delivery approval.',
    END,
  ].join('\n');
}

export function appendProjectRemotionIdentityRecoveryMarkdown(
  movieId: 'opening' | 'profile',
  recoveryPath: string,
  markdownPath: string,
) {
  if (!existsSync(recoveryPath)) throw new Error(`PROJECT_REMOTION_IDENTITY_MARKDOWN_RECOVERY_MISSING:${recoveryPath}`);
  if (!existsSync(markdownPath)) throw new Error(`PROJECT_REMOTION_IDENTITY_MARKDOWN_TARGET_MISSING:${markdownPath}`);
  const recoveryExport = JSON.parse(readFileSync(recoveryPath, 'utf8'));
  const section = buildProjectRemotionIdentityMarkdownSection(recoveryExport, movieId);
  if (!section) return {attached: false as const};

  const sidecarRef = recoveryExport.projectRemotionIdentity.resolveSidecar;
  const sidecarPath = join(dirname(recoveryPath), basename(sidecarRef.path));
  if (!existsSync(sidecarPath)) throw new Error(`PROJECT_REMOTION_IDENTITY_RESOLVE_SIDECAR_MISSING:${movieId}`);
  const sidecarBytes = readFileSync(sidecarPath);
  if (sha256(sidecarBytes) !== sidecarRef.sha256) {
    throw new Error(`PROJECT_REMOTION_IDENTITY_RESOLVE_SIDECAR_SHA_STALE:${movieId}`);
  }
  const sidecar = JSON.parse(sidecarBytes.toString('utf8'));
  const sidecarReceipt = sidecar.projectRemotionIdentityReceipt;
  if (JSON.stringify(sidecarReceipt) !== JSON.stringify(recoveryExport.projectRemotionIdentity.receipt)) {
    throw new Error(`PROJECT_REMOTION_IDENTITY_RECOVERY_SIDECAR_RECEIPT_DRIFT:${movieId}`);
  }

  const current = readFileSync(markdownPath, 'utf8');
  const escapedStart = START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedEnd = END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const withoutExisting = current
    .replace(new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}\\n?`, 'g'), '')
    .trimEnd();
  writeFileSync(markdownPath, `${withoutExisting}\n\n${section}\n`, 'utf8');
  return {
    attached: true as const,
    resolveSidecarSha256: sidecarRef.sha256 as string,
    receiptSha256: recoveryExport.projectRemotionIdentity.receipt.sha256 as string,
  };
}
