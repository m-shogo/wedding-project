import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, extname, basename, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

type Project = 'opening' | 'profile';

type BgmIntakePlan = {
  project: Project;
  sourcePath: string;
  sourceFile: string;
  targetPath: string;
  targetFile: string;
  sourceExtension: string;
  targetExists: boolean;
  readyToApply: boolean;
  blockers: string[];
};

export type BgmIntakeReceipt = {
  schemaVersion: 'wedding-production-bgm-intake-receipt/v1';
  project: Project;
  createdAt: string;
  sourceFile: string;
  targetFile: string;
  bytes: number;
  sha256: string;
  sourceTargetMatch: true;
  sourcePreserved: true;
  copyBytesVerified: true;
  rightsClearedByIntake: false;
  humanCreativeQaState: 'NOT_RUN';
  macDaVinciActualState: 'NOT_RUN';
  productionReady: false;
};

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
export const defaultBgmTarget = (project: Project) => project === 'opening'
  ? join(studioRoot, 'public/audio/opening/bgm-main.mp3')
  : join(studioRoot, 'public/audio/profile/bgm-main.mp3');
const sha256File = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

export const buildBgmIntakePlan = ({
  project,
  sourcePath,
  targetPath = defaultBgmTarget(project),
  overwrite = false,
}: {
  project: Project;
  sourcePath: string;
  targetPath?: string;
  overwrite?: boolean;
}): BgmIntakePlan => {
  const source = resolve(sourcePath);
  const target = resolve(targetPath);
  const blockers: string[] = [];
  const extension = extname(source).toLowerCase();

  if (!existsSync(source)) blockers.push(`SOURCE_MISSING: ${source}`);
  else if (!statSync(source).isFile()) blockers.push(`SOURCE_NOT_FILE: ${source}`);
  if (extension !== '.mp3') blockers.push(`UNSUPPORTED_SOURCE_EXTENSION: ${extension || '(none)'}; canonical BGM requires .mp3. Transcode separately with reviewed settings.`);
  const targetExists = existsSync(target);
  if (targetExists && !overwrite) blockers.push(`TARGET_EXISTS: ${target}`);

  return {
    project,
    sourcePath: source,
    sourceFile: basename(source),
    targetPath: target,
    targetFile: basename(target),
    sourceExtension: extension,
    targetExists,
    readyToApply: blockers.length === 0,
    blockers,
  };
};

export const applyBgmIntakePlan = (plan: BgmIntakePlan, createdAt = new Date().toISOString()): BgmIntakeReceipt => {
  if (!plan.readyToApply) throw new Error('BGM intake plan is not safe to apply. Resolve blockers first.');
  const beforeSha = sha256File(plan.sourcePath);
  const beforeBytes = statSync(plan.sourcePath).size;
  mkdirSync(dirname(plan.targetPath), {recursive: true});
  copyFileSync(plan.sourcePath, plan.targetPath);
  const afterSha = sha256File(plan.targetPath);
  const afterBytes = statSync(plan.targetPath).size;
  if (beforeSha !== afterSha || beforeBytes !== afterBytes) {
    throw new Error(`COPY VERIFY FAILED: ${plan.sourceFile} -> ${plan.targetFile}`);
  }
  return {
    schemaVersion: 'wedding-production-bgm-intake-receipt/v1',
    project: plan.project,
    createdAt,
    sourceFile: plan.sourceFile,
    targetFile: plan.targetFile,
    bytes: afterBytes,
    sha256: afterSha,
    sourceTargetMatch: true,
    sourcePreserved: true,
    copyBytesVerified: true,
    rightsClearedByIntake: false,
    humanCreativeQaState: 'NOT_RUN',
    macDaVinciActualState: 'NOT_RUN',
    productionReady: false,
  };
};

export const writeBgmIntakeReceipt = (receipt: BgmIntakeReceipt, receiptPath: string) => {
  const destination = resolve(receiptPath);
  mkdirSync(dirname(destination), {recursive: true});
  writeFileSync(destination, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  return destination;
};

const readArg = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const main = () => {
  const project = readArg('--project') as Project | undefined;
  const source = readArg('--source');
  const receiptPath = readArg('--receipt');
  const apply = process.argv.includes('--apply');
  const overwrite = process.argv.includes('--overwrite');

  if (project !== 'opening' && project !== 'profile') {
    console.error('Usage: --project opening|profile --source <mp3-file> [--apply] [--overwrite] [--receipt <json-path>]');
    process.exit(2);
  }
  if (!source) {
    console.error('Missing --source <mp3-file>');
    process.exit(2);
  }

  const plan = buildBgmIntakePlan({project, sourcePath: source, overwrite});
  console.log(`Production BGM intake: ${project}`);
  console.log(`source file: ${plan.sourceFile}`);
  console.log(`target: ${plan.targetPath}`);
  for (const blocker of plan.blockers) console.error(`BLOCKED: ${blocker}`);
  if (!plan.readyToApply) {
    console.error('BLOCKED: no BGM copied. Fix source extension/path/target collision first.');
    process.exit(1);
  }

  if (!apply) {
    console.log('DRY RUN PASS: no BGM copied. Re-run with --apply after confirming this is the intended rights-review candidate.');
    if (receiptPath) console.log('RECEIPT NOT WRITTEN: receipt is emitted only after byte-verified copy.');
    process.exit(0);
  }

  const receipt = applyBgmIntakePlan(plan);
  console.log(`APPLIED: copied and SHA-verified ${receipt.targetFile}; source file preserved.`);
  if (receiptPath) console.log(`RECEIPT: ${writeBgmIntakeReceipt(receipt, receiptPath)}`);
  else console.log('RECEIPT: not requested. Use --receipt <json-path> to persist copy provenance.');
  console.log('RIGHTS STATE: NOT CLEARED BY INTAKE. Complete the project-specific Human rights gate next.');
  console.log(project === 'opening'
    ? 'NEXT: pnpm check:opening-sound → Human rights evidence → explicit assets.ts promotion → pnpm check:opening-sound:strict'
    : 'NEXT: pnpm profile:bgm-rights:init → Human review artifact → pnpm profile:bgm-rights:strict');
};

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) main();
