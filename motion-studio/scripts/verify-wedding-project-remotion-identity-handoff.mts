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
const manifestArg = args.get('manifest');
if (!manifestArg) throw new Error('PROJECT_ROLE_HANDOFF_MANIFEST_PATH_REQUIRED');
const manifestPath = isAbsolute(manifestArg) ? manifestArg : resolve(motionStudioRoot, manifestArg);
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

function readJson(path: string, missingCode: string, invalidCode: string) {
  if (!existsSync(path)) block(missingCode);
  try { return JSON.parse(readFileSync(path, 'utf8')) as any; } catch { block(invalidCode); }
}

const manifest = readJson(manifestPath, 'PROJECT_ROLE_HANDOFF_MANIFEST_MISSING', 'PROJECT_ROLE_HANDOFF_MANIFEST_INVALID_JSON');
const receipt = readJson(receiptPath, 'PROJECT_REMOTION_IDENTITY_RECEIPT_MISSING', 'PROJECT_REMOTION_IDENTITY_RECEIPT_INVALID_JSON');
if (!existsSync(identityArtifactPath)) block('HANDOFF_IDENTITY_ARTIFACT_MISSING');

if (manifest.schemaVersion !== 'wedding-movie-project-role-handoff/v1') block('PROJECT_ROLE_HANDOFF_MANIFEST_SCHEMA_MISMATCH');
if (manifest.authority !== 'DERIVED_FROM_PROJECT_HANDOFF_AND_PERSISTED_HUMAN_ROLE_CONTEXT') block('PROJECT_ROLE_HANDOFF_MANIFEST_AUTHORITY_MISMATCH');
if (manifest.projectId !== movieId || manifest.typography?.projectId !== movieId) block('PROJECT_ROLE_HANDOFF_MANIFEST_MOVIE_MISMATCH');
if (manifest.roleHandoff?.ready !== true) block('PROJECT_ROLE_HANDOFF_MANIFEST_NOT_READY');
if (manifest.roleHandoff?.studioGuiActual !== 'NOT_RUN') block('PROJECT_ROLE_HANDOFF_MUST_NOT_CLAIM_STUDIO_GUI_ACTUAL');
if (manifest.roleHandoff?.davinciGuiActual !== 'NOT_RUN') block('PROJECT_ROLE_HANDOFF_MUST_NOT_CLAIM_DAVINCI_GUI_ACTUAL');
if (manifest.roleHandoff?.productionReady !== false) block('PROJECT_ROLE_HANDOFF_MUST_NOT_CLAIM_PRODUCTION_READY');

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
const batch = JSON.parse(batchBytes.toString('utf8')) as any;

const identityBytes = readFileSync(identityArtifactPath);
if (sha256(identityBytes) !== receipt.handoffIdentityArtifact?.sha256) block('RECEIPT_IDENTITY_ARTIFACT_SHA_STALE');
const identityArtifact = JSON.parse(identityBytes.toString('utf8')) as any;
const currentCanonicalSha = sha256(canonicalTypographyBlock());
if (currentCanonicalSha !== receipt.canonicalTypographyEngine?.blockSha256) block('RECEIPT_CANONICAL_ENGINE_SHA_STALE');
if (identityArtifact.canonicalSource?.blockSha256 !== currentCanonicalSha) block('HANDOFF_IDENTITY_CANONICAL_SOURCE_SHA_STALE');

const receiptBindings = Array.isArray(receipt.sceneBindings) ? receipt.sceneBindings : [];
const batchBindings = Array.isArray(batch.remotionElementIdentityVerification?.sceneBindings) ? batch.remotionElementIdentityVerification.sceneBindings : [];
const manifestBindings = Array.isArray(manifest.typography?.remotionElementIdentityVerification?.sceneBindings) ? manifest.typography.remotionElementIdentityVerification.sceneBindings : [];
if (receiptBindings.length === 0) block('PROJECT_REMOTION_IDENTITY_RECEIPT_BINDINGS_MISSING');
if (batchBindings.length !== receiptBindings.length) block('RECEIPT_BATCH_BINDING_CARDINALITY_STALE');
if (manifestBindings.length !== receiptBindings.length) block('PROJECT_ROLE_HANDOFF_BINDING_CARDINALITY_MISMATCH');

const normalize = (binding: any) => ({
  sceneId: binding.sceneId,
  sourceRevision: binding.sourceRevision,
  patternId: binding.patternId,
  adoptedForMovie: binding.adoptedForMovie === true,
  canonicalEngine: binding.canonicalEngine,
  canonicalMode: binding.canonicalMode,
  canonicalSource: binding.canonicalSource,
});
const receiptNormalized = receiptBindings.map(normalize);
if (JSON.stringify(batchBindings.map(normalize)) !== JSON.stringify(receiptNormalized)) block('RECEIPT_SOURCE_BATCH_BINDINGS_STALE');
if (JSON.stringify(manifestBindings.map(normalize)) !== JSON.stringify(receiptNormalized)) block('PROJECT_ROLE_HANDOFF_BINDINGS_DO_NOT_MATCH_RECEIPT');

const manifestScenes = Array.isArray(manifest.typography?.scenes) ? manifest.typography.scenes : [];
for (const binding of receiptBindings) {
  const scene = manifestScenes.find((item: any) => item.sceneId === binding.sceneId);
  if (!scene) block(`PROJECT_ROLE_HANDOFF_SCENE_MISSING:${binding.sceneId}`);
  if (scene.sourceRevision !== binding.sourceRevision) block(`PROJECT_ROLE_HANDOFF_SCENE_REVISION_STALE:${binding.sceneId}`);
  if (scene.selectedPatternId !== binding.patternId) block(`PROJECT_ROLE_HANDOFF_SCENE_PATTERN_STALE:${binding.sceneId}`);
}

console.log('projectRemotionIdentityPalmierDaVinciHandoff=ALLOWED');
console.log(`movieId=${movieId}`);
console.log(`receiptState=${receipt.state}`);
console.log(`verifiedSceneBindings=${receiptBindings.length}`);
console.log(`batchSha256=${receipt.sourceBatch.sha256}`);
console.log(`identityArtifactSha256=${receipt.handoffIdentityArtifact.sha256}`);
console.log(`canonicalBlockSha256=${currentCanonicalSha}`);
console.log('remotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciActual=NOT_RUN');
console.log('productionReady=NO');
