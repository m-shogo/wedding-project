import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, join, resolve} from 'node:path';

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
const batchArg = args.get('batch');
if (!batchArg) throw new Error('BATCH_PATH_REQUIRED');
const batchPath = isAbsolute(batchArg) ? batchArg : resolve(motionStudioRoot, batchArg);
const receiptArg = args.get('receipt');
const receiptPath = receiptArg
  ? (isAbsolute(receiptArg) ? receiptArg : resolve(motionStudioRoot, receiptArg))
  : join(repoRoot, `movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`);

const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');

function canonicalTypographyBlock() {
  const source = readFileSync(canonicalEnginePath, 'utf8');
  const start = source.indexOf('export type MotionIntensity');
  const end = source.indexOf('export type CameraTransformMode');
  if (start < 0 || end < 0 || end <= start) throw new Error('CANONICAL_TYPOGRAPHY_ENGINE_BLOCK_NOT_ISOLATABLE');
  return source.slice(start, end).trim();
}

function fail(code: string): never {
  console.error(`BLOCK / ${code}`);
  process.exit(1);
}

if (!existsSync(batchPath)) fail('TYPOGRAPHY_PROJECT_BATCH_MISSING');
if (!existsSync(identityArtifactPath)) fail('HANDOFF_IDENTITY_ARTIFACT_MISSING');

const batchBytes = readFileSync(batchPath);
const identityBytes = readFileSync(identityArtifactPath);
let batch: any;
let identityArtifact: any;
try { batch = JSON.parse(batchBytes.toString('utf8')); } catch { fail('TYPOGRAPHY_PROJECT_BATCH_INVALID_JSON'); }
try { identityArtifact = JSON.parse(identityBytes.toString('utf8')); } catch { fail('HANDOFF_IDENTITY_ARTIFACT_INVALID_JSON'); }

if (batch.schemaVersion !== 'wedding-movie-typography-project-delivery/v1') fail('TYPOGRAPHY_PROJECT_BATCH_SCHEMA_MISMATCH');
if (batch.authority !== 'DERIVED_PROJECT_HANDOFF') fail('TYPOGRAPHY_PROJECT_BATCH_AUTHORITY_MISMATCH');
if (batch.projectId !== movieId) fail('TYPOGRAPHY_PROJECT_BATCH_MOVIE_MISMATCH');
if (batch.summary?.batchReadyForPalmierDaVinciHandoff !== true) fail('TYPOGRAPHY_PROJECT_BATCH_NOT_HANDOFF_READY');
if (batch.summary?.productionReady !== false) fail('TYPOGRAPHY_PROJECT_BATCH_MUST_NOT_CLAIM_PRODUCTION_READY');

const plan = batch.remotionElementIdentityVerification;
if (!plan || !Array.isArray(plan.sceneBindings) || !Array.isArray(plan.selectedPatternIds)) fail('PROJECT_REMOTION_IDENTITY_PLAN_MISSING');
if (plan.sceneBindings.length === 0) fail('PROJECT_REMOTION_IDENTITY_NOT_APPLICABLE');
if (plan.state !== 'NOT_RUN') fail('PROJECT_REMOTION_IDENTITY_PREVERIFIED_STATE_FORBIDDEN');
if (plan.currentnessVerifiedByBatchBuild !== false) fail('BATCH_BUILD_MUST_NOT_CLAIM_IDENTITY_CURRENTNESS');

if (identityArtifact.schemaVersion !== 'wedding-remotion-element-handoff-identities/v2') fail('HANDOFF_IDENTITY_SCHEMA_MISMATCH');
if (identityArtifact.authority !== 'SHA_BOUND_WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY') fail('HANDOFF_IDENTITY_AUTHORITY_MISMATCH');
const currentCanonicalSha = sha256(canonicalTypographyBlock());
if (identityArtifact.canonicalSource?.blockSha256 !== currentCanonicalSha) fail('CANONICAL_SOURCE_SHA_STALE');
const catalog = Array.isArray(identityArtifact.catalogIdentities) ? identityArtifact.catalogIdentities : [];

const selectedPatternIds = [...new Set(plan.sceneBindings.map((binding: any) => binding.patternId))].sort();
const declaredPatternIds = [...new Set(plan.selectedPatternIds)].sort();
if (JSON.stringify(selectedPatternIds) !== JSON.stringify(declaredPatternIds)) fail('PROJECT_SELECTED_PATTERN_SET_MISMATCH');

const verifiedBindings = plan.sceneBindings.map((binding: any) => {
  if (!binding.sceneId || !binding.sourceRevision || !binding.patternId) fail('PROJECT_SCENE_BINDING_INCOMPLETE');
  const catalogIdentity = catalog.find((item: any) => item.patternId === binding.patternId);
  if (!catalogIdentity) fail(`CATALOG_IDENTITY_MISSING:${binding.patternId}`);
  if (catalogIdentity.canonicalBlockSha256 !== currentCanonicalSha) fail(`CATALOG_IDENTITY_SHA_STALE:${binding.patternId}`);
  if (catalogIdentity.canonicalEngine !== binding.canonicalEngine) fail(`CANONICAL_ENGINE_MISMATCH:${binding.sceneId}`);
  if (catalogIdentity.canonicalMode !== binding.canonicalMode) fail(`CANONICAL_MODE_MISMATCH:${binding.sceneId}`);
  if (catalogIdentity.canonicalSource !== binding.canonicalSource) fail(`CANONICAL_SOURCE_MISMATCH:${binding.sceneId}`);
  return {
    sceneId: binding.sceneId,
    sourceRevision: binding.sourceRevision,
    patternId: binding.patternId,
    adoptedForMovie: binding.adoptedForMovie === true,
    canonicalEngine: catalogIdentity.canonicalEngine,
    canonicalMode: catalogIdentity.canonicalMode,
    canonicalSource: catalogIdentity.canonicalSource,
    canonicalBlockSha256: catalogIdentity.canonicalBlockSha256,
  };
});

const receipt = {
  schemaVersion: 'wedding-project-remotion-element-identity-verification-receipt/v1',
  authority: 'SHA_BOUND_PROJECT_REMOTION_ELEMENT_IDENTITY_VERIFICATION',
  state: 'CURRENT',
  movieId,
  verifiedAt: new Date().toISOString(),
  sourceBatch: {
    path: batchArg,
    sha256: sha256(batchBytes),
    schemaVersion: batch.schemaVersion,
    sceneCount: batch.scenes?.length ?? 0,
  },
  handoffIdentityArtifact: {
    path: 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json',
    sha256: sha256(identityBytes),
    schemaVersion: identityArtifact.schemaVersion,
  },
  canonicalTypographyEngine: {
    path: 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine',
    blockSha256: currentCanonicalSha,
  },
  selectedPatternIds,
  sceneBindings: verifiedBindings,
  currentness: {
    batchShaVerified: true,
    identityArtifactShaCaptured: true,
    canonicalEngineShaCurrent: true,
    sceneBindingsMatchCatalog: true,
  },
  macRemotionStudioGuiActualPerformedByThisVerification: false,
  macDaVinciGuiActualPerformedByThisVerification: false,
  productionReadyPromotedByThisVerification: false,
  handoffRule: 'Palmier/DaVinci assembly may consume this receipt only while the batch bytes, identity artifact bytes, canonical engine block SHA, and Scene bindings remain unchanged.',
  guardrails: [
    'PROJECT_IDENTITY_RECEIPT_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED',
    'PROJECT_IDENTITY_RECEIPT_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED',
    'PROJECT_IDENTITY_RECEIPT_CURRENT != PRODUCTION_READY',
    'BATCH_CHANGED => PROJECT_IDENTITY_RECEIPT_STALE',
    'IDENTITY_ARTIFACT_CHANGED => PROJECT_IDENTITY_RECEIPT_STALE',
    'CANONICAL_ENGINE_CHANGED => PROJECT_IDENTITY_RECEIPT_STALE',
    'SCENE_ROUTE_OR_REVISION_CHANGED => PROJECT_IDENTITY_RECEIPT_STALE',
  ],
};

mkdirSync(dirname(receiptPath), {recursive: true});
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log('projectRemotionElementIdentityVerification=CURRENT');
console.log(`movieId=${movieId}`);
console.log(`batchSha256=${receipt.sourceBatch.sha256}`);
console.log(`identityArtifactSha256=${receipt.handoffIdentityArtifact.sha256}`);
console.log(`canonicalBlockSha256=${currentCanonicalSha}`);
console.log(`verifiedSceneBindings=${verifiedBindings.length}`);
console.log(`receipt=${receiptPath.replace(`${repoRoot}/`, '')}`);
console.log('macRemotionStudioGuiActualPerformedByThisVerification=NO');
console.log('macDaVinciGuiActualPerformedByThisVerification=NO');
console.log('productionReadyPromotedByThisVerification=NO');
