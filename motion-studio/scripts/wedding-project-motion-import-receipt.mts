import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildWeddingDavinciProductionRecovery} from '../src/data/weddingDavinciProductionRecovery.ts';
import {
  buildWeddingProjectMotionAssemblyInput,
  type WeddingProjectMotionAssemblyInputV1,
} from '../src/data/weddingProjectMotionImport.ts';
import {
  getWeddingProjectMotionCanonicalArtifactPaths,
  writeCanonicalJsonArtifact,
} from './wedding-project-motion-artifact-store.mts';

export interface WeddingProjectMotionImportReceiptV1 {
  schemaVersion: 'motion-studio-project-motion-import-receipt/v1';
  authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_RECEIPT';
  projectId: 'opening' | 'profile';
  source: {
    path: string;
    sha256: string;
  };
  assemblyInput: WeddingProjectMotionAssemblyInputV1;
  recovery: ReturnType<typeof buildWeddingDavinciProductionRecovery>;
  evidenceBoundary: {
    remotionStudioGuiActual: 'NOT_RUN';
    macDaVinciGuiActual: 'NOT_RUN';
    productionReady: false;
  };
  guardrails: string[];
}

export function buildWeddingProjectMotionImportReceiptFromText(
  sourceText: string,
  sourcePath: string,
  expectedProjectId?: 'opening' | 'profile',
): WeddingProjectMotionImportReceiptV1 {
  const parsedJson = JSON.parse(sourceText) as unknown;
  const assemblyInput = buildWeddingProjectMotionAssemblyInput(parsedJson);
  if (expectedProjectId && assemblyInput.projectId !== expectedProjectId) {
    throw new Error(`PROJECT_MOTION_IMPORT_RECEIPT_PROJECT_MISMATCH:${assemblyInput.projectId}:${expectedProjectId}`);
  }
  const recovery = buildWeddingDavinciProductionRecovery(assemblyInput.projectId, assemblyInput);
  return {
    schemaVersion: 'motion-studio-project-motion-import-receipt/v1',
    authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_RECEIPT',
    projectId: assemblyInput.projectId,
    source: {
      path: sourcePath,
      sha256: createHash('sha256').update(sourceText).digest('hex'),
    },
    assemblyInput,
    recovery,
    evidenceBoundary: {
      remotionStudioGuiActual: 'NOT_RUN',
      macDaVinciGuiActual: 'NOT_RUN',
      productionReady: false,
    },
    guardrails: [
      'SOURCE_SHA256_BINDS_THIS_IMPORT_RECEIPT_TO_EXACT_DASHBOARD_EXPORT',
      'CHANGED_DASHBOARD_EXPORT_REQUIRES_NEW_IMPORT_RECEIPT',
      'IMPORT_RECEIPT_CREATED != PALMIER_APPLICATION_PERFORMED',
      'IMPORT_RECEIPT_CREATED != DAVINCI_APPLICATION_PERFORMED',
      'IMPORT_RECEIPT_CREATED != REMOTION_STUDIO_GUI_ACTUAL',
      'IMPORT_RECEIPT_CREATED != MAC_DAVINCI_GUI_ACTUAL',
    ],
  };
}

export function buildWeddingProjectMotionImportReceiptFromFile(
  inputPath: string,
  expectedProjectId?: 'opening' | 'profile',
): WeddingProjectMotionImportReceiptV1 {
  const absolutePath = resolve(inputPath);
  const sourceText = readFileSync(absolutePath, 'utf8');
  return buildWeddingProjectMotionImportReceiptFromText(sourceText, absolutePath, expectedProjectId);
}

export function saveWeddingProjectMotionImportReceipt(receipt: WeddingProjectMotionImportReceiptV1) {
  const path = getWeddingProjectMotionCanonicalArtifactPaths(receipt.projectId).receipt;
  writeCanonicalJsonArtifact(path, receipt);
  return path;
}

function parseProjectId(argv: string[]) {
  const value = argv.find((arg) => arg.startsWith('--movie='))?.slice('--movie='.length);
  if (value === undefined) return undefined;
  if (value !== 'opening' && value !== 'profile') throw new Error(`INVALID_MOVIE:${value}`);
  return value;
}

function main() {
  const argv = process.argv.slice(2);
  const inputPath = argv.find((arg) => arg.startsWith('--input='))?.slice('--input='.length);
  if (!inputPath) throw new Error('PROJECT_MOTION_IMPORT_INPUT_REQUIRED: use --input=/absolute/or/relative/export.json');
  const receipt = buildWeddingProjectMotionImportReceiptFromFile(inputPath, parseProjectId(argv));
  if (argv.includes('--save-current')) {
    const savedPath = saveWeddingProjectMotionImportReceipt(receipt);
    process.stderr.write(`canonicalProjectMotionReceipt=${savedPath}\n`);
  }
  process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
  if (!receipt.assemblyInput.assemblyReferenceReady) process.exitCode = 2;
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath && invokedPath === fileURLToPath(import.meta.url)) main();
