import {createHash} from 'node:crypto';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {defaultBgmTarget, type BgmIntakeReceipt} from './intake-production-bgm.mts';

type Project = 'opening' | 'profile';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
export const defaultBgmReceiptPath = (project: Project) => join(studioRoot, 'out/intake', `${project}-bgm-intake.json`);
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

export const verifyBgmIntakeReceipt = ({
  project,
  receiptPath = defaultBgmReceiptPath(project),
  targetPath = defaultBgmTarget(project),
}: {
  project: Project;
  receiptPath?: string;
  targetPath?: string;
}) => {
  const receiptAbs = resolve(receiptPath);
  const targetAbs = resolve(targetPath);
  const blockers: string[] = [];
  if (!existsSync(receiptAbs)) return {current: false, project, receiptPath: receiptAbs, targetPath: targetAbs, blockers: [`BGM_RECEIPT_MISSING: ${receiptAbs}`]};
  if (!existsSync(targetAbs)) return {current: false, project, receiptPath: receiptAbs, targetPath: targetAbs, blockers: [`BGM_TARGET_MISSING: ${targetAbs}`]};

  let receipt: BgmIntakeReceipt;
  try {
    receipt = JSON.parse(readFileSync(receiptAbs, 'utf8')) as BgmIntakeReceipt;
  } catch (error) {
    return {current: false, project, receiptPath: receiptAbs, targetPath: targetAbs, blockers: [`BGM_RECEIPT_INVALID_JSON: ${error instanceof Error ? error.message : String(error)}`]};
  }

  if (receipt.schemaVersion !== 'wedding-production-bgm-intake-receipt/v1') blockers.push('BGM_RECEIPT_SCHEMA_MISMATCH');
  if (receipt.project !== project) blockers.push(`BGM_RECEIPT_PROJECT_MISMATCH: ${receipt.project}`);
  if (receipt.targetFile !== 'bgm-main.mp3') blockers.push(`BGM_RECEIPT_TARGET_FILE_MISMATCH: ${receipt.targetFile}`);
  if (!receipt.sourceTargetMatch || !receipt.sourcePreserved || !receipt.copyBytesVerified) blockers.push('BGM_RECEIPT_PROVENANCE_INVALID');
  if (receipt.rightsClearedByIntake !== false || receipt.humanCreativeQaState !== 'NOT_RUN' || receipt.macDaVinciActualState !== 'NOT_RUN' || receipt.productionReady !== false) blockers.push('BGM_RECEIPT_DOWNSTREAM_HONESTY_INVALID');

  const bytes = statSync(targetAbs).size;
  if (bytes !== receipt.bytes) blockers.push(`BGM_TARGET_BYTES_CHANGED: receipt=${receipt.bytes} current=${bytes}`);
  const sha256 = shaFile(targetAbs);
  if (sha256 !== receipt.sha256) blockers.push(`BGM_TARGET_SHA_CHANGED: receipt=${receipt.sha256} current=${sha256}`);

  return {current: blockers.length === 0, project, receiptPath: receiptAbs, targetPath: targetAbs, bytes, sha256, blockers};
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
    console.error('Usage: --project opening|profile [--receipt <json-path>] [--target <mp3-path>]');
    process.exit(2);
  }
  const result = verifyBgmIntakeReceipt({project, receiptPath: readArg('--receipt'), targetPath: readArg('--target')});
  console.log(`Production BGM intake receipt: ${project}`);
  console.log(`receipt: ${relative(studioRoot, result.receiptPath)}`);
  console.log(`target: ${relative(studioRoot, result.targetPath)}`);
  if (!result.current) {
    for (const blocker of result.blockers) console.error(`BLOCKED: ${blocker}`);
    console.error('BGM RECEIPT STALE: rerun canonical BGM intake DRY RUN → --apply --receipt before strict production use.');
    process.exit(1);
  }
  console.log('BGM RECEIPT CURRENT: canonical bgm-main.mp3 still matches SHA-bound intake evidence.');
};

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) main();
