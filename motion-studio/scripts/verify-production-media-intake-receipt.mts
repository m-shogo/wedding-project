import {createHash} from 'node:crypto';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {dirname, extname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {defaultTargetDirectory, getIntakeSpecs, type IntakeReceipt} from './intake-production-media.mts';

type Project = 'opening' | 'profile';

type ReceiptVerification = {
  project: Project;
  receiptPath: string;
  targetDirectory: string;
  current: boolean;
  verifiedCount: number;
  expectedCount: number;
  errors: string[];
};

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const sha256File = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

export const defaultReceiptPath = (project: Project) => join(studioRoot, 'out/intake', `${project}-media-intake.json`);

export const verifyIntakeReceipt = ({
  project,
  receiptPath = defaultReceiptPath(project),
  targetDirectory = defaultTargetDirectory(project),
}: {
  project: Project;
  receiptPath?: string;
  targetDirectory?: string;
}): ReceiptVerification => {
  const receiptAbsolute = resolve(receiptPath);
  const targetAbsolute = resolve(targetDirectory);
  const errors: string[] = [];

  if (!existsSync(receiptAbsolute)) {
    return {
      project,
      receiptPath: receiptAbsolute,
      targetDirectory: targetAbsolute,
      current: false,
      verifiedCount: 0,
      expectedCount: getIntakeSpecs(project).length,
      errors: [`RECEIPT_MISSING: ${receiptAbsolute}`],
    };
  }

  let receipt: IntakeReceipt;
  try {
    receipt = JSON.parse(readFileSync(receiptAbsolute, 'utf8')) as IntakeReceipt;
  } catch (error) {
    return {
      project,
      receiptPath: receiptAbsolute,
      targetDirectory: targetAbsolute,
      current: false,
      verifiedCount: 0,
      expectedCount: getIntakeSpecs(project).length,
      errors: [`RECEIPT_INVALID_JSON: ${error instanceof Error ? error.message : String(error)}`],
    };
  }

  const specs = getIntakeSpecs(project);
  const specById = new Map(specs.map((spec) => [spec.id, spec]));
  const seen = new Set<string>();
  let verifiedCount = 0;

  if (receipt.schemaVersion !== 'wedding-production-media-intake-receipt/v1') errors.push(`RECEIPT_SCHEMA_MISMATCH: ${receipt.schemaVersion}`);
  if (receipt.project !== project) errors.push(`RECEIPT_PROJECT_MISMATCH: expected=${project} actual=${receipt.project}`);
  if (receipt.expectedCount !== specs.length || receipt.copiedCount !== specs.length || receipt.copies.length !== specs.length) {
    errors.push(`RECEIPT_COUNT_MISMATCH: expected=${specs.length} receiptExpected=${receipt.expectedCount} copied=${receipt.copiedCount} entries=${receipt.copies.length}`);
  }
  if (receipt.sourcePreserved !== true || receipt.copyBytesVerified !== true) errors.push('RECEIPT_PROVENANCE_FLAGS_INVALID');
  if (receipt.humanQaState !== 'NOT_RUN' || receipt.macDaVinciActualState !== 'NOT_RUN' || receipt.productionReady !== false) {
    errors.push('RECEIPT_DOWNSTREAM_HONESTY_INVALID');
  }

  for (const copy of receipt.copies) {
    if (seen.has(copy.id)) {
      errors.push(`RECEIPT_DUPLICATE_ID: ${copy.id}`);
      continue;
    }
    seen.add(copy.id);
    const spec = specById.get(copy.id);
    if (!spec) {
      errors.push(`RECEIPT_UNKNOWN_ID: ${copy.id}`);
      continue;
    }
    const targetExt = extname(copy.targetFile).toLowerCase();
    const targetStem = copy.targetFile.slice(0, copy.targetFile.length - targetExt.length);
    if (targetStem !== spec.canonicalStem) {
      errors.push(`RECEIPT_TARGET_STEM_MISMATCH: ${copy.id}: expected=${spec.canonicalStem} actual=${targetStem}`);
      continue;
    }
    if (copy.sourceTargetMatch !== true || !/^[a-f0-9]{64}$/.test(copy.sha256) || !Number.isInteger(copy.bytes) || copy.bytes < 0) {
      errors.push(`RECEIPT_COPY_EVIDENCE_INVALID: ${copy.id}`);
      continue;
    }

    const targetPath = join(targetAbsolute, copy.targetFile);
    if (!existsSync(targetPath)) {
      errors.push(`TARGET_MISSING: ${copy.id}: ${targetPath}`);
      continue;
    }
    const currentBytes = statSync(targetPath).size;
    if (currentBytes !== copy.bytes) {
      errors.push(`TARGET_BYTES_CHANGED: ${copy.id}: receipt=${copy.bytes} current=${currentBytes}`);
      continue;
    }
    const currentSha = sha256File(targetPath);
    if (currentSha !== copy.sha256) {
      errors.push(`TARGET_SHA_CHANGED: ${copy.id}: receipt=${copy.sha256} current=${currentSha}`);
      continue;
    }
    verifiedCount++;
  }

  for (const spec of specs) {
    if (!seen.has(spec.id)) errors.push(`RECEIPT_MISSING_ID: ${spec.id}`);
  }

  return {
    project,
    receiptPath: receiptAbsolute,
    targetDirectory: targetAbsolute,
    current: errors.length === 0 && verifiedCount === specs.length,
    verifiedCount,
    expectedCount: specs.length,
    errors,
  };
};

const readArg = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const main = () => {
  const project = readArg('--project') as Project | undefined;
  if (project !== 'opening' && project !== 'profile') {
    console.error('Usage: --project opening|profile [--receipt <json-path>] [--target <directory>]');
    process.exit(2);
  }
  const result = verifyIntakeReceipt({
    project,
    receiptPath: readArg('--receipt'),
    targetDirectory: readArg('--target'),
  });
  console.log(`Production media intake receipt: ${project}`);
  console.log(`receipt: ${result.receiptPath}`);
  console.log(`target: ${result.targetDirectory}`);
  console.log(`verified: ${result.verifiedCount}/${result.expectedCount}`);
  if (!result.current) {
    for (const error of result.errors) console.error(`BLOCKED: ${error}`);
    console.error('RECEIPT STALE: re-run canonical media intake DRY RUN, then --apply --receipt before preview/render.');
    process.exit(1);
  }
  console.log('RECEIPT CURRENT: every canonical target still matches the SHA-bound intake evidence.');
};

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) main();
