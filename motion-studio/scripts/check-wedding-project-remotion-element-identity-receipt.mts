import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {isAbsolute, join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');
const identityArtifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const args = new Map(process.argv.slice(2).map((arg) => {
  const match = arg.match(/^--([^=]+)=(.*)$/);
  if (!match) throw new Error(`INVALID_ARGUMENT:${arg}`);
  return [match[1], match[2]];
}));
const movieId = args.get('movie');
if (movieId !== 'opening' && movieId !== 'profile') throw new Error('MOVIE_MUST_BE_OPENING_OR_PROFILE');
const receiptArg = args.get('receipt') ?? `../movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`;
const receiptPath = isAbsolute(receiptArg) ? receiptArg : resolve(motionStudioRoot, receiptArg);
const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const block = (code: string): never => { console.error(`BLOCK / ${code}`); process.exit(1); };

function canonicalTypographyBlock() {
  const source = readFileSync(canonicalEnginePath, 'utf8');
  const start = source.indexOf('export type MotionIntensity');
  const end = source.indexOf('export type CameraTransformMode');
  if (start < 0 || end < 0 || end <= start) throw new Error('CANONICAL_TYPOGRAPHY_ENGINE_BLOCK_NOT_ISOLATABLE');
  return source.slice(start, end).trim();
}

if (!existsSync(receiptPath)) block('PROJECT_REMOTION_IDENTITY_RECEIPT_MISSING');
if (!existsSync(identityArtifactPath)) block('HANDOFF_IDENTITY_ARTIFACT_MISSING');
let receipt: any;
try { receipt = JSON.parse(readFileSync(receiptPath, 'utf8')); } catch { block('PROJECT_REMOTION_IDENTITY_RECEIPT_INVALID_JSON'); }
if (receipt.schemaVersion !== 'wedding-project-remotion-element-identity-verification-receipt/v1') block('PROJECT_REMOTION_IDENTITY_RECEIPT_SCHEMA_MISMATCH');
if (receipt.authority !== 'SHA_BOUND_PROJECT_REMOTION_ELEMENT_IDENTITY_VERIFICATION') block('PROJECT_REMOTION_IDENTITY_RECEIPT_AUTHORITY_MISMATCH');
if (receipt.state !== 'CURRENT') block('PROJECT_REMOTION_IDENTITY_RECEIPT_NOT_CURRENT');
if (receipt.movieId !== movieId) block('PROJECT_REMOTION_IDENTITY_RECEIPT_MOVIE_MISMATCH');
if (receipt.macRemotionStudioGuiActualPerformedByThisVerification !== false) block('RECEIPT_MUST_NOT_CLAIM_REMOTION_STUDIO_GUI_ACTUAL');
if (receipt.macDaVinciGuiActualPerformedByThisVerification !== false) block('RECEIPT_MUST_NOT_CLAIM_MAC_DAVINCI_GUI_ACTUAL');
if (receipt.productionReadyPromotedByThisVerification !== false) block('RECEIPT_MUST_NOT_PROMOTE_PRODUCTION_READY');

const batchArg = receipt.sourceBatch?.path;
if (typeof batchArg !== 'string' || batchArg.length === 0) block('RECEIPT_BATCH_PATH_MISSING');
const batchPath = isAbsolute(batchArg) ? batchArg : resolve(motionStudioRoot, batchArg);
if (!existsSync(batchPath)) block('RECEIPT_SOURCE_BATCH_MISSING');
const batchBytes = readFileSync(batchPath);
if (sha256(batchBytes) !== receipt.sourceBatch?.sha256) block('RECEIPT_SOURCE_BATCH_SHA_STALE');

const identityBytes = readFileSync(identityArtifactPath);
if (sha256(identityBytes) !== receipt.handoffIdentityArtifact?.sha256) block('RECEIPT_IDENTITY_ARTIFACT_SHA_STALE');
const identityArtifact = JSON.parse(identityBytes.toString('utf8')) as any;
const currentCanonicalSha = sha256(canonicalTypographyBlock());
if (currentCanonicalSha !== receipt.canonicalTypographyEngine?.blockSha256) block('RECEIPT_CANONICAL_ENGINE_SHA_STALE');
if (identityArtifact.canonicalSource?.blockSha256 !== currentCanonicalSha) block('HANDOFF_IDENTITY_CANONICAL_SOURCE_SHA_STALE');

const batch = JSON.parse(batchBytes.toString('utf8')) as any;
if (batch.projectId !== movieId) block('RECEIPT_SOURCE_BATCH_MOVIE_MISMATCH');
const plan = batch.remotionElementIdentityVerification;
if (!plan || !Array.isArray(plan.sceneBindings)) block('RECEIPT_SOURCE_BATCH_IDENTITY_PLAN_MISSING');
const expectedBindings = plan.sceneBindings.map((binding: any) => ({
  sceneId: binding.sceneId,
  sourceRevision: binding.sourceRevision,
  patternId: binding.patternId,
  adoptedForMovie: binding.adoptedForMovie === true,
  canonicalEngine: binding.canonicalEngine,
  canonicalMode: binding.canonicalMode,
  canonicalSource: binding.canonicalSource,
  canonicalBlockSha256: currentCanonicalSha,
}));
if (JSON.stringify(expectedBindings) !== JSON.stringify(receipt.sceneBindings)) block('RECEIPT_SCENE_BINDINGS_STALE');
const expectedPatternIds = [...new Set(expectedBindings.map((binding: any) => binding.patternId))].sort();
if (JSON.stringify(expectedPatternIds) !== JSON.stringify(receipt.selectedPatternIds)) block('RECEIPT_SELECTED_PATTERN_SET_STALE');

console.log('projectRemotionElementIdentityReceipt=CURRENT');
console.log(`movieId=${movieId}`);
console.log(`batchSha256=${receipt.sourceBatch.sha256}`);
console.log(`identityArtifactSha256=${receipt.handoffIdentityArtifact.sha256}`);
console.log(`canonicalBlockSha256=${currentCanonicalSha}`);
console.log(`verifiedSceneBindings=${expectedBindings.length}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
console.log('productionReady=NO');
