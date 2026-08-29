import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const batchRoot = join(repoRoot, 'movie-dashboard', 'out', 'remotion-element-actual-batch');
const batchManifestPath = join(batchRoot, 'batch-manifest.json');
const evidencePath = join(batchRoot, 'studio-actual-evidence.json');
const summaryPath = join(batchRoot, 'canonical-engine-currentness.json');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');

const candidates = [
  ['type-mask-reveal', 'mask-reveal'],
  ['type-char-stagger', 'char-stagger'],
  ['type-type-on-rhythm', 'type-on-rhythm'],
  ['type-word-punch', 'word-punch'],
  ['type-tracking-burst', 'tracking-burst'],
  ['type-vertical-wipe', 'vertical-wipe'],
  ['type-outline-fill', 'outline-fill'],
  ['type-baseline-hop', 'baseline-hop'],
  ['type-triplet', 'triplet'],
] as const;

const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const sha256File = (path: string) => sha256(readFileSync(path));
const rel = (path: string) => path.replace(`${repoRoot}/`, '').replaceAll('\\', '/');

function canonicalTypographyBlock() {
  if (!existsSync(canonicalEnginePath)) throw new Error('CANONICAL_TYPOGRAPHY_ENGINE_MISSING');
  const source = readFileSync(canonicalEnginePath, 'utf8');
  const startMarker = 'export type MotionIntensity';
  const endMarker = 'export type CameraTransformMode';
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end < 0 || end <= start) throw new Error('CANONICAL_TYPOGRAPHY_ENGINE_BLOCK_NOT_ISOLATABLE');
  if (source.indexOf(startMarker, start + startMarker.length) >= 0) throw new Error('CANONICAL_TYPOGRAPHY_START_MARKER_NOT_UNIQUE');
  if (source.indexOf(endMarker, end + endMarker.length) >= 0) throw new Error('CANONICAL_TYPOGRAPHY_END_MARKER_NOT_UNIQUE');
  return source.slice(start, end).trim();
}

const blockerCodes: string[] = [];
const block = (code: string) => blockerCodes.push(code);

let canonicalBlockSha256: string | null = null;
try {
  canonicalBlockSha256 = sha256(canonicalTypographyBlock());
} catch (error) {
  block(error instanceof Error ? error.message : String(error));
}

let batchManifestSha256: string | null = null;
if (!existsSync(batchManifestPath)) {
  block('STUDIO_ACTUAL_BATCH_MANIFEST_MISSING');
} else {
  batchManifestSha256 = sha256File(batchManifestPath);
}

const candidateBindings = candidates.map(([patternId, outputSlug]) => {
  const manifestPath = join(motionStudioRoot, 'out/research/remotion-elements', outputSlug, 'manifest.json');
  let manifestCanonicalSha: string | null = null;
  let current = false;
  if (!existsSync(manifestPath)) {
    block(`${patternId}:ELEMENT_MANIFEST_MISSING`);
  } else {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
        patternId?: string;
        canonicalSource?: string;
        canonicalBlockSha256?: string;
        productionReadiness?: string;
        actualStudioInstallState?: string;
      };
      manifestCanonicalSha = manifest.canonicalBlockSha256 ?? null;
      if (manifest.patternId !== patternId) block(`${patternId}:ELEMENT_MANIFEST_PATTERN_MISMATCH`);
      if (manifest.canonicalSource !== 'src/motion-kit/engines.tsx#TypographyRevealEngine') block(`${patternId}:CANONICAL_SOURCE_IDENTITY_MISMATCH`);
      if (!manifestCanonicalSha) block(`${patternId}:CANONICAL_BLOCK_SHA_MISSING`);
      else if (!canonicalBlockSha256 || manifestCanonicalSha !== canonicalBlockSha256) block(`${patternId}:CANONICAL_BLOCK_SHA_STALE`);
      if (manifest.productionReadiness !== 'CANDIDATE_NEEDS_STUDIO_ACTUAL') block(`${patternId}:UNEXPECTED_PRODUCTION_READINESS`);
      if (manifest.actualStudioInstallState !== 'NOT_RUN') block(`${patternId}:GENERATED_MANIFEST_MUST_NOT_CLAIM_STUDIO_ACTUAL`);
      current = Boolean(canonicalBlockSha256 && manifestCanonicalSha === canonicalBlockSha256);
    } catch {
      block(`${patternId}:ELEMENT_MANIFEST_INVALID_JSON`);
    }
  }
  return {patternId, manifestPath: rel(manifestPath), canonicalBlockSha256: manifestCanonicalSha, current};
});

let studioActualEvidencePresent = false;
let studioActualEvidenceBoundToBatch = false;
let studioActualOverall: string = 'NOT_RUN';
if (existsSync(evidencePath)) {
  studioActualEvidencePresent = true;
  try {
    const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as {
      schemaVersion?: string;
      batchManifest?: {path?: string; sha256?: string};
      review?: {overall?: string};
    };
    studioActualOverall = evidence.review?.overall ?? 'NOT_RUN';
    studioActualEvidenceBoundToBatch = Boolean(
      batchManifestSha256 &&
      evidence.schemaVersion === 'remotion-element-studio-actual-evidence/v1' &&
      evidence.batchManifest?.path === rel(batchManifestPath) &&
      evidence.batchManifest?.sha256 === batchManifestSha256,
    );
    if (!studioActualEvidenceBoundToBatch) block('STUDIO_ACTUAL_EVIDENCE_BATCH_BINDING_STALE');
  } catch {
    block('STUDIO_ACTUAL_EVIDENCE_INVALID_JSON');
  }
}

const canonicalEngineCurrent = Boolean(
  canonicalBlockSha256 &&
  candidateBindings.every((candidate) => candidate.current),
);
const batchCurrent = Boolean(batchManifestSha256 && canonicalEngineCurrent);
const effectiveStudioActualCurrent = Boolean(
  batchCurrent && studioActualEvidencePresent && studioActualEvidenceBoundToBatch && studioActualOverall === 'PASS',
);

const summary = {
  schemaVersion: 'remotion-element-canonical-engine-currentness/v1',
  authority: 'REPO_CANONICAL_TYPOGRAPHY_ENGINE_CURRENTNESS',
  generatedAt: new Date().toISOString(),
  canonicalSource: {
    path: 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine',
    blockSha256: canonicalBlockSha256,
    current: canonicalEngineCurrent,
  },
  batchManifest: {
    path: rel(batchManifestPath),
    sha256: batchManifestSha256,
    current: batchCurrent,
  },
  candidateBindings,
  studioActualEvidence: {
    path: rel(evidencePath),
    present: studioActualEvidencePresent,
    batchBound: studioActualEvidenceBoundToBatch,
    reportedOverall: studioActualOverall,
    effectiveCurrent: effectiveStudioActualCurrent,
  },
  blockerCodes: [...new Set(blockerCodes)].sort(),
  productionDependencyPromoted: false,
  macStudioGuiActualPerformedByThisCheck: false,
  guardrails: [
    'CANONICAL_TYPOGRAPHY_ENGINE_CHANGED => PREPARED_ELEMENT_BATCH_STALE',
    'PREPARED_ELEMENT_BATCH_STALE => OLD_STUDIO_ACTUAL_EVIDENCE_NOT_CURRENT',
    'REPO_CURRENTNESS_CHECK != MAC_STUDIO_GUI_ACTUAL',
    'STUDIO_ACTUAL_VERIFIED != PRODUCTION_DEPENDENCY_PROMOTED',
  ],
};

mkdirSync(dirname(summaryPath), {recursive: true});
writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);

console.log(`canonicalTypographyEngine=${canonicalEngineCurrent ? 'CURRENT_SHA_BOUND' : 'STALE_OR_UNPREPARED'}`);
console.log(`batchCurrent=${batchCurrent ? 'CURRENT_SHA_BOUND' : 'STALE_OR_UNPREPARED'}`);
console.log(`studioActualReported=${studioActualOverall}`);
console.log(`studioActualEffectiveCurrent=${effectiveStudioActualCurrent ? 'YES' : 'NO'}`);
console.log('macStudioGuiActualPerformedByThisCheck=NO');
console.log('productionDependencyPromoted=NO');
for (const code of summary.blockerCodes) console.log(`BLOCK / ${code}`);

if (!batchCurrent) process.exit(1);
