import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const generator = readFileSync(join(root, 'scripts/sync-profile-v1-runtime-media.mts'), 'utf8');
const generated = readFileSync(join(root, 'src/data/profileV1RuntimeMedia.generated.ts'), 'utf8');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "profileV1RequiredMediaSlots",
  "public/profile",
  "mediaExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.m4v', '.webm'])",
  'byStem.get(slot.canonicalStem)',
  "staticFilePath: file ? `profile/${file}` : null",
  "schemaVersion: 'profile-v1-runtime-media/v1'",
  "authority: 'GENERATED_FROM_CANONICAL_PROFILE_MEDIA_DIRECTORY'",
  "process.argv.includes('--write')",
]) {
  requireText(generator, token, `Profile runtime media generator missing: ${token}`);
}

for (const token of [
  '"schemaVersion": "profile-v1-runtime-media/v1"',
  '"authority": "GENERATED_FROM_CANONICAL_PROFILE_MEDIA_DIRECTORY"',
  '"sourceDirectory": "public/profile"',
  '"expectedCount": 17',
  '"resolvedCount": 0',
  '"missingCount": 17',
  '"id": "departure-airport"',
  '"id": "adventure-dog"',
  '"id": "arrival-yokohama"',
  '"staticFilePath": null',
  '"resolved": false',
]) {
  requireText(generated, token, `Profile runtime media fresh-clone snapshot missing: ${token}`);
}

for (const forbidden of [
  'resolvedCount": 17',
  '"resolved": true',
  'hero-01',
  'openingPhotos',
]) {
  if (generated.includes(forbidden)) errors.push(`Profile runtime media fresh clone fabricates or reuses unrelated media: ${forbidden}`);
}

if (errors.length) {
  console.error(`Profile V1 runtime media contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Profile V1 runtime media contracts OK: canonical stems map only to exact files in public/profile, image/video extensions are preserved for Remotion runtime use, and a fresh clone resolves 0/17 instead of fabricating media.');
