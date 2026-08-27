import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {extname, join} from 'node:path';
import {profileV1RequiredMediaSlots} from '../src/data/profileV1ProductionPlan.ts';

const root = process.cwd();
const mediaRoot = join(root, 'public/profile');
const generator = readFileSync(join(root, 'scripts/sync-profile-v1-runtime-media.mts'), 'utf8');
const generatedSource = readFileSync(join(root, 'src/data/profileV1RuntimeMedia.generated.ts'), 'utf8');
const errors: string[] = [];

const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'profileV1RequiredMediaSlots',
  'filesByStem = new Map<string, string[]>()',
  'compatibleFiles.length === 1',
  "kind === 'photo'",
  "kind === 'video'",
  "kind === 'photo-or-video'",
  "schemaVersion: 'profile-v1-runtime-media/v1'",
  "authority: 'GENERATED_FROM_CANONICAL_PROFILE_MEDIA_DIRECTORY'",
  "process.argv.includes('--write')",
]) {
  requireText(generator, token, `Profile runtime media generator missing: ${token}`);
}

for (const forbidden of [
  'new Map(files.map(',
  'byStem.get(slot.canonicalStem)',
]) {
  if (generator.includes(forbidden)) {
    errors.push(`Profile runtime media generator can silently overwrite same-stem media: ${forbidden}`);
  }
}

const generatedMatch = generatedSource.match(/export const profileV1RuntimeMedia = ([\s\S]*?) as const;/);
if (!generatedMatch) {
  errors.push('Profile runtime media generated snapshot is not parseable');
}

let generated: any = null;
if (generatedMatch) {
  try {
    generated = JSON.parse(generatedMatch[1]);
  } catch (error) {
    errors.push(`Profile runtime media generated snapshot JSON parse failed: ${String(error)}`);
  }
}

const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const videoExts = new Set(['.mp4', '.mov', '.m4v', '.webm']);
const mediaExts = new Set([...imageExts, ...videoExts]);
const normalizeStem = (file: string) => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};
const acceptsKind = (kind: string, file: string) => {
  const ext = extname(file).toLowerCase();
  if (kind === 'photo') return imageExts.has(ext);
  if (kind === 'video') return videoExts.has(ext);
  if (kind === 'photo-or-video') return imageExts.has(ext) || videoExts.has(ext);
  return false;
};

const files = existsSync(mediaRoot)
  ? readdirSync(mediaRoot)
      .filter((file) => !file.startsWith('.'))
      .filter((file) => statSync(join(mediaRoot, file)).isFile())
      .filter((file) => mediaExts.has(extname(file).toLowerCase()))
  : [];
const filesByStem = new Map<string, string[]>();
for (const file of files) {
  const stem = normalizeStem(file);
  const list = filesByStem.get(stem) ?? [];
  list.push(file);
  filesByStem.set(stem, list);
}

if (generated) {
  if (generated.schemaVersion !== 'profile-v1-runtime-media/v1') errors.push('Profile runtime media schemaVersion drift');
  if (generated.authority !== 'GENERATED_FROM_CANONICAL_PROFILE_MEDIA_DIRECTORY') errors.push('Profile runtime media authority drift');
  if (generated.sourceDirectory !== 'public/profile') errors.push('Profile runtime media sourceDirectory drift');
  if (generated.expectedCount !== profileV1RequiredMediaSlots.length) errors.push('Profile runtime media expectedCount drift');
  if (!Array.isArray(generated.slots) || generated.slots.length !== profileV1RequiredMediaSlots.length) errors.push('Profile runtime media slot count drift');

  let resolvedCount = 0;
  for (const expected of profileV1RequiredMediaSlots) {
    const actual = generated.slots?.find((slot: any) => slot.id === expected.id);
    if (!actual) {
      errors.push(`Profile runtime media missing slot: ${expected.id}`);
      continue;
    }
    if (actual.chapterId !== expected.chapterId || actual.kind !== expected.kind || actual.canonicalStem !== expected.canonicalStem) {
      errors.push(`Profile runtime media semantic metadata drift: ${expected.id}`);
    }

    const candidates = filesByStem.get(expected.canonicalStem) ?? [];
    const compatible = candidates.filter((file) => acceptsKind(expected.kind, file));
    const incompatible = candidates.filter((file) => !acceptsKind(expected.kind, file));

    if (compatible.length > 1) {
      errors.push(`Profile runtime media ambiguous canonical stem ${expected.canonicalStem}: ${compatible.join(', ')}`);
    }
    if (incompatible.length > 0) {
      errors.push(`Profile runtime media kind mismatch ${expected.canonicalStem} (${expected.kind}): ${incompatible.join(', ')}`);
    }

    const expectedFile = compatible.length === 1 ? compatible[0] : null;
    if (actual.file !== expectedFile) errors.push(`Profile runtime media file binding stale/wrong: ${expected.id}`);
    if (actual.resolved !== Boolean(expectedFile)) errors.push(`Profile runtime media resolved flag stale/wrong: ${expected.id}`);
    if (actual.staticFilePath !== (expectedFile ? `profile/${expectedFile}` : null)) errors.push(`Profile runtime media staticFilePath stale/wrong: ${expected.id}`);
    if (actual.extension !== (expectedFile ? extname(expectedFile).toLowerCase() : null)) errors.push(`Profile runtime media extension stale/wrong: ${expected.id}`);
    if (expectedFile) resolvedCount += 1;
  }

  if (generated.resolvedCount !== resolvedCount) errors.push('Profile runtime media resolvedCount is inconsistent with current real media');
  if (generated.missingCount !== profileV1RequiredMediaSlots.length - resolvedCount) errors.push('Profile runtime media missingCount is inconsistent with current real media');
}

if (errors.length) {
  console.error(`Profile V1 runtime media contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Profile V1 runtime media contracts OK: ${generated?.resolvedCount ?? 0}/${profileV1RequiredMediaSlots.length} canonical slots; ` +
    'real media may increase from 0/17 to 17/17, while duplicate stems and kind mismatches fail closed.',
);
