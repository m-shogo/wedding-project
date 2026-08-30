import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {WeddingProjectMotionImportReceiptV1} from './wedding-project-motion-import-receipt.mts';

export type WeddingProjectMotionReceiptCurrentnessState = 'CURRENT' | 'STALE';

export interface WeddingProjectMotionReceiptCurrentnessV1 {
  schemaVersion: 'motion-studio-project-motion-import-currentness/v1';
  authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_CURRENTNESS';
  projectId: 'opening' | 'profile';
  state: WeddingProjectMotionReceiptCurrentnessState;
  receipt: {
    sourcePath: string;
    recordedSha256: string;
  };
  currentExport: {
    path: string;
    sha256: string;
  };
  assemblyGate: {
    palmierCurrent: boolean;
    davinciHandoffCurrent: boolean;
    macDaVinciGuiActual: 'NOT_RUN';
    productionReady: false;
  };
  blockerCodes: string[];
  recoveryActions: Array<{
    kind: 'COMMAND' | 'HUMAN';
    label: string;
    command?: string;
  }>;
  guardrails: string[];
}

function assertReceipt(value: unknown): asserts value is WeddingProjectMotionImportReceiptV1 {
  if (!value || typeof value !== 'object') throw new Error('PROJECT_MOTION_IMPORT_RECEIPT_INVALID:object-required');
  const receipt = value as Partial<WeddingProjectMotionImportReceiptV1>;
  if (receipt.schemaVersion !== 'motion-studio-project-motion-import-receipt/v1') {
    throw new Error(`PROJECT_MOTION_IMPORT_RECEIPT_INVALID:schema:${String(receipt.schemaVersion)}`);
  }
  if (receipt.authority !== 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_RECEIPT') {
    throw new Error(`PROJECT_MOTION_IMPORT_RECEIPT_INVALID:authority:${String(receipt.authority)}`);
  }
  if (receipt.projectId !== 'opening' && receipt.projectId !== 'profile') {
    throw new Error(`PROJECT_MOTION_IMPORT_RECEIPT_INVALID:project:${String(receipt.projectId)}`);
  }
  if (!receipt.source || typeof receipt.source.sha256 !== 'string' || receipt.source.sha256.length !== 64) {
    throw new Error('PROJECT_MOTION_IMPORT_RECEIPT_INVALID:source-sha256');
  }
}

function quoteShell(value: string) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

export function buildWeddingProjectMotionReceiptCurrentnessFromText(
  receiptText: string,
  currentExportText: string,
  receiptPath: string,
  currentExportPath: string,
  expectedProjectId?: 'opening' | 'profile',
): WeddingProjectMotionReceiptCurrentnessV1 {
  const parsedReceipt = JSON.parse(receiptText) as unknown;
  assertReceipt(parsedReceipt);
  if (expectedProjectId && parsedReceipt.projectId !== expectedProjectId) {
    throw new Error(`PROJECT_MOTION_CURRENTNESS_PROJECT_MISMATCH:${parsedReceipt.projectId}:${expectedProjectId}`);
  }

  const currentSha256 = createHash('sha256').update(currentExportText).digest('hex');
  const state: WeddingProjectMotionReceiptCurrentnessState =
    currentSha256 === parsedReceipt.source.sha256 ? 'CURRENT' : 'STALE';
  const reimportCommand = `node --no-warnings scripts/wedding-project-motion-import-receipt.mts --input=${quoteShell(
    currentExportPath,
  )} --movie=${parsedReceipt.projectId}`;

  return {
    schemaVersion: 'motion-studio-project-motion-import-currentness/v1',
    authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_CURRENTNESS',
    projectId: parsedReceipt.projectId,
    state,
    receipt: {
      sourcePath: receiptPath,
      recordedSha256: parsedReceipt.source.sha256,
    },
    currentExport: {
      path: currentExportPath,
      sha256: currentSha256,
    },
    assemblyGate: {
      palmierCurrent: state === 'CURRENT' && parsedReceipt.recovery.bridge.palmierCurrent,
      davinciHandoffCurrent: state === 'CURRENT' && parsedReceipt.recovery.bridge.davinciHandoffCurrent,
      macDaVinciGuiActual: 'NOT_RUN',
      productionReady: false,
    },
    blockerCodes: state === 'CURRENT' ? [] : ['PROJECT_MOTION_IMPORT_RECEIPT_STALE'],
    recoveryActions:
      state === 'CURRENT'
        ? []
        : [
            {
              kind: 'COMMAND',
              label: 'Re-import the current Project Motion handoff and create a new SHA-bound receipt',
              command: reimportCommand,
            },
            {
              kind: 'HUMAN',
              label: 'Do not continue Palmier or DaVinci assembly from the stale receipt',
            },
          ],
    guardrails: [
      'CURRENT_REQUIRES_EXACT_SHA256_MATCH_WITH_CURRENT_PROJECT_MOTION_EXPORT',
      'STALE_PROJECT_MOTION_IMPORT_RECEIPT => PALMIER_CURRENT_FALSE',
      'STALE_PROJECT_MOTION_IMPORT_RECEIPT => DAVINCI_HANDOFF_CURRENT_FALSE',
      'CURRENTNESS_CHECK != PALMIER_APPLICATION_PERFORMED',
      'CURRENTNESS_CHECK != DAVINCI_APPLICATION_PERFORMED',
      'CURRENTNESS_CHECK != REMOTION_STUDIO_GUI_ACTUAL',
      'CURRENTNESS_CHECK != MAC_DAVINCI_GUI_ACTUAL',
    ],
  };
}

export function buildWeddingProjectMotionReceiptCurrentnessFromFiles(
  receiptPath: string,
  currentExportPath: string,
  expectedProjectId?: 'opening' | 'profile',
) {
  const absoluteReceiptPath = resolve(receiptPath);
  const absoluteCurrentExportPath = resolve(currentExportPath);
  return buildWeddingProjectMotionReceiptCurrentnessFromText(
    readFileSync(absoluteReceiptPath, 'utf8'),
    readFileSync(absoluteCurrentExportPath, 'utf8'),
    absoluteReceiptPath,
    absoluteCurrentExportPath,
    expectedProjectId,
  );
}

function parseProjectId(argv: string[]) {
  const value = argv.find((arg) => arg.startsWith('--movie='))?.slice('--movie='.length);
  if (value === undefined) return undefined;
  if (value !== 'opening' && value !== 'profile') throw new Error(`INVALID_MOVIE:${value}`);
  return value;
}

function main() {
  const argv = process.argv.slice(2);
  const receiptPath = argv.find((arg) => arg.startsWith('--receipt='))?.slice('--receipt='.length);
  const currentExportPath = argv.find((arg) => arg.startsWith('--current-export='))?.slice('--current-export='.length);
  if (!receiptPath) throw new Error('PROJECT_MOTION_CURRENTNESS_RECEIPT_REQUIRED: use --receipt=<receipt.json>');
  if (!currentExportPath) {
    throw new Error('PROJECT_MOTION_CURRENTNESS_EXPORT_REQUIRED: use --current-export=<project-motion-handoff.json>');
  }
  const result = buildWeddingProjectMotionReceiptCurrentnessFromFiles(
    receiptPath,
    currentExportPath,
    parseProjectId(argv),
  );
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.state !== 'CURRENT' || !result.assemblyGate.palmierCurrent || !result.assemblyGate.davinciHandoffCurrent) {
    process.exitCode = 2;
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath && invokedPath === fileURLToPath(import.meta.url)) main();
