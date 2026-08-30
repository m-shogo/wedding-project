import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {basename, dirname, join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const SHA256_RE = /^[a-f0-9]{64}$/;

type MovieId = 'opening' | 'profile';

const fail = (code: string): never => {
  throw new Error(code);
};

export function verifyWeddingProjectRemotionIdentityProductionConsistency(args: {
  movieId: MovieId;
  recoveryPath: string;
  markdownPath: string;
  motionStudioRoot: string;
}) {
  const {movieId, recoveryPath, markdownPath, motionStudioRoot} = args;
  if (!existsSync(recoveryPath)) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_RECOVERY_MISSING:${movieId}`);
  if (!existsSync(markdownPath)) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_MARKDOWN_MISSING:${movieId}`);
  const recovery = JSON.parse(readFileSync(recoveryPath, 'utf8')) as any;
  const identity = recovery?.projectRemotionIdentity;
  if (!identity) return {state: 'NOT_APPLICABLE' as const};

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
  ) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_BOUNDARY_INVALID:${movieId}`);

  for (const [label, value] of [
    ['resolve-sidecar', identity.resolveSidecar?.sha256],
    ['receipt', receipt.sha256],
    ['batch', receipt.sourceBatchSha256],
    ['handoff-identity', receipt.handoffIdentityArtifactSha256],
    ['canonical-engine', receipt.canonicalTypographyEngineBlockSha256],
  ] as const) {
    if (typeof value !== 'string' || !SHA256_RE.test(value)) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_SHA_INVALID:${movieId}:${label}`);
  }

  const sidecarName = identity.resolveSidecar?.path;
  if (typeof sidecarName !== 'string' || sidecarName.length === 0) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_RESOLVE_SIDECAR_PATH_INVALID:${movieId}`);
  const sidecarPath = resolve(dirname(recoveryPath), basename(sidecarName));
  if (!existsSync(sidecarPath)) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_RESOLVE_SIDECAR_MISSING:${movieId}`);
  const sidecarBytes = readFileSync(sidecarPath);
  if (sha256(sidecarBytes) !== identity.resolveSidecar.sha256) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_RESOLVE_SIDECAR_SHA_DRIFT:${movieId}`);
  const sidecar = JSON.parse(sidecarBytes.toString('utf8')) as any;
  if (JSON.stringify(sidecar.projectRemotionIdentityReceipt) !== JSON.stringify(receipt)) {
    fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_RECOVERY_SIDECAR_RECEIPT_DRIFT:${movieId}`);
  }

  const repoRoot = resolve(motionStudioRoot, '..');
  const manifestPath = join(repoRoot, `movie-dashboard/out/project-role-handoff/${movieId}-production-role-handoff-manifest.json`);
  const receiptPath = join(repoRoot, `movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`);
  const handoffVerifier = spawnSync(
    process.execPath,
    [
      '--no-warnings',
      'scripts/verify-wedding-project-remotion-identity-handoff.mts',
      `--movie=${movieId}`,
      `--manifest=${manifestPath}`,
      `--receipt=${receiptPath}`,
    ],
    {cwd: motionStudioRoot, encoding: 'utf8', stdio: 'pipe'},
  );
  if (handoffVerifier.status !== 0) {
    const detail = `${handoffVerifier.stdout ?? ''}\n${handoffVerifier.stderr ?? ''}`.trim();
    fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_CANONICAL_CURRENTNESS_FAILED:${movieId}:${detail}`);
  }

  const markdown = readFileSync(markdownPath, 'utf8');
  const expectedLines = [
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
  ];
  for (const expected of expectedLines) {
    const count = markdown.split(expected).length - 1;
    if (count !== 1) fail(`PROJECT_REMOTION_IDENTITY_CONSISTENCY_MARKDOWN_DRIFT:${movieId}:${expected}:${count}`);
  }

  return {
    state: 'CURRENT' as const,
    resolveSidecarSha256: identity.resolveSidecar.sha256 as string,
    receiptSha256: receipt.sha256 as string,
    sourceBatchSha256: receipt.sourceBatchSha256 as string,
    handoffIdentityArtifactSha256: receipt.handoffIdentityArtifactSha256 as string,
    canonicalTypographyEngineBlockSha256: receipt.canonicalTypographyEngineBlockSha256 as string,
    verifiedSceneBindingCount: receipt.verifiedSceneBindingCount as number,
    remotionStudioGuiActual: 'NOT_RUN' as const,
    macDaVinciGuiActual: 'NOT_RUN' as const,
    productionReady: false as const,
  };
}
