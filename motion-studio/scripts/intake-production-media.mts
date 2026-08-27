import {copyFileSync, existsSync, mkdirSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {aliases as openingAliases, orderedKeys} from '../src/data/openingV1Media.ts';
import {profileV1RequiredMediaSlots} from '../src/data/profileV1ProductionPlan.ts';

type Project = 'opening' | 'profile';
type MediaKind = 'photo' | 'video' | 'photo-or-video';

type IntakeSpec = {
  id: string;
  canonicalStem: string;
  aliases: string[];
  kind: MediaKind;
};

type PlannedCopy = {
  id: string;
  sourceFile: string;
  targetFile: string;
  sourcePath: string;
  targetPath: string;
};

type IntakePlan = {
  project: Project;
  sourceDirectory: string;
  targetDirectory: string;
  expectedCount: number;
  resolvedCount: number;
  missing: string[];
  ambiguous: Array<{id: string; files: string[]}>;
  incompatible: Array<{id: string; files: string[]}>;
  unexpected: string[];
  existingTargets: string[];
  copies: PlannedCopy[];
  readyToApply: boolean;
};

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const videoExts = new Set(['.mp4', '.mov', '.m4v', '.webm']);
const supportedExts = new Set([...imageExts, ...videoExts]);

const normalizeStem = (file: string) => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

const acceptsKind = (kind: MediaKind, file: string) => {
  const ext = extname(file).toLowerCase();
  if (kind === 'photo') return imageExts.has(ext);
  if (kind === 'video') return videoExts.has(ext);
  return imageExts.has(ext) || videoExts.has(ext);
};

export const getIntakeSpecs = (project: Project): IntakeSpec[] => {
  if (project === 'opening') {
    return orderedKeys.map((key) => ({
      id: key,
      canonicalStem: key,
      aliases: openingAliases[key],
      kind: 'photo',
    }));
  }

  return profileV1RequiredMediaSlots.map((slot) => ({
    id: slot.id,
    canonicalStem: slot.canonicalStem,
    aliases: [slot.canonicalStem],
    kind: slot.kind,
  }));
};

export const defaultTargetDirectory = (project: Project) => project === 'opening'
  ? join(studioRoot, 'public/photos/opening')
  : join(studioRoot, 'public/profile');

export const buildIntakePlan = ({
  project,
  sourceDirectory,
  targetDirectory = defaultTargetDirectory(project),
  overwrite = false,
}: {
  project: Project;
  sourceDirectory: string;
  targetDirectory?: string;
  overwrite?: boolean;
}): IntakePlan => {
  const source = resolve(sourceDirectory);
  const target = resolve(targetDirectory);
  if (!existsSync(source) || !statSync(source).isDirectory()) {
    throw new Error(`Source directory not found: ${source}`);
  }

  const specs = getIntakeSpecs(project);
  const sourceFiles = readdirSync(source)
    .filter((file) => !file.startsWith('.'))
    .filter((file) => statSync(join(source, file)).isFile())
    .sort((a, b) => a.localeCompare(b, 'en'));
  const supportedFiles = sourceFiles.filter((file) => supportedExts.has(extname(file).toLowerCase()));
  const usedFiles = new Set<string>();
  const missing: string[] = [];
  const ambiguous: Array<{id: string; files: string[]}> = [];
  const incompatible: Array<{id: string; files: string[]}> = [];
  const existingTargets: string[] = [];
  const copies: PlannedCopy[] = [];

  for (const spec of specs) {
    const normalizedAliases = new Set(spec.aliases.map((value) => value.toLowerCase().replaceAll('_', '-')));
    const candidates = supportedFiles.filter((file) => normalizedAliases.has(normalizeStem(file)));
    const compatible = candidates.filter((file) => acceptsKind(spec.kind, file));
    const incompatibleFiles = candidates.filter((file) => !acceptsKind(spec.kind, file));

    if (incompatibleFiles.length > 0) incompatible.push({id: spec.id, files: incompatibleFiles});
    if (compatible.length === 0) {
      missing.push(spec.id);
      continue;
    }
    if (compatible.length > 1) {
      ambiguous.push({id: spec.id, files: compatible});
      continue;
    }

    const sourceFile = compatible[0];
    const targetFile = `${spec.canonicalStem}${extname(sourceFile).toLowerCase()}`;
    const targetPath = join(target, targetFile);
    if (existsSync(targetPath) && !overwrite) existingTargets.push(targetFile);
    usedFiles.add(sourceFile);
    copies.push({
      id: spec.id,
      sourceFile,
      targetFile,
      sourcePath: join(source, sourceFile),
      targetPath,
    });
  }

  const unexpected = supportedFiles.filter((file) => !usedFiles.has(file));
  const readyToApply = missing.length === 0
    && ambiguous.length === 0
    && incompatible.length === 0
    && existingTargets.length === 0
    && copies.length === specs.length;

  return {
    project,
    sourceDirectory: source,
    targetDirectory: target,
    expectedCount: specs.length,
    resolvedCount: copies.length,
    missing,
    ambiguous,
    incompatible,
    unexpected,
    existingTargets,
    copies,
    readyToApply,
  };
};

export const applyIntakePlan = (plan: IntakePlan) => {
  if (!plan.readyToApply) throw new Error('Intake plan is not safe to apply. Resolve blockers first.');
  mkdirSync(plan.targetDirectory, {recursive: true});
  for (const copy of plan.copies) copyFileSync(copy.sourcePath, copy.targetPath);
};

const readArg = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const printPlan = (plan: IntakePlan) => {
  console.log(`Production media intake: ${plan.project}`);
  console.log(`source: ${plan.sourceDirectory}`);
  console.log(`target: ${plan.targetDirectory}`);
  console.log(`resolved: ${plan.resolvedCount}/${plan.expectedCount}`);
  for (const item of plan.copies) console.log(`  ${item.sourceFile} -> ${item.targetFile}`);
  for (const id of plan.missing) console.error(`MISSING: ${id}`);
  for (const item of plan.ambiguous) console.error(`AMBIGUOUS: ${item.id}: ${item.files.join(', ')}`);
  for (const item of plan.incompatible) console.error(`INCOMPATIBLE: ${item.id}: ${item.files.join(', ')}`);
  for (const file of plan.existingTargets) console.error(`TARGET EXISTS: ${file}`);
  for (const file of plan.unexpected) console.warn(`UNUSED SOURCE: ${file}`);
};

const main = () => {
  const project = readArg('--project') as Project | undefined;
  const source = readArg('--source');
  const apply = process.argv.includes('--apply');
  const overwrite = process.argv.includes('--overwrite');

  if (project !== 'opening' && project !== 'profile') {
    console.error('Usage: --project opening|profile --source <directory> [--apply] [--overwrite]');
    process.exit(2);
  }
  if (!source) {
    console.error('Missing --source <directory>');
    process.exit(2);
  }

  const plan = buildIntakePlan({project, sourceDirectory: source, overwrite});
  printPlan(plan);

  if (!plan.readyToApply) {
    console.error('BLOCKED: no files copied. Fix missing/ambiguous/incompatible/existing-target issues first.');
    process.exit(1);
  }

  if (!apply) {
    console.log('DRY RUN PASS: no files copied. Re-run with --apply to copy canonical files.');
    process.exit(0);
  }

  applyIntakePlan(plan);
  console.log(`APPLIED: copied ${plan.copies.length} files without modifying source files.`);
  console.log(project === 'opening'
    ? 'NEXT: pnpm prepare:opening-v1'
    : 'NEXT: pnpm prepare:profile-v1');
};

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) main();
