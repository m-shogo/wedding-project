import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, isAbsolute, resolve} from 'node:path';
import {
  weddingResolveRemotionIdentityHandoffSidecarSchema,
  type ResolveProjectRemotionIdentityReceipt,
} from '../src/data/weddingResolveRemotionIdentityHandoff.schema.ts';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const args = new Map(process.argv.slice(2).map((arg) => {
  const match = arg.match(/^--([^=]+)=(.*)$/);
  if (!match) throw new Error(`INVALID_ARGUMENT:${arg}`);
  return [match[1], match[2]];
}));
const movieId = args.get('movie');
if (movieId !== 'opening' && movieId !== 'profile') throw new Error('MOVIE_MUST_BE_OPENING_OR_PROFILE');
const sidecarArg = args.get('sidecar');
if (!sidecarArg) throw new Error('RESOLVE_SIDECAR_PATH_REQUIRED');
const outputArg = args.get('output');
if (!outputArg) throw new Error('OUTPUT_PATH_REQUIRED');
const receiptArg = args.get('receipt') ?? `../movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`;
const sidecarPath = isAbsolute(sidecarArg) ? sidecarArg : resolve(motionStudioRoot, sidecarArg);
const outputPath = isAbsolute(outputArg) ? outputArg : resolve(motionStudioRoot, outputArg);
const receiptPath = isAbsolute(receiptArg) ? receiptArg : resolve(motionStudioRoot, receiptArg);
const identityArtifactPath = resolve(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const canonicalEnginePath = resolve(motionStudioRoot, 'src/motion-kit/engines.tsx');
const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const block = (code: string): never => { console.error(`BLOCK / ${code}`); process.exit(1); };

function readJson(path: string, missing: string, invalid: string) {
  if (!existsSync(path)) block(missing);
  try { return JSON.parse(readFileSync(path, 'utf8')) as any; } catch { block(invalid); }
}
function canonicalTypographyBlock() {
  const source = readFileSync(canonicalEnginePath, 'utf8');
  const start = source.indexOf('export type MotionIntensity');
  const end = source.indexOf('export type CameraTransformMode');
  if (start < 0 || end < 0 || end <= start) block('CANONICAL_TYPOGRAPHY_ENGINE_BLOCK_NOT_ISOLATABLE');
  return source.slice(start, end).trim();
}

const sidecar = readJson(sidecarPath, 'RESOLVE_SIDECAR_MISSING', 'RESOLVE_SIDECAR_INVALID_JSON');
const receiptBytes = existsSync(receiptPath) ? readFileSync(receiptPath) : block('PROJECT_REMOTION_IDENTITY_RECEIPT_MISSING');
let receipt: any;
try { receipt = JSON.parse(receiptBytes.toString('utf8')); } catch { block('PROJECT_REMOTION_IDENTITY_RECEIPT_INVALID_JSON'); }
if (receipt.schemaVersion !== 'wedding-project-remotion-element-identity-verification-receipt/v1') block('PROJECT_REMOTION_IDENTITY_RECEIPT_SCHEMA_MISMATCH');
if (receipt.authority !== 'SHA_BOUND_PROJECT_REMOTION_ELEMENT_IDENTITY_VERIFICATION') block('PROJECT_REMOTION_IDENTITY_RECEIPT_AUTHORITY_MISMATCH');
if (receipt.state !== 'CURRENT') block('PROJECT_REMOTION_IDENTITY_RECEIPT_NOT_CURRENT');
if (receipt.movieId !== movieId) block('PROJECT_REMOTION_IDENTITY_RECEIPT_MOVIE_MISMATCH');
if (receipt.macRemotionStudioGuiActualPerformedByThisVerification !== false) block('RECEIPT_MUST_NOT_CLAIM_REMOTION_STUDIO_GUI_ACTUAL');
if (receipt.macDaVinciGuiActualPerformedByThisVerification !== false) block('RECEIPT_MUST_NOT_CLAIM_MAC_DAVINCI_GUI_ACTUAL');
if (receipt.productionReadyPromotedByThisVerification !== false) block('RECEIPT_MUST_NOT_PROMOTE_PRODUCTION_READY');

const batchArg = receipt.sourceBatch?.path;
if (typeof batchArg !== 'string') block('RECEIPT_BATCH_PATH_MISSING');
const batchPath = isAbsolute(batchArg) ? batchArg : resolve(motionStudioRoot, batchArg);
if (!existsSync(batchPath)) block('RECEIPT_SOURCE_BATCH_MISSING');
if (sha256(readFileSync(batchPath)) !== receipt.sourceBatch?.sha256) block('RECEIPT_SOURCE_BATCH_SHA_STALE');
if (!existsSync(identityArtifactPath)) block('HANDOFF_IDENTITY_ARTIFACT_MISSING');
const identityBytes = readFileSync(identityArtifactPath);
if (sha256(identityBytes) !== receipt.handoffIdentityArtifact?.sha256) block('RECEIPT_IDENTITY_ARTIFACT_SHA_STALE');
const currentCanonicalSha = sha256(canonicalTypographyBlock());
if (currentCanonicalSha !== receipt.canonicalTypographyEngine?.blockSha256) block('RECEIPT_CANONICAL_ENGINE_SHA_STALE');

const selectedPatternIds = Array.isArray(receipt.selectedPatternIds) ? receipt.selectedPatternIds : [];
const sceneBindings = Array.isArray(receipt.sceneBindings) ? receipt.sceneBindings : [];
if (selectedPatternIds.length === 0 || sceneBindings.length === 0) block('PROJECT_REMOTION_IDENTITY_RECEIPT_EMPTY');
if (sidecar.projectMotionBindingArtifact?.projectId && sidecar.projectMotionBindingArtifact.projectId !== movieId) {
  block('RESOLVE_SIDECAR_PROJECT_MOTION_MOVIE_MISMATCH');
}

const resolveReceipt: ResolveProjectRemotionIdentityReceipt = {
  authority: 'SHA_BOUND_PROJECT_REMOTION_ELEMENT_IDENTITY_VERIFICATION',
  projectId: movieId,
  path: receiptArg,
  sha256: sha256(receiptBytes),
  state: 'CURRENT',
  sourceBatchSha256: receipt.sourceBatch.sha256,
  handoffIdentityArtifactSha256: receipt.handoffIdentityArtifact.sha256,
  canonicalTypographyEngineBlockSha256: currentCanonicalSha,
  selectedPatternIds,
  verifiedSceneBindingCount: sceneBindings.length,
  remotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionReady: false,
};

const enriched = weddingResolveRemotionIdentityHandoffSidecarSchema.parse({
  ...sidecar,
  projectRemotionIdentityReceipt: resolveReceipt,
  notes: [
    ...(Array.isArray(sidecar.notes) ? sidecar.notes : []),
    'Project Remotion Element identity receipt is SHA-bound and revalidated before this Resolve handoff sidecar is emitted.',
    'CURRENT identity receipt does not prove Remotion Studio GUI Actual, DaVinci GUI Actual, or production readiness.',
  ],
});
mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(enriched, null, 2)}\n`);
console.log('resolveProjectRemotionIdentityBinding=CURRENT');
console.log(`movieId=${movieId}`);
console.log(`receiptSha256=${resolveReceipt.sha256}`);
console.log(`verifiedSceneBindings=${resolveReceipt.verifiedSceneBindingCount}`);
console.log(`output=${outputArg}`);
console.log('remotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
console.log('productionReady=NO');
