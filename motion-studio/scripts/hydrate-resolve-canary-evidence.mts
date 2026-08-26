import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {
  createResolveRuntimeCanaryEvidenceTemplate,
  getResolveRuntimeCanary,
} from '../src/data/resolveRuntimeCanaryPack.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const manifestArg = args[0];

function usage() {
  console.log('Resolve Canary Evidence Hydration');
  console.log('');
  console.log('Usage:');
  console.log('  node --no-warnings scripts/hydrate-resolve-canary-evidence.mts <manifest.json> --execution-id <ID> [--output <evidence.json>]');
  console.log('');
  console.log('Hydration copies verified input provenance only. It never marks Resolve runtime steps as executed.');
}

function valueFor(flag: string) {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
  return value;
}

function sha256(path: string) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function displayPath(path: string) {
  const rel = relative(motionRoot, path).replaceAll('\\', '/');
  if (!rel.startsWith('../') && rel !== '..' && !isAbsolute(rel)) return rel || '.';
  return path;
}

function resolveRecordedPath(recordedPath: string) {
  if (isAbsolute(recordedPath)) return recordedPath;
  return resolve(motionRoot, recordedPath);
}

try {
  if (!manifestArg || manifestArg.startsWith('--') || args.includes('--help')) {
    usage();
    process.exit(manifestArg ? 0 : 1);
  }

  const executionId = valueFor('--execution-id');
  if (!executionId) throw new Error('--execution-id is required.');
  if (!/^[A-Za-z0-9._-]+$/.test(executionId)) {
    throw new Error('--execution-id may contain only letters, numbers, dot, underscore, and hyphen.');
  }

  const manifestPath = resolve(process.cwd(), manifestArg);
  if (!existsSync(manifestPath)) throw new Error(`Input manifest not found: ${manifestPath}`);

  const manifest = resolveCanaryInputManifestSchema.parse(JSON.parse(readFileSync(manifestPath, 'utf8')));
  const canary = getResolveRuntimeCanary(manifest.canaryId);
  if (!canary) throw new Error(`Unknown canary in manifest: ${manifest.canaryId}`);

  const verifiedFiles = manifest.files.map((file) => {
    if (!file.sha256) throw new Error(`Manifest file ${file.id} has no SHA-256; hydration requires immutable input provenance.`);
    const absolutePath = resolveRecordedPath(file.path);
    if (!existsSync(absolutePath)) throw new Error(`Manifest file missing: ${file.id} -> ${absolutePath}`);
    const actualSha256 = sha256(absolutePath);
    if (actualSha256 !== file.sha256) {
      throw new Error(`SHA-256 mismatch for ${file.id}: manifest=${file.sha256} actual=${actualSha256}`);
    }
    return {...file, absolutePath, actualSha256};
  });

  const evidence = createResolveRuntimeCanaryEvidenceTemplate(manifest.canaryId, executionId);
  const inputIds = new Set(canary.inputs.map((input) => input.id));
  const matchedInputIds: string[] = [];
  const supportFiles: typeof verifiedFiles = [];

  for (const file of verifiedFiles) {
    if (!inputIds.has(file.id)) {
      supportFiles.push(file);
      continue;
    }
    const input = evidence.inputInventory.find((item) => item.id === file.id);
    if (!input) throw new Error(`Evidence template unexpectedly lacks canary input: ${file.id}`);
    input.pathOrRef = file.path;
    input.sha256 = file.actualSha256;
    input.present = true;
    matchedInputIds.push(file.id);
  }

  const blocked = manifest.status === 'BLOCKED_REAL_TOOL_EXPORT_REQUIRED';
  const manifestSha256 = sha256(manifestPath);
  evidence.result = blocked ? 'BLOCKED' : 'NOT_RUN';
  evidence.capturedAt = null;
  evidence.promotionEligible = false;
  evidence.artifacts.push({
    kind: 'INPUT_MANIFEST',
    path: displayPath(manifestPath),
    sha256: manifestSha256,
  });
  for (const file of supportFiles) {
    evidence.artifacts.push({
      kind: 'INPUT_SUPPORT',
      path: file.path,
      sha256: file.actualSha256,
    });
  }

  const unmatchedRequiredInputs = canary.inputs
    .filter((input) => input.required && !matchedInputIds.includes(input.id))
    .map((input) => input.id);

  evidence.notes.push(
    `Hydrated from resolve-canary-input-manifest/v1: ${displayPath(manifestPath)} sha256=${manifestSha256}.`,
    `Input manifest status=${manifest.status}; generatedAt=${manifest.generatedAt}.`,
    'MANIFEST_PREPARED != RUNTIME_EXECUTED',
    'Only manifest file IDs exactly matching canary input IDs are marked present=true; unmatched files remain INPUT_SUPPORT artifacts.',
    `Matched input IDs: ${matchedInputIds.length ? matchedInputIds.join(', ') : 'none'}.`,
    `Required inputs still awaiting runtime/tool preparation: ${unmatchedRequiredInputs.length ? unmatchedRequiredInputs.join(', ') : 'none'}.`,
  );
  if (blocked) {
    evidence.notes.push('Input preparation is blocked; no Resolve runtime execution should begin until the missing real-tool input is supplied.');
  }

  const parsed = resolveRuntimeCanaryEvidenceSchema.parse(evidence);
  const outputArg = valueFor('--output');
  const outputPath = outputArg
    ? resolve(process.cwd(), outputArg)
    : join(motionRoot, 'out', 'canary-evidence', executionId, 'evidence.json');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');

  console.log(`✅ Hydrated ${manifest.canaryId} input provenance -> ${displayPath(outputPath)}`);
  console.log(`   result=${parsed.result} promotionEligible=${parsed.promotionEligible}`);
  console.log(`   matchedInputs=${matchedInputIds.length} supportFiles=${supportFiles.length} unresolvedRequiredInputs=${unmatchedRequiredInputs.length}`);
  console.log('   No Resolve runtime step was executed by this command.');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
